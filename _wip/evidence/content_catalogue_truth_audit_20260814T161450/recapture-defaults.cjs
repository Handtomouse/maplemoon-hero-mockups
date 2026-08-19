const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const baseUrl = 'http://127.0.0.1:4391';
const evidenceDir = '/Users/handtomouse/maplemoon-website/_wip/evidence/content_catalogue_truth_audit_20260814T161450';
const routes = ['homepage', 'our-story', 'carob-story', 'shop', 'faq', 'stockists', 'pure-carob-bar'];
const widths = [390, 1440];

async function readDefaultState(page) {
  return page.evaluate(() => {
    const normal = value => String(value || '').replace(/\s+/g, ' ').trim();
    const cart = document.getElementById('mmCartDialog');
    const chrome = document.querySelector('[data-mm-chrome]');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const fragments = [];
    while (walker.nextNode()) {
      const textNode = walker.currentNode;
      const parent = textNode.parentElement;
      if (!parent || !normal(textNode.nodeValue)) continue;
      if (parent.closest('script,style,noscript,template,[hidden],[aria-hidden="true"],[inert]')) continue;
      if (chrome?.getAttribute('data-mm-menu-state') === 'closed' && parent.closest('[data-mm-mobile-drawer]')) continue;
      const style = getComputedStyle(parent);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
      if (parent.getClientRects().length === 0) continue;
      fragments.push(normal(textNode.nodeValue));
    }
    return {
      title: document.title,
      reachableText: normal(fragments.join(' ')),
      cart: {
        classOpen: Boolean(cart?.classList.contains('is-open')),
        ariaHidden: cart?.getAttribute('aria-hidden') || null,
        inert: Boolean(cart?.hasAttribute('inert')),
      },
      drawerState: chrome?.getAttribute('data-mm-menu-state') || null,
      geometry: {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
      },
    };
  });
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const rows = [];
  for (const route of routes) {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
      const page = await context.newPage();
      const failures = [];
      page.on('pageerror', error => failures.push(`PAGEERROR ${error.message}`));
      page.on('requestfailed', request => failures.push(`${request.method()} ${request.url()} ${request.failure()?.errorText || 'failed'}`));
      const response = await page.goto(`${baseUrl}/${route}.html`, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(180);
      const state = await readDefaultState(page);
      const screenshot = path.join(evidenceDir, `${route}_${width}_default.png`);
      await page.screenshot({ path: screenshot, fullPage: false });
      rows.push({ route, width, http: response.status(), state, failures, screenshot });
      await context.close();
    }
  }
  await browser.close();
  const resultPath = path.join(evidenceDir, 'default-state-results.json');
  fs.writeFileSync(resultPath, `${JSON.stringify(rows, null, 2)}\n`);
  const failures = [];
  for (const row of rows) {
    const key = `${row.route}@${row.width}`;
    if (row.http !== 200) failures.push(`${key} HTTP ${row.http}`);
    if (row.state.geometry.clientWidth !== row.width || row.state.geometry.scrollWidth !== row.width) failures.push(`${key} geometry`);
    if (row.state.cart.classOpen || row.state.cart.ariaHidden !== 'true' || !row.state.cart.inert) failures.push(`${key} default cart state`);
    if (row.width === 390 && row.state.drawerState !== 'closed') failures.push(`${key} default drawer state`);
    if (!row.state.reachableText) failures.push(`${key} blank reachable text`);
    if (row.failures.length) failures.push(`${key} runtime/request failure`);
    const size = fs.statSync(row.screenshot).size;
    if (size === 0) failures.push(`${key} blank screenshot`);
  }
  console.log(JSON.stringify({ cases: rows.length, screenshots: rows.length, failures }, null, 2));
  if (failures.length) process.exitCode = 2;
}

run().catch(error => {
  console.error(error.stack || error);
  process.exit(1);
});
