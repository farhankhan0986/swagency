"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import LiveAIBox from "@/components/ui/LiveAIBox";
import { Sparkles } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const STACK = [
  "Modern Frameworks",
  "Cloud",
  "AI Integrations",
  "Custom Solutions",
];

export default function Hero() {
  const reduce = useReducedMotion();

  // Calm easing, no spring or bounce. The whole sequence runs under ~1.4s.
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
          {/* Left — the pitch */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
           <motion.span
  variants={item}
  className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[rgb(var(--color-muted))] backdrop-blur"
>
  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-accent))]" />
   We design to make an{" "}
  <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text font-semibold text-transparent">
    "Impact"
  </span>
</motion.span>

            <motion.h1
              variants={item}
              className="mt-6 text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-[rgb(var(--color-foreground))] sm:text-5xl lg:text-[3.5rem] xl:text-6xl"
            >
              We build web apps, and the{" "}
              <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text pr-1 italic text-transparent">
                AI features
              </span>{" "}
              inside them.
            </motion.h1>

            {/* <motion.p
              variants={item}
              className="mt-6 max-w-[540px] text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
            >
             <motion.p
  variants={item}
  className="mt-6 max-w-[540px] text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
>
  Full stack development for startups and growing businesses. From{" "}
  <span className="font-medium text-[rgb(var(--color-accent))]">
    idea
  </span>{" "}
  to{" "}
  <span className="font-medium text-[rgb(var(--color-accent-2))]">
    launch
  </span>
  , with{" "}
  <span className="font-medium text-[rgb(var(--color-accent))]">
    AI
  </span>{" "}
  when it makes sense.
</motion.p>
            </motion.p> */}

            <motion.div
              variants={item}
              className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
            >
              <GlowButton icon="sparkle" className="w-full sm:w-auto">
                Start a Project
              </GlowButton>
              <GlowButton icon="arrow" className="w-full sm:w-auto">
                See Our Work
              </GlowButton>
            </motion.div>

            {/* Grounding meta row */}
           <motion.ul
  variants={item}
  className="mt-10 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
>
  {STACK.map((tech) => (
    <li
      key={tech}
      className="
        rounded-full
        border border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-surface)/0.45)]
        px-3.5 py-1.5
        text-xs font-medium tracking-wide
        text-[rgb(var(--color-muted))]
        backdrop-blur
        transition-all duration-300 ease-out
        hover:-translate-y-0.5
        hover:border-[rgb(var(--color-accent)/0.45)]
        hover:bg-[rgb(var(--color-surface)/0.8)]
        hover:text-[rgb(var(--color-foreground))]
        hover:shadow-[0_0_18px_-8px_rgb(var(--color-accent)/0.45)]
        hover: cursor-pointer
      "
    >
      {tech}
    </li>
  ))}
</motion.ul>
          </motion.div>

          {/* Right — the signature element */}
          <motion.div
            variants={box}
            initial="hidden"
            animate="show"
            className="flex w-full justify-center lg:justify-end"
          >
            <LiveAIBox />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — a thin line with a slow pulse. */}
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    delay: reduce ? 0 : 1.2,
    duration: reduce ? 0.2 : 0.6,
  }}
  className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:flex flex-col items-center gap-3"
>
  <span className="text-[10px] uppercase tracking-[0.35em] text-[rgb(var(--color-muted)/0.7)]">
    Scroll
  </span>

  <div className="relative h-12 w-px overflow-hidden bg-[rgb(var(--color-border))]">
  <motion.div
    className="absolute left-1/2 h-8 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-[rgb(var(--color-accent))] to-transparent"
    initial={{ y: -32 }}
    animate={{ y: 48 }}
    transition={{
      duration: 2,
      ease: "linear",
      repeat: Infinity,
    }}
  />
</div>
</motion.div>
    </AuroraBackground>
  );
}
