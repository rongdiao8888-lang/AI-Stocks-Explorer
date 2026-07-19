# # AI Stocks Explorer

# Product Requirements Document

## Part 6 — Development Roadmap, Hackathon Execution Plan & Future Vision

**Version:** 3.0
**Product:** AI Stocks Explorer
**Application Type:** Responsive web application
**Hackathon Duration:** Three days
**Status:** Implementation roadmap

## Current Hackathon Scope

The hackathon does not retrieve, persist, cache, or display in-app market prices, historical charts, or financial metrics. A company `Price` action opens the supported ticker on Yahoo Finance in a separate tab. This temporarily overrides the in-app market-data milestones below.

---

# 1. Purpose

This document defines how AI Stocks Explorer will be designed, built, tested, demonstrated, and deployed during the hackathon.

The roadmap is structured around the product’s three core intelligence layers:

1. **AI Investment Thesis**
   A concise AI-generated explanation of why a company matters within the AI ecosystem.

2. **AI Research Engine**
   A standardized research experience covering investment drivers, competitive advantages, growth catalysts, risks, products, customers, competitors, and ecosystem position.

3. **AI Knowledge Graph**
   A structured network connecting companies, products, technologies, suppliers, customers, partners, competitors, and AI value-chain categories.

The implementation plan must balance:

* Product differentiation
* Technical quality
* Demo readiness
* Scope discipline
* Data reliability
* AI safety
* Future extensibility

---

# 2. Product Delivery Philosophy

The hackathon objective is not to build every possible investing feature.

The objective is to build a polished and credible product that demonstrates a strong AI-native investment research experience.

The team should prioritize:

* One complete user journey over many unfinished features
* High-quality curated data over a large unreliable dataset
* Structured AI outputs over unrestricted chat
* A focused Knowledge Graph over a complex graph system
* Fast page performance over excessive functionality
* A strong live demo over hidden backend complexity
* Reusable architecture over hackathon-only shortcuts

The MVP should feel intentionally scoped rather than incomplete.

---

# 3. MVP Product Narrative

The hackathon build should tell one clear story:

> AI Stocks Explorer helps investors understand the companies building the AI economy through verified company records, an AI Knowledge Graph, standardized AI research, and GPT-powered follow-up analysis.

The primary user journey is:

```text
Discover an AI category
        │
        ▼
Select a company
        │
        ▼
Read the AI Investment Thesis
        │
        ▼
Review the AI Research Engine
        │
        ▼
Explore the AI Knowledge Graph
        │
        ▼
Open external price information
        │
        ▼
Ask the GPT Research Assistant
        │
        ▼
Continue to a related company
```

Every hackathon feature should support this journey.

---

# 4. MVP Scope

## 4.1 P0 Features

The following features are required for the hackathon MVP.

| Feature                  | Description                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Homepage                 | Product introduction, search, AI categories, and featured companies                                         |
| AI Value Chain Explorer  | Browse companies by their role in the AI ecosystem                                                          |
| Company Directory        | Searchable and filterable list of supported companies                                                       |
| Company Research Page    | Complete company-level investment research experience                                                       |
| AI Investment Thesis     | Concise structured research summary                                                                         |
| AI Research Engine       | Standardized investment analysis cards                                                                      |
| AI Knowledge Graph       | Interactive view of company, product, technology, supplier, customer, partner, and competitor relationships |
| AI Supply Chain Explorer | Investor-friendly interpretation of graph relationships                                                     |
| Historical Stock Chart   | Interactive stock-price history                                                                             |
| Financial Snapshot       | Selected market and financial metrics                                                                       |
| Related Companies        | Continue research across the ecosystem                                                                      |
| GPT Research Assistant   | Context-grounded follow-up questions                                                                        |
| Responsive Design        | Desktop-first experience that works on mobile browsers                                                      |
| Production Deployment    | Publicly accessible Vercel application                                                                      |

---

## 4.2 P1 Features

These features should be implemented only after all P0 functionality works reliably.

