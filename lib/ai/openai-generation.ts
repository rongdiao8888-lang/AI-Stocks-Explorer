import "server-only";

import OpenAI from "openai";
import type { ResponseFormatJSONSchema } from "openai/resources/shared";
import { z } from "zod";

import { getOpenAIConfig } from "@/lib/ai/config";
import type { ApprovedCompanyResearchContext } from "@/lib/ai/context";
import { companyResearchJsonSchema, investmentThesisJsonSchema } from "@/lib/ai/json-schemas";
import { buildCompanyResearchPrompt, buildInvestmentThesisPrompt, type StructuredResearchPrompt } from "@/lib/ai/prompts";
import { companyResearchOutputSchema, investmentThesisOutputSchema } from "@/lib/ai/schemas";
import { AIOutputValidationError, parseStructuredOutput } from "@/lib/ai/structured-output";

export { AIOutputValidationError, parseStructuredOutput } from "@/lib/ai/structured-output";

type StructuredGenerationInput<T> = {
  outputSchema: z.ZodType<T>;
  prompt: StructuredResearchPrompt;
  responseFormat: ResponseFormatJSONSchema.JSONSchema;
};

export type GeneratedStructuredOutput<T> = {
  modelName: string;
  output: T;
};

async function generateStructuredOutput<T>({ outputSchema, prompt, responseFormat }: StructuredGenerationInput<T>): Promise<GeneratedStructuredOutput<T>> {
  const config = getOpenAIConfig();
  const client = new OpenAI({ apiKey: config.apiKey });
  let validationError: AIOutputValidationError | null = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const retryInstruction = attempt === 0 ? [] : [{
      content: "The prior response did not match the required JSON schema. Return only a complete JSON object that exactly follows the requested schema.",
      role: "user" as const,
    }];
    const response = await client.chat.completions.create({
      messages: [
        { content: prompt.system, role: "system" },
        { content: prompt.user, role: "user" },
        ...retryInstruction,
      ],
      model: config.model,
      response_format: { json_schema: responseFormat, type: "json_schema" },
    });
    const content = response.choices[0]?.message.content;

    if (!content) {
      validationError = new AIOutputValidationError("The model response did not contain structured content.");
      continue;
    }

    try {
      return { modelName: config.model, output: parseStructuredOutput(content, outputSchema) };
    } catch (error) {
      if (error instanceof AIOutputValidationError) {
        validationError = error;
        continue;
      }

      throw error;
    }
  }

  throw validationError ?? new AIOutputValidationError("The model response could not be validated.");
}

export function generateInvestmentThesis(context: ApprovedCompanyResearchContext) {
  return generateStructuredOutput({
    outputSchema: investmentThesisOutputSchema,
    prompt: buildInvestmentThesisPrompt(context),
    responseFormat: investmentThesisJsonSchema,
  });
}

export function generateCompanyResearch(context: ApprovedCompanyResearchContext) {
  return generateStructuredOutput({
    outputSchema: companyResearchOutputSchema,
    prompt: buildCompanyResearchPrompt(context),
    responseFormat: companyResearchJsonSchema,
  });
}
