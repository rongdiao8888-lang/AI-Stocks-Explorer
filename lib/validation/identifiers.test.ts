import { describe, expect, it } from "vitest";

import { categorySlugSchema, companyTickerSchema, paginationSchema } from "./identifiers";

describe("database query identifiers", () => {
  it("normalizes tickers and accepts the canonical category slugs", () => {
    expect(companyTickerSchema.parse(" nvda ")).toBe("NVDA");
    expect(categorySlugSchema.parse("semiconductor-manufacturing-equipment")).toBe("semiconductor-manufacturing-equipment");
  });

  it("bounds pagination before it reaches a repository", () => {
    expect(paginationSchema.parse({})).toEqual({ limit: 50, offset: 0 });
    expect(() => paginationSchema.parse({ limit: 101 })).toThrow();
  });
});
