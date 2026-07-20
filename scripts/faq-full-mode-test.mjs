import { chromium, webkit, devices } from "playwright";

const PORT = process.env.PORT ?? "3000";
const URL = `http://localhost:${PORT}/#faq`;

async function run(browserType, label) {
  const browser = await browserType.launch({ headless: true });
  const context = await browser.newContext({
    ...devices["iPhone 13"],
    hasTouch: true,
  });
  const page = await context.newPage();

  const faqLogs = [];
  const errors = [];
  page.on("console", (msg) => {
    const text = msg.text();
    if (text.includes("FAQ")) faqLogs.push(text);
    if (msg.type() === "error") errors.push(text);
  });
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForSelector("#faq button");

  const hydrated = await page.evaluate(() => {
    const btn = document.querySelector("#faq button");
    return Object.keys(btn ?? {}).some((k) => k.startsWith("__react"));
  });

  const beforeRegions = await page.locator("#faq [role='region']").count();

  const button = page.locator("#faq button").first();
  await button.scrollIntoViewIfNeeded();
  await button.tap();
  await page.waitForTimeout(400);

  const ariaExpanded = await button.getAttribute("aria-expanded");
  const panel = page.locator("#faq [role='region']").first();
  const panelExists = (await page.locator("#faq [role='region']").count()) > 0;
  const panelBox = panelExists ? await panel.boundingBox() : null;
  const panelStyles = panelExists
    ? await panel.evaluate((el) => {
        const s = getComputedStyle(el);
        return {
          display: s.display,
          visibility: s.visibility,
          height: s.height,
          gridTemplateRows: s.gridTemplateRows,
          overflow: s.overflow,
        };
      })
    : null;

  const clickFired = faqLogs.some((l) => l.includes("FAQ button clicked"));
  const stateChanged = faqLogs.some((l) => l.includes("willBeOpen: true"));
  const contentVisible =
    ariaExpanded === "true" &&
    panelBox !== null &&
    panelBox.height > 0 &&
    (panelStyles?.visibility ?? "visible") !== "hidden";

  console.log(`--- ${label} ---`);
  console.log("Hydrated:", hydrated);
  console.log("Errors:", errors.slice(0, 3));
  console.log("Regions before tap:", beforeRegions);
  console.log("1. Click fired:", clickFired ? "YES" : "NO");
  console.log("2. State changed:", stateChanged ? "YES" : "NO");
  console.log("3. Content visible:", contentVisible ? "YES" : "NO");
  console.log("aria-expanded:", ariaExpanded);
  console.log("panel box:", panelBox);
  console.log("panel styles:", panelStyles);

  await browser.close();
}

await run(chromium, "Chromium iPhone 13 (full mode)");
try {
  await run(webkit, "WebKit iPhone 13 (full mode)");
} catch (e) {
  console.log("WebKit unavailable:", e.message);
}
