const fs = require("node:fs");
const path = require("node:path");

const DEBUG = "http://127.0.0.1:9338";
const ORIGIN = "http://127.0.0.1:8138";
const OUT = __dirname;
const SCREENSHOTS = path.join(OUT, "screenshots");
const STORAGE_KEY = "maplemoon_review_cart_v2";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

class CDP {
  constructor(url) {
    this.url = url;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }
  async connect() {
    this.ws = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
        else pending.resolve(message.result || {});
        return;
      }
      for (const listener of this.listeners.get(message.method) || []) {
        listener(message.params || {});
      }
    });
  }
  call(method, params = {}) {
    const id = this.nextId++;
    const promise = new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
    this.ws.send(JSON.stringify({ id, method, params }));
    return promise;
  }
  on(method, listener) {
    if (!this.listeners.has(method)) this.listeners.set(method, []);
    this.listeners.get(method).push(listener);
  }
  close() {
    this.ws.close();
  }
}

const instrumentation = `(() => {
  const audit = window.__mmAudit = {
    events: [],
    positive: false,
    record(kind, detail) { this.events.push({ kind, detail: String(detail || "") }); },
    clear() { this.events = []; },
    async positiveControls() {
      this.clear();
      this.positive = true;
      await fetch("/__mm_positive_fetch__");
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "/__mm_positive_xhr__");
      const socket = new WebSocket("ws://127.0.0.1/__mm_positive_ws__");
      socket.close?.();
      navigator.sendBeacon("/__mm_positive_beacon__", "audit");
      window.open("/__mm_positive_open__");
      localStorage.setItem("__mm_positive_local__", "audit");
      sessionStorage.setItem("__mm_positive_session__", "audit");
      document.cookie = "__mm_positive_cookie__=audit";
      const form = document.createElement("form");
      form.addEventListener("submit", event => event.preventDefault());
      document.body.appendChild(form);
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      form.remove();
      history.pushState({}, "", location.href);
      history.replaceState({}, "", location.href);
      this.positive = false;
      return this.events.slice();
    }
  };
  const originalFetch = window.fetch.bind(window);
  window.fetch = (...args) => {
    audit.record("fetch", args[0]);
    if (audit.positive) return Promise.resolve(new Response(null, { status: 204 }));
    return originalFetch(...args);
  };
  const xhrOpen = XMLHttpRequest.prototype.open;
  const xhrSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    audit.record("xhr", method + " " + url);
    if (audit.positive) { this.__mmAuditSuppressed = true; return; }
    return xhrOpen.call(this, method, url, ...rest);
  };
  XMLHttpRequest.prototype.send = function(...args) {
    if (this.__mmAuditSuppressed) return;
    return xhrSend.apply(this, args);
  };
  const OriginalWebSocket = window.WebSocket;
  window.WebSocket = function(url, protocols) {
    audit.record("websocket", url);
    if (audit.positive) return { close() {} };
    return protocols === undefined ? new OriginalWebSocket(url) : new OriginalWebSocket(url, protocols);
  };
  window.WebSocket.prototype = OriginalWebSocket.prototype;
  const originalBeacon = navigator.sendBeacon?.bind(navigator);
  if (originalBeacon) navigator.sendBeacon = (url, data) => {
    audit.record("beacon", url);
    return audit.positive ? true : originalBeacon(url, data);
  };
  const originalOpen = window.open.bind(window);
  window.open = (...args) => {
    audit.record("window.open", args[0]);
    return audit.positive ? null : originalOpen(...args);
  };
  const storageSet = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    const kind = this === localStorage ? "localStorage" : "sessionStorage";
    audit.record(kind, key);
    if (audit.positive) return;
    return storageSet.call(this, key, value);
  };
  const cookie = Object.getOwnPropertyDescriptor(Document.prototype, "cookie");
  if (cookie?.set && cookie?.get) Object.defineProperty(Document.prototype, "cookie", {
    configurable: true,
    get() { return cookie.get.call(this); },
    set(value) {
      audit.record("cookie", value);
      if (!audit.positive) cookie.set.call(this, value);
    }
  });
  document.addEventListener("submit", event => audit.record("form-submit", event.target?.tagName), true);
  for (const name of ["pushState", "replaceState"]) {
    const original = history[name].bind(history);
    history[name] = (...args) => {
      audit.record("history." + name, args[2]);
      return audit.positive ? undefined : original(...args);
    };
  }
})();`;

