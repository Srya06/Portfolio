import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactFlow } from "@/components/sections/ContactFlow";

describe("ContactFlow Component", () => {
  it("renders when open and displays collaboration categories in step 1", () => {
    render(<ContactFlow isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/What kind of project or role are we discussing/i)).toBeInTheDocument();
    expect(screen.getByText("Applied AI / Machine Learning")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Development")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<ContactFlow isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("advances to Step 2 when an option is selected", () => {
    render(<ContactFlow isOpen={true} onClose={vi.fn()} />);

    const fullStackBtn = screen.getByText("Full-Stack Development");
    fireEvent.click(fullStackBtn);

    expect(screen.getByText(/Project & Contact Details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email \*/i)).toBeInTheDocument();
  });

  it("can directly render Step 2 with initialStep prop", () => {
    render(<ContactFlow isOpen={true} onClose={vi.fn()} initialStep={2} initialNeed="agentic-systems" />);

    expect(screen.getByText(/Project & Contact Details/i)).toBeInTheDocument();
    expect(screen.getByText(/agentic-systems/i)).toBeInTheDocument();
  });

  it("provides direct email fallback with correct mailto link", () => {
    render(<ContactFlow isOpen={true} onClose={vi.fn()} />);

    const mailLink = screen.getByRole("link", { name: /sryaraj06@gmail.com/i });
    expect(mailLink).toHaveAttribute("href", expect.stringContaining("mailto:sryaraj06@gmail.com"));
  });
});
