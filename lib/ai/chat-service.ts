import "server-only";

import OpenAI from "openai";
import { z } from "zod";

import { isPromptInjectionAttempt, assistantChatRequestSchema, normalizeAssistantQuestion } from "@/lib/ai/chat-input";
import { consumeAssistantRequest } from "@/lib/ai/chat-rate-limit";
import { getOpenAIConfig } from "@/lib/ai/config";
import { getApprovedCompanyResearchContext } from "@/lib/ai/context-builder";
import { buildCompanyAssistantPrompt } from "@/lib/ai/prompts";
import { createAssistantPromptHash, getCachedAssistantAnswer, storeCachedAssistantAnswer, type AssistantAnswerCacheKey } from "@/lib/repositories/ai-chat-repository";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const assistantPromptVersion = "company-research-assistant-v1";
const assistantCacheLifetimeMilliseconds = 7 * 24 * 60 * 60 * 1_000;
export const maximumAssistantAnswerLength = 6_000;

type OpenAIStreamChunk = {
  choices: Array<{
    delta: {
      content?: string | null;
    };
  }>;
};

export class AssistantChatError extends Error {
  constructor(
    message: string,
    public readonly code: "company_not_found" | "question_not_allowed" | "rate_limited",
    public readonly status: 400 | 404 | 429,
    public readonly retryAfterSeconds?: number,
  ) {
    super(message);
  }
}

export type PreparedAssistantAnswer =
  | {
    answer: string;
    cached: true;
    companyName: string;
  }
  | {
    cacheKey: AssistantAnswerCacheKey;
    cached: false;
    companyName: string;
    stream: AsyncIterable<string>;
  };

function createCacheExpiryDate() {
  return new Date(Date.now() + assistantCacheLifetimeMilliseconds).toISOString();
}

async function* extractAssistantText(stream: AsyncIterable<OpenAIStreamChunk>) {
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta.content;

    if (content) {
      yield content;
    }
  }
}

export async function prepareCompanyAssistantAnswer(input: unknown, rateLimitKey: string): Promise<PreparedAssistantAnswer> {
  const request = assistantChatRequestSchema.parse(input);

  if (isPromptInjectionAttempt(request.question)) {
    throw new AssistantChatError(
      "Please ask a company research question without changing the assistant's instructions.",
      "question_not_allowed",
      400,
    );
  }

  const admin = createSupabaseAdminClient();
  const approvedContext = await getApprovedCompanyResearchContext(request.ticker, admin);

  if (!approvedContext) {
    throw new AssistantChatError("The requested company is unavailable.", "company_not_found", 404);
  }

  const { model } = getOpenAIConfig();
  const normalizedQuestion = normalizeAssistantQuestion(request.question);
  const cacheKey: AssistantAnswerCacheKey = {
    companyId: approvedContext.company.id,
    contextVersion: approvedContext.context.contextVersion,
    modelName: model,
    normalizedQuestion,
    promptHash: createAssistantPromptHash({
      modelName: model,
      normalizedQuestion,
      promptVersion: assistantPromptVersion,
    }),
  };
  const cached = await getCachedAssistantAnswer(cacheKey);

  if (cached) {
    return { answer: cached.answer, cached: true, companyName: approvedContext.company.name };
  }

  const rateLimit = consumeAssistantRequest(rateLimitKey);

  if (!rateLimit.allowed) {
    throw new AssistantChatError(
      "The research assistant has reached its short request limit. Please try again shortly.",
      "rate_limited",
      429,
      rateLimit.retryAfterSeconds,
    );
  }

  const prompt = buildCompanyAssistantPrompt(approvedContext.context, normalizedQuestion);
  const client = new OpenAI({ apiKey: getOpenAIConfig().apiKey });
  const stream = await client.chat.completions.create({
    messages: [
      { content: prompt.system, role: "system" },
      { content: prompt.user, role: "user" },
    ],
    model,
    stream: true,
  });

  return {
    cacheKey,
    cached: false,
    companyName: approvedContext.company.name,
    stream: extractAssistantText(stream),
  };
}

export async function cacheCompanyAssistantAnswer(cacheKey: AssistantAnswerCacheKey, answer: string) {
  const validatedAnswer = z.string().trim().min(1).max(maximumAssistantAnswerLength).parse(answer);

  await storeCachedAssistantAnswer({
    ...cacheKey,
    answer: validatedAnswer,
    expiresAt: createCacheExpiryDate(),
  });
}
