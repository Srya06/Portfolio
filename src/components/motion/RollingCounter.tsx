"use client";

import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RollingCounterProps {
  current: number;
  total: number;
  className?: string;
}

export function RollingCounter({ current, total, className = "" }: RollingCounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const currentPadded = current.toString().padStart(2, "0");
  const totalPadded = total.toString().padStart(2, "0");

  if (prefersReducedMotion) {
    return (
      <div className={`font-mono font-extrabold text-fg select-none ${className}`}>
        <span>{currentPadded}</span>
        <span className="text-accent text-3xl font-light">/{totalPadded}</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-baseline font-mono font-extrabold text-fg select-none ${className}`}>
      {/* Sliding current digits */}
      <div className="relative h-[1.1em] overflow-hidden inline-flex">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={currentPadded}
            initial={{ y: "80%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-80%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {currentPadded}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Static total divider */}
      <span className="text-accent text-2xl sm:text-4xl font-light ml-1 font-sans">
        /{totalPadded}
      </span>
    </div>
  );
}
