import { ArrowRight, Network } from "lucide-react";
import Link from "next/link";

import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { listHighConfidenceGraphRelationships } from "@/lib/repositories/graph-repository";
import { hasPublicSupabaseConfig } from "@/lib/supabase/config";

const relationshipGroups = ["Manufacturing", "Memory", "Networking", "Cloud platforms", "AI software"];

export const dynamic = "force-dynamic";

export default async function EcosystemPage() {
  if (!hasPublicSupabaseConfig()) {
    return (
      <RoutePlaceholder
        action={{ href: "/explore", label: "Explore categories" }}
        description="The ecosystem view will surface curated relationship stories and provide a path into individual company research."
        eyebrow="AI ecosystem"
        title="See the relationships behind the AI economy."
      >
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {relationshipGroups.map((group, index) => (
            <section className="min-h-44 bg-surface p-5" key={group}>
              <span className="font-mono text-xs text-ink-muted">0{index + 1}</span>
              <Network aria-hidden="true" className="mt-6 text-teal" size={20} strokeWidth={1.75} />
              <h2 className="mt-5 text-sm font-semibold text-ink">{group}</h2>
            </section>
          ))}
        </div>
      </RoutePlaceholder>
    );
  }

  const relationships = await listHighConfidenceGraphRelationships();

  return (
    <section className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-teal">AI ecosystem</p>
        <div className="mt-4 flex flex-col gap-4 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Verified relationships</h1>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{relationships.length} relationships shown</p>
        </div>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {relationships.map((relationship) => (
            <div className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center" key={relationship.id}>
              <div>
                <p className="text-sm font-semibold text-ink">{relationship.source.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{relationship.source.nodeType}</p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-teal">
                <ArrowRight aria-hidden="true" size={15} />
                {relationship.relationshipType}
              </div>
              <div className="sm:text-right">
                <p className="text-sm font-semibold text-ink">{relationship.target.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-ink-muted">{relationship.target.nodeType}</p>
              </div>
            </div>
          ))}
        </div>
        <Link className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong" href="/companies">
          Browse companies
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </section>
  );
}
