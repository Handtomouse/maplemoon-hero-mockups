const fs = require('fs');
const path = require('path');
const vm = require('vm');

const evidenceDir = '/Users/handtomouse/maplemoon-website/_wip/evidence/content_catalogue_truth_audit_20260814T161450';
const candidateRoot = '/Users/handtomouse/maplemoon_build_20260813';
const routeFiles = ['homepage.html', 'our-story.html', 'carob-story.html', 'shop.html', 'faq.html', 'stockists.html', 'pure-carob-bar.html'];
const scanFiles = [...routeFiles, 'mock-cart.js'];
const browser = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'browser-results.json'), 'utf8'));
const defaults = JSON.parse(fs.readFileSync(path.join(evidenceDir, 'default-state-results.json'), 'utf8'));

const detectors = {
  health_diet: {
    regex: /\b(?:vegan|gluten[- ]free|guilt[- ]free|healthy|health|wellness|gut|digestive|nervous system|peak performance|behaviour|nutrition|nourishment|refined sugars?|emulsifiers?|stabilisers?|lectins?)\b/gi,
    canary: 'Vegan, gluten free, healthy nourishment without refined sugar or stabilisers.',
  },
  origin: {
    regex: /\b(?:Australian(?:-grown| organic)?|grown (?:right here )?in Australia|Brunswick Heads|Byron Shire|far north coast|locally sourced)\b/gi,
    canary: 'Australian-grown on the far north coast near Brunswick Heads.',
  },
  manufacturing: {
    regex: /\b(?:handmade|hand-made|hand-moulded|crafted|made from|slow[- ]roasted|roasted|mills?|tempered?|small batches|studio session)\b/gi,
    canary: 'Handmade in small batches from slow-roasted carob that the maker mills and tempers.',
  },
  availability_commerce: {
    regex: /\b(?:right to your door|available|stockists?|locations?|orders?|checkout|shipping|secure payments?|made to order|in stock|buy online|full range)\b/gi,
    canary: 'Available in stock for checkout with secure payment and shipping to your door.',
  },
  caffeine: {
    regex: /\b(?:caffeine[- ]free|no caffeine|contains caffeine|without (?:the )?(?:buzz or stimulation of )?caffeine|virtually caffeine[- ]free)\b/gi,
    canary: 'No caffeine; caffeine-free product that contains caffeine would be contradictory.',
  },
  internal_vocabulary: {
    regex: /\b(?:pending|candidate|parsed|fingerprint|WIP|internal (?:cart )?QA|fix styles|review(?:-only)?|placeholder|demo)\b/gi,
    canary: 'Internal QA review-only candidate is pending with a placeholder fingerprint.',
  },
  testimonials: {
    regex: /\b(?:testimonials?|customer reviews?|what customers say|five[- ]star reviews?)\b/gi,
    canary: 'Customer testimonials and five-star reviews.',
  },
  superlative_sensory: {
    regex: /\b(?:perfect|best|ultimate|easiest|irresistibly|indulgent|delicious|every craving|guilt[- ]free)\b/gi,
    canary: 'The perfect, ultimate, irresistibly indulgent and guilt-free treat.',
  },
  prices: {
    regex: /\$\d+(?:\.\d{1,2})?(?:\s*[–-]\s*\$\d+(?:\.\d{1,2})?)?/g,
    canary: 'Price $12.95 or $5.99–$59.99.',
  },
  placeholder_links: {
    regex: /href\s*=\s*["'](?:\s*|#|javascript:[^"']*)["']/gi,
    canary: '<a href="#">placeholder</a>',
  },
  personal_data_fields: {
    regex: /<(?:input|textarea)[^>]+(?:type\s*=\s*["'](?:email|tel)["']|name\s*=\s*["'](?:email|phone|name|address|card)["'])/gi,
    canary: '<input type="email" name="email">',
  },
};

function matches(text, detector, limit = 300) {
  const regex = new RegExp(detector.regex.source, detector.regex.flags.includes('g') ? detector.regex.flags : `${detector.regex.flags}g`);
  const output = [];
  let match;
  while ((match = regex.exec(text)) && output.length < limit) {
    const start = Math.max(0, match.index - 72);
    const end = Math.min(text.length, match.index + match[0].length + 96);
    output.push({
      match: match[0],
      index: match.index,
      line: text.slice(0, match.index).split('\n').length,
      excerpt: text.slice(start, end).replace(/\s+/g, ' ').trim(),
    });
    if (match[0] === '') regex.lastIndex += 1;
  }
  return output;
}

function countExact(text, needle) {
  let count = 0;
  let start = 0;
  while ((start = text.indexOf(needle, start)) !== -1) {
    count += 1;
    start += needle.length;
  }
  return count;
}

const controls = Object.fromEntries(Object.entries(detectors).map(([name, detector]) => {
  const hits = matches(detector.canary, detector);
  return [name, { canary: detector.canary, fired: hits.length > 0, matches: hits.map(hit => hit.match) }];
}));

const rawSurfaces = Object.fromEntries(scanFiles.map(file => {
  const text = fs.readFileSync(path.join(candidateRoot, file), 'utf8');
  return [file, {
    bytes: Buffer.byteLength(text),
    detectors: Object.fromEntries(Object.entries(detectors).map(([name, detector]) => [name, matches(text, detector)])),
  }];
}));

const visibleSurfaces = Object.fromEntries(browser.filter(row => row.width === 390).map(row => [row.route, {
  bodyText: defaults.find(item => item.route === row.route && item.width === 390).state.reachableText,
  detectors: Object.fromEntries(Object.entries(detectors).filter(([name]) => !['placeholder_links', 'personal_data_fields'].includes(name)).map(([name, detector]) => {
    const reachableText = defaults.find(item => item.route === row.route && item.width === 390).state.reachableText;
    return [name, matches(reachableText, detector)];
  })),
  metadata: {
    title: row.dom.title,
    description: row.dom.metas.find(meta => meta.key === 'description')?.content || null,
    robots: row.dom.metas.find(meta => meta.key === 'robots')?.content || null,
    structuredData: row.dom.structuredData,
  },
  altText: row.dom.images.map(image => ({ alt: image.alt, src: image.src, visible: image.visible })),
  visibleLinks: row.dom.links.filter(link => link.visible).map(({ text, href }) => ({ text, href })),
  visibleButtons: row.dom.buttons.filter(button => button.visible).map(({ id, text, ariaLabel, disabled }) => ({ id, text, ariaLabel, disabled })),
  forms: row.dom.forms,
}]));

const shopRow = browser.find(row => row.route === 'shop' && row.width === 390);
const shopCards = shopRow.dom.productCards;
const sixBars = new Set([
  'Pure Carob & Cacao Butter',
  'Peppermint & Buckwheat',
  'Roasted Hazelnut',
  'Coconut & Goji',
  'Cayenne Chilli',
  'Almond & Celtic Salt',
]);
const categoryCounts = shopCards.reduce((counts, card) => {
  counts[card.category] = (counts[card.category] || 0) + 1;
  return counts;
}, {});
const catalogue = {
  totalCards: shopCards.length,
  categoryCounts,
  sixBarCards: shopCards.filter(card => card.category === 'bars' && sixBars.has(card.name)),
  beyondSixBarRule: shopCards.filter(card => !(card.category === 'bars' && sixBars.has(card.name))),
  enquiryCards: shopCards.filter(card => card.availability === 'enquiry'),
  addToCartCards: shopCards.filter(card => card.action?.tag === 'button'),
  gojiBites: shopCards.find(card => card.name === 'Goji Carob Bites'),
  coconutBites: shopCards.find(card => card.name === 'Coconut Carob Bites'),
  bitesAreDistinct: (() => {
    const goji = shopCards.find(card => card.name === 'Goji Carob Bites');
    const coconut = shopCards.find(card => card.name === 'Coconut Carob Bites');
    return Boolean(goji && coconut && goji.image?.src !== coconut.image?.src && goji.description !== coconut.description);
  })(),
};

const faqSource = fs.readFileSync(path.join(candidateRoot, 'faq.html'), 'utf8');
const exactQuestion = 'Does carob contain caffeine?';
const exactAnswer = 'Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list.';
const faqRow = browser.find(row => row.route === 'faq' && row.width === 390);
const faqCaffeine = {
  exactQuestion,
  exactAnswer,
  sourceQuestionCount: countExact(faqSource, exactQuestion),
  sourceAnswerCount: countExact(faqSource, exactAnswer),
  domQuestionCount: faqRow.dom.faqItems.filter(item => item.question === exactQuestion).length,
  domAnswerCount: faqRow.dom.faqItems.filter(item => item.answer === exactAnswer).length,
  broaderProductLevelVisibleHits: Object.fromEntries(Object.entries(visibleSurfaces).map(([route, value]) => [route, value.detectors.caffeine])),
  allFaqItems: faqRow.dom.faqItems,
};

const cvPhrases = ['smooth carob', 'slow-roasted carob', 'Maple Moon mills carob', 'handmade in small batches'];
const candidateCombined = scanFiles.map(file => fs.readFileSync(path.join(candidateRoot, file), 'utf8')).join('\n');
const cvCases = cvPhrases.map(phrase => ({ phrase, exactCandidateCount: countExact(candidateCombined.toLowerCase(), phrase.toLowerCase()) }));

const stockistSource = fs.readFileSync(path.join(candidateRoot, 'stockists.html'), 'utf8');
const stockistLiteralMatch = stockistSource.match(/var\s+stockists\s*=\s*(\[[\s\S]*?\]);\s*var\s+DEFAULT_LIMIT/);
if (!stockistLiteralMatch) throw new Error('Could not isolate the stockists source array');
const stockistRecords = vm.runInNewContext(`(${stockistLiteralMatch[1]})`, Object.create(null), { timeout: 1000 });
const stockists = {
  sourceTotal: stockistRecords.length,
  withheldUnknown: stockistRecords.filter(item => item.state === 'UNKNOWN').length,
  publicEligible: stockistRecords.filter(item => item.state !== 'UNKNOWN').length,
  byState: stockistRecords.filter(item => item.state !== 'UNKNOWN').reduce((counts, item) => {
    counts[item.state] = (counts[item.state] || 0) + 1;
    return counts;
  }, {}),
  byType: stockistRecords.filter(item => item.state !== 'UNKNOWN').reduce((counts, item) => {
    counts[item.type] = (counts[item.type] || 0) + 1;
    return counts;
  }, {}),
  visibleInitialResults: shopRow ? browser.find(row => row.route === 'stockists' && row.width === 390).dom.stockists.renderedResults.filter(item => !item.hidden).length : null,
  records: stockistRecords,
};

const cart = {
  perRouteOpenStates: browser.filter(row => row.width === 390).map(row => ({ route: row.route, ...row.cart })),
  shopJourneys: browser.filter(row => row.route === 'shop').map(row => ({ width: row.width, ...row.shopJourney })),
  mutationRequests: [...new Set(browser.flatMap(row => row.mutationRequests))],
  personalDataInputsInEveryOpenCart: browser.every(row => row.cart.personalDataInputs === 0),
};

const emailForms = browser.filter(row => row.emailForms).map(row => ({ route: row.route, width: row.width, ...row.emailForms, mutationRequests: row.mutationRequests }));

const result = {
  schema: 'maplemoon-content-truth-evidence/v1',
  controls,
  allControlsFired: Object.values(controls).every(control => control.fired),
  rawSurfaces,
  visibleSurfaces,
  catalogue,
  faqCaffeine,
  cvCases,
  stockists,
  cart,
  emailForms,
  photographyTruth: {
    wiredHeroFiles: 5,
    eligibleV9Frames: 14,
    percent: 36,
    wording: '5 wired photo_finals hero files / 14 eligible V9 frames = 36 percent',
  },
};

fs.writeFileSync(path.join(evidenceDir, 'analysis-results.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({
  controls: Object.fromEntries(Object.entries(controls).map(([name, control]) => [name, control.fired])),
  catalogue: { total: catalogue.totalCards, categories: catalogue.categoryCounts, beyondSix: catalogue.beyondSixBarRule.length, enquiry: catalogue.enquiryCards.map(card => card.name), bitesAreDistinct: catalogue.bitesAreDistinct },
  caffeine: { sourceQuestionCount: faqCaffeine.sourceQuestionCount, sourceAnswerCount: faqCaffeine.sourceAnswerCount, domQuestionCount: faqCaffeine.domQuestionCount, domAnswerCount: faqCaffeine.domAnswerCount },
  cvCases,
  stockists: { sourceTotal: stockists.sourceTotal, withheldUnknown: stockists.withheldUnknown, publicEligible: stockists.publicEligible, initialVisible: stockists.visibleInitialResults },
  cart: { personalDataInputsInEveryOpenCart: cart.personalDataInputsInEveryOpenCart, mutationRequests: cart.mutationRequests },
  photographyPercent: result.photographyTruth.percent,
}, null, 2));

if (!result.allControlsFired || catalogue.totalCards !== 24 || catalogue.beyondSixBarRule.length !== 18 || !catalogue.bitesAreDistinct || faqCaffeine.sourceQuestionCount !== 1 || faqCaffeine.sourceAnswerCount !== 1 || faqCaffeine.domQuestionCount !== 1 || faqCaffeine.domAnswerCount !== 1 || stockists.publicEligible !== 197 || !cart.personalDataInputsInEveryOpenCart || cart.mutationRequests.length) process.exitCode = 2;
