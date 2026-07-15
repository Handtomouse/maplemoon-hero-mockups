const puppeteer = require('puppeteer-core');
const exe = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PAGES = ['homepage_real_1_lead_photo','our-story','shop','carob-story','faq','stockists'];
const WIDTHS = [375,390,430];
(async () => {
  const b = await puppeteer.launch({executablePath:exe, headless:'new', args:['--no-sandbox']});
  const report = {};
  for (const pg of PAGES) {
    const url = `http://localhost:3005/_wip/${pg}.WIP.html`;
    const r = {consoleErrors:[], badRequests:[], noAlt:0, noAltSamples:[], smallTargets:0, smallSamples:[], headings:'', overflow:{}, imgCount:0, deadLinks:0};
    const page = await b.newPage();
    page.on('console', m => { if (m.type()==='error') r.consoleErrors.push(m.text().slice(0,140)); });
    page.on('requestfailed', req => r.badRequests.push(req.url().split('/').pop()));
    page.on('response', res => { if (res.status()>=400) r.badRequests.push(res.status()+':'+res.url().split('/').pop()); });
    await page.setViewport({width:390,height:844,deviceScaleFactor:1,isMobile:true});
    try {
      await page.goto(url, {waitUntil:'networkidle2', timeout:45000});
      const data = await page.evaluate(() => {
        const imgs=[...document.querySelectorAll('img')];
        const noAlt=imgs.filter(i=>!i.hasAttribute('alt'));
        const inter=[...document.querySelectorAll('a,button,[role=button],input,select')];
        const small=inter.filter(el=>{const b=el.getBoundingClientRect();return b.width>0&&b.height>0&&(b.height<44||b.width<44);});
        const hs=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>+h.tagName[1]);
        let skip=false,h1=hs.filter(x=>x===1).length;
        for(let i=1;i<hs.length;i++) if(hs[i]-hs[i-1]>1) skip=true;
        const dead=[...document.querySelectorAll('a[href="#"]')].length;
        return {imgCount:imgs.length, noAlt:noAlt.length, noAltSamples:noAlt.slice(0,4).map(i=>i.src.split('/').pop()),
          small:small.length, smallSamples:small.slice(0,5).map(e=>e.tagName+'.'+(e.className||'').toString().split(' ')[0]),
          h1count:h1, headingSkip:skip, headings:hs.join(''), dead};
      });
      Object.assign(r,{imgCount:data.imgCount,noAlt:data.noAlt,noAltSamples:data.noAltSamples,smallTargets:data.small,smallSamples:data.smallSamples,headings:`h1x${data.h1count} skip=${data.headingSkip} [${data.headings}]`,deadLinks:data.dead});
      for (const w of WIDTHS) {
        await page.setViewport({width:w,height:844,deviceScaleFactor:1,isMobile:true});
        await new Promise(x=>setTimeout(x,300));
        const o = await page.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
        r.overflow[w] = o.sw>o.cw ? `OVERFLOW +${o.sw-o.cw}px` : 'ok';
      }
    } catch(e){ r.error=e.message; }
    r.badRequests=[...new Set(r.badRequests)];
    r.consoleErrors=[...new Set(r.consoleErrors)];
    report[pg]=r;
    await page.close();
  }
  await b.close();
  console.log(JSON.stringify(report,null,1));
})();
