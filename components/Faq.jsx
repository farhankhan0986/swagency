"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import GlowButton from "@/components/ui/GlowButton";

const ease = [0.22, 1, 0.36, 1];

const FAQS = [
  {
    q: "How long does a project take?",
    a: "Landing pages usually take one to two weeks, business sites two to four, and custom apps are scoped case by case. You'll always have a clear timeline before any work starts.",
  },
  {
    q: "Do you really build the AI features yourselves?",
    a: "Yes. Chatbots, RAG over your docs, copilots, and agent workflows are built in-house and wired directly into your product  never outsourced or bolted on as an afterthought.",
  },
  {
    q: "How does pricing work?",
    a: "Every project is scoped to the work rather than sold as a fixed package. After a short discovery call you get an exact, fixed quote  no surprise invoices later.",
  },
  {
    q: "Can you work with an existing codebase?",
    a: "Absolutely. We can take over, extend, or refactor an existing app just as easily as building something new from scratch.",
  },
  {
    q: "Will I be able to edit the site myself?",
    a: "For business websites, yes  we set up a CMS so you can update content, images, and copy whenever you like, without touching any code.",
  },
  {
    q: "What happens after launch?",
    a: "You own all the code and infrastructure. From there we offer ongoing support and iteration for as long as it's useful  no lock-in.",
  },
];

function FaqItem({ item, index, isOpen, onToggle, reduce }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors duration-300",
        isOpen
          ? "border-[rgb(var(--color-accent)/0.4)] bg-[rgb(var(--color-accent)/0.05)]"
          : "border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.5)] hover:border-[rgb(var(--color-accent)/0.25)]"
      )}
    >
      {/* Accent bar sweeps down the left edge of the open item */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 h-full w-0.5 origin-top bg-gradient-to-b from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] transition-transform duration-500 ease-out",
          isOpen ? "scale-y-100" : "scale-y-0"
        )}
      />

      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center gap-4 px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgb(var(--color-accent))] sm:px-6"
        >
          <span
            className={cn(
              "font-mono text-xs tabular-nums transition-colors duration-300",
              isOpen
                ? "text-[rgb(var(--color-accent))]"
                : "text-[rgb(var(--color-muted)/0.7)] group-hover:text-[rgb(var(--color-muted))]"
            )}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 text-base font-medium text-[rgb(var(--color-foreground))] sm:text-lg">
            {item.q}
          </span>
          <span
            className={cn(
              "grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300",
              isOpen
                ? "rotate-45 border-[rgb(var(--color-accent)/0.5)] bg-[rgb(var(--color-accent)/0.12)] text-[rgb(var(--color-accent))]"
                : "border-[rgb(var(--color-border))] text-[rgb(var(--color-muted))] group-hover:border-[rgb(var(--color-accent)/0.35)] group-hover:text-[rgb(var(--color-accent))]"
            )}
          >
            <Plus className="size-4" aria-hidden="true" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.32, ease }}
            className="overflow-hidden"
          >
            <motion.p
              initial={reduce ? {} : { y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.3, delay: 0.08, ease }}
              className="px-5 pb-5 pl-[3.1rem] text-sm leading-relaxed text-[rgb(var(--color-muted))] sm:px-6 sm:pl-[3.6rem] sm:text-[15px]"
            >
              {item.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.45, ease },
    },
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32"
    >
      {/* Static ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[20%] h-[300px] w-[420px] rounded-full bg-[rgb(var(--color-accent)/0.05)] blur-3xl" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgb(var(--color-accent)/0.18)_1px,transparent_1px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_45%_50%_at_18%_45%,black_15%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.45fr] lg:gap-16">
          {/* Left  sticky intro + support card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={container}
            className="self-start lg:sticky lg:top-28"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[rgb(var(--color-muted))] backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-accent))]" />
              FAQ
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl lg:text-5xl"
            >
              Questions,{" "}
              <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
                answered
              </span>
              .
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-5 max-w-md text-base leading-relaxed text-[rgb(var(--color-muted))] sm:text-lg"
            >
              Everything you might want to know before starting a project with
              us.
            </motion.p>

            {/* Support card */}
            <motion.div
              variants={item}
              className="mt-9 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] p-5 backdrop-blur sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-accent)/0.1)] text-[rgb(var(--color-accent))]">
                  <MessageCircle
                    className="size-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="font-display text-lg font-medium tracking-tight text-[rgb(var(--color-foreground))]">
                  Still unsure?
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--color-muted))]">
                A quick call clears it up  tell us what you&apos;re thinking
                and we&apos;ll point you in the right direction.
              </p>
              <GlowButton
                icon="arrow"
                size="sm"
                className="mt-4"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ask us directly
              </GlowButton>
            </motion.div>
          </motion.div>

          {/* Right  accordion */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="flex flex-col gap-3"
          >
            {FAQS.map((faq, index) => (
              <motion.div key={faq.q} variants={item}>
                <FaqItem
                  item={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex((prev) => (prev === index ? -1 : index))
                  }
                  reduce={reduce}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
