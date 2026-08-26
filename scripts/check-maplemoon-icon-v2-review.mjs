import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const reviewRoot = join(root, "_wip/evidence/icon_session_20260825/v2_review");
const manifestPath = join(reviewRoot, "manifest.json");
const reviewPath = join(reviewRoot, "review-sheet.html");
const routePaths = [
  "_wip/carob-story.WIP.html",
  "_wip/contact.WIP.html",
  "_wip/faq.WIP.html",
  "_wip/homepage_real_1_lead_photo.WIP.html",
  "_wip/our-story.WIP.html",
  "_wip/shop.WIP.html",
  "_wip/stockists.WIP.html",
];

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const countMatches = (value, pattern) => [...value.matchAll(pattern)].length;

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const review = await readFile(reviewPath, "utf8");

assert(manifest.schema === "maplemoon-icon-review/v2", "manifest schema is not v2");
assert(manifest.status === "review_only_not_approved_routes_unchanged", "review status is not HOLD / routes unchanged");
assert(manifest.iconCount === 44, `expected 44 review assets, found ${manifest.iconCount}`);
assert(Array.isArray(manifest.icons), "manifest icons is not an array");

const ids = manifest.icons.map((icon) => icon.id);
const files = manifest.icons.map((icon) => icon.file);
assert(new Set(ids).size === ids.length, "duplicate icon IDs in manifest");
assert(new Set(files).size === files.length, "duplicate icon file paths in manifest");

const actualFiles = (await readdir(join(reviewRoot, "individual")))
  .filter((name) => name.endsWith(".svg"))
  .sort();
const expectedFiles = files.map((file) => file.replace("individual/", "")).sort();
assert(JSON.stringify(actualFiles) === JSON.stringify(expectedFiles), "individual directory does not exactly match manifest");

for (const icon of manifest.icons) {
  const absolute = join(reviewRoot, icon.file);
  const bytes = await readFile(absolute);
  const svg = bytes.toString("utf8");
  const info = await stat(absolute);
  assert(info.size > 180, `${icon.id}: SVG is blank or suspiciously small (${info.size} bytes)`);
  assert(svg.includes(`viewBox="0 0 ${icon.size} ${icon.size}"`), `${icon.id}: viewBox does not match ${icon.size} px master`);
  assert(svg.includes("stroke=\"currentColor\""), `${icon.id}: missing currentColor stroke contract`);
  assert(svg.includes("<title id=\"title\">"), `${icon.id}: missing accessible title`);
  assert(!/<(?:text|image)\b/i.test(svg), `${icon.id}: contains forbidden text/image element`);
  assert(!/<(?:script|style)\b/i.test(svg), `${icon.id}: contains forbidden script/style element`);
  assert(!/\b(?:href|src)\s*=/.test(svg), `${icon.id}: contains an external or linked dependency`);
  const drawing = svg.slice(svg.indexOf("</title>") + 8, svg.lastIndexOf("</svg>"));
  assert(!/(?:rgba?\(|hsla?\(|#[0-9a-f]{3,8}\b)/i.test(drawing), `${icon.id}: hard-coded colour found in icon drawing`);
}

for (const [key, relative] of Object.entries(manifest.sources)) {
  const bytes = await readFile(join(root, relative));
  assert(sha256(bytes) === manifest.sourceHashes[key], `${key}: source hash has changed since build`);
}

assert(review.includes("REVIEW ONLY · NOT APPROVED · ROUTES UNCHANGED"), "review-only status banner missing");
assert(review.includes('data-review="category-selector"'), "homepage category live-context review missing");
assert(review.includes('data-review="carob-comparison"'), "carob comparison live-context review missing");
assert(!/<link\b[^>]*\bhref=/i.test(review), "review sheet contains linked stylesheet/resource");
assert(!/<script\b[^>]*\bsrc=/i.test(review), "review sheet contains external script");
const nonDataImages = [...review.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)]
  .map((match) => match[1])
  .filter((src) => !src.startsWith("data:"));
assert(nonDataImages.length === 0, `review sheet contains non-embedded images: ${nonDataImages.join(", ")}`);

const symbolIds = new Set([...review.matchAll(/<symbol\s+id="(v2-[^"]+)"/g)].map((match) => match[1]));
const useIds = [...review.matchAll(/<use\s+href="#(v2-[^"]+)"/g)].map((match) => match[1]);
assert(symbolIds.size === manifest.iconCount, `expected ${manifest.iconCount} inline symbols, found ${symbolIds.size}`);
for (const id of ids) assert(symbolIds.has(`v2-${id}`), `${id}: inline symbol missing from review sheet`);
for (const id of useIds) assert(symbolIds.has(id), `${id}: review sheet use does not resolve to an inline symbol`);

const required = {
  category: ["bar", "banana", "moon", "bites", "elixir"].flatMap((name) => [16, 20].map((size) => `category-${name}-${size}`)),
  utility: ["cart", "search", "plus"].flatMap((name) => [16, 20, 24].map((size) => `utility-${name}-${size}`)),
  product: ["bar", "moon", "elixir"].flatMap((name) => [32, 48].map((size) => `product-${name}-${size}`)),
  process: ["pod", "roast", "blend"].flatMap((name) => [32, 48].map((size) => `process-${name}-${size}`)),
  comparison: [
    "comparison-cacao-bitter-20", "comparison-cacao-bitter-24",
    "comparison-cacao-stimulation-20", "comparison-cacao-stimulation-24",
    "comparison-cacao-activation-20", "comparison-cacao-activation-24",
    "comparison-carob-sweet-20", "comparison-carob-sweet-24",
    "comparison-carob-caffeine-free-20", "comparison-carob-caffeine-free-24",
    "comparison-carob-evening-20", "comparison-carob-evening-24",
    "comparison-check-16",
  ],
};
for (const [group, groupIds] of Object.entries(required)) {
  for (const id of groupIds) assert(ids.includes(id), `${group}: required icon ${id} missing`);
}

assert(countMatches(review, /<button class="category/g) === 5, "live homepage simulation does not contain exactly five categories");
assert(countMatches(review, /<div class="compare-row">/g) === 6, "live comparison simulation does not contain six rows");
assert(countMatches(review, /class="compare-check"/g) === 3, "carob comparison does not contain exactly three confirmation checks");

for (const relative of routePaths) {
  const html = await readFile(join(root, relative), "utf8");
  assert(!html.includes("v2_review") && !html.includes("v2-"), `${relative}: review-only v2 content leaked into a route`);
}

if (failures.length) {
  console.error(`CHECK FAIL maplemoon-icon-v2-review failures=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`CHECK PASS maplemoon-icon-v2-review assets=${manifest.iconCount} unique=${new Set(ids).size}`);
console.log(`CHECK PASS sources=${Object.keys(manifest.sources).length} hashes=verified`);
console.log(`CHECK PASS review=self-contained symbols=${symbolIds.size} uses=${useIds.length}`);
console.log("CHECK PASS homepage-categories=5 carob-comparison-rows=6 checks=3");
console.log(`CHECK PASS routes-unchanged=${routePaths.length}`);
