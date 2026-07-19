# AI Stocks Explorer

# ENGINEERING RULES

# 1. Purpose

This document defines the mandatory engineering rules for AI Stocks Explorer.

These rules apply to every coding task, milestone, refactor, database change, AI workflow, API route, and deployment.

The purpose of this document is to ensure the application remains:

* Reliable
* Secure
* Maintainable
* Strongly typed
* AI-grounded
* Data-driven
* Accessible
* Responsive
* Demo-ready

These rules are mandatory unless the user explicitly approves an exception.

---

# 2. Required Reading

Before starting any implementation task, read:

```text
docs/engineering/ENGINEERING_RULES.md
docs/engineering/CODEX_MASTER_PROMPT.md
docs/engineering/PROJECT_STATUS.md
```

Also read the PRD section relevant to the assigned work:

```text
docs/strategy/PART_0_PRODUCT_STRATEGY.md
docs/prd/PART_1_PRODUCT_VISION.md
docs/prd/PART_2_PRODUCT_REQUIREMENTS.md
docs/prd/PART_3_UX_AND_INTERFACE_DESIGN.md
docs/prd/PART_4_DATA_ARCHITECTURE.md
docs/prd/PART_5_TECHNICAL_ARCHITECTURE.md
docs/prd/PART_6_DEVELOPMENT_ROADMAP.md
```

Do not implement a major feature without reviewing its requirements.

---

# 3. Source-of-Truth Order

When instructions conflict, follow this priority order:

1. Most recent explicit user instruction
2. `ENGINEERING_RULES.md`
3. Relevant PRD section
4. `CODEX_MASTER_PROMPT.md`
5. `ARCHITECTURE_DECISIONS.md`
6. Existing established code patterns
7. Engineering judgment

Do not silently ignore conflicts.

Document meaningful conflicts and resolutions in:

```text
docs/engineering/PROJECT_STATUS.md
```

---

# 4. Product Architecture Principle

All engineering decisions must support this model:

```text
Structured data provides facts
            │
            ▼
Knowledge Graph provides relationships
            │
            ▼
GPT provides explanation and synthesis
```

GPT is not the authoritative source of:

* Market data
* Financial metrics
* Products
* Technologies
* Customers
* Suppliers
* Partners
* Competitors
* Company relationships
* Historical prices

These facts must come from approved structured sources.

---

# 5. Approved Technology Stack

Use the approved stack unless the user explicitly authorizes a change.

## Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Table
* TradingView Lightweight Charts
* React Flow
* Lucide React
* Framer Motion only for restrained, useful motion

## Backend

* Next.js Route Handlers
* Next.js Server Components
* Next.js Server Actions where appropriate
* Supabase PostgreSQL
* Supabase JavaScript SDK
* OpenAI SDK
* Zod

## Infrastructure

* Vercel
* Supabase
* GitHub
* Vercel Analytics
* Vercel logs or Sentry

Do not add a new framework, database, state-management library, or infrastructure service without a clear requirement.

---

# 6. Layered Architecture

The application must follow this structure:

```text
Presentation
    ↓
Application
    ↓
Domain and Services
    ↓
Repositories
    ↓
External Systems
```

## Presentation layer

May contain:

* Pages
* Layouts
* Components
* Forms
* Charts
* Graph visualization
* Loading states
* Empty states
* Error states
* Responsive behavior

Must not contain:

* Raw Supabase queries
* Direct OpenAI calls
* Third-party market-data retrieval
* Complex business logic
* AI prompt construction
* Graph traversal logic

---

## Application layer

Responsible for:

* Page-level orchestration
* Feature workflows
* Data composition
* API request handling
* Service coordination

---

## Domain and service layer

Responsible for:

* AI Context Builder
* AI prompt construction
* AI response validation
* Knowledge Graph traversal
* Relationship filtering
* Market-data normalization
* Search ranking
* Cache logic
* Business rules

---

## Repository layer

Responsible for:

* Supabase queries
* Database persistence
* Data mapping
* Graph record retrieval
* AI cache storage
* Historical price retrieval

UI components must never query Supabase directly.

---

