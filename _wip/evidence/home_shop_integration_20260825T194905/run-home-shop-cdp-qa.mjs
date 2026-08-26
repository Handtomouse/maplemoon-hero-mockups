#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const sharp = require(`${runtime}/sharp`);

const repo = '/Users/handtomouse/maplemoon-website';
const evidence = `${repo}/_wip/evidence/home_shop_integration_20260825T194905`;
const candidate = `${repo}/_wip/deploy/generated/maplemoon-home-shop-integration-20260825T194905`;
const checkpoint = `${repo}/_wip/checkpoints/MAPLEMOON-HOME-SHOP-INTEGRATION-20260825T194905_20260825_195422_AEST/files/maplemoon-website`;
const base = (process.argv[2] || 'http://127.0.0.1:8766').replace(/\/$/, '');
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const label = 'TEMPORARY STAGING / REPLACE BEFORE FINAL';
const bundlePath = '/assets/product_shots/temporary_eclipse_bite_bundle_web.webp';
const bundleHash = '8bca090850c29da285ae266d8bf666199ae7cacbeee475160df13bc82c66932f';
const widths = [{ width: 1440, height: 1000, dpr: 1 }, { width: 390, height: 844, dpr: 2 }];
const attemptsRoot = path.join(evidence, 'cdp-attempts');
fs.mkdirSync(attemptsRoot, { recursive: true });
const priorAttempts = fs.readdirSync(attemptsRoot).map(name => /^attempt-(\d+)$/.exec(name)?.[1]).filter(Boolean).map(Number);
const attemptRoot = path.join(attemptsRoot, `attempt-${String((priorAttempts.length ? Math.max(...priorAttempts) : 0) + 1).padStart(3, '0')}`);
fs.mkdirSync(attemptRoot, { recursive: false });
const proofDir = path.join(attemptRoot, 'human-review-crops');
fs.mkdirSync(proofDir, { recursive: true });

const failures = [];
const cases = [];
const proofs = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const shaFile = file => sha(fs.readFileSync(file));
const round = number => Math.round(number * 100) / 100;

function genericBuildTransform(source) {
  let text = source.replaceAll('../assets/', '/assets/').replaceAll('/_wip/styles/homepage.css', '/styles/homepage.css');
  const routeReplacements = {
    'homepage_real_1_lead_photo.WIP.html': 'homepage',
    'shop.WIP.html': 'shop',
    'our-story.WIP.html': 'our-story',
    'carob-story.WIP.html': 'carob-story',
    'faq.WIP.html': 'faq',
    'stockists.WIP.html': 'stockists',
    'contact.WIP.html': 'contact',
  };
  for (const [from, to] of Object.entries(routeReplacements)) text = text.replaceAll(from, to);
  const cleanRoutes = [
    ['"/homepage.html#carob', '"/carob-story'], ["'/homepage.html#carob", "'/carob-story"],
    ['"/homepage.html', '"/homepage'], ["'/homepage.html", "'/homepage"],
    ['"/shop.html', '"/shop'], ["'/shop.html", "'/shop"],
    ['"/our-story.html', '"/our-story'], ["'/our-story.html", "'/our-story"],
    ['"/carob-story.html', '"/carob-story'], ["'/carob-story.html", "'/carob-story"],
    ['"/faq.html', '"/faq'], ["'/faq.html", "'/faq"],
    ['"/stockists.html', '"/stockists'], ["'/stockists.html", "'/stockists"],
    ['"/contact.html', '"/contact'], ["'/contact.html", "'/contact"],
  ];
  for (const [from, to] of cleanRoutes) text = text.replaceAll(from, to);
  return text;
}

function buildHomeBaseline() {
  const sourceFile = path.join(checkpoint, '_wip/homepage_real_1_lead_photo.WIP.html');
  let source = fs.readFileSync(sourceFile, 'utf8');
  const drift = `/* hero CTA hard-centre, Nate 19:38 */\n.wf-pactions{justify-content:center!important;width:100%!important;margin-inline:auto!important;}\n.wf-hero-copy{align-items:center!important;}\n.wf a.wf-ppill.primary{margin-inline:auto!important;}\n\n`;
  check(source.split(drift).length - 1 === 1, 'baseline Home checkpoint does not contain the exact one drift block');
  source = source.replace(drift, '');
  check(sha(source) === '558c5bb86346d69029e0fa4abc34c9bff3c4386522e97eef34e5d2e655ecf1d5', 'reconstructed Home baseline is not exact 558c5bb');
  let built = genericBuildTransform(source);
  built = built.replace("url:'products/pure-carob-bar.html'", "url:'/products/pure-carob-bar'");
  const from = `  if(pdpAdd)pdpAdd.addEventListener('click',function(){\n    var state=PRICE_STATE[currentCat]||{priced:false};\n    if(state.priced){\n      window.location.href=shopTarget(currentCat);\n      return;\n    }\n    var item=data[center];`;
  const to = `  if(pdpAdd)pdpAdd.addEventListener('click',function(){\n    var state=PRICE_STATE[currentCat]||{priced:false};\n    var item=data[center];\n    if(state.priced){\n      window.location.href=(item&&item.url)||shopTarget(currentCat);\n      return;\n    }`;
  check(built.split(from).length - 1 === 1, 'Home baseline build seam count is not one');
  return built.replace(from, to);
}

function buildShopBaseline() {
  return genericBuildTransform(fs.readFileSync(path.join(checkpoint, '_wip/shop.WIP.html'), 'utf8'));
}

