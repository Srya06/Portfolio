"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { doors } from "@/content/doors";
import { DoorCard } from "@/components/sections/DoorCard";

export function DoorsWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 0) {
      const progress = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
      setScrollProgress(progress);
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
    const scrollOffset = direction === "left" ? -340 : 340;
    containerRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByAmount("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByAmount("right");
    }
  };

  return (
    <section id="work" className="relative py-16 space-y-8 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-line">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-bg-elev text-xs font-mono text-accent">
              <Compass className="w-3.5 h-3.5" />
              <span>01 // INTERACTIVE PORTALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-fg">
              Engineering Doors Wall
            </h2>
            <p className="text-sm text-fg-muted max-w-xl">
              Hover to open each discipline portal and inspect the architecture, implementation evidence, and verified repositories.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-fg-muted hidden sm:inline-block">
              DRAG OR USE KEYS
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByAmount("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-line bg-bg-elev flex items-center justify-center text-fg hover:text-accent hover:border-accent disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Scroll doors wall left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByAmount("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-line bg-bg-elev flex items-center justify-center text-fg hover:text-accent hover:border-accent disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Scroll doors wall right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Draggable & Scrollable Wall Container */}
      <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Interactive doors carousel. Use arrow keys to navigate."
        className="flex gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scrollbar-none scroll-smooth pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-2xl"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {doors.map((door, index) => (
          <DoorCard key={door.slug} door={door} index={index} />
        ))}
      </div>

      {/* Progress Line Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <div className="h-1 w-full bg-line overflow-hidden rounded-full">
            <div
              className="h-full bg-accent transition-all duration-150 ease-out rounded-full"
              style={{ width: `${Math.max(12, scrollProgress)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-fg-muted">
            <span>5 SPECIALIZED DOMAINS</span>
            <span>{Math.round(scrollProgress)}% EXPLORED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
