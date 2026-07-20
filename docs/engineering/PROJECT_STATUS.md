# AI Stocks Explorer

## Current Phase

Milestone 3 - Live Discovery Data Verified; Milestone 5 - Curated AI Research Complete; Milestone 7 - GPT Research Assistant Complete; Public Deployment Preparation Complete

## Completed

- Product Strategy
- PRD Part 1
- PRD Part 2
- PRD Part 3
- PRD Part 4
- PRD Part 5
- PRD Part 6
- CODEX_MASTER_PROMPT
- ENGINEERING_RULES
- Next.js 15 application foundation
- Shared application shell and responsive navigation
- Placeholder routes for discovery, company, ecosystem, comparison, and search
- Tailwind CSS, shadcn configuration, strict TypeScript, and linting setup
- Supabase client boundary and environment-variable example
- Local desktop and mobile validation
- Supabase CLI configuration
- Versioned initial database migration for the 14 approved core tables
- Row Level Security policies for approved public reads and server-only writes
- Typed Supabase clients and repository modules
- Deterministic SQL seed generator for 10 categories, 64 companies, and 12 relationship types
- Verified source registry for 23 Tier 1 products and 27 related technologies
- 120 high-confidence Knowledge Graph relationships: category, ownership, and product-technology links
- External `Price` action that opens the supported ticker on Yahoo Finance without collecting market data
- Data-ready company directory, category, explorer, ecosystem, company-detail, and catalog-search routes with disconnected states
- Category-based related-company navigation for both curated offline records and connected active records
- Company-page thesis, ecosystem-research, score, and disclaimer components that render only approved records
- Deterministic approved-data context builder, separate thesis and research schemas, and grounded prompt templates
- Server-only OpenAI structured generation with strict JSON schemas and one validation retry
- Versioned 30-day AI cache lookup and draft persistence through the Supabase service-role client
- Local draft-generation, review, approval, and credentials-verification commands
- Verified Supabase server access and OpenAI `gpt-5-mini` model access with rotated credentials
- Corrected NVIDIA's source role from `Networking` to `AI Compute & GPU Acceleration`
- Context-version freshness guard verified: stale approved NVIDIA research is hidden pending regeneration
- Advanced Micro Devices thesis and ecosystem research generated, reviewed, approved, and verified live
- AI prompt templates strengthened to reject generic speculative catalysts and risks that are absent from approved context
- NVIDIA thesis and ecosystem research regenerated with the corrected compute-and-GPU role, reviewed, approved, and verified live
- Alphabet thesis and ecosystem research generated, reviewed, approved, and verified live
- Microsoft thesis and ecosystem research reviewed, approved, and verified live
- Amazon thesis and ecosystem research reviewed, approved, and verified live
- Private thesis and ecosystem-research drafts generated for the remaining Tier 1 companies: Microsoft, Amazon, TSMC, Broadcom, Micron, Palantir, Snowflake, Arista Networks, and Tesla
- All 12 Tier 1 company thesis and ecosystem-research records approved and verified live
- Private thesis and ecosystem-research draft pairs generated for all 52 baseline companies before individual review and approval
- Baseline AI Infrastructure research approved and verified live for Qualcomm, Marvell Technology, Intel, Arm Holdings, and Astera Labs
- Baseline Memory & Storage research approved and verified live for Western Digital, Seagate Technology, Pure Storage, and NetApp
- Baseline Semiconductor Manufacturing & Equipment research approved and verified live for GlobalFoundries, ASML Holding, Applied Materials, Lam Research, KLA Corporation, and Tokyo Electron
- Baseline Networking & Optical Interconnect research approved and verified live for Cisco Systems, Hewlett Packard Enterprise, Ciena, Corning, Lumentum, and Coherent
- Baseline Cloud Platforms research approved and verified live for Oracle and IBM
- All 52 baseline-company AI thesis and ecosystem-research pairs approved and verified live
- Hosted Supabase apply and seed-verification commands, ready for a reviewed linked project
- Hosted Supabase project linked, initial migration applied, and deterministic seed verified live
- Live discovery, category, ecosystem, company-directory, search, and NVIDIA company-research route validation
- Seed, migration-contract, and identifier validation tests
- GPT Research Assistant with company-scoped approved context, streaming responses, suggested questions, input validation, prompt-injection rejection, rate limiting, and seven-day cached answers
- Live assistant verification for NVIDIA: streamed grounded response, cache hit on a repeated question, and blocked instruction-override request
- NVIDIA research page and assistant-panel validation at desktop and mobile viewports
- Refreshed the research-workspace visual system with the supplied AI Stocks Explorer logo, differentiated fact and AI-research surfaces, and a category-grouped AI Stocks List directory
- Added an AI Stocks List quick-browse dialog with simple category-grouped company and ticker links to company research pages
- Shared Supabase-backed assistant rate limit with atomic request consumption, server-only access, hashed client keys, and 24-hour stale-window cleanup
- Hosted assistant rate-limit verification: eight requests allowed and the ninth request rejected with a retry time
- Representative approved company-research route validation across all 10 categories: NVIDIA, ASML, Micron, Arista Networks, Microsoft, Snowflake, Palantir, Palo Alto Networks, ABB, and Tesla

