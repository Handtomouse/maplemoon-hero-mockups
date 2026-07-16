// Reads the feedback log and screenshots each tagged element (highlighted) for review.
const puppeteer=require('puppeteer-core');const fs=require('fs');const path=require('path');
const exe='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LOG=path.join(__dirname,'log.jsonl');const OUT=path.join(__dirname,'shots');fs.mkdirSync(OUT,{recursive:true});
const BASE='http://localhost:3005';
(async()=>{
 if(!fs.existsSync(LOG)){console.log('no log');return;}
 const tags=fs.readFileSync(LOG,'utf8').trim().split('\n').filter(Boolean).map(l=>{try{return JSON.parse(l)}catch(e){return null}}).filter(Boolean);
 if(!tags.length){console.log('no tags');return;}
 const b=await puppeteer.launch({executablePath:exe,headless:'new',args:['--no-sandbox','--hide-scrollbars','--force-color-profile=srgb']});
 for(let i=0;i<tags.length;i++){const tag=tags[i];const n=i+1;
   try{
     const g=await b.newPage();await g.setViewport({width:tag.vw&&tag.vw<900?390:1440,height:900,deviceScaleFactor:1.5});
     await g.goto(BASE+tag.url,{waitUntil:'networkidle2',timeout:40000});
     await g.evaluate(()=>document.fonts&&document.fonts.ready);await new Promise(r=>setTimeout(r,500));
     // highlight the tagged element
     if(tag.region||!tag.sel||tag.sel[0]==='['){
       await g.evaluate(r=>{const d=document.createElement('div');d.style.cssText='position:absolute;z-index:99999;border:3px dashed #b3a380;background:rgba(179,163,128,.15);left:'+r.x+'px;top:'+r.y+'px;width:'+r.w+'px;height:'+r.h+'px;pointer-events:none';document.body.appendChild(d);window.scrollTo(0,Math.max(0,r.y-200));}, tag.rect||{x:0,y:0,w:100,h:100});
     } else {
       await g.evaluate(s=>{try{const el=document.querySelector(s);if(el){el.style.outline='3px solid #b3a380';el.style.outlineOffset='2px';el.scrollIntoView({block:'center'});}}catch(e){}}, tag.sel);
     }
     await new Promise(r=>setTimeout(r,350));
     const r=tag.rect||{x:0,y:0,w:400,h:200};
     const vh=await g.evaluate(()=>window.scrollY);
     const clip={x:Math.max(0,r.x-80),y:Math.max(0,r.y-80),width:Math.min(1440,r.w+160),height:Math.min(700,r.h+160)};
     await g.screenshot({path:path.join(OUT,'tag_'+n+'.png'),clip});
     console.log('#'+n+' ['+tag.cat+'] '+(tag.note||'').slice(0,60)+'  ('+tag.sel.slice(-50)+')');
     await g.close();
   }catch(e){console.log('#'+n+' FAIL '+String(e).slice(0,50));}
 }
 await b.close();console.log('shots -> _wip/_feedback/shots/');
})();
