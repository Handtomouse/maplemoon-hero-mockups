import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const sharp = require(`${runtime}/sharp`);
const origin = 'http://127.0.0.1:8787';
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/minimum_release_dry_run_20260816T203628';
const screenshotDir = path.join(output, 'screenshots');
fs.mkdirSync(screenshotDir, { recursive: true });

function telemetry(page) {
  const state = { consoleErrors: [], pageErrors: [], requestFailures: [], badResponses: [] };
  page.on('console', message => { if (message.type() === 'error') state.consoleErrors.push(message.text()); });
  page.on('pageerror', error => state.pageErrors.push(error.message));
  page.on('requestfailed', request => state.requestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' }));
  page.on('response', response => { if (response.status() >= 400) state.badResponses.push({ url: response.url(), status: response.status() }); });
  return state;
}

async function settleImages(page) {
  await page.evaluate(async () => {
    for (const image of document.images) {
      image.loading = 'eager';
      image.scrollIntoView({ block: 'center' });
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (image.decode) await image.decode().catch(() => {});
    }
    scrollTo(0, 0);
    await Promise.race([document.fonts?.ready || Promise.resolve(), new Promise(resolve => setTimeout(resolve, 4000))]);
  });
  await page.waitForTimeout(300);
}

async function shotElement(page, selector, name, padding = 20) {
  const locator = page.locator(selector).first();
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const box = await locator.boundingBox();
  const viewport = page.viewportSize();
  if (!box || !viewport) throw new Error(`missing shot target ${selector}`);
  const top = Math.max(0, box.y - padding);
  const left = Math.max(0, box.x - padding);
  const width = Math.min(viewport.width - left, box.width + padding * 2);
  const height = Math.min(viewport.height, box.height + padding * 2);
  const destination = path.join(screenshotDir, name);
  await page.screenshot({ path: destination, clip: { x: left, y: top, width, height }, animations: 'disabled' });
  const metadata = await sharp(destination).metadata();
  const stats = await sharp(destination).stats();
  return { path: destination, width: metadata.width, height: metadata.height, nonblank: stats.channels.slice(0, 3).every(channel => channel.stdev > 2) };
}

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const results = [];
for (const width of [390, 1440]) {
  const viewport = { width, height: width === 390 ? 844 : 1100 };
  for (const route of ['products/pure-carob-bar', 'our-story', 'faq', 'stockists', 'shop']) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = telemetry(page);
    const response = await page.goto(`${origin}/${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await settleImages(page);
    const common = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      title: document.title,
    }));
    const details = {};
    const screenshots = [];

    if (route === 'products/pure-carob-bar') {
      details.related = await page.evaluate(() => [...document.querySelectorAll('.pcard .ph img')].map(image => {
        const style = getComputedStyle(image);
        const rect = image.getBoundingClientRect();
        return {
          alt: image.alt,
          src: image.currentSrc || image.src,
          complete: image.complete,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          width: Math.round(rect.width * 100) / 100,
          height: Math.round(rect.height * 100) / 100,
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
        };
      }));
      screenshots.push(await shotElement(page, '.pd-sec', `pure-related-${width}.png`, 12));
    }

    if (route === 'our-story') {
      details.founders = await page.evaluate(() => ({
        heroImages: [...document.querySelectorAll('.os-story-hero img')].map(image => ({ alt: image.alt, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight })),
        portraitImages: [...document.querySelectorAll('.os-founder-note__portrait img')].map(image => ({ alt: image.alt, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight })),
        placeholders: [...document.querySelectorAll('.os-founder-note__portrait')].map(element => ({ text: element.textContent.trim(), html: element.innerHTML.trim().slice(0, 300) })),
      }));
      screenshots.push(await shotElement(page, '.os-founder-notes', `our-story-founders-${width}.png`, 12));
    }

    if (route === 'faq') {
      details.pills = await page.evaluate(() => {
        const container = document.querySelector('.popular-row');
        const items = container ? [...container.querySelectorAll('button,a')] : [];
        return {
          container: container ? { clientWidth: container.clientWidth, scrollWidth: container.scrollWidth, overflowX: getComputedStyle(container).overflowX } : null,
          items: items.map(item => { const r = item.getBoundingClientRect(); return { text: item.textContent.trim(), left: r.left, right: r.right, width: r.width, visibleInViewport: r.left >= 0 && r.right <= innerWidth }; }),
        };
      });
      screenshots.push(await shotElement(page, '.faq-hero, .faq-shell', `faq-top-${width}.png`, 8));
    }

    if (route === 'stockists') {
      details.status = await page.evaluate(() => ({
        heading: document.querySelector('h1')?.textContent.replace(/\s+/g, ' ').trim(),
        heroCopy: document.querySelector('.sp-head p')?.textContent.replace(/\s+/g, ' ').trim(),
        count: document.querySelector('#stockistCount')?.textContent.replace(/\s+/g, ' ').trim(),
        internalTerms: [...document.querySelectorAll('p,span,strong,button,label,h1,h2,h3,h4')]
          .filter(element => element.offsetParent !== null && /client confirmation|directory details are being confirmed|review/i.test(element.textContent || ''))
          .map(element => element.textContent.replace(/\s+/g, ' ').trim())
          .slice(0, 20),
      }));
      screenshots.push(await shotElement(page, '.sp-head', `stockists-top-${width}.png`, 8));
    }

    if (route === 'shop') {
      details.catalogue = await page.evaluate(() => ({
        sections: [...document.querySelectorAll('.grid[data-cat]')].map(element => element.getAttribute('data-cat')).filter(Boolean),
        cards: document.querySelectorAll('.pcard').length,
        addToCart: document.querySelectorAll('[data-add-to-cart]').length,
        enquire: [...document.querySelectorAll('a[href^="mailto:"]')].filter(element => /enquire/i.test(element.textContent || element.getAttribute('aria-label') || '')).length,
      }));
      screenshots.push(await shotElement(page, '.sp-opening', `shop-top-${width}.png`, 8));
    }

    const failures = [];
    if (response?.status() !== 200) failures.push(`http-${response?.status() || 0}`);
    if (common.clientWidth !== width || common.scrollWidth > common.clientWidth + 1) failures.push('width-or-overflow');
    if (errors.consoleErrors.length || errors.pageErrors.length || errors.requestFailures.length || errors.badResponses.length) failures.push('runtime-errors');
    if (screenshots.some(item => !item.nonblank)) failures.push('blank-screenshot');
    const row = { route, width, httpStatus: response?.status() || 0, common, details, screenshots, ...errors, failures, result: failures.length ? 'FAIL' : 'PASS' };
    results.push(row);
    console.log(`${row.result} route=${route} width=${width} http=${row.httpStatus} client=${common.clientWidth} scroll=${common.scrollWidth} failures=${failures.join(',') || 'none'}`);
    await context.close();
  }
}
await browser.close();
const failures = results.filter(row => row.result !== 'PASS');
fs.writeFileSync(path.join(output, 'visual-probe-results.json'), JSON.stringify({ origin, results, failures }, null, 2) + '\n');
console.log(`SUMMARY pass=${results.length - failures.length} fail=${failures.length} total=${results.length}`);
process.exitCode = failures.length ? 1 : 0;
