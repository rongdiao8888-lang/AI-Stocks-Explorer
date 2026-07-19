import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { z } from "zod";

const configSchema = z.object({
  openAIKey: z.string().trim().min(1),
  openAIModel: z.string().trim().min(1).default("gpt-5-mini"),
  supabaseServiceRoleKey: z.string().trim().min(1),
  supabaseUrl: z.string().url(),
});

async function verifyServices() {
  loadEnvConfig(process.cwd());
  const config = configSchema.safeParse({
    openAIKey: process.env.OPENAI_API_KEY,
    openAIModel: process.env.OPENAI_MODEL,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });

  if (!config.success) {
    throw new Error("Set the server-only OpenAI and Supabase credentials in .env.local before verifying AI services.");
  }

  const supabase = createClient(config.data.supabaseUrl, config.data.supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const openAI = new OpenAI({ apiKey: config.data.openAIKey });
  const [databaseResult, model] = await Promise.all([
    supabase.from("companies").select("id", { count: "exact", head: true }).limit(1),
    openAI.models.retrieve(config.data.openAIModel),
  ]);

  if (databaseResult.error) {
    throw new Error("Supabase service access could not be verified.");
  }

  if (!model.id) {
    throw new Error("OpenAI model access could not be verified.");
  }

  process.stdout.write("Supabase server access verified.\n");
  process.stdout.write(`OpenAI model access verified for ${config.data.openAIModel}.\n`);
}

verifyServices().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "AI service verification could not be completed.";
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
