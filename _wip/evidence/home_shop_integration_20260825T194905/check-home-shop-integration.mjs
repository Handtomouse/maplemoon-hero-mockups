#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const evidenceDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(evidenceDir, '../../..');
const expectedLabel = 'TEMPORARY STAGING / REPLACE BEFORE FINAL';
const expectedHeroProjection = 'ad8c0333934570ac34ede6fd7f7ed115968d6505c99be402ca55c525208cde5e';
const expected = {
  packet: ['docs/orchestration/packets/MAPLEMOON-HOME-SHOP-INTEGRATION-20260825T194905.md', '54a21f59fc9c7a3d9bee13fc88a3bc307331bd8d7292a07600339c6a57fc79bc'],
  home: ['_wip/homepage_real_1_lead_photo.WIP.html', '77142fb603eb3caeb673ecb1fe55cfbd42fe3251701e668e2fd6208082b192e1'],
  shop: ['_wip/shop.WIP.html', '46245efd1b992c2dca635f993317936d547d92f43aa4bfb1c7a52a3ea797a491'],
  sprite: ['assets/icons/mm-icons-v2.svg', '9fe2b4c8e740efb0ff0566ad210e308d13a12bc64ea4c41201d4016b76111ff1'],
  bundle: ['assets/product_shots/temporary_eclipse_bite_bundle_web.webp', '8bca090850c29da285ae266d8bf666199ae7cacbeee475160df13bc82c66932f'],
  bundleSource: ['_wip/deploy/generated/maplemoon_temporary_bundle_preview_20260825t170206/assets/product_shots/temporary_eclipse_bite_bundle_web.webp', '8bca090850c29da285ae266d8bf666199ae7cacbeee475160df13bc82c66932f'],
  manifest: ['_wip/evidence/icon_session_20260825/v2_review/manifest.json', 'cb0f526309c000626da312c504b384e6e9b7de415b7074556488fc191509844b'],
  ourStory: ['_wip/our-story.WIP.html', 'e45a05474e6a9dce28afc9bf5094790eaaad21a51912e03c36b5c0ff4645dfa5'],
  f98: ['assets/our_story/founders_pair_f98_soft_2400.webp', 'd254e21f31c7b1e41155884437c7831806502abf7d1a77e72976a8383a82e32e'],
  ritualQuiet: ['assets/our_story/ritual_quiet_finish_20260825.webp', '0db98c13c3526ae3a402906a67eae66980b9aa34f5d52ff1bcfe1757c8b443ff'],
  ritualPause: ['assets/our_story/ritual_softer_pause_20260825.webp', 'ee374355ff724c82de01faceb531faeac3fbb9060cee71b73bfd66468889fffd'],
  ritualCup: ['assets/our_story/ritual_last_cup_20260825.webp', 'd2d3b2faf6623d9341d508686ae316bd4e17b7e37ca8f3986cd57f25b2c236ad'],
  builder: ['scripts/build-maplemoon-wip-preview.py', '11a9b349080c177a4e032f7e7b19f8c671750b5923497629586b11d66959c85c'],
  iconChecker: ['scripts/check-maplemoon-icon-v2-review.mjs', '64f1511be3208dc3b9acdd924244be4689f62676c6027e45e18b43c979a9e9ce'],
  receiptChecker: ['scripts/check-maplemoon-receipt.py', '7289968671376eb1ccf0892e1dc33e9811840ffb72eda837dbde56155fb0a752'],
};

const failures = [];
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const count = (text, needle) => text.split(needle).length - 1;

async function bytes(relative) {
  return readFile(join(root, relative));
}

async function verifyPins() {
  for (const [name, [relative, wanted]] of Object.entries(expected)) {
    const observed = sha(await bytes(relative));
    assert(observed === wanted, `${name} pin expected ${wanted}, observed ${observed}`);
  }
  const mockCart = await readFile('/Users/handtomouse/maplemoon_build_20260813/mock-cart.js');
  assert(sha(mockCart) === 'aab0c1e4d45ab919559b34aa5ab8b4b15b9b4081e32649db170caaeb19ecf69c', 'mock-cart pin moved');
}

