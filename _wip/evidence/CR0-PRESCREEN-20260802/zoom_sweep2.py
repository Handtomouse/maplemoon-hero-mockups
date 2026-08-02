#!/usr/bin/env python3
"""CR-0 A2: literal 200% browser zoom pre-screen across the frozen six pages.

200% zoom == same physical window, CSS layout viewport halved, deviceScaleFactor 2.
Equivalence verified by zoom_spike.py: media queries re-evaluate, so the page
genuinely reflows rather than merely rendering larger.

HARD LOAD GUARD: every page must prove it actually loaded (real URL, real title,
control count sane) before it is audited. A prior run silently audited Chrome's
error page as "clean"; that must be impossible.

PRE-SCREEN ONLY. Records no verdict. CR-0 is Nate's alone.
"""
import json, subprocess, sys, time, urllib.request, shutil, os
import websocket

PORT = 9336
PROFILE = "/tmp/mm-zoom-sweep2"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PAGES = ["homepage", "shop", "our-story", "carob-story", "stockists", "faq"]
W, H, DPR = 720, 450, 2          # desktop 1440x900 viewed at 200%


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


AUDIT = r"""(() => {
  const de=document.documentElement, vw=de.clientWidth;
  const SEL='a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"]),summary';
  const vis=el=>el.getClientRects().length>0 && getComputedStyle(el).visibility!=='hidden'
              && !el.closest('[inert],[aria-hidden="true"]');
  const ctrls=Array.from(document.querySelectorAll(SEL)).filter(vis);

  const outside=[];
  Array.from(document.body.querySelectorAll('*')).forEach(el=>{
    if(!vis(el)) return;
    if(getComputedStyle(el).position==='fixed') return;
    const r=el.getBoundingClientRect();
    if(r.width===0) return;
    if(r.right>vw+1||r.left<-1) outside.push({tag:el.tagName,
      cls:String(el.className||'').slice(0,40), left:Math.round(r.left),
      right:Math.round(r.right), txt:(el.textContent||'').replace(/\s+/g,' ').trim().slice(0,40)});
  });

  const clipped=[];
  Array.from(document.querySelectorAll('h1,h2,h3,h4,p,li,td,th,button,a')).forEach(el=>{
    if(!vis(el)) return;
    const cs=getComputedStyle(el);
    if(!/hidden|clip/.test(cs.overflowX+cs.overflowY)) return;
    if(el.scrollWidth>el.clientWidth+2||el.scrollHeight>el.clientHeight+2){
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(t) clipped.push({tag:el.tagName,cls:String(el.className||'').slice(0,36),
        sw:el.scrollWidth,cw:el.clientWidth,sh:el.scrollHeight,ch:el.clientHeight,txt:t.slice(0,44)});
    }
  });

  const small=ctrls.filter(el=>{const r=el.getBoundingClientRect();
      return r.width>0&&r.height>0&&(r.width<24||r.height<24);})
    .map(el=>{const r=el.getBoundingClientRect();
      return {tag:el.tagName,w:Math.round(r.width),h:Math.round(r.height),
        label:(el.getAttribute('aria-label')||el.textContent||'').replace(/\s+/g,' ').trim().slice(0,34)};});

  let fixedH=0; const fixed=[];
  Array.from(document.querySelectorAll('*')).forEach(el=>{
    if(!vis(el)) return;
    if(getComputedStyle(el).position!=='fixed') return;
    const r=el.getBoundingClientRect();
    if(r.height>0&&r.width>vw*0.5&&r.top<de.clientHeight){fixedH+=r.height;
      fixed.push({tag:el.tagName,cls:String(el.className||'').slice(0,30),h:Math.round(r.height)});}
  });

  return {loadedUrl:location.href, title:document.title,
    viewportCss:vw, viewportH:de.clientHeight, scrollWidth:de.scrollWidth,
    horizontalScroll:de.scrollWidth>vw+1, controls:ctrls.length,
    outsideViewport:outside.slice(0,8), outsideCount:outside.length,
    clippedText:clipped.slice(0,8), clippedCount:clipped.length,
    smallTargets:small.slice(0,8), smallCount:small.length,
    fixedChromeHeight:Math.round(fixedH), fixedChromePct:Math.round(fixedH/de.clientHeight*100),
    fixedChrome:fixed};
})()"""

p = launch()
out, failed = {}, []
try:
    tg = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read())
    pg = [t for t in tg if t["type"] == "page"][0]
    ws = websocket.create_connection(pg["webSocketDebuggerUrl"], timeout=10)
    c = CDP(ws)
    c.send("Page.enable"); c.send("Runtime.enable")

    for slug in PAGES:
        url = f"http://127.0.0.1:3011/{slug}.html"
        c.send("Emulation.setDeviceMetricsOverride",
               {"width": W, "height": H, "deviceScaleFactor": DPR, "mobile": False})
        c.send("Page.navigate", {"url": url})
        time.sleep(2.4)
        c.ev("window.scrollTo(0,0)")
        a = c.ev(AUDIT)

        # HARD LOAD GUARD
        bad = []
        if not a["loadedUrl"].endswith(f"{slug}.html"): bad.append(f"url={a['loadedUrl']}")
        if "chrome-error" in a["loadedUrl"]:            bad.append("chrome error page")
        if a["controls"] < 8:                           bad.append(f"only {a['controls']} controls")
        if bad:
            failed.append((slug, bad)); print(f"{slug:<13} LOAD FAILED -> {'; '.join(bad)}")
            continue

        out[slug] = a
        flags = []
        if a["horizontalScroll"]: flags.append(f"H-SCROLL sw={a['scrollWidth']}>{a['viewportCss']}")
        if a["outsideCount"]:     flags.append(f"outside×{a['outsideCount']}")
        if a["clippedCount"]:     flags.append(f"clipped×{a['clippedCount']}")
        if a["smallCount"]:       flags.append(f"small-target×{a['smallCount']}")
        if a["fixedChromePct"] > 30: flags.append(f"fixed-chrome {a['fixedChromePct']}%")
        print(f"{slug:<13} ctrls={a['controls']:<3} " + ("  ".join(flags) if flags else "CLEAN"))

    json.dump({"pages": out, "load_failures": failed},
              open("/Users/handtomouse/.claude/jobs/ae554412/tmp/zoom_sweep.json", "w"), indent=1)
    print(f"\naudited {len(out)}/{len(PAGES)} pages; load failures: {len(failed)}")
    sys.exit(2 if failed else 0)
finally:
    p.terminate()
