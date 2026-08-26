#!/usr/bin/env node

/** MapleMoon homepage style-finish R6: final sealed-base starter containment correction. */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT = fileURLToPath(import.meta.url);
const REPO = path.resolve(path.dirname(SCRIPT), "..");
const PACKET_ID = "MAPLEMOON-HOMEPAGE-STYLE-FINISH-R6-20260825T175303";
const SEALED_BASE_ROOT = path.join(REPO, "_wip/evidence/homepage_style_finish_r4_20260825T165002");
const SNAPSHOT = path.join(SEALED_BASE_ROOT, "source-snapshot.WIP.html");
const BASELINE = path.join(SEALED_BASE_ROOT, "baseline");
const R1_ROOT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-20260825T161314");
const R2_OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r2-20260825T163529");
const R3_OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r3-20260825T164343");
const R4_ROOT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r4-20260825T165002");
const R5_ROOT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r5-20260825T171625");
const R5_CSS = path.join(R5_ROOT, "styles/homepage-style-finish-r5.css");
const R5_MANIFEST = path.join(R5_ROOT, "homepage-style-finish-r5-manifest.json");
const R5_EVIDENCE = path.join(REPO, "_wip/evidence/homepage_style_finish_r5_20260825T171625");
const OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r6-20260825T175303");
const STAGING = path.join(path.dirname(OUTPUT), `.${path.basename(OUTPUT)}.building`);
const CSS_RELATIVE = "styles/homepage-style-finish-r6.css";
const MANIFEST_RELATIVE = "homepage-style-finish-r6-manifest.json";
const LINK = '<link rel="stylesheet" href="/styles/homepage-style-finish-r6.css" data-maplemoon-homepage-style-finish-r6="20260825T175303">';
const R5_INSET = "padding-inline: 14px !important;";
const R6_INSET = "padding-inline: 18px !important;";

const SNAPSHOT_SHA256 = "792e6508d21a4b1840f5a35fd28af05962030a7e2e32e73cda4651c7e5a48dd9";
const BASELINE_DIRECTORY_SHA256 = "394b65d1f98b931cc6fa90f685a363654ad3baa691321be1c8bc524d07c825c1";
const BASELINE_FILE_COUNT = 77;
const R1_DIRECTORY_SHA256 = "bc214f45f21f78b41f29f01eb51340ab19f934a7405c9680b3d540dfeb4b86ee";
const R4_DIRECTORY_SHA256 = "fa218fcc78f4a403b311582b8c7219dd2cac25950f7b96914ab1f8e1186cde3e";
const R5_DIRECTORY_SHA256 = "4148aa9117d408ee360630f8c0c0847b535a6378d1964e5fbc094e6fa4789841";
const R5_EVIDENCE_DIRECTORY_SHA256 = "ffcb38a7dbbbd481b7c188d6cd23afec4904026c032c622270f43570b9488a75";

