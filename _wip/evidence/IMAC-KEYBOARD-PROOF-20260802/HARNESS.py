#!/usr/bin/env /tmp/mm-venv/bin/python
"""
MAPLEMOON-KEYBOARD-PROOF-20260802 harness — iMac worker.

Real OS-level Tab keystrokes via osascript System Events (WindowServer).
Focus state reads via Chrome DevTools Protocol (CDP). CDP is read-only for
input; keys are OS-level, never synthesized.

Per-page:
  activate isolated Chrome → assert hasFocus → key code 48 (Tab) → read
  activeElement descriptor via CDP → append to ordered stop list.

Failure-mode defence (what the prior run lacked):
  - Re-activate Chrome before every Tab (WindowServer settle 50ms)
  - Assert document.hasFocus() after every Tab
  - Abort on 3 consecutive BODY→BODY (focus delivery failure)
  - Screenshot at t=0 as evidence Chrome was frontmost
  - Emulation.setDeviceMetricsOverride to 390x667 mobile viewport via CDP

Usage:
  HARNESS.py --page <slug> --port 9223 --server 3011 [--press-budget N]
"""

import argparse, json, subprocess, sys, time, urllib.request, hashlib
from pathlib import Path
import websocket  # from /tmp/mm-venv

EVIDENCE_DIR = Path(__file__).parent
OUTPUT_DIR = EVIDENCE_DIR / "raw"
OUTPUT_DIR.mkdir(exist_ok=True)

PAGE_BUDGETS = {
    "our-story": 60,
    "carob-story": 50,
    "stockists": 90,
    "faq": 90,
    "shop": 130,
}


def run(cmd, check=True, capture=True):
    """Thin subprocess wrapper."""
    r = subprocess.run(cmd, shell=isinstance(cmd, str),
                       capture_output=capture, text=True)
    if check and r.returncode != 0:
        raise RuntimeError(f"cmd failed: {cmd}\nstderr={r.stderr}")
    return r


def osa_activate_chrome_pid(pid):
    # Activate a SPECIFIC Chrome process by its unix id. Osascript
    # `activate application "Google Chrome"` and
    # `first process whose name is "Google Chrome"` are ambiguous when
    # two Chrome instances share the bundle — they typically hit the
    # older/main one. Targeting by unix id is unambiguous.
    script = f'tell application "System Events" to set frontmost of (first process whose unix id is {pid}) to true'
    run(['osascript', '-e', script])


def osa_key_tab():
    # Bare Tab keystroke via WindowServer. Frontmost window receives it.
    # Prerequisite: caller has already ensured isolated Chrome is frontmost.
    run(['osascript', '-e',
         'tell application "System Events" to key code 48'])


def cdp_targets(port):
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as r:
        return json.loads(r.read())


def cdp_connect(target_ws_url):
    ws = websocket.create_connection(target_ws_url, timeout=10)
    return ws


class CDP:
    def __init__(self, ws):
        self.ws = ws
        self.msg_id = 0

    def send(self, method, params=None):
        self.msg_id += 1
        payload = {"id": self.msg_id, "method": method,
                   "params": params or {}}
        self.ws.send(json.dumps(payload))
        while True:
            raw = self.ws.recv()
            msg = json.loads(raw)
            if msg.get("id") == self.msg_id:
                if "error" in msg:
                    raise RuntimeError(f"CDP error: {msg['error']}")
                return msg.get("result", {})

    def eval(self, js):
        # NOTE: method name shadows Python builtin — safe. This is a thin
        # wrapper for CDP Runtime.evaluate, running JS INSIDE the target
        # Chrome page for read-only DOM introspection (fixed JS strings,
        # no user input). Not related to the Python builtin eval().
        r = self.send("Runtime.evaluate",
                      {"expression": js, "returnByValue": True,
                       "awaitPromise": False})
        result = r.get("result", {})
        if result.get("subtype") == "error":
            raise RuntimeError(f"JS error: {result.get('description')}")
        return result.get("value")

    def navigate(self, url):
        self.send("Page.enable")
        self.send("Page.navigate", {"url": url})

    def bring_to_front(self):
        # Chrome-level activate — brings THIS specific target's window to
        # front, unambiguous even when multiple Chrome instances share the
        # bundle id. Solves the two-Chromes ambiguity of osascript activate.
        try:
            self.send("Page.bringToFront")
        except Exception:
            pass

    def set_viewport(self, w, h, dpr=2, mobile=True):
        self.send("Emulation.setDeviceMetricsOverride",
                  {"width": w, "height": h,
                   "deviceScaleFactor": dpr,
                   "mobile": mobile})

    def screenshot(self, path):
        r = self.send("Page.captureScreenshot", {"format": "png"})
        import base64
        Path(path).write_bytes(base64.b64decode(r["data"]))


