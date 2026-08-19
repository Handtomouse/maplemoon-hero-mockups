#!/usr/bin/env python3
"""Build the admitted MapleMoon style-only mobile-chrome derived output.

This builder never reads or edits the six WIP pages directly. It accepts only a
fresh output from the pinned private-preview builder, copies it through a
staging directory, and applies exact count-one reversible patches. Evidence is
written beside the derived output so customer-copy and non-chrome equality can
be independently replayed.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import sys
from html.parser import HTMLParser
from pathlib import Path
from typing import Any


REPO = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = (
    REPO / "_wip/deploy/generated/maplemoon-style-chrome-derived-20260817T134139"
)
DEFAULT_EVIDENCE = REPO / "_wip/evidence/style_chrome_derived_20260817T134139"

PAGES = (
    "homepage.html",
    "shop.html",
    "our-story.html",
    "carob-story.html",
    "faq.html",
    "stockists.html",
    "products/pure-carob-bar.html",
)

ROUTE_CONFIG: dict[str, dict[str, str]] = {
    "homepage.html": {
        "route": "home",
        "skip": '<a class="skip-link mm-skip-link" href="#main-content">Skip to main content</a>',
        "current": "home",
    },
    "shop.html": {
        "route": "shop",
        "skip": '<a class="skip-link" href="#catalogue-title">Skip to the catalogue</a>',
        "current": "shop",
    },
    "our-story.html": {
        "route": "our-story",
        "skip": "",
        "current": "our-story",
    },
    "carob-story.html": {
        "route": "carob-story",
        "skip": '<a class="skip-link" href="#carob-story">Skip to the carob story</a>',
        "current": "carob-story",
    },
    "faq.html": {
        "route": "faq",
        "skip": '<a class="skip-link" href="#main-content">Skip to main content</a>',
        "current": "faq",
    },
    "stockists.html": {
        "route": "stockists",
        "skip": '<a class="mm-review-skip" href="#main-content">Skip to main content</a>',
        "current": "stockists",
    },
    "products/pure-carob-bar.html": {
        "route": "pure-carob-bar",
        "skip": '<a class="skip-link" href="#product-title">Skip to the product</a>',
        "current": "shop",
    },
}

HEAD_LINK = '<link rel="stylesheet" href="/style-chrome-derived.css" data-mm-style-chrome-generated>'
BODY_SCRIPT = '<script defer src="/style-chrome-derived.js" data-mm-style-chrome-generated></script>'

STYLE_CSS = r"""/* MapleMoon style-only derived mobile chrome. Packet 20260817T134139. */
.mm-style-mobile-header{display:none}
.mm-style-skip-link{
  position:fixed;z-index:9100;top:8px;left:8px;padding:10px 14px;
  color:#fff;background:#193653;transform:translateY(-180%);text-decoration:none
}
.mm-style-skip-link:focus{transform:translateY(0)}
@media (max-width:900px){
  html{scroll-padding-top:86px}
  :where(a,button,input,select,textarea,summary,[tabindex]):focus{scroll-margin-top:86px}
  body>.wf .wf-phero>header.mm-site-header,
  body>.sp>header.sp-top,
  body>.os>header.os-top,
  body>.cs>header.sp-top{display:none!important}
  .mm-style-mobile-header{
    display:block;position:relative;z-index:9000;width:100%;height:70px;min-height:70px;
    color:var(--mm-color-ink,#2c2a26);background:var(--mm-color-paper,#f4f2ed);
    border-bottom:1px solid var(--mm-color-line,rgba(44,42,38,.14));
    font-family:var(--mm-font-sans,Inter,"Helvetica Neue",Arial,sans-serif)
  }
  .mm-style-mobile-bar{
    display:grid;grid-template-columns:minmax(44px,1fr) auto minmax(44px,1fr);
    align-items:center;width:100%;height:70px;min-height:70px;padding:0 16px;gap:10px
  }
  .mm-style-mobile-menu,.mm-style-mobile-contact,.mm-style-mobile-wordmark,
  .mm-style-mobile-panel a{
    color:inherit;text-decoration:none;text-shadow:none
  }
  .mm-style-mobile-menu,.mm-style-mobile-contact{
    display:inline-flex;align-items:center;min-width:44px;min-height:44px;border:0;
    border-radius:8px;background:transparent;font:600 14px/1 var(--mm-font-sans,Inter,"Helvetica Neue",Arial,sans-serif);
    letter-spacing:.04em
  }
  .mm-style-mobile-menu{justify-self:start;justify-content:flex-start;padding:0 8px 0 0;cursor:pointer}
  .mm-style-mobile-contact{justify-self:end;justify-content:flex-end;padding:0 0 0 8px}
  .mm-style-mobile-wordmark{
    justify-self:center;white-space:nowrap;font:500 21px/1 var(--mm-font-serif,"P22 Mackinac Pro",Georgia,serif);
    letter-spacing:.01em
  }
  .mm-style-mobile-menu:hover,.mm-style-mobile-contact:hover,.mm-style-mobile-wordmark:hover,
  .mm-style-mobile-panel a:hover{color:var(--mm-color-blue-deep,#457798)}
  .mm-style-mobile-menu:focus-visible,.mm-style-mobile-contact:focus-visible,
  .mm-style-mobile-wordmark:focus-visible,.mm-style-mobile-panel a:focus-visible{
    outline:2px solid var(--mm-color-accent-blue,#4074b6);outline-offset:3px
  }
  .mm-style-mobile-panel[hidden]{display:none!important}
  .mm-style-mobile-panel{
    position:fixed;z-index:8999;inset:70px 0 0;display:block;overflow:auto;
    overscroll-behavior:contain;padding:max(18px,env(safe-area-inset-top)) 16px max(28px,env(safe-area-inset-bottom));
    background:var(--mm-color-paper,#f4f2ed);border-top:1px solid var(--mm-color-line,rgba(44,42,38,.14))
  }
  .mm-style-mobile-panel nav{display:grid;width:min(100%,42rem);margin:0 auto;border-top:1px solid var(--mm-color-line,rgba(44,42,38,.14))}
  .mm-style-mobile-panel a{
    display:flex;align-items:center;justify-content:space-between;min-height:52px;padding:4px 2px;
    border-bottom:1px solid var(--mm-color-line,rgba(44,42,38,.14));
    font:500 18px/1.25 var(--mm-font-serif,"P22 Mackinac Pro",Georgia,serif)
  }
  .mm-style-mobile-panel a[aria-current="page"]{color:var(--mm-color-blue-deep,#457798)}
  .mm-style-mobile-panel a::after{content:"→";font-family:var(--mm-font-sans,Inter,"Helvetica Neue",Arial,sans-serif);font-size:15px}
  html[data-mm-style-menu-open],html[data-mm-style-menu-open] body{overflow:hidden!important}
}
@media (max-width:359px){
  .mm-style-mobile-bar{padding-inline:12px;gap:6px}
  .mm-style-mobile-menu,.mm-style-mobile-contact{font-size:13px}
  .mm-style-mobile-wordmark{font-size:19px}
}
@media (prefers-reduced-motion:reduce){
  .mm-style-mobile-header *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
}
"""

STYLE_JS = r"""/* MapleMoon style-only derived mobile chrome. Packet 20260817T134139. */
(function(){
  'use strict';
  var media=window.matchMedia('(max-width: 900px)');
  document.querySelectorAll('[data-mm-style-mobile-header]').forEach(function(header){
    var toggle=header.querySelector('[data-mm-style-menu-toggle]');
    var panel=header.querySelector('[data-mm-style-menu-panel]');
    var inerted=[];
    var lastOpener=null;
    function focusables(){
      return Array.prototype.filter.call(header.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'),function(el){
        return !el.hidden&&el.getClientRects().length>0;
      });
    }
    function containBackground(on){
      if(on){
        inerted=[];
        Array.prototype.forEach.call(header.parentElement.children,function(el){
          if(el===header||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;
          inerted.push({el:el,inert:el.inert,aria:el.getAttribute('aria-hidden')});
          el.inert=true;el.setAttribute('aria-hidden','true');
        });
      }else{
        inerted.forEach(function(item){
          item.el.inert=item.inert;
          if(item.aria===null)item.el.removeAttribute('aria-hidden');else item.el.setAttribute('aria-hidden',item.aria);
        });
        inerted=[];
      }
    }
    function setOpen(open,returnFocus){
      if(!media.matches)open=false;
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
      toggle.textContent=open?'Close':'Menu';
      panel.hidden=!open;
      header.setAttribute('data-mm-style-menu-state',open?'open':'closed');
      document.documentElement.toggleAttribute('data-mm-style-menu-open',open);
      containBackground(open);
      if(open){
        lastOpener=toggle;
        var first=panel.querySelector('a[href]');if(first)first.focus();
      }else if(returnFocus&&lastOpener){
        lastOpener.focus();
      }
    }
    toggle.addEventListener('click',function(){setOpen(toggle.getAttribute('aria-expanded')!=='true',true);});
    header.addEventListener('keydown',function(event){
      if(toggle.getAttribute('aria-expanded')!=='true')return;
      if(event.key==='Escape'){event.preventDefault();setOpen(false,true);return;}
      if(event.key!=='Tab')return;
      var items=focusables();if(!items.length)return;
      var first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    });
    panel.addEventListener('click',function(event){if(event.target.closest('a[href]'))setOpen(false,false);});
    function reset(){if(!media.matches)setOpen(false,false);}
    if(media.addEventListener)media.addEventListener('change',reset);else media.addListener(reset);
    setOpen(false,false);
  });
})();
"""


class BuildError(RuntimeError):
    """Fail-closed derived build error."""


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def manifest(root: Path) -> dict[str, dict[str, Any]]:
    result: dict[str, dict[str, Any]] = {}
    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        relative = path.relative_to(root).as_posix()
        result[relative] = {"bytes": path.stat().st_size, "sha256": sha256_file(path)}
    return result


def directory_digest(items: dict[str, dict[str, Any]]) -> str:
    digest = hashlib.sha256()
    for relative, record in sorted(items.items()):
        digest.update(relative.encode("utf-8"))
        digest.update(b"\0")
        digest.update(record["sha256"].encode("ascii"))
        digest.update(b"\n")
    return digest.hexdigest()


def patch_once(text: str, old: str, new: str, label: str, records: list[dict[str, Any]]) -> str:
    occurrences = text.count(old)
    if occurrences != 1:
        raise BuildError(f"patch {label} expected one occurrence, found {occurrences}")
    records.append(
        {
            "label": label,
            "occurrences": occurrences,
            "old_bytes": len(old.encode("utf-8")),
            "new_bytes": len(new.encode("utf-8")),
            "old_sha256": sha256_bytes(old.encode("utf-8")),
            "new_sha256": sha256_bytes(new.encode("utf-8")),
            "old": old,
            "new": new,
        }
    )
    return text.replace(old, new, 1)


def mobile_header(route: str, current: str) -> str:
    destinations = (
        ("shop", "Shop", "/shop"),
        ("our-story", "Our Story", "/our-story"),
        ("carob-story", "What is Carob", "/carob-story"),
        ("stockists", "Stockists", "/stockists"),
        ("faq", "FAQ", "/faq"),
    )
    links = []
    for key, label, href in destinations:
        selected = ' aria-current="page"' if key == current else ""
        links.append(f'<a href="{href}"{selected}>{label}</a>')
    wordmark_current = ' aria-current="page"' if current == "home" else ""
    panel_id = f"mm-style-mobile-panel-{route}"
    return (
        f'<header class="mm-style-mobile-header" data-mm-style-mobile-header '
        f'data-mm-style-chrome-generated data-mm-style-route="{route}" '
        f'data-mm-style-menu-state="closed">\n'
        '  <div class="mm-style-mobile-bar">\n'
        f'    <button class="mm-style-mobile-menu" type="button" data-mm-style-menu-toggle '
        f'aria-expanded="false" aria-controls="{panel_id}" aria-label="Open menu">Menu</button>\n'
        f'    <a class="mm-style-mobile-wordmark" href="/homepage"{wordmark_current}>maple moon</a>\n'
        '    <a class="mm-style-mobile-contact" href="mailto:info@maplemoon.com.au">Contact</a>\n'
        '  </div>\n'
        f'  <div class="mm-style-mobile-panel" id="{panel_id}" data-mm-style-menu-panel hidden>\n'
        '    <nav aria-label="Mobile navigation">' + "".join(links) + "</nav>\n"
        '  </div>\n'
        '</header>'
    )


class TextAndLinkProjection(HTMLParser):
    VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.skip_depth = 0
        self.header_depth = 0
        self.link_stack: list[dict[str, Any]] = []
        self.text: list[str] = []
        self.links: list[dict[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_map = dict(attrs)
        generated = "data-mm-style-chrome-generated" in attrs_map
        if self.skip_depth:
            if tag not in self.VOID_TAGS:
                self.skip_depth += 1
            return
        if generated or tag in {"script", "style"}:
            if tag not in self.VOID_TAGS:
                self.skip_depth = 1
            return
        if tag == "header":
            self.header_depth += 1
        if tag == "a":
            self.link_stack.append(
                {
                    "href": attrs_map.get("href") or "",
                    "text": [],
                    "outside_header": self.header_depth == 0,
                }
            )

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        return

    def handle_endtag(self, tag: str) -> None:
        if self.skip_depth:
            self.skip_depth -= 1
            return
        if tag == "a" and self.link_stack:
            link = self.link_stack.pop()
            if link["outside_header"]:
                self.links.append(
                    {"href": str(link["href"]), "text": " ".join(" ".join(link["text"]).split())}
                )
        if tag == "header" and self.header_depth:
            self.header_depth -= 1

    def handle_data(self, data: str) -> None:
        if self.skip_depth or self.header_depth:
            return
        clean = " ".join(data.split())
        if clean:
            self.text.append(clean)
            if self.link_stack:
                self.link_stack[-1]["text"].append(clean)


def projection(text: str) -> dict[str, Any]:
    parser = TextAndLinkProjection()
    parser.feed(text)
    title = re.findall(r"(?is)<title\b[^>]*>.*?</title>", text)
    meta = re.findall(r"(?is)<meta\b[^>]*(?:name|property)=[\"'](?:description|og:[^\"']+|twitter:[^\"']+)[\"'][^>]*>", text)
    scripts = [
        block
        for block in re.findall(r"(?is)<script\b[^>]*>.*?</script>", text)
        if "data-mm-style-chrome-generated" not in block
    ]
    forms = re.findall(r"(?is)<form\b[^>]*>.*?</form>", text)
    footer = re.findall(r"(?is)<footer\b[^>]*>.*?</footer>", text)
    media: list[str] = []
    for tag in re.findall(r"(?is)<(?:img|source|video|picture)\b[^>]*>", text):
        media.extend(
            f"{name}={value}"
            for name, _, value in re.findall(r"(?is)\b(src|srcset|poster)\s*=\s*([\"'])(.*?)\2", tag)
        )
    payloads: dict[str, Any] = {
        "customer_text": parser.text,
        "title_meta_social": title + meta,
        "script_blocks": scripts,
        "forms": forms,
        "media_bindings": media,
        "non_header_links": parser.links,
        "footer_bytes": footer,
    }
    return {
        name: {
            "count": len(value),
            "sha256": sha256_bytes(json.dumps(value, ensure_ascii=False, separators=(",", ":")).encode("utf-8")),
        }
        for name, value in payloads.items()
    }


def patch_page(name: str, baseline: str) -> tuple[str, list[dict[str, Any]]]:
    config = ROUTE_CONFIG[name]
    records: list[dict[str, Any]] = []
    derived = patch_once(
        baseline,
        "</head>",
        f"{HEAD_LINK}\n</head>",
        "stylesheet-link",
        records,
    )
    header = mobile_header(config["route"], config["current"])
    if name == "our-story.html":
        body_open = "<body>\n"
        replacement = (
            '<body>\n<a class="mm-style-skip-link" href="#main-content" '
            'data-mm-style-chrome-generated>Skip to main content</a>\n'
            + header
            + "\n"
        )
        derived = patch_once(derived, body_open, replacement, "our-story-skip-mobile-header", records)
        main_open_anchor = "  </div></header>\n\n  <!-- Founders-first story opening."
        main_open_new = "  </div></header>\n\n  <main id=\"main-content\" tabindex=\"-1\">\n\n  <!-- Founders-first story opening."
        derived = patch_once(derived, main_open_anchor, main_open_new, "our-story-main-open", records)
        footer_anchor = "\n  <footer class=\"os-ft\">"
        derived = patch_once(derived, footer_anchor, "\n  </main>\n\n  <footer class=\"os-ft\">", "our-story-main-close", records)
    else:
        skip = config["skip"]
        derived = patch_once(derived, skip, f"{skip}\n{header}", "mobile-header-after-skip", records)
    derived = patch_once(
        derived,
        "</body>",
        f"{BODY_SCRIPT}\n</body>",
        "runtime-script",
        records,
    )
    return derived, records


def reverse_page(derived: str, records: list[dict[str, Any]]) -> str:
    reconstructed = derived
    for record in reversed(records):
        new = record["new"]
        old = record["old"]
        occurrences = reconstructed.count(new)
        if occurrences != 1:
            raise BuildError(
                f"reverse patch {record['label']} expected one occurrence, found {occurrences}"
            )
        reconstructed = reconstructed.replace(new, old, 1)
    return reconstructed


def build(baseline: Path, output: Path, evidence: Path) -> tuple[int, int]:
    baseline = baseline.resolve()
    output = output.resolve()
    evidence = evidence.resolve()
    expected_output = DEFAULT_OUTPUT.resolve()
    expected_evidence = DEFAULT_EVIDENCE.resolve()
    if output != expected_output or evidence != expected_evidence:
        raise BuildError("output and evidence must match the packet's exact writable paths")
    if not baseline.is_dir() or baseline.is_symlink():
        raise BuildError(f"fresh baseline is missing or unsafe: {baseline}")
    if output.exists() or evidence.exists():
        raise BuildError("packet output/evidence already exists; refusing overwrite")
    for name in PAGES:
        if not (baseline / name).is_file():
            raise BuildError(f"baseline page is missing: {name}")

    baseline_manifest = manifest(baseline)
    staging = output.with_name(f".{output.name}.building")
    evidence_staging = evidence.with_name(f".{evidence.name}.building")
    if staging.exists() or evidence_staging.exists():
        raise BuildError("staging path already exists")
    shutil.copytree(baseline, staging)
    evidence_staging.mkdir(parents=True)
    try:
        patch_manifest: dict[str, Any] = {
            "schema": "maplemoon-style-chrome-patch-manifest/v1",
            "packet_id": "MAPLEMOON-STYLE-CHROME-DERIVED-20260817T134139",
            "baseline_root": str(baseline),
            "routes": {},
        }
        projection_report: dict[str, Any] = {
            "schema": "maplemoon-style-chrome-projection-proof/v1",
            "routes": {},
        }
        for name in PAGES:
            source = baseline / name
            destination = staging / name
            baseline_text = source.read_text(encoding="utf-8")
            derived_text, operations = patch_page(name, baseline_text)
            reconstructed = reverse_page(derived_text, operations)
            if reconstructed.encode("utf-8") != source.read_bytes():
                raise BuildError(f"reverse reconstruction differs: {name}")
            before_projection = projection(baseline_text)
            after_projection = projection(derived_text)
            if before_projection != after_projection:
                raise BuildError(f"protected projection differs: {name}")
            destination.write_text(derived_text, encoding="utf-8")
            patch_manifest["routes"][name] = {
                "baseline_bytes": len(baseline_text.encode("utf-8")),
                "derived_bytes": len(derived_text.encode("utf-8")),
                "baseline_sha256": sha256_bytes(baseline_text.encode("utf-8")),
                "derived_sha256": sha256_bytes(derived_text.encode("utf-8")),
                "reverse_reconstructed_sha256": sha256_bytes(reconstructed.encode("utf-8")),
                "reverse_equal": True,
                "operation_count": len(operations),
                "operations": operations,
            }
            projection_report["routes"][name] = {
                "equal": True,
                "baseline": before_projection,
                "derived": after_projection,
            }

        (staging / "style-chrome-derived.css").write_text(STYLE_CSS, encoding="utf-8")
        (staging / "style-chrome-derived.js").write_text(STYLE_JS, encoding="utf-8")

        derived_manifest = manifest(staging)
        baseline_record = {
            "schema": "maplemoon-style-chrome-file-manifest/v1",
            "root": str(baseline),
            "files": baseline_manifest,
            "file_count": len(baseline_manifest),
            "directory_sha256": directory_digest(baseline_manifest),
        }
        derived_record = {
            "schema": "maplemoon-style-chrome-file-manifest/v1",
            "root": str(output),
            "files": derived_manifest,
            "file_count": len(derived_manifest),
            "directory_sha256": directory_digest(derived_manifest),
        }
        write_json(evidence_staging / "baseline-manifest.json", baseline_record)
        write_json(evidence_staging / "derived-manifest.json", derived_record)
        write_json(evidence_staging / "patch-manifest.json", patch_manifest)
        write_json(evidence_staging / "projection-proof.json", projection_report)
        summary = {
            "schema": "maplemoon-style-chrome-build-summary/v1",
            "baseline_files": len(baseline_manifest),
            "derived_files": len(derived_manifest),
            "routes": len(PAGES),
            "reverse_equal": all(
                row["reverse_equal"] for row in patch_manifest["routes"].values()
            ),
            "projections_equal": all(
                row["equal"] for row in projection_report["routes"].values()
            ),
            "runtime_assets": ["style-chrome-derived.css", "style-chrome-derived.js"],
        }
        write_json(evidence_staging / "build-summary.json", summary)
        staging.replace(output)
        evidence_staging.replace(evidence)
        file_count = sum(1 for path in output.rglob("*") if path.is_file())
        byte_count = sum(path.stat().st_size for path in output.rglob("*") if path.is_file())
        return file_count, byte_count
    except Exception:
        if staging.exists() and not staging.is_symlink():
            shutil.rmtree(staging)
        if evidence_staging.exists() and not evidence_staging.is_symlink():
            shutil.rmtree(evidence_staging)
        raise


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--baseline", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--evidence", type=Path, default=DEFAULT_EVIDENCE)
    args = parser.parse_args()
    try:
        files, byte_count = build(args.baseline, args.output, args.evidence)
    except (BuildError, OSError, UnicodeError, json.JSONDecodeError) as exc:
        print(f"STYLE BUILD FAIL: {exc}", file=sys.stderr)
        return 1
    print(
        f"STYLE BUILD PASS output={args.output.resolve()} files={files} bytes={byte_count} "
        "pages=7 reverse=7/7 projections=7/7 runtime_assets=2"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
