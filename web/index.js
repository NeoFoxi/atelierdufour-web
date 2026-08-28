/* Homepage scroll reveal.
 *
 * Adds the .is-visible class to .reveal elements when they enter the
 * viewport, so hero and overview sections fade in as the visitor scrolls.
 * Falls back to showing everything immediately when IntersectionObserver
 * is unavailable or reduced motion is preferred.
 */

(function () {
  "use strict";

  var els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showAll() {
    els.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (prefersReduced || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  els.forEach(function (el) {
    io.observe(el);
  });
})();
