import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const migration = readFileSync(resolve(process.cwd(), "supabase/migrations/20260719090000_ai_assistant_rate_limits.sql"), "utf8");

describe("assistant rate-limit migration", () => {
  it("uses a private, row-level-security-protected shared store", () => {
    expect(migration).toContain("create table public.ai_assistant_rate_limits");
    expect(migration).toContain("alter table public.ai_assistant_rate_limits enable row level security");
    expect(migration).toContain("revoke all on public.ai_assistant_rate_limits from anon, authenticated");
    expect(migration).toContain("grant all on public.ai_assistant_rate_limits to service_role");
  });

  it("serializes consumption and restricts the database function to the server role", () => {
    expect(migration).toContain("pg_advisory_xact_lock");
    expect(migration).toContain("security definer");
    expect(migration).toContain("revoke all on function public.consume_ai_assistant_rate_limit(text, integer, integer) from public");
    expect(migration).toContain("grant execute on function public.consume_ai_assistant_rate_limit(text, integer, integer) to service_role");
  });
});
