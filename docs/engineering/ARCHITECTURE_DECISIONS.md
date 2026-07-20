# Architecture Decisions

Track major technical decisions for AI Stocks Explorer.

## Decisions

### AD-001: Establish a Next.js App Router foundation before product data

**Context:** The repository began as a documentation-only scaffold. The first milestone needed a deployable, typed web application without creating placeholder company facts that could later be mistaken for research data.

**Options Considered:**

* Build discovery and company pages with mocked company records.
* Create the full runtime foundation with clearly identified data-ready states.

**Outcome:** Use Next.js 15 with Server Components by default, responsive route placeholders, shared navigation, and error/loading boundaries. Database-backed product experiences begin only after verified seed data exists.

### AD-002: Keep Supabase configuration behind client factories

**Context:** Supabase is the approved data platform, but no database schema or project credentials are part of Milestone 1.

**Options Considered:**

* Query Supabase directly from future UI components.
* Establish server and browser client factories now, then add repository modules in Milestone 2.

**Outcome:** Supabase configuration is validated when a client is created. Future database access must use repository modules rather than direct component queries.

### AD-003: Establish a canonical MVP taxonomy and dataset

**Context:** Earlier PRD sections used inconsistent category names, treated descriptive focus labels as active secondary categories, and limited the seed scope to 24 companies. The supplied category source introduced a 64-row public-company universe but incorrectly described it as 74 companies.

**Options Considered:**

* Expand the MVP taxonomy to include all referenced future categories.
* Keep the approved 10-category product taxonomy and reconcile the source list into one current, exact company registry.

**Outcome:** The MVP uses 10 categories, 64 active public issuers, 12 Tier 1 companies, 50-60 products and technologies, and 100-120 high-confidence relationships. The source rows, rather than its incorrect 74-company headline, define the count. Its descriptive labels are stored as AI focus or `ai_role`, not secondary category assignments. Redis is excluded as private; HPE replaces acquired and delisted Juniper Networks. The canonical category labels are defined in `lib/config/site.ts` and mirrored in Part 4.

### AD-004: Use a deterministic, source-limited seed with public read-only RLS

**Context:** Milestone 2 needs a runnable database baseline, but the approved company source does not contain licensed market data, verified product records, or evidence for company-to-company relationships.

**Options Considered:**

* Fill every table with plausible demonstration values.
* Seed only the approved taxonomy, company registry, primary assignments, and relationship vocabulary, then leave unsupported records empty.

**Outcome:** `supabase/seed.sql` is generated from the canonical company registry and the Tier 1 curation registry. It seeds 10 categories, 64 companies, primary category assignments, 12 relationship types, 23 official-product records, 27 related technologies, and 120 high-confidence graph edges. Market data, financial metrics, AI content, and unsupported company-to-company relationships remain empty until verified sources are available. RLS permits public reads only for active, approved records and reserves writes, including AI cache persistence, for the server-only service-role client.

### AD-005: Use external Yahoo Finance links instead of in-app market data for the hackathon

**Context:** The hackathon needs a clear route to a company's price information without introducing paid market-data licensing, provider credentials, caching, or data-persistence responsibilities.

**Options Considered:**

* Display or cache provider-supplied market data.
* Link each company ticker to an external market-information page and keep market data outside the application.

**Outcome:** The hackathon renders a `Price` action that opens the supported ticker on Yahoo Finance. The application does not fetch, display, cache, or persist market prices, historical prices, or financial metrics. A future provider integration requires a new architecture decision and approved rights. See `MARKET_DATA_CONTRACT.md`.

### AD-006: Use Supabase for shared GPT assistant request limits

**Context:** The original assistant request limit lived in server memory. That works during local development but resets across serverless instances and cannot protect a public Vercel deployment consistently.

**Options Considered:**

* Keep the in-process limiter for deployment.
* Add Redis or another dedicated rate-limit service.
* Use a private Supabase table and an atomic PostgreSQL function.

**Outcome:** Use a service-role-only Supabase table and `consume_ai_assistant_rate_limit` function. The function serializes consumption for each hashed client key, preserves the eight-request-per-ten-minute policy, reports the retry time, and removes stale windows after 24 hours. This adds no new provider or dependency and keeps all public assistant requests behind the existing server-only boundary.

## Template

### Decision

TODO: Describe the decision.

### Context

TODO: Explain why this decision is needed.

### Options Considered

TODO: List the main options.

### Outcome

TODO: Record the selected option and rationale.
