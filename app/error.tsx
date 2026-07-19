"use client";

import { useEffect } from "react";

export default function RootError({ error, reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => {
    console.error("Application route error", error);
  }, [error]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-amber">Unavailable</p>
      <h1 className="mt-4 text-3xl font-semibold text-ink">This research view could not be loaded.</h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-ink-muted">The rest of the application remains available. Please try this view again.</p>
      <button className="mt-7 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" onClick={reset} type="button">
        Try again
      </button>
    </section>
  );
}
