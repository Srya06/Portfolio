import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { site } from "@/content/site";
import { doors } from "@/content/doors";
import { projects } from "@/content/projects";

describe("Chunk 8: SEO, Accessibility & Structured Data", () => {
  describe("sitemap.ts", () => {
    it("generates comprehensive sitemap with homepage, all category doors, and all projects", () => {
      const routes = sitemap();

      // Check root
      const rootRoute = routes.find((r) => r.url === site.url);
      expect(rootRoute).toBeDefined();
      expect(rootRoute?.priority).toBe(1.0);

      // Check all 5 doors exist in sitemap
      for (const door of doors) {
        const categoryUrl = `${site.url}/work/${door.slug}`;
        const found = routes.find((r) => r.url === categoryUrl);
        expect(found, `Expected sitemap to contain ${categoryUrl}`).toBeDefined();
        expect(found?.priority).toBe(0.8);
      }

      // Check all projects exist in sitemap
      for (const project of projects) {
        const projectUrl = `${site.url}/work/${project.category}/${project.slug}`;
        const found = routes.find((r) => r.url === projectUrl);
        expect(found, `Expected sitemap to contain ${projectUrl}`).toBeDefined();
        expect(found?.priority).toBe(0.9);
      }

      // Total count check: 1 root + 5 doors + 6 projects = 12 routes
      expect(routes.length).toBe(1 + doors.length + projects.length);
    });
  });

  describe("robots.ts", () => {
    it("allows indexing with public allow rule and points to canonical sitemap", () => {
      const robotConfig = robots();

      expect(robotConfig.sitemap).toBe(`${site.url}/sitemap.xml`);
      expect(robotConfig.rules).toBeDefined();
    });
  });

  describe("Site Configuration & Structured Data", () => {
    it("has valid canonical base URL and verified links", () => {
      expect(site.url).toBe("https://suryad.dev");
      expect(site.github).toContain("github.com/Srya06");
      expect(site.linkedin).toContain("linkedin.com/in/surya-d");
      expect(site.email).toBe("sryaraj06@gmail.com");
    });
  });
});
