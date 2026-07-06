"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Layout,
  ShoppingCart,
  LayoutDashboard,
  Globe,
  Users,
  Boxes,
  Smartphone,
  Gauge,
  Search,
  ShieldCheck,
  Accessibility,
  Sparkles,
  Database,
  Compass,
  PenTool,
  Wrench,
  Rocket,
  Check,
  Plus,
} from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import GlowButton from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

/* ----------------------------- Data ----------------------------- */

const TECH_GROUPS = [
  {
    label: "Frontend",
    icon: Layout,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    icon: Code2,
    items: ["Node.js", "Express", "REST & GraphQL", "Python", "Edge Functions"],
  },
  {
    label: "Data",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  },
  {
    label: "Infra & Tools",
    icon: Boxes,
    items: ["Vercel", "AWS", "Docker", "Cloudflare", "Stripe"],
  },
];

const BUILDS = [
  {
    icon: Layout,
    title: "Landing Pages",
    desc: "High-converting single pages for launches, campaigns, and products.",
  },
  {
    icon: Globe,
    title: "Marketing Websites",
    desc: "Multi-page, CMS-driven sites that tell your story and rank on Google.",
  },
  {
    icon: Boxes,
    title: "SaaS Platforms",
    desc: "Full products with auth, billing, dashboards, and multi-tenant roles.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Stores",
    desc: "Storefronts with Stripe checkout, inventory, and orders that convert.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    desc: "Data-rich internal tools and analytics your team opens every day.",
  },
  {
    icon: Users,
    title: "Customer Portals",
    desc: "Secure logins, accounts, and self-serve areas for your users.",
  },
];

const FEATURES = [
  {
    icon: Smartphone,
    title: "Responsive by default",
    desc: "Pixel-perfect from small phones to ultrawide — no separate mobile site.",
  },
  {
    icon: Search,
    title: "SEO ready",
    desc: "Semantic markup, metadata, sitemaps, and structured data done right.",
  },
  {
    icon: Gauge,
    title: "Fast (Core Web Vitals)",
    desc: "Optimized for green Lighthouse scores and instant page loads.",
  },
  {
    icon: Accessibility,
    title: "Accessible (WCAG)",
    desc: "Keyboard navigation, contrast, and screen-reader support built in.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    desc: "Sane defaults, input validation, and best-practice auth from day one.",
  },
  {
    icon: Sparkles,
    title: "AI-assisted delivery",
    desc: "Modern AI-assisted workflows help us ship faster — every line human-reviewed.",
  },
];

const STEPS = [
  {
    icon: Compass,
    title: "Discover",
    desc: "We map goals, users, and scope, then agree on a clear plan and timeline.",
  },
  {
    icon: PenTool,
    title: "Design",
    desc: "Wireframes to polished UI you can click through before a line of code.",
  },
  {
    icon: Code2,
    title: "Build",
    desc: "Fast, clean, well-tested code with progress you can watch each week.",
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "We deploy, wire up analytics, and hand over a fast, live product.",
  },
  {
    icon: Wrench,
    title: "Support",
    desc: "Ongoing fixes, iteration, and improvements for as long as it helps.",
  },
];

const PLANS = [
  {
    name: "Landing Page",
    tagline: "One page, built to convert.",
    startingFrom: true,
    price: { USD: "$500", INR: "₹40,000" },
    features: [
      "Single high-converting page",
      "Custom design — no templates",
      "Responsive + SEO basics",
      "Contact form wired up",
      "Deployed and live",
    ],
    cta: "Start a Project",
    icon: "arrow",
  },
  {
    name: "Business Website",
    tagline: "A full site to grow on.",
    startingFrom: true,
    price: { USD: "$1,500", INR: "₹1,25,000" },
    featured: true,
    features: [
      "Multi-page site with a CMS",
      "Edit your own content",
      "SEO + analytics set up",
      "Blog / resources ready",
      "Integrations (email, forms)",
    ],
    cta: "Start a Project",
    icon: "sparkle",
  },
  {
    name: "Web App / SaaS",
    tagline: "A full product, built to spec.",
    custom: true,
    price: "Custom Quote",
    features: [
      "Full-stack web application",
      "Auth, billing & dashboards",
      "Third-party & AI integrations",
      "Scalable architecture",
      "Ongoing support",
    ],
    cta: "Get a Quote",
    icon: "arrow",
  },
];

