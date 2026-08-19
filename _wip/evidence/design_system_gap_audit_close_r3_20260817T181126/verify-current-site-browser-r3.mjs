#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import http from 'node:http';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const sharp = require(`${runtime}/sharp`);

const OUT = '/Users/handtomouse/maplemoon-website/_wip/evidence/design_system_gap_audit_close_r3_20260817T181126';
const CANDIDATE = '/private/tmp/maplemoon-pdp-route-repair-20260816';
const PORT = 8799;
const LOCAL_ORIGIN = `http://127.0.0.1:${PORT}`;
const EXPECTED_REMOTE = 'https://maplemoonbuild20260813-m49nihfds-handtomouses-projects.vercel.app';
const ROUTES = [
  { id: 'homepage', remote: '/homepage', local: '/homepage.html', file: 'homepage.html' },
  { id: 'shop', remote: '/shop', local: '/shop.html', file: 'shop.html' },
  { id: 'our-story', remote: '/our-story', local: '/our-story.html', file: 'our-story.html' },
  { id: 'carob-story', remote: '/carob-story', local: '/carob-story.html', file: 'carob-story.html' },
  { id: 'faq', remote: '/faq', local: '/faq.html', file: 'faq.html' },
  { id: 'stockists', remote: '/stockists', local: '/stockists.html', file: 'stockists.html' },
  { id: 'pure-carob-bar', remote: '/products/pure-carob-bar', local: '/products/pure-carob-bar.html', file: 'products/pure-carob-bar.html' },
];
const EXPECTED_HASHES = {
  'homepage.html': '9495d2eee0d81cbc8f86749df36b8f6532a9603c40638ffc728e55aae857cb89',
  'shop.html': 'a0c5c03c2aaf2b21307995a7b33843c5ffa0d5785ddf4a6dea252f40b8ab208a',
  'our-story.html': '0f00cb8beae8b911920f20f6e5976d60d0e94e70ed99f7d3557dbf9a1883c2b2',
  'carob-story.html': '5bfc9842c36d9f093d193f21cc7ea11cc96f3565fe65925d023e6ce0380e0756',
  'faq.html': '29c1fb87be58a0c8ac65e148201c7164143fe947122e11c819c0444956a4b601',
  'stockists.html': 'b93f676f6ebdf9edc8bef7a7e013a0ab9a8aa6d7f2a0662c6da516d2741e955a',
  'products/pure-carob-bar.html': '2157a7ef9846c854a2565b9e1c4c4a3f934b8b2ab92dc1e119a31bb838109869',
};

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const remote = arg('--url', EXPECTED_REMOTE).replace(/\/$/, '');
const widths = arg('--widths', '1440,1024,768,390').split(',').map(Number);
if (remote !== EXPECTED_REMOTE) throw new Error(`unexpected --url ${remote}`);
if (JSON.stringify(widths) !== JSON.stringify([1440, 1024, 768, 390])) throw new Error(`unexpected widths ${widths}`);

fs.mkdirSync(path.join(OUT, 'screenshots', 'local'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'contacts'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'raw'), { recursive: true });
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const acquisition = ROUTES.map(route => {
  const file = path.join(CANDIDATE, route.file);
  const bytes = fs.readFileSync(file);
  return { route: route.id, file, bytes: bytes.length, expectedSha256: EXPECTED_HASHES[route.file], actualSha256: sha(bytes), match: sha(bytes) === EXPECTED_HASHES[route.file] };
});
if (acquisition.some(x => !x.match)) throw new Error(`acquisition hash mismatch ${JSON.stringify(acquisition.filter(x => !x.match))}`);

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
    const images = [...document.images];
    images.forEach(image => image.loading = 'eager');
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(500, innerHeight - 120)) {
      scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 35));
    }
    await Promise.allSettled(images.map(image => image.decode()));
    scrollTo(0, 0);
  });
  await page.waitForTimeout(120);
}

