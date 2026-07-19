# 
# AI Stocks Explorer

# Product Requirements Document

## Part 4 — Data Model, AI Knowledge Graph & Database Design

**Version:** 3.0
**Database:** Supabase PostgreSQL
**Product:** AI Stocks Explorer
**Status:** Hackathon MVP specification

## Current Hackathon Scope

The hackathon does not retrieve, persist, cache, or display in-app market prices, historical charts, or financial metrics. A company `Price` action opens the supported ticker on Yahoo Finance in a separate tab. The market-data tables remain reserved for a future, separately approved provider integration.

---

## 1. Purpose

This document defines the data architecture supporting AI Stocks Explorer.

The data layer must support the product’s three core AI capabilities:

1. **AI Investment Thesis** — a concise explanation of why an investor should research a company.
2. **AI Research Engine** — structured analysis covering investment drivers, competitive advantages, catalysts, risks, products, customers, and competitors.
3. **AI Knowledge Graph** — a structured map connecting companies, products, technologies, customers, suppliers, partners, and AI value-chain categories.

The database must also support:

* Company profiles
* AI categories
* Current market metrics
* Historical stock prices
* Search
* AI-generated content caching
* AI Supply Chain Explorer
* GPT Research Assistant
* Future web and mobile clients

---

# 2. Core Data Principle

> **Structured data provides the facts. GPT-5.6 provides the explanation.**

Financial data, company metadata, product information, and ecosystem relationships must come from structured database records or approved external data sources.

GPT-5.6 may:

* Explain
* Summarize
* Compare
* Organize
* Translate technical information into plain English

GPT-5.6 must not be treated as the authoritative source for:

* Stock prices
* Market capitalization
* Historical returns
* Financial ratios
* Revenue
* Customers
* Suppliers
* Competitors
* Company relationships

---

# 3. Data Architecture

```text
External Market Data API
        │
        ▼
Market Data Service
        │
        ▼
Supabase PostgreSQL
        │
        ├── Company Data
        ├── Market Data
        ├── Historical Prices
        ├── Categories
        ├── Products and Technologies
        ├── AI Knowledge Graph
        └── Cached AI Research
                 │
                 ▼
         AI Context Builder
                 │
                 ▼
            OpenAI GPT-5.6
                 │
        ┌────────┼─────────┐
        ▼        ▼         ▼
AI Investment  AI Research  GPT Research
Thesis         Engine       Assistant
        │
        ▼
User Interface
```

---

# 4. Entity Relationship Overview

```text
AI Categories
      │
      ▼
Companies
      │
      ├── Market Data
      ├── Historical Prices
      ├── Company Products
      ├── AI Roles
      ├── AI Investment Thesis
      ├── AI Research Reports
      └── Knowledge Graph Nodes
                    │
                    ▼
           Knowledge Graph Edges
                    │
         ┌──────────┼──────────┐
         ▼          ▼          ▼
     Companies   Products   Technologies
```

---

# 5. Database Design Principles

The database must follow these rules:

1. Use normalized relational tables for authoritative information.
2. Use JSONB only for structured AI outputs or flexible metadata.
3. Do not duplicate the same relationship across multiple tables.
4. Do not hardcode company data inside frontend components.
5. Every company must have a unique ticker and exchange combination.
6. AI-generated output must include generation timestamps and source-version metadata.
7. Market data and AI-generated content must have separate refresh schedules.
8. The MVP should use PostgreSQL tables as a lightweight knowledge graph.
9. Do not introduce a separate graph database during the three-day hackathon.
10. The schema must remain extensible enough to support a future graph database if needed.

---

# 6. Core Tables

## 6.1 `companies`

Stores one authoritative record for each supported public company.