## In Progress

Production deployment setup

## Next Tasks

1. Create a Vercel project from the connected GitHub repository and configure the approved environment variables there.
2. Verify the deployed application, Supabase reads, external Price links, and assistant rate limit on the public URL.
3. Use `npm run ai:generate -- <TICKER> --regenerate` only when a current approved record needs a deliberately reviewed replacement.

## Technical Debt

- Docker is still unavailable in this workspace, so local Supabase validation remains unavailable; the reviewed hosted project is the active database environment.
- Market prices, financial values, AI content, and company-to-company graph edges remain intentionally unseeded until their sources are verified.
- The current Tier 1 curation meets the 50-record MVP target with 23 products and 27 technologies; broader issuer coverage remains a future enrichment task.
- `PART_3_UX.md` is the documented UX equivalent, while some engineering documents reference `PART_3_UX_AND_INTERFACE_DESIGN.md`.
- Assistant rate-limit windows are cleaned up on the next uncached assistant request after 24 hours; a scheduled cleanup is unnecessary at hackathon traffic levels.

## Decisions Made

- Milestone 1 uses explicit foundation states instead of fabricated company or market data.
- Next.js App Router uses Server Components by default; only the mobile navigation is client-rendered.
- Supabase access is isolated behind server and browser client factories for later repository modules.
- The MVP uses 10 canonical categories, 64 supported companies, 12 Tier 1 companies, and 100-120 high-confidence relationships.
- Public database access is read-only through Row Level Security; cache writes require the server-only service-role client.
- The hackathon keeps market data outside the application; the `Price` action opens Yahoo Finance for the supported ticker.
- AI generation writes drafts only. Public company pages continue to show only approved, unexpired records through Row Level Security.
- Public AI research must match the current approved context version. A source-data update hides stale research until a new draft is reviewed and approved.
- Structured thesis and research generation remain local and review-gated. The public GPT assistant uses a narrow company-scoped endpoint with input validation, instruction-override rejection, request limits, and cached answers to protect the OpenAI budget.
- The GPT assistant request limit is enforced by a service-role-only Supabase function so it remains consistent across server instances during a public Vercel deployment.

## Deployment

Local development server and hosted Supabase verified. GitHub is connected. Public Vercel deployment is not started.

## Known Issues

- Tier 2 and Tier 3 coverage assignments still need confirmation.
- Local Supabase linting remains unavailable without Docker; the hosted migration and seed have been applied and verified.
- A hosted reseed reported success without refreshing NVIDIA's existing role field; the curated source file and hosted record are now aligned through a verified server-only update. Recheck broader hosted reseeds before relying on them for future corrections.

## Demo Readiness

The generated seed, repositories, external-price-link contract, discovery routes, approved AI research, shared assistant rate limiter, and company-scoped GPT assistant are live against the verified hosted Supabase project for all 64 curated companies. The project is ready for Vercel deployment.
