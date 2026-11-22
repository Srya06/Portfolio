"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AbilityCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [specularPos, setSpecularPos] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();

  // Motion values for silky smooth 3D tilt
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 220, mass: 0.25 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    // ±14 degree tilt
    rawRotateX.set(-normalizedY * 14);
    rawRotateY.set(normalizedX * 14);

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
      {/* Warm ambient aura halo inspired by therishithakor.com */}
      <div
        className="pointer-events-none absolute -inset-6 sm:-inset-10 rounded-full opacity-70 blur-3xl transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(54% 44% at 50% 46%, rgba(230, 176, 110, 0.42), rgba(154, 98, 74, 0.16) 45%, transparent 72%)",
        }}
        aria-hidden="true"
      />

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
            ? { y: -8, scale: 1.015 }
            : { y: [-4, 4, -4] }
        }
        transition={
          prefersReducedMotion
            ? {}
            : isHovered
            ? { duration: 0.25 }
            : { repeat: Infinity, duration: 6.5, ease: "easeInOut" }
        }
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-full max-w-[340px] sm:max-w-[375px] aspect-[1040/1452] rounded-[2rem] p-6 sm:p-7 flex flex-col justify-between cursor-pointer border border-[#D6B26E]/30 bg-gradient-to-b from-[#282221] via-[#1C1818] to-[#120F0F] shadow-[0_34px_70px_-26px_rgba(0,0,0,0.9),0_4px_14px_-6px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B26E] overflow-hidden"
      >
        {/* Fine gold rim highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem] border border-[#D6B26E]/20 shadow-[inset_0_0_0_1px_rgba(255,226,170,0.2),inset_0_0_24px_-6px_rgba(0,0,0,0.6)]"
          aria-hidden="true"
        />

        {/* Dynamic Holographic Specular Glint & Sheen */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem] transition-opacity duration-300 opacity-40 group-hover:opacity-85 mix-blend-screen"
          style={{
            background: `radial-gradient(circle at ${specularPos.x}% ${specularPos.y}%, rgba(255, 243, 212, 0.45) 0%, rgba(214, 178, 110, 0.18) 35%, transparent 68%)`,
          }}
          aria-hidden="true"
        />

        {/* Card Header: Gold Badge & Status */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#D6B26E]/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D6B26E]" />
            <span className="text-[11px] font-mono tracking-widest text-[#D6B26E] uppercase font-semibold">
              SURYA D // COLLECTOR #01
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-line bg-black/40 text-[10px] font-mono text-[#E8E4E0]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7FB069] animate-pulse" />
            <span>ACTIVE</span>
          </div>
        </div>

        {/* Card Center: Portrait & Visual Scanline */}
        <div className="relative z-10 my-auto flex flex-col items-center py-2 space-y-4">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-[#D6B26E]/25 bg-black/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/hero.svg"
              alt="Surya D stylized AI engineering portrait"
              fill
              priority
              className="object-cover"
            />
            {/* Subtle soft light wash */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-[#D6B26E]/10"
              aria-hidden="true"
            />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-[#E8E4E0] flex items-center justify-center gap-1.5">
              <span>{site.name}</span>
              <Sparkles className="w-4 h-4 text-[#D6B26E]" />
            </h2>
            <p className="text-xs font-mono text-[#D6B26E] tracking-wide">
              {site.role}
            </p>
            <p className="text-[11px] text-[#9E918E] font-mono">
              MIT Mysore (VTU) · Mysuru / Bengaluru
            </p>
          </div>
        </div>

        {/* Card Skills Chips */}
        <div className="relative z-10 space-y-2 pt-2 border-t border-[#D6B26E]/15">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded-full border border-line bg-black/30 text-[10px] font-mono text-[#E8E4E0]/80 hover:border-[#D6B26E]/40 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Barcode & Prompt */}
        <div className="relative z-10 pt-3 flex items-center justify-between text-[10px] font-mono text-[#9E918E]">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-[2px] h-3.5 opacity-60" aria-hidden="true">
              <span className="w-[2px] h-full bg-[#E8E4E0]" />
              <span className="w-[1px] h-full bg-[#E8E4E0]" />
              <span className="w-[3px] h-full bg-[#E8E4E0]" />
              <span className="w-[1px] h-full bg-[#E8E4E0]" />
              <span className="w-[2px] h-full bg-[#E8E4E0]" />
              <span className="w-[4px] h-full bg-[#E8E4E0]" />
              <span className="w-[1px] h-full bg-[#E8E4E0]" />
            </div>
            <span className="text-[9px] text-[#9E918E]/60 tracking-wider">SYA-2026</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[#D6B26E] font-semibold group-hover:translate-x-1 transition-transform">
            <span>ENTER WORKBENCH</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