const FAQS = [
  {
    q: "What tech stack do you build with?",
    a: "Mostly Next.js, React, and TypeScript on the frontend, Node.js and Postgres/MongoDB on the backend, deployed on Vercel or AWS. We pick the right tools per project rather than forcing one stack on everything.",
  },
  {
    q: "How long does a website take?",
    a: "A landing page is usually 1–2 weeks, a business website 2–4 weeks, and web apps are scoped case by case. You get a clear timeline before we start and weekly progress after that.",
  },
  {
    q: "Will my site be fast and SEO-friendly?",
    a: "Yes — performance and SEO aren't add-ons, they're baked in. We target green Core Web Vitals, semantic markup, metadata, and structured data so you load instantly and rank well.",
  },
  {
    q: "Can I edit the content myself?",
    a: "For business sites we set up a CMS so you can update text, images, and pages yourself — no code, no waiting on us for small changes.",
  },
  {
    q: "Do you use AI to build?",
    a: "We do — AI-assisted workflows help us move faster on boilerplate, testing, and iteration. But every line is reviewed by a human, and the architecture and decisions are ours, not a black box.",
  },
  {
    q: "Do you handle hosting and maintenance?",
    a: "Yes. We can deploy and manage hosting, and offer ongoing maintenance plans — or hand everything over so your own team runs it. You always own the code.",
  },
];

/* --------------------------- Hero data --------------------------- */

// Floating chips resting on the concentric rings (desktop only).
const HERO_CHIPS = [
  { label: "Next.js", pos: "left-[7%] top-[26%]", delay: "0s" },
  { label: "React", pos: "right-[9%] top-[22%]", delay: "0.8s" },
  { label: "TypeScript", pos: "left-[13%] bottom-[30%]", delay: "1.4s" },
  { label: "Node.js", pos: "right-[11%] bottom-[34%]", delay: "0.4s" },
];

const HERO_STATS = [
  { k: "1–4 wks", v: "idea to launch" },
  { k: "100/100", v: "Lighthouse targets" },
  { k: "0", v: "templates used" },
];

/* --------------------------- Component --------------------------- */

