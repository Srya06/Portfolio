"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const items = [
  "APPLIED AI & MACHINE LEARNING",
  "AGENTIC SYSTEMS & ORCHESTRATION",
  "FULL-STACK WEB PRODUCTS",
  "COMPUTER VISION & LESION DIAGNOSTICS",
  "PYTHON, FASTAPI & REST APIS",
  "INTELLIGENT RECRUITMENT & FORECASTING",
];

export function RoleMarquee() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="py-4 border-y border-line bg-bg-elev/40 overflow-hidden font-mono text-xs text-fg-muted">
        <div className="flex gap-8 justify-center flex-wrap px-4">
          {items.slice(0, 3).map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="text-accent">✦</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden border-y border-line/60 bg-bg-elev/30 py-4 backdrop-blur-sm select-none">
      <div className="flex w-max">
        <motion.div
          className="flex shrink-0 items-center gap-8 pr-8 text-xs font-mono tracking-wider text-fg-muted"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 28,
            ease: "linear",
          }}
        >
          {items.concat(items).concat(items).map((item, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="hover:text-fg transition-colors uppercase font-medium">{item}</span>
              <span className="text-accent text-sm" aria-hidden="true">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
