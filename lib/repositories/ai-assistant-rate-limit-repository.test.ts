import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";

import type { Database } from "@/types/database";

import { consumeAssistantRequest } from "./ai-assistant-rate-limit-repository";

function createSupabaseClientResponse(data: unknown) {
  const rpc = vi.fn().mockResolvedValue({ data, error: null });

  return {
    client: { rpc } as unknown as SupabaseClient<Database>,
    rpc,
  };
}

describe("shared assistant rate limit repository", () => {
  it("uses the Supabase rate-limit function with the approved window", async () => {
    const { client, rpc } = createSupabaseClientResponse([{ allowed: true, retry_after_seconds: 0 }]);

    await expect(consumeAssistantRequest("assistant:client-hash", client)).resolves.toEqual({
      allowed: true,
      retryAfterSeconds: 0,
    });
    expect(rpc).toHaveBeenCalledWith("consume_ai_assistant_rate_limit", {
      p_maximum_requests: 8,
      p_rate_limit_key: "assistant:client-hash",
      p_window_seconds: 600,
    });
  });

  it("returns the server-provided retry time when the request is limited", async () => {
    const { client } = createSupabaseClientResponse([{ allowed: false, retry_after_seconds: 91 }]);

    await expect(consumeAssistantRequest("assistant:client-hash", client)).resolves.toEqual({
      allowed: false,
      retryAfterSeconds: 91,
    });
  });

  it("rejects malformed keys and invalid database responses", async () => {
    const { client, rpc } = createSupabaseClientResponse([]);

    await expect(consumeAssistantRequest("x".repeat(129), client)).rejects.toThrow();
    expect(rpc).not.toHaveBeenCalled();
    await expect(consumeAssistantRequest("assistant:client-hash", client)).rejects.toThrow();
  });
});
