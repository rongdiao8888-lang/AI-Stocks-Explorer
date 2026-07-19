# AI Stocks Explorer

# Product Requirements Document

## Part 1 — Executive Summary, Product Vision & Core Value Proposition

## Current Hackathon Scope

The hackathon does not retrieve, persist, cache, or display in-app market prices, historical charts, or financial metrics. A company `Price` action opens the supported ticker on Yahoo Finance in a separate tab. This temporary constraint does not change the longer-term product vision.

---

# 1. Executive Summary

AI Stocks Explorer is an AI-native investment research platform that helps investors discover, understand, and research publicly traded companies building the AI economy.

Traditional stock platforms organize companies primarily by sectors, market metrics, or price performance. They are useful for finding financial data, but they do not clearly explain how companies participate in the AI ecosystem, how they depend on one another, or why their position in the AI value chain matters.

AI Stocks Explorer addresses this gap by organizing public companies across the AI value chain and combining structured market data with three core intelligence layers:

1. **AI Investment Thesis**
   A concise, standardized explanation of why a company matters, its primary growth drivers, competitive advantages, catalysts, and risks.

2. **AI Research Engine**
   A deeper structured research experience covering the company’s technology position, products, customers, competitors, supply-chain influence, and role in the AI ecosystem.

3. **AI Knowledge Graph**
   A network of verified relationships connecting companies, products, technologies, categories, suppliers, customers, partners, manufacturers, and competitors.

These capabilities are supported by historical market data, financial metrics, company comparison, search, and a GPT Research Assistant that answers follow-up questions using structured company and Knowledge Graph context.

The product is designed to transform fragmented AI investment information into a clear and understandable map of the public AI economy.

---

# 2. Product Vision

> **Build the most understandable and trusted platform for researching the public companies powering the AI economy.**

AI Stocks Explorer should become the place investors use to answer three fundamental questions:

1. Which companies are building the AI ecosystem?
2. How do those companies fit together?
3. Why does each company matter from an investment-research perspective?

The long-term vision is to evolve from a company discovery tool into a broader AI ecosystem intelligence platform that helps users understand company relationships, supply-chain dependencies, competitive positioning, technology exposure, and portfolio concentration across the AI economy.

---

# 3. Product Mission

The mission of AI Stocks Explorer is:

> **Help investors make better-informed research decisions by turning complex AI company, market, and ecosystem data into structured, understandable, and trustworthy intelligence.**

The product should not replace professional financial advice or provide personalized investment recommendations.

Instead, it should help users:

* Discover relevant AI companies
* Understand each company’s role
* Evaluate opportunities and risks
* Explore ecosystem relationships
* Compare companies more intelligently
* Ask better investment-research questions

---

# 4. Problem Statement

Investors interested in AI face a fragmented and confusing research process.

A typical research journey may require:

* Screening stocks on one platform
* Reading company filings on another
* Searching for product information
* Researching suppliers and customers
* Comparing historical performance
* Reading multiple analyst articles
* Using a general-purpose chatbot for explanations
* Manually connecting information across sources

This creates several problems.

## 4.1 AI companies are difficult to categorize

Many companies participate in multiple parts of the AI ecosystem.

For example:

* NVIDIA provides AI accelerators, networking, software, and developer tools.
* Microsoft participates in cloud infrastructure, enterprise AI software, foundation-model distribution, and AI productivity tools.
* Broadcom participates in semiconductors, networking, and custom AI accelerators.
* Snowflake participates in data infrastructure, cloud software, and enterprise AI.

Traditional sector classifications do not fully explain these roles.

---

## 4.2 Stock data lacks ecosystem context

Most investment platforms provide:

* Price
* Market capitalization
* Valuation ratios
* Revenue
* Earnings
* News
* Charts

They do not clearly explain:

* Who manufactures a company’s products
* Which suppliers are critical
* Which companies are major customers
* Which technologies create differentiation
* Which competitors threaten the company
* How the company fits into the broader AI value chain

---

## 4.3 General-purpose AI can generate unsupported claims

