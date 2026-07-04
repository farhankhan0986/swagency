"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import WorldMap from "@/components/ui/world-map";
import GlowButton from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

// Marker position (India) projected into the 800×400 map viewBox → percentages.
const INDIA = { lat: 20.5937, lng: 78.9629 };
const MARKER_LEFT = "71.9%";
const MARKER_TOP = "38.6%";

const CONTACT_LINKS = [
  { label: "hello@korvane.dev", href: "mailto:hello@korvane.dev" },
  { label: "+91 00000 00000", href: "tel:+910000000000" },
  { label: "Remote · Worldwide", href: null },
];

const FIELDS = [
  { name: "name", label: "Full name", type: "text", placeholder: "Jane Cooper" },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@company.com",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Acme Inc.",
    optional: true,
  },
];

export default function Contact() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.5, ease },
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    // Placeholder submit  swap for a POST to /api/contact (MongoDB) later.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[rgb(var(--color-background))] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Left  pitch, contacts, map */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="w-full max-w-[520px]"
          >
            <motion.span
              variants={item}
              className="contact-float inline-flex size-14 items-center justify-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-accent))] shadow-[0_10px_30px_rgb(var(--color-background)/0.6)]"
            >
              <Mail className="size-6" strokeWidth={1.75} aria-hidden="true" />
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-tight text-[rgb(var(--color-foreground))] sm:text-5xl"
            >
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] bg-clip-text italic text-transparent">
                together
              </span>
              .
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-6 max-w-[470px] text-base leading-[1.8] text-[rgb(var(--color-muted))] sm:text-lg"
            >
              Tell us what you&apos;re building  an idea to pressure-test, a
              project to scope, or a problem to solve. We reply within a day.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-[rgb(var(--color-muted))]"
            >
              {CONTACT_LINKS.map((link, i) => (
                <span key={link.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-[rgb(var(--color-muted)/0.5)]"
                    />
                  )}
                  {link.href ? (
                    <a
                      href={link.href}
                      className="rounded outline-none transition-colors hover:text-[rgb(var(--color-foreground))] hover:underline focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent))] focus-visible:ring-offset-4 focus-visible:ring-offset-[rgb(var(--color-background))]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span>{link.label}</span>
                  )}
                </span>
              ))}
            </motion.div>

            {/* World map with the India marker */}
            <motion.div variants={item} className="relative mt-14 w-full">
              <WorldMap dots={[{ start: INDIA, end: INDIA }]} />

              {/* Marker overlay  beam + floating tooltip over India */}
              <div
                className="pointer-events-none absolute"
                style={{ left: MARKER_LEFT, top: MARKER_TOP }}
                aria-hidden="true"
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  {/* soft glow */}
                  <span className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--color-accent)/0.25)] blur-xl" />
                  {/* beam */}
                  <span className="absolute bottom-1/2 left-1/2 h-9 w-px -translate-x-1/2 bg-gradient-to-t from-[rgb(var(--color-accent))] to-transparent" />
                  {/* tooltip */}
                  <div className="contact-float absolute bottom-[calc(50%+2.25rem)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] px-2.5 py-1 text-[11px] font-medium text-[rgb(var(--color-foreground))] shadow-[0_10px_30px_rgb(var(--color-background)/0.5)]">
                    We are here
                  </div>
                  {/* dot */}
                  <span className="relative block size-2 rounded-full bg-[rgb(var(--color-accent))] shadow-[0_0_12px_rgb(var(--color-accent))]" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right  form card */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduce ? 0.2 : 0.6, ease }}
            className="relative w-full justify-self-stretch overflow-hidden rounded-[28px] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.5)] p-7 shadow-[0_20px_60px_-24px_rgb(var(--color-background)/0.9)] backdrop-blur-sm transition-colors duration-500 focus-within:border-[rgb(var(--color-accent)/0.35)] sm:p-10 lg:max-w-[560px] lg:justify-self-end"
          >
            {/* Grid pattern */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_120%_at_100%_0%,black,transparent_75%)]"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(var(--color-foreground)/0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-foreground)/0.05) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            {/* Blurred accent squares */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span className="absolute left-[12%] top-[8%] size-10 rounded bg-[rgb(var(--color-accent)/0.08)] blur-md" />
              <span className="absolute right-[10%] top-[22%] size-8 rounded bg-[rgb(var(--color-accent)/0.07)] blur-md" />
              <span className="absolute left-[24%] top-[62%] size-12 rounded bg-[rgb(var(--color-accent)/0.06)] blur-lg" />
              <span className="absolute right-[18%] bottom-[12%] size-9 rounded bg-[rgb(var(--color-accent)/0.07)] blur-md" />
            </div>

            <div className="relative z-10">
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, y: 14, scale: 0.97 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: reduce ? 0.2 : 0.45, ease }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <div className="relative">
                      {/* One-shot expanding ring */}
                      {!reduce && (
                        <motion.span
                          aria-hidden="true"
                          initial={{ opacity: 0.7, scale: 0.5 }}
                          animate={{ opacity: 0, scale: 2.1 }}
                          transition={{
                            duration: 0.9,
                            ease: "easeOut",
                            delay: 0.15,
                          }}
                          className="absolute inset-0 rounded-full border border-[rgb(var(--color-accent)/0.6)]"
                        />
                      )}
                      <motion.span
                        initial={reduce ? {} : { scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: reduce ? 0 : 0.4, ease }}
                        className="grid size-16 place-items-center rounded-full border border-[rgb(var(--color-accent)/0.4)] bg-[rgb(var(--color-accent)/0.12)] text-[rgb(var(--color-accent))] shadow-[0_0_36px_-8px_rgb(var(--color-accent)/0.7)]"
                      >
                        {/* Checkmark draws itself in */}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="size-8"
                          aria-hidden="true"
                        >
                          <motion.path
                            d="M4 12.5 9 17.5 20 6.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: reduce ? 1 : 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: reduce ? 0 : 0.5,
                              delay: reduce ? 0 : 0.25,
                              ease: "easeOut",
                            }}
                          />
                        </svg>
                      </motion.span>
                    </div>
                    <motion.h3
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? 0.2 : 0.4,
                        delay: reduce ? 0 : 0.3,
                        ease,
                      }}
                      className="mt-6 font-display text-2xl font-medium text-[rgb(var(--color-foreground))]"
                    >
                      Message sent
                    </motion.h3>
                    <motion.p
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? 0.2 : 0.4,
                        delay: reduce ? 0 : 0.4,
                        ease,
                      }}
                      className="mt-2 max-w-xs text-sm text-[rgb(var(--color-muted))]"
                    >
                      Thanks for reaching out  we&apos;ll get back to you
                      within a day.
                    </motion.p>
                    <motion.button
                      type="button"
                      onClick={() => setStatus("idle")}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: reduce ? 0.2 : 0.4,
                        delay: reduce ? 0 : 0.55,
                      }}
                      className="mt-6 rounded-lg px-4 py-2 text-sm text-[rgb(var(--color-muted))] outline-none transition-colors hover:text-[rgb(var(--color-foreground))] focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-background))]"
                    >
                      Send another
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    exit={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, y: -14, scale: 0.98 }
                    }
                    transition={{ duration: reduce ? 0.2 : 0.3, ease }}
                  >
                    <motion.form
                      onSubmit={onSubmit}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.25 }}
                      variants={{
                        hidden: {},
                        show: {
                          transition: {
                            staggerChildren: reduce ? 0 : 0.09,
                            delayChildren: reduce ? 0 : 0.15,
                          },
                        },
                      }}
                      className={cn(
                        "flex flex-col gap-6 transition-opacity duration-300",
                        status === "submitting" && "opacity-80"
                      )}
                    >
                      {FIELDS.map((field) => (
                        <motion.div
                          key={field.name}
                          variants={item}
                          className="group"
                        >
                          <label
                            htmlFor={field.name}
                            className="mb-2 block text-sm font-medium text-[rgb(var(--color-foreground))] transition-colors duration-300 group-focus-within:text-[rgb(var(--color-accent))]"
                          >
                            {field.label}
                            {field.optional && (
                              <span className="ml-1.5 text-xs font-normal text-[rgb(var(--color-muted)/0.7)]">
                                optional
                              </span>
                            )}
                          </label>
                          <div className="relative">
                            <input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              required={!field.optional}
                              placeholder={field.placeholder}
                              className="h-[52px] w-full rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background)/0.6)] px-4 text-[rgb(var(--color-foreground))] outline-none transition-[border-color,background-color] duration-300 placeholder:text-[rgb(var(--color-muted)/0.7)] focus:border-[rgb(var(--color-accent)/0.6)] focus:bg-[rgb(var(--color-background)/0.85)] focus:ring-1 focus:ring-[rgb(var(--color-accent)/0.5)]"
                            />
                            {/* Accent underline sweeps in from the center on focus */}
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-2 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[rgb(var(--color-accent))] to-transparent transition-transform duration-300 ease-out group-focus-within:scale-x-100"
                            />
                          </div>
                        </motion.div>
                      ))}

                      <motion.div variants={item} className="group">
                        <label
                          htmlFor="message"
                          className="mb-2 block text-sm font-medium text-[rgb(var(--color-foreground))] transition-colors duration-300 group-focus-within:text-[rgb(var(--color-accent))]"
                        >
                          Message
                        </label>
                        <div className="relative">
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            placeholder="Tell us about your project…"
                            className="min-h-[120px] w-full resize-y rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background)/0.6)] p-4 text-[rgb(var(--color-foreground))] outline-none transition-[border-color,background-color] duration-300 placeholder:text-[rgb(var(--color-muted)/0.7)] focus:border-[rgb(var(--color-accent)/0.6)] focus:bg-[rgb(var(--color-background)/0.85)] focus:ring-1 focus:ring-[rgb(var(--color-accent)/0.5)]"
                          />
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-2 bottom-[7px] h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[rgb(var(--color-accent))] to-transparent transition-transform duration-300 ease-out group-focus-within:scale-x-100"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={item}>
                        <GlowButton
                          type="submit"
                          icon="sparkle"
                          disabled={status === "submitting"}
                          className={cn(
                            "mt-1 self-start",
                            status === "submitting" &&
                              "pointer-events-none opacity-70"
                          )}
                        >
                          {status === "submitting" ? "Sending…" : "Send message"}
                        </GlowButton>
                      </motion.div>
                    </motion.form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
