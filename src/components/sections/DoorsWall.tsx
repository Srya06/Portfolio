"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { doors } from "@/content/doors";
import { DoorCard } from "@/components/sections/DoorCard";

export function DoorsWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 4 primary discipline doors matching the 4 doors in the reference site
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
    const scrollOffset = direction === "left" ? -260 : 260;
    containerRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  return (
    <section
      id="work"
      className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden select-none"
      onMouseLeave={() => setActiveSlug(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline matching therishithakor.com */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-[4.75rem] font-black tracking-tight text-white font-sans leading-none">
            Magic happens behind the doors
          </h2>
        </div>

        {/* Doors Row & Details Container */}
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

          {/* Desktop 4-Column Grid with In-Place Doors & Floor Baseboard */}
          <div className="relative max-w-5xl mx-auto">
            {/* The 4 Fixed Door Slots standing on the floor */}
            <div
              ref={containerRef}
              className="flex md:grid md:grid-cols-4 items-end justify-start md:justify-items-center gap-4 sm:gap-6 overflow-x-auto md:overflow-visible pb-1 pt-4 scrollbar-none snap-x"
            >
              {primaryDoors.map((door, index) => (
                <div key={door.slug} className="shrink-0 flex justify-center pointer-events-auto">
                  <DoorCard
                    door={door}
                    index={index}
                    isActive={activeSlug === door.slug}
                    isAnyActive={activeSlug !== null}
                    onActivate={() => setActiveSlug(door.slug)}
                    onDeactivate={() => setActiveSlug(null)}
                  />
                </div>
              ))}
            </div>

            {/* Room Baseboard Moulding Trim across bottom of doors */}
            <div className="w-full h-3 sm:h-3.5 bg-[#161414] border-t border-[#2A2626] border-b border-black shadow-[0_4px_16px_rgba(0,0,0,0.95)] relative z-30" />
            <div className="w-full h-10 bg-gradient-to-b from-[#121010] to-transparent opacity-80" />

            {/* Desktop Overview Panel (Adjacent Columns: Door 0 -> Cols 2-3, Door 1 -> Cols 3-4, Door 2 -> Cols 1-2, Door 3 -> Cols 2-3) */}
            <AnimatePresence>
              {activeDoor && (
                <div className="hidden md:grid absolute inset-0 bottom-12 grid-cols-4 gap-6 items-center pointer-events-none px-2 z-25">
                  <motion.div
                    key={activeDoor.slug}
                    initial={{ opacity: 0, x: activeIndex <= 1 ? -16 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: activeIndex <= 1 ? -16 : 16 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`pointer-events-none space-y-3.5 text-left p-4 ${
                      activeIndex === 0
                        ? "col-start-2 col-span-2 pl-8"
                        : activeIndex === 1
                        ? "col-start-3 col-span-2 pl-8"
                        : activeIndex === 2
                        ? "col-start-1 col-span-2 pr-8"
                        : "col-start-2 col-span-2 pl-8"
                    }`}
                  >
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
                        {activeDoor.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-semibold text-[#A8A196] uppercase tracking-widest font-sans mt-1.5">
                        {activeDoor.subtitle}
                      </p>
                    </div>

                    <ul className="space-y-2.5 pt-1">
                      {activeDoor.checklist.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-[#D8D4CE] font-normal leading-relaxed"
                        >
                          <div className="w-4 h-4 rounded-full bg-white/90 text-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            <svg className="w-2.5 h-2.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Overview Panel (Shown below doors on small screens) */}
          <AnimatePresence>
            {activeDoor && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-6 p-6 rounded-2xl border border-line bg-bg-elev/90 space-y-3 text-left"
              >
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white font-sans">
                    {activeDoor.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#A8A196] uppercase tracking-wider mt-1">
                    {activeDoor.subtitle}
                  </p>
                </div>

                <ul className="space-y-2 pt-1">
                  {activeDoor.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#D8D4CE]">
                      <div className="w-4 h-4 rounded-full bg-white/90 text-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-2.5 h-2.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
