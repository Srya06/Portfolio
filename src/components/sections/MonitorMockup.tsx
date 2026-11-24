"use client";

import Image from "next/image";

interface MonitorMockupProps {
  image?: string;
  video?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export function MonitorMockup({
  image,
  video,
  title,
  subtitle,
  className = "",
  children,
}: MonitorMockupProps) {
  return (
    <div className={`relative flex flex-col items-center select-none w-full max-w-[620px] ${className}`}>
      {/* Monitor Display Head */}
      <div className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl bg-[#141212] p-2.5 sm:p-3.5 border-2 border-[#2A2626] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">
        {/* Subtle camera lens dot at top bezel */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#201D1D] border border-white/10 z-30" />

        {/* Screen Display Area */}
        <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#0D0C0C] border border-white/5 flex items-center justify-center">
          {video ? (
            <div className="relative w-full h-full bg-black">
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ) : image ? (
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`${title} interface preview`}
                fill
                unoptimized={image.endsWith(".svg")}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          ) : children ? (
            children
          ) : (
            <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#1E1C1C] via-[#141212] to-[#0A0909] text-left">
              <div className="flex items-center justify-between border-b border-line/40 pb-3">
                <span className="font-bold text-lg text-fg tracking-tight">{title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-line bg-bg text-accent">
                  ACTIVE BUILD
                </span>
              </div>
              <div className="space-y-2 py-4">
                <div className="h-3 w-3/4 rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/10" />
                <div className="h-3 w-5/6 rounded bg-white/10" />
              </div>
              <div className="text-[11px] font-mono text-fg-muted">{subtitle}</div>
            </div>
          )}

          {/* Screen Glass Glare / Gloss Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)",
            }}
          />
        </div>
      </div>

      {/* Monitor Stand - Vertical Aluminum Stem */}
      <div className="relative w-12 sm:w-14 h-12 sm:h-16 bg-gradient-to-r from-[#6E6864] via-[#C8C2BC] to-[#5A5551] shadow-inner -mt-1 z-0 border-x border-[#45403D]">
        {/* Shadow cast by screen onto stand */}
        <div className="w-full h-3 bg-black/40" />
      </div>

      {/* Monitor Stand - Flat Aluminum Horizontal Base Foot */}
      <div className="relative w-36 sm:w-44 h-2 sm:h-2.5 rounded-full bg-gradient-to-r from-[#7D7671] via-[#E2DCD6] to-[#7D7671] shadow-[0_8px_16px_rgba(0,0,0,0.8)] border border-[#C5BFB8]/40 -mt-0.5 z-10 flex items-center justify-center">
        {/* Soft desktop shadow under stand */}
        <div className="absolute -bottom-2 inset-x-2 h-2 bg-black/60 blur-xs rounded-full" />
      </div>
    </div>
  );
}
