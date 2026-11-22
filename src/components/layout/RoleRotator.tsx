"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const roles = [
  "AI/ML Engineer",
  "Full-Stack Developer",
  "Applied AI & Agentic Systems",
  "Python & System Architecture",
];

export function RoleRotator() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  if (prefersReducedMotion) {
    return (
      <span className="text-xs font-mono text-fg-muted uppercase tracking-wider">
        {roles[0]}
      </span>
    );
  }

  return (
    <div className="relative h-5 overflow-hidden text-xs font-mono text-fg-muted uppercase tracking-wider flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-accent font-medium"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
