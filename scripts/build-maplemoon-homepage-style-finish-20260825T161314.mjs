#!/usr/bin/env node

/**
 * Build the non-overwriting MapleMoon homepage style-finish review candidate.
 *
 * The pinned seven-route builder remains the only source compiler. This script
 * runs it into a disposable baseline, copies that baseline into a private
 * staging directory, injects one homepage-only stylesheet link, writes the
 * isolated stylesheet and mapping manifest, verifies the exact mutation
 * surface, then atomically renames the staging directory into place.
 */

import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT = fileURLToPath(import.meta.url);
const REPO = path.resolve(path.dirname(SCRIPT), "..");
const PACKET_ID = "MAPLEMOON-HOMEPAGE-STYLE-FINISH-20260825T161314";
const OUTPUT = path.join(
  REPO,
  "_wip/deploy/generated/maplemoon-homepage-style-finish-20260825T161314",
);
const STAGING = path.join(path.dirname(OUTPUT), `.${path.basename(OUTPUT)}.building`);
const SOURCE_BUILDER = path.join(REPO, "scripts/build-maplemoon-wip-preview.py");
const LINK = '<link rel="stylesheet" href="/styles/homepage-style-finish.css" data-maplemoon-homepage-style-finish="20260825T161314">';
const CSS_RELATIVE = "styles/homepage-style-finish.css";
const MANIFEST_RELATIVE = "homepage-style-finish-manifest.json";

