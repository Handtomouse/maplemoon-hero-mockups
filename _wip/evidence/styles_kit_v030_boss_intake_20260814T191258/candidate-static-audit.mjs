import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = "/Users/handtomouse/maplemoon_build_20260813";
const expected = {
  "homepage.html":"27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1",
  "our-story.html":"2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711",
  "carob-story.html":"4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd",
  "shop.html":"f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
  "faq.html":"c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e",
  "stockists.html":"4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887",
  "pure-carob-bar.html":"015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65"
};
const sha = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, "i"))?.slice(1).find((value)=>value !== undefined) ?? null;
const rows=[]; const references=new Set();
for (const [file, expectedHash] of Object.entries(expected)) {
  const target=path.join(root,file); const text=fs.readFileSync(target,"utf8"); const tags=[...text.matchAll(/<img\b[^>]*>/gi)].map((match)=>match[0]);
  const imageRows=tags.map((tag)=>({src:attr(tag,"src"),width:attr(tag,"width"),height:attr(tag,"height"),loading:attr(tag,"loading"),decoding:attr(tag,"decoding"),srcset:attr(tag,"srcset"),sizes:attr(tag,"sizes"),alt:attr(tag,"alt"),onerror:attr(tag,"onerror")}));
  for (const match of text.matchAll(/(?:src|href)=(?:"|')((?:\/|\.\/)?assets\/[^"'#? )]+)(?:"|')|url\((?:"|')?((?:\/|\.\/)?assets\/[^"')? ]+)/gi)) references.add((match[1]||match[2]).replace(/^\.\//,"").replace(/^\//,""));
  rows.push({file,hash:sha(target),hashPass:sha(target)===expectedHash,images:imageRows.length,intrinsic:imageRows.filter((i)=>i.width&&i.height).length,loading:imageRows.filter((i)=>i.loading).length,decoding:imageRows.filter((i)=>i.decoding).length,srcset:imageRows.filter((i)=>i.srcset).length,sizes:imageRows.filter((i)=>i.sizes).length,onerror:imageRows.filter((i)=>i.onerror).length,nonemptyAlt:imageRows.filter((i)=>i.alt).length});
}
const refRows=[...references].sort().map((ref)=>{const target=path.join(root,ref);return {ref,exists:fs.existsSync(target),bytes:fs.existsSync(target)?fs.statSync(target).size:0};});
const result={schema:"maplemoon-candidate-static-audit/v1",rows,references:{count:refRows.length,nonblank:refRows.filter((r)=>r.exists&&r.bytes>0).length,missing:refRows.filter((r)=>!r.exists||r.bytes===0)},media005:{status:"HOLD_TECHNICAL_EVIDENCE_INCOMPLETE",observation:"All viewport-requested images rendered without failure, but static markup does not consistently declare intrinsic dimensions, responsive srcset/sizes, lazy/eager policy, or explicit failure UI. Zero onerror attributes is recorded as absence of inline fallback, not proof of no central fallback."}};
result.pass=rows.every((row)=>row.hashPass)&&result.references.missing.length===0;
console.log(JSON.stringify(result,null,2));
console.log(`RESULT ${result.pass?"PASS":"FAIL"} candidate_hashes=${rows.filter((row)=>row.hashPass).length}/7 declared_assets=${result.references.nonblank}/${result.references.count}`);
if(!result.pass)process.exit(1);
