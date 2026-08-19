import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const sharp = require(`${runtime}/sharp`);
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/pdp_route_repair_20260816';
const screenshotDir = path.join(output, 'screenshots');
const origin = 'http://127.0.0.1:8786';
const routes = [
  { name: 'homepage', path: '/homepage' },
  { name: 'shop', path: '/shop' },
  { name: 'our-story', path: '/our-story' },
  { name: 'carob-story', path: '/carob-story' },
  { name: 'faq', path: '/faq' },
  { name: 'stockists', path: '/stockists' },
  { name: 'pure-carob-bar', path: '/products/pure-carob-bar' },
];
const viewports = [['390', { width: 390, height: 844 }], ['1440', { width: 1440, height: 1100 }]];
const previousResults = path.join(output, 'visual-results.json');
if (fs.existsSync(previousResults)) {
  let attempt = 1;
  while (fs.existsSync(path.join(output, `visual-results-attempt${attempt}.json`))) attempt += 1;
  fs.renameSync(previousResults, path.join(output, `visual-results-attempt${attempt}.json`));
  if (fs.existsSync(screenshotDir)) fs.renameSync(screenshotDir, path.join(output, `screenshots-attempt${attempt}`));
}
fs.mkdirSync(screenshotDir, { recursive: true });

function telemetry(page) {
  const state = { consoleErrors: [], pageErrors: [], requestFailures: [], badResponses: [] };
  page.on('console', message => { if (message.type() === 'error') state.consoleErrors.push(message.text()); });
  page.on('pageerror', error => state.pageErrors.push(error.message));
  page.on('requestfailed', request => state.requestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' }));
  page.on('response', response => { if (response.status() >= 400) state.badResponses.push({ url: response.url(), status: response.status() }); });
  return state;
}

async function settle(page) {
  await page.evaluate(async () => {
    for (const image of document.images) image.loading = 'eager';
    const step = Math.max(400, Math.floor(innerHeight * .75));
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 35));
    }
    scrollTo(0, 0);
    await Promise.all([...document.images].map(image => image.complete ? Promise.resolve() : new Promise(resolve => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
      setTimeout(resolve, 8000);
    })));
    await Promise.race([document.fonts?.ready || Promise.resolve(), new Promise(resolve => setTimeout(resolve, 5000))]);
  });
  await page.waitForTimeout(250);
}

async function metrics(page) {
  return page.evaluate(() => {
    const images = [...document.images].map(image => ({
      src: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
    }));
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyHeight: Math.ceil(document.body?.getBoundingClientRect().height || 0),
      textLength: (document.body?.innerText || '').trim().length,
      brokenImages: images.filter(image => !image.complete || image.naturalWidth < 1 || image.naturalHeight < 1),
    };
  });
}

async function openMenu(page) {
  const menu = page.locator('[data-mm-menu-toggle]');
  await menu.click();
  await page.waitForTimeout(180);
  return page.evaluate(() => {
    const chrome = document.querySelector('[data-mm-chrome]');
    const candidates = [...chrome.querySelectorAll('a,button,[role="button"],.sp-currency,.wf-currency')]
      .filter(element => !element.matches('[data-mm-menu-toggle]'))
      .map(element => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const hit = rect.width && rect.height ? document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2) : null;
        return { text: element.textContent.trim(), width: Math.round(rect.width), height: Math.round(rect.height), display: style.display, visibility: style.visibility, hitOwn: hit === element || element.contains(hit) };
      })
      .filter(row => row.display !== 'none' && row.visibility !== 'hidden' && row.width >= 388 && row.height >= 44);
    return {
      expanded: document.querySelector('[data-mm-menu-toggle]')?.getAttribute('aria-expanded'),
      state: chrome?.getAttribute('data-mm-menu-state'),
      bodyOpen: document.body.hasAttribute('data-mm-menu-open'),
      rows: candidates,
    };
  });
}

