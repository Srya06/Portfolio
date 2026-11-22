"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BackgroundGrid() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Ambient gradient aura spotlights */}
      <div
        className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-accent/[0.04] rounded-full blur-[140px] ${
          prefersReduced ? "" : "animate-pulse"
        }`}
        style={{ animationDuration: "8s" }}
      />
      <div
        className={`absolute top-1/2 -right-40 w-[600px] h-[500px] bg-accent/[0.025] rounded-full blur-[160px] ${
          prefersReduced ? "" : "animate-pulse"
        }`}
        style={{ animationDuration: "12s" }}
      />
      <div
        className={`absolute -bottom-40 -left-40 w-[600px] h-[500px] bg-accent/[0.03] rounded-full blur-[160px] ${
          prefersReduced ? "" : "animate-pulse"
        }`}
        style={{ animationDuration: "10s" }}
      />

      {/* Retro-grid SVG pattern */}
      <svg
        className="absolute inset-0 w-full h-full stroke-fg/[0.035] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] opacity-70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="portfolio-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#portfolio-grid-pattern)" />
      </svg>

      {/* Subtle top horizontal beam line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </div>
  );
}