async function validateSprite(sprite) {
  const manifest = JSON.parse(await bytes(expected.manifest[0]));
  const ids = [...sprite.matchAll(/<symbol id="([^"]+)"/g)].map((match) => match[1]);
  assert(ids.length === 44 && new Set(ids).size === 44, `sprite symbol count/uniqueness ${ids.length}/${new Set(ids).size}`);
  assert(!/<(?:text|image|script|style)\b/i.test(sprite), 'sprite contains text/image/script/style');
  assert(!/\son\w+\s*=/i.test(sprite), 'sprite contains event handler');
  assert(!/\b(?:href|src)\s*=/.test(sprite), 'sprite contains linked dependency');
  assert(!/(?:rgba?\(|hsla?\(|#[0-9a-f]{3,8}\b)/i.test(sprite), 'sprite contains hard-coded drawing colour');
  for (const icon of manifest.icons) {
    const source = (await bytes(join('_wip/evidence/icon_session_20260825/v2_review', icon.file))).toString('utf8');
    const opening = source.match(/^<svg xmlns="[^"]+"([^>]*)>/)?.[1];
    const body = source.match(/<\/title>([\s\S]*)<\/svg>\s*$/)?.[1];
    assert(opening && body !== undefined, `cannot parse approved source ${icon.id}`);
    const attrs = Object.fromEntries([...opening.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
    const expectedSymbol = `<symbol id="mm-icon-${icon.id}" viewBox="${attrs.viewBox}" fill="${attrs.fill}" stroke="${attrs.stroke}" stroke-width="${attrs['stroke-width']}" stroke-linecap="${attrs['stroke-linecap']}" stroke-linejoin="${attrs['stroke-linejoin']}">${body}</symbol>`;
    assert(sprite.includes(expectedSymbol), `sprite geometry mismatch ${icon.id}`);
  }
}

function validateHome(home) {
  assert(!home.includes('v2_review') && !home.includes('v2-'), 'review-only v2 marker leaked into Home');
  assert(!home.includes('homepage-style-finish-r6') && !home.includes('data-maplemoon-homepage-style-finish-r6'), 'held R6 marker present');
  assert(!home.includes('hero CTA hard-centre') && !home.includes('Nate 19:38'), 'unauthorised hero drift present');
  const normalisedHero = home
    .split('<main id="main-content">')[0]
    .replace('href="/styles/homepage.css"', 'href="/_wip/styles/homepage.css"');
  assert(sha(normalisedHero) === expectedHeroProjection, 'hero/header projection differs from 558c baseline after the builder-only stylesheet path normalisation');
  assert((home.match(/bites/gi) || []).length === 23, 'Home bites invariant is not 23');
  assert(!/<[^>]+class="[^"]*\bq-segments\b[^"]*"/i.test(home), 'q-segments DOM element returned');
  for (const classValue of [...home.matchAll(/class="([^"]*)"/g)].map((match) => match[1])) {
    assert(!classValue.split(/\s+/).includes('mm-pending'), 'bare mm-pending class returned');
  }
  const categoryIds = ['bar', 'banana', 'moon', 'bites', 'elixir'];
  for (const id of categoryIds) assert(count(home, `mm-icon-category-${id}-20`) === 1, `Home category ${id} binding count`);
  const comparisonIds = [
    'cacao-bitter', 'cacao-stimulation', 'cacao-activation',
    'carob-sweet', 'carob-caffeine-free', 'carob-evening',
  ];
  for (const id of comparisonIds) assert(count(home, `mm-icon-comparison-${id}-24`) === 1, `Home comparison ${id} binding count`);
  assert(count(home, 'mm-icon-comparison-check-16') === 3, 'Home comparison check count is not three');
  assert(count(home, '/assets/icons/mm-icons-v2.svg#') === 14, 'Home v2 use count is not 14');
  const copy = [
    'Naturally bitter', 'Sweet from the pod itself, no added sugar',
    'Contains caffeine and theobromine', 'Naturally caffeine free, any hour you like',
    'Stimulating and activating', 'Stimulant free, making it perfect for arvos and slow evenings',
  ];
  for (const value of copy) assert(count(home, value) === 1, `comparison copy changed: ${value}`);
  assert(count(home, "temporary:true") === 1, 'Home temporary bundle data count');
  assert(count(home, "item.temporary") === 3, 'Home temporary branch count');
  assert(count(home, `assetLabel.textContent='${expectedLabel}'`) === 1, 'Home visible temporary label creation missing/duplicated');
  assert(count(home, '/assets/product_shots/temporary_eclipse_bite_bundle_web.webp') === 1, 'Home temporary image path count');
  assert(home.includes("img.loading=i<5?'eager':'lazy'"), 'Home bundle loading policy changed');
  assert(home.includes("el.dataset.assetStatus='temporary_replace_before_final'"), 'Home temporary status marker missing');
  const ritual = [
    '/assets/our_story/ritual_quiet_finish_20260825.webp',
    '/assets/our_story/ritual_softer_pause_20260825.webp',
    '/assets/our_story/ritual_last_cup_20260825.webp',
    'A quiet finish', 'A sweet ending without the stimulants',
    'A softer pause', 'A 3:33pm pick me up without the nasties',
    'The last cup', 'A warm drink without the activation',
    'object-position:50% 24%!important', 'object-position:50% 20%!important', 'object-position:50% 38%!important',
    'flex-direction:column', 'aspect-ratio:4 / 5!important', 'position:relative!important',
  ];
  for (const value of ritual) assert(home.includes(value), `ritual invariant missing ${value}`);
  assert(home.indexOf('<div class="tx"><span class="mo">01') > home.indexOf('ritual_quiet_finish_20260825.webp'), 'ritual caption order changed');
}

function validateShop(shop) {
  assert(!shop.includes('v2_review') && !shop.includes('v2-'), 'review-only v2 marker leaked into Shop');
  assert(count(shop, "temporary:true") === 1, 'Shop temporary bundle data count');
  assert(count(shop, "flavour:'all_only'") === 1, 'Shop all-only flavour contract missing');
  assert(count(shop, expectedLabel) === 1, 'Shop visible temporary label missing/duplicated');
  assert(count(shop, '/assets/product_shots/temporary_eclipse_bite_bundle_web.webp') === 1, 'Shop temporary image path count');
  assert(shop.includes("if(p.flavour)return p.flavour"), 'Shop explicit flavour resolution missing');
  assert(shop.includes("cat==='bites'&&index<3"), 'Shop first-three loading policy missing');
  assert(shop.includes("p.alt||cleanName"), 'Shop bundle alt fallback missing');
  assert(shop.includes("el.dataset.assetStatus='temporary_replace_before_final'"), 'Shop temporary status marker missing');
  assert(shop.includes('.pcard.is_bundle .ph img{width:96%;height:auto;max-width:96%;max-height:72%;object-fit:contain;}'), 'Shop grid site-fit missing');
  assert(shop.includes('.shop-list-view .pcard.is_bundle .ph img{width:96%;height:auto;max-width:96%;max-height:80%;}'), 'Shop list site-fit missing');
}

async function validateCandidate(candidateRoot) {
  const home = await readFile(join(candidateRoot, 'homepage.html'), 'utf8');
  const shop = await readFile(join(candidateRoot, 'shop.html'), 'utf8');
  const sprite = await readFile(join(candidateRoot, 'assets/icons/mm-icons-v2.svg'), 'utf8');
  const bundle = await readFile(join(candidateRoot, 'assets/product_shots/temporary_eclipse_bite_bundle_web.webp'));
  validateHome(home);
  validateShop(shop);
  await validateSprite(sprite);
  assert(sha(bundle) === expected.bundle[1], 'candidate bundle bytes differ');
  console.log(`CANDIDATE PASS root=${candidateRoot}`);
}

async function runPositiveControls(home, shop, sprite) {
  const controls = [
    ['category rollback', () => validateHome(home.replace('mm-icon-category-bar-20', 'mm-icon-bar'))],
    ['missing comparison check', () => validateHome(home.replace('mm-icon-comparison-check-16', 'mm-icon-missing-check-16'))],
    ['q-segments return', () => validateHome(home.replace('<main id="main-content">', '<main id="main-content"><div class="q-segments"></div>'))],
    ['ritual crop drift', () => validateHome(home.replace('object-position:50% 24%!important', 'object-position:50% 25%!important'))],
    ['R6 leak', () => validateHome(home + '<link href="homepage-style-finish-r6.css">')],
    ['hero drift', () => validateHome(home.replace('<main id="main-content">', '<style>.wf-pactions{justify-content:center}</style><main id="main-content">'))],
    ['Shop flavour drift', () => validateShop(shop.replace("flavour:'all_only'", "flavour:'pure'"))],
    ['Shop marker removal', () => validateShop(shop.replace(expectedLabel, ''))],
    ['sprite symbol removal', () => validateSprite(sprite.replace(/<symbol id="mm-icon-utility-cart-24"[\s\S]*?<\/symbol>\n?/, ''))],
    ['sprite hard colour', () => validateSprite(sprite.replace('stroke="currentColor"', 'stroke="#fff"'))],
  ];
  for (const [name, operation] of controls) {
    let rejected = false;
    try { await operation(); } catch { rejected = true; }
    assert(rejected, `positive control was not rejected: ${name}`);
  }
  console.log(`POSITIVE CONTROLS PASS rejected=${controls.length}/${controls.length}`);
}

async function main() {
  const args = process.argv.slice(2);
  const candidateIndex = args.indexOf('--candidate');
  const candidateRoot = candidateIndex >= 0 ? resolve(args[candidateIndex + 1]) : null;
  await verifyPins();
  const home = (await bytes(expected.home[0])).toString('utf8');
  const shop = (await bytes(expected.shop[0])).toString('utf8');
  const sprite = (await bytes(expected.sprite[0])).toString('utf8');
  validateHome(home);
  validateShop(shop);
  await validateSprite(sprite);
  console.log('SOURCE PASS pins=15 home=PASS shop=PASS sprite=44 bundle=byte-identical hero=558c-projection ritual=preserved');
  if (args.includes('--self-test')) await runPositiveControls(home, shop, sprite);
  if (candidateRoot) await validateCandidate(candidateRoot);
}

main().catch((error) => {
  failures.push(error.message);
  console.error(`INTEGRATION CHECK FAIL failures=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
});
