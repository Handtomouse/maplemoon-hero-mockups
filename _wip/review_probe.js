const puppeteer = require('puppeteer-core');
const fs = require('fs');
const exe = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const urls = ['https://maplemoon.com.au/','https://maplemoon.com.au/pages/reviews'];
(async () => {
  const b = await puppeteer.launch({executablePath:exe, headless:'new', args:['--no-sandbox']});
  for (const u of urls) {
    const p = await b.newPage();
    try {
      await p.goto(u, {waitUntil:'networkidle2', timeout:40000});
      await new Promise(r=>setTimeout(r,2500));
      const info = await p.evaluate(() => {
        const apps = [];
        if (document.querySelector('[class*="jdgm"]')) apps.push('Judge.me');
        if (document.querySelector('[class*="okendo"],[data-oke-reviews]')) apps.push('Okendo');
        if (document.querySelector('[class*="loox"],#looxReviews')) apps.push('Loox');
        if (document.querySelector('[class*="stamped"]')) apps.push('Stamped');
        if (document.querySelector('[class*="yotpo"]')) apps.push('Yotpo');
        // grab review-ish text
        const sels = ['.jdgm-rev__body','.okeReviews','[class*="review"] p','blockquote','[class*="testimonial"]'];
        let quotes = [];
        sels.forEach(s => document.querySelectorAll(s).forEach(el => {
          const t = (el.innerText||'').trim();
          if (t.length>30 && t.length<400) quotes.push(t);
        }));
        const reviewLinks = [...document.querySelectorAll('a')].map(a=>a.href).filter(h=>/review|testimonial/i.test(h));
        return {title:document.title, apps:[...new Set(apps)], quotes:[...new Set(quotes)].slice(0,8), reviewLinks:[...new Set(reviewLinks)].slice(0,5)};
      });
      console.log(`\n=== ${u} ===`);
      console.log('title:', info.title);
      console.log('review apps detected:', info.apps.length?info.apps.join(', '):'NONE');
      console.log('review links:', info.reviewLinks.length?info.reviewLinks.join(' | '):'none');
      console.log('extracted quotes ('+info.quotes.length+'):');
      info.quotes.forEach((q,i)=>console.log(`  [${i+1}] ${q.replace(/\s+/g,' ').slice(0,200)}`));
    } catch(e){ console.log(`FAIL ${u}: ${e.message}`); }
    await p.close();
  }
  await b.close();
})();
