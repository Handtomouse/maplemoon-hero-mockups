#!/usr/bin/env python3
"""Desktop-width horizontal-inset sweep across the frozen six pages.

WHY THIS EXISTS
All prior CR-0 evidence was captured at <=720px layout width (keyboard at 390,
zoom pre-screen at 720). Both sit BELOW the 900px breakpoint, so neither could
observe the >900px rendering. The carob defect (ms49rup1d3dn) lives entirely
above 900px, caused by a TOP-LEVEL `.wf-what1 .inner{padding:0}` that the
max-width:900px rules override on mobile but not on desktop.

That is a cascade PATTERN, not a one-off, so this sweep looks for the same
signature in every section of every page.

METHOD
For each section, measure the minimum left edge of its visible text-bearing
descendants. A section whose text starts at ~0px is flush against the viewport
edge. Run at 1440 (defect expected) and 390 (known-good control) so the
desktop-only signature is demonstrated rather than assumed.

HARD LOAD GUARD: a prior run silently audited Chrome's error page as "clean".
Every page must prove it loaded before it is measured.

PRE-SCREEN ONLY. Records no verdict. CR-0 is Nate's alone.
"""
import json, subprocess, sys, time, urllib.request, shutil, os
import websocket

PORT = 9341
PROFILE = "/tmp/mm-desktop-sweep"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PAGES = ["homepage", "shop", "our-story", "carob-story", "stockists", "faq"]
BASE = "http://127.0.0.1:3011"
WIDTHS = [(1440, 900), (390, 667)]
FLUSH_THRESHOLD = 24          # px: text starting closer than this to the edge


def launch():
    shutil.rmtree(PROFILE, ignore_errors=True)
    os.makedirs(PROFILE, exist_ok=True)
    p = subprocess.Popen([
        CHROME, "--headless=new", f"--remote-debugging-port={PORT}",
        f"--user-data-dir={PROFILE}", "--no-first-run", "--no-default-browser-check",
        "--disable-extensions", "--remote-allow-origins=*", "about:blank",
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(40):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=1).read()
            return p
        except Exception:
            time.sleep(0.25)
    raise SystemExit("chrome did not expose CDP")


class CDP:
    def __init__(self, ws):
        self.ws, self.i = ws, 0

    def send(self, m, pr=None):
        self.i += 1
        self.ws.send(json.dumps({"id": self.i, "method": m, "params": pr or {}}))
        while True:
            r = json.loads(self.ws.recv())
            if r.get("id") == self.i:
                if "error" in r:
                    raise RuntimeError(f"{m}: {r['error']}")
                return r.get("result", {})

    def ev(self, js):
        r = self.send("Runtime.evaluate",
                      {"expression": js, "returnByValue": True, "awaitPromise": True})
        return r.get("result", {}).get("value")


MEASURE = """
(() => {
  const vw = document.documentElement.clientWidth;
  const secs = Array.from(document.querySelectorAll('section'))
    .filter(s => !s.closest('[inert],[aria-hidden="true"]'));
  const out = [];
  for (const s of secs) {
    const r = s.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // visible text-bearing descendants
    const els = Array.from(s.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,span,a,button'))
      .filter(e => {
        const cs = getComputedStyle(e);
        if (cs.display === 'none' || cs.visibility === 'hidden') return false;
        if (e.closest('[inert],[aria-hidden="true"]')) return false;
        const t = (e.textContent || '').trim();
        if (t.length < 2) return false;
        const b = e.getBoundingClientRect();
        return b.width > 0 && b.height > 0;
      });
    if (!els.length) continue;
    let minLeft = Infinity, who = null;
    for (const e of els) {
      const b = e.getBoundingClientRect();
      if (b.left < minLeft) { minLeft = b.left; who = e; }
    }
    const inner = s.querySelector('.inner');
    out.push({
      id: s.id || '', cls: (s.className || '').toString().split(' ')[0],
      sectionLeft: Math.round(r.left), sectionWidth: Math.round(r.width),
      textLeft: Math.round(minLeft),
      sample: (who.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 44),
      innerPaddingLeft: inner ? getComputedStyle(inner).paddingLeft : null
    });
  }
  return { vw, sections: out };
})()
"""


def main():
    proc = launch()
    try:
        tgt = json.loads(urllib.request.urlopen(
            f"http://127.0.0.1:{PORT}/json/list", timeout=5).read())
        ws_url = [t for t in tgt if t["type"] == "page"][0]["webSocketDebuggerUrl"]
        ws = websocket.create_connection(ws_url, timeout=25)
        c = CDP(ws)
        c.send("Page.enable"); c.send("Runtime.enable")

        results = {}
        for (W, H) in WIDTHS:
            results[W] = {}
            c.send("Emulation.setDeviceMetricsOverride",
                   {"width": W, "height": H, "deviceScaleFactor": 1, "mobile": False})
            for slug in PAGES:
                url = f"{BASE}/{slug}.html"
                c.send("Page.navigate", {"url": url})
                time.sleep(1.4)
                # HARD LOAD GUARD
                guard = c.ev("({u:location.href,t:document.title,"
                             "n:document.querySelectorAll('section').length})")
                if (not guard or slug not in guard["u"]
                        or guard["n"] < 1 or "rror" in (guard["t"] or "")):
                    results[W][slug] = {"LOAD_FAILED": guard}
                    continue
                results[W][slug] = c.ev(MEASURE)
        ws.close()
    finally:
        proc.terminate()

    # ---- report -------------------------------------------------------
    flagged = []
    for W in results:
        print(f"\n{'='*68}\nVIEWPORT {W}px\n{'='*68}")
        for slug, data in results[W].items():
            if "LOAD_FAILED" in data:
                print(f"  {slug}: LOAD FAILED -> {data['LOAD_FAILED']}"); continue
            print(f"\n  {slug}  (layout vw={data['vw']})")
            for s in data["sections"]:
                mark = ""
                if s["textLeft"] < FLUSH_THRESHOLD:
                    mark = "   <== FLUSH LEFT"
                    flagged.append((W, slug, s))
                ident = f"#{s['id']}" if s["id"] else f".{s['cls']}"
                print(f"    {ident:<22} textLeft={s['textLeft']:>5}  "
                      f"pad={str(s['innerPaddingLeft']):>7}  {s['sample'][:34]}{mark}")

    print(f"\n{'='*68}\nFLAGGED (text within {FLUSH_THRESHOLD}px of viewport edge)\n{'='*68}")
    if not flagged:
        print("  none")
    for W, slug, s in flagged:
        ident = f"#{s['id']}" if s["id"] else f".{s['cls']}"
        print(f"  {W}px  {slug:<12} {ident:<22} textLeft={s['textLeft']}  {s['sample'][:40]}")

    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sweep.json")
    with open(out, "w") as f:
        json.dump({"widths": WIDTHS, "threshold": FLUSH_THRESHOLD,
                   "results": {str(k): v for k, v in results.items()}}, f, indent=1)
    print(f"\nwrote {out}")


if __name__ == "__main__":
    main()
