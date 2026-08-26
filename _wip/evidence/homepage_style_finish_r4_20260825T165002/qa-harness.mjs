import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const sharp = require(`${runtime}/sharp`);

const packetId = 'MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002';
const evidenceRoot = '/Users/handtomouse/maplemoon-website/_wip/evidence/homepage_style_finish_r4_20260825T165002';
const snapshot = path.join(evidenceRoot, 'source-snapshot.WIP.html');
const baselineRoot = path.join(evidenceRoot, 'baseline');
const candidateRoot = '/Users/handtomouse/maplemoon-website/_wip/deploy/generated/maplemoon-homepage-style-finish-r4-20260825T165002';
const liveHomepage = '/Users/handtomouse/maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html';
const overflowModule = '/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-responsive-overflow.mjs';
const widths = [
  { width: 1440, height: 1000 }, { width: 1024, height: 900 }, { width: 768, height: 1024 },
  { width: 390, height: 844 }, { width: 320, height: 700 },
];
const expectedFlow = ['top', 'range', 'carob', 'why', 'ritual', 'story', 'who', 'stockists', 'reviews', 'sampler', 'trust', 'footer'];
const states = [
  { id: 'full-page', kind: 'full' },
  { id: 'hero-header', kind: 'element', selector: '#top', pad: 0 },
  { id: 'carob-hotspots', kind: 'element', selector: '#carob', pad: 80 },
  { id: 'comparison', kind: 'element', selector: '#why', pad: 60 },
  { id: 'story-credit', kind: 'element', selector: '.wf-photo-credit', pad: 160 },
  { id: 'starter-core', kind: 'element', selector: '#sampler .sbox', pad: 90 },
  { id: 'footer', kind: 'element', selector: '#footer', pad: 40 },
  { id: 'story-top-boundary', kind: 'boundary', selector: '#story', edge: 'top' },
  { id: 'story-credit-boundary', kind: 'boundary', selector: '.wf-photo-credit', edge: 'top' },
  { id: 'story-bottom-boundary', kind: 'boundary', selector: '#story', edge: 'bottom' },
  { id: 'sampler-top-boundary', kind: 'boundary', selector: '#sampler', edge: 'top' },
  { id: 'sampler-bottom-boundary', kind: 'boundary', selector: '#sampler', edge: 'bottom' },
];
const reviewStates = ['hero-header', 'carob-hotspots', 'comparison', 'story-credit', 'starter-core', 'footer', 'story-top-boundary', 'story-credit-boundary', 'story-bottom-boundary', 'sampler-top-boundary', 'sampler-bottom-boundary'];
const expectedSnapshotHash = '792e6508d21a4b1840f5a35fd28af05962030a7e2e32e73cda4651c7e5a48dd9';
const expectedBaselineHash = '394b65d1f98b931cc6fa90f685a363654ad3baa691321be1c8bc524d07c825c1';
const pinnedFiles = {
  '/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R3-20260825T164343.md': 'f8628f037332ad8905812139c9223bcded425af978b35a29fe61cf7a04994b3b',
  '/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R3-20260825T164343.json': '8324a3aebb318addc8e6cd3912327337df6e8560fbc6fa85ecd8c599a2d0410d',
  '/Users/handtomouse/maplemoon-website/scripts/build-maplemoon-homepage-style-finish-r3-20260825T164343.mjs': '8a45fbaa12a31b01c579ac02adb7ca256b5072d61497436941129659e349ca05',
  '/Users/handtomouse/maplemoon-website/_wip/evidence/homepage_style_finish_r3_20260825T164343/DRIFT-HOLD.md': '8d03ce694368f99734e31515549550c524d176219795f926fe5abffe6a52d0fd',
  '/Users/handtomouse/maplemoon-website/scripts/build-maplemoon-wip-preview.py': 'c8ea6c34d0207f9388ebf479f1c92ea77d63d61f5614cbbcf10a3896ef8c334a',
  '/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/HOMEPAGE-STYLES-DECISIONS-20260824.md': 'c9f286b5d2c5b5367e74362e1ea69bbbf9b52be7be8bbccf6f4f668b7083a0d9',
  '/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/homepage-styles-batch-01.html': '15ce5c5679d9f978db50c31b25ac59fd004acd19014e9fc80e3d613b46ee642e',
  '/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-homepage-structure-preserved-style-tuning.html': 'c603d3e26b4db821a18e2ca937f0b62ddc01b1ca2cc0ccb81571eb1926e0bdca',
  '/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/homepage-what-is-carob-batch-06.html': '7f95350047a7676499d785788655e34ee8c645f07e5a5a05ad6d1972addd8560',
  '/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-homepage-hybrid-current-vs-tuned.html': '1e22c01f02c973867692ccc4f942fcd150c5c1a92365a34bef2573987b3a4966',
  '/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-lane-2-homepage-system.html': '6d5b7a0986a698932b52fbdef67ef6a679b4dba4999feca9a3c686ec29328cf6',
};
const frozenDuringQa = [
  '/Users/handtomouse/maplemoon-website/_wip/our-story.WIP.html',
  '/Users/handtomouse/maplemoon-website/_wip/shop.WIP.html',
  '/Users/handtomouse/maplemoon-website/_wip/stockists.WIP.html',
  '/Users/handtomouse/maplemoon_build_20260813/mock-cart.js',
];

const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const shaFile = file => sha(fs.readFileSync(file));
const writeJson = (file, value) => fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
const norm = value => String(value ?? '').replace(/\s+/g, ' ').trim();
const round = value => Math.round(value * 100) / 100;

