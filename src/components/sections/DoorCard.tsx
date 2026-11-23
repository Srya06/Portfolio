"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { DoorItem } from "@/content/doors";

interface DoorCardProps {
  door: DoorItem;
  index?: number;
  isActive?: boolean;
  onActivate?: () => void;
  onDeactivate?: () => void;
  isAnyActive?: boolean;
}

export function DoorCard({
  door,
  index = 0,
  isActive = false,
  onActivate = () => {},
  isAnyActive = false,
}: DoorCardProps) {
  void index;
  const router = useRouter();
  const prefersReduced = useReducedMotion();

  const handleNavigate = () => {
    router.push(`/work/${door.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isActive) {
        onActivate();
      } else {
        handleNavigate();
      }
    }
  };

  return (
    <div
      className={`relative shrink-0 transition-all duration-500 ease-out flex items-center justify-center select-none ${
        isActive
          ? "w-full md:w-[620px] z-30"
          : isAnyActive
          ? "w-[160px] sm:w-[200px] opacity-40 hover:opacity-80 scale-95 z-10"
          : "w-[220px] sm:w-[260px] md:w-[280px] z-20"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        {/* The Arched Roman Door Unit */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            if (!isActive) {
              onActivate();
            } else {
              handleNavigate();
            }
          }}
          onMouseEnter={onActivate}
          onKeyDown={handleKeyDown}
          aria-label={`${door.title} architectural door. Click to enter.`}
          aria-expanded={isActive}
          style={{ perspective: 1400 }}
          className="relative w-[220px] sm:w-[260px] aspect-[9/18] rounded-t-full bg-[#181616] p-2.5 sm:p-3 border-2 border-[#2C2727] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
        >
          {/* Arched Inner Jamb / Door Frame */}
          <div className="relative w-full h-full rounded-t-full bg-[#100E0E] overflow-hidden border border-[#221F1F] shadow-inner">
            {/* Interior Room / Chamber behind open door */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#141212] via-[#0E0C0C] to-[#0A0909] flex flex-col items-center justify-center p-4">
              <div
                className="w-24 h-24 rounded-full blur-2xl opacity-40"
                style={{ backgroundColor: door.accentColor }}
              />
              {/* 'Click to enter' pill button visible when door swings open */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.3 }}
                    className="z-20 -mt-10"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate();
                      }}
                      className="px-4 py-2 rounded-full bg-[#FAF8F5] text-[#1A1818] font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5"
                    >
                      <span>Click to enter</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* The Swinging 3D Door Slab */}
            <motion.div
              initial={false}
              animate={
                isActive && !prefersReduced
                  ? { rotateY: -62, scaleX: 0.96 }
                  : { rotateY: 0, scaleX: 1 }
              }
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transformOrigin: "left center",
                backgroundColor: door.doorColor,
              }}
              className="absolute inset-0 rounded-t-full shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col items-center justify-between py-6 px-4 cursor-pointer"
            >
              {/* Fluted Vertical Panel Lines Texture */}
              <div
                className="absolute inset-0 rounded-t-full opacity-35 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, transparent, transparent 15px, rgba(0, 0, 0, 0.4) 15px, rgba(0, 0, 0, 0.4) 17px)",
                }}
              />

              {/* Polished Brass Engraved Nameplate at Top Center */}
              <div className="relative z-10 mt-6 sm:mt-8 px-3.5 py-1.5 rounded-sm bg-gradient-to-br from-[#F5D77F] via-[#D4AC0D] to-[#9A7D0A] border border-[#FFE8A3] shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center">
                {/* Brass screw rivets */}
                <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-[#7D6608]" />
                <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#7D6608]" />
                <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-[#7D6608]" />
                <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-[#7D6608]" />

                <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-[#2A1F05] uppercase font-sans text-center px-1">
                  {door.plateTitle || door.title}
                </span>
              </div>

              {/* Brass Door Lever Handle & Keyhole */}
              <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                {/* Horizontal lever */}
                <div className="relative flex items-center">
                  <div className="w-9 sm:w-11 h-2 rounded-full bg-gradient-to-r from-[#D4AC0D] via-[#F5D77F] to-[#9A7D0A] shadow-[0_3px_6px_rgba(0,0,0,0.6)] border border-[#FFE8A3]/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9A7D0A] -ml-1 border border-[#D4AC0D]" />
                </div>
                {/* Vertical keyhole escutcheon plate */}
                <div className="w-3.5 h-6 rounded-sm bg-gradient-to-b from-[#F5D77F] via-[#D4AC0D] to-[#9A7D0A] mt-2 shadow-md flex items-center justify-center border border-[#FFE8A3]/30">
                  <div className="w-1.5 h-2.5 bg-[#2A1F05] rounded-t-full rounded-b-xs" />
                </div>
              </div>

              {/* Bottom Base Hairline */}
              <div className="w-full h-1 bg-black/20 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Revealed Category Overview Panel (Appears next to the opened door) */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full md:w-[320px] space-y-4 text-left p-2"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-fg font-sans">
                  {door.title}
                </h3>
                <p className="text-[11px] font-mono text-accent uppercase tracking-wider mt-1">
                  {door.subtitle}
                </p>
              </div>

              {/* Checklist */}
              <ul className="space-y-2 pt-1">
                {door.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-fg-muted font-normal">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  onClick={handleNavigate}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF8F5] text-[#1A1818] font-bold text-xs hover:bg-white transition-all shadow-md active:scale-95"
                >
                  <span>Enter discipline portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