| Column                | Type        | Description                               |
| --------------------- | ----------- | ----------------------------------------- |
| `id`                  | UUID        | Primary key                               |
| `company_name`        | TEXT        | Official company name                     |
| `slug`                | TEXT        | URL-safe identifier                       |
| `ticker`              | TEXT        | Market symbol                             |
| `exchange`            | TEXT        | NASDAQ, NYSE, ADR, or supported exchange  |
| `description`         | TEXT        | Verified company description              |
| `website`             | TEXT        | Official company website                  |
| `headquarters`        | TEXT        | Headquarters location                     |
| `ceo`                 | TEXT        | Current CEO when available                |
| `founded_year`        | INTEGER     | Year founded                              |
| `employee_count`      | INTEGER     | Most recently available employee count    |
| `logo_url`            | TEXT        | Company logo                              |
| `primary_category_id` | UUID        | Primary AI category                       |
| `ai_role`             | TEXT        | Concise AI ecosystem role                 |
| `ai_revenue_exposure` | TEXT        | Low, Moderate, High, or Very High         |
| `ai_ecosystem_score`  | INTEGER     | Curated score from 0–100                  |
| `coverage_tier`       | TEXT        | Tier 1, Tier 2, Tier 3, or Baseline       |
| `source_reference`    | TEXT        | Source supporting the seeded classification |
| `last_verified_at`    | TIMESTAMPTZ | Most recent source verification            |
| `is_active`           | BOOLEAN     | Whether the company is actively displayed |
| `created_at`          | TIMESTAMPTZ | Record creation time                      |
| `updated_at`          | TIMESTAMPTZ | Last update time                          |

### Constraints

* `slug` must be unique.
* `ticker + exchange` must be unique.
* `ai_ecosystem_score` must be between 0 and 100.
* `primary_category_id` must reference `ai_categories.id`.

---

## 6.2 `ai_categories`

Defines the AI value-chain categories.

| Column          | Type        | Description                   |
| --------------- | ----------- | ----------------------------- |
| `id`            | UUID        | Primary key                   |
| `name`          | TEXT        | Category name                 |
| `slug`          | TEXT        | URL-safe identifier           |
| `description`   | TEXT        | Investor-friendly description |
| `icon_name`     | TEXT        | Lucide icon identifier        |
| `display_order` | INTEGER     | Homepage ordering             |
| `is_active`     | BOOLEAN     | Visibility status             |
| `created_at`    | TIMESTAMPTZ | Creation time                 |
| `updated_at`    | TIMESTAMPTZ | Last update time              |

### MVP Categories

1. AI Infrastructure (Compute & Accelerators)
2. Semiconductor Manufacturing & Equipment
3. Memory & Storage
4. Networking & Optical Interconnect
5. Cloud Platforms
6. Data Infrastructure
7. AI Software & Enterprise AI
8. Cybersecurity
9. Robotics & Industrial AI
10. Autonomous Systems

---

## 6.3 `company_categories`

Supports verified primary and secondary assignments to the canonical categories above. A source-provided focus label, such as "Edge AI" or "Lithography", is stored as the company `ai_role`; it must not become a `company_categories` row unless it is first added to `ai_categories` through a migration.

| Column          | Type        | Description          |
| --------------- | ----------- | -------------------- |
| `id`            | UUID        | Primary key          |
| `company_id`    | UUID        | Company reference    |
| `category_id`   | UUID        | Category reference   |
| `category_type` | TEXT        | Primary or Secondary |
| `created_at`    | TIMESTAMPTZ | Creation time        |

### Example

| Company   | Category            | Type      |
| --------- | ------------------- | --------- |
| NVIDIA    | AI Infrastructure                       | Primary   |
| NVIDIA    | Networking                              | Secondary |
| Broadcom  | AI Infrastructure                       | Primary   |
| Broadcom  | Networking                              | Secondary |
| Snowflake | Data Infrastructure                     | Primary   |
| Snowflake | AI Software                             | Secondary |

---

# 7. Market Data Tables

## 7.1 `market_data`

Stores the most recent market snapshot for each company.

| Column                 | Type        | Description                   |
| ---------------------- | ----------- | ----------------------------- |
| `company_id`           | UUID        | Company reference             |
| `current_price`        | NUMERIC     | Latest supported price        |
| `daily_change`         | NUMERIC     | Price change                  |
| `daily_change_percent` | NUMERIC     | Percentage change             |
| `market_cap`           | NUMERIC     | Market capitalization         |
| `pe_ratio`             | NUMERIC     | Trailing P/E                  |
| `forward_pe`           | NUMERIC     | Forward P/E when available    |
| `dividend_yield`       | NUMERIC     | Dividend yield                |
| `volume`               | BIGINT      | Latest volume                 |
| `one_year_return`      | NUMERIC     | One-year total price return   |
| `three_year_return`    | NUMERIC     | Three-year total price return |
| `five_year_return`     | NUMERIC     | Five-year total price return  |
| `currency`             | TEXT        | Pricing currency              |
| `data_source`          | TEXT        | Market-data provider          |
| `last_updated`         | TIMESTAMPTZ | Refresh timestamp             |

