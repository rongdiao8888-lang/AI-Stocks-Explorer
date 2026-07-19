# AI Stocks Explorer

AI Stocks Explorer is a research-focused web application for understanding public companies that participate in the AI economy.

## Current Status

Milestone 2 has the versioned Supabase schema, deterministic seed workflow, and a verified graph layer. The seed contains the canonical 10-category taxonomy, 64 public companies, 23 Tier 1 product records, 27 technology records, and 120 high-confidence graph edges. Market prices, financial metrics, and unsupported company-to-company relationships remain absent by design.

## Requirements

* Node.js 22 or later
* npm 10 or later
* Docker Desktop for local Supabase validation, or a reviewed hosted Supabase project for remote application

## Local Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add only the credentials needed for the milestone being worked on.
3. Start the application with `npm run dev`.

## Validation

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Database Workflow

Milestone 2 uses versioned Supabase migrations and a deterministic seed generated from the canonical company registry.

```bash
npm run db:start
npm run db:apply-local
npm run db:lint
```

`npm run db:apply-local` regenerates `supabase/seed.sql`, applies the versioned migrations, and then loads the seed into the local Supabase stack. The generated seed includes the 10 AI categories, 64 active companies, primary category assignments, 12 relationship types, and verified Tier 1 products, technologies, and graph edges. It intentionally excludes market prices, financial metrics, and unsupported company-to-company graph edges.

Use the local Supabase credentials printed by `npm run db:start` only in `.env.local`. A hosted project must be linked and reviewed before migrations are applied remotely.

## Hosted Supabase Workflow

Use this path when Docker is unavailable. Start with a new or reviewed hosted Supabase project; the seed command updates the application-owned records in that project.

1. In the Supabase project dashboard, copy the project URL and publishable anon key into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Authenticate the local CLI with `npx supabase login`.
3. Link the reviewed project with `npx supabase link --project-ref <project-ref>`.
4. Apply the migration and generated seed with `npm run db:apply-remote`.
5. Confirm the live taxonomy, companies, products, technologies, relationship types, and graph edges with `npm run db:verify-remote`.

The application can use the public URL and anon key for its read-only discovery routes. Keep `SUPABASE_SERVICE_ROLE_KEY` unset until a server-only write or AI-caching workflow actually requires it.

The hackathon does not display in-app market data. Each company page provides a `Price` link that opens the relevant Yahoo Finance quote page without retrieving or storing third-party market data. See `docs/engineering/MARKET_DATA_CONTRACT.md`.

## Documentation

Product and engineering specifications live in `docs/`. Read the relevant PRD section plus `docs/engineering/ENGINEERING_RULES.md`, `docs/engineering/CODEX_MASTER_PROMPT.md`, and `docs/engineering/PROJECT_STATUS.md` before each milestone.

## Environment Variables

Use `.env.example` as the complete public list of required variable names. Never commit `.env.local` or server-only credentials.
