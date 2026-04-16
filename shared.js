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

  /* ── Scroll Fade-Up Observer ── */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(function(el) {
      observer.observe(el);
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