# 7. Server and Client Component Rules

Use Server Components by default.

Use Client Components only when browser-side interaction is required.

## Server Components should handle

* Company profile data
* Category data
* Company directory data
* Cached AI thesis
* Cached AI research
* Financial Snapshot data
* Related companies
* Search result pages
* Static relationship summaries

## Client Components should handle

* React Flow interaction
* Historical chart interaction
* Search autocomplete
* Filters and sorting
* GPT input and streaming
* Expandable panels
* Comparison selectors

Do not mark an entire page as a Client Component because one child component is interactive.

Keep the client bundle as small as practical.

---

# 8. TypeScript Rules

Use strict TypeScript.

Do not use `any` unless it is unavoidable because of a third-party library.

When `any` is unavoidable:

* Isolate it
* Document why it exists
* Convert it to an application type as early as possible

Use explicit types for:

* API requests
* API responses
* Database records
* Service return values
* Graph nodes
* Graph edges
* AI outputs
* Market data
* Component props

Do not rely on implicit object shapes across feature boundaries.

---

# 9. Validation Rules

Use Zod at every external boundary.

Validate:

* API request bodies
* Query parameters
* Route parameters
* Search input
* Tickers
* Graph depth
* Graph limits
* AI structured outputs
* Market-data responses
* Environment configuration
* User questions
* Cache payloads where practical

Never trust:

* Browser input
* Third-party API responses
* AI model output
* Database JSONB
* URL parameters

Validation errors must return safe, user-friendly responses.

---

# 10. Database Rules

Use Supabase PostgreSQL as the application database.

All schema changes must be implemented through versioned migrations.

Do not:

* Modify production tables manually without a migration
* Drop tables without explicit approval
* Delete production data without explicit approval
* Store production secrets in migration or seed files
* Use destructive reset commands without confirmation

Every migration should be:

* Focused
* Reversible when practical
* Named clearly
* Compatible with existing data when possible
* Documented when it changes application behavior

---

# 11. Data Modeling Rules

Use normalized relational tables for authoritative data.

Use relational structures for:

* Companies
* Categories
* Company-category assignments
* Products
* Technologies
* Market data
* Financial metrics
* Historical prices
* Knowledge Graph nodes
* Knowledge Graph edges
* Relationship types

Use JSONB primarily for:

* Structured AI output
* Flexible metadata
* Provider-specific raw metadata
* Non-authoritative auxiliary fields

Do not store core company facts only inside JSONB.

Do not duplicate authoritative data across unrelated tables.

---

# 12. Database Query Rules

Database queries must live in repository modules.

Repository functions should:

* Have explicit inputs
* Return application-safe types
* Handle missing records
* Avoid leaking raw provider or database shapes
* Use parameterized queries
* Select only required columns
* Avoid unbounded result sets
* Use pagination where needed

Do not use `select("*")` in production paths unless the full row is intentionally required.

Do not place SQL logic inside UI components.

---

# 13. Supabase Security Rules

