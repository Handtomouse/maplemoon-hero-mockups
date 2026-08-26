import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const { chromium }=require('/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
for(const width of [1440,1024,768,390,320]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();
  const cdp=await context.newCDPSession(page);
  await cdp.send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
  await page.goto('http://127.0.0.1:8874/homepage.html',{waitUntil:'load'});
  await page.evaluate(async()=>{await document.fonts?.ready;for(const image of document.images){image.loading='eager';if(!image.complete)await new Promise(resolve=>{image.addEventListener('load',resolve,{once:true});image.addEventListener('error',resolve,{once:true});});}});
  const result=await page.evaluate(()=>{
    const rect=element=>{const b=element.getBoundingClientRect();return{x:b.x,y:b.y,width:b.width,height:b.height,right:b.right,bottom:b.bottom};};
    const why=rect(document.querySelector('#why'));
    const compare=rect(document.querySelector('.q-compare-pro'));
    const panels=[...document.querySelectorAll('#why .q-panel')].map(rect);
    const rows=[...document.querySelectorAll('#why .q-panel-row')].map(rect);
    const sbox=rect(document.querySelector('#sampler .sbox'));
    const starterImages=[...document.querySelectorAll('#sampler .sbox-grid img')].map(rect);
    return{innerWidth,why,compare,panels,rows,sideBySide:panels.length===2&&Math.abs(panels[0].y-panels[1].y)<=2&&panels[1].x>=panels[0].right-1,stacked:panels.length===2&&panels[1].y>=panels[0].bottom-1,contained:panels.every(panel=>panel.x>=why.x-1&&panel.right<=why.right+1)&&rows.every(row=>row.x>=why.x-1&&row.right<=why.right+1),siteFooters:document.querySelectorAll('footer.mm-site-footer').length,allFooters:document.querySelectorAll('footer').length,newsletter:[...document.querySelectorAll('#footer input,#footer button')].map(element=>({html:element.outerHTML,disabled:element.disabled})),sbox,starterImages};
  });
  process.stdout.write(`${JSON.stringify({width,...result})}\n`);
  await context.close();
}
await browser.close();
