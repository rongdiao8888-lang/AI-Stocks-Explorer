## AI Stocks Explorer

# Product Requirements Document

## Part 5 — Technical Architecture, AI System Design & Knowledge Graph Integration

**Version:** 3.0
**Product:** AI Stocks Explorer
**Application Type:** Responsive web application
**Deployment Target:** Vercel
**Status:** Hackathon MVP specification

---

## 1. Purpose

This document defines the technical architecture for AI Stocks Explorer.

### Current Hackathon Scope Override

The hackathon does not retrieve, persist, cache, or display in-app market prices, historical charts, or financial metrics. A company `Price` action opens the supported ticker on Yahoo Finance in a separate tab. This overrides the provider-backed market-data sections below for the current hackathon scope.

The architecture must support the product’s three core intelligence layers:

1. **AI Investment Thesis**
   Generates a concise, structured explanation of why a company matters within the AI investment ecosystem.

2. **AI Research Engine**
   Produces standardized company research covering investment drivers, competitive advantages, growth catalysts, risks, products, customers, competitors, and ecosystem role.

3. **AI Knowledge Graph**
   Connects companies, products, technologies, categories, suppliers, customers, partners, and competitors through structured relationships.

The system must also support:

* AI company discovery
* AI value-chain navigation
* Company research pages
* Historical stock charts
* AI Supply Chain Explorer
* Company comparison
* Global search
* GPT-powered follow-up research
* Future mobile clients

---

# 2. Technical Goals

The architecture should be:

* Fast enough for a polished hackathon demo
* Modular enough to support future product expansion
* Secure by default
* Easy to deploy
* Cost-conscious
* Grounded in verified structured data
* Resistant to AI hallucinations
* Compatible with future mobile applications
* Simple enough to implement within the hackathon timeframe

The system should avoid unnecessary infrastructure and should not introduce technologies that do not directly support the MVP.

---

# 3. Core Architecture Principle

> **The database provides facts, the Knowledge Graph provides relationships, and GPT-5.6 provides explanations.**

The system must separate:

* Financial calculations
* Market data retrieval
* Company metadata
* Ecosystem relationships
* AI-generated explanations
* User-facing conversational responses

GPT-5.6 must never be treated as the primary source of financial or company facts.

---

# 4. High-Level System Architecture

```text
User Browser
     │
     ▼
Next.js Web Application
     │
     ├── Server Components
     ├── Client Components
     ├── API Routes
     └── Server Actions
             │
             ▼
      Application Services
             │
     ┌───────┼─────────┬────────────┐
     ▼       ▼         ▼            ▼
Supabase  Market Data  Knowledge    OpenAI
Database  Provider     Graph Layer  GPT-5.6
     │       │             │            │
     └───────┴──────┬──────┴────────────┘
                    ▼
              Context Builder
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
    AI Investment  AI Research  GPT Research
       Thesis        Engine      Assistant
                    │
                    ▼
              Cached Outputs
                    │
                    ▼
                User Interface
```

---

# 5. Technology Stack

## 5.1 Frontend

| Technology                     | Purpose                                        |
| ------------------------------ | ---------------------------------------------- |
| Next.js 15                     | Application framework                          |
| React 19                       | Component architecture                         |
| TypeScript                     | Type safety                                    |
| Tailwind CSS                   | Styling                                        |
| shadcn/ui                      | Reusable UI components                         |
| TanStack Table                 | Company tables and comparison views            |
| TradingView Lightweight Charts | Historical stock charts                        |
| React Flow                     | Knowledge Graph and supply-chain visualization |
| Framer Motion                  | Controlled UI transitions                      |
| Lucide React                   | Icons                                          |

React Flow is recommended for graph visualization because it supports interactive nodes, edges, zooming, panning, and custom node components.

---

## 5.2 Backend

| Technology             | Purpose                                 |
| ---------------------- | --------------------------------------- |
| Next.js Route Handlers | API endpoints                           |
| Next.js Server Actions | Server-side mutations where appropriate |
| Supabase PostgreSQL    | Main database                           |
| Supabase SDK           | Database access                         |
| OpenAI SDK             | GPT-5.6 integration                     |
| Zod                    | Runtime validation                      |
| Market Data API        | Current and historical market data      |
| Vercel                 | Hosting and deployment                  |

---

## 5.3 Infrastructure

