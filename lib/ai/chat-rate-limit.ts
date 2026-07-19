const assistantRateLimitWindowMilliseconds = 10 * 60 * 1_000;
const assistantRateLimitMaximumRequests = 8;

type RateLimitEntry = {
  count: number;
  windowStartedAt: number;
};

type AssistantRateLimitStore = Map<string, RateLimitEntry>;

const globalRateLimitState = globalThis as typeof globalThis & {
  __aiStocksAssistantRateLimits?: AssistantRateLimitStore;
};

function getRateLimitStore() {
  globalRateLimitState.__aiStocksAssistantRateLimits ??= new Map();

  return globalRateLimitState.__aiStocksAssistantRateLimits;
}

export function consumeAssistantRequest(key: string, now = Date.now()) {
  const store = getRateLimitStore();
  const existing = store.get(key);

  if (!existing || now - existing.windowStartedAt >= assistantRateLimitWindowMilliseconds) {
    store.set(key, { count: 1, windowStartedAt: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= assistantRateLimitMaximumRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((assistantRateLimitWindowMilliseconds - (now - existing.windowStartedAt)) / 1_000)),
    };
  }

  existing.count += 1;
  store.set(key, existing);

  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetAssistantRateLimits() {
  getRateLimitStore().clear();
}