function receiptDigest(root) {
  const files = [];
  const walk = directory => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(absolute);
      else if (entry.isFile()) files.push({ relative: path.relative(root, absolute).split(path.sep).join('/'), sha256: shaFile(absolute), bytes: fs.statSync(absolute).size });
      else throw new Error(`unsupported tree entry ${absolute}`);
    }
  };
  walk(root);
  files.sort((a, b) => a.relative < b.relative ? -1 : a.relative > b.relative ? 1 : 0);
  const digest = crypto.createHash('sha256');
  for (const file of files) { digest.update(file.relative); digest.update('\0'); digest.update(file.sha256); digest.update('\n'); }
  return { root, sha256: digest.digest('hex'), count: files.length, bytes: files.reduce((sum, file) => sum + file.bytes, 0), files };
}

function nextAttempt() {
  const root = path.join(evidenceRoot, 'qa-attempts');
  fs.mkdirSync(root, { recursive: true });
  const ids = fs.readdirSync(root).filter(name => /^attempt-\d{3}$/.test(name)).map(name => Number(name.slice(-3)));
  const id = String((ids.length ? Math.max(...ids) : 0) + 1).padStart(3, '0');
  const attempt = path.join(root, `attempt-${id}`);
  for (const name of ['proofs', 'contacts', 'review-sheets', 'additional', 'positive-controls']) fs.mkdirSync(path.join(attempt, name), { recursive: true });
  return attempt;
}

function mime(file) {
  const ext = path.extname(file).toLowerCase();
  return ({ '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4','.woff2':'font/woff2' })[ext] || 'application/octet-stream';
}

function serve(root) {
  const server = http.createServer((request, response) => {
    let pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    if (pathname === '/') pathname = '/homepage.html';
    if (!path.extname(pathname) && fs.existsSync(path.join(root, `${pathname}.html`))) pathname += '.html';
    const file = path.resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) { response.writeHead(403); response.end(); return; }
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { response.writeHead(404); response.end('Not found'); return; }
    const stat = fs.statSync(file);
    response.writeHead(200, { 'content-type': mime(file), 'content-length': stat.size, 'cache-control':'no-store' });
    fs.createReadStream(file).pipe(response);
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve({ server, origin:`http://127.0.0.1:${server.address().port}` })));
}

function telemetry(page) {
  const state = { consoleErrors:[], pageErrors:[], requestFailures:[], mediaAbortWarnings:[], badResponses:[] };
  page.on('console', message => { if (message.type() === 'error') state.consoleErrors.push(message.text()); });
  page.on('pageerror', error => state.pageErrors.push(error.message));
  page.on('requestfailed', request => {
    const row = { url:request.url(), error:request.failure()?.errorText || 'unknown' };
    if (/\.mp4(?:\?|$)/.test(row.url) && /ABORTED/i.test(row.error)) state.mediaAbortWarnings.push(row); else state.requestFailures.push(row);
  });
  page.on('response', response => { if (response.status() >= 400) state.badResponses.push({ url:response.url(), status:response.status() }); });
  return state;
}

async function exactPage(browser, origin, width, height, { reducedMotion='reduce' }={}) {
  const context = await browser.newContext({ reducedMotion, viewport:{ width, height } });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor:1, mobile:false });
  const errors = telemetry(page);
  const response = await page.goto(`${origin}/homepage.html`, { waitUntil:'domcontentloaded', timeout:30000 });
  await page.waitForLoadState('load', { timeout:20000 }).catch(() => {});
  await page.evaluate(async () => {
    await document.fonts?.ready;
    document.documentElement.style.setProperty('scroll-behavior','auto','important');
    document.body.style.setProperty('scroll-behavior','auto','important');
    for (const image of [...document.images]) {
      image.loading = 'eager';
      if (!image.complete) await new Promise(resolve => {
        const timer=setTimeout(resolve,8000);
        image.addEventListener('load',()=>{clearTimeout(timer);resolve();},{once:true});
        image.addEventListener('error',()=>{clearTimeout(timer);resolve();},{once:true});
      });
      if (image.complete && image.naturalWidth) await image.decode().catch(()=>{});
    }
    scrollTo(0,0);
  });
  await page.locator('#stage .cf-item').first().waitFor({ state:'attached', timeout:10000 }).catch(()=>{});
  await page.waitForTimeout(250);
  return { context, page, cdp, errors, status:response?.status() || 0 };
}

async function projection(page) {
  return page.evaluate(() => {
    const norm=value=>String(value??'').replace(/\s+/g,' ').trim();
    const attrs=(element,names)=>Object.fromEntries(names.map(name=>[name,element.getAttribute(name)]));
    const text=[]; const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    for(let node=walker.nextNode();node;node=walker.nextNode()){
      const parent=node.parentElement,value=norm(node.nodeValue); if(!value||parent.closest('script,style,template,noscript,[aria-hidden="true"]'))continue;
      const style=getComputedStyle(parent); if(style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0||parent.getClientRects().length===0)continue; text.push(value);
    }
    return {
      flow:[...document.querySelectorAll('#top,main>section[id],#footer')].map(element=>element.id),
      text,
      links:[...document.querySelectorAll('a')].map(element=>({text:norm(element.textContent),...attrs(element,['href','aria-label','target','rel','class','id'])})),
      controls:[...document.querySelectorAll('button,input,select,textarea')].map(element=>({tag:element.tagName,text:norm(element.textContent),disabled:Boolean(element.disabled),...attrs(element,['type','name','value','aria-label','aria-expanded','aria-selected','class','id','data-cat'])})),
      media:[...document.querySelectorAll('img,video,source,picture')].map(element=>({tag:element.tagName,...attrs(element,['src','srcset','sizes','poster','alt','width','height','loading','decoding','media','type','class','id'])})),
      scripts:[...document.scripts].map(element=>({src:element.getAttribute('src'),type:element.getAttribute('type'),id:element.id,text:element.src?null:element.textContent})),
      structured:[...document.querySelectorAll('script[type="application/ld+json"]')].map(element=>element.textContent),
      heroActions:[...document.querySelectorAll('#top .wf-pactions a,#top .wf-pactions button')].map(element=>({text:norm(element.textContent),href:element.getAttribute('href')})),
      whySegments:document.querySelectorAll('#why .q-segments,#why [data-segment]').length,
      whyButtons:document.querySelectorAll('#why button').length,
      starterImages:[...document.querySelectorAll('#sampler .sbox-grid img')].map(image=>image.getAttribute('src')),
      starterCtas:[...document.querySelectorAll('#sampler .btns a,#sampler .btns button')].map(element=>({text:norm(element.textContent),href:element.getAttribute('href')})),
      mainCount:document.querySelectorAll('main').length,h1Count:document.querySelectorAll('h1').length,footerCount:document.querySelectorAll('footer').length,
    };
  });
}

