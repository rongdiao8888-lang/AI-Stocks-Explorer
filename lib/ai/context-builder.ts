import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createApprovedCompanyResearchContext } from "@/lib/ai/context";
import { getCompanyByTicker } from "@/lib/repositories/company-repository";
import { getOneHopGraphForCompany } from "@/lib/repositories/graph-repository";
import { listActiveProductsForCompany } from "@/lib/repositories/product-repository";
import { companyTickerSchema } from "@/lib/validation/identifiers";
import type { CompanyDetail } from "@/types/company";
import type { Database } from "@/types/database";

type DatabaseClient = SupabaseClient<Database>;

export type ApprovedCompanyResearchContextResult = {
  company: CompanyDetail;
  context: ReturnType<typeof createApprovedCompanyResearchContext>;
};

export async function getApprovedCompanyResearchContext(ticker: string, client?: DatabaseClient): Promise<ApprovedCompanyResearchContextResult | null> {
  const normalizedTicker = companyTickerSchema.parse(ticker);
  const company = await getCompanyByTicker(normalizedTicker, client);

  if (!company) {
    return null;
  }

  const [products, graph] = await Promise.all([
    listActiveProductsForCompany(company.id, client),
    getOneHopGraphForCompany({ companyId: company.id, maxEdges: 24 }, client),
  ]);

  return { company, context: createApprovedCompanyResearchContext({ company, graph, products }) };
}

export async function buildApprovedCompanyResearchContext(ticker: string, client?: DatabaseClient) {
  const result = await getApprovedCompanyResearchContext(ticker, client);

  return result?.context ?? null;
}
