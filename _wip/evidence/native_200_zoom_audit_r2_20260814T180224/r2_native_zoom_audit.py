#!/usr/bin/env python3
"""Evidence-only native Chrome default-zoom audit for MapleMoon R2.

This harness uses three isolated profiles and Chromium's persisted default page
zoom preference. It deliberately rejects every CDP Emulation.* and Input.*
method and sends no OS/UI input.
"""

from __future__ import annotations

import base64
import hashlib
import json
import math
import os
import pathlib
import shutil
import struct
import subprocess
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from typing import Any

import websocket


PACKET = "MAPLEMOON-NATIVE-200-ZOOM-AUDIT-R2-20260814T180224"
ROOT = pathlib.Path("/Users/handtomouse")
REPO = ROOT / "maplemoon-website"
CANDIDATE = ROOT / "maplemoon_build_20260813"
OUT = REPO / "_wip/evidence/native_200_zoom_audit_r2_20260814T180224"
SHOTS = OUT / "screenshots"
CHROME = pathlib.Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
SERVER_PORT = 4422
ORIGIN = f"http://127.0.0.1:{SERVER_PORT}"
ROUTES = [
    "homepage.html",
    "our-story.html",
    "carob-story.html",
    "shop.html",
    "faq.html",
    "stockists.html",
    "pure-carob-bar.html",
]
LEVELS = {
    "100": 0.0,
    "175": 3.069389038663465,
    "200": 3.8017840169239308,
}
PORTS = {"100": 9350, "175": 9351, "200": 9352}
PROFILES = {
    label: pathlib.Path(f"/tmp/maplemoon-native-zoom-r2-20260814T180224-{label}")
    for label in LEVELS
}
EXPECTED_HASHES = {
    CANDIDATE / "homepage.html": "27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1",
    CANDIDATE / "our-story.html": "2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711",
    CANDIDATE / "carob-story.html": "4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd",
    CANDIDATE / "shop.html": "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    CANDIDATE / "faq.html": "c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e",
    CANDIDATE / "stockists.html": "4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887",
    CANDIDATE / "pure-carob-bar.html": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
    CANDIDATE / "assets/design-system/mm-chrome.js": "063fe11d5f5ed5d90c724868f1ffb8f3536aed73cc2f7fb9bc6e4791eb192d18",
    CANDIDATE / "assets/design-system/mm-chrome.css": "2d7414a8994ae11414cb269f4ca335293b409eb9da956ca3b625e716c26080ba",
    CANDIDATE / "mock-cart.js": "36fb46b05a46ecf1c770991c6b9cf2eb8c08fda361c7176d37df081668f123aa",
    CANDIDATE / "mock-cart.css": "c17deb1f972017d9790f2191360a457e54d7287730847f9f470c9de371603308",
    REPO / "docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-20260814T174412.md": "22edc54049fcf28a864de8ca913657bb0ab7c09620275e0d99a57aea206b926f",
    REPO / "docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-20260814T174412.json": "69de9cc7f1befb6ff9c080addbadf092b3b243811a162cca878331db157b3b76",
    REPO / "docs/orchestration/reviews/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-R2-20260814T163003.json": "9eb39d99d6d3504db2d3e798bbd6b1c1941b40127f2c152bd028edb844077695",
    REPO / "docs/orchestration/reviews/MAPLEMOON-CERTIFIED-PREVIEW-DEPLOY-20260814T165853.json": "e6610d6e4c0b51f3770b5361948693e3bd5006dd8805470e498f7c47007c9bda",
}


class Hold(RuntimeError):
    pass


class CandidateFail(RuntimeError):
    pass


def utc_now() -> str:
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: pathlib.Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def path_snapshot(path: pathlib.Path) -> dict[str, Any]:
    digest = hashlib.sha256()
    count = 0
    for child in sorted(path.rglob("*")):
        if child.is_symlink():
            raise Hold(f"symlink in predecessor evidence: {child}")
        if not child.is_file():
            continue
        digest.update(child.relative_to(path).as_posix().encode("utf-8"))
        digest.update(b"\0")
        digest.update(sha256_file(child).encode("ascii"))
        digest.update(b"\n")
        count += 1
    return {"sha256": digest.hexdigest(), "files": count}


def write_json(name: str, payload: Any) -> None:
    (OUT / name).write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def require(condition: bool, message: str, *, candidate: bool = False) -> None:
    if not condition:
        if candidate:
            raise CandidateFail(message)
        raise Hold(message)


def fetch_json(url: str, timeout: float = 2.0) -> Any:
    with urllib.request.urlopen(url, timeout=timeout) as response:
        return json.loads(response.read())


def port_open(port: int) -> bool:
    try:
        fetch_json(f"http://127.0.0.1:{port}/json/version", timeout=0.3)
        return True
    except Exception:
        return False


def wait_http(url: str, timeout: float = 12.0) -> None:
    deadline = time.time() + timeout
    last: Exception | None = None
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=0.5) as response:
                if response.status == 200:
                    return
        except Exception as error:
            last = error
        time.sleep(0.1)
    raise Hold(f"HTTP endpoint did not become ready: {url}: {last}")


@dataclass
class Trace:
    requests: list[dict[str, Any]] = field(default_factory=list)
    responses: list[dict[str, Any]] = field(default_factory=list)
    loading_failures: list[dict[str, Any]] = field(default_factory=list)
    exceptions: list[str] = field(default_factory=list)
    console_errors: list[str] = field(default_factory=list)
    log_errors: list[str] = field(default_factory=list)


