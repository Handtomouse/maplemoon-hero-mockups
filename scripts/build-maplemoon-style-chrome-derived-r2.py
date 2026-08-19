#!/usr/bin/env python3
"""Build the non-overwriting MapleMoon style-chrome R2 diagnostic or final output.

R2 is a bounded correction layer over the pinned failed R1 builder. Importing
R1 keeps its exact reversible patch and protected-projection machinery while
this wrapper owns only the R2 destinations and, after the required seed
diagnostic, the generated chrome CSS/JS corrections.
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import sys
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
R1_BUILDER = REPO / "scripts/build-maplemoon-style-chrome-derived.py"
R1_SHA256 = "726c65c2fa9c0e1de1c0831abd5705300548c76b28bbb2799074fbb17e0bc3d5"
FINAL_OUTPUT = REPO / "_wip/deploy/generated/maplemoon-style-chrome-derived-r2-20260817T140018"
EVIDENCE_ROOT = REPO / "_wip/evidence/style_chrome_correction_r2_20260817T140018"
FINAL_BUILD_EVIDENCE = EVIDENCE_ROOT / "build"
SEED_OUTPUT = Path("/private/tmp/maplemoon-style-chrome-r2-seed-20260817T140018")
SEED_EVIDENCE = Path("/private/tmp/maplemoon-style-chrome-r2-seed-evidence-20260817T140018")

R2_CSS_PATCH = r"""
/* R2 bounded corrections: generated chrome sizing and skip-focus visibility. */
.mm-style-mobile-header,.mm-style-mobile-header *,.mm-style-mobile-header *::before,.mm-style-mobile-header *::after{
  box-sizing:border-box;min-width:0
}
@media (max-width:900px){
  .mm-style-mobile-header,.mm-style-mobile-bar,.mm-style-mobile-panel{max-width:100%;overflow-x:clip}
  .mm-style-mobile-wordmark{
    display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;padding:0 4px
  }
  .mm-style-mobile-menu,.mm-style-mobile-contact{min-width:44px}
  :where(.skip-link,.mm-skip-link,.mm-review-skip,.mm-style-skip-link):focus{
    position:fixed!important;z-index:9100!important;top:8px!important;right:auto!important;bottom:auto!important;left:8px!important;
    display:inline-flex!important;align-items:center!important;width:auto!important;min-width:44px!important;height:auto!important;min-height:44px!important;
    margin:0!important;padding:8px 12px!important;clip:auto!important;clip-path:none!important;overflow:visible!important;
    opacity:1!important;visibility:visible!important;transform:none!important;translate:none!important;animation:none!important;transition:none!important;white-space:nowrap!important;
    color:#fff!important;background:#193653!important;border:0!important;border-radius:6px!important;text-decoration:none!important
  }
}
"""

R1_CONTAIN_BACKGROUND = """    function containBackground(on){
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
    }"""

R2_CONTAIN_BACKGROUND = """    function containBackground(on){
      if(on){
        inerted=[];
        var branch=header;
        while(branch&&branch!==document.body){
          Array.prototype.forEach.call(branch.parentElement.children,function(el){
            if(el===branch||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;
            inerted.push({el:el,inert:el.inert,aria:el.getAttribute('aria-hidden')});
            el.inert=true;el.setAttribute('aria-hidden','true');
          });
          branch=branch.parentElement;
        }
      }else{
        inerted.forEach(function(item){
          item.el.inert=item.inert;
          if(item.aria===null)item.el.removeAttribute('aria-hidden');else item.el.setAttribute('aria-hidden',item.aria);
        });
        inerted=[];
      }
    }"""

R2_SKIP_JS_PATCH = r"""

/* R2 bounded skip activation: make preserved route targets reliably reached. */
(function(){
  'use strict';
  document.querySelectorAll(':where(.skip-link,.mm-skip-link,.mm-review-skip,.mm-style-skip-link)[href^="#"]').forEach(function(skip){
    skip.addEventListener('click',function(event){
      var id=skip.getAttribute('href').slice(1);
      var target=id&&document.getElementById(id);
      if(!target)return;
      event.preventDefault();
      var top=Math.max(0,target.getBoundingClientRect().top+window.scrollY-78);
      var root=document.documentElement;
      var priorScrollBehavior=root.style.scrollBehavior;
      root.style.scrollBehavior='auto';
      window.scrollTo(0,top);
      root.style.scrollBehavior=priorScrollBehavior;
      if(typeof target.focus==='function')target.focus({preventScroll:true});
      if(history.replaceState)history.replaceState(null,'','#'+id);
    });
  });
})();
"""


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def load_r1():
    actual = sha256_file(R1_BUILDER)
    if actual != R1_SHA256:
        raise RuntimeError(f"pinned R1 builder drift: {actual}")
    spec = importlib.util.spec_from_file_location("maplemoon_style_chrome_r1", R1_BUILDER)
    if spec is None or spec.loader is None:
        raise RuntimeError("cannot load pinned R1 builder")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def apply_r2_corrections(r1) -> None:
    if r1.STYLE_JS.count(R1_CONTAIN_BACKGROUND) != 1:
        raise RuntimeError("R1 containment patch anchor is not exact")
    r1.STYLE_CSS = r1.STYLE_CSS + R2_CSS_PATCH
    r1.STYLE_JS = r1.STYLE_JS.replace(
        R1_CONTAIN_BACKGROUND, R2_CONTAIN_BACKGROUND, 1
    )
    r1.STYLE_JS = r1.STYLE_JS + R2_SKIP_JS_PATCH


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--baseline", type=Path, required=True)
    parser.add_argument("--mode", choices=("seed", "final"), required=True)
    args = parser.parse_args()
    r1 = load_r1()
    if args.mode == "seed":
        output, evidence = SEED_OUTPUT, SEED_EVIDENCE
    else:
        output, evidence = FINAL_OUTPUT, FINAL_BUILD_EVIDENCE
        apply_r2_corrections(r1)
    r1.DEFAULT_OUTPUT = output
    r1.DEFAULT_EVIDENCE = evidence
    try:
        files, byte_count = r1.build(args.baseline, output, evidence)
    except Exception as exc:
        print(f"STYLE R2 {args.mode.upper()} FAIL: {exc}", file=sys.stderr)
        return 1
    print(
        f"STYLE R2 {args.mode.upper()} PASS output={output} files={files} "
        f"bytes={byte_count} pages=7 reverse=7/7 projections=7/7"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