const projectionFields=['flow','text','links','controls','media','scripts','structured','heroActions','starterImages','starterCtas'];
function compareProjection(before,after){const mismatches=projectionFields.filter(field=>JSON.stringify(before[field])!==JSON.stringify(after[field]));return{mismatches,pass:mismatches.length===0};}

async function browserMetrics(page,width,overflowSource){
  await page.addScriptTag({ content:overflowSource.replace(/^export /gm,'') });
  await page.waitForFunction(()=>Boolean(window.MapleMoonOverflowProbe));
  return page.evaluate(expectedWidth=>{
    const norm=value=>String(value??'').replace(/\s+/g,' ').trim();
    const visible=element=>{const style=getComputedStyle(element),box=element.getBoundingClientRect();return style.display!=='none'&&style.visibility!=='hidden'&&Number(style.opacity)>0&&box.width>0&&box.height>0;};
    const rect=element=>{const box=element.getBoundingClientRect();return{x:box.x,y:box.y,width:box.width,height:box.height,right:box.right,bottom:box.bottom};};
    const overlaps=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2;
    const descriptor=element=>element.id?`#${element.id}`:`${element.tagName.toLowerCase()}.${[...element.classList].slice(0,3).join('.')}`;
    const containment=[];
    for(const selector of ['#why','#story','#sampler','#footer']){
      const container=document.querySelector(selector);if(!container||!visible(container))continue;const outer=container.getBoundingClientRect();
      for(const leaf of container.querySelectorAll('a,button,input,select,textarea,img,h1,h2,h3,h4,p,li,label')){if(!visible(leaf))continue;const box=leaf.getBoundingClientRect();if(box.left<outer.left-1||box.right>outer.right+1)containment.push({container:selector,leaf:descriptor(leaf),containerRect:rect(container),leafRect:rect(leaf)});}
    }
    const required=[...document.querySelectorAll('.wf-ptop a,.wf-ptop button,#top .wf-pactions a,#top .wf-pactions button,#sampler .btns a,#sampler .btns button,#footer a,#footer button,#footer input')].filter(visible).map(element=>({element:descriptor(element),text:norm(element.textContent),rect:rect(element),disabled:Boolean(element.disabled)}));
    const sub44=required.filter(item=>!item.disabled&&(item.rect.width<44||item.rect.height<44));
    const images=[...document.images].map(image=>({src:image.currentSrc||image.src,complete:image.complete,naturalWidth:image.naturalWidth,naturalHeight:image.naturalHeight,visible:visible(image),rect:visible(image)?rect(image):null}));
    const hotspots=[...document.querySelectorAll('#carob .co')].map(element=>{const style=getComputedStyle(element),box=element.getBoundingClientRect(),label=element.querySelector('.lab'),labelBox=label?.getBoundingClientRect();return{visible:visible(element),fontSize:parseFloat(style.fontSize),fontWeight:parseInt(style.fontWeight,10),rect:rect(element),labelRect:labelBox?rect(label):null,textLeaves:[...element.querySelectorAll('.t,.d,.lab')].filter(visible).map(rect)};});
    const carobCopy=document.querySelector('#carob .copy');const copyRect=carobCopy&&visible(carobCopy)?rect(carobCopy):null;
    const hotspotCollision=hotspots.length===2&&overlaps(hotspots[0].rect,hotspots[1].rect)||copyRect&&hotspots.some(item=>overlaps(item.rect,copyRect));
    const panels=[...document.querySelectorAll('#why .q-panel')].map(element=>{const style=getComputedStyle(element);return{rect:rect(element),backgroundColor:style.backgroundColor,borderTopWidth:style.borderTopWidth,borderLeftWidth:style.borderLeftWidth,boxShadow:style.boxShadow};});
    const rows=[...document.querySelectorAll('#why .q-panel-row')].map(element=>rect(element));
    const comparisonStacked=panels.length===2&&panels[1].rect.top>=panels[0].rect.bottom-1;
    const comparisonSideBySide=panels.length===2&&Math.abs(panels[0].rect.top-panels[1].rect.top)<=2&&panels[1].rect.left>=panels[0].rect.right-1;
    const comparisonContained=panels.every(panel=>panel.rect.left>=document.querySelector('#why').getBoundingClientRect().left-1&&panel.rect.right<=document.querySelector('#why').getBoundingClientRect().right+1)&&rows.every(row=>row.left>=document.querySelector('#why').getBoundingClientRect().left-1&&row.right<=document.querySelector('#why').getBoundingClientRect().right+1);
    const credit=document.querySelector('.wf-photo-credit'),creditStyle=credit?getComputedStyle(credit):null;
    const starterImages=[...document.querySelectorAll('#sampler .sbox-grid img')].filter(visible).map(image=>({src:image.currentSrc||image.src,decoded:image.complete&&image.naturalWidth>0,rect:rect(image)}));
    const starterOverlaps=[];for(let i=0;i<starterImages.length;i++)for(let j=i+1;j<starterImages.length;j++)if(overlaps(starterImages[i].rect,starterImages[j].rect))starterOverlaps.push([i,j]);
    const sbox=document.querySelector('#sampler .sbox'),sboxRect=sbox?rect(sbox):null;const starterEscapes=sbox?[...sbox.querySelectorAll('a,button,img,h2,h3,p,li')].filter(visible).map(element=>({element:descriptor(element),rect:rect(element)})).filter(item=>item.rect.left<sboxRect.left-1||item.rect.right>sboxRect.right+1):[];
    const starterStyle=sbox?getComputedStyle(sbox):null;
    const wordmark=document.querySelector('.wf-plogo'),wordmarkRect=wordmark&&visible(wordmark)?rect(wordmark):null;
    const newsletter=[...document.querySelectorAll('#footer input,#footer button')].map(element=>({tag:element.tagName,disabled:Boolean(element.disabled)}));
    const probe=window.MapleMoonOverflowProbe.probeViewport();const probeControl=window.MapleMoonOverflowProbe.runPositiveControl();
    const video=document.querySelector('.hero-vid');
    return{
      exact:{innerWidth,clientWidth:document.documentElement.clientWidth,visualViewportWidth:visualViewport?.width,scrollWidth:document.documentElement.scrollWidth,expectedWidth},
      probe,probeControlDetected:probeControl.detected,containment,required,sub44,images,brokenImages:images.filter(image=>!image.complete||image.naturalWidth===0||image.naturalHeight===0),
      hotspots,hotspotCollision,panels,rows,comparisonStacked,comparisonSideBySide,comparisonContained,
      credit:credit?{count:document.querySelectorAll('.wf-photo-credit').length,visible:visible(credit),fontSize:parseFloat(creditStyle.fontSize),lineHeight:parseFloat(creditStyle.lineHeight),fontWeight:parseInt(creditStyle.fontWeight,10),rect:rect(credit),text:norm(credit.textContent)}:null,
      starter:{imageCount:starterImages.length,images:starterImages,overlaps:starterOverlaps,escapes:starterEscapes,columns:starterStyle?.gridTemplateColumns||null,sboxRect},
      wordmarkCentreDelta:wordmarkRect?wordmarkRect.x+wordmarkRect.width/2-innerWidth/2:null,newsletter,
      video:{paused:video?.paused??null,poster:video?.poster??null,readyState:video?.readyState??null,source:video?.querySelector('source')?.src??null},
    };
  },width);
}

