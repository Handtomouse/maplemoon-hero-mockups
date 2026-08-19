// Browser check
// Browser and device detection
function getNavigator() {
    const html = document.documentElement;
    
    // Feature-based detection
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent) && !/Edge|Edg/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isEdge = /Edge|Edg/.test(navigator.userAgent);
    
    // Touch support detection
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Apply classes
    if (isiOS) html.classList.add('ios');
    if (hasTouch) html.classList.add('touch');
    
    // Browser classes and events
    const browsers = [
        { test: isSafari, name: 'safari' },
        { test: isChrome, name: 'chrome' },
        { test: isFirefox, name: 'firefox' },
        { test: isEdge, name: 'edge' }
    ];
    
    browsers.forEach(({ test, name }) => {
        if (test) {
            html.classList.add(name);
            window.dispatchEvent(new CustomEvent('user-agent', { detail: { browser: name } }));
        }
    });
}

// Get and set element size
function getElementSize({ elementSelector, targetSelector = 'this', axis = 'both', cssVar }) {
    // Helper function to resolve the element(s)
    const resolveElements = selector => {
        if (typeof selector === 'string') {
            return document.querySelectorAll(selector);
        } else if (selector instanceof NodeList || Array.isArray(selector)) {
            return selector;
        } else {
            return [selector];
        }
    };

    // Resolve the elements and target element
    const elements = resolveElements(elementSelector);
    const targetElement = targetSelector === 'this' ? elements[0] : resolveElements(targetSelector)[0];

    // Exit early if elements are not found or cssVar is not provided
    if (!elements.length || !targetElement || !cssVar) return;

    const calculateAndSetSize = () => {
        let totalWidth = 0;
        let totalHeight = 0;

        // Calculate the total width and height including margins
        elements.forEach(element => {
            const style = window.getComputedStyle(element);
            totalWidth += element.offsetWidth + parseFloat(style.marginLeft || 0) + parseFloat(style.marginRight || 0);
            totalHeight += element.offsetHeight + parseFloat(style.marginTop || 0) + parseFloat(style.marginBottom || 0);
        });

        // Helper function to set CSS variables
        const setCssVariable = (prop, value) => targetElement.style.setProperty(`--${cssVar}${prop}`, `${value}px`);

        // Set the CSS variables based on the axis parameter
        if (axis.includes('width') || axis === 'both') setCssVariable('Width', totalWidth);
        if (axis.includes('height') || axis === 'both') setCssVariable('Height', totalHeight);
    };

    // Initial size calculation
    calculateAndSetSize();

    // Use ResizeObserver to observe changes in the elements' sizes
    const observer = new ResizeObserver(() => {
        calculateAndSetSize();
    });

    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
}


/***
// === [ CORETEX FYI ] ===
// Usage example

getElementSize({
    elementSelector: '.source', // Selects the element to measure
    targetSelector: '.target', // Specifies where to apply the CSS variables. Replace '.target' with 'this' to apply on the same element as '.source'
    axis: 'both', // Indicates that both width and height should be measured and set
    cssVar: 'css-var-target-size' // The base name for the CSS variables to be applied
});

// Explanation of parameters:
- elementSelector: The selector for the element from which to get the size. Here, '.source' is used to find an element with the class 'source'.
- targetSelector: The selector for the target element where the CSS variables will be set. Use 'this' to refer to the same element as 'elementSelector'. Here, '.target' is used to specify a different element with the class 'target'.
- axis: Specifies which dimensions to operate on. It can be 'width', 'height', or 'both'. In this case, 'both' is used to indicate that both dimensions should be processed.
- cssVar: The base name for the CSS variables that will be set on the target element. The function will create '--css-var-target-size-width' and '--css-var-target-size-height' variables if 'both' is selected for the axis.
*/

class MediaQueryUtility {
  constructor() {
    this._breakpoints = {
      mobile: 'screen and (max-width: 777px)',
      tablet: 'screen and (min-width: 778px) and (max-width: 1024px)',
      desktop: 'screen and (min-width: 1025px)'
    };

    this._mediaQueryLists = {};
    this._currentViewport = null;

    this.executeBasedOnViewport = this.executeBasedOnViewport.bind(this);
    this._handleChange = this._handleChange.bind(this);

    this._initMediaQueries();
    this._updateHTMLClass(); // Set initial class
  }

  _initMediaQueries() {
    for (const [label, query] of Object.entries(this._breakpoints)) {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', this._handleChange);
      this._mediaQueryLists[label] = mql;
    }
  }

