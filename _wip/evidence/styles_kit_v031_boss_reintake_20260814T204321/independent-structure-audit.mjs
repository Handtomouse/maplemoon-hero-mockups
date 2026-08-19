#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = "/Users/handtomouse/Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs";
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const json = (name) => JSON.parse(read(name));
const failures = [];
const pass = (message) => console.log(`PASS ${message}`);
const fail = (message) => { failures.push(message); console.log(`FAIL ${message}`); };
const exact = (label, actual, expected) => actual === expected ? pass(`${label}=${expected}`) : fail(`${label}=${actual}, expected ${expected}`);

const rules = json("RULE-REGISTER.json");
const tokens = json("DESIGN-TOKENS.json");
const usage = json("TOKEN-USAGE.json");
const specimens = json("SPECIMEN-TRACEABILITY.json");
const proofs = json("PROOF-MANIFEST.json");
const media = json("MEDIA-PLACEMENT-LEDGER.json");
const anti = json("ANTI-PATTERN-COVERAGE.json");
const html = read("style-kit-playground.html");
const css = read("playground.css");
const tokenCss = read("maple-moon-tokens.css");
const claims = read("CLAIM-OCCURRENCE-MAP.md");
const shopify = read("SHOPIFY-MAPPING.md");

exact("rules", rules.rules.length, 68);
exact("decisions", rules.decisions.length, 12);
exact("unique rule IDs", new Set(rules.rules.map(({ id }) => id)).size, 68);
exact("unique decision IDs", new Set(rules.decisions.map(({ id }) => id)).size, 12);

const tokenEntries = Object.entries(tokens.tokens);
const cssEntries = [...tokenCss.matchAll(/(--mm-[\w-]+)\s*:\s*([^;]+);/g)];
exact("JSON tokens", tokenEntries.length, 70);
exact("CSS tokens", cssEntries.length, 70);
const cssMap = new Map(cssEntries.map((match) => [match[1], match[2].trim()]));
const tokenParity = tokenEntries.filter(([, token]) => cssMap.get(token.css) !== String(token.value));
if (tokenParity.length === 0) pass("JSON/CSS values match 70/70"); else fail(`JSON/CSS mismatches=${tokenParity.length}`);
exact("live token classifications", usage.live.length, 55);
exact("contract-only token classifications", usage.contractOnly.length, 15);
exact("classified token union", new Set([...usage.live, ...usage.contractOnly.map(({ token }) => token)]).size, 70);

exact("traced specimens", specimens.specimens.length, 17);
const specimenIds = [...html.matchAll(/data-specimen-id="([^"]+)"/g)].map((match) => match[1]);
exact("live specimen IDs", new Set(specimenIds).size, 17);
const ruleIds = new Set(rules.rules.map(({ id }) => id));
const decisionIds = new Set(rules.decisions.map(({ id }) => id));
const sourceIds = new Set(Object.keys(rules.sources));
const badTrace = specimens.specimens.flatMap((entry) => [
  ...entry.ruleIds.filter((id) => !ruleIds.has(id)),
  ...entry.decisionIds.filter((id) => !decisionIds.has(id)),
  ...entry.sourceIds.filter((id) => !sourceIds.has(id)),
]);
exact("unresolved trace references", badTrace.length, 0);

const mediaStates = [...html.matchAll(/data-media-state="([^"]+)"/g)].map((match) => match[1]).sort();
const expectedMedia = ["error", "governed", "loading", "media-unavailable", "neutral-placeholder"].sort();
if (JSON.stringify(mediaStates) === JSON.stringify(expectedMedia)) pass("MEDIA-003 states=5/5 exact"); else fail(`MEDIA-003 states=${mediaStates.join(",")}`);

const controlFamilies = [...html.matchAll(/<section class="control-family" data-control-family="([^"]+)">([\s\S]*?)<\/section>/g)];
exact("CMP-017 control families", controlFamilies.length, 4);
for (const [, family, body] of controlFamilies) {
  const states = [...body.matchAll(/data-control-state="([^"]+)"/g)].map((match) => match[1]);
  exact(`CMP-017 ${family} states`, new Set(states).size, 6);
}

exact("proof records", proofs.proofs.length, 44);
exact("historical proof records", proofs.proofs.filter(({ current }) => !current).length, 31);
exact("current v0.3.1 proof records", proofs.proofs.filter(({ current }) => current).length, 13);
const currentNames = proofs.proofs.filter(({ current }) => current).map(({ path: proofPath }) => proofPath);
for (const required of ["31-page-headers-v031-desktop-1440.png", "32-page-headers-v031-mobile-390.png", "33-modal-open-v031-mobile-390.png", "34-drawer-open-v031-mobile-390.png", "35-popover-open-v031-mobile-390.png"]) {
  if (currentNames.some((name) => name.endsWith(required))) pass(`current proof present ${required}`); else fail(`current proof missing ${required}`);
}

