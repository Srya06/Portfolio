"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { doors } from "@/content/doors";
import { DoorCard } from "@/components/sections/DoorCard";

export function DoorsWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // We showcase the 4 primary discipline doors matching the 4 doors in the reference site
  const primaryDoors = doors.slice(0, 4);

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
    const scrollOffset = direction === "left" ? -340 : 340;
    containerRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  return (
    <section id="work" className="relative py-20 sm:py-28 overflow-hidden select-none">
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

        {/* Doors Row Container */}
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

          {/* Doors Flex Track */}
          <div
            ref={containerRef}
            className="flex items-center justify-start md:justify-center gap-4 sm:gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none snap-x"
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
          </div>
        </div>
      </div>
    </section>
  );
}