| Technology            | Purpose                              |
| --------------------- | ------------------------------------ |
| Vercel                | Web hosting and serverless execution |
| Supabase              | Database and optional storage        |
| GitHub                | Source control                       |
| Vercel Analytics      | Basic performance monitoring         |
| Sentry or Vercel Logs | Error monitoring                     |
| Environment Variables | Secret management                    |

---

# 6. Application Architecture

The application should use a layered architecture.

```text
Presentation Layer
        │
        ▼
Application Layer
        │
        ▼
Domain and Service Layer
        │
        ▼
Data Access Layer
        │
        ▼
External Services
```

## 6.1 Presentation Layer

Responsible for:

* Pages
* Layouts
* UI components
* Loading states
* Error states
* Form interactions
* Chart rendering
* Knowledge Graph visualization

The presentation layer must not contain direct database queries or OpenAI calls.

---

## 6.2 Application Layer

Responsible for:

* Page-level data composition
* Search workflows
* Company comparison workflows
* AI generation workflows
* Graph traversal requests
* Market-data retrieval coordination

---

## 6.3 Domain and Service Layer

Responsible for:

* Company research logic
* Context building
* Knowledge Graph traversal
* AI prompt construction
* AI output validation
* Market-data normalization
* Cache logic
* Search logic

---

## 6.4 Data Access Layer

Responsible for:

* Supabase queries
* Database repositories
* External price-link utility
* AI cache storage
* Knowledge Graph node and edge retrieval

---

# 7. Recommended Project Structure

```text
ai-stocks-explorer/
├── app/
│   ├── api/
│   │   ├── ai/
│   │   │   ├── thesis/
│   │   │   │   └── route.ts
│   │   │   ├── research/
│   │   │   │   └── route.ts
│   │   │   ├── chat/
│   │   │   │   └── route.ts
│   │   │   └── compare/
│   │   │       └── route.ts
│   │   ├── companies/
│   │   │   └── route.ts
│   │   ├── graph/
│   │   │   └── route.ts
│   │   ├── market-data/
│   │   │   └── route.ts
│   │   └── search/
│   │       └── route.ts
│   ├── categories/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── companies/
│   │   ├── page.tsx
│   │   └── [ticker]/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── error.tsx
│   ├── compare/
│   │   └── page.tsx
│   ├── ecosystem/
│   │   └── page.tsx
│   ├── search/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ai/
│   │   ├── ai-investment-thesis.tsx
│   │   ├── ai-research-engine.tsx
│   │   ├── ai-insight-card.tsx
│   │   ├── ai-score-card.tsx
│   │   ├── ai-risk-card.tsx
│   │   ├── ai-chat-panel.tsx
│   │   └── ai-disclaimer.tsx
│   ├── charts/
│   │   ├── historical-price-chart.tsx
│   │   └── chart-range-selector.tsx
│   ├── companies/
│   │   ├── company-card.tsx
│   │   ├── company-header.tsx
│   │   ├── company-table.tsx
│   │   ├── company-search-result.tsx
│   │   ├── financial-snapshot.tsx
│   │   └── related-companies.tsx
│   ├── graph/
│   │   ├── knowledge-graph.tsx
│   │   ├── graph-node.tsx
│   │   ├── graph-edge.tsx
│   │   ├── graph-controls.tsx
│   │   └── relationship-legend.tsx
│   ├── navigation/
│   │   ├── header.tsx
│   │   ├── mobile-navigation.tsx
│   │   └── global-search.tsx
│   └── ui/
├── lib/
│   ├── ai/
│   │   ├── context-builder.ts
│   │   ├── prompts.ts
│   │   ├── schemas.ts
│   │   ├── generate-thesis.ts
│   │   ├── generate-research.ts
│   │   ├── answer-question.ts
│   │   └── cache.ts
│   ├── graph/
│   │   ├── graph-service.ts
│   │   ├── graph-transformer.ts
│   │   ├── graph-types.ts
│   │   └── graph-traversal.ts
│   ├── repositories/
│   │   ├── company-repository.ts
│   │   ├── category-repository.ts
│   │   ├── graph-repository.ts
│   │   └── ai-research-repository.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts
│   ├── validation/
│   │   └── schemas.ts
│   └── utils/
├── types/
│   ├── company.ts
│   ├── category.ts
│   ├── graph.ts
│   ├── market-data.ts
│   └── ai.ts
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── docs/
│   ├── strategy/
│   ├── prd/
│   └── engineering/
├── public/
├── middleware.ts
├── package.json
└── README.md
```

