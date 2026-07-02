"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-1 gap-4 md:auto-rows-[15rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Aceternity's BentoGridItem, adapted to Korvane's token system + a teal
 * pointer spotlight (Card Spotlight pattern). A radial glow tracks the cursor
 * and fades in on hover; the card lifts and its border warms to accent.
 */
export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgb(var(--color-accent) / 0.14), transparent 80%)`;

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.5)] p-6 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgb(var(--color-accent)/0.4)] hover:shadow-[0_18px_50px_-24px_rgb(var(--color-accent)/0.4)]",
        className
      )}
    >
      {/* Pointer spotlight — fades in on hover, follows the cursor. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/bento:opacity-100"
        style={{ background: spotlight }}
      />

      {header}

      <div className="relative z-10">
        {icon}
        {title && (
          <div className="mb-1.5 mt-4 font-display text-lg font-medium tracking-tight text-[rgb(var(--color-foreground))]">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm leading-relaxed text-[rgb(var(--color-muted))]">
            {description}
          </div>
        )}
      </div>

      {children}
    </div>
  );
};
