const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const baseUrl = 'http://127.0.0.1:4391';
const evidenceDir = '/Users/handtomouse/maplemoon-website/_wip/evidence/content_catalogue_truth_audit_20260814T161450';
const routes = ['homepage', 'our-story', 'carob-story', 'shop', 'faq', 'stockists', 'pure-carob-bar'];
const widths = [390, 1440];

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

async function loadAllImages(page) {
  await page.evaluate(async () => {
    const images = [...document.images];
    for (const image of images) {
      image.loading = 'eager';
      image.scrollIntoView({ block: 'center' });
      await new Promise(resolve => setTimeout(resolve, 12));
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
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(100);
}

async function collectDom(page) {
  return page.evaluate(() => {
    const normal = value => String(value || '').replace(/\s+/g, ' ').trim();
    const visible = element => {
      if (!element || element.hidden || element.closest('[hidden]')) return false;
      const style = getComputedStyle(element);
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && element.getClientRects().length > 0;
    };
    const labelFor = element => {
      if (!element) return '';
      if (element.labels?.length) return normal([...element.labels].map(label => label.textContent).join(' '));
      return normal(element.getAttribute('aria-label'));
    };
    const stableId = element => {
      if (element.id) return `#${element.id}`;
      const data = [...element.attributes].find(attr => attr.name.startsWith('data-mm-') || attr.name.startsWith('data-'));
      if (data) return `[${data.name}${data.value ? `="${data.value}"` : ''}]`;
      return `${element.tagName.toLowerCase()}.${[...element.classList].slice(0, 2).join('.')}`;
    };
    const metas = [...document.querySelectorAll('meta[name], meta[property]')].map(meta => ({
      key: meta.getAttribute('name') || meta.getAttribute('property'),
      content: meta.getAttribute('content') || '',
    }));
    const structuredData = [...document.querySelectorAll('script[type="application/ld+json"]')].map((script, index) => {
      const raw = script.textContent.trim();
      try {
        return { index, valid: true, value: JSON.parse(raw) };
      } catch (error) {
        return { index, valid: false, error: error.message, raw };
      }
    });
    const links = [...document.querySelectorAll('a')].map(link => ({
      id: stableId(link),
      text: normal(link.textContent) || normal(link.getAttribute('aria-label')),
      href: link.getAttribute('href'),
      resolvedHref: link.href,
      visible: visible(link),
    }));
    const buttons = [...document.querySelectorAll('button, input[type="submit"], input[type="button"]')].map(button => ({
      id: stableId(button),
      text: normal(button.textContent || button.value),
      ariaLabel: normal(button.getAttribute('aria-label')),
      type: button.getAttribute('type') || 'submit',
      disabled: Boolean(button.disabled),
      visible: visible(button),
    }));
    const forms = [...document.forms].map(form => ({
      id: stableId(form),
      action: form.getAttribute('action'),
      resolvedAction: form.action,
      method: (form.getAttribute('method') || 'get').toLowerCase(),
      visible: visible(form),
      reviewPrepared: form.dataset.mmReviewForm || null,
      controls: [...form.elements].map(control => ({
        tag: control.tagName.toLowerCase(),
        type: control.type || null,
        name: control.name || null,
        label: labelFor(control),
        placeholder: control.getAttribute('placeholder'),
        required: Boolean(control.required),
        disabled: Boolean(control.disabled),
        autocomplete: control.getAttribute('autocomplete'),
        visible: visible(control),
      })),
    }));
    const images = [...document.images].map(image => ({
      id: stableId(image),
      alt: image.getAttribute('alt'),
      src: image.getAttribute('src'),
      currentSrc: image.currentSrc,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      visible: visible(image),
    }));
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(heading => ({
      level: Number(heading.tagName.slice(1)),
      id: stableId(heading),
      text: normal(heading.textContent),
      visible: visible(heading),
    }));
    const productCards = [...document.querySelectorAll('.pcard')].map(card => {
      const price = card.querySelector('[data-price-label]');
      const selected = card.querySelector('[data-selected-price]');
      const action = card.querySelector('.add, [data-mm-add-product]');
      const select = card.querySelector('.size-select');
      return {
        category: card.dataset.cat,
        order: Number(card.dataset.order),
        name: normal(card.querySelector('h3')?.textContent),
        description: normal(card.querySelector('.d')?.textContent),
        chips: [...card.querySelectorAll('.chips span')].map(item => normal(item.textContent)),
        priceLabel: normal(price?.textContent),
        selectedPrice: normal(selected?.textContent),
        sizeNote: normal(card.querySelector('[data-size-note]')?.textContent),
        priced: card.dataset.priced,
        availability: card.dataset.mmAvailability,
        madeToOrder: normal(card.querySelector('.mto')?.textContent),
        options: select ? [...select.options].map(option => ({
          label: option.dataset.label || normal(option.textContent),
          text: normal(option.textContent),
          value: option.value,
          quantity: option.dataset.quantity,
        })) : [],
        action: action ? {
          tag: action.tagName.toLowerCase(),
          text: normal(action.textContent),
          ariaLabel: normal(action.getAttribute('aria-label')),
          href: action.getAttribute('href'),
        } : null,
        image: card.querySelector('img') ? {
          src: card.querySelector('img').getAttribute('src'),
          alt: card.querySelector('img').getAttribute('alt'),
        } : null,
        visible: visible(card),
      };
    });
    const faqItems = [...document.querySelectorAll('.faq-item')].map(item => ({
      id: item.id,
      category: item.closest('[data-category]')?.dataset.category || null,
      question: normal(item.querySelector('.faq-question')?.textContent.replace(/^\d+/, '').replace(/\+$/, '')),
      answer: normal(item.querySelector('.faq-answer')?.textContent),
      sectionVisible: visible(item.closest('[data-category]')),
    }));
    const stockistRecords = Array.isArray(window.stockists) ? window.stockists.map(item => ({ ...item })) : [];
    const cart = document.getElementById('mmCartDialog');
    return {
      title: document.title,
      language: document.documentElement.lang,
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      metas,
      structuredData,
      bodyVisibleText: normal(document.body.innerText),
      headings,
      links,
      buttons,
      forms,
      images,
      productCards,
      faqItems,
      stockists: {
        totalSourceRecords: stockistRecords.length,
        withheldUnknownRecords: stockistRecords.filter(item => item.state === 'UNKNOWN').length,
        sourceRecords: stockistRecords,
        renderedResults: [...document.querySelectorAll('.st-result')].map(item => ({
          text: normal(item.textContent),
          hidden: item.hidden || item.classList.contains('mm-hide-clean'),
        })),
      },
      cartShell: cart ? {
        allText: normal(cart.textContent),
        visibleText: normal(cart.innerText),
        controls: [...cart.querySelectorAll('button,input,select,a[href]')].map(control => ({
          tag: control.tagName.toLowerCase(),
          text: normal(control.textContent || control.value),
          ariaLabel: normal(control.getAttribute('aria-label')),
          type: control.getAttribute('type'),
          visible: visible(control),
          disabled: Boolean(control.disabled),
        })),
        personalDataInputs: [...cart.querySelectorAll('input,textarea,select')].map(control => ({ type: control.type, name: control.name, label: labelFor(control) })),
      } : null,
      placeholders: links.filter(link => !link.href || link.href === '#' || /^javascript:/i.test(link.href)),
      geometry: {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
      },
      storage: {
        local: Object.fromEntries(Object.entries(localStorage)),
        session: Object.fromEntries(Object.entries(sessionStorage)),
      },
    };
  });
}

async function collectOpenCart(page) {
  await page.evaluate(() => document.querySelector('[data-mm-cart-toggle]')?.click());
  await page.waitForTimeout(120);
  return page.evaluate(() => {
    const dialog = document.getElementById('mmCartDialog');
    const normal = value => String(value || '').replace(/\s+/g, ' ').trim();
    return {
      open: dialog?.classList.contains('is-open') || false,
      ariaHidden: dialog?.getAttribute('aria-hidden'),
      text: normal(dialog?.innerText),
      focused: document.activeElement?.getAttribute('aria-label') || normal(document.activeElement?.textContent),
      personalDataInputs: dialog ? [...dialog.querySelectorAll('input,textarea,select')].length : null,
      controls: dialog ? [...dialog.querySelectorAll('button')].map(button => ({
        text: normal(button.textContent),
        ariaLabel: normal(button.getAttribute('aria-label')),
        disabled: button.disabled,
        hidden: button.hidden,
      })) : [],
    };
  });
}

async function testEmailForms(page) {
  return page.evaluate(async () => {
    const normal = value => String(value || '').replace(/\s+/g, ' ').trim();
    const results = [];
    const before = { local: { ...localStorage }, session: { ...sessionStorage } };
    for (const [index, form] of [...document.querySelectorAll('form:has(input[type="email"])')].entries()) {
      const input = form.querySelector('input[type="email"]');
      input.value = 'audit@example.invalid';
      form.requestSubmit();
      await new Promise(resolve => setTimeout(resolve, 80));
      const statusId = form.getAttribute('aria-describedby');
      const status = statusId ? document.getElementById(statusId) : null;
      results.push({
        index,
        inputCleared: input.value === '',
        statusText: normal(status?.innerText),
        statusVisible: Boolean(status && !status.hidden),
      });
    }
    const after = { local: { ...localStorage }, session: { ...sessionStorage } };
    return {
      forms: results,
      storageBefore: before,
      storageAfter: after,
      emailStored: JSON.stringify(after).includes('audit@example.invalid'),
    };
  });
}

async function run() {
  fs.mkdirSync(evidenceDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const results = [];
  for (const route of routes) {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
      const page = await context.newPage();
      const consoleErrors = [];
      const failedRequests = [];
      const badResponses = [];
      const externalRequests = [];
      const mutationRequests = [];
      page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      page.on('pageerror', error => consoleErrors.push(`PAGEERROR ${error.message}`));
      page.on('requestfailed', request => failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText || 'failed'}`));
      page.on('request', request => {
        if (!request.url().startsWith(baseUrl) && !request.url().startsWith('data:') && !request.url().startsWith('blob:')) externalRequests.push(`${request.method()} ${request.url()}`);
        if (!['GET', 'HEAD'].includes(request.method())) mutationRequests.push(`${request.method()} ${request.url()}`);
      });
      page.on('response', response => { if (response.url().startsWith(baseUrl) && response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`); });
      const response = await page.goto(`${baseUrl}/${route}.html`, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(160);
      await loadAllImages(page);
      const dom = await collectDom(page);
      const fullScreenshot = path.join(evidenceDir, `${route}_${width}_full.png`);
      await page.screenshot({ path: fullScreenshot, fullPage: true });

      let drawer = null;
      let drawerScreenshot = null;
      if (width === 390) {
        await page.evaluate(() => document.querySelector('[data-mm-menu-toggle]')?.click());
        await page.waitForTimeout(100);
        drawer = await page.evaluate(() => {
          const root = document.querySelector('[data-mm-chrome]');
          const normal = value => String(value || '').replace(/\s+/g, ' ').trim();
          return {
            state: root?.getAttribute('data-mm-menu-state'),
            text: normal(root?.innerText),
            rows: [...root.querySelectorAll('[data-mm-primary-nav] > *, [data-mm-utility-nav] > *')]
              .filter(item => getComputedStyle(item).display !== 'none' && item.getBoundingClientRect().height > 0)
              .map(item => ({ text: normal(item.textContent), height: item.getBoundingClientRect().height })),
          };
        });
        drawerScreenshot = path.join(evidenceDir, `${route}_${width}_drawer.png`);
        await page.screenshot({ path: drawerScreenshot, fullPage: false });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(80);
      }

      const cart = await collectOpenCart(page);
      const cartScreenshot = path.join(evidenceDir, `${route}_${width}_cart.png`);
      await page.screenshot({ path: cartScreenshot, fullPage: false });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(80);

      let shopJourney = null;
      if (route === 'shop') {
        await page.evaluate(() => document.querySelector('[data-mm-add-product]')?.click());
        await page.waitForTimeout(120);
        const cartItem = await collectOpenCart(page).catch(() => null);
        const itemScreenshot = path.join(evidenceDir, `${route}_${width}_cart-item.png`);
        await page.screenshot({ path: itemScreenshot, fullPage: false });
        const cartOpen = await page.evaluate(() => document.getElementById('mmCartDialog')?.classList.contains('is-open'));
        if (!cartOpen) await page.evaluate(() => document.querySelector('[data-mm-cart-toggle]')?.click());
        await page.evaluate(() => document.querySelector('[data-mm-cart-primary]')?.click());
        await page.waitForTimeout(100);
        const checkout = await page.evaluate(() => ({
          text: String(document.getElementById('mmCartDialog')?.innerText || '').replace(/\s+/g, ' ').trim(),
          title: document.querySelector('[data-mm-cart-title]')?.textContent.trim(),
          personalDataInputs: document.querySelectorAll('#mmCartDialog input, #mmCartDialog textarea, #mmCartDialog select').length,
        }));
        const checkoutScreenshot = path.join(evidenceDir, `${route}_${width}_checkout.png`);
        await page.screenshot({ path: checkoutScreenshot, fullPage: false });
        await page.evaluate(() => document.querySelector('[data-mm-cart-primary]')?.click());
        await page.waitForTimeout(100);
        const complete = await page.evaluate(() => ({
          text: String(document.getElementById('mmCartDialog')?.innerText || '').replace(/\s+/g, ' ').trim(),
          title: document.querySelector('[data-mm-cart-title]')?.textContent.trim(),
          personalDataInputs: document.querySelectorAll('#mmCartDialog input, #mmCartDialog textarea, #mmCartDialog select').length,
        }));
        const completeScreenshot = path.join(evidenceDir, `${route}_${width}_complete.png`);
        await page.screenshot({ path: completeScreenshot, fullPage: false });
        shopJourney = { cartItem, checkout, complete, screenshots: [itemScreenshot, checkoutScreenshot, completeScreenshot] };
        await page.keyboard.press('Escape');
      }

      let emailForms = null;
      if (width === 390 && (route === 'homepage' || route === 'stockists')) {
        emailForms = await testEmailForms(page);
      }

      results.push({
        route,
        width,
        http: response.status(),
        dom,
        drawer,
        cart,
        shopJourney,
        emailForms,
        consoleErrors,
        failedRequests,
        badResponses,
        externalRequests: [...new Set(externalRequests)],
        mutationRequests: [...new Set(mutationRequests)],
        screenshots: { full: fullScreenshot, drawer: drawerScreenshot, cart: cartScreenshot },
      });
      await context.close();
    }
  }
  await browser.close();
  const resultPath = path.join(evidenceDir, 'browser-results.json');
  fs.writeFileSync(resultPath, `${JSON.stringify(results, null, 2)}\n`);
  const screenshots = fs.readdirSync(evidenceDir).filter(name => name.endsWith('.png'));
  const failures = [];
  for (const row of results) {
    const key = `${row.route}@${row.width}`;
    if (row.http !== 200) failures.push(`${key} HTTP ${row.http}`);
    if (row.dom.geometry.clientWidth !== row.width) failures.push(`${key} measured width ${row.dom.geometry.clientWidth}`);
    if (row.dom.geometry.scrollWidth !== row.width) failures.push(`${key} overflow ${row.dom.geometry.scrollWidth}`);
    if (row.consoleErrors.length || row.failedRequests.length || row.badResponses.length) failures.push(`${key} runtime/request failure`);
    if (row.dom.images.some(image => !image.complete || image.naturalWidth === 0)) failures.push(`${key} broken/pending image`);
    if (!row.cart.open || row.cart.personalDataInputs !== 0) failures.push(`${key} cart state`);
    if (row.width === 390 && (row.drawer?.state !== 'open' || row.drawer.rows.length !== 6)) failures.push(`${key} drawer state`);
  }
  console.log(JSON.stringify({ cases: results.length, screenshots: screenshots.length, failures }, null, 2));
  if (failures.length) process.exitCode = 2;
}

run().catch(error => {
  console.error(error.stack || error);
  process.exit(1);
});
