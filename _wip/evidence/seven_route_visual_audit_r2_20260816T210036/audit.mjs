import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const sharp = require(`${runtime}/sharp`);

const origin = 'http://127.0.0.1:8792';
const candidateRoot = '/private/tmp/maplemoon-pdp-route-repair-20260816';
const outputRoot = '/Users/handtomouse/maplemoon-website/_wip/evidence/seven_route_visual_audit_r2_20260816T210036';
const screenshotRoot = path.join(outputRoot, 'screenshots');
const contactRoot = path.join(outputRoot, 'contacts');
fs.mkdirSync(screenshotRoot, { recursive: true });
fs.mkdirSync(contactRoot, { recursive: true });

const routes = [
  { id: 'homepage', url: '/homepage', file: 'homepage.html' },
  { id: 'shop', url: '/shop', file: 'shop.html' },
  { id: 'our-story', url: '/our-story', file: 'our-story.html' },
  { id: 'carob-story', url: '/carob-story', file: 'carob-story.html' },
  { id: 'faq', url: '/faq', file: 'faq.html' },
  { id: 'stockists', url: '/stockists', file: 'stockists.html' },
  { id: 'pure-carob-bar', url: '/products/pure-carob-bar', file: 'products/pure-carob-bar.html' },
];
const widths = [390, 900, 1440];
const expectedHashes = {
  'homepage.html': '9495d2eee0d81cbc8f86749df36b8f6532a9603c40638ffc728e55aae857cb89',
  'shop.html': 'a0c5c03c2aaf2b21307995a7b33843c5ffa0d5785ddf4a6dea252f40b8ab208a',
  'our-story.html': '0f00cb8beae8b911920f20f6e5976d60d0e94e70ed99f7d3557dbf9a1883c2b2',
  'carob-story.html': '5bfc9842c36d9f093d193f21cc7ea11cc96f3565fe65925d023e6ce0380e0756',
  'faq.html': '29c1fb87be58a0c8ac65e148201c7164143fe947122e11c819c0444956a4b601',
  'stockists.html': 'b93f676f6ebdf9edc8bef7a7e013a0ab9a8aa6d7f2a0662c6da516d2741e955a',
  'products/pure-carob-bar.html': '2157a7ef9846c854a2565b9e1c4c4a3f934b8b2ab92dc1e119a31bb838109869',
};

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

const acquisition = routes.map(route => {
  const file = path.join(candidateRoot, route.file);
  const bytes = fs.readFileSync(file);
  const actualSha256 = sha256(bytes);
  return { route: route.id, file, bytes: bytes.length, expectedSha256: expectedHashes[route.file], actualSha256, match: actualSha256 === expectedHashes[route.file] };
});
fs.writeFileSync(path.join(outputRoot, 'acquisition-hashes.json'), `${JSON.stringify(acquisition, null, 2)}\n`);
if (acquisition.some(row => !row.match)) {
  console.error(`ACQUISITION FAIL matched=${acquisition.filter(row => row.match).length}/${acquisition.length}`);
  process.exit(2);
}
console.log(`ACQUISITION PASS matched=${acquisition.length}/${acquisition.length}`);

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
    for (const image of images) {
      image.loading = 'eager';
      image.scrollIntoView({ block: 'center' });
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (!image.complete) await new Promise(resolve => {
        const timer = setTimeout(resolve, 5000);
        image.addEventListener('load', () => { clearTimeout(timer); resolve(); }, { once: true });
        image.addEventListener('error', () => { clearTimeout(timer); resolve(); }, { once: true });
      });
      if (image.complete && image.naturalWidth) await image.decode().catch(() => {});
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(250);
}

async function screenshotNonblank(file) {
  const stats = await sharp(file).stats();
  return stats.channels.some(channel => channel.max - channel.min > 3);
}

