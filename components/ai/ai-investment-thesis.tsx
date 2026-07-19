import type { CompanyThesis } from "@/lib/repositories/ai-research-repository";
import { parseResearchPoints } from "@/lib/ai/research-content";

type AIInvestmentThesisProps = {
  thesis: CompanyThesis | null;
};

type ThesisListProps = {
  label: string;
  points: string[];
};

function ThesisList({ label, points }: ThesisListProps) {
  return (
    <div className="border-t border-line pt-5">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">{label}</p>
      {points.length > 0 ? (
        <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-muted">
          {points.map((point) => <li className="border-l-2 border-accent pl-3" key={point}>{point}</li>)}
        </ul>
      ) : <p className="mt-4 text-sm leading-6 text-ink-muted">Not available in the approved research record.</p>}
    </div>
  );
}

export function AIInvestmentThesis({ thesis }: AIInvestmentThesisProps) {
  if (!thesis) {
    return (
      <section className="border-b border-line py-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">AI investment thesis</p>
        <p className="mt-4 text-sm leading-6 text-ink-muted">No approved investment thesis is available for this company yet.</p>
      </section>
    );
  }

  const sections = [
    { label: "Investment drivers", points: parseResearchPoints(thesis.investmentDrivers) },
    { label: "Competitive advantages", points: parseResearchPoints(thesis.competitiveAdvantages) },
    { label: "Growth catalysts", points: parseResearchPoints(thesis.growthCatalysts) },
    { label: "Key risks", points: parseResearchPoints(thesis.keyRisks) },
  ];

  return (
    <section className="border-b border-line py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">AI investment thesis</p>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-teal">Reviewed AI research</p>
      </div>
      <p className="mt-5 max-w-4xl text-base leading-7 text-ink">{thesis.thesisSummary}</p>
      <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {sections.map((section) => <ThesisList key={section.label} {...section} />)}
      </div>
    </section>
  );
}
