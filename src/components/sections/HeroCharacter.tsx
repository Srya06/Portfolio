"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from "motion/react";
import { X } from "lucide-react";
import { AbilityCard } from "@/components/sections/AbilityCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroCharacter() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  // Subtle interactive parallax gaze
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { damping: 28, stiffness: 160, mass: 0.4 };
  const tiltX = useSpring(useTransform(rawY, [-300, 300], [3.5, -3.5]), springCfg);
  const tiltY = useSpring(useTransform(rawX, [-300, 300], [-3.5, 3.5]), springCfg);

  // Liquid color reveal canvas effect
  useEffect(() => {
    if (prefersReduced) return;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const ctx = canvas.getContext ? canvas.getContext("2d") : null;
    if (!ctx) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const mk = (): [HTMLCanvasElement, CanvasRenderingContext2D] => {
      const c = document.createElement("canvas");
      return [c, c.getContext("2d")!];
    };

    let bwC: HTMLCanvasElement, bwX: CanvasRenderingContext2D;
    let colC: HTMLCanvasElement, colX: CanvasRenderingContext2D;
    let mask: HTMLCanvasElement, mX: CanvasRenderingContext2D;
    let tmp: HTMLCanvasElement, tX: CanvasRenderingContext2D;

    try {
      [bwC, bwX] = mk();
      [colC, colX] = mk();
      [mask, mX] = mk();
      [tmp, tX] = mk();
    } catch {
      return;
    }

    const bwImg = new window.Image();
    const colImg = new window.Image();
    bwImg.src = "/images/character-bw.webp";
    colImg.src = "/images/character-color.webp";

    let W = 1;
    let H = 1;
    const brushRadius = 140;
    let radius = brushRadius * dpr;
    const points: { x: number; y: number }[] = [];
    let idle = 999;
    let running = false;
    let showing = false;

    function fitDraw(x: CanvasRenderingContext2D, img: HTMLImageElement) {
      x.clearRect(0, 0, W, H);
      if (!img.naturalWidth) return;
      const s = Math.min(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      x.drawImage(img, (W - dw) / 2, H - dh, dw, dh);
    }

    function measure() {
      if (!stage || !canvas) return;
      const r = stage.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width * dpr));
      H = Math.max(1, Math.round(r.height * dpr));
      for (const c of [canvas, bwC, colC, mask, tmp]) {
        if (c) {
          c.width = W;
          c.height = H;
        }
      }
      radius = brushRadius * dpr;
      fitDraw(bwX, bwImg);
      fitDraw(colX, colImg);
      hide();
    }

    bwImg.onload = () => fitDraw(bwX, bwImg);
    colImg.onload = () => fitDraw(colX, colImg);

    function stamp(x: number, y: number) {
      const g = mX.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.55, "rgba(255,255,255,0.85)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      mX.globalCompositeOperation = "source-over";
      mX.fillStyle = g;
      mX.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    function render() {
      if (!ctx) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(bwC, 0, 0);
      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(mask, 0, 0);

      tX.globalCompositeOperation = "source-over";
      tX.clearRect(0, 0, W, H);
      tX.drawImage(colC, 0, 0);
      tX.globalCompositeOperation = "destination-in";
      tX.drawImage(mask, 0, 0);

      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(tmp, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    }

    function show() {
      if (!showing) {
        showing = true;
        render();
        if (canvas) canvas.style.opacity = "1";
      }
    }

    function hide() {
      showing = false;
      if (canvas) canvas.style.opacity = "0";
      ctx?.clearRect(0, 0, W, H);
      mX.clearRect(0, 0, W, H);
    }

    let animId: number | null = null;
    function frame() {
      const drawing = points.length > 0;
      if (drawing) idle = 0;
      else idle++;
      if (idle >= 90) {
        hide();
        running = false;
        return;
      }
      const fade = drawing ? 0.016 : Math.min(0.016 + idle * 0.003, 0.45);
      mX.globalCompositeOperation = "destination-out";
      mX.fillStyle = `rgba(0,0,0,${fade})`;
      mX.fillRect(0, 0, W, H);
      if (drawing) {
        for (const p of points) stamp(p.x, p.y);
        points.length = 0;
      }
      render();
      show();
      animId = requestAnimationFrame(frame);
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!colImg.naturalWidth) return;
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) * dpr;
      const py = (e.clientY - r.top) * dpr;
      points.push({ x: px, y: py });
      if (!running) {
        running = true;
        idle = 0;
        animId = requestAnimationFrame(frame);
      }
    };

    const onPointerLeave = () => {
      points.length = 0;
    };

    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", measure);

    measure();

    return () => {
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", measure);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [prefersReduced]);

  // Subtle interactive parallax gaze on mouse move
  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const centerX = r.left + r.width / 2;
    const centerY = r.top + r.height / 2;
    rawX.set(e.clientX - centerX);
    rawY.set(e.clientY - centerY);
  };

  const handleStagePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  // Close modal on Escape
  useEffect(() => {
    if (!isCardOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCardOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCardOpen]);

  return (
    <>
      <div className="relative flex items-center justify-center w-full select-none">
        {/* Soft atmospheric backlight halo */}
        <div
          className="pointer-events-none absolute inset-0 -top-8 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 45%, rgba(214, 178, 110, 0.28), rgba(154, 98, 74, 0.12) 48%, transparent 72%)",
          }}
          aria-hidden="true"
        />

        {/* Character Stage Container */}
        <motion.div
          ref={stageRef}
          onPointerMove={handleStagePointerMove}
          onPointerLeave={handleStagePointerLeave}
          style={{
            perspective: 1000,
            rotateX: prefersReduced ? 0 : tiltX,
            rotateY: prefersReduced ? 0 : tiltY,
          }}
          className="group relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] aspect-[819/815] flex items-end justify-center cursor-pointer"
          onClick={() => setIsCardOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsCardOpen(true);
            }
          }}
          aria-label="Surya D character portrait. Hover to reveal color or click to open ability card."
        >
          {/* Base Black & White Character Portrait with seamless background blend */}
          <div
            className="relative w-full h-full flex items-end justify-center overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 84%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 84%, transparent 100%)",
            }}
          >
            <Image
              src="/images/character-bw.webp"
              alt="Surya D character portrait"
              fill
              priority
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 520px"
              className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
            />

            {/* Liquid Reveal Color Canvas on Pointer Move */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none transition-opacity duration-300"
              style={{ opacity: 0 }}
              aria-hidden="true"
            />
          </div>

          {/* Floating 'My ability card' badge matching therishithakor.com */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsCardOpen(true);
            }}
            className="absolute left-[6%] bottom-[4%] sm:bottom-[6%] z-10 inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full border border-white/20 bg-[#161414]/85 backdrop-blur-md text-[#F3EEEC] text-xs font-semibold tracking-wide shadow-[0_10px_24px_-12px_rgba(0,0,0,0.7)] hover:bg-[#1A1818] hover:border-white/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-haspopup="dialog"
            aria-expanded={isCardOpen}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>My ability card</span>
          </button>
        </motion.div>
      </div>

      {/* Ability Card Modal Overlay */}
      <AnimatePresence>
        {isCardOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Surya D Ability Card"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop with rich obsidian blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={() => setIsCardOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              className="relative z-10 max-w-sm sm:max-w-md w-full flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsCardOpen(false)}
                className="absolute -top-12 right-0 sm:-right-4 p-2 rounded-full bg-[#1A1818]/90 hover:bg-[#252222] text-[#F3EEEC] border border-white/20 backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-lg"
                aria-label="Close ability card"
              >
                <X className="w-5 h-5" />
              </button>

              <AbilityCard />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
