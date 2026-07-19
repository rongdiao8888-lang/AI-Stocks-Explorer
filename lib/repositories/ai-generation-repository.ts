import "server-only";

import { companyResearchOutputSchema, investmentThesisOutputSchema, type CompanyResearchOutput, type InvestmentThesisOutput } from "@/lib/ai/schemas";
import { throwOnRepositoryError } from "@/lib/repositories/errors";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { AIReviewStatus } from "@/types/database";
import { z } from "zod";

const companyIdSchema = z.string().uuid();

export type GeneratedContentCacheKey = {
  companyId: string;
  contextVersion: string;
  modelName: string;
  promptVersion: string;
};

export type CachedCompanyThesis = {
  expiresAt: string | null;
  id: string;
  output: InvestmentThesisOutput;
  reviewStatus: AIReviewStatus;
};

export type CachedCompanyResearch = {
  expiresAt: string | null;
  id: string;
  output: CompanyResearchOutput;
  reviewStatus: AIReviewStatus;
};

type CompanyThesisRecord = {
  competitive_advantages: unknown;
  expires_at: string | null;
  generated_at: string;
  growth_catalysts: unknown;
  id: string;
  investment_drivers: unknown;
  key_risks: unknown;
  review_status: AIReviewStatus;
  thesis_summary: string;
};

type CompanyResearchRecord = {
  ai_ecosystem_score: number;
  competitive_landscape: string;
  customer_exposure_summary: string;
  expires_at: string | null;
  generated_at: string;
  id: string;
  review_status: AIReviewStatus;
  risk_summary: string;
  score_explanation: string;
  technology_position: string;
  value_chain_role: string;
  why_it_matters: string;
};

function isCurrent(expiresAt: string | null) {
  return expiresAt === null || new Date(expiresAt).getTime() > Date.now();
}

function mapThesis(record: CompanyThesisRecord): CachedCompanyThesis | null {
  const output = investmentThesisOutputSchema.safeParse({
    competitiveAdvantages: record.competitive_advantages,
    growthCatalysts: record.growth_catalysts,
    investmentDrivers: record.investment_drivers,
    keyRisks: record.key_risks,
    thesisSummary: record.thesis_summary,
  });

  return output.success ? {
    expiresAt: record.expires_at,
    id: record.id,
    output: output.data,
    reviewStatus: record.review_status,
  } : null;
}

function mapResearch(record: CompanyResearchRecord): CachedCompanyResearch | null {
  const output = companyResearchOutputSchema.safeParse({
    aiEcosystemScore: record.ai_ecosystem_score,
    competitiveLandscape: record.competitive_landscape,
    customerExposureSummary: record.customer_exposure_summary,
    riskSummary: record.risk_summary,
    scoreExplanation: record.score_explanation,
    technologyPosition: record.technology_position,
    valueChainRole: record.value_chain_role,
    whyItMatters: record.why_it_matters,
  });

  return output.success ? {
    expiresAt: record.expires_at,
    id: record.id,
    output: output.data,
    reviewStatus: record.review_status,
  } : null;
}

export async function getCachedCompanyThesis(key: GeneratedContentCacheKey): Promise<CachedCompanyThesis | null> {
  const normalizedCompanyId = companyIdSchema.parse(key.companyId);
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("company_ai_theses")
    .select("id, thesis_summary, investment_drivers, competitive_advantages, growth_catalysts, key_risks, generated_at, expires_at, review_status")
    .eq("company_id", normalizedCompanyId)
    .eq("source_data_version", key.contextVersion)
    .eq("model_name", key.modelName)
    .eq("prompt_version", key.promptVersion)
    .order("generated_at", { ascending: false })
    .limit(10)
    .overrideTypes<CompanyThesisRecord[], { merge: false }>();

  throwOnRepositoryError(error, "Unable to retrieve cached AI thesis content.");

  return (data ?? [])
    .filter((record) => isCurrent(record.expires_at))
    .map(mapThesis)
    .find((record): record is CachedCompanyThesis => Boolean(record)) ?? null;
}

export async function getCachedCompanyResearch(key: GeneratedContentCacheKey): Promise<CachedCompanyResearch | null> {
  const normalizedCompanyId = companyIdSchema.parse(key.companyId);
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("company_ai_research")
    .select("id, why_it_matters, value_chain_role, technology_position, customer_exposure_summary, competitive_landscape, risk_summary, ai_ecosystem_score, score_explanation, generated_at, expires_at, review_status")
    .eq("company_id", normalizedCompanyId)
    .eq("source_data_version", key.contextVersion)
    .eq("model_name", key.modelName)
    .eq("prompt_version", key.promptVersion)
    .order("generated_at", { ascending: false })
    .limit(10)
    .overrideTypes<CompanyResearchRecord[], { merge: false }>();

  throwOnRepositoryError(error, "Unable to retrieve cached AI research content.");

  return (data ?? [])
    .filter((record) => isCurrent(record.expires_at))
    .map(mapResearch)
    .find((record): record is CachedCompanyResearch => Boolean(record)) ?? null;
}

type StoreGeneratedThesisInput = GeneratedContentCacheKey & {
  expiresAt: string;
  generatedAt: string;
  output: InvestmentThesisOutput;
};

type StoreGeneratedResearchInput = GeneratedContentCacheKey & {
  expiresAt: string;
  generatedAt: string;
  output: CompanyResearchOutput;
};

