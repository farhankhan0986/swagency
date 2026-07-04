"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const ease = [0.22, 1, 0.36, 1];

const TESTIMONIALS = [
  {
    quote:
      "Korvane shipped our MVP in six weeks, and the AI assistant they built into it now handles most of our support tickets on its own. It paid for itself almost immediately.",
    name: "Sarah Chen",
    designation: "Founder, Lumen Health",
    src: "https://i.pravatar.cc/500?img=5",
  },
  {
    quote:
      "They didn't just build the app  they understood the business. The dashboard is the first tool my team actually opens every morning.",
    name: "Marcus Reyes",
    designation: "COO, Freightline",
    src: "https://i.pravatar.cc/500?img=12",
  },
  {
    quote:
      "We came with a rough idea and left with a polished product. The chatbot answers customer questions better than our old docs ever did.",
    name: "Priya Nair",
    designation: "Product Lead, Cavara",
    src: "https://i.pravatar.cc/500?img=32",
  },
  {
    quote:
      "Fast, communicative, and genuinely good at the AI parts  not just buzzwords. Our billing automation saved us hours every single week.",
    name: "Tom Becker",
    designation: "CEO, Nodeworks",
    src: "https://i.pravatar.cc/500?img=15",
  },
];

/* Small decorative quote card for the side columns on wide screens. */
function MiniQuote({ t, className = "" }) {
  return (
    <figure
      className={`rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.7)] p-4 shadow-[0_18px_40px_-24px_rgb(var(--color-background))] backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <img
          src={t.src}
          alt=""
          loading="lazy"
          draggable={false}
          className="size-8 rounded-full border border-[rgb(var(--color-border))] object-cover"
        />
        <figcaption className="min-w-0">
          <div className="truncate text-xs font-medium text-[rgb(var(--color-foreground))]">
            {t.name}
          </div>
          <div className="truncate text-[10px] text-[rgb(var(--color-muted))]">
            {t.designation}
          </div>
        </figcaption>
      </div>
      <div className="mt-2.5 flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="size-3 fill-[rgb(var(--color-accent))] text-[rgb(var(--color-accent))]"
          />
        ))}
      </div>
      <blockquote className="mt-2 line-clamp-3 text-xs leading-relaxed text-[rgb(var(--color-muted))]">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
    </figure>
  );
}

export default function Testimonials() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
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
      id="testimonials"
      className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32"
    >
      {/* Ambient dressing  ghost quote marks + a soft aura behind the deck */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-4 top-14 hidden select-none font-display text-[11rem] leading-none text-[rgb(var(--color-accent)/0.06)] sm:block lg:left-10">
          &ldquo;
        </span>
        <span className="absolute bottom-4 right-4 hidden select-none font-display text-[11rem] leading-none text-[rgb(var(--color-accent)/0.06)] sm:block lg:right-10">
          &rdquo;
        </span>
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--color-accent)/0.05)] blur-3xl" />
      </div>

      {/* Side quote walls  decorative, wide screens only */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduce ? 0.2 : 0.8, ease, delay: 0.2 }}
        className="pointer-events-none absolute inset-y-0 left-4 hidden w-52 select-none flex-col justify-center gap-7 opacity-70 xl:flex 2xl:left-10 2xl:w-60"
      >
        <MiniQuote t={TESTIMONIALS[1]} className="-rotate-3" />
        <MiniQuote t={TESTIMONIALS[3]} className="translate-x-5 rotate-2" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduce ? 0.2 : 0.8, ease, delay: 0.35 }}
        className="pointer-events-none absolute inset-y-0 right-4 hidden w-52 select-none flex-col justify-center gap-7 opacity-70 xl:flex 2xl:right-10 2xl:w-60"
      >
        <MiniQuote t={TESTIMONIALS[0]} className="rotate-3" />
        <MiniQuote t={TESTIMONIALS[2]} className="-translate-x-5 -rotate-2" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={container}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[rgb(var(--color-muted))] backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-accent))]" />
            What clients say
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-6 text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl lg:text-5xl"
          >
            Trusted by teams who{" "}
            <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
              ship
            </span>
            .
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-5 text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
          >
            Founders and product teams who needed a partner to take an idea all
            the way to a working product.
          </motion.p>
        </motion.div>

        {/* The animated deck */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduce ? 0.2 : 0.6, ease }}
          className="mt-12"
        >
          <AnimatedTestimonials testimonials={TESTIMONIALS} autoplay />
        </motion.div>
      </div>
    </section>
  );
}
