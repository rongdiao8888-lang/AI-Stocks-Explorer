import { describe, expect, it } from "vitest";

import { getYahooFinanceQuoteUrl } from "./yahoo-finance";

describe("getYahooFinanceQuoteUrl", () => {
  it("builds a Yahoo Finance quote link from a normalized ticker", () => {
    expect(getYahooFinanceQuoteUrl(" nvda ")).toBe("https://finance.yahoo.com/quote/NVDA/");
  });

  it("uses Yahoo Finance's dash notation for class-share tickers", () => {
    expect(getYahooFinanceQuoteUrl("BRK.B")).toBe("https://finance.yahoo.com/quote/BRK-B/");
  });
});