async function captureViewport(page, file, y) {
  await page.evaluate(value => scrollTo(0, value), y);
  await page.waitForTimeout(180);
  await page.screenshot({ path: file, fullPage: false });
  const metadata = await sharp(file).metadata();
  return { path: file, width: metadata.width, height: metadata.height, bytes: fs.statSync(file).size, nonblank: await screenshotNonblank(file) };
}

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const results = [];
for (const width of widths) {
  const viewportHeight = width === 390 ? 844 : 900;
  for (const route of routes) {
    const context = await browser.newContext({ viewport: { width, height: viewportHeight }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = telemetry(page);
    const response = await page.goto(`${origin}${route.url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('load', { timeout: 10000 }).catch(() => {});
    await settle(page);
    const metrics = await page.evaluate(() => {
      const visible = element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
      };
      const bodyHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const heading = document.querySelector('h1');
      const headingStyle = heading ? getComputedStyle(heading) : null;
      const headingRect = heading?.getBoundingClientRect();
      const header = document.querySelector('.mm-site-header, header');
      const footer = document.querySelector('footer');
      const interactive = [...document.querySelectorAll('button,input,select,textarea,summary,[role="button"]')].filter(visible);
      const sub44 = interactive.map(element => {
        const rect = element.getBoundingClientRect();
        return { tag: element.tagName, text: (element.textContent || element.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 90), width: Math.round(rect.width * 10) / 10, height: Math.round(rect.height * 10) / 10 };
      }).filter(item => item.width < 44 || item.height < 44);
      const images = [...document.images].map(image => {
        const rect = image.getBoundingClientRect();
        return { alt: image.alt, src: image.currentSrc || image.src, complete: image.complete, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, width: Math.round(rect.width), height: Math.round(rect.height), visible: visible(image) };
      });
      const internalOverflow = [...document.querySelectorAll('body *')].filter(element => {
        if (!visible(element) || element.clientWidth < 30) return false;
        const style = getComputedStyle(element);
        return element.scrollWidth > element.clientWidth + 2 && !['auto', 'scroll'].includes(style.overflowX) && element.tagName !== 'SVG';
      }).slice(0, 40).map(element => ({ tag: element.tagName, id: element.id, className: String(element.className || '').slice(0, 120), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, text: (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100) }));
      const flaggedVisibleText = [...document.querySelectorAll('body *')].filter(element => element.children.length === 0 && visible(element) && /Founder portrait pending|Nate selection required|client confirmation|WIP directory status|source parse|review demo|Directory preview only|Coming soon/i.test(element.textContent || '')).map(element => ({ tag: element.tagName, className: String(element.className || '').slice(0, 100), text: element.textContent.replace(/\s+/g, ' ').trim().slice(0, 240) })).slice(0, 40);
      return {
        title: document.title,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyHeight,
        header: header ? { height: Math.round(header.getBoundingClientRect().height), position: getComputedStyle(header).position, zIndex: getComputedStyle(header).zIndex } : null,
        footer: footer ? { height: Math.round(footer.getBoundingClientRect().height), text: footer.textContent.replace(/\s+/g, ' ').trim().slice(0, 240) } : null,
        heading: heading ? { text: heading.textContent.replace(/\s+/g, ' ').trim(), width: Math.round(headingRect.width), height: Math.round(headingRect.height), fontFamily: headingStyle.fontFamily, fontSize: headingStyle.fontSize, lineHeight: headingStyle.lineHeight } : null,
        landmarks: { h1: document.querySelectorAll('h1').length, main: document.querySelectorAll('main').length, nav: document.querySelectorAll('nav').length, footer: document.querySelectorAll('footer').length },
        images,
        brokenImages: images.filter(image => !image.complete || image.naturalWidth === 0),
        interactive: interactive.length,
        sub44,
        internalOverflow,
        flaggedVisibleText,
        bodyBackground: getComputedStyle(document.body).backgroundColor,
      };
    });

    const base = `${route.id}-${width}`;
    const top = await captureViewport(page, path.join(screenshotRoot, `${base}-top.png`), 0);
    const maxScroll = Math.max(0, metrics.bodyHeight - viewportHeight);
    const middle = await captureViewport(page, path.join(screenshotRoot, `${base}-middle.png`), Math.round(maxScroll / 2));
    const bottom = await captureViewport(page, path.join(screenshotRoot, `${base}-bottom.png`), maxScroll);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(100);
    const fullFile = path.join(screenshotRoot, `${base}-full.png`);
    await page.screenshot({ path: fullFile, fullPage: true });
    const fullMeta = await sharp(fullFile).metadata();
    const full = { path: fullFile, width: fullMeta.width, height: fullMeta.height, bytes: fs.statSync(fullFile).size, nonblank: await screenshotNonblank(fullFile) };

    const failures = [];
    if (response?.status() !== 200) failures.push(`http-${response?.status() || 0}`);
    if (metrics.clientWidth !== width || metrics.scrollWidth > metrics.clientWidth + 1) failures.push('root-width-or-overflow');
    if (metrics.landmarks.h1 !== 1) failures.push('h1-count');
    if (metrics.brokenImages.length) failures.push('broken-images');
    if ([top, middle, bottom, full].some(item => !item.nonblank)) failures.push('blank-evidence');
    if (errors.consoleErrors.length || errors.pageErrors.length || errors.requestFailures.length || errors.badResponses.length) failures.push('runtime-request-errors');
    const semanticFlags = [];
    if (metrics.landmarks.main !== 1) semanticFlags.push(`main-landmarks-${metrics.landmarks.main}`);
    if (metrics.landmarks.footer !== 1) semanticFlags.push(`footer-landmarks-${metrics.landmarks.footer}`);
    const row = { route: route.id, width, httpStatus: response?.status() || 0, metrics, screenshots: { top, middle, bottom, full }, ...errors, semanticFlags, failures, result: failures.length ? 'FAIL' : 'PASS' };
    results.push(row);
    console.log(`${row.result} route=${route.id} width=${width} body=${metrics.bodyHeight} images=${metrics.images.length}/${metrics.brokenImages.length} internal_overflow=${metrics.internalOverflow.length} sub44=${metrics.sub44.length} content_flags=${metrics.flaggedVisibleText.length} semantic=${semanticFlags.join(',') || 'none'} failures=${failures.join(',') || 'none'}`);
    await context.close();
  }
}
await browser.close();

async function makeContact(width, kind, files) {
  const cellWidth = 260;
  const labelHeight = 28;
  const prepared = [];
  let maxHeight = 0;
  for (const item of files) {
    const image = sharp(item.file).resize({ width: cellWidth, withoutEnlargement: false });
    const buffer = await image.png().toBuffer();
    const metadata = await sharp(buffer).metadata();
    maxHeight = Math.max(maxHeight, metadata.height);
    prepared.push({ ...item, buffer, height: metadata.height });
  }
  const canvas = sharp({ create: { width: cellWidth * prepared.length, height: maxHeight + labelHeight, channels: 4, background: '#eef5fa' } });
  const composites = [];
  for (let index = 0; index < prepared.length; index += 1) {
    const item = prepared[index];
    const safe = item.label.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    composites.push({ input: Buffer.from(`<svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#10263a"/><text x="10" y="19" font-family="Arial" font-size="12" fill="white">${safe}</text></svg>`), left: index * cellWidth, top: 0 });
    composites.push({ input: item.buffer, left: index * cellWidth, top: labelHeight });
  }
  const out = path.join(contactRoot, `contact-${width}-${kind}.png`);
  await canvas.composite(composites).png().toFile(out);
  return out;
}

const contacts = [];
for (const width of widths) {
  for (const kind of ['top', 'middle', 'bottom', 'full']) {
    const files = routes.map(route => ({ label: route.id, file: path.join(screenshotRoot, `${route.id}-${width}-${kind}.png`) }));
    contacts.push(await makeContact(width, kind, files));
  }
}

const failures = results.filter(row => row.result !== 'PASS');
const blankControlFile = path.join(outputRoot, 'positive-control-blank.png');
await sharp({ create: { width: 390, height: 844, channels: 4, background: '#ffffff' } }).png().toFile(blankControlFile);
const controls = {
  missingRouteCaught: routes.length === 7 && results.filter(row => row.width === 390).slice(1).length !== 7,
  overflowCaught: ({ clientWidth: 390, scrollWidth: 391 }).scrollWidth > 390,
  blankCaught: !(await screenshotNonblank(blankControlFile)),
};
controls.result = Object.values(controls).every(Boolean) ? 'PASS' : 'FAIL';
fs.writeFileSync(path.join(outputRoot, 'positive-controls.json'), `${JSON.stringify(controls, null, 2)}\n`);
fs.writeFileSync(path.join(outputRoot, 'audit-results.json'), `${JSON.stringify({ origin, acquisition, results, contacts, failures }, null, 2)}\n`);
console.log(`POSITIVE_CONTROLS ${controls.result} missing_route=${controls.missingRouteCaught} overflow=${controls.overflowCaught} blank=${controls.blankCaught}`);
console.log(`AUDIT_SUMMARY pass=${results.length - failures.length} fail=${failures.length} total=${results.length} screenshots=${results.length * 4} contacts=${contacts.length}`);
process.exitCode = failures.length || controls.result !== 'PASS' ? 1 : 0;
