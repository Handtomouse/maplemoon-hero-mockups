const fs = require('fs');
const crypto = require('crypto');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const base = 'http://127.0.0.1:4394';
const out = '/Users/handtomouse/maplemoon-website/_wip/evidence/faq_caffeine_verify_20260814T145103';
const expectedQuestion = 'Does carob contain caffeine?';
const expectedAnswer = 'Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list.';
const routes = [
  '/homepage.html',
  '/our-story.html',
  '/carob-story.html',
  '/shop.html',
  '/faq.html',
  '/stockists.html',
  '/pure-carob-bar.html',
];
const requiredAssets = [
  '/a11y_inner.css?v=20260723',
  '/brand_kit.css',
  '/design_refinement_20260723.css',
  '/mock-cart.css',
  '/mock-cart.js',
  '/assets/design-system/mm-tokens.css',
  '/assets/design-system/mm-primitives.css',
  '/assets/design-system/mm-chrome.css',
  '/assets/design-system/mm-chrome.js',
  '/assets/mm_wordmark_blk.svg',
  '/assets/mm_logo_icon_blk.svg',
  '/assets/faq_hero_ritual.webp',
];
const bogusPaths = ['/zzq-faq-caffeine-not-real-145103', '/zzq-faq-caffeine-not-real-145103.html'];
const sha256 = buffer => crypto.createHash('sha256').update(buffer).digest('hex');

async function fetchRecord(path) {
  const response = await fetch(`${base}${path}`, { redirect: 'manual' });
  const body = Buffer.from(await response.arrayBuffer());
  return { path, status: response.status, bytes: body.length, sha256: sha256(body) };
}

