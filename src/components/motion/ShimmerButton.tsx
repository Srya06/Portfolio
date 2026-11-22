"use client";

import { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ShimmerButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  shimmerColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function ShimmerButton({
  children,
  onClick,
  className = "",
  shimmerColor = "rgba(0, 240, 255, 0.4)",
  type = "button",
  disabled = false,
}: ShimmerButtonProps) {
  const prefersReduced = useReducedMotion();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] font-semibold text-sm transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      {/* Rotating border shimmer beam */}
      {!prefersReduced && (
        <span
          aria-hidden="true"
          className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${shimmerColor} 180deg, transparent 360deg)`,
          }}
        />
      )}

      {/* Button inner content surface */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-fg w-full h-full font-semibold">
        {children}
      </span>
    </button>
  );
}
