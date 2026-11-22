import { describe, it, expect } from "vitest";
import { site } from "@/content/site";
import { doors } from "@/content/doors";
import { projects } from "@/content/projects";

describe("Chunk 0 Smoke Tests", () => {
  it("loads candidate site profile", () => {
    expect(site.name).toBe("Surya D");
    expect(site.role).toContain("AI/ML Engineer");
  });

  it("loads door categories", () => {
    expect(doors.length).toBeGreaterThanOrEqual(5);
  });

  it("loads curated projects with integrity properties", () => {
    expect(projects.length).toBe(6);
    for (const project of projects) {
      expect(project.slug).toBeDefined();
      expect(project.repo).toContain("github.com/Srya06");
      expect(project.evidenceNeeded.length).toBeGreaterThan(0);
    }
  });
});
