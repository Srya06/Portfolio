"use client";

import { useLocalTime } from "@/hooks/useLocalTime";

export function Clock() {
  const { formattedTime } = useLocalTime();

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-line bg-bg-elev/80 text-[11px] font-mono text-fg-muted backdrop-blur-sm"
      title="Surya's local time (Asia/Kolkata)"
      aria-label={`Current local time in India: ${formattedTime || "Loading"}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
      <span>{formattedTime || "00:00"}</span>
      <span className="text-[10px] text-fg-muted/70">IST</span>
    </div>
  );
}
