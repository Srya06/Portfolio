import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { RollingCounter } from "@/components/motion/RollingCounter";
import { story } from "@/content/story";

describe("Chunk 5: Story Timeline & Milestones", () => {
  it("renders RollingCounter with padded digits", () => {
    render(<RollingCounter current={1} total={5} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("/05")).toBeInTheDocument();
  });

  it("renders StoryTimeline with MIT Mysore education milestone", () => {
    render(<StoryTimeline />);
    expect(screen.getAllByText(/My Engineering Story/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Maharaja Institute of Technology Mysore/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/B.E. in Computer Science & Engineering/i).length
    ).toBeGreaterThan(0);
  });

  it("navigates milestones via next and previous buttons", () => {
    render(<StoryTimeline />);

    const nextBtn = screen.getByRole("button", { name: /next story milestone/i });
    expect(nextBtn).toBeInTheDocument();

    // Click Next milestone (moves to Milestone 2: Student Leadership)
    fireEvent.click(nextBtn);

    expect(
      screen.getAllByText(/Student Coordinator & Workshop Mentor/i).length
    ).toBeGreaterThan(0);

    // Click Previous milestone (returns to Milestone 1: Education)
    const prevBtn = screen.getByRole("button", { name: /previous story milestone/i });
    fireEvent.click(prevBtn);

    expect(
      screen.getAllByText(/B.E. in Computer Science & Engineering/i).length
    ).toBeGreaterThan(0);
  });

  it("verifies story data schema and confirmed milestones", () => {
    expect(story.length).toBe(5);
    for (const item of story) {
      expect(item.id).toBeDefined();
      expect(item.title).toBeDefined();
      expect(item.organisation).toBeDefined();
      expect(item.period).toBeDefined();
      expect(item.bullets.length).toBeGreaterThanOrEqual(2);
      expect(item.status).toBe("confirmed");
    }
  });
});
