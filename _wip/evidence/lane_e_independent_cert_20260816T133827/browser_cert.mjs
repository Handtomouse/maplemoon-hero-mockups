import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');

const root = '/Users/handtomouse/maplemoon-website';
const output = path.join(root, '_wip/evidence/lane_e_independent_cert_20260816T133827');
const origin = 'http://127.0.0.1:8771';
const routes = [
  ['home', 'homepage_real_1_lead_photo.WIP.html'],
  ['shop', 'shop.WIP.html'],
  ['our-story', 'our-story.WIP.html'],
  ['carob-story', 'carob-story.WIP.html'],
  ['faq', 'faq.WIP.html'],
  ['stockists', 'stockists.WIP.html'],
];
const viewports = [
  ['390', { width: 390, height: 844 }],
  ['1440', { width: 1440, height: 1100 }],
];
const cssOverrides = {
  '/a11y_inner.css': path.join(root, '_wip/a11y_inner.css'),
  '/design_refinement_20260723.css': path.join(root, '_wip/design_refinement_20260723.css'),
};

function telemetry(page) {
  const state = { consoleErrors: [], pageErrors: [], requestFailures: [], badResponses: [] };
  page.on('console', message => {
    if (message.type() === 'error') state.consoleErrors.push(message.text());
  });
  page.on('pageerror', error => state.pageErrors.push(error.message));
  page.on('requestfailed', request => state.requestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' }));
  page.on('response', response => {
    if (response.status() >= 400) state.badResponses.push({ url: response.url(), status: response.status() });
  });
  return state;
}

async function prepare(page) {
  for (const [pathname, source] of Object.entries(cssOverrides)) {
    await page.route(`${origin}${pathname}*`, route => route.fulfill({ path: source, contentType: 'text/css; charset=utf-8' }));
  }
}

async function loadPage(browser, route, viewport) {
  const context = await browser.newContext({ viewport, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  const errors = telemetry(page);
  await prepare(page);
  const url = `${origin}/_wip/${route}`;
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.evaluate(async () => {
    for (const image of document.images) image.loading = 'eager';
    const step = Math.max(400, Math.floor(innerHeight * 0.75));
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 80));
    }
    scrollTo(0, 0);
    await Promise.all([...document.images].map(image => {
      if (image.complete) return Promise.resolve();
      return new Promise(resolve => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
        setTimeout(resolve, 8000);
      });
    }));
    await Promise.race([
      document.fonts?.ready || Promise.resolve(),
      new Promise(resolve => setTimeout(resolve, 5000)),
    ]);
  });
  await page.waitForTimeout(400);
  return { context, page, errors, response, url };
}

async function buildContactSheet(widthLabel, items) {
  const desktop = widthLabel === '1440';
  const columns = desktop ? 2 : 3;
  const cellWidth = desktop ? 700 : 390;
  const cellHeight = desktop ? 900 : 1000;
  const gap = 20;
  const rows = Math.ceil(items.length / columns);
  const width = columns * cellWidth + (columns + 1) * gap;
  const height = rows * cellHeight + (rows + 1) * gap;
  const composites = [];
  for (let index = 0; index < items.length; index += 1) {
    const input = await sharp(items[index].screenshot)
      .resize({ width: cellWidth, height: cellHeight - 45, fit: 'contain', background: '#ffffff' })
      .extend({ top: 45, bottom: 0, left: 0, right: 0, background: '#ffffff' })
      .composite([{
        input: Buffer.from(`<svg width="${cellWidth}" height="45"><rect width="100%" height="100%" fill="#d8e7f2"/><text x="18" y="29" font-size="20" font-family="Arial" fill="#173c4d">${items[index].page} · ${widthLabel}px</text></svg>`),
        top: 0,
        left: 0,
      }])
      .png()
      .toBuffer();
    composites.push({
      input,
      left: gap + (index % columns) * (cellWidth + gap),
      top: gap + Math.floor(index / columns) * (cellHeight + gap),
    });
  }
  const destination = path.join(output, `contact-${widthLabel}.png`);
  await sharp({ create: { width, height, channels: 3, background: '#eef5f9' } }).composite(composites).png().toFile(destination);
  return destination;
}

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const renderResults = [];
let failed = false;

