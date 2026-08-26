#!/usr/bin/env node

/**
 * MapleMoon homepage style-finish R4.
 *
 * Builds one non-overwriting review candidate from the immutable R4 baseline.
 * It never reads the moving homepage WIP and never writes the sealed evidence.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT = fileURLToPath(import.meta.url);
const REPO = path.resolve(path.dirname(SCRIPT), "..");
const PACKET_ID = "MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002";
const SEALED_EVIDENCE = path.join(REPO, "_wip/evidence/homepage_style_finish_r4_20260825T165002");
const SNAPSHOT = path.join(SEALED_EVIDENCE, "source-snapshot.WIP.html");
const BASELINE = path.join(SEALED_EVIDENCE, "baseline");
const OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r4-20260825T165002");
const STAGING = path.join(path.dirname(OUTPUT), `.${path.basename(OUTPUT)}.building`);
const SOURCE_BUILDER = path.join(REPO, "scripts/build-maplemoon-wip-preview.py");
const R1_ROOT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-20260825T161314");
const R1_CSS = path.join(R1_ROOT, "styles/homepage-style-finish.css");
const R1_MANIFEST = path.join(R1_ROOT, "homepage-style-finish-manifest.json");
const R2_OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r2-20260825T163529");
const R3_OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r3-20260825T164343");
const CSS_RELATIVE = "styles/homepage-style-finish-r4.css";
const MANIFEST_RELATIVE = "homepage-style-finish-r4-manifest.json";
const LINK = '<link rel="stylesheet" href="/styles/homepage-style-finish-r4.css" data-maplemoon-homepage-style-finish-r4="20260825T165002">';

const SNAPSHOT_SHA256 = "792e6508d21a4b1840f5a35fd28af05962030a7e2e32e73cda4651c7e5a48dd9";
const BASELINE_DIRECTORY_SHA256 = "394b65d1f98b931cc6fa90f685a363654ad3baa691321be1c8bc524d07c825c1";
const BASELINE_FILE_COUNT = 77;
const R1_DIRECTORY_SHA256 = "bc214f45f21f78b41f29f01eb51340ab19f934a7405c9680b3d540dfeb4b86ee";

const FILE_PINS = new Map([
  [path.join(REPO, "docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002.md"), "50b85ea25461462e57503aafb7485796aa7919a9958f525912aba7ee3bd35f7b"],
  [SNAPSHOT, SNAPSHOT_SHA256],
  [SOURCE_BUILDER, "c8ea6c34d0207f9388ebf479f1c92ea77d63d61f5614cbbcf10a3896ef8c334a"],
  [path.join(REPO, "docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R3-20260825T164343.md"), "f8628f037332ad8905812139c9223bcded425af978b35a29fe61cf7a04994b3b"],
  [path.join(REPO, "docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R3-20260825T164343.json"), "8324a3aebb318addc8e6cd3912327337df6e8560fbc6fa85ecd8c599a2d0410d"],
  [path.join(REPO, "scripts/build-maplemoon-homepage-style-finish-r3-20260825T164343.mjs"), "8a45fbaa12a31b01c579ac02adb7ca256b5072d61497436941129659e349ca05"],
  [path.join(REPO, "_wip/evidence/homepage_style_finish_r3_20260825T164343/DRIFT-HOLD.md"), "8d03ce694368f99734e31515549550c524d176219795f926fe5abffe6a52d0fd"],
  [path.join(REPO, "scripts/build-maplemoon-homepage-style-finish-20260825T161314.mjs"), "b9188bb8d5ee3bf57f4bb9cc2b195769caf2fa69ff25747879c37cc50d00be30"],
  [R1_CSS, "f35c8d9144a9974dcc496909037141789045b6bf2cd78905862821e446889bf4"],
  [R1_MANIFEST, "e90af5af8ac64da940dfb3886838bc3c4fe87debb7682ef46e620764f50ab8f2"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/HOMEPAGE-STYLES-DECISIONS-20260824.md", "c9f286b5d2c5b5367e74362e1ea69bbbf9b52be7be8bbccf6f4f668b7083a0d9"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/homepage-styles-batch-01.html", "15ce5c5679d9f978db50c31b25ac59fd004acd19014e9fc80e3d613b46ee642e"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-homepage-structure-preserved-style-tuning.html", "c603d3e26b4db821a18e2ca937f0b62ddc01b1ca2cc0ccb81571eb1926e0bdca"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/homepage-what-is-carob-batch-06.html", "7f95350047a7676499d785788655e34ee8c645f07e5a5a05ad6d1972addd8560"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-homepage-hybrid-current-vs-tuned.html", "1e22c01f02c973867692ccc4f942fcd150c5c1a92365a34bef2573987b3a4966"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-lane-2-homepage-system.html", "6d5b7a0986a698932b52fbdef67ef6a679b4dba4999feca9a3c686ec29328cf6"],
]);

const R4_CORRECTIONS = `

/* R4 bounded corrections: exactly the four R1 pre-QA failures. */

