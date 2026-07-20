"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { AIStocksListDialog } from "@/components/companies/ai-stocks-list-dialog";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { buttonVariants } from "@/components/ui/button";
import { siteNavigation } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[#b9b9bd] bg-[#d8d9dd]">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <Link className="group flex min-w-0 items-center gap-3" href="/">
          <Image
            alt=""
            className="size-11 shrink-0 rounded-full border border-[#b9b9bd] bg-[#f1f1f3] object-contain p-0.5 shadow-sm transition-transform group-hover:scale-[1.03]"
            height={44}
            priority
            src="/ai-stocks-explorer-logo.png"
            width={44}
          />
          <span className="truncate text-xl font-semibold tracking-[0.01em] text-ink" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>AI Stocks Explorer</span>
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
                    isActive ? "bg-[#ebebed] text-[#542d22]" : "text-ink-muted hover:bg-[#ececef] hover:text-ink",
                  )}
                />
              );
            }

            return (
              <Link
                className={cn(
                  "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-[#ebebed] text-[#542d22]" : "text-ink-muted hover:bg-[#ececef] hover:text-ink",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            aria-label="Home"
            className="grid size-9 place-items-center rounded-sm text-ink-muted transition-colors hover:bg-[#ececef] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8d8d93]"
            href="/"
            title="Home"
          >
            <Home aria-hidden="true" size={18} />
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link className={buttonVariants({ variant: "outline", className: "border-[#b9b9bd] bg-[#f5f5f6] text-[#542d22] hover:border-[#a5a5aa] hover:bg-[#ebebed] focus-visible:ring-[#8d8d93]" })} href="/search">
            <Search aria-hidden="true" size={16} />
            Search
          </Link>
        </div>
        <MobileNavigation pathname={pathname} />
      </div>
    </header>
  );
}
