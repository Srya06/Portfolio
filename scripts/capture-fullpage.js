const { chromium } = require("@playwright/test");
const path = require("path");

async function captureFullPage() {
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

  // Hero screenshot
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "hero-verified.png") });
  console.log("Captured hero-verified.png");

  // Doors neutral screenshot
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "doors-neutral-verified.png") });
  console.log("Captured doors-neutral-verified.png");

  await browser.close();
}

captureFullPage().catch(console.error);