class CDP:
    def __init__(self, ws_url: str):
        self.ws = websocket.create_connection(ws_url, timeout=15, origin="http://127.0.0.1")
        self.next_id = 0
        self.methods: list[str] = []
        self.trace = Trace()

    def close(self) -> None:
        self.ws.close()

    def reset_trace(self) -> None:
        self.trace = Trace()

    def _event(self, message: dict[str, Any]) -> None:
        method = message.get("method")
        params = message.get("params", {})
        if method == "Network.requestWillBeSent":
            request = params.get("request", {})
            self.trace.requests.append({
                "url": request.get("url"),
                "method": request.get("method"),
                "type": params.get("type"),
                "initiator": params.get("initiator", {}).get("type"),
            })
        elif method == "Network.responseReceived":
            response = params.get("response", {})
            self.trace.responses.append({
                "url": response.get("url"),
                "status": response.get("status"),
                "type": params.get("type"),
                "mimeType": response.get("mimeType"),
            })
        elif method == "Network.loadingFailed":
            if not params.get("canceled"):
                self.trace.loading_failures.append({
                    "requestId": params.get("requestId"),
                    "type": params.get("type"),
                    "errorText": params.get("errorText"),
                })
        elif method == "Runtime.exceptionThrown":
            details = params.get("exceptionDetails", {})
            self.trace.exceptions.append(details.get("text") or "Runtime exception")
        elif method == "Runtime.consoleAPICalled" and params.get("type") == "error":
            self.trace.console_errors.append(" ".join(
                str(arg.get("value") or arg.get("description") or "")
                for arg in params.get("args", [])
            ))
        elif method == "Log.entryAdded":
            entry = params.get("entry", {})
            if entry.get("level") == "error":
                self.trace.log_errors.append(str(entry.get("text") or "Log error"))

    def call(self, method: str, params: dict[str, Any] | None = None) -> dict[str, Any]:
        if method.startswith("Emulation.") or method.startswith("Input."):
            raise Hold(f"forbidden CDP method attempted: {method}")
        self.methods.append(method)
        self.next_id += 1
        ident = self.next_id
        self.ws.send(json.dumps({"id": ident, "method": method, "params": params or {}}))
        while True:
            message = json.loads(self.ws.recv())
            if message.get("id") == ident:
                if "error" in message:
                    raise Hold(f"CDP {method}: {message['error']}")
                return message.get("result", {})
            self._event(message)

    def evaluate(self, expression: str, *, await_promise: bool = True) -> Any:
        result = self.call("Runtime.evaluate", {
            "expression": expression,
            "returnByValue": True,
            "awaitPromise": await_promise,
        })
        if result.get("exceptionDetails"):
            raise CandidateFail(f"Runtime evaluation failed: {result['exceptionDetails'].get('text')}")
        return result.get("result", {}).get("value")

    def wait_for(self, condition: str, timeout: float = 12.0) -> None:
        deadline = time.time() + timeout
        while time.time() < deadline:
            if self.evaluate(f"Boolean({condition})"):
                return
            time.sleep(0.08)
        raise CandidateFail(f"timed out waiting for {condition}")


@dataclass
class BrowserInstance:
    label: str
    level: float
    factor: float
    port: int
    profile: pathlib.Path
    process: subprocess.Popen[bytes]
    target_id: str
    window_id: int
    cdp: CDP
    command: list[str]


def process_command(pid: int) -> str:
    result = subprocess.run(["ps", "-p", str(pid), "-o", "command="], capture_output=True, text=True)
    return result.stdout.strip()


def initial_hashes() -> dict[str, Any]:
    rows = []
    for path, expected in EXPECTED_HASHES.items():
        actual = sha256_file(path)
        rows.append({"path": str(path), "expected": expected, "actual": actual, "pass": actual == expected})
        require(actual == expected, f"pinned hash changed: {path}")
    predecessor = path_snapshot(REPO / "_wip/evidence/native_200_zoom_audit_20260814T174412")
    require(predecessor["sha256"] == "1e26fd6e03c64ae5073780380b8ca495780e75b07f697cf32cfe585cae235c42", "predecessor evidence digest changed")
    return {"checked_at": utc_now(), "files": rows, "predecessor_evidence": predecessor, "verdict": "PASS"}


def create_profiles() -> dict[str, Any]:
    initial_record_path = OUT / "profile-preferences-initial.json"
    existing = {label: profile.exists() for label, profile in PROFILES.items()}
    if any(existing.values()):
        require(all(existing.values()) and initial_record_path.is_file(), f"partial or unproved profile reuse state: {existing}")
        records = json.loads(initial_record_path.read_text(encoding="utf-8"))
        for label, level in LEVELS.items():
            require(records[label]["files_before_first_launch"] == ["Default/Preferences"], f"profile {label} lacks first-launch Preferences-only evidence")
            require(abs(float(records[label]["level"]) - level) < 1e-12, f"profile {label} initial level evidence changed")
            current = json.loads((PROFILES[label] / "Default/Preferences").read_text(encoding="utf-8"))["partition"]["default_zoom_level"]["x"]
            require(abs(float(current) - level) < 1e-12, f"profile {label} no longer preserves its native default zoom preference")
            records[label]["reused_after_verified_clean_first_run"] = True
        return records
    records: dict[str, Any] = {}
    for label, level in LEVELS.items():
        profile = PROFILES[label]
        require(not profile.exists(), f"fresh profile path already exists: {profile}")
        default = profile / "Default"
        default.mkdir(parents=True)
        preferences = default / "Preferences"
        data = (json.dumps({"partition": {"default_zoom_level": {"x": level}}}, separators=(",", ":")) + "\n").encode("utf-8")
        preferences.write_bytes(data)
        contents = sorted(str(child.relative_to(profile)) for child in profile.rglob("*") if child.is_file())
        require(contents == ["Default/Preferences"], f"profile {label} was not Preferences-only before first launch")
        records[label] = {
            "profile": str(profile),
            "preference_file": str(preferences),
            "initial_bytes_utf8": data.decode("utf-8"),
            "initial_sha256": sha256_bytes(data),
            "level": level,
            "factor_pow_1_2": math.pow(1.2, level),
            "files_before_first_launch": contents,
        }
    write_json("profile-preferences-initial.json", records)
    return records


def launch(label: str) -> BrowserInstance:
    port = PORTS[label]
    require(not port_open(port), f"CDP port already open: {port}")
    profile = PROFILES[label]
    command = [
        str(CHROME),
        f"--user-data-dir={profile}",
        "--profile-directory=Default",
        f"--remote-debugging-port={port}",
        "--remote-allow-origins=*",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-extensions",
        "--disable-background-networking",
        "--disable-component-update",
        "--disable-default-apps",
        "--disable-sync",
        "--metrics-recording-only",
        "--window-position=50,50",
        "--window-size=1200,900",
        "--new-window",
        f"{ORIGIN}/homepage.html",
    ]
    log = (OUT / f"chrome-{label}.log").open("wb")
    process = subprocess.Popen(command, stdout=log, stderr=subprocess.STDOUT)
    deadline = time.time() + 20
    last: Exception | None = None
    while time.time() < deadline:
        if process.poll() is not None:
            raise Hold(f"isolated Chrome {label} exited early with {process.returncode}")
        try:
            targets = fetch_json(f"http://127.0.0.1:{port}/json", timeout=0.5)
            pages = [target for target in targets if target.get("type") == "page" and target.get("url", "").startswith(ORIGIN)]
            if len(pages) == 1:
                target = pages[0]
                cdp = CDP(target["webSocketDebuggerUrl"])
                for method in ("Page.enable", "Runtime.enable", "Network.enable", "Log.enable"):
                    cdp.call(method)
                cdp.wait_for("document.readyState === 'complete'")
                window = cdp.call("Browser.getWindowForTarget", {"targetId": target["id"]})
                instance = BrowserInstance(
                    label=label,
                    level=LEVELS[label],
                    factor=math.pow(1.2, LEVELS[label]),
                    port=port,
                    profile=profile,
                    process=process,
                    target_id=target["id"],
                    window_id=window["windowId"],
                    cdp=cdp,
                    command=command,
                )
                set_bounds(instance, 1200, 900)
                return instance
            last = Hold(f"expected one candidate page target, got {len(pages)}")
        except Exception as error:
            last = error
        time.sleep(0.15)
    raise Hold(f"isolated Chrome {label} did not expose one target: {last}")