const baselineHome = buildHomeBaseline();
const baselineShop = buildShopBaseline();

function errorsFor(page) {
  const errors = { consoleErrors: [], pageErrors: [], requestFailures: [], syntheticHeadAborts: [], badResponses: [] };
  page.on('console', message => { if (message.type() === 'error') errors.consoleErrors.push(message.text()); });
  page.on('pageerror', error => errors.pageErrors.push(String(error.message || error)));
  page.on('requestfailed', request => {
    if (!/^(?:data|blob):/.test(request.url())) {
      const row = { url: request.url(), method: request.method(), error: request.failure()?.errorText || 'unknown' };
      if (row.method === 'HEAD') errors.syntheticHeadAborts.push(row); else errors.requestFailures.push(row);
    }
  });
  page.on('response', response => {
    if (response.status() >= 400) errors.badResponses.push({ url: response.url(), status: response.status() });
  });
  return errors;
}

async function openExact(browser, route, widthSpec, baselineBody = null) {
  const context = await browser.newContext({
    viewport: { width: widthSpec.width, height: widthSpec.height },
    deviceScaleFactor: widthSpec.dpr,
    isMobile: widthSpec.width === 390,
    hasTouch: widthSpec.width === 390,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(20000);
  const errors = errorsFor(page);
  const url = `${base}/${route}`;
  if (baselineBody !== null) {
    await page.route(url, async intercepted => intercepted.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: baselineBody }));
  }
  const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => Promise.race([document.fonts?.ready || Promise.resolve(), new Promise(resolve => setTimeout(resolve, 5000))]));
  const metrics = await page.evaluate(() => ({
    innerWidth,
    clientWidth: document.documentElement.clientWidth,
    visualWidth: visualViewport?.width || innerWidth,
  }));
  check(response?.status() === 200, `${route}@${widthSpec.width}: HTTP ${response?.status()}`);
  check(metrics.innerWidth === widthSpec.width, `${route}@${widthSpec.width}: innerWidth ${metrics.innerWidth}`);
  check(metrics.clientWidth === widthSpec.width, `${route}@${widthSpec.width}: clientWidth ${metrics.clientWidth}`);
  check(Math.abs(metrics.visualWidth - widthSpec.width) < 0.01, `${route}@${widthSpec.width}: visual viewport ${metrics.visualWidth}`);
  return { context, page, errors, status: response?.status() || null, metrics, url };
}

async function loadAndAuditAssets(page, scope) {
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
    for (let y = 0; y < document.documentElement.scrollHeight; y += Math.max(500, innerHeight * 0.75)) {
      scrollTo(0, y);
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 120));
    await Promise.all([...document.images].map(image => Promise.race([image.decode?.().catch(() => undefined) || Promise.resolve(), new Promise(resolve => setTimeout(resolve, 5000))])));
  });
  const result = await page.evaluate(async () => {
    const brokenImages = [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc || image.src);
    const refs = new Set();
    document.querySelectorAll('img').forEach(element => refs.add(element.currentSrc || element.src));
    document.querySelectorAll('video[source],video source').forEach(element => { if (element.src) refs.add(element.src); });
    document.querySelectorAll('video[poster]').forEach(element => refs.add(element.poster));
    document.querySelectorAll('use[href]').forEach(element => refs.add(new URL(element.getAttribute('href').split('#')[0], location.href).href));
    document.querySelectorAll('link[rel="stylesheet"][href],script[src]').forEach(element => refs.add(element.href || element.src));
    const checks = [];
    for (const url of [...refs].filter(url => url && new URL(url, location.href).origin === location.origin)) {
      try {
        const response = await fetch(url, { method: 'HEAD', cache: 'no-store', signal: AbortSignal.timeout(5000) });
        checks.push({ url, status: response.status, ok: response.ok });
      } catch (error) {
        checks.push({ url, status: 0, ok: false, error: String(error) });
      }
    }
    return { brokenImages, checks, totalImages: document.images.length };
  });
  check(result.brokenImages.length === 0, `${scope}: broken images ${JSON.stringify(result.brokenImages)}`);
  const bad = result.checks.filter(row => !row.ok);
  check(bad.length === 0, `${scope}: broken fetched assets ${JSON.stringify(bad)}`);
  return result;
}

