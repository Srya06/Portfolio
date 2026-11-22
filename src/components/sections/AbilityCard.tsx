"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "motion/react";
import { Cpu, Sparkles, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AbilityCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [specularPos, setSpecularPos] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();

  // Motion values for smooth 3D tilt
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize from -1 to 1
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    // ±12 degree tilt
    rawRotateX.set(-normalizedY * 12);
    rawRotateY.set(normalizedX * 12);

    // Specular light position in percentage
    setSpecularPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
    setSpecularPos({ x: 50, y: 50 });
  };

  const handleClick = () => {
    const workSection = document.getElementById("work");
    workSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const skills = [
    "Python & PyTorch",
    "Agentic LLMs",
    "FastAPI & Node",
    "Full-Stack Web",
    "Demand Forecasting",
  ];

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative flex items-center justify-center p-4 select-none"
    >
      <motion.div
        ref={cardRef}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Surya D interactive ability identification card. Click to explore work."
        animate={
          prefersReducedMotion
            ? {}
            : isHovered
            ? { y: -6 }
            : { y: [-3, 3, -3] }
        }
        transition={
          prefersReducedMotion
            ? {}
            : isHovered
            ? { duration: 0.2 }
            : { repeat: Infinity, duration: 6, ease: "easeInOut" }
        }
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-full max-w-[340px] sm:max-w-[370px] aspect-[5/7] rounded-3xl p-6 flex flex-col justify-between cursor-pointer border border-line bg-gradient-to-b from-bg-elev/90 via-bg-elev/60 to-bg/95 shadow-2xl backdrop-blur-xl transition-shadow hover:shadow-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden"
      >
        {/* Dynamic Holographic Specular Sheen */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 opacity-60 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${specularPos.x}% ${specularPos.y}%, rgba(0, 240, 255, 0.18) 0%, rgba(168, 85, 247, 0.08) 40%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Ambient Holographic Border Edge */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl border border-accent/20 group-hover:border-accent/60 transition-colors"
          aria-hidden="true"
        />

        {/* Card Header: Identifier & Chip */}
        <div className="relative z-10 flex items-center justify-between border-b border-line/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-bg border border-line flex items-center justify-center text-accent">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-wider text-fg-muted uppercase">
                ENGINEERING IDENTIFIER
              </span>
              <span className="text-[11px] font-mono font-bold text-accent">
                SYA-2026 // APPLIED AI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-line bg-bg text-[10px] font-mono text-fg-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span>ACTIVE</span>
          </div>
        </div>

        {/* Card Center: Portrait & Visual Scanline */}
        <div className="relative z-10 my-auto flex flex-col items-center py-2 space-y-4">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-line bg-bg shadow-inner">
            <Image
              src="/images/hero.svg"
              alt="Surya D stylized AI engineering portrait"
              fill
              priority
              className="object-cover"
            />
            {/* Subtle holographic scanline overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent animate-pulse"
              aria-hidden="true"
            />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fg flex items-center justify-center gap-1.5">
              <span>{site.name}</span>
              <Sparkles className="w-4 h-4 text-accent" />
            </h2>
            <p className="text-xs font-mono text-accent">
              {site.role}
            </p>
            <p className="text-[11px] text-fg-muted font-mono">
              MIT Mysore (VTU) · Mysuru / Bengaluru
            </p>
          </div>
        </div>

        {/* Card Skills Chips */}
        <div className="relative z-10 space-y-2 pt-2 border-t border-line/60">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md border border-line/80 bg-bg/80 text-[10px] font-mono text-fg-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Barcode & Prompt */}
        <div className="relative z-10 pt-3 flex items-center justify-between text-[10px] font-mono text-fg-muted">
          <div className="flex items-center gap-1">
            {/* Minimalistic SVG barcode representation */}
            <div className="flex items-center gap-[2px] h-3.5" aria-hidden="true">
              <span className="w-[2px] h-full bg-fg-muted" />
              <span className="w-[1px] h-full bg-fg-muted" />
              <span className="w-[3px] h-full bg-fg-muted" />
              <span className="w-[1px] h-full bg-fg-muted" />
              <span className="w-[2px] h-full bg-fg-muted" />
              <span className="w-[4px] h-full bg-fg-muted" />
              <span className="w-[1px] h-full bg-fg-muted" />
              <span className="w-[2px] h-full bg-fg-muted" />
            </div>
            <span className="text-[9px] text-fg-muted/60">849204</span>
          </div>

          <div className="inline-flex items-center gap-1 text-accent font-semibold group-hover:translate-x-1 transition-transform">
            <span>ENTER WORKBENCH</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
