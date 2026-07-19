import type { ReactNode } from "react";

import { SiteHeader } from "@/components/navigation/site-header";

type ApplicationShellProps = {
  children: ReactNode;
};

export function ApplicationShell({ children }: ApplicationShellProps) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-sm text-ink-muted sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>AI Stocks Explorer provides research information, not personalized investment advice.</p>
          <p className="font-mono text-xs uppercase tracking-[0.08em]">Foundation release</p>
        </div>
      </footer>
    </div>
  );
}
