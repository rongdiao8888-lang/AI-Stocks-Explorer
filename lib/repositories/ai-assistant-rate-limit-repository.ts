import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { assistantRateLimitMaximumRequests, assistantRateLimitWindowSeconds } from "@/lib/ai/chat-rate-limit";
import { throwOnRepositoryError } from "@/lib/repositories/errors";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

const rateLimitKeySchema = z.string().min(1).max(128);
const rateLimitResponseSchema = z.object({
  allowed: z.boolean(),
  retry_after_seconds: z.number().int().nonnegative(),
});

export type AssistantRateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export async function consumeAssistantRequest(
  key: string,
  supabase: SupabaseClient<Database> = createSupabaseAdminClient(),
): Promise<AssistantRateLimitResult> {
  const rateLimitKey = rateLimitKeySchema.parse(key);
  const { data, error } = await supabase.rpc("consume_ai_assistant_rate_limit", {
    p_maximum_requests: assistantRateLimitMaximumRequests,
    p_rate_limit_key: rateLimitKey,
    p_window_seconds: assistantRateLimitWindowSeconds,
  });

  throwOnRepositoryError(error, "Unable to check the assistant request limit.");

  const [result] = z.array(rateLimitResponseSchema).min(1).parse(data);

  return {
    allowed: result.allowed,
    retryAfterSeconds: result.retry_after_seconds,
  };
}
