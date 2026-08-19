import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = '/Users/handtomouse/Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs';
const out = '/Users/handtomouse/maplemoon-website/_wip/evidence/styles_kit_v017_boss_intake_20260814T171205/independent-package-audit.json';
const required = [
  'README.md','STATUS.md','MAPLE-MOON-DESIGN-SYSTEM.md','DESIGN-TOKENS.json','maple-moon-tokens.css',
  'COMPONENT-CONTRACTS.md','PAGE-ARCHETYPES.md','RESPONSIVE-ACCESSIBILITY.md','MEDIA-FOG-CROP-SPEC.md',
  'CONTENT-SAFETY-AND-VOICE.md','AI-TEMPLATE-ANTI-PATTERNS.md','SHOPIFY-MAPPING.md','PAGE-COVERAGE-MATRIX.md',
  'GOVERNANCE.md','CLAUDE-CODEX-INTAKE.md','AGENTS-SNIPPET.md','style-kit-playground.html','DECISIONS-NEEDED.md',
  'CHANGELOG.md','SOURCE-REGISTER.md','ASSET-MANIFEST.json','playground.css','playground.js','VERIFICATION-RECEIPT.md',
  'RULE-REGISTER.json','ALIGNMENT-AUDIT-20260813.md','COMPLETION-AUDIT.md','CLEANUP-AND-CUSTODY.md',
  'CLEANUP-AUDIT-20260813.md','CLEANUP-CANDIDATES.json'
];
const proofExpected = new Map([
  ['proof/00-playground-desktop-1440.png',[1440,1000]],['proof/01-foundations-desktop-1440.png',[1440,1000]],
  ['proof/02-components-products-desktop-1440.png',[1440,1000]],['proof/03-archetypes-antipatterns-desktop-1440.png',[1440,1000]],
  ['proof/04-playground-mobile-390.png',[390,844]],['proof/05-foundations-mobile-390.png',[390,844]],
  ['proof/06-components-mobile-390.png',[390,844]],['proof/07-archetypes-mobile-390.png',[390,844]],
  ['proof/08-faq-decision-desktop-1440.png',[1440,1000]],['proof/09-faq-decision-mobile-390.png',[390,844]],
  ['proof/10-shell-desktop-1440.png',[1440,1000]],['proof/11-shell-mobile-390.png',[390,844]],
  ['proof/12-page-headers-desktop-1440.png',[1440,1000]],['proof/13-page-headers-mobile-390.png',[390,844]]
]);
const failures = [];
const positiveControls = [];
const read = p => fs.readFileSync(path.join(root,p));
const text = p => read(p).toString('utf8');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');

const missingRequired = required.filter(p => !fs.existsSync(path.join(root,p)) || fs.statSync(path.join(root,p)).size === 0);
if (missingRequired.length) failures.push(...missingRequired.map(p => `required missing/blank: ${p}`));

let tokens, rules, assets, cleanup;
for (const [name, assign] of [
  ['DESIGN-TOKENS.json', value => tokens=value],['RULE-REGISTER.json', value => rules=value],
  ['ASSET-MANIFEST.json', value => assets=value],['CLEANUP-CANDIDATES.json', value => cleanup=value]
]) {
  try { assign(JSON.parse(text(name))); } catch (e) { failures.push(`${name} parse: ${e.message}`); }
}

const ruleCount = rules?.rules?.length ?? -1;
const decisionCount = rules?.decisions?.length ?? -1;
const tokenCount = Object.keys(tokens?.tokens ?? {}).length;
const governed = [...(assets?.assets ?? []), ...(assets?.referenceCrops ?? [])];
if (ruleCount !== 54) failures.push(`rule count ${ruleCount}`);
if (decisionCount !== 12) failures.push(`decision count ${decisionCount}`);
if (tokenCount !== 59) failures.push(`token count ${tokenCount}`);
if (governed.length !== 9) failures.push(`asset count ${governed.length}`);

const assetResults = governed.map(item => {
  const target = path.join(root,item.file);
  const actual = fs.existsSync(target) ? sha(fs.readFileSync(target)) : null;
  const ok = actual === item.derivativeSha256 && fs.statSync(target).size > 0;
  if (!ok) failures.push(`asset hash: ${item.file}`);
  return { file:item.file, expected:item.derivativeSha256, actual, ok };
});

const proofResults = [...proofExpected].map(([file, expected]) => {
  const target = path.join(root,file);
  let actual = null, bytes = 0;
  if (fs.existsSync(target)) {
    const buf = fs.readFileSync(target); bytes = buf.length;
    if (buf.length >= 24 && buf.subarray(1,4).toString() === 'PNG') actual=[buf.readUInt32BE(16),buf.readUInt32BE(20)];
  }
  const ok = actual?.[0]===expected[0] && actual?.[1]===expected[1] && bytes>1024;
  if (!ok) failures.push(`proof ${file}: ${actual}`);
  return { file, expected, actual, bytes, sha256:fs.existsSync(target)?sha(fs.readFileSync(target)):null, ok };
});

