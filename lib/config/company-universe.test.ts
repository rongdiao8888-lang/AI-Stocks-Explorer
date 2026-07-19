import { describe, expect, it } from "vitest";

import { companySeedCount, companySeedUniverse, getCompanySeedByTicker, listRelatedCompanySeeds, tierOneCompanyTickers } from "./company-universe";
import { valueChainCategories } from "./site";

describe("company seed universe", () => {
  it("has 64 uniquely tickered companies across every active category", () => {
    expect(companySeedCount).toBe(64);
    expect(new Set(companySeedUniverse.map((company) => company.ticker)).size).toBe(companySeedCount);
    expect(new Set(companySeedUniverse.map((company) => company.primaryCategorySlug))).toEqual(
      new Set(valueChainCategories.map((category) => category.slug)),
    );
  });

  it("keeps the documented 12-company Tier 1 set in sync", () => {
    const tierOneTickers = companySeedUniverse
      .filter((company) => company.priority === "tier-1")
      .map((company) => company.ticker)
      .sort();

    expect(tierOneTickers).toEqual([...tierOneCompanyTickers].sort());
  });

  it("finds related companies through the same curated value-chain category", () => {
    const relatedCompanies = listRelatedCompanySeeds("NVDA");

    expect(relatedCompanies.map((company) => company.ticker)).toEqual(["AMD", "AVGO", "ARM", "ALAB"]);
    expect(relatedCompanies).not.toContainEqual(expect.objectContaining({ ticker: "NVDA" }));
    expect(relatedCompanies.every((company) => company.primaryCategorySlug === "ai-infrastructure")).toBe(true);
  });

  it("returns no fallback company or related companies for an unsupported ticker", () => {
    expect(getCompanySeedByTicker("UNKNOWN")).toBeUndefined();
    expect(listRelatedCompanySeeds("UNKNOWN")).toEqual([]);
  });
});
