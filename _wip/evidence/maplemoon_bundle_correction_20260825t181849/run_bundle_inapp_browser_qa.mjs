export async function runBundleInAppBrowserQa({ browser, viewportCapability, fs, base, evidence, requestedWidths }) {
  const widths = requestedWidths || [320, 390, 768, 1024, 1440];
  const failures = [];
  const results = [];
  const check = (condition, message) => { if (!condition) failures.push(message); };
  const screenshot = async (tab, name) => fs.writeFileSync(`${evidence}/${name}`, await tab.screenshot({ fullPage: false }));

  for (const width of widths) {
    const height = width <= 390 ? 844 : 1000;
    await viewportCapability.set({ width, height });
    let tab = await browser.tabs.new();
    await viewportCapability.reset();
    await viewportCapability.set({ width, height });
    const record = { width, height, dpr: null, home: {}, shop: {}, logs: [] };
    fs.writeFileSync(`${evidence}/browser_progress.json`, `${JSON.stringify({ width, stage: 'home_start' })}\n`);

    await tab.goto(`${base}/homepage.html`);
    await tab.playwright.waitForLoadState({ state: 'domcontentloaded', timeoutMs: 15000 });
    await tab.playwright.locator('.wf-tab[data-cat="eclipseBites"]').click({ force: true });
    const bundle = tab.playwright.locator('.cf-item.is_bundle');
    await bundle.waitFor({ state: 'attached', timeoutMs: 10000 });
    const centeringLimit = await tab.playwright.locator('.cf-item').count();
    for (let step = 0; step < centeringLimit && !(await bundle.evaluate(element => element.classList.contains('center'))); step += 1) {
      await tab.playwright.locator('.wf-line .arw.r').click({ force: true });
    }
    await tab.playwright.waitForTimeout(250);
    record.home.center = await bundle.evaluate(element => {
      const image = element.querySelector('img');
      const plate = element.querySelector('.cf-bp');
      const stage = document.querySelector('#stage');
      const imageRect = image.getBoundingClientRect();
      const plateRect = plate.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      return {
        dpr: devicePixelRatio,
        status: element.dataset.assetStatus,
        centered: element.classList.contains('center'),
        src: image.currentSrc || image.src,
        natural: [image.naturalWidth, image.naturalHeight],
        loading: image.getAttribute('loading'),
        image: { width: imageRect.width, height: imageRect.height, left: imageRect.left, right: imageRect.right, top: imageRect.top, bottom: imageRect.bottom },
        plate: { width: plateRect.width, height: plateRect.height, left: plateRect.left, right: plateRect.right, top: plateRect.top, bottom: plateRect.bottom },
        stage: { left: stageRect.left, right: stageRect.right, top: stageRect.top, bottom: stageRect.bottom },
        plateBackground: getComputedStyle(plate).backgroundColor,
        imageFilter: getComputedStyle(image).filter,
        reducedMediaActive: matchMedia('(prefers-reduced-motion: reduce)').matches,
        transitionDuration: getComputedStyle(element).transitionDuration,
        overflow: [document.documentElement.clientWidth, document.documentElement.scrollWidth],
        broken: Array.from(document.images).filter(item => item.complete && item.naturalWidth === 0).map(item => item.src)
      };
    });
    record.dpr = record.home.center.dpr;
    const home = record.home.center;
    check(home.status === 'temporary_replace_before_final', `home@${width}: status`);
    check(home.centered, `home@${width}: centered`);
    check(home.src.includes('temporary_eclipse_bite_bundle_web.webp'), `home@${width}: source`);
    check(home.natural[0] === 1080 && home.natural[1] === 668, `home@${width}: natural size`);
    check(home.loading === 'lazy', `home@${width}: declared loading`);
    check(Math.abs(home.plate.width - home.plate.height) <= 1, `home@${width}: square plate`);
    check(home.plateBackground === 'rgb(251, 250, 247)', `home@${width}: plate colour`);
    check(home.imageFilter === 'none', `home@${width}: image filter ${home.imageFilter}`);
    check(home.overflow[0] === width && home.overflow[1] === width, `home@${width}: overflow ${home.overflow}`);
    check(home.broken.length === 0, `home@${width}: broken images ${home.broken}`);
    check(home.plate.left >= home.stage.left && home.plate.right <= home.stage.right, `home@${width}: horizontal clipping`);
    check(home.plate.top >= home.stage.top && home.plate.bottom <= home.stage.bottom, `home@${width}: vertical clipping`);
    if (width === 390) check(home.image.width >= 225 && home.image.width <= 255, `home@390: group width ${home.image.width}`);
    if (width === 1440) check(home.image.width >= 330 && home.image.width <= 370, `home@1440: group width ${home.image.width}`);
    await screenshot(tab, `home_bundle_center_${width}.png`);
    fs.writeFileSync(`${evidence}/browser_progress.json`, `${JSON.stringify({ width, stage: 'home_center_done' })}\n`);

    const itemCount = await tab.playwright.locator('.cf-item').count();
    record.home.offCenterStates = [];
    for (let step = 1; step < itemCount; step += 1) {
      await tab.playwright.locator('.wf-line .arw.r').click({ force: true });
      await tab.playwright.waitForTimeout(80);
      const state = await bundle.evaluate(element => {
        const plate = element.querySelector('.cf-bp').getBoundingClientRect();
        const stage = document.querySelector('#stage').getBoundingClientRect();
        return {
          centered: element.classList.contains('center'),
          hidden: element.getAttribute('aria-hidden'),
          plate: { left: plate.left, right: plate.right, top: plate.top, bottom: plate.bottom },
          stage: { left: stage.left, right: stage.right, top: stage.top, bottom: stage.bottom }
        };
      });
      record.home.offCenterStates.push(state);
      check(!state.centered, `home@${width}: off-center step ${step}`);
      if (state.hidden !== 'true') {
        check(state.plate.right > state.stage.left && state.plate.left < state.stage.right, `home@${width}: visible off-center horizontal state ${step}`);
        check(state.plate.bottom > state.stage.top && state.plate.top < state.stage.bottom, `home@${width}: visible off-center vertical state ${step}`);
      }
    }
    await tab.playwright.locator('.wf-line .arw.r').click({ force: true });
    record.home.rightWrap = await bundle.evaluate(element => element.classList.contains('center'));
    await tab.playwright.locator('.wf-line .arw.l').click({ force: true });
    record.home.leftArrow = !(await bundle.evaluate(element => element.classList.contains('center')));
    await tab.playwright.locator('.wf-line .arw.r').click({ force: true });
    record.home.rightRestore = await bundle.evaluate(element => element.classList.contains('center'));
    check(record.home.rightWrap && record.home.leftArrow && record.home.rightRestore, `home@${width}: arrow traversal`);

    await bundle.click({ force: true });
    await tab.cua.keypress({ keys: ['ARROWRIGHT'] });
    record.home.keyboardRight = !(await bundle.evaluate(element => element.classList.contains('center')));
    await tab.cua.keypress({ keys: ['ARROWLEFT'] });
    record.home.keyboardLeft = await bundle.evaluate(element => element.classList.contains('center'));
    record.home.focus = await bundle.evaluate(element => ({
      active: document.activeElement === element,
      visible: element.matches(':focus-visible'),
      outline: getComputedStyle(element.querySelector('.cf-bp')).outlineStyle,
      width: getComputedStyle(element.querySelector('.cf-bp')).outlineWidth
    }));
    check(record.home.keyboardRight && record.home.keyboardLeft, `home@${width}: keyboard traversal`);
    check(record.home.focus.active && record.home.focus.visible && record.home.focus.outline !== 'none' && parseFloat(record.home.focus.width) >= 2, `home@${width}: focus ${JSON.stringify(record.home.focus)}`);

    const stageRect = await tab.playwright.locator('#stage').evaluate(stage => {
      const rect = stage.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    });
    const swipeY = Math.max(30, Math.min(height - 30, (stageRect.top + stageRect.bottom) / 2));
    const swipeStart = Math.max(stageRect.left + 40, Math.min(stageRect.right - 30, width - 50));
    const swipeEnd = Math.max(stageRect.left + 30, swipeStart - 150);
    await tab.cua.drag({ path: [
      { x: swipeStart, y: swipeY },
      { x: swipeStart - 50, y: swipeY + 1 },
      { x: swipeStart - 100, y: swipeY + 1 },
      { x: swipeEnd, y: swipeY }
    ] });
    await tab.playwright.waitForTimeout(450);
    record.home.swipe = !(await bundle.evaluate(element => element.classList.contains('center')));
    check(record.home.swipe, `home@${width}: swipe traversal`);
    if (record.home.swipe) await tab.playwright.locator('.wf-line .arw.l').click({ force: true });
    await tab.playwright.locator('.wf-line .arw.r').click({ force: true });
    await screenshot(tab, `home_bundle_offcenter_${width}.png`);
    fs.writeFileSync(`${evidence}/browser_progress.json`, `${JSON.stringify({ width, stage: 'shop_start' })}\n`);

    await tab.close();
    tab = await browser.tabs.new();
    await viewportCapability.reset();
    await viewportCapability.set({ width, height });
    await tab.goto(`${base}/shop.html`);
    await tab.playwright.waitForLoadState({ state: 'domcontentloaded', timeoutMs: 15000 });
    await tab.playwright.waitForTimeout(1500);
    const card = tab.playwright.locator('.pcard.is_bundle');
    await card.waitFor({ state: 'attached', timeoutMs: 10000 });
    const initialCardRect = await card.evaluate(element => {
      const rect = element.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom };
    });
    await tab.cua.scroll({ x: width / 2, y: height / 2, scrollX: 0, scrollY: Math.max(0, initialCardRect.top - 120) });
    const cardImage = card.locator('img', {});
    for (let attempt = 0; attempt < 20 && !(await cardImage.evaluate(image => image.complete && image.naturalWidth > 0)); attempt += 1) {
      await tab.playwright.waitForTimeout(100);
    }
    fs.writeFileSync(`${evidence}/browser_progress.json`, `${JSON.stringify({ width, stage: 'shop_card_clicked' })}\n`);
    record.shop.grid = await card.evaluate(element => {
      const image = element.querySelector('img');
      const well = element.querySelector('.ph');
      const imageRect = image.getBoundingClientRect();
      const wellRect = well.getBoundingClientRect();
      return {
        dpr: devicePixelRatio,
        status: element.dataset.assetStatus,
        hidden: element.hidden,
        src: image.currentSrc || image.src,
        natural: [image.naturalWidth, image.naturalHeight],
        loading: image.getAttribute('loading'),
        ratio: imageRect.width / wellRect.width,
        image: { width: imageRect.width, height: imageRect.height },
        well: { width: wellRect.width, height: wellRect.height },
        filter: getComputedStyle(image).filter,
        reducedMediaActive: matchMedia('(prefers-reduced-motion: reduce)').matches,
        transitionDuration: getComputedStyle(image).transitionDuration,
        overflow: [document.documentElement.clientWidth, document.documentElement.scrollWidth],
        broken: Array.from(document.images).filter(item => item.complete && item.naturalWidth === 0).map(item => item.src)
      };
    });
    const shop = record.shop.grid;
    check(shop.status === 'temporary_replace_before_final', `shop@${width}: status`);
    check(!shop.hidden, `shop@${width}: visible in All`);
    check(shop.src.includes('temporary_eclipse_bite_bundle_web.webp'), `shop@${width}: source`);
    check(shop.natural[0] === 1080 && shop.natural[1] === 668, `shop@${width}: natural size`);
    check(shop.loading === 'lazy', `shop@${width}: declared loading`);
    check(shop.ratio >= 0.88 && shop.ratio <= 0.92, `shop@${width}: image-well ratio ${shop.ratio}`);
    check(shop.filter === 'none', `shop@${width}: filter ${shop.filter}`);
    check(shop.overflow[0] === width && shop.overflow[1] === width, `shop@${width}: overflow ${shop.overflow}`);
    check(shop.broken.length === 0, `shop@${width}: broken images ${shop.broken}`);

    const cardRect = await card.evaluate(element => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    });
    await tab.cua.move({
      x: (cardRect.left + cardRect.right) / 2,
      y: Math.max(30, Math.min(height - 30, (cardRect.top + cardRect.bottom) / 2))
    });
    record.shop.hoverTransform = await card.locator('img', {}).evaluate(image => getComputedStyle(image).transform);
    await card.locator('.add', {}).press('ArrowRight');
    record.shop.focus = await card.locator('.add', {}).evaluate(element => ({
      active: document.activeElement === element,
      visible: element.matches(':focus-visible'),
      outline: getComputedStyle(element).outlineStyle,
      width: getComputedStyle(element).outlineWidth
    }));
    check(record.shop.focus.active && record.shop.focus.visible && record.shop.focus.outline !== 'none' && parseFloat(record.shop.focus.width) >= 2, `shop@${width}: focus ${JSON.stringify(record.shop.focus)}`);
    await screenshot(tab, `shop_bundle_grid_${width}.png`);
    fs.writeFileSync(`${evidence}/browser_progress.json`, `${JSON.stringify({ width, stage: 'shop_grid_done' })}\n`);

    record.shop.filters = {};
    for (const flavour of ['pure', 'almond', 'hazelnut', 'goji']) {
      await tab.playwright.locator(`.swatch[data-flavour="${flavour}"]`).click();
      record.shop.filters[flavour] = await card.evaluate(element => element.hidden);
      check(record.shop.filters[flavour], `shop@${width}: filter ${flavour}`);
    }
    await tab.playwright.locator('.swatch[data-flavour="all"]').click();
    record.shop.filters.all = await card.evaluate(element => element.hidden);
    check(!record.shop.filters.all, `shop@${width}: All restore`);
    fs.writeFileSync(`${evidence}/browser_progress.json`, `${JSON.stringify({ width, stage: 'shop_filters_done', all_hidden: record.shop.filters.all })}\n`);
    await tab.playwright.locator('[data-view="list"]').click();
    const listCardRect = await card.evaluate(element => {
      const rect = element.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom };
    });
    await tab.cua.scroll({ x: width / 2, y: height / 2, scrollX: 0, scrollY: Math.max(0, listCardRect.top - 120) });
    await tab.playwright.waitForTimeout(250);
    record.shop.list = await card.evaluate(element => {
      const image = element.querySelector('img').getBoundingClientRect();
      const well = element.querySelector('.ph').getBoundingClientRect();
      return {
        bodyClass: document.body.className,
        ratio: image.width / well.width,
        image: { width: image.width, height: image.height },
        well: { width: well.width, height: well.height },
        overflow: [document.documentElement.clientWidth, document.documentElement.scrollWidth]
      };
    });
    check(record.shop.list.bodyClass.includes('shop-list-view'), `shop@${width}: list class`);
    check(record.shop.list.ratio >= 0.88 && record.shop.list.ratio <= 0.92, `shop-list@${width}: image-well ratio ${record.shop.list.ratio}`);
    check(record.shop.list.overflow[0] === width && record.shop.list.overflow[1] === width, `shop-list@${width}: overflow ${record.shop.list.overflow}`);
    await screenshot(tab, `shop_bundle_list_${width}.png`);
    record.logs = await tab.dev.logs({ levels: ['error'], limit: 100 });
    check(record.logs.length === 0, `browser@${width}: console errors ${JSON.stringify(record.logs)}`);
    results.push(record);
    await tab.close();
  }

  const report = {
    schema: 'maplemoon-bundle-inapp-browser-qa/v1',
    base,
    outcome: failures.length ? 'FAIL' : 'PASS',
    viewports: widths,
    cases: results.length,
    screenshots: widths.length * 4,
    results,
    failures
  };
  fs.writeFileSync(`${evidence}/browser_results.json`, `${JSON.stringify(report, null, 2)}\n`);
  return report;
}
