import { z } from "zod";

export class AIOutputValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AIOutputValidationError";
  }
}

export function parseStructuredOutput<T>(content: string, outputSchema: z.ZodType<T>): T {
  let parsed: unknown;

  try {
    parsed = JSON.parse(content);
  } catch {
    throw new AIOutputValidationError("The model response was not valid JSON.");
  }

  const validation = outputSchema.safeParse(parsed);

  if (!validation.success) {
    throw new AIOutputValidationError("The model response did not match the required research schema.");
  }

  return validation.data;
}
