(function () {
  // Derive the components directory from this script's own URL.
  // document.currentScript.src is an absolute URL, so this works
  // regardless of which page depth the script is loaded from.
  var base = (function () {
    var s = document.currentScript;
    if (!s) return 'components/';
    return s.src.replace(/[^/]+$/, '');
  })();

  var onImpressum = /\/impressum(\/|$)/.test(window.location.pathname);

  function loadInto(placeholderId, filename) {
    return fetch(base + filename)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var el = document.getElementById(placeholderId);
        if (!el) return;
        var tmp = document.createElement('div');
        tmp.innerHTML = html.trim();
        el.replaceWith(tmp.firstElementChild);
      });
  }

  function activateFooterNav() {
    document.querySelectorAll('[data-for-page]').forEach(function (a) {
      a.style.display = a.dataset.forPage === (onImpressum ? 'impressum' : 'home') ? '' : 'none';
    });
  }

  window.__componentsLoaded = Promise.all([
    loadInto('topbar-placeholder', 'topbar.html'),
    loadInto('footer-placeholder', 'footer.html').then(activateFooterNav)
  ]);
})();
