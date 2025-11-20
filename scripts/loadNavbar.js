/**
 * 공통 Navbar 로드 함수
 * React 컴포넌트처럼 navbar를 재사용 가능하게 만들어줍니다.
 */

// Navbar 번역 텍스트
const navbarTexts = {
  ko: ['홈', '업체 목록', '지도', '게시판', '업체 등록', '가이드', '소개'],
  en: ['Home', 'Directory', 'Map', 'Board', 'Submit', 'Guides', 'About'],
};

/**
 * 현재 페이지 이름 가져오기
 */
function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  // index.html 또는 빈 경로면 'index'
  if (filename === 'index.html' || filename === '' || filename === '/') {
    return 'index';
  }

  // 파일명에서 .html 제거
  return filename.replace('.html', '');
}

/**
 * Active 링크 설정
 */
function setActiveLink() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll('.nav-link[data-page]');

  navLinks.forEach((link) => {
    const pageName = link.getAttribute('data-page');
    if (pageName === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Navbar 번역 함수
 */
function updateNavbar(lang) {
  const texts = navbarTexts[lang];
  if (!texts) return;

  const navLinks = document.querySelectorAll('.nav-link[data-page]');

  navLinks.forEach((link, index) => {
    // navIndex는 0-6 (7개의 네비게이션 아이템)
    const navIndex = index % 7;
    if (texts[navIndex]) {
      link.textContent = texts[navIndex];
    }
  });
}

/**
 * Navbar 로드 함수
 */
async function loadNavbar() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (!navbarPlaceholder) {
    console.warn('Navbar placeholder not found');
    return;
  }

  try {
    const response = await fetch('templates/navbar.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const navbarHTML = await response.text();
    navbarPlaceholder.innerHTML = navbarHTML;

    // Active 링크 설정
    setActiveLink();

    // Navbar 로드 후 언어 업데이트 및 각 페이지의 콘텐츠 초기화
    const savedLang = localStorage.getItem('language') || 'ko';
    setTimeout(() => {
      updateNavbar(savedLang);
      updateLanguageIcon(savedLang);

      // i18n 초기 적용 (현재 페이지 기준)
      if (window.I18N && typeof window.I18N.applyPage === 'function') {
        const currentPage = getCurrentPage && getCurrentPage();
        if (currentPage) window.I18N.applyPage(savedLang, currentPage);
      }

      // Theme toggle 설정 (navbar 로드 후)
      if (typeof window.setupThemeToggle === 'function') {
        window.setupThemeToggle();
      }

      // 각 페이지의 콘텐츠도 초기화 (약간의 딜레이로 window.updateContent가 설정될 때까지 대기)
      setTimeout(() => {
        if (typeof window.updateContent === 'function') {
          window.updateContent(savedLang);
        }
        if (typeof window.updateSectionContent === 'function') {
          window.updateSectionContent(savedLang);
        }
        if (typeof window.updateFooter === 'function') {
          window.updateFooter(savedLang);
        }
      }, 100);
    }, 50);

    // localStorage 변경 감지로 자동 navbar 업데이트
    if (!window.navbarLanguageListenerAdded) {
      // 언어 변경 감지를 위한 스토리지 이벤트 리스너
      window.addEventListener('storage', function (e) {
        if (e.key === 'language') {
          updateNavbar(e.newValue || 'ko');
          updateLanguageIcon(e.newValue || 'ko');
        }
      });

      // 같은 페이지 내에서 localStorage 변경 감지
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = function (key, value) {
        originalSetItem.apply(this, arguments);
        if (key === 'language') {
          setTimeout(() => {
            updateNavbar(value);
            updateLanguageIcon(value);
          }, 50);
        }
      };

      window.navbarLanguageListenerAdded = true;
    }

    // 기존 언어 토글 이벤트 리스너와 연동
    setupLanguageToggle();
  } catch (error) {
    console.error('Error loading navbar:', error);
    // 에러 발생 시 기본 navbar 표시
    const currentPage = getCurrentPage();
    navbarPlaceholder.innerHTML = `
      <header class="header">
        <div class="container">
          <div class="header-content">
            <div class="header-top">
              <div class="logo">
                <a href="./index.html">
                  <h1>밴쿠버 한인 업체 목록</h1>
                </a>
              </div>
              <nav class="nav">
                <a href="./index.html" class="nav-link ${currentPage === 'index' ? 'active' : ''}">홈</a>
                <a href="./directory.html" class="nav-link ${currentPage === 'directory' ? 'active' : ''}">업체 목록</a>
                <a href="./map.html" class="nav-link ${currentPage === 'map' ? 'active' : ''}">지도</a>
                <a href="./board.html" class="nav-link ${currentPage === 'board' ? 'active' : ''}">게시판</a>
                <a href="./submit.html" class="nav-link ${currentPage === 'submit' ? 'active' : ''}">업체 등록</a>
                <a href="./guide.html" class="nav-link ${currentPage === 'guide' ? 'active' : ''}">가이드</a>
                <a href="./about.html" class="nav-link ${currentPage === 'about' ? 'active' : ''}">소개</a>
              </nav>
              <div class="header-controls">
                <div class="language-toggle">
                  <button class="lang-btn active" data-lang="ko">KO</button>
                  <button class="lang-btn" data-lang="en">EN</button>
                </div>
                <button class="theme-toggle" id="themeToggle">
                  <span id="themeIcon">🌙</span>
                </button>
              </div>
            </div>
            <nav class="nav mobile-nav">
              <a href="./index.html" class="nav-link ${currentPage === 'index' ? 'active' : ''}">홈</a>
              <a href="./directory.html" class="nav-link ${currentPage === 'directory' ? 'active' : ''}">업체 목록</a>
              <a href="./map.html" class="nav-link ${currentPage === 'map' ? 'active' : ''}">지도</a>
              <a href="./board.html" class="nav-link ${currentPage === 'board' ? 'active' : ''}">게시판</a>
              <a href="./submit.html" class="nav-link ${currentPage === 'submit' ? 'active' : ''}">업체 등록</a>
              <a href="./guide.html" class="nav-link ${currentPage === 'guide' ? 'active' : ''}">가이드</a>
              <a href="./about.html" class="nav-link ${currentPage === 'about' ? 'active' : ''}">소개</a>
            </nav>
          </div>
        </div>
      </header>
    `;

    const savedLang = localStorage.getItem('language') || 'ko';
    setTimeout(() => {
      updateNavbar(savedLang);
      updateLanguageIcon(savedLang);
    }, 100);
  }
}

/**
 * 언어 아이콘 업데이트 함수
 */
function updateLanguageIcon(lang) {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach((btn) => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
}

/**
 * 언어 토글 이벤트 리스너 설정
 */
function setupLanguageToggle() {
  const langToggle = document.querySelector('.language-toggle');
  if (!langToggle) return;

  // 기존 이벤트 리스너 제거 (중복 방지)
  const newLangToggle = langToggle.cloneNode(true);
  langToggle.parentNode.replaceChild(newLangToggle, langToggle);

  // 새 이벤트 리스너 추가
  document.querySelector('.language-toggle').addEventListener('click', function (e) {
    if (e.target.classList.contains('lang-btn')) {
      const newLang = e.target.getAttribute('data-lang');

      // Update active button
      document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');

      // Update localStorage
      localStorage.setItem('language', newLang);

      // Update navbar and footer
      updateNavbar(newLang);
      updateLanguageIcon(newLang);

      // 각 페이지의 업데이트 함수 호출 (순서 중요)
      // 1. 페이지 콘텐츠 업데이트 (약간의 딜레이로 DOM이 준비될 때까지 대기)
      setTimeout(() => {
        if (typeof window.updateContent === 'function') {
          window.updateContent(newLang);
        }
        if (typeof window.updateSectionContent === 'function') {
          window.updateSectionContent(newLang);
        }
        // i18n 적용 (현재 페이지)
        if (window.I18N && typeof window.I18N.applyPage === 'function') {
          const currentPage = getCurrentPage && getCurrentPage();
          if (currentPage) window.I18N.applyPage(newLang, currentPage);
        }
      }, 50);

      // 2. Footer 업데이트
      if (typeof window.updateFooter === 'function') {
        window.updateFooter(newLang);
      }

      // body lang 속성 업데이트
      document.body.setAttribute('lang', newLang);

      // 커스텀 이벤트 발생 (다른 스크립트에서 구독 가능)
      window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: newLang } }));
    }
  });
}

// 전역 함수로 export
window.updateNavbar = updateNavbar;
window.setActiveLink = setActiveLink;

// DOM 로드 시 navbar 로드
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
  loadNavbar();
}