/* R4-01 — governed hotspot copy remains >=14px through 320px. */
html body .wf .wf-what1 .co,
html body .wf .wf-what1 .co .t,
html body .wf .wf-what1 .co .d,
html body .wf .wf-what1 .co .n {
  font-size: 14px !important;
  line-height: 1.32 !important;
}

/* R4-02 — the current single farm-credit node remains >=14px / 1.4. */
html body .wf .wf-where1 .wf-photo-credit {
  font-size: 14px !important;
  line-height: 1.45 !important;
}

/* R4-03 — comparison stacks in DOM order at 768px and narrower. */
@media (max-width: 768px) {
  html body .wf .q-compare-pro {
    grid-template-columns: minmax(0, 1fr) !important;
  }
  html body .wf .q-vs {
    position: static !important;
    margin: -4px auto !important;
  }
}

/* R4-04 — bind the live sampler ID and remove its inherited pale bridge. */
html body .wf #sampler.q-sampler {
  color: var(--mm-hsf-cream) !important;
  background: linear-gradient(180deg,
    #dceaf0 0%, #89a7b8 4%, #466a80 8%, #17364d 14%,
    var(--mm-hsf-night) 28%, var(--mm-hsf-night) 100%) !important;
}
html body .wf #sampler.q-sampler::before {
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

function assertSealedInputs() {
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
}

