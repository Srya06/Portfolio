import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryFilterGrid } from "@/components/sections/CategoryFilterGrid";
import { projects } from "@/content/projects";
import { doors } from "@/content/doors";
import { generateStaticParams as generateCategoryParams } from "@/app/work/[category]/page";
import { generateStaticParams as generateCaseStudyParams } from "@/app/work/[category]/[slug]/page";

describe("Chunk 4: Category & Project Case Studies", () => {
  it("generates static params for all 5 category routes", async () => {
    const params = await generateCategoryParams();
    expect(params.length).toBe(doors.length);
    const slugs = params.map((p) => p.category);
    expect(slugs).toContain("ai-ml");
    expect(slugs).toContain("agentic-systems");
    expect(slugs).toContain("full-stack-products");
    expect(slugs).toContain("computer-vision");
    expect(slugs).toContain("engineering-labs");
  });

  it("generates static params for all 6 curated case studies", async () => {
    const params = await generateCaseStudyParams();
    expect(params.length).toBe(6);
    const slugs = params.map((p) => p.slug);
    expect(slugs).toContain("hiretrack");
    expect(slugs).toContain("defend-x");
    expect(slugs).toContain("krishi-sakhi");
    expect(slugs).toContain("derma-ai");
    expect(slugs).toContain("public-transport-demand");
    expect(slugs).toContain("campus-ai-assistant");
  });

  it("renders CategoryFilterGrid and filters by tech tag dynamically", () => {
    const aimlProjects = projects.filter((p) => p.category === "ai-ml");
    render(<CategoryFilterGrid projects={aimlProjects} categorySlug="ai-ml" />);

    expect(screen.getByText("Krishi Sakhi")).toBeInTheDocument();
    expect(screen.getByText("AI-Powered Public Transport Demand Forecasting")).toBeInTheDocument();

    // Find and click AgriTech filter
    const agritechBtn = screen.getByRole("button", { name: "AgriTech" });
    fireEvent.click(agritechBtn);

    expect(screen.getByText("Krishi Sakhi")).toBeInTheDocument();
    expect(screen.queryByText("AI-Powered Public Transport Demand Forecasting")).not.toBeInTheDocument();

    // Click All to reset
    const allBtn = screen.getByRole("button", { name: "All" });
    fireEvent.click(allBtn);

    expect(screen.getByText("AI-Powered Public Transport Demand Forecasting")).toBeInTheDocument();
  });

  it("enforces integrity guardrails: DermaAI has educational/research disclaimer", () => {
    const derma = projects.find((p) => p.slug === "derma-ai");
    expect(derma).toBeDefined();
    expect(derma?.disclaimer).toBeDefined();
    expect(derma?.disclaimer?.toLowerCase()).toContain("educational");
  });

  it("verifies all projects separate implemented features from planned roadmap", () => {
    for (const project of projects) {
      expect(project.implementedFeatures.length).toBeGreaterThan(0);
      expect(project.plannedRoadmap.length).toBeGreaterThan(0);
      expect(project.architecture.length).toBeGreaterThan(0);
      expect(project.evaluation).toBeDefined();
      expect(project.limitations).toBeDefined();
    }
  });
});
