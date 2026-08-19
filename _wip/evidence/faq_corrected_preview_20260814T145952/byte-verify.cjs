const fs = require('fs');
const crypto = require('crypto');

const localRoot = '/Users/handtomouse/maplemoon_build_20260813';
const deployedRoot = '/Users/handtomouse/maplemoon-website/_wip/evidence/faq_corrected_preview_20260814T145952/deployed';
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/faq_corrected_preview_20260814T145952/byte-results.json';
const items = [
  ['homepage.html', 'homepage.html'],
  ['our-story.html', 'our-story.html'],
  ['carob-story.html', 'carob-story.html'],
  ['shop.html', 'shop.html'],
  ['faq.html', 'faq.html'],
  ['stockists.html', 'stockists.html'],
  ['pure-carob-bar.html', 'pure-carob-bar.html'],
  ['assets/design-system/mm-chrome.js', 'mm-chrome.js'],
  ['assets/design-system/mm-chrome.css', 'mm-chrome.css'],
  ['assets/design-system/mm-tokens.css', 'mm-tokens.css'],
  ['assets/design-system/mm-primitives.css', 'mm-primitives.css'],
  ['mock-cart.js', 'mock-cart.js'],
  ['mock-cart.css', 'mock-cart.css'],
];
const sha256 = body => crypto.createHash('sha256').update(body).digest('hex');
const count = (text, needle) => text.split(needle).length - 1;

const results = items.map(([localPath, deployedName]) => {
  const local = fs.readFileSync(`${localRoot}/${localPath}`);
  const deployed = fs.readFileSync(`${deployedRoot}/${deployedName}`);
  return {
    localPath,
    deployedName,
    http: 200,
    localBytes: local.length,
    deployedBytes: deployed.length,
    localSha256: sha256(local),
    deployedSha256: sha256(deployed),
    cmp: local.equals(deployed),
    pass: local.equals(deployed) && sha256(local) === sha256(deployed),
  };
});

const deployedFaq = fs.readFileSync(`${deployedRoot}/faq.html`, 'utf8');
const exactCopy = {
  newQuestion: count(deployedFaq, 'Does carob contain caffeine?'),
  newAnswer: count(deployedFaq, 'Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list.'),
  oldQuestion: count(deployedFaq, 'Is there any caffeine?'),
  oldAnswer: count(deployedFaq, 'No carob is naturally sweet and we use stimulant free ingredients'),
};
exactCopy.pass = exactCopy.newQuestion === 1 && exactCopy.newAnswer === 1 && exactCopy.oldQuestion === 0 && exactCopy.oldAnswer === 0;

const result = {
  generatedAt: new Date().toISOString(),
  deployment: 'https://maplemoonbuild20260813-krftm36lg-handtomouses-projects.vercel.app',
  deploymentId: 'dpl_6gGEYQfUuXZPYGLaasVDEo9KZrQD',
  results,
  exactCopy,
  allThirteenByteIdentical: results.length === 13 && results.every(result => result.pass),
};
result.allPass = result.allThirteenByteIdentical && exactCopy.pass;
fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (!result.allPass) process.exitCode = 1;
