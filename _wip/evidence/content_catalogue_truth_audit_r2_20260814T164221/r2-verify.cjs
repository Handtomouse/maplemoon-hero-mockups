const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const phase = process.argv[2];
if (!['acquisition', 'close'].includes(phase)) throw new Error('usage: node r2-verify.cjs acquisition|close');

const home = '/Users/handtomouse';
const repo = path.join(home, 'maplemoon-website');
const candidate = path.join(home, 'maplemoon_build_20260813');
const firstEvidence = path.join(repo, '_wip/evidence/content_catalogue_truth_audit_20260814T161450');
const r2Evidence = path.join(repo, '_wip/evidence/content_catalogue_truth_audit_r2_20260814T164221');
const firstReview = path.join(repo, 'docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-20260814T161450.md');
const r2Review = path.join(repo, 'docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-R2-20260814T164221.md');
const ruleRegister = path.join(home, 'Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/RULE-REGISTER.json');
const decisionsNeeded = path.join(home, 'Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/DECISIONS-NEEDED.md');
const sourceRegister = path.join(home, 'Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/SOURCE-REGISTER.md');
const failures = [];

const expectedHashes = {
  'maplemoon_build_20260813/homepage.html': '27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1',
  'maplemoon_build_20260813/our-story.html': '2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711',
  'maplemoon_build_20260813/carob-story.html': '4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd',
  'maplemoon_build_20260813/shop.html': 'f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038',
  'maplemoon_build_20260813/faq.html': 'c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e',
  'maplemoon_build_20260813/stockists.html': '4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887',
  'maplemoon_build_20260813/pure-carob-bar.html': '015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65',
  'maplemoon_build_20260813/mock-cart.js': '36fb46b05a46ecf1c770991c6b9cf2eb8c08fda361c7176d37df081668f123aa',
  'maplemoon_build_20260813/mock-cart.css': 'c17deb1f972017d9790f2191360a457e54d7287730847f9f470c9de371603308',
  'Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/CONTENT-SAFETY-AND-VOICE.md': 'f93775ee1d96f518100dc6cd036ea85edc3414ea8110abc8e95fdf2d88269403',
  'UFC/ops/bus/maplemoon/BOSS_20260814.md': '3f1e51db694cd53f43bde0d0783b262a526e200ea3657d521c313d97c0e2e4db',
  'maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.md': '8b68ad125353c57befd0f0035acae2530756cb52c9a242cbdd12a148becb40a0',
  'maplemoon-website/docs/orchestration/reviews/MAPLEMOON-STYLES-KIT-BOSS-INTAKE-20260814T151331.md': 'f476f207550fc44dca08638a486ae071105a79a56f48250b8e96e5dcc4a2d2ed',
  'maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-20260814T161450.md': '86b86437447de056293a960f6f9ca53bd92fdf20312b2eaf5c1b56e86d3d12e0',
  'maplemoon-website/_wip/evidence/content_catalogue_truth_audit_20260814T161450/analysis-results.json': '8306c2a124c98f23e4392a936c0d0a44a66b239299f087308c5fd369b64f81f7',
  'maplemoon-website/_wip/evidence/content_catalogue_truth_audit_20260814T161450/browser-results.json': '36ff65dbedeb2c69928398f1b98130570c7af7faf85e56e12a0aff1301eac0fd',
  'maplemoon-website/_wip/evidence/content_catalogue_truth_audit_20260814T161450/default-state-results.json': '7cfaea38df8d31a9b6f066f965349e8f03bcde94f998b52889d35f73c337bf04',
  'maplemoon-website/_wip/evidence/content_catalogue_truth_audit_20260814T161450/content-state-results.json': 'a0ecf1fbb82fe606bdf30586211cc4545e0d4dfebe1ebf43a121c5fa0d9b67fc',
  'maplemoon-website/_wip/evidence/content_catalogue_truth_audit_20260814T161450/verification-results.json': '145057a5b4b16792b5b7b2d3bf095a9c3962dea5d10b5d4ef7839d10ea4069a3',
};

