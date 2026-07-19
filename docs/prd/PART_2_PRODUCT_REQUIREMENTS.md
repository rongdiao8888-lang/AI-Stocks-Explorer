
## Part 2 — Product Requirements, Functional Specifications & User Stories

## Current Hackathon Scope

The hackathon does not retrieve, persist, cache, or display in-app market prices, historical charts, or financial metrics. A company `Price` action opens the supported ticker on Yahoo Finance in a separate tab. This temporarily overrides the in-app market-data requirements below.

# 1. Purpose

This document defines the product requirements and functional specifications for AI Stocks Explorer.

It translates the product vision into concrete user experiences, features, workflows, business rules, acceptance criteria, and technical dependencies.

The product is centered on three intelligence layers:

1. **AI Investment Thesis**
   A concise, standardized explanation of why a company matters, including its investment drivers, competitive advantages, growth catalysts, and key risks.

2. **AI Research Engine**
   A deeper structured research experience covering the company’s products, technology position, customers, competitors, supply-chain influence, and AI ecosystem role.

3. **AI Knowledge Graph**
   A structured network connecting companies, products, technologies, categories, suppliers, customers, partners, manufacturers, and competitors.

These intelligence layers are supported by company discovery, AI value-chain categorization, market data, historical charts, company comparison, search, and the GPT Research Assistant.

---

# 2. Product Objectives

The MVP must help users:

* Discover publicly traded AI-related companies
* Understand each company’s role in the AI economy
* Identify important investment drivers and risks
* Explore company, technology, product, and supply-chain relationships
* Review historical market performance
* Compare companies using a standardized framework
* Ask contextual follow-up questions
* Continue research across related companies

The product should reduce the time required to move from discovering an AI company to forming a structured research view.

---

# 3. Primary User Journey

The main product experience should follow this sequence:

```text
Open AI Stocks Explorer
        │
        ▼
Browse an AI category or search for a company
        │
        ▼
Open a company research page
        │
        ▼
Read the AI Investment Thesis
        │
        ▼
Review AI Research Engine insights
        │
        ▼
Explore the AI Knowledge Graph
        │
        ▼
Review supply-chain relationships
        │
        ▼
Analyze financial metrics and historical performance
        │
        ▼
Ask the GPT Research Assistant a follow-up question
        │
        ▼
Open a related company or compare alternatives
```

The user should be able to complete this journey without creating an account.

---

# 4. Feature Priority Framework

## 4.1 P0 — Required for MVP

The following features must be complete for the hackathon release:

* Homepage
* AI Value Chain Explorer
* AI category pages
* Company directory
* Global company search
* Company research page
* AI Investment Thesis
* AI Research Engine
* AI Knowledge Graph
* AI Supply Chain Explorer
* AI Ecosystem Score
* Financial Snapshot
* Historical stock chart
* Related companies
* GPT Research Assistant
* Responsive web experience
* Loading, empty, and error states
* Public deployment

---

## 4.2 P1 — Build After P0

* Company comparison
* Search autocomplete
* Knowledge Graph relationship filters
* Suggested GPT questions
* Shareable company links
* AI research regeneration controls
* Expanded source metadata
* Basic product analytics

---

## 4.3 P2 — Future Features

* User accounts
* Watchlists
* Saved research
* Portfolio tracking
* Alerts
* News and earnings integration
* Advanced screeners
* Portfolio Knowledge Graph
* Institutional tools
* Exportable research reports
* Native mobile applications

---

# 5. Information Architecture

The primary navigation should include:

* Home
* Explore
* Companies
* AI Ecosystem
* Compare
* Search

For the hackathon MVP, the Compare page may be hidden until the P1 feature is ready.

---

## 5.1 Core Routes

```text
/
├── /explore
├── /categories
│   └── /categories/[category-slug]
├── /companies
│   └── /companies/[ticker]
├── /ecosystem
├── /compare
└── /search
```

---

# 6. Homepage

## 6.1 Purpose

The homepage must explain the product quickly and guide users into company discovery.

A first-time visitor should understand within ten seconds that AI Stocks Explorer helps investors research public companies across the AI economy.

