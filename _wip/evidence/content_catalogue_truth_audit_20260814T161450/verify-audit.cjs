const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const repo = '/Users/handtomouse/maplemoon-website';
const home = '/Users/handtomouse';
const evidenceDir = path.join(repo, '_wip/evidence/content_catalogue_truth_audit_20260814T161450');
const reviewPath = path.join(repo, 'docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-20260814T161450.md');
const failures = [];

const expectedHashes = {
  'Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/CONTENT-SAFETY-AND-VOICE.md': 'f93775ee1d96f518100dc6cd036ea85edc3414ea8110abc8e95fdf2d88269403',
  'Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/DECISIONS-NEEDED.md': 'a410c87bcdef46ecfa5a41a98c81c157ff482d02a252756faf5d61b8c9541969',
  'Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/SOURCE-REGISTER.md': 'f04cd18d640378938caace711a7fb2b3b5ebbc7c691df42adc80f9b386f7928c',
  'Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/RULE-REGISTER.json': '728960a4fb87978741730990ddee3319eebb15bfa791cce45edf81b60baf621f',
  'UFC/ops/bus/maplemoon/BOSS_20260814.md': '3f1e51db694cd53f43bde0d0783b262a526e200ea3657d521c313d97c0e2e4db',
  'maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.md': '8b68ad125353c57befd0f0035acae2530756cb52c9a242cbdd12a148becb40a0',
  'maplemoon-website/docs/orchestration/reviews/MAPLEMOON-STYLES-KIT-BOSS-INTAKE-20260814T151331.md': 'f476f207550fc44dca08638a486ae071105a79a56f48250b8e96e5dcc4a2d2ed',
  'maplemoon_build_20260813/homepage.html': '27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1',
  'maplemoon_build_20260813/our-story.html': '2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711',
  'maplemoon_build_20260813/carob-story.html': '4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd',
  'maplemoon_build_20260813/shop.html': 'f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038',
  'maplemoon_build_20260813/faq.html': 'c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e',
  'maplemoon_build_20260813/stockists.html': '4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887',
  'maplemoon_build_20260813/pure-carob-bar.html': '015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65',
};

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

const hashResults = {};
for (const [relative, expected] of Object.entries(expectedHashes)) {
  const file = path.join(home, relative);
  const actual = fs.existsSync(file) ? sha256(file) : null;
  hashResults[relative] = { expected, actual, matches: actual === expected };
  if (actual !== expected) failures.push(`hash ${relative}`);
}

const browser = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'browser-results.json'), 'utf8'));
const defaults = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'default-state-results.json'), 'utf8'));
const contentStates = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'content-state-results.json'), 'utf8'));
const analysis = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'analysis-results.json'), 'utf8'));
const review = fs.readFileSync(reviewPath, 'utf8');

if (browser.length !== 14) failures.push('browser case count');
for (const row of browser) {
  if (row.http !== 200 || row.dom.geometry.clientWidth !== row.width || row.dom.geometry.scrollWidth !== row.width) failures.push(`browser geometry ${row.route}@${row.width}`);
  if (row.consoleErrors.length || row.failedRequests.length || row.badResponses.length || row.mutationRequests.length) failures.push(`browser runtime ${row.route}@${row.width}`);
  if (row.dom.images.some(image => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0)) failures.push(`browser image ${row.route}@${row.width}`);
  if (!row.cart.open || row.cart.personalDataInputs !== 0) failures.push(`cart state ${row.route}@${row.width}`);
  if (row.width === 390 && (row.drawer?.state !== 'open' || row.drawer.rows.length !== 6)) failures.push(`drawer state ${row.route}@${row.width}`);
}
if (defaults.length !== 14) failures.push('default case count');
for (const row of defaults) {
  if (row.http !== 200 || row.state.geometry.clientWidth !== row.width || row.state.geometry.scrollWidth !== row.width) failures.push(`default geometry ${row.route}@${row.width}`);
  if (row.state.cart.classOpen || row.state.cart.ariaHidden !== 'true' || !row.state.cart.inert || !row.state.reachableText) failures.push(`default state ${row.route}@${row.width}`);
  if (row.width === 390 && row.state.drawerState !== 'closed') failures.push(`default drawer ${row.route}@${row.width}`);
}
for (const row of contentStates) {
  if (row.faqHttp !== 200 || row.homeHttp !== 200 || row.faqState.expanded !== 'true' || row.faqState.answerHidden || !row.faqState.answerMatches) failures.push(`content FAQ ${row.width}`);
  if (!row.newsletterState.inputCleared || row.newsletterState.statusHidden || row.newsletterState.storageContainsAuditEmail) failures.push(`content newsletter ${row.width}`);
}
if (!analysis.allControlsFired) failures.push('positive controls');
if (analysis.catalogue.totalCards !== 24 || analysis.catalogue.beyondSixBarRule.length !== 18 || !analysis.catalogue.bitesAreDistinct) failures.push('catalogue accounting');
if (analysis.catalogue.enquiryCards.length !== 4 || analysis.catalogue.addToCartCards.length !== 20) failures.push('catalogue actions');
if (analysis.faqCaffeine.sourceQuestionCount !== 1 || analysis.faqCaffeine.sourceAnswerCount !== 1 || analysis.faqCaffeine.domQuestionCount !== 1 || analysis.faqCaffeine.domAnswerCount !== 1) failures.push('exact caffeine FAQ');
if (analysis.stockists.sourceTotal !== 204 || analysis.stockists.withheldUnknown !== 7 || analysis.stockists.publicEligible !== 197) failures.push('stockist accounting');
if (!analysis.cart.personalDataInputsInEveryOpenCart || analysis.cart.mutationRequests.length) failures.push('cart data safety');
if (analysis.photographyTruth.wiredHeroFiles !== 5 || analysis.photographyTruth.eligibleV9Frames !== 14 || analysis.photographyTruth.percent !== 36) failures.push('photography truth');
if (!Object.values(analysis.visibleSurfaces).some(surface => surface.detectors.caffeine.length > 0)) failures.push('broader caffeine scan control');
if (!analysis.cvCases.every(item => item.exactCandidateCount === 0)) failures.push('CV exact phrase count');

