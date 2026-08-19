const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const outDir = __dirname;
const base = process.argv[2];
if (!base) throw new Error('usage: node browser_verify.cjs http://127.0.0.1:PORT');
const pagePath = '/maplemoon-website/_wip/evidence/elixir_v4_live_use_audit_20260814T171205/review_surface.html';
const widths = [390, 900, 1440];

(async () => {
  const browser = await chromium.launch({headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const results = [];
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];
    const responses = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', err => pageErrors.push(String(err)));
    page.on('requestfailed', req => failedRequests.push({url: req.url(), failure: req.failure()}));
    page.on('response', res => responses.push({url: res.url(), status: res.status()}));
    const response = await page.goto(base + pagePath, {waitUntil: 'networkidle'});
    await page.waitForFunction(() => [...document.images].every(img => img.complete));
    const pageData = await page.evaluate(() => {
      const images = [...document.querySelectorAll('img[data-audit-image]')].map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        renderedWidth: img.getBoundingClientRect().width,
        renderedHeight: img.getBoundingClientRect().height,
      }));
      return {
        measuredViewport: {width: window.innerWidth, height: window.innerHeight},
        bodyTextLength: document.body.innerText.trim().length,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        images,
        holdTextPresent: document.body.innerText.includes('LIVE-USE BOUNDARY: HOLD'),
      };
    });
    const imageResponses = responses.filter(item => /elixir_(pure|spiced|plain)/.test(item.url));
    const uniqueImageSources = [...new Set(pageData.images.map(img => img.src))];
    const responseByUrl = new Map(imageResponses.map(item => [item.url, item.status]));
    const pass = response && response.status() === 200 && pageData.bodyTextLength > 0 && pageData.scrollWidth <= pageData.clientWidth && pageData.holdTextPresent && pageData.images.length === 8 && pageData.images.every(img => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0 && img.renderedWidth > 0 && img.renderedHeight > 0) && uniqueImageSources.length === 4 && uniqueImageSources.every(src => responseByUrl.get(src) === 200) && consoleErrors.length === 0 && pageErrors.length === 0 && failedRequests.length === 0;
    const screenshot = path.join(outDir, `review_surface_${width}.png`);
    await page.screenshot({path: screenshot, fullPage: true});
    results.push({width, status: pass ? 'PASS' : 'FAIL', documentStatus: response ? response.status() : null, ...pageData, uniqueImageSources, imageResponses, consoleErrors, pageErrors, failedRequests, screenshot});
    await context.close();
  }
  await browser.close();
  const status = results.every(result => result.status === 'PASS') ? 'PASS' : 'FAIL';
  fs.writeFileSync(path.join(outDir, 'browser_results.json'), JSON.stringify({status, results}, null, 2) + '\n');
  console.log(`ELIXIR_V4_BROWSER ${status} widths=${results.map(r => `${r.width}:${r.status}`).join(',')} images=${results.map(r => r.imageResponses.length).join('/')} console=${results.reduce((n,r)=>n+r.consoleErrors.length,0)} page=${results.reduce((n,r)=>n+r.pageErrors.length,0)} request=${results.reduce((n,r)=>n+r.failedRequests.length,0)} overflow=${results.some(r=>r.scrollWidth>r.clientWidth)}`);
  process.exit(status === 'PASS' ? 0 : 1);
})().catch(error => { console.error(error); process.exit(1); });