---

## 6.2 Required Sections

The homepage should include:

1. Hero section
2. Product value proposition
3. Global search
4. AI value-chain categories
5. Featured companies
6. How the product works
7. Three intelligence pillars
8. Trust and disclaimer section
9. Footer

---

## 6.3 Hero Content

Recommended headline:

> **Understand the companies—and connections—powering the AI economy.**

Recommended supporting copy:

> Explore public AI companies through structured investment research, historical market data, and an AI Knowledge Graph connecting suppliers, customers, products, technologies, and competitors.

Primary action:

> Explore AI Companies

Secondary action:

> View the AI Ecosystem

---

## 6.4 Homepage User Stories

### User Story H-1

As a first-time visitor, I want to understand the product quickly so that I can decide whether it is relevant to my research.

### Acceptance Criteria

* The hero clearly references AI companies and investment research.
* The primary value proposition is visible without scrolling.
* The user can begin exploring in one click.
* The homepage does not require authentication.

---

### User Story H-2

As an investor, I want to browse companies by AI category so that I can discover companies beyond the stocks I already know.

### Acceptance Criteria

* Active AI categories appear as selectable cards.
* Each card includes a category name and short explanation.
* Selecting a category opens the corresponding category page.
* Categories with no companies are not displayed.

---

### User Story H-3

As a user who already knows a company, I want to search by ticker or company name so that I can open its research page directly.

### Acceptance Criteria

* Search is visible in the hero or primary navigation.
* Exact ticker matches appear first.
* Search results display company name, ticker, and category.
* Selecting a result opens the company research page.

---

# 7. AI Value Chain Explorer

## 7.1 Purpose

The AI Value Chain Explorer organizes companies according to their functional role in the AI economy.

It provides an alternative to traditional sector-based classifications.

---

## 7.2 MVP AI Categories

The MVP should support the following categories:

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

Additional categories may be introduced later, including:

* AI Healthcare
* Edge AI
* Developer Tools
* Foundation Models
* Data-Center Power and Cooling
* Optical Infrastructure
* Semiconductor Equipment

---

## 7.3 Category Card Requirements

Each category card should show:

* Category name
* Short description
* Category icon
* Number of supported companies
* Representative companies
* Link to category details

---

## 7.4 Category Page Requirements

Each category page should include:

* Category name
* Investor-friendly explanation
* Role in the AI value chain
* Key demand drivers
* Key risks
* Supported companies
* Company filters
* Company sorting
* Related categories
* Optional category-level Knowledge Graph

---

## 7.5 Category User Stories

### User Story C-1

As an investor, I want to understand each part of the AI value chain so that I can research AI opportunities beyond well-known companies.

### Acceptance Criteria

* Each category includes a plain-English explanation.
* The explanation describes why the category matters to AI.
* Companies assigned to the category are displayed.
* Primary and secondary category assignments are supported.

---

### User Story C-2

As a user, I want to compare companies within one AI category so that I can identify meaningful differences.

### Acceptance Criteria

* The category page shows consistent company metrics.
* Users can sort by company name, AI Ecosystem Score, market capitalization, or historical return when available.
* Missing metrics do not break sorting or page rendering.
* Company cards link to complete research pages.

---

# 8. Company Directory

## 8.1 Purpose

The Company Directory gives users a structured view of all supported companies.

---

## 8.2 Required Data

Each directory row or card should include:

* Company name
* Ticker
* Logo
* Primary AI category
* Secondary categories
* AI role
* AI Ecosystem Score
* Market capitalization when available
* One-year return when available

---

## 8.3 Filters

The directory should support:

* AI category
* AI revenue exposure
* AI Ecosystem Score range
* Market capitalization range
* Company name or ticker

For the hackathon, category and text search are required. Other filters may be P1.

---

## 8.4 Sorting

Supported sort options should include:

* Company name
* AI Ecosystem Score
* Market capitalization
* One-year return

---

## 8.5 Directory User Story

As an investor, I want to scan supported AI companies in a consistent format so that I can identify companies for deeper research.

### Acceptance Criteria