async function createPage(width, setupScript = "") {
  const response = await fetch(`${DEBUG}/json/new?${encodeURIComponent("about:blank")}`, {
    method: "PUT"
  });
  assert(response.ok, `Could not create Chrome target: ${response.status}`);
  const target = await response.json();
  const cdp = new CDP(target.webSocketDebuggerUrl);
  await cdp.connect();
  const trace = { requests: [], responses: [], failures: [], exceptions: [], consoleErrors: [] };
  cdp.on("Network.requestWillBeSent", ({ request, type }) => {
    trace.requests.push({ url: request.url, method: request.method, type });
  });
  cdp.on("Network.responseReceived", ({ response, type }) => {
    trace.responses.push({ url: response.url, status: response.status, type });
  });
  cdp.on("Network.loadingFailed", ({ errorText, type, canceled }) => {
    if (!canceled) trace.failures.push({ errorText, type });
  });
  cdp.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
    trace.exceptions.push(exceptionDetails.text || "Runtime exception");
  });
  cdp.on("Runtime.consoleAPICalled", ({ type, args }) => {
    if (type === "error") trace.consoleErrors.push(args.map((arg) => arg.value || arg.description || "").join(" "));
  });
  await Promise.all([
    cdp.call("Page.enable"),
    cdp.call("Runtime.enable"),
    cdp.call("Network.enable"),
    cdp.call("Log.enable")
  ]);
  await cdp.call("Emulation.setDeviceMetricsOverride", {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await cdp.call("Page.addScriptToEvaluateOnNewDocument", { source: instrumentation });
  if (setupScript) {
    await cdp.call("Page.addScriptToEvaluateOnNewDocument", { source: setupScript });
  }
  return { cdp, trace, targetId: target.id, width };
}

async function evaluate(page, expression) {
  const result = await page.cdp.call("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true
  });
  if (result.exceptionDetails) {
    throw new Error(`Evaluation failed: ${result.exceptionDetails.text}\n${expression.slice(0, 240)}`);
  }
  return result.result.value;
}

async function navigate(page, url) {
  await page.cdp.call("Page.navigate", { url });
  await waitFor(page, "document.readyState === 'complete'", 12000);
  await delay(250);
}

async function waitFor(page, condition, timeout = 6000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(page, `Boolean(${condition})`)) return;
    await delay(50);
  }
  throw new Error(`Timed out waiting for: ${condition}`);
}

async function key(page, value, modifiers = 0) {
  await page.cdp.call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: value,
    code: value === " " ? "Space" : value,
    modifiers
  });
  await page.cdp.call("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: value,
    code: value === " " ? "Space" : value,
    modifiers
  });
}

async function screenshot(page, name) {
  const result = await page.cdp.call("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false
  });
  const bytes = Buffer.from(result.data, "base64");
  assert(bytes.length > 10000, `Screenshot ${name} is blank/too small (${bytes.length} bytes)`);
  const target = path.join(SCREENSHOTS, name);
  fs.writeFileSync(target, bytes);
  return { file: `screenshots/${name}`, bytes: bytes.length };
}

async function selectAndAdd(page, category, order, optionIndex) {
  const result = await evaluate(page, `(() => {
    const card = document.querySelector('.pcard[data-cat="${category}"][data-order="${order}"]');
    if (!card) return { error: 'card missing' };
    const select = card.querySelector('.size-select');
    if (!select) return { error: 'select missing' };
    select.selectedIndex = ${optionIndex};
    select.dispatchEvent(new Event('change', { bubbles: true }));
    const option = select.options[select.selectedIndex];
    const button = card.querySelector('[data-mm-add-product]');
    const expected = {
      productId: card.dataset.cat + '-' + card.dataset.order,
      name: card.querySelector('h3').textContent.replace(/\\s+/g, ' ').trim(),
      optionLabel: option.dataset.label,
      unitPriceCents: Math.round(Number(card.dataset.unitPrice) * 100),
      unitQuantity: Number(card.dataset.unitQuantity),
      optionValue: option.value
    };
    button.click();
    return expected;
  })()`);
  assert(!result.error, `${category}-${order}: ${result.error}`);
  await waitFor(page, "document.getElementById('mmCartDialog')?.classList.contains('is-open')");
  await delay(80);
  return result;
}

