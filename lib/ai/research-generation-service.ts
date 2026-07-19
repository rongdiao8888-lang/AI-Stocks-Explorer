import "server-only";

import { getOpenAIConfig } from "@/lib/ai/config";
import { getApprovedCompanyResearchContext } from "@/lib/ai/context-builder";
import { generateCompanyResearch, generateInvestmentThesis } from "@/lib/ai/openai-generation";
import {
  getCachedCompanyResearch,
  getCachedCompanyThesis,
  type CachedCompanyResearch,
  type CachedCompanyThesis,
  storeGeneratedResearchDraft,
  storeGeneratedThesisDraft,
} from "@/lib/repositories/ai-generation-repository";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { companyTickerSchema } from "@/lib/validation/identifiers";

const thesisPromptVersion = "investment-thesis-v3";
const researchPromptVersion = "company-research-v3";
const researchLifetimeMilliseconds = 30 * 24 * 60 * 60 * 1_000;

type GenerateCompanyResearchInput = {
  regenerate?: boolean;
  ticker: string;
};

type GeneratedOrCached<T> = {
  cached: boolean;
  record: T;
};

export type GeneratedCompanyResearchBundle = {
  company: {
    name: string;
    ticker: string;
  };
  contextVersion: string;
  research: GeneratedOrCached<CachedCompanyResearch>;
  thesis: GeneratedOrCached<CachedCompanyThesis>;
};

function createExpiryDate(generatedAt: Date) {
  return new Date(generatedAt.getTime() + researchLifetimeMilliseconds).toISOString();
}

export async function generateCompanyResearchBundle(input: GenerateCompanyResearchInput): Promise<GeneratedCompanyResearchBundle | null> {
  const ticker = companyTickerSchema.parse(input.ticker);
  const admin = createSupabaseAdminClient();
  const approvedContext = await getApprovedCompanyResearchContext(ticker, admin);

  if (!approvedContext) {
    return null;
  }

  const { company, context } = approvedContext;
  const { model } = getOpenAIConfig();
  const thesisKey = {
    companyId: company.id,
    contextVersion: context.contextVersion,
    modelName: model,
    promptVersion: thesisPromptVersion,
  };
  const researchKey = {
    companyId: company.id,
    contextVersion: context.contextVersion,
    modelName: model,
    promptVersion: researchPromptVersion,
  };
  const [cachedThesis, cachedResearch] = input.regenerate
    ? [null, null]
    : await Promise.all([getCachedCompanyThesis(thesisKey), getCachedCompanyResearch(researchKey)]);

  const thesis = cachedThesis
    ? { cached: true, record: cachedThesis }
    : await generateAndStoreThesis(context, thesisKey);
  const research = cachedResearch
    ? { cached: true, record: cachedResearch }
    : await generateAndStoreResearch(context, researchKey);

  return {
    company: { name: company.name, ticker: company.ticker },
    contextVersion: context.contextVersion,
    research,
    thesis,
  };
}

async function generateAndStoreThesis(
  context: Parameters<typeof generateInvestmentThesis>[0],
  cacheKey: { companyId: string; contextVersion: string; modelName: string; promptVersion: string },
): Promise<GeneratedOrCached<CachedCompanyThesis>> {
  const generatedAt = new Date();
  const generated = await generateInvestmentThesis(context);
  const record = await storeGeneratedThesisDraft({
    ...cacheKey,
    expiresAt: createExpiryDate(generatedAt),
    generatedAt: generatedAt.toISOString(),
    output: generated.output,
  });

  return { cached: false, record };
}

async function generateAndStoreResearch(
  context: Parameters<typeof generateCompanyResearch>[0],
  cacheKey: { companyId: string; contextVersion: string; modelName: string; promptVersion: string },
): Promise<GeneratedOrCached<CachedCompanyResearch>> {
  const generatedAt = new Date();
  const generated = await generateCompanyResearch(context);
  const record = await storeGeneratedResearchDraft({
    ...cacheKey,
    expiresAt: createExpiryDate(generatedAt),
    generatedAt: generatedAt.toISOString(),
    output: generated.output,
  });

  return { cached: false, record };
}
