import { loadEnvConfig } from "@next/env";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

import { generateCompanyResearchBundle } from "@/lib/ai/research-generation-service";

function describeContentState(content: { cached: boolean; record: { reviewStatus: string } }) {
  if (!content.cached) {
    return "generated a new draft";
  }

  return content.record.reviewStatus === "draft" ? "reused an existing draft" : "reused current approved research";
}

function parseArguments(args: string[]) {
  const [ticker, ...options] = args;

  if (!ticker || ticker.startsWith("-")) {
    throw new Error("Usage: npm run ai:generate -- <TICKER> [--regenerate]");
  }

  if (options.some((option) => option !== "--regenerate")) {
    throw new Error("Usage: npm run ai:generate -- <TICKER> [--regenerate]");
  }

  return { regenerate: options.includes("--regenerate"), ticker };
}

async function main() {
  loadEnvConfig(process.cwd());
  const result = await generateCompanyResearchBundle(parseArguments(process.argv.slice(2)));

  if (!result) {
    throw new Error("The requested active company was not found.");
  }

  if (result.thesis.record.reviewStatus === "approved" && result.research.record.reviewStatus === "approved") {
    process.stdout.write(`${result.company.name} (${result.company.ticker}) already has current approved research.\n`);
    process.stdout.write(`Current approved research already exists. Create a replacement draft with: npm run ai:generate -- ${result.company.ticker} --regenerate\n`);
    return;
  }

  process.stdout.write(`${result.company.name} (${result.company.ticker}) research is ready for review.\n`);
  process.stdout.write(`Thesis: ${describeContentState(result.thesis)}.\n`);
  process.stdout.write(`Research: ${describeContentState(result.research)}.\n`);
  process.stdout.write(`Review it with: npm run ai:review -- ${result.company.ticker}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "AI research draft generation could not be completed.";
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  });
}
