const { chromium } = require("@playwright/test");
const path = require("path");

async function captureAllDoors() {
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

  // Get door elements by aria-label
  const door1 = page.locator('[aria-label*="Full-Stack Development"]');
  const door2 = page.locator('[aria-label*="Agentic & LLM Systems"]');
  const door3 = page.locator('[aria-label*="AI & Machine Learning"]');
  const door4 = page.locator('[aria-label*="Computer Vision & Research"]');

  // Door 1
  const box1 = await door1.boundingBox();
  if (box1) {
    await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(process.cwd(), "screenshots", "door-1-hover.png") });
    console.log("Captured door-1-hover.png");
  }

  // Door 2
  const box2 = await door2.boundingBox();
  if (box2) {
    await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(process.cwd(), "screenshots", "door-2-hover.png") });
    console.log("Captured door-2-hover.png");
  }

  // Door 3
  const box3 = await door3.boundingBox();
  if (box3) {
    await page.mouse.move(box3.x + box3.width / 2, box3.y + box3.height / 2);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(process.cwd(), "screenshots", "door-3-hover.png") });
    console.log("Captured door-3-hover.png");
  }

  // Door 4
  const box4 = await door4.boundingBox();
  if (box4) {
    await page.mouse.move(box4.x + box4.width / 2, box4.y + box4.height / 2);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(process.cwd(), "screenshots", "door-4-hover.png") });
    console.log("Captured door-4-hover.png");
  }

  await browser.close();
}

captureAllDoors().catch(console.error);