Keep the Supabase service-role key server-side.

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
```

to the browser.

Use Row Level Security where browser-side Supabase access is allowed.

Prefer server-side data access for:

* Company research
* AI research
* Graph data
* Financial data
* Internal metadata
* AI cache

Use the public anonymous key only for explicitly permitted client operations.

---

# 14. Knowledge Graph Rules

The MVP Knowledge Graph must use PostgreSQL.

Do not add Neo4j or another graph database without explicit approval.

The graph must use:

* `knowledge_graph_nodes`
* `relationship_types`
* `knowledge_graph_edges`

Each edge must support:

* Source node
* Target node
* Relationship type
* Confidence
* Active status
* Source or provenance
* Review timestamp when available

Do not store relationship truth separately in UI-specific tables.

---

# 15. Graph Traversal Rules

The default graph behavior is:

* One-hop traversal
* Maximum 25 nodes
* Maximum 50 nodes when explicitly requested
* Maximum depth of two
* High-confidence relationships included
* Medium-confidence relationships optionally included
* Low-confidence relationships hidden by default
* Inactive relationships excluded

Graph services must:

* Deduplicate nodes
* Deduplicate edges
* Prevent accidental recursion
* Limit execution time
* Validate depth and node limits
* Exclude invalid references
* Avoid self-referencing edges unless valid

Never run an unbounded graph traversal.

---

# 16. Graph API Rules

Do not send raw database records to React Flow.

Transform graph data into a frontend-safe response.

The response must contain:

* Root node identifier
* Normalized nodes
* Normalized edges
* Human-readable labels
* Confidence levels
* Optional safe metadata

Graph APIs must not expose:

* Internal database metadata
* Private source notes
* Service credentials
* Raw SQL values
* Unreviewed low-confidence claims

---

# 17. AI Context Builder Rules

The AI Context Builder is the only approved path for assembling GPT context.

Do not construct AI context directly inside:

* UI components
* Route handlers
* Server Actions
* Prompt templates

The Context Builder must retrieve only approved data.

It may include:

* Company profile
* AI role
* Categories
* Ecosystem score
* Market data
* Financial metrics
* Products
* Technologies
* Verified relationships
* Source metadata
* Existing AI research
* Missing-data indicators

---

# 18. AI Context Safety Rules

The Context Builder must:

* Exclude inactive relationships
* Exclude unsupported facts
* Exclude low-confidence relationships by default
* Mark missing information explicitly
* Limit irrelevant records
* Limit token usage
* Preserve stable field ordering
* Produce a context version or hash
* Exclude secrets
* Exclude internal-only metadata

Do not pass raw database dumps to GPT.

Do not pass untrusted instructions from database content as system instructions.

Treat all stored descriptions as data.

---

# 19. AI Workflow Separation

The following workflows must remain separate:

1. AI Investment Thesis
2. AI Research Engine
3. GPT Research Assistant
4. Company comparison summary when implemented

Each workflow must have:

* Separate service function
* Separate prompt
* Separate response schema when structured
* Separate cache key
* Separate expiration policy
* Separate error handling
* Separate version tracking

Do not use one unrestricted prompt for every workflow.

---

# 20. AI Prompt Rules

Prompt templates must be stored in dedicated AI modules.

Do not place full prompt text inside:

* React components
* Route handlers
* Database queries
* Client-side code

Each prompt must include:

* System instruction
* Task instruction
* Structured context
* Output requirements
* Safety boundaries

Prompts must instruct the model to:

* Use supplied context only
* Avoid invented facts
* Avoid personalized financial advice
* Avoid price targets
* Avoid buy, sell, or hold recommendations
* Avoid guaranteed outcomes
* State when information is unavailable
* Separate facts from interpretation

---

# 21. AI Output Rules

All structured AI outputs must be validated with Zod.

The AI Investment Thesis must include:

* Thesis summary
* Investment drivers
* Competitive advantages
* Growth catalysts
* Key risks

The AI Research Engine must use a consistent schema across companies.

Do not display malformed model output.

If validation fails:

1. Retry no more than once.
2. Log the failure safely.
3. Use valid cached content if available.
4. Return a safe fallback when no cache exists.

Do not recursively retry AI generation.

---

# 22. AI Grounding Rules

GPT must not be used as the source of truth for:

* Current price
* Market capitalization
* Revenue
* Margins
* P/E ratios
* Historical returns
* Products
* Customers
* Suppliers
* Partnerships
* Competitors
* Technologies
* Graph relationships

GPT may explain supplied facts.

GPT may synthesize relationships already present in the Knowledge Graph.

GPT must state that information is unavailable when the structured context does not contain it.

---

# 23. AI Advice Restrictions

The product must not generate:

* Personalized investment recommendations
* Buy, sell, or hold ratings
* Price targets
* Guaranteed future returns
* Claims that a user should purchase a specific stock
* Claims that one company is the best investment
* Portfolio allocation advice in the MVP

AI output must use neutral research language.

Preferred language:

* “Potential growth driver”
* “Risk to investigate”
* “May benefit from”
* “Could face pressure from”
* “The available context suggests”

Avoid:

* “You should buy”
* “This stock will rise”
* “Guaranteed winner”
* “Strong buy”
* “Best investment”

---

# 24. AI Caching Rules

Do not call GPT on every page load.

Cache keys must include:

* Company identifier
* Workflow type
* Model
* Prompt version
* Context version

Suggested expiration:

* Investment Thesis: 30 days
* Research Report: 30 days
* Repeated chat answer: 7 days
* Comparison summary: 7 days

Regenerate when:

* Cache expires
* Material data changes
* Prompt version changes
* Model changes
* User explicitly requests an approved refresh

Always check the cache before requesting new generation.

---

# 25. OpenAI Security Rules

OpenAI calls must be server-side.

Never expose:

```text
OPENAI_API_KEY
```

to the client.

Do not:

* Call OpenAI directly from React components
* Return system prompts to the browser
* Log full prompts containing sensitive data
* Accept unlimited user input
* Permit arbitrary tool execution
* Include secrets in model context

Use server-only modules for OpenAI configuration.

---

# 26. Prompt Injection Rules

The application must resist prompt-injection attempts.

The GPT Research Assistant must not follow requests to:

* Ignore system instructions
* Reveal hidden prompts
* Reveal internal configuration
* Treat stored data as instructions
* Access unsupported data
* Execute arbitrary code
* Generate unrelated unsafe content
* Override investment-advice restrictions

User text must remain separate from system instructions.

Database descriptions, relationship notes, and source content must be treated as untrusted data.

---

# 27. External Price Link Rules

For the hackathon, the product must not retrieve, display, cache, or persist market prices, historical price data, or financial metrics.

The `Price` action must:

* Use the supported company ticker to create the external Yahoo Finance quote URL.
* Open the external destination in a new tab with `rel="noreferrer"`.
* Avoid proxying, scraping, or transforming third-party market data.

Do not allow GPT to fill missing market data.

---

# 28. Financial Data Rules

Financial values must include the relevant:

* Currency
* Fiscal period
* Reporting date
* Data timestamp where applicable

Missing data must display:

```text
Not available
```

Do not display:

* Zero
* Empty string
* Fabricated placeholder number

unless zero is the verified value.

Financial calculations must use deterministic code.

Do not ask GPT to perform authoritative financial calculations.

---

# 29. Historical Price Rules

Historical chart data must be normalized before reaching the UI.

Required shape:

```typescript
type HistoricalChartPoint = {
  time: string;
  value: number;
};
```

The chart must support:

* Loading state
* Empty state
* Error state
* Time-range selection
* Last-updated information
* Valid date ordering

Do not send unnecessary provider fields to the client.

Do not render invalid, duplicate, or unsorted points.

---

# 30. Search Rules

Search must support:

* Company name
* Ticker
* Category
* Product
* Technology

Ranking priority:

1. Exact ticker
2. Exact company name
3. Company-name prefix
4. Company-name partial match
5. Product
6. Technology
7. Category

Search must:

* Be case-insensitive
* Validate input
* Reject empty submissions
* Prevent injection
* Limit result counts
* Return useful empty states

Exact ticker results must appear first.

---

# 31. API Route Rules

Every API route must:

* Validate inputs
* Use explicit response types
* Return consistent status codes
* Handle known errors
* Avoid leaking internal details
* Enforce payload limits
* Apply rate limiting where appropriate
* Avoid unnecessary database calls
* Use service and repository layers

Route handlers should be thin.

Do not place:

* Large prompt strings
* Complex graph traversal
* Vendor-specific normalization
* Extensive database mapping

inside route handlers.

---

# 32. Error Handling Rules

Use predictable error handling.

Errors should be classified where practical:

* Validation error
* Not found
* Unauthorized
* Rate limited
* Provider unavailable
* AI generation failed
* Database unavailable
* Internal error

User-visible errors must:

* Be understandable
* Avoid stack traces
* Avoid internal IDs
* Avoid secrets
* Offer a retry or next action when practical

Do not silently swallow exceptions.

---

# 33. Partial Failure Rules

The company page must use independent failure boundaries.

A failure in one section must not break the whole page.

Examples:

* Graph failure → show Supply Chain Explorer fallback
* AI generation failure → show cached content or unavailable state
* Market-data failure → show company profile and AI research
* Chart failure → show text fallback
* GPT failure → preserve question and show retry

Core company identity must remain available whenever database access permits.

---

# 34. Loading State Rules

Every asynchronous feature must have a loading state.

Required coverage:

* Homepage
* Categories
* Company directory
* Company page
* AI Investment Thesis
* AI Research Engine
* Knowledge Graph
* Supply Chain Explorer
* Financial Snapshot
* Historical chart
* Search results
* GPT Assistant

Use skeletons when they preserve layout.

Avoid full-screen spinners for individual page sections.

---

# 35. Empty State Rules

Every data-dependent feature must have an intentional empty state.

Empty states must:

* Explain what is missing
* Distinguish missing data from errors
* Avoid displaying fabricated placeholders
* Offer a useful next action where possible

Examples:

* No graph relationships
* No historical prices
* No search results
* No related companies
* No AI research
* No financial metric

---

# 36. UI Component Rules

Components should be:

* Focused
* Reusable
* Strongly typed
* Accessible
* Responsive
* Independent of data vendors

Avoid:

* Large monolithic page components
* Excessive prop drilling
* Embedded database logic
* Embedded OpenAI logic
* Duplicate formatting logic
* Feature-specific copies of generic UI patterns

Extract reusable components only when reuse or complexity justifies it.

Do not overabstract simple UI.

---

# 37. Design Rules

The visual system should feel:

* Modern
* Calm
* Trustworthy
* Research-oriented
* Structured
* Precise

Use:

* Light-mode first
* Neutral surfaces
* Clear typography
* Subtle borders
* Moderate radius
* Restrained shadows
* Generous spacing
* Limited accent colors

Avoid:

* Excessive gradients
* Cryptocurrency-style visuals
* Gamification
* Promotional language
* Flashing market indicators
* Decorative animation
* High-frequency trading aesthetics

---

# 38. Facts and AI Presentation Rules

Authoritative facts and AI-generated interpretation must look different.

Clearly label:

* AI-generated research
* GPT responses
* AI Ecosystem Score
* Market-data timestamps
* Financial periods
* Relationship confidence
* Missing information

Do not present AI output as audited financial data.

Do not present the AI Ecosystem Score as an expected-return rating.

---

# 39. Responsive Design Rules

Support:

* Desktop
* Tablet
* Mobile browser

Desktop is the primary demo environment.

On mobile:

* Stack research cards
* Convert dense tables to cards
* Simplify graph interaction
* Preserve Supply Chain Explorer
* Use touch-friendly controls
* Prevent horizontal overflow
* Preserve GPT input
* Keep financial metrics readable

Every major screen must be reviewed at multiple viewport sizes.

---

# 40. Accessibility Rules

Implement:

* Semantic headings
* Keyboard navigation
* Visible focus states
* Accessible labels
* Sufficient contrast
* Skip-to-content link
* Accessible mobile navigation
* Descriptive links
* Text alternatives for icons
* Chart summaries
* Graph list alternative
* Reduced-motion support where practical

Do not communicate essential meaning through color alone.

Do not make critical interactions hover-only.

---

# 41. Performance Rules

Prioritize fast delivery of core content.

Load order should generally favor:

1. Company identity
2. Cached AI Thesis
3. Cached AI Research
4. Financial Snapshot
5. Historical chart
6. Knowledge Graph
7. GPT Assistant

Use:

* Server Components
* Parallel fetching
* Dynamic imports
* Lazy loading
* Database indexes
* Response caching
* Reduced payloads
* Image optimization
* Pagination or virtualization where appropriate

Do not block initial page rendering on GPT generation.

Do not load the Knowledge Graph before it is needed.

---

# 42. Security Rules

All secrets must remain server-side.

Protected values include:

* OpenAI keys
* Supabase service-role key
* Monitoring credentials

Never:

* Commit `.env` files
* Print secrets in logs
* Send secrets to the client
* Include secrets in AI prompts
* Hardcode production credentials
* Expose internal errors

Maintain an updated:

```text
.env.example
```

with placeholder values only.

---

# 43. Logging Rules

Logs should support debugging without exposing sensitive data.

Log:

* Operation name
* Safe error category
* Request identifier where available
* Model or provider name
* Latency
* Cache status
* Validation outcome

Do not log:

* API keys
* Service-role credentials
* Full system prompts
* Full user chat history by default
* Sensitive request headers
* Complete raw provider responses unless sanitized

---

# 44. Dependency Rules

Before adding a dependency:

* Confirm the current stack cannot solve the problem
* Confirm active maintenance
* Confirm compatibility with Next.js and React
* Assess bundle size
* Explain why it is needed

Do not add dependencies for trivial utilities.

Do not replace an approved library without user approval.

---

# 45. Testing Rules

Prioritize tests for high-risk logic.

## Unit tests

Test:

* AI Context Builder
* AI schemas
* Cache keys
* Search ranking
* Graph transformation
* Graph traversal limits
* Market-data normalization
* Input validation
* Prompt sanitization

## Integration tests

Test:

* Repositories
* AI cache
* AI endpoints
* Search endpoint
* Graph endpoint
* External price-link utility

Mock external services where practical.

## End-to-end validation

Validate the primary flow:

```text
Homepage
→ Category
→ Company Page
→ AI Thesis
→ AI Research
→ Knowledge Graph
→ Supply Chain
→ Historical Chart
→ GPT Question
→ Related Company
```

---

# 46. Validation Requirements

Before marking work complete, run the available project checks.

At minimum, attempt:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Use the repository’s actual package manager.

Do not claim a command passed unless it was executed successfully.

If a command is unavailable, report it as unavailable.

The production build must pass before a milestone is considered complete.

---

# 47. Code Quality Rules

Write code that is:

* Clear
* Focused
* Predictable
* Testable
* Strongly typed
* Consistent with the repository

Use:

* Descriptive names
* Small functions
* Explicit return types where helpful
* Shared formatting utilities
* Centralized constants
* Server-only modules for secrets

Avoid:

* Deeply nested logic
* Duplicate business rules
* Magic numbers
* Silent fallbacks
* Broad catch blocks without handling
* Unused abstractions
* Premature optimization
* Large refactors during feature work

---

# 48. Comment Rules

Use comments only when they explain:

* Non-obvious business rules
* Security decisions
* AI guardrails
* Graph constraints
* Provider-specific behavior
* Temporary technical debt

Do not add comments that simply restate the code.

Prefer clear code over excessive comments.

---

# 49. Change Discipline

Keep every change scoped to the assigned task.

Do not:

* Rewrite unrelated modules
* Rename major folders without need
* Remove working functionality
* Replace the technology stack
* Change database design casually
* Delete documentation
* Reformat the entire repository
* Introduce unrelated features

Explain structural changes before making them.

Preserve existing behavior unless the task requires a change.

---

# 50. Git Discipline

Commits should be focused and descriptive.

Recommended commit style:

```text
feat: add company AI thesis service
fix: handle missing graph relationships
refactor: move market queries into repository
test: add context builder validation
docs: update project status
```

Do not combine unrelated changes in one commit when avoidable.

Do not commit generated secrets, local caches, or environment files.

---

# 51. Documentation Rules

Update documentation when changes affect:

* Architecture
* Database schema
* Environment variables
* Setup instructions
* Deployment
* API contracts
* Product status
* Known limitations

Maintain:

```text
docs/engineering/PROJECT_STATUS.md
docs/engineering/ARCHITECTURE_DECISIONS.md
docs/engineering/DATA_DICTIONARY.md
README.md
.env.example
```

Do not allow implementation and documentation to drift materially.

---

# 52. Project Status Rules

Update `PROJECT_STATUS.md` after every milestone or meaningful project change.

It should include:

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

Do not mark a feature complete when only the happy path exists.

---

# 53. Data Integrity Rules

Do not fabricate data to make the interface look complete.

Seed data must be clearly understood as demonstration data.

Do not:

* Invent financial values
* Invent customer relationships
* Invent suppliers
* Invent partnership claims
* Invent market metrics
* Invent historical performance

When data is missing, display an intentional missing-data state.

Trust is more important than visual completeness.

---

# 54. MVP Scope Rules

Do not implement the following until P0 features are complete and the user approves expansion:

* User authentication
* Watchlists
* Portfolio tracking
* Brokerage integration
* Real-time streaming quotes
* Alerts
* Payments
* Social features
* Native mobile applications
* Automated relationship extraction
* Autonomous research agents
* Dedicated graph database
* Advanced graph analytics
* Personalized investment recommendations

Do not overengineer future features.

---

# 55. P0 Priority Order

When time is constrained, prioritize:

1. Company page reliability
2. AI Investment Thesis
3. AI Research Engine
4. AI Knowledge Graph
5. AI Supply Chain Explorer
6. Historical chart
7. Financial Snapshot
8. GPT Research Assistant
9. Search
10. Category navigation
11. Company comparison
12. Additional visual polish

Do not sacrifice the complete company research journey for a secondary feature.

---

# 56. Definition of Done for a Feature

A feature is complete only when:

* Acceptance criteria are satisfied
* Architecture rules are followed
* Inputs are validated
* Types are defined
* Loading state exists
* Empty state exists
* Error state exists
* Responsive behavior is implemented
* Basic accessibility is implemented
* Security requirements are met
* Validation commands are run
* Documentation is updated when needed
* Production build passes

Rendering successfully once is not enough.

---

# 57. Required Task Workflow

For every task:

## Inspect

* Read the relevant documentation.
* Inspect existing code.
* Identify dependencies.
* Identify affected files.
* Review existing patterns.

## Plan

Provide a concise plan covering:

* Required changes
* Files to modify
* Architectural decisions
* Validation approach

## Implement

* Keep changes scoped.
* Follow existing patterns.
* Add validation.
* Add error handling.
* Preserve unrelated functionality.

## Validate

Run:

* Lint
* Type checking
* Tests
* Production build
* Relevant manual checks

## Report

Provide:

* Completed work
* Files created
* Files modified
* Database changes
* Validation results
* Known issues
* Recommended next step

---

# 58. Required Completion Report

Use this format:

```markdown
# Completion Report

