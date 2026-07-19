import Link from "next/link";

import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { listCompanies } from "@/lib/repositories/company-repository";
import { hasPublicSupabaseConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function CompaniesPage() {
  if (!hasPublicSupabaseConfig()) {
    return (
      <RoutePlaceholder
        action={{ href: "/search", label: "Search the directory" }}
        description="The directory will present a consistent view of verified AI-company coverage, with desktop and mobile layouts designed for scanning."
        eyebrow="Companies"
        title="Company directory"
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

  const companies = await listCompanies({ limit: 100 });

  return (
    <section className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent">Companies</p>
        <div className="mt-4 flex flex-col gap-3 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Company directory</h1>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{companies.length} supported issuers</p>
        </div>
        <div className="mt-8 overflow-x-auto border border-line">
          <table className="min-w-[42rem] w-full border-collapse text-left text-sm">
            <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
              <tr>
                <th className="border-b border-line px-5 py-4 font-semibold">Company</th>
                <th className="border-b border-line px-5 py-4 font-semibold">AI role</th>
                <th className="border-b border-line px-5 py-4 font-semibold">Primary category</th>
                <th className="border-b border-line px-5 py-4 font-semibold">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-surface">
              {companies.map((company) => (
                <tr className="transition-colors hover:bg-surface-muted" key={company.id}>
                  <td className="px-5 py-4">
                    <Link className="font-semibold text-ink hover:text-accent" href={`/companies/${company.ticker}`}>{company.name}</Link>
                    <p className="mt-1 font-mono text-xs text-ink-muted">{company.ticker}</p>
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{company.aiRole ?? "-"}</td>
                  <td className="px-5 py-4">
                    <Link className="text-ink hover:text-accent" href={`/categories/${company.primaryCategorySlug}`}>{company.primaryCategory}</Link>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{company.coverageTier.replace("_", " ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
