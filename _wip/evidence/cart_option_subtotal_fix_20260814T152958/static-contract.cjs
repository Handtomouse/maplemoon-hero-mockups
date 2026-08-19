const fs = require("node:fs");
const crypto = require("node:crypto");

const cartPath = "/Users/handtomouse/maplemoon_build_20260813/mock-cart.js";
const cssPath = "/Users/handtomouse/maplemoon_build_20260813/mock-cart.css";
const shopPath = "/Users/handtomouse/maplemoon_build_20260813/shop.html";
const cart = fs.readFileSync(cartPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const shop = fs.readFileSync(shopPath, "utf8");
const sha256 = (text) => crypto.createHash("sha256").update(text).digest("hex");

const probes = [
  {
    id: "cart_subtotal_label",
    regex: /Subtotal \(AUD\)/,
    fixture: "Subtotal (AUD)",
    subject: cart
  },
  {
    id: "cart_subtotal_target",
    regex: /data-mm-subtotal/,
    fixture: '<strong data-mm-subtotal>$25.90</strong>',
    subject: cart
  },
  {
    id: "cart_monetary_arithmetic",
    regex: /reduce\([^\n]{0,180}unitPriceCents \* item\.quantity/,
    fixture: "cart.reduce((total, item) => total + item.unitPriceCents * item.quantity, 0)",
    subject: cart
  },
  {
    id: "selected_option_price_capture",
    regex: /querySelector\("\.size-select"\)[\s\S]{0,900}card\.dataset\.unitPrice[\s\S]{0,300}option\.value/,
    fixture: 'card.querySelector(".size-select"); card.dataset.unitPrice; option.value;',
    subject: cart
  }
];

const results = probes.map((probe) => ({
  id: probe.id,
  positive_control_detected: probe.regex.test(probe.fixture),
  candidate_detected: probe.regex.test(probe.subject)
}));

const shopContract = {
  dataset_unit_price: /dataset\.unitPrice=String\(pick\.price\)/.test(shop),
  dataset_unit_quantity: /dataset\.unitQuantity=String\(pick\.quantity\)/.test(shop),
  selected_option_control: /class="size-select"/.test(shop),
  authored_option_label: /data-label="'\+option\.label\+'"/.test(shop)
};

const additional = {
  strict_dollar_migration: /strictDollarPriceToCents/.test(cart) && /\^\\\$\(\\d\+\)/.test(cart),
  integer_cents_field: /unitPriceCents/.test(cart),
  distinct_line_key: /item\.optionLabel[\s\S]{0,80}item\.unitPriceCents/.test(cart),
  dom_safe_item_rendering: /document\.createElement\("strong"\)/.test(cart) && !/quantity\.innerHTML/.test(cart),
  subtotal_css: /\.mm-cart-summary-total/.test(css),
  no_shop_write_required: Object.values(shopContract).every(Boolean)
};

const pass =
  results.every((result) => result.positive_control_detected && result.candidate_detected) &&
  Object.values(additional).every(Boolean);
const report = {
  schema: "maplemoon-cart-option-subtotal-static/v1",
  outcome: pass ? "PASS" : "FAIL",
  hashes: {
    mock_cart_js_sha256: sha256(cart),
    mock_cart_css_sha256: sha256(css),
    shop_html_sha256: sha256(shop)
  },
  predecessor_probes: results,
  shop_contract: shopContract,
  additional
};

fs.writeFileSync(
  `${__dirname}/results/static-contract.json`,
  JSON.stringify(report, null, 2) + "\n"
);
console.log(JSON.stringify(report, null, 2));
process.exit(pass ? 0 : 1);
