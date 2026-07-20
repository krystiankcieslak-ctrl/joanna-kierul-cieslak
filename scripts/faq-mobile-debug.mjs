import { chromium, devices } from "playwright";

const mode = process.argv[2] ?? "plain";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  ...devices["iPhone 13"],
  hasTouch: true,
});
const page = await context.newPage();

const faqLogs = [];
page.on("console", (msg) => {
  const text = msg.text();
  if (text.includes("FAQ")) faqLogs.push(text);
});

await page.goto("http://localhost:3000/#faq", { waitUntil: "networkidle" });
await page.waitForSelector("#faq button");

const button = page.locator("#faq button").first();
await button.scrollIntoViewIfNeeded();
await button.tap();
await page.waitForTimeout(400);

const ariaExpanded = await button.getAttribute("aria-expanded");
const panel = page.locator("#faq [role='region']").first();
const panelExists = (await page.locator("#faq [role='region']").count()) > 0;
const panelVisible = panelExists ? await panel.isVisible() : false;
const panelBox = panelExists ? await panel.boundingBox() : null;
const answerVisible = panelExists
  ? await panel.locator("p").isVisible()
  : false;
const answerText = panelExists
  ? await panel.locator("p").textContent()
  : null;
const panelStyles = panelExists
  ? await panel.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        display: s.display,
        visibility: s.visibility,
        opacity: s.opacity,
        overflow: s.overflow,
        height: s.height,
        maxHeight: s.maxHeight,
        gridTemplateRows: s.gridTemplateRows,
        clipPath: s.clipPath,
      };
    })
  : null;

const clickFired = faqLogs.some((l) => l.includes("FAQ button clicked"));
const stateChanged = faqLogs.some(
  (l) => l.includes("willBeOpen: true") || l.includes("next: faq-"),
);

console.log(`=== FAQ MOBILE DEBUG mode=${mode} ===`);
console.log("1. Click fired:", clickFired ? "YES" : "NO");
console.log("2. State changed:", stateChanged ? "YES" : "NO");
console.log(
  "3. Content renders (panel height > 0):",
  panelBox && panelBox.height > 0 && answerVisible ? "YES" : "NO",
);
console.log("aria-expanded:", ariaExpanded);
console.log("panel visible:", panelVisible);
console.log("panel box:", panelBox);
console.log("answer text:", answerText?.slice(0, 60));
console.log("panel styles:", panelStyles);

await browser.close();
