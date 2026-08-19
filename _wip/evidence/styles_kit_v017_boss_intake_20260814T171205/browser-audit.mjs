import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const runtimeRequire = createRequire('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/runtime-entry.cjs');
const { chromium } = runtimeRequire('playwright');

const outDir = path.dirname(new URL(import.meta.url).pathname);
const kitUrl = 'http://127.0.0.1:8795/style-kit-playground.html';
const candidateBase = 'http://127.0.0.1:8794';
const kitWidths = [1440, 1024, 768, 720, 390];
const candidateWidths = [390, 900, 1440];
const panels = ['story', 'carob', 'faq', 'shop', 'stockists'];
const routes = {
  story: {
    path: '/our-story.html', container: '.os-story-hero', headline: '.os-story-hero__copy h1',
    copy: '.os-story-hero__copy', media: '.os-story-hero__portrait', image: '.os-story-hero__portrait img'
  },
  carob: {
    path: '/carob-story.html', container: '.hero', headline: '.hero h1',
    copy: '.hero .col', media: '.hero .pic', image: '.hero .pic img'
  },
  faq: {
    path: '/faq.html', container: '.faq-hero', headline: '.faq-hero h1',
    copy: '.faq-hero > div:first-child', pseudo: '.faq-hero'
  },
  shop: {
    path: '/shop.html', container: '.sp-opening', headline: '.sp-opening h1',
    copy: '.sp-opening .sp-head', media: '.sp-opening .sp-sampler', image: '.sp-opening .sp-sampler img'
  },
  stockists: {
    path: '/stockists.html', container: '.sp-head', headline: '.sp-head h1',
    copy: '.sp-head', pseudo: '.sp-head'
  }
};

const result = { generatedAt: new Date().toISOString(), kit: {}, candidates: {}, nativeZoom: null, failures: [] };

function attachDiagnostics(page, bucket) {
  bucket.consoleErrors = [];
  bucket.pageErrors = [];
  bucket.requestFailures = [];
  bucket.badResponses = [];
  page.on('console', msg => { if (msg.type() === 'error') bucket.consoleErrors.push(msg.text()); });
  page.on('pageerror', err => bucket.pageErrors.push(String(err)));
  page.on('requestfailed', req => bucket.requestFailures.push(`${req.url()} :: ${req.failure()?.errorText || 'failed'}`));
  page.on('response', res => { if (res.status() >= 400) bucket.badResponses.push(`${res.status()} ${res.url()}`); });
}

async function pageMetrics(page) {
  return page.evaluate(() => {
    const requiredSelector = 'button,input,select,summary,[role="tab"],.icon-btn,.btn,.text-link,.nav-links a,.brand';
    const sub44 = [...document.querySelectorAll(requiredSelector)].filter(el => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
    }).map(el => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, className: el.className, text: (el.textContent || '').trim().slice(0, 60), width: r.width, height: r.height };
    });
    const images = [...document.images].map(img => {
      const r = img.getBoundingClientRect();
      const inViewport = r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
      return { src: img.currentSrc || img.src, complete: img.complete, width: img.naturalWidth, height: img.naturalHeight, inViewport };
    });
    return {
      viewport: { width: innerWidth, height: innerHeight },
      root: { clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth },
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      images,
      brokenImages: images.filter(img => img.inViewport && (!img.complete || img.width === 0 || img.height === 0)),
      deferredImages: images.filter(img => !img.inViewport && (!img.complete || img.width === 0 || img.height === 0)),
      sub44
    };
  });
}

async function triggerLazyImages(page) {
  await page.evaluate(async () => {
    const step = Math.max(400, Math.floor(innerHeight * 0.75));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 35));
    }
    scrollTo(0, 0);
  });
  await page.waitForFunction(() => [...document.images].every(img => img.complete), null, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(100);
}

async function screenshot(page, file, fullPage = false, selector = null) {
  const target = selector ? page.locator(selector).first() : page;
  await target.screenshot({ path: path.join(outDir, file), fullPage: selector ? undefined : fullPage });
  const bytes = fs.statSync(path.join(outDir, file)).size;
  if (bytes < 1024) result.failures.push(`blank-or-small screenshot ${file}: ${bytes} bytes`);
  return bytes;
}