A general chatbot may provide useful explanations, but it can also:

* Invent company relationships
* Use outdated information
* Mix facts with speculation
* Provide inconsistent analysis
* Generate unsupported financial data
* Fail to show where conclusions came from

Investment research requires stronger grounding, structure, and transparency.

---

## 4.4 Research is too time-consuming for nonprofessional investors

Understanding one company may require reviewing:

* Company websites
* Earnings reports
* Regulatory filings
* Product announcements
* Supplier relationships
* Customer relationships
* Historical financial data
* Competitor information

Many individual investors do not have the time or expertise to combine this information into a coherent investment view.

---

# 5. Product Opportunity

AI has created a new investment category that extends across traditional sectors.

The AI economy includes:

* Semiconductor designers
* Semiconductor manufacturing and equipment
* Memory and storage providers
* Networking and optical-interconnect providers
* Cloud platforms
* Data infrastructure companies
* AI software and enterprise AI companies
* Cybersecurity platforms
* Robotics companies
* Autonomous systems
* Industrial automation
* AI healthcare companies

This creates an opportunity for a platform designed specifically around the AI value chain.

AI Stocks Explorer can differentiate itself by combining:

* Structured public-market information
* Curated AI classifications
* Verified relationship data
* Standardized AI-generated research
* Interactive ecosystem exploration
* Context-grounded conversational analysis

The product is not simply another stock screener or AI chatbot. It is a structured research system designed specifically for understanding the public AI economy.

---

# 6. Target Users

## 6.1 Primary User: Self-Directed AI Investor

### Profile

* Invests independently
* Interested in AI-related companies
* Uses platforms such as Yahoo Finance, Seeking Alpha, TradingView, or brokerage research
* Understands basic investment concepts
* May not understand the technical AI value chain
* Wants to research companies before making investment decisions

### Needs

* Identify relevant AI companies
* Understand what each company actually does
* Compare opportunities across AI categories
* Understand growth drivers and risks
* See how companies depend on one another
* Research without reading dozens of disconnected sources

---

## 6.2 Secondary User: Technology Professional or AI Enthusiast

### Profile

* Understands technology but may not have deep investing expertise
* Follows AI companies, products, and infrastructure
* Wants to connect technical developments with public-market companies

### Needs

* Translate technical leadership into investment relevance
* Understand which companies benefit from AI adoption
* Learn the financial significance of products and technologies
* Explore suppliers, customers, and competitors

---

## 6.3 Secondary User: New Investor

### Profile

* Interested in AI investing
* Limited experience reading financial statements
* May be overwhelmed by financial terminology
* Needs plain-English explanations

### Needs

* Beginner-friendly company summaries
* Clear explanations of financial and technical concepts
* Structured risks and opportunities
* Guided research questions
* Strong disclaimers separating research from advice

---

## 6.4 Future User: Financial Professional

Potential future users include:

* Financial advisors
* Research analysts
* Portfolio managers
* Wealth-management teams
* Investment educators

These users may eventually require:

* Deeper data provenance
* Exportable reports
* Portfolio analysis
* Team collaboration
* Advanced graph analytics
* Research monitoring
* API access

They are not the primary target for the hackathon MVP.

---

# 7. Jobs to Be Done

## Functional Job

> When I research an AI-related public company, help me quickly understand what it does, why it matters, how it fits into the AI ecosystem, and what opportunities and risks deserve further investigation.

## Discovery Job

> When I want exposure to a part of the AI value chain, help me find the public companies involved in that category.

## Relationship Job

> When I research a company, help me understand its suppliers, customers, manufacturing partners, products, technologies, and competitors.

## Comparison Job

> When I am choosing between AI companies, help me compare their business roles, financial profiles, ecosystem positions, advantages, and risks.

## Learning Job

> When I encounter a technical or financial concept I do not understand, explain it clearly in the context of the company I am researching.

## Confidence Job

> When I use AI-generated research, help me trust the output by grounding it in structured data and clearly acknowledging missing information.

---

# 8. Core Value Proposition