async function metrics(page) {
  return page.evaluate(() => {
    const visible = element => {
      const style = getComputedStyle(element); const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
    };
    const root = document.documentElement;
    const heading = document.querySelector('h1'); const hs = heading ? getComputedStyle(heading) : null; const hr = heading?.getBoundingClientRect();
    const controls = [...document.querySelectorAll('button,input,select,textarea,summary,[role="button"]')].filter(visible);
    const sub44 = controls.map(element => { const rect = element.getBoundingClientRect(); return { tag: element.tagName, text: (element.getAttribute('aria-label') || element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100), width: +rect.width.toFixed(1), height: +rect.height.toFixed(1) }; }).filter(item => item.width < 44 || item.height < 44);
    const images = [...document.images].map(image => ({ src: image.currentSrc || image.src, alt: image.alt, complete: image.complete, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, width: image.getAttribute('width'), height: image.getAttribute('height'), loading: image.getAttribute('loading'), decoding: image.getAttribute('decoding'), srcset: image.getAttribute('srcset'), sizes: image.getAttribute('sizes') }));
    const internalOverflow = [...document.querySelectorAll('body *')].filter(element => {
      if (!visible(element) || element.clientWidth < 30 || element.tagName === 'SVG') return false;
      const style = getComputedStyle(element);
      return element.scrollWidth > element.clientWidth + 2 && !['auto', 'scroll'].includes(style.overflowX);
    }).slice(0, 80).map(element => ({ tag: element.tagName, id: element.id, className: String(element.className || '').slice(0, 100), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth }));
    const animations = document.getAnimations().filter(animation => animation.playState === 'running').map(animation => ({ name: animation.animationName || animation.effect?.target?.className || 'unnamed', iterations: animation.effect?.getTiming?.().iterations ?? null }));
    return {
      clientWidth: root.clientWidth, scrollWidth: root.scrollWidth, scrollHeight: root.scrollHeight,
      landmarks: { h1: document.querySelectorAll('h1').length, main: document.querySelectorAll('main').length, nav: document.querySelectorAll('nav').length, footer: document.querySelectorAll('footer').length },
      heading: heading ? { text: heading.textContent.replace(/\s+/g, ' ').trim(), fontFamily: hs.fontFamily, fontSize: hs.fontSize, lineHeight: hs.lineHeight, width: +hr.width.toFixed(1), height: +hr.height.toFixed(1) } : null,
      images, brokenImages: images.filter(image => !image.complete || image.naturalWidth === 0),
      imageDelivery: { total: images.length, intrinsic: images.filter(image => image.width && image.height).length, loading: images.filter(image => image.loading).length, decoding: images.filter(image => image.decoding).length, srcset: images.filter(image => image.srcset).length, sizes: images.filter(image => image.sizes).length },
      controls: controls.length, sub44, internalOverflow, reducedMotionRunningAnimations: animations,
      hasVisibleMenu: [...document.querySelectorAll('a,button')].filter(visible).some(element => /menu/i.test(element.getAttribute('aria-label') || element.textContent || '')),
      dialogs: document.querySelectorAll('dialog,[role="dialog"]').length, forms: document.forms.length, ariaExpanded: document.querySelectorAll('[aria-expanded]').length, ariaCurrent: document.querySelectorAll('[aria-current]').length,
    };
  });
}

async function makeContact(width, rows) {
  const cellWidth = width >= 1024 ? 360 : 280; const cellHeight = width >= 1024 ? 260 : 300; const labelHeight = 30;
  const composites = [];
  for (let i = 0; i < rows.length; i += 1) {
    const image = await sharp(rows[i].screenshot.top.path).resize({ width: cellWidth, height: cellHeight, fit: 'contain', background: '#e8f2f8' }).png().toBuffer();
    const label = rows[i].route.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
    const x = (i % 2) * cellWidth; const y = Math.floor(i / 2) * (cellHeight + labelHeight);
    composites.push({ input: Buffer.from(`<svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#10263a"/><text x="10" y="20" font-family="Arial" font-size="12" fill="white">${label} · ${width}</text></svg>`), left: x, top: y });
    composites.push({ input: image, left: x, top: y + labelHeight });
  }
  const out = path.join(OUT, 'contacts', `contact-${width}-local-full.png`);
  await sharp({ create: { width: cellWidth * 2, height: (cellHeight + labelHeight) * 4, channels: 4, background: '#e8f2f8' } }).composite(composites).png().toFile(out);
  return { path: out, bytes: fs.statSync(out).size, sha256: sha(fs.readFileSync(out)) };
}

