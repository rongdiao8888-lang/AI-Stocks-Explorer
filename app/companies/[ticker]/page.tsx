import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { AIInvestmentThesis } from "@/components/ai/ai-investment-thesis";
import { AIChatPanel } from "@/components/ai/ai-chat-panel";
import { AIResearchDisclaimer } from "@/components/ai/ai-disclaimer";
import { AIResearchSummary } from "@/components/ai/ai-research-summary";
import { RelatedCompanies, type RelatedCompanyItem } from "@/components/companies/related-companies";
import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { createApprovedCompanyResearchContext } from "@/lib/ai/context";
import { getCompanySeedByTicker, listRelatedCompanySeeds } from "@/lib/config/company-universe";
import { valueChainCategories, type ValueChainCategorySlug } from "@/lib/config/site";
import { getYahooFinanceQuoteUrl } from "@/lib/links/yahoo-finance";
import { getCurrentCompanyResearch, getCurrentCompanyThesis } from "@/lib/repositories/ai-research-repository";
import { getCompanyByTicker, listRelatedCompanies } from "@/lib/repositories/company-repository";
import { getOneHopGraphForCompany } from "@/lib/repositories/graph-repository";
import { listActiveProductsForCompany } from "@/lib/repositories/product-repository";
import { hasPublicSupabaseConfig } from "@/lib/supabase/config";

type CompanyPageProps = {
  params: Promise<{ ticker: string }>;
};

export const dynamic = "force-dynamic";

function getCategoryName(categorySlug: ValueChainCategorySlug) {
  return valueChainCategories.find((category) => category.slug === categorySlug)?.name ?? "AI value chain";
}

