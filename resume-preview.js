/* ============================================
   Renders page 1 of resume.pdf onto a canvas —
   a plain image of the page, no browser PDF
   toolbar. Uses PDF.js (loaded via CDN in
   resume.html). Falls back to a text message
   if the file is missing or fails to load.
   ============================================ */
(function () {
  var container = document.getElementById('resume-embed');
  var canvas = document.getElementById('resume-canvas');
  var fallback = document.getElementById('resume-fallback');
  if (!container || !canvas || typeof pdfjsLib === 'undefined') return;

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  var pdfPromise = null;
  var renderTask = null;

  function showFallback() {
    canvas.hidden = true;
    fallback.hidden = false;
  }

  function renderPage(page) {
    var containerWidth = container.clientWidth;
    var baseViewport = page.getViewport({ scale: 1 });
    var scale = containerWidth / baseViewport.width;
    var viewport = page.getViewport({ scale: scale });
    var dpr = window.devicePixelRatio || 1;

    canvas.width = viewport.width * dpr;
    canvas.height = viewport.height * dpr;
    canvas.style.width = viewport.width + 'px';
    canvas.style.height = viewport.height + 'px';

    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (renderTask) renderTask.cancel();
    renderTask = page.render({ canvasContext: ctx, viewport: viewport });
    return renderTask.promise;
  }

  function render() {
    if (!pdfPromise) {
      pdfPromise = pdfjsLib.getDocument('resume.pdf').promise;
    }
    pdfPromise
      .then(function (pdf) { return pdf.getPage(1); })
      .then(renderPage)
      .catch(function (err) {
        if (err && err.name === 'RenderingCancelledException') return;
        showFallback();
      });
  }

  render();

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 200);
  });
})();