async function rootMetrics(page) {
  return page.evaluate(() => ({
    innerWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
}

async function requiredTargets(page, selectors, scope) {
  const rows = await page.evaluate(selectorsIn => selectorsIn.flatMap(selector => [...document.querySelectorAll(selector)].map((element, index) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return { selector, index, visible: !element.hidden && style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0, width: rect.width, height: rect.height };
  })), selectors);
  const bad = rows.filter(row => row.visible && (row.width < 43.99 || row.height < 43.99));
  check(bad.length === 0, `${scope}: required targets under 44px ${JSON.stringify(bad)}`);
  return rows.map(row => ({ ...row, width: round(row.width), height: round(row.height) }));
}

async function projection(page, kind) {
  return page.evaluate(kindIn => {
    const root = document.documentElement.cloneNode(true);
    root.querySelectorAll('script,style,noscript,template').forEach(element => element.remove());
    if (kindIn === 'home') {
      root.querySelector('#why .q-compare-pro')?.remove();
      root.querySelectorAll('#catTabs svg').forEach(element => element.remove());
    } else {
      [...root.querySelectorAll('.pcard')].find(card => card.querySelector('h3')?.textContent.trim() === 'Eclipse Bite Bundle')?.remove();
    }
    const normal = value => String(value || '').replace(/\s+/g, ' ').trim();
    return {
      lang: root.getAttribute('lang'),
      title: root.querySelector('title')?.textContent || '',
      text: normal(root.querySelector('body')?.textContent),
      flow: [...root.querySelectorAll('main > section[id],main > footer[id],main > div > section[id]')].map(element => element.id),
      links: [...root.querySelectorAll('a')].map(element => [normal(element.textContent), element.getAttribute('href'), element.getAttribute('aria-label') || '']),
      buttons: [...root.querySelectorAll('button')].map(element => [normal(element.textContent), element.getAttribute('aria-label') || '', element.getAttribute('type') || '']),
      media: [...root.querySelectorAll('img,video,source')].map(element => [element.tagName, element.getAttribute('src') || '', element.getAttribute('srcset') || '', element.getAttribute('alt') || '', element.getAttribute('poster') || '']),
      forms: [...root.querySelectorAll('input,select')].map(element => [element.tagName, element.getAttribute('type') || '', element.getAttribute('name') || '', element.getAttribute('aria-label') || '', element.disabled]),
    };
  }, kind);
}

async function geometry(page, selectors) {
  return page.evaluate(selectorsIn => {
    const roundIn = n => Math.round(n * 100) / 100;
    const rectOf = (rect, base) => ({ x: roundIn(rect.x - base.x), y: roundIn(rect.y - base.y), width: roundIn(rect.width), height: roundIn(rect.height) });
    const result = {};
    for (const selector of selectorsIn) {
      const element = document.querySelector(selector);
      if (!element) { result[selector] = null; continue; }
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      result[selector] = {
        box: { width: roundIn(box.width), height: roundIn(box.height) },
        style: {
          display: style.display, position: style.position, flexDirection: style.flexDirection,
          gridTemplateColumns: style.gridTemplateColumns, padding: style.padding,
          margin: style.margin, borderRadius: style.borderRadius, fontFamily: style.fontFamily,
        },
        children: [...element.children].map(child => rectOf(child.getBoundingClientRect(), box)),
      };
    }
    return result;
  }, selectors);
}

async function sharedStyleInventory(page) {
  return page.evaluate(() => {
    const style = selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const value = getComputedStyle(element);
      return { fontFamily: value.fontFamily, fontSize: value.fontSize, lineHeight: value.lineHeight, color: value.color, borderRadius: value.borderRadius };
    };
    const root = getComputedStyle(document.documentElement);
    return {
      sheets: [...document.styleSheets].filter(sheet => sheet.href).map(sheet => new URL(sheet.href).pathname),
      tokens: ['--ink', '--cream', '--mm-serif', '--mm-sans', '--radius'].map(name => [name, root.getPropertyValue(name).trim()]),
      heroHeading: style('#top h1'), rangeHeading: style('#range h2'), comparisonHeading: style('#why h2'), ritualHeading: style('#ritual h2'), footerHome: style('footer .mm-site-footer__home'),
      heldR6Nodes: document.querySelectorAll('[data-maplemoon-homepage-style-finish-r6],link[href*="homepage-style-finish-r6"]').length,
    };
  });
}

async function captureElement(page, selector, name, width) {
  const locator = page.locator(selector).first();
  check(await locator.count() === 1, `${name}@${width}: capture selector missing ${selector}`);
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(35);
  const file = path.join(proofDir, `${name}_${width}.png`);
  await locator.screenshot({ path: file, animations: 'disabled' });
  const metadata = await sharp(file).metadata();
  const stats = await sharp(file).stats();
  const deviation = stats.channels.reduce((sum, channel) => sum + channel.stdev, 0);
  const row = { name, width, file, sha256: shaFile(file), rasterWidth: metadata.width, rasterHeight: metadata.height, deviation: round(deviation), nonblank: metadata.width > 80 && metadata.height > 80 && deviation > 2 };
  proofs.push(row);
  check(row.nonblank, `${name}@${width}: blank/invalid proof ${JSON.stringify(row)}`);
  return row;
}

async function captureBoundary(page, beforeSelector, afterSelector, name, width) {
  const info = await page.evaluate(({ before, after }) => {
    const a = document.querySelector(before), b = document.querySelector(after);
    if (!a || !b) return null;
    const boundary = (a.getBoundingClientRect().bottom + scrollY + b.getBoundingClientRect().top + scrollY) / 2;
    const targetY = Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, boundary - innerHeight / 2));
    scrollTo(0, targetY);
    return { boundary, targetY };
  }, { before: beforeSelector, after: afterSelector });
  check(info, `${name}@${width}: boundary selector missing`);
  await page.waitForTimeout(35);
  const file = path.join(proofDir, `${name}_${width}.png`);
  await page.screenshot({ path: file, fullPage: false, animations: 'disabled' });
  const metadata = await sharp(file).metadata();
  const stats = await sharp(file).stats();
  const deviation = stats.channels.reduce((sum, channel) => sum + channel.stdev, 0);
  const row = { name, width, file, sha256: shaFile(file), rasterWidth: metadata.width, rasterHeight: metadata.height, deviation: round(deviation), nonblank: metadata.width > 80 && metadata.height > 80 && deviation > 2 };
  proofs.push(row);
  check(row.nonblank, `${name}@${width}: blank/invalid boundary proof ${JSON.stringify(row)}`);
  return row;
}

