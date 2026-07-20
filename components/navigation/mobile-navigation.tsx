"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { AIStocksListDialog } from "@/components/companies/ai-stocks-list-dialog";
import { siteNavigation } from "@/lib/config/site";
import { cn } from "@/lib/utils";

type MobileNavigationProps = {
  pathname: string;
};

export function MobileNavigation({ pathname }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-controls="mobile-primary-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className="grid size-10 place-items-center rounded-md border border-[#b9b9bd] bg-[#f5f5f6] text-ink transition-colors hover:bg-[#ebebed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8d8d93]"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        title={isOpen ? "Close navigation" : "Open navigation"}
        type="button"
      >
        {isOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
      </button>
      {isOpen ? (
        <nav
          aria-label="Mobile primary navigation"
          className="absolute inset-x-4 top-[4.75rem] z-50 border border-[#b9b9bd] bg-[#f5f5f6] p-2 shadow-[0_18px_45px_rgba(71,71,76,0.16)]"
          id="mobile-primary-navigation"
        >
          {siteNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            if (item.href === "/companies") {
              return (
                <AIStocksListDialog
                  key={item.href}
                  onOpen={() => setIsOpen(false)}
                  showIcon={false}
                  triggerClassName={cn(
                    "block w-full rounded-sm px-3 py-3 text-left text-sm font-medium",
                    isActive ? "bg-[#ebebed] text-[#542d22]" : "text-ink-muted hover:bg-[#e4e4e7] hover:text-ink",
                  )}
                />
              );
            }

            return (
              <Link
                className={cn(
                  "block rounded-sm px-3 py-3 text-sm font-medium",
                  isActive ? "bg-[#ebebed] text-[#542d22]" : "text-ink-muted hover:bg-[#e4e4e7] hover:text-ink",
                )}
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            className="mt-1 block rounded-sm bg-accent px-3 py-3 text-sm font-medium text-white hover:bg-accent-strong"
            href="/search"
            onClick={() => setIsOpen(false)}
          >
            Search companies
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
