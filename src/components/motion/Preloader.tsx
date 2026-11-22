"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { site } from "@/content/site";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check session storage
    const seen = sessionStorage.getItem("surya_preloader_seen");
    if (seen === "true" || prefersReducedMotion) {
      setIsFinished(true);
      onComplete?.();
      return;
    }

    setShouldRender(true);

    const startTime = performance.now();
    const minDuration = 1200; // 1.2s min
    let animationFrameId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const calculated = Math.min(100, Math.floor((elapsed / minDuration) * 100));

      setProgress(calculated);

      if (calculated < 100) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          sessionStorage.setItem("surya_preloader_seen", "true");
          onComplete?.();
        }, 200);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, onComplete]);

  if (!shouldRender || isFinished) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            opacity: 0.9,
            transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-bg p-8 md:p-16 select-none"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading portfolio experience"
        >
          {/* Top Row: System status */}
          <div className="flex items-center justify-between font-mono text-xs text-fg-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span>SYSTEM INITIALIZATION</span>
            </span>
            <span className="text-accent">{site.name} · WORKBENCH v1.0</span>
          </div>

          {/* Center: Big Counter & Role */}
          <div className="max-w-4xl space-y-4">
            <div className="text-7xl sm:text-9xl md:text-[12rem] font-extrabold tracking-tighter text-fg font-mono leading-none">
              {progress.toString().padStart(2, "0")}
              <span className="text-2xl sm:text-4xl text-accent font-sans">%</span>
            </div>
            <p className="text-sm sm:text-base font-mono text-fg-muted uppercase tracking-wider">
              {site.role} · Asia/Kolkata
            </p>
          </div>

          {/* Bottom Row: Progress line & status */}
          <div className="space-y-4">
            <div className="h-[2px] w-full bg-line overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-fg-muted">
              <span>ESTABLISHING SECURE CONTEXT</span>
              <span>100% ASSET VERIFICATION</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
