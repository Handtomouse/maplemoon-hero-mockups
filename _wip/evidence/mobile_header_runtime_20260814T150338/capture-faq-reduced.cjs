const fs = require('fs');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const response = await page.goto('http://127.0.0.1:4391/faq.html', { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, 242));
  await page.waitForTimeout(240);
  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').click());
  await page.waitForTimeout(500);
  const state = await page.evaluate(() => {
    const root = document.querySelector('[data-mm-chrome]');
    const primary = root.querySelector('[data-mm-primary-nav]');
    const utility = root.querySelector('[data-mm-utility-nav]');
    const primaryRect = primary.getBoundingClientRect();
    const utilityRect = utility.getBoundingClientRect();
    return {
      http: performance.getEntriesByType('navigation')[0]?.responseStatus || null,
      responseUrl: location.href,
      rootState: root.getAttribute('data-mm-menu-state'),
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      primaryHidden: primary.hidden,
      utilityHidden: utility.hidden,
      primaryRect: { top: primaryRect.top, bottom: primaryRect.bottom, height: primaryRect.height },
      utilityRect: { top: utilityRect.top, bottom: utilityRect.bottom, height: utilityRect.height },
      hitAtPrimaryRow: document.elementFromPoint(50, 84)?.textContent?.trim() || null,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    };
  });
  state.http = response.status();
  await page.screenshot({
    path: '/Users/handtomouse/maplemoon-website/_wip/evidence/mobile_header_runtime_20260814T150338/faq_390_reduced-menu-confirm.png',
    fullPage: false,
  });
  fs.writeFileSync(
    '/Users/handtomouse/maplemoon-website/_wip/evidence/mobile_header_runtime_20260814T150338/faq_390_reduced-menu-confirm.json',
    `${JSON.stringify(state, null, 2)}\n`,
  );
  console.log(JSON.stringify(state, null, 2));
  await browser.close();
})().catch(error => {
  console.error(error.stack || error);
  process.exit(1);
});
