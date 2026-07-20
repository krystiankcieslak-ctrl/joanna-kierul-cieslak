import { webkit, devices } from "playwright";

/** Simulates ORIGINAL MotionReveal bug: motion.div with animate y:0 on mobile */
async function test(label, url) {
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext({
    ...devices["iPhone 13"],
    hasTouch: true,
  });
  const page = await context.newPage();

  const logs = [];
  page.on("console", (msg) => {
    if (msg.text().includes("FAQ")) logs.push(msg.text());
  });

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector("#faq button");

  const wrapperTransform = await page.evaluate(() => {
    const card = document.querySelector("#faq .max-w-3xl");
    const wrapper = card?.parentElement;
    return wrapper
      ? {
          tag: wrapper.tagName,
          transform: getComputedStyle(wrapper).transform,
          pointerEvents: getComputedStyle(wrapper).pointerEvents,
        }
      : null;
  });

  const button = page.locator("#faq button").first();
  await button.scrollIntoViewIfNeeded();

  await button.tap();
  await page.waitForTimeout(300);

  const expanded = await button.getAttribute("aria-expanded");
  const clickFired = logs.some((l) => l.includes("FAQ button clicked"));

  console.log(`--- ${label} ---`);
  console.log("wrapper:", wrapperTransform);
  console.log("click fired:", clickFired ? "YES" : "NO");
  console.log("aria-expanded:", expanded);

  await browser.close();
}

await test("prod full (plain div wrapper on mobile)", "http://localhost:3002/#faq");