async function homeChecks(page, width) {
  console.log(`PROGRESS home@${width} interactions-start`);
  const categoryRows = [];
  const expected = { bars: 'category-bar-20', bananas: 'category-banana-20', moons: 'category-moon-20', eclipseBites: 'category-bites-20', elixirs: 'category-elixir-20' };
  for (const [category, symbol] of Object.entries(expected)) {
    const tab = page.locator(`#catTabs [data-cat="${category}"]`);
    const href = await tab.locator('use').getAttribute('href');
    check(href === `/assets/icons/mm-icons-v2.svg#mm-icon-${symbol}`, `home@${width}: ${category} icon ${href}`);
    await tab.click();
    const state = await page.evaluate(categoryIn => ({ stage: document.querySelector('#stage')?.dataset.cat, on: document.querySelector(`#catTabs [data-cat="${categoryIn}"]`)?.classList.contains('on'), selected: document.querySelector(`#catTabs [data-cat="${categoryIn}"]`)?.getAttribute('aria-selected') }), category);
    check(state.stage === category && state.on && state.selected === 'true', `home@${width}: category activation ${category} ${JSON.stringify(state)}`);
    categoryRows.push({ category, href, state });
  }

  await page.locator('#catTabs [data-cat="bars"]').click();
  const before = await page.locator('#pdpName').innerText();
  await page.locator('#range .arw.r').click();
  const after = await page.locator('#pdpName').innerText();
  await page.locator('#range .arw.l').click();
  const restored = await page.locator('#pdpName').innerText();
  check(before !== after && before === restored, `home@${width}: carousel traversal ${JSON.stringify({ before, after, restored })}`);

  const comparison = await page.evaluate(() => {
    const hrefs = [...document.querySelectorAll('#why .q-panel-row use')].map(use => use.getAttribute('href'));
    const rect = selector => { const box = document.querySelector(selector).getBoundingClientRect(); return { left: box.left, right: box.right, top: box.top, bottom: box.bottom }; };
    const panel = rect('#why .q-compare-pro');
    const rows = [...document.querySelectorAll('#why .q-panel-row')].map(row => {
      const box = row.getBoundingClientRect();
      const children = [...row.children].map(child => { const childBox = child.getBoundingClientRect(); return { left: childBox.left, right: childBox.right, top: childBox.top, bottom: childBox.bottom }; });
      return { box: { left: box.left, right: box.right, top: box.top, bottom: box.bottom }, children };
    });
    return { hrefs, panel, rows };
  });
  const meaning = comparison.hrefs.filter(href => !href.endsWith('comparison-check-16'));
  const checks = comparison.hrefs.filter(href => href.endsWith('comparison-check-16'));
  check(meaning.length === 6 && new Set(meaning).size === 6, `home@${width}: six comparison meanings ${JSON.stringify(meaning)}`);
  check(checks.length === 3, `home@${width}: comparison check count ${checks.length}`);
  check(comparison.rows.every(row => row.box.left >= comparison.panel.left - 1 && row.box.right <= comparison.panel.right + 1 && row.children.every(child => child.left >= row.box.left - 1 && child.right <= row.box.right + 1)), `home@${width}: comparison semantic containment`);

  const ritual = await page.evaluate(() => [...document.querySelectorAll('#ritual .q-tile')].map(tile => {
    const ph = tile.querySelector('.ph').getBoundingClientRect(), tx = tile.querySelector('.tx').getBoundingClientRect(), image = tile.querySelector('img'), style = getComputedStyle(image), txStyle = getComputedStyle(tile.querySelector('.tx'));
    return { src: new URL(image.currentSrc || image.src).pathname, objectPosition: style.objectPosition, frameRatio: ph.width / ph.height, phBottom: ph.bottom, txTop: tx.top, captionPosition: txStyle.position, caption: tile.querySelector('.tx').innerText.replace(/\s+/g, ' ').trim() };
  }));
  const ritualExpected = [
    ['/assets/our_story/ritual_quiet_finish_20260825.webp', '50% 24%', '01 A quiet finish A sweet ending without the stimulants'],
    ['/assets/our_story/ritual_softer_pause_20260825.webp', '50% 20%', '02 A softer pause A 3:33pm pick me up without the nasties'],
    ['/assets/our_story/ritual_last_cup_20260825.webp', '50% 38%', '03 The last cup A warm drink without the activation'],
  ];
  ritual.forEach((row, index) => {
    check(row.src === ritualExpected[index][0] && row.objectPosition === ritualExpected[index][1] && row.caption === ritualExpected[index][2], `home@${width}: ritual ${index + 1} binding ${JSON.stringify(row)}`);
    check(Math.abs(row.frameRatio - 0.8) < 0.015, `home@${width}: ritual ${index + 1} is not 4:5 (${row.frameRatio})`);
    check(row.txTop >= row.phBottom - 1 && row.captionPosition === 'relative', `home@${width}: ritual ${index + 1} caption is not below image`);
  });

  await captureElement(page, '#top', 'home_hero_header', width);
  await captureElement(page, '#why', 'home_comparison', width);
  await captureElement(page, '#range', 'home_range', width);
  await captureElement(page, '#ritual', 'home_ritual', width);
  await captureBoundary(page, '#range', '#carob', 'home_transition_range_carob', width);
  await captureBoundary(page, '#carob', '#why', 'home_transition_carob_comparison', width);
  await captureBoundary(page, '#why', '#ritual', 'home_transition_comparison_ritual', width);
  await captureBoundary(page, '#ritual', '#story', 'home_transition_ritual_story', width);
  await captureBoundary(page, '#story', '#who', 'home_transition_story_founders', width);
  await captureElement(page, '#footer', 'home_footer', width);

  await page.locator('#catTabs [data-cat="eclipseBites"]').click();
  const bundle = page.locator('#stage .cf-item.is_bundle');
  check(await bundle.count() === 1, `home@${width}: bundle node count ${await bundle.count()}`);
  const declaredLoading = await bundle.locator('img').getAttribute('loading');
  for (let index = 0; index < 5; index += 1) await page.locator('#range .arw.r').click();
  await page.waitForFunction(() => document.querySelector('#stage .cf-item.is_bundle')?.classList.contains('center'));
  await page.waitForFunction(() => { const image = document.querySelector('#stage .cf-item.is_bundle img'); return image?.complete && image.naturalWidth > 0; });
  const bundleState = await bundle.evaluate((element, expectedLabel) => {
    const image = element.querySelector('img'), stage = document.querySelector('#stage'), labelNode = element.querySelector('.temporary-asset-label');
    const imageRect = image.getBoundingClientRect(), stageRect = stage.getBoundingClientRect(), labelRect = labelNode.getBoundingClientRect();
    const scale = Math.min(imageRect.width / image.naturalWidth, imageRect.height / image.naturalHeight);
    const contentWidth = image.naturalWidth * scale, contentHeight = image.naturalHeight * scale;
    const contentLeft = imageRect.left + (imageRect.width - contentWidth) / 2, contentTop = imageRect.bottom - contentHeight;
    return {
      centered: element.classList.contains('center'), status: element.dataset.assetStatus,
      src: new URL(image.currentSrc || image.src).pathname, natural: [image.naturalWidth, image.naturalHeight], alt: image.alt,
      label: labelNode.textContent.trim(), visibleLabels: [...document.querySelectorAll('.temporary-asset-label')].filter(node => { const box = node.getBoundingClientRect(); return getComputedStyle(node).visibility !== 'hidden' && box.width > 0 && box.height > 0; }).map(node => node.textContent.trim()),
      image: { left: imageRect.left, top: imageRect.top, right: imageRect.right, bottom: imageRect.bottom },
      content: { left: contentLeft, top: contentTop, right: contentLeft + contentWidth, bottom: contentTop + contentHeight },
      stage: { left: stageRect.left, top: stageRect.top, right: stageRect.right, bottom: stageRect.bottom },
      labelRect: { left: labelRect.left, top: labelRect.top, right: labelRect.right, bottom: labelRect.bottom },
      exactLabel: expectedLabel,
    };
  }, label);
  check(declaredLoading === 'lazy', `home@${width}: bundle declared loading ${declaredLoading}`);
  check(bundleState.centered && bundleState.status === 'temporary_replace_before_final', `home@${width}: bundle center/status ${JSON.stringify(bundleState)}`);
  check(bundleState.src === bundlePath && bundleState.natural[0] === 1080 && bundleState.natural[1] === 668, `home@${width}: bundle image ${JSON.stringify(bundleState)}`);
  check(bundleState.alt === 'Temporary five-piece Eclipse Bite Bundle assortment', `home@${width}: bundle alt ${bundleState.alt}`);
  check(bundleState.label === label && bundleState.visibleLabels.length === 1 && bundleState.visibleLabels[0] === label, `home@${width}: visible bundle label ${JSON.stringify(bundleState.visibleLabels)}`);
  check(bundleState.content.left >= bundleState.stage.left - 1 && bundleState.content.right <= bundleState.stage.right + 1 && bundleState.content.top >= bundleState.stage.top - 1 && bundleState.content.bottom <= bundleState.stage.bottom + 1, `home@${width}: bundle content clips stage ${JSON.stringify(bundleState)}`);
  check(bundleState.labelRect.left >= bundleState.stage.left - 1 && bundleState.labelRect.right <= bundleState.stage.right + 1, `home@${width}: bundle label clips stage`);
  await captureElement(page, '#range', 'home_bundle', width);

  const targets = await requiredTargets(page, ['#catTabs .wf-tab', '#range .arw', '#stage .cf-item.center', '#pdpAdd'], `home@${width}`);
  const overflow = await rootMetrics(page);
  check(overflow.overflow === 0 && overflow.scrollWidth === width, `home@${width}: root overflow ${JSON.stringify(overflow)}`);
  const assets = await loadAndAuditAssets(page, `home@${width}`);
  console.log(`PROGRESS home@${width} interactions-complete`);
  return { categoryRows, carousel: { before, after, restored }, comparison, ritual, bundle: { declaredLoading, ...bundleState }, targets, overflow, assets };
}

