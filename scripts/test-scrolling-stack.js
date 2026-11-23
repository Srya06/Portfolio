const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

async function run() {
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

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  console.log("Navigating to http://localhost:3000/work/agentic-systems...");
  await page.goto("http://localhost:3000/work/agentic-systems", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  // Capture Card 1 initial sticky state
  await page.screenshot({ path: path.join(screenshotsDir, "work-agentic-card1.png") });
  console.log("Captured work-agentic-card1.png");

  // Scroll down by 500px to see card 2 scroll up and stack
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "work-agentic-card2-stack.png") });
  console.log("Captured work-agentic-card2-stack.png");

  // Scroll further down
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "work-agentic-stacked-cards.png") });
  console.log("Captured work-agentic-stacked-cards.png");

  // Test full-stack products
  await page.goto("http://localhost:3000/work/full-stack-products", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, "work-fullstack.png") });
  console.log("Captured work-fullstack.png");

  await browser.close();

  console.log("\nErrors:", errors.length === 0 ? "None!" : errors);
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
