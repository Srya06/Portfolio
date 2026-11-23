"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { site } from "@/content/site";
import { doors } from "@/content/doors";
import { Clock } from "@/components/layout/Clock";
import { AvailabilityPill } from "@/components/layout/AvailabilityPill";

export function Footer() {
  return (
    <footer className="border-t border-line/60 bg-bg-elev/40 pt-16 pb-12 mt-20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Status Grid matching Screenshot 7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-16 border-b border-line/60 text-xs">
          {/* Col 1: Bio & Positioning */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-bg-elev border border-line flex items-center justify-center font-mono text-xs font-bold text-accent shadow-xs">
                S
              </span>
              <span className="font-bold text-sm tracking-tight text-fg">
                {site.name}
              </span>
            </div>
            <p className="text-xs text-fg-muted leading-relaxed font-normal">
              {site.tagline}
            </p>
            <div className="pt-1">
              <AvailabilityPill label={site.availability} />
            </div>
          </div>

          {/* Col 2: WORK */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-fg uppercase tracking-widest font-semibold">
              WORK
            </p>
            <ul className="space-y-2.5">
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

          {/* Col 3: NAVIGATE */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-fg uppercase tracking-widest font-semibold">
              NAVIGATE
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-fg-muted hover:text-fg transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#work" className="text-fg-muted hover:text-fg transition-colors">
                  The Doors
                </Link>
              </li>
              <li>
                <Link href="/#story" className="text-fg-muted hover:text-fg transition-colors">
                  My story
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-fg-muted hover:text-fg transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={site.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg-muted hover:text-fg transition-colors inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: STATUS */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-fg uppercase tracking-widest font-semibold">
              STATUS
            </p>
            <div className="space-y-3 text-fg-muted">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span>Available for work</span>
              </div>
              <div>
                <span>Remote-first, worldwide</span>
              </div>
              <div className="pt-1">
                <Clock />
              </div>
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
                  aria-label="Email Inquiry"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-fg-muted">
          <div>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <div className="text-[11px] text-fg-muted/70">
            Crafted with Onest typography, Next.js &amp; Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