async function cartState(page) {
  return evaluate(page, `(() => {
    const dialog = document.getElementById('mmCartDialog');
    const rows = [...document.querySelectorAll('[data-mm-cart-item]')].map(row => ({
      key: row.dataset.mmCartItem,
      name: row.querySelector('h3')?.textContent.trim(),
      option: row.querySelector('.mm-cart-item-option')?.textContent.trim() || '',
      unit: row.querySelector('.mm-cart-item-unit-price')?.textContent.trim(),
      lineTotal: row.querySelector('.mm-cart-item-line-total')?.textContent.trim(),
      quantity: Number(row.querySelector('.mm-cart-quantity span')?.textContent)
    }));
    let stored;
    try { stored = JSON.parse(sessionStorage.getItem('${STORAGE_KEY}') || '[]'); }
    catch (_) { stored = 'CORRUPT'; }
    return {
      rows,
      stored,
      subtotal: document.querySelector('[data-mm-subtotal]')?.textContent.trim(),
      checkoutSubtotal: document.querySelector('[data-mm-checkout-subtotal]')?.textContent.trim(),
      count: Number(document.querySelector('.sp-cart b, .wf-pcart b, .os-cart b, [data-mm-cart-count]')?.textContent || 0),
      empty: document.querySelector('[data-mm-cart-empty]')?.hidden === false,
      dialogOpen: dialog?.classList.contains('is-open'),
      dialogInert: dialog?.hasAttribute('inert'),
      active: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim() || document.activeElement?.tagName
    };
  })()`);
}

async function closeWithEscape(page) {
  await key(page, "Escape");
  await waitFor(page, "!document.getElementById('mmCartDialog')?.classList.contains('is-open')");
}

function assertMoneyState(state, subtotal, count, lines) {
  assert(state.subtotal === subtotal, `Expected subtotal ${subtotal}, got ${state.subtotal}`);
  assert(state.count === count, `Expected bag count ${count}, got ${state.count}`);
  assert(state.rows.length === lines, `Expected ${lines} cart lines, got ${state.rows.length}`);
  assert(state.checkoutSubtotal === subtotal, `Checkout subtotal mismatch: ${state.checkoutSubtotal}`);
}

async function interactionSurface(page) {
  return evaluate(page, `(() => {
    const visible = el => !!(el && el.getClientRects().length);
    const size = el => { const r = el.getBoundingClientRect(); return { label: el.getAttribute('aria-label') || el.textContent.trim(), width: r.width, height: r.height }; };
    const targets = [...document.querySelectorAll('[data-mm-add-product], .pcard[data-mm-availability="enquiry"] .add, #mmCartDialog button')].filter(visible).map(size);
    const images = [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.currentSrc || img.src);
    const dialog = document.getElementById('mmCartDialog');
    const disclosure = document.querySelector('.sp-opening .mm-demo-disclosure');
    return {
      innerWidth,
      targets,
      targetFailures: targets.filter(target => target.width < 44 || target.height < 44),
      imageErrors: images,
      overflow: {
        document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        dialog: dialog ? dialog.scrollWidth - dialog.clientWidth : null,
        body: document.querySelector('[data-mm-cart-body]') ? document.querySelector('[data-mm-cart-body]').scrollWidth - document.querySelector('[data-mm-cart-body]').clientWidth : null
      },
      dialog: dialog ? (() => {
        const rect = dialog.getBoundingClientRect();
        return {
          role: dialog.getAttribute('role'),
          modal: dialog.getAttribute('aria-modal'),
          labelledby: dialog.getAttribute('aria-labelledby'),
          describedby: dialog.getAttribute('aria-describedby'),
          rect: { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height }
        };
      })() : null,
      disclosure: disclosure ? { text: disclosure.textContent.trim(), visible: visible(disclosure) } : null,
      notice: document.querySelector('[data-mm-cart-notice]')?.textContent.replace(/\\s+/g, ' ').trim(),
      cookies: document.cookie,
      localStorage: Object.keys(localStorage),
      url: location.href
    };
  })()`);
}