function styleProjection(el, pseudo = null) {
  const cs = getComputedStyle(el, pseudo);
  const r = el.getBoundingClientRect();
  return {
    text: (el.textContent || '').trim().replace(/\s+/g, ' '),
    rect: { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom },
    display: cs.display, position: cs.position, order: cs.order,
    fontFamily: cs.fontFamily, fontSize: cs.fontSize, lineHeight: cs.lineHeight,
    letterSpacing: cs.letterSpacing, fontWeight: cs.fontWeight, fontStyle: cs.fontStyle,
    maxWidth: cs.maxWidth, color: cs.color,
    border: cs.border, borderRadius: cs.borderRadius, boxShadow: cs.boxShadow,
    objectFit: cs.objectFit, objectPosition: cs.objectPosition,
    backgroundImage: cs.backgroundImage, backgroundPosition: cs.backgroundPosition,
    opacity: cs.opacity, mixBlendMode: cs.mixBlendMode,
    maskImage: cs.maskImage, webkitMaskImage: cs.webkitMaskImage,
    top: cs.top, right: cs.right, bottom: cs.bottom, left: cs.left,
    width: cs.width, height: cs.height, content: cs.content
  };
}

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
});
try {
  for (const width of kitWidths) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.route('**/favicon.ico', route => route.fulfill({ status: 204, body: '' }));
    const bucket = {};
    attachDiagnostics(page, bucket);
    const response = await page.goto(kitUrl, { waitUntil: 'networkidle' });
    bucket.mainStatus = response?.status() ?? null;
    bucket.metrics = await pageMetrics(page);
    bucket.screenshotBytes = await screenshot(page, `kit-full-${width}.png`, true);
    bucket.panels = {};
    if (width === 1440 || width === 390) {
      for (const panel of panels) {
        await page.locator(`[data-header-tab="${panel}"]`).click();
        await page.waitForTimeout(50);
        const panelBucket = await page.evaluate(name => {
          const stage = document.querySelector(`[data-header-panel="${name}"]`);
          const headline = stage.querySelector('.page-header-copy h3');
          const copy = stage.querySelector('.page-header-copy');
          const media = stage.querySelector('.header-media');
          const image = stage.querySelector('.header-media img, .header-media > div');
          const style = (el) => {
            const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
            return { rect:{x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom}, display:cs.display, order:cs.order, fontFamily:cs.fontFamily, fontSize:cs.fontSize, lineHeight:cs.lineHeight, letterSpacing:cs.letterSpacing, fontWeight:cs.fontWeight, fontStyle:cs.fontStyle, border:cs.border, borderRadius:cs.borderRadius, boxShadow:cs.boxShadow, maskImage:cs.maskImage, webkitMaskImage:cs.webkitMaskImage, objectFit:cs.objectFit };
          };
          return { headline:style(headline), copy:style(copy), media:style(media), image:style(image), copyBeforeMedia:copy.getBoundingClientRect().top <= media.getBoundingClientRect().top };
        }, panel);
        panelBucket.screenshotBytes = await screenshot(page, `kit-header-${panel}-${width}.png`, false, `[data-header-panel="${panel}"]`);
        bucket.panels[panel] = panelBucket;
      }
    }
    result.kit[width] = bucket;
    await context.close();
  }

  // Real browser zoom is not exposed by Playwright. Attempt an actual browser-level CDP command;
  // do not substitute page scale or viewport emulation if Chromium rejects it.
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    await page.route('**/favicon.ico', route => route.fulfill({ status: 204, body: '' }));
    await page.goto(kitUrl, { waitUntil: 'networkidle' });
    const cdp = await context.newCDPSession(page);
    try {
      await cdp.send('Browser.setZoomLevel', { zoomLevel: 1 });
      result.nativeZoom = { result: 'PASS', method: 'Browser.setZoomLevel', note: 'Browser-level CDP zoom command accepted.' };
    } catch (error) {
      result.nativeZoom = { result: 'UNKNOWN', method: 'Browser.setZoomLevel attempted', error: String(error), note: 'No page-scale or viewport emulation substituted for native 200% browser zoom.' };
    }
    await context.close();
  }

  for (const [name, cfg] of Object.entries(routes)) {
    result.candidates[name] = {};
    for (const width of candidateWidths) {
      const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, deviceScaleFactor: 1 });
      const page = await context.newPage();
      await page.route('**/favicon.ico', route => route.fulfill({ status: 204, body: '' }));
      const bucket = {};
      attachDiagnostics(page, bucket);
      const response = await page.goto(candidateBase + cfg.path, { waitUntil: 'networkidle' });
      bucket.mainStatus = response?.status() ?? null;
      bucket.metrics = await pageMetrics(page);
      bucket.styles = await page.evaluate((selectors) => {
        const container = document.querySelector(selectors.container);
        const headline = document.querySelector(selectors.headline);
        const copy = document.querySelector(selectors.copy);
        if (!container || !headline || !copy) return { missing: selectors };
        const style = (el, pseudo = null) => {
          const cs = getComputedStyle(el, pseudo); const r = el.getBoundingClientRect();
          return { text:(el.textContent||'').trim().replace(/\s+/g,' '), rect:{x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom}, display:cs.display,position:cs.position,order:cs.order,fontFamily:cs.fontFamily,fontSize:cs.fontSize,lineHeight:cs.lineHeight,letterSpacing:cs.letterSpacing,fontWeight:cs.fontWeight,fontStyle:cs.fontStyle,maxWidth:cs.maxWidth,border:cs.border,borderRadius:cs.borderRadius,boxShadow:cs.boxShadow,objectFit:cs.objectFit,objectPosition:cs.objectPosition,backgroundImage:cs.backgroundImage,backgroundPosition:cs.backgroundPosition,opacity:cs.opacity,mixBlendMode:cs.mixBlendMode,maskImage:cs.maskImage,webkitMaskImage:cs.webkitMaskImage,top:cs.top,right:cs.right,bottom:cs.bottom,left:cs.left,width:cs.width,height:cs.height,content:cs.content };
        };
        const media = selectors.media ? document.querySelector(selectors.media) : null;
        const image = selectors.image ? document.querySelector(selectors.image) : null;
        const pseudoEl = selectors.pseudo ? document.querySelector(selectors.pseudo) : null;
        const mediaStyle = media ? style(media) : (pseudoEl ? style(pseudoEl, '::after') : null);
        const mediaRect = media ? media.getBoundingClientRect() : null;
        return { container:style(container), headline:style(headline), copy:style(copy), media:mediaStyle, image:image?style(image):null, copyBeforeMedia:mediaRect ? copy.getBoundingClientRect().top <= mediaRect.top : null };
      }, cfg);
      bucket.screenshotBytes = await screenshot(page, `candidate-${name}-${width}.png`, false);
      result.candidates[name][width] = bucket;
      await context.close();
    }
  }
} finally {
  await browser.close();
}

