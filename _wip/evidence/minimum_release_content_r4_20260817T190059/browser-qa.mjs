import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const ROOT = '/Users/handtomouse/maplemoon-website/_wip/deploy/generated/maplemoon-minimum-release-content-r4-20260817T190059';
const EVIDENCE = '/Users/handtomouse/maplemoon-website/_wip/evidence/minimum_release_content_r4_20260817T190059';
const SCREENSHOTS = path.join(EVIDENCE, 'screenshots');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const routes = [
  ['homepage', '/homepage.html'],
  ['shop', '/shop.html'],
  ['our-story', '/our-story.html'],
  ['carob-story', '/carob-story.html'],
  ['faq', '/faq.html'],
  ['stockists', '/stockists.html'],
  ['pure-carob-bar', '/products/pure-carob-bar.html'],
];
const widths = [390, 768, 900, 1024, 1440];
fs.mkdirSync(SCREENSHOTS, { recursive: true });

const types = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'], ['.json', 'application/json'],
  ['.svg', 'image/svg+xml'], ['.png', 'image/png'], ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'], ['.webp', 'image/webp'], ['.mp4', 'video/mp4'],
]);
const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://127.0.0.1');
  let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if (!relative) relative = 'homepage.html';
  const target = path.resolve(ROOT, relative);
  if (!target.startsWith(path.resolve(ROOT) + path.sep) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'content-type': types.get(path.extname(target).toLowerCase()) || 'application/octet-stream' });
  fs.createReadStream(target).pipe(res);
});
await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--disable-background-networking', '--disable-component-update', '--no-default-browser-check', '--no-first-run'],
});
const results = [];

async function settleImages(page) {
  await page.evaluate(async () => {
    const images = [...document.images];
    images.forEach((image) => { image.loading = 'eager'; });
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(320, innerHeight * 0.75)) {
      scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    scrollTo(0, 0);
    await Promise.all(images.map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
        setTimeout(resolve, 5000);
      });
    }));
  });
  await page.waitForTimeout(100);
}

async function exercise(page, name, width) {
  const evidence = {};
  await page.keyboard.press('Tab');
  evidence.firstFocus = await page.evaluate(() => ({
    tag: document.activeElement?.tagName || '',
    text: (document.activeElement?.textContent || '').trim().slice(0, 80),
    href: document.activeElement?.getAttribute?.('href') || '',
  }));

  const menu = page.locator('[data-mm-menu-toggle]');
  if (width <= 900 && await menu.count() && await menu.isVisible()) {
    await menu.click();
    evidence.mobileMenu = {
      opened: await page.evaluate(() => document.body.hasAttribute('data-mm-menu-open')),
    };
    await page.keyboard.press('Escape');
    evidence.mobileMenu.closed = await page.evaluate(() => !document.body.hasAttribute('data-mm-menu-open'));
  } else {
    evidence.mobileMenu = { applicable: false };
  }

  if (name === 'homepage') {
    const before = await page.locator('#pdpName').innerText();
    await page.locator('.arw.r').click();
    const after = await page.locator('#pdpName').innerText();
    evidence.range = { before, after, changed: before !== after };
    evidence.reviews = {
      cards: await page.locator('.mm-review-grid > div').count(),
      internalVisible: await page.locator('#reviews').innerText().then((text) => /consent|WIP|noindexed|pending before go-live/i.test(text)),
    };
  }
  if (name === 'shop') {
    evidence.shop = {
      cards: await page.locator('.pcard').count(),
      enquiries: await page.locator('.pcard a[href^="mailto:"]').count(),
      cartControls: await page.locator('[data-cart-toggle],[data-add-to-cart]').count(),
    };
    await page.locator('button.swatch[data-flavour="pure"]').click();
    evidence.shop.filteredVisible = await page.locator('.pcard:not([hidden])').count();
  }
  if (name === 'our-story') {
    const details = page.locator('details').first();
    if (await details.count()) await details.locator('summary').click();
    evidence.founders = {
      cards: await page.locator('.os-founder-note').count(),
      placeholders: await page.locator('.os-founder-placeholder').count(),
      pairHero: await page.locator('.os-story-hero__portrait img').count(),
    };
  }
  if (name === 'faq') {
    const question = page.locator('.faq-question').first();
    await question.click();
    evidence.faq = { opened: await question.getAttribute('aria-expanded') === 'true' };
    await page.locator('#faq-search').fill('caffeine');
    await page.waitForTimeout(50);
    evidence.faq.matches = await page.locator('.faq-item').count();
    evidence.faq.exactQuestion = await page.getByText('Does carob contain caffeine?', { exact: true }).count();
  }
  if (name === 'stockists') {
    const countBefore = await page.locator('#stockistCount').innerText();
    await page.locator('#stockistSearch').fill('Byron Bay');
    await page.waitForTimeout(80);
    evidence.stockists = {
      countBefore,
      countAfter: await page.locator('#stockistCount').innerText(),
      renderedAfter: await page.locator('.st-result').count(),
      internalVisible: await page.locator('main').innerText().then((text) => /WIP|preview only|client confirmation|need confirmation/i.test(text)),
    };
  }
  if (name === 'pure-carob-bar') {
    evidence.pure = {
      enquiry: await page.locator('a[href^="mailto:"][class*="pd-cta"]').count(),
      cartControls: await page.locator('[data-mm-cart-toggle],[data-add-to-cart]').count(),
      relatedImages: await page.locator('.pd-related img').count(),
    };
  }
  return evidence;
}

