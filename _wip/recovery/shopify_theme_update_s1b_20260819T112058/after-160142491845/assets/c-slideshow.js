import CoretexSlider from "c-slider";

// CoretexSlideshow inherits from CoretexSlider
if (!customElements.get('coretex-slideshow')) {
    customElements.define('coretex-slideshow', class CoretexSlideshow extends CoretexSlider {
        constructor() {
            super();
            this.buttonThumbs = null; // Additional property specific to slideshow
        }

        // Override viewport selector for slideshow
        getViewportSelector() {
            return '[slideshow-viewport]';
        }

        // Override to get slideshow-specific slide attribute
        getSlideAttribute() {
            return 'slideshow-slide';
        }

        // Override to provide slideshow-specific default options
        getDefaultOptions() {
            const baseOptions = super.getDefaultOptions();
            return {
                ...baseOptions,
                loop: true // Slideshows are looped by default
            };
        }

        // Override to add slideshow-specific plugins
        async initializePlugins() {
            const plugins = await super.initializePlugins();

            // Check for auto-height attribute - specific to slideshow
            if (this.hasAttribute('auto-height')) {
                const { default: AutoHeight } = await import("carousel-ah");
                plugins.push(AutoHeight({destroyHeight: 'auto'}));
            }

            return plugins;
        }

        // Initialize additional elements
        async connectedCallback() {
            this.buttonThumbs = this.querySelector('[control-thumbs]');
            this.progressNode = this.querySelector('[control-progress]');
            await super.connectedCallback();
            this.initProgress();
            this.initPlayButton();
        }

        initPlayButton() {
            const btn = this.querySelector('[control-play]');
            if (!btn || !this.autoplayPlugin) return;

            const playIcon = btn.querySelector('[control-play-icon]');
            const pauseIcon = btn.querySelector('[control-pause-icon]');

            const updateIcon = () => {
                const playing = this.autoplayPlugin.isPlaying();
                if (playIcon) playIcon.toggleAttribute('hidden', !playing);
                if (pauseIcon) pauseIcon.toggleAttribute('hidden', playing);
                btn.setAttribute('aria-label', playing
                    ? btn.getAttribute('aria-label-pause') || 'Pause slideshow'
                    : btn.getAttribute('aria-label-play') || 'Play slideshow'
                );
            };

            btn.addEventListener('click', () => {
                if (this.autoplayPlugin.isPlaying()) {
                    this.autoplayPlugin.stop();
                } else {
                    this.autoplayPlugin.play();
                }
                updateIcon();
            });

            this.embla.on('autoplay:play', updateIcon);
            this.embla.on('autoplay:stop', updateIcon);
            this.embla.on('select', updateIcon);
        }

        initProgress() {
            const progressNode = this.progressNode;
            if (!progressNode || !this.embla) return;

            const progressBarNode = progressNode.querySelector('[control-progress-bar]');
            if (!progressBarNode) return;

            let rafId = 0;
            let timeoutId = 0;

            const startProgress = () => {
                const autoplay = this.embla?.plugins()?.autoplay;
                if (!autoplay) return;

                const timeUntilNext = autoplay.timeUntilNext();
                if (timeUntilNext === null) return;

                // Reset bar to start position before re-animating
                progressBarNode.style.animationName = 'none';
                progressNode.setAttribute('hidden', '');

                cancelAnimationFrame(rafId);
                clearTimeout(timeoutId);

                rafId = requestAnimationFrame(() => {
                    timeoutId = setTimeout(() => {
                        progressBarNode.style.animationName = '';
                        progressBarNode.style.animationDuration = `${timeUntilNext}ms`;
                        progressNode.removeAttribute('hidden');
                    }, 0);
                });
            };

            const stopProgress = () => {
                progressNode.setAttribute('hidden', '');
            };

            this.embla.on('autoplay:timerset', startProgress);
            this.embla.on('autoplay:timerstopped', stopProgress);

            // Autoplay is already running on init 
            // trigger manually for the first slide
            startProgress();
        }
    });
}