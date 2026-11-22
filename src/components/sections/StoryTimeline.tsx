"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  Users,
  Cpu,
  Sparkles,
  Code2,
  ChevronUp,
  ChevronDown,
  MapPin,
  Calendar,
} from "lucide-react";
import { story } from "@/content/story";
import { RollingCounter } from "@/components/motion/RollingCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const icons = {
  education: GraduationCap,
  community: Users,
  ai: Cpu,
  product: Code2,
  work: Sparkles,
};

export function StoryTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // GSAP ScrollTrigger setup for pinning on desktop
  useEffect(() => {
    if (
      prefersReducedMotion ||
      typeof window === "undefined" ||
      process.env.NODE_ENV === "test"
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      if (window.innerWidth >= 1024 && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${story.length * 400}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              story.length - 1,
              Math.floor(self.progress * story.length)
            );
            setActiveIndex(index);
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const activeMilestone = story[activeIndex];
  const ActiveIcon = icons[activeMilestone.type] || Sparkles;

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(story.length - 1, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section
      id="story"
      ref={sectionRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Candidate journey and education timeline"
      className="relative min-h-screen py-16 lg:py-24 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-3xl"
    >
      {/* Background ambient gradient */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[140px]"
        aria-hidden="true"
      />

      {/* Desktop Pinned Timeline Layout */}
      <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
        {/* Left Column (Cols 1-5): Counter, Section Badge, Milestone Category */}
        <div className="col-span-5 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-bg-elev text-xs font-mono text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 // BACKGROUND &amp; MILESTONES</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-fg">
              My Engineering Story
            </h2>
            <p className="text-sm text-fg-muted max-w-sm">
              Academic rigor, student mentoring, and applied AI systems architecture.
            </p>
          </div>

          {/* Rolling Number Counter */}
          <div className="space-y-3 pt-2">
            <RollingCounter
              current={activeIndex + 1}
              total={story.length}
              className="text-6xl sm:text-8xl"
            />
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md border border-line bg-bg-elev text-xs font-mono text-accent font-medium">
                {activeMilestone.category}
              </span>
              <span className="text-xs font-mono text-fg-muted flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>{activeMilestone.period}</span>
              </span>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full border border-line bg-bg-elev flex items-center justify-center text-fg hover:text-accent hover:border-accent disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Previous story milestone"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === story.length - 1}
              className="w-10 h-10 rounded-full border border-line bg-bg-elev flex items-center justify-center text-fg hover:text-accent hover:border-accent disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Next story milestone"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-fg-muted">
              SCROLL OR USE ARROWS
            </span>
          </div>
        </div>

        {/* Center Progress Rail (Col 6) */}
        <div className="col-span-1 flex flex-col items-center justify-center h-80">
          <div className="relative w-[2px] h-full bg-line/80 rounded-full flex flex-col justify-between py-2">
            {story.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 -ml-[5px] rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-accent ring-4 ring-accent/20 scale-125"
                    : i < activeIndex
                    ? "bg-accent/60"
                    : "bg-line border border-fg-muted/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Active Card Column (Cols 7-12) */}
        <div className="col-span-6">
          <div className="relative min-h-[380px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full p-8 rounded-3xl border border-line bg-bg-elev/80 backdrop-blur-md shadow-2xl space-y-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-accent uppercase">
                      {activeMilestone.organisation}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-fg">
                      {activeMilestone.title}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-bg border border-line flex items-center justify-center text-accent shrink-0 shadow-sm">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                </div>

                {/* Location and Period Row */}
                <div className="flex items-center gap-4 text-xs font-mono text-fg-muted border-y border-line/60 py-3">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{activeMilestone.location}</span>
                  </span>
                  <span>·</span>
                  <span className="text-accent font-medium">
                    {activeMilestone.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="space-y-3 text-sm text-fg-muted">
                  {activeMilestone.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-accent mt-1 text-xs">◆</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile & Reduced-Motion Stacked Layout */}
      <div className="lg:hidden space-y-8">
        <div className="space-y-2 border-b border-line pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-bg-elev text-xs font-mono text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 // BACKGROUND &amp; MILESTONES</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-fg">
            My Engineering Story
          </h2>
          <p className="text-sm text-fg-muted">
            Academic training at MIT Mysore, student mentoring, and applied AI initiatives.
          </p>
        </div>

        <div className="space-y-6">
          {story.map((item, index) => {
            const ItemIcon = icons[item.type] || Sparkles;
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-line bg-bg-elev/70 space-y-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent">
                    0{index + 1} / 0{story.length}
                  </span>
                  <span className="text-xs font-mono text-fg-muted px-2 py-0.5 rounded border border-line">
                    {item.period}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-bg border border-line flex items-center justify-center text-accent shrink-0">
                    <ItemIcon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-fg leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-fg-muted">
                      {item.organisation} · {item.location}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-fg-muted pt-2 border-t border-line/60">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">◆</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
