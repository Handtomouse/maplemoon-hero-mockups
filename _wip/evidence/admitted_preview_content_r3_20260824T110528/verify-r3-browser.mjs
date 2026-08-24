import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const evidenceRoot = path.dirname(new URL(import.meta.url).pathname);
const baseUrl = process.argv[2] || 'http://127.0.0.1:4324';
const routes = [
  ['homepage', '/homepage.html'], ['shop', '/shop.html'], ['our-story', '/our-story.html'],
  ['carob-story', '/carob-story.html'], ['faq', '/faq.html'], ['stockists', '/stockists.html'],
  ['pure-carob-bar', '/products/pure-carob-bar.html'],
];
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const rows = [];
const failures = [];

for (const [route, pathname] of routes) {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 } });
    const consoleErrors = [], pageErrors = [], requestFailures = [], badResponses = [];
    page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    page.on('pageerror', error => pageErrors.push(String(error)));
    page.on('requestfailed', request => requestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' }));
    page.on('response', response => { if (response.status() >= 400) badResponses.push({ status: response.status(), url: response.url() }); });
    const response = await page.goto(`${baseUrl}${pathname}`, { waitUntil: 'domcontentloaded' });
    await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; image.scrollIntoView({ block: 'center' }); }));
    await page.waitForFunction(() => [...document.images].every(image => image.complete), null, { timeout: 30000 });
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => typeof image.decode === 'function' ? image.decode().catch(() => undefined) : undefined)));
    if (route === 'stockists') {
      const showMore = page.locator('#stockistShowMore');
      for (let step = 0; step < 30; step += 1) {
        if (await showMore.isHidden()) break;
        await showMore.click();
        await page.waitForTimeout(30);
      }
      if (!(await showMore.isHidden())) throw new Error('Stockist Load more remained visible after 30 steps');
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    const metrics = await page.evaluate(() => {
      const root = document.documentElement;
      const images = [...document.images];
      const text = document.body?.innerText || '';
      const powder = images.find(image => (image.currentSrc || image.src).includes('powder_roasted'));
      const founder = images.filter(image => (image.currentSrc || image.src).includes('founder'));
      const unknownCards = [...document.querySelectorAll('.st-result.is-pending')];
      const quoteCards = [...document.querySelectorAll('.mm-review-grid > div')];
      return {
        clientWidth: root.clientWidth, scrollWidth: root.scrollWidth,
        bodyHeight: Math.max(root.scrollHeight, document.body?.scrollHeight || 0), textLength: text.trim().length,
        images: images.length,
        brokenImages: images.filter(image => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0).map(image => image.currentSrc || image.src),
        powder: powder ? { naturalWidth: powder.naturalWidth, naturalHeight: powder.naturalHeight } : null,
        founderImages: founder.length, quoteCards: quoteCards.length,
        unknownCards: unknownCards.length,
        unknownNeutral: unknownCards.filter(card => card.innerText.includes('Location details unavailable')).length,
        forbiddenVisible: ['consent pending','WIP quotes','noindexed','testimonial selection pending','need client confirmation','Needs confirmation','Directory preview only','Store-type labels are provisional','Source note'].filter(needle => text.includes(needle)),
      };
    });
    const rowFailures = [];
    if (response?.status() !== 200) rowFailures.push(`document status ${response?.status()}`);
    if (metrics.clientWidth !== width || metrics.scrollWidth !== width) rowFailures.push(`overflow ${metrics.clientWidth}/${metrics.scrollWidth}`);
    if (metrics.textLength < 100) rowFailures.push(`short body ${metrics.textLength}`);
    if (metrics.brokenImages.length) rowFailures.push(`broken images ${JSON.stringify(metrics.brokenImages)}`);
    if (metrics.forbiddenVisible.length) rowFailures.push(`forbidden visible ${metrics.forbiddenVisible.join('|')}`);
    if (route === 'homepage' && metrics.quoteCards !== 3) rowFailures.push(`quote cards ${metrics.quoteCards}/3`);
    if (route === 'shop' && (!metrics.powder || metrics.powder.naturalWidth !== 3640 || metrics.powder.naturalHeight !== 2078)) rowFailures.push(`powder ${JSON.stringify(metrics.powder)}`);
    if (route === 'our-story' && metrics.founderImages !== 3) rowFailures.push(`founder images ${metrics.founderImages}/3`);
    if (route === 'stockists' && (metrics.unknownCards !== 7 || metrics.unknownNeutral !== 7)) rowFailures.push(`unknown neutral ${metrics.unknownNeutral}/${metrics.unknownCards}`);
    if (consoleErrors.length) rowFailures.push(`console errors ${JSON.stringify(consoleErrors)}`);
    if (pageErrors.length) rowFailures.push(`page errors ${JSON.stringify(pageErrors)}`);
    if (requestFailures.length) rowFailures.push(`request failures ${JSON.stringify(requestFailures)}`);
    if (badResponses.length) rowFailures.push(`bad responses ${JSON.stringify(badResponses)}`);
    failures.push(...rowFailures.map(failure => `${route}@${width}: ${failure}`));
    await page.screenshot({ path: path.join(evidenceRoot, `route-${route}-${width}.png`), fullPage: true });
    rows.push({ route, pathname, width, status: response?.status() || null, metrics, consoleErrors, pageErrors, requestFailures, badResponses, failures: rowFailures });
    await page.close();
  }
}

await browser.close();
const result = { outcome: failures.length ? 'FAIL' : 'PASS', baseUrl, cases: rows.length, rows, failures };
fs.writeFileSync(path.join(evidenceRoot, 'r3-browser-results.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(`R3_BROWSER ${result.outcome} cases=${rows.length}/14 failures=${failures.length}`);
for (const row of rows) console.log(`CASE route=${row.route} width=${row.width} status=${row.status} root=${row.metrics.clientWidth}/${row.metrics.scrollWidth} images=${row.metrics.images} broken=${row.metrics.brokenImages.length} quotes=${row.metrics.quoteCards} unknown=${row.metrics.unknownNeutral}/${row.metrics.unknownCards} runtime=${row.consoleErrors.length}/${row.pageErrors.length}/${row.requestFailures.length}/${row.badResponses.length} failures=${row.failures.length}`);
if (failures.length) { failures.forEach(failure => console.error(`FAIL ${failure}`)); process.exitCode = 1; }
