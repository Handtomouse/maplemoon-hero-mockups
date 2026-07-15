const puppeteer = require('puppeteer-core');
const fs = require('fs');
const exe = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const files = (process.argv[2]||'').split(',').filter(Boolean);
const OUT = '/Users/handtomouse/maplemoon-website/_wip/checkpoints';
(async () => {
  const b = await puppeteer.launch({executablePath:exe, headless:'new', args:['--no-sandbox','--hide-scrollbars']});
  for (const f of files) {
    for (const w of [1440,390]) {
      const p = await b.newPage();
      await p.setViewport({width:w, height: w>480?820:844, deviceScaleFactor:2, isMobile:w<=480});
      try {
        await p.goto(`http://localhost:3005/_wip/variants/${f}`, {waitUntil:'networkidle2', timeout:40000});
        await p.evaluate(()=>document.fonts&&document.fonts.ready);
        await new Promise(r=>setTimeout(r,700));
        const name = f.replace('.html','');
        const out = `${OUT}/2026-07-14_B1_${name}_${w}.png`;
        await p.screenshot({path:out, fullPage:false});
        console.log('shot', out);
      } catch(e){ console.log('FAIL',f,w,e.message); }
      await p.close();
    }
  }
  await b.close();
})();
