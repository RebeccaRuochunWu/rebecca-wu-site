// Shared behaviour for every page. Each block only runs if its elements are on the page.
(function () {
  // Sidebar menu (phones)
  var sb = document.getElementById('sb');
  var toggle = sb && sb.querySelector('.sb-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = sb.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Home hero slideshow
  var slides = document.querySelectorAll('.hero-slide');
  var bars = document.querySelectorAll('.hero-bar');
  if (slides.length && bars.length) {
    var caption = document.getElementById('hero-caption');
    var captions = ['Mountain valley', 'Last light', 'Market street', 'Autumn gate'];
    var i = 0, timer;
    var show = function (n) {
      i = n;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === n); });
      bars.forEach(function (b, k) {
        b.classList.remove('is-active');
        b.classList.toggle('is-past', k < n);
        b.setAttribute('aria-pressed', k === n ? 'true' : 'false');
      });
      void bars[n].offsetWidth; // restart the progress animation
      bars[n].classList.add('is-active');
      if (caption) caption.textContent = captions[n];
    };
    var start = function () { clearInterval(timer); timer = setInterval(function () { show((i + 1) % slides.length); }, 6000); };
    bars.forEach(function (b) { b.addEventListener('click', function () { show(+b.dataset.slide); start(); }); });
    start();
  }

  // Products list: a print of the product follows the cursor
  var list = document.getElementById('pi'), card = document.getElementById('pi-float');
  if (list && card && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var img = card.querySelector('img'), x = 0, y = 0, cx = 0, cy = 0, raf = null, tilt = 0;
    var loop = function () {
      cx += (x - cx) * 0.16; cy += (y - cy) * 0.16;
      card.style.transform = 'translate(' + (cx + 28) + 'px,' + (cy - 120) + 'px) rotate(' + tilt + 'deg)';
      raf = requestAnimationFrame(loop);
    };
    list.querySelectorAll('.pi-row').forEach(function (row, k) {
      row.addEventListener('mouseenter', function (e) {
        img.src = row.dataset.preview; tilt = k % 2 ? 3 : -3;
        if (!card.classList.contains('on')) { cx = x = e.clientX; cy = y = e.clientY; }
        card.classList.add('on');
        if (!raf) loop();
      });
    });
    list.addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; });
    list.addEventListener('mouseleave', function () { card.classList.remove('on'); cancelAnimationFrame(raf); raf = null; });
  }

  // Autoplay muted demo videos
  document.querySelectorAll('video[autoplay]').forEach(function (v) {
    v.muted = true;
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  });
})();