| Feature                    | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| Company Comparison         | Compare two to four companies                                        |
| Suggested GPT Questions    | Contextual prompts for each company                                  |
| Graph Relationship Filters | Filter suppliers, customers, competitors, products, and technologies |
| Search Autocomplete        | Instant company, ticker, product, and technology results             |
| Shareable Company URLs     | Stable company research links                                        |
| AI Research Regeneration   | Controlled refresh of cached content                                 |
| Basic Analytics            | Track page views, company views, and AI usage                        |

---

## 4.3 Out of Scope

The following features are intentionally excluded from the hackathon MVP:

* User authentication
* Watchlists
* Portfolio tracking
* Brokerage connections
* Trading functionality
* Real-time streaming quotes
* Personalized investment recommendations
* Price targets
* Buy, sell, or hold ratings
* Alerts
* Earnings calendar
* News aggregation
* Social features
* Subscription billing
* Native iOS application
* Native Android application
* Dedicated graph database
* Automated relationship extraction from the web
* Autonomous investment-research agents
* Advanced graph analytics

These features may appear in the future roadmap but should not distract from the core demo.

---

# 5. Hackathon Success Definition

The hackathon MVP is successful when a user can:

1. Open the homepage.
2. Understand the product within ten seconds.
3. Browse the AI value chain.
4. Search for a supported public company.
5. Open a company research page.
6. Read a clear AI Investment Thesis.
7. Review standardized AI Research Engine insights.
8. Explore the company’s Knowledge Graph.
9. Understand major suppliers, customers, products, technologies, and competitors.
10. Review historical stock performance.
11. Ask a company-specific question.
12. Receive a grounded GPT response based on structured context.
13. Navigate to another related company.
14. Complete the entire experience without broken states or confusing navigation.

---

# 6. Recommended Hackathon Dataset

The full product may eventually support hundreds or thousands of companies. The hackathon should use a smaller curated dataset.

## Recommended scope

* 64 supported companies with tiered coverage
* 10 AI value-chain categories
* 12 Tier 1 demo companies with the deepest relationship coverage
* 25–30 Tier 2 companies with full profiles, financial data, and lighter Knowledge Graphs
* Remaining Tier 3 companies with basic profiles, categorization, and related-company links
* 50–60 products and technologies
* 100–120 high-confidence Knowledge Graph relationships
* Historical chart data for Tier 1 and Tier 2 companies
* AI Investment Thesis and Research Engine content for Tier 1 companies

## Flagship demo companies

The strongest demo set should include companies with clear ecosystem relationships:

* NVIDIA
* AMD
* TSMC
* Micron
* Broadcom
* Arista Networks
* Microsoft
* Amazon
* Alphabet
* Palantir
* Snowflake
* Tesla

The remaining 52 companies provide breadth across all 10 categories. NVIDIA is the primary end-to-end demo company.

---

# 7. Development Workstreams

The hackathon implementation is divided into six workstreams.

## Workstream 1 — Product Foundation

Includes:

* Next.js project setup
* Repository structure
* Tailwind CSS
* shadcn/ui
* Supabase configuration
* Environment variables
* Shared layout
* Header and navigation
* TypeScript models
* Loading and error foundations
* Vercel deployment pipeline

---

## Workstream 2 — Data and Knowledge Graph

Includes:

* Database migrations
* AI categories
* Company seed data
* Primary and secondary categories
* Product and technology records
* Knowledge Graph nodes
* Knowledge Graph edges
* Relationship types
* AI Ecosystem Scores
* Market-data service boundary
* Historical chart data
* Data provenance fields

---

## Workstream 3 — Core Research Experience

Includes:

* Homepage
* Category pages
* Company directory
* Company header
* Financial snapshot
* Historical chart
* Related companies
* Company research page composition

---

## Workstream 4 — AI Intelligence Layer

Includes:

* AI Context Builder
* AI Investment Thesis schema
* AI Research Engine schema
* Prompt templates
* Structured output validation
* AI caching
* Safe fallback content
* Model and prompt versioning

