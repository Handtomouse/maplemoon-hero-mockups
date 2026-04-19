#!/usr/bin/env python3
"""
Build homepage_walkthrough.html — section-by-section review companion.

v2 (Apr 19 pm):
  - Cream/sand palette (was elixir-dark)
  - Active-on-scroll via IntersectionObserver
  - Keyboard shortcuts: j/k (prev/next), 1-4 (verdicts), n (notes), u (undecided), ? (help)
  - Progress indicator "X of 8 decided"
  - Jump-to-first-undecided button
  - Em-dash for empty-verdict chip (was centered dot)
"""
from __future__ import annotations
import json
from pathlib import Path
from build_hero_variants import (
    HERO_VARIANT_CSS,
    PRODUCT_SWAPS,
    ROOT,
    SRC,
    apply_common_transforms,
)
from build_review_picker import (
    PICKER_CSS,
    PICKER_HTML,
    PICKER_JS,
    HERO_BG_BUNDLE,
)

OUT = ROOT / "homepage_walkthrough.html"

SECTIONS = [
    {"id": "hero",       "anchor": "#hero",                              "title": "Hero",           "desc": "Flavour picker + atmospheric BG (3 variants via picker top-right)"},
    {"id": "carob",      "anchor": "[aria-label='What is carob']",       "title": "What is carob",  "desc": "Dark editorial pullquote band"},
    {"id": "bento",      "anchor": "[aria-label='Explore']",             "title": "Bento (Explore)","desc": "3 image tiles + trust icons"},
    {"id": "origin",     "anchor": "#origin",                            "title": "Our Story",      "desc": "Origin copy + carob pods stock image"},
    {"id": "range",      "anchor": "#range",                             "title": "Shop the Range", "desc": "16 product grid — all canonical MM mockups"},
    {"id": "byron",      "anchor": "[aria-label='Byron Bay']",           "title": "Byron Bay",      "desc": "Dark editorial band"},
    {"id": "trust",      "anchor": "[aria-label='Credentials']",         "title": "Trust Bar",      "desc": "5 credential icons"},
    {"id": "newsletter", "anchor": "[aria-label='Newsletter']",          "title": "Newsletter",     "desc": "CTA section"},
]