---

# 8. Rendering Strategy

Use Next.js Server Components by default.

## Server Components should handle:

* Homepage company data
* Category pages
* Company profile data
* AI Investment Thesis retrieval
* AI Research Engine retrieval
* Related-company queries
* Static knowledge-graph summaries
* Search result pages

## Client Components should handle:

* Interactive charts
* Graph interactions
* Search autocomplete
* Comparison controls
* GPT chat input
* Filters and sorting
* Expandable insight cards

This approach minimizes JavaScript sent to the browser and improves performance.

---

# 9. Company Page Data Flow

When a user opens a company page:

```text
/company/NVDA
      │
      ▼
Validate ticker
      │
      ▼
Fetch company profile
      │
      ├── Fetch categories
      ├── Fetch market data
      ├── Fetch historical prices
      ├── Fetch products
      ├── Fetch AI thesis
      ├── Fetch AI research
      ├── Fetch graph relationships
      └── Fetch related companies
              │
              ▼
       Compose page data
              │
              ▼
     Render Server Component
              │
              ▼
Hydrate chart, graph, and GPT interactions
```

Independent data requests should run in parallel when possible.

---

# 10. AI Knowledge Graph Architecture

## 10.1 Implementation Approach

For the MVP, the Knowledge Graph will use Supabase PostgreSQL tables:

* `knowledge_graph_nodes`
* `knowledge_graph_edges`
* `relationship_types`

A dedicated graph database is not required.

The application layer will transform relational rows into graph-compatible objects.

---

## 10.2 Graph Data Structure

The frontend graph should receive data in this format:

```typescript
type KnowledgeGraphResponse = {
  nodes: Array<{
    id: string;
    type:
      | "company"
      | "product"
      | "technology"
      | "category"
      | "platform"
      | "model";
    label: string;
    ticker?: string;
    description?: string;
    metadata?: Record<string, unknown>;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    relationship: string;
    label: string;
    confidence: "high" | "medium" | "low";
  }>;
};
```

---

## 10.3 Graph Service Responsibilities

The Graph Service should:

* Retrieve the requested root company
* Retrieve one-hop relationships by default
* Optionally retrieve two-hop relationships
* Filter inactive relationships
* Filter low-confidence relationships when appropriate
* Deduplicate nodes
* Deduplicate edges
* Limit response size
* Convert database records into frontend graph objects
* Return human-readable relationship labels

---

## 10.4 Graph Traversal Limits

For the MVP:

* Default depth: one relationship level
* Maximum depth: two relationship levels
* Default maximum nodes: 25
* Maximum nodes per request: 50
* Low-confidence edges hidden by default

These limits protect performance and prevent an unreadable graph.

---

## 10.5 Graph API

### Request

```http
GET /api/graph?company=NVDA&depth=1
```

### Response

```json
{
  "rootNodeId": "company-nvidia",
  "nodes": [
    {
      "id": "company-nvidia",
      "type": "company",
      "label": "NVIDIA",
      "ticker": "NVDA"
    },
    {
      "id": "company-tsmc",
      "type": "company",
      "label": "TSMC",
      "ticker": "TSM"
    },
    {
      "id": "product-cuda",
      "type": "product",
      "label": "CUDA"
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "company-tsmc",
      "target": "company-nvidia",
      "relationship": "manufactures_for",
      "label": "Manufactures for",
      "confidence": "high"
    },
    {
      "id": "edge-2",
      "source": "company-nvidia",
      "target": "product-cuda",
      "relationship": "owns_product",
      "label": "Owns product",
      "confidence": "high"
    }
  ]
}
```

---

# 11. AI System Architecture

The AI layer contains three separate workflows.

```text
Structured Company Context
          │
          ├── AI Investment Thesis
          ├── AI Research Engine
          └── GPT Research Assistant
```

Each workflow must use the same verified Context Builder but different prompts, output schemas, caching rules, and response formats.

---

# 12. AI Context Builder

The Context Builder is the central control layer between the database and GPT-5.6.

It retrieves and assembles:

* Company profile
* AI categories
* AI role
* Market data
* Financial metrics
* Products
* Technologies
* Knowledge Graph relationships
* Existing thesis or research where appropriate
* Source timestamps
* Missing-data indicators

