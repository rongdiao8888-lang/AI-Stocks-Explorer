export type CompanySummary = {
  aiRole: string | null;
  coverageTier: "tier_1" | "tier_2" | "tier_3" | "baseline";
  id: string;
  name: string;
  primaryCategory: string;
  primaryCategorySlug: string;
  ticker: string;
};

export type CompanyDetail = CompanySummary & {
  description: string | null;
  exchange: string | null;
  secondaryCategories: Array<{
    name: string;
    slug: string;
  }>;
  sourceReference: string | null;
  website: string | null;
};

export type CompanyProduct = {
  name: string;
  productType: string;
  sourceReference: string | null;
};

export type CompanyRouteParams = {
  ticker: string;
};
