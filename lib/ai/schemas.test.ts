import { describe, expect, it } from "vitest";

import { companyResearchOutputSchema, investmentThesisOutputSchema } from "./schemas";

describe("AI output schemas", () => {
  it("accepts a complete structured investment thesis", () => {
    expect(investmentThesisOutputSchema.safeParse({
      competitiveAdvantages: ["Software ecosystem"],
      growthCatalysts: ["Verified product adoption"],
      investmentDrivers: ["AI infrastructure role"],
      keyRisks: ["Limited approved financial context"],
      thesisSummary: "A neutral research summary.",
    }).success).toBe(true);
  });

  it("rejects incomplete thesis and out-of-range ecosystem research", () => {
    expect(investmentThesisOutputSchema.safeParse({ thesisSummary: "Incomplete" }).success).toBe(false);
    expect(companyResearchOutputSchema.safeParse({
      aiEcosystemScore: 101,
      competitiveLandscape: "Unavailable in the source context.",
      customerExposureSummary: "Unavailable in the source context.",
      riskSummary: "Unavailable in the source context.",
      scoreExplanation: "Unavailable in the source context.",
      technologyPosition: "Unavailable in the source context.",
      valueChainRole: "Infrastructure.",
      whyItMatters: "The company has verified products.",
    }).success).toBe(false);
  });
});
