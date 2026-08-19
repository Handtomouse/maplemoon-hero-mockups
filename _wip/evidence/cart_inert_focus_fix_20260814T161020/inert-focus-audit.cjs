const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const ORIGIN = "http://127.0.0.1:4402";
const OUT = __dirname;
const SCREENSHOTS = path.join(OUT, "screenshots");
const STORAGE_KEY = "maplemoon_review_cart_v2";

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const lifecycleInstrumentation = () => {
  const NativeMutationObserver = window.MutationObserver;
  const directBodyObservers = new Set();
  let bodyObserveCalls = 0;
  let bodyDisconnectCalls = 0;
  window.MutationObserver = class AuditMutationObserver extends NativeMutationObserver {
    observe(target, options) {
      if (target === document.body && options?.childList && !options?.subtree) {
        directBodyObservers.add(this);
        bodyObserveCalls += 1;
      }
      return super.observe(target, options);
    }
    disconnect() {
      if (directBodyObservers.delete(this)) bodyDisconnectCalls += 1;
      return super.disconnect();
    }
  };

  const nativeAdd = Document.prototype.addEventListener;
  const nativeRemove = Document.prototype.removeEventListener;
  const containmentListeners = new Set();
  let containmentAdds = 0;
  let containmentRemoves = 0;
  const isCartContainment = (type, listener) =>
    type === "focusin" && String(listener).includes("containmentActive");
  Document.prototype.addEventListener = function (type, listener, options) {
    if (this === document && isCartContainment(type, listener)) {
      containmentListeners.add(listener);
      containmentAdds += 1;
    }
    return nativeAdd.call(this, type, listener, options);
  };
  Document.prototype.removeEventListener = function (type, listener, options) {
    if (this === document && isCartContainment(type, listener)) {
      if (containmentListeners.delete(listener)) containmentRemoves += 1;
    }
    return nativeRemove.call(this, type, listener, options);
  };
  window.__mmLifecycleAudit = () => ({
    observerActive: directBodyObservers.size,
    bodyObserveCalls,
    bodyDisconnectCalls,
    containmentActive: containmentListeners.size,
    containmentAdds,
    containmentRemoves
  });
};

