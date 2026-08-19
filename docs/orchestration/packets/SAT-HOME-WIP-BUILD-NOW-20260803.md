# SAT-HOME-WIP-BUILD-NOW-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "SAT-HOME-WIP-BUILD-NOW-20260803",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "apply only the BUILD NOW Homepage fixes recorded in CODEX-PACKET-REQUEST-HOMEPAGE-FIXES-20260803 to the canonical Homepage WIP, leaving staging-v1 and the other five page lanes untouched for one combined rebuild at the end",
  "approval": "Nate explicitly directed Main to read CODEX-PACKET-REQUEST-HOMEPAGE-FIXES-20260803, admit its BUILD NOW section only, edit only _wip/homepage_real_1_lead_photo.WIP.html, keep clean/MANIFEST.json at d1c66b1d, and defer the staging rebuild until all six page reviews join the batch.",
  "branch": "codex-maplemoon-section-review",
  "head": "a4c8cba2b3695c617ae74da57e81f3b8de4ea914",
  "ownership": "Main is the sole writer for this exact Homepage WIP packet; LOCK_MANIFEST.json has no non-released lock. The five other page review lanes remain separate and untouched.",
  "base": {
    "authority_sha256": {
      "_wip/evidence/CODEX-PACKET-REQUEST-HOMEPAGE-FIXES-20260803.md": "54e9b03dfcb72abb0b733c23ccbe90381e70c06af111409fa1283865828a23dd"
    },
    "wip_sha256": {
      "_wip/homepage_real_1_lead_photo.WIP.html": "2117f3364e61af5272178ec7bee6068afc03c5181ecee3b9fc8c67526acde4d4"
    },
    "frozen_generated_sha256": {
      "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20"
    }
  },
  "readable_paths": [
    "_wip/evidence/CODEX-PACKET-REQUEST-HOMEPAGE-FIXES-20260803.md",
    "_wip/evidence/NATE-HOMEPAGE-REVIEW-20260803.md",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json"
  ],
  "writable_paths": [
    "docs/orchestration/packets/SAT-HOME-WIP-BUILD-NOW-20260803.md",
    "docs/orchestration/reviews/SAT-HOME-WIP-BUILD-NOW-20260803.json",
    "_wip/homepage_real_1_lead_photo.WIP.html"
  ],
  "source_resolution": [
    "H1 blur and feather the visible hard edge on the semi-opaque dark plate behind the CAROB wordmark without adding a new box",
    "H2 move the credential pill above Shop the Range so the CTA is last",
    "H3 increase credential-pill text slightly without increasing the pill dimensions",
    "C1 align the desktop Carob copy to the 158px page grid while keeping max-width 900px and max-width 600px layout metrics unchanged",
    "S1 measure the Our Story eyebrow contrast and, only because the measured ratio is below 4.5:1, raise it to AA and report the before and after ratios",
    "S2 make the bottom orchard transition use the same soft fade treatment as the top",
    "SA1 arrange the six existing sampler bar photos in one line without replacing imagery",
    "RT2 soften the three existing ritual image cards through curvature and image integration only"
  ],
  "excluded": [
    "RT1 whole-page seam work",
    "R2 and R3 fog or mist experiments",
    "R1 new category icons",
    "R4, R5 and R6 product-image replacements",
    "C2 callout-pod removal or restyling",
    "S3 new CTA copy",
    "S4 new origin copy",
    "any staging-v1 build, generated page or manifest mutation",
    "any change to another canonical WIP page"
  ],
  "verify": [
    "phase-start receipt gate passes against a timestamped non-overwriting checkpoint before the Homepage WIP edit",
    "the only website/source content path changed is _wip/homepage_real_1_lead_photo.WIP.html",
    "the Homepage remains valid parseable HTML with at least eight sections",
    "rendered WIP review passes at 1440px and 390px after images load and a top-to-bottom review",
    "Carob layout at 900px and 600px is byte-independent and geometrically unchanged from the captured pre-edit baselines",
    "hero order is credential pill then Shop the Range CTA, and the credential pill dimensions do not grow at 1440px or 390px",
    "Our Story eyebrow contrast is at least 4.5:1 with measured pre/post evidence",
    "all six sampler bar images remain present in one row at desktop",
    "staging-v1 clean/MANIFEST.json remains d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
    "CR-0 through CR-4 and NATE-HOME-001 remain Nate-owned and are not recorded by this packet"
  ],
  "stop": [
    "the Homepage WIP or clean manifest base hash changes before mutation",
    "the checkpoint or phase-start gate is missing or fails",
    "another active owner controls the Homepage WIP",
    "a requested result requires excluded work, unsupported copy, another page, a staging rebuild or a generated-package change",
    "responsive, rendered, structural, scope or manifest verification fails",
    "commit, push, deploy, publish, upload, share, send, commerce or production action is requested"
  ],
  "forbidden_actions": [
    "edit any path outside writable_paths",
    "run the staging-v1 builder or mutate staging-v1",
    "mark Nate-owned review gates",
    "invent product, process, origin or commerce facts",
    "commit, push, deploy, publish, upload, share, send or contact anyone"
  ],
  "next_reviewer": "Main WIP verification; final six-page rebuild remains deferred until all page-review packets join the batch",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Output

This packet authorizes only the listed BUILD NOW changes in the canonical Homepage WIP. It does not authorize staging regeneration, promotion, external sharing, or completion of Nate-owned review gates.
