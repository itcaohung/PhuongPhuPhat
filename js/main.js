(function () {
  'use strict';

  var doc = document;

  /* ---------- Header shadow on scroll ---------- */
  var header = doc.querySelector('.site-header');
  var toTop = doc.querySelector('.fab--top');
  function onScroll() {
    var y = window.pageYOffset || doc.documentElement.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Mobile navigation ---------- */
  var overlay = doc.querySelector('.overlay');
  var mobileNav = doc.querySelector('.mobile-nav');
  function openNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    doc.body.style.overflow = 'hidden';
  }
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    doc.body.style.overflow = '';
  }
  doc.querySelectorAll('.nav-toggle').forEach(function (b) { b.addEventListener('click', openNav); });
  doc.querySelectorAll('[data-close-nav]').forEach(function (b) { b.addEventListener('click', closeNav); });
  if (overlay) overlay.addEventListener('click', closeNav);
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  doc.querySelectorAll('.m-group > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var group = a.parentElement;
      if (group.querySelector('.m-sub')) {
        e.preventDefault();
        group.classList.toggle('open');
      }
    });
  });

  /* ---------- Hero slider ---------- */
  var slides = doc.querySelectorAll('.hero-slide');
  var dots = doc.querySelectorAll('.hero-dots button');
  if (slides.length > 1) {
    var current = 0;
    var timer;
    function go(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === current); });
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === current); });
    }
    function auto() {
      clearInterval(timer);
      timer = setInterval(function () { go(current + 1); }, 6000);
    }
    dots.forEach(function (d, k) {
      d.addEventListener('click', function () { go(k); auto(); });
    });
    go(0);
    auto();
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Product gallery ---------- */
  var stage = doc.querySelector('.gallery-stage img');
  if (stage) {
    doc.querySelectorAll('.gallery-thumbs button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var full = btn.getAttribute('data-full');
        if (full) stage.setAttribute('src', full);
        doc.querySelectorAll('.gallery-thumbs button').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
      });
    });
  }

  /* ---------- Tabs ---------- */
  var tabs = doc.querySelectorAll('.tab-btn');
  if (tabs.length) {
    tabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        tabs.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        doc.querySelectorAll('.tab-panel').forEach(function (p) {
          p.classList.toggle('is-active', p.id === target);
        });
      });
    });
  }

  /* ---------- Contact form (soạn nội dung -> copy -> mở Zalo) ---------- */
  var ZALO_URL = 'https://zalo.me/0902953318';
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { legacyCopy(text); });
    }
    legacyCopy(text);
    return Promise.resolve();
  }
  function legacyCopy(text) {
    var ta = doc.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    doc.body.appendChild(ta);
    ta.select();
    try { doc.execCommand('copy'); } catch (err) {}
    doc.body.removeChild(ta);
  }
  var form = doc.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (n) { var el = form.elements[n]; return el ? el.value.trim() : ''; };
      var name = get('name'), phone = get('phone'), email = get('email');
      var subject = get('subject') || 'Yêu cầu báo giá';
      var message = get('message');
      var lines = [
        'Yêu cầu báo giá - Phương Phú Phát',
        'Họ tên: ' + (name || '(chưa nhập)'),
        'Điện thoại: ' + (phone || '(chưa nhập)')
      ];
      if (email) lines.push('Email: ' + email);
      lines.push('Sản phẩm quan tâm: ' + subject);
      lines.push('Nội dung: ' + (message || '(chưa nhập)'));
      var alert = form.querySelector('.form-alert');
      copyText(lines.join('\n')).then(function () {
        window.open(ZALO_URL, '_blank', 'noopener');
        if (alert) {
          alert.classList.add('ok');
          alert.textContent = 'Cảm ơn ' + (name || 'Quý khách') + '! Nội dung đã được sao chép – hãy mở Zalo 0902 953 318 và dán (Ctrl/Cmd + V) để gửi yêu cầu.';
        }
      });
    });
  }

  /* ---------- Current year ---------- */
  doc.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
