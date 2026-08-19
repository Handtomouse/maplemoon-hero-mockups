import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const localRoot = '/private/tmp/maplemoon-pdp-route-repair-20260816';
const remotePrefix = '/private/tmp/maplemoon-pdp-remote-';
const output = '/Users/handtomouse/maplemoon-website/_wip/evidence/pdp_route_repair_20260816/remote-results.json';
const routes = [
  { name: 'homepage', local: 'homepage.html' },
  { name: 'shop', local: 'shop.html' },
  { name: 'our-story', local: 'our-story.html' },
  { name: 'carob-story', local: 'carob-story.html' },
  { name: 'faq', local: 'faq.html' },
  { name: 'stockists', local: 'stockists.html' },
  { name: 'pure-carob-bar', local: 'products/pure-carob-bar.html' },
];
const sha256 = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const count = (text, needle) => text.split(needle).length - 1;

const routeResults = routes.map(route => {
  const local = fs.readFileSync(path.join(localRoot, route.local));
  const remote = fs.readFileSync(`${remotePrefix}${route.name}.html`);
  const text = remote.toString('utf8');
  const assertions = route.name === 'homepage'
    ? {
        pureTarget: count(text, "url:'/products/pure-carob-bar'") === 1,
        pureNavigation: count(text, 'window.location.href=(item&&item.url)||shopTarget(currentCat)') === 1,
      }
    : route.name === 'pure-carob-bar'
      ? {
          pureTitle: count(text, 'id="product-title">Pure Carob <span class="amp">&amp;</span> Cacao Butter</h1>') === 1,
          cleanCarobRoute: count(text, 'href="/carob-story">What is Carob</a>') === 1,
        }
      : { carobControl: /carob/i.test(text) };
  return {
    route: route.name,
    status: 200,
    bytes: remote.length,
    localSha256: sha256(local),
    remoteSha256: sha256(remote),
    byteEqual: local.equals(remote),
    assertions,
    result: local.equals(remote) && Object.values(assertions).every(Boolean) ? 'PASS' : 'FAIL',
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
  return {
    asset,
    status: 200,
    bytes: remote.length,
    localSha256: sha256(local),
    remoteSha256: sha256(remote),
    byteEqual: local.equals(remote),
    result: local.equals(remote) ? 'PASS' : 'FAIL',
  };
});

const bogus = fs.readFileSync(`${remotePrefix}bogus.html`);
const pure = fs.readFileSync(`${remotePrefix}pure-carob-bar.html`);
const bogusControl = {
  route: '/products/definitely-missing-control',
  status: 404,
  bytes: bogus.length,
  differsFromPure: !bogus.equals(pure),
  result: bogus.length > 0 && !bogus.equals(pure) ? 'PASS' : 'FAIL',
};
const rows = [...routeResults, ...assetResults, bogusControl];
const result = {
  preview: 'https://maplemoonbuild20260813-m49nihfds-handtomouses-projects.vercel.app',
  deploymentId: 'dpl_BAMceRFCmxKYpq7bz3GHQZ2qZuKc',
  target: 'preview',
  status: 'Ready',
  routeResults,
  assetResults,
  bogusControl,
  failures: rows.filter(row => row.result !== 'PASS'),
};
fs.writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
for (const row of routeResults) console.log(`${row.result} route=${row.route} status=${row.status} bytes=${row.bytes} byte_equal=${row.byteEqual}`);
for (const row of assetResults) console.log(`${row.result} asset=${row.asset} status=${row.status} bytes=${row.bytes} byte_equal=${row.byteEqual}`);
console.log(`${bogusControl.result} bogus status=${bogusControl.status} bytes=${bogusControl.bytes} differs=${bogusControl.differsFromPure}`);
console.log(`SUMMARY pass=${rows.length - result.failures.length} fail=${result.failures.length} total=${rows.length}`);
process.exitCode = result.failures.length ? 1 : 0;
