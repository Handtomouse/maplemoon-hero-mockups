(function() {
  'use strict';

  /* ── Mobile Menu ── */
  var toggle = document.getElementById('menu-toggle');
  var menu = document.querySelector('.mobile-menu');
  var hamburger = document.querySelector('.hamburger');

  if (toggle && menu && hamburger) {
    document.querySelectorAll('.mobile-menu a').forEach(function(a) {
      a.addEventListener('click', function() {
        toggle.checked = false;
        toggle.dispatchEvent(new Event('change'));
      });
    });

    var closeBtn = document.querySelector('.menu-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        toggle.checked = false;
        toggle.dispatchEvent(new Event('change'));
      });
    }

    toggle.addEventListener('change', function() {
      var isOpen = toggle.checked;
      menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        menu.removeAttribute('inert');
      } else {
        menu.setAttribute('inert', '');
        hamburger.focus();
      }
    });
  }

  /* ── Header Scroll ── */
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Scroll Reveal Observer (covers .fade-up [legacy] and .reveal) ── */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up, .reveal').forEach(function(el) {
      observer.observe(el);
    });
  }

  /* ── Nav Dark-Mode Observer (Phase 1 / Task 1.4) ──
     Watches [data-nav-dark="true"] sections; when >50% in viewport,
     adds .header-dark to #site-header. Deadzones via rootMargin to avoid
     boundary thrash. Works even under reduced-motion (swap is instant). */
  var navDarkTargets = document.querySelectorAll('[data-nav-dark="true"]');
  var siteHeader = document.getElementById('site-header');
  if ('IntersectionObserver' in window && siteHeader && navDarkTargets.length) {
    var navActive = 0;
    var navDarkObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.intersectionRatio >= 0.5) {
          navActive++;
        } else if (entry.boundingClientRect.top < 0 || entry.isIntersecting === false) {
          navActive = Math.max(0, navActive - 1);
        }
      });
      siteHeader.classList.toggle('header-dark', navActive > 0);
    }, { threshold: [0, 0.5, 1], rootMargin: '-10% 0px -10% 0px' });
    navDarkTargets.forEach(function(el) { navDarkObserver.observe(el); });
  }

  /* ── Parallax (Phase 1 / Task 1.3) ──
     JS-driven translate3d on [data-parallax] elements.
     Uses requestAnimationFrame; skipped entirely under reduced-motion.
     NEVER use background-attachment:fixed (broken on iOS Safari). */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!reduceMotion && parallaxEls.length) {
    var ticking = false;
    var onScroll = function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          parallaxEls.forEach(function(el) {
            var rect = el.getBoundingClientRect();
            var speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
            var offset = rect.top * speed * -1;
            el.style.transform = 'translate3d(0,' + offset.toFixed(2) + 'px,0)';
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── PDP Thumbnail Gallery Swap (Phase 1 / Task 1.5) ──
     Click a [data-pdp-thumb] to swap its src into [data-pdp-main] with crossfade. */
  var pdpMain = document.querySelector('[data-pdp-main]');
  var pdpThumbs = document.querySelectorAll('[data-pdp-thumb]');
  if (pdpMain && pdpThumbs.length) {
    pdpThumbs.forEach(function(thumb) {
      thumb.addEventListener('click', function(e) {
        e.preventDefault();
        var src = thumb.getAttribute('data-src') || thumb.querySelector('img') && thumb.querySelector('img').src;
        if (!src || !pdpMain.tagName || pdpMain.tagName !== 'IMG') return;
        if (pdpMain.src === src) return;
        pdpMain.style.transition = 'opacity 0.4s ease';
        pdpMain.style.opacity = '0';
        setTimeout(function() {
          pdpMain.src = src;
          pdpMain.style.opacity = '1';
        }, 400);
        pdpThumbs.forEach(function(t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
      });
    });
  }

  /* ── Smooth Scroll for Anchor Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
