#!/usr/bin/env node
// Guards the Our Story founder portrait against the three-crop trap documented in
// _wip/evidence/FOUNDER-V04-CROP-ACCEPTANCE-CORRECTION-20260803.md
//
// The portrait is cropped three times: Photoshop bounds, then object-fit cover with
// object-position, then a two-axis alpha mask that dissolves the outer edges. A crop
// verified at file level can still lose the subject in the browser. This check fails
// if a v04-derived asset is wired without an in-page verification receipt, or if the
// CSS constants that any past verification was made against have drifted.

import { readFileSync, existsSync, readdirSync } from 'node:fs';

const PAGE = '_wip/our-story.WIP.html';
const EVIDENCE_DIR = '_wip/evidence';

// Values the acceptance correction was written against. If these drift, every prior
// in-page verification is void and must be redone.
const EXPECTED = {
  objectPosition: '46% 40%',
  maskHorizontal: ['11%', '91%'],
  maskVertical: ['8%', '90%'],
};

const failures = [];
const notes = [];

if (!existsSync(PAGE)) {
  console.error(`FAIL  page not found: ${PAGE}`);
  process.exit(1);
}
const html = readFileSync(PAGE, 'utf8');

// 1. The object-position the mask/crop reasoning depends on.
if (!html.includes(`object-position:${EXPECTED.objectPosition}`)) {
  failures.push(
    `object-position drifted. Expected "${EXPECTED.objectPosition}" in the .os-scoped rule. ` +
    `Any recorded in-page crop verification is now void.`
  );
} else {
  notes.push(`object-position ${EXPECTED.objectPosition} unchanged`);
}

// 2. The alpha mask stops. These decide which pixels are actually opaque.
const maskOk =
  EXPECTED.maskHorizontal.every((s) => html.includes(`#000 ${s}`)) &&
  EXPECTED.maskVertical.every((s) => html.includes(`#000 ${s}`));
if (!maskOk) {
  failures.push(
    `portrait alpha mask stops drifted. Expected horizontal ${EXPECTED.maskHorizontal.join('/')} ` +
    `and vertical ${EXPECTED.maskVertical.join('/')}. The opaque region changed, so subject ` +
    `framing must be re-verified in-page.`
  );
} else {
  notes.push(`mask stops ${EXPECTED.maskHorizontal.join('/')} and ${EXPECTED.maskVertical.join('/')} unchanged`);
}

// 3. The gate. A v04-derived portrait may not be wired without an in-page receipt.
const wiredV04 = /founders?_portrait[^"']*v0?4[^"']*\.(webp|png|jpe?g)/i.test(html);
if (wiredV04) {
  const receipts = existsSync(EVIDENCE_DIR)
    ? readdirSync(EVIDENCE_DIR).filter((f) => /IN-PAGE-CROP-VERIFIED.*\.(md|json)$/i.test(f))
    : [];
  if (receipts.length === 0) {
    failures.push(
      `a v04-derived portrait is wired into ${PAGE} with no in-page verification receipt. ` +
      `File-level crop checks cannot see the alpha mask. Verify at 1440 and 390 that Carli's ` +
      `hair, hand, fingers and elbow sit inside the OPAQUE region, then record a receipt ` +
      `named *IN-PAGE-CROP-VERIFIED*.md in ${EVIDENCE_DIR}/.`
    );
  } else {
    notes.push(`v04 portrait wired, receipt present: ${receipts[0]}`);
  }
} else {
  notes.push('no v04-derived portrait wired yet, gate not armed');
}

// 4. Bio slot. Per DECISION-FOUNDER-BIO-SLOT-GEOMETRY-20260803.md the slot is 4:5 using
//    aspect-ratio, not a height clamp, so a face does not reframe between breakpoints.
const bioWired = /class="[^"]*os-founder-bio/.test(html);
if (bioWired) {
  if (!/\.os-founder-bio\{[^}]*aspect-ratio:\s*4\s*\/\s*5/.test(html)) {
    failures.push(
      `a founder bio slot is present but is not aspect-ratio 4/5. A height clamp makes the ` +
      `container go landscape at desktop and portrait at mobile, which reframes the face and ` +
      `clips Dylan. See _wip/evidence/DECISION-FOUNDER-BIO-SLOT-GEOMETRY-20260803.md.`
    );
  } else {
    notes.push('bio slot present and is aspect-ratio 4/5');
  }
  if (/\.os-founder-bio img\{[^}]*linear-gradient\(90deg/.test(html)) {
    failures.push(
      `the founder bio slot applies a horizontal mask. The decision is vertical-only at both ` +
      `breakpoints, so the edge treatment does not switch between fade and hard cut on a face.`
    );
  }
} else {
  notes.push('no founder bio slot wired yet, bio gate not armed');
}

for (const n of notes) console.log(`ok    ${n}`);
for (const f of failures) console.error(`FAIL  ${f}`);
process.exit(failures.length ? 1 : 0);