async function shopChecks(page, width) {
  console.log(`PROGRESS shop@${width} interactions-start`);
  const bundle = page.locator('.pcard.is_bundle');
  check(await bundle.count() === 1, `shop@${width}: bundle node count ${await bundle.count()}`);
  const declaredLoading = await bundle.locator('img').getAttribute('loading');
  const filters = {};
  for (const flavour of ['all', 'pure', 'peppermint', 'hazelnut', 'goji', 'cayenne', 'almond']) {
    await page.locator(`.swatch[data-flavour="${flavour}"]`).click();
    filters[flavour] = await page.evaluate(() => ({ bundleHidden: document.querySelector('.pcard.is_bundle').hidden, visibleCards: [...document.querySelectorAll('.pcard')].filter(card => !card.hidden).length, active: document.querySelector('.swatch.is-active')?.dataset.flavour }));
    check(filters[flavour].active === flavour && filters[flavour].visibleCards > 0, `shop@${width}: flavour ${flavour} activation ${JSON.stringify(filters[flavour])}`);
    check(flavour === 'all' ? !filters[flavour].bundleHidden : filters[flavour].bundleHidden, `shop@${width}: bundle filter ${flavour} ${JSON.stringify(filters[flavour])}`);
  }
  console.log(`PROGRESS shop@${width} filters-complete`);
  await page.locator('.swatch[data-flavour="all"]').click();
  await bundle.locator('img').evaluate(image => { image.loading = 'eager'; image.scrollIntoView({ block: 'center' }); });
  await page.waitForFunction(() => { const image = document.querySelector('.pcard.is_bundle img'); return image?.complete && image.naturalWidth > 0; });
  const state = await bundle.evaluate((element, expectedLabel) => {
    const image = element.querySelector('img'), well = element.querySelector('.ph'), labelNode = element.querySelector('.temporary-asset-label');
    const imageRect = image.getBoundingClientRect(), wellRect = well.getBoundingClientRect(), labelRect = labelNode.getBoundingClientRect();
    return {
      hidden: element.hidden, flavour: element.dataset.flavour, status: element.dataset.assetStatus,
      src: new URL(image.currentSrc || image.src).pathname, natural: [image.naturalWidth, image.naturalHeight], alt: image.alt,
      label: labelNode.textContent.trim(), labelCount: [...document.querySelectorAll('.temporary-asset-label')].filter(node => node.textContent.trim() === expectedLabel).length,
      image: { left: imageRect.left, top: imageRect.top, right: imageRect.right, bottom: imageRect.bottom, width: imageRect.width, height: imageRect.height },
      well: { left: wellRect.left, top: wellRect.top, right: wellRect.right, bottom: wellRect.bottom, width: wellRect.width, height: wellRect.height },
      labelRect: { left: labelRect.left, top: labelRect.top, right: labelRect.right, bottom: labelRect.bottom },
    };
  }, label);
  check(declaredLoading === 'lazy', `shop@${width}: bundle declared loading ${declaredLoading}`);
  check(!state.hidden && state.flavour === 'all_only' && state.status === 'temporary_replace_before_final', `shop@${width}: bundle state ${JSON.stringify(state)}`);
  check(state.src === bundlePath && state.natural[0] === 1080 && state.natural[1] === 668, `shop@${width}: bundle image ${JSON.stringify(state)}`);
  check(state.alt === 'Temporary five-piece Eclipse Bite Bundle assortment', `shop@${width}: bundle alt ${state.alt}`);
  check(state.label === label && state.labelCount === 1, `shop@${width}: bundle label ${JSON.stringify(state)}`);
  check(state.image.left >= state.well.left - 1 && state.image.right <= state.well.right + 1 && state.image.top >= state.well.top - 1 && state.image.bottom <= state.well.bottom + 1, `shop@${width}: grid image clips well`);
  check(state.labelRect.left >= state.well.left - 1 && state.labelRect.right <= state.well.right + 1 && state.labelRect.top >= state.well.top - 1 && state.labelRect.bottom <= state.well.bottom + 1, `shop@${width}: grid label clips well`);
  await captureElement(page, '.pcard.is_bundle', 'shop_bundle_grid', width);

  await page.locator('[data-view="list"]').click();
  const list = await bundle.evaluate(element => {
    const image = element.querySelector('img').getBoundingClientRect(), well = element.querySelector('.ph').getBoundingClientRect();
    return { bodyClass: document.body.className, image: { left: image.left, top: image.top, right: image.right, bottom: image.bottom }, well: { left: well.left, top: well.top, right: well.right, bottom: well.bottom } };
  });
  check(list.bodyClass.includes('shop-list-view'), `shop@${width}: list view class missing`);
  check(list.image.left >= list.well.left - 1 && list.image.right <= list.well.right + 1 && list.image.top >= list.well.top - 1 && list.image.bottom <= list.well.bottom + 1, `shop@${width}: list image clips well`);
  await captureElement(page, '.pcard.is_bundle', 'shop_bundle_list', width);
  await page.locator('[data-view="grid"]').click();

  const targets = await requiredTargets(page, ['.swatch', '.view-btn', '#shop-sort'], `shop@${width}`);
  const containment = await page.evaluate(() => {
    const inside = (child, parent) => child.left >= parent.left - 1 && child.right <= parent.right + 1 && child.top >= parent.top - 1 && child.bottom <= parent.bottom + 1;
    const viewport = { left: 0, right: innerWidth, top: -Infinity, bottom: Infinity };
    const selectors = ['.sp-tools', '.sp-range-nav .sp-cats', '.pcard.is_bundle'];
    return selectors.map(selector => { const box = document.querySelector(selector).getBoundingClientRect(); return { selector, box: { left: box.left, right: box.right, top: box.top, bottom: box.bottom }, contained: inside(box, viewport) }; });
  });
  check(containment.every(row => row.contained), `shop@${width}: semantic containment ${JSON.stringify(containment)}`);
  const overflow = await rootMetrics(page);
  check(overflow.overflow === 0 && overflow.scrollWidth === width, `shop@${width}: root overflow ${JSON.stringify(overflow)}`);
  const assets = await loadAndAuditAssets(page, `shop@${width}`);
  console.log(`PROGRESS shop@${width} interactions-complete`);
  return { declaredLoading, filters, state, list, targets, containment, overflow, assets };
}

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

