"use client";

import { useState, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { useTheme } from "@/components/theme/ThemeProvider";

export function LampPullCord() {
  const { theme, toggleTheme } = useTheme();
  const [isPulling, setIsPulling] = useState(false);
  const controls = useAnimation();
  const audioContextRef = useRef<AudioContext | null>(null);

  const playClickSound = () => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Crisp mechanical light-switch click synthesized via Web Audio oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio not supported or blocked by browser policy, ignore
    }
  };

  const handlePull = async () => {
    if (isPulling) return;
    setIsPulling(true);
    playClickSound();
    toggleTheme();

    // Pull down animation and realistic spring return
    await controls.start({
      y: 28,
      transition: { duration: 0.12, ease: "easeOut" },
    });

    await controls.start({
      y: [28, -6, 3, -1, 0],
      rotate: [0, 5, -4, 2, 0],
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    });

    setIsPulling(false);
  };

  return (
    <div
      className="fixed top-0 right-10 md:right-24 z-50 flex flex-col items-center pointer-events-auto select-none"
      title={`Pull cord to switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Ceiling Mount */}
      <div className="w-3 h-1.5 bg-[#4A423F] rounded-b-sm shadow-sm" />

      {/* Hanging Cord & Pendant Container */}
      <motion.div
        animate={controls}
        whileHover={{
          rotate: [0, 2.5, -2, 1, 0],
          transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
        }}
        onClick={handlePull}
        className="flex flex-col items-center cursor-pointer group"
        aria-label={`Toggle light/dark theme with pull cord. Currently ${theme} mode.`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePull();
          }
        }}
      >
        {/* Cord wire */}
        <div className="w-[1.5px] h-28 md:h-36 bg-gradient-to-b from-[#7A6F6D] via-[#A89895] to-[#D6B26E] group-hover:bg-accent transition-colors" />

        {/* Brass collar ring */}
        <div className="w-2.5 h-1 bg-[#D6B26E] rounded-sm shadow-xs" />

        {/* Turned Acorn Pull Finial / Pendant */}
        <div className="relative flex flex-col items-center">
          <div className="w-4 h-6 rounded-t-full rounded-b-2xl bg-gradient-to-b from-[#C49A50] via-[#946A28] to-[#593F16] border border-[#E5C77F]/30 shadow-[0_4px_10px_rgba(0,0,0,0.5)] group-hover:brightness-110 transition-all flex items-center justify-center">
            {/* Center highlight groove */}
            <div className="w-2 h-0.5 bg-[#FFE6A7]/50 rounded-full" />
          </div>
          {/* Bottom bead tip */}
          <div className="w-2 h-2 rounded-full bg-[#D6B26E] -mt-0.5 shadow-xs" />
        </div>
      </motion.div>
    </div>
  );
}
