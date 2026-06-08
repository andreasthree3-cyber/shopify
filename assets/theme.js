// FleckenXperte Theme JS
(function () {
  'use strict';

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
