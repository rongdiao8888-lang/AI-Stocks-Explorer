export function getYahooFinanceQuoteUrl(ticker: string): string {
  const yahooTicker = ticker.trim().toUpperCase().replaceAll(".", "-");

  return `https://finance.yahoo.com/quote/${encodeURIComponent(yahooTicker)}/`;
}