for (const [width, bucket] of Object.entries(result.kit)) {
  if (bucket.mainStatus !== 200) result.failures.push(`kit ${width}: main status ${bucket.mainStatus}`);
  if (bucket.metrics.horizontalOverflow) result.failures.push(`kit ${width}: horizontal overflow`);
  if (bucket.metrics.brokenImages.length) result.failures.push(`kit ${width}: ${bucket.metrics.brokenImages.length} broken images`);
  if (bucket.metrics.sub44.length) result.failures.push(`kit ${width}: ${bucket.metrics.sub44.length} sub-44 required targets`);
  for (const key of ['consoleErrors','pageErrors','requestFailures','badResponses']) if (bucket[key].length) result.failures.push(`kit ${width}: ${key}=${bucket[key].length}`);
}
for (const [route, widths] of Object.entries(result.candidates)) {
  for (const [width, bucket] of Object.entries(widths)) {
    if (bucket.mainStatus !== 200) result.failures.push(`${route} ${width}: main status ${bucket.mainStatus}`);
    if (bucket.metrics.horizontalOverflow) result.failures.push(`${route} ${width}: horizontal overflow`);
    if (bucket.metrics.brokenImages.length) result.failures.push(`${route} ${width}: ${bucket.metrics.brokenImages.length} broken images`);
    for (const key of ['consoleErrors','pageErrors','requestFailures','badResponses']) if (bucket[key].length) result.failures.push(`${route} ${width}: ${key}=${bucket[key].length}`);
  }
}

fs.writeFileSync(path.join(outDir, 'browser-audit.json'), JSON.stringify(result, null, 2) + '\n');
console.log(`KIT widths=${kitWidths.join(',')} screenshots=${kitWidths.length + panels.length * 2}`);
for (const width of kitWidths) {
  const b = result.kit[width];
  console.log(`KIT ${width}: status=${b.mainStatus} overflow=${b.metrics.horizontalOverflow} broken=${b.metrics.brokenImages.length} sub44=${b.metrics.sub44.length} console=${b.consoleErrors.length} page=${b.pageErrors.length} request=${b.requestFailures.length} bad=${b.badResponses.length}`);
}
console.log(`NATIVE_ZOOM ${result.nativeZoom.result}: ${result.nativeZoom.method}`);
for (const [route, widths] of Object.entries(result.candidates)) {
  for (const width of candidateWidths) {
    const b = widths[width];
    console.log(`CANDIDATE ${route} ${width}: status=${b.mainStatus} overflow=${b.metrics.horizontalOverflow} broken=${b.metrics.brokenImages.length} console=${b.consoleErrors.length} page=${b.pageErrors.length} request=${b.requestFailures.length} bad=${b.badResponses.length}`);
  }
}
console.log(`RESULT ${result.failures.length ? 'FAIL' : 'PASS'} failures=${result.failures.length}`);
if (result.failures.length) console.log(result.failures.join('\n'));
process.exitCode = result.failures.length ? 1 : 0;
