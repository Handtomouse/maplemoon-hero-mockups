import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const sharp = require(`${runtime}/sharp`);

const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/track1_carli_build_20260816';
const screenshotDir = path.join(output, 'screenshots');
const origin = 'http://127.0.0.1:8782';
const pages = ['homepage', 'shop', 'our-story', 'carob-story', 'faq', 'stockists'];
const viewports = [
  ['390', { width: 390, height: 844 }],
  ['1440', { width: 1440, height: 1100 }],
];

fs.mkdirSync(screenshotDir, { recursive: true });

function telemetry(page) {
  const result = { consoleErrors: [], pageErrors: [], requestFailures: [], badResponses: [] };
  page.on('console', message => {
    if (message.type() === 'error') result.consoleErrors.push(message.text());
  });
  page.on('pageerror', error => result.pageErrors.push(error.message));
  page.on('requestfailed', request => {
    result.requestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' });
  });
  page.on('response', response => {
    if (response.status() >= 400) result.badResponses.push({ url: response.url(), status: response.status() });
  });
  return result;
}

async function settle(page) {
  await page.evaluate(async () => {
    for (const image of document.images) image.loading = 'eager';
    const step = Math.max(400, Math.floor(innerHeight * 0.75));
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 70));
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
  await page.waitForTimeout(350);
}

async function metrics(page) {
  return page.evaluate(() => {
    const header = document.querySelector('header');
    const images = [...document.images].map(image => ({
      src: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      rect: {
        width: Math.round(image.getBoundingClientRect().width),
        height: Math.round(image.getBoundingClientRect().height),
      },
    }));
    return {
      title: document.title,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyHeight: Math.ceil(document.body?.getBoundingClientRect().height || 0),
      textLength: (document.body?.innerText || '').trim().length,
      headerVisible: Boolean(header && getComputedStyle(header).display !== 'none' && header.getBoundingClientRect().height > 0),
      headerHeight: header ? Math.round(header.getBoundingClientRect().height) : 0,
      images,
      brokenImages: images.filter(image => !image.complete || image.naturalWidth < 1 || image.naturalHeight < 1),
      menuToggleCount: document.querySelectorAll('[data-mm-menu-toggle]').length,
      cartToggleCount: document.querySelectorAll('[data-mm-cart-toggle],[data-cart-toggle]').length,
    };
  });
}

