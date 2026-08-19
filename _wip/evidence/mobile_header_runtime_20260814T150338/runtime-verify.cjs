const fs = require('fs');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const baseUrl = 'http://127.0.0.1:4391';
const evidenceDir = '/Users/handtomouse/maplemoon-website/_wip/evidence/mobile_header_runtime_20260814T150338';
const routes = ['homepage', 'shop', 'our-story', 'carob-story', 'faq', 'stockists', 'pure-carob-bar'];
const widths = [390, 900, 1440];

async function captureBaseline(browser) {
  const rows = [];
  for (const route of routes) {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      const errors = [];
      const failedRequests = [];
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
      page.on('pageerror', error => errors.push(`PAGEERROR ${error.message}`));
      page.on('requestfailed', request => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText || 'failed'}`));
      const response = await page.goto(`${baseUrl}/${route}.html`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(100);
      const metrics = await page.evaluate(() => {
        const root = document.querySelector('[data-mm-chrome]');
        const main = document.querySelector('main') || root.nextElementSibling;
        const toggle = root.querySelector('[data-mm-menu-toggle]');
        const rootRect = root.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();
        const toggleStyle = getComputedStyle(toggle);
        if (!toggle.hidden && toggleStyle.display !== 'none') toggle.focus();
        const active = document.activeElement;
        return {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          scrollY: window.scrollY,
          header: {
            top: rootRect.top,
            bottom: rootRect.bottom,
            width: rootRect.width,
            height: rootRect.height,
            position: getComputedStyle(root).position,
            transform: getComputedStyle(root).transform,
          },
          firstMain: { top: mainRect.top, bottom: mainRect.bottom },
          drawerState: root.getAttribute('data-mm-menu-state'),
          menuOpen: document.body.hasAttribute('data-mm-menu-open'),
          toggle: { hidden: toggle.hidden, display: toggleStyle.display, expanded: toggle.getAttribute('aria-expanded') },
          focusTarget: active ? (active.id || (active.hasAttribute('data-mm-menu-toggle') ? 'menu-toggle' : active.tagName.toLowerCase())) : null,
        };
      });
      rows.push({ route, width, http: response.status(), errors, failedRequests, metrics });
      await page.close();
    }
  }
  fs.writeFileSync(`${evidenceDir}/baseline.json`, `${JSON.stringify(rows, null, 2)}\n`);
  return rows;
}

(async () => {
  const mode = process.argv[2];
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  let result;
  if (mode === 'baseline') result = await captureBaseline(browser);
  else throw new Error(`Unknown mode: ${mode}`);
  await browser.close();
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
