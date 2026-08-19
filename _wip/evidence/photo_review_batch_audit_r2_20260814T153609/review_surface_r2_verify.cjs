const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const sourceRoot = '/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814';
const htmlPath = path.join(sourceRoot, 'maplemoon_product_corrections_review_20260814.html');
const port = 4397;
const base = `http://127.0.0.1:${port}/maplemoon_product_corrections_review_20260814.html`;
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/photo_review_batch_audit_r2_20260814T153609';
const authoredImages = [
  'carob_powder_isolated.png',
  'elixir_pure_isolated_equal-size.png',
  'elixir_spiced_isolated_equal-size.png',
  'five_item_bundle_low_angle_isolated.png',
  'fudge_authoritative_reference_crop.png',
];
const requiredReviewImages = authoredImages.slice(0, 4);

function classifyTrace(trace) {
  const missing = trace.responses.filter(item => item.status >= 400);
  const exactFavicon = missing.filter(item => {
    const parsed = new URL(item.url);
    return item.method === 'GET' && parsed.pathname === '/favicon.ico' && parsed.search === '' && item.status === 404;
  });
  const otherMissing = missing.filter(item => !exactFavicon.includes(item));
  const waivedConsole = trace.consoleErrors.filter(message => /Failed to load resource:.*404/i.test(message));
  const otherConsole = trace.consoleErrors.filter(message => !waivedConsole.includes(message));
  const pass = exactFavicon.length === 1 && otherMissing.length === 0 &&
    trace.failedRequests.length === 0 && trace.pageErrors.length === 0 &&
    waivedConsole.length <= 1 && otherConsole.length === 0;
  return {
    pass,
    exactFaviconCount: exactFavicon.length,
    exactFavicon,
    otherMissing,
    waivedConsole,
    otherConsole,
    failedRequests: trace.failedRequests,
    pageErrors: trace.pageErrors,
  };
}

function getStatus(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, response => {
      response.resume();
      response.on('end', () => resolve(response.statusCode));
    });
    request.on('error', reject);
  });
}

function startStaticAuditServer() {
  const requests = [];
  const mime = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8' };
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://127.0.0.1:${port}`);
    const decodedPath = decodeURIComponent(requestUrl.pathname);
    const relative = decodedPath.replace(/^\/+/, '');
    const candidate = path.resolve(sourceRoot, relative);
    const withinRoot = candidate === sourceRoot || candidate.startsWith(`${sourceRoot}${path.sep}`);
    const exists = withinRoot && fs.existsSync(candidate) && fs.statSync(candidate).isFile();
    const status = request.method === 'GET' && exists ? 200 : 404;
    requests.push({ method: request.method, path: requestUrl.pathname, search: requestUrl.search, status });
    if (status !== 200) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('File not found\n');
      return;
    }
    response.writeHead(200, { 'Content-Type': mime[path.extname(candidate).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(candidate).pipe(response);
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve({ server, requests }));
  });
}