async function makePage(browser, width) {
  const context = await browser.newContext({
    viewport: { width, height: width === 390 ? 844 : 900 },
    deviceScaleFactor: 1
  });
  await context.addInitScript(lifecycleInstrumentation);
  const page = await context.newPage();
  const trace = { consoleErrors: [], pageErrors: [], failedRequests: [], badResponses: [] };
  page.on("console", (message) => {
    if (message.type() === "error") trace.consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => trace.pageErrors.push(error.message));
  page.on("requestfailed", (request) =>
    trace.failedRequests.push(`${request.url()} :: ${request.failure()?.errorText || "failed"}`)
  );
  page.on("response", (response) => {
    if (response.url().startsWith(ORIGIN) && response.status() >= 400) {
      trace.badResponses.push(`${response.status()} ${response.url()}`);
    }
  });
  const response = await page.goto(`${ORIGIN}/shop.html?cart-qa=1`, { waitUntil: "load" });
  assert(response?.status() === 200, `${width}: Shop HTTP ${response?.status()}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.querySelectorAll(".pcard[data-mm-availability]").length === 24);
  return { context, page, trace, width };
}

async function currentLifecycle(page) {
  return page.evaluate(() => window.__mmLifecycleAudit());
}

async function stateSnapshot(page) {
  return page.evaluate(() => {
    const dialog = document.getElementById("mmCartDialog");
    const overlay = document.querySelector("[data-mm-cart-overlay]");
    let nextId = 0;
    const branches = [...document.body.children]
      .filter((element) => element !== dialog && element !== overlay)
      .map((element) => {
        if (!element.dataset.mmAuditBranch) {
          nextId += 1;
          element.dataset.mmAuditBranch = `branch-${nextId}-${element.tagName.toLowerCase()}`;
        }
        return {
          id: element.dataset.mmAuditBranch,
          tag: element.tagName.toLowerCase(),
          inert: element.hasAttribute("inert") && element.inert
        };
      });
    return { branches };
  });
}

async function waitOpen(page) {
  await page.waitForFunction(() => document.getElementById("mmCartDialog")?.classList.contains("is-open"));
  await page.waitForTimeout(450);
}

async function waitClosed(page) {
  await page.waitForFunction(() => !document.getElementById("mmCartDialog")?.classList.contains("is-open"));
  await page.waitForTimeout(70);
}

async function assertOpenBoundary(page, width, { dynamic = false } = {}) {
  const opened = await page.evaluate(async (withDynamic) => {
    const dialog = document.getElementById("mmCartDialog");
    const overlay = document.querySelector("[data-mm-cart-overlay]");
    const outside = [...document.body.children].filter(
      (element) => element !== dialog && element !== overlay
    );
    const target =
      document.querySelector("[data-mm-menu-toggle]") ||
      document.querySelector("main a[href], main button:not([disabled])");
    target?.focus();
    const programmaticFocus = {
      escaped: document.activeElement === target,
      activeInsideDialog: dialog.contains(document.activeElement),
      targetInertAncestor: Boolean(target?.closest("[inert]"))
    };

    let dynamicBranch = null;
    if (withDynamic) {
      const branch = document.createElement("section");
      branch.dataset.mmDynamicBranch = "true";
      const button = document.createElement("button");
      button.textContent = "Injected outside control";
      branch.appendChild(button);
      document.body.appendChild(branch);
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
      button.focus();
      const nativeAttempt = {
        inert: branch.hasAttribute("inert") && branch.inert,
        escaped: document.activeElement === button,
        activeInsideDialog: dialog.contains(document.activeElement)
      };
      branch.removeAttribute("inert");
      button.focus();
      const fallbackAttempt = {
        redirected: dialog.contains(document.activeElement),
        activeLabel:
          document.activeElement?.getAttribute("aria-label") ||
          document.activeElement?.textContent?.trim() ||
          document.activeElement?.tagName
      };
      branch.setAttribute("inert", "");
      dynamicBranch = { nativeAttempt, fallbackAttempt };
    }

    const buttons = [...dialog.querySelectorAll("button")]
      .filter((element) => element.getClientRects().length)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          label: element.getAttribute("aria-label") || element.textContent.trim(),
          width: rect.width,
          height: rect.height
        };
      });
    const rect = dialog.getBoundingClientRect();
    return {
      outsideCount: outside.length,
      outsideInert: outside.filter((element) => element.hasAttribute("inert") && element.inert).length,
      outsideBranches: outside.map((element) => ({
        id: element.dataset.mmAuditBranch || "",
        tag: element.tagName.toLowerCase(),
        inert: element.hasAttribute("inert") && element.inert
      })),
      programmaticFocus,
      dynamicBranch,
      initialFocus: document.activeElement?.getAttribute("aria-label") || "",
      dialog: {
        role: dialog.getAttribute("role"),
        modal: dialog.getAttribute("aria-modal"),
        hidden: dialog.getAttribute("aria-hidden"),
        inert: dialog.hasAttribute("inert"),
        rect: { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left }
      },
      buttons,
      overflow: {
        document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        dialog: dialog.scrollWidth - dialog.clientWidth,
        body: document.querySelector("[data-mm-cart-body]").scrollWidth - document.querySelector("[data-mm-cart-body]").clientWidth
      }
    };
  }, dynamic);
  assert(opened.outsideCount > 0, `${width}: no outside branches`);
  assert(opened.outsideInert === opened.outsideCount, `${width}: inert ${opened.outsideInert}/${opened.outsideCount}`);
  assert(!opened.programmaticFocus.escaped && opened.programmaticFocus.activeInsideDialog, `${width}: programmatic focus escaped`);
  assert(opened.programmaticFocus.targetInertAncestor, `${width}: focus target lacks inert ancestor`);
  assert(opened.dialog.role === "dialog" && opened.dialog.modal === "true" && opened.dialog.hidden === "false" && !opened.dialog.inert, `${width}: dialog semantics ${JSON.stringify(opened.dialog)}`);
  assert(opened.dialog.rect.left >= -0.5 && opened.dialog.rect.right <= width + 0.5, `${width}: dialog outside viewport ${JSON.stringify(opened.dialog.rect)}`);
  assert(opened.buttons.every((button) => button.width >= 44 && button.height >= 44), `${width}: sub-44px control ${JSON.stringify(opened.buttons)}`);
  assert(Object.values(opened.overflow).every((value) => value <= 0), `${width}: overflow ${JSON.stringify(opened.overflow)}`);
  if (dynamic) {
    assert(opened.dynamicBranch.nativeAttempt.inert, "dynamic branch was not inerted");
    assert(!opened.dynamicBranch.nativeAttempt.escaped && opened.dynamicBranch.nativeAttempt.activeInsideDialog, "dynamic branch focus escaped");
    assert(opened.dynamicBranch.fallbackAttempt.redirected, "focusin fallback did not redirect");
  }
  const lifecycle = await currentLifecycle(page);
  assert(lifecycle.observerActive === 1 && lifecycle.containmentActive === 1, `${width}: modal lifecycle not singular ${JSON.stringify(lifecycle)}`);
  return { ...opened, lifecycle };
}

async function verifyZoomAndTrap(page, width) {
  const close = page.locator("[data-mm-close-cart]");
  const secondary = page.locator("[data-mm-cart-secondary]");
  await close.focus();
  await page.keyboard.press("Shift+Tab");
  const shiftWrap = await page.evaluate(() => document.activeElement?.hasAttribute("data-mm-cart-secondary"));
  await secondary.focus();
  await page.keyboard.press("Tab");
  const forwardWrap = await page.evaluate(() => document.activeElement?.hasAttribute("data-mm-close-cart"));
  assert(shiftWrap && forwardWrap, `${width}: Tab containment failed`);

  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
  await page.waitForTimeout(120);
  const zoom = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    dialog: document.getElementById("mmCartDialog").scrollWidth - document.getElementById("mmCartDialog").clientWidth,
    body: document.querySelector("[data-mm-cart-body]").scrollWidth - document.querySelector("[data-mm-cart-body]").clientWidth
  }));
  await cdp.send("Emulation.setPageScaleFactor", { pageScaleFactor: 1 });
  assert(Object.values(zoom).every((value) => value <= 0), `${width}: zoom overflow ${JSON.stringify(zoom)}`);
  return { shiftWrap, forwardWrap, zoom };
}

async function mainWidth(browser, width) {
  const run = await makePage(browser, width);
  const { page, trace } = run;
  const opener = ".mm-cart-qa-button[data-mm-open-cart]";
  const preseed = await page.evaluate(() => {
    const dialog = document.getElementById("mmCartDialog");
    const overlay = document.querySelector("[data-mm-cart-overlay]");
    const qaOpener = document.querySelector(".mm-cart-qa-button[data-mm-open-cart]");
    const candidates = [...document.body.children].filter(
      (element) => element !== dialog && element !== overlay
    );
    const branch =
      candidates.find(
        (element) =>
          !element.contains(qaOpener) && !element.matches("script, style, link")
      ) || candidates[0];
    if (!branch) return null;
    branch.setAttribute("inert", "");
    branch.dataset.mmPreseedInert = "true";
    return branch.tagName.toLowerCase();
  });
  assert(preseed, `${width}: no direct branch available to preseed`);
  const before = await stateSnapshot(page);
  await page.locator(opener).click();
  await waitOpen(page);
  const opened = await assertOpenBoundary(page, width, { dynamic: width === 390 });
  const trap = await verifyZoomAndTrap(page, width);
  const screenshot = path.join(SCREENSHOTS, `cart-inert-${width}.png`);
  await page.screenshot({ path: screenshot });
  await page.locator("[data-mm-close-cart]").click();
  await waitClosed(page);
  const after = await stateSnapshot(page);
  const restoration = await page.evaluate(() => {
    const preseedBranch = document.querySelector('[data-mm-preseed-inert="true"]');
    const dynamicBranch = document.querySelector('[data-mm-dynamic-branch="true"]');
    return {
      preseedStillInert: Boolean(preseedBranch?.hasAttribute("inert") && preseedBranch.inert),
      dynamicRestoredNotInert: dynamicBranch ? !dynamicBranch.hasAttribute("inert") && !dynamicBranch.inert : null,
      openerReturned: document.activeElement?.matches(".mm-cart-qa-button[data-mm-open-cart]") === true,
      dialogClosedInert: document.getElementById("mmCartDialog").hasAttribute("inert")
    };
  });
  const comparableAfter = after.branches.filter((branch) => !branch.id.includes("section"));
  assert(JSON.stringify(before.branches) === JSON.stringify(comparableAfter), `${width}: branch restore mismatch\nbefore=${JSON.stringify(before.branches)}\nafter=${JSON.stringify(after.branches)}`);
  assert(restoration.preseedStillInert && restoration.openerReturned && restoration.dialogClosedInert, `${width}: restore failed ${JSON.stringify(restoration)}`);
  if (width === 390) assert(restoration.dynamicRestoredNotInert, "dynamic branch inert leaked after close");
  const lifecycle = await currentLifecycle(page);
  assert(lifecycle.observerActive === 0 && lifecycle.containmentActive === 0, `${width}: lifecycle leaked ${JSON.stringify(lifecycle)}`);
  assert(trace.consoleErrors.length === 0 && trace.pageErrors.length === 0 && trace.failedRequests.length === 0 && trace.badResponses.length === 0, `${width}: runtime errors ${JSON.stringify(trace)}`);
  await run.context.close();
  return { width, preseed, before, opened, trap, restoration, lifecycle, screenshot: { path: path.relative(OUT, screenshot), bytes: fs.statSync(screenshot).size }, trace };
}

async function closeRoute(browser, route) {
  const run = await makePage(browser, 390);
  const { page, trace } = run;
  const qaOpener = page.locator(".mm-cart-qa-button[data-mm-open-cart]");
  const before = await stateSnapshot(page);
  let openerSelector = ".mm-cart-qa-button[data-mm-open-cart]";
  if (route === "complete") {
    const add = page.locator('.pcard[data-mm-availability="available"] [data-mm-add-product]').first();
    openerSelector = await add.evaluate((element) => {
      element.dataset.mmCompleteOpener = "true";
      return '[data-mm-complete-opener="true"]';
    });
    await add.click();
  } else {
    await qaOpener.click();
  }
  await waitOpen(page);
  await assertOpenBoundary(page, 390);

  let pointerBackgroundClicks = null;
  if (route === "x") {
    await page.locator("[data-mm-close-cart]").click();
  } else if (route === "overlay") {
    const point = await page.evaluate(() => {
      const target = document.querySelector("[data-mm-menu-toggle]");
      window.__mmPointerBackgroundClicks = 0;
      target.addEventListener("click", () => { window.__mmPointerBackgroundClicks += 1; });
      const rect = target.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });
    await page.mouse.click(point.x, point.y);
    pointerBackgroundClicks = await page.evaluate(() => window.__mmPointerBackgroundClicks);
    assert(pointerBackgroundClicks === 0, `overlay: background received pointer click ${pointerBackgroundClicks}`);
  } else if (route === "escape") {
    await page.keyboard.press("Escape");
  } else if (route === "secondary") {
    await page.locator("[data-mm-cart-secondary]").click();
  } else if (route === "complete") {
    await page.locator("[data-mm-cart-primary]").click();
    await page.waitForFunction(() => document.querySelector("[data-mm-cart-title]").textContent === "Checkout");
    await page.locator("[data-mm-cart-primary]").click();
    await page.waitForFunction(() => document.querySelector("[data-mm-cart-title]").textContent === "Thank you");
    await page.locator("[data-mm-cart-primary]").click();
  }
  await waitClosed(page);
  const after = await stateSnapshot(page);
  const closed = await page.evaluate(({ openerSelector, storageKey }) => ({
    openerReturned: document.activeElement?.matches(openerSelector) === true,
    cartCount: Number(document.querySelector("[data-mm-cart-count]")?.textContent || 0),
    stored: JSON.parse(sessionStorage.getItem(storageKey) || "[]"),
    lifecycle: window.__mmLifecycleAudit()
  }), { openerSelector, storageKey: STORAGE_KEY });
  assert(JSON.stringify(before.branches) === JSON.stringify(after.branches), `${route}: direct branch state did not restore`);
  assert(closed.openerReturned, `${route}: focus did not return to opener`);
  assert(closed.lifecycle.observerActive === 0 && closed.lifecycle.containmentActive === 0, `${route}: lifecycle leak ${JSON.stringify(closed.lifecycle)}`);
  if (route === "complete") assert(closed.cartCount === 0 && closed.stored.length === 0, `complete: cart did not clear ${JSON.stringify(closed)}`);
  assert(trace.consoleErrors.length === 0 && trace.pageErrors.length === 0 && trace.failedRequests.length === 0 && trace.badResponses.length === 0, `${route}: runtime errors ${JSON.stringify(trace)}`);
  await run.context.close();
  return { route, pointerBackgroundClicks, closed, trace };
}

async function headerOwnership(browser) {
  const run = await makePage(browser, 390);
  const { page, trace } = run;
  const before = await page.evaluate(() => ({
    menuState: document.querySelector("[data-mm-chrome]")?.getAttribute("data-mm-menu-state"),
    primaryInert: document.querySelector("[data-mm-primary-nav]")?.hasAttribute("inert"),
    utilityInert: document.querySelector("[data-mm-utility-nav]")?.hasAttribute("inert")
  }));
  assert(before.menuState === "closed" && before.primaryInert && before.utilityInert, `header precondition failed ${JSON.stringify(before)}`);
  const opener = page.locator("[data-mm-cart-toggle]");
  await opener.click();
  await waitOpen(page);
  await assertOpenBoundary(page, 390);
  await page.locator("[data-mm-close-cart]").click();
  await waitClosed(page);
  const after = await page.evaluate(() => ({
    menuState: document.querySelector("[data-mm-chrome]")?.getAttribute("data-mm-menu-state"),
    primaryInert: document.querySelector("[data-mm-primary-nav]")?.hasAttribute("inert"),
    utilityInert: document.querySelector("[data-mm-utility-nav]")?.hasAttribute("inert"),
    openerReturned: document.activeElement?.hasAttribute("data-mm-cart-toggle") === true,
    lifecycle: window.__mmLifecycleAudit()
  }));
  assert(after.menuState === "closed" && after.primaryInert && after.utilityInert && after.openerReturned, `header ownership failed ${JSON.stringify(after)}`);
  assert(after.lifecycle.observerActive === 0 && after.lifecycle.containmentActive === 0, `header lifecycle leak ${JSON.stringify(after.lifecycle)}`);
  assert(trace.consoleErrors.length === 0 && trace.pageErrors.length === 0 && trace.failedRequests.length === 0 && trace.badResponses.length === 0, `header runtime errors ${JSON.stringify(trace)}`);
  await run.context.close();
  return { before, after, trace };
}

async function repeatedCyclesAndAlreadyOpen(browser) {
  const run = await makePage(browser, 390);
  const { page, trace } = run;
  const qa = page.locator(".mm-cart-qa-button[data-mm-open-cart]");
  const cycles = [];
  for (let index = 0; index < 3; index += 1) {
    const before = await stateSnapshot(page);
    await qa.click();
    await waitOpen(page);
    const lifecycleOpen = await currentLifecycle(page);
    let alreadyOpen = null;
    if (index === 0) {
      alreadyOpen = await page.evaluate(() => {
        const otherTrigger = document.querySelector("[data-mm-cart-toggle]");
        otherTrigger.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        return window.__mmLifecycleAudit();
      });
      assert(alreadyOpen.observerActive === 1 && alreadyOpen.containmentActive === 1 && alreadyOpen.bodyObserveCalls === 1 && alreadyOpen.containmentAdds === 1, `already-open duplicated lifecycle ${JSON.stringify(alreadyOpen)}`);
    }
    await page.keyboard.press("Escape");
    await waitClosed(page);
    const after = await stateSnapshot(page);
    const lifecycleClosed = await currentLifecycle(page);
    const openerReturned = await page.evaluate(() => document.activeElement?.matches(".mm-cart-qa-button[data-mm-open-cart]") === true);
    assert(JSON.stringify(before.branches) === JSON.stringify(after.branches), `cycle ${index + 1}: inert restore mismatch`);
    assert(lifecycleClosed.observerActive === 0 && lifecycleClosed.containmentActive === 0, `cycle ${index + 1}: lifecycle leak ${JSON.stringify(lifecycleClosed)}`);
    assert(lifecycleClosed.bodyObserveCalls === lifecycleClosed.bodyDisconnectCalls && lifecycleClosed.containmentAdds === lifecycleClosed.containmentRemoves, `cycle ${index + 1}: add/remove imbalance ${JSON.stringify(lifecycleClosed)}`);
    assert(openerReturned, `cycle ${index + 1}: opener overwritten`);
    cycles.push({ cycle: index + 1, lifecycleOpen, alreadyOpen, lifecycleClosed, openerReturned });
  }
  assert(trace.consoleErrors.length === 0 && trace.pageErrors.length === 0 && trace.failedRequests.length === 0 && trace.badResponses.length === 0, `cycles: runtime errors ${JSON.stringify(trace)}`);
  await run.context.close();
  return { cycles, trace };
}

(async () => {
  fs.mkdirSync(SCREENSHOTS, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });
  const report = {
    schema: "maplemoon-cart-inert-focus-runtime/v1",
    started_at: new Date().toISOString(),
    agent_browser: { available: false, fallback: "Bundled Playwright with system Google Chrome" },
    widths: [],
    close_routes: [],
    header_ownership: null,
    repeated_cycles: null,
    outcome: "RUNNING"
  };
  for (const width of [390, 900, 1440]) report.widths.push(await mainWidth(browser, width));
  for (const route of ["x", "overlay", "escape", "secondary", "complete"]) {
    report.close_routes.push(await closeRoute(browser, route));
  }
  report.header_ownership = await headerOwnership(browser);
  report.repeated_cycles = await repeatedCyclesAndAlreadyOpen(browser);
  report.completed_at = new Date().toISOString();
  report.outcome = "PASS";
  await browser.close();
  fs.writeFileSync(path.join(OUT, "inert-focus-audit.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    outcome: report.outcome,
    widths: report.widths.map((item) => ({ width: item.width, inert: `${item.opened.outsideInert}/${item.opened.outsideCount}`, screenshot: item.screenshot })),
    close_routes: report.close_routes.map((item) => item.route),
    header_owned_inert_preserved: report.header_ownership.after.primaryInert && report.header_ownership.after.utilityInert,
    cycles: report.repeated_cycles.cycles.length
  }, null, 2));
})().catch((error) => {
  const failure = {
    schema: "maplemoon-cart-inert-focus-runtime/v1",
    outcome: "FAIL",
    failed_at: new Date().toISOString(),
    error: error.stack || String(error)
  };
  fs.writeFileSync(path.join(OUT, "inert-focus-audit.json"), `${JSON.stringify(failure, null, 2)}\n`);
  console.error(failure.error);
  process.exit(1);
});
