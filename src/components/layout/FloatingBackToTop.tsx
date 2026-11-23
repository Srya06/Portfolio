"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function FloatingBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#FAF8F5] text-[#1A1818] shadow-[0_8px_25px_rgba(0,0,0,0.35)] border border-line flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <ArrowUp className="w-4 h-4 stroke-[2.5]" />
    </button>
  );
}