* The directory is searchable.
* The table or card layout works on desktop and mobile.
* Exact ticker searches are prioritized.
* Every result links to a company research page.
* Empty results show a clear message and reset action.

---

# 9. Company Research Page

## 9.1 Purpose

The Company Research Page is the primary product experience.

It must combine structured company facts, AI-generated research, market data, historical performance, ecosystem relationships, and follow-up conversation in one coherent page.

---

## 9.2 Recommended Page Hierarchy

```text
1. Company Header
2. AI Investment Thesis
3. AI Ecosystem Score
4. Investment Drivers
5. Competitive Advantages
6. Growth Catalysts
7. Key Risks
8. Historical Performance
9. AI Research Engine
10. AI Knowledge Graph
11. AI Supply Chain Explorer
12. Financial Snapshot
13. GPT Research Assistant
14. Related Companies
15. Research Disclaimer
```

The page may consolidate Investment Drivers, Competitive Advantages, Catalysts, and Risks inside the AI Investment Thesis component, but those elements must remain visible and scannable.

---

## 9.3 Company Header

The Company Header should display:

* Company name
* Ticker
* Exchange
* Logo
* Current price when available
* Daily change
* Market capitalization
* Primary category
* Secondary categories
* AI role
* Last-updated timestamp

---

## 9.4 Header Acceptance Criteria

* Company identity is immediately clear.
* Market data is visibly timestamped.
* Missing prices do not prevent the page from loading.
* Categories link back to category pages.
* The header works on desktop and mobile layouts.

---

# 10. AI Investment Thesis

## 10.1 Purpose

The AI Investment Thesis gives users the fastest structured explanation of why a company deserves further research.

It should appear near the top of the company page.

---

## 10.2 Required Content

The thesis must include:

* Thesis summary
* Investment drivers
* Competitive advantages
* Growth catalysts
* Key risks

---

## 10.3 Thesis Content Rules

The AI Investment Thesis must:

* Use structured company and Knowledge Graph context
* Remain concise
* Use plain English
* Present both opportunities and risks
* Avoid price targets
* Avoid buy, sell, or hold recommendations
* Avoid personalized advice
* Avoid unsupported customer or supplier claims
* State when information is unavailable
* Include a generation or review timestamp when practical

---

## 10.4 User Story T-1

As an investor, I want a concise explanation of why a company matters so that I can decide whether deeper research is worthwhile.

### Acceptance Criteria

* The thesis appears without requiring a chat interaction.
* The summary is understandable without advanced technical knowledge.
* Opportunities and risks are both visible.
* The content follows a consistent structure across companies.
* Cached content loads without waiting for real-time AI generation.

---

## 10.5 User Story T-2

As a cautious investor, I want the thesis to show risks alongside growth drivers so that the product does not feel promotional.

### Acceptance Criteria

* Every thesis includes at least one risk.
* Risks are visually distinguishable.
* The thesis avoids certainty about future performance.
* The disclaimer explains that the content is research, not advice.

---

# 11. AI Ecosystem Score

## 11.1 Purpose

The AI Ecosystem Score indicates the company’s strategic role and influence within the AI economy.

It is not an investment rating.

---

## 11.2 Score Range

The score should use a 0–100 scale.

Suggested dimensions:

| Dimension                   | Weight |
| --------------------------- | -----: |
| AI ecosystem role           |    25% |
| Technology leadership       |    20% |
| AI revenue exposure         |    20% |
| Strategic customer adoption |    15% |
| Competitive differentiation |    10% |
| Supply-chain influence      |    10% |

---

## 11.3 Score Display Requirements

The UI should show:

* Overall score
* Short score explanation
* Contributing dimensions when available
* A visible statement that the score is not a buy or sell rating

---

## 11.4 Score Acceptance Criteria

* The score is between 0 and 100.
* The label uses “AI Ecosystem Score.”
* The score is accompanied by an explanation.
* The score does not imply expected stock return.
* The same score appears consistently across the directory, category page, comparison page, and company page.

---

# 12. AI Research Engine

## 12.1 Purpose

The AI Research Engine provides deeper standardized analysis after the user has read the AI Investment Thesis.

It should allow users to compare companies using the same research framework.

