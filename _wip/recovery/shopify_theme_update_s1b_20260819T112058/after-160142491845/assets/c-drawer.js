import { FocusTrap } from "@openthinking/helpers"

if (!customElements.get("coretex-drawer")) {
    customElements.define(
        "coretex-drawer",
        class CoretexDrawer extends HTMLElement {
            constructor() {
                super();
                this.id = this.getAttribute("id");
                this.onBodyClick = this.handleBodyClick.bind(this);
                this.focusTrap = new FocusTrap(this, { enableClickTrap: false });
    
                // Delegate click listener for [data-close]
                this.addEventListener("click", (event) => {
                    if (event.target.matches('[data-close]')) {
                        this.close();
                    }
                });
    
                this.addEventListener("keyup", (event) => {
                    if (event.code.toUpperCase() === "ESCAPE") this.close();
                });
    
                document.addEventListener("click", (evt) => {
                    const openTrigger = evt.target.closest('[data-open]');
                    if (openTrigger && openTrigger.getAttribute("data-open") === `#${this.id}`) {
                        this.open(evt.target);
                    }
                });
            }

            handleBodyClick(evt) {
                const target = evt.target;

                // Check if the drawer has the 'data-nobdc' attribute
                // Do nothing if 'data-nobdc' is present
                if (this.hasAttribute("data-nobdc")) return;

                // Close the drawer only if the click is outside the drawer
                if (target !== this && !this.contains(target)) this.close();
            }

            open(focusElement) {
                // Invalidate any pending close() so it can't clobber this open once it settles.
                this.closeToken = {};

                this.removeAttribute("closing");
                this.removeAttribute("closed");

                requestAnimationFrame(() => {
                    this.focusElement = focusElement;
                    this.setAttribute("open", ""); // Triggers the transition

                    // Add the associated class and event listener
                    document.body.classList.add(`do-${this.id}`);
                    document.body.addEventListener("click", this.onBodyClick);

                    this.focusTrap.activate();
                });
            }

            close() {
                if (this.hasAttribute("closing") || this.hasAttribute("closed")) return;

                const token = this.closeToken = {};

                this.removeAttribute("open");
                this.setAttribute("closing", ""); // Triggers the closing transition
                document.body.removeEventListener("click", this.onBodyClick);
                document.body.classList.remove(`do-${this.id}`);
                this.focusTrap.deactivate();

                // Wait a frame for the transition to be picked up, then wait for it to finish before marking as closed.
                requestAnimationFrame(() => {
                    if (this.closeToken !== token) return; // Superseded by a subsequent open()/close()

                    Promise.allSettled(this.getAnimations({ subtree: true }).map((animation) => animation.finished))
                        .then(() => {
                            if (this.closeToken !== token) return; // Superseded by a subsequent open()/close()

                            this.removeAttribute("closing");
                            this.setAttribute("closed", "");
                        });
                });
            }
        }
    );
}