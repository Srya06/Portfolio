const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

async function capture() {
  const screenshotsDir = path.join(process.cwd(), "screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const consoleLogs = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleLogs.push(msg.text());
    }
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000); // Allow preloader and hero animations to settle

  // 1. Hero & Top View
  await page.screenshot({ path: path.join(screenshotsDir, "01-hero-abilitycard.png") });
  console.log("Captured 01-hero-abilitycard.png");

  // 2. Scroll to Doors Wall
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "02-doors-wall.png") });
  console.log("Captured 02-doors-wall.png");

  // 3. Scroll to Story Timeline
  await page.locator("#story").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, "03-story-timeline.png") });
  console.log("Captured 03-story-timeline.png");

  // 4. Contact Flow Modal
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const inquiryBtn = page.getByRole("button", { name: /Start Interactive Inquiry/i });
  await inquiryBtn.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, "05-contact-modal-step1.png") });
  console.log("Captured 05-contact-modal-step1.png");

  // Advance to Step 2 inside dialog
  await page.locator('[role="dialog"]').getByText("Applied AI / Machine Learning").click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, "06-contact-modal-step2.png") });
  console.log("Captured 06-contact-modal-step2.png");

  // Close modal
  await page.locator('[role="dialog"]').getByLabel("Close dialog").click();
  await page.waitForTimeout(500);

  // 5. Category Page
  await page.goto("http://localhost:3000/work/full-stack-products", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "07-category-page.png") });
  console.log("Captured 07-category-page.png");

  // 6. Project Case Study Page
  await page.goto("http://localhost:3000/work/full-stack-products/hiretrack", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "08-case-study-page.png") });
  console.log("Captured 08-case-study-page.png");

  await browser.close();

  console.log("\n--- Review Summary ---");
  console.log("Console errors detected:", consoleLogs.length);
  if (consoleLogs.length > 0) {
    console.log("Errors:", consoleLogs);
  } else {
    console.log("Zero console errors! Flawless rendering.");
  }
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