function literalGates(projection,metrics,width){
  const transparent=value=>value==='rgba(0, 0, 0, 0)'||value==='transparent';
  const exact=metrics.exact.innerWidth===width&&metrics.exact.clientWidth===width&&Math.abs(metrics.exact.visualViewportWidth-width)<.01&&metrics.exact.scrollWidth<=width+1;
  const structure=JSON.stringify(projection.flow)===JSON.stringify(expectedFlow)&&projection.mainCount===1&&projection.h1Count===1&&projection.footerCount===1&&projection.heroActions.length===1&&projection.heroActions[0].text==='Shop the Range'&&projection.whySegments===0&&projection.whyButtons===0&&projection.starterImages.length===6&&projection.starterCtas.length===2;
  const hotspots=metrics.hotspots.length===2&&metrics.hotspots.every(item=>item.visible&&item.fontSize>=14&&item.fontWeight>=500&&item.textLeaves.length>0&&item.textLeaves.every(box=>box.width>0&&box.height>0))&&!metrics.hotspotCollision;
  const openPanels=metrics.panels.length===2&&metrics.panels.every(panel=>transparent(panel.backgroundColor)&&panel.borderTopWidth==='0px'&&panel.borderLeftWidth==='0px'&&panel.boxShadow==='none');
  const comparison=metrics.panels.length===2&&metrics.rows.length===6&&openPanels&&metrics.comparisonContained&&(width>=1024?metrics.comparisonSideBySide:metrics.comparisonStacked);
  const credit=metrics.credit?.count===1&&metrics.credit.visible&&metrics.credit.fontSize>=14&&metrics.credit.lineHeight/metrics.credit.fontSize>=1.4&&metrics.credit.text==='Farm photography by Nigel Young, The Australian Carob Co';
  const starter=metrics.starter.imageCount===6&&metrics.starter.images.every(image=>image.decoded)&&metrics.starter.overlaps.length===0&&metrics.starter.escapes.length===0&&(width<=768?metrics.starter.columns.split(' ').length===1:true);
  const overflow=metrics.probe.failures.length===0&&metrics.probeControlDetected&&metrics.containment.length===0;
  const images=metrics.brokenImages.length===0;
  const targets=metrics.sub44.length===0;
  const mobileCentre=width>768||Math.abs(metrics.wordmarkCentreDelta)<=1;
  const newsletter=metrics.newsletter.length===2&&metrics.newsletter.every(item=>item.disabled);
  const checks={exact,structure,hotspots,comparison,credit,starter,overflow,images,targets,mobileCentre,newsletter};
  return{checks,pass:Object.values(checks).every(Boolean)};
}