const PINS = new Map([
  [path.join(REPO, "_wip/homepage_real_1_lead_photo.WIP.html"), "0e979d3737dc1484c6f4a4e23feed5ab7b74871b0b3ced84faa045c817f29e1b"],
  [SOURCE_BUILDER, "c8ea6c34d0207f9388ebf479f1c92ea77d63d61f5614cbbcf10a3896ef8c334a"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/HOMEPAGE-STYLES-DECISIONS-20260824.md", "c9f286b5d2c5b5367e74362e1ea69bbbf9b52be7be8bbccf6f4f668b7083a0d9"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/homepage-styles-batch-01.html", "15ce5c5679d9f978db50c31b25ac59fd004acd19014e9fc80e3d613b46ee642e"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-homepage-structure-preserved-style-tuning.html", "c603d3e26b4db821a18e2ca937f0b62ddc01b1ca2cc0ccb81571eb1926e0bdca"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/homepage-what-is-carob-batch-06.html", "7f95350047a7676499d785788655e34ee8c645f07e5a5a05ad6d1972addd8560"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-homepage-hybrid-current-vs-tuned.html", "1e22c01f02c973867692ccc4f942fcd150c5c1a92365a34bef2573987b3a4966"],
  ["/Users/handtomouse/.codex/visualizations/2026/08/12/019ff65f-fd33-7e51-8a83-360ba2f8d665/maple-moon-lane-2-homepage-system.html", "6d5b7a0986a698932b52fbdef67ef6a679b4dba4999feca9a3c686ec29328cf6"],
]);

const STYLE = `/*
 * MapleMoon homepage style finish — review candidate only.
 * HOME-STY-001 Night veil; HOME-STY-002 Monumental; HOME-STY-003 Long
 * dissolve; 5e legible tether notes; 5g open editorial comparison; 5j clean
 * single credit ledger; 5n dark open sampler; current footer anatomy only.
 * No DOM, copy, media, link, button, form, script or behaviour change.
 */
:root {
  --mm-hsf-ink: #15314f;
  --mm-hsf-ink-soft: #49647f;
  --mm-hsf-night: #10283b;
  --mm-hsf-night-deep: #0c2132;
  --mm-hsf-blue: #dcecf5;
  --mm-hsf-blue-deep: #c9dee9;
  --mm-hsf-cream: #f7f1da;
  --mm-hsf-gold: #b89a60;
  --mm-hsf-line: rgba(21, 49, 79, .20);
}

/* 5c / selected Home exception: restrained night veil and monumental mark. */
html body .wf .wf-ptop {
  min-height: 70px !important;
  padding-top: 0 !important;
  background: linear-gradient(180deg, rgba(6, 23, 40, .48) 0%, rgba(6, 23, 40, .16) 66%, transparent 100%) !important;
}
html body .wf .wf-ptop::before {
  height: 108px !important;
  background: linear-gradient(180deg, rgba(5, 20, 36, .38), rgba(5, 20, 36, .08) 72%, transparent) !important;
}
html body .wf .wf-ptop .bar {
  min-height: 70px !important;
  height: 70px !important;
  max-width: 1240px !important;
}
html body .wf .wf-plogo {
  font-size: clamp(1.35rem, 2vw, 1.65rem) !important;
  letter-spacing: .005em !important;
}
html body .wf .wf-pnav a,
html body .wf .wf-pnav .wf-currency {
  font-size: .68rem !important;
  letter-spacing: .11em !important;
  font-weight: 500 !important;
}
html body .wf .wf-pcenter {
  justify-content: flex-start !important;
  padding-top: clamp(34px, 5.5vh, 72px) !important;
}
html body .wf .wf-hero-copy {
  width: min(1040px, calc(100vw - 44px)) !important;
}
html body .wf .wf-pwm img {
  width: clamp(390px, 66vw, 1040px) !important;
}
html body .wf .wf-ptag {
  font-size: clamp(1.3rem, 2.2vw, 1.85rem) !important;
  margin-top: 8px !important;
}
html body .wf .wf-peyebrow {
  margin-bottom: 13px !important;
}
html body .wf .wf-pcreds {
  background: rgba(12, 33, 54, .30) !important;
  border-color: rgba(247, 241, 218, .25) !important;
  box-shadow: 0 16px 42px rgba(6, 20, 34, .14) !important;
}

/* HOME-STY-003: one long eased-looking dissolve into the same page wash. */
html body .wf .hero-vid,
html body .wf .wf-phero .bg {
  -webkit-mask-image: linear-gradient(180deg,
    #000 0%, #000 48%, rgba(0, 0, 0, .98) 54%, rgba(0, 0, 0, .90) 61%,
    rgba(0, 0, 0, .74) 69%, rgba(0, 0, 0, .52) 77%, rgba(0, 0, 0, .28) 86%,
    rgba(0, 0, 0, .10) 94%, transparent 100%) !important;
  mask-image: linear-gradient(180deg,
    #000 0%, #000 48%, rgba(0, 0, 0, .98) 54%, rgba(0, 0, 0, .90) 61%,
    rgba(0, 0, 0, .74) 69%, rgba(0, 0, 0, .52) 77%, rgba(0, 0, 0, .28) 86%,
    rgba(0, 0, 0, .10) 94%, transparent 100%) !important;
}
html body .wf .wf-phero::before {
  top: calc(var(--hero-h) + 230px) !important;
  height: 720px !important;
  background: linear-gradient(180deg,
    rgba(202, 222, 233, 0) 0%, rgba(207, 227, 238, .14) 20%,
    rgba(215, 233, 241, .42) 48%, rgba(220, 236, 245, .72) 73%,
    rgba(220, 236, 245, .92) 100%) !important;
  filter: blur(24px) !important;
}
@supports not ((mask-image: linear-gradient(#000, transparent)) or (-webkit-mask-image: linear-gradient(#000, transparent))) {
  html body .wf .hero-vid,
  html body .wf .wf-phero .bg { opacity: .86 !important; }
  html body .wf .wf-phero::before {
    top: calc(var(--hero-h) + 120px) !important;
    background: linear-gradient(180deg, transparent, rgba(220, 236, 245, .88) 72%, #dcecf5) !important;
  }
}

/* 5e: keep the approved navy tether-note text, give it a readable pale field. */
html body .wf .wf-what1 .co {
  color: var(--mm-hsf-ink) !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  line-height: 1.32 !important;
  text-shadow: none !important;
}
html body .wf .wf-what1 .co .lab {
  width: clamp(176px, 15vw, 208px) !important;
  padding: 11px 14px 12px !important;
  color: var(--mm-hsf-ink) !important;
  background: rgba(236, 246, 250, .90) !important;
  border: 1px solid rgba(21, 49, 79, .23) !important;
  border-radius: 3px !important;
  box-shadow: 0 12px 30px rgba(21, 49, 79, .14) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  backdrop-filter: blur(8px) !important;
}
html body .wf .wf-what1 .co .top svg {
  stroke: var(--mm-hsf-ink) !important;
}
html body .wf .wf-what1 .co .line {
  background: rgba(184, 154, 96, .88) !important;
}
html body .wf .wf-what1 .co .dot {
  background: rgba(247, 241, 218, .84) !important;
  border-color: var(--mm-hsf-gold) !important;
  box-shadow: 0 0 0 4px rgba(236, 246, 250, .54) !important;
}
html body .wf .wf-what1 .co .dot::after {
  background: var(--mm-hsf-gold) !important;
}

/* 5g: the comparison becomes an open two-column editorial ledger. */
html body .wf .q-why {
  display: grid !important;
  grid-template-columns: minmax(220px, .72fr) minmax(0, 1.28fr) !important;
  align-items: start !important;
  gap: clamp(42px, 6vw, 86px) !important;
  max-width: 1240px !important;
  margin-top: 0 !important;
  padding: clamp(88px, 9vw, 132px) 28px !important;
  background: transparent !important;
}
html body .wf .q-why-top {
  display: block !important;
  margin: 0 !important;
}
html body .wf .q-why-top::after {
  content: "";
  display: block;
  width: 52px;
  height: 1px;
  margin-top: 28px;
  background: var(--mm-hsf-gold);
}
html body .wf .q-compare-pro {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
  gap: clamp(20px, 3vw, 42px) !important;
  align-items: start !important;
  justify-content: stretch !important;
}
html body .wf .q-panel {
  min-width: 0 !important;
  overflow: visible !important;
  color: var(--mm-hsf-ink) !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}
html body .wf .q-panel-head {
  min-height: 0 !important;
  padding: 18px 0 22px !important;
  border-top: 1px solid var(--mm-hsf-line) !important;
  border-bottom: 0 !important;
}
html body .wf .q-panel-head h3 {
  font-size: clamp(1.35rem, 2vw, 1.65rem) !important;
}
html body .wf .q-panel-head span,
html body .wf .q-panel-row b,
html body .wf .q-panel-carob .q-panel-head span,
html body .wf .q-panel-carob .q-panel-row b {
  color: #856b3d !important;
}
html body .wf .q-panel-row,
html body .wf .q-panel-old .q-panel-row {
  display: block !important;
  min-height: 0 !important;
  padding: 15px 0 17px !important;
  border-top: 1px solid var(--mm-hsf-line) !important;
}
html body .wf .q-panel-row p,
html body .wf .q-panel-carob .q-panel-row p {
  color: var(--mm-hsf-ink-soft) !important;
  font-size: .92rem !important;
  line-height: 1.5 !important;
}
html body .wf .q-icon,
html body .wf .q-check {
  display: none !important;
}
html body .wf .q-vs {
  position: absolute !important;
  left: 50% !important;
  top: 28px !important;
  width: 32px !important;
  height: 32px !important;
  margin-left: -16px !important;
  border: 1px solid var(--mm-hsf-line) !important;
  color: var(--mm-hsf-ink-soft) !important;
  background: var(--mm-hsf-blue) !important;
  box-shadow: none !important;
}

/* 5j: remove the dark farm-entry band; keep one honest credit line. */
html body .wf .wf-where1 {
  background: transparent !important;
  overflow: clip !important;
}
html body .wf .wf-where1::before {
  background: linear-gradient(180deg, rgba(201, 222, 233, 0), rgba(201, 222, 233, .18) 52%, rgba(201, 222, 233, 0)) !important;
  filter: blur(14px) !important;
}
html body .wf .wf-where1 .wf-photo-credit {
  display: block !important;
  left: 50% !important;
  right: auto !important;
  bottom: 0 !important;
  width: min(1180px, 100%) !important;
  max-width: 1180px !important;
  margin: 0 !important;
  padding: 14px 28px 16px !important;
  transform: translateX(-50%) !important;
  color: #3f5d76 !important;
  background: linear-gradient(90deg, rgba(226, 240, 248, .90), rgba(226, 240, 248, .42) 62%, transparent) !important;
  border-top: 1px solid rgba(21, 49, 79, .18) !important;
  font-size: .68rem !important;
  font-weight: 500 !important;
  line-height: 1.45 !important;
  letter-spacing: .09em !important;
  text-transform: uppercase !important;
  text-shadow: none !important;
}

/* 5n: actual six packshots in the proof's open dark fan language. */
html body .wf .q-sampler {
  position: relative !important;
  isolation: isolate !important;
  max-width: none !important;
  width: 100% !important;
  padding: clamp(112px, 10vw, 152px) max(20px, calc((100vw - 1180px) / 2 + 28px)) clamp(82px, 8vw, 116px) !important;
  color: var(--mm-hsf-cream) !important;
  background: linear-gradient(180deg, rgba(16, 40, 59, 0) 0%, rgba(16, 40, 59, .76) 17%, var(--mm-hsf-night) 36%, var(--mm-hsf-night) 100%) !important;
  border: 0 !important;
}
html body .wf .q-sampler .qkick,
html body .wf .q-sampler .lux-hd,
html body .wf .q-sampler p,
html body .wf .q-sampler .sbox-list li,
html body .wf .q-sampler .sbox-gift {
  color: var(--mm-hsf-cream) !important;
}
html body .wf .q-sampler .qkick,
html body .wf .q-sampler .sbox-info .lid-k {
  color: #d7bd86 !important;
}
html body .wf .q-sampler .sbox {
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, .8fr) !important;
  gap: clamp(40px, 6vw, 84px) !important;
  width: min(1120px, 100%) !important;
  max-width: 1120px !important;
}
html body .wf .q-sampler .sbox-frame {
  max-width: 680px !important;
  padding: 18px 0 24px !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
html body .wf .q-sampler .sbox-lid {
  color: rgba(247, 241, 218, .68) !important;
  border-color: rgba(247, 241, 218, .20) !important;
}
html body .wf .q-sampler .sbox-grid {
  display: flex !important;
  align-items: flex-end !important;
  justify-content: center !important;
  gap: clamp(4px, 1.2vw, 12px) !important;
  min-height: 310px !important;
}
html body .wf .q-sampler .sbox-grid .well {
  display: flex !important;
  flex: 1 1 0 !important;
  align-items: flex-end !important;
  justify-content: center !important;
  min-width: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
}
html body .wf .q-sampler .sbox-grid img {
  width: min(100%, 92px) !important;
  max-height: 270px !important;
  filter: drop-shadow(0 24px 22px rgba(3, 14, 23, .32)) !important;
  transform-origin: 50% 100% !important;
}
html body .wf .q-sampler .sbox-grid .well:nth-child(1) img { transform: translateY(16px) rotate(-7deg) !important; }
html body .wf .q-sampler .sbox-grid .well:nth-child(2) img { transform: translateY(7px) rotate(-4deg) !important; }
html body .wf .q-sampler .sbox-grid .well:nth-child(3) img { transform: translateY(0) rotate(-1deg) !important; }
html body .wf .q-sampler .sbox-grid .well:nth-child(4) img { transform: translateY(0) rotate(1deg) !important; }
html body .wf .q-sampler .sbox-grid .well:nth-child(5) img { transform: translateY(7px) rotate(4deg) !important; }
html body .wf .q-sampler .sbox-grid .well:nth-child(6) img { transform: translateY(16px) rotate(7deg) !important; }
html body .wf .q-sampler .sbox-list li {
  border-color: rgba(247, 241, 218, .16) !important;
}
html body .wf .q-sampler .sbox-list li::before {
  background: #d7bd86 !important;
}
html body .wf .q-sampler .wf-pill {
  border-color: rgba(247, 241, 218, .66) !important;
  color: var(--mm-hsf-cream) !important;
}
html body .wf .q-sampler .wf-pill.solid {
  background: var(--mm-hsf-cream) !important;
  border-color: var(--mm-hsf-cream) !important;
  color: var(--mm-hsf-night) !important;
}

/* 5c footer: preserve current anatomy, complete the dark lower-page field. */
html body .wf .wf-trust {
  max-width: none !important;
  width: 100% !important;
  padding: 34px max(20px, calc((100vw - 1180px) / 2 + 28px)) 44px !important;
  color: var(--mm-hsf-cream) !important;
  background: var(--mm-hsf-night) !important;
  border-color: rgba(247, 241, 218, .16) !important;
}
html body .wf .wf-trust .wf-ti span,
html body .wf .wf-trust .wf-ti strong {
  color: inherit !important;
}
html body .wf .wf-trust .wf-ti svg {
  stroke: #d7bd86 !important;
}
html body .wf .wf-ft {
  color: var(--mm-hsf-cream) !important;
  background: linear-gradient(180deg, var(--mm-hsf-night) 0%, var(--mm-hsf-night-deep) 32%, #091c2b 100%) !important;
  border-color: rgba(247, 241, 218, .16) !important;
}
html body .wf .wf-ft .wrap {
  max-width: 1180px !important;
}
html body .wf .wf-nl {
  padding: clamp(44px, 5vw, 64px) 0 !important;
  border-color: rgba(247, 241, 218, .18) !important;
}
html body .wf .wf-nl .nlh {
  font-size: clamp(1.8rem, 3.4vw, 2.65rem) !important;
}
html body .wf .wf-nl input {
  color: var(--mm-hsf-cream) !important;
  background: rgba(247, 241, 218, .06) !important;
  border-color: rgba(247, 241, 218, .28) !important;
}
html body .wf .wf-nl button {
  color: var(--mm-hsf-night) !important;
  background: rgba(247, 241, 218, .72) !important;
  border-color: rgba(247, 241, 218, .72) !important;
}
html body .wf .wf-nl #home-newsletter-demo-note,
html body .wf .wf-ft .fnav a {
  color: rgba(247, 241, 218, .70) !important;
}
html body .wf .wf-ft .row {
  padding: 38px 0 52px !important;
}
html body .wf .wf-ft .wf-logo {
  font-size: clamp(2rem, 4vw, 2.6rem) !important;
}
html body .wf .wf-ft .soc a,
html body .wf .wf-ft .soc span {
  border-color: rgba(247, 241, 218, .22) !important;
}
html body .wf .wf-ft .soc svg {
  stroke: rgba(247, 241, 218, .74) !important;
}

@media (max-width: 900px) {
  html body .wf { --hero-h: 680px !important; }
  html body .wf .wf-ptop .bar {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  html body .wf .wf-pcenter {
    padding-top: 38px !important;
  }
  html body .wf .wf-pwm img {
    width: min(88vw, 560px) !important;
  }
  html body .wf .hero-vid,
  html body .wf .wf-phero .bg {
    -webkit-mask-image: linear-gradient(180deg,
      #000 0%, #000 43%, rgba(0, 0, 0, .96) 51%, rgba(0, 0, 0, .80) 62%,
      rgba(0, 0, 0, .56) 73%, rgba(0, 0, 0, .30) 84%, rgba(0, 0, 0, .10) 93%, transparent 100%) !important;
    mask-image: linear-gradient(180deg,
      #000 0%, #000 43%, rgba(0, 0, 0, .96) 51%, rgba(0, 0, 0, .80) 62%,
      rgba(0, 0, 0, .56) 73%, rgba(0, 0, 0, .30) 84%, rgba(0, 0, 0, .10) 93%, transparent 100%) !important;
  }
  html body .wf .wf-phero::before {
    top: calc(var(--hero-h) + 105px) !important;
    height: 590px !important;
    filter: blur(18px) !important;
  }
  html body .wf .wf-what1 .co .lab {
    width: min(176px, calc(50vw - 28px)) !important;
    padding: 9px 10px 10px !important;
  }
  html body .wf .wf-where1 .wf-photo-credit {
    position: static !important;
    order: 2 !important;
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 14px clamp(20px, 7vw, 56px) 18px !important;
    transform: none !important;
    background: transparent !important;
  }
  html body .wf .q-why {
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 36px !important;
    padding: 72px clamp(20px, 7vw, 56px) 82px !important;
  }
  html body .wf .q-compare-pro {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
    gap: 24px !important;
  }
  html body .wf .q-sampler {
    padding-left: clamp(20px, 7vw, 56px) !important;
    padding-right: clamp(20px, 7vw, 56px) !important;
  }
  html body .wf .q-sampler .sbox {
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 38px !important;
    width: min(680px, 100%) !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  html body .wf .q-sampler .sbox-frame {
    justify-self: stretch !important;
    width: 100% !important;
    max-width: 680px !important;
  }
  html body .wf .wf-trust {
    padding-left: clamp(20px, 7vw, 56px) !important;
    padding-right: clamp(20px, 7vw, 56px) !important;
  }
}

@media (max-width: 600px) {
  html body .wf { --hero-h: 640px !important; }
  html body .wf .wf-pcenter { padding-top: 30px !important; }
  html body .wf .wf-pwm img { width: min(92vw, 430px) !important; }
  html body .wf .wf-ptag { font-size: 1.22rem !important; }
  html body .wf .wf-pcreds { max-width: calc(100vw - 32px) !important; }
  html body .wf .wf-what1 .co {
    font-size: 12px !important;
  }
  html body .wf .wf-what1 .co .line { width: 18px !important; }
  html body .wf .q-compare-pro {
    grid-template-columns: minmax(0, 1fr) !important;
  }
  html body .wf .q-vs {
    position: static !important;
    margin: -4px auto !important;
  }
  html body .wf .q-sampler {
    padding-top: 106px !important;
    padding-bottom: 78px !important;
  }
  html body .wf .q-sampler .sbox-grid {
    gap: 4px !important;
    min-height: 206px !important;
  }
  html body .wf .q-sampler .sbox-grid img {
    width: min(100%, 56px) !important;
    max-height: 190px !important;
  }
  html body .wf .wf-trust {
    grid-template-columns: 1fr !important;
    gap: 18px !important;
  }
  html body .wf .wf-ft .row {
    align-items: flex-start !important;
    flex-direction: column !important;
  }
  html body .wf .wf-ft .fnav {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    width: 100% !important;
    gap: 16px 24px !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  html body .wf *,
  html body .wf *::before,
  html body .wf *::after {
    scroll-behavior: auto !important;
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
  }
}
`;

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function fail(message) {
  throw new Error(message);
}

function assertPins() {
  for (const [filePath, expected] of PINS) {
    if (!fs.statSync(filePath, { throwIfNoEntry: false })?.isFile()) fail(`missing pinned input: ${filePath}`);
    const actual = sha256(filePath);
    if (actual !== expected) fail(`pinned input drift: ${filePath} expected=${expected} actual=${actual}`);
  }
}

function walk(root) {
  const files = [];
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else if (entry.isFile()) files.push(path.relative(root, absolute));
      else fail(`unexpected non-file in build: ${absolute}`);
    }
  };
  visit(root);
  return files;
}

