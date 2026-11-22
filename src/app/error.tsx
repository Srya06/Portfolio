"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { site } from "@/content/site";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors safely
    console.error("Runtime route error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl border border-line bg-bg-elev/60 backdrop-blur-md space-y-6">
        <div className="w-12 h-12 rounded-full bg-danger/10 border border-danger/30 flex items-center justify-center text-danger mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono text-danger uppercase tracking-wider">System Exception</p>
          <h2 className="text-2xl font-bold tracking-tight text-fg">Something went off-track</h2>
          <p className="text-xs text-fg-muted leading-relaxed">
            An unexpected error occurred while rendering this view. You can attempt recovery or return to the main workbench.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-fg-muted/60">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-fg font-semibold text-xs transition-transform hover:scale-105"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-line bg-bg hover:border-fg-muted/60 text-xs font-semibold text-fg transition-transform hover:scale-105"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>

        <p className="text-[11px] font-mono text-fg-muted pt-2 border-t border-line/60">
          Need assistance? Email: <a href={`mailto:${site.email}`} className="text-accent underline">{site.email}</a>
        </p>
      </div>
    </div>
  );
}
