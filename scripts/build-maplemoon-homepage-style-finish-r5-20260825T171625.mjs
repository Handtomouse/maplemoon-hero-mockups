#!/usr/bin/env node

/** MapleMoon homepage style-finish R5: sealed-base containment and trust correction. */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT = fileURLToPath(import.meta.url);
const REPO = path.resolve(path.dirname(SCRIPT), "..");
const PACKET_ID = "MAPLEMOON-HOMEPAGE-STYLE-FINISH-R5-20260825T171625";
const SEALED_R4_EVIDENCE = path.join(REPO, "_wip/evidence/homepage_style_finish_r4_20260825T165002");
const SNAPSHOT = path.join(SEALED_R4_EVIDENCE, "source-snapshot.WIP.html");
const BASELINE = path.join(SEALED_R4_EVIDENCE, "baseline");
const R1_ROOT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-20260825T161314");
const R2_OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r2-20260825T163529");
const R3_OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r3-20260825T164343");
const R4_ROOT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r4-20260825T165002");
const R4_CSS = path.join(R4_ROOT, "styles/homepage-style-finish-r4.css");
const R4_MANIFEST = path.join(R4_ROOT, "homepage-style-finish-r4-manifest.json");
const OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r5-20260825T171625");
const STAGING = path.join(path.dirname(OUTPUT), `.${path.basename(OUTPUT)}.building`);
const CSS_RELATIVE = "styles/homepage-style-finish-r5.css";
const MANIFEST_RELATIVE = "homepage-style-finish-r5-manifest.json";
const LINK = '<link rel="stylesheet" href="/styles/homepage-style-finish-r5.css" data-maplemoon-homepage-style-finish-r5="20260825T171625">';

const SNAPSHOT_SHA256 = "792e6508d21a4b1840f5a35fd28af05962030a7e2e32e73cda4651c7e5a48dd9";
const BASELINE_DIRECTORY_SHA256 = "394b65d1f98b931cc6fa90f685a363654ad3baa691321be1c8bc524d07c825c1";
const BASELINE_FILE_COUNT = 77;
const R1_DIRECTORY_SHA256 = "bc214f45f21f78b41f29f01eb51340ab19f934a7405c9680b3d540dfeb4b86ee";
const R4_DIRECTORY_SHA256 = "fa218fcc78f4a403b311582b8c7219dd2cac25950f7b96914ab1f8e1186cde3e";
const R4_EVIDENCE_DIRECTORY_SHA256 = "c4e5271bc69c36e6934c924b686ac4627918d091dd4a00382e7cdd4b303e2cb1";

const FILE_PINS = new Map([
  [path.join(REPO, "docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R5-20260825T171625.md"), "a340e9ae35434bd1a893a389c46ad6586e5764b6830b8618cc0a92a61456afa6"],
  [path.join(REPO, "docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002.md"), "50b85ea25461462e57503aafb7485796aa7919a9958f525912aba7ee3bd35f7b"],
  [path.join(REPO, "docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002.json"), "743a2d5eba769f80894872be0e2949962e8b193cdfa013307422472cd6232a42"],
  [path.join(REPO, "scripts/build-maplemoon-homepage-style-finish-r4-20260825T165002.mjs"), "ce2bb9d10c093f2aa143f1c403a160ff6b6c56a3e09d0233f94905f0125659cf"],
  [R4_CSS, "a8b375da22e3183b8815246b58b6cf80d75d6ffb76b5c87e42f5c8dcf3cf0a82"],
  [R4_MANIFEST, "2202972d589b9d89166b1a6c40663940d58e5a195f38cac7bfdce46109ff7df8"],
  [path.join(SEALED_R4_EVIDENCE, "R4-DIAGNOSTIC-HOLD.md"), "372f6daf3dfb30014e1a3b8633168395a34196437d74b6dd346cd56f99f6170f"],
  [SNAPSHOT, SNAPSHOT_SHA256],
  [path.join(REPO, "scripts/build-maplemoon-wip-preview.py"), "c8ea6c34d0207f9388ebf479f1c92ea77d63d61f5614cbbcf10a3896ef8c334a"],
]);

const R5_CORRECTIONS = `

/* R5 bounded corrections: starter containment and truthful lower-page trust field. */

/* R5-01 — preserve the six-pack fan while containing both rotated edge packshots. */
html body .wf #sampler.q-sampler .sbox-grid {
  padding-inline: 14px !important;
}

/* R5-02 — bind the real trust ID to the dark field and remove its pale envelope. */
html body .wf .wrap#trust.wf-trust {
  color: var(--mm-hsf-cream) !important;
  background: var(--mm-hsf-night) !important;
  border-color: rgba(247, 241, 218, .16) !important;
}
html body .wf .wrap#trust.wf-trust::before {
  content: none !important;
  display: none !important;
  background: none !important;
}
`;

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function fail(message) {
  throw new Error(message);
}

function walk(root) {
  const files = [];
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) fail(`unexpected symlink in build input: ${absolute}`);
      if (entry.isDirectory()) visit(absolute);
      else if (entry.isFile()) files.push(path.relative(root, absolute).split(path.sep).join("/"));
      else fail(`unexpected non-file in build input: ${absolute}`);
    }
  };
  visit(root);
  return files.sort();
}

