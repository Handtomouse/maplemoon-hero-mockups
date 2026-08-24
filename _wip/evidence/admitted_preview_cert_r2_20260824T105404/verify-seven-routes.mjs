import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const evidenceRoot = path.dirname(new URL(import.meta.url).pathname);
const baseUrl = process.argv[2] || 'http://127.0.0.1:4323';
const routes = [
  ['homepage', '/homepage.html'],
  ['shop', '/shop.html'],
  ['our-story', '/our-story.html'],
  ['carob-story', '/carob-story.html'],
  ['faq', '/faq.html'],
  ['stockists', '/stockists.html'],
  ['pure-carob-bar', '/products/pure-carob-bar.html'],
];
const widths = [390, 1440];
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const rows = [];
const failures = [];

for (const [route, pathname] of routes) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 } });
    const consoleErrors = [];
    const pageErrors = [];
    const requestFailures = [];
    const badResponses = [];
    page.on('console', message => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', error => pageErrors.push(String(error)));
    page.on('requestfailed', request => requestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' }));
    page.on('response', response => {
      if (response.status() >= 400) badResponses.push({ status: response.status(), url: response.url() });
    });

    const response = await page.goto(`${baseUrl}${pathname}`, { waitUntil: 'domcontentloaded' });
    await page.locator('img').evaluateAll(images => {
      for (const image of images) {
        image.loading = 'eager';
        image.scrollIntoView({ block: 'center' });
      }
    });
    await page.waitForFunction(() => [...document.images].every(image => image.complete), null, { timeout: 30000 });
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image =>
      typeof image.decode === 'function' ? image.decode().catch(() => undefined) : undefined
    )));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);

    const metrics = await page.evaluate(() => {
      const root = document.documentElement;
      const images = [...document.images];
      const powder = images.find(image => (image.currentSrc || image.src).includes('powder_roasted'));
      const founder = images.filter(image => (image.currentSrc || image.src).includes('founder'));
      const requiredTargets = [...document.querySelectorAll('button, a[href], input, select, textarea')]
        .filter(element => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
        });
      return {
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        bodyHeight: Math.max(root.scrollHeight, document.body?.scrollHeight || 0),
        textLength: (document.body?.innerText || '').trim().length,
        images: images.length,
        brokenImages: images.filter(image => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0).map(image => image.currentSrc || image.src),
        powder: powder ? { src: powder.currentSrc || powder.src, naturalWidth: powder.naturalWidth, naturalHeight: powder.naturalHeight } : null,
        founderImages: founder.map(image => ({ src: image.currentSrc || image.src, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight })),
        visibleTargets: requiredTargets.length,
      };
    });

    const rowFailures = [];
    if (response?.status() !== 200) rowFailures.push(`document status ${response?.status()}`);
    if (metrics.clientWidth !== width || metrics.scrollWidth !== width) rowFailures.push(`overflow ${metrics.clientWidth}/${metrics.scrollWidth}`);
    if (metrics.textLength < 100) rowFailures.push(`short body ${metrics.textLength}`);
    if (metrics.brokenImages.length) rowFailures.push(`broken images ${JSON.stringify(metrics.brokenImages)}`);
    if (route === 'shop' && (!metrics.powder || metrics.powder.naturalWidth === 0)) rowFailures.push('approved powder image did not render');
    if (route === 'our-story' && metrics.founderImages.length < 3) rowFailures.push(`founder images ${metrics.founderImages.length}/3`);
    if (consoleErrors.length) rowFailures.push(`console errors ${JSON.stringify(consoleErrors)}`);
    if (pageErrors.length) rowFailures.push(`page errors ${JSON.stringify(pageErrors)}`);
    if (requestFailures.length) rowFailures.push(`request failures ${JSON.stringify(requestFailures)}`);
    if (badResponses.length) rowFailures.push(`bad responses ${JSON.stringify(badResponses)}`);
    failures.push(...rowFailures.map(failure => `${route}@${width}: ${failure}`));
    await page.screenshot({ path: path.join(evidenceRoot, `route-${route}-${width}.png`), fullPage: true });
    rows.push({
      route,
      pathname,
      width,
      status: response?.status() || null,
      metrics,
      consoleErrors,
      pageErrors,
      requestFailures,
      badResponses,
      failures: rowFailures,
    });
    await page.close();
  }
}

await browser.close();
const result = { outcome: failures.length ? 'FAIL' : 'PASS', baseUrl, cases: rows.length, rows, failures };
fs.writeFileSync(path.join(evidenceRoot, 'seven-route-results.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(`SEVEN_ROUTE_BROWSER ${result.outcome} cases=${rows.length}/${routes.length * widths.length} failures=${failures.length}`);
for (const row of rows) {
  console.log(`CASE route=${row.route} width=${row.width} status=${row.status} root=${row.metrics.clientWidth}/${row.metrics.scrollWidth} images=${row.metrics.images} broken=${row.metrics.brokenImages.length} powder=${row.metrics.powder ? 'rendered' : 'n/a'} founders=${row.metrics.founderImages.length} runtime=${row.consoleErrors.length}/${row.pageErrors.length}/${row.requestFailures.length}/${row.badResponses.length} failures=${row.failures.length}`);
}
if (failures.length) {
  failures.forEach(failure => console.error(`FAIL ${failure}`));
  process.exitCode = 1;
}