def set_bounds(instance: BrowserInstance, width: int, height: int, left: int = 50, top: int = 50, *, strict_height: bool = True) -> dict[str, Any]:
    instance.cdp.call("Browser.setWindowBounds", {
        "windowId": instance.window_id,
        "bounds": {"left": left, "top": top, "width": width, "height": height, "windowState": "normal"},
    })
    deadline = time.time() + 6
    observed: dict[str, Any] = {}
    while time.time() < deadline:
        observed = instance.cdp.call("Browser.getWindowBounds", {"windowId": instance.window_id})["bounds"]
        if observed.get("width") == width and (observed.get("height") == height or not strict_height):
            return observed
        time.sleep(0.08)
    raise Hold(f"Chrome {instance.label} outer bounds did not settle: wanted {width}x{height}, got {observed}")


METRICS_JS = """(() => {
  const de = document.documentElement;
  const vv = window.visualViewport;
  const cs = getComputedStyle(de);
  return {
    url: location.href,
    readyState: document.readyState,
    innerWidth: innerWidth,
    innerHeight: innerHeight,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    clientWidth: de.clientWidth,
    scrollWidth: de.scrollWidth,
    devicePixelRatio: devicePixelRatio,
    visualViewport: vv ? {width: vv.width, height: vv.height, scale: vv.scale, offsetLeft: vv.offsetLeft, offsetTop: vv.offsetTop} : null,
    rootInlineZoom: de.style.zoom,
    rootComputedZoom: cs.zoom,
    bodyTextLength: (document.body?.innerText || '').trim().length,
    pageScaleIndicators: {rootTransform: cs.transform, rootTransformOrigin: cs.transformOrigin}
  };
})()"""


def metrics(instance: BrowserInstance) -> dict[str, Any]:
    value = instance.cdp.evaluate(METRICS_JS)
    value["browserBounds"] = instance.cdp.call("Browser.getWindowBounds", {"windowId": instance.window_id})["bounds"]
    return value


INSTRUMENTATION = r"""(() => {
  const state = window.__mmR2Audit = {observerActive: 0, observerPeak: 0, listenerAdds: {}, listenerRemoves: {}};
  const NativeObserver = window.MutationObserver;
  window.MutationObserver = class AuditedMutationObserver extends NativeObserver {
    constructor(callback) { super(callback); this.__mmObserved = false; }
    observe(...args) {
      if (!this.__mmObserved) { this.__mmObserved = true; state.observerActive++; state.observerPeak = Math.max(state.observerPeak, state.observerActive); }
      return super.observe(...args);
    }
    disconnect() {
      if (this.__mmObserved) { this.__mmObserved = false; state.observerActive--; }
      return super.disconnect();
    }
  };
  const add = EventTarget.prototype.addEventListener;
  const remove = EventTarget.prototype.removeEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (this === document && (type === 'focusin' || type === 'keydown')) state.listenerAdds[type] = (state.listenerAdds[type] || 0) + 1;
    return add.call(this, type, listener, options);
  };
  EventTarget.prototype.removeEventListener = function(type, listener, options) {
    if (this === document && (type === 'focusin' || type === 'keydown')) state.listenerRemoves[type] = (state.listenerRemoves[type] || 0) + 1;
    return remove.call(this, type, listener, options);
  };
})();"""


def navigate(instance: BrowserInstance, route: str) -> dict[str, Any]:
    cdp = instance.cdp
    cdp.reset_trace()
    url = f"{ORIGIN}/{route}"
    cdp.call("Page.navigate", {"url": url})
    cdp.wait_for("document.readyState === 'complete'", timeout=18)
    cdp.wait_for("document.querySelector('[data-mm-chrome][data-mm-enhanced]') && document.querySelector('#mmCartDialog')", timeout=12)
    scroll_activation = cdp.evaluate(r"""(async () => {
      const step = Math.max(240, Math.floor(innerHeight * 0.8));
      const bottom = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      for (let y = 0; y < bottom; y += step) {
        scrollTo(0, Math.min(y, bottom));
        await new Promise(resolve => setTimeout(resolve, 45));
      }
      scrollTo(0, bottom);
      await new Promise(resolve => setTimeout(resolve, 150));
      scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 80));
      return {bottom, step, images: document.images.length};
    })()""")
    lazy_activation = cdp.evaluate(r"""(async () => {
      const lazy = Array.from(document.querySelectorAll('img[src][loading="lazy"]'));
      const before = lazy.filter(img => !img.complete || img.naturalWidth <= 0).map(img => img.getAttribute('src'));
      lazy.forEach(img => { img.loading = 'eager'; });
      const settled = await Promise.allSettled(lazy.map(img => img.decode()));
      await new Promise(resolve => setTimeout(resolve, 120));
      return {
        beforeIncomplete: before,
        afterIncomplete: lazy.filter(img => !img.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0).map(img => ({src:img.getAttribute('src'),complete:img.complete,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight})),
        decodeRejected: settled.map((row,index) => row.status === 'rejected' ? lazy[index].getAttribute('src') : null).filter(Boolean)
      };
    })()""")
    time.sleep(0.25)
    cdp.evaluate("0")
    trace = cdp.trace
    document_responses = [row for row in trace.responses if row.get("type") == "Document" and row.get("url", "").split("#")[0] == url]
    http_errors = [row for row in trace.responses if float(row.get("status") or 0) >= 400]
    return {
        "url": url,
        "document_responses": document_responses,
        "http_errors": http_errors,
        "loading_failures": trace.loading_failures,
        "exceptions": trace.exceptions,
        "console_errors": trace.console_errors,
        "log_errors": trace.log_errors,
        "request_count": len(trace.requests),
        "response_count": len(trace.responses),
        "scroll_activation": scroll_activation,
        "lazy_activation": lazy_activation,
    }