try {
  for (const [name, route] of routes) {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      const requestFailures = [];
      const badResponses = [];
      page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      page.on('pageerror', (error) => pageErrors.push(String(error)));
      page.on('requestfailed', (request) => requestFailures.push(`${request.method()} ${request.url()} ${request.failure()?.errorText || ''}`));
      page.on('response', (response) => { if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`); });
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await settleImages(page);
      const interaction = await exercise(page, name, width);
      await settleImages(page);
      const metrics = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyText: document.body.innerText.trim().length,
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
        incompleteImages: [...document.images].filter((image) => !image.complete).map((image) => image.currentSrc || image.src),
        overlay: !!document.querySelector('[data-nextjs-dialog],.vite-error-overlay,#webpack-dev-server-client-overlay'),
      }));
      let screenshot = null;
      if (width === 390 || width === 1440) {
        screenshot = path.join(SCREENSHOTS, `${name}-${width}.png`);
        await page.screenshot({ path: screenshot, fullPage: true });
      }
      const record = {
        name, route, width, status: response?.status() || 0, metrics, interaction,
        consoleErrors, pageErrors, requestFailures, badResponses, screenshot,
      };
      const failures = [];
      if (record.status !== 200) failures.push(`status=${record.status}`);
      if (metrics.clientWidth !== width || metrics.scrollWidth !== width) failures.push(`width=${metrics.clientWidth}/${metrics.scrollWidth}`);
      if (!metrics.bodyText) failures.push('blank-body');
      if (metrics.brokenImages.length) failures.push(`broken-images=${metrics.brokenImages.length}`);
      if (metrics.incompleteImages.length) failures.push(`incomplete-images=${metrics.incompleteImages.length}`);
      if (metrics.overlay) failures.push('error-overlay');
      if (consoleErrors.length) failures.push(`console=${consoleErrors.length}`);
      if (pageErrors.length) failures.push(`page=${pageErrors.length}`);
      if (requestFailures.length) failures.push(`request=${requestFailures.length}`);
      if (badResponses.length) failures.push(`bad=${badResponses.length}`);
      if (name === 'homepage' && (!interaction.range.changed || interaction.reviews.cards !== 3 || interaction.reviews.internalVisible)) failures.push('homepage-interaction');
      if (name === 'shop' && (interaction.shop.cards !== 6 || interaction.shop.enquiries !== 6 || interaction.shop.cartControls !== 0)) failures.push('shop-truth');
      if (name === 'our-story' && (interaction.founders.cards !== 2 || interaction.founders.placeholders !== 0 || interaction.founders.pairHero !== 1)) failures.push('founder-truth');
      if (name === 'faq' && (!interaction.faq.opened || interaction.faq.exactQuestion !== 1)) failures.push('faq-interaction');
      if (name === 'stockists' && interaction.stockists.internalVisible) failures.push('stockist-internal-copy');
      if (name === 'pure-carob-bar' && (interaction.pure.enquiry !== 1 || interaction.pure.cartControls !== 0)) failures.push('pure-enquiry');
      record.failures = failures;
      results.push(record);
      console.log(`${failures.length ? 'FAIL' : 'PASS'} route=${name} width=${width} status=${record.status} client=${metrics.clientWidth} scroll=${metrics.scrollWidth} images=${metrics.brokenImages.length}/${metrics.incompleteImages.length} console=${consoleErrors.length} page=${pageErrors.length} request=${requestFailures.length} bad=${badResponses.length}${failures.length ? ` failures=${failures.join(',')}` : ''}`);
      if (consoleErrors.length || pageErrors.length || requestFailures.length || badResponses.length) {
        console.log(JSON.stringify({ name, width, consoleErrors, pageErrors, requestFailures, badResponses }));
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const failures = results.flatMap((record) => record.failures.map((failure) => `${record.name}@${record.width}:${failure}`));
const output = { outcome: failures.length ? 'FAIL' : 'PASS', cases: results.length, screenshots: results.filter((record) => record.screenshot).length, failures, results };
fs.writeFileSync(path.join(EVIDENCE, 'browser-qa.json'), JSON.stringify(output, null, 2));
console.log(`BROWSER_QA outcome=${output.outcome} cases=${output.cases}/35 screenshots=${output.screenshots}/14 failures=${failures.length}`);
if (failures.length) process.exitCode = 2;
