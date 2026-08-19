import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = "/Users/handtomouse/Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs";
const required = [
  "README.md", "STATUS.md", "MAPLE-MOON-DESIGN-SYSTEM.md", "DESIGN-TOKENS.json",
  "maple-moon-tokens.css", "COMPONENT-CONTRACTS.md", "PAGE-ARCHETYPES.md",
  "RESPONSIVE-ACCESSIBILITY.md", "MEDIA-FOG-CROP-SPEC.md", "CONTENT-SAFETY-AND-VOICE.md",
  "AI-TEMPLATE-ANTI-PATTERNS.md", "SHOPIFY-MAPPING.md", "PAGE-COVERAGE-MATRIX.md",
  "SECTIONS-MEDIA-OVERLAYS.md", "GOVERNANCE.md", "CLAUDE-CODEX-INTAKE.md",
  "AGENTS-SNIPPET.md", "style-kit-playground.html", "DECISIONS-NEEDED.md", "CHANGELOG.md",
  "SOURCE-REGISTER.md", "ASSET-MANIFEST.json", "playground.css", "playground.js",
  "VERIFICATION-RECEIPT.md", "RULE-REGISTER.json", "ALIGNMENT-AUDIT-20260813.md",
  "COMPLETION-AUDIT.md", "CLEANUP-AND-CUSTODY.md", "CLEANUP-AUDIT-20260813.md",
  "CLEANUP-CANDIDATES.json"
];
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const sha = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const checks = [];
const assert = (name, condition, detail) => {
  checks.push({ name, pass: Boolean(condition), detail });
  console.log(`${condition ? "PASS" : "FAIL"} ${name}: ${detail}`);
};

assert("required_nonblank", required.every((name) => fs.existsSync(path.join(root, name)) && fs.statSync(path.join(root, name)).size > 0), "31/31");

const parse = (name, text = read(name)) => {
  try { return { ok: true, value: JSON.parse(text) }; }
  catch (error) { return { ok: false, error: error.message }; }
};
const tokenParsed = parse("DESIGN-TOKENS.json");
const ruleParsed = parse("RULE-REGISTER.json");
const assetParsed = parse("ASSET-MANIFEST.json");
const cleanupParsed = parse("CLEANUP-CANDIDATES.json");
assert("json_parse", tokenParsed.ok && ruleParsed.ok && assetParsed.ok && cleanupParsed.ok, "DESIGN-TOKENS, RULE-REGISTER, ASSET-MANIFEST, CLEANUP-CANDIDATES");

const tokens = tokenParsed.value;
const rules = ruleParsed.value;
const assets = assetParsed.value;
const cleanup = cleanupParsed.value;
const versions = [tokens.version, rules.kitVersion, cleanup.kitVersion];
assert("version_parity", new Set(versions).size === 1 && versions[0] === "0.3.0-provisional", versions.join(" | "));

const allowed = new Set(rules.allowedStatuses);
const allEntries = [...rules.rules, ...rules.decisions];
const idsUnique = new Set(allEntries.map((entry) => entry.id)).size === allEntries.length;
const entriesValid = allEntries.every((entry) => entry.id && entry.summary && allowed.has(entry.status) && entry.sourceIds?.length && entry.sourceIds.every((id) => rules.sources[id]));
assert("rule_decision_schema", rules.rules.length === 68 && rules.decisions.length === 12 && idsUnique && entriesValid, `${rules.rules.length} rules + ${rules.decisions.length} decisions`);

const ownerFor = (id) => id.startsWith("FOG-") ? "MEDIA-FOG-CROP-SPEC.md"
  : id.startsWith("RESP-") ? "RESPONSIVE-ACCESSIBILITY.md"
  : id.startsWith("LAYER-") ? "SECTIONS-MEDIA-OVERLAYS.md"
  : id.startsWith("OPS-") ? "CLEANUP-AND-CUSTODY.md"
  : "MAPLE-MOON-DESIGN-SYSTEM.md";
const mirroredRules = rules.rules.filter((rule) => {
  const line = read(ownerFor(rule.id)).split("\n").find((candidate) => candidate.startsWith(`| \`${rule.id}\` |`));
  return line && line.includes(`| ${rule.status} |`) && rule.sourceIds.every((sourceId) => line.includes(`\`${sourceId}\``));
});
const decisionsText = read("DECISIONS-NEEDED.md");
const mirroredDecisions = rules.decisions.filter((decision) => decisionsText.includes(`## \`${decision.id}\``));
assert("human_machine_mirror", mirroredRules.length === 68 && mirroredDecisions.length === 12, `${mirroredRules.length}/68 rules, ${mirroredDecisions.length}/12 decisions`);

const tokenCssText = read("maple-moon-tokens.css");
const cssVars = new Map([...tokenCssText.matchAll(/(--mm-[a-z0-9-]+)\s*:\s*([^;]+);/gi)].map((match) => [match[1], match[2].trim()]));
const tokenEntries = Object.entries(tokens.tokens);
const tokensMatch = tokenEntries.every(([, token]) => cssVars.get(token.css)?.replace(/\s+/g, " ") === String(token.value).replace(/\s+/g, " "))
  && [...cssVars.keys()].every((name) => tokenEntries.some(([, token]) => token.css === name));
assert("json_css_tokens", tokenEntries.length === 66 && cssVars.size === 66 && tokensMatch, `${tokenEntries.length}/66 JSON; ${cssVars.size}/66 CSS`);

const luminance = (hex) => {
  const channels = String(hex).match(/[a-f\d]{2}/gi)?.map((part) => parseInt(part, 16) / 255);
  if (!channels || channels.length !== 3) return null;
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};
const contrast = (a, b) => {
  const first = luminance(a); const second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};