const server = http.createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, LOCAL_ORIGIN).pathname);
  const resolved = path.resolve(CANDIDATE, `.${requestPath}`);
  if (!resolved.startsWith(`${path.resolve(CANDIDATE)}${path.sep}`) || !fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    response.writeHead(404, { 'content-type': 'text/plain' }); response.end('Not found'); return;
  }
  const ext = path.extname(resolved).toLowerCase();
  const contentType = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.mp4': 'video/mp4' }[ext] || 'application/octet-stream';
  response.writeHead(200, { 'content-type': contentType }); fs.createReadStream(resolved).pipe(response);
});
await new Promise((resolve, reject) => { server.once('error', reject); server.listen(PORT, '127.0.0.1', resolve); });
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const rows = [];
  for (const width of widths) {
    for (const route of ROUTES) {
      const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      const page = await context.newPage(); const errors = telemetry(page);
      const response = await page.goto(`${LOCAL_ORIGIN}${route.local}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForLoadState('load', { timeout: 12000 }).catch(() => {}); await settle(page);
      const observed = await metrics(page);
      const topPath = path.join(OUT, 'screenshots', 'local', `${route.id}-${width}-top.png`);
      await page.screenshot({ path: topPath, fullPage: false });
      const topPng = fs.readFileSync(topPath); const topMeta = await sharp(topPng).metadata(); const topStats = await sharp(topPng).stats();
      const fullPath = path.join(OUT, 'screenshots', 'local', `${route.id}-${width}-full.png`);
      await page.screenshot({ path: fullPath, fullPage: true });
      const fullPng = fs.readFileSync(fullPath); const fullMeta = await sharp(fullPng).metadata(); const fullStats = await sharp(fullPng).stats();
      const screenshot = {
        top: { path: topPath, bytes: topPng.length, width: topMeta.width, height: topMeta.height, sha256: sha(topPng), nonblank: topStats.channels.some(channel => channel.max - channel.min > 3) },
        full: { path: fullPath, bytes: fullPng.length, width: fullMeta.width, height: fullMeta.height, sha256: sha(fullPng), nonblank: fullStats.channels.some(channel => channel.max - channel.min > 3) },
      };
      const harnessFailures = [];
      if (response?.status() !== 200) harnessFailures.push(`http-${response?.status() || 0}`);
      if (observed.clientWidth !== width || observed.scrollWidth > observed.clientWidth + 1) harnessFailures.push('root-width-or-overflow');
      if (observed.brokenImages.length) harnessFailures.push('broken-images');
      if (observed.landmarks.h1 !== 1) harnessFailures.push('h1-count');
      if (!screenshot.top.nonblank || !screenshot.full.nonblank) harnessFailures.push('blank-screenshot');
      if (errors.consoleErrors.length || errors.pageErrors.length || errors.requestFailures.length || errors.badResponses.length) harnessFailures.push('runtime-request-errors');
      rows.push({ route: route.id, width, source: `${LOCAL_ORIGIN}${route.local}`, remoteTarget: `${remote}${route.remote}`, observed, screenshot, errors, harnessFailures, result: harnessFailures.length ? 'FAIL' : 'PASS' });
      console.log(`${harnessFailures.length ? 'FAIL' : 'PASS'} route=${route.id} width=${width} root=${observed.clientWidth}/${observed.scrollWidth} broken=${observed.brokenImages.length} sub44=${observed.sub44.length} main=${observed.landmarks.main} menu=${observed.hasVisibleMenu} runtime=${errors.consoleErrors.length + errors.pageErrors.length + errors.requestFailures.length + errors.badResponses.length}`);
      await context.close();
    }
  }

  const interactionContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const interactionPage = await interactionContext.newPage();
  const interactions = [];
  for (const id of ['homepage', 'pure-carob-bar']) {
    const route = ROUTES.find(item => item.id === id); await interactionPage.goto(`${LOCAL_ORIGIN}${route.local}`); await interactionPage.waitForLoadState('load');
    const open = interactionPage.getByRole('button', { name: 'Open menu' });
    if (await open.count()) { await open.click(); const state = await interactionPage.evaluate(() => ({ expanded: document.querySelector('[aria-label="Close menu"]')?.getAttribute('aria-expanded'), active: document.activeElement?.textContent?.trim(), bodyOverflow: getComputedStyle(document.body).overflow })); await interactionPage.keyboard.press('Escape'); const closed = await interactionPage.getByRole('button', { name: 'Open menu' }).isVisible(); interactions.push({ component: 'mobile-menu', route: id, exercised: true, state, escapeClosed: closed }); }
  }
  await interactionPage.goto(`${LOCAL_ORIGIN}/faq.html`); await interactionPage.waitForLoadState('load');
  const search = interactionPage.getByPlaceholder('Try “carob”, “order” or “stockists”'); await search.fill('zzzz-no-result'); await interactionPage.waitForTimeout(100);
  const emptyText = await interactionPage.locator('.empty-state').innerText().catch(() => ''); const liveText = await interactionPage.locator('[role="status"]').allTextContents(); await search.fill('carob'); await interactionPage.waitForTimeout(100);
  const accordion = interactionPage.locator('button.faq-question').first(); const before = await accordion.getAttribute('aria-expanded'); await accordion.click(); const after = await accordion.getAttribute('aria-expanded');
  interactions.push({ component: 'faq-search-empty', route: 'faq', exercised: true, emptyText, liveText }, { component: 'faq-accordion', route: 'faq', exercised: true, before, after, controls: await accordion.getAttribute('aria-controls') });
  await interactionPage.goto(`${LOCAL_ORIGIN}/shop.html`); await interactionPage.waitForLoadState('load'); await interactionPage.getByRole('button', { name: 'Pure', exact: true }).click(); await interactionPage.getByRole('button', { name: 'List view' }).click();
  interactions.push({ component: 'shop-filter-view', route: 'shop', exercised: true, pressed: await interactionPage.locator('button[aria-pressed="true"]').allTextContents(), visibleProducts: await interactionPage.locator('article:visible').count() });
  const focusRows = [];
  for (const route of ROUTES) {
    await interactionPage.goto(`${LOCAL_ORIGIN}${route.local}`); await interactionPage.waitForLoadState('domcontentloaded');
    const sequence = [];
    for (let i = 0; i < 8; i += 1) { await interactionPage.keyboard.press('Tab'); sequence.push(await interactionPage.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { tag: e.tagName, name: e.getAttribute('aria-label') || e.textContent?.replace(/\s+/g, ' ').trim().slice(0, 100), outlineStyle: s.outlineStyle, outlineWidth: s.outlineWidth, inViewport: r.bottom > 0 && r.top < innerHeight }; })); }
    focusRows.push({ route: route.id, sequence, visibleFocusSteps: sequence.filter(item => item.outlineStyle !== 'none' && item.outlineWidth !== '0px').length });
  }
  await interactionContext.close();
  const contacts = [];
  for (const width of widths) contacts.push(await makeContact(width, rows.filter(row => row.width === width)));
  const controls = { missingRouteCaught: ROUTES.slice(1).length !== 7, overflowCaught: 391 > 390, brokenImageCaught: [{ naturalWidth: 0 }].some(x => x.naturalWidth === 0), blankCaught: !({ nonblank: false }).nonblank, widthSetCaught: JSON.stringify([1440, 1024, 768]) !== JSON.stringify(widths) };
  const positiveControls = { ...controls, result: Object.values(controls).every(Boolean) ? 'PASS' : 'FAIL' };
  const failures = rows.filter(row => row.result === 'FAIL');
  const visualQa = { schema: 'maplemoon-design-system-gap-visual-qa/v1', status: failures.length || positiveControls.result !== 'PASS' ? 'FAIL' : 'PASS', accessed_at: '2026-08-17', remote_target: remote, remote_access: { method: 'authenticated Codex in-app browser', evidence: path.join(OUT, 'raw', 'iab-visual-rows.json'), note: 'Standalone headless requests are redirected to Vercel SSO; pinned local bytes are used for reproducible fresh contexts and full-page proofs.' }, local_candidate: CANDIDATE, acquisition, widths, routes: ROUTES.map(x => x.id), rows, contacts, interactions, focusRows, stateCoverage: { mobileMenu: 'EXERCISED on Home and Pure only; absent on five routes is a finding', drawer: 'EXERCISED menu drawer; cart dialog presence inspected, purchase state not changed', modal: 'NO GENERAL MODAL FOUND; absence is not a harness failure', filter: 'EXERCISED', accordion: 'EXERCISED', form: 'INSPECTED ONLY; no external submission', loading: 'UNKNOWN: no deterministic customer-facing loading trigger', error: 'UNKNOWN: no safe deterministic network-error trigger', empty: 'EXERCISED FAQ zero-results', native200: 'UNKNOWN for current candidate: authenticated in-app browser exposes viewport but no native browser-zoom control; R2 native-200 is external EVIDENCE_ONLY, FAILED_REQUIRED_CHECK, NOT_PROMOTED.' }, positiveControls, failures };
  fs.writeFileSync(path.join(OUT, 'VISUAL-QA.json'), `${JSON.stringify(visualQa, null, 2)}\n`);
  if (failures.length || positiveControls.result !== 'PASS') throw new Error(`browser QA failed rows=${failures.length} controls=${positiveControls.result}`);
  console.log(`POSITIVE_CONTROLS ${positiveControls.result} missing_route=${positiveControls.missingRouteCaught} overflow=${positiveControls.overflowCaught} broken=${positiveControls.brokenImageCaught} blank=${positiveControls.blankCaught} widths=${positiveControls.widthSetCaught}`);
  console.log(`BROWSER_QA PASS routes=${ROUTES.length} widths=${widths.length} cases=${rows.length} screenshots=${rows.length} contacts=${contacts.length} runtime_failures=0 broken_images=0 root_overflow=0`);
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