DESCRIPTOR_JS = r"""
(function() {
  var el = document.activeElement;
  if (!el || el === document.body) {
    return {tag: (el && el.tagName) || "NULL", body: !el || el === document.body,
            label: "", w: 0, h: 0, in_closed_dialog: false, id: "", classes: ""};
  }
  var rect = el.getBoundingClientRect();
  // accessible name: aria-label > aria-labelledby > textContent > alt > title > value
  function accName(e) {
    if (e.getAttribute("aria-label")) return e.getAttribute("aria-label").trim();
    var lb = e.getAttribute("aria-labelledby");
    if (lb) {
      var t = lb.split(/\s+/).map(id => (document.getElementById(id) || {}).textContent || "").join(" ").trim();
      if (t) return t;
    }
    if (e.tagName === "IMG" && e.alt) return e.alt.trim();
    if (e.getAttribute("title")) return e.getAttribute("title").trim();
    if (e.tagName === "INPUT" && e.type === "submit") return (e.value || "").trim();
    var t = (e.textContent || "").replace(/\s+/g, " ").trim();
    return t.slice(0, 120);
  }
  // detect closed-dialog ancestor
  var inClosed = false;
  var p = el;
  while (p && p !== document.body) {
    if (p.tagName === "DIALOG" && !p.open) { inClosed = true; break; }
    if (p.hasAttribute && p.hasAttribute("aria-hidden") && p.getAttribute("aria-hidden") === "true") { inClosed = true; break; }
    if (p.hasAttribute && p.hasAttribute("inert")) { inClosed = true; break; }
    p = p.parentElement;
  }
  return {
    tag: el.tagName,
    body: false,
    label: accName(el),
    w: rect.width, h: rect.height,
    in_closed_dialog: inClosed,
    id: el.id || "",
    classes: (typeof el.className === "string" ? el.className : "").slice(0, 160)
  };
})()
"""

DIALOG_STATE_JS = r"""
(function() {
  var d = document.getElementById("mmCartDialog");
  if (!d) return {present: false};
  return {
    present: true,
    open: !!d.open,
    inert: d.hasAttribute("inert"),
    aria_hidden: d.getAttribute("aria-hidden"),
    focusable_inside: d.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])").length
  };
})()
"""


def signature(stop):
    return f"{stop.get('tag')}|{stop.get('label','')}|{stop.get('id','')}"