WALKTHROUGH_CSS = """
/* ══════════════════════════════════════
   WALKTHROUGH PANEL v2 (Apr 19 review mode)
   cream/sand palette, cornflower accents
   ══════════════════════════════════════ */
body:not(.walkthrough-on) .walkthrough-panel,
body:not(.walkthrough-on) .wt-toast { display: none !important; }
body.walkthrough-on { padding-left: 300px; }
body.walkthrough-on .site-header { padding-left: 320px; }

.walkthrough-panel {
  position: fixed;
  top: 0; left: 0; bottom: 0;
  width: 300px;
  background: #FAF7F0;
  color: #3A2A1C;
  z-index: 200;
  display: flex;
  flex-direction: column;
  font-family: var(--mm-sans);
  font-size: 13px;
  border-right: 1px solid rgba(90, 60, 40, 0.12);
  box-shadow: 2px 0 24px rgba(90, 60, 40, 0.06);
}

.wt-head { padding: 18px 20px 12px; border-bottom: 1px solid rgba(90, 60, 40, 0.08); }
.wt-head h2 { font-family: var(--mm-serif); font-size: 19px; font-weight: 400; margin: 0 0 2px; color: #3A2A1C; }
.wt-head-row { display: flex; justify-content: space-between; align-items: baseline; margin-top: 6px; }
.wt-head p { margin: 0; opacity: 0.55; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; }
.wt-progress-label { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #6B5A4A; font-weight: 500; }
.wt-progress-bar { height: 2px; background: rgba(90, 60, 40, 0.08); margin-top: 8px; border-radius: 1px; overflow: hidden; }
.wt-progress-fill { height: 100%; background: #7B9DBF; width: 0%; transition: width 0.3s ease; }

.wt-list { overflow-y: auto; flex: 1; padding: 6px 0; }

.wt-item {
  display: grid;
  grid-template-columns: 22px 1fr auto;
  column-gap: 8px;
  row-gap: 2px;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background 0.15s ease, border-left-color 0.15s ease;
}
.wt-item:hover { background: rgba(123, 157, 191, 0.08); }
.wt-item.active { background: rgba(123, 157, 191, 0.12); border-left-color: #7B9DBF; }
.wt-item.in-view { box-shadow: inset 3px 0 0 rgba(123, 157, 191, 0.35); }

.wt-num { font-size: 11px; opacity: 0.45; font-variant-numeric: tabular-nums; }
.wt-title { color: #3A2A1C; font-weight: 500; }
.wt-desc { grid-column: 2 / -1; font-size: 11px; opacity: 0.55; line-height: 1.35; }
.wt-verdict-chip {
  grid-row: 1;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(90, 60, 40, 0.06);
  color: rgba(58, 42, 28, 0.38);
  font-weight: 500;
  min-width: 28px;
  text-align: center;
}
.wt-verdict-chip[data-verdict="keep"]  { background: rgba(91, 140, 86, 0.18);  color: #3F6B3A; }
.wt-verdict-chip[data-verdict="fix"]   { background: rgba(217, 154, 30, 0.18); color: #9C6C0A; }
.wt-verdict-chip[data-verdict="regen"] { background: rgba(201, 90, 90, 0.18);  color: #9C3030; }
.wt-verdict-chip[data-verdict="skip"]  { background: rgba(120, 120, 120, 0.18); color: #5A5A5A; }

.wt-detail {
  padding: 14px 20px 16px;
  border-top: 1px solid rgba(90, 60, 40, 0.08);
  background: rgba(255, 255, 255, 0.5);
}
.wt-detail h3 { margin: 0 0 8px; font-family: var(--mm-serif); font-size: 16px; font-weight: 400; color: #3A2A1C; }
.wt-detail p  { margin: 0 0 12px; opacity: 0.65; font-size: 12px; line-height: 1.45; }

.wt-verdicts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin-bottom: 10px;
}
.wt-verdict-btn {
  appearance: none;
  border: 1px solid rgba(90, 60, 40, 0.15);
  background: rgba(255, 255, 255, 0.7);
  color: #6B5A4A;
  padding: 8px 2px;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: var(--mm-sans);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
}
.wt-verdict-btn .kbd { display: block; font-size: 9px; opacity: 0.5; margin-top: 1px; }
.wt-verdict-btn:hover { background: rgba(123, 157, 191, 0.08); color: #3A2A1C; }
.wt-verdict-btn.active[data-verdict="keep"]  { background: #5B8C56; color: #FFFFFF; border-color: #5B8C56; }
.wt-verdict-btn.active[data-verdict="fix"]   { background: #D99A1E; color: #FFFFFF; border-color: #D99A1E; }
.wt-verdict-btn.active[data-verdict="regen"] { background: #C95A5A; color: #FFFFFF; border-color: #C95A5A; }
.wt-verdict-btn.active[data-verdict="skip"]  { background: #7A7A7A; color: #FFFFFF; border-color: #7A7A7A; }
.wt-verdict-btn.active .kbd { opacity: 0.75; }

.wt-notes {
  width: 100%;
  min-height: 90px;
  padding: 10px;
  background: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.15);
  border-radius: 4px;
  color: #3A2A1C;
  font-family: var(--mm-sans);
  font-size: 12px;
  line-height: 1.45;
  resize: vertical;
}
.wt-notes:focus { outline: none; border-color: #7B9DBF; box-shadow: 0 0 0 2px rgba(123, 157, 191, 0.18); }

.wt-nav {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  margin-top: 10px;
}
.wt-nav button {
  appearance: none;
  border: 1px solid rgba(90, 60, 40, 0.15);
  background: rgba(255, 255, 255, 0.7);
  color: #6B5A4A;
  padding: 8px 4px;
  font-size: 10px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: var(--mm-sans);
  border-radius: 4px;
  cursor: pointer;
}
.wt-nav button:hover { background: rgba(123, 157, 191, 0.08); color: #3A2A1C; }
.wt-nav button:disabled { opacity: 0.3; cursor: not-allowed; }
.wt-nav .wt-undecided {
  border-color: rgba(123, 157, 191, 0.35);
  color: #4A6A85;
  background: rgba(123, 157, 191, 0.08);
}
.wt-nav .wt-undecided:hover { background: rgba(123, 157, 191, 0.18); }

.wt-footer {
  padding: 10px 20px;
  border-top: 1px solid rgba(90, 60, 40, 0.08);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6px;
  align-items: center;
}
.wt-footer button.wt-copy {
  appearance: none;
  border: 1px solid #7B9DBF;
  background: #7B9DBF;
  color: #FFFFFF;
  padding: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: var(--mm-sans);
  border-radius: 4px;
  cursor: pointer;
}
.wt-footer button.wt-copy:hover { background: #6C8DAE; }
.wt-footer button.wt-reset {
  appearance: none;
  border: 1px solid rgba(90, 60, 40, 0.15);
  background: transparent;
  color: #9B8A7A;
  padding: 10px 12px;
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: var(--mm-sans);
  border-radius: 4px;
  cursor: pointer;
}
.wt-footer button.wt-reset:hover { color: #3A2A1C; }

.wt-shortcuts {
  padding: 8px 20px 12px;
  font-size: 10px;
  color: #9B8A7A;
  border-top: 1px solid rgba(90, 60, 40, 0.06);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  line-height: 1.4;
}
.wt-shortcuts kbd {
  display: inline-block;
  padding: 1px 5px;
  border: 1px solid rgba(90, 60, 40, 0.18);
  border-radius: 3px;
  background: #FFFFFF;
  font-family: var(--mm-mono, ui-monospace, monospace);
  font-size: 10px;
  color: #3A2A1C;
  margin-right: 2px;
}

.wt-toast {
  position: fixed;
  bottom: 24px;
  left: 320px;
  background: #3A2A1C;
  color: #FFFFFF;
  padding: 10px 18px;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(90, 60, 40, 0.2);
  font-family: var(--mm-sans);
  font-size: 12px;
  z-index: 300;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}
.wt-toast.show { opacity: 1; }
"""