(async () => {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const sourceFaviconMatches = html.match(/favicon\.ico/gi) || [];
  const sourceReferenceMatches = [...html.matchAll(/<(?:link|script|img)\b[^>]*(?:href|src)\s*=\s*["'][^"']*favicon\.ico[^"']*["'][^>]*>/gi)].map(match => match[0]);

  const auditServer = await startStaticAuditServer();

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const context = await browser.newContext({ viewport: { width: 390, height: 1000 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');

  const trace = { responses: [], failedRequests: [], pageErrors: [], consoleErrors: [], cdpRequests: [] };
  page.on('console', message => {
    if (message.type() === 'error') trace.consoleErrors.push(`CONSOLE ${message.text()}`);
  });
  page.on('pageerror', error => trace.pageErrors.push(`PAGEERROR ${error.message}`));
  context.on('requestfailed', request => trace.failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText ?? 'unknown'}`));
  context.on('response', response => {
    trace.responses.push({
      url: response.url(),
      status: response.status(),
      method: response.request().method(),
      resourceType: response.request().resourceType(),
    });
  });
  cdp.on('Network.requestWillBeSent', event => {
    trace.cdpRequests.push({
      url: event.request.url,
      method: event.request.method,
      type: event.type || null,
      initiatorType: event.initiator?.type || null,
      documentURL: event.documentURL || null,
    });
  });

  const renders = [];
  for (const width of [390, 900, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const startResponse = trace.responses.length;
    const response = await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => [...document.images].every(image => image.complete));
    await page.waitForTimeout(250);
    const metrics = await page.evaluate(({ authoredImages, requiredReviewImages }) => {
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
          absoluteSrc: image.src,
          complete: image.complete,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          visible: visible(image),
          rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
        };
      });
      const authored = authoredImages.map(filename => images.find(image => image.src?.endsWith(filename)) ?? null);
      const required = requiredReviewImages.map(filename => images.find(image => image.src?.endsWith(filename)) ?? null);
      const authoredRefs = [...document.querySelectorAll('link[href],script[src],img[src]')].map(element => ({
        tag: element.tagName.toLowerCase(),
        value: element.getAttribute('href') || element.getAttribute('src'),
      }));
      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        bodyScrollWidth: document.body.scrollWidth,
        labels,
        labelsVisible: labels.length >= 16 && labels.every(label => label.visible),
        images,
        authoredImages: authored,
        authoredImagesLoaded: authored.length === 5 && authored.every(image => image && image.complete && image.naturalWidth > 0 && image.naturalHeight > 0 && image.visible),
        requiredReviewImagesLoaded: required.length === 4 && required.every(image => image && image.complete && image.naturalWidth > 0 && image.naturalHeight > 0 && image.visible),
        authoredRefs,
        faviconAuthoredRefs: authoredRefs.filter(ref => /favicon\.ico/i.test(ref.value || '')),
      };
    }, { authoredImages, requiredReviewImages });
    await page.screenshot({ path: `${output}/review_surface_r2_${width}.png`, fullPage: true });
    const navigationResponses = trace.responses.slice(startResponse);
    const authoredResponses = authoredImages.map(filename => navigationResponses.find(item => item.url.endsWith(filename)) || null);
    const authoredResponsesPass = authoredResponses.every(item => item && item.status === 200);
    const pass = response?.status() === 200 &&
      metrics.clientWidth === width && metrics.scrollWidth === width && metrics.innerWidth === width && metrics.bodyScrollWidth === width &&
      metrics.labelsVisible && metrics.authoredImagesLoaded && metrics.requiredReviewImagesLoaded &&
      metrics.faviconAuthoredRefs.length === 0 && authoredResponsesPass;
    renders.push({ width, http: response?.status() ?? null, authoredResponses, authoredResponsesPass, metrics, pass });
  }

  const serverPageRequests = auditServer.requests.map(item => ({
    url: `http://127.0.0.1:${port}${item.path}${item.search}`,
    status: item.status,
    method: item.method,
    resourceType: item.path === '/favicon.ico' ? 'other' : (item.path.endsWith('.png') ? 'image' : (item.path.endsWith('.html') ? 'document' : 'other')),
  }));
  const serverTrace = { ...trace, responses: serverPageRequests };
  const classifier = classifyTrace(serverTrace);
  const faviconRequests = serverPageRequests.filter(item => new URL(item.url).pathname === '/favicon.ico');
  const faviconUnauthoredPass = sourceFaviconMatches.length === 0 && sourceReferenceMatches.length === 0 &&
    renders.every(render => render.metrics.faviconAuthoredRefs.length === 0);
  const faviconDistinctPass = classifier.exactFavicon.every(item => item.resourceType === 'other') &&
    classifier.exactFavicon.every(item => !authoredImages.some(filename => item.url.endsWith(filename))) &&
    faviconRequests.length === 1 && faviconRequests[0].method === 'GET';

  const controlPath = '/r2_non_favicon_missing_control_153609';
  const controlStatus = await getStatus(`http://127.0.0.1:${port}${controlPath}`);
  const controlTrace = { responses: [{ url: `http://127.0.0.1:${port}${controlPath}`, status: controlStatus, method: 'GET', resourceType: 'other' }], failedRequests: [], pageErrors: [], consoleErrors: [], cdpRequests: [] };
  const controlClassifier = classifyTrace(controlTrace);
  const positiveControlPass = controlStatus === 404 && controlClassifier.pass === false && controlClassifier.otherMissing.length === 1;

  const result = {
    generatedAt: new Date().toISOString(),
    source: {
      htmlPath,
      faviconTextMatchCount: sourceFaviconMatches.length,
      faviconReferenceMatchCount: sourceReferenceMatches.length,
      faviconUnauthoredPass,
    },
    faviconWaiver: {
      classifier,
      serverRequests: serverPageRequests,
      cdpRequests: trace.cdpRequests,
      browserDefaultEvidence: 'No authored favicon text/reference exists; the standalone unmodified static server records one GET /favicon.ico 404 outside the five authored image requests. The page-target CDP trace omits this browser-chrome fetch, which is consistent with a browser-default request rather than an authored page request.',
      faviconDistinctPass,
      soleExactRequestPass: classifier.exactFaviconCount === 1,
    },
    positiveControl: {
      path: controlPath,
      status: controlStatus,
      classifierPass: controlClassifier.pass,
      rejectedByClassifier: positiveControlPass,
      classification: controlClassifier,
    },
    renders,
  };
  result.allPass = faviconUnauthoredPass && faviconDistinctPass && classifier.pass && positiveControlPass && renders.every(render => render.pass);
  fs.writeFileSync(`${output}/review_surface_r2_results.json`, `${JSON.stringify(result, null, 2)}\n`);
  await context.close();
  await browser.close();
  await new Promise(resolve => auditServer.server.close(resolve));
  console.log(`R2_BROWSER ${result.allPass ? 'PASS' : 'FAIL'} widths=${renders.map(item => `${item.width}:${item.pass ? 'PASS' : 'FAIL'}`).join(',')} favicon_exact=${classifier.exactFaviconCount} source_refs=${sourceReferenceMatches.length} control_404=${controlStatus} control_rejected=${positiveControlPass}`);
  if (!result.allPass) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
