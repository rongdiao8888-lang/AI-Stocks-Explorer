import { describe, expect, it } from "vitest";

import { assistantRateLimitMaximumRequests, assistantRateLimitWindowSeconds } from "./chat-rate-limit";

describe("assistant rate limit", () => {
  it("keeps the approved eight-request, ten-minute policy", () => {
    expect(assistantRateLimitMaximumRequests).toBe(8);
    expect(assistantRateLimitWindowSeconds).toBe(600);
  });
});
