import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Clock } from "@/components/layout/Clock";
import { AvailabilityPill } from "@/components/layout/AvailabilityPill";
import { RoleRotator } from "@/components/layout/RoleRotator";
import { Menu } from "@/components/layout/Menu";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Nav } from "@/components/layout/Nav";

describe("Navigation & Layout Components", () => {
  it("renders Clock with local time label", () => {
    render(<Clock />);
    expect(screen.getByText(/Local time/i)).toBeInTheDocument();
  });

  it("renders AvailabilityPill with default label", () => {
    render(<AvailabilityPill />);
    expect(screen.getByText("Available for work")).toBeInTheDocument();
  });

  it("renders RoleRotator initial role", () => {
    render(<RoleRotator />);
    expect(screen.getByText(/AI\/ML Engineer/i)).toBeInTheDocument();
  });

  it("renders Menu links when open and closes on Escape", () => {
    let closed = false;
    render(<Menu isOpen={true} onClose={() => { closed = true; }} />);
    expect(screen.getByText("Selected Work")).toBeInTheDocument();
    expect(screen.getByText("My Story")).toBeInTheDocument();
    expect(screen.getByText("Capabilities")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(closed).toBe(true);
  });

  it("renders Footer with wordmark and navigation columns", () => {
    render(<Footer />);
    expect(screen.getByText("Surya D")).toBeInTheDocument();
    expect(screen.getByText("WORK")).toBeInTheDocument();
    expect(screen.getByText("NAVIGATE")).toBeInTheDocument();
    expect(screen.getByText("STATUS")).toBeInTheDocument();
  });

  it("renders Nav with brand and main navigation links", () => {
    render(
      <ThemeProvider>
        <Nav />
      </ThemeProvider>
    );
    expect(screen.getByText("Surya D")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("My story")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});
