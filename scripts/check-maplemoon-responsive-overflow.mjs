#!/usr/bin/env node

const DEFAULT_TOLERANCE = 1;
const POSITIVE_CONTROL_ID = "maplemoon-overflow-positive-control";

export function rectOverflows(rect, viewportWidth, tolerance = DEFAULT_TOLERANCE) {
  return rect.left < -tolerance || rect.right > viewportWidth + tolerance;
}

export function scrollRangeReachable(
  contentLeft,
  contentRight,
  clientWidth,
  maxScroll,
  tolerance = DEFAULT_TOLERANCE,
) {
  const minimumRequired = Math.max(0, contentRight - clientWidth);
  const maximumAllowed = Math.min(maxScroll, contentLeft);
  return minimumRequired <= maximumAllowed + tolerance;
}

function descriptor(element) {
  const id = element.id ? `#${element.id}` : "";
  const classes = [...element.classList].slice(0, 3).map((name) => `.${name}`).join("");
  return `${element.tagName.toLowerCase()}${id}${classes}`;
}

function exclusionReason(element, style) {
  if (element.matches("script, style, link, meta, template, noscript")) return "metadata";
  if (element.closest("[hidden], [aria-hidden='true'], [inert], dialog:not([open])")) {
    return "hidden-subtree";
  }
  if (style.display === "none" || style.visibility === "hidden") return "not-rendered";
  if (style.position === "fixed") return "fixed";
  return null;
}

function horizontalScrollAncestor(element, tolerance) {
  let ancestor = element.parentElement;
  while (ancestor && ancestor !== document.documentElement) {
    const style = getComputedStyle(ancestor);
    const scrollable = /^(auto|scroll)$/.test(style.overflowX);
    if (scrollable && ancestor.scrollWidth > ancestor.clientWidth + tolerance) return ancestor;
    ancestor = ancestor.parentElement;
  }
  return null;
}

function scrollReachability(element, ancestor, tolerance) {
  const rect = element.getBoundingClientRect();
  const ancestorRect = ancestor.getBoundingClientRect();
  const contentLeft = rect.left - ancestorRect.left + ancestor.scrollLeft;
  const contentRight = contentLeft + rect.width;
  const maxScroll = Math.max(0, ancestor.scrollWidth - ancestor.clientWidth);
  return {
    reachable: scrollRangeReachable(
      contentLeft,
      contentRight,
      ancestor.clientWidth,
      maxScroll,
      tolerance,
    ),
    contentLeft,
    contentRight,
    clientWidth: ancestor.clientWidth,
    maxScroll,
  };
}

export function probeViewport({ tolerance = DEFAULT_TOLERANCE } = {}) {
  const viewportWidth = window.innerWidth;
  const failures = [];
  const scrollReachable = [];
  let examined = 0;
  let skipped = 0;

  for (const element of document.body.querySelectorAll("*")) {
    const style = getComputedStyle(element);
    const reason = exclusionReason(element, style);
    if (reason) {
      skipped += 1;
      continue;
    }

    const rect = element.getBoundingClientRect();
    if (rect.width <= tolerance || rect.height <= tolerance) {
      skipped += 1;
      continue;
    }
    examined += 1;
    if (!rectOverflows(rect, viewportWidth, tolerance)) continue;

    const scrollAncestor = horizontalScrollAncestor(element, tolerance);
    if (scrollAncestor) {
      const reachability = scrollReachability(element, scrollAncestor, tolerance);
      const record = {
        element: descriptor(element),
        scrollAncestor: descriptor(scrollAncestor),
        left: rect.left,
        right: rect.right,
        ...reachability,
      };
      if (reachability.reachable) scrollReachable.push(record);
      else failures.push({ ...record, reason: "scroll-unreachable" });
      continue;
    }

    failures.push({
      element: descriptor(element),
      reason: "viewport-overflow",
      left: rect.left,
      right: rect.right,
      width: rect.width,
      viewportWidth,
    });
  }

  return {
    viewport: { width: viewportWidth, height: window.innerHeight },
    examined,
    skipped,
    failures,
    scrollReachable,
  };
}

export function removePositiveControl() {
  document.getElementById(POSITIVE_CONTROL_ID)?.remove();
}

export function installPositiveControl() {
  removePositiveControl();
  const control = document.createElement("div");
  control.id = POSITIVE_CONTROL_ID;
  control.setAttribute("role", "presentation");
  Object.assign(control.style, {
    position: "absolute",
    left: "0",
    top: "0",
    width: "calc(100vw + 900px)",
    height: "2px",
    pointerEvents: "none",
    zIndex: "-1",
  });
  document.body.append(control);
  return control;
}

export function runPositiveControl(options = {}) {
  installPositiveControl();
  const result = probeViewport(options);
  const detected = result.failures.some((failure) =>
    failure.element.includes(`#${POSITIVE_CONTROL_ID}`),
  );
  removePositiveControl();
  return { detected, result };
}

function selfTest() {
  const failures = [];
  const assert = (condition, message) => {
    if (!condition) failures.push(message);
  };

  assert(!rectOverflows({ left: 0, right: 390 }, 390), "exact-fit rect failed");
  assert(rectOverflows({ left: -4, right: 92 }, 390), "left overflow was missed");
  assert(rectOverflows({ left: 0, right: 1290 }, 390), "positive overflow was missed");
  assert(scrollRangeReachable(380, 476, 340, 136), "reachable trailing item failed");
  assert(!scrollRangeReachable(-117, -21, 340, 136), "negative leading item was accepted");
  assert(!scrollRangeReachable(0, 500, 340, 160), "oversized unreachable item was accepted");

  if (failures.length) {
    for (const failure of failures) console.error(`FAIL ${failure}`);
    process.exitCode = 1;
    return;
  }
  console.log("PASS rect overflow and scroll reachability self-test");
}

if (typeof window !== "undefined") {
  globalThis.MapleMoonOverflowProbe = {
    installPositiveControl,
    probeViewport,
    rectOverflows,
    removePositiveControl,
    runPositiveControl,
    scrollRangeReachable,
  };
}

if (typeof process !== "undefined" && process.argv[1]?.endsWith("check-maplemoon-responsive-overflow.mjs")) {
  if (process.argv.includes("--self-test")) selfTest();
  else {
    console.error("Usage: node scripts/check-maplemoon-responsive-overflow.mjs --self-test");
    process.exitCode = 2;
  }
}
