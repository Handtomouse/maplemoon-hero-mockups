const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const origin = 'http://127.0.0.1:4403';
const out = '/Users/handtomouse/maplemoon-website/_wip/evidence/integrated_header_cart_cert_r2_20260814T163003';
const routes = ['homepage', 'our-story', 'carob-story', 'shop', 'faq', 'stockists', 'pure-carob-bar'];
const mobileWidths = [390, 900];
const approvedQuestion = 'Does carob contain caffeine?';
const approvedAnswer = 'Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list.';

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

async function trackedPage(browser, width, reducedMotion = 'no-preference') {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion });
  const page = await context.newPage();
  const trace = { consoleErrors: [], pageErrors: [], failedRequests: [], badResponses: [], responses: [] };
  page.on('console', message => { if (message.type() === 'error') trace.consoleErrors.push(message.text()); });
  page.on('pageerror', error => trace.pageErrors.push(error.message));
  page.on('requestfailed', request => trace.failedRequests.push({ url: request.url(), error: request.failure()?.errorText || 'failed' }));
  page.on('response', response => {
    const record = { url: response.url(), status: response.status(), type: response.request().resourceType() };
    trace.responses.push(record);
    if (!response.url().startsWith('data:') && response.status() >= 400) trace.badResponses.push(record);
  });
  return { context, page, trace };
}

async function navigate(page, route, suffix = '') {
  const response = await page.goto(`${origin}/${route}.html${suffix}`, { waitUntil: 'load', timeout: 20000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(100);
  return response?.status() ?? null;
}

async function settle(page, milliseconds = 300) {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.waitForTimeout(milliseconds);
}

async function forceImages(page) {
  await page.evaluate(async () => {
    for (const image of [...document.images]) {
      image.loading = 'eager';
      image.scrollIntoView({ block: 'center' });
      await new Promise(resolve => setTimeout(resolve, 12));
    }
    await Promise.all([...document.images].map(image => {
      if (image.complete) return Promise.resolve();
      return new Promise(resolve => {
        const done = () => resolve();
        image.addEventListener('load', done, { once: true });
        image.addEventListener('error', done, { once: true });
        setTimeout(done, 8000);
      });
    }));
  });
  return page.evaluate(() => ({
    total: document.images.length,
    broken: [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc || image.src),
    pending: [...document.images].filter(image => !image.complete).map(image => image.currentSrc || image.src),
    nonblank: [...document.images].filter(image => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0).length,
  }));
}

async function headerState(page) {
  return page.evaluate(() => {
    const root = document.querySelector('[data-mm-chrome]');
    const toggle = root.querySelector('[data-mm-menu-toggle]');
    const cart = root.querySelector('[data-mm-cart-toggle]');
    const primary = root.querySelector('[data-mm-primary-nav]');
    const utility = root.querySelector('[data-mm-utility-nav]');
    const rootRect = root.getBoundingClientRect();
    const toggleRect = toggle.getBoundingClientRect();
    const hit = document.elementFromPoint(toggleRect.left + toggleRect.width / 2, Math.max(0, toggleRect.top + toggleRect.height / 2));
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth,
      scrollY,
      bodyTextLength: document.body.innerText.trim().length,
      errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
      root: {
        top: rootRect.top, bottom: rootRect.bottom, left: rootRect.left, right: rootRect.right, width: rootRect.width, height: rootRect.height,
        position: getComputedStyle(root).position,
        transitionDuration: getComputedStyle(root).transitionDuration,
        visibility: root.getAttribute('data-mm-header-visibility'),
        fixed: root.getAttribute('data-mm-mobile-fixed'),
        menuState: root.getAttribute('data-mm-menu-state'),
      },
      toggle: { hidden: toggle.hidden, display: getComputedStyle(toggle).display, expanded: toggle.getAttribute('aria-expanded'), hitMatches: Boolean(hit && (hit === toggle || toggle.contains(hit))) },
      cart: { width: cart.getBoundingClientRect().width, height: cart.getBoundingClientRect().height },
      primaryHidden: primary.hidden,
      utilityHidden: utility.hidden,
      bodyRuntime: document.body.getAttribute('data-mm-mobile-header-fixed'),
      bodyReserve: document.body.style.getPropertyValue('--mm-mobile-header-reserve'),
      scrollPadding: document.documentElement.style.getPropertyValue('scroll-padding-top'),
      bodyMenuOpen: document.body.hasAttribute('data-mm-menu-open'),
      focus: document.activeElement?.hasAttribute('data-mm-menu-toggle') ? 'menu-toggle' : (document.activeElement?.hasAttribute('data-mm-cart-toggle') ? 'cart' : document.activeElement?.tagName.toLowerCase()),
    };
  });
}

async function drawerState(page) {
  return page.evaluate(() => {
    const root = document.querySelector('[data-mm-chrome]');
    const primary = root.querySelector('[data-mm-primary-nav]');
    const utility = root.querySelector('[data-mm-utility-nav]');
    const rectOf = element => { const r = element.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }; };
    const rows = [...primary.children, ...utility.children].filter(element => {
      const style = getComputedStyle(element); const rect = element.getBoundingClientRect();
      return !element.hidden && style.display !== 'none' && style.visibility !== 'hidden' && rect.height > 0;
    }).map(element => {
      const rect = element.getBoundingClientRect();
      const x = Math.min(innerWidth - 1, Math.max(0, rect.left + rect.width / 2));
      const y = Math.min(innerHeight - 1, Math.max(0, rect.top + rect.height / 2));
      const hit = document.elementFromPoint(x, y);
      return { tag: element.tagName.toLowerCase(), text: element.textContent.trim(), rect: rectOf(element), hitMatches: Boolean(hit && (hit === element || element.contains(hit))), hitInsideHeader: Boolean(hit && root.contains(hit)) };
    });
    return {
      rootWidth: root.getBoundingClientRect().width,
      primary: { rect: rectOf(primary), display: getComputedStyle(primary).display, position: getComputedStyle(primary).position },
      utility: { rect: rectOf(utility), display: getComputedStyle(utility).display, position: getComputedStyle(utility).position },
      rows,
      state: root.getAttribute('data-mm-menu-state'),
      visible: root.getAttribute('data-mm-header-visibility'),
      bodyOpen: document.body.hasAttribute('data-mm-menu-open'),
    };
  });
}

