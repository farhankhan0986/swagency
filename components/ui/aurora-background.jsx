"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

/**
 * Aceternity's aurora background, adapted to Korvane's token system.
 *
 * Changes from the stock component:
 *  - Token-driven, teal/emerald. Gradient stops come from --color-accent /
 *    --color-accent-2; the striping uses --color-background. No hex, no blue.
 *  - Always dark: the light/invert path and zinc backgrounds are removed.
 *  - Perf: the stock component animates background-position on a full-screen
 *    blurred, blend-mode layer  a whole-screen repaint every frame. Here the
 *    two gradient layers are oversized, painted once, and drift via
 *    transform-only keyframes (.aurora-layer--a / --b in globals.css), so the
 *    animation runs entirely on the compositor.
 *  - Pointer reactive: a damped parallax translate on the aurora wrapper.
 *    Cursor position is eased toward via requestAnimationFrame and written to
 *    --pointer-x / --pointer-y on the root (no React state, no re-renders).
 *  - Respects prefers-reduced-motion: no listener, drift frozen in globals.css.
 */
export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  const surfaceRef = useRef(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return; // freeze on a static frame

    let targetX = 0.5;
    let targetY = 0.5;
    let curX = 0.5;
    let curY = 0.5;
    let rafId = null;
    let running = false;

    const render = () => {
      // Small lerp factor => real lag, a gentle response, not cursor chasing.
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      surface.style.setProperty("--pointer-x", curX.toFixed(4));
      surface.style.setProperty("--pointer-y", curY.toFixed(4));

      if (
        Math.abs(targetX - curX) > 0.0004 ||
        Math.abs(targetY - curY) > 0.0004
      ) {
        rafId = requestAnimationFrame(render);
      } else {
        running = false;
      }
    };

    const ensureRunning = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const onPointerMove = (e) => {
      if (e.pointerType === "touch") return; // pointer layer doesn't apply on touch
      const rect = surface.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = (e.clientY - rect.top) / rect.height;
      ensureRunning();
    };

    surface.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      surface.removeEventListener("pointermove", onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const layerStyle = {
    backgroundImage: "var(--dark-gradient), var(--aurora)",
    backgroundSize: "300% 100%, 200% 100%",
    backgroundPosition: "50% 50%, 50% 50%",
  };

  return (
    <div
      ref={surfaceRef}
      className={cn(
        "relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]",
        className
      )}
      style={{ "--pointer-x": 0.5, "--pointer-y": 0.5 }}
      {...props}
    >
      {/* Parallax wrapper  the damped pointer translate lives here so it never
          collides with the layers' own drift animation. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[8%]"
        style={{
          transform:
            "translate3d(calc((var(--pointer-x, 0.5) - 0.5) * 9%), calc((var(--pointer-y, 0.5) - 0.5) * 9%), 0)",
          "--aurora":
            "repeating-linear-gradient(100deg, rgb(var(--color-accent) / 0.6) 10%, rgb(var(--color-accent-2) / 0.3) 15%, rgb(var(--color-accent) / 0.5) 20%, rgb(var(--color-accent-2) / 0.25) 25%, rgb(var(--color-accent) / 0.55) 30%)",
          "--dark-gradient":
            "repeating-linear-gradient(100deg, rgb(var(--color-background)) 0%, rgb(var(--color-background)) 7%, transparent 10%, transparent 12%, rgb(var(--color-background)) 16%)",
        }}
      >
        {/* Static mask + group opacity live on this wrapper; the moving layers
            inside are transform-only. */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden opacity-50",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_70%)]"
          )}
        >
          {/* Base banding  slow horizontal drift */}
          <div
            className="aurora-layer aurora-layer--a absolute left-[-60%] top-[-20%] h-[140%] w-[220%] blur-[10px] will-change-transform"
            style={layerStyle}
          />
          {/* Interference layer  different scale + speed, blended for the
              shimmering banding the stock aurora gets from its ::after */}
          <div
            className="aurora-layer aurora-layer--b absolute left-[-60%] top-[-20%] h-[140%] w-[220%] mix-blend-difference blur-[10px] will-change-transform"
            style={{
              ...layerStyle,
              backgroundSize: "200% 100%, 100% 100%",
            }}
          />
        </div>
      </div>

      {/* Film grain  neutral, very low opacity. Adds premium texture and
          breaks up the flat gradient banding. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      ></div>

      {/* Grounding vignette  keeps the eye centered on the content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgb(var(--color-background) / 0.7) 100%)",
        }}
      ></div>

      {children}
    </div>
  );
};

export default AuroraBackground;
