"use client";

import { useEffect, useState } from "react";

interface LocalTimeOptions {
  timeZone?: string;
  updateIntervalMs?: number;
}

export function useLocalTime(options: LocalTimeOptions = {}) {
  const timeZone = options.timeZone || process.env.NEXT_PUBLIC_MY_TIMEZONE || "Asia/Kolkata";
  const updateIntervalMs = options.updateIntervalMs ?? 30000;

  const [formattedTime, setFormattedTime] = useState<string>("");
  const [formattedFull, setFormattedFull] = useState<string>("");

  useEffect(() => {
    function formatTime() {
      try {
        const now = new Date();
        const timeFormatter = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone,
        });
        const dateFormatter = new Intl.DateTimeFormat("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone,
        });
        const timePart = timeFormatter.format(now).toLowerCase();
        const datePart = dateFormatter.format(now);
        setFormattedTime(timePart);
        setFormattedFull(`Local time ${timePart} · ${datePart}`);
      } catch {
        const fallback = new Date().toLocaleTimeString();
        setFormattedTime(fallback);
        setFormattedFull(`Local time ${fallback}`);
      }
    }

    formatTime();
    const interval = setInterval(formatTime, updateIntervalMs);
    return () => clearInterval(interval);
  }, [timeZone, updateIntervalMs]);

  return { formattedTime, formattedFull, timeZone };
}
