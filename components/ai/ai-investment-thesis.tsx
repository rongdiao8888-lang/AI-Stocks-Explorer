import type { CompanyThesis } from "@/lib/repositories/ai-research-repository";
import { parseResearchPoints } from "@/lib/ai/research-content";

type AIInvestmentThesisProps = {
  thesis: CompanyThesis | null;
};

type ThesisListProps = {
  label: string;
  points: string[];
};

function isSupportedThesisPoint(point: string) {
  const normalizedPoint = point.trim();

  return normalizedPoint.length > 0
    && !/(unavailable|not available|no verified|data gap|the supplied context (does not include|contains no)|the context (does not include|contains no|lacks))/i.test(normalizedPoint);
}

function removeCoverageGapSentences(value: string) {
  return value
    .split(/(?<=[.!?])\s+/)
    .filter(isSupportedThesisPoint)
    .join(" ")
    .trim();
}

function ThesisList({ label, points }: ThesisListProps) {
  return (
    <div className="border-t border-insight-line pt-5">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-coral-strong">{label}</p>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-muted">
        {points.map((point) => <li className="border-l-2 border-coral pl-3" key={point}>{point}</li>)}
      </ul>
    </div>
  );
}

export function AIInvestmentThesis({ thesis }: AIInvestmentThesisProps) {
  if (!thesis) {
    return (
      <section className="border-b border-line bg-insight-surface px-5 py-8 sm:px-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">AI investment thesis</p>
        <p className="mt-4 text-sm leading-6 text-ink-muted">This thesis is being prepared from the curated company record.</p>
      </section>
    );
  }

  const sections = [
    { label: "Investment drivers", points: parseResearchPoints(thesis.investmentDrivers).filter(isSupportedThesisPoint) },
    { label: "Competitive advantages", points: parseResearchPoints(thesis.competitiveAdvantages).filter(isSupportedThesisPoint) },
    { label: "Growth catalysts", points: parseResearchPoints(thesis.growthCatalysts).filter(isSupportedThesisPoint) },
    { label: "Key risks", points: parseResearchPoints(thesis.keyRisks).filter(isSupportedThesisPoint) },
  ].filter((section) => section.points.length > 0);
  const thesisSummary = removeCoverageGapSentences(thesis.thesisSummary)
    || "This profile summarizes the company’s current AI role, products, and ecosystem relationships.";

  return (
    <section className="border-b border-line bg-insight-surface px-5 py-8 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-coral-strong">AI investment thesis</p>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-coral">Reviewed AI research</p>
      </div>
      <p className="mt-5 max-w-4xl text-base leading-7 text-ink">{thesisSummary}</p>
      <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {sections.map((section) => <ThesisList key={section.label} {...section} />)}
      </div>
    </section>
  );
}
