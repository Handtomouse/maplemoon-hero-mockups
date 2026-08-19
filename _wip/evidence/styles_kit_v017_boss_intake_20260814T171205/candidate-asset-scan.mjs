import fs from 'node:fs';
import path from 'node:path';

const root='/Users/handtomouse/maplemoon_build_20260813';
const pages=['our-story.html','carob-story.html','faq.html','shop.html','stockists.html'];
const report={};
const failures=[];
for (const page of pages) {
  const source=fs.readFileSync(path.join(root,page),'utf8');
  const refs=new Set();
  for (const match of source.matchAll(/\b(?:src|poster)=["'](\/[^"']+)["']/g)) refs.add(match[1].split(/[?#]/)[0]);
  for (const match of source.matchAll(/url\(["']?(\/[^)'"?#]+)["']?\)/g)) refs.add(match[1]);
  const rows=[...refs].sort().map(ref=>{
    const target=path.join(root,ref.replace(/^\//,''));
    const exists=fs.existsSync(target) && fs.statSync(target).isFile() && fs.statSync(target).size>0;
    if (!exists) failures.push(`${page}: ${ref}`);
    return {ref,exists,bytes:exists?fs.statSync(target).size:0};
  });
  report[page]={references:rows.length,nonblank:rows.filter(x=>x.exists).length,rows};
}
const positiveControl=!fs.existsSync(path.join(root,'assets/__POSITIVE_CONTROL_MISSING__'));
if (!positiveControl) failures.push('positive control did not detect missing asset');
fs.writeFileSync(new URL('./candidate-asset-scan.json',import.meta.url),JSON.stringify({root,report,positiveControl,failures},null,2)+'\n');
for (const page of pages) console.log(`${page} static_local_assets=${report[page].nonblank}/${report[page].references}`);
console.log(`POSITIVE_CONTROL detected=${positiveControl}`);
console.log(`RESULT ${failures.length?'FAIL':'PASS'} failures=${failures.length}`);
if (failures.length) console.log(failures.join('\n'));
process.exitCode=failures.length?1:0;
