import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AbilityCard } from "@/components/sections/AbilityCard";
import { TextReveal } from "@/components/motion/TextReveal";
import { RoleMarquee } from "@/components/sections/RoleMarquee";
import { Preloader } from "@/components/motion/Preloader";
import { Hero } from "@/components/sections/Hero";

describe("Hero & Ability Card Components", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders AbilityCard with candidate details and skill tags", () => {
    render(<AbilityCard />);
    expect(screen.getByText("Surya D")).toBeInTheDocument();
    expect(screen.getByText(/AI\/ML Engineer/i)).toBeInTheDocument();
    expect(screen.getByText("Python & PyTorch")).toBeInTheDocument();
    expect(screen.getByText("Agentic LLMs")).toBeInTheDocument();
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
    expect(screen.getByText("ENTER WORKBENCH")).toBeInTheDocument();
  });

  it("triggers scroll on AbilityCard interaction", () => {
    const scrollMock = vi.fn();
    const mockElem = document.createElement("div");
    mockElem.id = "work";
    mockElem.scrollIntoView = scrollMock;
    document.body.appendChild(mockElem);

    render(<AbilityCard />);
    const card = screen.getByRole("button", { name: /interactive ability identification card/i });
    fireEvent.click(card);

    expect(scrollMock).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(mockElem);
  });

  it("renders TextReveal with given text", () => {
    render(<TextReveal text="Building useful AI products" />);
    expect(screen.getByText("Building")).toBeInTheDocument();
    expect(screen.getByText("products")).toBeInTheDocument();
  });

  it("renders RoleMarquee items", () => {
    render(<RoleMarquee />);
    expect(screen.getAllByText(/APPLIED AI & MACHINE LEARNING/i).length).toBeGreaterThan(0);
  });

  it("renders Preloader when not seen in session", () => {
    render(<Preloader />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });

  it("skips Preloader when seen in session", () => {
    sessionStorage.setItem("surya_preloader_seen", "true");
    const onComplete = vi.fn();
    const { container } = render(<Preloader onComplete={onComplete} />);
    expect(container.firstChild).toBeNull();
    expect(onComplete).toHaveBeenCalled();
  });

  it("renders Hero section with FlipCalendar and reference CTAs", () => {
    render(<Hero />);
    expect(screen.getByText(/Hi, I'm Surya/i)).toBeInTheDocument();
    expect(screen.getByText(/I am an/i)).toBeInTheDocument();
    expect(screen.getByText("Hire me")).toBeInTheDocument();
    expect(screen.getByText("See my work")).toBeInTheDocument();
    expect(screen.getByText("My ability card")).toBeInTheDocument();
  });
});
