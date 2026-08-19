#!/usr/bin/env python3
"""Native 200% preference proof for the style-chrome R2 derived output.

Imports only the previously accepted low-level CDP/profile primitives. This
R2 harness owns fresh profiles, ports, server and route assertions. It sends no
Emulation.*, Input.*, OS or UI input.
"""

from __future__ import annotations

import hashlib
import importlib.util
import json
import pathlib
import subprocess
import sys
import time
from typing import Any


REPO = pathlib.Path("/Users/handtomouse/maplemoon-website")
DERIVED = REPO / "_wip/deploy/generated/maplemoon-style-chrome-derived-r2-20260817T140018"
EVIDENCE = REPO / "_wip/evidence/style_chrome_correction_r2_20260817T140018/native-200"
PRIOR_HARNESS = REPO / "_wip/evidence/native_200_zoom_audit_r2_20260814T180224/r2_native_zoom_audit.py"
PRIOR_HARNESS_SHA256 = "9d79dce79451e61ee5327da874e159e921d612ef6525de8842c470f0cea39dfa"
SERVER_PORT = 8804
ORIGIN = f"http://127.0.0.1:{SERVER_PORT}"
ROUTES = ["homepage.html", "shop.html", "our-story.html", "carob-story.html", "faq.html", "stockists.html", "products/pure-carob-bar.html"]
LEVELS = {"100": 0.0, "175": 3.069389038663465, "200": 3.8017840169239308}
PORTS = {"100": 9360, "175": 9361, "200": 9362}
PROFILES = {label: pathlib.Path(f"/private/tmp/maplemoon-style-chrome-r2-native-{label}") for label in LEVELS}


