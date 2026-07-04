"use client";

import { cn } from "@/lib/utils";

// Sparkles  the reference icon.
function SparkleIcon() {
  return (
    <svg
      className="glow-btn-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

// Filled arrow  for secondary actions.
function ArrowIcon() {
  return (
    <svg
      className="glow-btn-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M13.3 4.29a1 1 0 0 0-1.4 1.42L16.17 10H4a1 1 0 1 0 0 2h12.17l-4.3 4.29a1 1 0 0 0 1.42 1.42l6-6a1 1 0 0 0 0-1.42l-6-6Z" />
    </svg>
  );
}

const ICONS = { sparkle: SparkleIcon, arrow: ArrowIcon };

/**
 * Glassy glow CTA. Styling lives in globals.css (.glow-btn*) so it stays
 * token-driven. The label is split into per-letter spans for the shimmer.
 */
export default function GlowButton({
  children,
  icon = "sparkle",
  size = "default",
  className,
  ...props
}) {
  const Icon = ICONS[icon] ?? SparkleIcon;
  const label = typeof children === "string" ? children : "";

  return (
    <button
      className={cn("glow-btn", size === "sm" && "glow-btn--sm", className)}
      {...props}
    >
      <Icon />
      <span className="glow-btn-text" aria-hidden="true">
        {label.split("").map((ch, i) => (
          <span
            key={i}
            className="glow-btn-letter"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {ch}
          </span>
        ))}
      </span>
      {/* Accessible label, since the visible text is split into decorative spans. */}
      <span className="sr-only">{label}</span>
    </button>
  );
}
