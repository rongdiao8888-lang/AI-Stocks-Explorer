import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-amber">Not found</p>
      <h1 className="mt-4 text-3xl font-semibold text-ink">That research destination is not available.</h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-ink-muted">Browse the AI value chain to continue exploring the supported research areas.</p>
      <Link className={`${buttonVariants({ variant: "default" })} mt-7`} href="/explore">Explore categories</Link>
    </section>
  );
}
