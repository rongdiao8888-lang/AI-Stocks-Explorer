begin;

create type public.category_assignment_type as enum ('primary', 'secondary');
create type public.graph_confidence_level as enum ('high', 'medium', 'low');
create type public.knowledge_graph_node_type as enum (
  'category',
  'company',
  'model',
  'platform',
  'product',
  'technology'
);
create type public.ai_review_status as enum ('draft', 'reviewed', 'approved', 'unavailable');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.ai_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null,
  icon_name text not null,
  display_order integer not null unique check (display_order > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  slug text not null unique,
  ticker text not null unique check (ticker = upper(ticker)),
  exchange text,
  description text,
  website text,
  headquarters text,
  ceo text,
  founded_year integer check (founded_year between 1600 and 2200),
  employee_count integer check (employee_count >= 0),
  logo_url text,
  primary_category_id uuid not null references public.ai_categories (id) on delete restrict,
  ai_role text,
  ai_revenue_exposure text check (ai_revenue_exposure in ('low', 'moderate', 'high', 'very_high')),
  ai_ecosystem_score integer check (ai_ecosystem_score between 0 and 100),
  coverage_tier text not null default 'baseline' check (coverage_tier in ('tier_1', 'tier_2', 'tier_3', 'baseline')),
  source_reference text,
  source_updated_at timestamptz,
  last_verified_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.company_categories (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  category_id uuid not null references public.ai_categories (id) on delete restrict,
  category_type public.category_assignment_type not null,
  created_at timestamptz not null default now(),
  unique (company_id, category_id)
);

create table public.market_data (
  company_id uuid primary key references public.companies (id) on delete cascade,
  current_price numeric,
  daily_change numeric,
  daily_change_percent numeric,
  market_cap numeric,
  pe_ratio numeric,
  forward_pe numeric,
  dividend_yield numeric,
  volume bigint check (volume >= 0),
  one_year_return numeric,
  three_year_return numeric,
  five_year_return numeric,
  currency text,
  data_source text not null,
  last_updated timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.historical_prices (
  id bigint generated always as identity primary key,
  company_id uuid not null references public.companies (id) on delete cascade,
  trading_date date not null,
  open numeric,
  high numeric,
  low numeric,
  close numeric not null,
  adjusted_close numeric,
  volume bigint check (volume >= 0),
  data_source text not null,
  created_at timestamptz not null default now(),
  unique (company_id, trading_date),
  check (high is null or low is null or high >= low)
);

create table public.financial_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  fiscal_period text not null,
  revenue numeric,
  revenue_growth numeric,
  gross_margin numeric,
  operating_margin numeric,
  net_income numeric,
  eps numeric,
  cash_and_equivalents numeric,
  total_debt numeric,
  data_source text not null,
  last_updated timestamptz not null,
  created_at timestamptz not null default now(),
  unique (company_id, fiscal_period)
);

create table public.company_products (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  product_name text not null,
  product_slug text not null,
  product_type text not null,
  description text,
  ai_relevance text,
  source_reference text,
  source_updated_at timestamptz,
  last_verified_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, product_slug)
);

create table public.technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  technology_type text not null,
  description text,
  source_reference text,
  source_updated_at timestamptz,
  last_verified_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.knowledge_graph_nodes (
  id uuid primary key default gen_random_uuid(),
  node_type public.knowledge_graph_node_type not null,
  entity_id uuid not null,
  name text not null,
  slug text not null unique,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (node_type, entity_id)
);

