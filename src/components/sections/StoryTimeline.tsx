"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronUp, ChevronDown } from "lucide-react";
import { story } from "@/content/story";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
  gsap.registerPlugin(ScrollTrigger);
}

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
      aria-label="Candidate journey and background timeline"
      className="relative min-h-screen py-16 lg:py-24 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto focus-visible:outline-none select-none"
    >
      {/* Desktop Pinned Timeline Layout matching frame-01-30.0.png */}
      <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
        {/* Left Column (Cols 1-5): Eyebrow, 'Let's go back in time', Radar watermark, Giant Year */}
        <div className="col-span-5 space-y-6 sticky top-32">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A8A196]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>• My story // My Engineering Story</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans leading-[1.05]">
              Let&apos;s go back in time.
            </h2>
          </div>

          {/* Radar Watermark + Giant Year Typography */}
          <div className="relative pt-4">
            <svg
              className="absolute -left-10 -top-8 w-96 h-96 opacity-[0.06] pointer-events-none text-white stroke-current fill-none"
              viewBox="0 0 200 200"
            >
              <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="100" cy="100" r="70" strokeWidth="1" />
              <circle cx="100" cy="100" r="45" strokeWidth="1" strokeDasharray="2 4" />
              <line x1="100" y1="5" x2="100" y2="195" strokeWidth="0.5" />
              <line x1="5" y1="100" x2="195" y2="100" strokeWidth="0.5" />
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.year || activeMilestone.period}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="text-7xl sm:text-9xl font-black tracking-tighter text-white font-sans select-none">
                  {activeMilestone.year || "2026"}
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#B5AFA6] font-semibold mt-1">
                  {activeMilestone.period}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step Counter & Horizontal Progress Bar */}
            <div className="flex items-center gap-3 pt-4">
              <span className="text-xs font-mono text-white/60">
                0{activeIndex + 1} / 0{story.length}
              </span>
              <div className="w-32 h-[2px] bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${((activeIndex + 1) / story.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-2 pt-6">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Previous story milestone"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex === story.length - 1}
                className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Next story milestone"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Vertical Timeline Rail with Glowing White Node */}
        <div className="col-span-1 flex flex-col items-center justify-center h-96">
          <div className="relative w-[2px] h-full bg-white/20 rounded-full flex flex-col justify-between py-2">
            {story.map((_, i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 -ml-[6px] rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-white ring-4 ring-white/20 scale-125"
                    : i < activeIndex
                    ? "bg-white/60"
                    : "bg-white/20 border border-white/40"
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
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full p-8 rounded-3xl border border-white/10 bg-[#161414]/90 backdrop-blur-md shadow-2xl space-y-5"
              >
                {/* Header */}
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#A8A196]">
                    {activeMilestone.period}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans leading-tight">
                    {activeMilestone.title}
                  </h3>
                  <p className="text-xs font-medium text-accent">
                    {activeMilestone.organisation} · {activeMilestone.location}
                  </p>
                </div>

                {/* Bullets with dashes matching frame-01-30.0.png */}
                <ul className="space-y-2.5 pt-2">
                  {activeMilestone.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#C4BFB6] font-normal leading-relaxed"
                    >
                      <span className="text-white/40 shrink-0 mt-0.5">–</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="lg:hidden space-y-8">
        <div className="space-y-2 border-b border-line pb-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A8A196]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>• My story</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
            My Engineering Story
          </h2>
        </div>

        <div className="space-y-6">
          {story.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-white/10 bg-[#161414] space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-white font-sans">
                  {item.year || "2026"}
                </span>
                <span className="text-xs font-mono text-[#A8A196]">{item.period}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-accent">{item.organisation}</p>
              </div>

              <ul className="space-y-2">
                {item.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#C4BFB6]">
                    <span className="text-white/40">–</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
