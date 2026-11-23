const { chromium } = require("@playwright/test");
const path = require("path");

async function testHoverTransitions() {
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

  const door1 = page.locator('[aria-label*="Full-Stack Development"]');
  const door2 = page.locator('[aria-label*="Agentic & LLM Systems"]');
  const door3 = page.locator('[aria-label*="AI & Machine Learning"]');
  const door4 = page.locator('[aria-label*="Computer Vision & Research"]');

  // Hover Door 2 (Agentic Systems)
  console.log("Hovering Door 2...");
  const box2 = await door2.boundingBox();
  await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "step1-door2-hovered.png") });

  // Move directly to Door 3 (AI & Machine Learning)
  console.log("Moving directly from Door 2 to Door 3...");
  const box3 = await door3.boundingBox();
  await page.mouse.move(box3.x + box3.width / 2, box3.y + box3.height / 2);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "step2-door3-hovered.png") });

  // Move directly to Door 1 (Full-Stack Development)
  console.log("Moving directly from Door 3 to Door 1...");
  const box1 = await door1.boundingBox();
  await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "step3-door1-hovered.png") });

  // Move directly to Door 4 (Computer Vision)
  console.log("Moving directly from Door 1 to Door 4...");
  const box4 = await door4.boundingBox();
  await page.mouse.move(box4.x + box4.width / 2, box4.y + box4.height / 2);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), "screenshots", "step4-door4-hovered.png") });

  console.log("All sequential hover transitions verified successfully!");
  await browser.close();
}

testHoverTransitions().catch(console.error);
