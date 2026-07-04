"use client";

import { cn } from "@/lib/utils";

/**
 * Animated conic-gradient border with an optional inner glow spill.
 *
 * Perf: the gradient is painted once on an oversized square layer and spun
 * with a CSS transform (`.conic-spin` in globals.css), so the rotation runs
 * entirely on the compositor. The previous version regenerated the
 * conic-gradient string every frame via a Framer Motion value, which forced
 * a repaint of the blurred spill layer on every frame.
 *
 * Under `prefers-reduced-motion` the spin is frozen on a static slice
 * (see the reduced-motion block in globals.css).
 *
 * Shared by `LiveAIBox` and the featured `Pricing` card.
 *
 * @param {object}  props
 * @param {React.ReactNode} props.children
 * @param {string}  [props.className]           - classes applied to the root wrapper
 * @param {string}  [props.stops]               - custom conic-gradient stop string
 * @param {boolean} [props.showGlow=true]       - toggle the inner glow spill
 * @param {string}  [props.spillClassName]      - extra classes for the glow layer
 * @param {number}  [props.duration=5]          - seconds for one full revolution
 * @param {string}  [props.borderWidth="1.5px"] - width of the gradient border ring
 * @param {string}  [props.as="div"]            - root element tag ("div" | "section" | …)
 */

// One long, calm arc  the default, used by the LiveAIBox card.
const DEFAULT_STOPS =
  "transparent 0%, rgb(var(--color-accent) / 0) 5%, rgb(var(--color-accent)) 12%, rgb(var(--color-accent-2)) 26%, rgb(var(--color-accent)) 40%, rgb(var(--color-accent-2) / 0) 50%, transparent 56%";

export function AIGradientBorder({
  children,
  className,
  spillClassName = "opacity-50 blur-2xl",
  showGlow = true,
  duration = 5,
  stops = DEFAULT_STOPS,
  borderWidth = "1.5px",
  as: Tag = "div",
}) {
  const spinStyle = {
    backgroundImage: `conic-gradient(from 0turn, ${stops})`,
    animationDuration: `${duration}s`,
  };

  // Shared mask that clips a full-box layer down to just the ring edge.
  const ringMask = {
    padding: borderWidth,
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    maskComposite: "exclude",
  };

  return (
    <Tag className={cn("relative", className)}>
      {/* Content layer  overflow hidden so the glow spill is clipped to the
          card shape. Children sit above (z-20) the glow (z-10). */}
      <div className="relative overflow-hidden rounded-[inherit]">
        <div className="relative z-20">{children}</div>

        {showGlow && (
          <div
            aria-hidden="true"
            className="ai-glow-spill-mask pointer-events-none absolute inset-[-40%] z-10 overflow-hidden"
          >
            {/* Blur lives on the spinning layer itself so the filter result is
                cached and only the transform changes per frame. */}
            <div className={cn("conic-spin", spillClassName)} style={spinStyle} />
          </div>
        )}
      </div>

      {/* Gradient border ring  masked to the ring edge only via the
          border-box / content-box exclude trick. The base color fills the
          gradient's transparent gaps so the edge reads continuous. */}
      <div
        aria-hidden="true"
        style={{ backgroundColor: "rgb(var(--color-border))", ...ringMask }}
        className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[inherit]"
      >
        <div className="conic-spin" style={spinStyle} />
      </div>
    </Tag>
  );
}

export default AIGradientBorder;
