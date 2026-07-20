import { chromium, devices } from "playwright";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ ...devices["iPhone 13"] });
const page = await context.newPage();

const failed = [];
page.on("response", (res) => {
  if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
});

await page.goto("http://localhost:3000/#faq", { waitUntil: "networkidle" }).catch(() => {});
console.log("Dev server (3000) failed requests:", failed.slice(0, 10));

await browser.close();

const browser2 = await chromium.launch({ headless: true });
const context2 = await browser2.newContext({ ...devices["iPhone 13"] });
const page2 = await context2.newPage();
const failed2 = [];
page2.on("response", (res) => {
  if (res.status() >= 400) failed2.push(`${res.status()} ${res.url()}`);
});
await page2.goto("http://localhost:3002/#faq", { waitUntil: "networkidle" });
console.log("Prod server (3002) failed requests:", failed2.slice(0, 10));
await browser2.close();
