import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { listActiveCategories } from "@/lib/repositories/category-repository";
import { listCompanies } from "@/lib/repositories/company-repository";
import { hasPublicSupabaseConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function CompaniesPage() {
  if (!hasPublicSupabaseConfig()) {
    return (
      <RoutePlaceholder
        action={{ href: "/search", label: "Search the directory" }}
        description="The directory will organize verified AI-company coverage by primary value-chain category."
        eyebrow="AI Stocks List"
        title="AI stocks by category"
      >
        <div className="overflow-x-auto border border-line bg-surface">
          <table className="min-w-[46rem] w-full border-collapse text-left text-sm">
            <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
              <tr>{["Company", "AI role", "Category", "Coverage"].map((label) => <th className="border-b border-line px-5 py-4 font-semibold" key={label}>{label}</th>)}</tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5 py-10 text-ink" colSpan={4}>Verified company records will appear here once the initial dataset is connected.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </RoutePlaceholder>
    );
  }

  const [categories, companies] = await Promise.all([
    listActiveCategories(),
    listCompanies({ limit: 100 }),
  ]);
  const companiesByCategory = new Map<string, typeof companies>();

  for (const company of companies) {
    const groupedCompanies = companiesByCategory.get(company.primaryCategorySlug);

    if (groupedCompanies) {
      groupedCompanies.push(company);
    } else {
      companiesByCategory.set(company.primaryCategorySlug, [company]);
    }
  }

  return (
    <section className="border-b border-line bg-canvas py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent">AI Stocks List</p>
        <div className="mt-4 flex flex-col gap-3 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">AI stocks by category</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-muted">Browse the curated public companies grouped by their primary role in the AI value chain.</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{companies.length} supported issuers</p>
        </div>
        <div className="mt-10 space-y-10">
          {categories.map((category, index) => {
            const categoryCompanies = companiesByCategory.get(category.slug) ?? [];

            return (
              <section className="border-y border-line" key={category.id}>
                <div className="flex flex-col gap-4 bg-surface-tint px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent">Category {String(index + 1).padStart(2, "0")}</p>
                    <h2 className="mt-2 text-xl font-semibold text-ink">{category.name}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-muted">{category.description}</p>
                  </div>
                  <Link className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong" href={`/categories/${category.slug}`}>
                    {categoryCompanies.length} {categoryCompanies.length === 1 ? "company" : "companies"}
                    <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                </div>
                <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
                  {categoryCompanies.map((company) => (
                    <Link className="group flex min-h-36 flex-col justify-between bg-surface px-5 py-5 transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent" href={`/companies/${company.ticker}`} key={company.id}>
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-sm font-semibold text-ink group-hover:text-accent-strong">{company.name}</h3>
                          <ArrowRight aria-hidden="true" className="mt-0.5 shrink-0 text-accent transition-transform group-hover:translate-x-1" size={16} />
                        </div>
                        <p className="mt-1 font-mono text-xs text-accent">{company.ticker}</p>
                      </div>
                      <div className="mt-6">
                        <p className="text-sm leading-5 text-ink-muted">{company.aiRole ?? "AI role pending review"}</p>
                        <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{company.coverageTier.replace("_", " ")}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
