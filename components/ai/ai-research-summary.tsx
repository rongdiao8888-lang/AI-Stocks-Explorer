import type { CompanyResearch } from "@/lib/repositories/ai-research-repository";

type AIResearchSummaryProps = {
  research: CompanyResearch | null;
};

function formatResearchDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "Date unavailable" : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export function AIResearchSummary({ research }: AIResearchSummaryProps) {
  if (!research) {
    return (
      <section className="border-b border-line py-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">AI ecosystem research</p>
        <p className="mt-4 text-sm leading-6 text-ink-muted">No approved ecosystem research is available for this company yet.</p>
      </section>
    );
  }

  const sections = [
    { label: "Why it matters", value: research.whyItMatters },
    { label: "Value-chain role", value: research.valueChainRole },
    { label: "Technology position", value: research.technologyPosition },
    { label: "Customer exposure", value: research.customerExposureSummary },
    { label: "Competitive landscape", value: research.competitiveLandscape },
    { label: "Risk summary", value: research.riskSummary },
  ];

  return (
    <section className="border-b border-line py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">AI ecosystem research</p>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-teal">Reviewed AI research</p>
      </div>
      <div className="mt-5 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="bg-surface p-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">AI ecosystem score</p>
          <p className="mt-5 text-4xl font-semibold text-ink">{research.aiEcosystemScore}<span className="text-lg text-ink-muted"> / 100</span></p>
          <p className="mt-5 text-sm leading-6 text-ink-muted">{research.scoreExplanation}</p>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">Reviewed {formatResearchDate(research.generatedAt)}</p>
        </div>
        <div className="grid gap-px bg-line sm:grid-cols-2">
          {sections.map((section) => (
            <div className="bg-surface p-5" key={section.label}>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">{section.label}</p>
              <p className="mt-4 text-sm leading-6 text-ink-muted">{section.value}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-muted">The AI Ecosystem Score describes ecosystem position. It is not an expected-return rating.</p>
    </section>
  );
}
