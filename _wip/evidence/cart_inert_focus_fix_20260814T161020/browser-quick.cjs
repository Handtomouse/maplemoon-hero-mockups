const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const origin = "http://127.0.0.1:4402";
const out = __dirname;

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto(`${origin}/shop.html?cart-qa=1`, { waitUntil: "load" });
  await page.waitForFunction(() => document.querySelectorAll(".pcard[data-mm-availability]").length === 24);
  const shop = await page.evaluate(() => ({
    status: document.readyState,
    content: document.body.innerText.trim().length,
    overlay: Boolean(document.querySelector("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay")),
    cards: document.querySelectorAll(".pcard[data-mm-availability]").length,
    dialog: Boolean(document.getElementById("mmCartDialog")),
    header: Boolean(document.querySelector("[data-mm-chrome]"))
  }));
  await page.screenshot({ path: path.join(out, "browser-quick-shop-390.png") });
  const homeResponse = await page.goto(`${origin}/homepage.html?cart-qa=1`, { waitUntil: "load" });
  const home = await page.evaluate(() => ({
    content: document.body.innerText.trim().length,
    heading: document.querySelector('h1 img[alt="Carob"]')?.getAttribute("alt") || "",
    overlay: Boolean(document.querySelector("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay"))
  }));
  const result = {
    schema: "maplemoon-browser-quick/v1",
    outcome:
      response?.status() === 200 &&
      homeResponse?.status() === 200 &&
      shop.status === "complete" &&
      shop.content > 1000 &&
      shop.cards === 24 &&
      shop.dialog &&
      shop.header &&
      !shop.overlay &&
      home.content > 1000 &&
      home.heading &&
      !home.overlay &&
      errors.length === 0
        ? "PASS"
        : "FAIL",
    agent_browser: { available: false, fallback: "Bundled Playwright with system Google Chrome" },
    shop_http: response?.status() || null,
    home_http: homeResponse?.status() || null,
    shop,
    home,
    errors
  };
  fs.writeFileSync(path.join(out, "browser-quick.json"), `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
  if (result.outcome !== "PASS") process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
