# Data Dictionary

Reference for important data entities, fields, and definitions used by AI Stocks Explorer. The versioned Milestone 2 migration defines the table columns and constraints.

## Entities

### Company

A supported publicly traded issuer. Company records are the authoritative source for company identity, ticker, exchange, description, AI role, category assignments, and display status.

### AI Category

A curated functional role in the AI value chain. A company has one primary category and may have additional verified secondary categories. The MVP taxonomy is AI Infrastructure (Compute & Accelerators); Semiconductor Manufacturing & Equipment; Memory & Storage; Networking & Optical Interconnect; Cloud Platforms; Data Infrastructure; AI Software & Enterprise AI; Cybersecurity; Robotics & Industrial AI; and Autonomous Systems.

### AI Focus

A descriptive label such as Edge AI, Lithography, Observability, or Robotaxi. It records a company's source-derived AI role and is not itself an AI category or a `company_categories` assignment.

### Coverage Tier

The planned depth of research for a company. Tier 1 companies receive the complete product experience first. Tier 2 companies receive full profiles and lighter graph coverage. Tier 3 companies receive basic profiles, categorization, and related-company links. Until Tier 2 and Tier 3 assignments are approved, non-Tier 1 companies are stored as `baseline`.

### Price Link

An external Yahoo Finance quote-page URL derived from a supported company ticker. The hackathon application does not retrieve, store, or display the linked market data.

### Assistant Request Limit

A server-private count of uncached GPT Research Assistant requests. The database stores a SHA-256 hash of the request address, never the address itself. The limit is eight requests per ten-minute window; the Supabase function atomically allows or rejects each request and returns the remaining wait time when the limit is reached. Stale windows are removed after 24 hours on a later uncached request.

### Product

An AI-relevant product or platform associated with a company. The first 23 Tier 1 products are backed by official company source pages and appear as Knowledge Graph nodes.

### Technology

A named technical capability connected to a verified product. The seed currently includes 27 technologies that are directly represented by the curated Tier 1 products; it does not infer general technology adoption.

### Relationship

A directional or symmetric, curated connection between Knowledge Graph nodes. Every relationship requires a type, confidence level, active status, and provenance where available. The current seed contains 120 high-confidence category, company-product ownership, and product-technology relationships.
