"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  Smartphone,
  Boxes,
  BarChart3,
  CreditCard,
  Workflow,
  Sparkles,
  MessageSquare,
  Zap,
  Mail,
  Database,
  FileSpreadsheet,
  Bell,
  TrendingUp,
  Check,
} from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const ease = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Card mini-visuals — pure CSS/transform animation, no canvas.        */
/* ------------------------------------------------------------------ */

function Panel({ className = "", children }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-xl border border-[rgb(var(--color-border)/0.7)] bg-[rgb(var(--color-background)/0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

function Beam({ delay = 0, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`beam-line h-px flex-1 bg-[rgb(var(--color-border))] ${className}`}
      style={{ "--beam-delay": `${delay}s` }}
    />
  );
}

function PipeNode({ icon: Icon, label, accent }) {
  return (
    <span className="flex flex-col items-center gap-1.5">
      <span
        className={
          accent
            ? "inline-flex size-9 items-center justify-center rounded-full border border-[rgb(var(--color-accent)/0.45)] bg-[rgb(var(--color-accent)/0.12)] text-[rgb(var(--color-accent))] shadow-[0_0_18px_-2px_rgb(var(--color-accent)/0.5)]"
            : "inline-flex size-9 items-center justify-center rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-muted))]"
        }
      >
        <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="font-mono text-[10px] tracking-wide text-[rgb(var(--color-muted))]">
        {label}
      </span>
    </span>
  );
}

/* Agent pipeline: prompt → reason → act, with light beams traveling along */
function VisualAI() {
  return (
    <Panel className="flex items-center justify-center">
      <div className="flex w-full max-w-sm items-start px-6">
        <PipeNode icon={MessageSquare} label="prompt" />
        <Beam className="mt-[18px] mx-2" />
        <PipeNode icon={Sparkles} label="reason" accent />
        <Beam delay={1.4} className="mt-[18px] mx-2" />
        <PipeNode icon={Zap} label="act" />
      </div>
    </Panel>
  );
}

/* Browser window + phone, phone lifts on hover */
function VisualApps() {
  return (
    <Panel>
      <div className="absolute inset-x-4 bottom-5 top-4 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.85)]">
        <div className="flex items-center gap-1 border-b border-[rgb(var(--color-border)/0.7)] px-2.5 py-1.5">
          <span className="size-1.5 rounded-full bg-[rgb(var(--color-border))]" />
          <span className="size-1.5 rounded-full bg-[rgb(var(--color-border))]" />
          <span className="size-1.5 rounded-full bg-[rgb(var(--color-border))]" />
          <span className="ml-2 h-2 w-20 rounded bg-[rgb(var(--color-border)/0.5)]" />
        </div>
        <div className="space-y-1.5 p-3">
          <span className="block h-1.5 w-3/5 rounded bg-[rgb(var(--color-border))]" />
          <span className="block h-1.5 w-2/5 rounded bg-[rgb(var(--color-border)/0.7)]" />
          <span className="mt-2 block h-5 w-14 rounded-md border border-[rgb(var(--color-accent)/0.35)] bg-[rgb(var(--color-accent)/0.15)]" />
        </div>
      </div>
      <div className="absolute bottom-3 right-5 h-24 w-12 rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-[0_10px_24px_-10px_rgb(var(--color-background))] transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
        <span className="mx-auto mt-1.5 block h-1 w-5 rounded-full bg-[rgb(var(--color-border))]" />
        <div className="space-y-1 p-1.5 pt-2">
          <span className="block h-1 w-3/4 rounded bg-[rgb(var(--color-border))]" />
          <span className="block h-1 w-1/2 rounded bg-[rgb(var(--color-border)/0.7)]" />
          <span className="mt-1.5 block h-3.5 w-full rounded border border-[rgb(var(--color-accent)/0.35)] bg-[rgb(var(--color-accent)/0.15)]" />
        </div>
      </div>
    </Panel>
  );
}

/* Multi-tenant rows with plan pills, nudge sideways on hover */
const TENANTS = [
  { plan: "pro", accent: true, delay: "delay-0" },
  { plan: "team", accent: false, delay: "delay-75" },
  { plan: "free", accent: false, delay: "delay-150" },
];

function VisualSaaS() {
  return (
    <Panel className="flex flex-col justify-center gap-1.5 px-4">
      {TENANTS.map(({ plan, accent, delay }) => (
        <div
          key={plan}
          className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5 ${delay} ${
            accent
              ? "border-[rgb(var(--color-accent)/0.35)] bg-[rgb(var(--color-surface))]"
              : "border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.8)]"
          }`}
        >
          <span className="size-4 shrink-0 rounded-full bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] opacity-70" />
          <span className="h-1.5 flex-1 rounded bg-[rgb(var(--color-border))]" />
          <span
            className={`rounded-full border px-1.5 py-px font-mono text-[9px] ${
              accent
                ? "border-[rgb(var(--color-accent)/0.4)] text-[rgb(var(--color-accent))]"
                : "border-[rgb(var(--color-border))] text-[rgb(var(--color-muted))]"
            }`}
          >
            {plan}
          </span>
        </div>
      ))}
    </Panel>
  );
}

/* Bar chart that grows in on scroll */
const BARS = [42, 68, 34, 80, 58, 92, 70];

function VisualDashboard({ reduce }) {
  return (
    <Panel className="flex items-end gap-1.5 px-5 pt-6">
      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-[rgb(var(--color-accent)/0.3)] bg-[rgb(var(--color-accent)/0.1)] px-2 py-0.5 font-mono text-[10px] text-[rgb(var(--color-accent))]">
        <TrendingUp className="size-3" aria-hidden="true" />
        +32%
      </span>
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          initial={reduce ? { opacity: 0 } : { scaleY: 0 }}
          whileInView={reduce ? { opacity: 1 } : { scaleY: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: reduce ? 0.2 : 0.55,
            delay: reduce ? 0 : 0.15 + i * 0.06,
            ease,
          }}
          style={{ height: `${h}%` }}
          className={`flex-1 origin-bottom rounded-t ${
            i === 5
              ? "bg-[rgb(var(--color-accent)/0.8)] shadow-[0_0_16px_-2px_rgb(var(--color-accent)/0.6)]"
              : "bg-[rgb(var(--color-border))]"
          }`}
        />
      ))}
    </Panel>
  );
}

/* Payment card that straightens on hover + floating "Paid" pill */
function VisualCommerce() {
  return (
    <Panel className="flex items-center justify-center">
      <div className="relative">
        <div className="h-[4.6rem] w-32 -rotate-6 rounded-xl border border-[rgb(var(--color-accent)/0.3)] bg-gradient-to-br from-[rgb(var(--color-accent)/0.18)] via-[rgb(var(--color-surface))] to-[rgb(var(--color-surface))] p-2.5 shadow-[0_14px_30px_-14px_rgb(var(--color-background))] transition-transform duration-300 ease-out group-hover:rotate-0">
          <span className="block h-4 w-5 rounded border border-[rgb(var(--color-accent)/0.35)] bg-[rgb(var(--color-accent)/0.35)]" />
          <span className="mt-3 block font-mono text-[10px] tracking-[0.18em] text-[rgb(var(--color-muted))]">
            •••• 4242
          </span>
        </div>
        <span className="contact-float absolute -bottom-2 -right-9 inline-flex items-center gap-1 rounded-full bg-[rgb(var(--color-accent))] px-2 py-0.5 text-[10px] font-medium text-[rgb(var(--color-accent-foreground))] shadow-[0_6px_16px_-6px_rgb(var(--color-accent)/0.8)]">
          <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
          Paid
        </span>
      </div>
    </Panel>
  );
}

/* Integration nodes joined by hairlines with beams sweeping across */
const AUTOMATION_NODES = [Mail, Database, Workflow, FileSpreadsheet, Bell];

function VisualAutomations() {
  return (
    <Panel className="flex items-center justify-center px-6">
      <div className="flex w-full max-w-md items-center">
        {AUTOMATION_NODES.map((Icon, i) => {
          const center = i === 2;
          return (
            <span key={i} className="contents">
              {i > 0 && <Beam delay={i * 0.7} className="mx-2" />}
              <span
                className={
                  center
                    ? "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--color-accent)/0.45)] bg-[rgb(var(--color-accent)/0.12)] text-[rgb(var(--color-accent))] shadow-[0_0_20px_-2px_rgb(var(--color-accent)/0.5)]"
                    : "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-muted))] transition-colors duration-300 group-hover:border-[rgb(var(--color-accent)/0.3)]"
                }
              >
                <Icon
                  className={center ? "size-5" : "size-4"}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
            </span>
          );
        })}
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Card shell — same spotlight-border language as the why-us section.  */
/* ------------------------------------------------------------------ */

function ServiceCard({ span = "", variants, visual, icon: Icon, title, description, tags }) {
  return (
    <motion.article
      variants={variants}
      data-spot
      className={`group relative rounded-2xl bg-[rgb(var(--color-border))] p-px transition-transform duration-300 ease-out hover:-translate-y-1 ${span}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgb(var(--color-accent) / 0.55), transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-[rgb(var(--color-surface))]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), rgb(var(--color-accent) / 0.07), transparent 70%)",
          }}
        />

        <div className="relative h-32 px-5 pt-5 md:h-auto md:min-h-0 md:flex-1">
          {visual}
        </div>

        <div className="relative px-5 pb-5 pt-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-accent)/0.1)] text-[rgb(var(--color-accent))]">
              <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h3 className="font-display text-lg font-medium tracking-tight text-[rgb(var(--color-foreground))]">
              {title}
            </h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--color-muted))]">
            {description}
          </p>
          {tags && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background)/0.4)] px-2.5 py-0.5 font-mono text-[10px] text-[rgb(var(--color-muted))]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function WhatWeBuild() {
  const reduce = useReducedMotion();
  const gridRef = useRef(null);
  const frameRef = useRef(0);

  // One listener for the whole grid — writes cursor coords into each card's
  // CSS variables inside a single rAF. No React state, zero re-renders.
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

  const services = [
    {
      icon: Bot,
      title: "AI Features & Agents",
      description:
        "Chatbots, copilots, RAG over your own docs, and agents that take real actions — built into your product, not bolted on the side.",
      span: "md:col-span-2",
      tags: ["Chatbots", "RAG", "Copilots", "Agents"],
      visual: <VisualAI />,
    },
    {
      icon: Smartphone,
      title: "Web & Mobile Apps",
      description:
        "Fast, modern full-stack apps with Next.js and React — one codebase, every screen.",
      visual: <VisualApps />,
    },
    {
      icon: Boxes,
      title: "SaaS Platforms",
      description:
        "Multi-tenant products with auth, billing, and roles wired in from day one.",
      visual: <VisualSaaS />,
    },
    {
      icon: BarChart3,
      title: "Dashboards & Data",
      description:
        "Admin panels and analytics that surface the numbers your team actually checks.",
      visual: <VisualDashboard reduce={reduce} />,
    },
    {
      icon: CreditCard,
      title: "E-commerce & Payments",
      description:
        "Storefronts and Stripe billing built to convert and easy to run.",
      visual: <VisualCommerce />,
    },
    {
      icon: Workflow,
      title: "Automations & Integrations",
      description:
        "Connect the tools you already use and automate the busywork end to end.",
      span: "md:col-span-2",
      visual: <VisualAutomations />,
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32"
    >
      {/* Static ambient background — painted once, no animation loop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Blend from the hero */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[rgb(var(--color-surface)/0.4)] to-transparent" />
        {/* Faint blueprint grid, masked toward the edges */}
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgb(var(--color-border)/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--color-border)/0.6)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_42%,black_10%,transparent_78%)]" />
        {/* Teal aura behind the header */}
        <div className="absolute left-1/2 top-[-140px] h-[360px] w-[620px] -translate-x-1/2 rounded-full bg-[rgb(var(--color-accent)/0.06)] blur-3xl" />
      </div>

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
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          ref={gridRef}
          onMouseMove={handleMouseMove}
          className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 md:auto-rows-[19rem] md:grid-cols-3"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} variants={item} />
          ))}

          {/* Closing CTA card */}
          <motion.article
            variants={item}
            data-spot
            className="group relative rounded-2xl bg-[rgb(var(--color-accent)/0.35)] p-px transition-transform duration-300 ease-out hover:-translate-y-1"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgb(var(--color-accent) / 0.6), transparent 70%)",
              }}
            />
            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[15px] bg-[rgb(var(--color-surface))] p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgb(var(--color-accent)/0.12),transparent_55%)]"
              />
              <span className="relative inline-flex size-11 items-center justify-center rounded-xl border border-[rgb(var(--color-accent)/0.35)] bg-[rgb(var(--color-accent)/0.1)] text-[rgb(var(--color-accent))]">
                <Sparkles className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="relative mt-4 font-display text-lg font-medium tracking-tight text-[rgb(var(--color-foreground))]">
                Something else in mind?
              </h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-[rgb(var(--color-muted))]">
                Tell us the problem — we&apos;ll figure out the build.
              </p>
              <GlowButton
                icon="arrow"
                size="sm"
                className="relative mt-5 self-start"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start a Project
              </GlowButton>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
