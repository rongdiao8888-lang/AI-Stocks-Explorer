

## Part 3 — User Experience, Information Architecture & Interface Design

## Current Hackathon Scope

The hackathon does not retrieve, persist, cache, or display in-app market prices, historical charts, or financial metrics. A company `Price` action opens the supported ticker on Yahoo Finance in a separate tab. This temporarily overrides the in-app market-data experiences below.
---

# 1. Purpose

This document defines the user experience, information architecture, page structure, interaction patterns, and visual design requirements for AI Stocks Explorer.

The product must make complex AI-company research understandable without oversimplifying the underlying investment, technology, and ecosystem relationships.

The interface should guide users through three core intelligence layers:

1. **AI Investment Thesis**
   Explains why a company matters, what may drive its opportunity, and which risks require further investigation.

2. **AI Research Engine**
   Provides deeper standardized analysis across technology, products, customers, competition, catalysts, risks, and supply-chain position.

3. **AI Knowledge Graph**
   Shows how companies, products, technologies, suppliers, customers, partners, manufacturers, and competitors connect across the AI economy.

The experience should move users from discovery to understanding, then from understanding to deeper research.

---

# 2. UX Vision

> **Make the public AI economy understandable through a clear, structured, and connected research experience.**

AI Stocks Explorer should not feel like:

* A dense financial terminal
* A generic stock screener
* An unrestricted chatbot
* A technical graph database
* A collection of disconnected AI-generated summaries

It should feel like a modern research product that combines:

* Clear company discovery
* Structured investment analysis
* Visual ecosystem relationships
* Trustworthy market data
* Context-grounded AI assistance

The interface should reduce cognitive load and help users understand the most important information before presenting deeper detail.

---

# 3. UX Principles

## 3.1 Explain before expanding

Users should first receive a concise explanation of the company before viewing deeper analysis, financial metrics, graphs, or chat.

The page should answer these questions in order:

1. What does this company do?
2. Why does it matter to AI?
3. What are the primary opportunities?
4. What are the primary risks?
5. How does it connect to the broader AI ecosystem?
6. What financial and historical evidence should I review?
7. What should I investigate next?

---

## 3.2 Structured research before conversation

The product should present the AI Investment Thesis and AI Research Engine before the GPT Research Assistant.

Chat should support deeper investigation rather than acting as the primary interface.

Users should receive useful research without needing to write a prompt.

---

## 3.3 Relationships should be understandable without a graph

The AI Knowledge Graph is an important differentiator, but users should not be required to interpret a complex network visualization.

Every graph experience must also provide:

* Grouped relationship lists
* Plain-English relationship descriptions
* Clickable related companies
* Accessible nonvisual alternatives

---

## 3.4 Facts and AI analysis must look different

Authoritative data and AI-generated analysis should have distinct presentation patterns.

Examples:

| Content Type          | Recommended Presentation                     |
| --------------------- | -------------------------------------------- |
| Market price          | Metric card with timestamp                   |
| Revenue               | Financial table with fiscal period           |
| Supplier relationship | Relationship card with source metadata       |
| AI Investment Thesis  | Clearly labeled AI research panel            |
| GPT response          | Conversation panel with research disclaimer  |
| AI Ecosystem Score    | Score component with methodology explanation |

The interface must not make AI-generated interpretation appear equivalent to verified financial data.

---

## 3.5 Progressive disclosure

The interface should reveal information in layers.

Users should first see:

* Company identity
* AI role
* Thesis summary
* Key drivers
* Key risks

Users may then expand:

* Technology position
* Products
* Customers
* Competitors
* Supply chain
* Financial detail
* Knowledge Graph
* GPT follow-up analysis

This keeps the product useful for both beginner and advanced users.

---

## 3.6 Trust over visual novelty

The product may use modern visualizations and polished interactions, but credibility is more important than decoration.

Avoid:

* Excessive animation
* Unexplained scores
* Unsupported relationship claims
* Promotional language
* Overly futuristic visual effects
* Interfaces that resemble trading recommendations

---

# 4. Primary User Experience

The primary user journey is:

```text
Homepage
   │
   ▼
Browse AI category or search for company
   │
   ▼
Open company research page
   │
   ▼
Understand company identity and AI role
   │
   ▼
Read AI Investment Thesis
   │
   ▼
Review AI Research Engine
   │
   ▼
Explore AI Knowledge Graph
   │
   ▼
Review supply-chain relationships
   │
   ▼
Analyze historical performance and financial metrics
   │
   ▼
Ask GPT Research Assistant
   │
   ▼
Open related company or compare alternatives
```

The experience should support both linear exploration and direct navigation.

A user who already knows a ticker should be able to reach a company page immediately through search.

---

# 5. Information Architecture

## 5.1 Primary Navigation

