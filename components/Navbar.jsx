"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import KorvaneMark from "@/components/ui/KorvaneMark";
import GlowButton from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

const LINKS = [
  { label: "Services", id: "services" },
  { label: "Why us", id: "why-us" },
  { label: "Stack", id: "stack" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQ", id: "faq" },
];

export default function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Solidify the glass bar once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view so its link stays lit.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const goTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      {/* Glass bar  turns more solid and gains a shadow once scrolled. */}
      <nav
        className={cn(
          "relative mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 sm:px-5",
          scrolled
            ? "border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.78)] shadow-[0_16px_50px_-16px_rgb(var(--color-background)/0.95)]"
            : "border-[rgb(var(--color-border)/0.6)] bg-[rgb(var(--color-surface)/0.5)]"
        )}
      >
        {/* Brand  the shared KorvaneMark + wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-background))]"
        >
          <KorvaneMark width={26} />
          <span className="text-lg font-semibold tracking-tight text-[rgb(var(--color-foreground))]">
            Korvane
          </span>
        </a>

        {/* Links  hidden on mobile; active section stays lit */}
        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(link.id);
                  }}
                  className={cn(
                    "group relative py-2 text-sm font-medium transition-colors duration-300",
                    isActive
                      ? "text-[rgb(var(--color-foreground))]"
                      : "text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-2))] transition-all duration-300 ease-out",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* CTA  desktop and up. Wrapped because .glow-btn's own display
              would override a `hidden` utility on the button itself. */}
          <div className="hidden shrink-0 sm:block">
            <GlowButton icon="sparkle" size="sm" onClick={() => goTo("contact")}>
              Start a Project
            </GlowButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.7)] text-[rgb(var(--color-foreground))] outline-none transition-colors hover:border-[rgb(var(--color-accent)/0.45)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent))] md:hidden"
          >
            {open ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile dropdown panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={
                reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: reduce ? 0.15 : 0.25, ease }}
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.95)] p-3 shadow-[0_24px_60px_-20px_rgb(var(--color-background))] backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col">
                {LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(link.id);
                      }}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        active === link.id
                          ? "bg-[rgb(var(--color-accent)/0.1)] text-[rgb(var(--color-foreground))]"
                          : "text-[rgb(var(--color-muted))] hover:bg-[rgb(var(--color-accent)/0.06)] hover:text-[rgb(var(--color-foreground))]"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 border-t border-[rgb(var(--color-border))] pt-3">
                <GlowButton
                  icon="sparkle"
                  size="sm"
                  className="w-full"
                  onClick={() => goTo("contact")}
                >
                  Start a Project
                </GlowButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
