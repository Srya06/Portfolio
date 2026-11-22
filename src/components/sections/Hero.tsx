"use client";

import { ArrowDown, ArrowRight, FileText } from "lucide-react";
import { site } from "@/content/site";
import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AbilityCard } from "@/components/sections/AbilityCard";
import { RoleMarquee } from "@/components/sections/RoleMarquee";

export function Hero() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative pt-10 md:pt-16 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[78vh] py-6 sm:py-12">
          {/* Left Column (Cols 1-7): Narrative, Typography, CTAs */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Status & Position Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line bg-bg-elev/80 backdrop-blur-sm text-xs font-mono text-fg-muted">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-fg font-semibold">{site.name}</span>
              <span className="text-fg-muted/50">/</span>
              <span className="text-accent">{site.role}</span>
            </div>

            {/* Split-Text Display Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-fg leading-[1.04]">
                <TextReveal text="Building useful AI products from models, data, and software." />
              </h1>
            </div>

            {/* Sub-headline / Narrative */}
            <p className="text-base sm:text-lg text-fg-muted max-w-xl leading-relaxed font-normal">
              Specialized in taking real-world problems and constructing production-ready AI applications—combining machine learning pipelines, LLM agentic orchestration, and high-performance full-stack web architectures.
            </p>

            {/* Editorial Discipline Pills */}
            <div className="flex flex-wrap gap-2.5 pt-1 text-xs font-mono text-fg-muted">
              <span className="px-3 py-1 rounded-full border border-line bg-bg-elev/60 text-fg">
                Applied AI &amp; ML Pipelines
              </span>
              <span className="px-3 py-1 rounded-full border border-line bg-bg-elev/60 text-fg">
                Agentic LLM Systems
              </span>
              <span className="px-3 py-1 rounded-full border border-line bg-bg-elev/60 text-fg">
                FastAPI, React &amp; Next.js
              </span>
            </div>

            {/* Call to Actions matching therishithakor.com */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <MagneticButton strength={0.25}>
                <button
                  onClick={scrollToWork}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-fg text-bg font-semibold text-sm transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>See Selected Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-line bg-bg-elev/60 hover:bg-bg-elev text-fg hover:border-fg-muted font-medium text-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>Initiate Contact</span>
                </a>
              </MagneticButton>

              <a
                href={site.resumePath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono text-fg-muted hover:text-accent transition-colors"
                aria-label="View Surya D Resume in PDF format"
              >
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Quick status line */}
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-fg-muted">
              <span>Status: <strong className="text-fg font-medium">{site.availability}</strong></span>
              <span>·</span>
              <span>Mysuru / Bengaluru (IST)</span>
            </div>
          </div>

          {/* Right Column (Cols 8-12): Artisan Ability Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <AbilityCard />
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="py-6 flex items-center justify-between border-t border-line/60 text-xs font-mono text-fg-muted">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>PORTFOLIO WORKBENCH // 6 REPOSITORIES VERIFIED</span>
          </div>

          <button
            onClick={scrollToWork}
            className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg transition-colors"
            aria-label="Scroll down to inspect disciplines"
          >
            <span>DISCIPLINES &amp; WORK</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Role Marquee Banner below Hero */}
      <div className="mt-4">
        <RoleMarquee />
      </div>
    </section>
  );
}