(async () => {
  const routeResults = [];
  for (const path of routes) routeResults.push(await fetchRecord(path));
  const assetResults = [];
  for (const path of requiredAssets) assetResults.push(await fetchRecord(path));
  const faqFetch = routeResults.find(result => result.path === '/faq.html');
  const bogusResults = [];
  for (const path of bogusPaths) {
    const result = await fetchRecord(path);
    result.differsFromFaq = result.sha256 !== faqFetch.sha256 && result.bytes !== faqFetch.bytes;
    bogusResults.push(result);
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const viewportResults = [];
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 }, deviceScaleFactor: 1 });
    const errors = [];
    const failedRequests = [];
    page.on('console', message => {
      if (message.type() === 'error') errors.push(`CONSOLE ${message.text()}`);
    });
    page.on('pageerror', error => errors.push(`PAGEERROR ${error.message}`));
    page.on('requestfailed', request => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText ?? 'unknown'}`));
    const response = await page.goto(`${base}/faq.html#caffeine`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const item = page.locator('#caffeine');
    await item.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    const metrics = await page.evaluate(({ expectedQuestion, expectedAnswer }) => {
      const article = document.querySelector('#caffeine');
      const button = article?.querySelector('.faq-question');
      const answer = article?.querySelector('.faq-answer');
      const questionText = button?.querySelector('span:nth-child(2)')?.textContent?.trim() ?? null;
      const answerText = answer?.textContent?.trim().replace(/\s+/g, ' ') ?? null;
      const articleRect = article?.getBoundingClientRect();
      const buttonRect = button?.getBoundingClientRect();
      const answerRect = answer?.getBoundingClientRect();
      const images = [...document.images].map(image => ({
        src: image.getAttribute('src'),
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      }));
      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        bodyScrollWidth: document.body.scrollWidth,
        questionText,
        answerText,
        questionMatches: questionText === expectedQuestion,
        answerMatches: answerText === expectedAnswer,
        expanded: button?.getAttribute('aria-expanded') ?? null,
        answerHidden: answer?.hidden ?? null,
        article: articleRect ? { left: articleRect.left, right: articleRect.right, top: articleRect.top, bottom: articleRect.bottom, width: articleRect.width, height: articleRect.height } : null,
        button: buttonRect ? { left: buttonRect.left, right: buttonRect.right, top: buttonRect.top, bottom: buttonRect.bottom, width: buttonRect.width, height: buttonRect.height } : null,
        answer: answerRect ? { left: answerRect.left, right: answerRect.right, top: answerRect.top, bottom: answerRect.bottom, width: answerRect.width, height: answerRect.height, scrollWidth: answer.scrollWidth, clientWidth: answer.clientWidth, scrollHeight: answer.scrollHeight, clientHeight: answer.clientHeight } : null,
        brokenImages: images.filter(image => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0),
        images,
      };
    }, { expectedQuestion, expectedAnswer });
    await page.screenshot({ path: `${out}/faq-caffeine-open-${width}.png`, fullPage: true });
    await item.screenshot({ path: `${out}/faq-caffeine-open-${width}-detail.png` });

    let drawer = null;
    if (width === 390) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.locator('[data-mm-menu-toggle]').click();
      await page.waitForTimeout(300);
      drawer = await page.evaluate(() => {
        const toggle = document.querySelector('[data-mm-menu-toggle]');
        const primary = document.querySelector('[data-mm-primary-nav]');
        const utility = document.querySelector('[data-mm-utility-nav]');
        const primaryRect = primary.getBoundingClientRect();
        const utilityRect = utility.getBoundingClientRect();
        const rowElements = [...primary.querySelectorAll(':scope > a'), ...utility.querySelectorAll(':scope > a, :scope > span')];
        const rows = rowElements.map(element => {
          const rect = element.getBoundingClientRect();
          const x = Math.max(1, Math.min(document.documentElement.clientWidth - 1, rect.left + rect.width / 2));
          const y = rect.top + rect.height / 2;
          const hit = document.elementFromPoint(x, y);
          return {
            text: element.textContent.trim(),
            height: rect.height,
            left: rect.left,
            right: rect.right,
            hitTag: hit?.tagName ?? null,
            hitSelf: hit === element || element.contains(hit),
          };
        });
        return {
          bodyOpen: document.body.hasAttribute('data-mm-menu-open'),
          expanded: toggle.getAttribute('aria-expanded'),
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          primary: { display: getComputedStyle(primary).display, left: primaryRect.left, right: primaryRect.right, width: primaryRect.width },
          utility: { display: getComputedStyle(utility).display, left: utilityRect.left, right: utilityRect.right, width: utilityRect.width },
          rows,
          rowCountSix: rows.length === 6,
          allRows44: rows.length === 6 && rows.every(row => Math.abs(row.height - 44) <= 0.1),
          allRowsHit: rows.length === 6 && rows.every(row => row.hitSelf),
          fullWidth: Math.abs(primaryRect.left) <= 0.1 && Math.abs(primaryRect.right - 390) <= 0.1 && Math.abs(utilityRect.left) <= 0.1 && Math.abs(utilityRect.right - 390) <= 0.1,
        };
      });
      await page.screenshot({ path: `${out}/faq-drawer-open-390.png`, fullPage: false });
    }

    const viewportPass = response?.status() === 200 && errors.length === 0 && failedRequests.length === 0 &&
      metrics.clientWidth === width && metrics.scrollWidth === width && metrics.innerWidth === width &&
      metrics.bodyScrollWidth === width && metrics.questionMatches && metrics.answerMatches &&
      metrics.expanded === 'true' && metrics.answerHidden === false && metrics.brokenImages.length === 0 &&
      metrics.answer.scrollWidth === metrics.answer.clientWidth && metrics.answer.scrollHeight === metrics.answer.clientHeight &&
      (!drawer || (drawer.bodyOpen && drawer.expanded === 'true' && drawer.clientWidth === 390 && drawer.scrollWidth === 390 &&
        drawer.primary.display === 'grid' && drawer.utility.display === 'grid' && drawer.rowCountSix && drawer.allRows44 && drawer.allRowsHit && drawer.fullWidth));
    viewportResults.push({ width, http: response?.status() ?? null, errors, failedRequests, metrics, drawer, pass: viewportPass });
    await page.close();
  }
  await browser.close();

  const result = {
    generatedAt: new Date().toISOString(),
    expectedQuestion,
    expectedAnswer,
    routeResults,
    assetResults,
    bogusResults,
    viewportResults,
    checks: {
      routesPass: routeResults.every(result => result.status === 200 && result.bytes > 0),
      assetsPass: assetResults.every(result => result.status === 200 && result.bytes > 0),
      bogusPass: bogusResults.every(result => result.status === 404 && result.differsFromFaq),
      viewportsPass: viewportResults.every(result => result.pass),
    },
  };
  result.allPass = Object.values(result.checks).every(Boolean);
  fs.writeFileSync(`${out}/browser-results.json`, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
  if (!result.allPass) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
