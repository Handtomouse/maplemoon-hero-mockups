const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const origin = 'http://127.0.0.1:4403';
const out = '/Users/handtomouse/maplemoon-website/_wip/evidence/integrated_header_cart_cert_r2_20260814T163003';
const shots = path.join(out, 'screenshots');
const storageKey = 'maplemoon_review_cart_v2';
const widths = [390, 900, 1440];
const assert = (condition, message) => { if (!condition) throw new Error(message); };

function instrument() {
  const audit = window.__r2Audit = {
    events: [], positive: false,
    record(kind, detail = '') { this.events.push({ kind, detail: String(detail) }); },
    clear() { this.events = []; },
    snapshot() { return this.events.slice(); },
  };
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (...args) => {
    audit.record('fetch', args[0]);
    return audit.positive ? Promise.resolve(new Response(null, { status: 204 })) : nativeFetch(...args);
  };
  const xhrOpen = XMLHttpRequest.prototype.open;
  const xhrSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    audit.record('xhr', `${method} ${url}`);
    if (audit.positive) { this.__r2Suppressed = true; return; }
    return xhrOpen.call(this, method, url, ...rest);
  };
  XMLHttpRequest.prototype.send = function(...args) {
    if (!this.__r2Suppressed) return xhrSend.apply(this, args);
  };
  const NativeSocket = window.WebSocket;
  window.WebSocket = function(url, protocols) {
    audit.record('websocket', url);
    if (audit.positive) return { close() {} };
    return protocols === undefined ? new NativeSocket(url) : new NativeSocket(url, protocols);
  };
  window.WebSocket.prototype = NativeSocket.prototype;
  const nativeBeacon = navigator.sendBeacon?.bind(navigator);
  if (nativeBeacon) navigator.sendBeacon = (url, data) => {
    audit.record('beacon', url);
    return audit.positive ? true : nativeBeacon(url, data);
  };
  const nativeOpen = window.open.bind(window);
  window.open = (...args) => {
    audit.record('window.open', args[0]);
    return audit.positive ? null : nativeOpen(...args);
  };
  const nativeSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    audit.record(this === localStorage ? 'localStorage' : 'sessionStorage', key);
    if (!audit.positive) return nativeSetItem.call(this, key, value);
  };
  const cookie = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
  if (cookie?.get && cookie?.set) Object.defineProperty(Document.prototype, 'cookie', {
    configurable: true,
    get() { return cookie.get.call(this); },
    set(value) { audit.record('cookie', value); if (!audit.positive) cookie.set.call(this, value); },
  });
  document.addEventListener('submit', event => audit.record('form-submit', event.target?.tagName || ''), true);
  for (const name of ['pushState', 'replaceState']) {
    const native = history[name].bind(history);
    history[name] = (...args) => {
      audit.record(`history.${name}`, args[2]);
      if (!audit.positive) return native(...args);
    };
  }
  audit.positiveControls = async () => {
    audit.clear(); audit.positive = true;
    await fetch('/__r2_fetch__');
    const xhr = new XMLHttpRequest(); xhr.open('GET', '/__r2_xhr__'); xhr.send();
    new WebSocket('ws://127.0.0.1/__r2_ws__').close();
    navigator.sendBeacon('/__r2_beacon__', 'x');
    window.open('/__r2_open__');
    localStorage.setItem('__r2_local__', 'x');
    sessionStorage.setItem('__r2_session__', 'x');
    document.cookie = '__r2_cookie__=x';
    const form = document.createElement('form'); document.body.appendChild(form);
    form.addEventListener('submit', event => event.preventDefault());
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); form.remove();
    history.pushState({}, '', location.href); history.replaceState({}, '', location.href);
    audit.positive = false; return audit.snapshot();
  };

  const NativeObserver = window.MutationObserver;
  const directObservers = new Set();
  let observeCalls = 0, disconnectCalls = 0;
  window.MutationObserver = class R2MutationObserver extends NativeObserver {
    observe(target, options) {
      if (target === document.body && options?.childList && !options?.subtree) {
        directObservers.add(this); observeCalls += 1;
      }
      return super.observe(target, options);
    }
    disconnect() {
      if (directObservers.delete(this)) disconnectCalls += 1;
      return super.disconnect();
    }
  };
  const nativeAdd = Document.prototype.addEventListener;
  const nativeRemove = Document.prototype.removeEventListener;
  const focusListeners = new Set();
  let focusAdds = 0, focusRemoves = 0;
  const isContainment = (type, fn) => type === 'focusin' && String(fn).includes('containmentActive');
  Document.prototype.addEventListener = function(type, fn, options) {
    if (this === document && isContainment(type, fn)) { focusListeners.add(fn); focusAdds += 1; }
    return nativeAdd.call(this, type, fn, options);
  };
  Document.prototype.removeEventListener = function(type, fn, options) {
    if (this === document && isContainment(type, fn) && focusListeners.delete(fn)) focusRemoves += 1;
    return nativeRemove.call(this, type, fn, options);
  };
  window.__r2Lifecycle = () => ({
    activeObservers: directObservers.size, observeCalls, disconnectCalls,
    activeFocusListeners: focusListeners.size, focusAdds, focusRemoves,
  });
}

