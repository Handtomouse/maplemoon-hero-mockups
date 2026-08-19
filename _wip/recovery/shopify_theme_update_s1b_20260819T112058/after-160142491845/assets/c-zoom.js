import CoretexDialog from "c-dialog";

class CoretexZoomDialog extends CoretexDialog {
    constructor() {
      super();
      this.scrollToTargetImage = this.scrollToTargetImage.bind(this);
      this.closeDialogOnContentClick = this.closeDialogOnContentClick.bind(this);
      this.handleMiniMapClick = this.handleMiniMapClick.bind(this);
      this.handleMainImageIntersect = this.handleMainImageIntersect.bind(this);
      this.triggerButton = null; // Store the triggering button

      this.miniMap = null;
      this.mainListItems = null;
      this.intersectionObserver = null;

      // Override the parent's openDialog binding to capture trigger button
      this.openDialog = this._handleZoomTriggerClick.bind(this);
    }

    connectedCallback() {
      super.connectedCallback();
      const zoomDialog = this.querySelector('.coretex-zoom-dialog');
      if (zoomDialog) this.dialog = zoomDialog;

      if (this.dialog) this.dialog.addEventListener('click', this.closeDialogOnContentClick);

      this.miniMap = this.querySelector('mini-map');
      if (this.miniMap) this.miniMap.addEventListener('click', this.handleMiniMapClick);

      this._setupIntersectionObserver();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      if (this.dialog) this.dialog.removeEventListener('click', this.closeDialogOnContentClick);
      if (this.miniMap) this.miniMap.removeEventListener('click', this.handleMiniMapClick);
      if (this.intersectionObserver) this.intersectionObserver.disconnect();
    }

    _setupIntersectionObserver() {
      const main = this.querySelector('main');
      if (!main || !this.dialog) return;

      this.mainListItems = main.querySelectorAll('li[data-zoom-target]');
      if (!this.mainListItems.length) return;

      this.intersectionObserver = new IntersectionObserver(this.handleMainImageIntersect, {
        root: this.dialog,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      });

      for (const item of this.mainListItems) this.intersectionObserver.observe(item);
    }

    refresh() {
      if (this.intersectionObserver) this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
      this.mainListItems = null;
      this._setupIntersectionObserver();
    }

    handleMainImageIntersect(entries) {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (!visibleEntries.length) return;

      // When multiple images are intersecting at once, pick the most visible one
      // so the mini-map highlight doesn't just land on the last entry in the batch.
      const mostVisible = visibleEntries.reduce((best, entry) => (entry.intersectionRatio > best.intersectionRatio ? entry : best));

      const targetId = mostVisible.target.getAttribute('data-zoom-target');
      this._setActiveMiniMapItem(targetId);
    }

    _setActiveMiniMapItem(targetId) {
      if (!this.miniMap || !targetId) return;

      const miniMapButtons = this.miniMap.querySelectorAll('button[data-zoom-target]');
      for (const button of miniMapButtons) {
        button.classList.toggle('is-selected', button.getAttribute('data-zoom-target') === targetId);
      }
    }

    handleMiniMapClick(event) {
      const button = event.target.closest('button[data-zoom-target]');
      if (!button) return;

      event.stopPropagation();
      this.triggerButton = button;
      this.scrollToTargetImage();
    }

    // Custom trigger handler to capture the triggering button
    _handleZoomTriggerClick(event) {
      event.preventDefault();
      this.triggerButton = event.target.closest('[data-open]'); // Store the button that triggered the open

      // Blur the trigger button to prevent aria-hidden focus warning
      if (this.triggerButton) this.triggerButton.blur();

      this.open();
    }

    open() {
      if (!this.dialog) return;
      super.open();
      this.scrollToTargetImage();
    }

    scrollToTargetImage() {
      if (!this.triggerButton) return;

      const targetId = this.triggerButton.getAttribute('data-zoom-target');
      if (!targetId) return;

      // Query specifically for li elements in the dialog's main content to avoid ambiguity
      const targetLi = this.dialog.querySelector(`main li[data-zoom-target="${targetId}"]`);

      if (targetLi) targetLi.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    _finalizeClose() {
      // Blur the dialog element before setting aria-hidden to prevent focus warning
      if (this.dialog) this.dialog.blur();

      super._finalizeClose();
    }

    closeDialogOnContentClick(event) {
      this.close();
      event.stopPropagation();
    }
  }
  
if (!customElements.get('coretex-zoom-dialog')) customElements.define('coretex-zoom-dialog', CoretexZoomDialog);
