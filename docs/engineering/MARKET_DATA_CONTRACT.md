# External Price Link Contract

## Decision

The hackathon build does not retrieve, persist, cache, or display market prices, historical price data, or financial metrics. There is no market-data provider, API key, or server-side market-data service in this scope.

## Price Action

Each company research page exposes a `Price` action that opens the company ticker's Yahoo Finance quote page in a new tab. The application constructs this link locally from the supported ticker and does not proxy, scrape, transform, or store any Yahoo Finance data.

```text
https://finance.yahoo.com/quote/{TICKER}/
```

For class-share tickers, the link uses Yahoo Finance's dash notation, such as `BRK-B`.

## Future Change

Any future in-app market-data feature requires a new provider decision, confirmed display and redistribution rights, a server-only integration, and a reviewed data-persistence plan.