async function makeRun(browser, width, seed) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await context.addInitScript(instrument);
  if (seed !== undefined) await context.addInitScript(({ key, value }) => sessionStorage.setItem(key, value), { key: storageKey, value: seed });
  const page = await context.newPage();
  const trace = { consoleErrors: [], pageErrors: [], failedRequests: [], badResponses: [] };
  page.on('console', message => { if (message.type() === 'error') trace.consoleErrors.push(message.text()); });
  page.on('pageerror', error => trace.pageErrors.push(error.message));
  page.on('requestfailed', request => trace.failedRequests.push(`${request.url()} :: ${request.failure()?.errorText || 'failed'}`));
  page.on('response', response => { if (response.url().startsWith(origin) && response.status() >= 400) trace.badResponses.push(`${response.status()} ${response.url()}`); });
  const response = await page.goto(`${origin}/shop.html?cart-qa=1`, { waitUntil: 'load', timeout: 20000 });
  assert(response?.status() === 200, `${width}: shop HTTP ${response?.status()}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.querySelectorAll('.pcard[data-mm-availability]').length === 24);
  await page.waitForTimeout(150);
  assert(await page.evaluate(() => innerWidth === document.documentElement.clientWidth), `${width}: inner/client width differ`);
  assert(await page.evaluate(expected => innerWidth === expected, width), `${width}: measured width mismatch`);
  return { context, page, trace };
}

function assertTrace(trace, label) {
  assert(trace.consoleErrors.length === 0, `${label}: console errors ${JSON.stringify(trace.consoleErrors)}`);
  assert(trace.pageErrors.length === 0, `${label}: page errors ${JSON.stringify(trace.pageErrors)}`);
  assert(trace.failedRequests.length === 0, `${label}: request failures ${JSON.stringify(trace.failedRequests)}`);
  assert(trace.badResponses.length === 0, `${label}: bad responses ${JSON.stringify(trace.badResponses)}`);
}

async function waitOpen(page) {
  await page.waitForFunction(() => document.getElementById('mmCartDialog')?.classList.contains('is-open'));
  await page.waitForTimeout(450);
}
async function waitClosed(page) {
  await page.waitForFunction(() => !document.getElementById('mmCartDialog')?.classList.contains('is-open'));
  await page.waitForTimeout(60);
}
async function openQa(page) {
  await page.locator('.mm-cart-qa-button[data-mm-open-cart]').click();
  await waitOpen(page);
}
async function closeX(page) {
  await page.locator('[data-mm-close-cart]').click();
  await waitClosed(page);
}

async function snapshot(page) {
  return page.evaluate(key => {
    let stored;
    try { stored = JSON.parse(sessionStorage.getItem(key) || '[]'); } catch (_) { stored = 'CORRUPT'; }
    return {
      rows: [...document.querySelectorAll('[data-mm-cart-item]')].map(row => ({
        key: row.dataset.mmCartItem,
        name: row.querySelector('h3')?.textContent.trim(),
        option: row.querySelector('.mm-cart-item-option')?.textContent.trim() || '',
        unit: row.querySelector('.mm-cart-item-unit-price')?.textContent.trim(),
        lineTotal: row.querySelector('.mm-cart-item-line-total')?.textContent.trim(),
        quantity: Number(row.querySelector('.mm-cart-quantity span')?.textContent || 0),
      })),
      stored,
      subtotal: document.querySelector('[data-mm-subtotal]')?.textContent.trim(),
      checkoutSubtotal: document.querySelector('[data-mm-checkout-subtotal]')?.textContent.trim(),
      count: Number(document.querySelector('.sp-cart b, .wf-pcart b, .os-cart b, [data-mm-cart-count]')?.textContent || 0),
      emptyVisible: document.querySelector('[data-mm-cart-empty]')?.hidden === false,
    };
  }, storageKey);
}

function assertCart(state, subtotal, count, lines, label) {
  assert(state.subtotal === subtotal, `${label}: subtotal ${state.subtotal}, expected ${subtotal}`);
  assert(state.checkoutSubtotal === subtotal, `${label}: checkout subtotal ${state.checkoutSubtotal}`);
  assert(state.count === count, `${label}: count ${state.count}, expected ${count}`);
  assert(state.rows.length === lines, `${label}: lines ${state.rows.length}, expected ${lines}`);
  assert(Array.isArray(state.stored) && state.stored.length === lines, `${label}: storage lines ${JSON.stringify(state.stored)}`);
}

async function chooseAndAdd(page, category, order, optionLabel) {
  const result = await page.evaluate(({ category, order, optionLabel }) => {
    const card = document.querySelector(`.pcard[data-cat="${category}"][data-order="${order}"]`);
    if (!card) return { error: 'card missing' };
    const select = card.querySelector('.size-select');
    const option = [...select.options].find(candidate => candidate.dataset.label === optionLabel);
    if (!option) return { error: `option ${optionLabel} missing` };
    select.value = option.value; select.dispatchEvent(new Event('change', { bubbles: true }));
    const button = card.querySelector('[data-mm-add-product]');
    const selected = { id: `${card.dataset.cat}-${card.dataset.order}`, name: card.querySelector('h3').textContent.trim(), option: option.dataset.label, cents: Math.round(Number(card.dataset.unitPrice) * 100), unitQuantity: Number(card.dataset.unitQuantity) };
    button.click(); return selected;
  }, { category, order, optionLabel });
  assert(!result.error, `${category}-${order}: ${result.error}`);
  await waitOpen(page);
  return result;
}

async function modalBoundary(page, width) {
  const preseed = await page.evaluate(() => {
    const branch = document.createElement('section'); branch.dataset.r2Preseed = 'true'; branch.setAttribute('inert', '');
    branch.innerHTML = '<button>Preseed outside</button>'; document.body.appendChild(branch); return true;
  });
  assert(preseed, `${width}: could not preseed branch`);
  const lifecycleBefore = await page.evaluate(() => window.__r2Lifecycle());
  await openQa(page);
  const opened = await page.evaluate(async () => {
    const dialog = document.getElementById('mmCartDialog');
    const overlay = document.querySelector('[data-mm-cart-overlay]');
    const outside = [...document.body.children].filter(branch => branch !== dialog && branch !== overlay);
    const initialFocus = document.activeElement?.getAttribute('aria-label');
    const direct = outside.map(branch => ({ tag: branch.tagName, inert: branch.hasAttribute('inert') && branch.inert }));
    const dynamic = document.createElement('section'); dynamic.dataset.r2Dynamic = 'true';
    dynamic.innerHTML = '<button data-r2-outside>Dynamic outside</button>'; document.body.appendChild(dynamic);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const button = dynamic.querySelector('button'); button.focus();
    const nativeBlocked = document.activeElement !== button && dialog.contains(document.activeElement);
    const dynamicInert = dynamic.hasAttribute('inert') && dynamic.inert;
    dynamic.removeAttribute('inert'); button.focus();
    const fallbackRedirected = document.activeElement !== button && dialog.contains(document.activeElement);
    const buttons = [...dialog.querySelectorAll('button')].filter(button => button.getClientRects().length).map(button => {
      const rect = button.getBoundingClientRect(); return { label: button.getAttribute('aria-label') || button.textContent.trim(), width: rect.width, height: rect.height };
    });
    const rect = dialog.getBoundingClientRect();
    return {
      initialFocus, direct, dynamicInert, nativeBlocked, fallbackRedirected, buttons,
      semantics: { role: dialog.getAttribute('role'), modal: dialog.getAttribute('aria-modal'), hidden: dialog.getAttribute('aria-hidden'), inert: dialog.hasAttribute('inert') },
      rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
      overflow: { document: document.documentElement.scrollWidth - document.documentElement.clientWidth, dialog: dialog.scrollWidth - dialog.clientWidth, body: document.querySelector('[data-mm-cart-body]').scrollWidth - document.querySelector('[data-mm-cart-body]').clientWidth },
    };
  });
  assert(opened.direct.length > 0 && opened.direct.every(branch => branch.inert), `${width}: not every direct background branch inert ${JSON.stringify(opened.direct)}`);
  assert(opened.initialFocus === 'Close cart', `${width}: initial focus ${opened.initialFocus}`);
  assert(opened.dynamicInert && opened.nativeBlocked && opened.fallbackRedirected, `${width}: dynamic/focus boundary ${JSON.stringify(opened)}`);
  assert(opened.semantics.role === 'dialog' && opened.semantics.modal === 'true' && opened.semantics.hidden === 'false' && !opened.semantics.inert, `${width}: dialog semantics ${JSON.stringify(opened.semantics)}`);
  assert(opened.buttons.every(button => button.width >= 44 && button.height >= 44), `${width}: sub-44 control ${JSON.stringify(opened.buttons)}`);
  assert(opened.rect.left >= -0.5 && opened.rect.right <= width + 0.5, `${width}: dialog out of viewport ${JSON.stringify(opened.rect)}`);
  assert(Object.values(opened.overflow).every(value => value <= 0), `${width}: open overflow ${JSON.stringify(opened.overflow)}`);

  await page.locator('[data-mm-close-cart]').focus(); await page.keyboard.press('Shift+Tab');
  assert(await page.evaluate(() => document.activeElement?.hasAttribute('data-mm-cart-secondary')), `${width}: Shift-Tab did not wrap`);
  await page.locator('[data-mm-cart-secondary]').focus(); await page.keyboard.press('Tab');
  assert(await page.evaluate(() => document.activeElement?.hasAttribute('data-mm-close-cart')), `${width}: Tab did not wrap`);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor: 2 }); await page.waitForTimeout(100);
  const zoom = await page.evaluate(() => ({ document: document.documentElement.scrollWidth - document.documentElement.clientWidth, dialog: document.getElementById('mmCartDialog').scrollWidth - document.getElementById('mmCartDialog').clientWidth, body: document.querySelector('[data-mm-cart-body]').scrollWidth - document.querySelector('[data-mm-cart-body]').clientWidth }));
  await cdp.send('Emulation.setPageScaleFactor', { pageScaleFactor: 1 });
  assert(Object.values(zoom).every(value => value <= 0), `${width}: 200% zoom overflow ${JSON.stringify(zoom)}`);

  const beforeSecond = await page.evaluate(() => ({ lifecycle: window.__r2Lifecycle(), active: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent.trim() }));
  await page.evaluate(() => document.querySelector('.sp-cart, .wf-pcart, .os-cart, [data-mm-open-cart]')?.click()); await page.waitForTimeout(30);
  const afterSecond = await page.evaluate(() => ({ lifecycle: window.__r2Lifecycle(), active: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent.trim() }));
  assert(JSON.stringify(beforeSecond) === JSON.stringify(afterSecond), `${width}: already-open request duplicated ownership or stole focus`);

  const pointer = await page.evaluate(() => {
    const target = document.querySelector('[data-mm-menu-toggle]'); window.__r2BackgroundClicks = 0;
    target.addEventListener('click', () => window.__r2BackgroundClicks++);
    const rect = target.getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });
  await page.mouse.click(pointer.x, pointer.y);
  assert(await page.evaluate(() => window.__r2BackgroundClicks === 0), `${width}: background pointer click leaked`);
  const stillOpenAfterPointer = await page.evaluate(() => document.getElementById('mmCartDialog').classList.contains('is-open'));
  if (stillOpenAfterPointer) await page.evaluate(() => document.querySelector('[data-mm-cart-overlay]').click());
  await waitClosed(page);
  const restored = await page.evaluate(() => ({ preseed: document.querySelector('[data-r2-preseed]')?.hasAttribute('inert'), dynamic: document.querySelector('[data-r2-dynamic]')?.hasAttribute('inert'), opener: document.activeElement?.matches('.mm-cart-qa-button[data-mm-open-cart]') === true, dialogInert: document.getElementById('mmCartDialog').hasAttribute('inert'), lifecycle: window.__r2Lifecycle() }));
  assert(restored.preseed && !restored.dynamic && restored.opener && restored.dialogInert, `${width}: ownership restore ${JSON.stringify(restored)}`);
  assert(restored.lifecycle.activeObservers === lifecycleBefore.activeObservers && restored.lifecycle.activeFocusListeners === lifecycleBefore.activeFocusListeners, `${width}: lifecycle active leak ${JSON.stringify(restored.lifecycle)}`);
  await page.evaluate(() => { document.querySelector('[data-r2-preseed]')?.remove(); document.querySelector('[data-r2-dynamic]')?.remove(); });
  return { lifecycleBefore, opened, zoom, alreadyOpen: { beforeSecond, afterSecond }, pointerBlocked: true, overlayClosed: true, restored };
}

async function closeVariants(page, width) {
  const results = [];
  for (const variant of ['x', 'escape', 'secondary']) {
    await openQa(page);
    if (variant === 'x') await page.locator('[data-mm-close-cart]').click();
    if (variant === 'escape') await page.keyboard.press('Escape');
    if (variant === 'secondary') await page.locator('[data-mm-cart-secondary]').click();
    await waitClosed(page);
    const returned = await page.evaluate(() => document.activeElement?.matches('.mm-cart-qa-button[data-mm-open-cart]') === true);
    assert(returned, `${width}: ${variant} did not return opener focus`); results.push({ variant, returned });
  }
  return results;
}

async function threeCycles(page, width) {
  const before = await page.evaluate(() => window.__r2Lifecycle());
  for (let i = 0; i < 3; i += 1) { await openQa(page); await page.keyboard.press('Escape'); await waitClosed(page); }
  const after = await page.evaluate(() => window.__r2Lifecycle());
  assert(after.activeObservers === before.activeObservers && after.activeFocusListeners === before.activeFocusListeners, `${width}: cycle active leak ${JSON.stringify({ before, after })}`);
  assert(after.observeCalls - before.observeCalls === 3 && after.disconnectCalls - before.disconnectCalls === 3, `${width}: observer cycle imbalance ${JSON.stringify({ before, after })}`);
  assert(after.focusAdds - before.focusAdds === 3 && after.focusRemoves - before.focusRemoves === 3, `${width}: listener cycle imbalance ${JSON.stringify({ before, after })}`);
  return { before, after };
}

async function headerOwnership(page, width) {
  if (width > 900) return { applicable: false };
  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').click());
  await page.waitForFunction(() => document.body.hasAttribute('data-mm-menu-open'));
  const before = await page.evaluate(() => [...document.querySelectorAll('[inert]')].filter(element => !element.closest('#mmCartDialog')).map((element, index) => { if (!element.dataset.r2HeaderInert) element.dataset.r2HeaderInert = `h${index}`; return element.dataset.r2HeaderInert; }));
  assert(before.length > 0, `${width}: header drawer owns no inert branches`);
  await page.evaluate(() => document.querySelector('[data-mm-cart-toggle]').click()); await waitOpen(page);
  await closeX(page);
  const after = await page.evaluate(ids => ({ menuOpen: document.body.hasAttribute('data-mm-menu-open'), preserved: ids.every(id => document.querySelector(`[data-r2-header-inert="${id}"]`)?.hasAttribute('inert')), activeCart: document.activeElement?.hasAttribute('data-mm-cart-toggle') === true }), before);
  assert(after.menuOpen && after.preserved && after.activeCart, `${width}: cart stole header inert ownership ${JSON.stringify(after)}`);
  await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]').click()); await page.waitForFunction(() => !document.body.hasAttribute('data-mm-menu-open'));
  return { applicable: true, beforeCount: before.length, after };
}

async function arithmetic(page, width) {
  await page.evaluate(key => { sessionStorage.removeItem(key); location.reload(); }, storageKey);
  await page.waitForFunction(() => document.querySelectorAll('.pcard[data-mm-availability]').length === 24);
  const availability = await page.evaluate(() => ({ available: document.querySelectorAll('.pcard[data-mm-availability="available"]').length, enquiry: document.querySelectorAll('.pcard[data-mm-availability="enquiry"]').length }));
  assert(availability.available === 20 && availability.enquiry === 4, `${width}: availability ${JSON.stringify(availability)}`);
  await page.evaluate(() => window.__r2Audit.clear());
  const selections = [];
  selections.push(await chooseAndAdd(page, 'moons', '1', '10 moons'));
  let state = await snapshot(page); assertCart(state, '$23.75', 1, 1, `${width} moon10`);
  assert(state.rows[0].key === 'moons-1::10 moons::2375' && state.rows[0].unit.includes('Unit price $23.75') && state.rows[0].lineTotal === 'Line total $23.75', `${width}: moon10 identity ${JSON.stringify(state.rows[0])}`); await closeX(page);
  selections.push(await chooseAndAdd(page, 'bananas', '0', '20 bananas'));
  state = await snapshot(page); assertCart(state, '$74.74', 2, 2, `${width} banana20`); await closeX(page);
  selections.push(await chooseAndAdd(page, 'eclipses', '0', 'Value pack'));
  state = await snapshot(page); assertCart(state, '$134.73', 3, 3, `${width} eclipse`); await closeX(page);
  selections.push(await chooseAndAdd(page, 'moons', '1', '5 moons'));
  state = await snapshot(page); assertCart(state, '$146.92', 4, 4, `${width} mixed`);
  const exact = Object.fromEntries(state.rows.map(row => [row.key, row]));
  assert(exact['bananas-0::20 bananas::5099']?.lineTotal === 'Line total $50.99', `${width}: banana identity`);
  assert(exact['eclipses-0::Value pack::5999']?.lineTotal === 'Line total $59.99', `${width}: eclipse identity`);
  assert(exact['moons-1::5 moons::1219']?.lineTotal === 'Line total $12.19', `${width}: moon5 identity`);
  const mixedShot = path.join(shots, `cart-mixed-${width}.png`); await page.screenshot({ path: mixedShot }); assert(fs.statSync(mixedShot).size > 10000, `${width}: mixed screenshot blank`);
  await closeX(page);
  await chooseAndAdd(page, 'moons', '1', '5 moons'); state = await snapshot(page); assertCart(state, '$159.11', 5, 4, `${width} moon5 readd`);
  await page.locator('[data-mm-cart-item="moons-1::10 moons::2375"] [data-mm-quantity="1"]').click(); state = await snapshot(page); assertCart(state, '$182.86', 6, 4, `${width} increment`);
  await page.locator('[data-mm-cart-item="moons-1::10 moons::2375"] [data-mm-quantity="-1"]').click(); state = await snapshot(page); assertCart(state, '$159.11', 5, 4, `${width} decrement`);
  await page.locator('[data-mm-cart-item="bananas-0::20 bananas::5099"] [data-mm-remove]').click(); state = await snapshot(page); assertCart(state, '$108.12', 4, 3, `${width} remove`);
  const coreEvents = await page.evaluate(() => window.__r2Audit.snapshot());
  const coreForbidden = coreEvents.filter(event => !(event.kind === 'sessionStorage' && event.detail === 'maplemoon_review_cart_v2'));
  assert(coreForbidden.length === 0, `${width}: core cart side effects ${JSON.stringify(coreForbidden)}`);
  await closeX(page);
  await page.reload({ waitUntil: 'load' }); await page.waitForFunction(() => document.querySelectorAll('.pcard[data-mm-availability]').length === 24); state = await snapshot(page); assertCart(state, '$108.12', 4, 3, `${width} reload`);
  await page.goto(`${origin}/faq.html?cart-qa=1`, { waitUntil: 'load' }); await page.evaluate(() => document.fonts.ready); state = await snapshot(page); assertCart(state, '$108.12', 4, 3, `${width} cross-route`);
  await page.goto(`${origin}/shop.html?cart-qa=1`, { waitUntil: 'load' }); await page.waitForFunction(() => document.querySelectorAll('.pcard[data-mm-availability]').length === 24);
  await page.evaluate(() => window.__r2Audit.clear());
  await openQa(page);
  while (await page.locator('[data-mm-remove]').count()) await page.locator('[data-mm-remove]').first().click();
  state = await snapshot(page); assertCart(state, '$0.00', 0, 0, `${width} empty`); assert(state.emptyVisible, `${width}: empty state hidden`); await closeX(page);
  const events = await page.evaluate(() => window.__r2Audit.snapshot());
  const forbidden = events.filter(event => !(['sessionStorage'].includes(event.kind) && event.detail === 'maplemoon_review_cart_v2'));
  const environment = await page.evaluate(() => ({ cookie: document.cookie, localStorage: Object.keys(localStorage), href: location.href }));
  assert(forbidden.length === 0, `${width}: side effects ${JSON.stringify(forbidden)}`);
  assert(environment.cookie === '' && environment.localStorage.length === 0, `${width}: cookie/localStorage side effects ${JSON.stringify(environment)}`);
  return { availability, selections, finalMixed: '$108.12', empty: state, sideEffects: { coreObserved: coreEvents.length, coreForbidden, finalObserved: events.length, forbidden, environment }, screenshot: { path: path.relative(out, mixedShot), bytes: fs.statSync(mixedShot).size } };
}

async function completeOrder(page, width) {
  await page.evaluate(() => window.__r2Audit.clear());
  await page.evaluate(() => document.querySelector('.pcard[data-cat="bars"][data-order="0"] [data-mm-add-product]').click()); await waitOpen(page);
  await page.locator('[data-mm-cart-primary]').click(); await page.waitForFunction(() => document.querySelector('[data-mm-cart-title]').textContent === 'Checkout');
  await page.locator('[data-mm-cart-primary]').click(); await page.waitForFunction(() => document.querySelector('[data-mm-cart-title]').textContent === 'Thank you');
  await page.locator('[data-mm-cart-secondary]').click(); await waitClosed(page);
  const result = await page.evaluate(key => ({ count: Number(document.querySelector('[data-mm-cart-count]').textContent), stored: JSON.parse(sessionStorage.getItem(key) || '[]'), focusReturned: document.activeElement?.matches('.pcard[data-cat="bars"][data-order="0"] [data-mm-add-product]') === true, events: window.__r2Audit.snapshot() }), storageKey);
  const forbidden = result.events.filter(event => !(event.kind === 'sessionStorage' && event.detail === 'maplemoon_review_cart_v2'));
  assert(result.count === 0 && result.stored.length === 0 && result.focusReturned && forbidden.length === 0, `${width}: completed-order close/side-effects ${JSON.stringify({ result, forbidden })}`);
  return result;
}

async function storageControls(browser) {
  const fresh = await makeRun(browser, 390);
  let state = await snapshot(fresh.page); assertCart(state, '$0.00', 0, 0, 'fresh storage'); assert(state.emptyVisible, 'fresh empty state hidden'); await fresh.context.close();
  const corrupt = await makeRun(browser, 390, '{broken json');
  state = await snapshot(corrupt.page); assertCart(state, '$0.00', 0, 0, 'corrupt storage'); await corrupt.context.close();
  const legacyPayload = JSON.stringify([{ id: 'bars-0', name: 'Pure Carob & Cacao Butter', price: '$12.95', size: '90g', image: '', imageAlt: '', quantity: 2 }]);
  const legacy = await makeRun(browser, 390, legacyPayload);
  state = await snapshot(legacy.page); assertCart(state, '$25.90', 2, 1, 'legacy storage');
  assert(state.stored[0].unitPriceCents === 1295 && !('price' in state.stored[0]), `legacy migration ${JSON.stringify(state.stored)}`); await legacy.context.close();
  return { fresh: '$0.00', corrupt: '$0.00 and reset []', legacy: '$25.90 / unitPriceCents=1295 / price removed' };
}

(async () => {
  fs.mkdirSync(shots, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const report = { schema: 'maplemoon-integrated-cart-r2/v2', started_at: new Date().toISOString(), widths: {}, storage: null, outcome: 'PASS' };
  try {
    for (const width of widths) {
      console.log(`R2_CART width=${width} start`);
      const run = await makeRun(browser, width);
      const positive = await run.page.evaluate(() => window.__r2Audit.positiveControls());
      const positiveKinds = new Set(positive.map(event => event.kind));
      for (const kind of ['fetch','xhr','websocket','beacon','window.open','localStorage','sessionStorage','cookie','form-submit','history.pushState','history.replaceState']) assert(positiveKinds.has(kind), `${width}: positive control missed ${kind}`);
      await run.page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); document.cookie = '__r2_cookie__=; Max-Age=0; path=/'; window.__r2Audit.clear(); });
      const boundary = await modalBoundary(run.page, width);
      const variants = await closeVariants(run.page, width);
      const cycles = await threeCycles(run.page, width);
      const header = await headerOwnership(run.page, width);
      const arithmeticResult = await arithmetic(run.page, width);
      const completed = await completeOrder(run.page, width);
      assertTrace(run.trace, `cart ${width}`);
      report.widths[width] = { boundary, variants, cycles, header, arithmetic: arithmeticResult, completed, trace: run.trace };
      await run.context.close();
      console.log(`R2_CART width=${width} pass`);
    }
    report.storage = await storageControls(browser);
    report.completed_at = new Date().toISOString();
    fs.writeFileSync(path.join(out, 'cart_results.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(`R2_CART PASS widths=3/3 arithmetic=3/3 inert=3/3 lifecycle=3/3 storage=3/3 screenshots=3`);
  } finally { await browser.close(); }
})().catch(error => {
  const failure = { schema: 'maplemoon-integrated-cart-r2/v2', outcome: 'FAIL', failed_at: new Date().toISOString(), error: error.stack || String(error) };
  fs.writeFileSync(path.join(out, 'cart_results.json'), JSON.stringify(failure, null, 2) + '\n');
  console.error(failure.error); process.exit(1);
});