The main navigation should include:

* Home
* Explore
* Companies
* AI Ecosystem
* Compare
* Search

For the hackathon MVP, the Compare navigation item may be hidden until the feature is complete.

---

## 5.2 Core Routes

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

## 5.3 Navigation Behavior

The primary navigation should:

* Remain visible on desktop
* Collapse into a mobile menu on smaller screens
* Highlight the current section
* Include global search access
* Provide direct access to company discovery
* Avoid overcrowding the header

The company page may include a sticky in-page navigation for major research sections.

---

# 6. Global Page Structure

All pages should use a consistent application shell.

```text
Global Header
      │
      ▼
Page Header or Hero
      │
      ▼
Primary Content
      │
      ▼
Supporting Content
      │
      ▼
Research Disclaimer
      │
      ▼
Footer
```

The application shell should include:

* Product logo
* Primary navigation
* Global search
* Responsive menu
* Footer navigation
* Research disclaimer
* Data and AI transparency links when available

---

# 7. Homepage Experience

## 7.1 Homepage Goal

The homepage must communicate the product’s value within ten seconds.

A first-time user should understand:

* The product focuses on publicly traded AI companies
* It helps explain how companies fit into the AI economy
* It combines market data, AI research, and ecosystem relationships
* Users can begin with search or category exploration

---

## 7.2 Recommended Homepage Structure

```text
1. Header
2. Hero
3. Global Search
4. AI Value Chain Explorer
5. Featured Companies
6. Three Intelligence Layers
7. How It Works
8. Trust and Research Boundaries
9. Footer
```

---

## 7.3 Hero Section

Recommended headline:

> **Understand the companies—and connections—powering the AI economy.**

Supporting copy:

> Research publicly traded AI companies through structured investment analysis, historical market data, and an AI Knowledge Graph connecting suppliers, customers, products, technologies, and competitors.

Primary CTA:

> Explore AI Companies

Secondary CTA:

> View the AI Ecosystem

---

## 7.4 Hero Requirements

The hero should:

* Remain concise
* Avoid large blocks of text
* Place search or a primary CTA above the fold
* Use a visual that reinforces company relationships
* Avoid displaying live market data unless it is reliable
* Work without animation

---

## 7.5 AI Value Chain Section

The homepage should display category cards for:

* AI Infrastructure (Compute & Accelerators)
* Semiconductor Manufacturing & Equipment
* Memory & Storage
* Networking & Optical Interconnect
* Cloud Platforms
* Data Infrastructure
* AI Software & Enterprise AI
* Cybersecurity
* Robotics & Industrial AI
* Autonomous Systems

Each category card should include:

* Category name
* Short description
* Icon
* Number of supported companies
* Representative company names
* Link to the category page

---

## 7.6 Featured Companies

Featured-company cards should display:

* Company logo
* Company name
* Ticker
* Primary category
* AI role
* AI Ecosystem Score
* One concise insight
* Link to the company page

Featured companies should represent multiple parts of the AI value chain.

---

## 7.7 Three Intelligence Layers

The homepage should explain:

### AI Investment Thesis

A concise summary of opportunities, advantages, catalysts, and risks.

### AI Research Engine

Standardized company research covering technology, customers, competition, and ecosystem position.

### AI Knowledge Graph

A structured map connecting companies, products, technologies, suppliers, customers, and competitors.

This section should differentiate the product from a standard stock screener or chatbot.

---

# 8. Explore Experience

## 8.1 Explore Page Goal

The Explore page should help users understand the AI value chain before selecting individual companies.

It should serve users who know they want AI exposure but do not know which companies or categories to research.

---

## 8.2 Recommended Explore Page Structure

```text
1. Page Header
2. AI Value Chain Overview
3. Category Grid
4. Featured Ecosystem Relationships
5. Company Discovery Table
6. Educational Explanation
```

---

## 8.3 Category Navigation

Users should be able to:

* Browse all categories
* Select a category
* View representative companies
* Understand how categories connect
* Move from category-level research to company-level research

Category navigation should not rely only on icons. Text labels must always be visible.

---

# 9. Category Page Experience

## 9.1 Category Page Goal

The category page should explain the role of a segment within the AI economy and help users compare the companies participating in it.

---

## 9.2 Recommended Category Page Structure

```text
1. Category Header
2. Category Description
3. Why This Category Matters
4. Key Demand Drivers
5. Key Risks
6. Supported Companies
7. Category Relationships
8. Related Categories
```

---

## 9.3 Category Header

The header should show:

* Category name
* Category icon
* Plain-English description
* Number of supported companies
* Representative companies
* Related category links

---

## 9.4 Company Display

Companies may be displayed using:

* Responsive cards
* TanStack Table
* Desktop table with mobile card conversion

Each company entry should include:

