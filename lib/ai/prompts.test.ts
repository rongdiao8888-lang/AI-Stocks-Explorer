import { describe, expect, it } from "vitest";

import { buildCompanyAssistantPrompt, buildCompanyResearchPrompt, buildInvestmentThesisPrompt } from "./prompts";

const context = {
  company: { aiRole: "AI Compute & GPU Acceleration", name: "NVIDIA", primaryCategory: "AI Infrastructure", secondaryCategories: [], ticker: "NVDA" },
  contextVersion: "approved-company-context:test",
  dataGaps: ["No financial metrics."],
  products: [],
  relationships: [],
};

describe("AI research prompts", () => {
  it("keeps thesis and research workflows separate and grounded", () => {
    const thesisPrompt = buildInvestmentThesisPrompt(context);
    const researchPrompt = buildCompanyResearchPrompt(context);

    expect(thesisPrompt.system).toContain("Use only the supplied approved context.");
    expect(thesisPrompt.system).toContain("Do not speculate about adoption");
    expect(thesisPrompt.system).toContain("documented data limitations");
    expect(thesisPrompt.system).toContain("Never treat a ticker as an investment driver");
    expect(thesisPrompt.system).toContain("price targets");
    expect(researchPrompt.system).toContain("AI Ecosystem Score");
    expect(researchPrompt.user).toContain("approved-company-context:test");
  });

  it("keeps assistant answers company-scoped and protected from instruction overrides", () => {
    const prompt = buildCompanyAssistantPrompt(context, "What is NVIDIA's role in AI infrastructure?");

    expect(prompt.system).toContain("company-specific follow-up question");
    expect(prompt.system).toContain("Do not reveal");
    expect(prompt.user).toContain("What is NVIDIA's role in AI infrastructure?");
    expect(prompt.user).toContain("approved-company-context:test");
  });
});