---

## 12.2 Required Research Sections

The Research Engine should include:

1. Why This Company Matters
2. AI Value-Chain Role
3. Technology Position
4. AI Products and Platforms
5. Customer Exposure
6. Partner Ecosystem
7. Competitive Landscape
8. Supply-Chain Influence
9. Key Risks
10. AI Ecosystem Score Explanation

Investment drivers, advantages, and catalysts may also be repeated or expanded where useful.

---

## 12.3 Research Card Requirements

Each research card should include:

* Section title
* Concise explanation
* Optional supporting entities
* Optional Knowledge Graph link
* Missing-data state
* Source or update metadata when practical

---

## 12.4 Research Engine Rules

The Research Engine must:

* Use verified context
* Follow a consistent schema
* Separate factual inputs from AI interpretation
* Avoid unsupported claims
* Avoid investment recommendations
* Display balanced analysis
* Be generated or pre-generated server-side
* Use cached outputs
* Support safe fallback content

---

## 12.5 User Story R-1

As an investor, I want research organized into consistent sections so that I can evaluate different companies using the same framework.

### Acceptance Criteria

* The same core research sections appear across supported companies.
* Empty sections are hidden or marked unavailable.
* Research content is readable in card or accordion format.
* The user does not need to ask GPT to generate the standard report.
* Content is available before the GPT Research Assistant.

---

## 12.6 User Story R-2

As a technology-focused investor, I want to understand a company’s technology position so that I can assess whether its AI advantage is meaningful.

### Acceptance Criteria

* The Research Engine identifies relevant products and technologies.
* Technical concepts are explained in accessible language.
* The product does not infer unsupported technical capabilities.
* Product and technology names link to graph relationships when applicable.

---

# 13. AI Knowledge Graph

## 13.1 Purpose

The AI Knowledge Graph helps users understand how a company fits into the AI ecosystem.

It connects structured entities and relationships that are difficult to understand through tables alone.

---

## 13.2 Supported Node Types

The MVP should support:

* Company
* Product
* Technology
* AI category
* Cloud platform
* AI model
* Market segment

---

## 13.3 Supported Relationship Types

The MVP should support relationships such as:

* Manufactures for
* Manufactured by
* Supplies to
* Purchases from
* Owns product
* Uses technology
* Partners with
* Competes with
* Customer of
* Sells to
* Cloud provider for
* Uses cloud platform
* Memory supplier to
* Networking provider to
* Belongs to category
* Powers
* Powered by

---

## 13.4 Graph Interaction Requirements

Users should be able to:

* View a company as the root node
* See one-hop relationships by default
* Zoom and pan
* Select nodes
* View relationship details
* Open related company pages
* Filter relationship types
* Reset the graph
* Switch to a readable list view

Two-hop traversal is optional for the hackathon.

---

## 13.5 Knowledge Graph Constraints

For the MVP:

* Default maximum nodes: 25
* Maximum nodes per request: 50
* Default traversal depth: one
* Maximum traversal depth: two
* Low-confidence edges hidden by default
* Duplicate nodes and edges removed
* Inactive relationships excluded
* Graph must not block the rest of the company page

---

## 13.6 User Story G-1

As an investor, I want to see a company’s important relationships so that I can understand its position in the AI ecosystem.

### Acceptance Criteria

* The root company is visually prominent.
* Each edge has a readable relationship label.
* Company, product, and technology nodes are visually distinguishable.
* Users can open related company pages.
* Empty graph data shows an informative fallback.

---

## 13.7 User Story G-2

As a user, I want to filter graph relationships so that I can focus on suppliers, customers, competitors, or products.

### Acceptance Criteria

* Relationship filters are available when multiple types exist.
* Filters update the displayed graph without reloading the whole page.
* A reset option restores all default relationships.
* The graph remains readable after filtering.

This may be P1 if hackathon time is limited.

---

## 13.8 User Story G-3

As a user on a small screen or with accessibility needs, I want a nonvisual alternative so that I can understand the relationships without interacting with the graph.

### Acceptance Criteria

