#!/usr/bin/env node

/** MapleMoon homepage style-finish R3: fresh reconciled source, four CSS corrections. */

import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT = fileURLToPath(import.meta.url);
const REPO = path.resolve(path.dirname(SCRIPT), "..");
const PACKET_ID = "MAPLEMOON-HOMEPAGE-STYLE-FINISH-R3-20260825T164343";
const OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r3-20260825T164343");
const STAGING = path.join(path.dirname(OUTPUT), `.${path.basename(OUTPUT)}.building`);
const SOURCE_BUILDER = path.join(REPO, "scripts/build-maplemoon-wip-preview.py");
const R1_ROOT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-20260825T161314");
const R1_CSS = path.join(R1_ROOT, "styles/homepage-style-finish.css");
const R1_MANIFEST = path.join(R1_ROOT, "homepage-style-finish-manifest.json");
const R2_OUTPUT = path.join(REPO, "_wip/deploy/generated/maplemoon-homepage-style-finish-r2-20260825T163529");
const CSS_RELATIVE = "styles/homepage-style-finish-r3.css";
const MANIFEST_RELATIVE = "homepage-style-finish-r3-manifest.json";
const LINK = '<link rel="stylesheet" href="/styles/homepage-style-finish-r3.css" data-maplemoon-homepage-style-finish-r3="20260825T164343">';

