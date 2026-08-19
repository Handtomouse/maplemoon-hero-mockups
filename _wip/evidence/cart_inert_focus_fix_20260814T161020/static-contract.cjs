const fs = require("node:fs");
const path = require("node:path");

const candidatePath = "/Users/handtomouse/maplemoon_build_20260813/mock-cart.js";
const basePath = path.join(
  "/Users/handtomouse/maplemoon-website/_wip/checkpoints",
  "MAPLEMOON-CART-INERT-FOCUS-FIX-20260814T161020_20260814_161020_AEST",
  "files/maplemoon_build_20260813/mock-cart.js"
);
const outputPath = path.join(__dirname, "static-contract.json");
const candidate = fs.readFileSync(candidatePath, "utf8");
const base = fs.readFileSync(basePath, "utf8");

const probes = {
  already_open_guard_before_opener(source) {
    const guard = source.indexOf("if (cartOpen) return;", source.indexOf("const openCart"));
    const opener = source.indexOf("const intendedOpener", source.indexOf("const openCart"));
    const activate = source.indexOf("activateModalBoundary();", source.indexOf("const openCart"));
    return guard >= 0 && opener > guard && activate > opener;
  },
  direct_body_capture(source) {
    return source.includes("Array.from(document.body.children).forEach(inertBackgroundBranch);");
  },
  dynamic_body_observer(source) {
    return (
      source.includes("backgroundObserver = new MutationObserver") &&
      source.includes("record.addedNodes.forEach") &&
      source.includes("node.parentElement === document.body") &&
      source.includes("backgroundObserver.observe(document.body, { childList: true });")
    );
  },
  focusin_containment(source) {
    return (
      source.includes('document.addEventListener("focusin", containOutsideFocus, true);') &&
      source.includes("elements.dialog.contains(event.target)") &&
      source.includes("target.focus({ preventScroll: true });") &&
      source.includes('document.removeEventListener("focusin", containOutsideFocus, true);')
    );
  },
  exact_inert_ownership_restore(source) {
    return (
      source.includes('backgroundInertState.set(branch, branch.hasAttribute("inert"));') &&
      source.includes('if (wasInert) branch.setAttribute("inert", "");') &&
      source.includes('else branch.removeAttribute("inert");')
    );
  },
  teardown_before_restore(source) {
    const restore = source.indexOf("const restoreModalBoundary");
    const disconnect = source.indexOf("backgroundObserver.disconnect();", restore);
    const disable = source.indexOf("containmentActive = false;", restore);
    const remove = source.indexOf('document.removeEventListener("focusin", containOutsideFocus, true);', restore);
    const stateRestore = source.indexOf("backgroundInertState.forEach", restore);
    const returnFocus = source.indexOf("intendedReturnFocus.focus", source.indexOf("const closeCart"));
    const restoreCall = source.indexOf("restoreModalBoundary();", source.indexOf("const closeCart"));
    return (
      disconnect > restore &&
      disable > disconnect &&
      remove > disable &&
      stateRestore > remove &&
      restoreCall >= 0 &&
      returnFocus > restoreCall
    );
  },
  guarded_deferred_focus(source) {
    const stageGuard = source.match(/if \(cartOpen && elements\.dialog\.classList\.contains\("is-open"\)\)/g) || [];
    return stageGuard.length >= 2;
  }
};

const mutations = {
  already_open_guard_before_opener: (source) => source.replace("if (cartOpen) return;", ""),
  direct_body_capture: (source) => source.replace("Array.from(document.body.children).forEach(inertBackgroundBranch);", ""),
  dynamic_body_observer: (source) => source.replace("backgroundObserver.observe(document.body, { childList: true });", ""),
  focusin_containment: (source) => source.replace('document.addEventListener("focusin", containOutsideFocus, true);', ""),
  exact_inert_ownership_restore: (source) => source.replace('else branch.removeAttribute("inert");', ""),
  teardown_before_restore: (source) => source.replace("backgroundObserver.disconnect();", ""),
  guarded_deferred_focus: (source) => source.replaceAll("if (cartOpen && elements.dialog.classList.contains(\"is-open\"))", "if (true)")
};

const results = Object.entries(probes).map(([id, probe]) => ({
  id,
  positive_control_detected: probe(mutations[id](candidate)) === false,
  candidate_detected: probe(candidate)
}));
const result = {
  schema: "maplemoon-cart-inert-focus-static/v1",
  outcome: results.every((item) => item.positive_control_detected && item.candidate_detected)
    ? "PASS"
    : "FAIL",
  probes: results,
  no_background_aria_hidden_expansion:
    (candidate.match(/aria-hidden/g) || []).length === (base.match(/aria-hidden/g) || []).length
};
if (!result.no_background_aria_hidden_expansion) result.outcome = "FAIL";
fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (result.outcome !== "PASS") process.exitCode = 1;