for (const [pageLabel, route] of routes) {
  for (const [widthLabel, viewport] of viewports) {
    const { context, page, errors, response } = await loadPage(browser, route, viewport);
    const screenshot = path.join(output, `${pageLabel}-${widthLabel}.png`);
    await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled' });
    const screenshotMetadata = await sharp(screenshot).metadata();
    const screenshotStats = await sharp(screenshot).stats();
    const channelStdev = screenshotStats.channels.slice(0, 3).map(channel => channel.stdev);
    const metrics = await page.evaluate(() => {
      const images = [...document.images].map(image => ({
        src: image.currentSrc || image.src,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        width: Math.round(image.getBoundingClientRect().width),
        height: Math.round(image.getBoundingClientRect().height),
      }));
      return {
        title: document.title,
        url: location.href,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyHeight: Math.ceil(document.body?.getBoundingClientRect().height || 0),
        textLength: (document.body?.innerText || '').trim().length,
        imageCount: images.length,
        brokenImages: images.filter(image => !image.complete || image.naturalWidth < 1 || image.naturalHeight < 1),
        enabledNewsletterInputs: [...document.querySelectorAll('form input[type="email"]')].filter(input => !input.disabled).length,
        newsletterNotices: [...document.querySelectorAll('body *')].filter(node => node.children.length === 0 && /Demo only\. This form does not collect or submit email addresses\./.test(node.textContent || '')).length,
        productCards: document.querySelectorAll('.pcard').length,
        homeBitesTabs: document.querySelectorAll('[data-cat="eclipseBites"]').length,
        stockistMapPanels: document.querySelectorAll('.st-map-panel').length,
      };
    });
    const screenshotBytes = fs.statSync(screenshot).size;
    const itemFailed =
      response?.status() !== 200 ||
      metrics.clientWidth !== viewport.width ||
      metrics.scrollWidth > metrics.clientWidth + 1 ||
      metrics.bodyHeight < viewport.height ||
      metrics.textLength < 200 ||
      metrics.brokenImages.length > 0 ||
      errors.consoleErrors.length > 0 ||
      errors.pageErrors.length > 0 ||
      errors.requestFailures.length > 0 ||
      errors.badResponses.length > 0 ||
      screenshotMetadata.width !== viewport.width ||
      screenshotMetadata.height < viewport.height ||
      screenshotBytes < 5000 ||
      channelStdev.some(value => value < 2) ||
      (pageLabel === 'home' && metrics.homeBitesTabs !== 0) ||
      (pageLabel === 'stockists' && metrics.stockistMapPanels !== 0) ||
      (['home', 'stockists'].includes(pageLabel) && (metrics.enabledNewsletterInputs !== 0 || metrics.newsletterNotices !== 1)) ||
      (pageLabel === 'shop' && metrics.productCards !== 22);
    const row = {
      page: pageLabel,
      route,
      viewport,
      httpStatus: response?.status() || 0,
      screenshot,
      screenshotBytes,
      screenshotMetadata: { width: screenshotMetadata.width, height: screenshotMetadata.height, channels: screenshotMetadata.channels },
      screenshotChannelStdev: channelStdev,
      metrics,
      ...errors,
      result: itemFailed ? 'FAIL' : 'PASS',
    };
    renderResults.push(row);
    failed ||= itemFailed;
    console.log(`${row.result} page=${pageLabel} width=${widthLabel} http=${row.httpStatus} client=${metrics.clientWidth} scroll=${metrics.scrollWidth} body_height=${metrics.bodyHeight} screenshot=${screenshotMetadata.width}x${screenshotMetadata.height}/${screenshotBytes}B text=${metrics.textLength} images=${metrics.imageCount} broken=${metrics.brokenImages.length} console=${errors.consoleErrors.length} page_errors=${errors.pageErrors.length} request_failures=${errors.requestFailures.length} bad_responses=${errors.badResponses.length}`);
    if (itemFailed) console.log(JSON.stringify(row, null, 2));
    await context.close();
  }
}