WALKTHROUGH_HTML = '''
<aside class="walkthrough-panel" aria-label="Section review">
  <div class="wt-head">
    <h2>Section Review</h2>
    <div class="wt-head-row">
      <p>Apr 19 · Carli + Dylan</p>
      <span class="wt-progress-label" data-wt-progress-label>0 of 8 decided</span>
    </div>
    <div class="wt-progress-bar"><div class="wt-progress-fill" data-wt-progress-fill></div></div>
  </div>
  <div class="wt-list" data-wt-list></div>
  <div class="wt-detail" data-wt-detail>
    <h3 data-wt-title>Hero</h3>
    <p data-wt-desc>Flavour picker + atmospheric BG (3 variants via picker)</p>
    <div class="wt-verdicts">
      <button class="wt-verdict-btn" data-verdict="keep" type="button">Keep<span class="kbd">1</span></button>
      <button class="wt-verdict-btn" data-verdict="fix" type="button">Fix<span class="kbd">2</span></button>
      <button class="wt-verdict-btn" data-verdict="regen" type="button">Regen<span class="kbd">3</span></button>
      <button class="wt-verdict-btn" data-verdict="skip" type="button">Skip<span class="kbd">4</span></button>
    </div>
    <textarea class="wt-notes" data-wt-notes placeholder="Notes for this section..."></textarea>
    <div class="wt-nav">
      <button data-wt-prev type="button">&larr; Prev</button>
      <button data-wt-next type="button">Next &rarr;</button>
      <button data-wt-undecided class="wt-undecided" type="button" title="Jump to next undecided (u)">Next undecided</button>
    </div>
  </div>
  <div class="wt-footer">
    <button class="wt-copy" data-wt-copy type="button">Copy punch list</button>
    <button class="wt-reset" data-wt-reset type="button">Reset</button>
  </div>
  <div class="wt-shortcuts">
    <span><kbd>j</kbd>/<kbd>k</kbd> prev/next</span>
    <span><kbd>1-4</kbd> verdict</span>
    <span><kbd>n</kbd> notes</span>
    <span><kbd>u</kbd> next undecided</span>
    <span><kbd>c</kbd> copy list</span>
  </div>
</aside>
<div class="wt-toast" data-wt-toast>Copied</div>
'''

