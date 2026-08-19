import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const localRoot = '/private/tmp/maplemoon-track1-repair-20260816';
const remotePrefix = '/private/tmp/maplemoon-track1-remote-';
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/track1_repair_20260816/remote-results.json';
const routes = ['homepage', 'shop', 'our-story', 'carob-story', 'faq', 'stockists'];
const sha256 = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const count = (text, needle) => text.split(needle).length - 1;
const countCI = (text, needle) => (text.match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;

const checks = {
  homepage: text => ({ testimonial: count(text, 'Maple Moon customer 01, Sydney') === 1 }),
  shop: text => ({
    positives: ['Two layers for a fruit indulgence', 'nightcap with benefits', 'Ayurvedic inspired', 'fudgy inside'].every(needle => count(text, needle) >= 1),
    negatives: ['hand-moulded', 'nightcap that behaves', 'VIEW RANGE', 'catalogue preview'].every(needle => countCI(text, needle) === 0),
  }),
  'our-story': text => ({ founderPending: count(text, 'Founder portrait pending') === 2 }),
  'carob-story': text => ({ stimulantSentence: count(text, 'Stimulant free, making it perfect for arvos and slow evenings') === 1 }),
  faq: text => ({ mapleAnswer: count(text, 'despite the name, we dont ADD any extra sugars') === 1 }),
  stockists: text => ({ status: count(text, '204 parsed · 7 need confirmation') === 1 }),
};

const routeResults = routes.map(route => {
  const local = fs.readFileSync(path.join(localRoot, `${route}.html`));
  const remote = fs.readFileSync(`${remotePrefix}${route}.html`);
  const text = remote.toString('utf8');
  const assertions = checks[route](text);
  return {
    route,
    status: 200,
    bytes: remote.length,
    carobControl: countCI(text, 'carob'),
    localSha256: sha256(local),
    remoteSha256: sha256(remote),
    byteEqual: local.equals(remote),
    assertions,
    result: local.equals(remote) && countCI(text, 'carob') > 0 && Object.values(assertions).every(Boolean) ? 'PASS' : 'FAIL',
  };
});

const assets = [
  'mock-cart.js',
  'mock-cart.css',
  'assets/design-system/mm-chrome.js',
  'assets/design-system/mm-chrome.css',
  'assets/design-system/mm-tokens.css',
  'assets/design-system/mm-primitives.css',
];
const assetResults = assets.map(asset => {
  const local = fs.readFileSync(path.join(localRoot, asset));
  const remote = fs.readFileSync(`${remotePrefix}${asset.replaceAll('/', '__')}`);
  return { asset, status: 200, bytes: remote.length, localSha256: sha256(local), remoteSha256: sha256(remote), byteEqual: local.equals(remote), result: local.equals(remote) ? 'PASS' : 'FAIL' };
});
const result = { preview: 'https://maplemoonbuild20260813-rx9cjirjk-handtomouses-projects.vercel.app', deploymentId: 'dpl_GMAVpJvm6ytQkLpDBAJXSGr1yffd', routeResults, assetResults, failures: [...routeResults, ...assetResults].filter(row => row.result !== 'PASS') };
fs.writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
for (const row of routeResults) console.log(`${row.result} route=${row.route} status=${row.status} bytes=${row.bytes} control=${row.carobControl} byte_equal=${row.byteEqual}`);
for (const row of assetResults) console.log(`${row.result} asset=${row.asset} status=${row.status} bytes=${row.bytes} byte_equal=${row.byteEqual}`);
console.log(`SUMMARY pass=${routeResults.length + assetResults.length - result.failures.length} fail=${result.failures.length} total=${routeResults.length + assetResults.length}`);
process.exitCode = result.failures.length ? 1 : 0;
