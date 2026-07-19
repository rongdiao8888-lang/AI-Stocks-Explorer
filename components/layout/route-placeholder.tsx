import type { ReactNode } from "react";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

type RoutePlaceholderProps = {
  action?: { href: string; label: string };
  children?: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

export function RoutePlaceholder({ action, children, description, eyebrow, title }: RoutePlaceholderProps) {
  return (
    <section className="border-b border-line bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent">{eyebrow}</p>
        <div className="mt-5 grid gap-9 lg:grid-cols-[minmax(0,0.7fr)_minmax(18rem,0.3fr)] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">{description}</p>
            {action ? (
              <Link className={`${buttonVariants({ variant: "default" })} mt-7`} href={action.href}>
                {action.label}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            ) : null}
          </div>
          <aside className="border-l-2 border-teal bg-surface-muted px-5 py-4 text-sm leading-6 text-ink-muted">
            Verified company coverage, research evidence, and ecosystem relationships will appear here as each data layer is connected.
          </aside>
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
