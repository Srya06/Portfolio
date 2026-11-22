"use client";

import { useState } from "react";
import { ArrowRight, Mail, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import { site } from "@/content/site";
import { needOptions } from "@/content/contact";
import { ProjectNeed } from "@/lib/validators";
import { ContactFlow } from "./ContactFlow";

export function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<ProjectNeed>("ai-ml");

  const handleOpenWithNeed = (need: ProjectNeed) => {
    setSelectedNeed(need);
    setIsOpen(true);
  };

  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-bg-elev/80 to-bg-elev/30 p-8 sm:p-12 lg:p-16 backdrop-blur-sm">
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-success/30 bg-success/10 text-xs font-mono text-success">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>Available for Roles &amp; Projects</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-bg text-xs font-mono text-fg-muted">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>&lt; 24h Response Rate</span>
            </span>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-4">
            <p className="text-xs font-mono text-accent uppercase tracking-widest">
              04 / Collaboration Flow
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-fg leading-tight">
              Ready to construct intelligent systems?
            </h2>
            <p className="text-sm sm:text-base text-fg-muted max-w-xl mx-auto leading-relaxed">
              Seeking opportunities in applied machine learning, agentic LLM architectures, and full-stack engineering. Start an inquiry or drop a line directly.
            </p>
          </div>

          {/* Quick Category Chips */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-mono text-fg-muted uppercase tracking-wider">
              Pick an area to tailor requirements:
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {needOptions.slice(0, 5).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleOpenWithNeed(opt.id)}
                  className="px-3.5 py-1.5 rounded-full border border-line bg-bg/80 text-xs font-mono text-fg hover:border-accent hover:text-accent transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  + {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setSelectedNeed("ai-ml");
                setIsOpen(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-accent text-accent-fg font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Interactive Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`mailto:${site.email}?subject=Project Collaboration with Surya`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-line bg-bg hover:border-fg-muted/60 text-sm font-semibold text-fg transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Mail className="w-4 h-4 text-fg-muted" />
              <span>Email Directly ({site.email})</span>
            </a>
          </div>

          {/* Trust points */}
          <div className="pt-6 border-t border-line/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left sm:text-center text-xs font-mono text-fg-muted">
            <div className="flex items-center sm:justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>Strict NDA &amp; IP Protection</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>Clear Scope &amp; Deliverables</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>Zero-Spam Honeypot Gate</span>
            </div>
          </div>
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
