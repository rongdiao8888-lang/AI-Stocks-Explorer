import Link from "next/link";

export type RelatedCompanyItem = {
  aiRole: string | null;
  name: string;
  ticker: string;
};

type RelatedCompaniesProps = {
  categoryName: string;
  companies: RelatedCompanyItem[];
};

export function RelatedCompanies({ categoryName, companies }: RelatedCompaniesProps) {
  return (
    <section className="border-t border-line py-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">Related companies</p>
      {companies.length > 0 ? (
        <div className="mt-5 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {companies.map((company) => (
            <Link className="bg-surface p-5 transition-colors hover:bg-surface-muted" href={`/companies/${company.ticker}`} key={company.ticker}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink">{company.name}</p>
                  <p className="mt-1 font-mono text-xs text-ink-muted">{company.ticker}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-accent">View</span>
              </div>
              <p className="mt-6 text-sm text-ink-muted">Shared category: {categoryName}</p>
              {company.aiRole ? <p className="mt-1 text-sm text-ink-muted">{company.aiRole}</p> : null}
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-ink-muted">No additional active companies are available in this category yet.</p>
      )}
    </section>
  );
}
