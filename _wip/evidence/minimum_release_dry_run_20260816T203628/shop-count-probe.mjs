import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/minimum_release_dry_run_20260816T203628';
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const response = await page.goto('http://127.0.0.1:8787/shop', { waitUntil: 'networkidle' });
const result = await page.evaluate(() => {
  const cards = [...document.querySelectorAll('.pcard')];
  const byCategory = {};
  for (const card of cards) byCategory[card.dataset.cat] = (byCategory[card.dataset.cat] || 0) + 1;
  return {
    cards: cards.length,
    byCategory,
    addToCart: document.querySelectorAll('[data-add-to-cart]').length,
    enquire: cards.filter(card => card.querySelector('a[href^="mailto:"]')).length,
    productNames: cards.map(card => card.querySelector('h3')?.textContent.replace(/\s+/g, ' ').trim()),
  };
});
await browser.close();
const payload = { httpStatus: response?.status() || 0, ...result };
fs.writeFileSync(path.join(output, 'shop-count-results.json'), `${JSON.stringify(payload, null, 2)}\n`);
const positive = payload.httpStatus === 200 && Object.values(payload.byCategory).reduce((a, b) => a + b, 0) === payload.cards && payload.addToCart + payload.enquire === payload.cards;
console.log(`SHOP_COUNTS status=${payload.httpStatus} cards=${payload.cards} categories=${JSON.stringify(payload.byCategory)} add=${payload.addToCart} enquire=${payload.enquire} positive_control=${positive ? 'PASS' : 'FAIL'}`);
process.exitCode = positive ? 0 : 1;
