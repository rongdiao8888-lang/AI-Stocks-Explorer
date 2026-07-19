import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

loadEnvConfig(process.cwd());

const publicSupabaseConfigSchema = z.object({
  anonKey: z.string().min(1),
  url: z.string().url(),
});

const expectedCounts = [
  { expected: 10, label: "active categories", table: "ai_categories" },
  { expected: 64, label: "active companies", table: "companies" },
  { expected: 12, label: "active relationship types", table: "relationship_types" },
  { expected: 23, label: "active company products", table: "company_products" },
  { expected: 27, label: "active technologies", table: "technologies" },
  { expected: 120, label: "high-confidence graph edges", table: "knowledge_graph_edges" },
] as const;

async function verifySeed() {
  const config = publicSupabaseConfigSchema.safeParse({
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  if (!config.success) {
    throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local before verifying the remote seed.");
  }

  const supabase = createClient(config.data.url, config.data.anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const results = await Promise.all(expectedCounts.map(async (check) => {
    let query = supabase.from(check.table).select("id", { count: "exact", head: true }).eq("is_active", true);

    if (check.table === "knowledge_graph_edges") {
      query = query.eq("confidence_level", "high");
    }

    const { count, error } = await query;

    if (error) {
      throw new Error(`Unable to count ${check.label}: ${error.message}`);
    }

    return { ...check, actual: count ?? 0 };
  }));

  const failures = results.filter((result) => result.actual !== result.expected);

  if (failures.length > 0) {
    const details = failures.map((result) => `${result.label}: expected ${result.expected}, found ${result.actual}`).join("; ");
    throw new Error(`Remote seed verification failed. ${details}`);
  }

  for (const result of results) {
    console.log(`Verified ${result.actual} ${result.label}.`);
  }
}

verifySeed().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Remote seed verification failed.";
  console.error(message);
  process.exitCode = 1;
});
