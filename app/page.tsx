import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { applicationSignals, valueChainCategories } from "@/lib/config/site";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.66fr)_minmax(18rem,0.34fr)] lg:items-end lg:px-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent">AI value chain research</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">Explore the public companies behind the AI economy.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted">
              A structured research workspace for understanding company roles, verified products, and ecosystem relationships.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className={buttonVariants({ variant: "default" })} href="/explore">
                Explore the value chain
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <Link className={buttonVariants({ variant: "outline" })} href="/search">
                <Search aria-hidden="true" size={16} />
                Search companies
              </Link>
            </div>
          </div>
          <div className="border-l-2 border-amber bg-surface-muted p-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">Research model</p>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-ink">
              <li className="flex gap-3"><span className="font-mono text-accent">01</span><span>Structured records establish company facts.</span></li>
              <li className="flex gap-3"><span className="font-mono text-teal">02</span><span>Relationships explain ecosystem position.</span></li>
              <li className="flex gap-3"><span className="font-mono text-amber">03</span><span>AI synthesis stays grounded in that context.</span></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-teal">Browse by role</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">AI value chain</h2>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong" href="/categories">
              View all categories <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {valueChainCategories.map((category) => {
              const Icon = category.icon;

              return (
                <Link className="group min-h-48 bg-surface p-5 transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent" href={`/categories/${category.slug}`} key={category.slug}>
                  <Icon aria-hidden="true" className="text-accent" size={20} strokeWidth={1.75} />
                  <h3 className="mt-10 text-sm font-semibold text-ink">{category.name}</h3>
                  <p className="mt-2 text-sm leading-5 text-ink-muted">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-amber">Foundation principles</p>
          <div className="mt-5 grid gap-8 border-t border-line pt-8 lg:grid-cols-3">
            {applicationSignals.map((signal) => {
              const Icon = signal.icon;

              return (
                <article key={signal.label}>
                  <Icon aria-hidden="true" className="text-teal" size={21} strokeWidth={1.75} />
                  <h2 className="mt-5 text-lg font-semibold text-ink">{signal.label}</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-ink-muted">{signal.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