function assertTrace(trace, label) {
  assert(trace.consoleErrors.length === 0, `${label} console errors ${JSON.stringify(trace.consoleErrors)}`);
  assert(trace.pageErrors.length === 0, `${label} page errors ${JSON.stringify(trace.pageErrors)}`);
  assert(trace.failedRequests.length === 0, `${label} failed requests ${JSON.stringify(trace.failedRequests)}`);
  assert(trace.badResponses.length === 0, `${label} bad responses ${JSON.stringify(trace.badResponses)}`);
}

function assertDrawer(drawer, width, label) {
  assert(drawer.state === 'open' && drawer.visible === 'visible' && drawer.bodyOpen, `${label} drawer state`);
  assert(drawer.primary.display === 'grid' && drawer.utility.display === 'grid', `${label} drawer display`);
  assert(drawer.primary.position === 'absolute' && drawer.utility.position === 'absolute', `${label} drawer positioning`);
  assert(Math.abs(drawer.primary.rect.left) < .6 && Math.abs(drawer.primary.rect.right - width) < .6, `${label} primary not full width`);
  assert(Math.abs(drawer.utility.rect.left) < .6 && Math.abs(drawer.utility.rect.right - width) < .6, `${label} utility not full width`);
  assert(drawer.rows.length === 6, `${label} expected six drawer rows, got ${drawer.rows.length}`);
  assert(drawer.rows.every(row => Math.abs(row.rect.height - 44) < .6 && row.hitMatches && row.hitInsideHeader), `${label} row geometry/paint order ${JSON.stringify(drawer.rows)}`);
}