async function makeContactSheet(width) {
  const rows = proofs.filter(proof => proof.width === width);
  const columns = width === 1440 ? 2 : 2;
  const cellWidth = width === 1440 ? 540 : 400;
  const imageHeight = width === 1440 ? 300 : 320;
  const labelHeight = 34;
  const gutter = 18;
  const sheetWidth = columns * cellWidth + (columns + 1) * gutter;
  const sheetHeight = Math.ceil(rows.length / columns) * (imageHeight + labelHeight + gutter) + gutter;
  const composites = [];
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index], column = index % columns, line = Math.floor(index / columns);
    const left = gutter + column * (cellWidth + gutter), top = gutter + line * (imageHeight + labelHeight + gutter);
    const image = await sharp(row.file).resize({ width: cellWidth, height: imageHeight, fit: 'contain', background: '#eef3f4' }).png().toBuffer();
    composites.push({ input: image, left, top: top + labelHeight });
    const labelSvg = `<svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#10202d"/><text x="12" y="22" fill="#f5efd9" font-size="14" font-family="Arial, sans-serif">${escapeXml(path.basename(row.file))}</text></svg>`;
    composites.push({ input: Buffer.from(labelSvg), left, top });
  }
  const file = path.join(attemptRoot, `human-review-contact-${width}.png`);
  await sharp({ create: { width: sheetWidth, height: sheetHeight, channels: 3, background: '#d9e5e9' } }).composite(composites).png().toFile(file);
  const metadata = await sharp(file).metadata(), stats = await sharp(file).stats();
  const deviation = stats.channels.reduce((sum, channel) => sum + channel.stdev, 0);
  const result = { width, file, sha256: shaFile(file), rasterWidth: metadata.width, rasterHeight: metadata.height, cropCount: rows.length, nonblank: deviation > 2 };
  check(result.nonblank && result.cropCount === 13, `contact@${width}: invalid contact sheet ${JSON.stringify(result)}`);
  return result;
}

