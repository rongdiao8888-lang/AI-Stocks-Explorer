import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const migration = readFileSync(resolve(process.cwd(), "supabase/migrations/20260718200302_initial_schema.sql"), "utf8");

const requiredTables = [
  "ai_categories",
  "companies",
  "company_categories",
  "market_data",
  "historical_prices",
  "financial_metrics",
  "company_products",
  "technologies",
  "knowledge_graph_nodes",
  "relationship_types",
  "knowledge_graph_edges",
  "company_ai_theses",
  "company_ai_research",
  "ai_prompt_cache",
];

describe("initial Supabase migration", () => {
  it("creates the approved data model and enables RLS on every table", () => {
    for (const table of requiredTables) {
      expect(migration).toContain(`create table public.${table}`);
      expect(migration).toContain(`alter table public.${table} enable row level security`);
    }
  });

  it("keeps anonymous access read-only", () => {
    expect(migration).toContain("revoke all privileges on all tables in schema public from anon, authenticated");
    expect(migration).not.toContain("for insert to anon, authenticated");
    expect(migration).not.toContain("for update to anon, authenticated");
    expect(migration).not.toContain("for delete to anon, authenticated");
  });
});
