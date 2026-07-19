import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-accent-strong",
        outline: "border border-line bg-surface text-ink hover:border-accent hover:bg-surface-muted",
        quiet: "text-ink-muted hover:bg-surface-muted hover:text-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