async function contactSheet(widthLabel, rows) {
  const desktop = widthLabel === '1440';
  const columns = desktop ? 2 : 3;
  const cellWidth = desktop ? 700 : 390;
  const cellHeight = desktop ? 900 : 1000;
  const gap = 20;
  const sheetRows = Math.ceil(rows.length / columns);
  const width = columns * cellWidth + (columns + 1) * gap;
  const height = sheetRows * cellHeight + (sheetRows + 1) * gap;
  const composites = [];
  for (let index = 0; index < rows.length; index += 1) {
    const input = await sharp(rows[index].screenshot)
      .resize({ width: cellWidth, height: cellHeight - 45, fit: 'contain', background: '#ffffff' })
      .extend({ top: 45, bottom: 0, left: 0, right: 0, background: '#ffffff' })
      .composite([{
        input: Buffer.from(`<svg width="${cellWidth}" height="45"><rect width="100%" height="100%" fill="#d8e7f2"/><text x="18" y="29" font-size="20" font-family="Arial" fill="#173c4d">${rows[index].route} · ${widthLabel}px</text></svg>`),
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
  const destination = path.join(screenshotDir, `contact-${widthLabel}.png`);
  await sharp({ create: { width, height, channels: 3, background: '#eef5f9' } })
    .composite(composites)
    .png()
    .toFile(destination);
  return destination;
}

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const results = [];

for (const route of pages) {
  for (const [widthLabel, viewport] of viewports) {
    const context = await browser.newContext({ viewport, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    const errors = telemetry(page);
    const url = `${origin}/${route}.html`;
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await settle(page);
    const baseMetrics = await metrics(page);
    const screenshot = path.join(screenshotDir, `${route}-${widthLabel}.png`);
    await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled' });
    const interactions = {};

    if (route === 'homepage' && widthLabel === '390') {
      const menu = page.locator('[data-mm-menu-toggle]');
      await menu.click();
      await page.waitForTimeout(150);
      interactions.menu = await page.evaluate(() => ({
        expanded: document.querySelector('[data-mm-menu-toggle]')?.getAttribute('aria-expanded'),
        state: document.querySelector('[data-mm-chrome]')?.getAttribute('data-mm-menu-state'),
        bodyOpen: document.body.hasAttribute('data-mm-menu-open'),
      }));
      interactions.menuScreenshot = path.join(screenshotDir, 'homepage-390-menu-open.png');
      await page.screenshot({ path: interactions.menuScreenshot, fullPage: false, animations: 'disabled' });
      await menu.click();
      const before = await page.evaluate(() => ({
        dialogs: [...document.querySelectorAll('[role=dialog],aside,.cart-drawer,[data-cart-drawer]')]
          .filter(element => getComputedStyle(element).display !== 'none').length,
        bodyAttributes: [...document.body.attributes].map(attribute => `${attribute.name}=${attribute.value}`).sort(),
      }));
      await page.locator('[data-mm-cart-toggle]').click();
      await page.waitForTimeout(200);
      const after = await page.evaluate(() => ({
        dialogs: [...document.querySelectorAll('[role=dialog],aside,.cart-drawer,[data-cart-drawer]')]
          .filter(element => getComputedStyle(element).display !== 'none').length,
        bodyAttributes: [...document.body.attributes].map(attribute => `${attribute.name}=${attribute.value}`).sort(),
      }));
      interactions.homeCart = { before, after, effect: JSON.stringify(before) !== JSON.stringify(after) };
    }

    if (route === 'shop') {
      const before = await page.locator('[data-cart-subtotal]').innerText();
      await page.locator('[data-add-to-cart]').first().click();
      await page.waitForTimeout(150);
      interactions.cart = {
        before,
        after: await page.locator('[data-cart-subtotal]').innerText(),
        count: await page.locator('[data-cart-count]').innerText(),
        label: await page.locator('[data-cart-toggle]').getAttribute('aria-label'),
      };
      interactions.cartScreenshot = path.join(screenshotDir, `shop-${widthLabel}-cart.png`);
      await page.screenshot({ path: interactions.cartScreenshot, fullPage: false, animations: 'disabled' });
    }

    if (route === 'faq') {
      const question = page.locator('.faq-question[data-open="is-there-maple-in-it"]');
      const questionCount = await question.count();
      interactions.faq = { questionCount, expanded: null, answerId: null, answerVisible: false };
      if (questionCount === 1) {
        await question.click();
        await page.waitForTimeout(150);
        const answerId = await question.getAttribute('aria-controls');
        interactions.faq = {
          questionCount,
          expanded: await question.getAttribute('aria-expanded'),
          answerId,
          answerVisible: await page.locator(`#${answerId}`).isVisible(),
        };
        await question.scrollIntoViewIfNeeded();
        interactions.faqScreenshot = path.join(screenshotDir, `faq-${widthLabel}-open.png`);
        await page.screenshot({ path: interactions.faqScreenshot, fullPage: false, animations: 'disabled' });
      }
    }

    const screenshotMetadata = await sharp(screenshot).metadata();
    const screenshotStats = await sharp(screenshot).stats();
    const channelStdev = screenshotStats.channels.slice(0, 3).map(channel => channel.stdev);
    const failures = [];
    if (response?.status() !== 200) failures.push(`http-${response?.status() || 0}`);
    if (baseMetrics.clientWidth !== viewport.width || baseMetrics.scrollWidth > baseMetrics.clientWidth + 1) failures.push('horizontal-overflow-or-width');
    if (baseMetrics.bodyHeight < viewport.height || baseMetrics.textLength < 100) failures.push('blank-or-short-page');
    if (!baseMetrics.headerVisible) failures.push('header-not-visible');
    if (baseMetrics.brokenImages.length) failures.push('broken-images');
    if (errors.consoleErrors.length) failures.push('console-errors');
    if (errors.pageErrors.length) failures.push('page-errors');
    if (errors.requestFailures.length) failures.push('request-failures');
    if (errors.badResponses.length) failures.push('bad-responses');
    if (screenshotMetadata.width !== viewport.width || channelStdev.some(value => value < 2)) failures.push('invalid-screenshot');
    if (route === 'homepage' && widthLabel === '390') {
      if (interactions.menu.expanded !== 'true' || interactions.menu.state !== 'open' || !interactions.menu.bodyOpen) failures.push('mobile-menu');
      if (!interactions.homeCart.effect) failures.push('homepage-cart-no-effect');
    }
    if (route === 'shop' && (!/\$12\.95/.test(interactions.cart.after) || interactions.cart.count !== '1' || !/Cart, 1 item, subtotal \$12\.95/.test(interactions.cart.label || ''))) failures.push('shop-cart');
    if (route === 'faq' && (interactions.faq.questionCount !== 1 || interactions.faq.expanded !== 'true' || !interactions.faq.answerVisible)) failures.push('faq-open');

    const row = {
      route,
      width: widthLabel,
      url,
      httpStatus: response?.status() || 0,
      metrics: baseMetrics,
      screenshot,
      screenshotBytes: fs.statSync(screenshot).size,
      screenshotMetadata: { width: screenshotMetadata.width, height: screenshotMetadata.height },
      screenshotChannelStdev: channelStdev,
      interactions,
      ...errors,
      failures,
      result: failures.length ? 'FAIL' : 'PASS',
    };
    results.push(row);
    console.log(`${row.result} route=${route} width=${widthLabel} http=${row.httpStatus} client=${baseMetrics.clientWidth} scroll=${baseMetrics.scrollWidth} body=${baseMetrics.bodyHeight} images=${baseMetrics.images.length} broken=${baseMetrics.brokenImages.length} console=${errors.consoleErrors.length} page_errors=${errors.pageErrors.length} request_failures=${errors.requestFailures.length} bad_responses=${errors.badResponses.length} failures=${failures.join(',') || 'none'}`);
    await context.close();
  }
}

const contacts = [];
for (const [widthLabel] of viewports) contacts.push(await contactSheet(widthLabel, results.filter(row => row.width === widthLabel)));
await browser.close();

fs.writeFileSync(path.join(output, 'visual-results.json'), JSON.stringify({
  browser: 'Google Chrome via bundled Playwright; agent-browser CLI unavailable',
  source: 'byte-identical local staging for SSO-protected preview',
  preview: 'https://maplemoonbuild20260813-fsdi7562p-handtomouses-projects.vercel.app',
  contacts,
  results,
  failures: results.filter(row => row.result === 'FAIL'),
}, null, 2) + '\n');

process.exitCode = results.some(row => row.result === 'FAIL') ? 1 : 0;
