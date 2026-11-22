"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BackgroundGrid() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Warm ambient atmosphere pools inspired by therishithakor.com */}
      <div
        className={`absolute -top-32 left-1/4 w-[700px] h-[450px] rounded-full blur-[160px] opacity-25 ${
          prefersReduced ? "" : "animate-pulse"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(214, 178, 110, 0.35) 0%, rgba(164, 85, 44, 0.15) 50%, transparent 70%)",
          animationDuration: "12s",
        }}
      />
      <div
        className={`absolute top-1/3 -right-32 w-[600px] h-[550px] rounded-full blur-[180px] opacity-20 ${
          prefersReduced ? "" : "animate-pulse"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(196, 176, 176, 0.25) 0%, rgba(107, 92, 92, 0.15) 50%, transparent 70%)",
          animationDuration: "15s",
        }}
      />
      <div
        className={`absolute -bottom-40 left-1/3 w-[650px] h-[500px] rounded-full blur-[180px] opacity-15 ${
          prefersReduced ? "" : "animate-pulse"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(214, 178, 110, 0.2) 0%, transparent 70%)",
          animationDuration: "10s",
        }}
      />

      {/* Subtle top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent opacity-60" />
    </div>
  );
}
