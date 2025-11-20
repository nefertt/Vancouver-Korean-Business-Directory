/**
 * 공통 Theme (다크모드) 관리 함수
 * 모든 페이지에서 일관된 다크모드 토글을 제공합니다.
 */

/**
 * Theme 아이콘 업데이트 함수
 */
function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/**
 * Theme 초기화 함수
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

/**
 * Theme 토글 이벤트 리스너 설정
 */
function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) {
    // themeToggle이 아직 로드되지 않았다면 다시 시도
    setTimeout(setupThemeToggle, 100);
    return;
  }

  // 기존 이벤트 리스너 제거 (중복 방지)
  const newThemeToggle = themeToggle.cloneNode(true);
  themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);

  // 새 이벤트 리스너 추가
  document.getElementById('themeToggle').addEventListener('click', function () {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

// 전역 함수로 export
window.updateThemeIcon = updateThemeIcon;
window.initTheme = initTheme;
window.setupThemeToggle = setupThemeToggle;

// DOM 로드 시 theme 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    // navbar 로드 후 theme toggle 설정
    setTimeout(setupThemeToggle, 150);
  });
} else {
  initTheme();
  setTimeout(setupThemeToggle, 150);
}
