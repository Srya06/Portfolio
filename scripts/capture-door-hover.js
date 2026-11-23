const { chromium } = require("@playwright/test");
const path = require("path");

async function captureHover() {
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

  // Scroll to doors wall
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Hover over Door 1 (Full-Stack Development)
  const firstDoor = page.locator("#work").locator('[role="button"]').first();
  await firstDoor.hover();
  await page.waitForTimeout(700);

  // Screenshot open door state
  const screenshotPath = path.join(process.cwd(), "screenshots", "09-door-hover-opened.png");
  await page.screenshot({ path: screenshotPath });
  console.log("Captured 09-door-hover-opened.png");

  await browser.close();
}

captureHover().catch(console.error);