* The AI Supply Chain Explorer presents graph relationships as grouped lists.
* The list contains the same high-confidence relationships as the graph.
* Company entries link to their pages.
* The list remains usable when graph rendering fails.

---

# 14. AI Supply Chain Explorer

## 14.1 Purpose

The AI Supply Chain Explorer converts Knowledge Graph data into an investor-friendly relationship summary.

It complements the interactive graph and serves as a fallback experience.

---

## 14.2 Required Relationship Groups

Where available, show:

* Suppliers
* Customers
* Manufacturing partners
* Cloud partners
* Products
* Technologies
* Strategic partners
* Competitors

---

## 14.3 Relationship Card Requirements

Each relationship entry may include:

* Entity name
* Entity type
* Relationship label
* Short explanation
* Confidence indicator
* Company-page link
* Source or verification information when practical

---

## 14.4 Acceptance Criteria

* Only active, approved relationships appear.
* High-confidence relationships appear first.
* Empty groups are hidden.
* The list is understandable without graph terminology.
* The section does not make unsupported statements about relationship size or materiality.

---

# 15. Financial Snapshot

## 15.1 Purpose

The Financial Snapshot provides selected market and fundamental information without turning the product into a full financial terminal.

---

## 15.2 MVP Metrics

Display when available:

* Current price
* Daily percentage change
* Market capitalization
* Trailing P/E
* Forward P/E
* Revenue
* Revenue growth
* Gross margin
* Operating margin
* Cash
* Total debt
* One-year return
* Three-year return
* Five-year return

---

## 15.3 Financial Data Rules

* Financial values must come from approved data sources.
* GPT must not calculate or invent financial values.
* Each section should display the relevant fiscal period or update date.
* Missing values should display “Not available.”
* Metrics must use consistent formatting.
* Currency must be displayed where relevant.

---

## 15.4 Financial Snapshot User Story

As an investor, I want a concise set of financial metrics so that I can connect the company’s AI story to its market and business profile.

### Acceptance Criteria

* Metrics load independently of AI content.
* Missing metrics do not break the layout.
* The latest available period is identified.
* Values are formatted consistently.
* The section does not imply that one metric determines investment quality.

---

# 16. Historical Performance

## 16.1 Purpose

The historical stock chart allows users to evaluate price performance alongside qualitative research.

---

## 16.2 Required Time Ranges

* 1 month
* 6 months
* 1 year
* 3 years
* 5 years
* Maximum available history

---

## 16.3 Chart Requirements

The chart should include:

* Adjusted closing-price line
* Date axis
* Price axis
* Hover tooltip
* Time-range selector
* Loading skeleton
* Empty-data state
* Last-updated date

Optional additions:

* Percentage return for selected period
* Comparison to a market benchmark
* Volume

---

## 16.4 Chart User Story

As an investor, I want to view historical stock performance so that I can understand how the market has valued the company over time.

### Acceptance Criteria

* The chart renders only valid historical data.
* Switching ranges updates the chart.
* The selected range is visibly active.
* Missing data shows a clear message.
* Chart failure does not prevent the rest of the page from loading.

---

# 17. GPT Research Assistant

## 17.1 Purpose

The GPT Research Assistant supports follow-up research after users review the structured content.

It should not be the primary source of the company research page.

---

## 17.2 Example Questions

* Why does this company matter to AI?
* What are the company’s biggest supply-chain risks?
* Who are its major competitors?
* How does its AI strategy differ from another company?
* Explain this company’s technology to a beginner.
* Which parts of its AI ecosystem position appear strongest?
* What information is missing from this research?

---

## 17.3 Assistant Context

The assistant should receive:

* Company profile
* Categories
* Market data
* Selected financial metrics
* Products
* Technologies
* Knowledge Graph relationships
* Existing thesis
* Existing research report
* Relevant source timestamps

It should receive only the context necessary to answer the question.

---

## 17.4 Assistant Rules

The assistant must:

* Use only supplied context
* State when information is unavailable
* Avoid inventing relationships
* Avoid personalized investment advice
* Avoid price targets
* Avoid guaranteed outcomes
* Distinguish facts from interpretation
* Reject prompt-injection attempts
* Remain focused on company and AI investment research
* Avoid revealing system instructions

