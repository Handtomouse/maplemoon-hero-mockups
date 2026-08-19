import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const routes = [['homepage','/homepage.html'],['shop','/shop.html'],['our-story','/our-story.html'],['carob-story','/carob-story.html'],['faq','/faq.html'],['stockists','/stockists.html'],['pure-carob-bar','/products/pure-carob-bar.html']];
const origin = 'http://127.0.0.1:8803';
const browser = await chromium.launch({ headless:true, executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
for (const [route,url] of routes) {
  const context = await browser.newContext({ viewport:{width:390,height:844} }); const page = await context.newPage();
  const errors={console:[],page:[],request:[],response:[]}; page.on('console',m=>{if(m.type()==='error')errors.console.push(m.text())}); page.on('pageerror',e=>errors.page.push(e.message)); page.on('requestfailed',r=>errors.request.push({url:r.url(),error:r.failure()?.errorText})); page.on('response',r=>{if(r.status()>=400)errors.response.push({url:r.url(),status:r.status()})});
  await page.goto(`${origin}${url}`,{waitUntil:'domcontentloaded',timeout:30000}); await page.waitForLoadState('load',{timeout:12000}).catch(()=>{});
  await page.evaluate(async()=>{await document.fonts?.ready;for(const image of [...document.images]){image.loading='eager';image.scrollIntoView({block:'center'});if(!image.complete)await new Promise(resolve=>{const timer=setTimeout(resolve,5000);image.addEventListener('load',()=>{clearTimeout(timer);resolve()},{once:true});image.addEventListener('error',()=>{clearTimeout(timer);resolve()},{once:true})});if(image.complete&&image.naturalWidth)await image.decode().catch(()=>{})}scrollTo(0,0)});await page.waitForTimeout(220);
  await page.evaluate(()=>{scrollTo(0,0);document.activeElement?.blur()}); await page.keyboard.press('Tab');
  const immediate=await page.evaluate(()=>{const a=document.activeElement,r=a?.getBoundingClientRect(),s=a?getComputedStyle(a):null;return{tag:a?.tagName,text:a?.textContent?.replace(/\s+/g,' ').trim(),href:a?.getAttribute?.('href'),scrollY,rect:r?{x:r.x,y:r.y,width:r.width,height:r.height}:null,position:s?.position,top:s?.top,transform:s?.transform,transition:s?.transitionDuration}});
  await page.waitForTimeout(250); const delayed=await page.evaluate(()=>{const a=document.activeElement,r=a?.getBoundingClientRect(),s=a?getComputedStyle(a):null;return{tag:a?.tagName,text:a?.textContent?.replace(/\s+/g,' ').trim(),href:a?.getAttribute?.('href'),scrollY,rect:r?{x:r.x,y:r.y,width:r.width,height:r.height}:null,position:s?.position,top:s?.top,transform:s?.transform,transition:s?.transitionDuration}});
  console.log(JSON.stringify({route,immediate,delayed,errors})); await context.close();
}
await browser.close();
