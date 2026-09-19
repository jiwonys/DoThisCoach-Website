(() => {
  'use strict';
  const sports = ['tennis', 'basketball', 'volleyball', 'soccer', 'pickleball'];
  let sport = 'general';
  function updateDestination() {
    const requested = new URLSearchParams(location.search).get('sport');
    sport = sports.includes(requested) ? requested : 'general';
    document.querySelectorAll('[data-download]').forEach(link => {
      link.href = sport === 'general' ? '/app/' : '/app/' + sport + '/';
    });
  }
  updateDestination();
  addEventListener('popstate', updateDestination);
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelectorAll('[data-download]').forEach(link => {
    link.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('dothis:cta', {
        detail: { event: 'homepage_app_store_click', sport, location: link.dataset.ctaLocation }
      }));
    });
  });
})();
