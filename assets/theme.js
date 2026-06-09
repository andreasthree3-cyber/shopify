// FleckenXperte Theme JS
(function () {
  'use strict';

  var menuToggle = document.querySelector('.site-header__menu-toggle');
  var drawer = document.querySelector('.site-header__drawer');

  if (menuToggle && drawer) {
    menuToggle.addEventListener('click', function () {
      var isOpen = drawer.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (event) {
      if (!drawer.contains(event.target) && !menuToggle.contains(event.target)) {
        drawer.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Update header cart count after add-to-cart form submits via fetch (progressive enhancement)
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.action && form.action.indexOf('/cart/add') !== -1) {
      // Let the form submit normally; Shopify will redirect to /cart.
    }
  });

  // Refresh cart count on pageshow (handles back-nav from checkout)
  window.addEventListener('pageshow', function () {
    fetch('/cart.js', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (cart) {
        if (!cart) return;
        var el = document.querySelector('[data-cart-count]');
        if (el) el.textContent = cart.item_count;
      })
      .catch(function () {});
  });
})();
