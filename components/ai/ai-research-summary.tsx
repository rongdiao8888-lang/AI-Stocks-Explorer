import type { CompanyResearch } from "@/lib/repositories/ai-research-repository";

type AIResearchSummaryProps = {
  research: CompanyResearch | null;
};

function formatResearchDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "Current research" : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

function isSupportedResearchValue(value: string) {
  const normalizedValue = value.trim();

  return normalizedValue.length > 0
    && !/(unavailable|not available|no verified|data gap|the supplied context (does not include|contains no)|the context (does not include|contains no|lacks))/i.test(normalizedValue);
}

function removeCoverageGapSentences(value: string) {
  return value
    .split(/(?<=[.!?])\s+/)
    .filter(isSupportedResearchValue)
    .join(" ")
    .trim();
}

export function AIResearchSummary({ research }: AIResearchSummaryProps) {
  if (!research) {
    return (
      <section className="border-b border-line bg-insight-surface px-5 py-8 sm:px-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">AI ecosystem research</p>
        <p className="mt-4 text-sm leading-6 text-ink-muted">This research profile is being prepared from the curated company record.</p>
      </section>
    );
  }

  const sections = [
    { label: "Why it matters", value: removeCoverageGapSentences(research.whyItMatters) },
    { label: "Value-chain role", value: removeCoverageGapSentences(research.valueChainRole) },
    { label: "Technology position", value: removeCoverageGapSentences(research.technologyPosition) },
    { label: "Customer exposure", value: removeCoverageGapSentences(research.customerExposureSummary) },
    { label: "Competitive landscape", value: removeCoverageGapSentences(research.competitiveLandscape) },
    { label: "Risk summary", value: removeCoverageGapSentences(research.riskSummary) },
  ].filter((section) => isSupportedResearchValue(section.value));
  const scoreExplanation = removeCoverageGapSentences(research.scoreExplanation)
    || "The score summarizes the current approved company role, products, and ecosystem relationships.";

  return (
    <section className="border-b border-line bg-insight-surface px-5 py-8 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-coral-strong">AI ecosystem research</p>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-coral">Reviewed AI research</p>
      </div>
      <div className="mt-5 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="bg-surface-raised p-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">AI ecosystem score</p>
          <p className="mt-5 text-4xl font-semibold text-ink">{research.aiEcosystemScore}<span className="text-lg text-ink-muted"> / 100</span></p>
          <p className="mt-5 text-sm leading-6 text-ink-muted">{scoreExplanation}</p>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">Reviewed {formatResearchDate(research.generatedAt)}</p>
        </div>
        <div className="grid gap-px bg-line sm:grid-cols-2">
          {sections.map((section) => (
            <div className="bg-surface-raised p-5" key={section.label}>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">{section.label}</p>
              <p className="mt-4 text-sm leading-6 text-ink-muted">{section.value}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-muted">The AI Ecosystem Score describes ecosystem position. It is not an expected-return rating.</p>
      <p className="mt-3 text-sm leading-6 text-ink-muted">This profile focuses on the current curated record: AI role, verified products, and high-confidence ecosystem relationships.</p>
    </section>
  );
}
