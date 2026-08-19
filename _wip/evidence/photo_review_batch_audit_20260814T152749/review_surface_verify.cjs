const fs = require('fs');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const base = 'http://127.0.0.1:4395/maplemoon_product_corrections_review_20260814.html';
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_20260814T152749';
const required = [
  'carob_powder_isolated.png',
  'elixir_pure_isolated_equal-size.png',
  'elixir_spiced_isolated_equal-size.png',
  'five_item_bundle_low_angle_isolated.png',
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const results = [];
  for (const width of [390, 900, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
    const errors = [];
    const failedRequests = [];
    const imageResponses = [];
    page.on('console', message => {
      if (message.type() === 'error') errors.push(`CONSOLE ${message.text()}`);
    });
    page.on('pageerror', error => errors.push(`PAGEERROR ${error.message}`));
    page.on('requestfailed', request => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText ?? 'unknown'}`));
    page.on('response', response => {
      if (response.request().resourceType() === 'image') imageResponses.push({ url: response.url(), status: response.status() });
    });
    const response = await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => [...document.images].every(image => image.complete));
    await page.waitForTimeout(200);
    const metrics = await page.evaluate(required => {
      const visible = element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
      };
      const labels = [...document.querySelectorAll('h1, h2, .caption strong, .caption span, .chip, .warning')].map(element => ({
        text: element.textContent.trim().replace(/\s+/g, ' '),
        visible: visible(element),
      }));
      const images = [...document.images].map(image => {
        const rect = image.getBoundingClientRect();
        return {
          src: image.getAttribute('src'),
          complete: image.complete,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          visible: visible(image),
          rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
        };
      });
      const requiredImages = required.map(filename => images.find(image => image.src?.endsWith(filename)) ?? null);
      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        bodyScrollWidth: document.body.scrollWidth,
        labels,
        labelsVisible: labels.length >= 16 && labels.every(label => label.visible),
        images,
        requiredImages,
        requiredImagesLoaded: requiredImages.length === 4 && requiredImages.every(image => image && image.complete && image.naturalWidth > 0 && image.naturalHeight > 0 && image.visible),
        allImagesLoaded: images.length === 5 && images.every(image => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0 && image.visible),
      };
    }, required);
    await page.screenshot({ path: `${output}/review_surface_${width}.png`, fullPage: true });
    const requiredResponsesPass = required.every(filename => imageResponses.some(item => item.url.endsWith(filename) && item.status === 200));
    const pass = response?.status() === 200 && errors.length === 0 && failedRequests.length === 0 &&
      metrics.clientWidth === width && metrics.scrollWidth === width && metrics.innerWidth === width && metrics.bodyScrollWidth === width &&
      metrics.labelsVisible && metrics.requiredImagesLoaded && metrics.allImagesLoaded && requiredResponsesPass;
    results.push({ width, http: response?.status() ?? null, errors, failedRequests, imageResponses, requiredResponsesPass, metrics, pass });
    await page.close();
  }
  await browser.close();
  const result = { generatedAt: new Date().toISOString(), required, results, allPass: results.every(result => result.pass) };
  fs.writeFileSync(`${output}/review_surface_results.json`, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
  if (!result.allPass) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
