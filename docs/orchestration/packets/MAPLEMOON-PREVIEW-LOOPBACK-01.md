# MAPLEMOON-PREVIEW-LOOPBACK-01

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-PREVIEW-LOOPBACK-01",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "restrict the persistent com.maplemoon.preview LaunchAgent to loopback without changing its document root, port, persistence policy or served files",
  "approval": "Nate explicitly approved MAPLEMOON-PREVIEW-LOOPBACK-01 on 2026-08-02.",
  "branch": "codex-maplemoon-section-review",
  "head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
  "ownership": "Main Boss is the sole coordinator and mutating owner for this local service configuration packet.",
  "base": {
    "plist_sha256": "fe5d00f3d394dd15c1563f26421c7996b448a5097e0025575bf5a2176943ff38",
    "service_label": "com.maplemoon.preview",
    "service_state": "running",
    "listener": "*:8788",
    "working_directory": "/Users/handtomouse/Projects/maplemoon/site"
  },
  "readable_paths": [
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "/Users/handtomouse/Library/LaunchAgents/com.maplemoon.preview.plist",
    "/Users/handtomouse/Projects/maplemoon/site"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MAPLEMOON-PREVIEW-LOOPBACK-01.md",
    "docs/orchestration/reviews/MAPLEMOON-PREVIEW-LOOPBACK-01-20260802.json"
  ],
  "external_writable_paths": [
    "/Users/handtomouse/Library/LaunchAgents/com.maplemoon.preview.plist"
  ],
  "verify": [
    "create a timestamped non-overwriting checkpoint containing the exact pre-change plist and writable-path manifest",
    "preserve every plist key and ProgramArgument except adding --bind and 127.0.0.1",
    "plutil validates the patched plist before installation",
    "restart only com.maplemoon.preview in gui/501",
    "launchctl reports the service running with --bind 127.0.0.1",
    "lsof reports port 8788 listening only on 127.0.0.1",
    "localhost HTTP responds while the machine LAN address no longer does",
    "no served file, MapleMoon page, WIP, package, Git ref or external system changes"
  ],
  "stop": [
    "the plist base hash mismatches",
    "the checkpoint is incomplete",
    "any plist key beyond the two loopback arguments would change",
    "the patched plist fails validation",
    "the service cannot restart cleanly",
    "port 8788 remains bound to a wildcard or LAN interface",
    "any served file or project path outside packet governance records would change"
  ],
  "forbidden_actions": [
    "change the document root or port",
    "edit, delete or expose served files",
    "commit, push, deploy, share, send, upload, contact anyone, use commerce or production systems"
  ],
  "next_reviewer": "Main Boss completion gate",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Output

The only operational change is adding `--bind 127.0.0.1` to the existing LaunchAgent and restarting that one local service. The checkpoint is the rollback source.
