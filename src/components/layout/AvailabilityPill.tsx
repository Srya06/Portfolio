"use client";

interface AvailabilityPillProps {
  label?: string;
  pulsing?: boolean;
}

export function AvailabilityPill({
  label = "Available for work",
  pulsing = true,
}: AvailabilityPillProps) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-line bg-bg-elev/80 text-[11px] font-mono text-fg-muted backdrop-blur-sm"
      aria-label={label}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {pulsing && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        )}
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>
      <span className="text-fg-muted font-medium">{label}</span>
    </div>
  );
}
