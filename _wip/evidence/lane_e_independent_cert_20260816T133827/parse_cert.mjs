import fs from 'node:fs';
import path from 'node:path';

const root = '/Users/handtomouse/maplemoon-website';
const out = path.join(root, '_wip/evidence/lane_e_independent_cert_20260816T133827');
const pages = [
  ['home', '_wip/homepage_real_1_lead_photo.WIP.html', 7, 2],
  ['shop', '_wip/shop.WIP.html', 1, 3],
  ['our-story', '_wip/our-story.WIP.html', 0, 4],
  ['carob-story', '_wip/carob-story.WIP.html', 0, 4],
  ['faq', '_wip/faq.WIP.html', 1, 0],
  ['stockists', '_wip/stockists.WIP.html', 1, 3],
];

const results = [];
let failed = false;
for (const [label, relative, expectedInline, expectedJsonLd] of pages) {
  const html = fs.readFileSync(path.join(root, relative), 'utf8');
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  let inline = 0;
  let jsonLd = 0;
  const errors = [];
  for (let index = 0; index < scripts.length; index += 1) {
    const attrs = scripts[index][1];
    const body = scripts[index][2];
    if (/\bsrc\s*=/.test(attrs)) continue;
    if (/\btype\s*=\s*["']application\/ld\+json["']/i.test(attrs)) {
      jsonLd += 1;
      try {
        JSON.parse(body);
      } catch (error) {
        errors.push(`JSON-LD ${jsonLd}: ${error.message}`);
      }
    } else {
      inline += 1;
      try {
        // Parse only; never execute page code in this source check.
        new Function(body);
      } catch (error) {
        errors.push(`inline ${inline}: ${error.message}`);
      }
    }
  }
  const result = errors.length === 0 && inline === expectedInline && jsonLd === expectedJsonLd ? 'PASS' : 'FAIL';
  failed ||= result === 'FAIL';
  const row = { label, relative, inline, expectedInline, jsonLd, expectedJsonLd, errors, result };
  results.push(row);
  console.log(`${result} page=${label} inline=${inline}/${expectedInline} jsonld=${jsonLd}/${expectedJsonLd} parse_errors=${errors.length}`);
}

fs.writeFileSync(path.join(out, 'parse-results.json'), JSON.stringify({ results, failures: results.filter(row => row.result === 'FAIL') }, null, 2) + '\n');
if (failed) process.exit(1);