> **AI Stocks Explorer helps investors understand not only how an AI stock is performing, but why the company matters and how it fits into the broader AI economy.**

The platform provides value through five connected capabilities:

## 8.1 Discover

Users can explore public companies by their role in the AI value chain rather than relying only on traditional industry sectors.

## 8.2 Understand

AI Investment Thesis and AI Research Engine outputs translate complex company and technology information into standardized, investor-friendly research.

## 8.3 Connect

The AI Knowledge Graph shows how companies, products, technologies, suppliers, customers, and competitors relate to one another.

## 8.4 Evaluate

Historical charts, market data, financial metrics, catalysts, and risks help users develop a more balanced research view.

## 8.5 Explore Further

The GPT Research Assistant answers company-specific questions using structured context rather than responding from an unrestricted general prompt.

---

# 9. Product Pillars

The product is built around three core intelligence pillars.

## 9.1 AI Investment Thesis

The AI Investment Thesis provides the fastest summary of a company’s investment relevance.

It should answer:

* Why does this company matter?
* What drives its AI opportunity?
* What are its strongest competitive advantages?
* What catalysts could support future growth?
* What risks should investors investigate?

The thesis must be concise, structured, balanced, and grounded in verified data.

---

## 9.2 AI Research Engine

The AI Research Engine provides deeper standardized analysis.

It should cover:

* Why the company matters
* AI value-chain role
* Technology position
* AI products
* Investment drivers
* Competitive advantages
* Growth catalysts
* Key risks
* Customer exposure
* Competitive landscape
* Supply-chain influence
* AI Ecosystem Score explanation

This creates a consistent research framework across companies.

---

## 9.3 AI Knowledge Graph

The AI Knowledge Graph explains the relationships behind the AI economy.

It connects:

* Companies
* Products
* Technologies
* AI categories
* Suppliers
* Customers
* Semiconductor manufacturing and equipment
* Cloud platforms
* Partners
* Competitors

The Knowledge Graph should support both interactive exploration and structured AI context.

It is not only a visualization feature. It is also a foundational data layer that improves the quality of AI-generated research.

---

# 10. Supporting Product Capabilities

The three intelligence pillars are supported by the following capabilities.

## AI Value Chain Explorer

Organizes companies by their functional role in the AI economy.

## Company Research Pages

Combines company data, AI research, financial metrics, charts, relationships, and GPT follow-up in one experience.

## AI Supply Chain Explorer

Presents graph relationships in a readable list-based format, such as suppliers, customers, manufacturing partners, products, technologies, and competitors.

## Historical Performance

Allows users to evaluate stock-price performance over multiple time periods.

## Financial Snapshot

Provides selected market and company metrics without overwhelming the user.

## Company Search

Supports discovery by company name, ticker, category, product, and technology.

## Company Comparison

Allows users to compare multiple companies using standardized research fields.

## GPT Research Assistant

Provides contextual follow-up research based on structured company and graph data.

---

# 11. Product Differentiation

AI Stocks Explorer is differentiated from existing tools in several ways.

## 11.1 AI value-chain organization

Most platforms organize stocks by broad market sectors.

AI Stocks Explorer organizes companies by their functional role in the AI ecosystem.

---

## 11.2 Standardized AI-generated research

General chatbots produce variable answers.

AI Stocks Explorer uses a consistent research framework across every company.

---

## 11.3 Structured Knowledge Graph

Most consumer investment tools show peer companies but do not map operational and technology relationships.

AI Stocks Explorer connects companies through suppliers, customers, products, technologies, manufacturing relationships, and competitive relationships.

---

## 11.4 Grounded AI architecture

GPT answers are generated from verified structured context.

The model is used for explanation and synthesis, not as the authoritative source of company or financial facts.

---

## 11.5 Investor-friendly technical interpretation

The platform explains complex AI technologies in terms of:

* Revenue exposure
* Competitive positioning
* Demand drivers
* Customer dependence
* Supplier risk
* Strategic relevance

---

## 11.6 Integrated research workflow

Users do not need to switch between a stock screener, charting platform, company website, AI chatbot, and supply-chain research tool.