* Company name
* Ticker
* Logo
* AI role
* AI Ecosystem Score
* Market capitalization when available
* One-year return when available
* Primary or secondary category status

---

## 9.5 Category Sorting and Filtering

Required MVP controls:

* Search by company name or ticker
* Sort by company name
* Sort by AI Ecosystem Score

Optional P1 controls:

* Market capitalization
* Historical return
* AI revenue exposure
* Secondary category
* Country or exchange

---

# 10. Company Directory Experience

## 10.1 Directory Goal

The Company Directory should help users scan, search, filter, and compare supported companies efficiently.

---

## 10.2 Desktop Layout

Use a table when screen width permits.

Recommended columns:

* Company
* Ticker
* AI category
* AI role
* AI Ecosystem Score
* Market capitalization
* One-year return

The table should support sorting and clear row selection.

---

## 10.3 Mobile Layout

On mobile, convert table rows into cards.

Each card should show:

* Company identity
* Ticker
* Primary category
* AI role
* Ecosystem score
* Primary market metric
* Link to research page

Horizontal scrolling should be avoided where possible.

---

## 10.4 Empty State

When no companies match the filters, display:

* Clear explanation
* Active filter summary
* Reset-filter action
* Suggested related categories or companies

---

# 11. Company Research Page

## 11.1 Company Page Goal

The Company Research Page is the core product experience.

It should allow users to understand a company’s:

* Identity
* AI role
* Investment relevance
* Opportunities
* Risks
* Technology position
* Products
* Customers
* Suppliers
* Competitors
* Historical performance
* Financial profile
* Ecosystem relationships

---

## 11.2 Recommended Company Page Hierarchy

```text
1. Company Header

2. AI Investment Thesis

3. AI Ecosystem Score

4. AI Research Engine

5. AI Knowledge Graph

6. AI Supply Chain Explorer

7. Historical Performance

8. Financial Snapshot

9. GPT Research Assistant

10. Related Companies

11. Research Disclaimer
```

This order prioritizes understanding before detailed financial analysis and open-ended conversation.

---

# 12. Company Header

## 12.1 Required Information

The Company Header should display:

* Logo
* Company name
* Ticker
* Exchange
* Primary category
* Secondary categories
* AI value-chain role
* Current price when available
* Daily change
* Market capitalization
* Last-updated timestamp

---

## 12.2 Recommended Layout

### Desktop

```text
Logo + Company Identity                 Price and Market Summary
Ticker + Exchange                       Current Price
Category Badges                         Daily Change
AI Role                                 Market Capitalization
```

### Mobile

```text
Logo + Company Name
Ticker + Exchange
Category Badges
AI Role
Price Summary
Market Data Timestamp
```

---

## 12.3 Header Behavior

The header should:

* Display company identity immediately
* Remain readable when market data is unavailable
* Link category badges to category pages
* Avoid using promotional labels
* Clearly timestamp market data
* Support a shareable company URL

---

# 13. AI Investment Thesis Experience

## 13.1 Purpose

The AI Investment Thesis should provide the fastest high-value summary on the page.

It should appear directly below the company header.

---

## 13.2 Recommended Layout

```text
AI Investment Thesis
────────────────────────────────

Thesis Summary

Investment Drivers
• Driver
• Driver
• Driver

Competitive Advantages
• Advantage
• Advantage

Growth Catalysts
• Catalyst
• Catalyst

Key Risks
• Risk
• Risk

Generated or reviewed timestamp
Research disclaimer
```

---

## 13.3 Visual Treatment

The Thesis should:

* Use a prominent but restrained card
* Clearly identify the content as AI-generated research
* Separate opportunities and risks
* Avoid using green and red as the only distinction
* Keep lists concise
* Support collapsed and expanded states on mobile
* Display a timestamp or review status when available

---

## 13.4 Interaction Requirements

Users should be able to:

* Scan the summary without expanding the section
* Expand supporting details
* Jump to deeper Research Engine sections
* Open related products or companies when linked
* Understand that the content is not investment advice

---

# 14. AI Ecosystem Score Experience

## 14.1 Purpose

The AI Ecosystem Score communicates the company’s strategic importance within the AI economy.

It must not resemble a buy, sell, or hold rating.

---

## 14.2 Recommended Display

Show:

* Score from 0–100
* Label: “AI Ecosystem Score”
* Short explanation
* Optional contributing dimensions
* Methodology link or tooltip
* Clear statement that it is not an expected-return score

---

## 14.3 Avoid

Do not use:

* Buy or sell language
* Strong red or green investment signals
* Target-price styling
* Star ratings
* Labels such as “Strong Buy”
* Predictions of stock performance

---

# 15. AI Research Engine Experience

## 15.1 Purpose

The AI Research Engine provides deeper analysis in a consistent format across companies.

