"use client";

import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import KorvaneMark from "@/components/ui/KorvaneMark";

const EXPLORE_LINKS = [
  { label: "What we build", href: "#services" },
  { label: "Why choose us", href: "#why-us" },
  { label: "Our stack", href: "#stack" },
  { label: "Pricing", href: "#pricing" },
];

const SUPPORT_LINKS = [
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// Inline brand glyphs (lucide dropped its brand icons). 24×24, fill currentColor.
const SOCIALS = [
  {
    label: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.988 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

function FooterLink({ href, children }) {
  const isAnchor = href.startsWith("#");
  return (
    <a
      href={href}
      onClick={
        isAnchor
          ? (e) => {
              e.preventDefault();
              document
                .querySelector(href)
                ?.scrollIntoView({ behavior: "smooth" });
            }
          : undefined
      }
      className="group relative inline-block text-sm text-[rgb(var(--color-muted))] outline-none transition-colors duration-300 hover:text-[rgb(var(--color-foreground))] focus-visible:text-[rgb(var(--color-foreground))]"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[rgb(var(--color-accent))] transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[rgb(var(--color-background))] px-2 pb-6">
      <div className="relative mx-auto overflow-hidden rounded-[24px] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.3)]">
        {/* Accent hairline along the top edge */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--color-accent)/0.5)] to-transparent"
        />
        {/* Soft aura */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[560px] -translate-x-1/2 rounded-full bg-[rgb(var(--color-accent)/0.05)] blur-3xl"
        />

        <div className="relative px-6 pt-14 sm:px-14">
          {/* Top  brand + link columns */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.15fr] md:gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-lg border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]">
                  <KorvaneMark width={18} />
                </span>
                <span className="text-xl font-semibold tracking-tight text-[rgb(var(--color-foreground))]">
                  Korvane
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[rgb(var(--color-muted))]">
                Building modern websites, AI applications, and scalable
                software for startups and businesses.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] px-3 py-1.5 text-xs font-medium text-[rgb(var(--color-muted))]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--color-accent))] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-accent))]" />
                </span>
                Available for new projects
              </span>
            </div>

            {/* Explore */}
            <nav aria-label="Explore">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[rgb(var(--color-muted)/0.7)]">
                Explore
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Support */}
            <nav aria-label="Support">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[rgb(var(--color-muted)/0.7)]">
                Support
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Get in touch */}
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[rgb(var(--color-muted)/0.7)]">
                Get in touch
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-[rgb(var(--color-muted))]">
                <li>
                  <a
                    href="mailto:hello@korvane.dev"
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-[rgb(var(--color-foreground))]"
                  >
                    <Mail
                      className="size-4 text-[rgb(var(--color-accent))]"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    hello@korvane.dev
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+910000000000"
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-[rgb(var(--color-foreground))]"
                  >
                    <Phone
                      className="size-4 text-[rgb(var(--color-accent))]"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    +91 00000 00000
                  </a>
                </li>
                <li className="inline-flex items-center gap-2.5">
                  <MapPin
                    className="size-4 text-[rgb(var(--color-accent))]"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  Remote · Worldwide
                </li>
              </ul>

              {/* Socials */}
              <ul className="mt-5 flex items-center gap-2.5">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-9 place-items-center rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] text-[rgb(var(--color-muted))] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--color-accent)/0.45)] hover:text-[rgb(var(--color-accent))] hover:shadow-[0_0_16px_-6px_rgb(var(--color-accent)/0.5)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent))]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4"
                        aria-hidden="true"
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ghost wordmark  cropped by the card edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative mt-14 h-20 select-none overflow-hidden sm:h-32"
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap bg-gradient-to-b from-[rgb(var(--color-foreground)/0.08)] to-transparent bg-clip-text font-display text-[6.5rem] font-semibold leading-none tracking-tight text-transparent sm:text-[11rem]">
              Korvane
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-[rgb(var(--color-foreground)/0.08)] px-6 py-6 sm:px-14">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-sm text-[rgb(var(--color-muted)/0.85)]">
              © {year} Korvane. All rights reserved.
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface)/0.6)] px-4 py-2 text-xs font-medium text-[rgb(var(--color-muted))] outline-none transition-all duration-300 hover:border-[rgb(var(--color-accent)/0.45)] hover:text-[rgb(var(--color-foreground))] focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-accent))]"
            >
              Back to top
              <ArrowUp
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
