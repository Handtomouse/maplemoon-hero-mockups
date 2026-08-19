const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const widths = [390, 900, 1440];
const routes = [
  { name: 'stockists', url: 'http://127.0.0.1:4390/stockists.html' },
  { name: 'carob-story', url: 'http://127.0.0.1:4390/carob-story.html' },
  { name: 'shop', url: 'http://127.0.0.1:4390/shop.html' },
];
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/header_powder_update_20260814T140152';

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const results = [];
  for (const route of routes) {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
      const errors = [];
      const responses = [];
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
      page.on('pageerror', error => errors.push(`PAGEERROR ${error.message}`));
      page.on('response', response => {
        if (/silhouette_closeup|carob_branch_hero|powder_roasted/.test(response.url())) {
          responses.push({ url: response.url(), status: response.status() });
        }
      });
      const response = await page.goto(route.url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      if (route.name === 'shop') {
        const powder = page.locator('img[src*="powder_roasted.webp"]');
        await powder.scrollIntoViewIfNeeded();
        await page.waitForFunction(() => {
          const image = [...document.images].find(candidate => candidate.src.includes('powder_roasted.webp'));
          return image && image.complete && image.naturalWidth > 0;
        });
      }
      await page.waitForTimeout(300);
      const metrics = await page.evaluate(({ name, width: measuredWidth }) => {
        const doc = document.documentElement;
        const overlay = document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay');
        const base = {
          name,
          requestedWidth: measuredWidth,
          clientWidth: doc.clientWidth,
          scrollWidth: doc.scrollWidth,
          overflow: doc.scrollWidth > doc.clientWidth,
          bodyText: document.body.innerText.trim().length,
          overlay: Boolean(overlay),
        };
        if (name === 'stockists') {
          const head = document.querySelector('.sp-head');
          const heading = head.querySelector('h1');
          const copy = head.querySelector('p');
          const pseudo = getComputedStyle(head, '::after');
          const headRect = head.getBoundingClientRect();
          const headingRect = heading.getBoundingClientRect();
          const copyRect = copy.getBoundingClientRect();
          return {
            ...base,
            photo: {
              display: pseudo.display,
              backgroundImage: pseudo.backgroundImage,
              opacity: pseudo.opacity,
              width: pseudo.width,
              height: pseudo.height,
              top: pseudo.top,
              bottom: pseudo.bottom,
            },
            head: { top: headRect.top, bottom: headRect.bottom, height: headRect.height },
            heading: { top: headingRect.top, bottom: headingRect.bottom },
            copy: { top: copyRect.top, bottom: copyRect.bottom },
          };
        }
        if (name === 'carob-story') {
          const picture = document.querySelector('.hero .pic picture');
          const image = picture.querySelector('img');
          const pic = document.querySelector('.hero .pic');
          const column = document.querySelector('.hero .col');
          const imageRect = image.getBoundingClientRect();
          const columnRect = column.getBoundingClientRect();
          const picRect = pic.getBoundingClientRect();
          const imageStyle = getComputedStyle(image);
          const pictureStyle = getComputedStyle(picture);
          const overlaps = !(imageRect.right <= columnRect.left || imageRect.left >= columnRect.right || imageRect.bottom <= columnRect.top || imageRect.top >= columnRect.bottom);
          return {
            ...base,
            pic: { left: picRect.left, right: picRect.right, top: picRect.top, bottom: picRect.bottom, width: picRect.width, height: picRect.height },
            column: { left: columnRect.left, right: columnRect.right, top: columnRect.top, bottom: columnRect.bottom },
            image: {
              naturalWidth: image.naturalWidth,
              naturalHeight: image.naturalHeight,
              border: imageStyle.border,
              borderRadius: imageStyle.borderRadius,
              boxShadow: imageStyle.boxShadow,
              maskImage: imageStyle.maskImage,
            },
            picture: { maskImage: pictureStyle.maskImage },
            textImageOverlap: overlaps,
          };
        }
        const image = [...document.images].find(candidate => candidate.src.includes('powder_roasted.webp'));
        const field = image.closest('.ph');
        const imageRect = image.getBoundingClientRect();
        const fieldRect = field.getBoundingClientRect();
        return {
          ...base,
          powder: {
            naturalWidth: image.naturalWidth,
            naturalHeight: image.naturalHeight,
            left: imageRect.left,
            top: imageRect.top,
            width: imageRect.width,
            height: imageRect.height,
            complete: image.complete,
          },
          field: {
            left: fieldRect.left,
            top: fieldRect.top,
            width: fieldRect.width,
            height: fieldRect.height,
            background: getComputedStyle(field).backgroundImage,
          },
        };
      }, { name: route.name, width });
      await page.screenshot({ path: `${output}/${route.name}_${width}.png`, fullPage: true });
      const detailSelector = route.name === 'stockists' ? '.sp-head' : route.name === 'carob-story' ? '.hero' : '.sp-compact-powder';
      await page.locator(detailSelector).first().screenshot({ path: `${output}/${route.name}_${width}_detail.png` });
      results.push({ route: route.name, width, http: response.status(), responses, errors, metrics });
      await page.close();
    }
  }
  await browser.close();
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