WALKTHROUGH_JS_TEMPLATE = r'''
<script>
(function () {
  var params = new URLSearchParams(window.location.search);
  if (params.get('review') !== '1') return;
  document.body.classList.add('walkthrough-on');

  var sections = __SECTIONS_JSON__;
  var STORE_KEY = 'mm_walkthrough_apr19_v2';
  var state = {};
  try { state = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {}; } catch (e) {}

  var listEl         = document.querySelector('[data-wt-list]');
  var titleEl        = document.querySelector('[data-wt-title]');
  var descEl         = document.querySelector('[data-wt-desc]');
  var notesEl        = document.querySelector('[data-wt-notes]');
  var prevBtn        = document.querySelector('[data-wt-prev]');
  var nextBtn        = document.querySelector('[data-wt-next]');
  var undecidedBtn   = document.querySelector('[data-wt-undecided]');
  var copyBtn        = document.querySelector('[data-wt-copy]');
  var resetBtn       = document.querySelector('[data-wt-reset]');
  var toastEl        = document.querySelector('[data-wt-toast]');
  var progressLabel  = document.querySelector('[data-wt-progress-label]');
  var progressFill   = document.querySelector('[data-wt-progress-fill]');

  var currentIdx = 0;
  var inViewIdx = -1;
  var sectionEls = [];

  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(function () { toastEl.classList.remove('show'); }, 1400);
  }

  function makeEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text != null) el.textContent = text;
    return el;
  }

  function clearChildren(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function decidedCount() {
    return sections.reduce(function (acc, s) {
      return acc + ((state[s.id] && state[s.id].verdict) ? 1 : 0);
    }, 0);
  }

  function updateProgress() {
    var n = decidedCount();
    var total = sections.length;
    progressLabel.textContent = n + ' of ' + total + ' decided';
    progressFill.style.width = (n / total * 100).toFixed(1) + '%';
  }

  function renderList() {
    clearChildren(listEl);
    sections.forEach(function (s, i) {
      var v = (state[s.id] && state[s.id].verdict) || '';
      var classes = 'wt-item';
      if (i === currentIdx) classes += ' active';
      if (i === inViewIdx && i !== currentIdx) classes += ' in-view';
      var item = makeEl('div', classes);
      item.dataset.idx = String(i);

      item.appendChild(makeEl('span', 'wt-num', String(i + 1).padStart(2, '0')));
      item.appendChild(makeEl('span', 'wt-title', s.title));

      var chipText = v ? v.toUpperCase() : '—';
      var chip = makeEl('span', 'wt-verdict-chip', chipText);
      if (v) chip.dataset.verdict = v;
      item.appendChild(chip);

      item.appendChild(makeEl('span', 'wt-desc', s.desc));

      item.addEventListener('click', function () { goto(i, true); });
      listEl.appendChild(item);
    });
  }

  function renderDetail() {
    var s = sections[currentIdx];
    titleEl.textContent = (currentIdx + 1) + '. ' + s.title;
    descEl.textContent = s.desc;
    var entry = state[s.id] || {};
    notesEl.value = entry.notes || '';
    document.querySelectorAll('.wt-verdict-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.verdict === entry.verdict);
    });
    prevBtn.disabled = currentIdx === 0;
    nextBtn.disabled = currentIdx === sections.length - 1;
    undecidedBtn.disabled = decidedCount() === sections.length;
  }

  function goto(idx, scroll) {
    if (idx < 0 || idx >= sections.length) return;
    currentIdx = idx;
    renderList();
    renderDetail();
    if (scroll) {
      var target = sectionEls[idx];
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function gotoFirstUndecided() {
    for (var i = 0; i < sections.length; i++) {
      var e = state[sections[i].id] || {};
      if (!e.verdict) { goto(i, true); return; }
    }
    toast('All sections decided');
  }

  function setVerdict(v) {
    var s = sections[currentIdx];
    var entry = state[s.id] || {};
    entry.verdict = entry.verdict === v ? '' : v;
    state[s.id] = entry;
    save();
    updateProgress();
    renderList();
    renderDetail();
  }

  document.querySelectorAll('.wt-verdict-btn').forEach(function (b) {
    b.addEventListener('click', function () { setVerdict(b.dataset.verdict); });
  });

  notesEl.addEventListener('input', function () {
    var s = sections[currentIdx];
    var entry = state[s.id] || {};
    entry.notes = notesEl.value;
    state[s.id] = entry;
    save();
  });

  prevBtn.addEventListener('click', function () { goto(currentIdx - 1, true); });
  nextBtn.addEventListener('click', function () { goto(currentIdx + 1, true); });
  undecidedBtn.addEventListener('click', gotoFirstUndecided);

  copyBtn.addEventListener('click', copyPunchlist);

  resetBtn.addEventListener('click', function () {
    if (!confirm('Clear all walkthrough notes?')) return;
    state = {};
    save();
    updateProgress();
    renderList();
    renderDetail();
    toast('Cleared');
  });

  function copyPunchlist() {
    var now = new Date();
    var ts = now.toISOString().slice(0, 19).replace('T', ' ');
    var heroMode = (document.querySelector('.hero-picker-btn.active') || {}).dataset;
    var heroLabel = heroMode && heroMode.variant ? heroMode.variant : 'unknown';
    var lines = [
      '# MM Homepage Walkthrough — Apr 19 review',
      '',
      '- Timestamp: ' + ts,
      '- Hero variant shown: ' + heroLabel,
      '- Progress: ' + decidedCount() + ' of ' + sections.length + ' decided',
      '- URL: ' + window.location.href
    ];
    sections.forEach(function (s, i) {
      var entry = state[s.id] || {};
      var verdict = entry.verdict ? entry.verdict.toUpperCase() : '—';
      lines.push('');
      lines.push('## ' + (i + 1) + '. ' + s.title + '  [' + verdict + ']');
      if (entry.notes && entry.notes.trim()) lines.push(entry.notes.trim());
    });
    var out = lines.join('\n');
    navigator.clipboard.writeText(out).then(
      function () { toast('Punch list copied'); },
      function () {
        var ta = document.createElement('textarea');
        ta.value = out; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        toast('Punch list copied (fallback)');
      }
    );
  }

  // Keyboard shortcuts — don't fire when typing in the notes textarea
  document.addEventListener('keydown', function (e) {
    if (e.target === notesEl) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'j':
      case 'ArrowDown':
        e.preventDefault(); goto(currentIdx + 1, true); break;
      case 'k':
      case 'ArrowUp':
        e.preventDefault(); goto(currentIdx - 1, true); break;
      case '1': e.preventDefault(); setVerdict('keep'); break;
      case '2': e.preventDefault(); setVerdict('fix'); break;
      case '3': e.preventDefault(); setVerdict('regen'); break;
      case '4': e.preventDefault(); setVerdict('skip'); break;
      case 'n': e.preventDefault(); notesEl.focus(); break;
      case 'u': e.preventDefault(); gotoFirstUndecided(); break;
      case 'c': e.preventDefault(); copyPunchlist(); break;
    }
  });

  // Intersection observer — highlight the section currently in view
  function resolveSectionEls() {
    sectionEls = sections.map(function (s) {
      try { return document.querySelector(s.anchor); } catch (e) { return null; }
    });
  }

  function setupObserver() {
    resolveSectionEls();
    if (!window.IntersectionObserver) return;
    var observer = new IntersectionObserver(function (entries) {
      // Pick the section with the largest intersection ratio among those visible.
      var best = null;
      entries.forEach(function (ent) {
        if (!ent.isIntersecting) return;
        if (!best || ent.intersectionRatio > best.intersectionRatio) best = ent;
      });
      if (!best) return;
      var idx = sectionEls.indexOf(best.target);
      if (idx >= 0 && idx !== inViewIdx) {
        inViewIdx = idx;
        renderList();
      }
    }, { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.1, 0.5] });

    sectionEls.forEach(function (el) { if (el) observer.observe(el); });
  }

  renderList();
  renderDetail();
  updateProgress();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObserver);
  } else {
    setupObserver();
  }
})();
</script>
'''