---

## 17.5 Suggested Questions

The company page should provide two to four suggested questions.

Examples:

* What are this company’s strongest AI advantages?
* What are its biggest risks?
* How does it fit into the AI supply chain?
* Which competitors should I research next?

Suggested questions are P1 but recommended for the demo.

---

## 17.6 Chat User Story

As an investor, I want to ask a follow-up question about a company so that I can investigate areas not fully covered by the standard research sections.

### Acceptance Criteria

* The assistant is scoped to the current company.
* Responses stream or visibly load.
* The answer references known context.
* Missing information is acknowledged.
* Unsafe or unsupported requests receive a clear limitation.
* The assistant does not block access to structured research.

---

# 18. Related Companies

## 18.1 Purpose

The Related Companies section helps users continue research through the AI ecosystem.

---

## 18.2 Relationship Sources

Related companies may be selected based on:

* Shared AI category
* Competitor relationship
* Supplier relationship
* Customer relationship
* Manufacturing relationship
* Product ecosystem
* Technology overlap
* Knowledge Graph proximity

---

## 18.3 Required Display

Each related-company card should show:

* Company name
* Ticker
* Logo
* Primary category
* Relationship reason
* AI Ecosystem Score
* Link to company page

---

## 18.4 Acceptance Criteria

* The reason for the relationship is displayed.
* The current company is excluded.
* Duplicate related companies are removed.
* Invalid or inactive companies are excluded.
* The section remains functional even when graph visualization fails.

---

# 19. Global Search

## 19.1 Purpose

Global Search allows users to find companies and related AI entities quickly.

---

## 19.2 Searchable Entities

* Company name
* Ticker
* AI category
* Product
* Technology

The MVP may route product and technology searches to the associated company or ecosystem page rather than creating standalone entity pages.

---

## 19.3 Search Ranking

Results should be ranked in this order:

1. Exact ticker match
2. Exact company-name match
3. Company-name prefix match
4. Company-name partial match
5. Product match
6. Technology match
7. Category match

---

## 19.4 Search Result Requirements

Each result should display:

* Title
* Entity type
* Ticker when applicable
* Category
* Short contextual description
* Destination URL

---

## 19.5 Search Acceptance Criteria

* Search is case-insensitive.
* Exact ticker results appear first.
* Blank queries are not submitted.
* Unsupported searches show a helpful empty state.
* Results return quickly enough for interactive use.
* Keyboard navigation is supported when autocomplete is implemented.

---

# 20. Company Comparison

## 20.1 Priority

Company Comparison is a P1 feature.

It should not delay completion of the core company research experience.

---

## 20.2 Comparison Scope

Users should be able to compare two to four companies.

---

## 20.3 Comparison Dimensions

* AI category
* AI role
* AI Ecosystem Score
* Market capitalization
* Valuation ratios
* Revenue growth
* Historical returns
* Investment drivers
* Competitive advantages
* Growth catalysts
* Key risks
* Products
* Technologies
* Supply-chain influence
* Customer exposure
* Competitors

---

## 20.4 Comparison User Story

As an investor, I want to compare multiple AI companies using the same research framework so that I can understand their differences.

### Acceptance Criteria

* Users can select two to four supported companies.
* Company data appears in aligned rows or columns.
* Missing values are clearly marked.
* Standardized AI research sections are comparable.
* An optional GPT comparison summary uses structured context.
* The comparison does not recommend a winner or investment action.

---

# 21. AI Value-Chain Role

## 21.1 Purpose

Every supported company should have a concise AI value-chain role.

Examples:

* AI accelerator platform provider
* Semiconductor foundry
* High-bandwidth memory supplier
* AI data-center networking provider
* Hyperscale cloud platform
* Enterprise AI software provider
* Data infrastructure platform
* Industrial robotics company

---

## 21.2 Requirements

* The role should be one concise sentence or phrase.
* It should appear on company cards and company pages.
* It should describe function, not investment quality.
* It should be grounded in approved company data.
* It should remain consistent across the product.

---

# 22. Company and Relationship Data Quality

