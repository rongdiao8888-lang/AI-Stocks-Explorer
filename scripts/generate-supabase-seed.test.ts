import { describe, expect, it } from "vitest";

import { buildSeedSql } from "./generate-supabase-seed";
import { tierOneCompanyTickers } from "../lib/config/company-universe";
import { tierOneProductCuration } from "../lib/config/tier-one-curation";

function readSeedRows(sql: string, seedName: string) {
  const start = sql.indexOf(`with ${seedName} as`);
  const jsonStart = sql.indexOf("$seed$", start) + "$seed$".length;
  const jsonEnd = sql.indexOf("$seed$", jsonStart);

  return JSON.parse(sql.slice(jsonStart, jsonEnd)) as unknown[];
}

describe("Supabase seed generator", () => {
  it("keeps the canonical company scope and category taxonomy in the SQL seed", () => {
    const sql = buildSeedSql();

    expect(readSeedRows(sql, "category_seed")).toHaveLength(10);
    expect(readSeedRows(sql, "company_seed")).toHaveLength(64);
    expect(readSeedRows(sql, "relationship_type_seed")).toHaveLength(12);
    expect(readSeedRows(sql, "product_seed")).toHaveLength(23);
    expect(readSeedRows(sql, "technology_seed")).toHaveLength(27);
    expect(readSeedRows(sql, "graph_edge_seed")).toHaveLength(120);
    expect(sql).toContain("insert into public.company_categories");
    expect(sql).toContain("insert into public.company_products");
    expect(sql).toContain("insert into public.knowledge_graph_edges");
    expect(sql).not.toContain("company-undefined");
  });

  it("keeps every Tier 1 product curation on an official source page", () => {
    expect([...new Set(tierOneProductCuration.map((product) => product.companyTicker))].sort()).toEqual([...tierOneCompanyTickers].sort());

    for (const product of tierOneProductCuration) {
      expect(product.sourceReference).toMatch(/^https:\/\//);
      expect(product.technologies.length).toBeGreaterThan(0);
    }
  });
});