ROUTE_PROBE_JS = r"""(() => {
  const de = document.documentElement;
  const body = document.body;
  const root = document.querySelector('[data-mm-chrome]');
  const toggle = root?.querySelector('[data-mm-menu-toggle]');
  const headerRect = root?.getBoundingClientRect();
  const toggleRect = toggle?.getBoundingClientRect();
  const hit = toggleRect ? document.elementFromPoint(toggleRect.left + toggleRect.width / 2, toggleRect.top + toggleRect.height / 2) : null;
  const images = Array.from(document.images).map(img => ({src: img.getAttribute('src'), complete: img.complete, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight}));
  const authoredImageFailures = images.filter(img => img.src && (!img.complete || img.naturalWidth <= 0 || img.naturalHeight <= 0));
  return {
    innerWidth, innerHeight, clientWidth: de.clientWidth, scrollWidth: de.scrollWidth,
    nonblank: (body.innerText || '').trim().length > 100 && body.getBoundingClientRect().height > 100,
    bodyTextLength: (body.innerText || '').trim().length,
    authoredImages: images.length,
    authoredImageFailures,
    header: {
      exists: !!root,
      rect: headerRect ? {left: headerRect.left, top: headerRect.top, right: headerRect.right, width: headerRect.width, height: headerRect.height} : null,
      fixed: root ? getComputedStyle(root).position === 'fixed' : false,
      topHitWithinHeader: !!(root && hit && root.contains(hit)),
      state: root?.getAttribute('data-mm-menu-state'),
      visible: root?.getAttribute('data-mm-header-visibility'),
      enhanced: root?.getAttribute('data-mm-enhanced')
    },
    rootZoom: {inline: de.style.zoom, computed: getComputedStyle(de).zoom},
    vv: visualViewport ? {width: visualViewport.width, height: visualViewport.height, scale: visualViewport.scale} : null
  };
})()"""


def header_matrix(instance: BrowserInstance) -> dict[str, Any]:
    cdp = instance.cdp
    closed = cdp.evaluate(r"""(() => {
      const root = document.querySelector('[data-mm-chrome]'); const t = root.querySelector('[data-mm-menu-toggle]');
      return {state: root.getAttribute('data-mm-menu-state'), expanded: t.getAttribute('aria-expanded'), primaryHidden: root.querySelector('[data-mm-primary-nav]').hidden, utilityHidden: root.querySelector('[data-mm-utility-nav]').hidden};
    })()""")
    require(closed == {"state": "closed", "expanded": "false", "primaryHidden": True, "utilityHidden": True}, f"closed navigation contract failed: {closed}", candidate=True)
    cdp.evaluate("document.querySelector('[data-mm-menu-toggle]').click()")
    cdp.wait_for("document.querySelector('[data-mm-chrome]').getAttribute('data-mm-menu-state') === 'open'")
    opened = cdp.evaluate(r"""(() => {
      const root = document.querySelector('[data-mm-chrome]');
      const t = root.querySelector('[data-mm-menu-toggle]');
      const primary = root.querySelector('[data-mm-primary-nav]');
      const utility = root.querySelector('[data-mm-utility-nav]');
      const rows = [...primary.children, ...utility.children].filter(element => { const style=getComputedStyle(element), r=element.getBoundingClientRect(); return !element.hidden && style.display!=='none' && style.visibility!=='hidden' && r.height>0; });
      const rects = rows.map(row => { const r=row.getBoundingClientRect(); const x=r.left+r.width/2, y=r.top+r.height/2; const stack=document.elementsFromPoint(x,y); return {tag:row.tagName.toLowerCase(),text:row.textContent.trim(), left:r.left, right:r.right, top:r.top, height:r.height, topHitWithinLink:!!(stack[0] && row.contains(stack[0]))}; });
      const pr=primary.getBoundingClientRect(), ur=utility.getBoundingClientRect();
      const outside=[]; let current=root;
      while(current && current!==document.body){const parent=current.parentElement;if(!parent)break;Array.from(parent.children).forEach(s=>{if(s!==current)outside.push({tag:s.tagName, inert:s.hasAttribute('inert')})});current=parent;}
      function mediaRules(rules, found=[]) { for (const rule of rules || []) { try { if (rule.cssText?.includes('prefers-reduced-motion: reduce')) found.push(rule.cssText); if (rule.cssRules) mediaRules(rule.cssRules, found); } catch(_){} } return found; }
      const reducedRules=[]; for(const sheet of document.styleSheets){try{mediaRules(sheet.cssRules,reducedRules)}catch(_){}}
      return {state:root.getAttribute('data-mm-menu-state'), expanded:t.getAttribute('aria-expanded'), primaryHidden:primary.hidden, utilityHidden:utility.hidden, bodyOpen:document.body.hasAttribute('data-mm-menu-open'), rowCount:rows.length, rows:rects, primaryRect:{left:pr.left,right:pr.right,width:pr.width}, utilityRect:{left:ur.left,right:ur.right,width:ur.width}, outside, activeText:document.activeElement?.textContent?.trim(), reducedMotion:{matches:matchMedia('(prefers-reduced-motion: reduce)').matches, ruleCount:reducedRules.length, contract:reducedRules.some(text=>text.includes('transition: none')&&text.includes('transform: none'))}};
    })()""")
    require(opened["state"] == "open" and opened["expanded"] == "true", "open navigation state failed", candidate=True)
    require(opened["rowCount"] == 6, f"drawer row count {opened['rowCount']} != 6", candidate=True)
    require(all(abs(row["height"] - 44) <= 0.51 for row in opened["rows"]), f"drawer row height failed: {opened['rows']}", candidate=True)
    require(all(row["topHitWithinLink"] for row in opened["rows"]), "drawer row paint-order hit failed", candidate=True)
    require(abs(opened["primaryRect"]["left"]) <= 0.51 and abs(opened["primaryRect"]["right"] - 390) <= 0.51, f"primary drawer not full width: {opened['primaryRect']}", candidate=True)
    require(abs(opened["utilityRect"]["left"]) <= 0.51 and abs(opened["utilityRect"]["right"] - 390) <= 0.51, f"utility drawer not full width: {opened['utilityRect']}", candidate=True)
    require(all(row["inert"] for row in opened["outside"]), f"drawer outside inert failed: {opened['outside']}", candidate=True)
    require(opened["reducedMotion"]["contract"], f"reduced-motion CSS contract missing: {opened['reducedMotion']}", candidate=True)
    trap = cdp.evaluate(r"""(() => {
      const root=document.querySelector('[data-mm-chrome]'), toggle=root.querySelector('[data-mm-menu-toggle]'), cart=root.querySelector('[data-mm-cart-toggle]');
      cart.focus(); cart.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true})); const forward=document.activeElement===toggle;
      toggle.focus(); toggle.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',shiftKey:true,bubbles:true,cancelable:true})); const backward=document.activeElement===cart;
      return {forward,backward,active:document.activeElement?.getAttribute('data-mm-cart-toggle')!==null?'cart':document.activeElement?.getAttribute('data-mm-menu-toggle')!==null?'toggle':'other'};
    })()""")
    require(trap["forward"] and trap["backward"], f"drawer focus trap failed: {trap}", candidate=True)
    escape = cdp.evaluate(r"""(() => { const root=document.querySelector('[data-mm-chrome]'); document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true})); const t=root.querySelector('[data-mm-menu-toggle]'); return {state:root.getAttribute('data-mm-menu-state'), expanded:t.getAttribute('aria-expanded'), restored:document.activeElement===t, unexpectedOutsideInert:Array.from(document.querySelectorAll('body [inert]')).filter(e=>!root.contains(e)&&!e.matches('#mmCartDialog')).length}; })()""")
    require(escape == {"state": "closed", "expanded": "false", "restored": True, "unexpectedOutsideInert": 0}, f"drawer Escape/restore failed: {escape}", candidate=True)
    return {"closed": closed, "opened": opened, "focus_trap": trap, "escape": escape}


