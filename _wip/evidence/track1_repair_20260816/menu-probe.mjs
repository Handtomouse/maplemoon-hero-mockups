import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
await page.goto('http://127.0.0.1:8783/homepage.html', { waitUntil: 'networkidle' });
await page.locator('[data-mm-menu-toggle]').click();
await page.waitForTimeout(180);
const result = await page.evaluate(() => [...document.querySelectorAll('[data-mm-primary-nav],[data-mm-utility-nav]')].map(nav => ({
  id: nav.id,
  parent: nav.parentElement?.className || '',
  outer: nav.outerHTML,
  rect: (() => { const r = nav.getBoundingClientRect(); return { x:r.x,y:r.y,width:r.width,height:r.height }; })(),
  computed: { background: getComputedStyle(nav).background, zIndex: getComputedStyle(nav).zIndex, opacity: getComputedStyle(nav).opacity },
  links: [...nav.querySelectorAll('a')].map(link => {
    const r = link.getBoundingClientRect();
    const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return { text:link.textContent.trim(), href:link.getAttribute('href'), rect:{x:r.x,y:r.y,width:r.width,height:r.height}, hit:hit?.outerHTML || '' };
  }),
})));
console.log(JSON.stringify(result, null, 2));
await page.screenshot({ path: '/Users/handtomouse/maplemoon-website/_wip/evidence/track1_repair_20260816/screenshots/homepage-390-menu-open-probe.png', fullPage: false, animations: 'disabled' });
await browser.close();
