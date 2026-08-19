const fs = require('fs');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const baseUrl = 'http://127.0.0.1:4391';
const evidenceDir = '/Users/handtomouse/maplemoon-website/_wip/evidence/mobile_header_runtime_20260814T150338';
const routes = ['homepage', 'shop', 'our-story', 'carob-story', 'faq', 'stockists', 'pure-carob-bar'];
const widths = [390, 900];
const baseline = JSON.parse(fs.readFileSync(`${evidenceDir}/baseline.json`, 'utf8'));
const baselineIndex = new Map(baseline.map(row => [`${row.route}:${row.width}`, row]));

function waitForPaint(page, milliseconds = 240) {
  return page.waitForTimeout(milliseconds);
}

async function newTrackedPage(browser, width, reducedMotion = 'no-preference') {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion });
  const errors = [];
  const failedRequests = [];
  const badResponses = [];
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', error => errors.push(`PAGEERROR ${error.message}`));
  page.on('requestfailed', request => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText || 'failed'}`));
  page.on('response', response => {
    if (response.url().startsWith(baseUrl) && response.status() >= 400) {
      badResponses.push(`${response.status()} ${response.url()}`);
    }
  });
  return { page, errors, failedRequests, badResponses };
}

async function gotoRoute(page, route) {
  const response = await page.goto(`${baseUrl}/${route}.html`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(100);
  return response.status();
}

function measure(page) {
  return page.evaluate(() => {
    const root = document.querySelector('[data-mm-chrome]');
    const main = document.querySelector('main') || root.nextElementSibling;
    const toggle = root.querySelector('[data-mm-menu-toggle]');
    const primary = root.querySelector('[data-mm-primary-nav]');
    const utility = root.querySelector('[data-mm-utility-nav]');
    const rect = root.getBoundingClientRect();
    const mainRect = main.getBoundingClientRect();
    const toggleRect = toggle.getBoundingClientRect();
    const toggleHit = document.elementFromPoint(
      Math.min(innerWidth - 1, Math.max(0, toggleRect.left + toggleRect.width / 2)),
      Math.min(innerHeight - 1, Math.max(0, toggleRect.top + toggleRect.height / 2)),
    );
    const active = document.activeElement;
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollY: window.scrollY,
      header: {
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        position: getComputedStyle(root).position,
        transform: getComputedStyle(root).transform,
        transitionDuration: getComputedStyle(root).transitionDuration,
        visibility: root.getAttribute('data-mm-header-visibility'),
        fixed: root.getAttribute('data-mm-mobile-fixed'),
      },
      firstMain: { top: mainRect.top, bottom: mainRect.bottom },
      bodyRuntime: document.body.getAttribute('data-mm-mobile-header-fixed'),
      bodyReserve: document.body.style.getPropertyValue('--mm-mobile-header-reserve'),
      scrollPadding: document.documentElement.style.getPropertyValue('scroll-padding-top'),
      drawerState: root.getAttribute('data-mm-menu-state'),
      menuOpen: document.body.hasAttribute('data-mm-menu-open'),
      primaryHidden: primary.hidden,
      utilityHidden: utility.hidden,
      toggle: {
        hidden: toggle.hidden,
        display: getComputedStyle(toggle).display,
        expanded: toggle.getAttribute('aria-expanded'),
        top: toggleRect.top,
        bottom: toggleRect.bottom,
        hitMatchesToggle: Boolean(toggleHit && (toggleHit === toggle || toggle.contains(toggleHit))),
      },
      focusTarget: active ? (active.id || (active.hasAttribute('data-mm-menu-toggle') ? 'menu-toggle' : active.tagName.toLowerCase())) : null,
    };
  });
}

async function scrollTo(page, y, delay = 40) {
  await page.evaluate(target => window.scrollTo(0, target), y);
  await page.waitForTimeout(delay);
}

function drawerMetrics(page) {
  return page.evaluate(() => {
    const root = document.querySelector('[data-mm-chrome]');
    const toggle = root.querySelector('[data-mm-menu-toggle]');
    const cart = root.querySelector('[data-mm-cart-toggle]');
    const primary = root.querySelector('[data-mm-primary-nav]');
    const utility = root.querySelector('[data-mm-utility-nav]');
    const primaryRect = primary.getBoundingClientRect();
    const utilityRect = utility.getBoundingClientRect();
    const rows = [...primary.children, ...utility.children].filter(element => {
      const style = getComputedStyle(element);
      return !element.hidden && style.display !== 'none' && element.getBoundingClientRect().height > 0;
    });
    const rowDetails = rows.map(element => {
      const rect = element.getBoundingClientRect();
      const x = Math.min(innerWidth - 1, Math.max(0, rect.left + rect.width / 2));
      const y = Math.min(innerHeight - 1, Math.max(0, rect.top + rect.height / 2));
      const hit = document.elementFromPoint(x, y);
      return {
        tag: element.tagName.toLowerCase(),
        text: element.textContent.trim(),
        height: rect.height,
        hitInsideHeader: Boolean(hit && root.contains(hit)),
        hitMatchesRow: Boolean(hit && (hit === element || element.contains(hit))),
      };
    });
    const active = document.activeElement;
    const activeRect = active && active.getBoundingClientRect ? active.getBoundingClientRect() : null;
    return {
      rootVisibility: root.getAttribute('data-mm-header-visibility'),
      state: root.getAttribute('data-mm-menu-state'),
      bodyOpen: document.body.hasAttribute('data-mm-menu-open'),
      primary: { display: getComputedStyle(primary).display, position: getComputedStyle(primary).position, top: primaryRect.top, bottom: primaryRect.bottom },
      utility: { display: getComputedStyle(utility).display, position: getComputedStyle(utility).position, top: utilityRect.top, bottom: utilityRect.bottom },
      rows: rowDetails,
      toggleHeight: toggle.getBoundingClientRect().height,
      cartHeight: cart.getBoundingClientRect().height,
      activeTarget: active ? (active.id || (active.hasAttribute('data-mm-menu-toggle') ? 'menu-toggle' : active.tagName.toLowerCase())) : null,
      activeVisible: Boolean(activeRect && activeRect.top >= 0 && activeRect.bottom <= innerHeight),
    };
  });
}

async function loadAllImages(page) {
  await page.evaluate(async () => {
    const images = [...document.images];
    for (const image of images) {
      image.loading = 'eager';
      image.scrollIntoView({ block: 'center' });
      await new Promise(resolve => setTimeout(resolve, 24));
    }
    await Promise.all(images.map(image => {
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
  }));
}

async function regularCase(browser, route, width) {
  const tracked = await newTrackedPage(browser, width, 'no-preference');
  const { page, errors, failedRequests, badResponses } = tracked;
  const http = await gotoRoute(page, route);
  const top = await measure(page);
  const base = baselineIndex.get(`${route}:${width}`);
  top.mainTopDeltaFromBaseline = top.firstMain.top - base.metrics.firstMain.top;
  if (width === 390 && (route === 'homepage' || route === 'faq')) {
    await page.screenshot({ path: `${evidenceDir}/${route}_390_visible.png`, fullPage: false });
  }

  const topLimit = top.header.height + 4;
  await scrollTo(page, topLimit);
  await scrollTo(page, topLimit + 23);
  const jitter23 = await measure(page);
  await scrollTo(page, topLimit + 24);
  await waitForPaint(page);
  const hidden = await measure(page);
  if (width === 390 && (route === 'homepage' || route === 'faq')) {
    await page.screenshot({ path: `${evidenceDir}/${route}_390_hidden.png`, fullPage: false });
  }

  await scrollTo(page, topLimit + 23);
  await waitForPaint(page);
  const revealed = await measure(page);
  if (width === 390 && (route === 'homepage' || route === 'faq')) {
    await page.screenshot({ path: `${evidenceDir}/${route}_390_revealed.png`, fullPage: false });
  }

  await scrollTo(page, topLimit + 48);
  await waitForPaint(page);
  const hiddenAgain = await measure(page);
  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').focus());
  await waitForPaint(page);
  const focusReveal = await measure(page);
  await page.evaluate(() => document.activeElement.blur());
  await scrollTo(page, topLimit + 73);
  await waitForPaint(page);
  const hiddenBeforeOpen = await measure(page);
  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').click());
  await waitForPaint(page);
  const open = await measure(page);
  const drawer = await drawerMetrics(page);
  if (width === 390 && (route === 'homepage' || route === 'faq')) {
    await page.screenshot({ path: `${evidenceDir}/${route}_390_menu-open.png`, fullPage: false });
  }

  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').focus());
  await page.keyboard.press('Shift+Tab');
  const shiftTabTarget = await page.evaluate(() => document.activeElement.hasAttribute('data-mm-cart-toggle') ? 'cart' : (document.activeElement.id || document.activeElement.tagName.toLowerCase()));
  await page.evaluate(() => document.querySelector('[data-mm-cart-toggle]').focus());
  await page.keyboard.press('Tab');
  const tabTarget = await page.evaluate(() => document.activeElement.hasAttribute('data-mm-menu-toggle') ? 'menu-toggle' : (document.activeElement.id || document.activeElement.tagName.toLowerCase()));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(60);
  const escaped = await measure(page);

  let breakpointCycle = null;
  if (width === 900) {
    const beforeDesktopY = await page.evaluate(() => window.scrollY);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(100);
    const desktop = await measure(page);
    await page.setViewportSize({ width: 900, height: 900 });
    await page.waitForTimeout(100);
    const mobileAgain = await measure(page);
    breakpointCycle = { beforeDesktopY, desktop, mobileAgain };
  }

  const images = await loadAllImages(page);
  const finalWidth = await page.evaluate(() => document.documentElement.clientWidth);
  const finalScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  await page.close();
  return {
    route, width, http, errors, failedRequests, badResponses,
    top, jitter23, hidden, revealed, hiddenAgain, focusReveal, hiddenBeforeOpen, open, drawer,
    focusTrap: { shiftTabTarget, tabTarget }, escaped, breakpointCycle, images,
    finalGeometry: { clientWidth: finalWidth, scrollWidth: finalScrollWidth },
  };
}

async function reducedCase(browser, route, width) {
  const tracked = await newTrackedPage(browser, width, 'reduce');
  const { page, errors, failedRequests, badResponses } = tracked;
  const http = await gotoRoute(page, route);
  const top = await measure(page);
  const base = baselineIndex.get(`${route}:${width}`);
  top.mainTopDeltaFromBaseline = top.firstMain.top - base.metrics.firstMain.top;
  await scrollTo(page, top.header.height + 228);
  await waitForPaint(page, 80);
  const scrolledDown = await measure(page);
  await scrollTo(page, top.header.height + 180);
  await waitForPaint(page, 80);
  const scrolledUp = await measure(page);
  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').click());
  await page.waitForTimeout(80);
  const drawer = await drawerMetrics(page);
  if (width === 390 && (route === 'homepage' || route === 'faq')) {
    await page.screenshot({ path: `${evidenceDir}/${route}_390_reduced-menu.png`, fullPage: false });
  }
  await page.keyboard.press('Escape');
  const escaped = await measure(page);
  const images = await loadAllImages(page);
  const finalGeometry = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  await page.close();
  return { route, width, http, errors, failedRequests, badResponses, top, scrolledDown, scrolledUp, drawer, escaped, images, finalGeometry };
}

async function desktopCase(browser, route) {
  const tracked = await newTrackedPage(browser, 1440, 'no-preference');
  const { page, errors, failedRequests, badResponses } = tracked;
  const http = await gotoRoute(page, route);
  const state = await measure(page);
  const base = baselineIndex.get(`${route}:1440`);
  state.mainTopDeltaFromBaseline = state.firstMain.top - base.metrics.firstMain.top;
  const images = await loadAllImages(page);
  const finalGeometry = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  await page.close();
  return { route, width: 1440, http, errors, failedRequests, badResponses, state, images, finalGeometry };
}

function assertResults(results) {
  const failures = [];
  const fail = (condition, label) => { if (!condition) failures.push(label); };
  for (const row of results.regular) {
    const label = `${row.route}@${row.width}`;
    fail(row.http === 200, `${label} page HTTP`);
    fail(row.errors.length === 0 && row.failedRequests.length === 0 && row.badResponses.length === 0, `${label} runtime/request errors`);
    fail(row.top.header.position === 'fixed' && Math.abs(row.top.header.top) < .6 && row.top.header.visibility === 'visible', `${label} fixed visible top`);
    fail(row.top.toggle.hitMatchesToggle, `${label} visible toggle paint-order hit target`);
    fail(Math.abs(row.top.mainTopDeltaFromBaseline) < .6, `${label} initial layout reservation`);
    fail(row.top.bodyReserve === `${Math.round(row.top.header.height)}px`, `${label} exact body reserve`);
    fail(row.jitter23.header.visibility === 'visible', `${label} 23px jitter guard`);
    fail(row.hidden.header.visibility === 'hidden' && row.hidden.header.top < -row.hidden.header.height + 1, `${label} 24px hide`);
    fail(row.revealed.header.visibility === 'visible' && Math.abs(row.revealed.header.top) < .6, `${label} first upward reveal`);
    fail(row.revealed.toggle.hitMatchesToggle, `${label} revealed toggle paint-order hit target`);
    fail(row.hiddenAgain.header.visibility === 'hidden', `${label} repeat hide`);
    fail(row.focusReveal.header.visibility === 'visible' && row.focusReveal.focusTarget === 'menu-toggle' && row.focusReveal.toggle.top >= 0, `${label} focus reveal`);
    fail(row.hiddenBeforeOpen.header.visibility === 'hidden', `${label} hidden before open`);
    fail(row.open.header.visibility === 'visible' && row.open.menuOpen && row.open.drawerState === 'open', `${label} menu forces reveal`);
    fail(row.drawer.primary.display === 'grid' && row.drawer.primary.position === 'absolute' && row.drawer.utility.display === 'grid' && row.drawer.utility.position === 'absolute', `${label} drawer geometry`);
    fail(row.drawer.rows.every(item => Math.abs(item.height - 44) < .6 && item.hitInsideHeader && item.hitMatchesRow), `${label} 44px rows and hit targets`);
    if (row.route === 'faq') fail(row.drawer.rows.length === 6, `${label} FAQ six rows`);
    fail(row.focusTrap.shiftTabTarget === 'cart' && row.focusTrap.tabTarget === 'menu-toggle', `${label} focus trap`);
    fail(row.escaped.drawerState === 'closed' && !row.escaped.menuOpen && row.escaped.focusTarget === 'menu-toggle', `${label} Escape and focus return`);
    fail(row.images.broken.length === 0 && row.images.pending.length === 0, `${label} images`);
    fail(row.finalGeometry.clientWidth === row.finalGeometry.scrollWidth, `${label} overflow`);
    if (row.breakpointCycle) {
      const desktop = row.breakpointCycle.desktop;
      const again = row.breakpointCycle.mobileAgain;
      fail(desktop.header.fixed === null && desktop.header.visibility === null && desktop.bodyRuntime === null && desktop.bodyReserve === '' && desktop.scrollPadding === '' && desktop.toggle.hidden, `${label} desktop teardown`);
      fail(Math.abs(desktop.scrollY - row.breakpointCycle.beforeDesktopY) < 1, `${label} breakpoint scroll preserve`);
      fail(again.header.fixed === 'true' && again.header.visibility === 'visible' && again.bodyRuntime === 'true' && !again.toggle.hidden, `${label} single mobile remount`);
    }
  }
  for (const row of results.reduced) {
    const label = `${row.route}@${row.width}/reduce`;
    fail(row.http === 200, `${label} page HTTP`);
    fail(row.errors.length === 0 && row.failedRequests.length === 0 && row.badResponses.length === 0, `${label} runtime/request errors`);
    fail(Math.abs(row.top.mainTopDeltaFromBaseline) < .6, `${label} layout reservation`);
    fail(row.top.header.transitionDuration === '0s', `${label} transition disabled`);
    fail(row.scrolledDown.header.visibility === 'visible' && Math.abs(row.scrolledDown.header.top) < .6, `${label} no auto-hide down`);
    fail(row.scrolledUp.header.visibility === 'visible' && Math.abs(row.scrolledUp.header.top) < .6, `${label} no auto-hide up`);
    fail(row.scrolledDown.toggle.hitMatchesToggle && row.scrolledUp.toggle.hitMatchesToggle, `${label} fixed toggle paint-order hit target`);
    fail(row.drawer.state === 'open' && row.drawer.rootVisibility === 'visible' && row.drawer.rows.every(item => Math.abs(item.height - 44) < .6 && item.hitInsideHeader), `${label} drawer`);
    fail(row.escaped.drawerState === 'closed' && row.escaped.focusTarget === 'menu-toggle', `${label} Escape`);
    fail(row.images.broken.length === 0 && row.images.pending.length === 0, `${label} images`);
    fail(row.finalGeometry.clientWidth === row.finalGeometry.scrollWidth, `${label} overflow`);
  }
  for (const row of results.desktop) {
    const label = `${row.route}@1440`;
    fail(row.http === 200, `${label} page HTTP`);
    fail(row.errors.length === 0 && row.failedRequests.length === 0 && row.badResponses.length === 0, `${label} runtime/request errors`);
    fail(row.state.header.position === 'relative' && row.state.header.fixed === null && row.state.header.visibility === null, `${label} desktop state clear`);
    fail(row.state.bodyRuntime === null && row.state.bodyReserve === '' && row.state.scrollPadding === '', `${label} desktop inline clear`);
    fail(row.state.toggle.hidden && !row.state.primaryHidden && !row.state.utilityHidden, `${label} desktop navigation`);
    fail(Math.abs(row.state.mainTopDeltaFromBaseline) < .6, `${label} desktop geometry unchanged`);
    fail(row.images.broken.length === 0 && row.images.pending.length === 0, `${label} images`);
    fail(row.finalGeometry.clientWidth === row.finalGeometry.scrollWidth, `${label} overflow`);
  }
  return failures;
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const results = { regular: [], reduced: [], desktop: [] };
  for (const route of routes) for (const width of widths) results.regular.push(await regularCase(browser, route, width));
  for (const route of routes) for (const width of widths) results.reduced.push(await reducedCase(browser, route, width));
  for (const route of routes) results.desktop.push(await desktopCase(browser, route));
  await browser.close();
  results.failures = assertResults(results);
  fs.writeFileSync(`${evidenceDir}/post-results.json`, `${JSON.stringify(results, null, 2)}\n`);
  const summary = {
    regularCases: results.regular.length,
    reducedCases: results.reduced.length,
    desktopCases: results.desktop.length,
    screenshots: fs.readdirSync(evidenceDir).filter(name => name.endsWith('.png')).length,
    failures: results.failures,
  };
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
  if (results.failures.length) process.exitCode = 2;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