def cart_matrix(instance: BrowserInstance) -> dict[str, Any]:
    cdp = instance.cdp
    baseline = cdp.evaluate("window.__mmR2Audit")
    cycles = []
    for closer in ("escape", "explicit", "overlay"):
        opener = cdp.evaluate(r"""(() => { const t=document.querySelector('[data-mm-cart-toggle]') || document.querySelector('[data-mm-open-cart]'); t.focus(); t.click(); return {tag:t.tagName, label:t.getAttribute('aria-label')}; })()""")
        cdp.wait_for("document.querySelector('#mmCartDialog').classList.contains('is-open')")
        time.sleep(0.4)
        opened = cdp.evaluate(r"""(() => {
          const dialog=document.querySelector('#mmCartDialog'), overlay=document.querySelector('[data-mm-cart-overlay]');
          const target=document.querySelector('[data-mm-menu-toggle]'); const tr=target.getBoundingClientRect(); const x=tr.left+tr.width/2, y=tr.top+tr.height/2; const top=document.elementFromPoint(x,y);
          const branches=Array.from(document.body.children).filter(e=>e!==dialog&&e!==overlay&&e instanceof HTMLElement);
          const dynamic=document.createElement('div'); dynamic.id='mm-r2-dynamic-background'; document.body.appendChild(dynamic);
          return {dialogOpen:dialog.classList.contains('is-open'), ariaHidden:dialog.getAttribute('aria-hidden'), dialogInert:dialog.hasAttribute('inert'), overlayOpen:overlay.classList.contains('is-open'), overlayPointerEvents:getComputedStyle(overlay).pointerEvents, modalLayerTopHit:top===overlay||overlay.contains(top)||top===dialog||dialog.contains(top), topHit:{tag:top?.tagName,className:top?.className||'',insideDialog:dialog.contains(top),isOverlay:top===overlay}, backgroundAllInert:branches.every(e=>e.hasAttribute('inert')), activeInside:dialog.contains(document.activeElement), clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth, audit:{...window.__mmR2Audit}};
        })()""")
        time.sleep(0.08)
        dynamic = cdp.evaluate("(() => {const n=document.querySelector('#mm-r2-dynamic-background');const inert=n?.hasAttribute('inert');n?.remove();return inert;})()")
        require(opened["dialogOpen"] and opened["ariaHidden"] == "false" and not opened["dialogInert"], f"cart dialog open contract failed: {opened}", candidate=True)
        require(opened["overlayOpen"] and opened["overlayPointerEvents"] == "auto" and opened["modalLayerTopHit"], f"cart overlay blocking failed: {opened}", candidate=True)
        require(opened["backgroundAllInert"] and dynamic, f"cart inert containment failed: opened={opened} dynamic={dynamic}", candidate=True)
        require(opened["clientWidth"] == opened["scrollWidth"], f"cart horizontal overflow: {opened}", candidate=True)
        focus = cdp.evaluate(r"""(() => { const d=document.querySelector('#mmCartDialog'); const outside=Array.from(document.querySelectorAll('button,a[href],input,select')).find(e=>!d.contains(e)&&!e.closest('[inert]')); const before=document.activeElement; outside?.focus(); return {remainedInside:d.contains(document.activeElement), beforeInside:d.contains(before)}; })()""")
        require(focus["remainedInside"], f"cart focus containment failed: {focus}", candidate=True)
        pointer = None
        if closer == "escape":
            cdp.evaluate("document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}))")
        elif closer == "explicit":
            cdp.evaluate("document.querySelector('[data-mm-close-cart]').click()")
        else:
            pointer = cdp.evaluate(r"""(() => { const target=document.querySelector('[data-mm-menu-toggle]'), dialog=document.querySelector('#mmCartDialog'), overlay=document.querySelector('[data-mm-cart-overlay]'); const r=target.getBoundingClientRect(), top=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2); window.__mmR2BackgroundClicks=0; target.addEventListener('click',()=>window.__mmR2BackgroundClicks++,{once:true}); top?.click(); return {topIsModalLayer:top===overlay||overlay.contains(top)||top===dialog||dialog.contains(top), topIsOverlay:top===overlay, topInsideDialog:dialog.contains(top), backgroundClicks:window.__mmR2BackgroundClicks}; })()""")
            require(pointer["topIsModalLayer"] and pointer["backgroundClicks"] == 0, f"cart pointer leaked through modal layer: {pointer}", candidate=True)
            time.sleep(0.08)
            if cdp.evaluate("document.querySelector('#mmCartDialog').classList.contains('is-open')"):
                cdp.evaluate("document.querySelector('[data-mm-cart-overlay]').click()")
        cdp.wait_for("!document.querySelector('#mmCartDialog').classList.contains('is-open')")
        time.sleep(0.06)
        closed = cdp.evaluate(r"""(() => { const d=document.querySelector('#mmCartDialog'); const t=document.querySelector('[data-mm-cart-toggle]')||document.querySelector('[data-mm-open-cart]'); return {dialogOpen:d.classList.contains('is-open'), ariaHidden:d.getAttribute('aria-hidden'), dialogInert:d.hasAttribute('inert'), restored:document.activeElement===t, backgroundInert:Array.from(document.body.children).filter(e=>e!==d&&e!==document.querySelector('[data-mm-cart-overlay]')&&e instanceof HTMLElement&&e.hasAttribute('inert')).length, audit:{...window.__mmR2Audit}}; })()""")
        require(not closed["dialogOpen"] and closed["ariaHidden"] == "true" and closed["dialogInert"] and closed["restored"], f"cart {closer} close/restore failed: {closed}", candidate=True)
        require(closed["backgroundInert"] == 0, f"cart {closer} left inert background: {closed}", candidate=True)
        require(closed["audit"]["observerActive"] == baseline["observerActive"], f"cart {closer} observer accumulation: {closed['audit']} baseline={baseline}", candidate=True)
        cycles.append({"closer": closer, "opener": opener, "opened": opened, "dynamic_branch_inert": dynamic, "focus": focus, "pointer": pointer, "closed": closed})
    final = cdp.evaluate("window.__mmR2Audit")
    focusin_balance = (final.get("listenerAdds", {}).get("focusin", 0) - final.get("listenerRemoves", {}).get("focusin", 0)) - (baseline.get("listenerAdds", {}).get("focusin", 0) - baseline.get("listenerRemoves", {}).get("focusin", 0))
    require(focusin_balance == 0, f"cart focusin listener accumulation: {focusin_balance}", candidate=True)
    return {"baseline": baseline, "cycles": cycles, "final": final, "focusin_active_delta": focusin_balance}