Market values must never be generated by GPT.

---

## 7.2 `historical_prices`

Stores daily price history.

| Column           | Type        | Description            |
| ---------------- | ----------- | ---------------------- |
| `id`             | BIGSERIAL   | Primary key            |
| `company_id`     | UUID        | Company reference      |
| `trading_date`   | DATE        | Trading date           |
| `open`           | NUMERIC     | Opening price          |
| `high`           | NUMERIC     | Daily high             |
| `low`            | NUMERIC     | Daily low              |
| `close`          | NUMERIC     | Closing price          |
| `adjusted_close` | NUMERIC     | Adjusted closing price |
| `volume`         | BIGINT      | Trading volume         |
| `data_source`    | TEXT        | Provider               |
| `created_at`     | TIMESTAMPTZ | Import time            |

### Constraint

The combination of `company_id` and `trading_date` must be unique.

---

## 7.3 `financial_metrics`

Stores selected company fundamentals.

| Column                 | Type        |
| ---------------------- | ----------- |
| `company_id`           | UUID        |
| `fiscal_period`        | TEXT        |
| `revenue`              | NUMERIC     |
| `revenue_growth`       | NUMERIC     |
| `gross_margin`         | NUMERIC     |
| `operating_margin`     | NUMERIC     |
| `net_income`           | NUMERIC     |
| `eps`                  | NUMERIC     |
| `cash_and_equivalents` | NUMERIC     |
| `total_debt`           | NUMERIC     |
| `data_source`          | TEXT        |
| `last_updated`         | TIMESTAMPTZ |

---

# 8. Products and Technologies

## 8.1 `company_products`

Stores AI-related products and platforms.

| Column         | Type        | Description                                  |
| -------------- | ----------- | -------------------------------------------- |
| `id`           | UUID        | Primary key                                  |
| `company_id`   | UUID        | Company reference                            |
| `product_name` | TEXT        | Product name                                 |
| `product_slug` | TEXT        | URL-safe identifier                          |
| `product_type` | TEXT        | GPU, software, memory, cloud, platform, etc. |
| `description`  | TEXT        | Verified description                         |
| `ai_relevance` | TEXT        | Explanation of AI relevance                  |
| `is_active`    | BOOLEAN     | Current status                               |
| `created_at`   | TIMESTAMPTZ | Creation time                                |
| `updated_at`   | TIMESTAMPTZ | Last update time                             |

### Examples

* NVIDIA — CUDA
* NVIDIA — Blackwell
* Microsoft — Azure AI
* Microsoft — Copilot
* Palantir — Artificial Intelligence Platform
* Micron — High-Bandwidth Memory
* Arista Networks — Data Center Switching

---

## 8.2 `technologies`

Stores reusable technical concepts represented in the knowledge graph.

| Column            | Type        |
| ----------------- | ----------- |
| `id`              | UUID        |
| `name`            | TEXT        |
| `slug`            | TEXT        |
| `technology_type` | TEXT        |
| `description`     | TEXT        |
| `created_at`      | TIMESTAMPTZ |
| `updated_at`      | TIMESTAMPTZ |

### Examples

* GPU Computing
* High-Bandwidth Memory
* AI Inference
* AI Training
* Cloud Computing
* Ethernet Networking
* Semiconductor Fabrication
* Enterprise AI
* Autonomous Vehicle Systems

---

# 9. AI Knowledge Graph

## 9.1 Purpose

The AI Knowledge Graph connects the entities that make up the AI ecosystem.

It must answer questions such as:

* Who manufactures NVIDIA’s chips?
* Which companies supply high-bandwidth memory?
* Which cloud providers purchase AI accelerators?
* Which products compete with one another?
* Which companies depend on TSMC?
* How does Micron fit into the AI value chain?
* Which technologies connect Broadcom to AI infrastructure?

The graph powers:

* AI Supply Chain Explorer
* Related-company navigation
* GPT context
* Company relationship cards
* Ecosystem explanations
* Future comparison and discovery features

---

## 9.2 Knowledge Graph Node Types

The MVP supports these node types:

* Company
* Product
* Technology
* AI Category
* Cloud Platform
* AI Model
* Market Segment

---

