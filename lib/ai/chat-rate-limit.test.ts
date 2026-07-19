import { describe, expect, it } from "vitest";

import { consumeAssistantRequest, resetAssistantRateLimits } from "./chat-rate-limit";

describe("assistant rate limit", () => {
  it("allows a bounded number of uncached requests per window", () => {
    resetAssistantRateLimits();
    const now = 1_000;

    for (let index = 0; index < 8; index += 1) {
      expect(consumeAssistantRequest("test-client", now).allowed).toBe(true);
    }

    const blocked = consumeAssistantRequest("test-client", now);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("opens a new window after ten minutes", () => {
    resetAssistantRateLimits();
    expect(consumeAssistantRequest("test-client", 1_000).allowed).toBe(true);
    expect(consumeAssistantRequest("test-client", 601_000).allowed).toBe(true);
  });
});