async function regularCase(browser, route, width) {
  const tracked = await trackedPage(browser, width);
  const { page, trace } = tracked;
  const label = `${route}@${width}`;
  const http = await navigate(page, route);
  const top = await headerState(page);
  assert(http === 200, `${label} HTTP ${http}`);
  assert(top.bodyTextLength > 100 && !top.errorOverlay, `${label} blank/overlay`);
  assert(top.clientWidth === width && top.innerWidth === width && top.scrollWidth === width, `${label} initial width`);
  assert(top.root.position === 'fixed' && Math.abs(top.root.top) < .6 && top.root.visibility === 'visible' && top.root.fixed === 'true', `${label} header not fixed visible`);
  assert(Math.abs(top.root.left) < .6 && Math.abs(top.root.right - width) < .6, `${label} header not full width`);
  assert(top.toggle.hitMatches, `${label} menu paint target`);
  assert(top.bodyRuntime === 'true' && top.bodyReserve === `${Math.round(top.root.height)}px`, `${label} body reservation`);

  const topLimit = top.root.height + 4;
  await page.evaluate(y => scrollTo(0, y), topLimit);
  await pause(40);
  await page.evaluate(y => scrollTo(0, y), topLimit + 23);
  await pause(80);
  const jitter = await headerState(page);
  assert(jitter.root.visibility === 'visible', `${label} 23px jitter guard`);
  await page.evaluate(y => scrollTo(0, y), topLimit + 24);
  await settle(page);
  const hidden = await headerState(page);
  assert(hidden.root.visibility === 'hidden' && hidden.root.top < -hidden.root.height + 1, `${label} 24px hide ${JSON.stringify(hidden.root)}`);
  await page.evaluate(y => scrollTo(0, y), topLimit + 23);
  await settle(page);
  const revealed = await headerState(page);
  assert(revealed.root.visibility === 'visible' && Math.abs(revealed.root.top) < .6 && revealed.toggle.hitMatches, `${label} first upward reveal`);

  await page.evaluate(y => scrollTo(0, y), topLimit + 60);
  await settle(page);
  assert((await headerState(page)).root.visibility === 'hidden', `${label} second hide`);
  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').focus());
  await settle(page, 120);
  const focused = await headerState(page);
  assert(focused.root.visibility === 'visible' && focused.focus === 'menu-toggle', `${label} focus reveal`);
  await page.evaluate(() => document.activeElement.blur());
  await page.evaluate(y => scrollTo(0, y), topLimit + 90);
  await settle(page);
  assert((await headerState(page)).root.visibility === 'hidden', `${label} hidden before menu`);
  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').click());
  await settle(page, 120);
  const drawer = await drawerState(page);
  assertDrawer(drawer, width, label);
  if (route === 'homepage' && width === 390) await page.screenshot({ path: path.join(out, 'homepage_night_drawer_390.png') });
  if (route === 'shop' && width === 390) await page.screenshot({ path: path.join(out, 'shop_light_drawer_390.png') });

  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').focus());
  await page.keyboard.press('Shift+Tab');
  const shiftTab = await page.evaluate(() => document.activeElement?.hasAttribute('data-mm-cart-toggle') ? 'cart' : 'other');
  await page.evaluate(() => document.querySelector('[data-mm-cart-toggle]').focus());
  await page.keyboard.press('Tab');
  const tab = await page.evaluate(() => document.activeElement?.hasAttribute('data-mm-menu-toggle') ? 'menu-toggle' : 'other');
  assert(shiftTab === 'cart' && tab === 'menu-toggle', `${label} drawer focus trap ${shiftTab}/${tab}`);
  await page.keyboard.press('Escape');
  await settle(page, 80);
  const escaped = await headerState(page);
  assert(escaped.root.menuState === 'closed' && !escaped.bodyMenuOpen && escaped.focus === 'menu-toggle', `${label} drawer Escape/focus return`);

  const images = await forceImages(page);
  const geometry = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  assert(images.broken.length === 0 && images.pending.length === 0 && images.nonblank === images.total, `${label} images ${JSON.stringify(images)}`);
  assert(geometry.clientWidth === width && geometry.scrollWidth === width, `${label} final overflow ${JSON.stringify(geometry)}`);
  assertTrace(trace, label);
  await tracked.context.close();
  return { route, width, http, top, jitter, hidden, revealed, focused, drawer, focusTrap: { shiftTab, tab }, escaped, images, geometry, trace };
}

