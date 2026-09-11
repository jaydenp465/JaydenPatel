/* ============================================
   Project card photo slideshows.
   No dependencies. Looks for any ".slideshow"
   element and wires up arrows, dots, swipe,
   keyboard, and (optional) autoplay.
   ============================================ */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initSlideshow(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
    if (slides.length <= 1) {
      root.setAttribute('data-single', '');
      return;
    }

    var index = 0;
    var dots = [];
    var dotsWrap = root.querySelector('.slide-dots');
    var timer = null;
    var autoplay = root.hasAttribute('data-autoplay') && !reduceMotion;

    function render() {
      root.style.setProperty('--i', index);
      slides.forEach(function (slide, i) {
        slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }

    function goTo(n) {
      index = (n + slides.length) % slides.length;
      render();
    }

    function stopAutoplay() {
      autoplay = false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function pauseAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function resumeAutoplay() {
      if (autoplay && !timer) {
        timer = setInterval(function () { goTo(index + 1); }, 4500);
      }
    }

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Photo ' + (i + 1) + ' of ' + slides.length);
        dot.addEventListener('click', function () {
          stopAutoplay();
          goTo(i);
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    var prevBtn = root.querySelector('.slide-nav.prev');
    var nextBtn = root.querySelector('.slide-nav.next');
    if (prevBtn) prevBtn.addEventListener('click', function () { stopAutoplay(); goTo(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stopAutoplay(); goTo(index + 1); });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { stopAutoplay(); goTo(index - 1); }
      else if (e.key === 'ArrowRight') { stopAutoplay(); goTo(index + 1); }
    });

    var startX = null;
    root.addEventListener('pointerdown', function (e) { startX = e.clientX; });
    root.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) {
        stopAutoplay();
        goTo(index + (dx < 0 ? 1 : -1));
      }
    });

    root.addEventListener('mouseenter', pauseAutoplay);
    root.addEventListener('mouseleave', resumeAutoplay);
    root.addEventListener('focusin', pauseAutoplay);
    root.addEventListener('focusout', resumeAutoplay);

    render();
    resumeAutoplay();
  }

  document.querySelectorAll('.slideshow').forEach(initSlideshow);
})();
