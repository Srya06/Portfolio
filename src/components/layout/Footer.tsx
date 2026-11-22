"use client";

import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, FileText } from "lucide-react";
import { site } from "@/content/site";
import { doors } from "@/content/doors";
import { Clock } from "@/components/layout/Clock";
import { AvailabilityPill } from "@/components/layout/AvailabilityPill";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-line bg-bg-elev/40 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-line/60">
          {/* Col 1: Bio & Positioning */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-bg-elev border border-line flex items-center justify-center font-mono text-xs font-bold text-accent">
                S
              </span>
              <span className="font-semibold text-sm tracking-tight text-fg">
                {site.name}
              </span>
            </div>
            <p className="text-xs text-fg-muted leading-relaxed">
              {site.tagline}
            </p>
            <div className="pt-2">
              <AvailabilityPill label={site.availability} />
            </div>
          </div>

          {/* Col 2: Work Categories */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-accent uppercase tracking-wider">
              Selected Disciplines
            </p>
            <ul className="space-y-2 text-xs">
              {doors.map((door) => (
                <li key={door.slug}>
                  <Link
                    href={`/work/${door.slug}`}
                    className="text-fg-muted hover:text-fg transition-colors"
                  >
                    {door.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-accent uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#work" className="text-fg-muted hover:text-fg transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="#capabilities" className="text-fg-muted hover:text-fg transition-colors">
                  Capabilities & Stack
                </Link>
              </li>
              <li>
                <Link href="#story" className="text-fg-muted hover:text-fg transition-colors">
                  My Story Timeline
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-fg-muted hover:text-fg transition-colors">
                  Contact & Inquiry
                </Link>
              </li>
              <li>
                <a
                  href={site.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg-muted hover:text-fg transition-colors inline-flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>Resume (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Status & Connect */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-accent uppercase tracking-wider">
              Connect & Timezone
            </p>
            <div className="space-y-2.5 text-xs text-fg-muted">
              <div>
                <Clock />
              </div>
              <p className="text-[11px] font-mono text-fg-muted/80">
                Location: {site.location}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-line bg-bg-elev flex items-center justify-center text-fg-muted hover:text-accent hover:border-accent transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-line bg-bg-elev flex items-center justify-center text-fg-muted hover:text-accent hover:border-accent transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="w-8 h-8 rounded-full border border-line bg-bg-elev flex items-center justify-center text-fg-muted hover:text-accent hover:border-accent transition-colors"
                  aria-label={`Email ${site.email}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wordmark & Back-to-Top Row */}
        <div className="py-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="select-none">
            <span className="text-5xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter text-line/80 hover:text-line transition-colors">
              SURYA D
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-bg-elev text-xs font-mono text-fg hover:text-accent hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Legal & Attribution Bar */}
        <div className="pt-6 border-t border-line/40 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-fg-muted gap-4">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>
            Designed & Engineered with Next.js, Motion, and Lenis · Asia/Kolkata
          </p>
        </div>
      </div>
    </footer>
  );
}
