/**
 * Google Form helpers
 * - Ensures embedded form stays visible
 * - Exposes updateFormUrl() to swap the form URL
 */
(function () {
  function ensureFormVisible() {
    const iframe = document.getElementById('googleForm');
    if (!iframe) return;
    iframe.style.display = 'block';
    iframe.style.visibility = 'visible';
    iframe.style.opacity = '1';
  }

  function startVisibilityGuard() {
    setInterval(function () {
      const iframe = document.getElementById('googleForm');
      if (
        iframe &&
        (iframe.style.display === 'none' || iframe.style.visibility === 'hidden' || iframe.style.opacity === '0')
      ) {
        ensureFormVisible();
      }
    }, 1000);
  }

  function initGoogleForm() {
    ensureFormVisible();
    startVisibilityGuard();

    // Reveal placeholder if iframe fails to load in time
    const iframe = document.getElementById('googleForm');
    const placeholder = document.querySelector('.form-placeholder');
    if (iframe) {
      let loaded = false;
      iframe.addEventListener('load', function () {
        loaded = true;
        if (placeholder) placeholder.style.display = 'none';
      });
      iframe.addEventListener('error', function () {
        if (placeholder) placeholder.style.display = 'block';
      });
      // Timeout fallback (5s)
      setTimeout(function () {
        if (!loaded && placeholder) {
          placeholder.style.display = 'block';
        }
      }, 5000);
    }
  }

  // Public API
  function updateFormUrl() {
    const newUrl = document.getElementById('newFormUrl')?.value;
    const iframe = document.getElementById('googleForm');
    const placeholder = document.querySelector('.form-placeholder');
    if (!iframe || !newUrl) return;
    if (newUrl.includes('docs.google.com/forms')) {
      let embedUrl = newUrl;
      if (!embedUrl.includes('embedded=true')) {
        embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'embedded=true';
      }
      iframe.src = embedUrl;
      ensureFormVisible();
      if (placeholder) placeholder.style.display = 'none';
      alert('구글폼이 성공적으로 업데이트되었습니다!');
    } else {
      alert('올바른 구글폼 URL을 입력해주세요.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoogleForm);
  } else {
    initGoogleForm();
  }

  window.updateFormUrl = updateFormUrl;
})();
