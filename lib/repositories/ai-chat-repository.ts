import "server-only";

import { createHash } from "node:crypto";
import { z } from "zod";

import { throwOnRepositoryError } from "@/lib/repositories/errors";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const companyIdSchema = z.string().uuid();

export type AssistantAnswerCacheKey = {
  companyId: string;
  contextVersion: string;
  modelName: string;
  normalizedQuestion: string;
  promptHash: string;
};

export type CachedAssistantAnswer = {
  answer: string;
  expiresAt: string;
};

type AssistantCacheRecord = {
  expires_at: string | null;
  response_text: string;
};

function isCurrent(expiresAt: string | null) {
  return expiresAt !== null && new Date(expiresAt).getTime() > Date.now();
}

export function createAssistantPromptHash(input: { modelName: string; normalizedQuestion: string; promptVersion: string }) {
  return createHash("sha256")
    .update(JSON.stringify(input))
    .digest("hex");
}

export async function getCachedAssistantAnswer(key: AssistantAnswerCacheKey): Promise<CachedAssistantAnswer | null> {
  const companyId = companyIdSchema.parse(key.companyId);
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("ai_prompt_cache")
    .select("response_text, expires_at")
    .eq("company_id", companyId)
    .eq("context_version", key.contextVersion)
    .eq("model_name", key.modelName)
    .eq("prompt_hash", key.promptHash)
    .maybeSingle()
    .overrideTypes<AssistantCacheRecord | null, { merge: false }>();

  throwOnRepositoryError(error, "Unable to retrieve a cached assistant response.");

  return data && isCurrent(data.expires_at)
    ? { answer: data.response_text, expiresAt: data.expires_at ?? "" }
    : null;
}

export async function storeCachedAssistantAnswer(input: AssistantAnswerCacheKey & { answer: string; expiresAt: string }) {
  const companyId = companyIdSchema.parse(input.companyId);
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("ai_prompt_cache")
    .upsert({
      company_id: companyId,
      context_version: input.contextVersion,
      expires_at: input.expiresAt,
      model_name: input.modelName,
      normalized_question: input.normalizedQuestion,
      prompt_hash: input.promptHash,
      response_text: input.answer,
    }, { onConflict: "company_id,prompt_hash,context_version" });

  throwOnRepositoryError(error, "Unable to cache the assistant response.");
}