const gold = tokens.tokens["color.accent.goldText"].value;
const contrastPairs = ["color.surface.blue", "color.surface.ivory", "color.surface.paper"].map((name) => [name, contrast(gold, tokens.tokens[name].value)]);
assert("small_gold_contrast", contrastPairs.every(([, ratio]) => ratio >= 4.5), contrastPairs.map(([name, ratio]) => `${name}=${ratio.toFixed(2)}:1`).join(" "));

const governedAssets = [...assets.assets, ...assets.referenceCrops];
const assetMatches = governedAssets.filter((asset) => fs.existsSync(path.join(root, asset.file)) && sha(path.join(root, asset.file)) === asset.derivativeSha256);
assert("governed_asset_hashes", governedAssets.length === 9 && assetMatches.length === 9, `${assetMatches.length}/9`);

const proofFiles = fs.readdirSync(path.join(root, "proof")).filter((name) => name.endsWith(".png")).sort();
const proofValid = proofFiles.filter((name) => {
  const bytes = fs.readFileSync(path.join(root, "proof", name));
  return bytes.length > 24 && bytes.subarray(1, 4).toString("ascii") === "PNG" && bytes.readUInt32BE(16) > 0 && bytes.readUInt32BE(20) > 0;
});
assert("proof_pngs", proofFiles.length === 31 && proofValid.length === 31, `${proofValid.length}/31 signature and nonzero dimensions`);

const html = read("style-kit-playground.html");
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
const missingRefs = [];
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const ref = match[1];
  if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
  if (ref.startsWith("#")) { if (!ids.has(ref.slice(1))) missingRefs.push(`HTML:${ref}`); }
  else if (!fs.existsSync(path.join(root, ref.split(/[?#]/)[0].replace(/^\.\//, "")))) missingRefs.push(`HTML:${ref}`);
}
for (const file of required.filter((name) => name.endsWith(".md"))) {
  for (const match of read(file).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const ref = match[1];
    if (/^(https?:|mailto:|#|\/)/.test(ref)) continue;
    const local = ref.split("#")[0];
    if (local && !fs.existsSync(path.join(root, local))) missingRefs.push(`${file}:${ref}`);
  }
}
assert("internal_links_assets", missingRefs.length === 0, missingRefs.length ? missingRefs.join(", ") : "all resolve");

let jsOk = true;
try { new Function(read("playground.js")); } catch { jsOk = false; }
const playgroundCssText = read("playground.css");
const cssBalanced = (playgroundCssText.match(/{/g) ?? []).length === (playgroundCssText.match(/}/g) ?? []).length;
assert("javascript_css_parse", jsOk && cssBalanced, `JavaScript=${jsOk ? "parse" : "FAIL"}; CSS braces=${cssBalanced ? "balanced" : "FAIL"}`);
const antiCount = (html.match(/<article class="anti">/g) ?? []).length;
const scrimContained = playgroundCssText.includes(".effect.contrast-scrim > div::after") && !playgroundCssText.includes(".effect.contrast-scrim::after");
assert("anti_patterns_containment", antiCount === 12 && scrimContained, `anti=${antiCount}; scrimContained=${scrimContained}`);

const malformedRule = structuredClone(rules); malformedRule.rules[0].status = "MADE UP";
const detectsRule = !malformedRule.allowedStatuses.includes(malformedRule.rules[0].status);
const malformedToken = structuredClone(tokens); delete malformedToken.tokens["space.1"].css;
const detectsToken = Object.values(malformedToken.tokens).some((token) => !token.css || token.value === undefined);
const malformedAsset = structuredClone(assets); malformedAsset.assets[0].derivativeSha256 = "0".repeat(64);
const detectsAsset = malformedAsset.assets.some((asset) => sha(path.join(root, asset.file)) !== asset.derivativeSha256);
const missingRequired = ![...required, "DELIBERATELY-MISSING.md"].every((name) => fs.existsSync(path.join(root, name)));
const brokenHtml = `${html}<img src="assets/deliberately-missing.webp">`;
const detectsBrokenAsset = [...brokenHtml.matchAll(/(?:href|src)="([^"]+)"/g)].some((match) => {
  const ref = match[1]; return !/^(https?:|mailto:|tel:|data:|#)/.test(ref) && !fs.existsSync(path.join(root, ref));
});
const brokenMarkdown = "[missing](DELIBERATELY-MISSING.md)";
const brokenRef = brokenMarkdown.match(/\[[^\]]+\]\(([^)]+)\)/)[1];
const detectsBrokenLink = !fs.existsSync(path.join(root, brokenRef));
const escapedCss = `${playgroundCssText}\n.effect.contrast-scrim::after { content: \"\"; }`;
const detectsEscapedScrim = escapedCss.includes(".effect.contrast-scrim::after");
const controls = { missingRequired, malformedRule: detectsRule, malformedToken: detectsToken, malformedAsset: detectsAsset, brokenLink: detectsBrokenLink, brokenAsset: detectsBrokenAsset, escapedScrim: detectsEscapedScrim };
assert("positive_controls", Object.values(controls).every(Boolean), Object.entries(controls).map(([name, detected]) => `${name}=${detected ? "DETECTED" : "MISSED"}`).join(" "));

const result = { schema: "maplemoon-styles-kit-independent-audit/v1", root, result: checks.every((check) => check.pass) ? "PASS" : "FAIL", checks, positiveControls: controls };
console.log(`RESULT ${result.result}`);
console.log(JSON.stringify(result, null, 2));
if (result.result !== "PASS") process.exit(1);
