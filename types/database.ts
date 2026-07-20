export type Json = boolean | number | string | null | { [key: string]: Json | undefined } | Json[];

export type CategoryAssignmentType = "primary" | "secondary";
export type GraphConfidenceLevel = "high" | "medium" | "low";
export type KnowledgeGraphNodeType = "category" | "company" | "model" | "platform" | "product" | "technology";
export type AIReviewStatus = "draft" | "reviewed" | "approved" | "unavailable";

type TableDefinition<Row, RequiredKeys extends keyof Row = never> = {
  Row: Row;
  Insert: Pick<Row, RequiredKeys> & Partial<Omit<Row, RequiredKeys>>;
  Update: Partial<Row>;
  Relationships: [];
};

export type AICategoryRow = {
  created_at: string;
  description: string;
  display_order: number;
  icon_name: string;
  id: string;
  is_active: boolean;
  name: string;
  slug: string;
  updated_at: string;
};

export type CompanyRow = {
  ai_ecosystem_score: number | null;
  ai_revenue_exposure: "low" | "moderate" | "high" | "very_high" | null;
  ai_role: string | null;
  ceo: string | null;
  company_name: string;
  coverage_tier: "tier_1" | "tier_2" | "tier_3" | "baseline";
  created_at: string;
  description: string | null;
  employee_count: number | null;
  exchange: string | null;
  founded_year: number | null;
  headquarters: string | null;
  id: string;
  is_active: boolean;
  last_verified_at: string | null;
  logo_url: string | null;
  primary_category_id: string;
  slug: string;
  source_reference: string | null;
  source_updated_at: string | null;
  ticker: string;
  updated_at: string;
  website: string | null;
};

export type CompanyCategoryRow = {
  category_id: string;
  category_type: CategoryAssignmentType;
  company_id: string;
  created_at: string;
  id: string;
};

export type MarketDataRow = {
  company_id: string;
  created_at: string;
  currency: string | null;
  daily_change: number | null;
  daily_change_percent: number | null;
  data_source: string;
  dividend_yield: number | null;
  five_year_return: number | null;
  forward_pe: number | null;
  last_updated: string;
  market_cap: number | null;
  one_year_return: number | null;
  pe_ratio: number | null;
  current_price: number | null;
  three_year_return: number | null;
  updated_at: string;
  volume: number | null;
};

export type HistoricalPriceRow = {
  adjusted_close: number | null;
  close: number;
  company_id: string;
  created_at: string;
  data_source: string;
  high: number | null;
  id: number;
  low: number | null;
  open: number | null;
  trading_date: string;
  volume: number | null;
};

export type FinancialMetricsRow = {
  cash_and_equivalents: number | null;
  company_id: string;
  created_at: string;
  data_source: string;
  eps: number | null;
  fiscal_period: string;
  gross_margin: number | null;
  id: string;
  last_updated: string;
  net_income: number | null;
  operating_margin: number | null;
  revenue: number | null;
  revenue_growth: number | null;
  total_debt: number | null;
};

export type CompanyProductRow = {
  ai_relevance: string | null;
  company_id: string;
  created_at: string;
  description: string | null;
  id: string;
  is_active: boolean;
  last_verified_at: string | null;
  product_name: string;
  product_slug: string;
  product_type: string;
  source_reference: string | null;
  source_updated_at: string | null;
  updated_at: string;
};

export type TechnologyRow = {
  created_at: string;
  description: string | null;
  id: string;
  is_active: boolean;
  last_verified_at: string | null;
  name: string;
  slug: string;
  source_reference: string | null;
  source_updated_at: string | null;
  technology_type: string;
  updated_at: string;
};

export type KnowledgeGraphNodeRow = {
  created_at: string;
  description: string | null;
  entity_id: string;
  id: string;
  is_active: boolean;
  metadata: Json;
  name: string;
  node_type: KnowledgeGraphNodeType;
  slug: string;
  updated_at: string;
};

export type RelationshipTypeRow = {
  created_at: string;
  description: string;
  display_group: string;
  id: string;
  inverse_name: string;
  is_active: boolean;
  is_directional: boolean;
  name: string;
  slug: string;
  updated_at: string;
};

export type KnowledgeGraphEdgeRow = {
  confidence_level: GraphConfidenceLevel;
  created_at: string;
  description: string | null;
  id: string;
  is_active: boolean;
  last_verified_at: string | null;
  relationship_type_id: string;
  source_node_id: string;
  source_reference: string | null;
  source_updated_at: string | null;
  target_node_id: string;
  updated_at: string;
  valid_from: string | null;
  valid_to: string | null;
};

