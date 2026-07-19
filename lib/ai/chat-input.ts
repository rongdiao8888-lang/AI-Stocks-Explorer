import { z } from "zod";

import { companyTickerSchema } from "../validation/identifiers";

const promptInjectionPatterns = [
  /\b(ignore|disregard|override|bypass)\b.{0,48}\b(instruction|system|rule|prompt)\b/i,
  /\b(reveal|show|print|repeat|expose)\b.{0,48}\b(system|hidden|developer)\b.{0,24}\b(prompt|instruction|message)\b/i,
  /\b(jailbreak|developer mode|system message)\b/i,
];

export function normalizeAssistantQuestion(value: string) {
  return value.replace(/\s+/gu, " ").trim();
}

export const assistantQuestionSchema = z.string()
  .transform(normalizeAssistantQuestion)
  .pipe(z.string().min(3, "Enter a question with at least three characters.").max(600, "Keep questions to 600 characters or fewer.").refine(
    (value) => /[\p{L}\p{N}]/u.test(value),
    "Enter a question with letters or numbers.",
  ));

export const assistantChatRequestSchema = z.object({
  question: assistantQuestionSchema,
  ticker: companyTickerSchema,
});

export function isPromptInjectionAttempt(question: string) {
  return promptInjectionPatterns.some((pattern) => pattern.test(question));
}