## 9.3 `knowledge_graph_nodes`

Provides a unified reference for graph entities.

| Column        | Type        | Description                                  |
| ------------- | ----------- | -------------------------------------------- |
| `id`          | UUID        | Graph node ID                                |
| `node_type`   | TEXT        | Company, Product, Technology, Category, etc. |
| `entity_id`   | UUID        | ID from the source entity table              |
| `name`        | TEXT        | Display name                                 |
| `slug`        | TEXT        | URL-safe identifier                          |
| `description` | TEXT        | Short explanation                            |
| `metadata`    | JSONB       | Optional flexible metadata                   |
| `created_at`  | TIMESTAMPTZ | Creation time                                |
| `updated_at`  | TIMESTAMPTZ | Last update time                             |

`entity_id` references the relevant company, product, category, or technology record at the application layer.

---

## 9.4 `relationship_types`

Defines supported graph relationships.

| Column           | Type    | Description                          |
| ---------------- | ------- | ------------------------------------ |
| `id`             | UUID    | Primary key                          |
| `name`           | TEXT    | Relationship label                   |
| `slug`           | TEXT    | Stable identifier                    |
| `inverse_name`   | TEXT    | Reverse relationship                 |
| `description`    | TEXT    | Relationship meaning                 |
| `is_directional` | BOOLEAN | Whether direction matters            |
| `display_group`  | TEXT    | Supplier, customer, competitor, etc. |

### MVP Relationship Types

| Relationship           | Inverse              |
| ---------------------- | -------------------- |
| Manufactures For       | Manufactured By      |
| Supplies To            | Purchases From       |
| Uses Technology        | Used By              |
| Owns Product           | Product Owned By     |
| Competes With          | Competes With        |
| Partners With          | Partners With        |
| Cloud Provider For     | Uses Cloud Platform  |
| Memory Supplier To     | Uses Memory From     |
| Networking Provider To | Uses Networking From |
| Customer Of            | Sells To             |
| Powers                 | Powered By           |
| Belongs To Category    | Contains Company     |

---

## 9.5 `knowledge_graph_edges`

Stores relationships between graph nodes.

| Column                 | Type        | Description                 |
| ---------------------- | ----------- | --------------------------- |
| `id`                   | UUID        | Primary key                 |
| `source_node_id`       | UUID        | Starting node               |
| `target_node_id`       | UUID        | Destination node            |
| `relationship_type_id` | UUID        | Relationship definition     |
| `description`          | TEXT        | Human-readable explanation  |
| `confidence_level`     | TEXT        | High, Medium, or Low        |
| `source_reference`     | TEXT        | Supporting source or note   |
| `valid_from`           | DATE        | Optional effective date     |
| `valid_to`             | DATE        | Optional end date           |
| `is_active`            | BOOLEAN     | Current relationship status |
| `created_at`           | TIMESTAMPTZ | Creation time               |
| `updated_at`           | TIMESTAMPTZ | Last update time            |

### Example Edges

| Source          | Relationship           | Target          |
| --------------- | ---------------------- | --------------- |
| TSMC            | Manufactures For       | NVIDIA          |
| Micron          | Memory Supplier To     | NVIDIA          |
| NVIDIA          | Owns Product           | CUDA            |
| NVIDIA          | Owns Product           | Blackwell       |
| Microsoft       | Purchases From         | NVIDIA          |
| NVIDIA          | Competes With          | AMD             |
| Arista Networks | Networking Provider To | Cloud Platforms |
| Microsoft       | Owns Product           | Azure AI        |
| Snowflake       | Uses Technology        | Cloud Computing |
| Palantir        | Belongs To Category    | AI Software     |

---

## 9.6 Knowledge Graph MVP Scope

For the three-day hackathon:

* Use Supabase PostgreSQL.
* Seed graph records manually.
* Focus on the most important companies and relationships.
* Build graph traversal for one or two relationship levels.
* Do not implement graph-machine-learning algorithms.
* Do not introduce Neo4j or another database.
* Do not attempt to automatically discover all company relationships.
* Prioritize relationship quality over relationship quantity.

The initial graph should contain approximately:

* 64 supported companies, with deep graph coverage prioritized for the 12 Tier 1 companies
* 50–60 products and technologies
* 100–120 high-confidence relationships

---

# 10. AI Investment Thesis

## 10.1 `company_ai_theses`

