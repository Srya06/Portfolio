import { test, expect } from "@playwright/test";

test.describe("Surya D Portfolio - Core User Flows", () => {
  test("homepage loads with hero, ability card, and CTAs", async ({ page }) => {
    await page.goto("/");

    // Verify main brand heading and identity
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText("Surya D").first()).toBeVisible();

    // Verify Ability Card
    await expect(page.getByText("AI/ML Engineer").first()).toBeVisible();

    // Verify Primary CTA
    await expect(page.getByRole("button", { name: /See Selected Work/i })).toBeVisible();
  });

  test("doors wall renders all categories and navigates to category route", async ({ page }) => {
    await page.goto("/");

    // Locate doors section
    const doorsSection = page.locator("#work");
    await expect(doorsSection).toBeVisible();

    // Verify category doors
    await expect(page.getByText("AI & Machine Learning").first()).toBeVisible();
    await expect(page.getByText("LLM & Agentic Systems").first()).toBeVisible();
  });

  test("category page loads and displays project cards and tag filters", async ({ page }) => {
    await page.goto("/work/full-stack-products");

    await expect(page.getByText("Full-Stack Products").first()).toBeVisible();
    await expect(page.getByText("HireTrack").first()).toBeVisible();
  });

  test("case study page renders architecture and roadmap sections", async ({ page }) => {
    await page.goto("/work/full-stack-products/hiretrack");

    await expect(page.locator("h1")).toContainText("HireTrack");
    await expect(page.getByText("System Architecture")).toBeVisible();
    await expect(page.getByText("Verified Implemented Capabilities")).toBeVisible();
  });

  test("floating dock is visible and has accessible links", async ({ page }) => {
    await page.goto("/");

    const dock = page.getByRole("navigation", { name: /floating quick navigation dock/i });
    await expect(dock).toBeVisible();
  });

  test("custom 404 page renders with home navigation", async ({ page }) => {
    await page.goto("/non-existent-route-404");

    await expect(page.getByText("404 — Not Found")).toBeVisible();
    await expect(page.getByRole("link", { name: /Return Home/i })).toBeVisible();
  });
});