const FILE_PINS = new Map([
  [path.join(REPO, "_wip/homepage_real_1_lead_photo.WIP.html"), "4a65a61df537652711749137855e9cf0adc443d2b0db2dcabc883fdc3fe442e9"],
  [SOURCE_BUILDER, "c8ea6c34d0207f9388ebf479f1c92ea77d63d61f5614cbbcf10a3896ef8c334a"],
  [path.join(REPO, "docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R2-20260825T163529.md"), "99a38c956a161c9dd129dd99cc092f2c30e7b6780e33e560207c9b028cce17a6"],
  [path.join(REPO, "docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R2-20260825T163529.json"), "daed8b097f0af8df6cb458588013e964fb644eb93098c7b679367fea2fae7178"],
  [path.join(REPO, "scripts/build-maplemoon-homepage-style-finish-r2-20260825T163529.mjs"), "60b2846b257147205d252db135b23e62e94ac428790e4d20460bb3268960d236"],
  [path.join(REPO, "_wip/evidence/homepage_style_finish_r2_20260825T163529/DRIFT-HOLD.md"), "3a09a371a86c49ac8dd44ed2da59660336a583f4e4c12e50cc56d016daf4d8b2"],
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

const R1_DIRECTORY_SHA256 = "bc214f45f21f78b41f29f01eb51340ab19f934a7405c9680b3d540dfeb4b86ee";

const R3_CORRECTIONS = `

/* R3 bounded corrections: exactly the four R1 pre-QA failures. */

/* R3-01 — two governed hotspots remain >=14px through 320px. */
html body .wf .wf-what1 .co,
html body .wf .wf-what1 .co .t,
html body .wf .wf-what1 .co .d,
html body .wf .wf-what1 .co .n {
  font-size: 14px !important;
  line-height: 1.32 !important;
}

/* R3-02 — the current single farm-credit node remains >=14px / 1.4. */
html body .wf .wf-where1 .wf-photo-credit {
  font-size: 14px !important;
  line-height: 1.45 !important;
}

/* R3-03 — comparison stacks in DOM order at 768 and narrower. */
@media (max-width: 768px) {
  html body .wf .q-compare-pro {
    grid-template-columns: minmax(0, 1fr) !important;
  }
  html body .wf .q-vs {
    position: static !important;
    margin: -4px auto !important;
  }
}

/* R3-04 — bind the live ID and remove its inherited pale pseudo bridge. */
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
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else if (entry.isFile()) files.push(path.relative(root, absolute));
      else fail(`unexpected non-file in build: ${absolute}`);
    }
  };
  visit(root);
  return files;
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

function assertPins() {
  for (const [filePath, expected] of FILE_PINS) {
    if (!fs.statSync(filePath, { throwIfNoEntry: false })?.isFile()) fail(`missing pinned input: ${filePath}`);
    const actual = sha256(filePath);
    if (actual !== expected) fail(`pinned input drift: ${filePath} expected=${expected} actual=${actual}`);
  }
  const r1Directory = directorySha256(R1_ROOT);
  if (r1Directory !== R1_DIRECTORY_SHA256) fail(`R1 directory drift: expected=${R1_DIRECTORY_SHA256} actual=${r1Directory}`);
  if (fs.existsSync(R2_OUTPUT)) fail(`R2 HOLD output unexpectedly exists: ${R2_OUTPUT}`);
}

function strippedDom(html) {
  return html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function main() {
  assertPins();
  if (fs.existsSync(OUTPUT)) fail(`non-overwriting target already exists: ${OUTPUT}`);
  if (fs.existsSync(STAGING)) fail(`staging target already exists: ${STAGING}`);

  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "maplemoon-homepage-style-finish-r3-"));
  const baseline = path.join(temporaryRoot, "baseline");
  try {
    const result = spawnSync("python3", ["-B", SOURCE_BUILDER, "--output", baseline], {
      cwd: REPO,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.status !== 0) fail(`pinned preview builder failed (${result.status}): ${result.stderr || result.stdout}`);
    if (!result.stdout.includes("BUILD PASS")) fail(`pinned preview builder returned no PASS: ${result.stdout}`);

    fs.cpSync(baseline, STAGING, { recursive: true, errorOnExist: true, force: false });
    const baselineHomepagePath = path.join(baseline, "homepage.html");
    const stagedHomepagePath = path.join(STAGING, "homepage.html");
    const baselineHomepage = fs.readFileSync(baselineHomepagePath, "utf8");
    if (!baselineHomepage.includes("homepage-w1a-carousel-mist-20260803")) fail("incoming carousel-mist refinement missing");
    if (!baselineHomepage.includes("rgba(8,18,30,.31) 16%")) fail("incoming smooth hero-copy radial refinement missing");
    if ((baselineHomepage.match(/<\/head>/g) || []).length !== 1) fail("homepage closing-head seam is not count-one");
    if (baselineHomepage.includes(CSS_RELATIVE) || baselineHomepage.includes("data-maplemoon-homepage-style-finish-r3")) fail("R3 style link already exists in baseline");
    const derivedHomepage = baselineHomepage.replace("</head>", `${LINK}\n</head>`);
    if ((derivedHomepage.match(/data-maplemoon-homepage-style-finish-r3=/g) || []).length !== 1) fail("R3 link injection is not count-one");
    if (derivedHomepage.replace(`${LINK}\n`, "") !== baselineHomepage) fail("reverse link removal does not recover baseline homepage bytes");
    fs.writeFileSync(stagedHomepagePath, derivedHomepage, "utf8");

    const r1Style = fs.readFileSync(R1_CSS, "utf8");
    const r3Style = `${r1Style.trimEnd()}${R3_CORRECTIONS}`;
    const cssPath = path.join(STAGING, CSS_RELATIVE);
    fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    fs.writeFileSync(cssPath, r3Style, "utf8");

    const dom = strippedDom(derivedHomepage);
    if (/<[^>]+class=["'][^"']*\bq-segments\b/i.test(dom)) fail("comparison segment control exists in R3 DOM");

    const baselineFiles = walk(baseline);
    for (const relative of baselineFiles) {
      if (relative === "homepage.html") continue;
      if (sha256(path.join(baseline, relative)) !== sha256(path.join(STAGING, relative))) fail(`non-home/support baseline drift: ${relative}`);
    }

    const r1Manifest = JSON.parse(fs.readFileSync(R1_MANIFEST, "utf8"));
    const manifest = {
      schema: "maplemoon-homepage-style-finish-r3/v1",
      packet_id: PACKET_ID,
      disposition: "BOSS_REVIEW_ONLY_NOT_PROMOTED",
      created_at: "2026-08-25T16:43:43+10:00",
      predecessors: {
        r1_output_directory_sha256: R1_DIRECTORY_SHA256,
        r2_disposition: "SOURCE_DRIFT_HOLD_NO_OUTPUT",
        r1_r2_preserved_byte_identical: true,
      },
      source_builder_stdout: result.stdout.trim(),
      incoming_refinements: {
        smooth_hero_copy_radial: "retained from fresh pinned homepage",
        radial_carousel_mist: "retained from fresh pinned homepage",
      },
      pins: Object.fromEntries([...FILE_PINS].map(([filePath, expected]) => [filePath, expected])),
      mutation_surface: {
        homepage: "count-one R3 stylesheet link injection only",
        stylesheet: `/${CSS_RELATIVE}`,
        manifest: `/${MANIFEST_RELATIVE}`,
        non_home_and_support_files: "byte-identical to fresh pinned baseline",
      },
      corrections: [
        { id: "R3-01", contract: "hotspot font >=14px through 320", selector: ".wf-what1 .co and text leaves" },
        { id: "R3-02", contract: "credit font >=14px and line-height >=1.4", selector: ".wf-where1 .wf-photo-credit" },
        { id: "R3-03", contract: "comparison one column at <=768", selector: ".q-compare-pro" },
        { id: "R3-04", contract: "real sampler ID resolves dark and inherited pseudo is absent", selector: "#sampler.q-sampler and ::before" },
      ],
      mapping: r1Manifest.mapping,
      invariants: {
        homepage_flow_copy_media_buttons_links_forms_scripts_structured_data: "unchanged because the homepage mutation is exact link insertion only",
        reverse_link_removal_byte_equal: true,
        comparison_segment_dom_nodes: 0,
        unidentified_button_restored: false,
        deploy_or_promotion: false,
      },
      hashes: {
        baseline_homepage_sha256: sha256(baselineHomepagePath),
        derived_homepage_sha256: sha256(stagedHomepagePath),
        stylesheet_sha256: sha256(cssPath),
      },
      baseline_file_count: baselineFiles.length,
    };
    fs.writeFileSync(path.join(STAGING, MANIFEST_RELATIVE), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

    assertPins();
    if (fs.existsSync(OUTPUT)) fail(`target appeared before atomic rename: ${OUTPUT}`);
    fs.renameSync(STAGING, OUTPUT);
    const outputFiles = walk(OUTPUT);
    const outputBytes = outputFiles.reduce((sum, relative) => sum + fs.statSync(path.join(OUTPUT, relative)).size, 0);
    console.log(`BUILD PASS packet=${PACKET_ID} output=${OUTPUT} baseline_files=${baselineFiles.length} output_files=${outputFiles.length} bytes=${outputBytes} link_injections=1 reverse_equal=1 q_segments_dom=0 non_home_equal=1 incoming_refinements=2/2 corrections=4/4 r1_r2_preserved=1`);
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
    if (fs.existsSync(STAGING)) fs.rmSync(STAGING, { recursive: true, force: true });
  }
}

try {
  main();
} catch (error) {
  console.error(`BUILD FAIL packet=${PACKET_ID} reason=${error.message}`);
  process.exitCode = 1;
}
