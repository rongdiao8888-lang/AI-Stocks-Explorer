import "server-only";

import { z } from "zod";

const openAIConfigSchema = z.object({
  apiKey: z.string().trim().min(1),
  model: z.string().trim().min(1).default("gpt-5.6"),
});

export type OpenAIConfig = z.infer<typeof openAIConfigSchema>;

export function getOpenAIConfig(): OpenAIConfig {
  const result = openAIConfigSchema.safeParse({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL,
  });

  if (!result.success) {
    throw new Error("Set OPENAI_API_KEY before generating AI research.");
  }

  return result.data;
}