async function nonblank(file){const stats=await sharp(file).stats();return stats.channels.some(channel=>channel.max-channel.min>6);}
async function proofRecord(file,meta={}){const image=await sharp(file).metadata();return{...meta,file,bytes:fs.statSync(file).size,sha256:shaFile(file),width:image.width,height:image.height,nonblank:await nonblank(file)};}
async function captureState(page,root,width,state,proofRoot){
  const file=path.join(proofRoot,`${root}-${width}-${state.id}.png`);
  if(state.kind==='full'){await page.screenshot({path:file,fullPage:true,animations:'disabled'});return proofRecord(file,{root,width,state:state.id});}
  const locator=page.locator(state.selector).first();const box=await locator.boundingBox();if(!box)throw new Error(`missing box ${state.selector}`);
  const pageHeight=await page.evaluate(()=>Math.max(document.body.scrollHeight,document.documentElement.scrollHeight));let top,bottom;
  if(state.kind==='boundary'){const anchor=state.edge==='top'?box.y:box.y+box.height;top=Math.max(0,anchor-160);bottom=Math.min(pageHeight,anchor+160);}
  else{top=Math.max(0,box.y-(state.pad||0));bottom=Math.min(pageHeight,box.y+box.height+(state.pad||0));}
  const fullFile=path.join(proofRoot,`${root}-${width}-full-page.png`),fullMeta=await sharp(fullFile).metadata();
  const cropTop=Math.max(0,Math.floor(top)),cropHeight=Math.max(1,Math.min(fullMeta.height-cropTop,Math.ceil(bottom)-cropTop));
  await sharp(fullFile).extract({left:0,top:cropTop,width,height:cropHeight}).png().toFile(file);
  return proofRecord(file,{root,width,state:state.id,selector:state.selector,box,clip:{x:0,y:cropTop,width,height:cropHeight}});
}

async function makeContact(attempt,width,state,before,after){
  const cellWidth=520,labelHeight=34;const prepared=[];let maxHeight=0;
  for(const item of [{label:`BASELINE · ${width}`,file:before.file},{label:`CANDIDATE · ${width}`,file:after.file}]){const buffer=await sharp(item.file).resize({width:cellWidth}).png().toBuffer();const metadata=await sharp(buffer).metadata();maxHeight=Math.max(maxHeight,metadata.height);prepared.push({...item,buffer});}
  const label=text=>Buffer.from(`<svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#10283b"/><text x="12" y="23" font-family="Arial" font-size="13" fill="#f7f1da">${text}</text></svg>`);
  const file=path.join(attempt,'contacts',`${width}-${state}.png`);
  await sharp({create:{width:cellWidth*2,height:labelHeight+maxHeight,channels:4,background:'#dcecf5'}}).composite([{input:label(prepared[0].label),left:0,top:0},{input:prepared[0].buffer,left:0,top:labelHeight},{input:label(prepared[1].label),left:cellWidth,top:0},{input:prepared[1].buffer,left:cellWidth,top:labelHeight}]).png().toFile(file);
  return proofRecord(file,{width,state});
}

async function makeReviewSheet(attempt,state,contacts){
  const rows=[];let width=0,height=0;
  for(const contact of contacts.filter(item=>item.state===state).sort((a,b)=>b.width-a.width)){const buffer=await sharp(contact.file).resize({width:900,height:850,fit:'inside'}).png().toBuffer();const metadata=await sharp(buffer).metadata();rows.push({buffer,width:metadata.width,height:metadata.height});width=Math.max(width,metadata.width);height+=metadata.height+8;}
  const file=path.join(attempt,'review-sheets',`${state}.png`);let top=0;const composites=[];for(const row of rows){composites.push({input:row.buffer,left:0,top});top+=row.height+8;}
  await sharp({create:{width,height,channels:4,background:'#edf4f8'}}).composite(composites).png().toFile(file);return proofRecord(file,{state});
}

async function captureAdditional(browser,origin,attempt){
  const rows=[];
  for(const {width,height} of widths.filter(item=>[768,390,320].includes(item.width))){const live=await exactPage(browser,origin,width,height,{reducedMotion:'reduce'});const closed=path.join(attempt,'additional',`menu-${width}-closed.png`);await live.page.screenshot({path:closed,fullPage:false,animations:'disabled'});rows.push(await proofRecord(closed,{state:'menu-closed',width}));const menu=live.page.locator('[data-mm-menu-toggle]');const visible=await menu.isVisible();if(visible)await menu.click();await live.page.waitForTimeout(100);const open=path.join(attempt,'additional',`menu-${width}-open.png`);await live.page.screenshot({path:open,fullPage:false,animations:'disabled'});rows.push(await proofRecord(open,{state:'menu-open',width,menuVisible:visible,expanded:visible?await menu.getAttribute('aria-expanded'):null}));await live.context.close();}
  for(const {width,height} of widths.filter(item=>[1440,390].includes(item.width))){
    for(const [id,selector] of [['hero-focus','#top .wf-ppill'],['starter-focus','#sampler .btns .wf-pill']]){const live=await exactPage(browser,origin,width,height,{reducedMotion:'reduce'});await live.page.locator(selector).first().focus();const style=await live.page.locator(selector).first().evaluate(element=>{const s=getComputedStyle(element);return{outlineStyle:s.outlineStyle,outlineWidth:s.outlineWidth,boxShadow:s.boxShadow};});const file=path.join(attempt,'additional',`${id}-${width}.png`);await live.page.screenshot({path:file,fullPage:false,animations:'disabled'});rows.push(await proofRecord(file,{state:id,width,focusVisible:style.outlineStyle!=='none'&&parseFloat(style.outlineWidth)>0||style.boxShadow!=='none',style}));await live.context.close();}
    const skip=await exactPage(browser,origin,width,height,{reducedMotion:'reduce'});await skip.page.locator('.skip-link').focus();const focusedFile=path.join(attempt,'additional',`skip-${width}-focused.png`);await skip.page.screenshot({path:focusedFile,fullPage:false,animations:'disabled'});rows.push(await proofRecord(focusedFile,{state:'skip-focused',width}));await skip.page.keyboard.press('Enter');await skip.page.waitForTimeout(100);const reached=await skip.page.locator('#main-content').evaluate(element=>{const box=element.getBoundingClientRect();return box.top<innerHeight&&box.bottom>0;});const activatedFile=path.join(attempt,'additional',`skip-${width}-activated.png`);await skip.page.screenshot({path:activatedFile,fullPage:false,animations:'disabled'});rows.push(await proofRecord(activatedFile,{state:'skip-activated',width,reached}));await skip.context.close();
    const reduce=await exactPage(browser,origin,width,height,{reducedMotion:'reduce'});const motion=await reduce.page.locator('.hero-vid').evaluate(video=>({paused:video.paused,readyState:video.readyState,poster:video.poster,source:video.querySelector('source')?.src}));const reducedFile=path.join(attempt,'additional',`reduced-hero-${width}.png`);const heroBox=await reduce.page.locator('#top').boundingBox();await reduce.page.screenshot({path:reducedFile,clip:{x:0,y:heroBox.y,width,height:Math.min(heroBox.height,height)},animations:'disabled'});rows.push(await proofRecord(reducedFile,{state:'reduced-hero',width,motion}));await reduce.context.close();
  }
  return rows;
}

