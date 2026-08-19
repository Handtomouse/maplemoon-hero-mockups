#!/bin/zsh
set -u

ROOT="/Users/handtomouse/maplemoon-website"
CANDIDATE="$ROOT/_wip/deploy/generated/maplemoon-minimum-release-content-r4-20260817T190059"
OUT="$ROOT/_wip/evidence/minimum_release_content_r4_20260817T190059/preflight.txt"
SERVER_LOG="$ROOT/_wip/evidence/minimum_release_content_r4_20260817T190059/preflight-server.log"

python3 -m http.server 4335 --bind 127.0.0.1 --directory "$CANDIDATE" >"$SERVER_LOG" 2>&1 &
mm_server_pid=$!
trap 'kill "$mm_server_pid" 2>/dev/null || true; wait "$mm_server_pid" 2>/dev/null || true' EXIT

for attempt in 1 2 3 4 5; do
  curl -fsS http://127.0.0.1:4335/homepage >/dev/null 2>&1 && break
  sleep 1
done

python3 -B "$ROOT/scripts/check-maplemoon-minimum-release-preflight-r4.py" http://127.0.0.1:4335 --local | tee "$OUT"
exit ${pipestatus[1]}