async function reducedCase(browser, route, width) {
  const tracked = await trackedPage(browser, width, 'reduce');
  const { page, trace } = tracked;
  const label = `${route}@${width}/reduce`;
  const http = await navigate(page, route);
  const top = await headerState(page);
  assert(http === 200 && top.root.position === 'fixed' && top.root.visibility === 'visible' && top.root.transitionDuration === '0s', `${label} top/reduced state`);
  await page.evaluate(y => scrollTo(0, y), top.root.height + 260);
  await settle(page, 100);
  const down = await headerState(page);
  await page.evaluate(y => scrollTo(0, y), top.root.height + 180);
  await settle(page, 100);
  const up = await headerState(page);
  assert(down.root.visibility === 'visible' && up.root.visibility === 'visible' && Math.abs(down.root.top) < .6 && Math.abs(up.root.top) < .6, `${label} automatic movement occurred`);
  assert(down.toggle.hitMatches && up.toggle.hitMatches, `${label} toggle paint target`);
  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').click());
  await settle(page, 80);
  const drawer = await drawerState(page);
  assertDrawer(drawer, width, label);
  if (route === 'homepage' && width === 390) await page.screenshot({ path: path.join(out, 'homepage_reduced_drawer_390.png') });
  await page.keyboard.press('Escape');
  const images = await forceImages(page);
  const geometry = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  assert(images.broken.length === 0 && images.pending.length === 0 && geometry.clientWidth === geometry.scrollWidth, `${label} image/overflow`);
  assertTrace(trace, label);
  await tracked.context.close();
  return { route, width, http, top, down, up, drawer, images, geometry, trace };
}

async function desktopCase(browser, route) {
  const tracked = await trackedPage(browser, 1440);
  const { page, trace } = tracked;
  const label = `${route}@1440`;
  const http = await navigate(page, route);
  const state = await headerState(page);
  assert(http === 200, `${label} HTTP`);
  assert(state.clientWidth === 1440 && state.scrollWidth === 1440, `${label} width`);
  assert(state.root.position === 'relative' && state.root.fixed === null && state.root.visibility === null, `${label} stale mobile root state ${JSON.stringify(state.root)}`);
  assert(state.bodyRuntime === null && state.bodyReserve === '' && state.scrollPadding === '' && !state.bodyMenuOpen, `${label} stale body state`);
  assert(state.toggle.hidden && !state.primaryHidden && !state.utilityHidden, `${label} desktop navigation reset`);
  if (route === 'shop') await page.screenshot({ path: path.join(out, 'shop_desktop_reset_1440.png') });
  const images = await forceImages(page);
  const geometry = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  assert(images.broken.length === 0 && images.pending.length === 0 && geometry.clientWidth === geometry.scrollWidth, `${label} image/overflow`);
  assertTrace(trace, label);
  await tracked.context.close();
  return { route, width: 1440, http, state, images, geometry, trace };
}

