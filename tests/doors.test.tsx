import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DoorCard } from "@/components/sections/DoorCard";
import { DoorsWall } from "@/components/sections/DoorsWall";
import { doors } from "@/content/doors";

const pushMock = vi.fn();
const prefetchMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    prefetch: prefetchMock,
  }),
}));

describe("Chunk 3: Doors Wall & DoorCard Components", () => {
  it("renders DoorCard with title, blurb, and project count", () => {
    const door = doors[0];
    render(<DoorCard door={door} index={0} />);

    expect(screen.getByText(door.title)).toBeInTheDocument();
    expect(screen.getAllByText(door.blurb).length).toBeGreaterThan(0);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("EXPLORE CATEGORY")).toBeInTheDocument();
  });

  it("handles DoorCard hover and prefetching", () => {
    const door = doors[0];
    render(<DoorCard door={door} index={0} />);

    const doorBtn = screen.getByRole("button", { name: new RegExp(door.title, "i") });
    fireEvent.mouseEnter(doorBtn);

    expect(prefetchMock).toHaveBeenCalledWith(`/work/${door.slug}`);
  });

  it("triggers router navigation on DoorCard click", () => {
    const door = doors[1];
    render(<DoorCard door={door} index={1} />);

    const doorBtn = screen.getByRole("button", { name: new RegExp(door.title, "i") });
    fireEvent.click(doorBtn);

    expect(pushMock).toHaveBeenCalledWith(`/work/${door.slug}`);
  });

  it("renders DoorsWall with all 5 doors and navigation controls", () => {
    render(<DoorsWall />);

    expect(screen.getByText(/Engineering Doors Wall/i)).toBeInTheDocument();
    expect(screen.getByText("5 SPECIALIZED DOMAINS")).toBeInTheDocument();

    for (const door of doors) {
      expect(screen.getByText(door.title)).toBeInTheDocument();
    }

    const prevBtn = screen.getByRole("button", { name: /scroll doors wall left/i });
    const nextBtn = screen.getByRole("button", { name: /scroll doors wall right/i });

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });
});
