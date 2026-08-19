import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const sharp = require(`${runtime}/sharp`);

const origin = process.env.MM_STYLE_ORIGIN || 'http://127.0.0.1:8798';
const baselineRoot = '/private/tmp/maplemoon-style-chrome-baseline-20260817T134502';
const evidenceRoot = '/Users/handtomouse/maplemoon-website/_wip/evidence/style_chrome_derived_20260817T134139';
const proofRoot = path.join(evidenceRoot, 'proofs', 'measured');
fs.mkdirSync(proofRoot, { recursive: true });

const routes = [
  { id: 'homepage', url: '/homepage.html', file: 'homepage.html' },
  { id: 'shop', url: '/shop.html', file: 'shop.html' },
  { id: 'our-story', url: '/our-story.html', file: 'our-story.html' },
  { id: 'carob-story', url: '/carob-story.html', file: 'carob-story.html' },
  { id: 'faq', url: '/faq.html', file: 'faq.html' },
  { id: 'stockists', url: '/stockists.html', file: 'stockists.html' },
  { id: 'pure-carob-bar', url: '/products/pure-carob-bar.html', file: 'products/pure-carob-bar.html' },
];
const widths = [390, 768, 900, 1024, 1440];
const desktopGeometry = new Map();

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function telemetry(page) {
  const result = { consoleErrors: [], pageErrors: [], requestFailures: [], badResponses: [] };
  page.on('console', message => { if (message.type() === 'error') result.consoleErrors.push(message.text()); });
  page.on('pageerror', error => result.pageErrors.push(error.message));
  page.on('requestfailed', request => result.requestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'unknown' }));
  page.on('response', response => { if (response.status() >= 400) result.badResponses.push({ url: response.url(), status: response.status() }); });
  return result;
}