async function faqCase(browser, width) {
  const tracked = await trackedPage(browser, width);
  const { page, trace } = tracked;
  const label = `faq-copy@${width}`;
  const http = await navigate(page, 'faq');
  const button = page.locator('#caffeine .faq-question');
  await button.scrollIntoViewIfNeeded();
  await button.click();
  await page.waitForFunction(() => document.querySelector('#caffeine .faq-question')?.getAttribute('aria-expanded') === 'true');
  const copy = await page.evaluate(({ approvedQuestion, approvedAnswer }) => {
    const item = document.getElementById('caffeine');
    const question = item.querySelector('.faq-question span:nth-child(2)');
    const answer = item.querySelector('.faq-answer p');
    const answerBox = item.querySelector('.faq-answer');
    const rect = answerBox.getBoundingClientRect();
    const bodyText = document.body.innerText;
    const count = (haystack, needle) => haystack.split(needle).length - 1;
    return {
      question: question.textContent.trim(),
      answer: answer.textContent.trim(),
      questionCount: count(bodyText, approvedQuestion),
      answerCount: count(bodyText, approvedAnswer),
      itemCount: document.querySelectorAll('#caffeine').length,
      answerRegionCount: document.querySelectorAll('[aria-label="Answer: Does carob contain caffeine?"]').length,
      hidden: answerBox.hidden,
      clipping: { clientWidth: answerBox.clientWidth, scrollWidth: answerBox.scrollWidth, clientHeight: answerBox.clientHeight, scrollHeight: answerBox.scrollHeight, left: rect.left, right: rect.right },
    };
  }, { approvedQuestion, approvedAnswer });
  assert(http === 200 && copy.question === approvedQuestion && copy.answer === approvedAnswer, `${label} exact copy ${JSON.stringify(copy)}`);
  assert(copy.questionCount === 1 && copy.answerCount === 1 && copy.itemCount === 1 && copy.answerRegionCount === 1 && !copy.hidden, `${label} duplicate/hidden copy`);
  assert(copy.clipping.clientWidth === copy.clipping.scrollWidth && copy.clipping.clientHeight === copy.clipping.scrollHeight && copy.clipping.left >= -0.5 && copy.clipping.right <= width + .5, `${label} clipping ${JSON.stringify(copy.clipping)}`);
  let drawer = null;
  if (width === 390) {
    await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').click());
    await settle(page, 80);
    drawer = await drawerState(page);
    assertDrawer(drawer, 390, label);
    await page.screenshot({ path: path.join(out, 'faq_exact_drawer_390.png'), fullPage: false });
    await page.keyboard.press('Escape');
    assert(await page.locator('#caffeine .faq-answer').isVisible(), `${label} FAQ closed after drawer interaction`);
  } else {
    await page.screenshot({ path: path.join(out, 'faq_exact_1440.png'), fullPage: false });
  }
  const images = await forceImages(page);
  const geometry = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  assert(images.broken.length === 0 && images.pending.length === 0 && geometry.clientWidth === geometry.scrollWidth, `${label} images/overflow`);
  assertTrace(trace, label);
  await tracked.context.close();
  return { width, http, copy, drawer, images, geometry, trace };
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const results = { schema: 'maplemoon-integrated-header-faq-assets-r2/v1', startedAt: new Date().toISOString(), regular: [], reduced: [], desktop: [], faq: [] };
  for (const route of routes) for (const width of mobileWidths) results.regular.push(await regularCase(browser, route, width));
  for (const route of routes) for (const width of mobileWidths) results.reduced.push(await reducedCase(browser, route, width));
  for (const route of routes) results.desktop.push(await desktopCase(browser, route));
  for (const width of [390, 1440]) results.faq.push(await faqCase(browser, width));
  results.completedAt = new Date().toISOString();
  results.outcome = 'PASS';
  fs.writeFileSync(path.join(out, 'header_faq_assets_results.json'), `${JSON.stringify(results, null, 2)}\n`);
  await browser.close();
  console.log(`R2_HEADER_FAQ PASS regular=${results.regular.length}/14 reduced=${results.reduced.length}/14 desktop=${results.desktop.length}/7 faq=${results.faq.length}/2 screenshots=${fs.readdirSync(out).filter(name => name.endsWith('.png')).length}`);
})().catch(error => {
  const failure = { schema: 'maplemoon-integrated-header-faq-assets-r2/v1', outcome: 'FAIL', failedAt: new Date().toISOString(), error: error.stack || String(error) };
  fs.writeFileSync(path.join(out, 'header_faq_assets_results.json'), `${JSON.stringify(failure, null, 2)}\n`);
  console.error(error.stack || String(error));
  process.exit(1);
});