function directorySha256(root) {
  const digest = crypto.createHash("sha256");
  for (const relative of walk(root)) {
    digest.update(relative);
    digest.update("\0");
    digest.update(sha256(path.join(root, relative)));
    digest.update("\n");
  }
  return digest.digest("hex");
}

function assertInputs() {
  for (const [filePath, expected] of FILE_PINS) {
    if (!fs.statSync(filePath, { throwIfNoEntry: false })?.isFile()) fail(`missing pinned input: ${filePath}`);
    const actual = sha256(filePath);
    if (actual !== expected) fail(`pinned input drift: ${filePath} expected=${expected} actual=${actual}`);
  }
  const baselineFiles = walk(BASELINE);
  if (baselineFiles.length !== BASELINE_FILE_COUNT) fail(`sealed baseline file-count drift: expected=${BASELINE_FILE_COUNT} actual=${baselineFiles.length}`);
  const baselineDirectory = directorySha256(BASELINE);
  if (baselineDirectory !== BASELINE_DIRECTORY_SHA256) fail(`sealed baseline directory drift: expected=${BASELINE_DIRECTORY_SHA256} actual=${baselineDirectory}`);
  const r1Directory = directorySha256(R1_ROOT);
  if (r1Directory !== R1_DIRECTORY_SHA256) fail(`R1 directory drift: expected=${R1_DIRECTORY_SHA256} actual=${r1Directory}`);
  if (fs.existsSync(R2_OUTPUT)) fail(`R2 HOLD output unexpectedly exists: ${R2_OUTPUT}`);
  if (fs.existsSync(R3_OUTPUT)) fail(`R3 HOLD output unexpectedly exists: ${R3_OUTPUT}`);
  const r4Directory = directorySha256(R4_ROOT);
  if (r4Directory !== R4_DIRECTORY_SHA256) fail(`R4 directory drift: expected=${R4_DIRECTORY_SHA256} actual=${r4Directory}`);
  const r4Evidence = directorySha256(SEALED_R4_EVIDENCE);
  if (r4Evidence !== R4_EVIDENCE_DIRECTORY_SHA256) fail(`R4 evidence drift: expected=${R4_EVIDENCE_DIRECTORY_SHA256} actual=${r4Evidence}`);
}

