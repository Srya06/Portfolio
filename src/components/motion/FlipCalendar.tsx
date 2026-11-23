"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ROLES = [
  { title: "AI/ML Engineer", page: "01 / 04" },
  { title: "Full-Stack Developer", page: "02 / 04" },
  { title: "Agentic Systems Builder", page: "03 / 04" },
  { title: "Computer Vision Specialist", page: "04 / 04" },
] as const;

export function FlipCalendar() {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  const currentRole = ROLES[index];
  const totalRings = 11;

  const handleNextPage = () => {
    setIndex((prev) => (prev + 1) % ROLES.length);
  };

  return (
    <div
      onClick={handleNextPage}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNextPage();
        }
      }}
      className="relative cursor-pointer select-none group w-full max-w-[460px] pt-4"
      aria-label={`Current discipline: ${currentRole.title}. Click to flip desk calendar.`}
    >
      {/* Background shadow & depth stack */}
      <div className="absolute inset-x-2 -bottom-2 h-14 bg-black/40 blur-xl rounded-3xl" />
      <div className="absolute inset-x-1.5 bottom-0 h-full rounded-2xl bg-[#E0DCD6] -rotate-1 translate-y-1 shadow-md opacity-80" />

      {/* Main White Calendar Desk Card */}
      <div className="relative rounded-2xl bg-[#F6F4F0] text-[#1A1818] border border-[#DDD8D0] px-6 sm:px-8 pt-7 pb-6 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        {/* Top Wire-O Spiral Rings */}
        <div className="absolute -top-1.5 inset-x-4 flex justify-between px-2 pointer-events-none z-20">
          {Array.from({ length: totalRings }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Metallic Ring Loop */}
              <div className="w-2.5 h-6 rounded-full bg-gradient-to-r from-[#B0A8A0] via-[#F5F2EB] to-[#8C847C] shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-[#C5BCB4]" />
              {/* Punched Hole in Paper */}
              <div className="w-2.5 h-1.5 rounded-full bg-[#1A1818]/60 -mt-2 shadow-inner" />
            </div>
          ))}
        </div>

        {/* Flipped Content Leaf */}
        <div className="min-h-[74px] sm:min-h-[88px] flex items-center justify-start mt-2" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRole.title}
              initial={prefersReduced ? { opacity: 0 } : { rotateX: -65, opacity: 0, y: -6 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { rotateX: 65, opacity: 0, y: 6 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform, opacity",
              }}
              className="w-full flex items-center justify-between"
            >
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight text-[#1A1818] leading-tight font-sans">
                {currentRole.title}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Page Indicator */}
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#E8E2D9] text-[11px] font-mono text-[#7A6F6D]">
          <span className="opacity-0 sm:opacity-100 uppercase tracking-widest text-[10px]">
            CLICK TO FLIP
          </span>
          <span className="font-semibold tracking-wider">
            {currentRole.page}
          </span>
        </div>
      </div>
    </div>
  );
}
