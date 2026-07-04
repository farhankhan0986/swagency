# Korvane

Marketing site for Korvane — a full-stack development studio for startups and growing businesses. Built with Next.js 14, it presents services, pricing, the tech stack, testimonials, and a contact section as a single, highly animated page.

---

## What it is

A single-page agency website that acts as the studio's primary sales surface. Every section is crafted to reduce friction from first impression to booked project: an aurora hero with a live AI demo widget, an interactive bento-grid of services, a spotlight feature grid, animated marquee tech-stack rows, a dual-currency pricing comparison, testimonials, an FAQ accordion, and a contact form.

The visual language is dark-mode first, with a consistent accent system driven by CSS custom properties so the entire palette can be changed in one place.

---

## Sections

| Section | ID | Purpose |
|---|---|---|
| Navbar | — | Sticky nav with smooth-scroll anchors and a "Start a Project" CTA |
| Hero | — | Aurora background, word-by-word headline reveal, live AI chat widget |
| What We Build | `#services` | Bento grid of six service cards with cursor-tracked spotlight borders |
| Why Trust Us | `#why-us` | Six feature cards with the same spotlight treatment |
| Tech Stack | `#stack` | Three auto-scrolling marquee rows of technology logos |
| Pricing | `#pricing` | Three-tier cards with USD / INR currency toggle |
| Testimonials | — | Animated testimonial carousel |
| FAQ | — | Accordion of common questions |
| Contact | `#contact` | Enquiry form |
| Footer | — | Links, legal, brand mark |

---

## Tech stack

**Framework**
- Next.js 14 (App Router)
- React 18

**Styling**
- Tailwind CSS 3
- Geist Sans and Geist Mono (body and UI text)
- Fraunces variable font (display headings only — SOFT, WONK, opsz axes)

**Animation**
- Framer Motion — page-entry and scroll-triggered sequences, all respecting `prefers-reduced-motion`
- Lenis — smooth scroll with native feel

**Icons**
- Lucide React (UI icons)
- React Icons / Simple Icons (technology logos in the marquee and hero stack pills)

**UI primitives**
- `class-variance-authority` + `clsx` + `tailwind-merge` for variant-safe className composition
- `dotted-map` — SVG world map used in the contact section

---

## Project structure

```
korvane/
├── app/
│   ├── globals.css          # CSS custom properties, keyframes, utility layers
│   ├── layout.js            # Root layout — fonts, metadata, SmoothScrollProvider
│   └── page.js              # Single page, assembles all sections in order
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx             # Aurora hero, word-reveal headline, LiveAIBox
│   ├── WhatWeBuild.jsx      # Bento service grid with six card visuals
│   ├── WhyTrustUs.jsx       # Spotlight feature cards
│   ├── TechStack.jsx        # Three-row marquee with 27 technology logos
│   ├── Pricing.jsx          # Three plans, USD/INR toggle
│   ├── Testimonials.jsx
│   ├── Faq.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── SmoothScrollProvider.jsx   # Lenis wrapper
│   └── ui/
│       ├── aurora-background.jsx  # Animated gradient aurora (adapted from Aceternity UI)
│       ├── LiveAIBox.jsx          # Interactive AI chat demo widget in the hero
│       ├── GlowButton.jsx         # Primary CTA button with glow and icon variants
│       ├── AIGradientBorder.jsx   # Animated gradient border for featured pricing card
│       ├── animated-testimonials.jsx
│       ├── bento-grid.jsx
│       ├── comet-card.jsx
│       ├── dotted-glow-background.jsx
│       ├── world-map.jsx
│       ├── KorvaneMark.jsx        # Brand mark SVG
│       └── button.jsx
├── lib/
│   └── utils.js             # cn() helper (clsx + tailwind-merge)
├── public/
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.mjs
└── jsconfig.json
```

---

## Getting started

**Prerequisites:** Node.js 18 or later.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server supports hot reload; changes to any component or the global CSS file will reflect immediately.

```bash
# Production build
npm run build
npm run start

# Lint
npm run lint
```

---

## Design system

All colour tokens live in `app/globals.css` as RGB channel values on `:root`. Every component composes colours with the `rgb(var(--color-*) / <alpha>)` pattern, giving full opacity control without Tailwind opacity-modifier workarounds.

| Token | Role |
|---|---|
| `--color-background` | Page background |
| `--color-surface` | Card and overlay backgrounds |
| `--color-border` | Subtle borders and dividers |
| `--color-foreground` | Primary text |
| `--color-muted` | Secondary / caption text |
| `--color-accent` | Primary brand colour (teal) |
| `--color-accent-2` | Gradient end stop |
| `--color-accent-foreground` | Text on accent backgrounds |

**Typography scale**

- Display headings — `font-display` (Fraunces) — used only for `<h1>` through `<h3>` within sections
- Body and UI — `font-sans` (Geist Sans)
- Monospace labels — `font-mono` (Geist Mono) — live AI box, tech-stack category labels

**Animation philosophy**

Every animated element reads `useReducedMotion()` from Framer Motion. When the system preference is set, durations collapse to 200 ms and transforms are removed, so the page is fully accessible without a separate no-animation stylesheet.

The spotlight-border effect on service and feature cards is implemented via a single `mousemove` listener on the parent grid that writes `--x` and `--y` CSS custom properties into each card. A single `requestAnimationFrame` gate prevents layout thrash. No React state is touched, so there are zero re-renders on pointer movement.

---

## Services offered

The site presents six core service lines, each represented by an animated bento card:

1. **AI Features and Agents** — chatbots, copilots, RAG pipelines, and agentic workflows integrated natively into the product
2. **Web and Mobile Apps** — full-stack Next.js and React applications, responsive across every breakpoint
3. **SaaS Platforms** — multi-tenant architecture with auth, billing, and role management from day one
4. **Dashboards and Data** — admin panels and analytics surfaces built for real operational use
5. **E-commerce and Payments** — Stripe-integrated storefronts and billing flows built to convert
6. **Automations and Integrations** — connecting existing tools and eliminating manual processes end to end

---

## Pricing tiers

Pricing is shown in USD by default with a toggle for INR. All figures are indicative starting points — every project is quoted to scope after a free scoping call.

| Tier | USD | INR |
|---|---|---|
| Landing Pages | from $500 | from ₹40,000 |
| Business Websites | from $1,500 | from ₹1,25,000 |
| Custom SaaS | Custom quote | Custom quote |

---

## Path alias

The project uses `@/` as an alias for the workspace root, configured in `jsconfig.json`. All internal imports follow this convention — for example, `import GlowButton from "@/components/ui/GlowButton"`.

---

## Deployment

The site is a standard Next.js application and deploys without configuration to Vercel, Netlify, or any platform that supports Node.js. No environment variables are required for the base marketing site.

```bash
npm run build
```
