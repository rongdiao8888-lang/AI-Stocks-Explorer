import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { listActiveCategories } from "@/lib/repositories/category-repository";
import { valueChainCategories } from "@/lib/config/site";
import { hasPublicSupabaseConfig } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  if (!hasPublicSupabaseConfig()) {
    return (
      <RoutePlaceholder
        action={{ href: "/companies", label: "View company directory" }}
        description="Each category will combine a plain-English explanation, demand drivers, risks, and verified public-company coverage."
        eyebrow="Categories"
        title="AI value-chain categories"
      >
        <div className="border-t border-line">
          {valueChainCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link className="group grid gap-4 border-b border-line py-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center" href={`/categories/${category.slug}`} key={category.slug}>
                <span className="font-mono text-xs text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
                <div className="flex items-start gap-4">
                  <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-teal" size={19} strokeWidth={1.75} />
                  <div>
                    <h2 className="text-sm font-semibold text-ink">{category.name}</h2>
                    <p className="mt-1 text-sm leading-5 text-ink-muted">{category.description}</p>
                  </div>
                </div>
                <ArrowRight aria-hidden="true" className="hidden text-accent transition-transform group-hover:translate-x-1 sm:block" size={17} />
              </Link>
            );
          })}
        </div>
      </RoutePlaceholder>
    );
  }

  const categories = await listActiveCategories();

  return (
    <section className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent">Categories</p>
        <h1 className="mt-4 border-b border-line pb-7 text-3xl font-semibold text-ink sm:text-4xl">AI value-chain categories</h1>
        <div className="border-t border-line">
          {categories.map((category, index) => (
            <Link className="group grid gap-4 border-b border-line py-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center" href={`/categories/${category.slug}`} key={category.id}>
              <span className="font-mono text-xs text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-sm font-semibold text-ink">{category.name}</h2>
                <p className="mt-1 text-sm leading-5 text-ink-muted">{category.description}</p>
              </div>
              <ArrowRight aria-hidden="true" className="hidden text-accent transition-transform group-hover:translate-x-1 sm:block" size={17} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
