"use client";

import { motion, useReducedMotion } from "framer-motion";
import KorvaneMark from "@/components/ui/KorvaneMark";
import GlowButton from "@/components/ui/GlowButton";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const reduce = useReducedMotion();

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      {/* Glass bar — translucent surface + backdrop blur, token-driven.
          At rest the border is a plain token edge; on hover the whole border
          lights up accent with a soft outer glow. No moving line. */}
      <nav
  className="
    relative
    mx-auto flex max-w-6xl items-center justify-between
    rounded-2xl border-2 border-transparent
    bg-[rgb(var(--color-surface)/0.55)]
    backdrop-blur-xl
    px-4 py-2.5 sm:px-5

    transition-colors duration-500

    before:absolute
    before:inset-0
    before:-z-10
    before:rounded-2xl
    before:bg-[rgb(var(--color-accent))]
    before:opacity-0
    before:blur-xl
    before:transition-opacity
    before:duration-500
    before:ease-out

    hover:before:opacity-0
    hover:border-[rgb(var(--color-accent)/0.7)]
  "
>
        {/* Brand — the shared KorvaneMark + wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-background))]"
        >
          <KorvaneMark width={26} />
          <span className="text-lg font-semibold tracking-tight text-[rgb(var(--color-foreground))]">
            Korvane
          </span>
        </a>

        {/* Links — hidden on mobile */}
       <ul className="hidden items-center gap-6 md:flex">
  {LINKS.map((link) => (
    <li key={link.label}>
      <a
        href={link.href}
        className="
          group relative py-2
          text-sm font-medium
          text-[rgb(var(--color-muted))]
          transition-colors duration-300
          hover:text-[rgb(var(--color-foreground))]
        "
      >
        {link.label}

        <span
          className="
            absolute bottom-0 left-1/2
            h-[2px] w-0
            -translate-x-1/2
            rounded-full
            bg-[rgb(var(--color-accent))]
            transition-all duration-300 ease-out
            group-hover:w-full
          "
        />
      </a>
    </li>
  ))}
</ul>

        {/* CTA */}
        <GlowButton icon="sparkle" size="sm" className="shrink-0">
          Start a Project
        </GlowButton>
      </nav>
    </motion.header>
  );
}