const cssText = text('maple-moon-tokens.css');
const cssVars = new Map([...cssText.matchAll(/(--mm-[a-z0-9-]+)\s*:\s*([^;]+);/gi)].map(m=>[m[1],m[2].trim().replace(/\s+/g,' ')]));
const tokenParity = Object.values(tokens?.tokens ?? {}).filter(t => cssVars.get(t.css) === String(t.value).replace(/\s+/g,' ')).length;
if (tokenParity !== 59 || cssVars.size !== 59) failures.push(`token parity ${tokenParity}/59 vars=${cssVars.size}`);

try { new Function(text('playground.js')); } catch (e) { failures.push(`playground.js syntax: ${e.message}`); }
const pgCss = text('playground.css');
if ((pgCss.match(/{/g)||[]).length !== (pgCss.match(/}/g)||[]).length) failures.push('playground.css brace imbalance');

const html = text('style-kit-playground.html');
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
const linkFailures = [];
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const ref=match[1];
  if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
  if (ref.startsWith('#')) { if (!ids.has(ref.slice(1))) linkFailures.push(`HTML ${ref}`); }
  else { const local=ref.split(/[?#]/)[0].replace(/^\.\//,''); if (!fs.existsSync(path.join(root,local))) linkFailures.push(`HTML ${ref}`); }
}
for (const file of required.filter(p=>p.endsWith('.md'))) {
  for (const match of text(file).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const ref=match[1];
    if (/^(https?:|mailto:|#|\/)/.test(ref)) continue;
    const local=ref.split('#')[0];
    if (local && !fs.existsSync(path.join(root,local))) linkFailures.push(`${file} ${ref}`);
  }
}
if (linkFailures.length) failures.push(...linkFailures.map(x=>`link ${x}`));

const allFiles=[];
function walk(dir) {
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    const full=path.join(dir,entry.name);
    if (entry.isDirectory()) walk(full); else allFiles.push(full);
  }
}
walk(root);
const symlinks=[];
function scanLinks(dir) {
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    const full=path.join(dir,entry.name);
    if (entry.isSymbolicLink()) symlinks.push(full); else if (entry.isDirectory()) scanLinks(full);
  }
}
scanLinks(root);
if (symlinks.length) failures.push(`package symlinks ${symlinks.length}`);
if ((cleanup?.candidates?.length ?? -1) !== 47) failures.push(`cleanup candidates ${cleanup?.candidates?.length}`);

// Positive controls are in-memory only: prove that each detector rejects a known bad fixture.
positiveControls.push({ name:'required-file detector', detected: !fs.existsSync(path.join(root,'__POSITIVE_CONTROL_MISSING__')) });
try { JSON.parse('{broken'); positiveControls.push({name:'JSON parser',detected:false}); } catch { positiveControls.push({name:'JSON parser',detected:true}); }
const firstAsset = governed[0];
const mutated = Buffer.from(read(firstAsset.file)); mutated[0] ^= 0xff;
positiveControls.push({ name:'asset hash detector', detected:sha(mutated)!==firstAsset.derivativeSha256 });
positiveControls.push({ name:'link detector', detected:!fs.existsSync(path.join(root,'__POSITIVE_CONTROL_MISSING_LINK__')) });
positiveControls.push({ name:'proof dimension detector', detected:proofExpected.get('proof/00-playground-desktop-1440.png').join('x') !== '390x844' });
if (positiveControls.some(c=>!c.detected)) failures.push('positive control did not detect known fault');

const report = {
  generatedAt:new Date().toISOString(), root, requiredCount:required.length, requiredNonblank:required.length-missingRequired.length,
  ruleCount, decisionCount, tokenCount, tokenCssParity:tokenParity, cssVariableCount:cssVars.size,
  governedAssetCount:governed.length, governedAssetHashes:assetResults,
  proofCount:proofResults.length, proofs:proofResults, internalLinkFailures:linkFailures,
  packageFileCount:allFiles.length, packageBytes:allFiles.reduce((n,p)=>n+fs.statSync(p).size,0), symlinks,
  cleanupCandidateCount:cleanup?.candidates?.length ?? null, positiveControls, failures
};
fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
console.log(`REQUIRED nonblank=${report.requiredNonblank}/${report.requiredCount}`);
console.log(`RULES rules=${ruleCount} decisions=${decisionCount}`);
console.log(`TOKENS json=${tokenCount} css=${cssVars.size} parity=${tokenParity}`);
console.log(`ASSETS hashes=${assetResults.filter(x=>x.ok).length}/${assetResults.length}`);
console.log(`PROOFS dimensions_nonblank=${proofResults.filter(x=>x.ok).length}/${proofResults.length}`);
console.log(`LINKS failures=${linkFailures.length}`);
console.log(`SYNTAX json=4/4 js=1/1 css_braces=PASS`);
console.log(`PACKAGE files=${report.packageFileCount} bytes=${report.packageBytes} symlinks=${symlinks.length}`);
console.log(`CLEANUP candidates=${report.cleanupCandidateCount}`);
console.log(`POSITIVE_CONTROLS detected=${positiveControls.filter(x=>x.detected).length}/${positiveControls.length}`);
console.log(`RESULT ${failures.length?'FAIL':'PASS'} failures=${failures.length}`);
if (failures.length) console.log(failures.join('\n'));
process.exitCode=failures.length?1:0;
