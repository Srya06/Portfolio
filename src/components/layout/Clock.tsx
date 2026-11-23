"use client";

import { useLocalTime } from "@/hooks/useLocalTime";

export function Clock() {
  const { formattedFull, formattedTime } = useLocalTime();

  return (
    <div
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line bg-bg-elev/70 text-xs font-mono text-fg-muted backdrop-blur-sm shadow-xs"
      title="Surya's local time (Asia/Kolkata)"
      aria-label={`Current local time: ${formattedFull || formattedTime || "Loading"}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
      <span>{formattedFull || `Local time ${formattedTime || "11:24am"}`}</span>
    </div>
  );
}
