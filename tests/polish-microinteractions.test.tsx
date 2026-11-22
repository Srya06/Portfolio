import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FloatingDock } from "@/components/motion/FloatingDock";
import { CardSpotlight } from "@/components/motion/CardSpotlight";
import { BackgroundGrid } from "@/components/motion/BackgroundGrid";
import { ShimmerButton } from "@/components/motion/ShimmerButton";

describe("Chunk 7: Polish & Micro-interactions", () => {
  describe("FloatingDock Component", () => {
    it("renders floating navigation dock with navigation links and social triggers", () => {
      render(<FloatingDock />);

      expect(screen.getByRole("navigation", { name: /floating quick navigation dock/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/Jump to Top/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Jump to Disciplines/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/GitHub/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/LinkedIn/i)).toBeInTheDocument();
    });
  });

  describe("CardSpotlight Component", () => {
    it("renders children and handles mouse hover tracking", () => {
      render(
        <CardSpotlight className="test-card">
          <span>Spotlight Content</span>
        </CardSpotlight>
      );

      const content = screen.getByText("Spotlight Content");
      expect(content).toBeInTheDocument();

      const container = content.closest(".test-card");
      expect(container).toBeInTheDocument();

      if (container) {
        fireEvent.mouseEnter(container);
        fireEvent.mouseMove(container, { clientX: 50, clientY: 50 });
        fireEvent.mouseLeave(container);
      }
    });
  });

  describe("BackgroundGrid Component", () => {
    it("renders ambient background grid and glow layers", () => {
      const { container } = render(<BackgroundGrid />);
      expect(container.querySelector("svg")).toBeInTheDocument();
      expect(container.querySelector("pattern")).toBeInTheDocument();
    });
  });

  describe("ShimmerButton Component", () => {
    it("renders button label and fires onClick handler", () => {
      const handleClick = vi.fn();
      render(
        <ShimmerButton onClick={handleClick}>
          <span>Explore Now</span>
        </ShimmerButton>
      );

      const button = screen.getByRole("button", { name: /Explore Now/i });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
