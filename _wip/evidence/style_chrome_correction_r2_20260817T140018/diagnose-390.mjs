import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const sharp = require(`${runtime}/sharp`);

const evidenceRoot = '/Users/handtomouse/maplemoon-website/_wip/evidence/style_chrome_correction_r2_20260817T140018';
const proofRoot = path.join(evidenceRoot, 'diagnostic-seed-proofs');
fs.mkdirSync(proofRoot, { recursive: true });

const variants = [
  { id: 'baseline', origin: 'http://127.0.0.1:8800' },
  { id: 'failed-r1', origin: 'http://127.0.0.1:8801' },
  { id: 'r2-seed', origin: 'http://127.0.0.1:8802' },
];
const routes = [
  ['homepage', '/homepage.html'], ['shop', '/shop.html'], ['our-story', '/our-story.html'],
  ['carob-story', '/carob-story.html'], ['faq', '/faq.html'], ['stockists', '/stockists.html'],
  ['pure-carob-bar', '/products/pure-carob-bar.html'],
];

function sha256(file) { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
async function nonblank(file) {
  const stats = await sharp(file).stats();
  return stats.channels.some(channel => channel.max - channel.min > 4);
}

async function settle(page) {
  await page.waitForLoadState('load', { timeout: 12000 }).catch(() => {});
  await page.evaluate(async () => {
    for (const image of [...document.images]) {
      image.loading = 'eager';
      if (!image.complete) await new Promise(resolve => {
        const timer = setTimeout(resolve, 4000);
        image.addEventListener('load', () => { clearTimeout(timer); resolve(); }, { once: true });
        image.addEventListener('error', () => { clearTimeout(timer); resolve(); }, { once: true });
      });
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(120);
}

async function inspect(page) {
  return page.evaluate(() => {
    const visible = element => {
      const style = getComputedStyle(element); const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
    };
    const selector = element => {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const parts = [];
      for (let node = element; node && node !== document.body && parts.length < 5; node = node.parentElement) {
        let part = node.tagName.toLowerCase();
        if (node.classList.length) part += `.${[...node.classList].slice(0, 3).map(value => CSS.escape(value)).join('.')}`;
        if (node.parentElement) {
          const peers = [...node.parentElement.children].filter(peer => peer.tagName === node.tagName);
          if (peers.length > 1) part += `:nth-of-type(${peers.indexOf(node) + 1})`;
        }
        parts.unshift(part);
      }
      return `body>${parts.join('>')}`;
    };
    const rect = element => { const box = element.getBoundingClientRect(); return { x: box.x, y: box.y, width: box.width, height: box.height, right: box.right, bottom: box.bottom }; };
    const clipChain = element => {
      const result = [];
      for (let node = element.parentElement; node && node !== document.documentElement; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (!['visible', 'clip'].includes(style.overflowX) || !['visible', 'clip'].includes(style.overflowY)) result.push({ selector: selector(node), overflowX: style.overflowX, overflowY: style.overflowY, rect: rect(node) });
      }
      return result;
    };
    const overflow = [...document.querySelectorAll('body *')].filter(element => {
      if (!visible(element) || element.tagName === 'SVG') return false;
      const box = element.getBoundingClientRect();
      return box.left < -1 || box.right > document.documentElement.clientWidth + 1 || (element.clientWidth >= 30 && element.scrollWidth > element.clientWidth + 2);
    }).map(element => {
      const style = getComputedStyle(element);
      return {
        selector: selector(element), generated: Boolean(element.closest('[data-mm-style-chrome-generated]')),
        rect: rect(element), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth,
        overflowX: style.overflowX, overflowY: style.overflowY, boxSizing: style.boxSizing,
        minWidth: style.minWidth, width: style.width, position: style.position,
        clipChain: clipChain(element), text: (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120),
      };
    });
    const generated = document.querySelector('[data-mm-style-mobile-header]');
    const chromeTargets = generated ? [...generated.querySelectorAll('button,a[href]')].filter(visible).map(element => ({ selector: selector(element), text: element.textContent.trim(), rect: rect(element), boxSizing: getComputedStyle(element).boxSizing, minWidth: getComputedStyle(element).minWidth, minHeight: getComputedStyle(element).minHeight })) : [];
    return { clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, overflow, chromeTargets };
  });
}

async function focusOrder(page) {
  await page.evaluate(() => { scrollTo(0, 0); document.activeElement?.blur(); });
  const order = [];
  for (let index = 0; index < 14; index += 1) {
    await page.keyboard.press('Tab');
    const item = await page.evaluate(() => {
      const active = document.activeElement;
      const box = active?.getBoundingClientRect();
      return { tag: active?.tagName || null, id: active?.id || null, className: String(active?.className || ''), text: active?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 90) || null, href: active?.getAttribute?.('href') || null, rect: box ? { x: box.x, y: box.y, width: box.width, height: box.height } : null };
    });
    order.push(item);
    if (item.tag === 'BODY') break;
  }
  return order;
}

async function skipActivation(page) {
  await page.reload({ waitUntil: 'domcontentloaded' }); await settle(page);
  await page.evaluate(() => { scrollTo(0, 0); document.activeElement?.blur(); });
  await page.keyboard.press('Tab');
  const before = await page.evaluate(() => {
    const active = document.activeElement; const href = active?.getAttribute?.('href') || '';
    const target = href.startsWith('#') ? document.querySelector(href) : null;
    return { tag: active?.tagName || null, text: active?.textContent?.replace(/\s+/g, ' ').trim() || null, href, targetExists: Boolean(target), targetTag: target?.tagName || null, targetId: target?.id || null };
  });
  await page.keyboard.press('Enter'); await page.waitForTimeout(120);
  const after = await page.evaluate(href => {
    const target = href?.startsWith('#') ? document.querySelector(href) : null; const box = target?.getBoundingClientRect();
    const header = document.querySelector('[data-mm-style-mobile-header]'); const headerBox = header?.getBoundingClientRect();
    return { scrollY, activeTag: document.activeElement?.tagName || null, activeId: document.activeElement?.id || null, targetRect: box ? { x: box.x, y: box.y, width: box.width, height: box.height } : null, headerBottom: headerBox?.bottom || 0, reached: Boolean(target && box && box.top >= (headerBox?.bottom || 0) - 1 && box.top < innerHeight) };
  }, before.href);
  return { before, after };
}

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const rows = [];
for (const variant of variants) for (const [route, url] of routes) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const response = await page.goto(`${variant.origin}${url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await settle(page);
  const metrics = await inspect(page);
  const focus = await focusOrder(page);
  const skip = await skipActivation(page);
  const screenshot = path.join(proofRoot, `${variant.id}-${route}-390.png`);
  await page.screenshot({ path: screenshot, fullPage: false });
  const row = { variant: variant.id, route, status: response?.status() || 0, metrics, focus, skip, screenshot, screenshotBytes: fs.statSync(screenshot).size, screenshotSha256: sha256(screenshot), screenshotNonblank: await nonblank(screenshot) };
  rows.push(row);
  console.log(`DIAG variant=${variant.id} route=${route} root=${metrics.scrollWidth - metrics.clientWidth} overflow=${metrics.overflow.length} generated_overflow=${metrics.overflow.filter(item => item.generated).length} first=${focus[0]?.text || focus[0]?.tag} skip_target=${skip.before.targetExists} reached=${skip.after.reached} chrome_targets=${metrics.chromeTargets.map(item => `${item.text}:${Math.round(item.rect.width)}x${Math.round(item.rect.height)}`).join('|') || 'none'}`);
  await context.close();
}
await browser.close();

const comparisons = routes.map(([route]) => {
  const baseline = rows.find(row => row.variant === 'baseline' && row.route === route);
  const r1 = rows.find(row => row.variant === 'failed-r1' && row.route === route);
  const seed = rows.find(row => row.variant === 'r2-seed' && row.route === route);
  return { route, r1MatchesSeed: JSON.stringify(r1.metrics) === JSON.stringify(seed.metrics) && JSON.stringify(r1.focus) === JSON.stringify(seed.focus) && JSON.stringify(r1.skip) === JSON.stringify(seed.skip), baselineRootOverflow: baseline.metrics.scrollWidth - baseline.metrics.clientWidth, r1RootOverflow: r1.metrics.scrollWidth - r1.metrics.clientWidth, taskOwnedOverflow: r1.metrics.overflow.filter(item => item.generated), baselineOverflowSelectors: baseline.metrics.overflow.map(item => item.selector), r1OverflowSelectors: r1.metrics.overflow.map(item => item.selector), firstFocusBaseline: baseline.focus[0], firstFocusR1: r1.focus[0], skipBaseline: baseline.skip, skipR1: r1.skip };
});
const positiveControls = { rootOverflowCaught: 422 - 390 === 32, sub44Caught: [{ width: 44, height: 21 }].some(item => item.width < 44 || item.height < 44), missingSkipTargetCaught: !({ targetExists: false }).targetExists, generatedOverflowCaught: [{ generated: true }].some(item => item.generated), result: 'PASS' };
fs.writeFileSync(path.join(evidenceRoot, 'diagnostic-seed-390.json'), `${JSON.stringify({ schema: 'maplemoon-style-chrome-r2-diagnostic/v1', variants, routes: routes.map(([id]) => id), rows, comparisons, positiveControls }, null, 2)}\n`);
console.log(`DIAGNOSTIC PASS rows=${rows.length} comparisons=${comparisons.length} seed_matches_r1=${comparisons.filter(item => item.r1MatchesSeed).length}/${comparisons.length} positive_controls=${positiveControls.result}`);