## Completed

- ...

## Files Created

- `path/to/file`

## Files Modified

- `path/to/file`

## Database Changes

- Migration added:
- Tables changed:
- Seed data changed:

## Validation

- `npm run lint`: Passed / Failed / Not available
- `npm run typecheck`: Passed / Failed / Not available
- `npm run test`: Passed / Failed / Not available
- `npm run build`: Passed / Failed / Not available
- Manual validation:

## Known Issues

- ...

## Project Status Updated

- Yes / No
- File: `docs/engineering/PROJECT_STATUS.md`

## Recommended Next Step

- ...
```

Completion reports must be accurate.

Do not claim work was validated when it was not.

---

# 59. Prohibited Patterns

Do not use:

* Direct OpenAI calls from the client
* Direct Supabase queries inside UI components
* Raw database records as API responses
* Unvalidated AI output
* Unbounded graph traversal
* Unbounded user prompts
* Hardcoded production credentials
* Fabricated fallback data
* Silent error suppression
* Generic catch-all AI prompts
* Large monolithic route handlers
* `any` throughout feature code
* Full-page Client Components without need
* Destructive database commands without approval
* P1 features before core P0 reliability

---

# 60. Final Engineering Standard

Every implementation decision should reinforce this experience:

```text
The user discovers an AI company
            │
            ▼
Structured data establishes the facts
            │
            ▼
The AI Investment Thesis explains why it matters
            │
            ▼
The AI Research Engine provides deeper analysis
            │
            ▼
The Knowledge Graph explains relationships
            │
            ▼
Market and historical data provide context
            │
            ▼
The GPT Research Assistant supports follow-up research
```

Prioritize:

* Accuracy
* Trust
* Grounded AI
* Strong architecture
* Secure implementation
* Complete workflows
* Maintainable code
* Responsive design
* Accessibility
* Demo reliability

Do not trade reliability for unnecessary complexity.
