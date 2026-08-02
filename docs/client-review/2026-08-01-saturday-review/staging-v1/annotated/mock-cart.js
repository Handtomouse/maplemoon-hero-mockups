(() => {
  "use strict";

  if (document.documentElement.dataset.mmCartReady === "true") return;
  document.documentElement.dataset.mmCartReady = "true";

  const params = new URLSearchParams(window.location.search);
  const annotated = params.get("review") === "1";
  const cartQa = params.get("cart-qa") === "1";
  const page = window.location.pathname.split("/").pop() || "homepage.html";
  const storageKey = "maplemoon_review_cart_v2";
  const cartTriggerSelector =
    ".sp-cart, .wf-pcart, .os-cart, [data-mm-open-cart]";

  const hideInClean = (...selectors) => {
    if (annotated) return;
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.classList.add("mm-hide-clean");
      });
    });
  };

  const normalizeReviewNavigation = () => {
    const routes = [
      ["Shop", "shop.html"],
      ["Our Story", "our-story.html"],
      ["What is Carob", "carob-story.html"],
      ["Stockists", "stockists.html"],
      ["FAQ", "faq.html"]
    ];
    const normalizeHref = (rawHref) => {
      if (!rawHref) return rawHref;
      const next = new URL(rawHref, window.location.href);
      if (next.pathname.endsWith("/homepage.html") && next.hash === "#carob") {
        return "carob-story.html";
      }
      return rawHref;
    };
    const routePath = (rawHref) => {
      if (!rawHref) return "";
      return new URL(normalizeHref(rawHref), window.location.href).pathname
        .split("/")
        .pop();
    };
    const appendRoute = (nav, label, href, before = null) => {
      if (!nav) return;
      const exists = Array.from(nav.querySelectorAll("a[href]")).some(
        (link) => routePath(link.getAttribute("href")) === href
      );
      if (exists) return;
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      nav.insertBefore(link, before);
    };

    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      const normalized = normalizeHref(href);
      if (normalized !== href) link.setAttribute("href", normalized);
      if (/shop single bars/i.test(link.textContent || "")) {
        link.setAttribute("href", "shop.html#bars");
      }
    });

    const primary = document.querySelector('nav[aria-label="Primary navigation"]');
    appendRoute(primary, "Shop", "shop.html");
    appendRoute(primary, "Our Story", "our-story.html");
    appendRoute(primary, "What is Carob", "carob-story.html");

    const utility = document.querySelector('nav[aria-label="Utility navigation"]');
    const cartButton = utility?.querySelector(cartTriggerSelector) || null;
    appendRoute(utility, "Stockists", "stockists.html", cartButton);
    appendRoute(utility, "FAQ", "faq.html", cartButton);

    const footer = document.querySelector('nav[aria-label="Footer navigation"]');
    routes.forEach(([label, href]) => appendRoute(footer, label, href));

    const activeAlias = page;
    document.querySelectorAll(
      'nav[aria-label="Primary navigation"] a[href], ' +
        'nav[aria-label="Utility navigation"] a[href], ' +
        'nav[aria-label="Footer navigation"] a[href]'
    ).forEach((link) => {
      const current = routePath(link.getAttribute("href")) === activeAlias;
      link.classList.toggle("on", current);
      if (current) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    if (!document.querySelector(".mm-review-mobile-nav")) {
      const header = document.querySelector("header");
      if (header) {
        const mobile = document.createElement("nav");
        mobile.className = "mm-review-mobile-nav";
        mobile.setAttribute("aria-label", "Mobile page navigation");
        mobile.innerHTML = routes
          .map(
            ([label, href]) =>
              `<a href="${href}"${href === activeAlias ? ' aria-current="page"' : ""}>${label}</a>`
          )
          .join("");
        header.insertAdjacentElement("afterend", mobile);
      }
    }
  };

  const prepareNewsletterForms = () => {
    document.querySelectorAll('form:has(input[type="email"])').forEach((form, index) => {
      const input = form.querySelector('input[type="email"]');
      const submit = form.querySelector('button[type="submit"], input[type="submit"]');
      if (!input || !submit || form.dataset.mmReviewForm === "ready") return;
      form.dataset.mmReviewForm = "ready";
      input.required = true;
      input.autocomplete = "email";
      submit.disabled = false;
      submit.removeAttribute("aria-disabled");
      if (/coming soon/i.test(submit.textContent || "")) submit.textContent = "Notify me";

      const status = document.createElement("p");
      status.className = "mm-review-form-status";
      status.id = `mmReviewFormStatus${index + 1}`;
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      status.hidden = true;
      form.insertAdjacentElement("afterend", status);
      form.setAttribute("aria-describedby", status.id);

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!input.reportValidity()) return;
        input.value = "";
        status.innerHTML =
          "<strong>Thanks, your submission was received.</strong>" +
          "<span>Review preview: your email was not saved.</span>";
        status.hidden = false;
        status.tabIndex = -1;
        status.focus({ preventScroll: true });
      });
    });
  };

  const cleanHomepage = () => {
    if (page !== "homepage.html" || annotated) return;
    const tidyHomepage = () => {
      hideInClean(
        "#who",
        "#reviews",
        ".q-compare-held",
        ".wf-cat-dock .cat-prev",
        ".wf-cat-dock .cat-next",
        ".soc > span"
      );

      const stockists = document.getElementById("stockists");
      if (stockists && !stockists.classList.contains("mm-home-stockist-finder")) {
        stockists.querySelectorAll(
          ":scope > p, .mm-stock-controls, .mm-filter-row, .mm-stock-cards"
        ).forEach((element) => element.classList.add("mm-hide-clean"));
      }

      const trust = document.getElementById("trust");
      if (trust) {
        trust.querySelectorAll(".wf-ti").forEach((item) => {
          if (/pending/i.test(item.textContent || "")) item.classList.add("mm-hide-clean");
        });
        trust.classList.add("mm-clean-single");
      }
    };

    tidyHomepage();
    let homepageRefreshQueued = false;
    new MutationObserver(() => {
      if (homepageRefreshQueued) return;
      homepageRefreshQueued = true;
      window.requestAnimationFrame(() => {
        homepageRefreshQueued = false;
        tidyHomepage();
      });
    }).observe(document.querySelector("main") || document.body, {
      childList: true,
      subtree: true
    });
  };

  const cleanShop = () => {
    if (page !== "shop.html" || annotated) return;
    hideInClean(".sp-flag");
  };

  const cleanOurStory = () => {
    if (page !== "our-story.html" || annotated) return;
    hideInClean(
      '.os-story-subnav a[href="#founders"]',
      '.os-story-subnav a[href="#source"]',
      '.os-story-subnav a[href="#craft"]'
    );
  };

  const cleanStockists = () => {
    if (page !== "stockists.html" || annotated) return;
    const pageIntro = document.querySelector(".sp-head > p");
    if (pageIntro) pageIntro.textContent = "Find Maple Moon at 200+ stockists across Australia.";
    const intro = document.querySelector(".st-finder-intro .sub");
    if (intro) {
      intro.textContent =
        "Search 200+ Maple Moon stockists by store, suburb, postcode or state.";
    }
    hideInClean(
      ".st-proof-row",
      ".st-finder-cue small",
      ".st-type-label span",
      '[data-filter="review"]',
      ".st-area-next",
      ".st-map-panel"
    );
    document.querySelectorAll(".st-mini-cta[href*='shop'] p").forEach((paragraph) => {
      paragraph.textContent = "Shop the available range online.";
    });

    const results = document.getElementById("stockistResults");
    const count = document.getElementById("stockistCount");
    const title = document.getElementById("stockistTitle");
    const empty = document.getElementById("stockistEmpty");
    const emptyCopy = document.getElementById("stockistEmptyCopy");
    const incomingQuery = (params.get("q") || "").trim().slice(0, 120);
    const tidyResults = () => {
      document.querySelectorAll(".st-result.is-pending").forEach((element) => {
        element.hidden = true;
      });
      document
        .querySelectorAll(".st-filter[data-value], .st-result-filter[data-value]")
        .forEach((button) => {
          button.textContent = (button.textContent || "").replace(/\s+\d+$/, "");
        });
      if (count) count.textContent = "Available stockists.";
      if (title && /showing all stockists/i.test(title.textContent || "")) {
        title.textContent = "Browse 200+ Maple Moon stockists";
      }
      const confirmedVisible = results
        ? results.querySelectorAll(".st-result:not(.is-pending)").length
        : 0;
      if (incomingQuery && !confirmedVisible) {
        if (results) results.hidden = true;
        if (empty) empty.hidden = false;
        if (emptyCopy) {
          emptyCopy.textContent =
            `No confirmed stockists match "${incomingQuery}". Try a broader search or view the full directory.`;
        }
        if (title) title.textContent = `No confirmed matches for "${incomingQuery}"`;
        if (count) count.textContent = "No confirmed stockists shown.";
      }
    };
    tidyResults();
    if (results) {
      new MutationObserver(tidyResults).observe(results, { childList: true });
    }
    const search = document.getElementById("stockistSearch");
    if (incomingQuery && search) {
      search.value = incomingQuery;
      search.dispatchEvent(new Event("input", { bubbles: true }));
      document.querySelector(".st-finder")?.scrollIntoView({ block: "start" });
    }
  };

  const cleanFaq = () => {
    if (page !== "faq.html" || annotated) return;
    const removePending = () => {
      document.querySelectorAll('[data-category="pending"], [data-category-link="pending"]').forEach(
        (element) => element.classList.add("mm-hide-clean")
      );
      const inventory = document.getElementById("faq-inventory");
      if (inventory) inventory.classList.add("mm-hide-clean");
    };
    removePending();
    const list = document.getElementById("faq-results");
    if (list) new MutationObserver(removePending).observe(list, { childList: true });
  };

  const keepQaParams = () => {
    if (!cartQa) return;
    document.querySelectorAll("a[href]").forEach((link) => {
      const raw = link.getAttribute("href");
      if (
        !raw ||
        raw.startsWith("#") ||
        raw.startsWith("mailto:") ||
        raw.startsWith("tel:") ||
        raw.startsWith("http") ||
        raw.startsWith("//")
      ) {
        return;
      }
      const next = new URL(raw, window.location.href);
      next.searchParams.set("cart-qa", "1");
      if (annotated) next.searchParams.set("review", "1");
      link.setAttribute("href", `${next.pathname}${next.search}${next.hash}`);
    });
  };

  const cleanText = (value, limit = 180) =>
    String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, limit);

  const priceWithoutSize = (priceElement) => {
    if (!priceElement) return "";
    const copy = priceElement.cloneNode(true);
    copy.querySelectorAll(".g").forEach((element) => element.remove());
    return cleanText(copy.textContent, 120);
  };

  const refreshShopAvailability = () => {
    if (page !== "shop.html" || annotated) return;
    const cards = Array.from(document.querySelectorAll(".pcard"));
    const visible = cards.filter(
      (card) => !card.hidden && !card.classList.contains("mm-hide-clean")
    );
    const status = document.getElementById("catalogue-status");
    if (status) {
      status.textContent = status.textContent.replace(
        /Showing \d+ products?/,
        `Showing ${visible.length} ${visible.length === 1 ? "product" : "products"}`
      );
    }
    document.querySelectorAll(".sp-sec[id]").forEach((section) => {
      const hasVisibleProduct = Array.from(section.querySelectorAll(".pcard")).some(
        (card) => !card.hidden && !card.classList.contains("mm-hide-clean")
      );
      if (section.hidden === hasVisibleProduct) section.hidden = !hasVisibleProduct;
      const navLink = document.querySelector(
        `.sp-range-nav .sp-cats a[href="#${section.id}"]`
      );
      if (navLink && navLink.hidden === hasVisibleProduct) {
        navLink.hidden = !hasVisibleProduct;
      }
    });
  };

  const prepareShopProducts = () => {
    const products = new Map();
    if (page !== "shop.html") return products;

    document.querySelectorAll(".pcard").forEach((card, index) => {
      const action = card.querySelector(".add");
      const name = cleanText(card.querySelector("h3")?.textContent, 100);
      const category = cleanText(card.dataset.cat, 40) || "product";
      const order = cleanText(card.dataset.order, 12) || String(index);
      const id = `${category}-${order}`;

      if (card.dataset.priced !== "1") {
        card.dataset.mmAvailability = "enquiry";
        if (action) {
          action.textContent = "Enquire";
          action.setAttribute("aria-label", `Enquire about ${name}`);
          action.removeAttribute("disabled");
        }
        return;
      }

      const priceElement = card.querySelector(".pr");
      const sizeElement = priceElement?.querySelector(".g");
      const image = card.querySelector(".ph img");
      const product = {
        id,
        name,
        price: priceWithoutSize(priceElement),
        size: cleanText(sizeElement?.textContent.replace(/[()]/g, ""), 50),
        image: cleanText(image?.getAttribute("src"), 240),
        imageAlt: cleanText(image?.getAttribute("alt"), 100)
      };
      products.set(id, product);
      card.dataset.mmAvailability = "available";

      if (action) {
        const button = document.createElement("button");
        button.className = action.className;
        button.type = "button";
        button.dataset.mmAddProduct = id;
        button.textContent = "Add to cart";
        button.setAttribute("aria-label", `Add ${name} to cart`);
        action.replaceWith(button);
      }
    });

    refreshShopAvailability();
    document.addEventListener(
      "click",
      () => window.setTimeout(refreshShopAvailability, 0),
      true
    );
    document.addEventListener(
      "change",
      () => window.setTimeout(refreshShopAvailability, 0),
      true
    );
    const catalogue = document.getElementById("catalogue");
    if (catalogue) {
      new MutationObserver(refreshShopAvailability).observe(
        document.getElementById("shop-main") || catalogue,
        { subtree: true, attributes: true, attributeFilter: ["hidden"] }
      );
    }
    return products;
  };

  const safeStoredItem = (item) => {
    if (!item || typeof item !== "object") return null;
    const id = cleanText(item.id, 80);
    const name = cleanText(item.name, 100);
    const quantity = Number(item.quantity);
    if (!id || !name || !Number.isInteger(quantity) || quantity < 1) return null;
    return {
      id,
      name,
      price: cleanText(item.price, 120),
      size: cleanText(item.size, 50),
      image: cleanText(item.image, 240),
      imageAlt: cleanText(item.imageAlt, 100),
      quantity: Math.min(quantity, 99)
    };
  };

  const loadCart = () => {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.map(safeStoredItem).filter(Boolean).slice(0, 30);
    } catch (_) {
      return [];
    }
  };

  const setupCart = (products) => {
    const existingTriggers = Array.from(
      document.querySelectorAll(cartTriggerSelector)
    );
    if (!existingTriggers.length) return;

    const shell = document.createElement("div");
    shell.innerHTML = `
      ${
        cartQa
          ? `<aside class="mm-cart-qa-bar mm-cart-qa-only" aria-label="Internal cart quality assurance controls">
              <span class="mm-cart-qa-label">Internal cart QA</span>
              <button class="mm-cart-qa-button" type="button" aria-haspopup="dialog" aria-controls="mmCartDialog" aria-expanded="false" data-mm-open-cart>
                Cart <span class="mm-cart-qa-count" data-mm-cart-count>0</span>
              </button>
            </aside>`
          : ""
      }
      <button class="mm-cart-overlay" type="button" tabindex="-1" aria-label="Close cart" data-mm-cart-overlay></button>
      <section class="mm-cart-dialog" id="mmCartDialog" role="dialog" aria-modal="true" aria-labelledby="mmCartTitle" aria-describedby="mmCartDescription" aria-hidden="true" inert>
        <header class="mm-cart-dialog-header">
          <div>
            <span class="mm-cart-dialog-kicker" data-mm-cart-step>Your selection</span>
            <h2 id="mmCartTitle" data-mm-cart-title>Your cart</h2>
          </div>
          <button class="mm-cart-icon-button" type="button" aria-label="Close cart" data-mm-close-cart>&times;</button>
        </header>
        <p class="mm-cart-notice" data-mm-cart-notice>
          Review checkout only. No order, payment or personal information will be submitted.
        </p>
        <p class="mm-cart-sr-only" id="mmCartDescription">
          A local review cart. Products can be selected and the checkout journey can be simulated.
        </p>
        <div class="mm-cart-dialog-body" data-mm-cart-body>
          <div data-mm-cart-stage>
            <div class="mm-cart-empty" data-mm-cart-empty>
              <div><h3>Your cart is empty.</h3><p>Add a product from the Shop page to begin.</p></div>
            </div>
            <div data-mm-cart-content hidden>
              <div class="mm-cart-list" data-mm-cart-list></div>
              <div class="mm-cart-summary">
                <div class="mm-cart-summary-row"><span>Items</span><span data-mm-summary-count>0</span></div>
                <div class="mm-cart-summary-row"><span>Shipping</span><span>Calculated in the live store</span></div>
              </div>
              <p class="mm-cart-caption">Names and displayed prices reflect this review catalogue. Final availability and selling options remain subject to catalogue approval.</p>
            </div>
          </div>
          <div data-mm-checkout-stage hidden>
            <section class="mm-cart-checkout-card">
              <span class="mm-cart-checkout-eyebrow">Order summary</span>
              <h3><span data-mm-checkout-count>0</span> ready for checkout</h3>
              <p>Delivery, shipping and payment details will be completed in the connected live store.</p>
            </section>
            <section class="mm-cart-checkout-card">
              <span class="mm-cart-checkout-eyebrow">Secure checkout</span>
              <h3>Review mode</h3>
              <p>This preview cannot collect names, addresses or card details.</p>
            </section>
          </div>
          <div class="mm-cart-complete" data-mm-complete-stage hidden>
            <div>
              <span class="mm-cart-complete-mark" aria-hidden="true">&#10003;</span>
              <h3>Thanks, your demo order was received.</h3>
              <p>No order was created, no email was sent, and no payment or personal information was collected.</p>
            </div>
          </div>
        </div>
        <footer class="mm-cart-dialog-footer">
          <button class="mm-cart-primary" type="button" data-mm-cart-primary>Continue to checkout</button>
          <button class="mm-cart-secondary" type="button" data-mm-cart-secondary>Continue shopping</button>
        </footer>
      </section>
      <div class="mm-cart-sr-only" aria-live="polite" aria-atomic="true" data-mm-cart-status></div>
    `;
    document.body.append(...shell.children);

    const elements = {
      triggers: Array.from(document.querySelectorAll(cartTriggerSelector)),
      countBadges: Array.from(
        document.querySelectorAll(
          ".sp-cart b, .wf-pcart b, .os-cart b, [data-mm-cart-count]"
        )
      ),
      overlay: document.querySelector("[data-mm-cart-overlay]"),
      dialog: document.getElementById("mmCartDialog"),
      close: document.querySelector("[data-mm-close-cart]"),
      title: document.querySelector("[data-mm-cart-title]"),
      step: document.querySelector("[data-mm-cart-step]"),
      notice: document.querySelector("[data-mm-cart-notice]"),
      body: document.querySelector("[data-mm-cart-body]"),
      cartStage: document.querySelector("[data-mm-cart-stage]"),
      checkoutStage: document.querySelector("[data-mm-checkout-stage]"),
      completeStage: document.querySelector("[data-mm-complete-stage]"),
      empty: document.querySelector("[data-mm-cart-empty]"),
      content: document.querySelector("[data-mm-cart-content]"),
      list: document.querySelector("[data-mm-cart-list]"),
      summaryCount: document.querySelector("[data-mm-summary-count]"),
      checkoutCount: document.querySelector("[data-mm-checkout-count]"),
      primary: document.querySelector("[data-mm-cart-primary]"),
      secondary: document.querySelector("[data-mm-cart-secondary]"),
      status: document.querySelector("[data-mm-cart-status]")
    };

    let stage = "cart";
    let cart = loadCart();
    let returnFocus = null;

    products.forEach((product, id) => {
      const stored = cart.find((item) => item.id === id);
      if (stored) Object.assign(stored, product);
    });

    const saveCart = () => {
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(cart));
      } catch (_) {
        announce("Cart updated for this page. Temporary storage is unavailable.");
      }
    };

    const totalQuantity = () =>
      cart.reduce((total, item) => total + item.quantity, 0);

    const announce = (message) => {
      elements.status.textContent = "";
      window.setTimeout(() => {
        elements.status.textContent = message;
      }, 20);
    };

    const itemElement = (item) => {
      const article = document.createElement("article");
      article.className = "mm-cart-item";
      article.dataset.mmCartItem = item.id;

      const imageWrap = document.createElement("div");
      imageWrap.className = "mm-cart-item-image";
      if (item.image && !/^(?:https?:|\/\/|data:|javascript:)/i.test(item.image)) {
        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.imageAlt || "";
        image.loading = "lazy";
        imageWrap.appendChild(image);
      }

      const copy = document.createElement("div");
      copy.className = "mm-cart-item-copy";
      const heading = document.createElement("h3");
      heading.textContent = item.name;
      const meta = document.createElement("div");
      meta.className = "mm-cart-item-meta";
      meta.textContent = [item.size, item.price].filter(Boolean).join(" · ");
      const quantity = document.createElement("div");
      quantity.className = "mm-cart-quantity";
      quantity.setAttribute("aria-label", `Quantity for ${item.name}`);
      quantity.innerHTML = `
        <button type="button" data-mm-quantity="-1" data-mm-item-id="${item.id}" aria-label="Decrease ${item.name} quantity">&minus;</button>
        <span aria-live="polite">${item.quantity}</span>
        <button type="button" data-mm-quantity="1" data-mm-item-id="${item.id}" aria-label="Increase ${item.name} quantity">+</button>
      `;
      copy.append(heading, meta, quantity);

      const remove = document.createElement("button");
      remove.className = "mm-cart-remove";
      remove.type = "button";
      remove.dataset.mmRemove = item.id;
      remove.textContent = "Remove";
      remove.setAttribute("aria-label", `Remove ${item.name} from cart`);
      article.append(imageWrap, copy, remove);
      return article;
    };

    const render = () => {
      const count = totalQuantity();
      elements.countBadges.forEach((badge) => {
        badge.textContent = String(count);
      });
      elements.triggers.forEach((trigger) => {
        trigger.setAttribute(
          "aria-label",
          `Cart, ${count} ${count === 1 ? "item" : "items"}`
        );
      });
      elements.empty.hidden = cart.length !== 0;
      elements.content.hidden = cart.length === 0;
      elements.primary.disabled = cart.length === 0;
      elements.primary.setAttribute("aria-disabled", cart.length ? "false" : "true");
      elements.summaryCount.textContent = `${count} ${count === 1 ? "item" : "items"}`;
      elements.checkoutCount.textContent = `${count} ${count === 1 ? "item is" : "items are"}`;
      elements.list.replaceChildren(...cart.map(itemElement));
    };

    const setStage = (next) => {
      stage = next;
      const isCart = stage === "cart";
      const isCheckout = stage === "checkout";
      const isComplete = stage === "complete";
      elements.cartStage.hidden = !isCart;
      elements.checkoutStage.hidden = !isCheckout;
      elements.completeStage.hidden = !isComplete;
      elements.notice.hidden = isComplete;
      if (isCart) {
        elements.step.textContent = "Your selection";
        elements.title.textContent = "Your cart";
        elements.primary.textContent = "Continue to checkout";
        elements.secondary.textContent = "Continue shopping";
      } else if (isCheckout) {
        elements.step.textContent = "Step 2 of 2";
        elements.title.textContent = "Checkout";
        elements.primary.textContent = "Place demo order";
        elements.secondary.textContent = "Back to cart";
      } else {
        elements.step.textContent = "Demo complete";
        elements.title.textContent = "Thank you";
        elements.primary.textContent = "Continue shopping";
        elements.secondary.textContent = "Close";
      }
      elements.body.scrollTop = 0;
      window.setTimeout(() => elements.primary.focus(), 40);
    };

    const openCart = (source) => {
      returnFocus = source || document.activeElement;
      document.body.classList.add("mm-cart-open");
      elements.overlay.classList.add("is-open");
      elements.dialog.classList.add("is-open");
      elements.dialog.setAttribute("aria-hidden", "false");
      elements.dialog.removeAttribute("inert");
      elements.triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "true"));
      window.setTimeout(() => elements.close.focus(), 40);
    };

    const closeCart = () => {
      document.body.classList.remove("mm-cart-open");
      elements.overlay.classList.remove("is-open");
      elements.dialog.classList.remove("is-open");
      elements.dialog.setAttribute("aria-hidden", "true");
      elements.dialog.setAttribute("inert", "");
      elements.triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
      if (returnFocus && typeof returnFocus.focus === "function") returnFocus.focus();
    };

    const clearCart = () => {
      cart = [];
      saveCart();
      render();
      setStage("cart");
    };

    const addProduct = (product, source) => {
      const existing = cart.find((item) => item.id === product.id);
      if (existing) existing.quantity = Math.min(existing.quantity + 1, 99);
      else cart.push({ ...product, quantity: 1 });
      saveCart();
      render();
      setStage("cart");
      announce(`${product.name} added to cart.`);
      openCart(source);
    };

    document.querySelectorAll("[data-mm-add-product]").forEach((button) => {
      button.addEventListener("click", () => {
        const product = products.get(button.dataset.mmAddProduct);
        if (product) addProduct(product, button);
      });
    });

    elements.triggers.forEach((trigger) => {
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.setAttribute("aria-controls", "mmCartDialog");
      trigger.setAttribute("aria-expanded", "false");
      trigger.addEventListener("click", () => {
        setStage("cart");
        openCart(trigger);
      });
    });
    elements.close.addEventListener("click", closeCart);
    elements.overlay.addEventListener("click", closeCart);
    elements.list.addEventListener("click", (event) => {
      const quantityButton = event.target.closest("[data-mm-quantity]");
      if (quantityButton) {
        const item = cart.find((entry) => entry.id === quantityButton.dataset.mmItemId);
        if (!item) return;
        item.quantity = Math.max(
          0,
          Math.min(99, item.quantity + Number(quantityButton.dataset.mmQuantity))
        );
        if (!item.quantity) cart = cart.filter((entry) => entry.id !== item.id);
        saveCart();
        render();
        announce(
          item.quantity ? `${item.name} quantity updated.` : `${item.name} removed.`
        );
        return;
      }
      const removeButton = event.target.closest("[data-mm-remove]");
      if (removeButton) {
        const removed = cart.find((item) => item.id === removeButton.dataset.mmRemove);
        cart = cart.filter((item) => item.id !== removeButton.dataset.mmRemove);
        saveCart();
        render();
        if (removed) announce(`${removed.name} removed.`);
      }
    });
    elements.primary.addEventListener("click", () => {
      if (stage === "cart" && cart.length) setStage("checkout");
      else if (stage === "checkout") setStage("complete");
      else if (stage === "complete") {
        clearCart();
        closeCart();
      }
    });
    elements.secondary.addEventListener("click", () => {
      if (stage === "checkout") setStage("cart");
      else closeCart();
    });
    document.addEventListener("keydown", (event) => {
      if (!elements.dialog.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeCart();
        return;
      }
      if (event.key !== "Tab") return;
      const candidates = Array.from(
        elements.dialog.querySelectorAll(
          'button:not([disabled]):not([hidden]), [href]:not([hidden]), input:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"]):not([hidden])'
        )
      ).filter((element) => element.getClientRects().length);
      if (!candidates.length) return;
      const first = candidates[0];
      const last = candidates[candidates.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    saveCart();
    render();
  };

  normalizeReviewNavigation();
  prepareNewsletterForms();
  cleanHomepage();
  cleanShop();
  cleanOurStory();
  cleanStockists();
  cleanFaq();
  keepQaParams();
  const products = prepareShopProducts();
  setupCart(products);
})();