export default function WebDevelopment() {
  const reduce = useReducedMotion();
  const [currency, setCurrency] = useState("USD");
  const [openFaq, setOpenFaq] = useState(0);

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

  const SectionHeading = ({ eyebrow, title, sub }) => (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="mx-auto max-w-2xl text-center"
    >
      <motion.span
        variants={item}
        className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[rgb(var(--color-muted))] backdrop-blur"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-accent))]" />
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={item}
        className="mt-6 text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          variants={item}
          className="mt-5 text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );

  return (
    <>
      {/* ============================ HERO ============================ */}
      <AuroraBackground>
        {/* Concentric rings radiating from the content — pure structure, no noise */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_65%_60%_at_50%_50%,black_30%,transparent_78%)]"
        >
          {[420, 640, 880, 1140].map((size, i) => (
            <span
              key={size}
              className="absolute rounded-full border border-[rgb(var(--color-foreground)/0.07)]"
              style={{ width: size, height: size, opacity: 1 - i * 0.18 }}
            />
          ))}
          {/* single accent dot riding the second ring */}
          <span className="absolute size-1.5 -translate-y-[320px] rounded-full bg-[rgb(var(--color-accent))] shadow-[0_0_12px_rgb(var(--color-accent))]" />
        </div>

        {/* Floating tech chips resting on the rings (desktop only) */}
        {HERO_CHIPS.map((chip) => (
          <span
            key={chip.label}
            aria-hidden="true"
            style={{ animationDelay: chip.delay }}
            className={`contact-float pointer-events-none absolute z-10 hidden rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.7)] px-3.5 py-1.5 font-mono text-xs text-[rgb(var(--color-muted))] backdrop-blur lg:block ${chip.pos}`}
          >
            {chip.label}
          </span>
        ))}

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto flex max-w-[760px] flex-col items-center text-center"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[rgb(var(--color-muted))] backdrop-blur"
            >
              <Code2 className="size-3.5 text-[rgb(var(--color-accent))]" />
              Web Development
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-8 text-balance font-display text-4xl font-medium leading-[1.04] tracking-tight text-[rgb(var(--color-foreground))] sm:text-6xl lg:text-7xl"
            >
              Websites that work as hard as{" "}
              <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
                you do
              </span>
              .
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-[560px] text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
            >
              From a single landing page to a full SaaS platform — designed,
              built, and shipped. Fast, responsive, SEO-ready.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
            >
              <GlowButton
                icon="sparkle"
                className="w-full sm:w-auto"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Start a Project
              </GlowButton>
              <GlowButton
                icon="arrow"
                className="w-full sm:w-auto"
                onClick={() =>
                  document
                    .getElementById("web-pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See Pricing
              </GlowButton>
            </motion.div>

            {/* Terminal signature — the one machine-made touch */}
            <motion.div
              variants={item}
              className="mt-12 inline-flex items-center gap-2.5 rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] px-4 py-2.5 font-mono text-xs text-[rgb(var(--color-muted))] backdrop-blur sm:text-[13px]"
            >
              <span className="text-[rgb(var(--color-accent))]">$</span>
              <span>
                korvane build{" "}
                <span className="text-[rgb(var(--color-foreground)/0.85)]">
                  --fast --seo --scale
                </span>
              </span>
              <span className="ai-cursor" />
            </motion.div>

            {/* Mobile tech row (chips float on rings at lg+) */}
            <motion.ul
              variants={item}
              className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:hidden"
            >
              {HERO_CHIPS.map((chip) => (
                <li
                  key={chip.label}
                  className="rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.45)] px-3.5 py-1.5 font-mono text-xs text-[rgb(var(--color-muted))] backdrop-blur"
                >
                  {chip.label}
                </li>
              ))}
            </motion.ul>

            {/* Quiet stats strip */}
            <motion.dl
              variants={item}
              className="mt-14 flex items-center justify-center divide-x divide-[rgb(var(--color-border))]"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.v} className="px-6 sm:px-9">
                  <dt className="sr-only">{stat.v}</dt>
                  <dd className="font-display text-xl font-medium tracking-tight text-[rgb(var(--color-foreground))] sm:text-2xl">
                    {stat.k}
                  </dd>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[rgb(var(--color-muted)/0.8)] sm:text-xs">
                    {stat.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 1.2, duration: reduce ? 0.2 : 0.6 }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
          aria-hidden="true"
        >
          <div className="scroll-cue h-10 w-px bg-[rgb(var(--color-muted))]" />
        </motion.div>
      </AuroraBackground>

      {/* ========================= TECH STACK ========================= */}
      <section className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Our stack"
            title={
              <>
                Built on tools that{" "}
                <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
                  scale
                </span>
                .
              </>
            }
            sub="Modern, battle-tested technology chosen to fit your project — not a one-size-fits-all template."
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {TECH_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.label}
                  variants={item}
                  className="rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.5)] p-6 backdrop-blur-sm"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-accent)/0.1)] text-[rgb(var(--color-accent))]">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-[rgb(var(--color-foreground))]">
                    {group.label}
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {group.items.map((tech) => (
                      <li
                        key={tech}
                        className="text-sm text-[rgb(var(--color-muted))]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================= WHAT WE BUILD ========================= */}
      <section className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="What we build"
            title={
              <>
                Any kind of{" "}
                <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
                  web product
                </span>
                .
              </>
            }
            sub="Whatever you have in mind, it's probably something we've built before."
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {BUILDS.map((build) => {
              const Icon = build.icon;
              return (
                <motion.div
                  key={build.title}
                  variants={item}
                  className="group rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.5)] p-6 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgb(var(--color-accent)/0.4)] hover:shadow-[0_18px_50px_-24px_rgb(var(--color-accent)/0.4)]"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-accent)/0.1)] text-[rgb(var(--color-accent))]">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium tracking-tight text-[rgb(var(--color-foreground))]">
                    {build.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[rgb(var(--color-muted))]">
                    {build.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================= INCLUDED / FEATURES ========================= */}
      <section className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[680px] -translate-x-1/2 rounded-full bg-[rgb(var(--color-accent)/0.06)] blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Every build includes"
            title={
              <>
                The details that{" "}
                <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
                  matter
                </span>
                .
              </>
            }
            sub="Not upsells — this is the baseline for everything we ship."
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={item}
                  className="flex gap-4 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.5)] p-6 backdrop-blur-sm"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-accent)/0.1)] text-[rgb(var(--color-accent))]">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-medium text-[rgb(var(--color-foreground))]">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[rgb(var(--color-muted))]">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================= PROCESS ========================= */}
      <section className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                From idea to{" "}
                <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
                  launch
                </span>
                .
              </>
            }
            sub="A calm, transparent process — you always know what's happening and what's next."
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={item}
                  className="relative rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.5)] p-6 backdrop-blur-sm"
                >
                  <span className="font-mono text-xs text-[rgb(var(--color-muted)/0.7)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 inline-flex size-10 items-center justify-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-accent)/0.1)] text-[rgb(var(--color-accent))]">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-medium tracking-tight text-[rgb(var(--color-foreground))]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[rgb(var(--color-muted))]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================= PRICING ========================= */}
      <section
        id="web-pricing"
        className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32"
      >
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Pricing"
            title={
              <>
                Priced to your{" "}
                <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
                  project
                </span>
                .
              </>
            }
            sub="Typical starting points — you get an exact quote once we've scoped the work."
          />

          {/* currency toggle */}
          <div className="mt-8 flex justify-center">
            <div
              role="group"
              aria-label="Currency"
              className="inline-flex items-center gap-1 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] p-1 backdrop-blur"
            >
              {["USD", "INR"].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  aria-pressed={currency === code}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-background))]",
                    currency === code
                      ? "bg-[rgb(var(--color-accent))] text-[rgb(var(--color-accent-foreground))]"
                      : "text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]"
                  )}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
          >
            {PLANS.map((plan) => (
              <motion.div key={plan.name} variants={item} className="relative">
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[rgb(var(--color-accent)/0.4)] bg-[rgb(var(--color-accent)/0.15)] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[rgb(var(--color-accent))] backdrop-blur">
                    Most popular
                  </span>
                )}
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm sm:p-8",
                    plan.featured
                      ? "border-[rgb(var(--color-accent)/0.5)] bg-[rgb(var(--color-accent)/0.06)] shadow-[0_24px_70px_-32px_rgb(var(--color-accent)/0.45)]"
                      : "border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] transition-[border-color,box-shadow] duration-300 hover:border-[rgb(var(--color-accent)/0.4)]"
                  )}
                >
                  <h3 className="text-lg font-semibold tracking-tight text-[rgb(var(--color-foreground))]">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-[rgb(var(--color-muted))]">
                    {plan.tagline}
                  </p>
                  <div className="mt-6">
                    {plan.startingFrom && (
                      <span className="text-xs font-medium uppercase tracking-wider text-[rgb(var(--color-muted))]">
                        Starting from
                      </span>
                    )}
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span
                        className={cn(
                          "font-display font-medium tracking-tight text-[rgb(var(--color-foreground))]",
                          plan.custom ? "text-3xl" : "text-4xl"
                        )}
                      >
                        {plan.custom ? plan.price : plan.price[currency]}
                      </span>
                      {plan.startingFrom && (
                        <span className="text-sm text-[rgb(var(--color-muted))]">
                          +
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="my-6 h-px w-full bg-[rgb(var(--color-border))]" />
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-[rgb(var(--color-muted))]"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-[rgb(var(--color-accent))]"
                          strokeWidth={2.5}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-1 items-end">
                    <GlowButton
                      icon={plan.icon}
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      {plan.cta}
                    </GlowButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32">
        <div className="relative mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Questions,{" "}
                <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
                  answered
                </span>
                .
              </>
            }
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 flex flex-col gap-3"
          >
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div key={faq.q} variants={item}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors duration-300",
                      isOpen
                        ? "border-[rgb(var(--color-accent)/0.4)] bg-[rgb(var(--color-accent)/0.05)]"
                        : "border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.5)] hover:border-[rgb(var(--color-accent)/0.25)]"
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgb(var(--color-accent))] sm:px-6"
                    >
                      <span className="text-base font-medium text-[rgb(var(--color-foreground))] sm:text-lg">
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "rotate-45 border-[rgb(var(--color-accent)/0.5)] text-[rgb(var(--color-accent))]"
                            : "border-[rgb(var(--color-border))] text-[rgb(var(--color-muted))]"
                        )}
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0 : 0.32, ease }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm leading-relaxed text-[rgb(var(--color-muted))] sm:px-6 sm:text-[15px]">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
