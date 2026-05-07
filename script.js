// Erlanger Bergwirte – two responsibilities only:
//   1. Countdown to the Anstich (21 May 2026, 17:00 CEST).
//   2. Burger menu toggle, with proper aria-expanded and Escape-to-close.

(function () {
  'use strict';

  // --- Countdown -----------------------------------------------------------

  var ANSTICH = new Date('2026-05-21T17:00:00+02:00').getTime();
  var END     = new Date('2026-06-01T23:59:59+02:00').getTime();

  var nodes = {
    days:    document.querySelector('[data-cd="days"]'),
    hours:   document.querySelector('[data-cd="hours"]'),
    minutes: document.querySelector('[data-cd="minutes"]'),
    seconds: document.querySelector('[data-cd="seconds"]'),
    live:    document.querySelector('[data-cd="live"]'),
    list:    document.getElementById('countdown')
  };

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var now = Date.now();
    var diff = ANSTICH - now;

    if (diff <= 0) {
      // Anstich happened. Either the festival is running, or it's over.
      if (nodes.list) nodes.list.hidden = true;
      if (nodes.live) {
        nodes.live.hidden = false;
        if (now > END) {
          nodes.live.textContent = 'Berchkerwa 2026 ist vorbei. Bis 2027.';
        }
      }
      return false; // stop ticking
    }

    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600);  s -= h * 3600;
    var m = Math.floor(s / 60);    s -= m * 60;

    if (nodes.days)    nodes.days.textContent    = String(d);
    if (nodes.hours)   nodes.hours.textContent   = pad(h);
    if (nodes.minutes) nodes.minutes.textContent = pad(m);
    if (nodes.seconds) nodes.seconds.textContent = pad(s);
    return true;
  }

  if (nodes.list) {
    if (tick()) {
      setInterval(function () {
        if (!tick()) return; // tick() will hide itself when done
      }, 1000);
    }
  }

  // --- Burger menu ---------------------------------------------------------

  var burger = document.querySelector('.burger');
  var nav    = document.getElementById('primary-nav');

  function setOpen(open) {
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    if (open) {
      nav.setAttribute('data-open', 'true');
    } else {
      nav.removeAttribute('data-open');
    }
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = burger.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    // Close on Escape.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        burger.focus();
      }
    });

    // Close when an in-nav link is activated (so the user actually sees the section).
    nav.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.tagName === 'A') setOpen(false);
    });
  }
})();