It should help users compare companies without relying on open-ended GPT prompts.

---

## 15.2 Recommended Research Sections

1. Why This Company Matters
2. AI Value-Chain Role
3. Technology Position
4. Products and Platforms
5. Customer Exposure
6. Partner Ecosystem
7. Competitive Landscape
8. Supply-Chain Influence
9. Key Risks
10. Ecosystem Score Explanation

---

## 15.3 Layout Options

Recommended desktop layout:

* Two-column research-card grid

Recommended mobile layout:

* Single-column cards or accordions

The first two or three sections should remain expanded by default.

Lower-priority details may use expandable cards.

---

## 15.4 Research Card Design

Each card should include:

* Section title
* Concise explanation
* Optional supporting entities
* Optional relationship links
* Data availability state
* Source or update information where practical

Cards should not contain long unbroken paragraphs.

Use:

* Short paragraphs
* Small groups of bullets
* Entity links
* Clearly labeled factual and analytical sections

---

# 16. AI Knowledge Graph Experience

## 16.1 Purpose

The AI Knowledge Graph should help users understand the company’s place in the AI ecosystem.

It must prioritize clarity over the number of displayed relationships.

---

## 16.2 Recommended Layout

```text
AI Knowledge Graph
────────────────────────────────

Relationship Filters
[All] [Suppliers] [Customers] [Products]
[Technologies] [Partners] [Competitors]

Graph Canvas

Relationship Legend

Selected Node or Edge Detail Panel

View as List
```

---

## 16.3 Node Types

Supported nodes should include:

* Company
* Product
* Technology
* AI category
* Cloud platform
* AI model
* Market segment

Each node type should have a distinct visual treatment.

Distinct treatment may include:

* Shape
* Icon
* Border style
* Label
* Subtle background variation

Meaning must not depend only on color.

---

## 16.4 Root Node

The selected company should:

* Appear near the center
* Be visually larger than related nodes
* Display company name and ticker
* Remain identifiable while users pan or zoom
* Reset to the center when the graph is reset

---

## 16.5 Edge Design

Each edge should:

* Show a readable relationship label
* Represent direction when direction matters
* Avoid overlapping labels where practical
* Display additional details when selected
* Distinguish high- and medium-confidence relationships

Low-confidence relationships should be hidden by default.

---

## 16.6 Graph Controls

Required controls:

* Zoom in
* Zoom out
* Fit view
* Reset graph
* Relationship filters
* View as list

Optional controls:

* One-hop or two-hop depth
* Full-screen mode
* Node-type filters
* Export image

---

## 16.7 Graph Interaction

Users should be able to:

* Select a node
* Select an edge
* Read a relationship explanation
* Open a related company page
* Filter relationship types
* Reset the visualization
* Switch to a list-based relationship view

---

## 16.8 Graph Constraints

For the MVP:

* Default maximum nodes: 25
* Absolute maximum nodes: 50
* Default depth: one hop
* Maximum depth: two hops
* Low-confidence edges hidden
* Inactive relationships excluded
* Graph lazy-loaded
* Graph failure must not block the company page

---

# 17. AI Supply Chain Explorer Experience

## 17.1 Purpose

The AI Supply Chain Explorer converts graph data into grouped, readable relationship cards.

It serves users who:

* Prefer structured lists
* Use mobile devices
* Cannot interact with the visual graph
* Want a faster summary
* Need a graph fallback

---

## 17.2 Recommended Groups

Show where available:

* Suppliers
* Customers
* Manufacturing Partners
* Cloud Partners
* Strategic Partners
* Products
* Technologies
* Competitors

---

## 17.3 Relationship Entry

Each relationship entry should show:

* Entity name
* Entity type
* Relationship description
* Confidence level when needed
* Source or verification information when available
* Link to the related company or entity

---

## 17.4 Example

```text
Manufacturing Partner

TSMC
Manufactures advanced processors designed by NVIDIA.

Relationship confidence: High
Last reviewed: [date]

View TSMC
```

The interface should not claim relationship materiality unless supported by data.

---

# 18. Historical Performance Experience

## 18.1 Purpose

The historical chart should allow users to evaluate stock performance alongside qualitative AI research.

---

## 18.2 Chart Placement

Historical performance should appear after the company’s thesis, structured research, and ecosystem relationships.

This reinforces that stock-price performance is one component of the research process, not the entire company story.

---

## 18.3 Required Controls

* 1M
* 6M
* 1Y
* 3Y
* 5Y
* Max

---

## 18.4 Chart Content

The chart should include:

* Adjusted closing-price line
* Date axis
* Price axis
* Hover tooltip
* Selected-range return when available
* Last-updated date
* Loading state
* Missing-data state

---

## 18.5 Mobile Behavior

On mobile:

