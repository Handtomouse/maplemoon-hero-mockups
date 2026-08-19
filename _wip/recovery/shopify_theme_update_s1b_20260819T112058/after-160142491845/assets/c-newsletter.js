import CoretexDialog from "c-dialog";

export default class CoretexNewsletter extends CoretexDialog {
    constructor() {
        super();
        this.cookieName = 'cortex:newsletter';
    }

    connectedCallback() {
        super.connectedCallback();

        if (window.location.pathname === '/challenge') return; // Skip initialization on challenge page
        if ([...document.body.classList].some(cls => cls.startsWith('o-'))) return; // Skip initialization if body has a class starting with "o-"

        if (this.querySelector('[data-form-status]')) {
            this.open();
            this.classList.add('hasFormStatus'); // Open modal on failure or success
            if (this.querySelector('#newsletter-success') && this.dataset.designMode !== 'true') {
                this.setCookie(this.cookieName, this.dataset.expire);
            }
        }

        if (!this.getCookie(this.cookieName) || this.dataset.designMode === 'true') {
            this.init();
        }
    }

    init() {
        if (Shopify && Shopify.designMode) return;

        const trigger = this.dataset.trigger || 'delay';

        switch (trigger) {
            case 'delay':
                this._initDelay();
                break;
            case 'exit':
                this._initExitIntent();
                break;
            case 'scroll':
                this._initScroll();
                break;
        }
    }

    _triggerOpen() {
        if (!this.dialog.hasAttribute('open')) {
            this.open();
        }
    }

    _initDelay() {
        const delay = parseInt(this.dataset.delay);
        if (!isNaN(delay) && delay > 0) {
            setTimeout(() => this._triggerOpen(), delay * 1000);
        }
    }

    _initExitIntent() {
        this._onMouseLeave = (e) => {
            if (e.clientY <= 0) {
                this._triggerOpen();
                document.removeEventListener('mouseleave', this._onMouseLeave);
            }
        };
        document.addEventListener('mouseleave', this._onMouseLeave);
    }

    _initScroll() {
        const type = this.dataset.scrollType || 'percent';
        const value = parseInt(this.dataset.scrollPosition);
        if (isNaN(value)) return;

        this._onScroll = () => {
            const scrolled = type === 'px'
                ? window.scrollY
                : (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrolled >= value) {
                this._triggerOpen();
                window.removeEventListener('scroll', this._onScroll);
            }
        };
        window.addEventListener('scroll', this._onScroll, { passive: true });
    }

    /*** 
     * === [ CORETEX FYI ] ===
     * 'open' and 'close' methods will call the parent class methods
     * and include any additional logic specific to CoretexNewsletter
     */

    open() {
        if (!this.dialog.hasAttribute('open')) {
            super.open(); // Call the open() method from the parent class
            this.removeCookie(this.cookieName);
        }
    }

    close() {
        super.close(); // Call the close() method from the parent class
        if (this.dataset.designMode !== 'true') this.setCookie(this.cookieName, this.dataset.expire);
        this._cleanupListeners();
    }

    _cleanupListeners() {
        if (this._onMouseLeave) document.removeEventListener('mouseleave', this._onMouseLeave);
        if (this._onScroll) window.removeEventListener('scroll', this._onScroll);
    }

    // Cookie handling methods
    getCookie(name) { const match = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`); return match ? match[2] : null;}
    setCookie(name, expire) { document.cookie = `${name}=true; max-age=${expire * 24 * 60 * 60}; path=/`; }
    removeCookie(name) { document.cookie = `${name}=; max-age=0`; }
}

if (!customElements.get('coretex-newsletter')) customElements.define('coretex-newsletter', CoretexNewsletter);
