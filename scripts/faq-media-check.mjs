import { chromium, devices } from "playwright";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  ...devices["iPhone 13"],
  hasTouch: true,
});
const page = await context.newPage();

await page.goto("http://localhost:3000/#faq");
const media = await page.evaluate(() => ({
  finePointer: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  hover: window.matchMedia("(hover: hover)").matches,
  pointerFine: window.matchMedia("(pointer: fine)").matches,
  pointerCoarse: window.matchMedia("(pointer: coarse)").matches,
  userAgent: navigator.userAgent,
}));

console.log("Media queries on iPhone 13 emulation:", media);

const motionWrapper = await page.evaluate(() => {
  const faq = document.querySelector("#faq");
  if (!faq) return null;
  let el = faq.querySelector(".max-w-3xl")?.parentElement;
  return {
    tagName: el?.tagName,
    style: el ? getComputedStyle(el).transform : null,
    hasMotionClass: el?.hasAttribute("style"),
  };
});

console.log("FAQ wrapper element:", motionWrapper);

await browser.close();
