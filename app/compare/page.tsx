import { RoutePlaceholder } from "@/components/layout/route-placeholder";

export default function ComparePage() {
  return (
    <RoutePlaceholder
      action={{ href: "/companies", label: "Browse companies" }}
      description="Comparison is planned after the core research journey is connected. It will align the same structured data and AI research fields across selected companies."
      eyebrow="Compare"
      title="Compare AI company research consistently."
    >
      <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {["Company role", "Ecosystem position", "Verified products", "Research signals"].map((item) => (
          <section className="min-h-36 bg-surface p-5" key={item}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">Comparison field</p>
            <h2 className="mt-8 text-sm font-semibold text-ink">{item}</h2>
          </section>
        ))}
      </div>
    </RoutePlaceholder>
  );
}