## 22.1 Company Data Requirements

Every active company should have:

* Company name
* Ticker
* Exchange
* Slug
* Description
* Primary category
* AI role
* AI Ecosystem Score
* At least one complete research section
* At least one product, technology, or relationship where applicable

---

## 22.2 Knowledge Graph Data Requirements

Each active edge should have:

* Valid source node
* Valid target node
* Relationship type
* Direction when applicable
* Confidence level
* Active status
* Supporting explanation or source reference when practical

---

## 22.3 Confidence Rules

* High-confidence relationships may appear in all product experiences.
* Medium-confidence relationships may appear with a visible qualifier.
* Low-confidence relationships should be hidden by default.
* Unsupported relationships must not be passed to GPT as facts.

---

# 23. Data Freshness and Timestamps

The product should distinguish between:

* Live or recently updated market data
* Periodic financial metrics
* Manually reviewed company information
* Periodically generated AI research
* Curated Knowledge Graph relationships

Where practical, the UI should display:

* Market data updated time
* Financial period
* AI research generated time
* Relationship verification time

The product must not imply that all data is real time.

---

# 24. Disclaimers and Research Boundaries

A visible disclaimer should state that:

* The platform provides educational and research information.
* It does not provide personalized financial advice.
* AI-generated content may contain errors.
* Users should verify important information independently.
* Past performance does not guarantee future results.
* The AI Ecosystem Score is not an investment rating.

The disclaimer should appear:

* In the footer
* On company research pages
* Near the GPT Research Assistant
* Near any score explanation where appropriate

---

# 25. Loading States

The application should provide loading states for:

* Homepage categories
* Company directory
* Company research page
* AI Investment Thesis
* AI Research Engine
* Knowledge Graph
* Historical chart
* Financial Snapshot
* Search results
* GPT responses

Loading states should preserve page structure and reduce layout shifting.

---

# 26. Empty States

Examples include:

* No companies in a category
* No search results
* No historical prices
* No Knowledge Graph relationships
* No financial metric
* No AI research available
* No related companies

Each empty state should:

* Explain what is unavailable
* Avoid implying an application error when data is simply missing
* Provide a useful next action where possible

---

# 27. Error States

The application should handle:

* Invalid ticker
* Company not found
* Database failure
* Market-data provider failure
* AI generation failure
* AI validation failure
* Knowledge Graph retrieval failure
* Chart rendering failure
* Rate-limit errors

Core company facts should remain visible when a secondary feature fails.

For example, a graph failure must not prevent the AI Investment Thesis or financial data from displaying.

---

# 28. Responsive Design Requirements

The web application must support:

* Desktop
* Tablet
* Mobile browser

Desktop is the primary hackathon presentation environment.

On mobile:

* Research cards should stack vertically.
* Tables may convert to cards.
* Knowledge Graph interaction may be simplified.
* The AI Supply Chain Explorer should remain fully available.
* Navigation should collapse into a mobile menu.
* Tap targets should remain accessible.

---

# 29. Accessibility Requirements

The MVP should follow core accessibility practices:

* Semantic headings
* Keyboard-accessible navigation
* Visible focus states
* Sufficient color contrast
* Text alternatives for icons
* Accessible button labels
* Screen-reader labels for charts and graph controls
* Nonvisual Knowledge Graph alternative
* No essential meaning conveyed only through color
* Respect for reduced-motion preferences where practical

---

# 30. Performance Requirements

| Experience                   |                         Target |
| ---------------------------- | -----------------------------: |
| Homepage initial load        |                Under 2 seconds |
| Company page initial content |              Under 2.5 seconds |
| Search response              |         Under 300 milliseconds |
| Cached thesis or research    |         Under 500 milliseconds |
| Knowledge Graph load         |              Under 1.5 seconds |
| Historical chart load        |              Under 1.5 seconds |
| GPT streaming begins         | Within approximately 3 seconds |

The page should load core content before heavy interactive components such as the graph and chart.

---

# 31. Analytics Requirements

Basic analytics may track:

* Homepage views
* Category views
* Company-page views
* Search submissions
* Knowledge Graph interactions
* Related-company clicks
* GPT questions submitted
* Suggested-question clicks
* Comparison usage

