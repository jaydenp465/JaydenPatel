/* ============================================
   Home page welcome intro. index.html decides
   (before first paint) whether to add the
   "intro-play" class; this just lets visitors
   skip it and cleans the overlay up when done.
   ============================================ */
(function () {
  var html = document.documentElement;
  var intro = document.querySelector('.intro');
  if (!intro || !html.classList.contains('intro-play')) return;

  try { sessionStorage.setItem('introSeen', '1'); } catch (e) {}

  function skip() {
    if (intro.classList.contains('skip')) return;
    intro.classList.add('skip');
    html.style.setProperty('--intro', '0s');
  }

  ['click', 'keydown', 'wheel', 'touchstart'].forEach(function (type) {
    window.addEventListener(type, skip, { once: true, passive: true });
  });

  intro.addEventListener('animationend', function (e) {
    if (e.target === intro) intro.remove();
  });
})();
