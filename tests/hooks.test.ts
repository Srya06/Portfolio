import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLocalTime } from "@/hooks/useLocalTime";

describe("useLocalTime hook", () => {
  it("formats time for Asia/Kolkata timezone", () => {
    const { result } = renderHook(() =>
      useLocalTime({ timeZone: "Asia/Kolkata", updateIntervalMs: 1000 })
    );
    expect(result.current.formattedTime).toBeDefined();
    expect(result.current.timeZone).toBe("Asia/Kolkata");
  });
});
