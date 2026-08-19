const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const root = __dirname;
const snapshot = path.join(root, "snapshot");
const cartPath = path.join(snapshot, "mock-cart.js");
const shopPath = path.join(snapshot, "shop.html");
const cart = fs.readFileSync(cartPath, "utf8");
const shop = fs.readFileSync(shopPath, "utf8");
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");

const probes = [
  {
    id: "cart_subtotal_label",
    regex: /\bsubtotal\b/i,
    subject: cart,
    positiveControl: "Subtotal $25.90",
    requirement: "The cart runtime exposes a subtotal label or target."
  },
  {
    id: "cart_subtotal_target",
    regex: /data-mm-(?:subtotal|cart-total)/i,
    subject: cart,
    positiveControl: '<span data-mm-subtotal>$25.90</span>',
    requirement: "The cart runtime contains a subtotal output target."
  },
  {
    id: "cart_monetary_arithmetic",
    regex: /(?:reduce\([^\n]{0,180}(?:price|amount)|(?:price|amount)[^\n]{0,100}\*[^\n]{0,100}quantity|quantity[^\n]{0,100}\*[^\n]{0,100}(?:price|amount))/i,
    subject: cart,
    positiveControl: "cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)",
    requirement: "The cart runtime computes a monetary total from item price and quantity."
  },
  {
    id: "selected_option_price_capture",
    regex: /(?:size-select|data-selected-price|dataset\.unitPrice|data-unit-price)/i,
    subject: cart,
    positiveControl: "const selected = card.querySelector('.size-select'); product.price = card.dataset.unitPrice;",
    requirement: "The cart runtime reads the selected catalogue option or its selected price."
  }
];

const results = probes.map((probe) => ({
  id: probe.id,
  requirement: probe.requirement,
  positive_control_detected: probe.regex.test(probe.positiveControl),
  immutable_cart_detected: probe.regex.test(probe.subject)
}));

const facts = {
  shop_has_option_controls: /class="size-select"/.test(shop),
  shop_updates_selected_price: /data-selected-price/.test(shop) && /selectionOf\(card\)/.test(shop),
  cart_captures_price_from_static_pr: /price:\s*priceWithoutSize\(priceElement\)/.test(cart),
  cart_captures_size_from_static_pr_child: /size:\s*cleanText\(sizeElement\?\.textContent/.test(cart),
  cart_summary_rows: [...cart.matchAll(/mm-cart-summary-row[^\n]*<span>([^<]+)<\/span>/g)].map((match) => match[1]),
  cart_total_quantity_only: /const totalQuantity\s*=/.test(cart)
};

const controlsPass = results.every((result) => result.positive_control_detected);
const requiredConstructsPass = results.every((result) => result.immutable_cart_detected);
const outcome = controlsPass && requiredConstructsPass ? "PASS" : "HOLD";
const report = {
  schema: "maplemoon-commerce-static-gate/v1",
  outcome,
  reason: outcome === "HOLD"
    ? "Immutable preview cart has no subtotal UI/calculation and does not read selected multi-option price state."
    : "All required constructs detected.",
  snapshot: {
    mock_cart_js_sha256: sha256(cart),
    shop_html_sha256: sha256(shop)
  },
  controls_pass: controlsPass,
  required_constructs_pass: requiredConstructsPass,
  probes: results,
  facts
};

const output = JSON.stringify(report, null, 2) + "\n";
fs.writeFileSync(path.join(root, "results", "static-commerce-gate.json"), output);
process.stdout.write(output);
process.exit(outcome === "PASS" ? 0 : 2);