Stores the standardized AI Investment Thesis displayed near the top of each company page.

| Column                   | Type        | Description                  |
| ------------------------ | ----------- | ---------------------------- |
| `id`                     | UUID        | Primary key                  |
| `company_id`             | UUID        | Company reference            |
| `thesis_summary`         | TEXT        | One- or two-paragraph thesis |
| `investment_drivers`     | JSONB       | List of key drivers          |
| `competitive_advantages` | JSONB       | List of advantages           |
| `growth_catalysts`       | JSONB       | List of catalysts            |
| `key_risks`              | JSONB       | List of risks                |
| `source_data_version`    | TEXT        | Context version used         |
| `model_name`             | TEXT        | Model used                   |
| `prompt_version`         | TEXT        | Prompt-template version      |
| `generated_at`           | TIMESTAMPTZ | Generation time              |
| `expires_at`             | TIMESTAMPTZ | Cache expiration             |
| `review_status`          | TEXT        | Draft, Reviewed, Approved    |

### Expected JSONB format

```json
{
  "investment_drivers": [
    "Leadership in AI accelerator hardware",
    "Large developer ecosystem",
    "Strong hyperscaler demand"
  ]
}
```

---

# 11. AI Research Engine

## 11.1 `company_ai_research`

Stores deeper structured AI research.

| Column                      | Type        | Description                             |
| --------------------------- | ----------- | --------------------------------------- |
| `id`                        | UUID        | Primary key                             |
| `company_id`                | UUID        | Company reference                       |
| `why_it_matters`            | TEXT        | Strategic AI importance                 |
| `value_chain_role`          | TEXT        | Role in the ecosystem                   |
| `technology_position`       | TEXT        | Technology positioning                  |
| `customer_exposure_summary` | TEXT        | Customer ecosystem summary              |
| `competitive_landscape`     | TEXT        | Competitive summary                     |
| `risk_summary`              | TEXT        | Risk explanation                        |
| `ai_ecosystem_score`        | INTEGER     | Ecosystem score                         |
| `score_explanation`         | TEXT        | Why the score was assigned              |
| `research_sections`         | JSONB       | Optional additional structured sections |
| `source_data_version`       | TEXT        | Context version                         |
| `model_name`                | TEXT        | Model used                              |
| `prompt_version`            | TEXT        | Prompt version                          |
| `generated_at`              | TIMESTAMPTZ | Generation time                         |
| `expires_at`                | TIMESTAMPTZ | Cache expiration                        |
| `review_status`             | TEXT        | Draft, Reviewed, Approved               |

The AI Ecosystem Score represents ecosystem role and influence. It is not an investment recommendation or expected-return score.

---

# 12. GPT Research Assistant

## 12.1 `ai_prompt_cache`

Stores reusable responses to repeated questions.

| Column                | Type        |
| --------------------- | ----------- |
| `id`                  | UUID        |
| `company_id`          | UUID        |
| `prompt_hash`         | TEXT        |
| `normalized_question` | TEXT        |
| `response_text`       | TEXT        |
| `context_version`     | TEXT        |
| `model_name`          | TEXT        |
| `created_at`          | TIMESTAMPTZ |
| `expires_at`          | TIMESTAMPTZ |

Full user chat histories are not required for the hackathon MVP.

---

# 13. AI Context Builder

The Context Builder assembles verified company information and relevant graph relationships before calling GPT-5.6.

Example:

```json
{
  "company": {
    "name": "NVIDIA",
    "ticker": "NVDA",
    "primary_category": "AI Infrastructure",
    "secondary_categories": ["Networking"],
    "ai_role": "AI accelerator and computing platform leader",
    "ai_ecosystem_score": 100
  },
  "market_data": {
    "current_price": "provided by market data service",
    "market_cap": "provided by market data service",
    "one_year_return": "provided by market data service"
  },
  "products": [
    "CUDA",
    "Blackwell",
    "DGX",
    "NVLink"
  ],
  "knowledge_graph": {
    "manufactured_by": ["TSMC"],
    "memory_suppliers": ["Micron", "SK Hynix"],
    "customers": ["Microsoft", "Amazon", "Alphabet", "Meta"],
    "competitors": ["AMD", "Intel"],
    "related_technologies": [
      "GPU Computing",
      "AI Training",
      "AI Inference"
    ]
  }
}
```

