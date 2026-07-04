"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import AIGradientBorder from "@/components/ui/AIGradientBorder";
import GlowButton from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

const CURRENCIES = ["USD", "INR"];

const PLANS = [
  {
    name: "Landing Pages",
    tagline: "One page, built to convert.",
    startingFrom: true,
    price: { USD: "$500", INR: "₹40,000" },
    features: [
      "Single high-converting page",
      "Custom design  no templates",
      "Mobile-first and fast",
      "Contact form wired up",
      "Deployed and live",
    ],
    cta: "Start a Project",
    icon: "arrow",
  },
  {
    name: "Business Websites",
    tagline: "A full site to grow on.",
    startingFrom: true,
    price: { USD: "$1,500", INR: "₹1,25,000" },
    featured: true,
    features: [
      "Everything in Landing Pages",
      "Multi-page site with a CMS",
      "Edit your own content",
      "SEO and analytics set up",
      "Forms, email and integrations",
    ],
    cta: "Start a Project",
    icon: "sparkle",
  },
  {
    name: "Custom SaaS",
    tagline: "A full product, built to spec.",
    custom: true,
    price: "Custom Quote",
    features: [
      "Full-stack web application",
      "Auth, billing and dashboards",
      "AI features built in",
      "Third-party integrations",
      "Ongoing support and iteration",
    ],
    cta: "Get a Quote",
    icon: "arrow",
  },
];

function PlanCard({ plan, currency }) {
  const priceDisplay = plan.custom ? plan.price : plan.price[currency];
  const inner = (
    <div className="flex h-full flex-col rounded-[inherit] bg-[rgb(var(--color-surface)/0.6)] p-7 backdrop-blur-sm sm:p-8">
      <h3 className="text-lg font-semibold tracking-tight text-[rgb(var(--color-foreground))]">
        {plan.name}
      </h3>
      <p className="mt-1 text-sm text-[rgb(var(--color-muted))]">
        {plan.tagline}
      </p>

      {/* Price */}
      <div className="mt-6">
        {plan.startingFrom && (
          <span className="text-xs font-medium uppercase tracking-wider text-[rgb(var(--color-muted))]">
            Starting from
          </span>
        )}
        <div className="mt-1 flex items-baseline gap-1.5">
          <span
            className={
              plan.custom
                ? "font-display text-3xl font-medium tracking-tight text-[rgb(var(--color-foreground))]"
                : "font-display text-4xl font-medium tracking-tight text-[rgb(var(--color-foreground))]"
            }
          >
            {priceDisplay}
          </span>
          {plan.startingFrom && (
            <span className="text-sm text-[rgb(var(--color-muted))]">+</span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-[rgb(var(--color-border))]" />

      {/* Features */}
      <ul className="flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-[rgb(var(--color-muted))]"
          >
            <Check
              className="mt-0.5 size-4 shrink-0 text-[rgb(var(--color-accent))]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA pinned to the bottom */}
      <div className="mt-8 flex flex-1 items-end">
        <GlowButton
          icon={plan.icon}
          size="sm"
          className="w-full"
          onClick={() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {plan.cta}
        </GlowButton>
      </div>
    </div>
  );

  if (plan.featured) {
    return (
      <AIGradientBorder
        duration={8}
        showGlow={false}
        className="h-full rounded-2xl shadow-[0_24px_70px_-32px_rgb(var(--color-accent)/0.45)]"
      >
        {inner}
      </AIGradientBorder>
    );
  }

  return (
    <div className="h-full rounded-2xl border border-[rgb(var(--color-border))] transition-[border-color,box-shadow] duration-300 hover:border-[rgb(var(--color-accent)/0.4)] hover:shadow-[0_18px_50px_-28px_rgb(var(--color-accent)/0.35)]">
      {inner}
    </div>
  );
}

export default function Pricing() {
  const reduce = useReducedMotion();
  const [currency, setCurrency] = useState("USD");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
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
      id="pricing"
      className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32"
    >
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
            Pricing
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-6 text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl lg:text-5xl"
          >
            Priced to your{" "}
            <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
              project
            </span>
            , not a package.
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-5 text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
          >
            No fixed tiers or hidden extras. These are typical starting points 
            you get an exact quote once we&apos;ve scoped the work together.
          </motion.p>

          {/* Currency toggle  USD default, switch to INR. */}
          <motion.div
            variants={item}
            className="mt-8 inline-flex items-center gap-1 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] p-1 backdrop-blur"
            role="group"
            aria-label="Currency"
          >
            {CURRENCIES.map((code) => (
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
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={item}
              className="relative transition-transform duration-300 hover:-translate-y-1"
            >
              {plan.featured && (
                <span className="absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[rgb(var(--color-accent)/0.4)] bg-[rgb(var(--color-accent)/0.15)] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[rgb(var(--color-accent))] backdrop-blur">
                  Most popular
                </span>
              )}
              <PlanCard plan={plan} currency={currency} />
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-sm text-[rgb(var(--color-muted)/0.8)]">
          Every project is quoted to scope. Not sure which fits? Let&apos;s talk
          it through.
        </p>
      </div>
    </section>
  );
}