---

## Workstream 5 — Knowledge Graph Experience

Includes:

* Graph API
* One-hop graph traversal
* React Flow integration
* Custom nodes and edges
* Relationship legend
* Relationship filtering
* Supply-chain summaries
* Clickable related-company nodes
* List fallback when graph rendering fails

---

## Workstream 6 — GPT Research Assistant

Includes:

* Company-scoped chat
* Suggested questions
* Prompt validation
* Context grounding
* Response streaming
* Rate limiting
* Response caching
* Missing-information behavior
* Investment-advice guardrails

---

# 8. Three-Day Execution Plan

# Day 1 — Foundation, Data Model and Core Pages

## Day 1 objective

Build the application foundation and establish the complete data flow from Supabase to the web interface.

## Morning

### Task 1: Initialize the project

* Create Next.js 15 application.
* Enable TypeScript.
* Configure Tailwind CSS.
* Install shadcn/ui.
* Install Supabase SDK.
* Install Zod.
* Install TradingView Lightweight Charts.
* Install React Flow.
* Install OpenAI SDK.
* Configure environment variables.
* Confirm local development works.
* Deploy an initial version to Vercel.

### Task 2: Create the architecture

Create:

* Application folders
* Shared types
* Repository modules
* Service modules
* Supabase clients
* Layout components
* Error boundaries
* Loading components

### Task 3: Create database migrations

Implement:

* `companies`
* `ai_categories`
* `company_categories`
* `market_data`
* `historical_prices`
* `financial_metrics`
* `company_products`
* `technologies`
* `knowledge_graph_nodes`
* `relationship_types`
* `knowledge_graph_edges`
* `company_ai_theses`
* `company_ai_research`
* `ai_prompt_cache`

## Afternoon

### Task 4: Seed curated data

Seed:

* AI categories
* 64 companies from the canonical scope registry
* Primary categories and descriptive AI-focus labels
* Products
* Technologies
* Ecosystem scores
* High-confidence graph relationships

Prioritize data completeness for Tier 1 companies rather than broad coverage.

### Task 5: Build basic pages

Create:

* Homepage
* Category page
* Company directory
* Company detail route
* Search route
* Placeholder comparison page
* Placeholder ecosystem page

### Task 6: Build company-page shell

Implement:

* Company header
* Category badges
* AI role
* Financial snapshot
* Historical chart placeholder
* AI thesis placeholder
* AI research placeholder
* Knowledge Graph placeholder
* GPT assistant placeholder

## End-of-day definition of done

By the end of Day 1:

* The project deploys successfully.
* Supabase is connected.
* Seed data is available.
* Homepage displays categories and companies.
* Category navigation works.
* Company pages load from database records.
* No company data is hardcoded inside page components.
* Core routes have loading and error states.
* The team can demonstrate one company page with real seeded data.

---

# Day 2 — AI Intelligence and Knowledge Graph

## Day 2 objective

Build the product’s differentiating features: AI Investment Thesis, AI Research Engine, and AI Knowledge Graph.

## Morning

### Task 1: Build the AI Context Builder

The Context Builder should retrieve:

* Company profile
* Categories
* Market data
* Financial metrics
* Products
* Technologies
* Knowledge Graph relationships
* Source metadata
* Missing-data indicators

Generate a stable context-version hash.

### Task 2: Implement AI Investment Thesis

Build:

* Versioned prompt
* Zod response schema
* OpenAI server workflow
* Cache lookup
* Cache persistence
* Safe fallback
* UI component

Generate or seed thesis content for all Tier 1 companies.

### Task 3: Implement AI Research Engine

Build standardized sections:

* Why This Company Matters
* Value-Chain Role
* Investment Drivers
* Competitive Advantages
* Growth Catalysts
* Key Risks
* Technology Position
* Customer Exposure
* Competitive Landscape
* Supply-Chain Influence
* AI Ecosystem Score Explanation

