import "server-only";

import { throwOnRepositoryError } from "@/lib/repositories/errors";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { z } from "zod";

const companyIdSchema = z.string().uuid();

export type CompanyThesis = {
  competitiveAdvantages: unknown;
  expiresAt: string | null;
  generatedAt: string;
  growthCatalysts: unknown;
  id: string;
  investmentDrivers: unknown;
  keyRisks: unknown;
  modelName: string;
  promptVersion: string;
  sourceDataVersion: string;
  thesisSummary: string;
};

type CompanyThesisRecord = {
  competitive_advantages: unknown;
  expires_at: string | null;
  generated_at: string;
  growth_catalysts: unknown;
  id: string;
  investment_drivers: unknown;
  key_risks: unknown;
  model_name: string;
  prompt_version: string;
  source_data_version: string;
  thesis_summary: string;
};

export type CompanyResearch = {
  aiEcosystemScore: number;
  competitiveLandscape: string;
  customerExposureSummary: string;
  expiresAt: string | null;
  generatedAt: string;
  id: string;
  riskSummary: string;
  scoreExplanation: string;
  technologyPosition: string;
  valueChainRole: string;
  whyItMatters: string;
};

type CompanyResearchRecord = {
  ai_ecosystem_score: number;
  competitive_landscape: string;
  customer_exposure_summary: string;
  expires_at: string | null;
  generated_at: string;
  id: string;
  risk_summary: string;
  score_explanation: string;
  technology_position: string;
  value_chain_role: string;
  why_it_matters: string;
};

function isCurrent(expiresAt: string | null) {
  return expiresAt === null || new Date(expiresAt).getTime() > Date.now();
}

export async function getCurrentCompanyThesis(companyId: string, sourceDataVersion?: string): Promise<CompanyThesis | null> {
  const normalizedCompanyId = companyIdSchema.parse(companyId);
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("company_ai_theses")
    .select("id, thesis_summary, investment_drivers, competitive_advantages, growth_catalysts, key_risks, source_data_version, model_name, prompt_version, generated_at, expires_at")
    .eq("company_id", normalizedCompanyId)
    .eq("review_status", "approved")
    .order("generated_at", { ascending: false })
    .limit(10);

  if (sourceDataVersion) {
    query = query.eq("source_data_version", sourceDataVersion);
  }

  const { data, error } = await query.overrideTypes<CompanyThesisRecord[], { merge: false }>();

  throwOnRepositoryError(error, "Unable to retrieve the AI thesis.");
  const thesis = (data ?? []).find((item) => isCurrent(item.expires_at));

  return thesis
    ? {
        competitiveAdvantages: thesis.competitive_advantages,
        expiresAt: thesis.expires_at,
        generatedAt: thesis.generated_at,
        growthCatalysts: thesis.growth_catalysts,
        id: thesis.id,
        investmentDrivers: thesis.investment_drivers,
        keyRisks: thesis.key_risks,
        modelName: thesis.model_name,
        promptVersion: thesis.prompt_version,
        sourceDataVersion: thesis.source_data_version,
        thesisSummary: thesis.thesis_summary,
      }
    : null;
}

export async function getCurrentCompanyResearch(companyId: string, sourceDataVersion?: string): Promise<CompanyResearch | null> {
  const normalizedCompanyId = companyIdSchema.parse(companyId);
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("company_ai_research")
    .select("id, why_it_matters, value_chain_role, technology_position, customer_exposure_summary, competitive_landscape, risk_summary, ai_ecosystem_score, score_explanation, research_sections, source_data_version, model_name, prompt_version, generated_at, expires_at")
    .eq("company_id", normalizedCompanyId)
    .eq("review_status", "approved")
    .order("generated_at", { ascending: false })
    .limit(10);

  if (sourceDataVersion) {
    query = query.eq("source_data_version", sourceDataVersion);
  }

  const { data, error } = await query.overrideTypes<CompanyResearchRecord[], { merge: false }>();

  throwOnRepositoryError(error, "Unable to retrieve AI research.");
  const research = (data ?? []).find((item) => isCurrent(item.expires_at));

  return research
    ? {
        aiEcosystemScore: research.ai_ecosystem_score,
        competitiveLandscape: research.competitive_landscape,
        customerExposureSummary: research.customer_exposure_summary,
        expiresAt: research.expires_at,
        generatedAt: research.generated_at,
        id: research.id,
        riskSummary: research.risk_summary,
        scoreExplanation: research.score_explanation,
        technologyPosition: research.technology_position,
        valueChainRole: research.value_chain_role,
        whyItMatters: research.why_it_matters,
      }
    : null;
}
