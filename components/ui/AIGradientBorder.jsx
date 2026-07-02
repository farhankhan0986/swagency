"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated conic-gradient border with an optional inner glow spill.
 *
 * The rotating angle is driven by a Framer Motion value so the border
 * spins without triggering a React re-render. Under `prefers-reduced-motion`
 * the gradient is frozen on a pleasant static slice.
 *
 * Requires the `.ai-glow-spill-mask` utility in globals.css for the glow mask.
 * Shared by `LiveAIBox` and `Navbar`.
 *
 * @param {object}  props
 * @param {React.ReactNode} props.children
 * @param {string}  [props.className]           - classes applied to the root wrapper
 * @param {string}  [props.stops]               - custom conic-gradient stop string
 * @param {boolean} [props.showGlow=true]        - toggle the inner glow spill
 * @param {string}  [props.spillClassName]       - extra classes for the glow layer
 * @param {number}  [props.duration=5]           - seconds for one full revolution
 * @param {string}  [props.borderWidth="1.5px"]  - width of the gradient border ring
 * @param {boolean} [props.pauseOnHover=false]   - freeze the spin while hovered
 * @param {string}  [props.as="div"]             - root element tag ("div" | "section" | …)
 */

// One long, calm arc — the default, used by the LiveAIBox card.
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
  pauseOnHover = false,
  glowOnHover = false,
  as: Tag = "div",
}) {
  const reduce = useReducedMotion();
  const turn = useMotionValue(0);
  // Keep a ref to the animation controls so we can pause/resume on hover.
  const controlsRef = useRef(null);

  useEffect(() => {
    if (reduce) {
      turn.set(0.12); // a pleasant static slice of the gradient
      return;
    }

    controlsRef.current = animate(turn, 1, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });

    return () => {
      controlsRef.current?.stop();
    };
    // `turn` is a stable MotionValue instance — intentionally excluded from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, reduce]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && controlsRef.current) controlsRef.current.pause();
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && controlsRef.current) controlsRef.current.play();
  }, [pauseOnHover]);

  const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, ${stops})`;

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
    <Tag
      className={cn("relative", glowOnHover && "group", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Content layer — overflow hidden so the glow spill is clipped to the
          card shape. Children sit above (z-20) the glow (z-10). */}
      <div className="relative overflow-hidden rounded-[inherit]">
        <div className="relative z-20">{children}</div>

        {showGlow && (
          <motion.div
            aria-hidden="true"
            style={{ backgroundImage: gradient }}
            className={cn(
              "ai-glow-spill-mask pointer-events-none absolute inset-[-40%] z-10 overflow-hidden",
              spillClassName
            )}
          />
        )}
      </div>

      {/* Gradient border ring — masked to the ring edge only via the
          border-box / content-box exclude trick. */}
      {glowOnHover ? (
        <>
          {/* Static base ring — the plain resting border. */}
          <div
            aria-hidden="true"
            style={{ backgroundColor: "rgb(var(--color-border))", ...ringMask }}
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit]"
          />
          {/* Moving glow line — hidden until the wrapper is hovered. */}
          <motion.div
            aria-hidden="true"
            style={{ backgroundImage: gradient, ...ringMask }}
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </>
      ) : (
        /* Always-on ring: base color fills the gradient's transparent gaps so
           the edge reads continuous. */
        <motion.div
          aria-hidden="true"
          style={{
            backgroundColor: "rgb(var(--color-border))",
            backgroundImage: gradient,
            ...ringMask,
          }}
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit]"
        />
      )}
    </Tag>
  );
}

export default AIGradientBorder;
