import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const sharp = require(`${runtime}/sharp`);
const evidenceRoot = '/Users/handtomouse/maplemoon-website/_wip/evidence/style_chrome_correction_r2_20260817T140018';
const proofRoot = path.join(evidenceRoot, 'focused-390-proofs');
fs.mkdirSync(proofRoot, { recursive: true });
const origins = { baseline: 'http://127.0.0.1:8800', r2: 'http://127.0.0.1:8803' };
const routes = [
  ['homepage', '/homepage.html'], ['shop', '/shop.html'], ['our-story', '/our-story.html'],
  ['carob-story', '/carob-story.html'], ['faq', '/faq.html'], ['stockists', '/stockists.html'],
  ['pure-carob-bar', '/products/pure-carob-bar.html'],
];

function sha256(file) { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
async function nonblank(file) { const stats = await sharp(file).stats(); return stats.channels.some(channel => channel.max - channel.min > 4); }
async function settle(page) { await page.waitForLoadState('load', { timeout: 12000 }).catch(() => {}); await page.waitForTimeout(180); await page.evaluate(() => scrollTo(0, 0)); }

async function metrics(page) {
  return page.evaluate(() => {
    const visible = element => { const style = getComputedStyle(element); const box = element.getBoundingClientRect(); return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && box.width > 0 && box.height > 0; };
    const stable = element => {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const parts = [];
      for (let node = element; node && node !== document.body && parts.length < 5; node = node.parentElement) {
        let part = node.tagName.toLowerCase(); if (node.classList.length) part += `.${[...node.classList].slice(0, 3).map(value => CSS.escape(value)).join('.')}`;
        if (node.parentElement) { const peers = [...node.parentElement.children].filter(peer => peer.tagName === node.tagName); if (peers.length > 1) part += `:nth-of-type(${peers.indexOf(node) + 1})`; }
        parts.unshift(part);
      }
      return `body>${parts.join('>')}`;
    };
    const box = element => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom }; };
    const clipChain = element => { const rows = []; for (let node = element.parentElement; node && node !== document.documentElement; node = node.parentElement) { const style = getComputedStyle(node); if (style.overflowX !== 'visible' || style.overflowY !== 'visible') rows.push({ selector: stable(node), overflowX: style.overflowX, overflowY: style.overflowY }); } return rows; };
    const overflow = [...document.querySelectorAll('body *')].filter(element => {
      if (!visible(element) || element.tagName === 'SVG') return false;
      const r = element.getBoundingClientRect(); return r.left < -1 || r.right > document.documentElement.clientWidth + 1 || (element.clientWidth >= 30 && element.scrollWidth > element.clientWidth + 2);
    }).map(element => { const style = getComputedStyle(element); const clips = clipChain(element); const generated = Boolean(element.closest('[data-mm-style-chrome-generated]')); return { selector: stable(element), generated, rect: box(element), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, boxSizing: style.boxSizing, minWidth: style.minWidth, overflowX: style.overflowX, clipChain: clips, contained: !generated && document.documentElement.scrollWidth === document.documentElement.clientWidth && clips.length > 0 }; });
    const header = document.querySelector('[data-mm-style-mobile-header]'); const headerBox = header?.getBoundingClientRect(); const wordmark = header?.querySelector('.mm-style-mobile-wordmark'); const wordmarkBox = wordmark?.getBoundingClientRect();
    const targets = header ? [...header.querySelectorAll('button,a[href]')].filter(visible).map(element => ({ text: element.textContent.trim(), rect: box(element), boxSizing: getComputedStyle(element).boxSizing })) : [];
    return { clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, headerHeight: headerBox?.height || 0, headerVisible: Boolean(header && visible(header)), wordmark: wordmark?.textContent.trim() || '', wordmarkCentreDelta: wordmarkBox ? (wordmarkBox.left + wordmarkBox.width / 2) - document.documentElement.clientWidth / 2 : null, targets, overflow, generatedOverflow: overflow.filter(item => item.generated), uncontainedOverflow: overflow.filter(item => !item.generated && !item.contained), mainCount: document.querySelectorAll('main').length };
  });
}

