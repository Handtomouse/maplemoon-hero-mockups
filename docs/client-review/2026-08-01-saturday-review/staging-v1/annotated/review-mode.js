(() => {
  const reviewMode = new URLSearchParams(window.location.search).get('review') === '1';
  document.documentElement.classList.toggle('review-mode', reviewMode);
  if (!reviewMode) return;

  const reviewHref = (rawHref) => {
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('http') || rawHref.startsWith('//')) return null;
    const next = new URL(rawHref, window.location.href);
    next.searchParams.set('review', '1');
    return `${next.pathname}${next.search}${next.hash}`;
  };

  const keepReview = (link) => {
    const nextHref = reviewHref(link.getAttribute('href'));
    if (nextHref && link.getAttribute('href') !== nextHref) link.setAttribute('href', nextHref);
  };

  const states = {
    review: { label: 'Needs review', className: 'review' },
    placeholder: { label: 'Placeholder or external input', className: 'placeholder' },
    replace: { label: 'Technical fix required', className: 'replace' }
  };

  const banner = document.createElement('aside');
  banner.className = 'review-banner';
  banner.setAttribute('aria-label', 'Maple Moon review key');
  banner.innerHTML = `
    <div class="review-banner__intro">
      <strong>Annotated review</strong>
      <span>Dots identify decisions, external inputs, and technical fixes.</span>
    </div>
    <div class="review-banner__legend">
      ${Object.entries(states).map(([key, state]) => `
        <span class="review-legend-item"><i class="review-dot review-dot--${state.className}" aria-hidden="true"></i>${state.label}</span>
      `).join('')}
    </div>`;
  document.body.prepend(banner);

  document.querySelectorAll('a[href]').forEach(keepReview);
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.target.matches('a[href]')) {
        keepReview(mutation.target);
      }
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches('a[href]')) keepReview(node);
        node.querySelectorAll('a[href]').forEach(keepReview);
      });
    });
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['href'] });
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (link) keepReview(link);
    const shopButton = event.target.closest('#pdpAdd');
    if (!shopButton || !/shop now/i.test(shopButton.textContent || '')) return;
    const rangeLink = document.getElementById('pdpView');
    const target = rangeLink && reviewHref(rangeLink.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = target;
  });

  const page = window.location.pathname.split('/').pop() || 'homepage.html';
  const markers = {
    'homepage.html': [
      ['header', 'replace'], ['#top', 'review'], ['#range', 'review'],
      ['#carob', 'review'], ['#why', 'review'], ['#ritual', 'review'],
      ['#story', 'review'], ['#who', 'placeholder'], ['#stockists', 'placeholder'],
      ['#reviews', 'placeholder'], ['#sampler', 'review'], ['#trust', 'review'],
      ['footer', 'replace']
    ],
    'carob-story.html': [
      ['header', 'replace'], ['#carob-story .hero', 'review'],
      ['#carob-and-cacao', 'review'], ['#pod-to-bar', 'review'],
      ['#gallery', 'review'], ['#faq', 'review'], ['footer', 'replace']
    ],
    'shop.html': [
      ['header', 'replace'], ['.sp-head', 'placeholder'], ['#catalogue', 'review'],
      ['#bars', 'placeholder'], ['#moons', 'placeholder'], ['#bites', 'placeholder'],
      ['#elixirs', 'placeholder'], ['#bananas', 'placeholder'], ['#powder', 'placeholder'],
      ['footer', 'replace']
    ],
    'our-story.html': [
      ['header', 'replace'], ['.os-story-hero', 'review'], ['#story', 'review'],
      ['#founders', 'placeholder'], ['#ingredient', 'review'], ['#carob', 'review'],
      ['#source', 'review'], ['#craft', 'review'], ['#place', 'review'],
      ['#range', 'review'], ['#shop', 'review'], ['footer', 'replace']
    ],
    'stockists.html': [
      ['header', 'replace'], ['.sp-head', 'placeholder'], ['.st-finder', 'placeholder'],
      ['.st-results-panel', 'placeholder'], ['.st-map-wrap', 'review'],
      ['footer', 'replace']
    ],
    'faq.html': [
      ['header', 'replace'], ['.faq-hero', 'review'], ['.faq-workspace', 'review'],
      ['.support-panel', 'review'], ['footer', 'replace']
    ]
  };

  (markers[page] || []).forEach(([selector, stateKey]) => {
    const state = states[stateKey];
    document.querySelectorAll(selector).forEach((target) => {
      if (!state || target.querySelector(':scope > .review-target-dot')) return;
      target.classList.add('review-target');
      const dot = document.createElement('span');
      dot.className = `review-dot review-dot--${state.className} review-target-dot`;
      dot.setAttribute('role', 'img');
      dot.setAttribute('aria-label', state.label);
      dot.title = state.label;
      target.prepend(dot);
    });
  });
})();
