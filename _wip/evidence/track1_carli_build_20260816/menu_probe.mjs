import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
await page.goto('http://127.0.0.1:8782/homepage.html', { waitUntil: 'domcontentloaded' });
await page.locator('[data-mm-menu-toggle]').click();
await page.waitForTimeout(150);
const result = await page.evaluate(() => {
  const details = element => {
    const rect = element.getBoundingClientRect();
    return {
      tag: element.tagName,
      text: element.textContent.trim(),
      hidden: element.hidden,
      display: getComputedStyle(element).display,
      rect: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
      hit: document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)?.textContent.trim() || '',
    };
  };
  const primary = document.querySelector('[data-mm-primary-nav]');
  const utility = document.querySelector('[data-mm-utility-nav]');
  return {
    state: document.querySelector('[data-mm-chrome]').getAttribute('data-mm-menu-state'),
    primary: details(primary),
    primaryChildren: [...primary.children].map(details),
    utility: details(utility),
    utilityChildren: [...utility.children].map(details),
  };
});
fs.writeFileSync('/Users/handtomouse/maplemoon-website/_wip/evidence/track1_carli_build_20260816/menu-probe.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result));
await context.close();
await browser.close();