def shop_arithmetic(instance: BrowserInstance) -> dict[str, Any]:
    cdp = instance.cdp
    cdp.evaluate("sessionStorage.removeItem('maplemoon_review_cart_v2')")
    nav = navigate(instance, "shop.html")
    selection = cdp.evaluate(r"""(() => {
      const card=Array.from(document.querySelectorAll('.pcard[data-mm-availability="available"]')).find(c=>c.querySelector('[data-mm-add-product]')&&c.querySelector('.size-select'));
      if(!card)return null; const select=card.querySelector('.size-select'); select.selectedIndex=Math.min(1,select.options.length-1); select.dispatchEvent(new Event('change',{bubbles:true})); const option=select.options[select.selectedIndex],button=card.querySelector('[data-mm-add-product]');
      return {id:button.dataset.mmAddProduct,label:option.dataset.label||option.textContent.trim(),priceCents:Math.round(Number(option.value)*100),quantity:Number(option.dataset.quantity||1)};
    })()""")
    require(bool(selection), "Shop has no priced option-controlled product", candidate=True)
    cdp.evaluate("document.querySelector('.pcard[data-mm-availability=\"available\"] .size-select') && 0")
    cdp.evaluate(f"document.querySelector('[data-mm-add-product=\"{selection['id']}\"]').click()")
    cdp.wait_for("document.querySelector('#mmCartDialog').classList.contains('is-open')")
    time.sleep(0.1)
    first = cdp.evaluate("(() => {const stored=JSON.parse(sessionStorage.getItem('maplemoon_review_cart_v2'));return {stored,subtotal:document.querySelector('[data-mm-subtotal]').textContent};})()")
    require(len(first["stored"]) == 1 and first["stored"][0]["optionLabel"] == selection["label"] and first["stored"][0]["unitPriceCents"] == selection["priceCents"], f"Shop option identity failed: selection={selection} stored={first}", candidate=True)
    cdp.evaluate("document.querySelector('[data-mm-quantity=\"1\"]').click();document.querySelector('[data-mm-quantity=\"1\"]').click()")
    time.sleep(0.1)
    tripled = cdp.evaluate("(() => {const stored=JSON.parse(sessionStorage.getItem('maplemoon_review_cart_v2'));return {stored,subtotal:document.querySelector('[data-mm-subtotal]').textContent};})()")
    expected_cents = selection["priceCents"] * 3
    expected_text = f"${expected_cents / 100:.2f}"
    require(tripled["stored"][0]["quantity"] == 3 and tripled["subtotal"] == expected_text, f"Shop integer subtotal failed: expected {expected_text}, got {tripled}", candidate=True)
    cdp.evaluate("document.querySelector('[data-mm-close-cart]').click()")
    cdp.wait_for("!document.querySelector('#mmCartDialog').classList.contains('is-open')")
    reload_nav = navigate(instance, "shop.html")
    cdp.evaluate("document.querySelector('[data-mm-cart-toggle]').click()")
    cdp.wait_for("document.querySelector('#mmCartDialog').classList.contains('is-open')")
    persisted = cdp.evaluate("(() => {const stored=JSON.parse(sessionStorage.getItem('maplemoon_review_cart_v2'));return {stored,subtotal:document.querySelector('[data-mm-subtotal]').textContent,count:document.querySelector('[data-mm-cart-count],.sp-cart b')?.textContent};})()")
    require(persisted["stored"][0]["quantity"] == 3 and persisted["subtotal"] == expected_text, f"Shop storage reload failed: {persisted}", candidate=True)
    return {"initial_navigation": nav, "selection": selection, "first": first, "tripled": tripled, "expected_subtotal": expected_text, "reload_navigation": reload_nav, "persisted": persisted}


def png_dimensions(data: bytes) -> tuple[int, int]:
    require(data.startswith(b"\x89PNG\r\n\x1a\n") and len(data) > 24, "screenshot is not a PNG", candidate=True)
    return struct.unpack(">II", data[16:24])


def screenshot(instance: BrowserInstance, filename: str, *, full: bool) -> dict[str, Any]:
    params: dict[str, Any] = {"format": "png", "fromSurface": True, "optimizeForSpeed": True}
    coordinate_proof: dict[str, Any] = {}
    if full:
        layout = instance.cdp.call("Page.getLayoutMetrics")
        # Page.captureScreenshot's clip uses the legacy layout coordinate space.
        # At native page zoom, cssContentSize is zoom-normalized and clipped the
        # right half of the page; contentSize preserves the full layout extent.
        size = layout.get("contentSize") or layout.get("cssContentSize")
        width = max(float(size["width"]), float(instance.cdp.evaluate("innerWidth")))
        height = max(float(size["height"]), float(instance.cdp.evaluate("innerHeight")))
        dpr = float(instance.cdp.evaluate("devicePixelRatio"))
        scale = min(1.0, 14000.0 / max(1.0, height * dpr))
        params.update({"captureBeyondViewport": True, "clip": {"x": 0, "y": 0, "width": width, "height": height, "scale": scale}})
        coordinate_proof = {
            "coordinate_space": "Page.getLayoutMetrics.contentSize",
            "content_size": layout.get("contentSize"),
            "css_content_size": layout.get("cssContentSize"),
            "clip": params["clip"],
        }
    result = instance.cdp.call("Page.captureScreenshot", params)
    data = base64.b64decode(result["data"])
    require(len(data) > 5000, f"screenshot too small: {filename} {len(data)} bytes", candidate=True)
    width_px, height_px = png_dimensions(data)
    path = SHOTS / filename
    path.write_bytes(data)
    return {"file": f"screenshots/{filename}", "bytes": len(data), "width_px": width_px, "height_px": height_px, "nonblank": True, "full_page": full, **coordinate_proof}


