# Packet MAPLEMOON-CARLI-PREVIEW-DEPLOY-COPY-PREP-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CARLI-PREVIEW-DEPLOY-COPY-PREP-20260803",
  "candidate_id": "MAPLEMOON-CARLI-PREVIEW-DEPLOY-COPY-PREP-20260803-001",
  "worker_thread_id": "019fc42c-03b0-7d91-8c25-d127fbbc73e9",
  "state": "proposed",
  "requires_visual_evidence": true,
  "objective": "Record the exact inputs and safety checks for a future isolated Carli work-in-progress deploy copy. This planning packet creates no copy, does not invoke Vercel and does not expose a URL.",
  "readable_paths": [
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json",
    "_wip/deploy/vercel-preview.json",
    "_wip/deploy/README.md",
    "assets/licensed/carob_pods_macro.jpg",
    "assets/licensed/scene_after_dinner.jpg",
    "assets/licensed/scene_afternoon.jpg",
    "assets/licensed/scene_tea_night.jpg",
    "assets/licensed/carob_farm/australian-carob-0205.jpg",
    "assets/licensed/carob_farm/australian-carob-0205-16x9.jpg",
    "assets/licensed/carob_farm/australian-carob-0205-mobile.jpg"
  ],
  "writable_paths": [],
  "future_copy_scope": {
    "destination": "_wip/deploy/site",
    "source": "docs/client-review/2026-08-01-saturday-review/staging-v1/clean",
    "config_template": "_wip/deploy/vercel-preview.json",
    "excluded_from_copy": ["MANIFEST.json", ".vercel/only-if-already-present-and-verified"],
    "required_predeploy_proofs": [
      "Destination top level contains only six page HTML files, shared CSS/JS, assets and a stripped valid vercel.json.",
      "No _wip, docs, orchestration, checkpoint, manifest or local absolute-path content is deployable from the isolated copy.",
      "The seven named licensed derivatives replace only matching copied asset paths and retain verified framing.",
      "Every route and asset is checked on the actual hosted URL; an SSO redirect is a HOLD, not a passing 200."
    ]
  },
  "known_external_gate": {
    "preview_url_status": "SSO-walled on this Vercel account",
    "public_work_in_progress_link": "requires an explicitly approved production-alias deployment after local copy and live URL checks pass",
    "authorization": "not granted by this planning packet"
  },
  "verify": [
    "The frozen source package is never rebuilt or modified by this packet.",
    "No deploy-copy destination currently exists and no Vercel command, external request, credential access or URL share is performed.",
    "The future packet defines every exact copy/output/check path, recovery checkpoint and irreversible approval boundary before creating _wip/deploy/site."
  ],
  "stop": [
    "Any use of repo-root vercel.json, which has outputDirectory dot and would expose internal content.",
    "Any in-place edit of the frozen clean package or its manifests.",
    "Any copy, build, deploy, public URL, send, upload, Vercel command, credential use, commit, push, commerce or production action without a new ready packet and Nate's explicit approval."
  ],
  "next_reviewer": "Main coordinator 019fa858-05c9-7631-b26e-8f5cbbf1387a"
}
<!-- CONTROL-PLANE:END -->