create table public.relationship_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  inverse_name text not null,
  description text not null,
  is_directional boolean not null default true,
  display_group text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.knowledge_graph_edges (
  id uuid primary key default gen_random_uuid(),
  source_node_id uuid not null references public.knowledge_graph_nodes (id) on delete cascade,
  target_node_id uuid not null references public.knowledge_graph_nodes (id) on delete cascade,
  relationship_type_id uuid not null references public.relationship_types (id) on delete restrict,
  description text,
  confidence_level public.graph_confidence_level not null default 'medium',
  source_reference text,
  source_updated_at timestamptz,
  last_verified_at timestamptz,
  valid_from date,
  valid_to date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_node_id, target_node_id, relationship_type_id),
  check (source_node_id <> target_node_id),
  check (valid_to is null or valid_from is null or valid_to >= valid_from)
);

create table public.company_ai_theses (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  thesis_summary text not null,
  investment_drivers jsonb not null default '[]'::jsonb,
  competitive_advantages jsonb not null default '[]'::jsonb,
  growth_catalysts jsonb not null default '[]'::jsonb,
  key_risks jsonb not null default '[]'::jsonb,
  source_data_version text not null,
  model_name text not null,
  prompt_version text not null,
  generated_at timestamptz not null,
  expires_at timestamptz,
  review_status public.ai_review_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (expires_at is null or expires_at > generated_at)
);

create table public.company_ai_research (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  why_it_matters text not null,
  value_chain_role text not null,
  technology_position text not null,
  customer_exposure_summary text not null,
  competitive_landscape text not null,
  risk_summary text not null,
  ai_ecosystem_score integer not null check (ai_ecosystem_score between 0 and 100),
  score_explanation text not null,
  research_sections jsonb not null default '{}'::jsonb,
  source_data_version text not null,
  model_name text not null,
  prompt_version text not null,
  generated_at timestamptz not null,
  expires_at timestamptz,
  review_status public.ai_review_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (expires_at is null or expires_at > generated_at)
);

create table public.ai_prompt_cache (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  prompt_hash text not null,
  normalized_question text not null,
  response_text text not null,
  context_version text not null,
  model_name text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  unique (company_id, prompt_hash, context_version)
);

create unique index company_categories_one_primary_category_idx
  on public.company_categories (company_id)
  where category_type = 'primary';

create index companies_company_name_idx on public.companies (company_name);
create index companies_primary_category_id_idx on public.companies (primary_category_id);
create index company_categories_company_id_idx on public.company_categories (company_id);
create index company_categories_category_id_idx on public.company_categories (category_id);
create index historical_prices_company_id_idx on public.historical_prices (company_id);
create index historical_prices_trading_date_idx on public.historical_prices (trading_date desc);
create index financial_metrics_company_id_idx on public.financial_metrics (company_id);
create index company_products_company_id_idx on public.company_products (company_id);
create index knowledge_graph_nodes_node_type_idx on public.knowledge_graph_nodes (node_type);
create index knowledge_graph_nodes_entity_id_idx on public.knowledge_graph_nodes (entity_id);
create index knowledge_graph_edges_source_node_id_idx on public.knowledge_graph_edges (source_node_id);
create index knowledge_graph_edges_target_node_id_idx on public.knowledge_graph_edges (target_node_id);
create index knowledge_graph_edges_relationship_type_id_idx on public.knowledge_graph_edges (relationship_type_id);
create index knowledge_graph_edges_active_idx on public.knowledge_graph_edges (is_active)
  where is_active;
create index company_ai_theses_company_id_idx on public.company_ai_theses (company_id);
create index company_ai_research_company_id_idx on public.company_ai_research (company_id);
create index ai_prompt_cache_prompt_hash_idx on public.ai_prompt_cache (prompt_hash);

create trigger ai_categories_set_updated_at
before update on public.ai_categories
for each row execute function public.set_updated_at();

create trigger companies_set_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

create trigger market_data_set_updated_at
before update on public.market_data
for each row execute function public.set_updated_at();

create trigger company_products_set_updated_at
before update on public.company_products
for each row execute function public.set_updated_at();

create trigger technologies_set_updated_at
before update on public.technologies
for each row execute function public.set_updated_at();

create trigger knowledge_graph_nodes_set_updated_at
before update on public.knowledge_graph_nodes
for each row execute function public.set_updated_at();