export type CompanyAIThesisRow = {
  company_id: string;
  competitive_advantages: Json;
  created_at: string;
  expires_at: string | null;
  generated_at: string;
  growth_catalysts: Json;
  id: string;
  investment_drivers: Json;
  key_risks: Json;
  model_name: string;
  prompt_version: string;
  review_status: AIReviewStatus;
  source_data_version: string;
  thesis_summary: string;
  updated_at: string;
};

export type CompanyAIResearchRow = {
  ai_ecosystem_score: number;
  company_id: string;
  competitive_landscape: string;
  created_at: string;
  customer_exposure_summary: string;
  expires_at: string | null;
  generated_at: string;
  id: string;
  model_name: string;
  prompt_version: string;
  research_sections: Json;
  review_status: AIReviewStatus;
  risk_summary: string;
  score_explanation: string;
  source_data_version: string;
  technology_position: string;
  updated_at: string;
  value_chain_role: string;
  why_it_matters: string;
};

export type AIPromptCacheRow = {
  company_id: string;
  context_version: string;
  created_at: string;
  expires_at: string | null;
  id: string;
  model_name: string;
  normalized_question: string;
  prompt_hash: string;
  response_text: string;
};

export type AIAssistantRateLimitRow = {
  created_at: string;
  rate_limit_key: string;
  request_count: number;
  updated_at: string;
  window_started_at: string;
};

export type Database = {
  public: {
    Tables: {
      ai_categories: TableDefinition<AICategoryRow, "description" | "display_order" | "icon_name" | "name" | "slug">;
      ai_assistant_rate_limits: TableDefinition<AIAssistantRateLimitRow, "rate_limit_key" | "request_count" | "window_started_at">;
      ai_prompt_cache: TableDefinition<AIPromptCacheRow, "company_id" | "context_version" | "model_name" | "normalized_question" | "prompt_hash" | "response_text">;
      companies: TableDefinition<CompanyRow, "company_name" | "primary_category_id" | "slug" | "ticker">;
      company_ai_research: TableDefinition<CompanyAIResearchRow, "ai_ecosystem_score" | "company_id" | "competitive_landscape" | "customer_exposure_summary" | "generated_at" | "model_name" | "prompt_version" | "risk_summary" | "score_explanation" | "source_data_version" | "technology_position" | "value_chain_role" | "why_it_matters">;
      company_ai_theses: TableDefinition<CompanyAIThesisRow, "company_id" | "generated_at" | "model_name" | "prompt_version" | "source_data_version" | "thesis_summary">;
      company_categories: TableDefinition<CompanyCategoryRow, "category_id" | "category_type" | "company_id">;
      company_products: TableDefinition<CompanyProductRow, "company_id" | "product_name" | "product_slug" | "product_type">;
      financial_metrics: TableDefinition<FinancialMetricsRow, "company_id" | "data_source" | "fiscal_period" | "last_updated">;
      historical_prices: TableDefinition<HistoricalPriceRow, "close" | "company_id" | "data_source" | "trading_date">;
      knowledge_graph_edges: TableDefinition<KnowledgeGraphEdgeRow, "relationship_type_id" | "source_node_id" | "target_node_id">;
      knowledge_graph_nodes: TableDefinition<KnowledgeGraphNodeRow, "entity_id" | "name" | "node_type" | "slug">;
      market_data: TableDefinition<MarketDataRow, "company_id" | "data_source" | "last_updated">;
      relationship_types: TableDefinition<RelationshipTypeRow, "description" | "display_group" | "inverse_name" | "name" | "slug">;
      technologies: TableDefinition<TechnologyRow, "name" | "slug" | "technology_type">;
    };
    Views: Record<string, never>;
    Functions: {
      consume_ai_assistant_rate_limit: {
        Args: {
          p_maximum_requests: number;
          p_rate_limit_key: string;
          p_window_seconds: number;
        };
        Returns: Array<{
          allowed: boolean;
          retry_after_seconds: number;
        }>;
      };
    };
    Enums: {
      ai_review_status: AIReviewStatus;
      category_assignment_type: CategoryAssignmentType;
      graph_confidence_level: GraphConfidenceLevel;
      knowledge_graph_node_type: KnowledgeGraphNodeType;
    };
  };
};