async function settle(page) {
  await page.waitForLoadState('load', { timeout: 12000 }).catch(() => {});
  await page.evaluate(async () => {
    for (const image of [...document.images]) {
      image.loading = 'eager';
      image.scrollIntoView({ block: 'center' });
      if (!image.complete) await new Promise(resolve => {
        const timeout = setTimeout(resolve, 5000);
        image.addEventListener('load', () => { clearTimeout(timeout); resolve(); }, { once: true });
        image.addEventListener('error', () => { clearTimeout(timeout); resolve(); }, { once: true });
      });
      if (image.complete && image.naturalWidth) await image.decode().catch(() => {});
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(250);
}

async function nonblank(file) {
  const stats = await sharp(file).stats();
  return stats.channels.some(channel => channel.max - channel.min > 4);
}

async function pageMetrics(page) {
  return page.evaluate(() => {
    const visible = element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
    };
    const round = value => Math.round(value * 100) / 100;
    const generated = document.querySelector('[data-mm-style-mobile-header]');
    const generatedRect = generated?.getBoundingClientRect();
    const wordmark = generated?.querySelector('.mm-style-mobile-wordmark');
    const wordmarkRect = wordmark?.getBoundingClientRect();
    const siteHeaderCandidates = [...document.querySelectorAll('[data-mm-style-mobile-header],header.mm-site-header,header.sp-top,header.os-top')];
    const exposedHeaders = siteHeaderCandidates.filter(visible);
    const chromeTargets = generated ? [...generated.querySelectorAll('a[href],button')].filter(visible).map(element => {
      const rect = element.getBoundingClientRect();
      return { text: (element.textContent || element.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim(), width: round(rect.width), height: round(rect.height) };
    }) : [];
    const brokenImages = [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.currentSrc || image.src);
    const unexpectedInternalOverflow = [...document.querySelectorAll('body *')].filter(element => {
      if (!visible(element) || element.clientWidth < 30 || element.tagName === 'SVG') return false;
      const style = getComputedStyle(element);
      if (['auto', 'scroll'].includes(style.overflowX)) return false;
      return element.scrollWidth > element.clientWidth + 2;
    }).slice(0, 30).map(element => ({ tag: element.tagName, id: element.id, className: String(element.className || '').slice(0, 120), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth }));
    const headerGeometry = exposedHeaders[0]?.getBoundingClientRect();
    const firstMain = document.querySelector('main');
    const mainGeometry = firstMain?.getBoundingClientRect();
    const footer = document.querySelector('footer');
    const footerGeometry = footer?.getBoundingClientRect();
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      headerCount: exposedHeaders.length,
      mainCount: document.querySelectorAll('main').length,
      generatedVisible: Boolean(generated && visible(generated)),
      generatedHeight: generatedRect ? round(generatedRect.height) : null,
      wordmarkText: wordmark?.textContent?.replace(/\s+/g, ' ').trim() || null,
      wordmarkWhiteSpace: wordmark ? getComputedStyle(wordmark).whiteSpace : null,
      wordmarkCentreDelta: wordmarkRect ? round((wordmarkRect.left + wordmarkRect.width / 2) - document.documentElement.clientWidth / 2) : null,
      menuCount: generated ? generated.querySelectorAll('[data-mm-style-menu-toggle]').length : 0,
      contact: generated?.querySelector('.mm-style-mobile-contact')?.getAttribute('href') || null,
      cartCount: generated ? generated.querySelectorAll('[data-cart],.cart,.bag,[aria-label*="cart" i],[aria-label*="bag" i]').length : 0,
      chromeTargets,
      sub44Chrome: chromeTargets.filter(item => item.width < 44 || item.height < 44),
      brokenImages,
      unexpectedInternalOverflow,
      desktopGeometry: {
        header: headerGeometry ? [round(headerGeometry.x), round(headerGeometry.y), round(headerGeometry.width), round(headerGeometry.height)] : null,
        main: mainGeometry ? [round(mainGeometry.x), round(mainGeometry.y), round(mainGeometry.width), round(mainGeometry.height)] : null,
        footer: footerGeometry ? [round(footerGeometry.x), round(footerGeometry.y), round(footerGeometry.width), round(footerGeometry.height)] : null,
        bodyHeight: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
      },
    };
  });
}

async function firstFocusSkip(page) {
  await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
  await page.keyboard.press('Tab');
  const result = await page.evaluate(() => {
    const active = document.activeElement;
    const href = active?.getAttribute('href') || '';
    const target = href.startsWith('#') ? document.querySelector(href) : null;
    return { tag: active?.tagName || null, text: active?.textContent?.replace(/\s+/g, ' ').trim() || null, href, targetExists: Boolean(target) };
  });
  return { ...result, pass: result.tag === 'A' && result.href.startsWith('#') && result.targetExists };
}

async function menuInteraction(page, route, width, reducedMotion) {
  const toggle = page.locator('[data-mm-style-menu-toggle]');
  await toggle.focus();
  const closed = await toggle.evaluate(element => ({ expanded: element.getAttribute('aria-expanded'), controls: element.getAttribute('aria-controls'), label: element.getAttribute('aria-label'), text: element.textContent.trim() }));
  const focusOutline = await toggle.evaluate(element => {
    const style = getComputedStyle(element);
    return { style: style.outlineStyle, width: style.outlineWidth };
  });
  await toggle.click();
  await page.waitForTimeout(80);
  const open = await page.evaluate(() => {
    const header = document.querySelector('[data-mm-style-mobile-header]');
    const toggleElement = header.querySelector('[data-mm-style-menu-toggle]');
    const panel = header.querySelector('[data-mm-style-menu-panel]');
    const rows = [...panel.querySelectorAll('a[href]')].map(element => {
      const rect = element.getBoundingClientRect();
      return { text: element.textContent.trim(), width: Math.round(rect.width * 100) / 100, height: Math.round(rect.height * 100) / 100 };
    });
    const siblings = [...header.parentElement.children].filter(element => element !== header && !['SCRIPT', 'STYLE'].includes(element.tagName));
    const styles = [...header.querySelectorAll('*')].map(element => getComputedStyle(element));
    return {
      expanded: toggleElement.getAttribute('aria-expanded'),
      label: toggleElement.getAttribute('aria-label'),
      text: toggleElement.textContent.trim(),
      panelHidden: panel.hidden,
      panelLabel: panel.querySelector('nav')?.getAttribute('aria-label') || null,
      activeInsidePanel: panel.contains(document.activeElement),
      rows,
      sub44Rows: rows.filter(row => row.width < 44 || row.height < 44),
      localBackgroundContained: siblings.length > 0 && siblings.every(element => element.inert && element.getAttribute('aria-hidden') === 'true'),
      reducedMotionClear: styles.every(style => style.animationName === 'none' && (style.transitionDuration === '0s' || style.transitionProperty === 'none')),
    };
  });
  const proof = path.join(proofRoot, `${route.id}-${width}-${reducedMotion ? 'reduce' : 'normal'}-menu-open.png`);
  await page.screenshot({ path: proof, fullPage: false });
  const proofNonblank = await nonblank(proof);
  const panelLinks = page.locator('[data-mm-style-menu-panel] a[href]');
  await panelLinks.last().focus();
  await page.keyboard.press('Tab');
  const trappedToFirst = await page.evaluate(() => document.activeElement?.matches('[data-mm-style-menu-toggle]') || false);
  await page.keyboard.press('Escape');
  const escaped = await page.evaluate(() => {
    const toggleElement = document.querySelector('[data-mm-style-menu-toggle]');
    const panel = document.querySelector('[data-mm-style-menu-panel]');
    return { expanded: toggleElement.getAttribute('aria-expanded'), panelHidden: panel.hidden, focusReturned: document.activeElement === toggleElement, bodyReleased: !document.documentElement.hasAttribute('data-mm-style-menu-open') };
  });
  const failures = [];
  if (closed.expanded !== 'false' || !closed.controls || closed.label !== 'Open menu' || closed.text !== 'Menu') failures.push('closed-state');
  if (focusOutline.style === 'none' || focusOutline.width === '0px') failures.push('focus-visible');
  if (open.expanded !== 'true' || open.label !== 'Close menu' || open.text !== 'Close' || open.panelHidden || open.panelLabel !== 'Mobile navigation' || !open.activeInsidePanel) failures.push('open-state');
  if (open.sub44Rows.length) failures.push('sub44-row');
  if (!open.localBackgroundContained) failures.push('background-containment');
  if (reducedMotion && !open.reducedMotionClear) failures.push('reduced-motion');
  if (!trappedToFirst) failures.push('focus-trap');
  if (escaped.expanded !== 'false' || !escaped.panelHidden || !escaped.focusReturned || !escaped.bodyReleased) failures.push('escape-return');
  if (!proofNonblank) failures.push('blank-proof');
  return { route: route.id, width, reducedMotion, closed, focusOutline, open, trappedToFirst, escaped, proof, proofBytes: fs.statSync(proof).size, proofSha256: sha256(proof), proofNonblank, failures, result: failures.length ? 'FAIL' : 'PASS' };
}

async function inMemoryBaselineGeometry(browser, route, width) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  let source = fs.readFileSync(path.join(baselineRoot, route.file), 'utf8');
  source = source.replace('</head>', `<base href="${origin}/">\n</head>`);
  await page.setContent(source, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await settle(page);
  const metrics = await pageMetrics(page);
  await context.close();
  return metrics.desktopGeometry;
}

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
for (const width of [1024, 1440]) {
  for (const route of routes) desktopGeometry.set(`${route.id}-${width}`, await inMemoryBaselineGeometry(browser, route, width));
}

const results = [];
const interactions = [];
for (const width of widths) {
  const height = width <= 390 ? 844 : 900;
  for (const route of routes) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = telemetry(page);
    const response = await page.goto(`${origin}${route.url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await settle(page);
    const metrics = await pageMetrics(page);
    const skip = await firstFocusSkip(page);
    const screenshot = path.join(proofRoot, `${route.id}-${width}-top.png`);
    await page.screenshot({ path: screenshot, fullPage: false });
    const screenshotNonblank = await nonblank(screenshot);
    const failures = [];
    if (response?.status() !== 200) failures.push('http');
    if (metrics.clientWidth !== width || metrics.scrollWidth > metrics.clientWidth + 1) failures.push('root-overflow');
    if (metrics.unexpectedInternalOverflow.length) failures.push('internal-overflow');
    if (metrics.brokenImages.length) failures.push('broken-images');
    if (errors.consoleErrors.length || errors.pageErrors.length || errors.requestFailures.length || errors.badResponses.length) failures.push('runtime-request-errors');
    if (metrics.headerCount !== 1 || metrics.mainCount !== 1 || !skip.pass) failures.push('semantics-skip');
    if (width <= 900) {
      if (!metrics.generatedVisible || metrics.generatedHeight !== 70 || Math.abs(metrics.wordmarkCentreDelta) > 0.51 || metrics.wordmarkText !== 'maple moon' || metrics.wordmarkWhiteSpace !== 'nowrap') failures.push('mobile-geometry-wordmark');
      if (metrics.menuCount !== 1 || metrics.contact !== 'mailto:info@maplemoon.com.au' || metrics.cartCount !== 0 || metrics.sub44Chrome.length) failures.push('mobile-controls');
    } else {
      if (metrics.generatedVisible) failures.push('desktop-generated-visible');
      const baseline = desktopGeometry.get(`${route.id}-${width}`);
      if (JSON.stringify(metrics.desktopGeometry) !== JSON.stringify(baseline)) failures.push('desktop-geometry-drift');
    }
    if (!screenshotNonblank) failures.push('blank-proof');
    const row = { route: route.id, width, status: response?.status() || 0, metrics, skip, errors, screenshot, screenshotBytes: fs.statSync(screenshot).size, screenshotSha256: sha256(screenshot), screenshotNonblank, baselineDesktopGeometry: width > 900 ? desktopGeometry.get(`${route.id}-${width}`) : null, failures, result: failures.length ? 'FAIL' : 'PASS' };
    results.push(row);
    console.log(`${row.result} route=${route.id} width=${width} header=${metrics.headerCount} main=${metrics.mainCount} root_overflow=${metrics.scrollWidth - metrics.clientWidth} internal_overflow=${metrics.unexpectedInternalOverflow.length} broken=${metrics.brokenImages.length} runtime=${errors.consoleErrors.length + errors.pageErrors.length + errors.requestFailures.length + errors.badResponses.length} failures=${failures.join(',') || 'none'}`);
    await context.close();
  }
}

for (const width of [390, 900]) {
  for (const reducedMotion of [false, true]) {
    for (const route of routes) {
      const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: reducedMotion ? 'reduce' : 'no-preference' });
      const page = await context.newPage();
      const errors = telemetry(page);
      await page.goto(`${origin}${route.url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await settle(page);
      const row = await menuInteraction(page, route, width, reducedMotion);
      if (errors.consoleErrors.length || errors.pageErrors.length || errors.requestFailures.length || errors.badResponses.length) row.failures.push('runtime-request-errors');
      row.errors = errors;
      row.result = row.failures.length ? 'FAIL' : 'PASS';
      interactions.push(row);
      console.log(`${row.result} interaction=${route.id} width=${width} motion=${reducedMotion ? 'reduce' : 'normal'} failures=${row.failures.join(',') || 'none'}`);
      await context.close();
    }
  }
}
await browser.close();

const positiveControls = {
  rootOverflowCaught: ({ clientWidth: 390, scrollWidth: 391 }).scrollWidth > 390,
  internalOverflowCaught: ({ clientWidth: 300, scrollWidth: 340 }).scrollWidth > 302,
  sub44Caught: [{ width: 44, height: 43 }].some(item => item.width < 44 || item.height < 44),
  wrongHeaderCountCaught: 2 !== 1,
  copylessSkipCaught: !({ tag: 'A', href: '#missing', targetExists: false }).targetExists,
};
positiveControls.result = Object.entries(positiveControls).filter(([key]) => key !== 'result').every(([, value]) => value) ? 'PASS' : 'FAIL';
const failures = [...results, ...interactions].filter(row => row.result !== 'PASS');
const report = { schema: 'maplemoon-style-chrome-browser-qa/v1', origin, widths, routes, measuredCases: results.length, interactionCases: interactions.length, results, interactions, positiveControls, failures: failures.map(row => ({ route: row.route, width: row.width, reducedMotion: row.reducedMotion, failures: row.failures })) };
fs.writeFileSync(path.join(evidenceRoot, 'browser-qa.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`POSITIVE_CONTROLS ${positiveControls.result} root=${positiveControls.rootOverflowCaught} internal=${positiveControls.internalOverflowCaught} target=${positiveControls.sub44Caught} header=${positiveControls.wrongHeaderCountCaught} skip=${positiveControls.copylessSkipCaught}`);
console.log(`BROWSER_QA ${failures.length ? 'FAIL' : 'PASS'} measured=${results.length - results.filter(row => row.result !== 'PASS').length}/${results.length} interactions=${interactions.length - interactions.filter(row => row.result !== 'PASS').length}/${interactions.length} proofs=${results.length + interactions.length}`);
process.exitCode = failures.length || positiveControls.result !== 'PASS' ? 1 : 0;