export async function storeGeneratedThesisDraft(input: StoreGeneratedThesisInput): Promise<CachedCompanyThesis> {
  const normalizedCompanyId = companyIdSchema.parse(input.companyId);
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("company_ai_theses")
    .insert({
      company_id: normalizedCompanyId,
      competitive_advantages: input.output.competitiveAdvantages,
      expires_at: input.expiresAt,
      generated_at: input.generatedAt,
      growth_catalysts: input.output.growthCatalysts,
      investment_drivers: input.output.investmentDrivers,
      key_risks: input.output.keyRisks,
      model_name: input.modelName,
      prompt_version: input.promptVersion,
      review_status: "draft",
      source_data_version: input.contextVersion,
      thesis_summary: input.output.thesisSummary,
    })
    .select("id, thesis_summary, investment_drivers, competitive_advantages, growth_catalysts, key_risks, generated_at, expires_at, review_status")
    .single()
    .overrideTypes<CompanyThesisRecord, { merge: false }>();

  throwOnRepositoryError(error, "Unable to store the AI thesis draft.");
  const draft = data ? mapThesis(data) : null;

  if (!draft) {
    throw new Error("The stored AI thesis draft did not match the required schema.");
  }

  return draft;
}

export async function storeGeneratedResearchDraft(input: StoreGeneratedResearchInput): Promise<CachedCompanyResearch> {
  const normalizedCompanyId = companyIdSchema.parse(input.companyId);
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("company_ai_research")
    .insert({
      ai_ecosystem_score: input.output.aiEcosystemScore,
      company_id: normalizedCompanyId,
      competitive_landscape: input.output.competitiveLandscape,
      customer_exposure_summary: input.output.customerExposureSummary,
      expires_at: input.expiresAt,
      generated_at: input.generatedAt,
      model_name: input.modelName,
      prompt_version: input.promptVersion,
      research_sections: input.output,
      review_status: "draft",
      risk_summary: input.output.riskSummary,
      score_explanation: input.output.scoreExplanation,
      source_data_version: input.contextVersion,
      technology_position: input.output.technologyPosition,
      value_chain_role: input.output.valueChainRole,
      why_it_matters: input.output.whyItMatters,
    })
    .select("id, why_it_matters, value_chain_role, technology_position, customer_exposure_summary, competitive_landscape, risk_summary, ai_ecosystem_score, score_explanation, generated_at, expires_at, review_status")
    .single()
    .overrideTypes<CompanyResearchRecord, { merge: false }>();

  throwOnRepositoryError(error, "Unable to store the AI research draft.");
  const draft = data ? mapResearch(data) : null;

  if (!draft) {
    throw new Error("The stored AI research draft did not match the required schema.");
  }

  return draft;
}

export async function getLatestCompanyAiDrafts(companyId: string): Promise<{ research: CachedCompanyResearch | null; thesis: CachedCompanyThesis | null }> {
  const normalizedCompanyId = companyIdSchema.parse(companyId);
  const supabase = createSupabaseAdminClient();
  const [thesisResult, researchResult] = await Promise.all([
    supabase
      .from("company_ai_theses")
      .select("id, thesis_summary, investment_drivers, competitive_advantages, growth_catalysts, key_risks, generated_at, expires_at, review_status")
      .eq("company_id", normalizedCompanyId)
      .eq("review_status", "draft")
      .order("generated_at", { ascending: false })
      .limit(10)
      .overrideTypes<CompanyThesisRecord[], { merge: false }>(),
    supabase
      .from("company_ai_research")
      .select("id, why_it_matters, value_chain_role, technology_position, customer_exposure_summary, competitive_landscape, risk_summary, ai_ecosystem_score, score_explanation, generated_at, expires_at, review_status")
      .eq("company_id", normalizedCompanyId)
      .eq("review_status", "draft")
      .order("generated_at", { ascending: false })
      .limit(10)
      .overrideTypes<CompanyResearchRecord[], { merge: false }>(),
  ]);

  throwOnRepositoryError(thesisResult.error, "Unable to retrieve AI thesis drafts.");
  throwOnRepositoryError(researchResult.error, "Unable to retrieve AI research drafts.");

  return {
    research: (researchResult.data ?? []).filter((record) => isCurrent(record.expires_at)).map(mapResearch).find((record): record is CachedCompanyResearch => Boolean(record)) ?? null,
    thesis: (thesisResult.data ?? []).filter((record) => isCurrent(record.expires_at)).map(mapThesis).find((record): record is CachedCompanyThesis => Boolean(record)) ?? null,
  };
}

export async function approveLatestCompanyAiDrafts(companyId: string): Promise<{ researchId: string; thesisId: string }> {
  const drafts = await getLatestCompanyAiDrafts(companyId);

  if (!drafts.thesis || !drafts.research) {
    throw new Error("Generate and review both the thesis and research draft before approval.");
  }

  const supabase = createSupabaseAdminClient();
  const [thesisResult, researchResult] = await Promise.all([
    supabase.from("company_ai_theses").update({ review_status: "approved" }).eq("id", drafts.thesis.id),
    supabase.from("company_ai_research").update({ review_status: "approved" }).eq("id", drafts.research.id),
  ]);

  throwOnRepositoryError(thesisResult.error, "Unable to approve the AI thesis draft.");
  throwOnRepositoryError(researchResult.error, "Unable to approve the AI research draft.");

  return { researchId: drafts.research.id, thesisId: drafts.thesis.id };
}
