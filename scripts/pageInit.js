/**
 * Common page initializer
 * - Applies saved language to body
 * - Syncs language toggle icon
 * - Applies i18n for current page
 * - Updates footer
 */
(function () {
  function safeGetCurrentPage() {
    if (typeof window.getCurrentPage === 'function') return window.getCurrentPage();
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    if (filename === 'index.html' || filename === '' || filename === '/') return 'index';
    return filename.replace('.html', '');
  }

  function init() {
    const savedLang = localStorage.getItem('language') || 'ko';
    document.body.setAttribute('lang', savedLang);

    // Defer until navbar/footer likely injected
    setTimeout(() => {
      if (typeof window.updateLanguageIcon === 'function') {
        window.updateLanguageIcon(savedLang);
      }
      const page = safeGetCurrentPage();
      if (window.I18N && typeof window.I18N.applyPage === 'function' && page) {
        window.I18N.applyPage(savedLang, page);
      }
      if (typeof window.updateFooter === 'function') {
        window.updateFooter(savedLang);
      }
    }, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