Use structured JSON and cached output.

## Afternoon

### Task 4: Implement Knowledge Graph services

Build:

* Graph repository
* Graph service
* One-hop traversal
* Optional two-hop traversal
* Node deduplication
* Edge deduplication
* Confidence filtering
* Node limits
* Graph transformation
* `/api/graph` endpoint

### Task 5: Implement Knowledge Graph UI

Build:

* React Flow canvas
* Company nodes
* Product nodes
* Technology nodes
* Category nodes
* Relationship edges
* Graph controls
* Relationship legend
* Clickable company nodes
* Empty and error states

### Task 6: Build AI Supply Chain Explorer

Translate graph data into investor-friendly sections:

* Suppliers
* Customers
* Manufacturing Partners
* Cloud Partners
* Products
* Technologies
* Competitors

This list-based view also serves as the fallback when the interactive graph is unavailable.

## End-of-day definition of done

By the end of Day 2:

* AI Investment Thesis displays on Tier 1 company pages.
* AI Research Engine displays standardized research.
* AI outputs are validated and cached.
* The Knowledge Graph loads for Tier 1 company pages.
* Graph nodes and relationships are interactive.
* Supply-chain relationships are understandable without using the graph.
* Unsupported relationships are not invented.
* At least one complete end-to-end company research experience works.

---

# Day 3 — GPT Assistant, Polish, Testing and Demo

## Day 3 objective

Complete the research journey, improve usability, eliminate demo risk, and prepare the submission.

## Morning

### Task 1: Implement GPT Research Assistant

Build:

* Company-specific question input
* Suggested questions
* Zod validation
* Context retrieval
* Knowledge Graph retrieval
* OpenAI response streaming
* Cache lookup
* Rate limiting
* Safe failure behavior
* Guardrail messaging

### Task 2: Complete historical charts

Implement:

* 1 month
* 6 months
* 1 year
* 3 years
* 5 years
* Maximum available history
* Hover tooltips
* Loading state
* Missing-data state

### Task 3: Complete global search

Support:

* Company name
* Ticker
* Category
* Product
* Technology

Prioritize exact ticker matches.

## Afternoon

### Task 4: UI polish

Review:

* Typography
* Spacing
* Page hierarchy
* Responsive layouts
* Empty states
* Loading skeletons
* Error states
* Card consistency
* Accessibility
* Graph readability
* Chart readability
* Mobile browser support

### Task 5: Performance optimization

Apply:

* Parallel data fetching
* Dynamic imports
* Lazy-loaded charts
* Lazy-loaded Knowledge Graph
* Database indexes
* Cache checks
* Image optimization
* Reduced response payloads

### Task 6: Testing

Run:

* Critical-path manual testing
* Browser testing
* Mobile-responsive testing
* Graph interaction testing
* GPT safety testing
* Invalid-ticker testing
* Missing-data testing
* API-error testing
* Production-environment testing

### Task 7: Demo preparation

Prepare:

* Demo company
* Backup demo company
* Pre-generated AI research
* Stable graph data
* Suggested GPT questions
* Backup screenshots or recorded demo
* Submission description
* Architecture diagram
* Product screenshots
* Repository README

## End-of-day definition of done

By the end of Day 3:

* The production application is publicly accessible.
* The complete demo journey works.
* AI content is pre-generated and cached.
* The graph loads consistently.
* The GPT assistant responds from structured context.
* Major UI and API errors are resolved.
* The application works on desktop and mobile browsers.
* Demo data is stable.
* The submission materials are complete.

---

# 9. Implementation Milestones for Codex

The project should be implemented through small, controlled prompts rather than one large request.

## Milestone 1 — Project Foundation

Deliver:

* Next.js setup
* Dependencies
* Folder structure
* Shared layout
* Navigation
* Design system
* Supabase configuration
* Environment examples
* Vercel-ready project
* Placeholder routes

Codex must not implement business logic during this milestone.

---

## Milestone 2 — Database and Seed Data