def build_walkthrough(source: str) -> str:
    out = source

    out = out.replace(
        "<title>Maple Moon — Artisan Carob from Byron Bay</title>",
        "<title>Maple Moon — Walkthrough (Apr 19)</title>",
    )

    css_anchor = "/* ══════════════════════════════════════\n   HERO — FLAVOUR PICKER (warm palette)"
    out = out.replace(
        css_anchor,
        HERO_VARIANT_CSS + "\n" + PICKER_CSS + "\n" + WALKTHROUGH_CSS + "\n" + css_anchor,
    )

    out = out.replace(
        '<section class="hero" id="hero" aria-label="Hero">\n\n',
        '<section class="hero hero--review hero--fog" id="hero" aria-label="Hero">\n\n'
        + HERO_BG_BUNDLE + "\n",
    )

    out = apply_common_transforms(out)

    body_tag = '<body class="has-atmospheric-hero">'
    if body_tag in out:
        out = out.replace(
            body_tag,
            body_tag + "\n" + PICKER_HTML.strip() + "\n" + WALKTHROUGH_HTML.strip() + "\n",
            1,
        )

    wt_js = WALKTHROUGH_JS_TEMPLATE.replace("__SECTIONS_JSON__", json.dumps(SECTIONS))
    out = out.replace("</body>", PICKER_JS + "\n" + wt_js + "\n</body>")

    return out


def main():
    source = SRC.read_text(encoding="utf-8")
    OUT.write_text(build_walkthrough(source), encoding="utf-8")
    print(f"  wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
