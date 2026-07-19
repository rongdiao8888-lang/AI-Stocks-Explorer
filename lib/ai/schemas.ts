import { z } from "zod";

const researchPointSchema = z.string().trim().min(1).max(500);

export const investmentThesisOutputSchema = z.object({
  competitiveAdvantages: z.array(researchPointSchema).min(1).max(5),
  growthCatalysts: z.array(researchPointSchema).min(1).max(5),
  investmentDrivers: z.array(researchPointSchema).min(1).max(5),
  keyRisks: z.array(researchPointSchema).min(1).max(5),
  thesisSummary: z.string().trim().min(1).max(1_200),
});

export const companyResearchOutputSchema = z.object({
  aiEcosystemScore: z.number().int().min(0).max(100),
  competitiveLandscape: z.string().trim().min(1).max(1_000),
  customerExposureSummary: z.string().trim().min(1).max(1_000),
  riskSummary: z.string().trim().min(1).max(1_000),
  scoreExplanation: z.string().trim().min(1).max(1_000),
  technologyPosition: z.string().trim().min(1).max(1_000),
  valueChainRole: z.string().trim().min(1).max(1_000),
  whyItMatters: z.string().trim().min(1).max(1_000),
});

export type CompanyResearchOutput = z.infer<typeof companyResearchOutputSchema>;
export type InvestmentThesisOutput = z.infer<typeof investmentThesisOutputSchema>;
