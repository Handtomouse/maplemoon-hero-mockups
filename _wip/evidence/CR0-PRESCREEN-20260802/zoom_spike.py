#!/usr/bin/env python3
"""CR-0 A2 feasibility spike: can CDP reproduce literal 200% browser zoom?

Browser zoom at 200% means CSS px render 2x larger, so the LAYOUT viewport in
CSS px halves and devicePixelRatio doubles. If setDeviceMetricsOverride(width=W/2,
deviceScaleFactor=2) reproduces that, the page must genuinely REFLOW - media
queries must re-evaluate against the halved width - not merely render bigger.

Exit 0 = feasible. Exit 2 = not feasible.
"""
import json, subprocess, sys, time, urllib.request, shutil, os
import websocket

PORT = 9333
PROFILE = "/tmp/mm-zoom-spike-profile"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
URL = "http://127.0.0.1:3011/homepage.html"


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

    def send(self, method, params=None):
        self.i += 1
        self.ws.send(json.dumps({"id": self.i, "method": method, "params": params or {}}))
        while True:
            m = json.loads(self.ws.recv())
            if m.get("id") == self.i:
                if "error" in m:
                    raise RuntimeError(f"{method}: {m['error']}")
                return m.get("result", {})

    def ev(self, js):
        r = self.send("Runtime.evaluate",
                      {"expression": js, "returnByValue": True, "awaitPromise": True})
        return r.get("result", {}).get("value")

    def viewport(self, w, h, dpr, mobile=False):
        self.send("Emulation.setDeviceMetricsOverride",
                  {"width": w, "height": h, "deviceScaleFactor": dpr, "mobile": mobile})


PROBE = """(() => {
  const de = document.documentElement;
  return {
    innerWidth: window.innerWidth,
    clientWidth: de.clientWidth,
    dpr: window.devicePixelRatio,
    vvScale: window.visualViewport ? window.visualViewport.scale : null,
    vvWidth: window.visualViewport ? Math.round(window.visualViewport.width) : null,
    mq480: window.matchMedia('(max-width: 480px)').matches,
    mq768: window.matchMedia('(max-width: 768px)').matches,
    mq1024: window.matchMedia('(max-width: 1024px)').matches,
    scrollW: de.scrollWidth,
    bodyFont: getComputedStyle(document.body).fontSize,
    h1Font: (()=>{const h=document.querySelector('h1');return h?getComputedStyle(h).fontSize:null;})(),
    overflowX: de.scrollWidth > de.clientWidth + 1
  };
})()"""

p = launch()
try:
    tgts = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read())
    page = [t for t in tgts if t["type"] == "page"][0]
    ws = websocket.create_connection(page["webSocketDebuggerUrl"], timeout=10)
    c = CDP(ws)
    c.send("Page.enable"); c.send("Runtime.enable")
    c.send("Page.navigate", {"url": URL}); time.sleep(2.5)

    print("=== SPIKE: does CDP reproduce literal 200% browser zoom? ===\n")
    print(f"Target: {URL}\n")

    c.viewport(1440, 900, 1); time.sleep(0.6)
    base = c.ev(PROBE)
    print("BASELINE  1440x900 @100% (dpr=1):")
    for k in ("innerWidth", "clientWidth", "dpr", "mq480", "mq768", "mq1024", "bodyFont", "h1Font", "overflowX"):
        print(f"    {k:11} = {base[k]}")

    # 200% zoom == same physical window, CSS viewport halved, dpr doubled
    c.viewport(720, 450, 2); time.sleep(0.6)
    z = c.ev(PROBE)
    print("\nZOOMED    1440x900 @200% (width halved to 720, dpr=2):")
    for k in ("innerWidth", "clientWidth", "dpr", "mq480", "mq768", "mq1024", "bodyFont", "h1Font", "overflowX"):
        print(f"    {k:11} = {z[k]}")

    print("\n=== VERDICT ===")
    halved = z["clientWidth"] == base["clientWidth"] // 2
    dpr_ok = z["dpr"] == 2
    reflow = (z["mq1024"] != base["mq1024"]) or (z["mq768"] != base["mq768"])
    same_css_font = z["bodyFont"] == base["bodyFont"]

    print(f"  layout viewport halved (1440->720 CSS px) : {halved}")
    print(f"  devicePixelRatio reports 2               : {dpr_ok}")
    print(f"  media queries RE-EVALUATED (genuine reflow): {reflow}"
          f"   [mq1024 {base['mq1024']}->{z['mq1024']}, mq768 {base['mq768']}->{z['mq768']}]")
    print(f"  CSS font-size unchanged (px are same in CSS terms, magnified physically): {same_css_font}")
    print(f"  horizontal overflow at 200%              : {z['overflowX']}  (scrollW {z['scrollW']} vs client {z['clientWidth']})")

    ok = halved and dpr_ok and reflow
    print(f"\n  FEASIBLE: {ok}")
    if ok:
        print("  -> A2 is a mechanical sweep. Zoom is reproducible headless, no focus gate.")
    else:
        print("  -> NOT reproducible this way; literal browser zoom by hand required.")
    sys.exit(0 if ok else 2)
finally:
    p.terminate()