---

## 12.1 Context Object

```typescript
type CompanyAIContext = {
  company: {
    id: string;
    name: string;
    ticker: string;
    exchange: string;
    description: string | null;
    aiRole: string | null;
    aiEcosystemScore: number | null;
  };
  categories: Array<{
    name: string;
    type: "primary" | "secondary";
  }>;
  marketData: {
    currentPrice: number | null;
    marketCap: number | null;
    peRatio: number | null;
    oneYearReturn: number | null;
    lastUpdated: string | null;
  };
  financialMetrics: {
    revenue: number | null;
    revenueGrowth: number | null;
    grossMargin: number | null;
    totalDebt: number | null;
    period: string | null;
  };
  products: Array<{
    name: string;
    type: string;
    aiRelevance: string | null;
  }>;
  technologies: string[];
  relationships: Array<{
    source: string;
    target: string;
    type: string;
    description: string | null;
    confidence: "high" | "medium" | "low";
  }>;
  sources: Array<{
    name: string;
    updatedAt: string | null;
  }>;
};
```

---

## 12.2 Context Builder Rules

The Context Builder must:

* Use only approved database records.
* Exclude expired relationships.
* Exclude unsupported facts.
* Mark missing fields explicitly.
* Prefer high-confidence graph edges.
* Avoid including unnecessary historical data.
* Limit context size.
* Never place secrets or internal metadata into prompts.
* Generate a stable context-version hash for caching.

---

# 13. AI Investment Thesis Workflow

The AI Investment Thesis should be generated as structured JSON.

## 13.1 Workflow

```text
Company selected
      │
      ▼
Check cached thesis
      │
      ├── Valid cache → Return thesis
      │
      └── Missing or expired
                 │
                 ▼
         Build company context
                 │
                 ▼
          Call GPT-5.6
                 │
                 ▼
        Validate JSON output
                 │
                 ▼
          Store in Supabase
                 │
                 ▼
              Return UI
```

---

## 13.2 Expected Output

```typescript
type AIInvestmentThesis = {
  thesisSummary: string;
  investmentDrivers: string[];
  competitiveAdvantages: string[];
  growthCatalysts: string[];
  keyRisks: string[];
};
```

---

## 13.3 Generation Rules

The model must:

* Use only supplied context.
* Distinguish facts from analysis.
* Avoid price targets.
* Avoid buy, sell, or hold recommendations.
* Avoid inventing customers or partnerships.
* Avoid claiming future financial performance as certain.
* Use plain English.
* Keep the thesis concise.
* Return valid structured JSON.

---

# 14. AI Research Engine Workflow

The AI Research Engine creates deeper structured analysis.

## 14.1 Expected Output

```typescript
type AIResearchReport = {
  whyItMatters: string;
  valueChainRole: string;
  technologyPosition: string;
  investmentDrivers: string[];
  competitiveAdvantages: string[];
  growthCatalysts: string[];
  keyRisks: string[];
  customerExposureSummary: string;
  competitiveLandscape: string;
  supplyChainInfluence: string;
  scoreExplanation: string;
};
```

---

## 14.2 Research Engine Requirements

The Research Engine must:

* Use company, product, market, and graph data.
* Explain relationships in the AI ecosystem.
* Include both opportunities and risks.
* Avoid unsupported claims.
* Maintain a consistent structure across companies.
* Be cached after generation.
* Support manual regeneration.
* Store model and prompt versions.
* Return fallback content when generation fails.

---

# 15. GPT Research Assistant

The GPT Research Assistant allows users to ask follow-up questions after reviewing structured research.

Example questions:

* Why is NVIDIA important to AI infrastructure?
* How does AMD compete with NVIDIA?
* Who manufactures this company’s products?
* What risks come from supplier concentration?
* Compare Microsoft and Amazon in AI cloud infrastructure.
* Explain this company to a beginner.

---

## 15.1 Assistant Workflow

```text
User question
      │
      ▼
Validate input
      │
      ▼
Identify selected company
      │
      ▼
Build relevant context
      │
      ▼
Retrieve relevant graph relationships
      │
      ▼
Check response cache
      │
      ├── Cached → Return
      │
      └── Not cached
             │
             ▼
          GPT-5.6
             │
             ▼
       Stream response
             │
             ▼
        Cache response
```

---