* Simplify axis labels
* Maintain readable touch targets
* Support touch tooltips
* Keep the range selector horizontally usable
* Avoid placing the chart inside a narrow fixed-height card

---

# 19. Financial Snapshot Experience

## 19.1 Purpose

The Financial Snapshot should connect the AI narrative to the company’s financial and market profile.

It should not attempt to reproduce a full financial terminal.

---

## 19.2 Recommended Metric Groups

### Market Profile

* Current price
* Market capitalization
* Daily change
* One-year return
* Three-year return
* Five-year return

### Valuation

* Trailing P/E
* Forward P/E
* Dividend yield

### Business Performance

* Revenue
* Revenue growth
* Gross margin
* Operating margin
* Net income

### Balance Sheet

* Cash and equivalents
* Total debt

---

## 19.3 Layout

Use a responsive metric-card grid.

Desktop:

* Three or four columns

Tablet:

* Two columns

Mobile:

* One or two columns depending on width

Each metric should display:

* Label
* Value
* Unit or currency
* Relevant period
* Missing-data state

---

# 20. GPT Research Assistant Experience

## 20.1 Purpose

The GPT Research Assistant supports deeper follow-up analysis after users review the structured research.

The assistant should not dominate the company page.

---

## 20.2 Recommended Layout

```text
Ask About This Company
────────────────────────────────

Suggested Questions

[What are the biggest risks?]
[How does this company fit into the AI supply chain?]
[Who are its primary competitors?]

Conversation Area

Question Input
[Ask a research question...] [Send]

Research and AI disclaimer
```

---

## 20.3 Suggested Questions

Display two to four questions based on company context.

Examples:

* What are this company’s strongest AI advantages?
* What are its biggest supply-chain risks?
* How does it compare with its main competitors?
* Which related companies should I research next?

Suggested questions should help users understand the assistant’s intended scope.

---

## 20.4 Response Presentation

Each assistant response should:

* Use readable paragraphs
* Use short bullet groups when helpful
* Clearly acknowledge unavailable information
* Distinguish factual context from interpretation
* Avoid personalized investment recommendations
* Avoid price targets
* Avoid guaranteed outcomes
* Remain scoped to the selected company and ecosystem

---

## 20.5 Loading and Error Behavior

While generating:

* Show a visible streaming or loading state
* Keep the user’s question visible
* Disable duplicate submissions
* Allow the rest of the page to remain interactive

On failure:

* Preserve the user’s question
* Show a clear retry action
* Avoid exposing internal API errors
* Suggest a structured section the user can review instead

---

# 21. Related Companies Experience

## 21.1 Purpose

Related Companies should encourage continued research across the AI ecosystem.

---

## 21.2 Recommendation Logic

Related companies may be based on:

* Shared category
* Competitor relationship
* Supplier relationship
* Customer relationship
* Manufacturing relationship
* Technology overlap
* Product ecosystem
* Knowledge Graph proximity

---

## 21.3 Related Company Card

Each card should show:

* Company logo
* Company name
* Ticker
* Primary category
* Relationship reason
* AI Ecosystem Score
* Link to the research page

Examples of relationship reasons:

* Competes with NVIDIA
* Manufactures chips for NVIDIA
* Supplies memory used in AI accelerators
* Operates in AI data-center networking
* Provides cloud infrastructure for AI workloads

---

# 22. Search Experience

## 22.1 Global Search Placement

Search should be accessible from:

* Homepage hero
* Desktop header
* Mobile navigation
* Company directory
* Search results page

---

## 22.2 Searchable Entities

Search should support:

* Company name
* Ticker
* AI category
* Product
* Technology

---

## 22.3 Search Result Design

Each result should show:

* Entity title
* Entity type
* Ticker where applicable
* Primary category
* Contextual explanation
* Destination link

---

## 22.4 Search Ranking

Results should prioritize:

1. Exact ticker
2. Exact company name
3. Company-name prefix
4. Company-name partial match
5. Product
6. Technology
7. Category

---

## 22.5 Autocomplete

Autocomplete is P1 but recommended.

It should:

* Open after meaningful input
* Support keyboard navigation
* Highlight the selected result
* Close on Escape
* Close when the user clicks outside
* Limit the initial result count
* Show a link to all results

---

# 23. Company Comparison Experience

## 23.1 Priority

Company Comparison is a P1 feature.

It should not delay the core research journey.

---

## 23.2 Recommended Layout

Desktop:

* Comparison table with companies as columns

Mobile:

* Company selector with horizontally scrollable comparison sections or stacked company cards

---

## 23.3 Comparison Sections

* Company identity
* AI role
* AI Ecosystem Score
* Category
* Market capitalization
* Revenue growth
* Valuation
* Historical returns
* Investment drivers
* Competitive advantages
* Growth catalysts
* Key risks
* Products
* Technologies
* Supply-chain influence
* Competitors

