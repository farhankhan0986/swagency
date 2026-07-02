"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wraps the app in Lenis smooth scrolling.
 *
 * Lenis still drives the *native* document scroll position, which means
 * Framer Motion's `useScroll` and any scroll listeners keep working — we get
 * weighty, cinematic inertia without forking the scroll source of truth.
 *
 * When the visitor prefers reduced motion we never instantiate Lenis and let
 * the browser scroll natively.
 */
export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      // Long, gentle easing — feels like drifting, not snapping.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScrollProvider;