const homeGeometrySelectors = ['#top .wf-pbar', '#top .wf-hero-copy', '#carob', '#ritual', '#story', '#who', '#stockists', '#reviews', '#sampler', '#trust', '#footer'];
const shopGeometrySelectors = ['.sp-top', '.sp-opening', '.sp-tools', '.sp-range-nav', '#bars .pcard:not(.is_bundle)', '#moons .pcard:not(.is_bundle)', '#bites .pcard:not(.is_bundle)', '#elixirs .pcard:not(.is_bundle)', '#bananas .pcard:not(.is_bundle)', '#powder .pcard:not(.is_bundle)', 'footer'];

let browser;
let fatal = null;
try {
  check(fs.existsSync(chrome), `Chrome executable missing: ${chrome}`);
  check(shaFile(path.join(candidate, 'assets/product_shots/temporary_eclipse_bite_bundle_web.webp')) === bundleHash, 'candidate bundle asset hash moved before CDP');
  browser = await chromium.launch({ executablePath: chrome, headless: true, args: ['--disable-dev-shm-usage'] });
  for (const widthSpec of widths) {
    const width = widthSpec.width;

    console.log(`PROGRESS home@${width} case-start`);
    const homeBaseline = await openExact(browser, 'baseline-homepage.html', widthSpec, baselineHome);
    const homeCandidate = await openExact(browser, 'homepage.html', widthSpec);
    const baselineHomeProjection = await projection(homeBaseline.page, 'home');
    const candidateHomeProjection = await projection(homeCandidate.page, 'home');
    const baselineHomeGeometry = await geometry(homeBaseline.page, homeGeometrySelectors);
    const candidateHomeGeometry = await geometry(homeCandidate.page, homeGeometrySelectors);
    const baselineStyles = await sharedStyleInventory(homeBaseline.page);
    const candidateStyles = await sharedStyleInventory(homeCandidate.page);
    check(JSON.stringify(candidateHomeProjection) === JSON.stringify(baselineHomeProjection), `home@${width}: non-scoped semantic projection differs from 558c baseline`);
    check(JSON.stringify(candidateHomeGeometry) === JSON.stringify(baselineHomeGeometry), `home@${width}: non-scoped relative geometry differs from 558c baseline`);
    check(JSON.stringify(candidateStyles) === JSON.stringify(baselineStyles) && candidateStyles.heldR6Nodes === 0, `home@${width}: shared-style inventory differs or held R6 is present`);
    const home = await homeChecks(homeCandidate.page, width);
    await homeBaseline.page.waitForTimeout(150);
    await homeCandidate.page.waitForTimeout(150);
    for (const [name, live] of [['home-baseline', homeBaseline], ['home-candidate', homeCandidate]]) {
      check(live.errors.consoleErrors.length === 0 && live.errors.pageErrors.length === 0 && live.errors.requestFailures.length === 0 && live.errors.badResponses.length === 0, `${name}@${width}: runtime errors ${JSON.stringify(live.errors)}`);
    }
    cases.push({ route: 'home', width, dpr: widthSpec.dpr, status: homeCandidate.status, exactMetrics: homeCandidate.metrics, projectionEqual: JSON.stringify(candidateHomeProjection) === JSON.stringify(baselineHomeProjection), geometryEqual: JSON.stringify(candidateHomeGeometry) === JSON.stringify(baselineHomeGeometry), sharedStylesEqual: JSON.stringify(candidateStyles) === JSON.stringify(baselineStyles), sharedStyleInventory: candidateStyles, baselineErrors: homeBaseline.errors, errors: homeCandidate.errors, checks: home });
    await homeBaseline.context.close();
    await homeCandidate.context.close();
    console.log(`PROGRESS home@${width} case-complete`);

    console.log(`PROGRESS shop@${width} case-start`);
    const shopBaseline = await openExact(browser, 'baseline-shop.html', widthSpec, baselineShop);
    const shopCandidate = await openExact(browser, 'shop.html', widthSpec);
    const baselineShopProjection = await projection(shopBaseline.page, 'shop');
    const candidateShopProjection = await projection(shopCandidate.page, 'shop');
    const baselineShopGeometry = await geometry(shopBaseline.page, shopGeometrySelectors);
    const candidateShopGeometry = await geometry(shopCandidate.page, shopGeometrySelectors);
    check(JSON.stringify(candidateShopProjection) === JSON.stringify(baselineShopProjection), `shop@${width}: non-scoped semantic projection differs from pinned baseline`);
    check(JSON.stringify(candidateShopGeometry) === JSON.stringify(baselineShopGeometry), `shop@${width}: non-scoped relative geometry differs from pinned baseline`);
    const shop = await shopChecks(shopCandidate.page, width);
    await shopBaseline.page.waitForTimeout(150);
    await shopCandidate.page.waitForTimeout(150);
    for (const [name, live] of [['shop-baseline', shopBaseline], ['shop-candidate', shopCandidate]]) {
      check(live.errors.consoleErrors.length === 0 && live.errors.pageErrors.length === 0 && live.errors.requestFailures.length === 0 && live.errors.badResponses.length === 0, `${name}@${width}: runtime errors ${JSON.stringify(live.errors)}`);
    }
    cases.push({ route: 'shop', width, dpr: widthSpec.dpr, status: shopCandidate.status, exactMetrics: shopCandidate.metrics, projectionEqual: JSON.stringify(candidateShopProjection) === JSON.stringify(baselineShopProjection), geometryEqual: JSON.stringify(candidateShopGeometry) === JSON.stringify(baselineShopGeometry), baselineErrors: shopBaseline.errors, errors: shopCandidate.errors, checks: shop });
    await shopBaseline.context.close();
    await shopCandidate.context.close();
    console.log(`PROGRESS shop@${width} case-complete`);
  }
} catch (error) {
  fatal = { message: error.message, stack: error.stack };
  failures.push(`fatal: ${error.message}`);
} finally {
  if (browser) await browser.close();
}

