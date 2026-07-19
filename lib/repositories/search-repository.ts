import "server-only";

import { z } from "zod";

import { throwOnRepositoryError } from "@/lib/repositories/errors";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const searchQuerySchema = z.string().trim().min(1).max(80);

export type CatalogSearchResult = {
  href: string;
  kind: "category" | "company" | "product" | "technology";
  subtitle: string;
  title: string;
};

type CompanySearchRecord = {
  company_name: string;
  ticker: string;
};

type CategorySearchRecord = {
  name: string;
  slug: string;
};

type ProductSearchRecord = {
  company_id: string;
  product_name: string;
  product_type: string;
};

type TechnologySearchRecord = {
  name: string;
  technology_type: string;
};

export async function searchCatalog(query: string): Promise<CatalogSearchResult[]> {
  const normalizedQuery = searchQuerySchema.parse(query);
  const pattern = `%${normalizedQuery.replace(/[(),]/g, " ")}%`;
  const supabase = await createSupabaseServerClient();
  const [{ data: companies, error: companiesError }, { data: categories, error: categoriesError }, { data: products, error: productsError }, { data: technologies, error: technologiesError }] = await Promise.all([
    supabase
      .from("companies")
      .select("company_name, ticker")
      .eq("is_active", true)
      .or(`company_name.ilike.${pattern},ticker.ilike.${pattern}`)
      .limit(12)
      .overrideTypes<CompanySearchRecord[], { merge: false }>(),
    supabase
      .from("ai_categories")
      .select("name, slug")
      .eq("is_active", true)
      .ilike("name", pattern)
      .limit(8)
      .overrideTypes<CategorySearchRecord[], { merge: false }>(),
    supabase
      .from("company_products")
      .select("company_id, product_name, product_type")
      .eq("is_active", true)
      .ilike("product_name", pattern)
      .limit(12)
      .overrideTypes<ProductSearchRecord[], { merge: false }>(),
    supabase
      .from("technologies")
      .select("name, technology_type")
      .eq("is_active", true)
      .ilike("name", pattern)
      .limit(12)
      .overrideTypes<TechnologySearchRecord[], { merge: false }>(),
  ]);

  throwOnRepositoryError(companiesError, "Unable to search companies.");
  throwOnRepositoryError(categoriesError, "Unable to search AI categories.");
  throwOnRepositoryError(productsError, "Unable to search company products.");
  throwOnRepositoryError(technologiesError, "Unable to search technologies.");

  const companyIds = Array.from(new Set((products ?? []).map((product) => product.company_id)));
  const { data: productCompanies, error: productCompaniesError } = companyIds.length > 0
    ? await supabase
      .from("companies")
      .select("id, company_name, ticker")
      .in("id", companyIds)
      .overrideTypes<Array<CompanySearchRecord & { id: string }>, { merge: false }>()
    : { data: [], error: null };

  throwOnRepositoryError(productCompaniesError, "Unable to resolve company products.");

  const productsByCompanyId = new Map((productCompanies ?? []).map((company) => [company.id, company]));
  const companyResults = (companies ?? [])
    .map((company) => ({
      href: `/companies/${company.ticker}`,
      kind: "company" as const,
      subtitle: company.ticker,
      title: company.company_name,
    }))
    .sort((left, right) => {
      const leftIsExactTicker = left.subtitle.toUpperCase() === normalizedQuery.toUpperCase();
      const rightIsExactTicker = right.subtitle.toUpperCase() === normalizedQuery.toUpperCase();

      if (leftIsExactTicker !== rightIsExactTicker) {
        return leftIsExactTicker ? -1 : 1;
      }

      return left.title.localeCompare(right.title);
    });

  return [
    ...companyResults,
    ...(categories ?? []).map((category) => ({
      href: `/categories/${category.slug}`,
      kind: "category" as const,
      subtitle: "AI value-chain category",
      title: category.name,
    })),
    ...(products ?? []).flatMap((product) => {
      const company = productsByCompanyId.get(product.company_id);

      if (!company) {
        return [];
      }

      return [{
        href: `/companies/${company.ticker}`,
        kind: "product" as const,
        subtitle: `${company.company_name} / ${product.product_type}`,
        title: product.product_name,
      }];
    }),
    ...(technologies ?? []).map((technology) => ({
      href: "/ecosystem",
      kind: "technology" as const,
      subtitle: technology.technology_type,
      title: technology.name,
    })),
  ];
}