async function runPositiveControls(browser,origin,attempt,referenceProjection,proofs){
  const rows=[];const add=(id,caught,detail={})=>rows.push({id,caught:Boolean(caught),...detail});
  let live=await exactPage(browser,origin,321,700,{reducedMotion:'reduce'});let exact=await live.page.evaluate(()=>({innerWidth,clientWidth:document.documentElement.clientWidth,visual:visualViewport.width}));add('exact-width-320-vs-321',!(exact.innerWidth===320&&exact.clientWidth===320&&exact.visual===320),exact);await live.context.close();
  live=await exactPage(browser,origin,390,844,{reducedMotion:'reduce'});await live.page.evaluate(()=>{const el=document.createElement('div');el.id='qa-root-overflow';Object.assign(el.style,{position:'absolute',left:'0',top:'0',width:'calc(100vw + 20px)',height:'2px'});document.body.append(el);});add('root-overflow',(await live.page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)));await live.context.close();
  live=await exactPage(browser,origin,390,844,{reducedMotion:'reduce'});await live.page.evaluate(()=>{const el=document.createElement('p');el.id='qa-semantic-clip';el.textContent='semantic clip control';Object.assign(el.style,{display:'block',width:'1200px'});document.querySelector('#sampler .sbox').append(el);});const clip=await live.page.evaluate(()=>{const c=document.querySelector('#sampler .sbox').getBoundingClientRect(),e=document.querySelector('#qa-semantic-clip').getBoundingClientRect();return e.right>c.right+1;});add('semantic-clipping',clip);await live.context.close();
  live=await exactPage(browser,origin,390,844,{reducedMotion:'reduce'});await live.page.evaluate(()=>new Promise(resolve=>{const img=new Image();img.id='qa-missing';img.addEventListener('error',resolve,{once:true});img.src='/qa-intentionally-missing.png';document.body.append(img);}));add('missing-image',await live.page.locator('#qa-missing').evaluate(image=>image.complete&&image.naturalWidth===0));await live.context.close();
  live=await exactPage(browser,origin,390,844,{reducedMotion:'reduce'});await live.page.evaluate(()=>{const el=document.createElement('div');el.className='q-segments';document.querySelector('#why').append(el);});add('segment-control',await live.page.locator('#why .q-segments').count()===1);await live.context.close();
  live=await exactPage(browser,origin,390,844,{reducedMotion:'reduce'});await live.page.evaluate(()=>{const why=document.querySelector('#why'),ritual=document.querySelector('#ritual');ritual.after(why);});const swapped=await projection(live.page);add('section-order',JSON.stringify(swapped.flow)!==JSON.stringify(expectedFlow));await live.context.close();
  live=await exactPage(browser,origin,390,844,{reducedMotion:'reduce'});await live.page.evaluate(()=>{document.querySelector('img').setAttribute('src','/qa-drift.webp');document.querySelector('p').firstChild.nodeValue+='x';});const drift=await projection(live.page);add('media-or-text-drift',!compareProjection(referenceProjection,drift).pass,compareProjection(referenceProjection,drift));await live.context.close();
  const shortened=proofs.slice(1);add('missing-proof',shortened.length!==120,{observed:shortened.length});
  const white=path.join(attempt,'positive-controls','all-white.png');await sharp({create:{width:320,height:320,channels:3,background:'#ffffff'}}).png().toFile(white);add('blank-proof',!(await nonblank(white)),{file:white});
  live=await exactPage(browser,origin,390,844,{reducedMotion:'reduce'});const errors=live.errors;await live.page.evaluate(()=>setTimeout(()=>{throw new Error('qa-positive-page-error');},0));await live.page.waitForTimeout(100);add('page-error',errors.pageErrors.some(message=>message.includes('qa-positive-page-error')),{errors:errors.pageErrors});await live.context.close();
  live=await exactPage(browser,origin,390,844,{reducedMotion:'reduce'});await live.page.locator('#top .wf-ppill').evaluate(element=>{element.style.setProperty('width','43px','important');element.style.setProperty('height','43px','important');element.style.setProperty('min-width','0','important');element.style.setProperty('min-height','0','important');element.style.setProperty('padding','0','important');});const tiny=await live.page.locator('#top .wf-ppill').evaluate(element=>{const b=element.getBoundingClientRect();return b.width<44||b.height<44;});add('sub-44-cta',tiny);await live.context.close();
  live=await exactPage(browser,origin,390,844,{reducedMotion:'reduce'});await live.page.locator('.hero-vid').evaluate(video=>Object.defineProperty(video,'paused',{configurable:true,get:()=>false}));add('reduced-motion-video',await live.page.locator('.hero-vid').evaluate(video=>video.paused!==true));await live.context.close();
  return{rows,count:rows.length,caught:rows.filter(row=>row.caught).length,pass:rows.length===12&&rows.every(row=>row.caught)};
}

