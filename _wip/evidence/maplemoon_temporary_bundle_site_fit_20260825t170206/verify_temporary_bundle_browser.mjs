import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const evidence = path.dirname(new URL(import.meta.url).pathname);
const base = process.argv[2] || 'http://127.0.0.1:4386';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const temporaryAsset = 'temporary_eclipse_bite_bundle_web.webp';
const failures = [];
const results = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

async function waitForImage(image) {
  await image.evaluate(element => {
    element.loading = 'eager';
    element.scrollIntoView({ block: 'center' });
  });
  await image.evaluate(element => new Promise((resolve, reject) => {
    if (element.complete && element.naturalWidth) return resolve();
    element.addEventListener('load', resolve, { once: true });
    element.addEventListener('error', () => reject(new Error(`image failed: ${element.src}`)), { once: true });
  }));
  await image.evaluate(element => typeof element.decode === 'function' ? element.decode() : undefined);
}

async function addBadge(page, selector) {
  await page.locator(selector).evaluate(element => {
    element.style.position = 'relative';
    const badge = document.createElement('div');
    badge.id = 'temporary_bundle_qa_badge';
    badge.textContent = 'TEMPORARY STAGING / REPLACE BEFORE FINAL';
    Object.assign(badge.style, {
      position: 'absolute', top: '10px', left: '10px', zIndex: '9999',
      padding: '9px 12px', border: '1px solid rgba(30,67,102,.34)', borderRadius: '5px',
      background: '#e7e4ca', color: '#1e2a1e', font: '700 11px/1.2 Arial,sans-serif',
      letterSpacing: '.08em', boxShadow: '0 5px 18px rgba(16,25,35,.18)'
    });
    element.appendChild(badge);
  });
}

async function removeBadge(page) {
  await page.locator('#temporary_bundle_qa_badge').evaluateAll(elements => elements.forEach(element => element.remove()));
}

function internal(url) {
  return url.startsWith(base);
}

