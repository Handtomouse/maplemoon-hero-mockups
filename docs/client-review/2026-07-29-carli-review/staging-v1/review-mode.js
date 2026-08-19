(() => {
  const reviewMode = new URLSearchParams(window.location.search).get('review') === '1';
  document.documentElement.classList.toggle('review-mode', reviewMode);
  if (!reviewMode) return;

  const states = {
    confirmed: { label: 'Confirmed/current', className: 'confirmed' },
    review: { label: 'Needs review', className: 'review' },
    placeholder: { label: 'Placeholder', className: 'placeholder' },
    replace: { label: 'Needs replacement', className: 'replace' }
  };

  const banner = document.createElement('aside');
  banner.className = 'review-banner';
  banner.setAttribute('aria-label', 'Carli review key');
  banner.innerHTML = `
    <div class="review-banner__intro">
      <strong>Carli review build</strong>
      <span>Dots show what is current, provisional, or still needs a decision.</span>
    </div>
    <div class="review-banner__legend">
      ${Object.entries(states).map(([key, state]) => `
        <span class="review-legend-item"><i class="review-dot review-dot--${state.className}" aria-hidden="true"></i>${state.label}</span>
      `).join('')}
    </div>`;
  document.body.prepend(banner);

  // Keep Carli's review presentation active as she follows normal site navigation.
  document.querySelectorAll('a[href]').forEach((link) => {
    const rawHref = link.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('http') || rawHref.startsWith('//')) return;
    const next = new URL(rawHref, window.location.href);
    next.searchParams.set('review', '1');
    link.setAttribute('href', `${next.pathname}${next.search}${next.hash}`);
  });

  const page = window.location.pathname.split('/').pop() || 'homepage.html';
  const markers = {
    'homepage.html': [
      ['#top', 'review'], ['#range', 'review'], ['#ritual', 'review'],
      ['#who', 'review'], ['#stockists', 'placeholder'], ['#reviews', 'placeholder'], ['#trust', 'confirmed']
    ],
    'homepage_real_1_lead_photo.WIP.html': [
      ['#top', 'review'], ['#range', 'review'], ['#ritual', 'review'],
      ['#who', 'review'], ['#stockists', 'placeholder'], ['#reviews', 'placeholder'], ['#trust', 'confirmed']
    ],
    'shop.WIP.html': [
      ['.sp-head', 'review'], ['#packs', 'placeholder'], ['#catalogue', 'review'],
      ['#bars', 'placeholder'], ['#moons', 'placeholder'], ['#bites', 'placeholder'],
      ['#elixirs', 'placeholder'], ['#bananas', 'placeholder'], ['#powder', 'placeholder']
    ],
    'our-story.WIP.html': [
      ['.os-story-hero', 'review'], ['#founders', 'placeholder'],
      ['#source', 'review'], ['#place', 'review'], ['#shop', 'confirmed']
    ],
    'carob-story.WIP.html': [
      ['#carob-story .hero', 'review'], ['#carob-and-cacao', 'review'],
      ['#pod-to-bar', 'review'], ['#gallery', 'placeholder'], ['#faq', 'review']
    ],
    'faq.WIP.html': [
      ['.faq-hero', 'review'], ['.faq-workspace', 'review'], ['.support-panel', 'placeholder']
    ],
    'stockists.WIP.html': [
      ['.sp-head', 'review'], ['.st-finder', 'placeholder'],
      ['#stockistResults', 'placeholder'], ['#stockistDirectoryStatus', 'review']
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
