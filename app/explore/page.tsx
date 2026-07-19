import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { valueChainCategories } from "@/lib/config/site";
import { listActiveCategories } from "@/lib/repositories/category-repository";
import { listCompanies } from "@/lib/repositories/company-repository";
import { hasPublicSupabaseConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  if (!hasPublicSupabaseConfig()) {
    return (
      <RoutePlaceholder
        action={{ href: "/categories", label: "Browse categories" }}
        description="Start with an AI value-chain role, then follow connected company research as curated coverage becomes available."
        eyebrow="Explore"
        title="Navigate the AI economy by function, not just market sector."
      >
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {valueChainCategories.map((category) => {
            const Icon = category.icon;

            return (
              <Link className="group flex min-h-32 items-start justify-between gap-5 bg-surface p-5 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent" href={`/categories/${category.slug}`} key={category.slug}>
                <div>
                  <h2 className="text-sm font-semibold text-ink">{category.name}</h2>
                  <p className="mt-2 max-w-xs text-sm leading-5 text-ink-muted">{category.description}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-8 text-accent">
                  <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
                  <ArrowRight aria-hidden="true" size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </RoutePlaceholder>
    );
  }

  const [categories, companies] = await Promise.all([
    listActiveCategories(),
    listCompanies({ limit: 100 }),
  ]);
  const companyCountsByCategory = new Map<string, number>();

  for (const company of companies) {
    companyCountsByCategory.set(company.primaryCategorySlug, (companyCountsByCategory.get(company.primaryCategorySlug) ?? 0) + 1);
  }

  return (
    <section className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent">Explore</p>
        <h1 className="mt-4 border-b border-line pb-7 text-3xl font-semibold text-ink sm:text-4xl">AI value chain</h1>
        <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link className="group flex min-h-36 flex-col justify-between bg-surface p-5 transition-colors hover:bg-surface-muted" href={`/categories/${category.slug}`} key={category.id}>
              <div>
                <h2 className="text-sm font-semibold text-ink group-hover:text-accent">{category.name}</h2>
                <p className="mt-2 text-sm leading-5 text-ink-muted">{category.description}</p>
              </div>
              <div className="mt-8 flex items-center justify-between font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">
                <span>{companyCountsByCategory.get(category.slug) ?? 0} companies</span>
                <ArrowRight aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1" size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
