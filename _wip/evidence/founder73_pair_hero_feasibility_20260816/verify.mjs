import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/founder73_pair_hero_feasibility_20260816';
const review = `file://${path.join(output, 'review.html')}`;
const viewports = [{ width: 390, height: 844 }, { width: 1440, height: 1100 }];
const results = [];
const failures = [];

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--allow-file-access-from-files'],
});

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const telemetry = { console: [], page: [], request: [] };
  page.on('console', message => { if (message.type() === 'error') telemetry.console.push(message.text()); });
  page.on('pageerror', error => telemetry.page.push(error.message));
  page.on('requestfailed', request => telemetry.request.push(`${request.url()} :: ${request.failure()?.errorText || 'unknown'}`));
  await page.goto(review, { waitUntil: 'load' });
  await page.waitForFunction(() => [...document.images].every(image => image.complete), null, { timeout: 10000 });
  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyHeight: Math.ceil(document.body.getBoundingClientRect().height),
    specimens: [...document.querySelectorAll('[data-specimen]')].map(specimen => {
      const image = specimen.querySelector('img');
      const frame = specimen.querySelector('.frame').getBoundingClientRect();
      const naturalRatio = image.naturalWidth / image.naturalHeight;
      const frameRatio = frame.width / frame.height;
      const cropAxis = Math.abs(naturalRatio - frameRatio) < .002 ? 'none' : naturalRatio > frameRatio ? 'horizontal' : 'vertical';
      const retained = cropAxis === 'none' ? 1 : cropAxis === 'horizontal' ? frameRatio / naturalRatio : naturalRatio / frameRatio;
      return {
        id: specimen.dataset.specimen,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        complete: image.complete,
        frameWidth: frame.width,
        frameHeight: frame.height,
        naturalRatio,
        frameRatio,
        cropAxis,
        retainedFraction: retained,
      };
    }),
  }));
  const screenshot = path.join(output, `comparison-${viewport.width}.png`);
  await page.screenshot({ path: screenshot, fullPage: true });
  const localFailures = [];
  if (metrics.clientWidth !== viewport.width || metrics.scrollWidth !== viewport.width) localFailures.push('viewport-overflow');
  if (metrics.specimens.length !== 2) localFailures.push('specimen-count');
  for (const specimen of metrics.specimens) {
    if (!specimen.complete || specimen.naturalWidth < 1 || specimen.naturalHeight < 1) localFailures.push(`${specimen.id}-broken`);
    if (specimen.id === 'frame73' && (specimen.cropAxis !== 'none' || specimen.retainedFraction < .999)) localFailures.push('frame73-crop');
  }
  if (telemetry.console.length || telemetry.page.length || telemetry.request.length) localFailures.push('runtime-error');
  results.push({ viewport, metrics, telemetry, screenshot, failures: localFailures, result: localFailures.length ? 'FAIL' : 'PASS' });
  failures.push(...localFailures.map(failure => `${viewport.width}:${failure}`));
  await page.close();
}

await browser.close();
const payload = { source: { review }, results, failures, result: failures.length ? 'FAIL' : 'PASS' };
fs.writeFileSync(path.join(output, 'results.json'), `${JSON.stringify(payload, null, 2)}\n`);
for (const row of results) {
  const candidate = row.metrics.specimens.find(specimen => specimen.id === 'frame73');
  console.log(`${row.result} width=${row.viewport.width} client=${row.metrics.clientWidth} scroll=${row.metrics.scrollWidth} frame73=${candidate.naturalWidth}x${candidate.naturalHeight} frame=${candidate.frameWidth.toFixed(2)}x${candidate.frameHeight.toFixed(2)} crop=${candidate.cropAxis} retained=${candidate.retainedFraction.toFixed(6)} console=${row.telemetry.console.length} page=${row.telemetry.page.length} request=${row.telemetry.request.length}`);
}
console.log(`SUMMARY result=${payload.result} pass=${results.filter(row => row.result === 'PASS').length} fail=${failures.length} total=${results.length}`);
process.exit(failures.length ? 1 : 0);
