import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { valueChainCategories } from "@/lib/config/site";
import { getActiveCategoryBySlug } from "@/lib/repositories/category-repository";
import { listCompanies } from "@/lib/repositories/company-repository";
import { hasPublicSupabaseConfig } from "@/lib/supabase/config";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const staticCategory = valueChainCategories.find((item) => item.slug === slug);

  if (!hasPublicSupabaseConfig()) {
    const title = staticCategory?.name ?? "AI category";

    return (
      <RoutePlaceholder
        action={{ href: "/companies", label: "Open company directory" }}
        description={staticCategory?.description ?? "This AI value-chain category will be connected to verified company coverage."}
        eyebrow="Category research"
        title={title}
      >
        <div className="border-y border-line bg-surface-muted px-5 py-6 sm:flex sm:items-center sm:justify-between sm:px-6">
          <p className="max-w-2xl text-sm leading-6 text-ink-muted">Company coverage, category demand drivers, and relationship context are prepared through the structured data layer.</p>
          <Link className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong sm:mt-0" href="/categories">
            <ArrowLeft aria-hidden="true" size={16} />
            All categories
          </Link>
        </div>
      </RoutePlaceholder>
    );
  }

  const category = await getActiveCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const companies = await listCompanies({ categorySlug: category.slug, limit: 100 });

  return (
    <section className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong" href="/categories">
          <ArrowLeft aria-hidden="true" size={16} />
          All categories
        </Link>
        <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-teal">Category research</p>
        <div className="mt-4 flex flex-col gap-4 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{category.name}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-ink-muted">{category.description}</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{companies.length} companies</p>
        </div>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {companies.map((company) => (
            <Link className="group flex items-center justify-between gap-4 py-5" href={`/companies/${company.ticker}`} key={company.id}>
              <div>
                <h2 className="text-sm font-semibold text-ink group-hover:text-accent">{company.name}</h2>
                <p className="mt-1 font-mono text-xs text-ink-muted">{company.ticker}{company.aiRole ? `  /  ${company.aiRole}` : ""}</p>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{company.coverageTier.replace("_", " ")}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