---

## 23.4 Comparison Rules

The comparison experience should:

* Support two to four companies
* Use aligned fields
* Mark missing information clearly
* Avoid recommending a winner
* Use the same underlying research schemas as company pages
* Support shareable URLs when practical

---

# 24. Ecosystem Page

## 24.1 Purpose

The AI Ecosystem page should provide a broader view of the public AI economy.

It may combine:

* AI value-chain categories
* Featured company relationships
* A simplified ecosystem graph
* Key technologies
* Representative companies
* Educational explanations

---

## 24.2 Hackathon Scope

For the MVP, this page may use:

* A curated category map
* Featured relationship stories
* Selected company clusters
* Links to full company Knowledge Graphs

It should not attempt to display every company and relationship at once.

---

# 25. Visual Design Direction

## 25.1 Design Style

The product should use a modern, credible, research-oriented visual system.

Recommended characteristics:

* Light-mode primary experience
* Clean white or neutral surfaces
* Clear typography
* Subtle borders
* Moderate corner radius
* Restrained shadows
* Generous spacing
* Strong hierarchy
* Limited accent colors
* Minimal decorative gradients

The product may draw inspiration from modern SaaS and financial-research interfaces without imitating a specific brand.

---

## 25.2 Design Personality

The interface should feel:

* Intelligent
* Trustworthy
* Modern
* Calm
* Structured
* Precise
* Accessible

It should not feel:

* Speculative
* Promotional
* Gamified
* Overly technical
* Visually noisy
* Cryptocurrency-oriented
* Designed for high-frequency trading

---

# 26. Color System

Use a limited semantic color system.

Recommended roles:

* Primary accent
* Neutral background
* Surface background
* Primary text
* Secondary text
* Border
* Positive data
* Negative data
* Warning
* Informational
* AI-generated content indicator
* Graph node categories

Color should not be the only method for communicating:

* Positive or negative market movement
* Relationship type
* Confidence
* Risk
* Node type
* Active state

Use labels, icons, borders, or patterns alongside color.

---

# 27. Typography

Use a clear sans-serif typeface optimized for digital interfaces.

Typography hierarchy should include:

* Display heading
* Page heading
* Section heading
* Card heading
* Body
* Supporting text
* Metric value
* Metric label
* Caption
* Data timestamp

Financial values should use tabular numerals where supported.

Avoid:

* Very small text
* Excessive uppercase
* Long all-bold paragraphs
* Low-contrast secondary text
* Decorative fonts

---

# 28. Spacing and Layout

Use a consistent spacing scale.

Recommended page-width behavior:

* Wide enough for data and graph experiences
* Constrained enough for readable research text
* Responsive horizontal padding
* Distinct vertical spacing between major sections

Research text should not span the full width of large screens.

Charts and graphs may use wider containers than text-heavy sections.

---

# 29. Card System

The product should use reusable card types.

## 29.1 Company Card

For discovery and related-company sections.

## 29.2 Metric Card

For financial and market values.

## 29.3 Research Card

For AI Research Engine sections.

## 29.4 Relationship Card

For suppliers, customers, products, and competitors.

## 29.5 Thesis Card

For the primary AI Investment Thesis.

## 29.6 Score Card

For AI Ecosystem Score and methodology.

Each card type should remain visually distinct but part of the same design system.

---

# 30. Iconography

Use Lucide icons or another consistent icon set.

Icons should support:

* Navigation
* Category identification
* Market metrics
* AI research labels
* Graph node types
* Risk and opportunity sections
* Search
* Expand and collapse
* External links
* Information tooltips

Icons must include accessible labels where required.

Avoid using icons without accompanying text when meaning may be unclear.

---

# 31. Motion and Interaction Design

Motion should be restrained.

Appropriate uses:

* Accordion expansion
* Search-result appearance
* Tab transitions
* Graph-node selection
* Loading indicators
* Subtle card hover states

Avoid:

* Continuous decorative animation
* Large parallax effects
* Excessive graph motion
* Delayed interactions
* Animations that reduce perceived performance

Respect reduced-motion preferences where practical.

---

# 32. Responsive Design

## 32.1 Desktop

Desktop is the primary hackathon presentation environment.

The desktop experience should support:

* Two-column research layouts
* Full navigation
* Interactive graph
* Wide historical chart
* Comparison tables
* Persistent in-page navigation where useful

---

## 32.2 Tablet

Tablet layouts should:

* Reduce column count
* Preserve graph usability
* Maintain readable charts
* Use simplified navigation
* Avoid dense tables

---

## 32.3 Mobile

Mobile layouts should:

* Stack research sections
* Convert tables to cards
* Simplify graph interactions
* Prioritize Supply Chain Explorer lists
* Maintain touch-friendly controls
* Collapse primary navigation
* Preserve GPT question entry
* Avoid horizontal overflow
* Keep market metrics readable

---

# 33. Accessibility

The MVP should support core accessibility requirements.

## 33.1 Navigation

* Keyboard-accessible header
* Visible focus states
* Logical tab order
* Accessible mobile menu
* Skip-to-content link

## 33.2 Content

* Semantic heading hierarchy
* Sufficient color contrast
* Descriptive link text
* Accessible button labels
* No essential information communicated only through color

## 33.3 Charts

* Text summary of the selected period
* Accessible range controls
* Screen-reader label
* Missing-data message

## 33.4 Knowledge Graph

* List-based alternative
* Keyboard-accessible controls
* Node and edge descriptions
* Relationship details outside the canvas
* No critical content available only through hover

## 33.5 Motion

* Respect reduced-motion settings
* Avoid flashing or rapid movement

---

# 34. Loading States

Loading states should preserve page hierarchy and avoid large layout shifts.

Required skeletons or loading indicators:

* Homepage categories
* Featured companies
* Category company list
* Company header
* AI Investment Thesis
* AI Research Engine
* Knowledge Graph
* Supply Chain Explorer
* Historical chart
* Financial Snapshot
* Search results
* GPT response

Independent sections should load independently when possible.

---

# 35. Empty States

The product should provide intentional empty states.

Examples:

## No Search Results

> No supported companies, products, technologies, or categories matched your search.

Actions:

* Clear search
* Browse categories
* View all companies

## No Graph Relationships

> Verified ecosystem relationships are not yet available for this company.

Action:

* View companies in the same category

## No Historical Data

> Historical price data is currently unavailable for this company.

## No AI Research

> AI research has not yet been generated or reviewed for this company.

Empty states must not suggest that missing information is zero or unimportant.

---

# 36. Error States

The interface should handle partial failure gracefully.

## Market Data Failure

* Show last-known data when available
* Display timestamp
* Mark data as temporarily unavailable

## AI Research Failure

* Show cached content when available
* Display retry action when appropriate
* Do not block company facts

## Knowledge Graph Failure

* Display the Supply Chain Explorer list
* Show a graph-unavailable message
* Keep related-company navigation working

## Chart Failure

* Show a text fallback
* Preserve the selected time range
* Keep other page sections functional

## GPT Failure

* Preserve the submitted question
* Provide retry action
* Avoid displaying internal errors

---

# 37. Trust and Transparency

The interface should make data and AI boundaries visible.

Recommended labels:

* Market data updated
* Financial period
* AI-generated research
* Reviewed
* Relationship confidence
* Source available
* Information unavailable
* Not investment advice

The user should be able to understand:

* Which content is market data
* Which content is manually curated
* Which content is AI-generated
* When content was updated
* When information is missing
* Whether a relationship is verified

---

# 38. Research Disclaimer Placement

A concise disclaimer should appear:

* In the global footer
* Near the AI Investment Thesis
* Near the GPT Research Assistant
* Near the AI Ecosystem Score
* On comparison pages
* On company research pages

Recommended concise wording:

> AI-generated research is provided for educational purposes and may contain errors. It is not personalized investment advice. Verify important information independently.

A longer disclaimer may appear in a dedicated policy page.

---

# 39. In-Page Navigation

Company pages may use sticky in-page navigation.

Recommended items:

* Overview
* Thesis
* Research
* Knowledge Graph
* Supply Chain
* Performance
* Financials
* Ask AI

On mobile, use a horizontally scrollable tab list or simplified section menu.

The navigation should update based on the section currently in view when practical.

---

# 40. SEO and Shareability

Company and category pages should support:

* Descriptive page titles
* Meta descriptions
* Open Graph metadata
* Stable URLs
* Company ticker in URL
* Shareable research pages

Example:

```text
/companies/NVDA
/categories/ai-infrastructure
```

Public pages should render meaningful server-side content for search engines and link previews.

---

# 41. Performance Experience

The interface should feel fast even when some services are delayed.

Core company identity and cached research should appear before:

* Knowledge Graph
* Historical chart
* GPT Assistant

Recommended loading order:

```text
Company Header
      │
      ▼
Cached AI Investment Thesis
      │
      ▼
AI Research Engine
      │
      ▼
Financial Snapshot
      │
      ▼
Historical Chart
      │
      ▼
Knowledge Graph
      │
      ▼
GPT Research Assistant
```

Heavy interactive components should be lazy-loaded.

---

# 42. Analytics Events

Optional MVP analytics may track:

* Hero CTA selected
* Search submitted
* Search result selected
* Category selected
* Company page viewed
* Thesis expanded
* Research card expanded
* Graph loaded
* Graph node selected
* Relationship filter selected
* Related company selected
* Chart range changed
* Suggested GPT question selected
* GPT question submitted
* Comparison created