const contacts = [];
if (!fatal) for (const widthSpec of widths) contacts.push(await makeContactSheet(widthSpec.width));
const report = {
  schema: 'maplemoon-home-shop-integration-cdp-qa/v1',
  packetId: 'MAPLEMOON-HOME-SHOP-INTEGRATION-20260825T194905',
  attemptRoot,
  browserRuntime: { protocol: 'Playwright over Chrome DevTools Protocol', executable: chrome, windowSizeArgumentUsed: false },
  base,
  outcome: failures.length ? 'FAIL' : 'PASS',
  candidate: { root: candidate, homepageSha256: shaFile(path.join(candidate, 'homepage.html')), shopSha256: shaFile(path.join(candidate, 'shop.html')), bundleSha256: shaFile(path.join(candidate, bundlePath)) },
  reconstructedBaselines: { homeSourceSha256: '558c5bb86346d69029e0fa4abc34c9bff3c4386522e97eef34e5d2e655ecf1d5', homeBuiltSha256: sha(baselineHome), shopSourceSha256: shaFile(path.join(checkpoint, '_wip/shop.WIP.html')), shopBuiltSha256: sha(baselineShop) },
  cases,
  proofs,
  contacts,
  fatal,
  failures,
};
fs.writeFileSync(path.join(attemptRoot, 'browser-results.json'), `${JSON.stringify(report, null, 2)}\n`);
const summary = `BROWSER ${report.outcome} cases=${cases.length}/4 exact_widths=${cases.filter(row => row.exactMetrics.innerWidth === row.width).length}/4 projections=${cases.filter(row => row.projectionEqual).length}/4 geometry=${cases.filter(row => row.geometryEqual).length}/4 proofs=${proofs.filter(row => row.nonblank).length}/26 contacts=${contacts.filter(row => row.nonblank).length}/2 failures=${failures.length}`;
fs.writeFileSync(path.join(attemptRoot, 'browser-results.txt'), `${summary}\n${failures.map(failure => `FAIL ${failure}`).join('\n')}${failures.length ? '\n' : ''}`);
console.log(summary);
console.log(`ATTEMPT ${attemptRoot}`);
for (const row of cases) console.log(`CASE ${row.route}@${row.width} dpr=${row.dpr} status=${row.status} overflow=${row.checks.overflow.overflow} console=${row.errors.consoleErrors.length} page=${row.errors.pageErrors.length} request=${row.errors.requestFailures.length} bad_response=${row.errors.badResponses.length}`);
for (const contact of contacts) console.log(`CONTACT ${contact.width} crops=${contact.cropCount} nonblank=${contact.nonblank} sha256=${contact.sha256} file=${contact.file}`);
for (const failure of failures) console.error(`FAIL ${failure}`);
process.exitCode = failures.length ? 1 : 0;
