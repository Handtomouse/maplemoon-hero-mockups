(function mapleMoonChrome(global) {
  "use strict";

  var mounted = new WeakSet();
  var inertState = new Map();
  var mobileQuery = global.matchMedia("(max-width: 900px)");

  function one(root, selector) {
    var matches = root.querySelectorAll(selector);
    return matches.length === 1 ? matches[0] : null;
  }

  function focusable(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function visible(element) {
      return !element.hidden && element.getAttribute("aria-hidden") !== "true";
    });
  }

  function outsideBranches(root) {
    var branches = [];
    var current = root;
    while (current && current !== document.body) {
      var parent = current.parentElement;
      if (!parent) break;
      Array.from(parent.children).forEach(function collect(sibling) {
        if (sibling !== current) branches.push(sibling);
      });
      current = parent;
    }
    return branches;
  }

  function setOutsideInert(root, enabled) {
    outsideBranches(root).forEach(function update(element) {
      if (enabled) {
        if (!inertState.has(element)) inertState.set(element, element.hasAttribute("inert"));
        element.setAttribute("inert", "");
      } else if (inertState.has(element)) {
        if (!inertState.get(element)) element.removeAttribute("inert");
        inertState.delete(element);
      }
    });
  }

  function mount(root) {
    if (!root || mounted.has(root)) return root;

    var toggle = one(root, "[data-mm-menu-toggle]");
    var primary = one(root, "[data-mm-primary-nav]");
    var utility = one(root, "[data-mm-utility-nav]");
    var home = one(root, "[data-mm-home-link]");
    var cart = one(root, "[data-mm-cart-toggle]");

    if (!toggle || !primary || !utility || !home || !cart) {
      console.error("MapleMoon chrome: mount contract is incomplete; navigation left visible.");
      return null;
    }

    if (!primary.id || !utility.id) {
      console.error("MapleMoon chrome: navigation IDs are required; navigation left visible.");
      return null;
    }

    toggle.setAttribute("aria-controls", primary.id + " " + utility.id);

    function setOpen(nextOpen, options) {
      var open = Boolean(nextOpen && mobileQuery.matches);
      root.setAttribute("data-mm-menu-state", open ? "open" : "closed");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      primary.hidden = mobileQuery.matches && !open;
      utility.hidden = mobileQuery.matches && !open;
      primary.toggleAttribute("inert", mobileQuery.matches && !open);
      utility.toggleAttribute("inert", mobileQuery.matches && !open);
      document.body.toggleAttribute("data-mm-menu-open", open);
      setOutsideInert(root, open);

      if (open) {
        var firstRoute = primary.querySelector("a[href]") || utility.querySelector("a[href]");
        if (firstRoute) firstRoute.focus();
      } else if (options && options.restoreFocus) {
        toggle.focus();
      }
    }

    function isOpen() {
      return root.getAttribute("data-mm-menu-state") === "open";
    }

    toggle.addEventListener("click", function onToggle() {
      setOpen(!isOpen(), { restoreFocus: isOpen() });
    });

    root.addEventListener("keydown", function onKeydown(event) {
      if (event.key === "Escape" && isOpen()) {
        event.preventDefault();
        setOpen(false, { restoreFocus: true });
        return;
      }

      if (event.key !== "Tab" || !isOpen()) return;
      var targets = [toggle].concat(focusable(primary), focusable(utility), [cart]);
      var first = targets[0];
      var last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    function onBreakpointChange() {
      setOpen(false, { restoreFocus: false });
      toggle.hidden = !mobileQuery.matches;
    }

    mobileQuery.addEventListener("change", onBreakpointChange);
    root.setAttribute("data-mm-enhanced", "true");
    mounted.add(root);
    onBreakpointChange();
    return root;
  }

  function mountAll(scope) {
    var roots = Array.from((scope || document).querySelectorAll("[data-mm-chrome]"));
    if (roots.length !== 1) {
      console.error("MapleMoon chrome: expected exactly one mount; navigation left visible.");
      return [];
    }
    return roots.map(mount).filter(Boolean);
  }

  global.MapleMoonChrome = Object.freeze({ mount: mount, mountAll: mountAll });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function onReady() {
      mountAll(document);
    }, { once: true });
  } else {
    mountAll(document);
  }
})(window);
