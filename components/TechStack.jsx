"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiGraphql,
  SiAnthropic,
  SiHuggingface,
  SiLangchain,
  SiVercel,
  SiGooglecloud,
  SiCloudflare,
  SiDocker,
  SiStripe,
  SiGithub,
  SiFigma,
} from "react-icons/si";

const ease = [0.22, 1, 0.36, 1];

const ROWS = [
  {
    label: "Languages & Frameworks",
    duration: 45,
    reverse: false,
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Python", icon: SiPython },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    label: "Databases & Backend",
    duration: 55,
    reverse: true,
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "Redis", icon: SiRedis },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
      { name: "Prisma", icon: SiPrisma },
      { name: "GraphQL", icon: SiGraphql },
    ],
  },
  {
    label: "AI, Cloud & Tools",
    duration: 50,
    reverse: false,
    items: [
      { name: "Anthropic", icon: SiAnthropic },
      { name: "Hugging Face", icon: SiHuggingface },
      { name: "LangChain", icon: SiLangchain },
      { name: "Vercel", icon: SiVercel },
      { name: "Google Cloud", icon: SiGooglecloud },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "Docker", icon: SiDocker },
      { name: "Stripe", icon: SiStripe },
      { name: "GitHub", icon: SiGithub },
      { name: "Figma", icon: SiFigma },
    ],
  },
];

function TechPill({ name, icon: Icon }) {
  return (
    <li className="group relative flex w-40 shrink-0 flex-col items-center gap-3.5 overflow-hidden rounded-2xl border border-[rgb(var(--color-border))] bg-gradient-to-b from-[rgb(var(--color-surface)/0.9)] to-[rgb(var(--color-surface)/0.45)] px-4 py-7 backdrop-blur transition-[border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[rgb(var(--color-accent)/0.45)] hover:shadow-[0_18px_44px_-18px_rgb(var(--color-accent)/0.5)]">
      {/* Soft halo behind the logo, revealed on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-4 size-16 -translate-x-1/2 rounded-full bg-[rgb(var(--color-accent)/0.18)] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <Icon
        className="relative size-10 text-[rgb(var(--color-muted))] transition-colors duration-300 group-hover:text-[rgb(var(--color-accent))]"
        aria-hidden="true"
      />
      <span className="relative whitespace-nowrap text-sm font-medium text-[rgb(var(--color-muted))] transition-colors duration-300 group-hover:text-[rgb(var(--color-foreground))]">
        {name}
      </span>
    </li>
  );
}

function MarqueeRow({ label, items, duration, reverse, variants }) {
  const half = (hidden) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex items-stretch gap-4 pr-4"
    >
      {items.map(({ name, icon }) => (
        <TechPill key={name} name={name} icon={icon} />
      ))}
    </ul>
  );

  return (
    <motion.div variants={variants}>
      <p className="mb-3 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-[rgb(var(--color-muted)/0.7)]">
        {label}
      </p>
      {/* Edge fade so the loop appears from and dissolves into nothing */}
      <div className="marquee-row relative overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div
          className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}
          style={{ "--marquee-duration": `${duration}s` }}
        >
          {half(false)}
          {half(true)}
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
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
      id="stack"
      className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32"
    >
      {/* Static ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-120px] h-[320px] w-[560px] -translate-x-1/2 rounded-full bg-[rgb(var(--color-accent)/0.06)] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
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
            Our stack
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-6 text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl lg:text-5xl"
          >
            The tools behind{" "}
            <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
              every build
            </span>
            .
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-5 text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
          >
            Battle-tested technologies we reach for every day  chosen for
            speed, reliability, and how well they age.
          </motion.p>
        </motion.div>

        {/* Marquee rows */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="mt-14 space-y-10"
        >
          {ROWS.map((row) => (
            <MarqueeRow key={row.label} {...row} variants={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
