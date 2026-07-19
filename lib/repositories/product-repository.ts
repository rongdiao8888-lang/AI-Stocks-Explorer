import "server-only";

import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";

import { throwOnRepositoryError } from "@/lib/repositories/errors";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CompanyProduct } from "@/types/company";
import type { Database } from "@/types/database";

const companyIdSchema = z.string().uuid();

type CompanyProductRecord = {
  product_name: string;
  product_type: string;
  source_reference: string | null;
};

type DatabaseClient = SupabaseClient<Database>;

export async function listActiveProductsForCompany(companyId: string, client?: DatabaseClient): Promise<CompanyProduct[]> {
  const normalizedCompanyId = companyIdSchema.parse(companyId);
  const supabase = (client ?? await createSupabaseServerClient()) as DatabaseClient;
  const { data, error } = await supabase
    .from("company_products")
    .select("product_name, product_type, source_reference")
    .eq("company_id", normalizedCompanyId)
    .eq("is_active", true)
    .order("product_name", { ascending: true })
    .overrideTypes<CompanyProductRecord[], { merge: false }>();

  throwOnRepositoryError(error, "Unable to retrieve company products.");

  return (data ?? []).map((product) => ({
    name: product.product_name,
    productType: product.product_type,
    sourceReference: product.source_reference,
  }));
}