async function makeContact(widthLabel, rows) {
  const desktop = widthLabel === '1440';
  const columns = desktop ? 2 : 4;
  const cellWidth = desktop ? 700 : 390;
  const cellHeight = desktop ? 900 : 900;
  const gap = 20;
  const width = columns * cellWidth + (columns + 1) * gap;
  const rowCount = Math.ceil(rows.length / columns);
  const height = rowCount * cellHeight + (rowCount + 1) * gap;
  const composites = [];
  for (let index = 0; index < rows.length; index += 1) {
    const input = await sharp(rows[index].screenshot)
      .resize({ width: cellWidth, height: cellHeight - 45, fit: 'contain', background: '#fff' })
      .extend({ top: 45, bottom: 0, left: 0, right: 0, background: '#fff' })
      .composite([{ input: Buffer.from(`<svg width="${cellWidth}" height="45"><rect width="100%" height="100%" fill="#d8e7f2"/><text x="18" y="29" font-size="20" font-family="Arial" fill="#173c4d">${rows[index].route} · ${widthLabel}px</text></svg>`), top: 0, left: 0 }])
      .png().toBuffer();
    composites.push({ input, left: gap + (index % columns) * (cellWidth + gap), top: gap + Math.floor(index / columns) * (cellHeight + gap) });
  }
  const destination = path.join(screenshotDir, `contact-${widthLabel}.png`);
  await sharp({ create: { width, height, channels: 3, background: '#eef5f9' } }).composite(composites).png().toFile(destination);
  return destination;
}

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const results = [];
for (const route of routes) {
  for (const [widthLabel, viewport] of viewports) {
    const context = await browser.newContext({ viewport, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    const errors = telemetry(page);
    const response = await page.goto(`${origin}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await settle(page);
    const base = await metrics(page);
    const screenshot = path.join(screenshotDir, `${route.name}-${widthLabel}.png`);
    await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled' });
    const interactions = {};

    if (route.name === 'homepage' && widthLabel === '390') {
      interactions.menu = await openMenu(page);
      interactions.menuScreenshot = path.join(screenshotDir, 'homepage-390-menu-open.png');
      await page.screenshot({ path: interactions.menuScreenshot, fullPage: false, animations: 'disabled' });
      await page.locator('[data-mm-menu-toggle]').click();
      await page.locator('[data-mm-cart-toggle]').click();
      await page.waitForTimeout(180);
      interactions.homeCart = await page.evaluate(() => ({
        dialogCount: [...document.querySelectorAll('[role="dialog"]')].filter(element => getComputedStyle(element).display !== 'none').length,
        bodyOpen: document.body.hasAttribute('data-mm-cart-open'),
        cartText: document.querySelector('[role="dialog"]')?.textContent.includes('Subtotal') || false,
      }));
      interactions.cartScreenshot = path.join(screenshotDir, 'homepage-390-cart-open.png');
      await page.screenshot({ path: interactions.cartScreenshot, fullPage: false, animations: 'disabled' });
    }

    if (route.name === 'shop') {
      const before = await page.locator('[data-cart-subtotal]').innerText();
      await page.locator('[data-add-to-cart]').first().click();
      await page.waitForTimeout(120);
      interactions.shopCart = {
        before,
        after: await page.locator('[data-cart-subtotal]').innerText(),
        count: await page.locator('[data-cart-count]').innerText(),
        label: await page.locator('[data-cart-toggle]').getAttribute('aria-label'),
      };
    }

    if (route.name === 'faq') {
      const question = page.locator('.faq-question[data-open="is-there-maple-in-it"]');
      interactions.faq = { count: await question.count(), expanded: null, visible: false };
      if (interactions.faq.count === 1) {
        await question.click();
        const answerId = await question.getAttribute('aria-controls');
        interactions.faq.expanded = await question.getAttribute('aria-expanded');
        interactions.faq.visible = await page.locator(`#${answerId}`).isVisible();
      }
    }

    if (route.name === 'stockists') {
      interactions.skip = await page.evaluate(() => ({
        count: document.querySelectorAll('a[href="#main-content"]').length,
        targetCount: document.querySelectorAll('#main-content').length,
        mainTag: document.querySelector('#main-content')?.tagName || '',
      }));
    }

    if (route.name === 'pure-carob-bar' && widthLabel === '390') {
      interactions.menu = await openMenu(page);
      interactions.menuScreenshot = path.join(screenshotDir, 'pure-carob-bar-390-menu-open.png');
      await page.screenshot({ path: interactions.menuScreenshot, fullPage: false, animations: 'disabled' });
      await page.locator('[data-mm-menu-toggle]').click();
      await page.locator('[data-mm-cart-toggle]').click();
      await page.waitForTimeout(180);
      interactions.pureCart = await page.evaluate(() => ({
        title: document.querySelector('#product-title')?.textContent.replace(/\s+/g, ' ').trim(),
        dialogCount: [...document.querySelectorAll('[role="dialog"]')].filter(element => getComputedStyle(element).display !== 'none').length,
        cartText: document.querySelector('[role="dialog"]')?.textContent.includes('Subtotal') || false,
      }));
      interactions.cartScreenshot = path.join(screenshotDir, 'pure-carob-bar-390-cart-open.png');
      await page.screenshot({ path: interactions.cartScreenshot, fullPage: false, animations: 'disabled' });
    }

    const metadata = await sharp(screenshot).metadata();
    const stats = await sharp(screenshot).stats();
    const failures = [];
    if (response?.status() !== 200) failures.push(`http-${response?.status() || 0}`);
    if (base.clientWidth !== viewport.width || base.scrollWidth > base.clientWidth + 1) failures.push('overflow-or-width');
    if (base.bodyHeight < viewport.height || base.textLength < 100) failures.push('blank-or-short');
    if (base.brokenImages.length) failures.push('broken-images');
    if (errors.consoleErrors.length) failures.push('console-errors');
    if (errors.pageErrors.length) failures.push('page-errors');
    if (errors.requestFailures.length) failures.push('request-failures');
    if (errors.badResponses.length) failures.push('bad-responses');
    if (metadata.width !== viewport.width || stats.channels.slice(0, 3).some(channel => channel.stdev < 2)) failures.push('invalid-screenshot');
    if (route.name === 'homepage' && widthLabel === '390') {
      if (interactions.menu.expanded !== 'true' || interactions.menu.state !== 'open' || !interactions.menu.bodyOpen) failures.push('menu-state');
      if (interactions.menu.rows.length !== 6 || interactions.menu.rows.some(row => row.height !== 44 || !row.hitOwn)) failures.push('menu-rows');
      if (interactions.homeCart.dialogCount !== 1 || !interactions.homeCart.cartText) failures.push('homepage-cart');
    }
    if (route.name === 'shop' && (!/\$12\.95/.test(interactions.shopCart.after) || interactions.shopCart.count !== '1' || !/Cart, 1 item, subtotal \$12\.95/.test(interactions.shopCart.label || ''))) failures.push('shop-cart');
    if (route.name === 'faq' && (interactions.faq.count !== 1 || interactions.faq.expanded !== 'true' || !interactions.faq.visible)) failures.push('faq-open');
    if (route.name === 'stockists' && (interactions.skip.count !== 1 || interactions.skip.targetCount !== 1 || interactions.skip.mainTag !== 'MAIN')) failures.push('stockists-skip');
    if (route.name === 'pure-carob-bar' && widthLabel === '390') {
      if (interactions.menu.expanded !== 'true' || interactions.menu.state !== 'open' || !interactions.menu.bodyOpen) failures.push('pure-menu-state');
      if (interactions.menu.rows.length !== 6 || interactions.menu.rows.some(row => row.height !== 44 || !row.hitOwn)) failures.push('pure-menu-rows');
      if (interactions.pureCart.dialogCount !== 1 || !interactions.pureCart.cartText || interactions.pureCart.title !== 'Pure Carob & Cacao Butter') failures.push('pure-cart-or-title');
    }
    const row = { route: route.name, path: route.path, width: widthLabel, httpStatus: response?.status() || 0, metrics: base, screenshot, interactions, ...errors, failures, result: failures.length ? 'FAIL' : 'PASS' };
    results.push(row);
    console.log(`${row.result} route=${route.name} width=${widthLabel} http=${row.httpStatus} client=${base.clientWidth} scroll=${base.scrollWidth} broken=${base.brokenImages.length} console=${errors.consoleErrors.length} page=${errors.pageErrors.length} request=${errors.requestFailures.length} bad=${errors.badResponses.length} failures=${failures.join(',') || 'none'}`);
    await context.close();
  }
}

const journeyContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const journeyPage = await journeyContext.newPage();
const journeyErrors = telemetry(journeyPage);
await journeyPage.goto(`${origin}/homepage`, { waitUntil: 'domcontentloaded' });
await journeyPage.locator('#pdpAdd').click();
await journeyPage.waitForURL(`${origin}/products/pure-carob-bar`, { timeout: 15000 });
await settle(journeyPage);
const journey = {
  url: journeyPage.url(),
  pathname: new URL(journeyPage.url()).pathname,
  title: (await journeyPage.locator('#product-title').innerText()).replace(/\s+/g, ' ').trim(),
  httpStatus: (await journeyPage.request.get(journeyPage.url())).status(),
  ...journeyErrors,
};
journey.screenshot = path.join(screenshotDir, 'homepage-to-pure-journey-390.png');
await journeyPage.screenshot({ path: journey.screenshot, fullPage: true, animations: 'disabled' });
journey.failures = [];
if (journey.pathname !== '/products/pure-carob-bar') journey.failures.push('wrong-path');
if (journey.title !== 'Pure Carob & Cacao Butter') journey.failures.push('wrong-title');
if (journey.httpStatus !== 200) journey.failures.push(`http-${journey.httpStatus}`);
if (journey.consoleErrors.length || journey.pageErrors.length || journey.requestFailures.length || journey.badResponses.length) journey.failures.push('runtime-errors');
journey.result = journey.failures.length ? 'FAIL' : 'PASS';
console.log(`${journey.result} journey=homepage-to-pure path=${journey.pathname} http=${journey.httpStatus} title=${JSON.stringify(journey.title)} failures=${journey.failures.join(',') || 'none'}`);
await journeyContext.close();

const contacts = [];
for (const [widthLabel] of viewports) contacts.push(await makeContact(widthLabel, results.filter(row => row.width === widthLabel)));
await browser.close();
const failures = results.filter(row => row.result === 'FAIL');
const result = { source: origin, contacts, results, journey, failures: [...failures, ...(journey.result === 'FAIL' ? [{ journey }] : [])] };
fs.writeFileSync(path.join(output, 'visual-results.json'), JSON.stringify(result, null, 2) + '\n');
console.log(`SUMMARY pass=${results.length - failures.length}/${results.length} journey=${journey.result} fail=${result.failures.length}`);
process.exitCode = result.failures.length ? 1 : 0;
