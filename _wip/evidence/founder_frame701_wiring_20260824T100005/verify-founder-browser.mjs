import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const root = path.dirname(new URL(import.meta.url).pathname);
const baseUrl = process.argv[2] || 'http://127.0.0.1:4317';
const widths = [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
];
const expected = {
  hero: '/assets/our_story/founders_frame701_pair_2400.webp',
  carli: '/assets/our_story/founder_carli_701_v2_2400.webp',
  dylan: '/assets/our_story/founder_dylan_701_v2_2400.webp',
};

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const results = [];
let failures = [];

for (const viewport of widths) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const consoleErrors = [];
  const pageErrors = [];
  const requestFailures = [];
  const badResponses = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', error => pageErrors.push(String(error)));
  page.on('requestfailed', request => requestFailures.push({
    url: request.url(),
    error: request.failure()?.errorText || 'unknown',
  }));
  page.on('response', response => {
    if (response.status() >= 400) badResponses.push({
      status: response.status(),
      url: response.url(),
    });
  });

  const response = await page.goto(`${baseUrl}/our-story.html`, { waitUntil: 'domcontentloaded' });
  await page.locator('img').evaluateAll(images => {
    for (const image of images) {
      image.loading = 'eager';
      image.scrollIntoView({ block: 'center' });
    }
  });
  await page.waitForFunction(() => [...document.images].every(image => image.complete));
  await page.locator('img').evaluateAll(images => Promise.all(images.map(image =>
    typeof image.decode === 'function' ? image.decode().catch(() => undefined) : undefined
  )));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(350);

  await page.evaluate(() => {
    document.body.tabIndex = -1;
    document.body.focus();
  });
  await page.keyboard.press('Tab');
  await page.waitForTimeout(250);
  const skipFocus = await page.evaluate(() => {
    const active = document.activeElement;
    return {
      className: active?.className || '',
      text: active?.textContent?.trim() || '',
      transform: active ? getComputedStyle(active).transform : '',
    };
  });
  await page.evaluate(() => {
    document.activeElement?.blur();
    document.body.removeAttribute('tabindex');
  });
  await page.waitForTimeout(250);
  const skipAfterBlur = await page.evaluate(() => {
    const skip = document.querySelector('.mm-skip-link');
    return {
      activeClassName: document.activeElement?.className || '',
      transform: skip ? getComputedStyle(skip).transform : '',
    };
  });

  const metrics = await page.evaluate(expectedPaths => {
    const root = document.documentElement;
    const hero = document.querySelector('.os-story-hero__portrait img');
    const carli = document.querySelector('img[src*="founder_carli_701_v2"]');
    const dylan = document.querySelector('img[src*="founder_dylan_701_v2"]');
    const imageMetric = image => {
      const rect = image.getBoundingClientRect();
      const style = getComputedStyle(image);
      return {
        src: new URL(image.currentSrc || image.src).pathname,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        complete: image.complete,
        width: Number(rect.width.toFixed(2)),
        height: Number(rect.height.toFixed(2)),
        objectFit: style.objectFit,
        objectPosition: style.objectPosition,
        maskImage: style.maskImage,
        webkitMaskImage: style.webkitMaskImage,
        visible: rect.width > 0 && rect.height > 0,
      };
    };
    const heroFigure = document.querySelector('.os-story-hero__portrait').getBoundingClientRect();
    const sectionRect = selector => {
      const rect = document.querySelector(selector).getBoundingClientRect();
      return {
        x: Number((rect.x + scrollX).toFixed(2)),
        y: Number((rect.y + scrollY).toFixed(2)),
        width: Number(rect.width.toFixed(2)),
        height: Number(rect.height.toFixed(2)),
      };
    };
    const bioContainers = [...document.querySelectorAll('.os-founder-bio')].map(node => {
      const rect = node.getBoundingClientRect();
      return {
        width: Number(rect.width.toFixed(2)),
        height: Number(rect.height.toFixed(2)),
        ratio: Number((rect.width / rect.height).toFixed(4)),
      };
    });
    return {
      clientWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
      heroFigure: {
        width: Number(heroFigure.width.toFixed(2)),
        height: Number(heroFigure.height.toFixed(2)),
      },
      sectionRects: {
        hero: sectionRect('.os-story-hero'),
        bios: sectionRect('.os-founder-notes'),
      },
      hero: imageMetric(hero),
      carli: imageMetric(carli),
      dylan: imageMetric(dylan),
      bioContainers,
      expectedPaths,
      placeholderCount: document.querySelectorAll('.os-founder-placeholder').length,
    };
  }, expected);

  const tag = String(viewport.width);
  await page.screenshot({ path: path.join(root, `our-story-${tag}-full.png`), fullPage: true });

  const assetErrors = [...badResponses, ...requestFailures].filter(item =>
    Object.values(expected).some(asset => item.url.includes(asset))
  );
  const caseFailures = [];
  if (response?.status() !== 200) caseFailures.push(`document status ${response?.status()}`);
  if (metrics.clientWidth !== viewport.width || metrics.scrollWidth !== viewport.width) {
    caseFailures.push(`overflow client=${metrics.clientWidth} scroll=${metrics.scrollWidth}`);
  }
  for (const key of ['hero', 'carli', 'dylan']) {
    const image = metrics[key];
    if (image.src !== expected[key]) caseFailures.push(`${key} wrong source ${image.src}`);
    if (!image.complete || !image.visible || image.naturalWidth === 0 || image.naturalHeight === 0) {
      caseFailures.push(`${key} did not render`);
    }
  }
  if (metrics.hero.naturalWidth !== 2400 || metrics.hero.naturalHeight !== 1600) {
    caseFailures.push(`hero dimensions ${metrics.hero.naturalWidth}x${metrics.hero.naturalHeight}`);
  }
  if (metrics.carli.naturalWidth !== 1993 || metrics.carli.naturalHeight !== 2400) {
    caseFailures.push(`Carli dimensions ${metrics.carli.naturalWidth}x${metrics.carli.naturalHeight}`);
  }
  if (metrics.dylan.naturalWidth !== 2008 || metrics.dylan.naturalHeight !== 2400) {
    caseFailures.push(`Dylan dimensions ${metrics.dylan.naturalWidth}x${metrics.dylan.naturalHeight}`);
  }
  if (metrics.placeholderCount !== 0) caseFailures.push(`placeholder count ${metrics.placeholderCount}`);
  if (metrics.bioContainers.length !== 2 || metrics.bioContainers.some(box => Math.abs(box.ratio - 0.8) > 0.01)) {
    caseFailures.push(`bio ratio mismatch ${JSON.stringify(metrics.bioContainers)}`);
  }
  if (metrics.carli.objectFit !== 'cover' || metrics.dylan.objectFit !== 'cover') {
    caseFailures.push('bio object-fit is not cover');
  }
  if (metrics.carli.objectPosition !== '50% 35%' || metrics.dylan.objectPosition !== '50% 35%') {
    caseFailures.push('bio object-position is not 50% 35%');
  }
  if (!metrics.carli.maskImage.includes('linear-gradient') || !metrics.dylan.maskImage.includes('linear-gradient')) {
    caseFailures.push('bio vertical mask missing');
  }
  if (assetErrors.length) caseFailures.push(`founder asset errors ${JSON.stringify(assetErrors)}`);
  if (!skipFocus.className.includes('mm-skip-link') || skipFocus.text !== 'Skip to the people') {
    caseFailures.push(`skip focus mismatch ${JSON.stringify(skipFocus)}`);
  }
  if (skipAfterBlur.activeClassName.includes('mm-skip-link') || skipAfterBlur.transform === 'none') {
    caseFailures.push(`skip blur mismatch ${JSON.stringify(skipAfterBlur)}`);
  }

  const result = {
    viewport,
    documentStatus: response?.status() || null,
    metrics,
    skipFocus,
    skipAfterBlur,
    consoleErrors,
    pageErrors,
    requestFailures,
    badResponses,
    assetErrors,
    failures: caseFailures,
  };
  results.push(result);
  failures = failures.concat(caseFailures.map(failure => `${viewport.width}: ${failure}`));
  await page.close();
}

await browser.close();
const output = {
  outcome: failures.length ? 'FAIL' : 'PASS',
  baseUrl,
  cases: results,
  failures,
};
fs.writeFileSync(path.join(root, 'browser-results.json'), `${JSON.stringify(output, null, 2)}\n`);
console.log(`FOUNDER_BROWSER ${output.outcome} cases=${results.length}/${widths.length} failures=${failures.length}`);
for (const result of results) {
  console.log(`CASE width=${result.viewport.width} root=${result.metrics.clientWidth}/${result.metrics.scrollWidth} hero=${result.metrics.hero.naturalWidth}x${result.metrics.hero.naturalHeight} bios=${result.metrics.carli.naturalWidth}x${result.metrics.carli.naturalHeight},${result.metrics.dylan.naturalWidth}x${result.metrics.dylan.naturalHeight} errors=${result.consoleErrors.length}/${result.pageErrors.length}/${result.requestFailures.length}/${result.badResponses.length} founder_asset_errors=${result.assetErrors.length} failures=${result.failures.length}`);
}
if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
}
