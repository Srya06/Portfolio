"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Home, Layers, Code2, History, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { site } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DockItem {
  title: string;
  icon: typeof Home;
  href: string;
  isExternal?: boolean;
}

const dockItems: DockItem[] = [
  { title: "Top", icon: Home, href: "/#hero" },
  { title: "Disciplines", icon: Layers, href: "/#work" },
  { title: "Skills", icon: Code2, href: "/#capabilities" },
  { title: "Timeline", icon: History, href: "/#story" },
  { title: "Contact", icon: Mail, href: "/#contact" },
  { title: "GitHub", icon: Github, href: site.github, isExternal: true },
  { title: "LinkedIn", icon: Linkedin, href: site.linkedin, isExternal: true },
];

export function FloatingDock() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  // Navigation click helper for section anchors when on homepage vs other routes
  const getHref = (item: DockItem) => {
    if (item.isExternal) return item.href;
    if (pathname === "/") return item.href.replace("/", "");
    return item.href;
  };

  return (
    <nav
      aria-label="Floating quick navigation dock"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full border border-line bg-bg-elev/80 backdrop-blur-xl shadow-2xl shadow-black/40 ring-1 ring-white/5">
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;
          const href = getHref(item);

          return (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: -4, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-fg text-bg text-[10px] font-mono font-medium whitespace-nowrap shadow-md flex items-center gap-1 z-50"
                  >
                    <span>{item.title}</span>
                    {item.isExternal && <ExternalLink className="w-2.5 h-2.5 opacity-70" />}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button */}
              {item.isExternal ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title} (opens in new tab)`}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-fg-muted hover:text-accent hover:bg-bg/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    transform:
                      !prefersReduced && isHovered ? "scale(1.15) translateY(-2px)" : "scale(1)",
                    transition: "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  href={href}
                  aria-label={`Jump to ${item.title}`}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-fg-muted hover:text-accent hover:bg-bg/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    transform:
                      !prefersReduced && isHovered ? "scale(1.15) translateY(-2px)" : "scale(1)",
                    transition: "transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
