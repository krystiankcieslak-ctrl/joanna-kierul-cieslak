import { chromium, devices } from "playwright";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  ...devices["iPhone 13"],
  hasTouch: true,
});
const page = await context.newPage();

const errors = [];
page.on("pageerror", (err) => errors.push(err.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

await page.goto("http://localhost:3000/#faq", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const hydration = await page.evaluate(() => {
  const btn = document.querySelector("#faq button");
  const keys = btn ? Object.keys(btn).filter((k) => k.startsWith("__react")) : [];
  return {
    hasReactProps: keys.length > 0,
    reactKeys: keys,
    regionCount: document.querySelectorAll("#faq [role='region']").length,
    htmlSnippet: document.querySelector("#faq")?.innerHTML.slice(0, 500),
  };
});

console.log("Page errors:", errors);
console.log("Hydration:", hydration);

await browser.close();