function strippedDom(html) {
  return html
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
}

function main() {
  assertPins();
  if (fs.existsSync(OUTPUT)) fail(`non-overwriting target already exists: ${OUTPUT}`);
  if (fs.existsSync(STAGING)) fail(`staging target already exists: ${STAGING}`);

  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "maplemoon-homepage-style-finish-"));
  const baseline = path.join(temporaryRoot, "baseline");
  try {
    const result = spawnSync("python3", ["-B", SOURCE_BUILDER, "--output", baseline], {
      cwd: REPO,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.status !== 0) fail(`pinned preview builder failed (${result.status}): ${result.stderr || result.stdout}`);
    if (!result.stdout.includes("BUILD PASS")) fail(`pinned preview builder returned no PASS: ${result.stdout}`);

    fs.cpSync(baseline, STAGING, { recursive: true, errorOnExist: true, force: false });
    const baselineHomepagePath = path.join(baseline, "homepage.html");
    const stagedHomepagePath = path.join(STAGING, "homepage.html");
    const baselineHomepage = fs.readFileSync(baselineHomepagePath, "utf8");
    if ((baselineHomepage.match(/<\/head>/g) || []).length !== 1) fail("homepage closing-head seam is not count-one");
    if (baselineHomepage.includes(LINK) || baselineHomepage.includes(CSS_RELATIVE)) fail("style-finish link already exists in baseline");
    const derivedHomepage = baselineHomepage.replace("</head>", `${LINK}\n</head>`);
    if ((derivedHomepage.match(/data-maplemoon-homepage-style-finish=/g) || []).length !== 1) fail("homepage style link injection is not count-one");
    fs.writeFileSync(stagedHomepagePath, derivedHomepage, "utf8");

    const cssPath = path.join(STAGING, CSS_RELATIVE);
    fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    fs.writeFileSync(cssPath, STYLE, "utf8");

    const dom = strippedDom(derivedHomepage);
    if (/<[^>]+class=["'][^"']*\bq-segments\b/i.test(dom)) fail("comparison segment control exists in derived DOM");
    const expectedHomepage = baselineHomepage.replace("</head>", `${LINK}\n</head>`);
    if (derivedHomepage !== expectedHomepage) fail("homepage changed beyond count-one style link injection");

    const baselineFiles = walk(baseline);
    for (const relative of baselineFiles) {
      if (relative === "homepage.html") continue;
      const before = sha256(path.join(baseline, relative));
      const after = sha256(path.join(STAGING, relative));
      if (before !== after) fail(`non-home/support baseline drift: ${relative}`);
    }

    const manifest = {
      schema: "maplemoon-homepage-style-finish/v1",
      packet_id: PACKET_ID,
      disposition: "BOSS_REVIEW_ONLY_NOT_PROMOTED",
      created_at: "2026-08-25T16:13:14+10:00",
      source_builder_stdout: result.stdout.trim(),
      pins: Object.fromEntries([...PINS].map(([filePath, expected]) => [filePath, expected])),
      mutation_surface: {
        homepage: "count-one stylesheet link injection only",
        stylesheet: `/${CSS_RELATIVE}`,
        manifest: `/${MANIFEST_RELATIVE}`,
        non_home_and_support_files: "byte-identical to fresh pinned baseline",
      },
      invariants: {
        homepage_flow_copy_media_buttons_links_forms_scripts_structured_data: "unchanged because the homepage mutation is exact link insertion only",
        comparison_segment_dom_nodes: 0,
        unidentified_button_restored: false,
        deploy_or_promotion: false,
      },
      mapping: [
        { item: "5c", selectors: [".wf-ptop", ".wf-pcenter", ".wf-pwm", ".hero-vid", ".wf-phero::before", ".wf-ft"], proof: "homepage-styles-batch-01.html + maple-moon-homepage-hybrid-current-vs-tuned.html", boundary: "current header/footer anatomy only; no legal/conditional markup claim" },
        { item: "5e", selectors: [".wf-what1 .co", ".wf-what1 .co .lab"], proof: "homepage-what-is-carob-batch-06.html", boundary: "retains current callout text and anchors" },
        { item: "5g", selectors: [".q-why", ".q-compare-pro", ".q-panel", ".q-panel-row"], proof: "maple-moon-homepage-hybrid-current-vs-tuned.html", boundary: "open editorial ledger; no segment control" },
        { item: "5j", selectors: [".wf-where1", ".wf-photo-credit"], proof: "maple-moon-lane-2-homepage-system.html", boundary: "one existing credit text node; no invented second ledger end" },
        { item: "5n", selectors: [".q-sampler", ".sbox", ".sbox-grid", ".wf-trust"], proof: "maple-moon-homepage-hybrid-current-vs-tuned.html", boundary: "six existing packshots; single-column tablet fallback" },
      ],
      hashes: {
        baseline_homepage_sha256: sha256(baselineHomepagePath),
        derived_homepage_sha256: sha256(stagedHomepagePath),
        stylesheet_sha256: sha256(cssPath),
      },
      baseline_file_count: baselineFiles.length,
    };
    fs.writeFileSync(path.join(STAGING, MANIFEST_RELATIVE), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

    assertPins();
    if (fs.existsSync(OUTPUT)) fail(`target appeared before atomic rename: ${OUTPUT}`);
    fs.renameSync(STAGING, OUTPUT);
    const outputFiles = walk(OUTPUT);
    const outputBytes = outputFiles.reduce((sum, relative) => sum + fs.statSync(path.join(OUTPUT, relative)).size, 0);
    console.log(`BUILD PASS packet=${PACKET_ID} output=${OUTPUT} baseline_files=${baselineFiles.length} output_files=${outputFiles.length} bytes=${outputBytes} link_injections=1 q_segments_dom=0 non_home_equal=1`);
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
    if (fs.existsSync(STAGING)) fs.rmSync(STAGING, { recursive: true, force: true });
  }
}

try {
  main();
} catch (error) {
  console.error(`BUILD FAIL packet=${PACKET_ID} reason=${error.message}`);
  process.exitCode = 1;
}
