"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

/**
 * Aceternity's WorldMap, adapted to Korvane: framer-motion (not motion/react),
 * no next-themes (always dark), a transparent background, and teal derived from
 * the --color-accent token at runtime so it stays theme-driven.
 */
export default function WorldMap({ dots = [], lineColor }) {
  // Mirrors --color-accent; resolved from the token on mount.
  const [accent, setAccent] = useState("45,212,167");

  useEffect(() => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim();
    if (v) setAccent(v.replace(/\s+/g, ","));
  }, []);

  const line = lineColor ?? `rgb(${accent})`;

  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: `rgba(${accent},0.35)`,
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [accent]);

  const projectPoint = (lat, lng) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="relative aspect-[2/1] w-full font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          if (startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
            return null; // single marker  no arc
          }
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
            />
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={line} stopOpacity="0" />
            <stop offset="5%" stopColor={line} stopOpacity="1" />
            <stop offset="95%" stopColor={line} stopOpacity="1" />
            <stop offset="100%" stopColor={line} stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const p = projectPoint(dot.start.lat, dot.start.lng);
          return (
            <g key={`point-${i}`}>
              <circle cx={p.x} cy={p.y} r="2.5" fill={line} />
              <circle cx={p.x} cy={p.y} r="2.5" fill={line} opacity="0.5">
                <animate
                  attributeName="r"
                  from="2.5"
                  to="14"
                  dur="1.8s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.8s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