const FILE_PINS = new Map([
  [path.join(REPO, "docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R6-20260825T175303.md"), "7b9d36d5860e08ec09a193183775b73b0046213812e242bba7debefce3275ab2"],
  [path.join(REPO, "docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R5-20260825T171625.md"), "a340e9ae35434bd1a893a389c46ad6586e5764b6830b8618cc0a92a61456afa6"],
  [path.join(REPO, "docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R5-20260825T171625.json"), "5c1a791934bd46dc41f51f9f0a2c273bc34deffb8ec0bd4945d43571269a0539"],
  [path.join(REPO, "scripts/build-maplemoon-homepage-style-finish-r5-20260825T171625.mjs"), "1244b7afeeced6b50e1dd7ee8234e5549913f338d86c24356724c9ce43cebfad"],
  [R5_CSS, "4c353ea805be05833e44c9c76ae8ec5aae724e346a85c60a9257481da0861a36"],
  [R5_MANIFEST, "fa7a5e0c01daa74438278767e840cdcb4851cd20f262073194a6eb9415b1b4dc"],
  [path.join(R5_EVIDENCE, "R5-DIAGNOSTIC-HOLD.md"), "9c313069236d0597455a5f7f70d9a5f15cfd9c66719c7b072b0e967abef3dd95"],
  [path.join(R5_EVIDENCE, "INDEPENDENT-VISUAL-REVIEW.md"), "e49f7ed9fde85d75c4402ef513cf559210d794fabce6b8858faa323e1e1f69f3"],
  [path.join(R5_EVIDENCE, "qa-attempts/attempt-003/AUTOMATED-QA.json"), "46d4a0d12a8ffd8af30be2456fd9e80811237266ff4a35ec08709e8adb9b7c59"],
  [path.join(R5_EVIDENCE, "qa-attempts/attempt-003/PROOF-MANIFEST.json"), "79c227b4385d83c7647f72b5f3f6973b0cc86db9d3623ed80c533d206b849fe0"],
  [path.join(R5_EVIDENCE, "qa-attempts/attempt-003/POSITIVE-CONTROLS.json"), "e92b630580dc708a3d5b797b9b349f13ea452c9c94ed7d15cb45bf7f9576e49c"],
  [SNAPSHOT, SNAPSHOT_SHA256],
  [path.join(REPO, "scripts/build-maplemoon-wip-preview.py"), "c8ea6c34d0207f9388ebf479f1c92ea77d63d61f5614cbbcf10a3896ef8c334a"],
]);

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
  if (directorySha256(BASELINE) !== BASELINE_DIRECTORY_SHA256) fail("sealed baseline directory drift");
  if (directorySha256(R1_ROOT) !== R1_DIRECTORY_SHA256) fail("R1 directory drift");
  if (fs.existsSync(R2_OUTPUT)) fail(`R2 HOLD output unexpectedly exists: ${R2_OUTPUT}`);
  if (fs.existsSync(R3_OUTPUT)) fail(`R3 HOLD output unexpectedly exists: ${R3_OUTPUT}`);
  if (directorySha256(R4_ROOT) !== R4_DIRECTORY_SHA256) fail("R4 directory drift");
  if (directorySha256(R5_ROOT) !== R5_DIRECTORY_SHA256) fail("R5 directory drift");
  if (directorySha256(R5_EVIDENCE) !== R5_EVIDENCE_DIRECTORY_SHA256) fail("R5 evidence directory drift");
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
  if ((baselineHomepage.match(/<\/head>/g) || []).length !== 1) fail("homepage closing-head seam is not count-one");
  if (baselineHomepage.includes(CSS_RELATIVE) || baselineHomepage.includes("data-maplemoon-homepage-style-finish-r6")) fail("R6 style link already exists in baseline");
  if (baselineFiles.includes(CSS_RELATIVE) || baselineFiles.includes(MANIFEST_RELATIVE)) fail("R6-owned files already exist in sealed baseline");

  try {
    fs.cpSync(BASELINE, STAGING, { recursive: true, errorOnExist: true, force: false });
    const stagedHomepagePath = path.join(STAGING, "homepage.html");
    const derivedHomepage = baselineHomepage.replace("</head>", `${LINK}\n</head>`);
    if ((derivedHomepage.match(/data-maplemoon-homepage-style-finish-r6=/g) || []).length !== 1) fail("R6 link injection is not count-one");
    if (derivedHomepage.replace(`${LINK}\n`, "") !== baselineHomepage) fail("reverse link removal does not recover sealed baseline homepage bytes");
    fs.writeFileSync(stagedHomepagePath, derivedHomepage, "utf8");

    const r5Style = fs.readFileSync(R5_CSS, "utf8");
    const insetCount = r5Style.split(R5_INSET).length - 1;
    if (insetCount !== 1) fail(`R5 inset literal is not count-one: ${insetCount}`);
    const r6Style = r5Style.replace(R5_INSET, R6_INSET);
    if (r6Style === r5Style) fail("R6 inset substitution made no change");
    if (r6Style.replace(R6_INSET, R5_INSET) !== r5Style) fail("R6 stylesheet semantic reverse diff failed");
    const cssPath = path.join(STAGING, CSS_RELATIVE);
    fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    fs.writeFileSync(cssPath, r6Style, "utf8");

    const dom = strippedDom(derivedHomepage);
    if (/<[^>]+class=["'][^"']*\bq-segments\b/i.test(dom)) fail("comparison segment control exists in R6 DOM");
    for (const relative of baselineFiles) {
      if (relative === "homepage.html") continue;
      if (sha256(path.join(BASELINE, relative)) !== sha256(path.join(STAGING, relative))) fail(`non-home/support baseline drift: ${relative}`);
    }

    const r5Manifest = JSON.parse(fs.readFileSync(R5_MANIFEST, "utf8"));
    const manifest = {
      schema: "maplemoon-homepage-style-finish-r6/v1",
      packet_id: PACKET_ID,
      disposition: "BOSS_REVIEW_ONLY_NOT_PROMOTED",
      created_at: "2026-08-25T17:53:03+10:00",
      sealed_inputs: {
        source_snapshot: SNAPSHOT,
        source_snapshot_sha256: SNAPSHOT_SHA256,
        baseline: BASELINE,
        baseline_directory_sha256: BASELINE_DIRECTORY_SHA256,
        baseline_file_count: BASELINE_FILE_COUNT,
        baseline_homepage_sha256: sha256(baselineHomepagePath),
      },
      predecessor: {
        r5_output_directory_sha256: R5_DIRECTORY_SHA256,
        r5_evidence_directory_sha256: R5_EVIDENCE_DIRECTORY_SHA256,
        r5_disposition: "DIAGNOSTIC_HOLD_PRESERVED",
        r1_through_r5_preserved_byte_identical: true,
      },
      pins: Object.fromEntries([...FILE_PINS].map(([filePath, expected]) => [filePath, expected])),
      mutation_surface: {
        homepage: "count-one R6 stylesheet link injection only",
        stylesheet: `/${CSS_RELATIVE}`,
        manifest: `/${MANIFEST_RELATIVE}`,
        non_home_and_support_files: "byte-identical to sealed baseline",
      },
      correction: {
        id: "R6-01",
        selector: "#sampler.q-sampler .sbox-grid",
        from: "padding-inline:14px",
        to: "padding-inline:18px",
        semantic_css_changes: 1,
      },
      inherited_dispositions: r5Manifest.inherited_dispositions,
      mapping: r5Manifest.mapping,
      invariants: {
        homepage_flow_copy_media_buttons_links_forms_scripts_structured_data: "unchanged because the homepage mutation is exact link insertion only",
        reverse_link_removal_byte_equal: true,
        r6_css_reverse_to_r5_byte_equal: true,
        comparison_segment_dom_nodes: 0,
        unidentified_button_restored: false,
        non_home_and_support_byte_equal: true,
        carousel_newsletter_or_comparison_modal_mutation: false,
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
    if (fs.readFileSync(cssPath, "utf8").replace(R6_INSET, R5_INSET) !== r5Style) fail("late R6-to-R5 stylesheet reverse diff failed");

    assertInputs();
    if (fs.existsSync(OUTPUT)) fail(`target appeared before atomic rename: ${OUTPUT}`);
    fs.renameSync(STAGING, OUTPUT);

    const outputFiles = walk(OUTPUT);
    assertOutputSurface(baselineFiles, outputFiles);
    const outputBytes = outputFiles.reduce((sum, relative) => sum + fs.statSync(path.join(OUTPUT, relative)).size, 0);
    console.log(`BUILD PASS packet=${PACKET_ID} output=${OUTPUT} baseline_files=${baselineFiles.length} output_files=${outputFiles.length} bytes=${outputBytes} link_injections=1 reverse_equal=1 q_segments_dom=0 non_home_equal=1 r1_r2_r3_r4_r5_preserved=1 sealed_snapshot=1 sealed_baseline=1 semantic_css_changes=1 inset=18px`);
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
