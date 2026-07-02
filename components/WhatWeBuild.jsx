"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  Smartphone,
  Boxes,
  BarChart3,
  CreditCard,
  Workflow,
  Sparkles,
} from "lucide-react";
import { BentoGridItem } from "@/components/ui/bento-grid";
import GlowButton from "@/components/ui/GlowButton";

const ease = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    icon: Bot,
    title: "AI Features & Agents",
    description:
      "Chatbots, copilots, RAG over your own docs, and agents that take real actions — built into your product, not bolted on the side.",
    span: "md:col-span-2",
    tags: ["Chatbots", "RAG", "Copilots", "Agents"],
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Apps",
    description:
      "Fast, modern full-stack apps with Next.js and React — one codebase, every screen.",
  },
  {
    icon: Boxes,
    title: "SaaS Platforms",
    description:
      "Multi-tenant products with auth, billing, and roles wired in from day one.",
  },
  {
    icon: BarChart3,
    title: "Dashboards & Data",
    description:
      "Admin panels and analytics that surface the numbers your team actually checks.",
  },
  {
    icon: CreditCard,
    title: "E-commerce & Payments",
    description:
      "Storefronts and Stripe billing built to convert and easy to run.",
  },
  {
    icon: Workflow,
    title: "Automations & Integrations",
    description:
      "Connect the tools you already use and automate the busywork end to end.",
    span: "md:col-span-2",
  },
];

function ServiceIcon({ icon: Icon }) {
  return (
    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-accent)/0.1)] text-[rgb(var(--color-accent))]">
      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

export default function WhatWeBuild() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08 },
    },
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
      id="services"
      className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32"
    >
      {/* Soft copper-free wash at the top edge to blend from the hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[rgb(var(--color-surface)/0.4)] to-transparent"
      />

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
            What we build
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-6 text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl lg:text-5xl"
          >
            From first idea to{" "}
            <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
              shipped software
            </span>
            .
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-5 text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
          >
            Whatever you&apos;re building, the same hands take it from concept to
            launch — including the AI parts.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 md:auto-rows-[15rem] md:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className={service.span ?? "md:col-span-1"}
            >
              <BentoGridItem
                className="h-full"
                icon={<ServiceIcon icon={service.icon} />}
                title={service.title}
                description={service.description}
              >
                {service.tags && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background)/0.4)] px-3 py-1 font-mono text-[11px] text-[rgb(var(--color-muted))]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </BentoGridItem>
            </motion.div>
          ))}

          {/* Closing CTA card */}
          <motion.div variants={item} className="md:col-span-1">
            <BentoGridItem
              className="h-full justify-between border-[rgb(var(--color-accent)/0.35)] bg-[rgb(var(--color-accent)/0.06)]"
              icon={<ServiceIcon icon={Sparkles} />}
              title="Something else in mind?"
              description="Tell us the problem — we'll figure out the build."
            >
              <GlowButton
                icon="arrow"
                size="sm"
                className="mt-5 self-start"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start a Project
              </GlowButton>
            </BentoGridItem>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
