import "server-only";

import { getActiveCategoryBySlug, listActiveCategories } from "@/lib/repositories/category-repository";
import { throwOnRepositoryError } from "@/lib/repositories/errors";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { categorySlugSchema, companyTickerSchema, paginationSchema } from "@/lib/validation/identifiers";
import type { CompanyDetail, CompanySummary } from "@/types/company";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/types/database";

const companyColumns = "id, company_name, ticker, primary_category_id, ai_role, coverage_tier";

const relatedCompanyTierRank: Record<CompanySummary["coverageTier"], number> = {
  tier_1: 0,
  tier_2: 1,
  tier_3: 2,
  baseline: 3,
};

const relatedCompaniesSchema = paginationSchema.extend({
  categorySlug: categorySlugSchema,
  companyId: z.string().uuid(),
  limit: z.number().int().min(1).max(100).default(4),
}).omit({ offset: true });

type CompanyRow = {
  ai_role: string | null;
  company_name: string;
  coverage_tier: "tier_1" | "tier_2" | "tier_3" | "baseline";
  id: string;
  primary_category_id: string;
  ticker: string;
};

type CompanyDetailRow = CompanyRow & {
  description: string | null;
  exchange: string | null;
  source_reference: string | null;
  website: string | null;
};

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
};

type DatabaseClient = SupabaseClient<Database>;

function mapCompanySummary(company: CompanyRow, categories: Map<string, { name: string; slug: string }>): CompanySummary {
  const primaryCategory = categories.get(company.primary_category_id);

  return {
    aiRole: company.ai_role,
    coverageTier: company.coverage_tier,
    id: company.id,
    name: company.company_name,
    primaryCategory: primaryCategory?.name ?? "Uncategorized",
    primaryCategorySlug: primaryCategory?.slug ?? "",
    ticker: company.ticker,
  };
}

export async function listCompanies(input: { categorySlug?: string; limit?: number; offset?: number } = {}): Promise<CompanySummary[]> {
  const { categorySlug, limit, offset } = paginationSchema.extend({ categorySlug: categorySlugSchema.optional() }).parse(input);
  const category = categorySlug ? await getActiveCategoryBySlug(categorySlug) : null;

  if (categorySlug && !category) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("companies")
    .select(companyColumns)
    .eq("is_active", true)
    .order("company_name", { ascending: true })
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq("primary_category_id", category.id);
  }

  const [{ data, error }, categories] = await Promise.all([
    query.overrideTypes<CompanyRow[], { merge: false }>(),
    listActiveCategories(),
  ]);
  throwOnRepositoryError(error, "Unable to retrieve companies.");

  const categoriesById = new Map(categories.map((item) => [item.id, item]));
  return (data ?? []).map((company) => mapCompanySummary(company, categoriesById));
}

export async function getCompanyByTicker(ticker: string, client?: DatabaseClient): Promise<CompanyDetail | null> {
  const normalizedTicker = companyTickerSchema.parse(ticker);
  const supabase = (client ?? await createSupabaseServerClient()) as DatabaseClient;
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id, company_name, ticker, primary_category_id, ai_role, coverage_tier, description, exchange, website, source_reference")
    .eq("ticker", normalizedTicker)
    .eq("is_active", true)
    .maybeSingle()
    .overrideTypes<CompanyDetailRow | null, { merge: false }>();

  throwOnRepositoryError(companyError, "Unable to retrieve the company.");

  if (!company) {
    return null;
  }

  const [{ data: categories, error: categoriesError }, { data: assignments, error: assignmentsError }] = await Promise.all([
    supabase
      .from("ai_categories")
      .select("id, name, slug")
      .eq("is_active", true)
      .overrideTypes<CategoryRow[], { merge: false }>(),
    supabase
      .from("company_categories")
      .select("category_id, category_type")
      .eq("company_id", company.id)
      .eq("category_type", "secondary")
      .overrideTypes<Array<{ category_id: string }>, { merge: false }>(),
  ]);

  throwOnRepositoryError(categoriesError, "Unable to retrieve company categories.");
  throwOnRepositoryError(assignmentsError, "Unable to retrieve company category assignments.");

  const categoriesById = new Map((categories ?? []).map((category) => [category.id, category]));
  const summary = mapCompanySummary(company, categoriesById);

  return {
    ...summary,
    description: company.description,
    exchange: company.exchange,
    secondaryCategories: (assignments ?? [])
      .map((assignment) => categoriesById.get(assignment.category_id))
      .filter((category): category is { id: string; name: string; slug: string } => Boolean(category))
      .map(({ name, slug }) => ({ name, slug })),
    sourceReference: company.source_reference,
    website: company.website,
  };
}

export async function listRelatedCompanies(input: { categorySlug: string; companyId: string; limit?: number }): Promise<CompanySummary[]> {
  const { categorySlug, companyId, limit } = relatedCompaniesSchema.parse(input);
  const category = await getActiveCategoryBySlug(categorySlug);

  if (!category) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("companies")
    .select(companyColumns)
    .eq("is_active", true)
    .eq("primary_category_id", category.id)
    .neq("id", companyId)
    .order("company_name", { ascending: true })
    .limit(100)
    .overrideTypes<CompanyRow[], { merge: false }>();

  throwOnRepositoryError(error, "Unable to retrieve related companies.");

  return (data ?? [])
    .sort((left, right) => relatedCompanyTierRank[left.coverage_tier] - relatedCompanyTierRank[right.coverage_tier] || left.company_name.localeCompare(right.company_name))
    .slice(0, limit)
    .map((company) => mapCompanySummary(company, new Map([[category.id, category]])));
}