function strippedDom(html) {
  return html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function assertOutputSurface(baselineFiles, outputFiles) {
  const expected = [...baselineFiles, CSS_RELATIVE, MANIFEST_RELATIVE].sort();
  if (JSON.stringify(outputFiles) !== JSON.stringify(expected)) fail(`output file surface mismatch: expected=${expected.length} actual=${outputFiles.length}`);
}

function main() {
  assertInputs();
  if (fs.existsSync(OUTPUT)) fail(`non-overwriting target already exists: ${OUTPUT}`);
  if (fs.existsSync(STAGING)) fail(`staging target already exists: ${STAGING}`);

  const baselineFiles = walk(BASELINE);
  const baselineHomepagePath = path.join(BASELINE, "homepage.html");
  const baselineHomepage = fs.readFileSync(baselineHomepagePath, "utf8");
  if (!baselineHomepage.includes("homepage-w1a-carousel-mist-20260803")) fail("incoming radial carousel-mist refinement missing");
  if (!baselineHomepage.includes("rgba(8,18,30,.31) 16%")) fail("incoming smooth hero-copy radial refinement missing");
  if ((baselineHomepage.match(/<\/head>/g) || []).length !== 1) fail("homepage closing-head seam is not count-one");
  if (baselineHomepage.includes(CSS_RELATIVE) || baselineHomepage.includes("data-maplemoon-homepage-style-finish-r5")) fail("R5 style link already exists in baseline");
  if (baselineFiles.includes(CSS_RELATIVE) || baselineFiles.includes(MANIFEST_RELATIVE)) fail("R5-owned files already exist in sealed baseline");

  try {
    fs.cpSync(BASELINE, STAGING, { recursive: true, errorOnExist: true, force: false });
    const stagedHomepagePath = path.join(STAGING, "homepage.html");
    const derivedHomepage = baselineHomepage.replace("</head>", `${LINK}\n</head>`);
    if ((derivedHomepage.match(/data-maplemoon-homepage-style-finish-r5=/g) || []).length !== 1) fail("R5 link injection is not count-one");
    if (derivedHomepage.replace(`${LINK}\n`, "") !== baselineHomepage) fail("reverse link removal does not recover sealed baseline homepage bytes");
    fs.writeFileSync(stagedHomepagePath, derivedHomepage, "utf8");

    const r4Style = fs.readFileSync(R4_CSS, "utf8");
    const r5Style = `${r4Style.trimEnd()}${R5_CORRECTIONS}`;
    const cssPath = path.join(STAGING, CSS_RELATIVE);
    fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    fs.writeFileSync(cssPath, r5Style, "utf8");

    const dom = strippedDom(derivedHomepage);
    if (/<[^>]+class=["'][^"']*\bq-segments\b/i.test(dom)) fail("comparison segment control exists in R5 DOM");
    for (const relative of baselineFiles) {
      if (relative === "homepage.html") continue;
      if (sha256(path.join(BASELINE, relative)) !== sha256(path.join(STAGING, relative))) fail(`non-home/support baseline drift: ${relative}`);
    }

    const r4Manifest = JSON.parse(fs.readFileSync(R4_MANIFEST, "utf8"));
    const manifest = {
      schema: "maplemoon-homepage-style-finish-r5/v1",
      packet_id: PACKET_ID,
      disposition: "BOSS_REVIEW_ONLY_NOT_PROMOTED",
      created_at: "2026-08-25T17:16:25+10:00",
      sealed_inputs: {
        source_snapshot: SNAPSHOT,
        source_snapshot_sha256: SNAPSHOT_SHA256,
        baseline: BASELINE,
        baseline_directory_sha256: BASELINE_DIRECTORY_SHA256,
        baseline_file_count: BASELINE_FILE_COUNT,
        baseline_homepage_sha256: sha256(baselineHomepagePath),
      },
      predecessors: {
        r1_output_directory_sha256: R1_DIRECTORY_SHA256,
        r2_disposition: "SOURCE_DRIFT_HOLD_NO_OUTPUT",
        r3_disposition: "SOURCE_DRIFT_HOLD_NO_OUTPUT",
        r4_output_directory_sha256: R4_DIRECTORY_SHA256,
        r4_disposition: "DIAGNOSTIC_HOLD_PRESERVED",
        r1_through_r4_preserved_byte_identical: true,
      },
      incoming_refinements: r4Manifest.incoming_refinements,
      pins: Object.fromEntries([...FILE_PINS].map(([filePath, expected]) => [filePath, expected])),
      mutation_surface: {
        homepage: "count-one R5 stylesheet link injection only",
        stylesheet: `/${CSS_RELATIVE}`,
        manifest: `/${MANIFEST_RELATIVE}`,
        non_home_and_support_files: "byte-identical to sealed baseline",
      },
      corrections: [
        { id: "R5-01", contract: "rotated starter fan contained through 320", selector: "#sampler.q-sampler .sbox-grid", value: "padding-inline:14px" },
        { id: "R5-02", contract: "trust field dark and inherited pale pseudo absent", selector: ".wrap#trust.wf-trust and ::before" },
      ],
      inherited_dispositions: {
        carousel: "unchanged; only the packet's bounded clipped-stage exception may pass QA",
        newsletter: "unchanged; runtime equivalence and zero side effects required; integration HOLD remains",
      },
      mapping: r4Manifest.mapping,
      invariants: {
        homepage_flow_copy_media_buttons_links_forms_scripts_structured_data: "unchanged because the homepage mutation is exact link insertion only",
        reverse_link_removal_byte_equal: true,
        comparison_segment_dom_nodes: 0,
        unidentified_button_restored: false,
        non_home_and_support_byte_equal: true,
        carousel_or_newsletter_runtime_mutation: false,
        deploy_ingestion_or_promotion: false,
      },
      hashes: {
        derived_homepage_sha256: sha256(stagedHomepagePath),
        stylesheet_sha256: sha256(cssPath),
      },
      output_file_count: BASELINE_FILE_COUNT + 2,
    };
    const manifestPath = path.join(STAGING, MANIFEST_RELATIVE);
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

    const stagedFiles = walk(STAGING);
    assertOutputSurface(baselineFiles, stagedFiles);
    for (const relative of baselineFiles) {
      if (relative === "homepage.html") continue;
      if (sha256(path.join(BASELINE, relative)) !== sha256(path.join(STAGING, relative))) fail(`late non-home/support baseline drift: ${relative}`);
    }
    if (fs.readFileSync(stagedHomepagePath, "utf8").replace(`${LINK}\n`, "") !== baselineHomepage) fail("late reverse reconstruction failed");

    assertInputs();
    if (fs.existsSync(OUTPUT)) fail(`target appeared before atomic rename: ${OUTPUT}`);
    fs.renameSync(STAGING, OUTPUT);

    const outputFiles = walk(OUTPUT);
    assertOutputSurface(baselineFiles, outputFiles);
    const outputBytes = outputFiles.reduce((sum, relative) => sum + fs.statSync(path.join(OUTPUT, relative)).size, 0);
    console.log(`BUILD PASS packet=${PACKET_ID} output=${OUTPUT} baseline_files=${baselineFiles.length} output_files=${outputFiles.length} bytes=${outputBytes} link_injections=1 reverse_equal=1 q_segments_dom=0 non_home_equal=1 r1_r2_r3_r4_preserved=1 sealed_snapshot=1 sealed_baseline=1 corrections=2/2`);
  } finally {
    if (fs.existsSync(STAGING)) fs.rmSync(STAGING, { recursive: true, force: true });
  }
}

try {
  main();
} catch (error) {
  console.error(`BUILD FAIL packet=${PACKET_ID} reason=${error.message}`);
  process.exitCode = 1;
}
