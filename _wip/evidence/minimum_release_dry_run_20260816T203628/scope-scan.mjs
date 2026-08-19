import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const candidateRoot = '/private/tmp/maplemoon-pdp-route-repair-20260816';
const outputRoot = '/Users/handtomouse/maplemoon-website/_wip/evidence/minimum_release_dry_run_20260816T203628';
const routes = {
  homepage: 'homepage.html',
  shop: 'shop.html',
  'our-story': 'our-story.html',
  'carob-story': 'carob-story.html',
  faq: 'faq.html',
  stockists: 'stockists.html',
  'products/pure-carob-bar': 'products/pure-carob-bar.html',
};

const patterns = {
  numericStockist: /200\+|204 total|204 entries|7 need client confirmation|Seven entries/gi,
  internalReview: /WIP directory status|source parse|client confirmation|review demo|Directory preview only|Nate selection required|Founder portrait pending/gi,
  commerce: /data-mm-cart-trigger|mock-cart|data-add-to-cart|Add to cart|checkout|cart/gi,
  collectionForm: /<form|newsletter|collect or submit email|Coming soon/gi,
  authoritySensitiveClaim: /Australian organic|organic carob|nothing added|naturally sweet|No Caffeine|caffeine|stimulant|vegan|gluten[- ]free|\bGF\b|sugar crash|digestive|gut health|nervous system|guilt[- ]free|performance/gi,
};

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function occurrences(text, regex) {
  const rows = [];
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    regex.lastIndex = 0;
    const matches = [...lines[i].matchAll(regex)];
    if (!matches.length) continue;
    rows.push({ line: i + 1, matches: matches.map(match => match[0]), text: lines[i].trim().slice(0, 500) });
  }
  return rows;
}

const pages = {};
for (const [route, relative] of Object.entries(routes)) {
  const file = path.join(candidateRoot, relative);
  const bytes = fs.readFileSync(file);
  const text = bytes.toString('utf8');
  const scans = {};
  for (const [name, regex] of Object.entries(patterns)) scans[name] = occurrences(text, regex);
  pages[route] = {
    file,
    bytes: bytes.length,
    sha256: sha256(bytes),
    scans,
    literalCounts: {
      forms: (text.match(/<form\b/gi) || []).length,
      mailto: (text.match(/href=["']mailto:/gi) || []).length,
      cartTriggers: (text.match(/data-mm-cart-trigger/gi) || []).length,
      mockCartIncludes: (text.match(/mock-cart\.(?:js|css)/gi) || []).length,
      founderPlaceholders: (text.match(/Founder portrait pending/gi) || []).length,
      stockist200Plus: (text.match(/200\+/g) || []).length,
    },
  };
}

const positive = Object.keys(pages).length === 7
  && pages.homepage.literalCounts.mockCartIncludes > 0
  && pages['products/pure-carob-bar'].literalCounts.mockCartIncludes > 0
  && pages.stockists.literalCounts.stockist200Plus > 0
  && pages['our-story'].literalCounts.founderPlaceholders === 2;
const result = { candidateRoot, routeCount: Object.keys(pages).length, positiveControl: positive ? 'PASS' : 'FAIL', pages };
fs.writeFileSync(path.join(outputRoot, 'static-scope-scan.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(`STATIC_SCOPE_SCAN routes=${result.routeCount}/7 positive_control=${result.positiveControl}`);
for (const [route, row] of Object.entries(pages)) {
  console.log(`${route} forms=${row.literalCounts.forms} mailto=${row.literalCounts.mailto} cart_triggers=${row.literalCounts.cartTriggers} mock_includes=${row.literalCounts.mockCartIncludes} claims=${row.scans.authoritySensitiveClaim.length} internal=${row.scans.internalReview.length}`);
}
process.exitCode = positive ? 0 : 1;
