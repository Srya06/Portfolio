"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ContactFlow } from "./ContactFlow";
import { ProjectNeed } from "@/lib/validators";

export function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNeed] = useState<ProjectNeed>("ai-ml");

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 pb-12 select-none">
      <div className="relative max-w-4xl space-y-7 text-left">
        {/* Eyebrow badge matching frame-01-50.0.png */}
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A8A196]">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>AVAILABLE FOR NEW WORK</span>
        </div>

        {/* Huge Bold Headlines matching frame-01-50.0.png */}
        <div className="space-y-1">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-sans leading-[1.05]">
            Need something built?
          </h2>
          <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#8A847C] font-sans leading-[1.05]">
            Let&apos;s make it happen.
          </h3>
        </div>

        {/* Subtext description */}
        <p className="text-sm sm:text-base text-[#C4BFB6] max-w-xl font-normal leading-relaxed">
          I&apos;m available for engineering work: web apps, autonomous agentic systems, predictive ML and computer vision. Tell me what you need and I&apos;ll get back to you within a day.
        </p>

        {/* Action Buttons matching frame-01-50.0.png */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Solid White Hire me button with black circle arrow */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2.5 rounded-full bg-[#FAF8F5] text-[#1A1818] font-bold text-sm tracking-tight transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Hire me</span>
            <span className="w-8 h-8 rounded-full bg-[#1A1818] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </span>
          </button>

          {/* Outline pill button */}
          <button
            type="button"
            onClick={scrollToWork}
            className="inline-flex items-center px-6 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>See my work</span>
          </button>
        </div>
      </div>

      {/* Interactive Modal Dialog */}
      <ContactFlow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialNeed={selectedNeed}
      />
    </section>
  );
}
