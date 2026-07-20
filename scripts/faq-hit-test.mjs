import { chromium, devices } from "playwright";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  ...devices["iPhone 13"],
  hasTouch: true,
});
const page = await context.newPage();

const logs = [];
page.on("console", (msg) => logs.push(msg.text()));

await page.goto("http://localhost:3000/#faq", { waitUntil: "networkidle" });
await page.waitForSelector("#faq button");

const before = await page.evaluate(() => ({
  regions: document.querySelectorAll("#faq [role='region']").length,
  firstExpanded: document.querySelector("#faq button")?.getAttribute("aria-expanded"),
}));

const button = page.locator("#faq button").first();
await button.scrollIntoViewIfNeeded();

const hitTarget = await button.evaluate((el) => {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const top = document.elementFromPoint(cx, cy);
  return {
    cx,
    cy,
    topTag: top?.tagName,
    topId: top?.id,
    isButton: top === el || el.contains(top),
  };
});

await button.tap();
await page.waitForTimeout(500);

const after = await page.evaluate(() => ({
  regions: document.querySelectorAll("#faq [role='region']").length,
  firstExpanded: document.querySelector("#faq button")?.getAttribute("aria-expanded"),
  regionHeights: [...document.querySelectorAll("#faq [role='region']")].map((el) =>
    el.getBoundingClientRect().height,
  ),
}));

console.log("Before tap:", before);
console.log("Hit target:", hitTarget);
console.log("After tap:", after);
console.log(
  "FAQ logs:",
  logs.filter((l) => l.includes("FAQ")),
);

await browser.close();
