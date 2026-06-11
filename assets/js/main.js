/* ============================================================
   ALK REAL ESTATE — interaction layer
   Quiet, physical, Apple-like. Everything degrades gracefully.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Floating nav: subtle state on scroll ---- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    var setMenu = function (open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        menu.querySelectorAll('a').forEach(function (a, i) {
          a.style.transitionDelay = (80 + i * 55) + 'ms';
        });
      }
    };
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
    });
  }

  /* ---- Scroll reveal (staggered, gentle) ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- Hero parallax (very soft, transform only) ---- */
  var heroImg = document.querySelector('.hero-bg img, .hero-bg .ph');
  if (heroImg && !reduce) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = Math.min(window.scrollY, 900);
          heroImg.style.transform = 'translate3d(0,' + (y * 0.12) + 'px,0) scale(1.04)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---- Filter chips (residences) ---- */
  var filterBar = document.querySelector('[data-filter-bar]');
  if (filterBar) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-cat]'));
    filterBar.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterBar.querySelectorAll('.chip').forEach(function (c) {
          c.classList.remove('active'); c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active'); chip.setAttribute('aria-pressed', 'true');
        var f = chip.getAttribute('data-filter');
        cards.forEach(function (card) {
          var show = f === 'all' || card.getAttribute('data-cat').indexOf(f) > -1;
          card.style.transition = 'opacity .4s var(--ease-out), transform .4s var(--ease-out)';
          if (show) {
            card.style.display = '';
            requestAnimationFrame(function () { card.style.opacity = '1'; card.style.transform = 'none'; });
          } else {
            card.style.opacity = '0'; card.style.transform = 'translateY(10px)';
            setTimeout(function () { card.style.display = 'none'; }, 380);
          }
        });
      });
    });
  }

  /* ---- Floor-plan / generic tabs ---- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('[data-tab]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        group.querySelectorAll('[data-panel]').forEach(function (p) {
          p.classList.toggle('active', p.getAttribute('data-panel') === target);
        });
      });
    });
  });

  /* ---- Forms: quiet inline feedback (demo, no backend) ---- */
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.querySelector('.form-ok');
      var btn = form.querySelector('button[type=submit]');
      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (inp) {
        if (!inp.value.trim() && !firstInvalid) firstInvalid = inp;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      setTimeout(function () {
        if (ok) ok.classList.add('show');
        form.querySelectorAll('input, textarea, select').forEach(function (i) {
          if (i.type !== 'submit') i.value = '';
        });
        if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute('data-label') || 'Send'; }
      }, 850);
    });
  });

  /* ---- Year ---- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
