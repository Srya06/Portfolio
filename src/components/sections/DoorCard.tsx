"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface DoorData {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  accent: string;
  accentColor: string;
  projectCount: number;
  disciplines: readonly string[];
}

interface DoorCardProps {
  door: DoorData;
  index: number;
}

export function DoorCard({ door, index }: DoorCardProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = () => {
    setIsOpen(true);
    router.prefetch(`/work/${door.slug}`);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleNavigate = () => {
    router.push(`/work/${door.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate();
    }
  };

  const numberPadded = (index + 1).toString().padStart(2, "0");

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative shrink-0 w-[290px] sm:w-[320px] aspect-[3/5] select-none py-2"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleNavigate}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-label={`Open ${door.title} category door. Contains ${door.projectCount} verified projects.`}
        className="group relative w-full h-full rounded-2xl border border-line bg-bg-elev/80 p-5 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden transition-all duration-300 hover:border-line/90 shadow-xl"
      >
        {/* Interior Chamber (Revealed when door swings open) */}
        <div
          className="absolute inset-0 p-5 flex flex-col justify-between bg-bg/95 z-0"
          aria-hidden={!isOpen}
        >
          {/* Chamber Artwork */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-line/60 bg-bg">
            <Image
              src={door.image}
              alt={door.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Chamber Content Details */}
          <div className="space-y-3 z-10">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-fg-muted">PROJECTS READY</span>
              <span
                className="px-2 py-0.5 rounded font-bold"
                style={{ color: door.accentColor, backgroundColor: `${door.accentColor}15` }}
              >
                {door.projectCount} Verified
              </span>
            </div>

            <p className="text-xs text-fg-muted line-clamp-2 leading-relaxed">
              {door.blurb}
            </p>

            <div className="flex flex-wrap gap-1">
              {door.disciplines.map((item) => (
                <span
                  key={item}
                  className="px-1.5 py-0.5 rounded border border-line bg-bg text-[10px] font-mono text-fg-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Chamber Action Button */}
          <div
            className="flex items-center justify-between pt-2 border-t border-line text-xs font-mono font-semibold transition-colors"
            style={{ color: door.accentColor }}
          >
            <span>EXPLORE CATEGORY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Swinging Door Front Leaf Panel */}
        <motion.div
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
          }}
          animate={
            prefersReducedMotion
              ? {}
              : isOpen
              ? { rotateY: -28, x: -8 }
              : { rotateY: 0, x: 0 }
          }
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full h-full rounded-xl border border-line/90 bg-gradient-to-br from-bg-elev via-bg to-bg-elev/90 p-5 flex flex-col justify-between shadow-2xl backdrop-blur-md"
        >
          {/* Subtle metallic texture sheen */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-80"
            aria-hidden="true"
          />

          {/* Door Header: Metal Plaque & Serial */}
          <div className="relative z-10 flex items-center justify-between border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent">
                {numberPadded}
              </span>
              <span className="text-[10px] font-mono text-fg-muted uppercase tracking-wider">
                PORTAL
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: door.accentColor }}
              />
              <span className="text-[10px] font-mono text-fg-muted uppercase">
                {door.accent}
              </span>
            </div>
          </div>

          {/* Door Center Plaque & Title */}
          <div className="relative z-10 space-y-3 my-auto py-4">
            <div className="w-10 h-10 rounded-xl bg-bg border border-line flex items-center justify-center text-accent shadow-sm">
              <Layers className="w-5 h-5" style={{ color: door.accentColor }} />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-fg group-hover:text-accent transition-colors">
              {door.title}
            </h3>

            <p className="text-xs text-fg-muted line-clamp-3 leading-relaxed">
              {door.blurb}
            </p>
          </div>

          {/* Door Bottom: Handle & Status Indicator */}
          <div className="relative z-10 pt-4 border-t border-line flex items-center justify-between">
            {/* Visual Door Handle Plate */}
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-7 rounded-sm bg-line/80 border border-line flex items-center justify-center">
                <span className="w-0.5 h-4 bg-accent/60 rounded-full" />
              </div>
              <span className="text-[10px] font-mono text-fg-muted uppercase">
                HOVER TO OPEN
              </span>
            </div>

            <div className="text-[11px] font-mono flex items-center gap-1 text-fg-muted group-hover:text-fg transition-colors">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>{door.projectCount} Repos</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