The Context Builder must:

* Fetch only relevant records.
* Exclude expired or inactive graph edges.
* Include source timestamps.
* Avoid unnecessary token usage.
* Never insert unknown data.
* Clearly mark unavailable fields.

---

# 14. Search Architecture

Search must support:

* Company name
* Ticker
* Category
* Product
* Technology

For the MVP, use PostgreSQL full-text search or optimized `ILIKE` queries.

Optional table:

## `search_documents`

| Column            | Type        |
| ----------------- | ----------- |
| `id`              | UUID        |
| `entity_type`     | TEXT        |
| `entity_id`       | UUID        |
| `title`           | TEXT        |
| `ticker`          | TEXT        |
| `searchable_text` | TSVECTOR    |
| `updated_at`      | TIMESTAMPTZ |

---

# 15. Canonical MVP Company and Category Seed Data

The MVP supports exactly 64 active public issuers. This is the authoritative company scope for Milestone 2 and is mirrored in `lib/config/company-universe.ts`.

The supplied source document described this as a 74-company taxonomy, but its enumerated public-company rows total 64. The rows are the authoritative count. Redis is excluded because the source explicitly identifies it as private. Juniper Networks is replaced by Hewlett Packard Enterprise because HPE completed its acquisition of Juniper in July 2025, so `JNPR` is no longer an active standalone ticker. See [HPE's acquisition announcement](https://www.hpe.com/us/en/newsroom/press-release/2025/07/hewlett-packard-enterprise-closes-acquisition-of-juniper-networks-to-offer-industry-leading-comprehensive-cloud-native-ai-driven-portfolio.html).

Each company appears once under its primary category. `AI focus` preserves the source document's descriptive classification and is not a secondary `company_categories` assignment. The 12 source-recommended richest experiences are marked Tier 1; all remaining companies start with baseline profiles until Tier 2 and Tier 3 coverage is explicitly assigned.

### 15.1 AI Infrastructure (Compute & Accelerators)

| Company                | Ticker | AI focus                    | Coverage |
| ---------------------- | ------ | --------------------------- | -------- |
| NVIDIA                 | NVDA   | Networking                  | Tier 1   |
| Advanced Micro Devices | AMD    | —                           | Tier 1   |
| Broadcom               | AVGO   | Networking                  | Tier 1   |
| Qualcomm               | QCOM   | Edge AI                     | Baseline |
| Marvell Technology     | MRVL   | Networking                  | Baseline |
| Intel                  | INTC   | Semiconductor Manufacturing | Baseline |
| Arm Holdings           | ARM    | AI Software                 | Baseline |
| Astera Labs            | ALAB   | Data Center Connectivity    | Baseline |

### 15.2 Semiconductor Manufacturing & Equipment

| Company               | Ticker | AI focus                   | Coverage |
| --------------------- | ------ | -------------------------- | -------- |
| Taiwan Semiconductor  | TSM    | —                          | Tier 1   |
| GlobalFoundries       | GFS    | —                          | Baseline |
| ASML Holding          | ASML   | Lithography                | Baseline |
| Applied Materials     | AMAT   | Semiconductor Equipment    | Baseline |
| Lam Research          | LRCX   | Semiconductor Equipment    | Baseline |
| KLA Corporation       | KLAC   | Semiconductor Inspection   | Baseline |
| Tokyo Electron        | TOELY  | Semiconductor Equipment    | Baseline |

### 15.3 Memory & Storage

| Company           | Ticker | AI focus           | Coverage |
| ----------------- | ------ | ------------------ | -------- |
| Micron Technology | MU     | —                  | Tier 1   |
| Western Digital   | WDC    | Storage            | Baseline |
| Seagate Technology | STX    | Storage            | Baseline |
| Pure Storage      | PSTG   | Enterprise Storage | Baseline |
| NetApp            | NTAP   | Data Infrastructure | Baseline |

### 15.4 Networking & Optical Interconnect

| Company                    | Ticker | AI focus                              | Coverage |
| -------------------------- | ------ | ------------------------------------- | -------- |
| Arista Networks            | ANET   | AI Infrastructure                     | Tier 1   |
| Cisco Systems              | CSCO   | Cybersecurity                         | Baseline |
| Hewlett Packard Enterprise | HPE    | AI-native networking (Juniper portfolio) | Baseline |
| Ciena                      | CIEN   | Optical Networking                    | Baseline |
| Corning                    | GLW    | Fiber Infrastructure                  | Baseline |
| Lumentum                   | LITE   | Optical Components                    | Baseline |
| Coherent                   | COHR   | Optical Components                    | Baseline |

### 15.5 Cloud Platforms

| Company   | Ticker | AI focus            | Coverage |
| --------- | ------ | ------------------- | -------- |
| Microsoft | MSFT   | AI Software         | Tier 1   |
| Amazon    | AMZN   | AI Infrastructure   | Tier 1   |
| Alphabet  | GOOGL  | AI Software         | Tier 1   |
| Oracle    | ORCL   | Data Infrastructure | Baseline |
| IBM       | IBM    | Enterprise AI       | Baseline |

### 15.6 Data Infrastructure

| Company    | Ticker | AI focus       | Coverage |
| ---------- | ------ | -------------- | -------- |
| Snowflake  | SNOW   | AI Software    | Tier 1   |
| MongoDB    | MDB    | AI Software    | Baseline |
| Datadog    | DDOG   | Observability  | Baseline |
| Elastic    | ESTC   | Search         | Baseline |
| Confluent  | CFLT   | Data Streaming | Baseline |
| Cloudflare | NET    | Edge Platform  | Baseline |

### 15.7 AI Software & Enterprise AI

| Company               | Ticker | AI focus            | Coverage |
| --------------------- | ------ | ------------------- | -------- |
| Palantir Technologies | PLTR   | Data Infrastructure | Tier 1   |
| C3.ai                 | AI     | Enterprise AI       | Baseline |
| ServiceNow            | NOW    | Workflow AI         | Baseline |
| Adobe                 | ADBE   | Generative AI       | Baseline |
| Salesforce            | CRM    | AI CRM              | Baseline |
| GitLab                | GTLB   | AI Developer Tools  | Baseline |
| UiPath                | PATH   | AI Automation       | Baseline |
| Pegasystems           | PEGA   | AI Automation       | Baseline |

### 15.8 Cybersecurity

| Company             | Ticker | AI focus          | Coverage |
| ------------------- | ------ | ----------------- | -------- |
| CrowdStrike         | CRWD   | AI Software       | Baseline |
| Palo Alto Networks  | PANW   | AI Platform       | Baseline |
| SentinelOne         | S      | Endpoint AI       | Baseline |
| Zscaler             | ZS     | Cloud Security    | Baseline |
| Fortinet            | FTNT   | Network Security  | Baseline |
| CyberArk            | CYBR   | Identity Security | Baseline |

### 15.9 Robotics & Industrial AI

| Company              | Ticker | AI focus               | Coverage |
| -------------------- | ------ | ---------------------- | -------- |
| ABB                  | ABB    | Industrial Automation  | Baseline |
| Symbotic             | SYM    | Warehouse Automation   | Baseline |
| Rockwell Automation  | ROK    | Factory Automation     | Baseline |
| Teradyne             | TER    | Robotics               | Baseline |
| Emerson Electric     | EMR    | Industrial AI          | Baseline |
| Honeywell            | HON    | Industrial AI          | Baseline |

### 15.10 Autonomous Systems

| Company          | Ticker | AI focus              | Coverage |
| ---------------- | ------ | --------------------- | -------- |
| Tesla            | TSLA   | Robotics              | Tier 1   |
| Mobileye Global  | MBLY   | Automotive AI         | Baseline |
| Aurora Innovation | AUR    | Autonomous Driving    | Baseline |
| Uber Technologies | UBER   | Autonomous Mobility   | Baseline |
| Pony AI          | PONY   | Robotaxi              | Baseline |
| WeRide           | WRD    | Robotaxi              | Baseline |

---

# 16. AI Ecosystem Score

Each company receives a score from 0–100 representing its strategic role in the AI ecosystem.

The score is not based on stock valuation or expected investment returns.

Suggested dimensions:

| Dimension                   | Weight |
| --------------------------- | -----: |
| AI ecosystem role           |    25% |
| Technology leadership       |    20% |
| AI revenue exposure         |    20% |
| Strategic customer adoption |    15% |
| Competitive differentiation |    10% |
| Supply-chain influence      |    10% |

The MVP may use manually curated scores.

Future versions may implement a documented scoring methodology.

---

# 17. Data Refresh Strategy

| Data Type                     | MVP Refresh Frequency                 |
| ----------------------------- | ------------------------------------- |
| Current market data           | Daily or API request                  |
| Historical prices             | Daily                                 |
| Company profiles              | Monthly or manually                   |
| Products and technologies     | Manually                              |
| Knowledge Graph relationships | Manually                              |
| AI Investment Thesis          | Every 30 days or after source changes |
| AI Research Engine            | Every 30 days or after source changes |
| GPT prompt cache              | Seven days                            |
| AI categories                 | Rarely                                |

---

# 18. Data Provenance

Every meaningful factual record should include provenance when practical.

Recommended fields:

* `data_source`
* `source_reference`
* `source_updated_at`
* `last_verified_at`
* `verified_by`
* `confidence_level`

For the hackathon, these fields can initially be optional. The architecture should support them from the start.

---

# 19. Indexes

Create database indexes for:

* `companies.ticker`
* `companies.slug`
* `companies.company_name`
* `companies.primary_category_id`
* `company_categories.company_id`
* `company_categories.category_id`
* `historical_prices.company_id`
* `historical_prices.trading_date`
* `knowledge_graph_nodes.node_type`
* `knowledge_graph_nodes.entity_id`
* `knowledge_graph_edges.source_node_id`
* `knowledge_graph_edges.target_node_id`
* `knowledge_graph_edges.relationship_type_id`
* `knowledge_graph_edges.is_active`
* `company_ai_theses.company_id`
* `company_ai_research.company_id`
* `ai_prompt_cache.prompt_hash`

---

# 20. Security

The database layer must follow these requirements:

* Keep the Supabase service-role key server-side.
* Enable Row Level Security where appropriate.
* Public users receive read-only access to approved records.
* AI cache writes occur only through trusted server routes.
* Validate ticker, company ID, and prompt inputs.
* Use parameterized queries.
* Never expose private environment variables.
* Never return internal database errors directly to users.
* Apply rate limiting to AI-generation endpoints.

---

# 21. Error and Missing-Data Handling

The application must tolerate incomplete records.

Examples:

* Display `Not available` when a P/E ratio does not exist.
* Do not display an empty product section.
* Do not ask GPT to infer a missing customer relationship.
* Show a clear message when historical data is unavailable.
* Exclude low-confidence knowledge-graph edges from authoritative summaries.
* Label estimates or manually curated information when applicable.

---

# 22. Scalability

The schema must support:

* More than 1,000 public companies
* International listings and ADRs
* Additional AI categories
* Thousands of graph nodes
* Tens of thousands of graph edges
* New entity types
* Additional research reports
* User watchlists and portfolios
* Web and mobile clients
* Future migration to a dedicated graph database

The hackathon MVP should remain intentionally smaller.

---

# 23. Future Tables — Not Implemented in MVP

The architecture may later support:

* `users`
* `watchlists`
* `watchlist_items`
* `portfolios`
* `portfolio_holdings`
* `saved_searches`
* `chat_sessions`
* `chat_messages`
* `company_news`
* `earnings_events`
* `analyst_estimates`
* `ai_research_versions`
* `user_feedback`

Do not implement these during the hackathon unless all P0 functionality is complete.

---

# 24. MVP Definition of Done

The Part 4 data layer is complete when:

1. All 10 AI categories are stored.
2. The initial company list is seeded.
3. Primary and secondary categories work.
4. Current market data can be retrieved or mocked through a clear service boundary.
5. Historical price data supports chart rendering.
6. Company products and technologies are stored.
7. The AI Knowledge Graph contains high-confidence relationships.
8. The AI Investment Thesis can be stored and retrieved.
9. AI Research Engine output can be stored and retrieved.
10. The GPT Context Builder can assemble company, market, product, and graph data.
11. Search works by company name, ticker, category, product, and technology.
12. No authoritative financial data is generated by GPT.
13. Database migrations and seed instructions are documented.

---

# 25. Architectural Decision

For the hackathon, the AI Knowledge Graph will be implemented using relational PostgreSQL tables in Supabase.

This decision provides:

* Faster implementation
* Simpler deployment
* Lower operational complexity
* Strong compatibility with the existing stack
* Sufficient functionality for the MVP

A dedicated graph database should only be evaluated after the product requires complex multi-hop traversal, graph analytics, or substantially larger relationship datasets.
