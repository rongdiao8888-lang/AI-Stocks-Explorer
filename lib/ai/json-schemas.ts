import type { ResponseFormatJSONSchema } from "openai/resources/shared";

const researchPointSchema = {
  maxLength: 500,
  minLength: 1,
  type: "string",
};

export const investmentThesisJsonSchema: ResponseFormatJSONSchema.JSONSchema = {
  name: "investment_thesis",
  strict: true,
  schema: {
    additionalProperties: false,
    properties: {
      competitiveAdvantages: { items: researchPointSchema, maxItems: 5, minItems: 1, type: "array" },
      growthCatalysts: { items: researchPointSchema, maxItems: 5, minItems: 1, type: "array" },
      investmentDrivers: { items: researchPointSchema, maxItems: 5, minItems: 1, type: "array" },
      keyRisks: { items: researchPointSchema, maxItems: 5, minItems: 1, type: "array" },
      thesisSummary: { maxLength: 1_200, minLength: 1, type: "string" },
    },
    required: ["thesisSummary", "investmentDrivers", "competitiveAdvantages", "growthCatalysts", "keyRisks"],
    type: "object",
  },
};

export const companyResearchJsonSchema: ResponseFormatJSONSchema.JSONSchema = {
  name: "company_research",
  strict: true,
  schema: {
    additionalProperties: false,
    properties: {
      aiEcosystemScore: { maximum: 100, minimum: 0, type: "integer" },
      competitiveLandscape: { maxLength: 1_000, minLength: 1, type: "string" },
      customerExposureSummary: { maxLength: 1_000, minLength: 1, type: "string" },
      riskSummary: { maxLength: 1_000, minLength: 1, type: "string" },
      scoreExplanation: { maxLength: 1_000, minLength: 1, type: "string" },
      technologyPosition: { maxLength: 1_000, minLength: 1, type: "string" },
      valueChainRole: { maxLength: 1_000, minLength: 1, type: "string" },
      whyItMatters: { maxLength: 1_000, minLength: 1, type: "string" },
    },
    required: ["whyItMatters", "valueChainRole", "technologyPosition", "customerExposureSummary", "competitiveLandscape", "riskSummary", "aiEcosystemScore", "scoreExplanation"],
    type: "object",
  },
};
