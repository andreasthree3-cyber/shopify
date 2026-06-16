// FleckenXperte Theme JS
(function () {
  'use strict';

  // Mobile menu toggle logic
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

  // Scroll Animations: Intersection Observer to trigger scroll entries
  document.addEventListener('DOMContentLoaded', function () {
    var animatedElements = document.querySelectorAll(
      '.hero__inner, .benefits__head, .benefit-card, .featured-product__head-section, .featured-product__popular-box, .featured-product__main-card, .steps__head, .step-card, .use-cases__head, .use-case-card, .faq__title, .faq__item, .pdp__grid'
    );

    // Apply animation-ready class
    animatedElements.forEach(function (el) {
      el.classList.add('reveal-element');
    });

    if ('IntersectionObserver' in window) {
      var observerOptions = {
        root: null,
        rootMargin: '0px 0px -8% 0px', // Trigger slightly before element enters view
        threshold: 0.05
      };

      var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-element--visible');
            // Unobserve once animated in
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      animatedElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback for older browsers
      animatedElements.forEach(function (el) {
        el.classList.add('reveal-element--visible');
      });
    }
  });
})();
