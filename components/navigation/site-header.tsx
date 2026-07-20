"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { AIStocksListDialog } from "@/components/companies/ai-stocks-list-dialog";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { buttonVariants } from "@/components/ui/button";
import { siteNavigation } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <Link className="group flex min-w-0 items-center gap-3" href="/">
          <Image
            alt=""
            className="size-10 shrink-0 rounded-full border border-line bg-surface object-contain p-0.5 shadow-sm transition-transform group-hover:scale-[1.03]"
            height={40}
            priority
            src="/ai-stocks-explorer-logo.png"
            width={40}
          />
          <span className="truncate text-sm font-semibold tracking-[0.01em] text-ink">AI Stocks Explorer</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {siteNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            if (item.href === "/companies") {
              return (
                <AIStocksListDialog
                  key={item.href}
                  showIcon={false}
                  triggerClassName={cn(
                    "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-surface-tint text-accent-strong" : "text-ink-muted hover:bg-surface-muted hover:text-ink",
                  )}
                />
              );
            }

            return (
              <Link
                className={cn(
                  "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-surface-tint text-accent-strong" : "text-ink-muted hover:bg-surface-muted hover:text-ink",
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