function mapSeedCompanyToRelatedCompany(company: ReturnType<typeof listRelatedCompanySeeds>[number]): RelatedCompanyItem {
  return {
    aiRole: company.aiFocus,
    name: company.companyName,
    ticker: company.ticker,
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { ticker } = await params;
  const normalizedTicker = decodeURIComponent(ticker).toUpperCase();
  const yahooFinanceUrl = getYahooFinanceQuoteUrl(normalizedTicker);

  if (!hasPublicSupabaseConfig()) {
    const company = getCompanySeedByTicker(normalizedTicker);
    const categoryName = company ? getCategoryName(company.primaryCategorySlug) : "AI value chain";
    const relatedCompanies = listRelatedCompanySeeds(normalizedTicker).map(mapSeedCompanyToRelatedCompany);

    return (
      <RoutePlaceholder
        action={{ href: "/companies", label: "Return to directory" }}
        description={company ? `${company.companyName} is included in the curated company universe. Connect the reviewed data source to load verified products and ecosystem relationships.` : `Research for ${normalizedTicker} will combine verified company records and ecosystem relationships when data coverage is connected.`}
        eyebrow="Company research"
        title={company?.companyName ?? normalizedTicker}
      >
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          <section className="min-h-40 bg-surface p-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">Company profile</p>
            <p className="mt-8 font-mono text-sm text-ink">{company?.ticker ?? normalizedTicker}</p>
            {company ? <Link className="mt-2 inline-block text-sm font-medium text-teal hover:text-accent" href={`/categories/${company.primaryCategorySlug}`}>{categoryName}</Link> : null}
          </section>
          <section className="min-h-40 bg-surface p-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">AI role</p>
            <p className="mt-8 text-sm leading-6 text-ink-muted">{company?.aiFocus ?? "No verified role is available in the local company registry."}</p>
          </section>
          <section className="min-h-40 bg-surface p-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">Research status</p>
            <p className="mt-8 text-sm leading-6 text-ink-muted">Approved research and graph records will appear after the reviewed data source is connected.</p>
          </section>
        </div>
        <RelatedCompanies categoryName={categoryName} companies={relatedCompanies} />
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a className="inline-flex items-center gap-2 border border-line px-3 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent" href={yahooFinanceUrl} rel="noreferrer" target="_blank">
            Price
            <ExternalLink aria-hidden="true" size={15} />
          </a>
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong" href="/companies">
            <ArrowLeft aria-hidden="true" size={16} />
            All companies
          </Link>
        </div>
      </RoutePlaceholder>
    );
  }

  const company = await getCompanyByTicker(normalizedTicker);

  if (!company) {
    notFound();
  }

  const [products, graph, relatedCompanies] = await Promise.all([
    listActiveProductsForCompany(company.id),
    getOneHopGraphForCompany({ companyId: company.id }),
    listRelatedCompanies({ categorySlug: company.primaryCategorySlug, companyId: company.id }),
  ]);
  const { contextVersion } = createApprovedCompanyResearchContext({ company, graph, products });
  const [thesis, research] = await Promise.all([
    getCurrentCompanyThesis(company.id, contextVersion),
    getCurrentCompanyResearch(company.id, contextVersion),
  ]);
  const graphNodesById = new Map(graph.nodes.map((node) => [node.id, node]));

  return (
    <section className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong" href="/companies">
          <ArrowLeft aria-hidden="true" size={16} />
          Company directory
        </Link>
        <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent">Company research</p>
        <div className="mt-4 border-b border-line pb-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{company.name}</h1>
              <p className="mt-2 font-mono text-sm text-ink-muted">{company.ticker}{company.aiRole ? `  /  ${company.aiRole}` : ""}</p>
              {company.secondaryCategories.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                  {company.secondaryCategories.map((category) => (
                    <Link className="text-sm font-medium text-ink-muted hover:text-accent" href={`/categories/${category.slug}`} key={category.slug}>{category.name}</Link>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link className="text-sm font-medium text-teal hover:text-accent" href={`/categories/${company.primaryCategorySlug}`}>{company.primaryCategory}</Link>
              <a className="inline-flex items-center gap-2 border border-line px-3 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent" href={yahooFinanceUrl} rel="noreferrer" target="_blank">
                Price
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </div>
          </div>
        </div>
        <AIInvestmentThesis thesis={thesis} />
        <AIResearchSummary research={research} />
        <div className="py-8">
          <AIResearchDisclaimer />
        </div>
        <section className="border-b border-line py-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">Verified products</p>
          <div className="mt-5 divide-y divide-line border-y border-line">
            {products.length > 0 ? products.map((product) => (
              <div className="flex items-start justify-between gap-4 py-4" key={product.name}>
                <div>
                  <p className="text-sm font-semibold text-ink">{product.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{product.productType}</p>
                </div>
                {product.sourceReference?.startsWith("https://") ? <a className="shrink-0 text-sm font-medium text-accent hover:text-accent-strong" href={product.sourceReference} rel="noreferrer" target="_blank">Source</a> : null}
              </div>
            )) : <p className="py-4 text-sm leading-6 text-ink-muted">No verified products are available for this company yet.</p>}
          </div>
        </section>
        <section className="py-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">Knowledge graph</p>
          <div className="mt-5 divide-y divide-line border-y border-line">
            {graph.edges.length > 0 ? graph.edges.map((edge) => {
              const source = graphNodesById.get(edge.sourceNodeId);
              const target = graphNodesById.get(edge.targetNodeId);

              return (
                <div className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center" key={edge.id}>
                  <p className="text-sm font-semibold text-ink">{source?.name ?? "Unknown node"}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-teal">{edge.relationshipType}</p>
                  <p className="text-sm font-semibold text-ink sm:text-right">{target?.name ?? "Unknown node"}</p>
                </div>
              );
            }) : <p className="py-4 text-sm leading-6 text-ink-muted">No high-confidence ecosystem relationships are available for this company yet.</p>}
          </div>
        </section>
        <AIChatPanel companyName={company.name} ticker={company.ticker} />
        <RelatedCompanies categoryName={company.primaryCategory} companies={relatedCompanies} />
      </div>
    </section>
  );
}
