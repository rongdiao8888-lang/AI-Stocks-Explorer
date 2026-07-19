import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { ApplicationShell } from "@/components/layout/application-shell";

export const metadata: Metadata = {
  title: {
    default: "AI Stocks Explorer",
    template: "%s | AI Stocks Explorer",
  },
  description: "Structured research for public companies powering the AI economy.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white" href="#main-content">
          Skip to content
        </a>
        <ApplicationShell>{children}</ApplicationShell>
      </body>
    </html>
  );
}
