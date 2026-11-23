const { chromium } = require("@playwright/test");
const path = require("path");

async function captureModal() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  // Scroll to contact
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Click Hire me button in ContactSection
  const hireBtn = page.locator('#contact button:has-text("Hire me")');
  await hireBtn.click();
  await page.waitForTimeout(600);

  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "modal-verified.png") });
  console.log("Captured modal-verified.png");

  await browser.close();
}

captureModal().catch(console.error);