Analytics must not capture sensitive personal investment information in the MVP.

---

# 32. Functional Requirements Summary

## FR-1: Company Discovery

The system must allow users to browse and search supported AI-related companies.

## FR-2: Category Classification

The system must support one primary and multiple secondary categories per company.

## FR-3: Company Research Page

The system must display a complete research page for every active supported company.

## FR-4: AI Investment Thesis

The system must display a structured thesis containing a summary, drivers, advantages, catalysts, and risks.

## FR-5: AI Research Engine

The system must display standardized deeper research sections.

## FR-6: AI Ecosystem Score

The system must display a 0–100 ecosystem-role score with an explanation.

## FR-7: AI Knowledge Graph

The system must retrieve and display high-confidence relationships between supported entities.

## FR-8: Supply Chain Explorer

The system must provide a list-based representation of Knowledge Graph relationships.

## FR-9: Market Data

The system must retrieve or display approved market data independently of GPT.

## FR-10: Historical Prices

The system must render historical price data across supported time ranges.

## FR-11: GPT Research Assistant

The system must answer company-scoped questions using structured context.

## FR-12: Related Companies

The system must recommend related companies with a stated relationship reason.

## FR-13: Search

The system must support search by ticker, company, category, product, and technology.

## FR-14: Missing Data

The system must display transparent missing-data states and must not ask GPT to infer unavailable facts.

## FR-15: Caching

The system must retrieve cached AI content before triggering a new generation request.

---

# 33. Non-Functional Requirements

## NFR-1: Trust

The product must separate authoritative facts from AI-generated analysis.

## NFR-2: Reliability

Failure of one secondary service must not break the entire company page.

## NFR-3: Security

API keys and service credentials must remain server-side.

## NFR-4: Performance

Core page content must render before optional graph, chart, and chat interactions.

## NFR-5: Consistency

AI outputs must follow validated schemas and standardized sections.

## NFR-6: Scalability

The architecture must support expanded company and graph coverage after the hackathon.

## NFR-7: Accessibility

The graph must have a readable nonvisual alternative.

## NFR-8: Maintainability

Company data, graph data, and prompt templates must not be hardcoded across UI components.

---

# 34. MVP Acceptance Criteria

The product is ready for the hackathon demo when:

1. The homepage clearly explains the product.
2. Users can browse all active AI categories.
3. Users can search by company name or ticker.
4. All 12 Tier 1 company pages are complete.
5. Each Tier 1 page includes an AI Investment Thesis.
6. Each Tier 1 page includes AI Research Engine content.
7. Each Tier 1 page includes an AI Ecosystem Score.
8. At least one Tier 1 company has a complete interactive Knowledge Graph.
9. All Tier 1 companies have a readable Supply Chain Explorer.
10. Historical price charts work for Tier 1 and Tier 2 companies.
11. Financial Snapshot metrics load from approved data.
12. The GPT Research Assistant answers company-specific questions.
13. AI responses acknowledge unavailable information.
14. The primary research journey works without authentication.
15. The application works on desktop and mobile browsers.
16. All core sections include loading, empty, and error states.
17. The production deployment is publicly accessible.
18. No private API keys are exposed.
19. GPT does not generate authoritative market data.
20. The product can be demonstrated within three to five minutes.

---

# 35. Out-of-Scope Requirements

The hackathon MVP will not include:

* Trade execution
* Brokerage integrations
* Personalized portfolio recommendations
* Buy, sell, or hold ratings
* Price targets
* Real-time streaming market data
* User authentication
* Watchlists
* Portfolio holdings
* Payments
* News aggregation
* Earnings alerts
* Social features
* Automated graph extraction
* Autonomous research agents
* Dedicated graph database
* Native mobile applications

---

# 36. North Star Experience

The ideal experience is:

> A user discovers an AI company, understands why it matters, sees how it connects to the AI economy, evaluates its opportunities and risks, reviews its historical performance, asks a grounded follow-up question, and continues researching related companies—all within one platform.

Part 2 is complete when every feature and requirement supports that connected research journey.
