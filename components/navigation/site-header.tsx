"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { buttonVariants } from "@/components/ui/button";
import { siteNavigation } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <Link className="group flex min-w-0 items-center gap-3" href="/">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-ink text-sm font-semibold text-white">A</span>
          <span className="truncate text-sm font-semibold tracking-[0.01em] text-ink">AI Stocks Explorer</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {siteNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                className={cn(
                  "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-surface-muted text-ink" : "text-ink-muted hover:bg-surface-muted hover:text-ink",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link className={buttonVariants({ variant: "outline" })} href="/search">
            <Search aria-hidden="true" size={16} />
            Search
          </Link>
        </div>
        <MobileNavigation pathname={pathname} />
      </div>
    </header>
  );
}
