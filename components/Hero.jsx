"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import LiveAIBox from "@/components/ui/LiveAIBox";
import GlowButton from "@/components/ui/GlowButton";
import { Zap, Bot, Check } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiPython,
  SiNodedotjs,
  SiTailwindcss,
} from "react-icons/si";

const STACK = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: SiPython },
  { name: "Node.js", icon: SiNodedotjs },
  // { name: "Tailwind", icon: SiTailwindcss },
];

// Headline split for the word-by-word reveal. The gradient phrase stays one
// unit so it never breaks across the stagger.
const HEADLINE_LEAD = ["We", "build", "web", "apps,", "and", "the"];
const HEADLINE_TAIL = ["inside", "them."];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  const reduce = useReducedMotion();

  // Calm easing, no spring or bounce. The whole sequence runs under ~1.6s.
  const ease = [0.22, 1, 0.36, 1];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.55, ease },
    },
  };

  // Nested stagger: the h1 fires its own word cascade when the parent shows.
  const headline = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.055,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };

  const word = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.5, ease },
    },
  };

  // The AI box fades and scales in after the text has mostly settled.
  const box = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduce ? 0.2 : 0.7, ease, delay: reduce ? 0 : 0.55 },
    },
  };

  return (
    <AuroraBackground>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left  the pitch */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Availability pill with a live ping dot */}
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2.5 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[rgb(var(--color-muted))] backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--color-accent))] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--color-accent))]" />
              </span>
              Available for new projects
            </motion.span>

            {/* Word-by-word headline reveal */}
            <motion.h1
              variants={headline}
              className="mt-6 text-balance font-display text-4xl font-medium leading-[1.06] tracking-tight text-[rgb(var(--color-foreground))] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
            >
              {HEADLINE_LEAD.map((w) => (
                <motion.span
                  key={w}
                  variants={word}
                  className="inline-block whitespace-pre"
                >
                  {w}{" "}
                </motion.span>
              ))}
              <motion.span
                variants={word}
                className="relative inline-block whitespace-pre"
              >
                <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text pr-1 italic text-transparent">
                  AI features
                </span>
                {/* Hand-drawn underline that sketches itself in */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 12"
                  fill="none"
                  className="absolute -bottom-1.5 left-0 h-3 w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="hero-underline"
                      x1="0"
                      y1="0"
                      x2="220"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="rgb(var(--color-accent))" />
                      <stop offset="1" stopColor="rgb(var(--color-accent-2))" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M3 9 C 55 3.5, 150 2.5, 217 7.5"
                    stroke="url(#hero-underline)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{
                      pathLength: reduce ? 1 : 0,
                      opacity: reduce ? 1 : 0,
                    }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: reduce ? 0 : 0.7,
                      delay: reduce ? 0 : 1.05,
                      ease: "easeOut",
                    }}
                  />
                </svg>{" "}
              </motion.span>
              {HEADLINE_TAIL.map((w) => (
                <motion.span
                  key={w}
                  variants={word}
                  className="inline-block whitespace-pre"
                >
                  {w}{" "}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-[540px] text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
            >
              Full-stack development for{" "}
              <span className="font-medium italic text-[rgb(var(--color-accent))]">
                startups
              </span>{" "}
              and{" "}
              <span className="font-medium italic text-[rgb(var(--color-accent))]">
                growing businesses.
              </span>
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
            >
              <GlowButton
                icon="sparkle"
                className="w-full sm:w-auto"
                onClick={() => scrollTo("contact")}
              >
                Start a Project
              </GlowButton>
              <GlowButton
                icon="arrow"
                className="w-full sm:w-auto"
                onClick={() => scrollTo("services")}
              >
                See Our Work
              </GlowButton>
            </motion.div>

            {/* Quiet reassurance under the CTAs */}
            <motion.div
              variants={item}
              className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[rgb(var(--color-muted))] lg:justify-start"
            >
              <span className="inline-flex items-center gap-1.5">
                <Check
                  className="size-3.5 text-[rgb(var(--color-accent))]"
                  aria-hidden="true"
                />
                Free scoping call
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check
                  className="size-3.5 text-[rgb(var(--color-accent))]"
                  aria-hidden="true"
                />
                No commitment
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check
                  className="size-3.5 text-[rgb(var(--color-accent))]"
                  aria-hidden="true"
                />
                Ships in weeks
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check
                  className="size-3.5 text-[rgb(var(--color-accent))]"
                  aria-hidden="true"
                />
                AI-native builds
              </span>
            </motion.div>

            {/* Grounding meta row  real logos, ties into the stack section */}
            <motion.ul
              variants={item}
              className="mt-9 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
            >
              {STACK.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="group inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.45)] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[rgb(var(--color-muted))] backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgb(var(--color-accent)/0.45)] hover:bg-[rgb(var(--color-surface)/0.8)] hover:text-[rgb(var(--color-foreground))] hover:shadow-[0_0_18px_-8px_rgb(var(--color-accent)/0.45)]"
                >
                  <Icon
                    className="size-3.5 text-[rgb(var(--color-muted)/0.8)] transition-colors duration-300 group-hover:text-[rgb(var(--color-accent))]"
                    aria-hidden="true"
                  />
                  {name}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right  the signature element */}
          <motion.div
            variants={box}
            initial="hidden"
            animate="show"
            className="flex w-full justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[440px]">
            
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[rgb(var(--color-accent)/0.09)] blur-3xl"
              />
              <LiveAIBox />

            
             
              
            </div>
          </motion.div>
        </div>
      </div>

      {/* Soft fade into the services section below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[rgb(var(--color-background))]"
      />

      {/* Scroll cue  CSS beam, no JS animation loop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: reduce ? 0 : 1.4,
          duration: reduce ? 0.2 : 0.6,
        }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-[rgb(var(--color-muted)/0.7)]">
          Scroll
        </span>
        <div className="relative h-12 w-px overflow-hidden bg-[rgb(var(--color-border))]">
          <span className="scroll-cue-beam absolute left-1/2 h-8 w-[3px] rounded-full bg-gradient-to-b from-transparent via-[rgb(var(--color-accent))] to-transparent" />
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
