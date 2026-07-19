import { describe, expect, it } from "vitest";

import { investmentThesisOutputSchema } from "./schemas";
import { AIOutputValidationError, parseStructuredOutput } from "./structured-output";

describe("structured AI output parsing", () => {
  it("accepts JSON that matches the investment thesis contract", () => {
    const output = parseStructuredOutput(JSON.stringify({
      competitiveAdvantages: ["A verified software ecosystem."],
      growthCatalysts: ["A verified product expansion."],
      investmentDrivers: ["A documented AI infrastructure role."],
      keyRisks: ["Approved context lacks financial metrics."],
      thesisSummary: "A neutral summary based on approved company context.",
    }), investmentThesisOutputSchema);

    expect(output.thesisSummary).toContain("neutral summary");
  });

  it("rejects malformed JSON and incomplete records", () => {
    expect(() => parseStructuredOutput("not-json", investmentThesisOutputSchema)).toThrow(AIOutputValidationError);
    expect(() => parseStructuredOutput(JSON.stringify({ thesisSummary: "Incomplete." }), investmentThesisOutputSchema)).toThrow(AIOutputValidationError);
  });
});
