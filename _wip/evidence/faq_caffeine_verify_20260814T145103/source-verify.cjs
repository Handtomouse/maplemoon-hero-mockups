const fs = require('fs');
const crypto = require('crypto');

const root = '/Users/handtomouse';
const site = `${root}/maplemoon_build_20260813`;
const repo = `${root}/maplemoon-website`;
const out = `${repo}/_wip/evidence/faq_caffeine_verify_20260814T145103/source-results.json`;
const oldFaqPath = `${repo}/_wip/checkpoints/MAPLEMOON-FAQ-CAFFEINE-EXACT-20260814T144235_20260814_144235_AEST/files/maplemoon_build_20260813/faq.html`;
const currentFaqPath = `${site}/faq.html`;
const oldQuestion = 'Is there any caffeine?';
const oldAnswer = 'No carob is naturally sweet and we use stimulant free ingredients';
const question = 'Does carob contain caffeine?';
const answer = 'Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list.';
const oldObject = `    {id:'caffeine',category:'carob',question:'${oldQuestion}',answer:'${oldAnswer}',keywords:['caffeine','caffeine free','coffee','cacao']},`;
const newObject = `    {id:'caffeine',category:'carob',question:'${question}',answer:'${answer}',keywords:['caffeine','caffeine free','coffee','cacao']},`;
const expectedHashes = {
  'homepage.html': '27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1',
  'our-story.html': '2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711',
  'carob-story.html': '4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd',
  'shop.html': 'f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038',
  'faq.html': 'c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e',
  'stockists.html': '4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887',
  'pure-carob-bar.html': '015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65',
};
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const count = (haystack, needle) => haystack.split(needle).length - 1;

(async () => {
  const oldFaq = fs.readFileSync(oldFaqPath);
  const currentFaq = fs.readFileSync(currentFaqPath);
  const oldText = oldFaq.toString('utf8');
  const currentText = currentFaq.toString('utf8');
  const reconstructed = oldText.replace(oldObject, newObject);
  const exactDelta = {
    predecessorFaqSha256: sha256(oldFaq),
    currentFaqSha256: sha256(currentFaq),
    oldObjectCountInPredecessor: count(oldText, oldObject),
    newObjectCountInCurrent: count(currentText, newObject),
    reconstructedEqualsCurrent: Buffer.from(reconstructed).equals(currentFaq),
    oldQuestionCountCurrent: count(currentText, oldQuestion),
    oldAnswerCountCurrent: count(currentText, oldAnswer),
    newQuestionCountCurrent: count(currentText, question),
    newAnswerCountCurrent: count(currentText, answer),
    cacaoButterObjectUnchanged: oldText.split('\n').find(line => line.includes("id:'cacao-butter'")) === currentText.split('\n').find(line => line.includes("id:'cacao-butter'")),
  };
  exactDelta.pass = exactDelta.predecessorFaqSha256 === '99dcafedaf8e812ffd2a55fdb028e27529dd47506ca8be68cc2dab0634afd493' &&
    exactDelta.currentFaqSha256 === expectedHashes['faq.html'] && exactDelta.oldObjectCountInPredecessor === 1 &&
    exactDelta.newObjectCountInCurrent === 1 && exactDelta.reconstructedEqualsCurrent &&
    exactDelta.oldQuestionCountCurrent === 0 && exactDelta.oldAnswerCountCurrent === 0 &&
    exactDelta.newQuestionCountCurrent === 1 && exactDelta.newAnswerCountCurrent === 1 && exactDelta.cacaoButterObjectUnchanged;

  const acquisition = Object.entries(expectedHashes).map(([file, expected]) => {
    const body = fs.readFileSync(`${site}/${file}`);
    const actual = sha256(body);
    return { file, bytes: body.length, expected, actual, pass: actual === expected };
  });

  const predecessor = [
    `${repo}/docs/orchestration/packets/MAPLEMOON-FAQ-CAFFEINE-EXACT-20260814T144235.md`,
    `${repo}/docs/orchestration/reviews/MAPLEMOON-FAQ-CAFFEINE-EXACT-20260814T144235.json`,
    oldFaqPath,
  ].map(file => {
    const body = fs.readFileSync(file);
    return { file, bytes: body.length, sha256: sha256(body) };
  });

  const refs = [...currentText.matchAll(/\b(?:src|href)="([^"]+)"/g)]
    .map(match => match[1])
    .filter(value => value.startsWith('/'))
    .map(value => value.split('#')[0])
    .filter((value, index, values) => values.indexOf(value) === index)
    .sort();
  const localReferences = [];
  for (const path of refs) {
    const response = await fetch(`http://127.0.0.1:4394${path}`, { redirect: 'manual' });
    const body = Buffer.from(await response.arrayBuffer());
    localReferences.push({ path, status: response.status, bytes: body.length, pass: response.status === 200 && body.length > 0 });
  }

  const result = {
    generatedAt: new Date().toISOString(),
    acquisition,
    acquisitionPass: acquisition.every(item => item.pass),
    predecessor,
    exactDelta,
    localReferences,
    localReferencesPass: localReferences.every(item => item.pass),
  };
  result.allPass = result.acquisitionPass && result.exactDelta.pass && result.localReferencesPass;
  fs.writeFileSync(out, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
  if (!result.allPass) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
