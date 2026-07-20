"use client";

import Link from "next/link";
import { ListTree, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { companySeedUniverse } from "@/lib/config/company-universe";
import { valueChainCategories } from "@/lib/config/site";

type AIStocksListDialogProps = {
  onOpen?: () => void;
  showIcon?: boolean;
  triggerClassName: string;
};

const quickBrowseCategories = valueChainCategories.map((category) => ({
  ...category,
  companies: companySeedUniverse
    .filter((company) => company.primaryCategorySlug === category.slug)
    .slice()
    .sort((left, right) => left.companyName.localeCompare(right.companyName)),
}));

export function AIStocksListDialog({ onOpen, showIcon = true, triggerClassName }: AIStocksListDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPortalReady, setIsPortalReady] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function closeDialog() {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function openDialog() {
    onOpen?.();
    setIsOpen(true);
  }

  useEffect(() => {
    setIsPortalReady(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    listRef.current?.scrollTo({ top: 0 });
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-controls="ai-stocks-quick-browse"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={triggerClassName}
        onClick={openDialog}
        ref={triggerRef}
        type="button"
      >
        {showIcon ? <ListTree aria-hidden="true" size={16} /> : null}
        AI Stocks List
      </button>

      {isOpen && isPortalReady ? createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
          <button aria-label="Close AI Stocks List" className="absolute inset-0 bg-ink/35" onClick={closeDialog} type="button" />
          <section aria-labelledby="ai-stocks-quick-browse-title" aria-modal="true" className="relative flex h-[calc(100dvh-1.5rem)] max-h-[52rem] w-full max-w-3xl flex-col overflow-hidden border border-line bg-surface shadow-[0_24px_64px_rgba(91,56,39,0.2)] sm:h-[calc(100dvh-3rem)]" id="ai-stocks-quick-browse" role="dialog">
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line bg-surface-tint px-5 py-5 sm:px-6">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent">Quick browse</p>
                <h2 className="mt-2 text-xl font-semibold text-ink" id="ai-stocks-quick-browse-title">AI Stocks List</h2>
              </div>
              <button
                aria-label="Close AI Stocks List"
                className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface text-ink transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={closeDialog}
                ref={closeButtonRef}
                title="Close AI Stocks List"
                type="button"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-2 sm:px-6" ref={listRef}>
              {quickBrowseCategories.map((category, index) => (
                <section className="border-b border-line py-5" key={category.slug}>
                  <h3 className="text-sm font-semibold text-ink">
                    <span className="mr-3 font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                    {category.name}
                  </h3>
                  <ul className="mt-3 space-y-1 pl-7">
                    {category.companies.map((company) => (
                      <li key={company.ticker}>
                        <Link className="inline text-sm leading-6 text-ink-muted hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" href={`/companies/${company.ticker}`} onClick={closeDialog}>
                          {company.companyName} <span className="font-mono text-xs text-accent">({company.ticker})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>
        </div>
      , document.body) : null}
    </>
  );
}
