import { z } from "zod";

const researchPointsSchema = z.array(z.string().trim().min(1).max(500)).max(8);

export function parseResearchPoints(value: unknown): string[] {
  const result = researchPointsSchema.safeParse(value);

  return result.success ? result.data : [];
}