const routeNames = ['Home', 'Our Story', 'Carob Story', 'Shop', 'FAQ', 'Stockists', 'Pure Carob Bar'];
for (const name of routeNames) if (!review.includes(`| ${name} |`)) failures.push(`review route ${name}`);
for (const card of analysis.catalogue.sixBarCards.concat(analysis.catalogue.beyondSixBarRule)) if (!review.includes(`| ${card.name} |`)) failures.push(`review product ${card.name}`);
for (const decision of ['CV-014', 'CV-051', 'CV-062', 'NATE-CONTENT-01', 'NATE-CONTENT-06']) if (!review.includes(decision)) failures.push(`review decision ${decision}`);
const reviewPercentages = review.match(/\b\d+(?:\.\d+)?%/g) || [];
if (reviewPercentages.length !== 1 || reviewPercentages[0] !== '36%') failures.push('review photography percentage');

const pngs = fs.readdirSync(evidenceDir).filter(name => name.endsWith('.png')).sort();
const pngResults = [];
for (const name of pngs) {
  const file = path.join(evidenceDir, name);
  const data = fs.readFileSync(file);
  const signature = data.subarray(0, 8).toString('hex');
  const width = data.length >= 24 ? data.readUInt32BE(16) : 0;
  const height = data.length >= 24 ? data.readUInt32BE(20) : 0;
  pngResults.push({ name, bytes: data.length, width, height });
  if (signature !== '89504e470d0a1a0a' || !width || !height || !data.length) failures.push(`PNG ${name}`);
}
if (pngs.length < 63) failures.push(`screenshot count ${pngs.length}`);

const result = {
  schema: 'maplemoon-content-truth-verification/v1',
  hashes: hashResults,
  cases: { browser: browser.length, defaults: defaults.length, contentStates: contentStates.length },
  screenshots: { count: pngs.length, files: pngResults },
  controls: Object.fromEntries(Object.entries(analysis.controls).map(([name, control]) => [name, control.fired])),
  catalogue: { total: analysis.catalogue.totalCards, beyondSix: analysis.catalogue.beyondSixBarRule.length, enquiry: analysis.catalogue.enquiryCards.length, cart: analysis.catalogue.addToCartCards.length, bitesDistinct: analysis.catalogue.bitesAreDistinct },
  caffeine: { exactQuestionSource: analysis.faqCaffeine.sourceQuestionCount, exactAnswerSource: analysis.faqCaffeine.sourceAnswerCount, exactQuestionDom: analysis.faqCaffeine.domQuestionCount, exactAnswerDom: analysis.faqCaffeine.domAnswerCount, broaderClaimsDetected: true },
  stockists: { source: analysis.stockists.sourceTotal, withheld: analysis.stockists.withheldUnknown, publicEligible: analysis.stockists.publicEligible },
  photographyPercent: analysis.photographyTruth.percent,
  reviewSha256: sha256(reviewPath),
  failures,
};
fs.writeFileSync(path.join(evidenceDir, 'verification-results.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({
  hashes: `${Object.values(hashResults).filter(item => item.matches).length}/${Object.keys(hashResults).length}`,
  cases: result.cases,
  screenshots: result.screenshots.count,
  controls: Object.values(result.controls).filter(Boolean).length,
  catalogue: result.catalogue,
  caffeine: result.caffeine,
  stockists: result.stockists,
  photographyPercent: result.photographyPercent,
  failures,
}, null, 2));
if (failures.length) process.exitCode = 2;
