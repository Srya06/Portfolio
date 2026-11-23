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

describe("Doors Wall & Architectural Arched DoorCard Components", () => {
  it("renders DoorCard with brass plate title and arched frame", () => {
    const door = doors[0];
    render(<DoorCard door={door} index={0} />);

    expect(screen.getByText(door.plateTitle || door.title)).toBeInTheDocument();
  });

  it("triggers activation on DoorCard interaction", () => {
    const door = doors[0];
    const onActivate = vi.fn();
    render(<DoorCard door={door} index={0} onActivate={onActivate} />);

    const doorBtn = screen.getByRole("button", { name: new RegExp(door.title, "i") });
    fireEvent.mouseEnter(doorBtn);

    expect(onActivate).toHaveBeenCalled();
  });

  it("triggers router navigation when active DoorCard is clicked", () => {
    const door = doors[1];
    render(<DoorCard door={door} index={1} isActive={true} />);

    const doorBtn = screen.getByRole("button", { name: new RegExp(door.title, "i") });
    fireEvent.click(doorBtn);

    expect(pushMock).toHaveBeenCalledWith(`/work/${door.slug}`);
  });

  it("renders DoorsWall with 'Magic happens behind the doors' headline", () => {
    render(<DoorsWall />);

    expect(screen.getByText(/Magic happens behind the doors/i)).toBeInTheDocument();

    for (const door of doors.slice(0, 4)) {
      expect(screen.getByText(door.plateTitle || door.title)).toBeInTheDocument();
    }
  });
});
