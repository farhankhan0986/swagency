"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Zap,
  Code2,
  Search,
  Smartphone,
  Layers,
  LifeBuoy,
  ArrowRight,
  Plus,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const REASONS = [
  {
    icon: Zap,
    title: "Fast delivery",
    desc: "Weeks, not months. You see working progress early and often  never radio silence.",
  },
  {
    icon: Code2,
    title: "Clean code",
    desc: "Readable, documented, and structured so anyone can pick it up and build on it later.",
  },
  {
    icon: Search,
    title: "SEO ready",
    desc: "Built to be found  semantic markup, fast load times, and metadata done properly.",
  },
  {
    icon: Smartphone,
    title: "Fully responsive",
    desc: "Sharp on every screen, from small phones to ultra-wide displays. No exceptions.",
  },
  {
    icon: Layers,
    title: "Scalable architecture",
    desc: "Structured to grow with you  no painful rewrite when traffic or scope spikes.",
  },
  {
    icon: LifeBuoy,
    title: "Support after launch",
    desc: "We don't vanish at handoff. Ongoing help and iteration whenever you need it.",
  },
];

/**
 * One spotlight card. The border glow and inner spotlight follow the cursor
 * via the --x/--y custom properties set by the grid's single mousemove
 * handler  pure CSS gradients on small layers, no canvas, no re-renders.
 */
function SpotlightCard({ icon: Icon, title, desc, index, variants }) {
  return (
    <motion.article
      variants={variants}
      data-spot
      className="group relative h-full rounded-2xl bg-[rgb(var(--color-border))] p-px transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      {/* Border glow  shows through the 1px padding ring on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgb(var(--color-accent) / 0.55), transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-[rgb(var(--color-surface))] p-6 sm:p-7">
        {/* Inner spotlight wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), rgb(var(--color-accent) / 0.08), transparent 70%)",
          }}
        />

        {/* Ghost index number */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-3 select-none font-display text-6xl font-medium leading-none tracking-tight text-[rgb(var(--color-foreground)/0.05)] transition-colors duration-500 group-hover:text-[rgb(var(--color-accent)/0.14)]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="relative inline-flex size-11 items-center justify-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-accent)/0.1)] text-[rgb(var(--color-accent))] transition-colors duration-300 group-hover:border-[rgb(var(--color-accent)/0.35)]">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>

        <h3 className="relative mt-5 font-display text-lg font-medium tracking-tight text-[rgb(var(--color-foreground))]">
          {title}
        </h3>
        <p className="relative mt-2 text-sm leading-relaxed text-[rgb(var(--color-muted))]">
          {desc}
        </p>

        {/* Accent hairline that draws in on hover */}
        <span
          aria-hidden="true"
          className="relative mt-auto block pt-6"
        >
          <span className="block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[rgb(var(--color-accent)/0.6)] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </span>
      </div>
    </motion.article>
  );
}

export default function WhyTrustUs() {
  const reduce = useReducedMotion();
  const gridRef = useRef(null);
  const frameRef = useRef(0);

  // Single listener for the whole grid: writes cursor coords into each card's
  // CSS variables inside one rAF. No React state, so zero re-renders.
  const handleMouseMove = useCallback((e) => {
    const grid = gridRef.current;
    if (!grid) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      for (const card of grid.querySelectorAll("[data-spot]")) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${clientX - rect.left}px`);
        card.style.setProperty("--y", `${clientY - rect.top}px`);
      }
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.5, ease },
    },
  };

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32"
    >
      {/* Static ambient background  painted once, no animation loop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Faint dot field, masked toward the edges */}
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgb(var(--color-accent)/0.22)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_35%,black_20%,transparent_75%)]" />
        {/* Teal aura behind the header */}
        <div className="absolute left-1/2 top-[-160px] h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-[rgb(var(--color-accent)/0.07)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Editorial split header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16"
        >
          <div>
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[rgb(var(--color-muted))] backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-accent))]" />
              Why choose us
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-balance font-display text-3xl font-medium leading-[1.08] tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl lg:text-5xl"
            >
              Built to be{" "}
              <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
                trusted
              </span>
              , not just shipped.
            </motion.h2>
          </div>

          <motion.p
            variants={item}
            className="max-w-md text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg lg:justify-self-end lg:pb-1"
          >
            Six reasons clients pick us to build their product  and stick
            around long after launch.
          </motion.p>
        </motion.div>

        {/* Spotlight grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="relative mt-14"
        >
          {/* Corner ticks */}
          <Plus aria-hidden="true" className="absolute -left-3 -top-3 size-5 text-[rgb(var(--color-border))]" strokeWidth={1.5} />
          <Plus aria-hidden="true" className="absolute -right-3 -top-3 size-5 text-[rgb(var(--color-border))]" strokeWidth={1.5} />
          <Plus aria-hidden="true" className="absolute -bottom-3 -left-3 size-5 text-[rgb(var(--color-border))]" strokeWidth={1.5} />
          <Plus aria-hidden="true" className="absolute -bottom-3 -right-3 size-5 text-[rgb(var(--color-border))]" strokeWidth={1.5} />

          <div
            ref={gridRef}
            onMouseMove={handleMouseMove}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {REASONS.map((reason, index) => (
              <SpotlightCard
                key={reason.title}
                {...reason}
                index={index}
                variants={item}
              />
            ))}
          </div>
        </motion.div>

        {/* Closing hairline + CTA */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0.2 : 0.5, ease }}
          className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[rgb(var(--color-border))] pt-6 sm:flex-row sm:items-center"
        >
          <p className="text-sm text-[rgb(var(--color-muted))]">
            Still comparing options? Talk to us  no pitch, just answers.
          </p>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-2 text-sm font-medium text-[rgb(var(--color-accent))] transition-colors hover:text-[rgb(var(--color-foreground))]"
          >
            Start a project
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
