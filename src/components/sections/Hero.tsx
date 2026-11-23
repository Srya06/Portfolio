"use client";

import { ArrowRight, ArrowDown } from "lucide-react";
import { FlipCalendar } from "@/components/motion/FlipCalendar";
import { AbilityCard } from "@/components/sections/AbilityCard";
import { RoleMarquee } from "@/components/sections/RoleMarquee";

export function Hero() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative pt-12 md:pt-16 pb-0 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh] py-6 sm:py-10">
          {/* Left Column: Greeting, Role Flip-Calendar, CTAs */}
          <div className="lg:col-span-7 space-y-6 md:space-y-7">
            {/* Eyebrow badge matching therishithakor.com */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-fg-muted">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>Independent AI &amp; Full-Stack Engineer</span>
            </div>

            {/* Main Greeting Typography */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight text-fg leading-[1.02] font-sans">
                Hi, I&apos;m Surya.
              </h1>
              <h2 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-fg-muted/65 leading-[1.05] font-sans">
                I am an
              </h2>
            </div>

            {/* 3D Wire-O Spiral Flip Calendar Desk Widget */}
            <div className="pt-1">
              <FlipCalendar />
            </div>

            {/* Action Buttons matching reference design */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {/* White Hire me pill button with black right-arrow circle */}
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2.5 rounded-full bg-[#FAF8F5] text-[#1A1818] font-bold text-sm tracking-tight transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>Hire me</span>
                <span className="w-8 h-8 rounded-full bg-[#1A1818] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </button>

              {/* Outline pill button */}
              <button
                onClick={scrollToWork}
                className="inline-flex items-center px-6 py-3.5 rounded-full border border-line bg-bg-elev/40 hover:bg-bg-elev text-fg hover:border-fg-muted font-medium text-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-xs"
              >
                <span>See my work</span>
              </button>
            </div>
          </div>

          {/* Right Column: Artisan Ability Card with 'My ability card' badge */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center relative">
            <AbilityCard />
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-bg-elev/80 backdrop-blur-sm text-xs font-mono text-fg shadow-sm hover:border-accent transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>My ability card</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar matching reference design */}
        <div className="py-6 border-t border-line/60 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-xs font-mono text-fg-muted uppercase tracking-wider">
          <div className="flex items-center gap-2 justify-start">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span>AVAILABLE FOR WORK</span>
          </div>

          <div className="text-left sm:text-center">
            <span>REMOTE-FIRST, WORLDWIDE</span>
          </div>

          <div className="text-left sm:text-right">
            <button
              onClick={scrollToWork}
              className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg transition-colors group"
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Role Marquee Banner below Hero */}
      <div className="mt-2">
        <RoleMarquee />
      </div>
    </section>
  );
}