const contacts = [];
for (const [widthLabel] of viewports) {
  contacts.push(await buildContactSheet(widthLabel, renderResults.filter(row => String(row.viewport.width) === widthLabel)));
}
fs.writeFileSync(path.join(output, 'browser-results.json'), JSON.stringify({
  browser: 'Google Chrome via Playwright isolated headless contexts',
  origin,
  routeOverrides: cssOverrides,
  agentBrowserCli: 'unavailable; bundled Playwright used as deterministic browser fallback',
  contacts,
  results: renderResults,
  failures: renderResults.filter(row => row.result === 'FAIL'),
}, null, 2) + '\n');

const runtimeResults = [];

for (const [test, route] of [
  ['home-newsletter', 'homepage_real_1_lead_photo.WIP.html'],
  ['stockists-newsletter', 'stockists.WIP.html'],
]) {
  const { context, page, errors } = await loadPage(browser, route, { width: 390, height: 844 });
  const afterLoadRequests = [];
  page.on('request', request => afterLoadRequests.push({ method: request.method(), url: request.url() }));
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);
  afterLoadRequests.length = 0;
  const beforeUrl = page.url();
  const state = await page.evaluate(() => {
    localStorage.setItem('lane-e-local-control', 'keep-local');
    sessionStorage.setItem('lane-e-session-control', 'keep-session');
    const form = document.querySelector('form:has(input[type="email"])');
    const input = form?.querySelector('input[type="email"]');
    const button = form?.querySelector('button[type="submit"]');
    const notice = [...document.querySelectorAll('body *')].find(node => node.children.length === 0 && /Demo only\. This form does not collect or submit email addresses\./.test(node.textContent || ''));
    const dispatchAllowed = form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const rect = notice?.getBoundingClientRect();
    return {
      formPresent: Boolean(form),
      formAction: form?.getAttribute('action') || '',
      inputDisabled: Boolean(input?.disabled),
      buttonDisabled: Boolean(button?.disabled),
      dispatchDefaultAllowed: dispatchAllowed,
      noticeVisible: Boolean(notice && getComputedStyle(notice).display !== 'none' && rect && rect.width > 0 && rect.height > 0),
      localStorage: Object.fromEntries(Object.entries(localStorage)),
      sessionStorage: Object.fromEntries(Object.entries(sessionStorage)),
      cookie: document.cookie,
    };
  });
  await page.waitForTimeout(350);
  const forbiddenNetwork = afterLoadRequests.filter(request => request.method !== 'GET');
  const runtimeFailed =
    !state.formPresent ||
    state.formAction !== '' ||
    !state.inputDisabled ||
    !state.buttonDisabled ||
    state.dispatchDefaultAllowed !== false ||
    !state.noticeVisible ||
    JSON.stringify(state.localStorage) !== JSON.stringify({ 'lane-e-local-control': 'keep-local' }) ||
    JSON.stringify(state.sessionStorage) !== JSON.stringify({ 'lane-e-session-control': 'keep-session' }) ||
    state.cookie !== '' ||
    page.url() !== beforeUrl ||
    forbiddenNetwork.length > 0 ||
    errors.consoleErrors.length > 0 || errors.pageErrors.length > 0 || errors.requestFailures.length > 0 || errors.badResponses.length > 0;
  const row = { test, ...state, beforeUrl, afterUrl: page.url(), networkAfterSubmit: afterLoadRequests, forbiddenNetwork, ...errors, result: runtimeFailed ? 'FAIL' : 'PASS' };
  runtimeResults.push(row);
  failed ||= runtimeFailed;
  console.log(`${row.result} test=${test} disabled=${state.inputDisabled}/${state.buttonDisabled} submit_default_allowed=${state.dispatchDefaultAllowed} notice=${state.noticeVisible} local_keys=${Object.keys(state.localStorage).length} session_keys=${Object.keys(state.sessionStorage).length} cookie_bytes=${state.cookie.length} network_after_submit=${afterLoadRequests.length} forbidden_network=${forbiddenNetwork.length}`);
  if (runtimeFailed) console.log(JSON.stringify(row, null, 2));
  await context.close();
}