  _handleChange() {
    const newViewport = this.getViewport();
    if (newViewport === this._currentViewport) return;

    this._currentViewport = newViewport;
    this._updateHTMLClass();

    // Dispatch generic event
    document.documentElement.dispatchEvent(
      new CustomEvent('viewport:change', {
        detail: { viewport: newViewport }
      })
    );

    // Dispatch specific event: mq:mobile, mq:tablet, mq:desktop
    document.documentElement.dispatchEvent(
      new Event(`mq:${newViewport}`)
    );
  }

  getViewport() {
    for (const [label, mql] of Object.entries(this._mediaQueryLists)) {
      if (mql.matches) return label;
    }
    return 'desktop'; // Fallback
  }

  _updateHTMLClass() {
    const html = document.documentElement;
    const currentViewport = this.getViewport();

    html.classList.remove('mq-mobile', 'mq-tablet', 'mq-desktop');
    html.classList.add(`mq-${currentViewport}`);
    this._currentViewport = currentViewport;
  }

  executeBasedOnViewport(callbacks = {}) {
    const viewport = this.getViewport();
    const callback = callbacks[viewport];

    if (typeof callback === 'function') {
      try {
        callback();
      } catch (error) {
        // Silently fail
      }
    }
  }

  destroy() {
    for (const mql of Object.values(this._mediaQueryLists)) {
      mql.removeEventListener('change', this._handleChange);
    }
  }
} const mediaQuery = new MediaQueryUtility();


/** * MediaQueryUtility
    Efficient, class-based utility for responsive logic using matchMedia().
    Adds responsive classes to <html>: mq-mobile, mq-tablet, mq-desktop
    Emits custom events: 'viewport:change', 'mq:mobile', 'mq:tablet', 'mq:desktop'
 
    Usage:
        const mediaQuery = new MediaQueryUtility();
 
    API:
        mediaQuery.getViewport()
            → Returns current viewport: 'mobile' | 'tablet' | 'desktop'
 
        mediaQuery.executeBasedOnViewport({ mobile, tablet, desktop })
            → Runs the function matching the current viewport (if provided)
 
        mediaQuery.destroy()
            → Removes internal matchMedia listeners (for SPA teardown)
 
    Events:
        document.documentElement.addEventListener('viewport:change', e => {
            console.log(e.detail.viewport); // 'mobile', etc.
        });
 
        document.documentElement.addEventListener('mq:mobile', () => { ... });
        document.documentElement.addEventListener('mq:tablet', () => { ... });
        document.documentElement.addEventListener('mq:desktop', () => { ... });
 */



// Is in viewport
function inViewport(selector, callback, options = {}, autoUnobserve = false) {
    // Select the elements based on the provided selector. It could be one element or multiple.
    // target single or multiple elements using any valid CSS selector. 
    // This could be a class, ID, tag, or a combination that represents one or more elements.
    const elements = document.querySelectorAll(selector);

    if (!elements.length) {
        console.error(`(inViewport) - No elements found for selector: ${selector}`);
        return;
    }

    // Define the observer with the callback and options.
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Execute the callback for each entry.
            callback(entry);

            // Check if autoUnobserve is true and the entry is intersecting, then unobserve.
            if (autoUnobserve && entry.isIntersecting) observer.unobserve(entry.target);
        });
    }, options);

    elements.forEach(element => observer.observe(element));

    // Return the observer instance to allow external control, e.g., manual disconnect.
    return observer;
}


/***
// === [ CORETEX FYI ] ===
// Example usage

// Observing multiple items
const observer = inViewport('.item-to-observe, [data-to-observe]', entry => {
    if (entry.isIntersecting) {
        console.log('Element is in the viewport!', entry.target);
        // You can do something specific with each element here, like adding a class or triggering animations.
    } else {
        console.log('Element has left the viewport.', entry.target);
    }
}, {}, false); // The last parameter 'false' is for autoUnobserve, modify based on your requirement.

*/

/*** Cart */
// # Map storage for better performance
const cartDetailsState = new Map();

// # Single event delegation with capture phase
document.addEventListener("toggle", (event) => {
	const target = event.target;
	if (target.matches("[data-ajax-cart-section] [data-ajax-cart-details]")) {
		const key = target.getAttribute("data-ajax-cart-details");
		if (key) cartDetailsState.set(key, target.open);
	}
}, true);

// # init and section updates
function initCartDetails() {
	for (const $details of document.querySelectorAll("[data-ajax-cart-section] [data-ajax-cart-details]")) {
		const key = $details.getAttribute("data-ajax-cart-details");
		if (key) cartDetailsState.set(key, $details.hasAttribute("open"));
	}
}

document.addEventListener("liquid-ajax-cart:init", initCartDetails);