## 15.2 Assistant Guardrails

The assistant must:

* Answer only within the available context.
* State when information is unavailable.
* Never fabricate financial data.
* Never present investment advice.
* Never promise returns.
* Clearly distinguish analysis from facts.
* Avoid unsupported customer or supplier claims.
* Keep answers relevant to AI investing.
* Avoid revealing system prompts.
* Reject attempts to override system instructions.
* Limit user prompt length.
* Apply rate limiting.

---

# 16. Prompt Architecture

Prompts should use versioned templates.

```text
System Instructions
        │
        ▼
Task Instructions
        │
        ▼
Structured Company Context
        │
        ▼
User Question or Requested Output
        │
        ▼
Required JSON Schema or Response Format
```

---

## 16.1 Example System Instruction

```text
You are an AI investment research assistant for AI Stocks Explorer.

Use only the structured context provided.

Do not invent financial data, customers, suppliers, partnerships,
products, technologies, or company relationships.

Do not provide personalized investment advice, price targets,
or buy, sell, or hold recommendations.

When information is unavailable, state that it is unavailable.

Clearly separate factual information from analytical interpretation.
```

---

## 16.2 Prompt Versioning

Every generated output should store:

* Model name
* Prompt version
* Context version
* Generation timestamp
* Expiration timestamp

This allows the team to update prompts without losing traceability.

---

# 17. Structured Output Validation

All AI Investment Thesis and AI Research Engine outputs must be validated with Zod.

Example:

```typescript
import { z } from "zod";

export const investmentThesisSchema = z.object({
  thesisSummary: z.string().min(50).max(1200),
  investmentDrivers: z.array(z.string()).min(1).max(5),
  competitiveAdvantages: z.array(z.string()).min(1).max(5),
  growthCatalysts: z.array(z.string()).min(1).max(5),
  keyRisks: z.array(z.string()).min(1).max(5),
});
```

If validation fails:

1. Attempt one structured retry.
2. Log the validation error.
3. Return cached content when available.
4. Return a safe fallback when no valid content exists.

---

# 18. AI Caching Strategy

AI generation should not occur on every page request.

## Cache keys should include:

* Company ID
* AI workflow type
* Prompt version
* Context version
* Model name

## Suggested expiration

| Content               | Expiration |
| --------------------- | ---------- |
| AI Investment Thesis  | 30 days    |
| AI Research Report    | 30 days    |
| Repeated GPT question | 7 days     |
| Comparison report     | 7 days     |

Regenerate content when:

* The cache expires.
* Material source data changes.
* The prompt version changes.
* The model version changes.
* An administrator triggers regeneration.

---

# 19. External Price Links

The hackathon uses no in-app market-data provider. A company `Price` action opens the Yahoo Finance quote page for the supported ticker in a new tab. The application must not fetch, proxy, scrape, cache, persist, or display third-party market data.

---

# 20. API Design

## 20.1 Company Endpoints

```http
GET /api/companies
GET /api/companies?ticker=NVDA
GET /api/companies?category=ai-infrastructure
```

---

## 20.2 Search Endpoint

```http
GET /api/search?q=nvidia
```

Search results should include:

* Company name
* Ticker
* Logo
* Primary category
* Entity type
* URL

---

## 20.3 Knowledge Graph Endpoint

```http
GET /api/graph?company=NVDA&depth=1
```

---

## 20.4 AI Investment Thesis Endpoint

```http
POST /api/ai/thesis
```

Request:

```json
{
  "ticker": "NVDA",
  "regenerate": false
}
```

---

## 20.6 AI Research Endpoint

```http
POST /api/ai/research
```

Request:

```json
{
  "ticker": "NVDA",
  "regenerate": false
}
```

---

## 20.7 GPT Research Assistant Endpoint

```http
POST /api/ai/chat
```

Request:

```json
{
  "ticker": "NVDA",
  "question": "What are the biggest supply-chain risks?"
}
```

---

# 21. Search Architecture

Search should support:

* Company names
* Tickers
* Categories
* Products
* Technologies

## Search priorities

1. Exact ticker match
2. Company-name prefix match
3. Company-name partial match
4. Product match
5. Technology match
6. Category match

The MVP may use PostgreSQL full-text search or optimized `ILIKE` queries.

Target response time:

* Under 300 milliseconds for cached or database-only search

---

# 22. Historical Chart Architecture