Deliver:

* SQL migrations
* TypeScript database types
* Repository modules
* Seed scripts
* Categories
* Companies
* Products
* Technologies
* Knowledge Graph relationships
* AI research cache tables

Codex should document how to run migrations and seed data.

---

## Milestone 3 — Discovery Experience

Deliver:

* Homepage
* Category cards
* Company table
* Company search
* Category pages
* Company routes
* Responsive layouts

No OpenAI integration is required during this milestone.

---

## Milestone 4 — Company Research Page

Deliver:

* Company header
* AI role
* Ecosystem score
* Financial snapshot
* Historical chart
* Related companies
* Research-page layout
* Loading and error states

Use seeded or mocked AI content temporarily.

---

## Milestone 5 — AI Investment Thesis and Research Engine

Deliver:

* Context Builder
* Prompt templates
* Zod schemas
* OpenAI integration
* Cache system
* AI thesis API
* AI research API
* Research UI components
* Safe fallbacks

Codex must not allow client-side OpenAI calls.

---

## Milestone 6 — AI Knowledge Graph

Deliver:

* Graph repository
* Graph traversal
* Graph endpoint
* React Flow visualization
* Relationship filters
* Supply-chain list
* Clickable related-company navigation
* Error fallback

Limit the MVP to one-hop traversal by default.

---

## Milestone 7 — GPT Research Assistant

Deliver:

* Chat API
* Suggested questions
* Streaming response
* Scoped context
* Input validation
* Response caching
* Guardrails
* Rate limiting
* Chat UI

---

## Milestone 8 — Testing and Production Readiness

Deliver:

* Critical tests
* Error-state review
* Performance review
* Accessibility review
* Responsive review
* Production deployment
* README
* Demo instructions
* Known-issues documentation

---

# 10. Codex Execution Rules

Before each implementation milestone, Codex must read:

* `docs/engineering/ENGINEERING_RULES.md`
* `docs/engineering/CODEX_MASTER_PROMPT.md`
* The relevant PRD section
* `docs/engineering/PROJECT_STATUS.md`

Each task prompt should contain:

1. Objective
2. Relevant product context
3. In-scope requirements
4. Out-of-scope requirements
5. Required files
6. Acceptance criteria
7. Validation commands
8. Expected completion report

Codex should not receive the entire product implementation in one prompt.

---

# 11. Project Status Tracking

Maintain:

```text
docs/engineering/PROJECT_STATUS.md
```

Recommended structure:

```markdown
# AI Stocks Explorer — Project Status

## Current Phase

## Completed

## In Progress

## Next Tasks

## Known Issues

## Technical Debt

## Decisions Made

## Deployment Status

## Demo Readiness
```

Update this file after every milestone.

---

# 12. Prioritization Framework

When time becomes constrained, use the following priority order:

1. Company page loads reliably.
2. AI Investment Thesis displays.
3. AI Research Engine displays.
4. Knowledge Graph displays.
5. Historical chart works.
6. GPT Research Assistant works.
7. Search works.
8. Category navigation works.
9. Comparison works.
10. Additional visual polish.

Do not sacrifice core reliability to complete P1 features.

---

# 13. Scope Reduction Plan

If the project falls behind schedule, reduce scope in this order.

## First reduction

Remove:

* Company comparison
* Advanced search filters
* Two-hop graph traversal
* Graph animations
* Manual AI regeneration controls

## Second reduction

Reduce:

* Tier 2 full profiles from 25–30 to 16
* Tier 3 companies to basic profiles and related-company links only
* Relationship types
* Chart ranges
* Research-engine sections
* Suggested GPT questions

## Third reduction

Use:

* Pre-generated AI thesis
* Pre-generated research reports
* Seeded historical data
* One Tier 1 graph experience
* Five complete demonstration companies

## Features that should remain

Do not remove:

* Homepage
* Company page
* AI Investment Thesis
* AI Research Engine
* Knowledge Graph or supply-chain relationships
* Historical performance
* GPT follow-up experience
* Production deployment