const projectionExpected = {
  materialRules: '6a9492f98aa6194e096200d42ba0d3ff97ffe3af14c7ea263f75d6fb0e8d4690',
  decisions010Through012: 'd9bfeb4dcb2d9d907972fea627d93da53b5a9330c67da5f97947fd4d3884b82a',
};

const detectors = {
  health_diet: [/\b(?:vegan|gluten[- ]free|guilt[- ]free|healthy|health|wellness|gut|digestive|nervous system|peak performance|behaviour|nutrition|nourishment|refined sugars?|emulsifiers?|stabilisers?|lectins?)\b/gi, 'Vegan, gluten free, healthy nourishment without refined sugar or stabilisers.'],
  origin: [/\b(?:Australian(?:-grown| organic)?|grown (?:right here )?in Australia|Brunswick Heads|Byron Shire|far north coast|locally sourced)\b/gi, 'Australian-grown on the far north coast near Brunswick Heads.'],
  manufacturing: [/\b(?:handmade|hand-made|hand-moulded|crafted|made from|slow[- ]roasted|roasted|mills?|tempered?|small batches|studio session)\b/gi, 'Handmade in small batches from slow-roasted carob that the maker mills and tempers.'],
  availability_commerce: [/\b(?:right to your door|available|stockists?|locations?|orders?|checkout|shipping|secure payments?|made to order|in stock|buy online|full range)\b/gi, 'Available in stock for checkout with secure payment and shipping to your door.'],
  caffeine: [/\b(?:caffeine[- ]free|no caffeine|contains caffeine|without (?:the )?(?:buzz or stimulation of )?caffeine|virtually caffeine[- ]free)\b/gi, 'No caffeine; caffeine-free product that contains caffeine would be contradictory.'],
  internal_vocabulary: [/\b(?:pending|candidate|parsed|fingerprint|WIP|internal (?:cart )?QA|fix styles|review(?:-only)?|placeholder|demo)\b/gi, 'Internal QA review-only candidate is pending with a placeholder fingerprint.'],
  testimonials: [/\b(?:testimonials?|customer reviews?|what customers say|five[- ]star reviews?)\b/gi, 'Customer testimonials and five-star reviews.'],
  superlative_sensory: [/\b(?:perfect|best|ultimate|easiest|irresistibly|indulgent|delicious|every craving|guilt[- ]free)\b/gi, 'The perfect, ultimate, irresistibly indulgent and guilt-free treat.'],
  prices: [/\$\d+(?:\.\d{1,2})?(?:\s*[–-]\s*\$\d+(?:\.\d{1,2})?)?/g, 'Price $12.95 or $5.99–$59.99.'],
  placeholder_links: [/href\s*=\s*["'](?:\s*|#|javascript:[^"']*)["']/gi, '<a href="#">placeholder</a>'],
  personal_data_fields: [/<(?:input|textarea)[^>]+(?:type\s*=\s*["'](?:email|tel)["']|name\s*=\s*["'](?:email|phone|name|address|card)["'])/gi, '<input type="email" name="email">'],
};

function sha256Buffer(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function sha256File(file) {
  return sha256Buffer(fs.readFileSync(file));
}

function matchCount(text, regex) {
  const expression = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : `${regex.flags}g`);
  return [...text.matchAll(expression)].length;
}

function observe(file) {
  const stat = fs.statSync(file);
  return { sha256: sha256File(file), bytes: stat.size, mtime: stat.mtime.toISOString() };
}

fs.mkdirSync(r2Evidence, { recursive: true });

const hashResults = {};
for (const [relative, expected] of Object.entries(expectedHashes)) {
  const file = path.join(home, relative);
  const actual = fs.existsSync(file) ? sha256File(file) : null;
  hashResults[relative] = { expected, actual, matches: actual === expected };
  if (actual !== expected) failures.push(`hash ${relative}`);
}

const jqFilter = '{kitVersion, rules: [.rules[] | select(.id == "CNT-001" or .id == "CNT-002" or .id == "CNT-003" or .id == "CNT-004" or .id == "CNT-005" or .id == "CMP-010" or .id == "MEDIA-001" or .id == "MEDIA-002")], decisions: [.decisions[] | select(.id == "DEC-010" or .id == "DEC-011" or .id == "DEC-012")], sources: (.sources | with_entries(select(.key == "SRC-LEDGER" or .key == "SRC-MORNING-BRIEF" or .key == "SRC-NATE-STYLE-REVIEW" or .key == "SRC-CAFFEINE-STUDY" or .key == "SRC-KIT")))}';
const materialProjection = execFileSync('jq', ['-cS', jqFilter, ruleRegister]);
const decisionsText = fs.readFileSync(decisionsNeeded, 'utf8');
const decisionStart = decisionsText.indexOf('## `DEC-010` —');
if (decisionStart < 0) failures.push('DEC-010 projection start missing');
const decisionProjection = Buffer.from(decisionStart >= 0 ? decisionsText.slice(decisionStart) : '', 'utf8');
const projectionHashes = {
  materialRules: sha256Buffer(materialProjection),
  decisions010Through012: sha256Buffer(decisionProjection),
};
if (projectionHashes.materialRules !== projectionExpected.materialRules) failures.push('material rule projection');
if (projectionHashes.decisions010Through012 !== projectionExpected.decisions010Through012) failures.push('DEC-010 through DEC-012 projection');
fs.writeFileSync(path.join(r2Evidence, 'material-rule-projection.jsonl'), materialProjection);
fs.writeFileSync(path.join(r2Evidence, 'decision-010-through-012.md'), decisionProjection);

const rules = JSON.parse(materialProjection);
const ruleById = Object.fromEntries(rules.rules.map(item => [item.id, item]));
const decisionById = Object.fromEntries(rules.decisions.map(item => [item.id, item]));
const authorityFindings = {
  catalogue: { rule: ruleById['CNT-001'], resolvedTo24: /24[- ]card|24 products|supersed/i.test(JSON.stringify(rules)) },
  healthDiet: ruleById['CNT-003'],
  commerce: ruleById['CNT-004'],
  caffeine: { rule: ruleById['CNT-005'], decision: decisionById['DEC-011'] },
  customerLanguage: ruleById['CMP-010'],
  media: { identity: ruleById['MEDIA-001'], proof: ruleById['MEDIA-002'], decision: decisionById['DEC-012'] },
  caseLevelCopy: { rule: ruleById['CNT-002'], decision: decisionById['DEC-010'] },
};
if (authorityFindings.catalogue.resolvedTo24) failures.push('unexpected 24-card production authority');
if (ruleById['CNT-005']?.status !== 'APPROVED' || decisionById['DEC-011']?.status !== 'APPROVED') failures.push('CNT-005/DEC-011 exact approval');
if (!/exact wording/i.test(`${ruleById['CNT-005']?.approvalBoundary || ''} ${decisionById['DEC-011']?.approvalBoundary || ''}`)) failures.push('CNT-005 exact boundary');
if (!/finished Maple Moon recipe|product-level claims|product evidence/i.test(`${ruleById['CNT-005']?.approvalBoundary || ''} ${decisionById['DEC-011']?.approvalBoundary || ''}`)) failures.push('broader caffeine boundary');
if (ruleById['CNT-002']?.status !== 'NEEDS NATE') failures.push('case-level Carli authority');
if (!/six|exactly Pure Carob/i.test(ruleById['CNT-001']?.summary || '')) failures.push('six-item content authority');
if (ruleById['MEDIA-002']?.status !== 'CONTENT/MEDIA DEPENDENCY') failures.push('media proof dependency');

const browser = JSON.parse(fs.readFileSync(path.join(firstEvidence, 'browser-results.json'), 'utf8'));
const defaults = JSON.parse(fs.readFileSync(path.join(firstEvidence, 'default-state-results.json'), 'utf8'));
const contentStates = JSON.parse(fs.readFileSync(path.join(firstEvidence, 'content-state-results.json'), 'utf8'));
const analysis = JSON.parse(fs.readFileSync(path.join(firstEvidence, 'analysis-results.json'), 'utf8'));

const detectorResults = {};
const routeText = Object.fromEntries(defaults.filter(row => row.width === 390).map(row => [row.route, row.state.reachableText]));
const rawFiles = ['homepage.html', 'our-story.html', 'carob-story.html', 'shop.html', 'faq.html', 'stockists.html', 'pure-carob-bar.html', 'mock-cart.js'];
const rawText = Object.fromEntries(rawFiles.map(name => [name, fs.readFileSync(path.join(candidate, name), 'utf8')]));
for (const [name, [regex, canary]] of Object.entries(detectors)) {
  const canaryCount = matchCount(canary, regex);
  const target = ['placeholder_links', 'personal_data_fields'].includes(name) ? rawText : routeText;
  detectorResults[name] = {
    canaryCount,
    candidateHits: Object.fromEntries(Object.entries(target).map(([surface, text]) => [surface, matchCount(text, regex)])),
  };
  if (!canaryCount) failures.push(`detector canary ${name}`);
}

if (analysis.catalogue.totalCards !== 24 || analysis.catalogue.beyondSixBarRule.length !== 18 || !analysis.catalogue.bitesAreDistinct) failures.push('catalogue accounting');
if (analysis.catalogue.enquiryCards.length !== 4 || analysis.catalogue.addToCartCards.length !== 20) failures.push('catalogue actions');
if (analysis.faqCaffeine.sourceQuestionCount !== 1 || analysis.faqCaffeine.sourceAnswerCount !== 1 || analysis.faqCaffeine.domQuestionCount !== 1 || analysis.faqCaffeine.domAnswerCount !== 1) failures.push('exact FAQ count');
if (analysis.stockists.sourceTotal !== 204 || analysis.stockists.withheldUnknown !== 7 || analysis.stockists.publicEligible !== 197) failures.push('stockist accounting');
if (analysis.photographyTruth.wiredHeroFiles !== 5 || analysis.photographyTruth.eligibleV9Frames !== 14 || analysis.photographyTruth.percent !== 36) failures.push('photo truth');
if (!analysis.cvCases.every(item => item.exactCandidateCount === 0)) failures.push('CV exact phrase count');

const visibility = {
  defaultCartClosed: defaults.every(row => !row.state.cart.classOpen && row.state.cart.ariaHidden === 'true' && row.state.cart.inert),
  reviewCartOpenNoPersonalFields: browser.every(row => row.cart.open && row.cart.personalDataInputs === 0),
  defaultMobileDrawerClosed: defaults.filter(row => row.width === 390).every(row => row.state.drawerState === 'closed'),
  reviewMobileDrawerOpenSixRows: browser.filter(row => row.width === 390).every(row => row.drawer?.state === 'open' && row.drawer.rows.length === 6),
  exactFaqOpen: contentStates.every(row => row.faqState.expanded === 'true' && !row.faqState.answerHidden && row.faqState.answerMatches),
  newsletterNonSaving: contentStates.every(row => row.newsletterState.inputCleared && !row.newsletterState.statusHidden && !row.newsletterState.storageContainsAuditEmail),
  noMutationRequests: browser.every(row => row.mutationRequests.length === 0),
};
for (const [name, passed] of Object.entries(visibility)) if (!passed) failures.push(`visibility ${name}`);

const pngs = fs.readdirSync(firstEvidence).filter(name => name.endsWith('.png')).sort();
const pngResults = pngs.map(name => {
  const data = fs.readFileSync(path.join(firstEvidence, name));
  const result = { name, bytes: data.length, width: data.length >= 24 ? data.readUInt32BE(16) : 0, height: data.length >= 24 ? data.readUInt32BE(20) : 0, sha256: sha256Buffer(data) };
  if (data.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' || !result.bytes || !result.width || !result.height) failures.push(`PNG ${name}`);
  return result;
});
if (pngs.length !== 63) failures.push(`first PNG count ${pngs.length}`);

const wholeFileObservations = {
  decisionsNeeded: observe(decisionsNeeded),
  sourceRegister: observe(sourceRegister),
  ruleRegister: observe(ruleRegister),
};

if (phase === 'close') {
  if (!fs.existsSync(r2Review)) failures.push('R2 review missing');
  else {
    const review = fs.readFileSync(r2Review, 'utf8');
    const percentages = review.match(/\b\d+(?:\.\d+)?%/g) || [];
    if (percentages.length !== 1 || percentages[0] !== '36%') failures.push('R2 photography percentage');
    for (const required of ['supersedes the first review', 'CNT-005', 'DEC-011', 'CV-014', 'CV-051', 'CV-062', '197 public-eligible', '24-card']) if (!review.toLowerCase().includes(required.toLowerCase())) failures.push(`R2 review requirement ${required}`);
    for (const product of analysis.catalogue.sixBarCards.concat(analysis.catalogue.beyondSixBarRule).map(card => card.name)) if (!review.includes(`| ${product} |`)) failures.push(`R2 review product ${product}`);
  }
}

const result = {
  schema: 'maplemoon-content-truth-audit-r2-evidence/v1',
  phase,
  hashResults,
  projections: {
    materialRules: { expected: projectionExpected.materialRules, actual: projectionHashes.materialRules, matches: projectionHashes.materialRules === projectionExpected.materialRules },
    decisions010Through012: { expected: projectionExpected.decisions010Through012, actual: projectionHashes.decisions010Through012, matches: projectionHashes.decisions010Through012 === projectionExpected.decisions010Through012 },
  },
  wholeFileObservations,
  authorityFindings,
  inheritedEvidence: { pngCount: pngs.length, pngs: pngResults },
  detectors: detectorResults,
  counts: {
    browserCases: browser.length,
    defaultCases: defaults.length,
    contentStateCases: contentStates.length,
    catalogue: { total: analysis.catalogue.totalCards, beyondSix: analysis.catalogue.beyondSixBarRule.length, enquiry: analysis.catalogue.enquiryCards.length, cart: analysis.catalogue.addToCartCards.length, bitesDistinct: analysis.catalogue.bitesAreDistinct },
    faq: { sourceQuestion: analysis.faqCaffeine.sourceQuestionCount, sourceAnswer: analysis.faqCaffeine.sourceAnswerCount, domQuestion: analysis.faqCaffeine.domQuestionCount, domAnswer: analysis.faqCaffeine.domAnswerCount },
    stockists: { source: analysis.stockists.sourceTotal, withheld: analysis.stockists.withheldUnknown, publicEligible: analysis.stockists.publicEligible },
    photographyPercent: analysis.photographyTruth.percent,
  },
  visibility,
  firstReview: { path: firstReview, sha256: sha256File(firstReview), disposition: 'superseded-by-R2 due reconciled whole-file source drift; preserved byte-for-byte' },
  r2Review: fs.existsSync(r2Review) ? { path: r2Review, sha256: sha256File(r2Review) } : null,
  failures,
};
const outputPath = path.join(r2Evidence, `${phase}-results.json`);
fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({
  phase,
  fixedHashes: `${Object.values(hashResults).filter(value => value.matches).length}/${Object.keys(hashResults).length}`,
  projections: result.projections,
  inheritedPngs: pngs.length,
  controls: `${Object.values(detectorResults).filter(value => value.canaryCount > 0).length}/${Object.keys(detectorResults).length}`,
  counts: result.counts,
  visibility,
  failures,
}, null, 2));
if (failures.length) process.exitCode = 2;