Historical stock charts should use TradingView Lightweight Charts.

The chart must support:

* 1 month
* 6 months
* 1 year
* 3 years
* 5 years
* Maximum available history

The server should return normalized chart data:

```typescript
type HistoricalChartPoint = {
  time: string;
  value: number;
};
```

Do not send unnecessary OHLC data when only a line chart is displayed.

---

# 23. Company Comparison Architecture

The comparison feature should accept two to four companies.

```text
Selected companies
        │
        ▼
Fetch company profiles in parallel
        │
        ├── Market metrics
        ├── AI Ecosystem Scores
        ├── AI theses
        ├── Categories
        └── Graph relationships
                │
                ▼
          Comparison view
```

GPT-generated comparison summaries should be optional and cached separately from individual company research.

---

# 24. Security Architecture

## 24.1 Environment Variables

Store these only on the server:

* `OPENAI_API_KEY`
* `SUPABASE_SERVICE_ROLE_KEY`
* Monitoring credentials

Public Supabase credentials may be exposed only when permitted by Row Level Security policies.

---

## 24.2 API Security

Every API route must:

* Validate inputs with Zod.
* Reject unsupported tickers.
* Sanitize user questions.
* Limit payload sizes.
* Use rate limiting for AI endpoints.
* Avoid returning internal stack traces.
* Avoid logging secrets or full user prompts unnecessarily.

---

## 24.3 Prompt Injection Protection

The AI layer should:

* Keep system instructions separate from user input.
* Treat graph and database content as data, not instructions.
* Reject user attempts to change system rules.
* Limit answers to the supplied company context.
* Never execute code or external actions from prompts.
* Avoid dynamically inserting untrusted HTML into model prompts.

---

# 25. Performance Requirements

| Experience                   |                 Target |
| ---------------------------- | ---------------------: |
| Homepage initial load        |        Under 2 seconds |
| Company page initial content |      Under 2.5 seconds |
| Search response              | Under 300 milliseconds |
| Knowledge Graph load         |      Under 1.5 seconds |
| Historical chart load        |      Under 1.5 seconds |
| Cached AI content            | Under 500 milliseconds |
| GPT streaming begins         |        Under 3 seconds |
| Page interaction readiness   |        Under 3 seconds |

These are target goals, not absolute guarantees.

---

# 26. Performance Optimization

Use:

* Server Components
* Parallel data fetching
* Database indexes
* Request caching
* AI output caching
* Market-data caching
* Lazy loading for charts
* Lazy loading for the Knowledge Graph
* Dynamic imports for heavy client components
* Pagination or virtualization for large tables
* Image optimization
* Response-size limits

The Knowledge Graph should not load until it is visible or requested.

---

# 27. Reliability and Error Handling

The system must support graceful failures.

## Examples

### Market-data failure

* Display last known data when available.
* Show the last-updated timestamp.
* Display a clear unavailable state.

### AI-generation failure

* Return cached research when available.
* Retry structured generation once.
* Show a safe fallback message.

### Knowledge Graph failure

* Display related companies as a simple list.
* Do not block the rest of the company page.

### Database failure

* Show the application error boundary.
* Log the error server-side.
* Do not expose database details.

---

# 28. Observability

The MVP should track:

* API errors
* Database query failures
* OpenAI request failures
* AI validation failures
* External price-link failures
* Average AI response time
* Cache-hit rates
* Knowledge Graph query time
* Page-load performance

Use Vercel logs initially. Add Sentry if time permits.

---

# 29. Testing Strategy

## 29.1 Unit Tests

Test:

* Context Builder
* Graph transformer
* Graph traversal limits
* Market-data normalizer
* Zod schemas
* Cache-key generation
* Search ranking
* Prompt input sanitization

---

## 29.2 Integration Tests

Test:

* Supabase repository methods
* AI generation with mocked OpenAI responses
* External price-link utility
* Company page data composition
* Knowledge Graph API
* AI cache retrieval

---

## 29.3 End-to-End Tests

Critical user flows:

1. Open homepage.
2. Browse an AI category.
3. Open a company page.
4. Read the AI Investment Thesis.
5. View AI Research Engine cards.
6. Load the Knowledge Graph.
7. Open a related company.
8. Change the chart period.
9. Ask the GPT Research Assistant a question.
10. Compare two companies.

---

# 30. Deployment Architecture