async function skipProof(page) {
  await page.evaluate(() => { scrollTo(0, 0); document.activeElement?.blur(); }); await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => { const active = document.activeElement; const href = active?.getAttribute?.('href') || ''; const target = href.startsWith('#') ? document.querySelector(href) : null; const r = active?.getBoundingClientRect(); const style = active ? getComputedStyle(active) : null; const ancestors = []; for (let node = active?.parentElement; node && node !== document.documentElement; node = node.parentElement) { const ancestorStyle = getComputedStyle(node); if (ancestorStyle.transform !== 'none' || ancestorStyle.filter !== 'none' || ancestorStyle.perspective !== 'none') ancestors.push({ tag: node.tagName, className: String(node.className || ''), transform: ancestorStyle.transform, filter: ancestorStyle.filter, perspective: ancestorStyle.perspective, rectY: node.getBoundingClientRect().y }); } return { tag: active?.tagName || null, text: active?.textContent?.replace(/\s+/g, ' ').trim() || null, href, targetExists: Boolean(target), visible: Boolean(r && r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth && style?.visibility !== 'hidden' && style?.display !== 'none'), rect: r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null, scrollY, computed: style ? { position: style.position, top: style.top, transform: style.transform, translate: style.translate, marginTop: style.marginTop } : null, transformedAncestors: ancestors }; });
  await page.keyboard.press('Enter'); await page.waitForTimeout(120);
  const activated = await page.evaluate(href => { const target = href.startsWith('#') ? document.querySelector(href) : null; const r = target?.getBoundingClientRect(); return { targetRect: r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null, reached: Boolean(target && r && r.bottom > 0 && r.top < innerHeight), activeId: document.activeElement?.id || null }; }, focused.href);
  return { focused, activated, pass: focused.tag === 'A' && focused.targetExists && focused.visible && activated.reached };
}

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const rows = [];
for (const [route, url] of routes) {
  const baselineContext = await browser.newContext({ viewport: { width: 390, height: 844 } }); const baselinePage = await baselineContext.newPage(); await baselinePage.goto(`${origins.baseline}${url}`, { waitUntil: 'domcontentloaded' }); await settle(baselinePage); const baseline = await metrics(baselinePage); await baselineContext.close();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } }); const page = await context.newPage(); const errors = { console: [], page: [], request: [], response: [] }; page.on('console', m => { if (m.type() === 'error') errors.console.push(m.text()); }); page.on('pageerror', e => errors.page.push(e.message)); page.on('requestfailed', r => errors.request.push(r.url())); page.on('response', r => { if (r.status() >= 400) errors.response.push({ url: r.url(), status: r.status() }); });
  const response = await page.goto(`${origins.r2}${url}`, { waitUntil: 'domcontentloaded' }); await settle(page); const observed = await metrics(page); const skip = await skipProof(page);
  const screenshot = path.join(proofRoot, `${route}-390.png`); await page.screenshot({ path: screenshot, fullPage: false }); const proofNonblank = await nonblank(screenshot);
  const failures = [];
  if (response?.status() !== 200 || observed.clientWidth !== 390 || observed.scrollWidth !== 390) failures.push('root');
  if (!observed.headerVisible || observed.headerHeight !== 70 || Math.abs(observed.wordmarkCentreDelta) > 0.51 || observed.wordmark !== 'maple moon') failures.push('header-wordmark');
  if (observed.targets.some(item => item.rect.width < 44 || item.rect.height < 44)) failures.push('sub44-chrome');
  if (observed.generatedOverflow.length || observed.uncontainedOverflow.length) failures.push('overflow');
  if (observed.mainCount !== 1 || !skip.pass) failures.push('skip-main');
  if (errors.console.length || errors.page.length || errors.request.length || errors.response.length) failures.push('runtime');
  if (!proofNonblank) failures.push('blank');
  const row = { route, baseline, observed, skip, errors, screenshot, screenshotBytes: fs.statSync(screenshot).size, screenshotSha256: sha256(screenshot), proofNonblank, failures, result: failures.length ? 'FAIL' : 'PASS' }; rows.push(row);
  console.log(`${row.result} focused390=${route} root=${observed.scrollWidth - observed.clientWidth} header=${observed.headerHeight} targets=${observed.targets.map(item => `${item.text}:${Math.round(item.rect.width)}x${Math.round(item.rect.height)}`).join('|')} generated_overflow=${observed.generatedOverflow.length} uncontained=${observed.uncontainedOverflow.length} contained_baseline=${baseline.overflow.length} contained_r2=${observed.overflow.filter(item => item.contained).length} skip=${skip.pass} failures=${failures.join(',') || 'none'}`);
  await context.close();
}
await browser.close();
const positiveControls = { rootCaught: 391 !== 390, sub44Caught: 21 < 44, generatedCaught: [{ generated: true }].some(item => item.generated), uncontainedCaught: [{ contained: false, generated: false }].some(item => !item.generated && !item.contained), hiddenSkipCaught: !({ visible: false }).visible };
positiveControls.result = Object.values(positiveControls).every(Boolean) ? 'PASS' : 'FAIL';
const failures = rows.filter(row => row.result === 'FAIL');
fs.writeFileSync(path.join(evidenceRoot, 'focused-390-results.json'), `${JSON.stringify({ schema: 'maplemoon-style-chrome-r2-focused-390/v1', rows, positiveControls, failures: failures.map(row => ({ route: row.route, failures: row.failures })) }, null, 2)}\n`);
console.log(`FOCUSED_390 ${failures.length ? 'FAIL' : 'PASS'} routes=${rows.length - failures.length}/${rows.length} proofs=${rows.length} positive_controls=${positiveControls.result}`);
process.exitCode = failures.length || positiveControls.result !== 'PASS' ? 1 : 0;
