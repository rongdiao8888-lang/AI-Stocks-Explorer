"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
        className="grid size-10 place-items-center rounded-md border border-line bg-surface text-ink transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        title={isOpen ? "Close navigation" : "Open navigation"}
        type="button"
      >
        {isOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
      </button>
      {isOpen ? (
        <nav
          aria-label="Mobile primary navigation"
          className="absolute inset-x-4 top-[4.75rem] z-50 border border-line bg-surface p-2 shadow-[0_18px_45px_rgba(29,36,46,0.13)]"
          id="mobile-primary-navigation"
        >
          {siteNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                className={cn(
                  "block rounded-sm px-3 py-3 text-sm font-medium",
                  isActive ? "bg-surface-muted text-ink" : "text-ink-muted hover:bg-surface-muted hover:text-ink",
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
