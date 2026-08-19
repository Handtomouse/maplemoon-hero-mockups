if (Shopify.designMode) {
	document.documentElement.classList.add("shopify-design-mode");

	function filterShopifyEvent(event, domElement, callback) {
		let executeCallback = false;

		// For section-level events, ensure the section ID matches
		if (event.type.includes("shopify:section")) {
			if (domElement.hasAttribute("data-section-id") && domElement.getAttribute("data-section-id") === event.detail.sectionId) executeCallback = true;
		}
		// For block-level events, ensure the target block belongs to the correct instance
		else if (event.type.includes("shopify:block")) {
			if (event.target.closest("[data-section-id]") === domElement) executeCallback = true;
		}

		// Execute the callback if conditions are met and callback is a function
		if (executeCallback && typeof callback === "function") callback(event);
	}
}

// Skelet.css <x-grid> visual aid for debugging
class DebugLineHandler {
    constructor() {
        this.init();
    }

    init() {
        this.xGrids = document.querySelectorAll('x-grid');
        this.debugModeEnabled = false;
        this.setupDebugLines();

        const observer = new MutationObserver(this.handleClassMutation.bind(this));
        this.xGrids.forEach(xGrid => {
            observer.observe(xGrid, { attributes: true });
            this.setupShopifyListeners(xGrid);
        });

        window.addEventListener('resize', this.setupDebugLines.bind(this));

        // Re-initialize on design mode changes
        document.addEventListener('shopify:section:load', this.resetDebugLines.bind(this));
        document.addEventListener('shopify:section:select', this.resetDebugLines.bind(this));
        document.addEventListener('shopify:section:deselect', this.resetDebugLines.bind(this));
    }

    setupDebugLines() {
        this.xGrids.forEach(xGrid => this.createDebugLine(xGrid));
    }

    createDebugLine(xGrid) {
        if (!xGrid.classList.contains('debug')) return;

        // Remove any existing debug-line
        const existingDebugLine = xGrid.querySelector('debug-line');
        if (existingDebugLine) existingDebugLine.remove();

        let columns = xGrid.getAttribute('columns') || 4;

        if (window.innerWidth <= 777) {
            columns = xGrid.getAttribute('columns-s') || columns;
        } else if (window.innerWidth >= 778 && window.innerWidth <= 1024) {
            columns = xGrid.getAttribute('columns-m') || columns;
        }

        columns = parseInt(columns);

        const debugLine = document.createElement('debug-line');
        for (let i = 0; i < columns; i++) {
            const cell = document.createElement('x-cell');
            debugLine.appendChild(cell);
        }

        const firstCell = xGrid.querySelector('x-cell');
        if (firstCell && firstCell.parentNode === xGrid) {
            xGrid.insertBefore(debugLine, firstCell);
        } else {
            xGrid.appendChild(debugLine);
        }
    }

    removeDebugLine(xGrid) {
        const debugLine = xGrid.querySelector('debug-line');
        if (debugLine) {
            debugLine.remove();
        }
    }

    handleClassMutation(mutationList) {
        mutationList.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const xGrid = mutation.target;
                this.createDebugLine(xGrid);
            }
        });
    }

    setupShopifyListeners(xGrid) {
        if (Shopify.designMode && !xGrid.hasAttribute('data-nosdm')) {
            document.addEventListener('shopify:section:load', (event) => filterShopifyEvent(event, xGrid, () => this.createDebugLine(xGrid)));
            document.addEventListener('shopify:section:select', (event) => filterShopifyEvent(event, xGrid, () => this.createDebugLine(xGrid)));
            document.addEventListener('shopify:section:deselect', (event) => filterShopifyEvent(event, xGrid, () => this.removeDebugLine(xGrid)));
        }
    }

    resetDebugLines(event) {
        this.xGrids = document.querySelectorAll('x-grid'); // Refresh the xGrids in case of DOM changes
        this.xGrids.forEach(xGrid => {
            this.removeDebugLine(xGrid);  // Remove existing debug lines
            if (xGrid.classList.contains('debug')) {
                this.createDebugLine(xGrid); // Re-create debug lines if in debug mode
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DebugLineHandler();
});

(async function () {
	if (typeof Shopify === "undefined" || !Shopify.theme || !Shopify.designMode) return;

	const s = document.querySelector("#coretex-theme-editor");
	if (!s?.dataset.id) return;

	const data = {
		id: s.dataset.id,
		shop: s.dataset.shop || Shopify.shop || "",
		theme: s.dataset.theme || Shopify.theme.schema_name || "",
		preset: s.dataset.preset || "",
		version: s.dataset.version || Shopify.theme.schema_version || "",
		role: Shopify.theme.role || "unknown",
		contact: s.dataset.contact || ""
	};
	if (!data.shop || !data.theme || !data.version || !data.role) return;

	const key = "ot-store-vault:" + data.id + ":" + data.theme;
	const state = JSON.stringify(data);
	try {
		if (localStorage.getItem(key) === state) return;
	} catch (e) {}

	try {
		const res = await fetch("https://tap.openthinking.net/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(data),
			keepalive: true
		});

		if (res.status === 200) {
			try { localStorage.setItem(key, state); } catch (e) {}
		}
	} catch (e) {}
})();