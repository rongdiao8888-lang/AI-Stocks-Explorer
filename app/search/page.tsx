import { Search } from "lucide-react";
import Link from "next/link";

import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { searchCatalog } from "@/lib/repositories/search-repository";
import { hasPublicSupabaseConfig } from "@/lib/supabase/config";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (!hasPublicSupabaseConfig()) {
    return (
      <RoutePlaceholder
        action={{ href: "/explore", label: "Explore categories" }}
        description="Search will prioritize an exact ticker, followed by companies, products, technologies, and AI value-chain categories."
        eyebrow="Search"
        title="Find a company or AI technology."
      >
        <form action="/search" className="flex flex-col gap-3 border-y border-line py-6 sm:flex-row" method="get">
          <label className="sr-only" htmlFor="company-search">Search companies, tickers, products, or technologies</label>
          <div className="relative flex-1">
            <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
            <input className="h-12 w-full rounded-md border border-line bg-surface pl-11 pr-4 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-accent focus:ring-2 focus:ring-accent/20" id="company-search" name="q" placeholder="Search companies, tickers, products, or technologies" type="search" />
          </div>
          <button className="h-12 rounded-md bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" type="submit">Search</button>
        </form>
      </RoutePlaceholder>
    );
  }

  const results = query ? await searchCatalog(query) : [];

  return (
    <section className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent">Search</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">Find a company or AI technology.</h1>
        <form action="/search" className="relative mt-8 max-w-3xl" method="get">
          <label className="sr-only" htmlFor="company-search">Search companies, tickers, products, or technologies</label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
          <input className="h-12 w-full rounded-md border border-line bg-surface pl-11 pr-12 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-accent focus:ring-2 focus:ring-accent/20" defaultValue={query} id="company-search" name="q" placeholder="Search companies, tickers, products, or technologies" type="search" />
          <button aria-label="Search" className="absolute right-1 top-1 grid size-10 place-items-center text-accent hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" title="Search" type="submit"><Search aria-hidden="true" size={17} /></button>
        </form>
        {query ? (
          <div className="mt-8 divide-y divide-line border-y border-line">
            {results.length > 0 ? results.map((result) => (
              <Link className="group flex items-center justify-between gap-4 py-4" href={result.href} key={`${result.kind}-${result.title}`}>
                <div>
                  <p className="text-sm font-semibold text-ink group-hover:text-accent">{result.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{result.subtitle}</p>
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{result.kind}</span>
              </Link>
            )) : <p className="py-8 text-sm text-ink-muted">No supported companies, categories, products, or technologies matched that search.</p>}
          </div>
        ) : null}
      </div>
    </section>
  );
}