function strippedDom(html) {
  return html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function assertExactOutputSurface(baselineFiles, outputFiles) {
  const expected = [...baselineFiles, CSS_RELATIVE, MANIFEST_RELATIVE].sort();
  if (JSON.stringify(outputFiles) !== JSON.stringify(expected)) {
    fail(`output file surface mismatch: expected=${expected.length} actual=${outputFiles.length}`);
  }
}

function main() {
  assertSealedInputs();
  if (fs.existsSync(OUTPUT)) fail(`non-overwriting target already exists: ${OUTPUT}`);
  if (fs.existsSync(STAGING)) fail(`staging target already exists: ${STAGING}`);

  const baselineFiles = walk(BASELINE);
  const baselineHomepagePath = path.join(BASELINE, "homepage.html");
  const baselineHomepage = fs.readFileSync(baselineHomepagePath, "utf8");
  if (!baselineHomepage.includes("homepage-w1a-carousel-mist-20260803")) fail("incoming radial carousel-mist refinement missing");
  if (!baselineHomepage.includes("rgba(8,18,30,.31) 16%")) fail("incoming smooth hero-copy radial refinement missing");
  if ((baselineHomepage.match(/<\/head>/g) || []).length !== 1) fail("homepage closing-head seam is not count-one");
  if (baselineHomepage.includes(CSS_RELATIVE) || baselineHomepage.includes("data-maplemoon-homepage-style-finish-r4")) fail("R4 style link already exists in baseline");
  if (baselineFiles.includes(CSS_RELATIVE) || baselineFiles.includes(MANIFEST_RELATIVE)) fail("R4-owned files already exist in sealed baseline");

  try {
    fs.cpSync(BASELINE, STAGING, { recursive: true, errorOnExist: true, force: false });

    const stagedHomepagePath = path.join(STAGING, "homepage.html");
    const derivedHomepage = baselineHomepage.replace("</head>", `${LINK}\n</head>`);
    if ((derivedHomepage.match(/data-maplemoon-homepage-style-finish-r4=/g) || []).length !== 1) fail("R4 link injection is not count-one");
    if (derivedHomepage.replace(`${LINK}\n`, "") !== baselineHomepage) fail("reverse link removal does not recover sealed baseline homepage bytes");
    fs.writeFileSync(stagedHomepagePath, derivedHomepage, "utf8");

    const r1Style = fs.readFileSync(R1_CSS, "utf8");
    const r4Style = `${r1Style.trimEnd()}${R4_CORRECTIONS}`;
    const cssPath = path.join(STAGING, CSS_RELATIVE);
    fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    fs.writeFileSync(cssPath, r4Style, "utf8");

    const dom = strippedDom(derivedHomepage);
    if (/<[^>]+class=["'][^"']*\bq-segments\b/i.test(dom)) fail("comparison segment control exists in R4 DOM");

    for (const relative of baselineFiles) {
      if (relative === "homepage.html") continue;
      if (sha256(path.join(BASELINE, relative)) !== sha256(path.join(STAGING, relative))) fail(`non-home/support baseline drift: ${relative}`);
    }

    const r1Manifest = JSON.parse(fs.readFileSync(R1_MANIFEST, "utf8"));
    const manifest = {
      schema: "maplemoon-homepage-style-finish-r4/v1",
      packet_id: PACKET_ID,
      disposition: "BOSS_REVIEW_ONLY_NOT_PROMOTED",
      created_at: "2026-08-25T16:50:02+10:00",
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
        r1_r2_r3_preserved_byte_identical: true,
      },
      incoming_refinements: {
        smooth_hero_copy_radial: "retained from sealed baseline",
        radial_carousel_mist: "retained from sealed baseline",
      },
      pins: Object.fromEntries([...FILE_PINS].map(([filePath, expected]) => [filePath, expected])),
      mutation_surface: {
        homepage: "count-one R4 stylesheet link injection only",
        stylesheet: `/${CSS_RELATIVE}`,
        manifest: `/${MANIFEST_RELATIVE}`,
        non_home_and_support_files: "byte-identical to sealed baseline",
      },
      corrections: [
        { id: "R4-01", contract: "hotspot font >=14px through 320", selector: ".wf-what1 .co and text leaves" },
        { id: "R4-02", contract: "credit font >=14px and line-height >=1.4", selector: ".wf-where1 .wf-photo-credit" },
        { id: "R4-03", contract: "comparison one column at <=768", selector: ".q-compare-pro" },
        { id: "R4-04", contract: "real sampler ID resolves dark and inherited pseudo is absent", selector: "#sampler.q-sampler and ::before" },
      ],
      mapping: r1Manifest.mapping,
      invariants: {
        homepage_flow_copy_media_buttons_links_forms_scripts_structured_data: "unchanged because the homepage mutation is exact link insertion only",
        reverse_link_removal_byte_equal: true,
        comparison_segment_dom_nodes: 0,
        unidentified_button_restored: false,
        non_home_and_support_byte_equal: true,
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
    assertExactOutputSurface(baselineFiles, stagedFiles);
    for (const relative of baselineFiles) {
      if (relative === "homepage.html") continue;
      if (sha256(path.join(BASELINE, relative)) !== sha256(path.join(STAGING, relative))) fail(`late non-home/support baseline drift: ${relative}`);
    }
    if (fs.readFileSync(stagedHomepagePath, "utf8").replace(`${LINK}\n`, "") !== baselineHomepage) fail("late reverse reconstruction failed");

    assertSealedInputs();
    if (fs.existsSync(OUTPUT)) fail(`target appeared before atomic rename: ${OUTPUT}`);
    fs.renameSync(STAGING, OUTPUT);

    const outputFiles = walk(OUTPUT);
    assertExactOutputSurface(baselineFiles, outputFiles);
    const outputBytes = outputFiles.reduce((sum, relative) => sum + fs.statSync(path.join(OUTPUT, relative)).size, 0);
    console.log(`BUILD PASS packet=${PACKET_ID} output=${OUTPUT} baseline_files=${baselineFiles.length} output_files=${outputFiles.length} bytes=${outputBytes} link_injections=1 reverse_equal=1 q_segments_dom=0 non_home_equal=1 incoming_refinements=2/2 corrections=4/4 r1_r2_r3_preserved=1 sealed_snapshot=1 sealed_baseline=1`);
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