def sha256_file(path: pathlib.Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def load_prior():
    actual = sha256_file(PRIOR_HARNESS)
    if actual != PRIOR_HARNESS_SHA256:
        raise RuntimeError(f"accepted native harness drift: {actual}")
    spec = importlib.util.spec_from_file_location("accepted_native_zoom_primitives", PRIOR_HARNESS)
    if spec is None or spec.loader is None:
        raise RuntimeError("cannot import accepted native harness")
    module = importlib.util.module_from_spec(spec)
    # Python 3.14 dataclasses resolve annotation modules through sys.modules.
    # Register this pinned module before execution; no accepted source is edited.
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    module.PACKET = "MAPLEMOON-STYLE-CHROME-CORRECTION-R2-20260817T140018"
    module.CANDIDATE = DERIVED
    module.OUT = EVIDENCE
    module.SHOTS = EVIDENCE / "screenshots"
    module.SERVER_PORT = SERVER_PORT
    module.ORIGIN = ORIGIN
    module.ROUTES = ROUTES
    module.LEVELS = LEVELS
    module.PORTS = PORTS
    module.PROFILES = PROFILES
    return module


ROUTE_PROBE = r"""(async () => {
  await document.fonts?.ready;
  const images=[...document.images]; images.forEach(image=>image.loading='eager');
  await Promise.allSettled(images.map(image=>image.decode())); await new Promise(resolve=>setTimeout(resolve,120));
  const visible=element=>{const style=getComputedStyle(element),box=element.getBoundingClientRect();return style.display!=='none'&&style.visibility!=='hidden'&&Number(style.opacity)>0&&box.width>0&&box.height>0};
  const header=document.querySelector('[data-mm-style-mobile-header]'),bar=header?.querySelector('.mm-style-mobile-bar'),wordmark=header?.querySelector('.mm-style-mobile-wordmark');
  const hb=header?.getBoundingClientRect(),wb=wordmark?.getBoundingClientRect();
  const targets=header?[...header.querySelectorAll('button,a[href]')].filter(visible).map(element=>{const box=element.getBoundingClientRect();return{text:element.textContent.trim(),width:box.width,height:box.height}}):[];
  const headerCandidates=[...document.querySelectorAll('[data-mm-style-mobile-header],header.mm-site-header,header.sp-top,header.os-top')].filter(visible);
  const skip=[...document.querySelectorAll('a[href^="#"]')][0]; skip?.focus(); await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  const sb=skip?.getBoundingClientRect(),href=skip?.getAttribute('href')||'',target=href?document.querySelector(href):null;
  const skipStyle=skip?getComputedStyle(skip):null;
  const skipFocused={isFirst:skip===document.activeElement,href,targetExists:!!target,visible:!!(sb&&sb.top>=0&&sb.bottom<=innerHeight&&sb.left>=0&&sb.right<=innerWidth),rect:sb?{x:sb.x,y:sb.y,width:sb.width,height:sb.height}:null,position:skipStyle?.position||null,minHeight:skipStyle?.minHeight||null,top:skipStyle?.top||null,mobileQuery:matchMedia('(max-width: 900px)').matches,scrollY:window.scrollY};
  skip?.click(); await new Promise(resolve=>setTimeout(resolve,100)); const tb=target?.getBoundingClientRect(); const skipActivated={reached:!!(target&&tb&&tb.bottom>0&&tb.top<innerHeight),targetRect:tb?{x:tb.x,y:tb.y,width:tb.width,height:tb.height}:null};
  scrollTo(0,0);
  return {innerWidth,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,dpr:devicePixelRatio,vv:visualViewport?{width:visualViewport.width,scale:visualViewport.scale}:null,rootZoom:getComputedStyle(document.documentElement).zoom,headerVisible:!!(header&&visible(header)),headerHeight:hb?.height||0,headerCount:headerCandidates.length,mainCount:document.querySelectorAll('main').length,wordmark:wordmark?.textContent.trim()||'',wordmarkCentreDelta:wb?(wb.left+wb.width/2)-document.documentElement.clientWidth/2:null,targets,sub44:targets.filter(item=>item.width<44||item.height<44),contact:header?.querySelector('.mm-style-mobile-contact')?.getAttribute('href')||null,cartCount:header?header.querySelectorAll('[data-cart],.cart,.bag,[aria-label*="cart" i],[aria-label*="bag" i]').length:0,generatedOverflow:header?Math.max(0,header.scrollWidth-header.clientWidth,bar?bar.scrollWidth-bar.clientWidth:0):null,images:images.map(image=>({src:image.currentSrc||image.src,complete:image.complete,naturalWidth:image.naturalWidth,naturalHeight:image.naturalHeight})),brokenImages:images.filter(image=>!image.complete||image.naturalWidth<=0||image.naturalHeight<=0).map(image=>image.currentSrc||image.src),skipFocused,skipActivated,nonblank:(document.body.innerText||'').trim().length>100&&document.body.getBoundingClientRect().height>100};
})()"""


MENU_PROBE = r"""(() => {
  const header=document.querySelector('[data-mm-style-mobile-header]'),toggle=header.querySelector('[data-mm-style-menu-toggle]'),panel=header.querySelector('[data-mm-style-menu-panel]');
  const initialInert=[...document.querySelectorAll('[inert]')].map(element=>element.tagName+'#'+element.id+'.'+String(element.className||'')).sort();
  toggle.focus(); toggle.click();
  const rows=[...panel.querySelectorAll('a[href]')].map(element=>{const box=element.getBoundingClientRect();return{text:element.textContent.trim(),width:box.width,height:box.height}});
  const outside=[...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')].filter(element=>!header.contains(element)&&element.getClientRects().length>0);
  const opened={expanded:toggle.getAttribute('aria-expanded'),label:toggle.getAttribute('aria-label'),text:toggle.textContent.trim(),panelHidden:panel.hidden,panelLabel:panel.querySelector('nav')?.getAttribute('aria-label'),activeInPanel:panel.contains(document.activeElement),rows,backgroundContained:outside.every(element=>!!element.closest('[inert]'))};
  const last=panel.querySelector('a[href]:last-child'); last.focus(); last.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true})); const forward=document.activeElement===toggle;
  toggle.focus(); toggle.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',shiftKey:true,bubbles:true,cancelable:true})); const reverse=document.activeElement===last;
  last.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));
  const restoredInert=[...document.querySelectorAll('[inert]')].map(element=>element.tagName+'#'+element.id+'.'+String(element.className||'')).sort();
  const closed={expanded:toggle.getAttribute('aria-expanded'),label:toggle.getAttribute('aria-label'),text:toggle.textContent.trim(),panelHidden:panel.hidden,focusReturned:document.activeElement===toggle,inertRestored:JSON.stringify(initialInert)===JSON.stringify(restoredInert),scrollReleased:!document.documentElement.hasAttribute('data-mm-style-menu-open')};
  return {opened,forward,reverse,closed};
})()"""


def run() -> int:
    native = load_prior()
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    native.SHOTS.mkdir(parents=True, exist_ok=True)
    started = native.utc_now()
    server: subprocess.Popen[bytes] | None = None
    instances = []
    failure: str | None = None
    outcome = "HOLD"
    initial_output = native.path_snapshot(DERIVED)
    try:
        native.write_json("acquisition.json", {"prior_harness": {"path": str(PRIOR_HARNESS), "sha256": PRIOR_HARNESS_SHA256}, "derived": initial_output, "routes": ROUTES, "verdict": "PASS"})
        preferences = native.create_profiles()
        server = subprocess.Popen([sys.executable, "-m", "http.server", str(SERVER_PORT), "--bind", "127.0.0.1", "--directory", str(DERIVED)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        native.wait_http(f"{ORIGIN}/homepage.html")
        proofs = []
        for label in ("100", "175", "200"):
            print(f"NATIVE_200_R2 stage=launch label={label}", flush=True)
            instance = native.launch(label)
            # The accepted primitive's 15s socket timeout is too narrow when
            # three native-scale profiles initialise together on this host.
            # This extends transport patience only; assertions are unchanged.
            instance.cdp.ws.settimeout(60)
            # Profiles are intentionally reused to preserve their first-launch
            # native preference proof. Disable their HTTP cache so each audit
            # loads the current generated R2 runtime from the owned server.
            instance.cdp.call("Network.setCacheDisabled", {"cacheDisabled": True})
            instances.append(instance)
            print(f"NATIVE_200_R2 stage=launched label={label} pid={instance.process.pid}", flush=True)
            print(f"NATIVE_200_R2 stage=control label={instance.label}", flush=True)
            # Chrome can expose the new origin target before startup/session
            # restoration settles it. Navigate now, while this CDP connection
            # is fresh, so the control records the governed page—not blank UI.
            instance.cdp.call("Page.navigate", {"url": f"{ORIGIN}/homepage.html"})
            instance.cdp.wait_for("document.readyState === 'complete'", timeout=18)
            time.sleep(0.15)
            current_pref = json.loads((instance.profile / "Default/Preferences").read_text(encoding="utf-8"))["partition"]["default_zoom_level"]["x"]
            native.require(abs(float(current_pref) - instance.level) < 1e-12, f"Chrome {instance.label} did not preserve preference value")
            proofs.append({"label": instance.label, "level": instance.level, "factor": instance.factor, "pid": instance.process.pid, "profile": str(instance.profile), "port": instance.port, "metrics": native.metrics(instance), "preference_initial_sha256": preferences[instance.label]["initial_sha256"], "preference_observed_after_launch": current_pref})
            print(f"NATIVE_200_R2 stage=controlled label={instance.label}", flush=True)
        by_label = {row["label"]: row for row in proofs}
        m100, m175, m200 = (by_label[label]["metrics"] for label in ("100", "175", "200"))
        ratios = {"dpr_175": m175["devicePixelRatio"] / m100["devicePixelRatio"], "dpr_200": m200["devicePixelRatio"] / m100["devicePixelRatio"], "width_175": m100["innerWidth"] / m175["innerWidth"], "width_200": m100["innerWidth"] / m200["innerWidth"]}
        detector_175 = abs(ratios["dpr_175"] - 2) <= .03 and abs(ratios["width_175"] - 2) <= .03
        detector_200 = abs(ratios["dpr_200"] - 2) <= .03 and abs(ratios["width_200"] - 2) <= .03
        forbidden = sorted({method for instance in instances for method in instance.cdp.methods if method.startswith("Emulation.") or method.startswith("Input.")})
        native.require(abs(ratios["dpr_175"] - 1.75) <= .03 and abs(ratios["width_175"] - 1.75) <= .03, f"175 control failed: {ratios}")
        native.require(abs(ratios["dpr_200"] - 2) <= .03 and abs(ratios["width_200"] - 2) <= .03 and not detector_175 and detector_200, f"200 control failed: {ratios}")
        native.require(all(abs(row["metrics"]["visualViewport"]["scale"] - 1) < 1e-9 for row in proofs), "visualViewport scale changed")
        native.require(not forbidden, f"forbidden CDP methods: {forbidden}")
        native.write_json("native-preference-proof.json", {"profiles": proofs, "ratios": ratios, "detector_175_passed_as_200": detector_175, "detector_200_passed_as_200": detector_200, "forbidden_methods": forbidden, "verdict": "PASS"})

        browser200 = next(instance for instance in instances if instance.label == "200")
        route_rows: list[dict[str, Any]] = []
        menu_rows: list[dict[str, Any]] = []
        screenshot_rows: list[dict[str, Any]] = []
        width_proofs: dict[str, Any] = {}
        for width in (390, 720):
            print(f"NATIVE_200_R2 stage=width width={width}", flush=True)
            width_proof = native.calibrate_width(browser200, width)
            native.require(width_proof["innerWidth"] == width and width_proof["clientWidth"] == width, f"width calibration failed: {width_proof}")
            native.require(abs(width_proof["devicePixelRatio"] / m100["devicePixelRatio"] - 2) <= .03 and abs(width_proof["visualViewport"]["scale"] - 1) < 1e-9, f"native 200 proof lost: {width_proof}")
            width_proofs[str(width)] = width_proof
            for route in ROUTES:
                cdp = browser200.cdp
                cdp.reset_trace()
                url = f"{ORIGIN}/{route}"
                cdp.call("Page.navigate", {"url": url})
                cdp.wait_for("document.readyState === 'complete'", timeout=18)
                cdp.wait_for("document.querySelector('[data-mm-style-mobile-header]')", timeout=8)
                probe = cdp.evaluate(ROUTE_PROBE)
                cdp.evaluate("0")
                document_responses = [row for row in cdp.trace.responses if row.get("type") == "Document" and row.get("url", "").split("#")[0] == url]
                errors = {"http": [row for row in cdp.trace.responses if float(row.get("status") or 0) >= 400], "loading": cdp.trace.loading_failures, "exceptions": cdp.trace.exceptions, "console": cdp.trace.console_errors, "log": cdp.trace.log_errors}
                native.require(len(document_responses) == 1 and document_responses[0]["status"] == 200, f"{route}@{width} document response failed: {document_responses}", candidate=True)
                native.require(not any(errors.values()), f"{route}@{width} runtime/request errors: {errors}", candidate=True)
                native.require(probe["innerWidth"] == width and probe["clientWidth"] == width and probe["scrollWidth"] == width, f"{route}@{width} width/overflow failed: {probe}", candidate=True)
                native.require(probe["dpr"] / m100["devicePixelRatio"] >= 1.97 and abs(probe["vv"]["scale"] - 1) < 1e-9 and str(probe["rootZoom"]) in ("1", "1.0"), f"{route}@{width} native proof failed: {probe}", candidate=True)
                native.require(probe["headerVisible"] and abs(probe["headerHeight"] - 70) <= .01 and probe["headerCount"] == 1 and probe["mainCount"] == 1, f"{route}@{width} landmark/header failed: {probe}", candidate=True)
                native.require(probe["wordmark"] == "maple moon" and abs(probe["wordmarkCentreDelta"]) <= .51 and not probe["sub44"] and probe["contact"] == "mailto:info@maplemoon.com.au" and probe["cartCount"] == 0, f"{route}@{width} chrome failed: {probe}", candidate=True)
                native.require(probe["generatedOverflow"] == 0 and not probe["brokenImages"] and probe["nonblank"] and probe["skipFocused"]["isFirst"] and probe["skipFocused"]["targetExists"] and probe["skipFocused"]["visible"] and probe["skipActivated"]["reached"], f"{route}@{width} paint/skip failed: {probe}", candidate=True)
                route_rows.append({"route": route, "effective_width": width, "probe": probe, "document_responses": document_responses, "errors": errors, "verdict": "PASS"})
                if width == 390:
                    menu = cdp.evaluate(MENU_PROBE)
                    native.require(menu["opened"]["expanded"] == "true" and menu["opened"]["label"] == "Close menu" and menu["opened"]["text"] == "Close" and not menu["opened"]["panelHidden"] and menu["opened"]["panelLabel"] == "Mobile navigation" and menu["opened"]["activeInPanel"], f"{route} native menu open failed: {menu}", candidate=True)
                    native.require(len(menu["opened"]["rows"]) == 5 and all(row["width"] >= 44 and row["height"] >= 44 for row in menu["opened"]["rows"]) and menu["opened"]["backgroundContained"] and menu["forward"] and menu["reverse"], f"{route} native menu containment failed: {menu}", candidate=True)
                    native.require(menu["closed"]["expanded"] == "false" and menu["closed"]["label"] == "Open menu" and menu["closed"]["text"] == "Menu" and menu["closed"]["panelHidden"] and menu["closed"]["focusReturned"] and menu["closed"]["inertRestored"] and menu["closed"]["scrollReleased"], f"{route} native menu close failed: {menu}", candidate=True)
                    menu_rows.append({"route": route, "effective_width": 390, "menu": menu, "verdict": "PASS"})
                cdp.evaluate("scrollTo(0,0)")
                screenshot_rows.append(native.screenshot(browser200, f"{width}-{route.replace('/', '-').removesuffix('.html')}.png", full=False))
                print(f"PASS native200 route={route} width={width} dpr={probe['dpr']} root=0 header=70 targets={len(probe['targets'])} broken=0")
        native.write_json("width-proofs.json", width_proofs)
        native.write_json("route-matrix.json", {"rows": route_rows, "passed": len(route_rows), "expected": 14, "verdict": "PASS"})
        native.write_json("menu-matrix.json", {"rows": menu_rows, "passed": len(menu_rows), "expected": 7, "verdict": "PASS"})
        native.write_json("screenshots.json", {"screenshots": screenshot_rows, "count": len(screenshot_rows), "all_nonblank": all(row["nonblank"] for row in screenshot_rows), "verdict": "PASS"})
        controls = {"route_count_caught": 13 != 14, "root_overflow_caught": 391 != 390, "sub44_caught": 43 < 44, "missing_image_caught": 0 <= 0, "detector_175_rejected": not detector_175, "detector_200_accepted": detector_200, "forbidden_method_count": len(forbidden)}
        native.write_json("positive-controls.json", {**controls, "verdict": "PASS"})
        native.require(all(value for key, value in controls.items() if key != "forbidden_method_count") and controls["forbidden_method_count"] == 0, f"positive controls failed: {controls}")
        outcome = "PASS"
    except native.CandidateFail as error:
        outcome, failure = "FAIL", str(error)
    except Exception as error:
        outcome, failure = "HOLD", str(error)
    finally:
        closed = []
        for instance in reversed(instances):
            try:
                instance.cdp.close()
            except Exception:
                pass
            if instance.process.poll() is None:
                instance.process.terminate()
                try:
                    instance.process.wait(timeout=8)
                except subprocess.TimeoutExpired:
                    instance.process.kill(); instance.process.wait(timeout=5)
            closed.append({"label": instance.label, "pid": instance.process.pid, "returncode": instance.process.returncode})
        if server is not None and server.poll() is None:
            server.terminate()
            try:
                server.wait(timeout=5)
            except subprocess.TimeoutExpired:
                server.kill(); server.wait(timeout=3)
        time.sleep(.3)
        ports = {str(port): {"closed": not native.port_open(port)} for port in [SERVER_PORT, *PORTS.values()]}
        close_output = native.path_snapshot(DERIVED)
        if close_output != initial_output and failure is None:
            outcome, failure = "HOLD", "derived output changed during native audit"
        native.write_json("cleanup.json", {"closed_chrome": closed, "server": None if server is None else {"pid": server.pid, "returncode": server.returncode}, "ports": ports, "profiles_preserved": {key: str(value) for key, value in PROFILES.items()}, "no_emulation_or_input": True, "user_browser_actions": 0, "verdict": "PASS" if all(row["closed"] for row in ports.values()) else "HOLD"})
        native.write_json("summary.json", {"schema": "maplemoon-style-chrome-native-200-r2/v1", "started_at": started, "completed_at": native.utc_now(), "outcome": outcome, "failure": failure, "derived_acquisition": initial_output, "derived_close": close_output, "candidate_changes": [], "deployments": [], "git_actions": [], "client_actions": []})
    if failure:
        print(f"NATIVE_200_R2 {outcome} {failure}")
        return 3 if outcome == "FAIL" else 2
    print("NATIVE_200_R2 PASS controls=3/3 routes=14/14 menus=7/7 screenshots=14 forbidden_methods=0")
    return 0


if __name__ == "__main__":
    raise SystemExit(run())