def run_page(page_slug, port, server_port, press_budget=None):
    press_budget = press_budget or PAGE_BUDGETS[page_slug]
    url = f"http://127.0.0.1:{server_port}/{page_slug}.html"
    print(f"[{page_slug}] budget={press_budget} url={url}", flush=True)

    # 1. Find or create target tab
    targets = cdp_targets(port)
    page_targets = [t for t in targets if t.get("type") == "page"]
    if not page_targets:
        raise RuntimeError("No page targets in isolated Chrome")
    tgt = page_targets[0]
    ws = cdp_connect(tgt["webSocketDebuggerUrl"])
    cdp = CDP(ws)

    # 2. Set viewport BEFORE navigate so first paint is emulated
    cdp.set_viewport(390, 667, dpr=2, mobile=True)
    cdp.navigate(url)

    # 3. Wait for DOM ready
    for _ in range(60):
        time.sleep(0.2)
        try:
            rs = cdp.eval("document.readyState")
            if rs == "complete":
                break
        except Exception:
            pass

    # 4. Screenshot at t=0 (evidence of frontmost + viewport)
    cdp.bring_to_front()   # Chrome-level activate for THIS target
    time.sleep(0.5)
    shot_path = OUTPUT_DIR / f"screenshot_{page_slug}_t0.png"
    cdp.screenshot(shot_path)

    # 5. Focus BODY explicitly to start from a clean baseline
    cdp.eval("(function(){document.body.focus(); return true;})()")

    dialog_before = cdp.eval(DIALOG_STATE_JS)

    hasFocus_start = cdp.eval("document.hasFocus()")

    stops = []
    signatures = set()
    consecutive_body = 0
    focus_lost_at = None
    wrapped_at = None
    first_stop_sig = None

    for i in range(press_budget):
        # Chrome-level activate for THIS specific target's window.
        # This is the unambiguous frontmost-mover (works even with
        # two Chrome instances of the same bundle id).
        cdp.bring_to_front()
        time.sleep(0.06)
        hf = cdp.eval("document.hasFocus()")
        if not hf:
            # Retry once with a longer settle
            cdp.bring_to_front()
            time.sleep(0.25)
            hf = cdp.eval("document.hasFocus()")
            if not hf:
                focus_lost_at = i
                break
        # Now the isolated Chrome is frontmost — send the OS-level Tab
        osa_key_tab()
        time.sleep(0.06)
        stop = cdp.eval(DESCRIPTOR_JS)
        stop["i"] = i + 1
        stops.append(stop)

        if stop.get("body"):
            consecutive_body += 1
            if consecutive_body >= 3:
                # Focus delivery failure — real defence
                break
        else:
            consecutive_body = 0

        sig = signature(stop)
        if i == 0:
            first_stop_sig = sig
        elif sig == first_stop_sig and i > 5:
            wrapped_at = i + 1
            break

        signatures.add(sig)

    dialog_after = cdp.eval(DIALOG_STATE_JS)
    hasFocus_end = cdp.eval("document.hasFocus()")

    unique = len(signatures)
    zero_size = sum(1 for s in stops if not s.get("body") and (s.get("w", 0) == 0 or s.get("h", 0) == 0))
    leak = sum(1 for s in stops if s.get("in_closed_dialog"))

    result = {
        "page": page_slug,
        "url": url,
        "captured_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "tab_presses": len(stops),
        "press_budget": press_budget,
        "focus_stops": len(stops),
        "unique_controls": unique,
        "first_stop": stops[0]["label"] if stops else None,
        "wrapped_at": wrapped_at,
        "focus_lost_at": focus_lost_at,
        "document_hasFocus_start": hasFocus_start,
        "document_hasFocus_end": hasFocus_end,
        "zero_size_focus_stops": zero_size,
        "focus_leak_into_closed_cart_dialog": leak,
        "closed_dialog_before": dialog_before,
        "closed_dialog_after": dialog_after,
        "screenshot": shot_path.name,
        "ordered_stops": stops,
    }

    # Validity classification
    if focus_lost_at is not None or hasFocus_start is False or len(stops) == 0:
        result["traversal"] = "UNVERIFIED"
        result["reason"] = f"focus_lost_at={focus_lost_at} hasFocus_start={hasFocus_start} stops={len(stops)}"
    elif consecutive_body >= 3:
        result["traversal"] = "UNVERIFIED"
        result["reason"] = "3+ consecutive BODY→BODY (focus delivery failed mid-run)"
    else:
        result["traversal"] = "VALID"

    out_path = OUTPUT_DIR / f"page_{page_slug}.json"
    out_path.write_text(json.dumps(result, indent=2))
    print(f"[{page_slug}] {result['traversal']} stops={len(stops)} unique={unique} wrap={wrapped_at} focus_lost={focus_lost_at}", flush=True)

    ws.close()
    return result


def hide_terminal(name="ghostty"):
    # Remove the terminal from frontmost competition. macOS System Events
    # 'visible' toggle hides the app's windows without quitting it.
    script = f'tell application "System Events" to set visible of (first process whose name is "{name}") to false'
    try:
        run(['osascript', '-e', script])
    except Exception as e:
        print(f"WARN: hide_terminal({name}) failed: {e}", flush=True)


def unhide_terminal(name="ghostty"):
    script = f'tell application "System Events" to set visible of (first process whose name is "{name}") to true'
    try:
        run(['osascript', '-e', script])
    except Exception as e:
        print(f"WARN: unhide_terminal({name}) failed: {e}", flush=True)


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--page", help="single page slug")
    p.add_argument("--pages", help="comma-separated list of page slugs (batch mode)")
    p.add_argument("--port", type=int, default=9223, help="CDP port")
    p.add_argument("--server", type=int, default=3011, help="loopback server port")
    p.add_argument("--press-budget", type=int, default=None)
    p.add_argument("--hide-terminal", default="ghostty",
                   help="Process name to hide during run (default ghostty); pass empty string to skip")
    args = p.parse_args()

    slugs = []
    if args.pages:
        slugs = [s.strip() for s in args.pages.split(",") if s.strip()]
    elif args.page:
        slugs = [args.page]
    else:
        p.error("provide --page or --pages")

    if args.hide_terminal:
        hide_terminal(args.hide_terminal)
    try:
        for slug in slugs:
            run_page(slug, args.port, args.server, args.press_budget)
    finally:
        if args.hide_terminal:
            unhide_terminal(args.hide_terminal)