{
  const { context, page, errors } = await loadPage(browser, 'shop.WIP.html', { width: 390, height: 844 });
  const networkAfterLoad = [];
  page.on('request', request => networkAfterLoad.push({ method: request.method(), url: request.url() }));
  await page.waitForTimeout(400);
  networkAfterLoad.length = 0;
  const beforeUrl = page.url();
  const before = await page.locator('[data-cart-subtotal]').innerText();
  const beforeStorage = await page.evaluate(() => ({ local: Object.fromEntries(Object.entries(localStorage)), session: Object.fromEntries(Object.entries(sessionStorage)), cookie: document.cookie }));
  await page.locator('[data-add-to-cart]').first().click();
  await page.waitForTimeout(200);
  const after = await page.locator('[data-cart-subtotal]').innerText();
  const count = await page.locator('[data-cart-count]').innerText();
  const label = await page.locator('[data-cart-toggle]').getAttribute('aria-label');
  const afterStorage = await page.evaluate(() => ({ local: Object.fromEntries(Object.entries(localStorage)), session: Object.fromEntries(Object.entries(sessionStorage)), cookie: document.cookie }));
  const forbiddenNetwork = networkAfterLoad.filter(request => request.method !== 'GET');
  const runtimeFailed =
    !/\$0\.00/i.test(before) ||
    !/0 items/i.test(before) ||
    !/\$12\.95/i.test(after) ||
    !/1 item/i.test(after) ||
    count.trim() !== '1' ||
    !/1 item, subtotal \$12\.95/.test(label || '') ||
    page.url() !== beforeUrl ||
    JSON.stringify(beforeStorage) !== JSON.stringify(afterStorage) ||
    forbiddenNetwork.length > 0 ||
    errors.consoleErrors.length > 0 || errors.pageErrors.length > 0 || errors.requestFailures.length > 0 || errors.badResponses.length > 0;
  const row = { test: 'shop-cart', before, after, count, label, beforeUrl, afterUrl: page.url(), beforeStorage, afterStorage, networkAfterClick: networkAfterLoad, forbiddenNetwork, ...errors, result: runtimeFailed ? 'FAIL' : 'PASS' };
  runtimeResults.push(row);
  failed ||= runtimeFailed;
  console.log(`${row.result} test=shop-cart before=${JSON.stringify(before)} after=${JSON.stringify(after)} count=${count} label=${JSON.stringify(label)} storage_equal=${JSON.stringify(beforeStorage) === JSON.stringify(afterStorage)} network=${networkAfterLoad.length} forbidden_network=${forbiddenNetwork.length}`);
  if (runtimeFailed) console.log(JSON.stringify(row, null, 2));
  await context.close();
}

{
  const { context, page, errors } = await loadPage(browser, 'homepage_real_1_lead_photo.WIP.html', { width: 390, height: 844 });
  const trigger = page.locator('[data-mm-cart-toggle]');
  const present = await trigger.count();
  const visible = present === 1 ? await trigger.isVisible() : false;
  const label = present === 1 ? await trigger.getAttribute('aria-label') : null;
  const runtimeFailed = present !== 1 || !visible || !/^Cart, 0 items$/.test(label || '') || errors.consoleErrors.length > 0 || errors.pageErrors.length > 0 || errors.requestFailures.length > 0 || errors.badResponses.length > 0;
  const row = { test: 'home-cart-trigger', present, visible, label, ...errors, result: runtimeFailed ? 'FAIL' : 'PASS' };
  runtimeResults.push(row);
  failed ||= runtimeFailed;
  console.log(`${row.result} test=home-cart-trigger present=${present} visible=${visible} label=${JSON.stringify(label)}`);
  if (runtimeFailed) console.log(JSON.stringify(row, null, 2));
  await context.close();
}

await browser.close();
fs.writeFileSync(path.join(output, 'runtime-results.json'), JSON.stringify({ results: runtimeResults, failures: runtimeResults.filter(row => row.result === 'FAIL') }, null, 2) + '\n');

if (failed) process.exit(1);
