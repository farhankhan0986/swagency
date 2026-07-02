import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base: layout + a visible accent focus ring with offset for keyboard nav.
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-background))] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary CTA — one of the three sanctioned uses of the accent.
        primary:
          "bg-[rgb(var(--color-accent))] text-[rgb(var(--color-accent-foreground))] shadow-[0_0_30px_-12px_rgb(var(--color-accent)/0.6)] hover:bg-[rgb(var(--color-accent)/0.9)]",
        // Secondary CTA — quiet by default; accent only appears on hover/focus.
        secondary:
          "border border-[rgb(var(--color-border))] bg-transparent text-[rgb(var(--color-foreground))] hover:border-[rgb(var(--color-accent)/0.55)] hover:text-[rgb(var(--color-accent))]",
        tertiary: "bg-[rgb(var(--color-surface)/0.35)] text-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-accent)/0.9)] hover:text-[rgb(var(--color-accent-foreground))]",
      },
      size: {
        default: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = React.forwardRef(function Button(
  { className, variant, size, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});

export { Button, buttonVariants };
