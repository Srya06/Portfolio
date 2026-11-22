"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, Github, Linkedin, FileText, Mail } from "lucide-react";
import { site } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "#work", label: "Selected Work", number: "01", blurb: "6 verified applied AI and full-stack projects" },
  { href: "#capabilities", label: "Capabilities", number: "02", blurb: "Core ML, agentic systems, and development stack" },
  { href: "#story", label: "My Story", number: "03", blurb: "Education, background, and trajectory" },
  { href: "#contact", label: "Contact Flow", number: "04", blurb: "Start a conversation or recruitment inquiry" },
];

export function Menu({ isOpen, onClose }: MenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Escape key handler & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Focus first link or close button
    const closeBtn = containerRef.current?.querySelector("button");
    closeBtn?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-xl border-b border-line px-6 py-8 md:px-16 md:py-12"
        >
          {/* Header row inside Menu */}
          <div className="flex items-center justify-between border-b border-line pb-6">
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-fg">{site.name}</span>
              <span className="text-xs font-mono text-accent">{site.role}</span>
            </div>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-line bg-bg-elev text-fg hover:text-accent hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links grid */}
          <div className="flex-1 flex flex-col justify-center max-w-4xl py-12 space-y-6 md:space-y-8">
            {navLinks.map((item, idx) => (
              <motion.div
                key={item.href}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.1 : 0.4,
                  delay: prefersReducedMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex flex-col md:flex-row md:items-baseline justify-between py-2 border-b border-line/40 transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs md:text-sm text-accent">{item.number}</span>
                    <span className="text-2xl md:text-4xl font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs text-fg-muted font-mono mt-1 md:mt-0 group-hover:text-fg transition-colors">
                    {item.blurb}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer inside Menu */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pt-6 border-t border-line text-xs font-mono text-fg-muted gap-4">
            <div className="flex items-center gap-6">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
              <a
                href={site.resumePath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-fg-muted">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <span>{site.email}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