These features define the product.

---

# 14. Testing Strategy

## 14.1 Unit Testing

Test high-value business logic:

* Context generation
* Graph transformation
* Graph traversal limits
* Cache-key generation
* AI schema validation
* Search ranking
* Market-data normalization
* Input validation

---

## 14.2 Integration Testing

Test:

* Company repository
* Category repository
* Graph repository
* External price-link utility
* AI cache
* AI thesis endpoint
* AI research endpoint
* GPT chat endpoint

OpenAI responses should be mocked where practical.

---

## 14.3 End-to-End Testing

Critical path:

```text
Homepage
  → Category
  → Company page
  → AI thesis
  → AI research
  → Knowledge Graph
  → Historical chart
  → GPT question
  → Related company
```

At least one test or manual checklist must cover this complete flow.

---

# 15. AI Quality Testing

Test the AI system for:

* Unsupported customer claims
* Unsupported supplier claims
* Incorrect financial metrics
* Investment recommendations
* Price targets
* Guaranteed outcomes
* Prompt injection
* Missing data
* Invalid company tickers
* Contradictory graph relationships
* Excessively long answers
* Invalid JSON
* Inconsistent structure

The model should state that information is unavailable rather than inventing an answer.

---

# 16. Knowledge Graph Quality Testing

Validate:

* Every edge connects valid nodes.
* Directional relationships use the correct direction.
* Inverse labels are correct.
* Competitor relationships are symmetric when applicable.
* Inactive relationships are excluded.
* Duplicate edges are removed.
* Low-confidence edges are hidden by default.
* Company nodes link to valid company pages.
* The graph remains readable within node limits.

---

# 17. Demo Strategy

The demonstration should focus on one clear company journey.

## Recommended demo company

**NVIDIA**

It provides a strong demonstration because it connects to:

* Semiconductor manufacturing partners
* Memory suppliers
* Networking
* Cloud providers
* AI software
* Products
* Technologies
* Competitors

## Backup demo companies

* Microsoft
* TSMC
* Broadcom
* Micron
* Palantir

---

# 18. Recommended Demo Script

## Step 1 — Introduce the problem

> AI investors can find stock prices almost anywhere, but understanding how AI companies fit together still requires hours of fragmented research.

## Step 2 — Introduce the solution

> AI Stocks Explorer organizes public companies across the AI value chain and combines verified market data, structured AI research, and an AI Knowledge Graph.

## Step 3 — Show discovery

Open the homepage and select AI Infrastructure.

Explain that companies are organized by their functional role in the AI economy rather than only by traditional sectors.

## Step 4 — Open NVIDIA

Show:

* Company overview
* AI category
* AI role
* AI Ecosystem Score
* Financial snapshot

## Step 5 — Show AI Investment Thesis

Explain:

> The thesis gives investors a concise explanation of why the company matters, its growth drivers, competitive advantages, catalysts, and risks.

## Step 6 — Show AI Research Engine

Highlight:

* Why This Company Matters
* Technology Position
* Competitive Advantages
* Risks
* Supply-Chain Influence

## Step 7 — Show AI Knowledge Graph

Demonstrate:

* TSMC manufacturing relationship
* Memory-supplier relationships
* Cloud-customer relationships
* Product nodes
* Competitors

Explain:

> GPT is not reasoning from a blank prompt. It receives structured company and ecosystem context from the Knowledge Graph.

## Step 8 — Show historical performance

Change the chart period and explain how financial performance complements the qualitative AI research.

## Step 9 — Ask GPT a question

Suggested question:

> What are NVIDIA’s biggest supply-chain risks?

The response should reference structured supplier and manufacturing relationships.

## Step 10 — Navigate to a related company

Select TSMC or Micron from the graph and continue the research journey.

## Step 11 — Close with the vision

> AI Stocks Explorer transforms disconnected stock data into an understandable map of the public AI economy.

---

# 19. Demo Risk Management

Before presenting:

* Pre-generate AI thesis content.
* Pre-generate research reports.
* Cache common GPT responses when permitted.
* Confirm Knowledge Graph records.
* Test the live Vercel deployment.
* Keep a second browser tab ready.
* Prepare a backup company.
* Record a short fallback demo.
* Capture screenshots of critical pages.
* Avoid depending on real-time AI generation for the core presentation.

The live demo should demonstrate the product, not test the infrastructure.

---

# 20. Launch Checklist

## Product

* Homepage communicates value quickly.
* Categories are understandable.
* Search returns correct companies.
* Company pages are complete.
* Thesis content is readable.
* Research cards are consistent.
* Graph relationships are useful.
* Charts work.
* GPT responses are grounded.
* Disclaimers are visible.

## Engineering

* Production build passes.
* TypeScript checks pass.
* Environment variables are configured.
* Database migrations are applied.
* Seed data is verified.
* API routes are validated.
* Secrets remain server-side.
* Error states work.
* Logs are accessible.
* Vercel deployment is stable.

## Data

* Tickers are accurate.
* Category assignments are reviewed.
* Product names are accurate.
* Graph relationships are verified.
* AI scores are labeled correctly.
* Source timestamps are present where needed.
* No unsupported claims appear in cached AI content.

## Demo

* Primary demo path works.
* Backup demo path works.
* Suggested questions are ready.
* Demo timing is rehearsed.
* Screenshots are available.
* Submission description is complete.
* README is current.

---

# 21. Hackathon Success Metrics

Because the hackathon may not provide enough time for meaningful growth metrics, success should be evaluated through product and technical milestones.

## Product completion metrics

* 64 supported companies
* 10 AI categories
* 12 complete Tier 1 company pages
* 100–120 curated Knowledge Graph edges
* AI thesis coverage for supported companies
* AI research coverage for supported companies
* Historical charts for supported companies
* One complete GPT research flow

## Experience metrics

* Homepage communicates the product in under ten seconds.
* Company pages display cached research in under 2.5 seconds.
* Knowledge Graph loads in under 1.5 seconds.
* Cached AI content loads in under 500 milliseconds.
* Search responds in under 300 milliseconds.
* GPT streaming begins within approximately three seconds.

## Quality metrics

* No client-side secret exposure
* No authoritative financial facts generated by GPT
* No broken links in the demo path
* No invalid graph relationships in Tier 1 company pages
* No unhandled production errors in the main user journey

---

# 22. Post-Hackathon Roadmap

# Phase 2 — Product Completion

**Target:** First one to two months after the hackathon

Focus:

* Expand to 75–100 companies
* Improve data provenance
* Add user authentication
* Add watchlists
* Add saved companies
* Add richer company comparison
* Add graph filters
* Add news and earnings context
* Improve AI score methodology
* Improve mobile web experience
* Add feedback collection
* Add AI research version history

---

# Phase 3 — Personalization and Portfolio Intelligence

**Target:** Two to six months

Potential capabilities:

* Portfolio holdings
* AI exposure analysis
* Value-chain concentration
* Supplier-risk exposure
* Category diversification
* Personalized company discovery
* Portfolio Knowledge Graph
* Watchlist summaries
* Earnings alerts
* AI-generated portfolio research
* Risk and overlap visualization

The platform should remain an educational and research product rather than providing personalized investment advice.

---

# Phase 4 — AI Ecosystem Intelligence Platform

**Target:** Six to twelve months

Potential capabilities:

* Hundreds or thousands of public companies
* Private AI companies
* AI model relationships
* Data-center infrastructure relationships
* Expanded international listings
* Automated source ingestion
* Human-reviewed graph updates
* Knowledge Graph search
* Multi-hop ecosystem exploration
* Company-event timelines
* Industry-level research
* API access
* Institutional research tools

---

# Phase 5 — Advanced Knowledge Graph

A dedicated graph database may be evaluated when the product requires:

* Complex multi-hop queries
* Large-scale relationship analysis
* Graph recommendation algorithms
* Centrality analysis
* Supplier-concentration calculations
* Ecosystem dependency scoring
* Real-time graph updates
* Tens or hundreds of thousands of entities

Until those requirements exist, Supabase PostgreSQL should remain the graph store.

---

# 23. Future Business Model

Possible monetization models include:

## Free tier

* AI company discovery
* Basic company pages
* Limited Knowledge Graph
* Basic charts
* Limited GPT questions

## Premium individual tier

* Full AI research reports
* Expanded Knowledge Graph
* Company comparison
* Watchlists
* Portfolio analysis
* Earnings summaries
* Higher GPT limits

## Professional tier

* Advanced research tools
* Exportable reports
* Custom screeners
* Team workspaces
* API access
* Institutional Knowledge Graph
* Research monitoring

The hackathon MVP should not implement payments.

---

# 24. Key Product Risks

| Risk                                    | Impact                                | Mitigation                             |
| --------------------------------------- | ------------------------------------- | -------------------------------------- |
| Scope becomes too large                 | Product remains unfinished            | Strict P0 prioritization               |
| Knowledge Graph data is inaccurate      | User trust declines                   | Curated high-confidence relationships  |
| AI generates unsupported facts          | Research becomes unreliable           | Structured context and validation      |
| Market data is unavailable              | Financial sections fail               | Cached or seeded fallback data         |
| Graph becomes visually confusing        | Users cannot understand relationships | One-hop default and node limits        |
| Company coverage is too broad           | Incomplete research pages             | Smaller complete dataset               |
| GPT latency hurts the demo              | Presentation stalls                   | Cached research and prepared questions |
| UI polish is delayed                    | Product feels unfinished              | Reusable components and focused pages  |
| Team attempts native mobile development | Core web app suffers                  | Web-only hackathon scope               |

---

# 25. Final Priorities

The development team should follow this priority hierarchy:

## Priority 1 — Trust

* Accurate company data
* Verified relationships
* Clear AI limitations
* No invented facts

## Priority 2 — Core experience

* Discovery
* Company research
* Investment Thesis
* Research Engine
* Knowledge Graph
* Historical performance
* GPT follow-up

## Priority 3 — Performance

* Fast initial rendering
* Cached AI content
* Lazy-loaded graph
* Responsive search

## Priority 4 — Polish

* Visual consistency
* Responsive layouts
* Smooth interactions
* Clear empty and error states

## Priority 5 — Expansion

* Comparison
* Additional companies
* Additional graph depth
* User features

---

# 26. Definition of Done

The hackathon project is complete when:

1. The application is deployed publicly.
2. The homepage explains the product clearly.
3. Users can browse AI categories.
4. Users can search supported companies.
5. Company pages load from structured database records.
6. AI Investment Thesis content is displayed.
7. AI Research Engine content is displayed.
8. The Knowledge Graph shows verified ecosystem relationships.
9. The AI Supply Chain Explorer provides a readable relationship summary.
10. Historical charts work.
11. GPT answers company-specific questions using structured context.
12. GPT does not invent missing financial facts or relationships.
13. Core data and AI outputs are cached.
14. Loading, empty, and error states exist.
15. The application works on desktop and mobile browsers.
16. The demo path has been tested in production.
17. A backup demo is available.
18. Database migration and seed instructions are documented.
19. Repository documentation is current.
20. The product can be demonstrated in three to five minutes.

---

# 27. North Star Roadmap

The roadmap should move AI Stocks Explorer through four product stages:

```text
Stage 1
AI company discovery
        │
        ▼
Stage 2
Structured AI investment research
        │
        ▼
Stage 3
AI ecosystem and supply-chain intelligence
        │
        ▼
Stage 4
Personalized portfolio and market intelligence
```

The hackathon MVP should fully demonstrate Stages 1 through 3 at a focused scale.

The long-term goal is:

> **Build the most understandable and trusted intelligence platform for researching the public companies powering the AI economy.**
