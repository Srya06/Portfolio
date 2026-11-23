const { chromium } = require("@playwright/test");
const path = require("path");

async function captureAll() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. Hero
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "01-hero-framed.png") });
  console.log("Captured 01-hero-framed.png");

  // 2. Doors
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "02-doors-framed.png") });
  console.log("Captured 02-doors-framed.png");

  // 3. Story
  await page.locator("#story").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "03-story-framed.png") });
  console.log("Captured 03-story-framed.png");

  // 4. Contact & Footer
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "04-contact-framed.png") });
  console.log("Captured 04-contact-framed.png");

  // 5. Open Hire Me Modal
  const hireBtn = page.locator('button:has-text("Hire me")').first();
  await hireBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "05-hire-modal-framed.png") });
  console.log("Captured 05-hire-modal-framed.png");

  // Close modal
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);

  // 6. Category Page
  await page.goto("http://localhost:3000/work/full-stack-products", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "06-discipline-category-framed.png") });
  console.log("Captured 06-discipline-category-framed.png");

  await browser.close();
}

captureAll().catch(console.error);