if(!fs.existsSync(candidateRoot))throw new Error(`candidate missing: ${candidateRoot}`);
const attempt=nextAttempt(),proofRoot=path.join(attempt,'proofs');
const acquisition={startedAt:new Date().toISOString(),packetId,snapshot:{file:snapshot,sha256:shaFile(snapshot),expected:expectedSnapshotHash},baseline:receiptDigest(baselineRoot),candidate:receiptDigest(candidateRoot),pinned:Object.entries(pinnedFiles).map(([file,expected])=>({file,expected,observed:fs.existsSync(file)?shaFile(file):null})),frozen:frozenDuringQa.map(file=>({file,sha256:shaFile(file)})),liveHomepage:{file:liveHomepage,sha256:shaFile(liveHomepage),bytes:fs.statSync(liveHomepage).size}};
writeJson(path.join(attempt,'ACQUISITION.json'),acquisition);
const acquisitionFailures=[];if(acquisition.snapshot.sha256!==expectedSnapshotHash)acquisitionFailures.push('snapshot');if(acquisition.baseline.sha256!==expectedBaselineHash||acquisition.baseline.count!==77)acquisitionFailures.push('baseline');for(const row of acquisition.pinned)if(row.observed!==row.expected)acquisitionFailures.push(`pin:${row.file}`);
if(acquisitionFailures.length){writeJson(path.join(attempt,'STOP.json'),{reason:'acquisition',failures:acquisitionFailures});console.error(`QA STOP acquisition failures=${acquisitionFailures.join(',')}`);process.exit(2);}

const baselineFiles=new Map(acquisition.baseline.files.map(row=>[row.relative,row]));const candidateFiles=new Map(acquisition.candidate.files.map(row=>[row.relative,row]));const additions=[...candidateFiles.keys()].filter(file=>!baselineFiles.has(file));const mutations=[...baselineFiles.keys()].filter(file=>!candidateFiles.has(file)||candidateFiles.get(file).sha256!==baselineFiles.get(file).sha256);const allowedAdds=additions.filter(file=>file!=='homepage.html');const candidateHomepage=fs.readFileSync(path.join(candidateRoot,'homepage.html'),'utf8'),baselineHomepage=fs.readFileSync(path.join(baselineRoot,'homepage.html'),'utf8');const linkMatches=[...candidateHomepage.matchAll(/<link[^>]+data-maplemoon-homepage-style-finish-r4="20260825T165002"[^>]*>\n?/g)];const reverseEqual=linkMatches.length===1&&candidateHomepage.replace(linkMatches[0][0],'')===baselineHomepage;const treeGate={additions,mutations,allowedAdds,linkCount:linkMatches.length,reverseEqual,pass:additions.length===2&&allowedAdds.length===2&&allowedAdds.some(file=>file.endsWith('.css'))&&allowedAdds.some(file=>file.endsWith('.json'))&&JSON.stringify(mutations)===JSON.stringify(['homepage.html'])&&reverseEqual};writeJson(path.join(attempt,'TREE-GATE.json'),treeGate);if(!treeGate.pass){writeJson(path.join(attempt,'STOP.json'),{reason:'tree-gate',treeGate});console.error('QA STOP tree gate');process.exit(2);}

const overflowSource=fs.readFileSync(overflowModule,'utf8');const baselineServer=await serve(baselineRoot),candidateServer=await serve(candidateRoot);let browser;const measurements=[],proofs=[],contacts=[],reviewSheets=[];let additional=[],positiveControls=null,fatal=null;
try{
  browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--autoplay-policy=no-user-gesture-required']});
  for(const {width,height} of widths){const pages={};for(const [kind,origin] of [['baseline',baselineServer.origin],['candidate',candidateServer.origin]]){const live=await exactPage(browser,origin,width,height,{reducedMotion:'reduce'});const proj=await projection(live.page),metrics=await browserMetrics(live.page,width,overflowSource);const gate=literalGates(proj,metrics,width);pages[kind]={...live,projection:proj,metrics,gate};for(const state of states)proofs.push(await captureState(live.page,kind,width,state,proofRoot));}
    const projectionComparison=compareProjection(pages.baseline.projection,pages.candidate.projection);const failures=[];for(const kind of ['baseline','candidate']){const p=pages[kind];if(p.status!==200)failures.push(`${kind}:http`);if(p.errors.consoleErrors.length||p.errors.pageErrors.length||p.errors.requestFailures.length||p.errors.badResponses.length)failures.push(`${kind}:runtime`);if(!p.gate.pass)failures.push(`${kind}:literal:${Object.entries(p.gate.checks).filter(([,ok])=>!ok).map(([id])=>id).join(',')}`);}if(!projectionComparison.pass)failures.push(`projection:${projectionComparison.mismatches.join(',')}`);
    measurements.push({width,height,baseline:{status:pages.baseline.status,projection:pages.baseline.projection,metrics:pages.baseline.metrics,gate:pages.baseline.gate,errors:pages.baseline.errors},candidate:{status:pages.candidate.status,projection:pages.candidate.projection,metrics:pages.candidate.metrics,gate:pages.candidate.gate,errors:pages.candidate.errors},projectionComparison,failures,result:failures.length?'FAIL':'PASS'});for(const kind of ['baseline','candidate'])await pages[kind].context.close();console.log(`${failures.length?'FAIL':'PASS'} width=${width} projection=${projectionComparison.pass} failures=${failures.join('|')||'none'}`);}
  for(const {width} of widths)for(const state of states){const before=proofs.find(row=>row.root==='baseline'&&row.width===width&&row.state===state.id),after=proofs.find(row=>row.root==='candidate'&&row.width===width&&row.state===state.id);contacts.push(await makeContact(attempt,width,state.id,before,after));}
  for(const state of reviewStates)reviewSheets.push(await makeReviewSheet(attempt,state,contacts));
  additional=await captureAdditional(browser,candidateServer.origin,attempt);
  positiveControls=await runPositiveControls(browser,candidateServer.origin,attempt,measurements.find(row=>row.width===390).candidate.projection,proofs);
}catch(error){fatal={message:error.message,stack:error.stack};console.error(error);}finally{if(browser)await browser.close().catch(()=>{});await new Promise(resolve=>baselineServer.server.close(resolve));await new Promise(resolve=>candidateServer.server.close(resolve));}