exact("documented anti-patterns", anti.documentedCount, 18);
exact("visual anti-patterns", anti.visualCount, 12);
exact("held media placements", media.placements.length, 6);
const missingPlacementFields = media.placements.flatMap((placement) => media.requiredFields.filter((field) => !(field in placement)).map((field) => `${placement.placementId}:${field}`));
exact("missing placement fields", missingPlacementFields.length, 0);

for (const marker of ["CV-014", "CV-051", "CV-062", "smooth carob", "slow-roasted carob", "Maple Moon mills carob", "handmade in small batches", "UNMAPPED", "0 exact current-candidate occurrences", "NEEDS NATE"]) {
  if (claims.includes(marker)) pass(`claim map marker ${marker}`); else fail(`claim map missing ${marker}`);
}
for (const marker of ["Online Store 2.0 schema", "Locales and markets", "Metafields/dynamic sources", "SEO and structured data", "App-extension boundary", "Migration/deprecation", "Rollback"]) {
  if (shopify.includes(marker)) pass(`Shopify discovery field ${marker}`); else fail(`Shopify discovery field missing ${marker}`);
}

const fog = rules.rules.find(({ id }) => id === "FOG-002");
for (const marker of ["alpha/opacity", "core/depth", "falloff/edge"]) {
  if (fog?.summary.includes(marker)) pass(`FOG-002 separates ${marker}`); else fail(`FOG-002 missing ${marker}`);
}
const raw = [...new Set([
  ...(css.match(/#[0-9a-fA-F]{3,8}\b/g) || []),
  ...(html.match(/#[0-9a-fA-F]{3,8}\b/g) || []),
  ...(css.match(/rgba?\(\s*[0-9.]+\s*,\s*[0-9.]+\s*,\s*[0-9.]+(?:\s*,\s*[0-9.]+)?\s*\)/g) || []),
  ...(html.match(/rgba?\(\s*[0-9.]+\s*,\s*[0-9.]+\s*,\s*[0-9.]+(?:\s*,\s*[0-9.]+)?\s*\)/g) || []),
])];
const allowedRaw = new Set([...usage.rawColourPolicy.tokenEcho, ...usage.rawColourPolicy.catalogueOnly, ...usage.rawColourPolicy.rejectOnly]);
exact("raw colour literals", raw.length, 72);
exact("unclassified raw colours", raw.filter((value) => !allowedRaw.has(value)).length, 0);

for (const [label, condition] of [
  ["DEC-007 asymmetric desktop", css.includes('grid-template-areas:"feature feature support1 support2"')],
  ["DEC-007 two-column mobile", /@media \(max-width:600px\)[\s\S]*\.product-grid \{ grid-template-columns:repeat\(2/.test(css)],
  ["shared website footer", /data-specimen-id="site-footer"/.test(html) && /website-footer-mobile/.test(html)],
  ["reduced-motion shimmer removal", /\.media-state\.loading\s*\{[^}]*animation:none!important/.test(css.match(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/)?.[1] || "")],
  ["unsupported-mask fallback", /@supports \(\(-webkit-mask-image/.test(css) && /\.header-media::after/.test(css)],
  ["semantic page-header tabs", (html.match(/role="tab"/g) || []).length === 5 && (html.match(/role="tabpanel"/g) || []).length === 5],
  ["semantic disclosure relations", ["shop-disclosure-specimen", "mobile-menu-specimen", "specimen-drawer"].every((id) => html.includes(`aria-controls="${id}"`))],
  ["useful FAQ zero state", html.includes('id="faq-zero"') && html.includes("Clear search") && html.includes("No live support route is implied")],
  ["compact mobile catalogue contents", css.includes(".catalogue-menu-button") && html.includes("Contents")],
]) {
  if (condition) pass(label); else fail(label);
}

for (const [id, expected] of [["CNT-002", "NEEDS NATE"], ["FOG-002", "NEEDS NATE"], ["MEDIA-002", "CONTENT/MEDIA DEPENDENCY"], ["MEDIA-005", "TECHNICAL EVIDENCE REQUIRED"], ["FND-009", "TECHNICAL EVIDENCE REQUIRED"], ["RESP-009", "TECHNICAL EVIDENCE REQUIRED"], ["LAYER-002", "TECHNICAL EVIDENCE REQUIRED"]]) {
  const actual = rules.rules.find((entry) => entry.id === id)?.status;
  if (actual === expected) pass(`hold preserved ${id}=${expected}`); else fail(`hold drift ${id}=${actual}`);
}
if (rules.baseNeutrality.implementationBase === null && rules.baseNeutrality.demoBase === null && rules.baseNeutrality.deploymentBase === null && rules.baseNeutrality.rejectedAuthority.includes("port 4183")) {
  pass("base neutrality and rejected port 4183 preserved");
} else fail("base neutrality drift");

if (failures.length) {
  console.log(`RESULT FAIL independent_structure=${failures.length}`);
  process.exit(1);
}
console.log("RESULT PASS independent_structure=0 counts=68+12 tokens=70/70 usage=55+15 specimens=17 media=5 controls=4x6 proofs=31+13 anti=18+12 placements=6");