for (const width of [390, 1440]) {
  const dpr = width === 390 ? 2 : 1;
  const browser = await chromium.launch({ executablePath: chrome, headless: true });

  {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 }, deviceScaleFactor: dpr });
    const consoleErrors = [], pageErrors = [], internalRequestFailures = [], internalBadResponses = [];
    page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    page.on('pageerror', error => pageErrors.push(String(error)));
    page.on('requestfailed', request => { if (internal(request.url())) internalRequestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' }); });
    page.on('response', response => { if (internal(response.url()) && response.status() >= 400) internalBadResponses.push({ url: response.url(), status: response.status() }); });
    const response = await page.goto(`${base}/shop.html`, { waitUntil: 'domcontentloaded' });
    const card = page.locator('.pcard.is_bundle');
    await card.scrollIntoViewIfNeeded();
    const declaredLoading = await card.locator('img').getAttribute('loading');
    await waitForImage(card.locator('img'));
    const grid = await card.evaluate(element => {
      const image = element.querySelector('img');
      const well = element.querySelector('.ph');
      const imageRect = image.getBoundingClientRect();
      const wellRect = well.getBoundingClientRect();
      return {
        status: element.dataset.assetStatus,
        hidden: element.hidden,
        loading: image.loading,
        src: image.currentSrc || image.src,
        natural: [image.naturalWidth, image.naturalHeight],
        image: { width: imageRect.width, height: imageRect.height, top: imageRect.top, bottom: imageRect.bottom },
        well: { width: wellRect.width, height: wellRect.height, top: wellRect.top, bottom: wellRect.bottom },
        background: getComputedStyle(well).backgroundImage,
        overflow: [document.documentElement.clientWidth, document.documentElement.scrollWidth]
      };
    });
    check(response?.status() === 200, `shop@${width}: status ${response?.status()}`);
    check(grid.src.includes(temporaryAsset), `shop@${width}: wrong bundle src ${grid.src}`);
    check(grid.status === 'temporary_replace_before_final', `shop@${width}: temporary status missing`);
    check(grid.natural[0] === 1080 && grid.natural[1] === 668, `shop@${width}: natural dimensions ${grid.natural}`);
    check(declaredLoading === 'lazy', `shop@${width}: declared loading ${declaredLoading}`);
    check(grid.image.width / grid.well.width >= 0.80 && grid.image.width / grid.well.width <= 0.94, `shop@${width}: grid width ratio ${grid.image.width / grid.well.width}`);
    check(grid.image.height / grid.well.height >= 0.42 && grid.image.height / grid.well.height <= 0.64, `shop@${width}: grid height ratio ${grid.image.height / grid.well.height}`);
    check(grid.overflow[0] === width && grid.overflow[1] === width, `shop@${width}: overflow ${grid.overflow}`);
    check(!grid.hidden, `shop@${width}: bundle hidden in All state`);

    await addBadge(page, '.pcard.is_bundle');
    await card.screenshot({ path: path.join(evidence, `shop_bundle_grid_${width}.png`) });
    await removeBadge(page);

    await page.locator('.swatch[data-flavour="pure"]').click();
    check(await card.evaluate(element => element.hidden), `shop@${width}: bundle remains visible under Pure filter`);
    await page.locator('.swatch[data-flavour="all"]').click();
    check(!(await card.evaluate(element => element.hidden)), `shop@${width}: bundle does not return under All filter`);

    await page.locator('[data-view="list"]').click();
    const list = await card.evaluate(element => {
      const image = element.querySelector('img');
      const well = element.querySelector('.ph');
      const imageRect = image.getBoundingClientRect();
      const wellRect = well.getBoundingClientRect();
      return {
        bodyClass: document.body.className,
        image: { width: imageRect.width, height: imageRect.height },
        well: { width: wellRect.width, height: wellRect.height },
        overflow: [document.documentElement.clientWidth, document.documentElement.scrollWidth]
      };
    });
    check(list.bodyClass.includes('shop-list-view'), `shop@${width}: list state class missing`);
    check(list.image.width > 0 && list.image.height > 0, `shop@${width}: list image has zero geometry`);
    check(list.overflow[0] === width && list.overflow[1] === width, `shop-list@${width}: overflow ${list.overflow}`);
    await addBadge(page, '.pcard.is_bundle');
    await card.screenshot({ path: path.join(evidence, `shop_bundle_list_${width}.png`) });
    await removeBadge(page);

    check(pageErrors.length === 0, `shop@${width}: page errors ${JSON.stringify(pageErrors)}`);
    check(internalRequestFailures.length === 0, `shop@${width}: internal request failures ${JSON.stringify(internalRequestFailures)}`);
    check(internalBadResponses.length === 0, `shop@${width}: internal bad responses ${JSON.stringify(internalBadResponses)}`);
    results.push({ route: 'shop', width, dpr, status: response?.status() || null, declaredLoading, grid, list, consoleErrors, pageErrors, internalRequestFailures, internalBadResponses });
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 }, deviceScaleFactor: dpr });
    const consoleErrors = [], pageErrors = [], internalRequestFailures = [], internalBadResponses = [];
    page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    page.on('pageerror', error => pageErrors.push(String(error)));
    page.on('requestfailed', request => { if (internal(request.url())) internalRequestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' }); });
    page.on('response', response => { if (internal(response.url()) && response.status() >= 400) internalBadResponses.push({ url: response.url(), status: response.status() }); });
    const response = await page.goto(`${base}/homepage.html`, { waitUntil: 'domcontentloaded' });
    await page.locator('[data-cat="eclipseBites"]').click();
    const bundle = page.locator('.cf-item.is_bundle');
    const declaredLoading = await bundle.locator('img').getAttribute('loading');
    await bundle.click();
    await page.waitForFunction(() => document.querySelector('.cf-item.is_bundle')?.classList.contains('center'));
    await page.locator('#range').scrollIntoViewIfNeeded();
    await waitForImage(bundle.locator('img'));
    const home = await bundle.evaluate(element => {
      const image = element.querySelector('img');
      const stage = document.querySelector('#stage');
      const imageRect = image.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const scale = Math.min(imageRect.width / image.naturalWidth, imageRect.height / image.naturalHeight);
      const contentWidth = image.naturalWidth * scale;
      const contentHeight = image.naturalHeight * scale;
      const contentLeft = imageRect.left + (imageRect.width - contentWidth) / 2;
      const contentTop = imageRect.bottom - contentHeight;
      return {
        status: element.dataset.assetStatus,
        centered: element.classList.contains('center'),
        src: image.currentSrc || image.src,
        natural: [image.naturalWidth, image.naturalHeight],
        image: { left: imageRect.left, top: imageRect.top, right: imageRect.right, bottom: imageRect.bottom, width: imageRect.width, height: imageRect.height },
        content: { left: contentLeft, top: contentTop, right: contentLeft + contentWidth, bottom: contentTop + contentHeight, width: contentWidth, height: contentHeight },
        stage: { left: stageRect.left, top: stageRect.top, right: stageRect.right, bottom: stageRect.bottom, width: stageRect.width, height: stageRect.height },
        background: getComputedStyle(document.querySelector('#range')).backgroundImage,
        overflow: [document.documentElement.clientWidth, document.documentElement.scrollWidth]
      };
    });
    check(response?.status() === 200, `home@${width}: status ${response?.status()}`);
    check(home.src.includes(temporaryAsset), `home@${width}: wrong bundle src ${home.src}`);
    check(home.status === 'temporary_replace_before_final', `home@${width}: temporary status missing`);
    check(home.centered, `home@${width}: bundle did not centre`);
    check(home.natural[0] === 1080 && home.natural[1] === 668, `home@${width}: natural dimensions ${home.natural}`);
    check(declaredLoading === 'lazy', `home@${width}: declared loading ${declaredLoading}`);
    if (width === 390) {
      check(home.content.width >= 175 && home.content.width <= 230, `home@390: content width ${home.content.width}`);
      check(home.content.height >= 100 && home.content.height <= 150, `home@390: content height ${home.content.height}`);
    } else {
      check(home.content.width >= 260 && home.content.width <= 330, `home@1440: content width ${home.content.width}`);
      check(home.content.height >= 150 && home.content.height <= 215, `home@1440: content height ${home.content.height}`);
    }
    check(home.content.left >= home.stage.left && home.content.right <= home.stage.right, `home@${width}: horizontal clipping`);
    check(home.content.top >= home.stage.top && home.content.bottom <= home.stage.bottom, `home@${width}: vertical clipping`);
    check(home.overflow[0] === width && home.overflow[1] === width, `home@${width}: overflow ${home.overflow}`);

    await addBadge(page, '#range');
    await page.locator('#range').screenshot({ path: path.join(evidence, `home_bundle_center_${width}.png`) });
    await removeBadge(page);

    check(pageErrors.length === 0, `home@${width}: page errors ${JSON.stringify(pageErrors)}`);
    check(internalRequestFailures.length === 0, `home@${width}: internal request failures ${JSON.stringify(internalRequestFailures)}`);
    check(internalBadResponses.length === 0, `home@${width}: internal bad responses ${JSON.stringify(internalBadResponses)}`);
    results.push({ route: 'homepage', width, dpr, status: response?.status() || null, declaredLoading, home, consoleErrors, pageErrors, internalRequestFailures, internalBadResponses });
    await page.close();
  }

  await browser.close();
}

const report = {
  schema: 'maplemoon-temporary-bundle-browser-qa/v1',
  base,
  outcome: failures.length ? 'FAIL' : 'PASS',
  cases: results.length,
  results,
  failures
};
fs.writeFileSync(path.join(evidence, 'browser_results.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`BROWSER ${report.outcome} cases=${results.length} failures=${failures.length}`);
for (const result of results) {
  const runtime = result.pageErrors.length + result.internalRequestFailures.length + result.internalBadResponses.length;
  console.log(`CASE ${result.route}@${result.width} dpr=${result.dpr} status=${result.status} console=${result.consoleErrors.length} task_runtime=${runtime}`);
}
if (failures.length) {
  failures.forEach(failure => console.error(`FAIL ${failure}`));
  process.exitCode = 1;
}
