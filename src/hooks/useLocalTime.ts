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

  useEffect(() => {
    function formatTime() {
      try {
        const formatter = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone,
        });
        setFormattedTime(formatter.format(new Date()));
      } catch {
        setFormattedTime(new Date().toLocaleTimeString());
      }
    }

    formatTime();
    const interval = setInterval(formatTime, updateIntervalMs);
    return () => clearInterval(interval);
  }, [timeZone, updateIntervalMs]);

  return { formattedTime, timeZone };
}