The platform brings these activities into one connected experience.

---

# 12. Competitive Positioning

AI Stocks Explorer sits between several existing product categories.

| Product Category            | Strength                          | Limitation                                    |
| --------------------------- | --------------------------------- | --------------------------------------------- |
| Yahoo Finance               | Broad market data                 | Limited AI ecosystem context                  |
| TradingView                 | Strong charts and technical tools | Limited company relationship research         |
| Seeking Alpha               | Deep investor content             | Content can be fragmented and opinion-driven  |
| Morningstar                 | Structured investment research    | Not designed around the AI value chain        |
| Bloomberg                   | Comprehensive professional data   | Expensive and complex for individual users    |
| General-purpose ChatGPT     | Flexible explanations             | May lack structured grounding and consistency |
| Traditional stock screeners | Fast filtering                    | Limited qualitative understanding             |

AI Stocks Explorer differentiates itself through:

* AI-specific company organization
* Standardized AI Investment Thesis
* Structured AI Research Engine
* AI Knowledge Graph
* Context-grounded GPT research
* Accessible investor-focused UX

---

# 13. Product Principles

## 13.1 Explain before asking the user to explore

Users should receive a clear company summary before being asked to interact with charts, graphs, or chat.

## 13.2 Structured research before open-ended conversation

The AI Investment Thesis and AI Research Engine should provide the primary research experience.

GPT chat should support deeper follow-up, not replace the structured product.

## 13.3 Facts and analysis must remain separate

Market data and company relationships are factual inputs.

AI-generated interpretation must be clearly presented as analysis.

## 13.4 Trust is more important than breadth

A smaller dataset with complete, reviewed company profiles is more valuable than broad coverage with unreliable information.

## 13.5 Relationships matter

The product should explain companies as part of an ecosystem rather than as isolated securities.

## 13.6 AI should reduce complexity

AI should make technical and financial information easier to understand, not introduce additional jargon.

## 13.7 Risks must be visible

Every company research experience should include meaningful risks alongside opportunities.

## 13.8 The user controls the research journey

The product should support discovery and exploration without pushing a specific investment action.

---

# 14. Product Goals

## 14.1 MVP Goals

The hackathon MVP should:

* Demonstrate a complete AI company research journey
* Organize companies across the AI value chain
* Provide AI Investment Thesis content
* Provide structured AI Research Engine output
* Visualize key ecosystem relationships
* Use the Knowledge Graph to ground AI responses
* Display historical stock performance
* Support company-specific GPT follow-up questions
* Deliver a polished, responsive web experience
* Deploy successfully to a public URL

---

## 14.2 User Experience Goals

The product should help a user:

* Understand the value proposition within ten seconds
* Find a company within thirty seconds
* Understand why the company matters within two minutes
* Identify key opportunities and risks
* Understand major ecosystem relationships
* Ask a useful follow-up question
* Continue research through a related company

---

## 14.3 Trust Goals

The product should:

* Avoid invented financial information
* Avoid unsupported company relationships
* Display missing information honestly
* Distinguish research from personalized investment advice
* Use consistent AI response structures
* Include source and update metadata when practical
* Present balanced opportunities and risks

---

# 15. Non-Goals

The MVP is not intended to:

* Execute trades
* Recommend specific investments
* Provide personalized financial advice
* Generate price targets
* Issue buy, sell, or hold ratings
* Replace professional investment research
* Provide real-time institutional market data
* Support portfolio management
* Monitor breaking news
* Automate investment decisions
* Build a complete graph of the global AI economy

These areas may be considered later but are not part of the initial product.

---

# 16. MVP Scope Summary

The MVP should include:

* Homepage
* AI Value Chain Explorer
* AI category pages
* Company directory
* Company search
* Company research pages
* AI Investment Thesis
* AI Research Engine
* AI Knowledge Graph
* AI Supply Chain Explorer
* Financial Snapshot
* Historical stock chart
* Related companies
* GPT Research Assistant
* Responsive web design
* Public deployment

The MVP should use a curated dataset of high-quality company and relationship records.