async function exhaustive390() {
  const page = await createPage(390);
  await navigate(page, `${ORIGIN}/shop.html?cart-qa=1`);
  await evaluate(page, `sessionStorage.clear(); location.reload()`);
  await waitFor(page, "document.readyState === 'complete' && document.querySelectorAll('.pcard[data-mm-availability]').length === 24", 12000);
  await delay(250);
  const startUrl = await evaluate(page, "location.href");
  const initial = await interactionSurface(page);
  assert(initial.innerWidth === 390, `Measured width was ${initial.innerWidth}, expected 390`);
  assert(initial.disclosure?.visible, "Catalogue disclosure not visible before action");
  assert(/checkout and orders are not connected/i.test(initial.disclosure.text), "Catalogue disclosure is not explicit");
  assert(initial.targetFailures.length === 0, `Initial target failures: ${JSON.stringify(initial.targetFailures)}`);
  assert(initial.imageErrors.length === 0, `Initial image errors: ${initial.imageErrors.join(", ")}`);

  const availability = await evaluate(page, `(() => ({
    available: [...document.querySelectorAll('.pcard[data-mm-availability="available"]')].map(card => ({ name: card.querySelector('h3').textContent.trim(), tag: card.querySelector('.add').tagName, label: card.querySelector('.add').getAttribute('aria-label'), disabled: card.querySelector('.add').disabled })),
    enquiry: [...document.querySelectorAll('.pcard[data-mm-availability="enquiry"]')].map(card => ({ name: card.querySelector('h3').textContent.trim(), tag: card.querySelector('.add').tagName, text: card.querySelector('.add').textContent.trim(), label: card.querySelector('.add').getAttribute('aria-label'), href: card.querySelector('.add').getAttribute('href'), cartBinding: card.querySelector('.add').hasAttribute('data-mm-add-product') }))
  }))()`);
  assert(availability.available.length === 20, `Expected 20 available products, got ${availability.available.length}`);
  assert(availability.enquiry.length === 4, `Expected 4 enquiry products, got ${availability.enquiry.length}`);
  assert(availability.available.every(item => item.tag === "BUTTON" && item.label?.startsWith("Add ") && !item.disabled), "Available controls are not truthful buttons");
  assert(availability.enquiry.every(item => item.tag === "A" && item.text === "Enquire" && item.label?.startsWith("Enquire about ") && item.href?.startsWith("mailto:") && !item.cartBinding), "Unavailable controls are not truthful enquiry links");

  const positiveControls = await evaluate(page, "window.__mmAudit.positiveControls()");
  const positiveKinds = new Set(positiveControls.map(event => event.kind));
  for (const kind of ["fetch", "xhr", "websocket", "beacon", "window.open", "localStorage", "sessionStorage", "cookie", "form-submit", "history.pushState", "history.replaceState"]) {
    assert(positiveKinds.has(kind), `Positive control did not exercise ${kind}`);
  }
  await evaluate(page, "window.__mmAudit.clear()");
  const initialRequestBaseline = page.trace.requests.length;

  const moon10 = await selectAndAdd(page, "moons", "1", 2);
  assert(moon10.optionLabel === "10 moons" && moon10.unitPriceCents === 2375 && moon10.unitQuantity === 10, `Moon selection mismatch: ${JSON.stringify(moon10)}`);
  let state = await cartState(page);
  assertMoneyState(state, "$23.75", 1, 1);
  assert(state.rows[0].option === "10 moons" && state.rows[0].unit.includes("$23.75") && state.rows[0].lineTotal === "Line total $23.75", "Moon cart line is not exact");
  assert(/Close cart/i.test(state.active), `Initial cart focus was not Close cart: ${state.active}`);
  await closeWithEscape(page);
  assert((await evaluate(page, "document.activeElement?.getAttribute('aria-label')")) === "Add Peppermint Moon to cart", "Escape did not return focus to opener");

  const banana20 = await selectAndAdd(page, "bananas", "0", 3);
  assert(banana20.optionLabel === "20 bananas" && banana20.unitPriceCents === 5099 && banana20.unitQuantity === 20, `Banana selection mismatch: ${JSON.stringify(banana20)}`);
  state = await cartState(page);
  assertMoneyState(state, "$74.74", 2, 2);
  await evaluate(page, "document.querySelector('[data-mm-close-cart]').click()");
  await waitFor(page, "!document.getElementById('mmCartDialog').classList.contains('is-open')");

  const eclipseValue = await selectAndAdd(page, "eclipses", "0", 1);
  assert(eclipseValue.optionLabel === "Value pack" && eclipseValue.unitPriceCents === 5999, `Eclipse selection mismatch: ${JSON.stringify(eclipseValue)}`);
  state = await cartState(page);
  assertMoneyState(state, "$134.73", 3, 3);
  await evaluate(page, "document.querySelector('[data-mm-close-cart]').click()");
  await waitFor(page, "!document.getElementById('mmCartDialog').classList.contains('is-open')");

  const moon5 = await selectAndAdd(page, "moons", "1", 1);
  assert(moon5.optionLabel === "5 moons" && moon5.unitPriceCents === 1219, `Second Moon option mismatch: ${JSON.stringify(moon5)}`);
  state = await cartState(page);
  assertMoneyState(state, "$146.92", 4, 4);
  await evaluate(page, "document.querySelector('[data-mm-close-cart]').click()");
  await waitFor(page, "!document.getElementById('mmCartDialog').classList.contains('is-open')");
  await selectAndAdd(page, "moons", "1", 1);
  state = await cartState(page);
  assertMoneyState(state, "$159.11", 5, 4);
  const moon5Line = state.rows.find(row => row.option === "5 moons");
  assert(moon5Line.quantity === 2 && moon5Line.lineTotal === "Line total $24.38", `Re-add changed wrong line: ${JSON.stringify(moon5Line)}`);

  const moon10Key = state.rows.find(row => row.option === "10 moons").key;
  await evaluate(page, `document.querySelector('[data-mm-line-key="${moon10Key}"][data-mm-quantity="1"]').click()`);
  state = await cartState(page);
  assertMoneyState(state, "$182.86", 6, 4);
  assert(state.rows.find(row => row.option === "10 moons").lineTotal === "Line total $47.50", "Increment line total incorrect");
  await evaluate(page, `document.querySelector('[data-mm-line-key="${moon10Key}"][data-mm-quantity="-1"]').click()`);
  state = await cartState(page);
  assertMoneyState(state, "$159.11", 5, 4);
  const bananaKey = state.rows.find(row => row.option === "20 bananas").key;
  await evaluate(page, `document.querySelector('[data-mm-remove="${bananaKey}"]').click()`);
  state = await cartState(page);
  assertMoneyState(state, "$108.12", 4, 3);

  const focusTrap = await evaluate(page, `(() => {
    const dialog = document.getElementById('mmCartDialog');
    const candidates = [...dialog.querySelectorAll('button:not([disabled]):not([hidden]), [href]:not([hidden]), input:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"]):not([hidden])')].filter(el => el.getClientRects().length);
    candidates[candidates.length - 1].focus();
    return { first: candidates[0].getAttribute('aria-label') || candidates[0].textContent.trim(), last: candidates[candidates.length - 1].textContent.trim() };
  })()`);
  await key(page, "Tab");
  assert((await evaluate(page, "document.activeElement?.getAttribute('aria-label')")) === "Close cart", `Forward Tab escaped trap: ${JSON.stringify(focusTrap)}`);
  await key(page, "Tab", 8);
  assert((await evaluate(page, "document.activeElement?.textContent.trim()")) === "Continue shopping", "Shift-Tab did not wrap to last focusable");

  const surface = await interactionSurface(page);
  assert(surface.targetFailures.length === 0, `Cart target failures: ${JSON.stringify(surface.targetFailures)}`);
  assert(surface.overflow.document <= 0 && surface.overflow.dialog <= 0 && surface.overflow.body <= 0, `Overflow before zoom: ${JSON.stringify(surface.overflow)}`);
  assert(surface.dialog.role === "dialog" && surface.dialog.modal === "true" && surface.dialog.labelledby && surface.dialog.describedby, `Dialog semantics failed: ${JSON.stringify(surface.dialog)}`);
  assert(/No order, payment or personal information will be submitted/i.test(surface.notice), "Private-demo notice missing");
  assert(surface.disclosure.visible, "Disclosure was removed while cart was used");
  const shot = await screenshot(page, "cart-390-mixed.png");

  await page.cdp.call("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
  await delay(150);
  const zoom = await interactionSurface(page);
  assert(zoom.overflow.document <= 0 && zoom.overflow.dialog <= 0 && zoom.overflow.body <= 0, `Overflow at 200%: ${JSON.stringify(zoom.overflow)}`);
  await page.cdp.call("Emulation.setPageScaleFactor", { pageScaleFactor: 1 });

  const initialActionEvents = await evaluate(page, "window.__mmAudit.events");
  const initialActionRequests = page.trace.requests.slice(initialRequestBaseline);

  await evaluate(page, "document.querySelector('[data-mm-close-cart]').click()");
  await waitFor(page, "!document.getElementById('mmCartDialog').classList.contains('is-open')");
  await navigate(page, `${ORIGIN}/homepage.html?cart-qa=1`);
  await waitFor(page, "document.querySelector('[data-mm-open-cart]')");
  await evaluate(page, "document.querySelector('[data-mm-open-cart]').click()");
  await waitFor(page, "document.getElementById('mmCartDialog')?.classList.contains('is-open')");
  state = await cartState(page);
  assertMoneyState(state, "$108.12", 4, 3);
  await navigate(page, `${ORIGIN}/shop.html?cart-qa=1`);
  await waitFor(page, "document.querySelectorAll('.pcard[data-mm-availability]').length === 24");
  await evaluate(page, "window.__mmAudit.clear()");
  const checkoutRequestBaseline = page.trace.requests.length;
  await evaluate(page, "document.querySelector('[data-mm-open-cart]').click()");
  await waitFor(page, "document.getElementById('mmCartDialog')?.classList.contains('is-open')");
  state = await cartState(page);
  assertMoneyState(state, "$108.12", 4, 3);

  await evaluate(page, "document.querySelector('[data-mm-cart-primary]').click()");
  await waitFor(page, "document.querySelector('[data-mm-cart-title]').textContent === 'Checkout'");
  const checkout = await evaluate(page, `({ title: document.querySelector('[data-mm-cart-title]').textContent, subtotal: document.querySelector('[data-mm-checkout-subtotal]').textContent, fields: document.querySelectorAll('#mmCartDialog input, #mmCartDialog form').length, copy: document.querySelector('[data-mm-checkout-stage]').textContent.replace(/\\s+/g,' ').trim() })`);
  assert(checkout.subtotal === "$108.12" && checkout.fields === 0 && /Review mode/.test(checkout.copy), `Checkout truth failed: ${JSON.stringify(checkout)}`);
  await evaluate(page, "document.querySelector('[data-mm-cart-primary]').click()");
  await waitFor(page, "document.querySelector('[data-mm-cart-title]').textContent === 'Thank you'");
  const completeCopy = await evaluate(page, "document.querySelector('[data-mm-complete-stage]').textContent.replace(/\\s+/g,' ').trim()");
  assert(/No order was created, no email was sent, and no payment or personal information was collected/.test(completeCopy), "Demo-complete truth missing");
  await evaluate(page, "document.querySelector('[data-mm-cart-secondary]').click()");
  await waitFor(page, "!document.getElementById('mmCartDialog').classList.contains('is-open')");
  state = await cartState(page);
  assertMoneyState(state, "$0.00", 0, 0);
  assert(state.empty, "Empty state did not return after demo close");

  const actions = initialActionEvents.concat(await evaluate(page, "window.__mmAudit.events"));
  const forbiddenActions = actions.filter(event => ["fetch", "xhr", "websocket", "beacon", "window.open", "localStorage", "cookie", "form-submit", "history.pushState", "history.replaceState"].includes(event.kind));
  assert(forbiddenActions.length === 0, `Cart produced forbidden side effects: ${JSON.stringify(forbiddenActions)}`);
  assert(actions.some(event => event.kind === "sessionStorage" && event.detail === STORAGE_KEY), "Cart did not persist through sessionStorage");
  assert((await evaluate(page, "Object.keys(localStorage).length")) === 0, "Cart created localStorage state");
  assert((await evaluate(page, "document.cookie")) === "", "Cart created cookie state");
  assert((await evaluate(page, "location.href")) === `${ORIGIN}/shop.html?cart-qa=1`, "Cart changed navigation");
  const actionRequests = initialActionRequests.concat(page.trace.requests.slice(checkoutRequestBaseline));
  const externalActionRequests = actionRequests.filter(request => !request.url.startsWith(ORIGIN) && !request.url.startsWith("data:"));
  assert(externalActionRequests.length === 0, `External action requests: ${JSON.stringify(externalActionRequests)}`);

  const badResponses = page.trace.responses.filter(response => response.status >= 400);
  assert(badResponses.length === 0, `HTTP errors: ${JSON.stringify(badResponses)}`);
  assert(page.trace.failures.length === 0, `Network failures: ${JSON.stringify(page.trace.failures)}`);
  assert(page.trace.exceptions.length === 0, `Runtime exceptions: ${JSON.stringify(page.trace.exceptions)}`);
  assert(page.trace.consoleErrors.length === 0, `Console errors: ${JSON.stringify(page.trace.consoleErrors)}`);

  const report = {
    width: 390,
    initial,
    availability,
    positive_control_kinds: [...positiveKinds].sort(),
    selections: { moon10, banana20, eclipseValue, moon5 },
    persistence_subtotal: "$108.12",
    final_state: state,
    focus_trap: focusTrap,
    zoom_200: zoom.overflow,
    screenshot: shot,
    action_events: actions,
    action_requests: actionRequests,
    trace: page.trace
  };
  page.cdp.close();
  return report;
}

async function widthSmoke(width) {
  const page = await createPage(width);
  await navigate(page, `${ORIGIN}/shop.html?cart-qa=1`);
  await waitFor(page, "document.querySelectorAll('.pcard[data-mm-availability]').length === 24");
  assert((await cartState(page)).count === 0, `${width}: fresh tab cart not empty`);
  await selectAndAdd(page, "moons", "1", 1);
  await delay(450);
  const state = await cartState(page);
  assertMoneyState(state, "$12.19", 1, 1);
  const surface = await interactionSurface(page);
  assert(surface.innerWidth === width, `${width}: measured ${surface.innerWidth}`);
  assert(surface.targetFailures.length === 0, `${width}: target failures ${JSON.stringify(surface.targetFailures)}`);
  assert(surface.overflow.document <= 0 && surface.overflow.dialog <= 0 && surface.overflow.body <= 0, `${width}: overflow ${JSON.stringify(surface.overflow)}`);
  assert(surface.dialog.rect.left >= -0.5 && surface.dialog.rect.right <= width + 0.5, `${width}: dialog not fully inside viewport ${JSON.stringify(surface.dialog.rect)}`);
  const shot = await screenshot(page, `cart-${width}-option.png`);
  await page.cdp.call("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
  await delay(120);
  const zoom = await interactionSurface(page);
  assert(zoom.overflow.document <= 0 && zoom.overflow.dialog <= 0 && zoom.overflow.body <= 0, `${width}: 200% overflow ${JSON.stringify(zoom.overflow)}`);
  assert(page.trace.responses.every(response => response.status < 400), `${width}: HTTP error`);
  assert(page.trace.failures.length === 0 && page.trace.exceptions.length === 0 && page.trace.consoleErrors.length === 0, `${width}: runtime/network error`);
  page.cdp.close();
  return { width, state, surface, zoom_200: zoom.overflow, screenshot: shot, trace: page.trace };
}

async function freshAndCorruptStorage() {
  const fresh = await createPage(390);
  await navigate(fresh, `${ORIGIN}/shop.html?cart-qa=1`);
  await waitFor(fresh, "document.querySelectorAll('.pcard[data-mm-availability]').length === 24");
  const freshState = await cartState(fresh);
  assertMoneyState(freshState, "$0.00", 0, 0);
  fresh.cdp.close();

  const corrupt = await createPage(390, `sessionStorage.setItem('${STORAGE_KEY}', '{bad json');`);
  await navigate(corrupt, `${ORIGIN}/shop.html?cart-qa=1`);
  await waitFor(corrupt, "document.querySelectorAll('.pcard[data-mm-availability]').length === 24");
  const corruptState = await cartState(corrupt);
  assertMoneyState(corruptState, "$0.00", 0, 0);
  assert(JSON.stringify(corruptState.stored) === "[]", `Corrupt storage was not reset safely: ${JSON.stringify(corruptState.stored)}`);
  assert(corrupt.trace.exceptions.length === 0, `Corrupt storage threw: ${JSON.stringify(corrupt.trace.exceptions)}`);
  corrupt.cdp.close();

  const legacyPayload = JSON.stringify([
    { id: "bars-0", name: "Pure Carob & Cacao Butter", price: "$12.95", size: "90g", image: "", imageAlt: "", quantity: 2 },
    { id: "moons-1", name: "Peppermint Moon", price: "From $2.50 each", size: "12g", image: "", imageAlt: "", quantity: 1 },
    { id: "eclipses-0", name: "Pecan Nut Eclipse Bite", price: "$5.99–$59.99", size: "50g", image: "", imageAlt: "", quantity: 1 }
  ]);
  const legacy = await createPage(390, `sessionStorage.setItem('${STORAGE_KEY}', ${JSON.stringify(legacyPayload)});`);
  await navigate(legacy, `${ORIGIN}/shop.html?cart-qa=1`);
  await waitFor(legacy, "document.querySelectorAll('.pcard[data-mm-availability]').length === 24");
  const legacyState = await cartState(legacy);
  assertMoneyState(legacyState, "$25.90", 2, 1);
  assert(legacyState.stored[0].unitPriceCents === 1295 && !("price" in legacyState.stored[0]), `Legacy migration unsafe: ${JSON.stringify(legacyState.stored)}`);
  legacy.cdp.close();
  return { fresh: freshState, corrupt: corruptState, legacy: legacyState };
}

(async () => {
  fs.mkdirSync(SCREENSHOTS, { recursive: true });
  const report = {
    schema: "maplemoon-cart-option-subtotal-runtime/v1",
    started_at: new Date().toISOString(),
    exhaustive_390: await exhaustive390(),
    width_900: await widthSmoke(900),
    width_1440: await widthSmoke(1440),
    storage_controls: await freshAndCorruptStorage(),
    completed_at: new Date().toISOString(),
    outcome: "PASS"
  };
  fs.writeFileSync(path.join(OUT, "results", "runtime-audit.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify({ outcome: report.outcome, screenshots: [report.exhaustive_390.screenshot, report.width_900.screenshot, report.width_1440.screenshot], subtotal: report.exhaustive_390.persistence_subtotal }, null, 2));
})().catch((error) => {
  const failure = {
    schema: "maplemoon-cart-option-subtotal-runtime/v1",
    outcome: "FAIL",
    failed_at: new Date().toISOString(),
    error: error.stack || String(error)
  };
  fs.mkdirSync(path.join(OUT, "results"), { recursive: true });
  fs.writeFileSync(path.join(OUT, "results", "runtime-audit.json"), JSON.stringify(failure, null, 2) + "\n");
  console.error(failure.error);
  process.exit(1);
});
