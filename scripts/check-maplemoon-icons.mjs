import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (relative) => readFile(join(root, relative), "utf8");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const contactSheetOnly = process.argv.includes("--contact-sheet-only");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

const contract = JSON.parse(await read("docs/design-system/contracts/icons.v1.json"));
const manifest = JSON.parse(await read(contract.sources.manifest));
const sprite = await read(contract.sources.sprite);
const css = await read(contract.sources.styles);
const contactSheet = await read(contract.sources.contact_sheet);
const individualNames = (await readdir(join(root, contract.sources.individual_directory))).filter((name) => name.endsWith(".svg")).sort();

check(contract.schema === "maplemoon-design-system/icons/v1", "contract schema mismatch");
check(manifest.schema === "maplemoon-icon-system/v1", "manifest schema mismatch");
check(manifest.count === contract.construction.icon_count, "manifest/contract icon count mismatch");
check(manifest.icons.length === manifest.count, "manifest count does not match records");
check(new Set(manifest.icons.map((item) => item.id)).size === manifest.count, "duplicate manifest icon id");
check(individualNames.length === manifest.count, `expected ${manifest.count} individual SVGs, found ${individualNames.length}`);

const symbolIds = [...sprite.matchAll(/<symbol\s+id="([^"]+)"/g)].map((match) => match[1]);
check(symbolIds.length === manifest.count, `expected ${manifest.count} sprite symbols, found ${symbolIds.length}`);
check(new Set(symbolIds).size === manifest.count, "duplicate sprite symbol id");
check(symbolIds.toSorted().join("\n") === manifest.icons.map((item) => item.id).toSorted().join("\n"), "sprite symbols do not match manifest ids");
check(!/<(?:image|text)\b/i.test(sprite), "sprite contains embedded raster or text");
check(/stroke="currentColor"/.test(sprite), "sprite does not inherit currentColor");

const contactSymbolIds = [...contactSheet.matchAll(/<symbol\s+id="([^"]+)"/g)].map((match) => match[1]);
const contactUseIds = [...contactSheet.matchAll(/<use\s+href="#([^"]+)"/g)].map((match) => match[1]);
check(contactSymbolIds.length === manifest.count, `contact sheet expected ${manifest.count} inline symbols, found ${contactSymbolIds.length}`);
check(contactUseIds.length === manifest.count, `contact sheet expected ${manifest.count} local uses, found ${contactUseIds.length}`);
check(contactUseIds.every((id) => symbolIds.includes(id)), "contact sheet contains an unresolved local symbol use");
check(!/<(?:link|script)\b[^>]*(?:href|src)=/i.test(contactSheet), "contact sheet is not self-contained");
check(!/mm-icons\.svg#/i.test(contactSheet), "contact sheet depends on the external sprite");

for (const item of manifest.icons) {
  const expectedName = item.individual.split("/").at(-1);
  check(individualNames.includes(expectedName), `missing individual SVG ${expectedName}`);
  const svg = await read(`assets/icons/${item.individual}`);
  check(/^<svg\b/.test(svg), `${expectedName} is not an SVG document`);
  check(/viewBox="0 0 24 24"/.test(svg), `${expectedName} has the wrong viewBox`);
  check(/stroke="currentColor"/.test(svg), `${expectedName} does not use currentColor`);
  check(!/<(?:image|text)\b/i.test(svg), `${expectedName} contains raster or live text`);
  check(/<title\b/.test(svg), `${expectedName} has no title`);
}

if (contactSheetOnly) {
  if (failures.length) {
    console.error(`FAIL maplemoon-contact-sheet failures=${failures.length}`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(`PASS maplemoon-contact-sheet icons=${manifest.count} inline_symbols=${contactSymbolIds.length} local_uses=${contactUseIds.length}`);
  console.log("PASS self-contained HTML with no external stylesheet, script or sprite dependency");
  process.exit(0);
}

const allowedGlyphs = /[×＋−→←↗◎⌕⌖☰⚠✦★☾●◇◆□ϟ◷✓›]/u;
const resolvedIds = new Set(manifest.icons.map((item) => item.id));
let totalUses = 0;

for (const consumer of contract.consumers) {
  const html = await read(consumer.path);
  check(sha256(html) === consumer.icon_session_sha256, `${consumer.route}: icon-session hash drifted`);
  check((html.match(/assets\/icons\/mm-icons\.css/g) || []).length === 1, `${consumer.route}: icon stylesheet must be linked once`);
  const svgTags = [...html.matchAll(/<svg\b[^>]*>/g)].map((match) => match[0]);
  check(svgTags.every((tag) => /class="[^"]*\bmm-icon\b/.test(tag)), `${consumer.route}: one-off inline SVG remains`);
  const uses = [...html.matchAll(/href="\/assets\/icons\/mm-icons\.svg#([^"]+)"/g)].map((match) => match[1]);
  totalUses += uses.length;
  for (const id of uses) check(resolvedIds.has(id), `${consumer.route}: unresolved sprite id ${id}`);
  const visibleSource = html.replace(/<!--[^]*?-->/g, "").replace(/<style\b[^>]*>[^]*?<\/style>/gi, "");
  check(!allowedGlyphs.test(visibleSource), `${consumer.route}: raw icon-like Unicode glyph remains in visible markup or script`);
  check(!/_full\.svg/.test(html), `${consumer.route}: unused _full badge variant referenced`);
}

const carob = await read("_wip/carob-story.WIP.html");
check(!/\.bean-mark::after/.test(carob), "legacy CSS bean drawing remains");
check(!/\.process-icon\.(?:pod|roast|blend|bar)/.test(carob), "legacy CSS process drawing remains");
check(totalUses >= 50, `unexpectedly low sprite usage count: ${totalUses}`);
check(css.includes(".mm-icon"), "shared icon class missing");
check(css.includes(".process-icon"), "editorial process adapter missing");

if (failures.length) {
  console.error(`FAIL maplemoon-icons failures=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PASS maplemoon-icons icons=${manifest.count} individual=${individualNames.length} consumers=${contract.consumers.length} uses=${totalUses}`);
console.log("PASS sprite ids, individual SVG structure, currentColor, no embedded raster/text");
console.log("PASS no one-off inline SVG, raw icon glyphs, _full variants or CSS-drawn process marks on admitted routes");
