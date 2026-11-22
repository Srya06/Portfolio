"use client";

import { ArrowDown, ArrowRight, FileText, Sparkles, Terminal } from "lucide-react";
import { site } from "@/content/site";
import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ShimmerButton } from "@/components/motion/ShimmerButton";
import { AbilityCard } from "@/components/sections/AbilityCard";
import { RoleMarquee } from "@/components/sections/RoleMarquee";

export function Hero() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative pt-12 md:pt-20 pb-0 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/5 rounded-full blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh] py-8">
          {/* Left Column (Cols 1-7): Narrative, Typography, CTAs */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Status & Position Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-bg-elev/80 backdrop-blur-sm text-xs font-mono text-fg-muted">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-accent font-semibold">{site.name}</span>
              <span className="text-fg-muted/60">/</span>
              <span>{site.role}</span>
            </div>

            {/* Split-Text Display Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-fg leading-[1.08]">
                <TextReveal text="Building useful AI products from models, data, and software." />
              </h1>
            </div>

            {/* Sub-headline / Narrative */}
            <p className="text-base sm:text-lg text-fg-muted max-w-xl leading-relaxed font-normal">
              Specialized in taking real-world problems and constructing production-ready AI applications—combining machine learning pipelines, LLM agentic orchestration, and high-performance full-stack web architectures.
            </p>

            {/* Key Value Proposition Chips */}
            <div className="flex flex-wrap gap-3 pt-1 text-xs font-mono text-fg-muted">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-line bg-bg-elev/50">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span>Python &amp; ML Pipelines</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-line bg-bg-elev/50">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Agentic LLM Systems</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-line bg-bg-elev/50">
                <span className="text-accent font-bold">API</span>
                <span>FastAPI, React &amp; Next.js</span>
              </div>
            </div>

            {/* Magnetic Call to Actions with 21st.dev Shimmer Button */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <MagneticButton strength={0.25}>
                <ShimmerButton onClick={scrollToWork}>
                  <span>See Selected Work</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-line bg-bg-elev text-fg hover:border-accent hover:text-accent font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>Initiate Contact</span>
                </a>
              </MagneticButton>

              <a
                href={site.resumePath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono text-fg-muted hover:text-fg transition-colors"
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

          {/* Right Column (Cols 8-12): 3D Ability Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <AbilityCard />
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="py-6 flex items-center justify-between border-t border-line/40 text-xs font-mono text-fg-muted">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>PORTFOLIO WORKBENCH // 6 REPOSITORIES VERIFIED</span>
          </div>

          <button
            onClick={scrollToWork}
            className="inline-flex items-center gap-1.5 text-fg-muted hover:text-accent transition-colors"
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
