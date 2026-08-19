const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const origin = 'http://127.0.0.1:4398';
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/integrated_header_cart_cert_20260814T155822';

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  const failedRequests = [];
  const badResponses = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', error => errors.push(`PAGEERROR ${error.message}`));
  page.on('requestfailed', request => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText || 'failed'}`));
  page.on('response', response => { if (response.url().startsWith(origin) && response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`); });

  const response = await page.goto(`${origin}/shop.html?cart-qa=1`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.querySelectorAll('.pcard[data-mm-availability]').length === 24);
  const quick = await page.evaluate(() => ({
    bodyTextLength: document.body.innerText.trim().length,
    title: document.title,
    errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
    keyElements: {
      header: Boolean(document.querySelector('[data-mm-chrome]')),
      shopCards: document.querySelectorAll('.pcard[data-mm-availability]').length,
      cartDialog: Boolean(document.getElementById('mmCartDialog')),
    },
  }));

  const opener = page.locator('[data-mm-open-cart]');
  await opener.focus();
  await opener.click();
  await page.waitForFunction(() => document.getElementById('mmCartDialog')?.classList.contains('is-open'));
  await page.waitForTimeout(80);
  const opened = await page.evaluate(() => {
    const dialog = document.getElementById('mmCartDialog');
    const overlay = document.querySelector('[data-mm-cart-overlay]');
    const outside = [...document.body.children].filter(element => element !== dialog && element !== overlay);
    const backgroundTarget = document.querySelector('main a[href], main button:not([disabled]), header a[href], header button:not([disabled])');
    const beforeProgrammaticFocus = document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim() || document.activeElement?.tagName;
    if (backgroundTarget) backgroundTarget.focus();
    const programmaticFocusEscaped = document.activeElement === backgroundTarget;
    const targetDescription = backgroundTarget ? {
      tag: backgroundTarget.tagName.toLowerCase(),
      text: backgroundTarget.textContent.trim().replace(/\s+/g, ' '),
      href: backgroundTarget.getAttribute('href'),
      inertSelf: backgroundTarget.inert,
      inertAncestor: Boolean(backgroundTarget.closest('[inert]')),
    } : null;
    const buttons = [...dialog.querySelectorAll('button')].filter(element => element.getClientRects().length).map(element => {
      const rect = element.getBoundingClientRect();
      return { label: element.getAttribute('aria-label') || element.textContent.trim(), width: rect.width, height: rect.height };
    });
    return {
      dialog: {
        role: dialog.getAttribute('role'),
        ariaModal: dialog.getAttribute('aria-modal'),
        ariaHidden: dialog.getAttribute('aria-hidden'),
        inertAttribute: dialog.hasAttribute('inert'),
        openClass: dialog.classList.contains('is-open'),
      },
      beforeProgrammaticFocus,
      activeAfterProgrammaticFocus: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim() || document.activeElement?.tagName,
      programmaticFocusEscaped,
      backgroundTarget: targetDescription,
      outsideBranches: outside.map(element => ({
        tag: element.tagName.toLowerCase(),
        id: element.id,
        className: typeof element.className === 'string' ? element.className : '',
        inertAttribute: element.hasAttribute('inert'),
        inertProperty: element.inert,
      })),
      outsideInertCount: outside.filter(element => element.hasAttribute('inert') || element.inert).length,
      outsideCount: outside.length,
      buttons,
      controls44Pass: buttons.every(item => item.width >= 44 && item.height >= 44),
      overflow: {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        dialogClientWidth: dialog.clientWidth,
        dialogScrollWidth: dialog.scrollWidth,
      },
    };
  });
  await page.screenshot({ path: path.join(output, 'cart_inert_failure_390.png'), fullPage: false });

  await page.locator('[data-mm-cart-overlay]').click({ position: { x: 2, y: 2 } });
  await page.waitForFunction(() => !document.getElementById('mmCartDialog')?.classList.contains('is-open'));
  const overlayReturn = await page.evaluate(() => document.activeElement?.hasAttribute('data-mm-open-cart') === true);

  await opener.click();
  await page.waitForFunction(() => document.getElementById('mmCartDialog')?.classList.contains('is-open'));
  await page.waitForTimeout(80);
  const initialFocus = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.getElementById('mmCartDialog')?.classList.contains('is-open'));
  const escapeReturn = await page.evaluate(() => document.activeElement?.hasAttribute('data-mm-open-cart') === true);

  const inertBackgroundPass = opened.outsideInertCount > 0 && !opened.programmaticFocusEscaped;
  const result = {
    schema: 'maplemoon-integrated-cart-inert-probe/v1',
    generatedAt: new Date().toISOString(),
    route: '/shop.html?cart-qa=1',
    viewport: { width: 390, height: 844, deviceScaleFactor: 1 },
    http: response?.status() ?? null,
    agentBrowser: { available: false, fallback: 'Bundled Playwright with system Google Chrome' },
    quickVerification: quick,
    runtime: { errors, failedRequests, badResponses },
    opened,
    closeControls: { overlayReturn, initialFocus, escapeReturn },
    requiredInertBackgroundPass: inertBackgroundPass,
    outcome: inertBackgroundPass ? 'PASS' : 'FAIL_REQUIRED_INERT_BACKGROUND',
  };
  fs.writeFileSync(path.join(output, 'cart_inert_probe.json'), `${JSON.stringify(result, null, 2)}\n`);
  await context.close();
  await browser.close();
  console.log(`INTEGRATED_CART_INERT ${inertBackgroundPass ? 'PASS' : 'FAIL'} http=${result.http} content=${quick.bodyTextLength} outside_inert=${opened.outsideInertCount}/${opened.outsideCount} programmatic_focus_escaped=${opened.programmaticFocusEscaped} initial_focus=${initialFocus} overlay_return=${overlayReturn} escape_return=${escapeReturn} errors=${errors.length + failedRequests.length + badResponses.length}`);
  if (!inertBackgroundPass) process.exitCode = 2;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
