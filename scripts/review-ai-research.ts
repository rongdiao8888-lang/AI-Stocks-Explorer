import { loadEnvConfig } from "@next/env";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

import { getApprovedCompanyResearchContext } from "@/lib/ai/context-builder";
import { approveLatestCompanyAiDrafts, getLatestCompanyAiDrafts } from "@/lib/repositories/ai-generation-repository";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function parseArguments(args: string[]) {
  const [ticker, ...options] = args;

  if (!ticker || ticker.startsWith("-")) {
    throw new Error("Usage: npm run ai:review -- <TICKER> [--approve]");
  }

  if (options.some((option) => option !== "--approve")) {
    throw new Error("Usage: npm run ai:review -- <TICKER> [--approve]");
  }

  return { approve: options.includes("--approve"), ticker };
}

async function main() {
  loadEnvConfig(process.cwd());
  const { approve, ticker } = parseArguments(process.argv.slice(2));
  const admin = createSupabaseAdminClient();
  const approvedContext = await getApprovedCompanyResearchContext(ticker, admin);

  if (!approvedContext) {
    throw new Error("The requested active company was not found.");
  }

  const drafts = await getLatestCompanyAiDrafts(approvedContext.company.id);

  if (!drafts.thesis || !drafts.research) {
    throw new Error("No complete AI draft is waiting for review. Generate one first.");
  }

  if (!approve) {
    process.stdout.write(`${approvedContext.company.name} (${approvedContext.company.ticker}) AI draft\n\n`);
    process.stdout.write(`Investment thesis\n${JSON.stringify(drafts.thesis.output, null, 2)}\n\n`);
    process.stdout.write(`Ecosystem research\n${JSON.stringify(drafts.research.output, null, 2)}\n\n`);
    process.stdout.write(`After reviewing every statement against the approved context, approve with:\nnpm run ai:review -- ${approvedContext.company.ticker} --approve\n`);
    return;
  }

  const approved = await approveLatestCompanyAiDrafts(approvedContext.company.id);
  process.stdout.write(`Approved the AI thesis (${approved.thesisId}) and ecosystem research (${approved.researchId}) for ${approvedContext.company.ticker}.\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "AI research review could not be completed.";
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  });
}
