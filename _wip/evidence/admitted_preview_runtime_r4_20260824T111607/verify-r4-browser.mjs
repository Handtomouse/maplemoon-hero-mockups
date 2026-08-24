import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const root = path.dirname(new URL(import.meta.url).pathname);
const base = process.argv[2] || 'http://127.0.0.1:4325';
const routes = [
  ['homepage','/homepage.html'], ['shop','/shop.html'], ['our-story','/our-story.html'],
  ['carob-story','/carob-story.html'], ['faq','/faq.html'], ['stockists','/stockists.html'],
  ['pure-carob-bar','/products/pure-carob-bar.html'],
];
const browser = await chromium.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:true });
const rows = [], failures = [];
for (const [route, pathname] of routes) {
  for (const width of [390,1440]) {
    const page = await browser.newPage({ viewport:{ width, height:width===390?844:1000 } });
    const consoleErrors=[], pageErrors=[], requestFailures=[], badResponses=[];
    page.on('console', m=>{ if(m.type()==='error') consoleErrors.push(m.text()); });
    page.on('pageerror', e=>pageErrors.push(String(e)));
    page.on('requestfailed', r=>requestFailures.push({url:r.url(),error:r.failure()?.errorText||'unknown'}));
    page.on('response', r=>{ if(r.status()>=400) badResponses.push({status:r.status(),url:r.url()}); });
    const response = await page.goto(`${base}${pathname}`, {waitUntil:'domcontentloaded'});
    await page.locator('img').evaluateAll(images=>images.forEach(image=>{image.loading='eager';image.scrollIntoView({block:'center'});}));
    await page.waitForFunction(()=>[...document.images].every(image=>image.complete), null, {timeout:30000});
    await page.locator('img').evaluateAll(images=>Promise.all(images.map(image=>typeof image.decode==='function'?image.decode().catch(()=>undefined):undefined)));
    if(route==='stockists'){
      const more=page.locator('#stockistShowMore');
      for(let step=0;step<30;step+=1){if(await more.isHidden())break;await more.click();await page.waitForTimeout(25);}
      if(!(await more.isHidden()))throw new Error('Stockist pager did not exhaust');
    }
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.waitForTimeout(200);
    const metrics=await page.evaluate(()=>{
      const doc=document.documentElement, images=[...document.images], text=document.body?.innerText||'';
      const cards=[...document.querySelectorAll('.st-result')], unknown=cards.filter(card=>card.classList.contains('is-pending'));
      const powder=images.find(image=>(image.currentSrc||image.src).includes('powder_roasted'));
      return {clientWidth:doc.clientWidth,scrollWidth:doc.scrollWidth,textLength:text.trim().length,images:images.length,
        broken:images.filter(image=>!image.complete||!image.naturalWidth||!image.naturalHeight).map(image=>image.currentSrc||image.src),
        powder:powder?`${powder.naturalWidth}x${powder.naturalHeight}`:null,
        founders:images.filter(image=>(image.currentSrc||image.src).includes('founder')).length,
        quotes:document.querySelectorAll('.mm-review-grid > div').length,
        stockistCards:cards.length,unknownCards:unknown.length,unknownVisible:unknown.filter(card=>!card.hidden&&getComputedStyle(card).display!=='none').length,
        unknownNeutral:unknown.filter(card=>card.innerText.includes('Location details unavailable')).length,
        forbidden:['consent pending','WIP quotes','noindexed','testimonial selection pending','need client confirmation','Needs confirmation','Directory preview only','Source note'].filter(v=>text.includes(v))};
    });
    const errs=[];
    if(response?.status()!==200)errs.push(`status ${response?.status()}`);
    if(metrics.clientWidth!==width||metrics.scrollWidth!==width)errs.push(`overflow ${metrics.clientWidth}/${metrics.scrollWidth}`);
    if(metrics.textLength<100)errs.push(`short body ${metrics.textLength}`);
    if(metrics.broken.length)errs.push(`broken ${JSON.stringify(metrics.broken)}`);
    if(metrics.forbidden.length)errs.push(`forbidden ${metrics.forbidden.join('|')}`);
    if(route==='homepage'&&metrics.quotes!==3)errs.push(`quotes ${metrics.quotes}/3`);
    if(route==='shop'&&metrics.powder!=='3640x2078')errs.push(`powder ${metrics.powder}`);
    if(route==='our-story'&&metrics.founders!==3)errs.push(`founders ${metrics.founders}/3`);
    if(route==='stockists'&&(metrics.stockistCards!==204||metrics.unknownCards!==7||metrics.unknownVisible!==7||metrics.unknownNeutral!==7))errs.push(`stockists cards=${metrics.stockistCards} unknown=${metrics.unknownCards}/${metrics.unknownVisible}/${metrics.unknownNeutral}`);
    if(consoleErrors.length)errs.push(`console ${JSON.stringify(consoleErrors)}`);
    if(pageErrors.length)errs.push(`page ${JSON.stringify(pageErrors)}`);
    if(requestFailures.length)errs.push(`request ${JSON.stringify(requestFailures)}`);
    if(badResponses.length)errs.push(`response ${JSON.stringify(badResponses)}`);
    failures.push(...errs.map(e=>`${route}@${width}: ${e}`));
    await page.screenshot({path:path.join(root,`route-${route}-${width}.png`),fullPage:true});
    rows.push({route,pathname,width,status:response?.status()||null,metrics,consoleErrors,pageErrors,requestFailures,badResponses,failures:errs});
    await page.close();
  }
}
await browser.close();
const result={outcome:failures.length?'FAIL':'PASS',base,cases:rows.length,rows,failures};
fs.writeFileSync(path.join(root,'r4-browser-results.json'),`${JSON.stringify(result,null,2)}\n`);
console.log(`R4_BROWSER ${result.outcome} cases=${rows.length}/14 failures=${failures.length}`);
for(const row of rows)console.log(`CASE ${row.route}@${row.width} status=${row.status} root=${row.metrics.clientWidth}/${row.metrics.scrollWidth} stockists=${row.metrics.stockistCards}/${row.metrics.unknownVisible} images=${row.metrics.images}/${row.metrics.broken.length} runtime=${row.consoleErrors.length}/${row.pageErrors.length}/${row.requestFailures.length}/${row.badResponses.length} failures=${row.failures.length}`);
if(failures.length){failures.forEach(f=>console.error(`FAIL ${f}`));process.exitCode=1;}