const close={completedAt:new Date().toISOString(),snapshot:{sha256:shaFile(snapshot),stable:shaFile(snapshot)===acquisition.snapshot.sha256},baseline:receiptDigest(baselineRoot),candidate:receiptDigest(candidateRoot),pinned:acquisition.pinned.map(row=>({...row,close:shaFile(row.file),stable:shaFile(row.file)===row.observed})),frozen:acquisition.frozen.map(row=>({...row,close:shaFile(row.file),stable:shaFile(row.file)===row.sha256})),liveHomepage:{sha256:shaFile(liveHomepage),bytes:fs.statSync(liveHomepage).size}};close.baseline.stable=close.baseline.sha256===acquisition.baseline.sha256;close.candidate.stable=close.candidate.sha256===acquisition.candidate.sha256;const diff=spawnSync('diff',['-u',snapshot,liveHomepage],{encoding:'utf8',maxBuffer:50*1024*1024});const rebaseDiff=path.join(attempt,'LIVE-SOURCE-REBASE.diff');fs.writeFileSync(rebaseDiff,diff.stdout||'');close.liveHomepage.requiresRebase=close.liveHomepage.sha256!==expectedSnapshotHash;close.liveHomepage.diffFile=rebaseDiff;close.liveHomepage.diffSha256=shaFile(rebaseDiff);close.liveHomepage.diffExitCode=diff.status;writeJson(path.join(attempt,'CLOSE.json'),close);
const proofPass=proofs.length===120&&proofs.every(row=>row.nonblank&&row.width===row.width);const contactPass=contacts.length===60&&contacts.every(row=>row.nonblank);const reviewSheetPass=reviewSheets.length===11&&reviewSheets.every(row=>row.nonblank);const additionalPass=additional.length===16&&additional.every(row=>row.nonblank)&&additional.filter(row=>row.state==='menu-open').every(row=>row.menuVisible&&row.expanded==='true')&&additional.filter(row=>row.state.endsWith('focus')).every(row=>row.focusVisible)&&additional.filter(row=>row.state==='skip-activated').every(row=>row.reached)&&additional.filter(row=>row.state==='reduced-hero').every(row=>row.motion.paused===true);const closePass=close.snapshot.stable&&close.baseline.stable&&close.candidate.stable&&close.pinned.every(row=>row.stable)&&close.frozen.every(row=>row.stable);const automatedPass=!fatal&&measurements.length===5&&measurements.every(row=>row.result==='PASS')&&proofPass&&contactPass&&reviewSheetPass&&additionalPass&&positiveControls?.pass&&closePass;
const result={schema:'maplemoon-homepage-style-finish-r4-automated-qa/v1',packetId,attempt,acquisition:{snapshot:acquisition.snapshot,baseline:{sha256:acquisition.baseline.sha256,count:acquisition.baseline.count},candidate:{sha256:acquisition.candidate.sha256,count:acquisition.candidate.count},liveHomepage:acquisition.liveHomepage},treeGate,measurements,proofs,contacts,reviewSheets,additional,positiveControls,close:{snapshot:close.snapshot,baseline:{sha256:close.baseline.sha256,stable:close.baseline.stable},candidate:{sha256:close.candidate.sha256,stable:close.candidate.stable},pinned:close.pinned,frozen:close.frozen,liveHomepage:close.liveHomepage},fatal,checks:{measurements:measurements.length===5&&measurements.every(row=>row.result==='PASS'),proofs:proofPass,contacts:contactPass,reviewSheets:reviewSheetPass,additional:additionalPass,positiveControls:positiveControls?.pass||false,close:closePass},result:automatedPass?'PASS':'FAIL'};writeJson(path.join(attempt,'AUTOMATED-QA.json'),result);writeJson(path.join(attempt,'PROOF-MANIFEST.json'),{proofs,contacts,reviewSheets,additional});writeJson(path.join(attempt,'POSITIVE-CONTROLS.json'),positiveControls);
const summary=`HOMEPAGE_STYLE_AUTOMATED_QA ${result.result} widths=${measurements.filter(row=>row.result==='PASS').length}/5 proofs=${proofs.filter(row=>row.nonblank).length}/120 contacts=${contacts.filter(row=>row.nonblank).length}/60 review_sheets=${reviewSheets.filter(row=>row.nonblank).length}/11 additional=${additional.filter(row=>row.nonblank).length}/16 positive_controls=${positiveControls?.caught||0}/12 close_pins=${closePass?'PASS':'FAIL'} live_rebase=${close.liveHomepage.requiresRebase?'HOLD':'NONE'}`;fs.writeFileSync(path.join(attempt,'AUTOMATED-QA.md'),`# R4 automated QA — ${result.result}\n\n${summary}\n\nIndependent visual verdict is still required; automated PASS is not visual approval.\n`);console.log(summary);console.log(`ATTEMPT ${attempt}`);process.exitCode=automatedPass?0:1;