create trigger relationship_types_set_updated_at
before update on public.relationship_types
for each row execute function public.set_updated_at();

create trigger knowledge_graph_edges_set_updated_at
before update on public.knowledge_graph_edges
for each row execute function public.set_updated_at();

create trigger company_ai_theses_set_updated_at
before update on public.company_ai_theses
for each row execute function public.set_updated_at();

create trigger company_ai_research_set_updated_at
before update on public.company_ai_research
for each row execute function public.set_updated_at();

alter table public.ai_categories enable row level security;
alter table public.companies enable row level security;
alter table public.company_categories enable row level security;
alter table public.market_data enable row level security;
alter table public.historical_prices enable row level security;
alter table public.financial_metrics enable row level security;
alter table public.company_products enable row level security;
alter table public.technologies enable row level security;
alter table public.knowledge_graph_nodes enable row level security;
alter table public.relationship_types enable row level security;
alter table public.knowledge_graph_edges enable row level security;
alter table public.company_ai_theses enable row level security;
alter table public.company_ai_research enable row level security;
alter table public.ai_prompt_cache enable row level security;

grant usage on schema public to anon, authenticated, service_role;
revoke all privileges on all tables in schema public from anon, authenticated;
revoke all privileges on all sequences in schema public from anon, authenticated;
grant select on public.ai_categories, public.companies, public.company_categories,
  public.market_data, public.historical_prices, public.financial_metrics,
  public.company_products, public.technologies, public.knowledge_graph_nodes,
  public.relationship_types, public.knowledge_graph_edges, public.company_ai_theses,
  public.company_ai_research to anon, authenticated;
grant all privileges on all tables in schema public to service_role;
grant all privileges on all sequences in schema public to service_role;

create policy "Public can read active AI categories"
on public.ai_categories for select to anon, authenticated
using (is_active);

create policy "Public can read active companies"
on public.companies for select to anon, authenticated
using (is_active);

create policy "Public can read active company category assignments"
on public.company_categories for select to anon, authenticated
using (
  exists (
    select 1
    from public.companies
    where companies.id = company_categories.company_id
      and companies.is_active
  )
);

create policy "Public can read market data for active companies"
on public.market_data for select to anon, authenticated
using (
  exists (
    select 1
    from public.companies
    where companies.id = market_data.company_id
      and companies.is_active
  )
);

create policy "Public can read historical prices for active companies"
on public.historical_prices for select to anon, authenticated
using (
  exists (
    select 1
    from public.companies
    where companies.id = historical_prices.company_id
      and companies.is_active
  )
);

create policy "Public can read financial metrics for active companies"
on public.financial_metrics for select to anon, authenticated
using (
  exists (
    select 1
    from public.companies
    where companies.id = financial_metrics.company_id
      and companies.is_active
  )
);

create policy "Public can read active products"
on public.company_products for select to anon, authenticated
using (
  is_active
  and exists (
    select 1
    from public.companies
    where companies.id = company_products.company_id
      and companies.is_active
  )
);

create policy "Public can read active technologies"
on public.technologies for select to anon, authenticated
using (is_active);

create policy "Public can read active graph nodes"
on public.knowledge_graph_nodes for select to anon, authenticated
using (is_active);

create policy "Public can read active relationship types"
on public.relationship_types for select to anon, authenticated
using (is_active);

create policy "Public can read high confidence active graph edges"
on public.knowledge_graph_edges for select to anon, authenticated
using (is_active and confidence_level = 'high');

create policy "Public can read approved current AI theses"
on public.company_ai_theses for select to anon, authenticated
using (
  review_status = 'approved'
  and (expires_at is null or expires_at > now())
);

create policy "Public can read approved current AI research"
on public.company_ai_research for select to anon, authenticated
using (
  review_status = 'approved'
  and (expires_at is null or expires_at > now())
);

commit;
