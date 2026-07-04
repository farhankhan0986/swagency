"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Aceternity's CometCard, adapted to Korvane: framer-motion (not motion/react),
 * Tailwind v3 arbitrary properties for the 3D setup (the v4 `perspective-*` /
 * `transform-3d` utilities don't exist here), a softer glare, and a static
 * fallback under prefers-reduced-motion.
 */
export const CometCard = ({
  rotateDepth = 17.5,
  translateDepth = 20,
  className,
  children,
}) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`]
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`]
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 10%, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0) 75%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Reduced motion: no tilt, no glare  just render the content.
  if (reduce) {
    return (
      <div className={cn("[perspective:1200px]", className)}>
        <div className="relative rounded-2xl">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "[perspective:1200px] [transform-style:preserve-3d]",
        className
      )}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
          boxShadow:
            "rgba(0,0,0,0.04) 0px 40px 60px 0px, rgba(0,0,0,0.26) 0px 20px 40px 0px, rgba(0,0,0,0.3) 0px 8px 20px 0px",
        }}
        initial={{ scale: 1, z: 0 }}
        whileHover={{ scale: 1.04, z: 50, transition: { duration: 0.2 } }}
        className="relative rounded-2xl"
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-2xl mix-blend-overlay"
          style={{ background: glareBackground, opacity: 0.4 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

export default CometCard;
