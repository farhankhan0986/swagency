"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Code2, Search, Smartphone, Layers, LifeBuoy } from "lucide-react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

const ease = [0.22, 1, 0.36, 1];

const REASONS = [
  {
    icon: Zap,
    title: "Fast delivery",
    desc: "Weeks, not months. You see working progress early and often — never radio silence.",
    img: "/images/fast.png",
  },
  {
    icon: Code2,
    title: "Clean code",
    desc: "Readable, documented, and structured so anyone can pick it up and build on it later.",
    img: "/images/code.png",
  },
  {
    icon: Search,
    title: "SEO ready",
    desc: "Built to be found — semantic markup, fast load times, and metadata done properly.",
    img: "/images/seo.png",
  },
  {
    icon: Smartphone,
    title: "Fully responsive",
    desc: "Sharp on every screen, from small phones to ultra-wide displays. No exceptions.",
    img: "/images/scalable.png",
  },
  {
    icon: Layers,
    title: "Scalable architecture",
    desc: "Structured to grow with you — no painful rewrite when traffic or scope spikes.",
    img: "/images/responsive.png",
  },
  {
    icon: LifeBuoy,
    title: "Support after launch",
    desc: "We don't vanish at handoff. Ongoing help and iteration whenever you need it.",
    img: "/images/support.png",
  },
];

export default function WhyTrustUs() {
  const reduce = useReducedMotion();

  // Drive the dotted-glow colors from --color-accent so it stays token-driven.
  const [dotColor, setDotColor] = useState("rgba(45,212,167,0.5)");
  const [glowColor, setGlowColor] = useState("rgba(45,212,167,0.95)");

  useEffect(() => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim();
    if (v) {
      const c = v.replace(/\s+/g, ",");
      setDotColor(`rgba(${c},0.5)`);
      setGlowColor(`rgba(${c},0.95)`);
    }
  }, []);

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
      {/* Ambient dotted glow field, masked so it fades toward the edges */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_82%)]">
        <DottedGlowBackground
          color={dotColor}
          glowColor={glowColor}
          gap={18}
          radius={1.6}
          opacity={0.5}
          speedScale={reduce ? 0 : 0.8}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
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
            Why choose us
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-6 text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl lg:text-5xl"
          >
            Built to be{" "}
            <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
              trusted
            </span>
            .
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-5 text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
          >
            Six reasons clients pick us to build their product — and stick around
            long after launch.
          </motion.p>
        </motion.div>

        {/* Reasons grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={item}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -12,
                        scale: 1.06,
                        transition: { duration: 0.3, ease },
                      }
                }
                className="relative h-full hover:z-20"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] transition-[border-color,box-shadow] duration-300 hover:border-[rgb(var(--color-accent)/0.4)] hover:shadow-[0_24px_60px_-24px_rgb(var(--color-accent)/0.4)]">
                    {/* Image */}
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={reason.img}
                        alt=""
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full object-cover opacity-70"
                      />
                      {/* teal tint + fade into the card */}
                      <div className="absolute inset-0 bg-[rgb(var(--color-accent)/0.18)] mix-blend-overlay" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-surface))] via-[rgb(var(--color-surface)/0.35)] to-transparent" />
                      {/* icon badge */}
                      <span className="absolute bottom-3 left-4 inline-flex size-10 items-center justify-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-accent))] shadow-[0_8px_20px_-8px_rgb(var(--color-background)/0.9)]">
                        <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-medium tracking-tight text-[rgb(var(--color-foreground))]">
                        {reason.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[rgb(var(--color-muted))]">
                        {reason.desc}
                      </p>
                    </div>
                  </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
