"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { doors } from "@/content/doors";
import { DoorCard } from "@/components/sections/DoorCard";

export function DoorsWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // We showcase the 4 primary discipline doors matching the 4 doors in the reference site
  const primaryDoors = doors.slice(0, 4);
  const activeIndex = primaryDoors.findIndex((d) => d.slug === activeSlug);
  const activeDoor = activeIndex !== -1 ? primaryDoors[activeIndex] : null;

  const updateScrollState = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 0) {
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollState();
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollOffset = direction === "left" ? -280 : 280;
    containerRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  return (
    <section
      id="work"
      className="relative py-20 sm:py-28 overflow-hidden select-none"
      onMouseLeave={() => setActiveSlug(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline matching therishithakor.com */}
        <div className="text-center space-y-4 mb-14 sm:mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-[4.5rem] font-extrabold tracking-tight text-fg font-sans leading-tight">
            Magic happens behind the doors
          </h2>
          <p className="text-sm sm:text-base text-fg-muted max-w-xl mx-auto font-normal">
            Select or hover any architectural portal to swing open its verified technical evidence, case studies, and code repositories.
          </p>
        </div>

        {/* Doors Row & Overlay Area */}
        <div className="relative">
          {/* Scroll controls for mobile viewports */}
          <div className="flex md:hidden items-center justify-end gap-2 mb-4">
            <button
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              className="w-9 h-9 rounded-full border border-line bg-bg-elev flex items-center justify-center text-fg hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Scroll doors left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              className="w-9 h-9 rounded-full border border-line bg-bg-elev flex items-center justify-center text-fg hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Scroll doors right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Fixed-Position Doors Container (Never expands or pushes neighbors) */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-start md:justify-center gap-4 sm:gap-6 md:gap-7 overflow-x-auto md:overflow-visible pb-8 pt-4 scrollbar-none snap-x min-h-[480px]"
          >
            {primaryDoors.map((door, index) => (
              <DoorCard
                key={door.slug}
                door={door}
                index={index}
                isActive={activeSlug === door.slug}
                isAnyActive={activeSlug !== null}
                onActivate={() => setActiveSlug(door.slug)}
                onDeactivate={() => setActiveSlug(null)}
              />
            ))}

            {/* Desktop Overview Panel Overlay (Matching Screenshot 2 - Zero Layout Shift) */}
            <AnimatePresence>
              {activeDoor && (
                <motion.div
                  key={activeDoor.slug}
                  initial={{ opacity: 0, x: activeIndex <= 1 ? -15 : 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeIndex <= 1 ? -15 : 15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`hidden md:block absolute top-1/2 -translate-y-1/2 z-30 pointer-events-auto max-w-sm lg:max-w-md space-y-4 text-left p-6 ${
                    activeIndex <= 1
                      ? "left-[270px] sm:left-[300px] md:left-[340px] lg:left-[360px]"
                      : "right-[270px] sm:right-[300px] md:right-[340px] lg:right-[360px]"
                  }`}
                >
                  <div className="space-y-1">
                    <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-fg font-sans leading-tight">
                      {activeDoor.title}
                    </h3>
                    <p className="text-xs font-mono text-accent uppercase tracking-wider">
                      {activeDoor.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-1">
                    {activeDoor.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-fg-muted font-normal">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Link
                      href={`/work/${activeDoor.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF8F5] text-[#1A1818] font-bold text-xs hover:bg-white transition-all shadow-md active:scale-95"
                    >
                      <span>Enter discipline portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Overview Panel (Rendered cleanly below the doors on small screens) */}
          <AnimatePresence>
            {activeDoor && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-6 p-6 rounded-2xl border border-line bg-bg-elev/90 space-y-4 text-left"
              >
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-fg font-sans">
                    {activeDoor.title}
                  </h3>
                  <p className="text-xs font-mono text-accent uppercase tracking-wider mt-1">
                    {activeDoor.subtitle}
                  </p>
                </div>

                <ul className="space-y-2 pt-1">
                  {activeDoor.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-fg-muted">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Link
                    href={`/work/${activeDoor.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF8F5] text-[#1A1818] font-bold text-xs hover:bg-white transition-all shadow-md active:scale-95"
                  >
                    <span>Enter discipline portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
