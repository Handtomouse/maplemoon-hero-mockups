#!/usr/bin/env node
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const url = "http://127.0.0.1:4328/style-kit-playground.html?review=031";
const failures = [];
const pass = (message) => console.log(`PASS ${message}`);
const fail = (message) => { failures.push(message); console.log(`FAIL ${message}`); };

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("console", (message) => { if (message.type() === "error") errors.push(`console:${message.text()}`); });
page.on("pageerror", (error) => errors.push(`page:${error.message}`));
page.on("requestfailed", (request) => errors.push(`request:${request.url()}:${request.failure()?.errorText}`));

await page.goto(`${url}#overlays-states`, { waitUntil: "networkidle" });

const checks = [
  {
    name: "modal",
    trigger: "[data-modal-open]",
    open: () => page.evaluate(() => ({
      state: document.querySelector("#specimen-modal")?.open,
      active: document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent?.trim(),
    })),
    closed: () => page.evaluate(() => ({
      state: !document.querySelector("#specimen-modal")?.open,
      returned: document.activeElement === document.querySelector("[data-modal-open]"),
    })),
  },
  {
    name: "drawer",
    trigger: "[data-drawer-open]",
    open: () => page.evaluate(() => {
      const panel = document.querySelector("#specimen-drawer");
      const style = getComputedStyle(panel);
      return {
        state: document.querySelector("[data-drawer-demo]")?.classList.contains("is-open"),
        active: document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent?.trim(),
        backgroundColor: style.backgroundColor,
        backgroundImage: style.backgroundImage,
        opacity: style.opacity,
        pageInert: document.querySelector(".drawer-demo-page")?.inert,
      };
    }),
    closed: () => page.evaluate(() => ({
      state: !document.querySelector("[data-drawer-demo]")?.classList.contains("is-open"),
      returned: document.activeElement === document.querySelector("[data-drawer-open]"),
    })),
  },
  {
    name: "popover",
    trigger: "[data-popover-toggle]",
    open: () => page.evaluate(() => ({
      state: !document.querySelector("#specimen-popover")?.hidden,
      active: document.activeElement?.id,
    })),
    closed: () => page.evaluate(() => ({
      state: document.querySelector("#specimen-popover")?.hidden,
      returned: document.activeElement === document.querySelector("[data-popover-toggle]"),
    })),
  },
];

for (const check of checks) {
  await page.click(check.trigger);
  const opened = await check.open();
  if (opened.state) pass(`${check.name} focus entry/open state ${JSON.stringify(opened)}`);
  else fail(`${check.name} did not open ${JSON.stringify(opened)}`);
  if (check.name === "drawer") {
    if (opened.backgroundColor === "rgb(247, 243, 234)" && opened.backgroundImage === "none" && opened.opacity === "1" && opened.pageInert === true) {
      pass("drawer is fully opaque and contained catalogue page is inert");
    } else fail(`drawer opacity/inertness ${JSON.stringify(opened)}`);
  }
  await page.keyboard.press("Escape");
  const closed = await check.closed();
  if (closed.state && closed.returned) pass(`${check.name} Escape close and focus return`);
  else fail(`${check.name} Escape/focus return ${JSON.stringify(closed)}`);
}

await page.goto(`${url}#shell`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  const images = [...document.images];
  for (const image of images) {
    image.loading = "eager";
    image.scrollIntoView({ block: "center" });
  }
  window.scrollTo(0, 0);
  await Promise.race([
    Promise.all(images.map((image) => image.complete
      ? Promise.resolve()
      : new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        }))),
    new Promise((resolve) => setTimeout(resolve, 2500)),
  ]);
});
const mobileContents = await page.evaluate(() => {
  const button = document.querySelector(".catalogue-menu-button");
  const details = document.querySelector(".catalogue-contents");
  const visible = (element) => {
    const rect = element?.getBoundingClientRect();
    const style = element ? getComputedStyle(element) : null;
    return Boolean(rect && rect.width > 0 && rect.height > 0 && style?.display !== "none" && style?.visibility !== "hidden");
  };
  return {
    buttonVisible: visible(button),
    label: button?.textContent?.trim(),
    detailsPresent: Boolean(details),
    h1: document.querySelectorAll("h1").length,
    landmarks: ["header", "nav", "main", "footer"].map((tag) => [tag, document.querySelectorAll(tag).length]),
  };
});
if (mobileContents.buttonVisible && mobileContents.label === "Contents" && mobileContents.h1 === 1 && mobileContents.landmarks.every(([, count]) => count > 0)) {
  pass(`mobile catalogue contents/landmarks ${JSON.stringify(mobileContents)}`);
} else fail(`mobile catalogue contents/landmarks ${JSON.stringify(mobileContents)}`);

const assets = await page.evaluate(() => [...document.images].map((image) => ({
  src: image.currentSrc || image.src,
  complete: image.complete,
  naturalWidth: image.naturalWidth,
  naturalHeight: image.naturalHeight,
})));
if (assets.length > 0 && assets.every((asset) => asset.complete && asset.naturalWidth > 0 && asset.naturalHeight > 0)) {
  pass(`image requests nonblank ${assets.length}/${assets.length}`);
} else fail(`image request/dimension failure ${JSON.stringify(assets.filter((asset) => !asset.complete || !asset.naturalWidth || !asset.naturalHeight))}`);

if (errors.length === 0) pass("independent console/page/request errors=0");
else fail(`independent browser errors ${JSON.stringify(errors)}`);

await browser.close();
if (failures.length) {
  console.log(`RESULT FAIL independent_browser=${failures.length}`);
  process.exit(1);
}
console.log("RESULT PASS independent_browser=0 overlays=modal,drawer,popover focus=entry,escape,return drawer=opaque mobile_contents=present");