```text
GitHub Repository
        │
        ▼
Vercel Deployment
        │
        ├── Next.js Frontend
        ├── Server Components
        ├── API Routes
        └── Serverless Functions
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
    Supabase   OpenAI   Market Data API
```

---

## 30.1 Deployment Environments

Use:

* Local development
* Vercel preview
* Production

Each environment should have separate environment variables.

A separate production database is preferred when time permits. For the hackathon, one Supabase project may be acceptable if changes are controlled.

---

# 31. Future Mobile Support

The system should be designed so that future mobile applications can use the same backend services.

Mobile clients should consume:

* Company endpoints
* Search endpoint
* Market-data endpoint
* Knowledge Graph endpoint
* AI thesis endpoint
* AI research endpoint
* GPT chat endpoint

Business logic must not exist only inside web UI components.

---

# 32. Hackathon Scope Controls

The following should not be implemented during the hackathon unless all P0 requirements are complete:

* Dedicated graph database
* Automated graph extraction from the web
* Autonomous research agents
* Real-time streaming market data
* Brokerage integrations
* User portfolios
* Authentication
* Watchlists
* Alerts
* Social features
* Advanced graph analytics
* Personalized investment recommendations
* Native mobile applications

---

# 33. Technical Risks and Mitigations

| Risk                                | Mitigation                              |
| ----------------------------------- | --------------------------------------- |
| GPT invents facts                   | Structured context, schemas, guardrails |
| Knowledge Graph becomes too complex | One-hop default, curated relationships  |
| External price link is unavailable  | Preserve company research and the link  |
| AI costs become excessive           | Pre-generation and caching              |
| Graph UI becomes unreadable         | Node limits and relationship filters    |
| Slow company pages                  | Parallel fetching and lazy-loaded graph |
| Inconsistent AI output              | Versioned prompts and Zod validation    |
| Invalid company relationships       | Confidence scores and source references |
| Hackathon scope becomes too large   | P0-only execution and seeded data       |

---

# 34. Architectural Decisions

## Decision 1: Use Supabase PostgreSQL as the Knowledge Graph store

Rationale:

* Faster implementation
* Existing project dependency
* Sufficient for one- and two-hop traversal
* Easy deployment
* No additional infrastructure

---

## Decision 2: Use React Flow for visualization

Rationale:

* Interactive graph support
* Custom nodes and edges
* Zooming and panning
* Faster than building a graph component from scratch

---

## Decision 3: Cache AI-generated research

Rationale:

* Faster page loading
* Lower OpenAI usage costs
* More consistent user experience
* Reduced repeated generation

---

## Decision 4: Keep GPT separate from authoritative data

Rationale:

* Reduces hallucinations
* Improves traceability
* Supports compliance-sensitive investment research
* Makes the architecture easier to test

---

## Decision 5: Use provider abstractions for market data

Rationale:

* Avoids vendor lock-in
* Allows provider replacement
* Simplifies testing
* Supports future pricing changes

---

# 35. Definition of Done

Part 5 is complete when:

1. The Next.js application follows the documented layered architecture.
2. Supabase is connected through server-side repository modules.
3. Company, category, market, product, and graph data can be retrieved.
4. The Knowledge Graph supports one-hop traversal.
5. Graph results can be transformed for React Flow.
6. The AI Context Builder assembles verified structured data.
7. AI Investment Thesis output uses validated structured JSON.
8. AI Research Engine output uses validated structured JSON.
9. GPT Research Assistant answers from scoped company context.
10. AI outputs are cached.
11. Market-data access uses a provider abstraction.
12. API inputs are validated with Zod.
13. Secrets remain server-side.
14. Historical charts render correctly.
15. Core pages include loading, empty, and error states.
16. The production application deploys successfully to Vercel.
17. The architecture is documented in the repository.

---

# 36. North Star Architecture

The architecture should allow the product to deliver the following experience:

```text
User selects an AI company
        │
        ▼
Structured company and market data establish the facts
        │
        ▼
The AI Knowledge Graph explains ecosystem relationships
        │
        ▼
The AI Investment Thesis provides a concise interpretation
        │
        ▼
The AI Research Engine provides deeper standardized analysis
        │
        ▼
The GPT Research Assistant answers follow-up questions
```

Every technical decision should support this experience while maintaining performance, accuracy, security, and implementation simplicity.
 
