// Erlanger Bergwirte – burger menu only.
// Toggles the mobile nav with proper aria-expanded and Escape-to-close.

(function () {
  'use strict';

  var burger = document.querySelector('.burger');
  var nav    = document.getElementById('primary-nav');

  if (!burger || !nav) return;

  function setOpen(open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    if (open) {
      nav.setAttribute('data-open', 'true');
    } else {
      nav.removeAttribute('data-open');
    }
  }

  burger.addEventListener('click', function () {
    var isOpen = burger.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      burger.focus();
    }
  });

  nav.addEventListener('click', function (e) {
    var t = e.target;
    if (t && t.tagName === 'A') setOpen(false);
  });
})();
