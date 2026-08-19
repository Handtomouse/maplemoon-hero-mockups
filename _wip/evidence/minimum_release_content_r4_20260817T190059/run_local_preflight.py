#!/usr/bin/env python3
from __future__ import annotations

import functools
import http.server
import subprocess
import sys
import threading
from pathlib import Path

ROOT = Path("/Users/handtomouse/maplemoon-website")
CANDIDATE = ROOT / "_wip/deploy/generated/maplemoon-minimum-release-content-r4-20260817T190059"
OUT = ROOT / "_wip/evidence/minimum_release_content_r4_20260817T190059/preflight.txt"
HANDLER = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(CANDIDATE))

with http.server.ThreadingHTTPServer(("127.0.0.1", 0), HANDLER) as server:
    port = server.server_address[1]
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    result = subprocess.run(
        [
            sys.executable,
            "-B",
            str(ROOT / "scripts/check-maplemoon-minimum-release-preflight-r4.py"),
            f"http://127.0.0.1:{port}",
            "--local",
        ],
        text=True,
        capture_output=True,
    )
    server.shutdown()

OUT.write_text(result.stdout + result.stderr, encoding="utf-8")
sys.stdout.write(result.stdout)
sys.stderr.write(result.stderr)
raise SystemExit(result.returncode)
