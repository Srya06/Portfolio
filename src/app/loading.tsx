export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 py-24 text-center"
    >
      {/* Animated branded loader rings */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-line" />
        <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>

      <div className="space-y-1">
        <p className="text-xs font-mono text-accent uppercase tracking-wider">
          Loading Systems
        </p>
        <p className="text-xs text-fg-muted">
          Retrieving models, case studies &amp; verified evidence...
        </p>
      </div>
    </div>
  );
}
