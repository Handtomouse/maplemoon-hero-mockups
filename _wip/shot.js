const puppeteer = require('puppeteer-core');
const fs = require('fs');
const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
];
const exe = CHROME_CANDIDATES.find(p => fs.existsSync(p));
if (!exe) { console.error('No Chrome found'); process.exit(2); }
const tag = process.argv[2] || 'wip';
const pages = (process.argv[3] || 'homepage_real_1_lead_photo.WIP.html').split(',');
const widths = (process.argv[4] || '390,1440').split(',').map(Number);
const OUT = '/Users/handtomouse/maplemoon-website/_wip/checkpoints';
fs.mkdirSync(OUT, { recursive: true });
const DATE = '2026-07-14';
(async () => {
  const browser = await puppeteer.launch({
    executablePath: exe, headless: 'new',
    args: ['--no-sandbox','--hide-scrollbars','--force-color-profile=srgb'],
  });
  for (const pg of pages) {
    const short = pg.replace('.WIP.html','').replace('homepage_real_1_lead_photo','home');
    for (const w of widths) {
      const page = await browser.newPage();
      const isMobile = w <= 480;
      await page.setViewport({ width: w, height: isMobile ? 844 : 900, deviceScaleFactor: 2, isMobile, hasTouch: isMobile });
      const url = `http://localhost:3005/_wip/${pg}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
        await page.evaluate(() => document.fonts && document.fonts.ready);
        await new Promise(r => setTimeout(r, 900));
        const out = `${OUT}/${DATE}_${tag}_${short}_${w}.png`;
        await page.screenshot({ path: out, fullPage: true });
        console.log('shot', out);
      } catch (e) { console.error('FAIL', pg, w, e.message); }
      await page.close();
    }
  }
  await browser.close();
  console.log('done');
})();
