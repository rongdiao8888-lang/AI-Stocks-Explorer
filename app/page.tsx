import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { AIStocksListDialog } from "@/components/companies/ai-stocks-list-dialog";
import { buttonVariants } from "@/components/ui/button";
import { applicationSignals, valueChainCategories } from "@/lib/config/site";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-[#d8bb98] bg-[#e6cfaf] py-6 sm:py-9">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border border-[#e5c09f] bg-[#fff2dc] px-6 py-12 shadow-[0_18px_44px_rgba(91,56,39,0.14)] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <p className="font-mono text-base font-semibold uppercase tracking-[0.12em] text-[#bd5937]">Explore the AI Stock Market</p>
            <h1 className="mt-5 max-w-5xl font-serif text-2xl font-semibold leading-tight text-[#542d22]">
              Find your next great <span className="text-[#df673c]">AI Investment</span>
            </h1>
            <p className="mt-6 max-w-4xl text-base leading-6 text-[#725d55] sm:text-lg sm:leading-7">
              <span className="font-medium text-[#9d4b30]">Follow the money in artificial intelligence.</span> Dive into simple breakdowns of top public companies, learn what they build, and understand why they matter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AIStocksListDialog triggerClassName={buttonVariants({ variant: "default", className: "bg-[#ff914d] text-[#3f2219] hover:bg-[#ec7740] focus-visible:ring-[#ff914d]" })} />
              <Link className={buttonVariants({ variant: "outline", className: "border-[#ff914d] bg-[#fffaf0] text-[#9d4b30] hover:border-[#df673c] hover:bg-[#ffe4c8] focus-visible:ring-[#ff914d]" })} href="/explore">
                Explore the value chain
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <Link className={buttonVariants({ variant: "outline", className: "border-[#e5c09f] bg-[#fffaf0] text-[#542d22] hover:border-[#ff914d] hover:bg-[#ffe9d2] focus-visible:ring-[#ff914d]" })} href="/search">
                <Search aria-hidden="true" size={16} />
                Search companies
              </Link>
            </div>
            <div className="mt-12 grid border-y border-[#efc8b4] sm:grid-cols-3">
              <article className="border-b border-[#efc8b4] py-5 sm:border-b-0 sm:pr-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#bd5937]">01 / Verified facts</p>
                <p className="mt-3 text-sm leading-6 text-[#725d55]">Company records and product coverage establish the research baseline.</p>
              </article>
              <article className="border-b border-[#efc8b4] py-5 sm:border-b-0 sm:border-l sm:border-[#efc8b4] sm:px-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#9d4b30]">02 / Ecosystem context</p>
                <p className="mt-3 text-sm leading-6 text-[#725d55]">Relationships show how companies connect across the value chain.</p>
              </article>
              <article className="py-5 sm:border-l sm:border-[#efc8b4] sm:pl-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#d5673c]">03 / Reviewed AI research</p>
                <p className="mt-3 text-sm leading-6 text-[#725d55]">AI synthesis is visibly separated and constrained to approved context.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e5c09f] bg-[#f7e5c8] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#bd5937]">Browse by role</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-[#542d22]">AI value chain</h2>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-medium text-[#9d4b30] hover:text-[#542d22]" href="/categories">
              View all categories <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {valueChainCategories.map((category) => {
              const Icon = category.icon;

              return (
                <Link className="group flex min-h-48 flex-col border border-[#efc8b4] bg-[#fffaf0] p-5 transition-colors hover:border-[#ff914d] hover:bg-[#fff4e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff914d]" href={`/categories/${category.slug}`} key={category.slug}>
                  <Icon aria-hidden="true" className="text-[#bd5937]" size={20} strokeWidth={1.75} />
                  <h3 className="mt-10 text-sm font-semibold text-[#542d22] group-hover:text-[#9d4b30]">{category.name}</h3>
                  <p className="mt-2 text-sm leading-5 text-[#725d55]">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#e6cfaf] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#bd5937]">Foundation principles</p>
          <div className="mt-5 grid gap-8 border-t border-[#d8b590] pt-8 lg:grid-cols-3">
            {applicationSignals.map((signal) => {
              const Icon = signal.icon;

              return (
                <article key={signal.label}>
                  <Icon aria-hidden="true" className="text-[#bd5937]" size={21} strokeWidth={1.75} />
                  <h2 className="mt-5 font-serif text-lg font-semibold text-[#542d22]">{signal.label}</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#725d55]">{signal.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