document.addEventListener("liquid-ajax-cart:request-end", (event) => {
	const { requestState, sections } = event.detail;

	// # Handle successful add to cart
	if (requestState.requestType === "add" && requestState.responseData?.ok) {
		const formElement = requestState.info.initiator?.closest('ajax-cart-product-form');
		const cartType = formElement?.getAttribute('cart-type') || 'drawer';
		
		if (cartType === 'redirect') {
			window.location.href = window.routes?.cart_url || '/cart';
		} else if (window.location.pathname === '/cart') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			const cartBox = document.getElementById("cartBox");
			if (cartBox?.dataset.fire === 'true') cartBox.open();
		}
		
		document.body.setAttribute("cart-state", "done");
		setTimeout(() => document.body.removeAttribute("cart-state"), 4000);
	}

	// # Restore details state only on actual section re-renders
	if (sections?.length && requestState.info.initiator !== "mutation") {
		for (const { elements } of sections) {
			for (const element of elements) {
				for (const $details of element.querySelectorAll("[data-ajax-cart-details]")) {
					const key = $details.getAttribute("data-ajax-cart-details");
					if (key && cartDetailsState.has(key)) {
						$details.open = cartDetailsState.get(key);
					}
				}
			}
		}
	}
});

// # Remove autofocus from inputs on Safari
window.addEventListener('user-agent', (event) => {
    if (event.detail.browser === 'safari') {
        document.querySelectorAll('[autofocus]').forEach(input => { input.removeAttribute('autofocus') });
        // console.log('Autofocus removed for Safari.');
    }
});

/***
 * 
 * 
 * Event Listeners
 * === [ CORETEX FYI ] ===
 * You may use 1 (one) eventlistener for all methods
 * 
 * 
*/

// Avoid repeating the same code by encapsulating the repeated logic into a function that you call from multiple places. 
// This way, if you need to update the logic later, you only have to do it in one place.
// this function will run on both "DOM ready" and "Resize".
function globalTasks() {
    getElementSize({ elementSelector: '[class*="group-header-group"]', targetSelector: '#pageBody', axis: 'height', cssVar: 'headerGroup' }); // Get header group height
    getElementSize({ elementSelector: '#mainHeader', targetSelector: '#pageBody', axis: 'height', cssVar: 'header' }); // Get header height
    // executeBasedOnViewport
    mediaQuery.executeBasedOnViewport({
        mobile: () => {
            // console.log('media query: mobile');
            document.querySelector('drawer-footer').setAttribute('aria-hidden', 'false');
        },
        tablet: () => {
            // console.log('media query: tablet')
        },
        desktop: () => {
            // console.log('media query: desktop')
            document.querySelector('drawer-footer').setAttribute('aria-hidden', 'true');
        }
    });
} 

// Keydown event handler for filter box
function filterBoxKeydown(event) {
    // Close filters box when ESC key is pressed
    if (event.key === 'Escape' && document.body.classList.contains('filtersBox-o')) document.body.classList.remove('filtersBox-o');
}

/**
 * Handles the Enter key press event for checkboxes and radio buttons.
 */
function handleEnterKey(event) {
    // Check if the Enter key is pressed
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
    
        // Ensure the focused element is either a checkbox or a radio button
        if (activeElement.tagName === 'INPUT' && ['checkbox', 'radio'].includes(activeElement.type)) {
            // Prevent default behavior
            event.preventDefault();
        
            // Trigger the click event to toggle/select the input
            activeElement.click();
        }
    }
}

// ===[ Global click listener ] ===
document.addEventListener('click', (event) => {
    // if (event) sampleMethod(event);
}, false);

// ===[ Global keydown listener ] ===
document.addEventListener('keydown', (event) => {
    if (event) filterBoxKeydown(event);
    if (event) handleEnterKey(event);
}, false);


/*** 
// === [ CORETEX FYI ] ===
// Example usage

function sampleMethod(event) {
    const element = event.target.closest("[data-some-attr]"); // add your element class/id/data-attr.
    if (element) {
        event.preventDefault();
        //.... your logic here
    }
}
*/

// Code to be executed when DOM is ready.
document.addEventListener('DOMContentLoaded', function() {
    getNavigator(); // get user's device and browser
    globalTasks(); // Run Global tasks
    liquidAjaxCart.conf("updateOnWindowFocus", false);
    // put other functions Here
});

// Code to be executed when in the theme editor
if (Shopify.designMode) {
    document.addEventListener('shopify:section:load', function(event) {
        getNavigator();
        globalTasks();
        // put other functions here
    });
}

// Code to be executed when the window is resized.
let debouncerId;
window.addEventListener('resize', () => {
    clearTimeout(debouncerId);
    debouncerId = setTimeout(() => {
        globalTasks(); // Run Global tasks
        // put other functions here
    }, 222); // Adjust delay as needed
});

/***
 * === [ CORETEX FYI ] ===
 * Fires on every component load and holds name of loaded component and other not loaded components
 * 🚨 Remove in production.
*/
// document.addEventListener('component-loaded', (evt) => console.log(evt.detail));