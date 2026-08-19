const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const baseUrl = 'http://127.0.0.1:4391';
const evidenceDir = '/Users/handtomouse/maplemoon-website/_wip/evidence/content_catalogue_truth_audit_20260814T161450';
const exactQuestion = 'Does carob contain caffeine?';
const exactAnswer = 'Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list.';

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const rows = [];
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
    const faq = await context.newPage();
    const faqResponse = await faq.goto(`${baseUrl}/faq.html`, { waitUntil: 'load' });
    await faq.evaluate(() => document.fonts.ready);
    const faqItem = faq.locator('.faq-item').filter({ hasText: exactQuestion });
    await faqItem.locator('.faq-question').click();
    await faqItem.scrollIntoViewIfNeeded();
    const faqState = await faqItem.evaluate((item, answer) => ({
      question: item.querySelector('.faq-question')?.textContent.replace(/^\s*\d+/, '').replace(/\+\s*$/, '').trim(),
      answer: item.querySelector('.faq-answer')?.textContent.replace(/\s+/g, ' ').trim(),
      expanded: item.querySelector('.faq-question')?.getAttribute('aria-expanded'),
      answerHidden: item.querySelector('.faq-answer')?.hidden,
      answerMatches: item.querySelector('.faq-answer')?.textContent.replace(/\s+/g, ' ').trim() === answer,
    }), exactAnswer);
    const faqScreenshot = path.join(evidenceDir, `faq_${width}_caffeine-open.png`);
    await faqItem.screenshot({ path: faqScreenshot });

    const homepage = await context.newPage();
    const homeResponse = await homepage.goto(`${baseUrl}/homepage.html`, { waitUntil: 'load' });
    await homepage.evaluate(() => document.fonts.ready);
    const newsletter = homepage.locator('form:has(input[type="email"])').first();
    await newsletter.locator('input[type="email"]').fill('audit@example.invalid');
    await newsletter.locator('button[type="submit"], input[type="submit"]').click();
    await homepage.waitForTimeout(100);
    await newsletter.scrollIntoViewIfNeeded();
    const newsletterState = await newsletter.evaluate(form => {
      const statusId = form.getAttribute('aria-describedby');
      const status = statusId ? document.getElementById(statusId) : null;
      return {
        inputCleared: form.querySelector('input[type="email"]')?.value === '',
        statusText: status?.textContent.replace(/\s+/g, ' ').trim() || '',
        statusHidden: status?.hidden ?? null,
        storageContainsAuditEmail: JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } }).includes('audit@example.invalid'),
      };
    });
    const newsletterScreenshot = path.join(evidenceDir, `homepage_${width}_newsletter-review.png`);
    await newsletter.locator('xpath=..').screenshot({ path: newsletterScreenshot });

    rows.push({
      width,
      faqHttp: faqResponse.status(),
      faqState,
      faqScreenshot,
      homeHttp: homeResponse.status(),
      newsletterState,
      newsletterScreenshot,
    });
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(evidenceDir, 'content-state-results.json'), `${JSON.stringify(rows, null, 2)}\n`);
  const failures = [];
  for (const row of rows) {
    if (row.faqHttp !== 200 || row.homeHttp !== 200) failures.push(`${row.width} HTTP`);
    if (row.faqState.question !== exactQuestion || !row.faqState.answerMatches || row.faqState.expanded !== 'true' || row.faqState.answerHidden) failures.push(`${row.width} FAQ state`);
    if (!row.newsletterState.inputCleared || row.newsletterState.statusHidden || row.newsletterState.storageContainsAuditEmail) failures.push(`${row.width} newsletter state`);
    for (const screenshot of [row.faqScreenshot, row.newsletterScreenshot]) {
      if (!fs.statSync(screenshot).size) failures.push(`${row.width} blank screenshot ${screenshot}`);
    }
  }
  console.log(JSON.stringify({ cases: rows.length, screenshots: rows.length * 2, failures }, null, 2));
  if (failures.length) process.exitCode = 2;
}

run().catch(error => {
  console.error(error.stack || error);
  process.exit(1);
});