Analytics should not collect personal investment holdings or sensitive financial information.

---

# 43. Key Screen Acceptance Criteria

## Homepage

* Product purpose is understandable within ten seconds.
* Search and category exploration are immediately available.
* The three intelligence layers are clearly explained.
* The page works on desktop and mobile.

## Category Page

* The category’s AI role is understandable.
* Supported companies are visible and sortable.
* Company entries link to research pages.
* Missing metrics do not break the layout.

## Company Page

* Company identity and AI role are immediately clear.
* Thesis appears near the top.
* Risks are visible alongside opportunities.
* Research sections use a consistent structure.
* Graph and list views show verified relationships.
* Financial and historical data are timestamped.
* GPT is available as a follow-up tool.
* Partial feature failure does not break the page.

## Search

* Exact ticker results appear first.
* Results are understandable and actionable.
* Empty states provide useful next steps.

## Knowledge Graph

* Root company is visually clear.
* Relationships are labeled.
* Users can open related companies.
* A nonvisual list alternative exists.
* Graph failure has a readable fallback.

---

# 44. MVP Design Scope

The hackathon MVP must include polished designs for:

* Global application shell
* Homepage
* Explore page
* Category page
* Company directory
* Company research page
* AI Investment Thesis
* AI Research Engine
* AI Knowledge Graph
* AI Supply Chain Explorer
* Historical chart
* Financial Snapshot
* GPT Research Assistant
* Search
* Loading states
* Empty states
* Error states
* Responsive mobile layouts

---

# 45. P1 Design Scope

After P0 completion:

* Company comparison
* Search autocomplete
* Advanced graph filters
* Graph depth controls
* Full-screen graph mode
* Research regeneration controls
* Source-detail panels
* User feedback controls
* Share interactions
* Basic onboarding

---

# 46. Out-of-Scope UX

The hackathon should not design or build:

* Brokerage trading flows
* Personalized portfolio recommendations
* Buy, sell, or hold interfaces
* Price-target interfaces
* Authentication flows
* Subscription checkout
* Watchlist management
* Alert settings
* Native mobile navigation
* Social feeds
* Community comments
* Institutional terminal workflows
* Advanced graph-analysis dashboards

---

# 47. Design Deliverables

The design work should produce:

1. Information architecture
2. Core user flow
3. Homepage design
4. Category page design
5. Company directory design
6. Company research page design
7. AI Investment Thesis component
8. AI Research Engine components
9. Knowledge Graph interaction design
10. Supply Chain Explorer design
11. Historical chart design
12. Financial Snapshot design
13. GPT Research Assistant design
14. Responsive mobile states
15. Loading, empty, and error states
16. Design-token documentation
17. Component behavior specifications

---

# 48. Design Handoff Requirements

Each component specification should include:

* Purpose
* Content requirements
* Responsive behavior
* Interaction states
* Loading state
* Empty state
* Error state
* Accessibility requirements
* Data dependencies
* Acceptance criteria

Design files and engineering documentation should use consistent component names.

Examples:

* `AIInvestmentThesis`
* `AIResearchEngine`
* `KnowledgeGraph`
* `SupplyChainExplorer`
* `HistoricalPriceChart`
* `FinancialSnapshot`
* `GPTResearchAssistant`
* `RelatedCompanies`

---

# 49. Definition of Done

Part 3 is complete when:

1. The application has a clear information architecture.
2. The primary research journey is documented.
3. The homepage communicates the product within ten seconds.
4. Category discovery is understandable and actionable.
5. The company research page follows the required hierarchy.
6. The AI Investment Thesis appears before deeper research.
7. The AI Research Engine uses consistent research cards.
8. The Knowledge Graph has clear node, edge, and interaction rules.
9. The Supply Chain Explorer provides a complete list alternative.
10. Historical and financial data use consistent visual patterns.
11. The GPT Research Assistant appears as a follow-up tool.
12. Facts and AI-generated analysis are visually distinct.
13. Loading, empty, and error states are specified.
14. Desktop, tablet, and mobile behavior are documented.
15. Core accessibility requirements are included.
16. The interface avoids investment-recommendation language.
17. Design components map directly to the technical architecture.
18. The primary demo flow can be completed in three to five minutes.

---

# 50. North Star Experience

The ideal AI Stocks Explorer experience is:

> A user discovers a public AI company, quickly understands what it does and why it matters, reviews a balanced investment thesis, explores its technology and supply-chain relationships, evaluates its financial and historical profile, asks a grounded follow-up question, and continues researching related companies without leaving the platform.

The interface should make the public AI ecosystem feel structured, connected, and understandable rather than fragmented and overwhelming.
