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
  const connectedNodeCount = new Set(relationships.flatMap((relationship) => [relationship.sourceNodeId, relationship.targetNodeId])).size;

  return (
    <section className="border-b border-[#d8bb98] bg-[#e6cfaf] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden border border-[#e5c09f] bg-[#fff2dc] shadow-[0_18px_48px_rgba(91,56,39,0.14)]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#bd5937]">AI ecosystem</p>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-[#542d22] sm:text-5xl">Follow the connections behind AI.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#725d55] sm:text-lg">
              Explore the high-confidence relationships linking companies, products, technologies, and the categories that power the AI economy.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="border border-[#efc8b4] bg-[#fffaf0] p-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#bd5937]">In this view</p>
                <p className="mt-3 text-3xl font-semibold text-[#542d22]">{relationships.length}</p>
                <p className="mt-2 text-sm leading-6 text-[#725d55]">High-confidence relationships currently in view.</p>
              </div>
              <div className="border border-[#efc8b4] bg-[#fffaf0] p-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#bd5937]">Connected entities</p>
                <p className="mt-3 text-3xl font-semibold text-[#542d22]">{connectedNodeCount}</p>
                <p className="mt-2 text-sm leading-6 text-[#725d55]">Companies, products, technologies, and value-chain categories.</p>
              </div>
            </div>

            <Link className="mt-9 inline-flex min-h-11 items-center gap-2 bg-[#ff914d] px-4 text-sm font-semibold text-[#3f2219] transition-colors hover:bg-[#ec7740] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff914d] focus-visible:ring-offset-2" href="/companies">
              Browse AI stocks
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>

        <section className="mt-8 overflow-hidden border border-[#e5c09f] bg-[#fff2dc] shadow-[0_12px_32px_rgba(91,56,39,0.1)]">
          <div className="flex flex-col gap-4 border-b border-[#efc8b4] p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#bd5937]">Relationship register</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-[#542d22] sm:text-4xl">Connections in view</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#725d55] lg:text-right">Each row links a curated source entity to its related destination.</p>
          </div>

          <div className="divide-y divide-[#efc8b4]">
            {relationships.map((relationship) => (
              <div className="grid gap-4 px-6 py-7 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center" key={relationship.id}>
                <div>
                  <p className="text-lg font-semibold text-[#542d22]">{relationship.source.name}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-[#8c6d63]">{relationship.source.nodeType}</p>
                </div>
                <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.1em] text-[#bd5937] lg:justify-self-center">
                  <ArrowRight aria-hidden="true" size={18} />
                  {relationship.relationshipType}
                </div>
                <div className="lg:text-right">
                  <p className="text-lg font-semibold text-[#542d22]">{relationship.target.name}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-[#8c6d63]">{relationship.target.nodeType}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
