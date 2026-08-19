import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const modules = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const require = createRequire(`${modules}/package.json`);
const { chromium } = require('playwright');
const sharp = require('sharp');

const repo = '/Users/handtomouse/maplemoon-website';
const out = path.join(repo, '_wip/evidence/lane_f_independent_cert_20260816T143809');
const base = 'http://127.0.0.1:8772';
const cases = [
  { name: 'our-story', route: '/_wip/our-story.WIP.html' },
  { name: 'carob-story', route: '/_wip/carob-story.WIP.html' },
];
const widths = [390, 1440];

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--disable-background-networking', '--disable-component-update', '--disable-default-apps', '--no-first-run'],
});

const results = [];
let failures = 0;

for (const test of cases) {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1100 }, deviceScaleFactor: 1 });
    await context.route('https://use.typekit.net/**', async route => {
      await route.fulfill({ status: 200, contentType: 'text/css', body: '/* verifier-local empty Typekit response; repo fallbacks remain active */' });
    });
    for (const [urlPath, localPath] of [
      ['/a11y_inner.css?v=20260723', path.join(repo, '_wip/a11y_inner.css')],
      ['/design_refinement_20260723.css', path.join(repo, '_wip/design_refinement_20260723.css')],
    ]) {
      await context.route(`${base}${urlPath}`, async route => {
        await route.fulfill({ status: 200, contentType: 'text/css', body: fs.readFileSync(localPath) });
      });
    }

    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const requestFailures = [];
    const badResponses = [];
    page.on('console', message => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', error => pageErrors.push(String(error)));
    page.on('requestfailed', request => requestFailures.push({ url: request.url(), failure: request.failure()?.errorText || 'unknown' }));
    page.on('response', response => {
      if (response.status() >= 400) badResponses.push({ url: response.url(), status: response.status() });
    });

    const response = await page.goto(`${base}${test.route}`, { waitUntil: 'networkidle', timeout: 30000 });

    // Acquire every lazy image without changing the candidate.
    await page.evaluate(async () => {
      const height = document.documentElement.scrollHeight;
      for (let y = 0; y <= height; y += 600) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 35));
      }
      window.scrollTo(0, 0);
      await Promise.all([...document.images].map(image => image.decode().catch(() => undefined)));
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await new Promise(resolve => setTimeout(resolve, 250));
    });

    const metrics = await page.evaluate(({ name, expectedWidth }) => {
      const root = document.documentElement;
      const body = document.body;
      const images = [...document.images].map(img => ({
        src: img.currentSrc || img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        rect: { width: img.getBoundingClientRect().width, height: img.getBoundingClientRect().height },
      }));
      const focusables = [...document.querySelectorAll('a[href],button,summary,[tabindex]:not([tabindex="-1"])')]
        .filter(el => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 && !el.disabled;
        });
      const focusResults = focusables.map((el, index) => {
        el.focus({ preventScroll: true });
        return {
          index,
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 90),
          focused: document.activeElement === el,
        };
      });
      document.body.focus?.({ preventScroll: true });

      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node, index) => {
        try { JSON.parse(node.textContent); return { index, valid: true }; }
        catch (error) { return { index, valid: false, error: String(error) }; }
      });

      const common = {
        expectedWidth,
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        bodyWidth: body.getBoundingClientRect().width,
        bodyHeight: Math.ceil(body.getBoundingClientRect().height),
        textLength: body.innerText.trim().length,
        imageCount: images.length,
        images,
        brokenImages: images.filter(img => !img.complete || img.naturalWidth < 1 || img.naturalHeight < 1),
        focusableCount: focusables.length,
        focusFailures: focusResults.filter(item => !item.focused),
        focusResults,
        jsonLd,
        invalidJsonLd: jsonLd.filter(item => !item.valid),
        overlay: Boolean(document.querySelector('[data-nextjs-dialog],.vite-error-overlay,#webpack-dev-server-client-overlay')),
      };

      if (name === 'our-story') {
        const placeholders = [...document.querySelectorAll('.os-founder-placeholder')].map(node => {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          return {
            role: node.getAttribute('role'),
            label: node.getAttribute('aria-label'),
            text: node.innerText.trim(),
            width: rect.width,
            height: rect.height,
            ratio: rect.width / rect.height,
            visible: style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0,
          };
        });
        const chapters = [...document.querySelectorAll('.os-chap')].map(node => ({
          number: node.querySelector('.no')?.textContent.trim(),
          label: node.querySelector('.lab')?.textContent.trim(),
        }));
        const rangeLink = [...document.querySelectorAll('a')].find(node => node.textContent.trim() === 'The Range' && node.getAttribute('href') === '/shop.WIP.html');
        common.pageSpecific = {
          placeholders,
          chapters,
          rangeLinkPresent: Boolean(rangeLink),
          rangeLinkFocused: (() => { if (!rangeLink) return false; rangeLink.focus({ preventScroll: true }); return document.activeElement === rangeLink; })(),
          frame55References: [...document.querySelectorAll('img')].filter(img => /heros55/i.test(img.currentSrc || img.src)).length,
        };
      } else {
        const rows = [...document.querySelectorAll('.cmp-table tbody tr')].map(row => {
          const cells = [...row.children].map(cell => {
            const rect = cell.getBoundingClientRect();
            return { text: cell.textContent.trim(), top: rect.top, height: rect.height };
          });
          const tops = cells.map(cell => cell.top);
          return { cells, topSpread: Math.max(...tops) - Math.min(...tops) };
        });
        const skip = document.querySelector('a.skip-link');
        common.pageSpecific = {
          rows,
          faqSections: document.querySelectorAll('main section.faq').length,
          mainDetails: document.querySelectorAll('main details').length,
          skipLinkPresent: Boolean(skip),
          skipTargetPresent: Boolean(document.querySelector(skip?.getAttribute('href') || '__missing__')),
          skipLinkFocused: (() => { if (!skip) return false; skip.focus({ preventScroll: true }); return document.activeElement === skip; })(),
          crunchyToCreamy: body.innerText.includes('FROM CRUNCHY TO CREAMY'),
        };
      }
      return common;
    }, { name: test.name, expectedWidth: width });

    await page.evaluate(() => document.activeElement?.blur());
    const screenshotPath = path.join(out, `${test.name}-${width}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true, animations: 'disabled', caret: 'hide' });
    const image = sharp(screenshotPath);
    const metadata = await image.metadata();
    const stats = await image.stats();
    const screenshot = {
      path: screenshotPath,
      bytes: fs.statSync(screenshotPath).size,
      width: metadata.width,
      height: metadata.height,
      channelStdev: stats.channels.map(channel => channel.stdev),
    };

    const assertions = {
      http200: response?.status() === 200,
      exactWidth: metrics.clientWidth === width && metrics.scrollWidth === width && Math.round(metrics.bodyWidth) === width,
      nonblank: metrics.textLength > 300 && metrics.bodyHeight > 800 && screenshot.bytes > 10000 && screenshot.channelStdev.some(value => value > 3),
      screenshotWidth: screenshot.width === width,
      imagesHealthy: metrics.brokenImages.length === 0,
      focusablePositive: metrics.focusableCount > 0 && metrics.focusFailures.length === 0,
      jsonLdHealthy: metrics.jsonLd.length === 4 && metrics.invalidJsonLd.length === 0,
      noOverlay: !metrics.overlay,
      noErrors: consoleErrors.length === 0 && pageErrors.length === 0 && requestFailures.length === 0 && badResponses.length === 0,
    };

    if (test.name === 'our-story') {
      const placeholders = metrics.pageSpecific.placeholders;
      assertions.placeholderAccessibility = placeholders.length === 2 && placeholders.every(item => item.role === 'img' && /portrait pending Nate selection$/.test(item.label || '') && item.text.toLowerCase().includes('nate selection required') && item.visible && Math.abs(item.ratio - 0.8) < 0.03);
      assertions.chapterOrder = JSON.stringify(metrics.pageSpecific.chapters) === JSON.stringify([
        { number: '01', label: 'The people behind the product' },
        { number: '02', label: 'How Maple Moon began' },
      ]);
      assertions.rangeLink = metrics.pageSpecific.rangeLinkPresent && metrics.pageSpecific.rangeLinkFocused;
      assertions.frame55Absent = metrics.pageSpecific.frame55References === 0;
    } else {
      assertions.comparisonAlignment = metrics.pageSpecific.rows.length === 3 && metrics.pageSpecific.rows.every(row => row.cells.length === 3 && Math.abs(row.cells[0].top - row.cells[2].top) <= 1 && Math.abs(row.cells[0].height - row.cells[2].height) <= 1 && row.cells[1].top <= row.cells[0].top + 1);
      assertions.noInPageFaq = metrics.pageSpecific.faqSections === 0 && metrics.pageSpecific.mainDetails === 0;
      assertions.skipLinkAccessible = metrics.pageSpecific.skipLinkPresent && metrics.pageSpecific.skipTargetPresent && metrics.pageSpecific.skipLinkFocused;
      assertions.crunchyToCreamy = metrics.pageSpecific.crunchyToCreamy;
    }

    const pass = Object.values(assertions).every(Boolean);
    if (!pass) failures += 1;
    results.push({
      page: test.name,
      width,
      url: `${base}${test.route}`,
      httpStatus: response?.status() ?? null,
      metrics,
      consoleErrors,
      pageErrors,
      requestFailures,
      badResponses,
      screenshot,
      assertions,
      pass,
    });

    console.log(`${pass ? 'PASS' : 'FAIL'} page=${test.name} width=${width} http=${response?.status() ?? 'null'} client=${metrics.clientWidth} scroll=${metrics.scrollWidth} body_height=${metrics.bodyHeight} screenshot=${screenshot.width}x${screenshot.height}/${screenshot.bytes}B text=${metrics.textLength} images=${metrics.imageCount} broken=${metrics.brokenImages.length} focus=${metrics.focusableCount}/${metrics.focusFailures.length} jsonld=${metrics.jsonLd.length}/${metrics.invalidJsonLd.length} console=${consoleErrors.length} page_errors=${pageErrors.length} request_failures=${requestFailures.length} bad_responses=${badResponses.length}`);
    if (!pass) console.log(`ASSERTIONS ${JSON.stringify(assertions)}`);
    await context.close();
  }
}

await browser.close();
const output = { schema: 'maplemoon-lane-f-independent-browser/v1', results, summary: { pass: results.length - failures, fail: failures, total: results.length } };
const outputCandidates = ['browser-results.json', 'browser-results-rerun.json', 'browser-results-final.json', 'browser-results-clean.json'];
const outputPath = path.join(out, outputCandidates.find(name => !fs.existsSync(path.join(out, name))) || 'browser-results-clean.json');
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`SUMMARY pass=${output.summary.pass} fail=${output.summary.fail} total=${output.summary.total}`);
process.exitCode = failures ? 1 : 0;
