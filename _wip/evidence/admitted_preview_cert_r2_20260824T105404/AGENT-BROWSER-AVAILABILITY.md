# Agent-browser availability

`command -v agent-browser` returned no path on 2026-08-24 AEST. The required quick browser verification therefore uses the installed Playwright runtime with system Google Chrome, matching the established MapleMoon fallback. No assertion is weakened and no result is represented as an `agent-browser` CLI run.