def segmented_screenshots(instance: BrowserInstance, stem: str) -> list[dict[str, Any]]:
    geometry = instance.cdp.evaluate("({innerHeight,scrollHeight:document.documentElement.scrollHeight})")
    bottom = max(0, int(geometry["scrollHeight"]) - int(geometry["innerHeight"]))
    positions = {"top": 0, "middle": bottom // 2, "bottom": bottom}
    rows = []
    for label, y in positions.items():
        instance.cdp.evaluate(f"scrollTo(0,{y})")
        time.sleep(0.08)
        row = screenshot(instance, f"{stem}-segment-{label}.png", full=False)
        row.update({"segment": label, "requested_scroll_y": y, "observed_scroll_y": instance.cdp.evaluate("scrollY"), "page_geometry": geometry})
        rows.append(row)
    instance.cdp.evaluate("scrollTo(0,0)")
    return rows


def calibrate_width(instance: BrowserInstance, target: int) -> dict[str, Any]:
    outer_width = target * 2
    for _ in range(8):
        bounds = set_bounds(instance, outer_width, 1100, left=30, top=30, strict_height=False)
        time.sleep(0.12)
        observed = metrics(instance)
        delta = target - int(observed["innerWidth"])
        if delta == 0:
            observed["targetInnerWidth"] = target
            observed["calibratedOuterBounds"] = bounds
            return observed
        outer_width += delta * 2
    raise Hold(f"could not calibrate native 200 profile to innerWidth {target}; last={observed}")


def run() -> int:
    started = utc_now()
    SHOTS.mkdir(parents=True, exist_ok=True)
    processes: list[BrowserInstance] = []
    server: subprocess.Popen[bytes] | None = None
    preference_records: dict[str, Any] = {}
    outcome = "HOLD"
    failure: str | None = None
    cleanup: dict[str, Any] = {}
    try:
        write_json("hashes-acquisition.json", initial_hashes())
        preference_records = create_profiles()
        server = subprocess.Popen([
            sys.executable, "-m", "http.server", str(SERVER_PORT), "--bind", "127.0.0.1", "--directory", str(CANDIDATE)
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        wait_http(f"{ORIGIN}/homepage.html")
        for label in ("100", "175", "200"):
            processes.append(launch(label))

        proofs = []
        for instance in processes:
            instance.cdp.call("Page.navigate", {"url": f"{ORIGIN}/homepage.html"})
            instance.cdp.wait_for("document.readyState === 'complete'")
            time.sleep(0.15)
            measured = metrics(instance)
            current_pref = json.loads((instance.profile / "Default/Preferences").read_text(encoding="utf-8"))["partition"]["default_zoom_level"]["x"]
            require(abs(float(current_pref) - instance.level) < 1e-12, f"Chrome {instance.label} did not preserve preference value")
            proofs.append({
                "label": instance.label,
                "pid": instance.process.pid,
                "pid_command": process_command(instance.process.pid),
                "profile": str(instance.profile),
                "port": instance.port,
                "target_id": instance.target_id,
                "window_id": instance.window_id,
                "level": instance.level,
                "factor": instance.factor,
                "preference_initial_sha256": preference_records[instance.label]["initial_sha256"],
                "preference_observed_after_launch": current_pref,
                "metrics": measured,
            })
        by_label = {row["label"]: row for row in proofs}
        m100, m175, m200 = (by_label[label]["metrics"] for label in ("100", "175", "200"))
        bounds_equal = all(row["metrics"]["browserBounds"] == m100["browserBounds"] for row in proofs)
        dpr_175 = m175["devicePixelRatio"] / m100["devicePixelRatio"]
        dpr_200 = m200["devicePixelRatio"] / m100["devicePixelRatio"]
        width_175 = m100["innerWidth"] / m175["innerWidth"]
        width_200 = m100["innerWidth"] / m200["innerWidth"]
        vv_one = all(abs(row["metrics"]["visualViewport"]["scale"] - 1) < 1e-9 for row in proofs)
        css_clean = all(row["metrics"]["rootInlineZoom"] in ("", "1") and str(row["metrics"]["rootComputedZoom"]) in ("1", "1.0") for row in proofs)
        detector_175 = abs(dpr_175 - 2) <= 0.03 and abs(width_175 - 2) <= 0.03
        detector_200 = abs(dpr_200 - 2) <= 0.03 and abs(width_200 - 2) <= 0.03
        proof = {
            "schema": "maplemoon-native-profile-zoom-proof/v1",
            "profiles": proofs,
            "ratios": {"dpr_175_over_100": dpr_175, "dpr_200_over_100": dpr_200, "inverse_css_width_175": width_175, "inverse_css_width_200": width_200},
            "controls": {"identical_browser_bounds": bounds_equal, "visual_viewport_scale_one": vv_one, "css_zoom_clean": css_clean, "detector_175_passed_as_200": detector_175, "detector_200_passed_as_200": detector_200},
            "cdp_methods": sorted(set(method for instance in processes for method in instance.cdp.methods)),
            "forbidden_emulation_or_input_methods": sorted(set(method for instance in processes for method in instance.cdp.methods if method.startswith("Emulation.") or method.startswith("Input."))),
        }
        write_json("native-preference-positive-controls.json", proof)
        require(bounds_equal and vv_one and css_clean, f"native preference controls failed: {proof['controls']}")
        require(abs(dpr_175 - 1.75) <= 0.03 and abs(width_175 - 1.75) <= 0.03, f"175 metrics failed: dpr={dpr_175} width={width_175}")
        require(abs(dpr_200 - 2) <= 0.03 and abs(width_200 - 2) <= 0.03, f"200 metrics failed: dpr={dpr_200} width={width_200}")
        require(not detector_175 and detector_200, f"positive detector failed: 175={detector_175} 200={detector_200}")
        require(not proof["forbidden_emulation_or_input_methods"], f"forbidden CDP methods observed: {proof['forbidden_emulation_or_input_methods']}")

        native200 = next(instance for instance in processes if instance.label == "200")
        native200.cdp.call("Page.addScriptToEvaluateOnNewDocument", {"source": INSTRUMENTATION})
        route_rows = []
        interaction_rows = []
        screenshot_rows = []
        width_proofs = {}
        for target_width in (390, 720):
            width_proof = calibrate_width(native200, target_width)
            require(width_proof["innerWidth"] == target_width and width_proof["clientWidth"] == target_width, f"width {target_width} calibration failed: {width_proof}")
            require(abs(width_proof["devicePixelRatio"] / m100["devicePixelRatio"] - 2) <= 0.03 and abs(width_proof["visualViewport"]["scale"] - 1) < 1e-9, f"native 200 proof lost at width {target_width}: {width_proof}")
            width_proofs[str(target_width)] = width_proof
            for route in ROUTES:
                nav = navigate(native200, route)
                probe = native200.cdp.evaluate(ROUTE_PROBE_JS)
                require(len(nav["document_responses"]) == 1 and nav["document_responses"][0]["status"] == 200, f"{route}@{target_width} document status failed: {nav}", candidate=True)
                require(not nav["http_errors"] and not nav["loading_failures"] and not nav["exceptions"] and not nav["console_errors"] and not nav["log_errors"], f"{route}@{target_width} runtime/request errors: {nav}", candidate=True)
                require(probe["innerWidth"] == target_width and probe["clientWidth"] == target_width and probe["scrollWidth"] == target_width, f"{route}@{target_width} overflow/width failed: {probe}", candidate=True)
                require(probe["nonblank"] and not probe["authoredImageFailures"], f"{route}@{target_width} paint/image failed: {probe}", candidate=True)
                require(probe["header"]["fixed"] and probe["header"]["topHitWithinHeader"], f"{route}@{target_width} fixed header paint order failed: {probe['header']}", candidate=True)
                row = {"route": route, "effective_width": target_width, "native_metrics": metrics(native200), "navigation": nav, "probe": probe, "verdict": "PASS"}
                route_rows.append(row)
                if target_width == 390:
                    header = header_matrix(native200)
                    cart = cart_matrix(native200)
                    interaction_rows.append({"route": route, "effective_width": 390, "header": header, "cart": cart, "verdict": "PASS"})
                    if route == "homepage.html":
                        native200.cdp.evaluate("document.querySelector('[data-mm-menu-toggle]').click()")
                        native200.cdp.wait_for("document.querySelector('[data-mm-chrome]').getAttribute('data-mm-menu-state') === 'open'")
                        screenshot_rows.append(screenshot(native200, "390-homepage-menu-open.png", full=False))
                        native200.cdp.evaluate("document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}))")
                native200.cdp.evaluate("scrollTo(0,0)")
                screenshot_rows.append(screenshot(native200, f"{target_width}-{route.removesuffix('.html')}-full.png", full=True))
                screenshot_rows.extend(segmented_screenshots(native200, f"{target_width}-{route.removesuffix('.html')}"))

        calibrate_width(native200, 390)
        arithmetic = shop_arithmetic(native200)
        screenshot_rows.append(screenshot(native200, "390-shop-cart-open.png", full=False))
        native200.cdp.evaluate("document.querySelector('[data-mm-close-cart]').click();sessionStorage.removeItem('maplemoon_review_cart_v2')")
        write_json("native-200-width-proofs.json", width_proofs)
        write_json("seven-route-matrix.json", {"rows": route_rows, "passed": len(route_rows), "expected": 14, "verdict": "PASS"})
        write_json("interaction-matrix.json", {"rows": interaction_rows, "passed": len(interaction_rows), "expected": 7, "shop_arithmetic": arithmetic, "verdict": "PASS"})
        write_json("screenshots.json", {"screenshots": screenshot_rows, "count": len(screenshot_rows), "all_nonblank": all(row["nonblank"] for row in screenshot_rows), "verdict": "PASS_PENDING_HUMAN_VISUAL_INSPECTION"})
        write_json("cdp-methods.json", {
            "methods": {instance.label: instance.cdp.methods for instance in processes},
            "forbidden_emulation_or_input": [method for instance in processes for method in instance.cdp.methods if method.startswith("Emulation.") or method.startswith("Input.")],
            "os_or_ui_input_events": 0,
            "user_browser_actions": 0,
            "verdict": "PASS",
        })
        outcome = "PASS_PENDING_VISUAL_INSPECTION"
    except CandidateFail as error:
        outcome = "FAIL"
        failure = str(error)
    except Exception as error:
        outcome = "HOLD"
        failure = str(error)
    finally:
        closed_pids = []
        for instance in reversed(processes):
            try:
                instance.cdp.close()
            except Exception:
                pass
            if instance.process.poll() is None:
                instance.process.terminate()
                try:
                    instance.process.wait(timeout=8)
                except subprocess.TimeoutExpired:
                    instance.process.kill()
                    instance.process.wait(timeout=5)
            closed_pids.append({"label": instance.label, "pid": instance.process.pid, "returncode": instance.process.returncode})
        if server is not None:
            if server.poll() is None:
                server.terminate()
                try:
                    server.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    server.kill(); server.wait(timeout=3)
            server_record = {"pid": server.pid, "returncode": server.returncode}
        else:
            server_record = None
        time.sleep(0.4)
        cleanup = {
            "checked_at": utc_now(),
            "closed_chrome_pids": closed_pids,
            "server": server_record,
            "ports": {str(port): {"closed": not port_open(port)} for port in [SERVER_PORT, *PORTS.values()]},
            "profiles_preserved": {label: str(path) for label, path in PROFILES.items()},
            "no_broad_kill": True,
            "user_browser_actions": 0,
        }
        cleanup["verdict"] = "PASS" if all(row["closed"] for row in cleanup["ports"].values()) else "HOLD"
        write_json("process-isolation-cleanup.json", cleanup)
        try:
            write_json("hashes-close.json", initial_hashes())
        except Exception as close_error:
            if not failure:
                outcome = "HOLD"
                failure = f"close hash failure: {close_error}"
        write_json("harness-summary.json", {
            "schema": "maplemoon-native-200-zoom-audit-r2-summary/v1",
            "packet_id": PACKET,
            "started_at": started,
            "completed_at": utc_now(),
            "outcome": outcome,
            "failure": failure,
            "cleanup": cleanup,
            "candidate_changes": [],
            "deployments": [],
            "git_actions": [],
            "client_actions": [],
        })
    if failure:
        print(f"{outcome} {failure}")
        return 3 if outcome == "FAIL" else 2
    print("R2_BROWSER PASS_PENDING_VISUAL_INSPECTION native_controls=3/3 routes=14/14 interactions=7/7")
    return 0


if __name__ == "__main__":
    raise SystemExit(run())