---

# 17. Success Metrics

## 17.1 Hackathon Product Metrics

* 64 supported companies across a tiered coverage model
* 10 AI categories
* 12 complete Tier 1 company pages
* 100–120 high-confidence Knowledge Graph relationships
* AI Investment Thesis and Research Engine coverage for Tier 1 companies
* Historical price data for Tier 1 and Tier 2 companies
* One complete GPT research workflow
* One reliable end-to-end demo journey

---

## 17.2 Experience Metrics

* Homepage value proposition understood within ten seconds
* Company search response under 300 milliseconds
* Company page initial content under 2.5 seconds
* Cached AI content under 500 milliseconds
* Knowledge Graph load under 1.5 seconds
* GPT response streaming begins within approximately three seconds
* Main research flow completed without broken states

---

## 17.3 Quality Metrics

* No client-side API-key exposure
* No authoritative financial data generated by GPT
* No unsupported Tier 1 company relationships
* No invalid graph edges in the demo path
* No unhandled errors during the primary user journey
* Structured AI outputs pass schema validation
* All major pages include loading, empty, and error states

---

# 18. Product Risks

| Risk                                        | Potential Impact              | Mitigation                                  |
| ------------------------------------------- | ----------------------------- | ------------------------------------------- |
| AI produces unsupported claims              | Loss of trust                 | Structured context, validation, and caching |
| Knowledge Graph contains inaccurate edges   | Misleading research           | Curated high-confidence relationships       |
| Product scope becomes too large             | Incomplete MVP                | Strict P0 prioritization                    |
| Company pages contain inconsistent research | Poor comparison experience    | Standardized schemas and prompts            |
| Market-data provider fails                  | Missing financial information | Cached or seeded fallback data              |
| Graph visualization is confusing            | Reduced usability             | One-hop default and node limits             |
| Users interpret research as advice          | Regulatory and trust concerns | Clear disclaimers and neutral language      |
| GPT latency disrupts the experience         | Slow interaction              | Pre-generated research and response caching |
| Limited company coverage appears weak       | Reduced perceived breadth     | Focus on complete Tier 1 companies          |

---

# 19. Long-Term Product Vision

The product can evolve through four stages.

## Stage 1 — AI Company Discovery

Help users find public companies across the AI value chain.

## Stage 2 — Structured AI Investment Research

Provide standardized thesis, risk, catalyst, and competitive-position analysis.

## Stage 3 — AI Ecosystem Intelligence

Map suppliers, customers, technologies, products, and competitive relationships across the public AI economy.

## Stage 4 — Portfolio Intelligence

Help users understand portfolio exposure, category concentration, supplier dependencies, competitive overlap, and AI ecosystem risk.

---

# 20. Future Opportunities

Potential future capabilities include:

* Expanded company coverage
* International stocks
* Private AI companies
* User accounts
* Watchlists
* Saved research
* Portfolio holdings
* Company comparison
* Earnings summaries
* Company news
* Research alerts
* AI exposure analysis
* Portfolio Knowledge Graph
* Supplier-concentration analysis
* Ecosystem dependency scores
* Research report exports
* Professional workspaces
* API access
* Native mobile applications

---

# 21. Elevator Pitch

> **AI Stocks Explorer is an AI-native investment research platform that helps investors understand the companies building the AI economy. It combines market data, standardized AI research, and an AI Knowledge Graph to explain what each company does, why it matters, how it fits into the AI value chain, and which opportunities and risks deserve further investigation.**

---

# 22. Product Tagline

> **Discover, understand, and research the companies building the future of AI.**

An alternative more differentiated tagline is:

> **Understand the companies—and connections—powering the AI economy.**

---

# 23. North Star

The North Star for AI Stocks Explorer is:

> **Become the most trusted and understandable platform for researching the public AI ecosystem.**

The product should be evaluated by whether it helps users move from fragmented information to a clear understanding of:

* The company
* Its AI role
* Its competitive position
* Its growth drivers
* Its risks
* Its ecosystem relationships
* Its relevance to the broader AI economy
