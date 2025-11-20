/**
 * 공통 Footer 로드 함수
 * React 컴포넌트처럼 footer를 재사용 가능하게 만들어줍니다.
 */

// Footer 번역 텍스트
const footerTexts = {
  ko: {
    'footer-title': '밴쿠버 한인 업체 목록',
    'footer-description': '밴쿠버 한인 커뮤니티를 위한 종합 업체 정보 플랫폼',
    'footer-quick-links': '빠른 링크',
    'footer-support': '지원',
    'footer-home': '홈',
    'footer-directory': '업체 목록',
    'footer-map': '지도',
    'footer-board': '게시판',
    'footer-submit': '업체 등록',
    'footer-guide': '사용 가이드',
    'footer-about': '소개',
  },
  en: {
    'footer-title': 'Vancouver Korean Business Directory',
    'footer-description': 'Comprehensive business information platform for Vancouver Korean community',
    'footer-quick-links': 'Quick Links',
    'footer-support': 'Support',
    'footer-home': 'Home',
    'footer-directory': 'Directory',
    'footer-map': 'Map',
    'footer-board': 'Board',
    'footer-submit': 'Submit Business',
    'footer-guide': 'User Guide',
    'footer-about': 'About',
  },
};

/**
 * Footer 번역 함수
 */
function updateFooter(lang) {
  const texts = footerTexts[lang];
  if (!texts) return;

  // Update first section (title and description)
  const firstSection = document.querySelector('.footer-section:first-child');
  if (firstSection) {
    const title = firstSection.querySelector('h4');
    const description = firstSection.querySelector('p');
    if (title) title.textContent = texts['footer-title'];
    if (description) description.textContent = texts['footer-description'];
  }

  // Update second section (Quick Links)
  const secondSection = document.querySelector('.footer-section:nth-child(2)');
  if (secondSection) {
    const title = secondSection.querySelector('h4');
    if (title) title.textContent = texts['footer-quick-links'];
    const links = secondSection.querySelectorAll('ul li a');
    if (links[0]) links[0].textContent = texts['footer-home'];
    if (links[1]) links[1].textContent = texts['footer-directory'];
    if (links[2]) links[2].textContent = texts['footer-map'];
    if (links[3]) links[3].textContent = texts['footer-board'];
    if (links[4]) links[4].textContent = texts['footer-submit'];
  }

  // Update third section (Support)
  const thirdSection = document.querySelector('.footer-section:nth-child(3)');
  if (thirdSection) {
    const title = thirdSection.querySelector('h4');
    if (title) title.textContent = texts['footer-support'];
    const links = thirdSection.querySelectorAll('ul li a');
    if (links[0]) links[0].textContent = texts['footer-guide'];
    if (links[1]) links[1].textContent = texts['footer-about'];
  }
}

/**
 * Footer 로드 함수
 */
async function loadFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) {
    console.warn('Footer placeholder not found');
    return;
  }

  try {
    const response = await fetch('templates/footer.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const footerHTML = await response.text();
    footerPlaceholder.innerHTML = footerHTML;

    // Footer 로드 후 언어 업데이트
    const savedLang = localStorage.getItem('language') || 'ko';
    // 약간의 딜레이를 두어 DOM이 완전히 렌더링된 후 업데이트
    setTimeout(() => updateFooter(savedLang), 50);

    // localStorage 변경 감지로 자동 footer 업데이트
    if (!window.footerLanguageListenerAdded) {
      // 언어 변경 감지를 위한 스토리지 이벤트 리스너
      window.addEventListener('storage', function (e) {
        if (e.key === 'language') {
          updateFooter(e.newValue || 'ko');
        }
      });

      // 같은 페이지 내에서 localStorage 변경 감지 (storage 이벤트는 다른 탭에서만 발생)
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = function (key, value) {
        originalSetItem.apply(this, arguments);
        if (key === 'language') {
          // 약간의 딜레이를 두어 footer가 로드된 후 업데이트
          setTimeout(() => updateFooter(value), 50);
        }
      };

      window.footerLanguageListenerAdded = true;
    }
  } catch (error) {
    console.error('Error loading footer:', error);
    // 에러 발생 시 기본 footer 표시
    footerPlaceholder.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h4>밴쿠버 한인 업체 목록</h4>
              <p>밴쿠버 한인 커뮤니티를 위한 종합 업체 정보 플랫폼</p>
            </div>
            <div class="footer-section">
              <h4>빠른 링크</h4>
              <ul>
                <li><a href="./index.html">홈</a></li>
                <li><a href="./directory.html">업체 목록</a></li>
                <li><a href="./map.html">지도</a></li>
                <li><a href="./board.html">게시판</a></li>
                <li><a href="./submit.html">업체 등록</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>지원</h4>
              <ul>
                <li><a href="./guide.html">사용 가이드</a></li>
                <li><a href="./about.html">소개</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 밴쿠버 한인 업체 목록. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
    // 에러 발생 시에도 언어 설정 적용
    const savedLang = localStorage.getItem('language') || 'ko';
    setTimeout(() => updateFooter(savedLang), 100);
  }
}

// 전역 함수로 export (다른 스크립트에서도 사용 가능)
window.updateFooter = updateFooter;

// DOM 로드 시 footer 로드
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadFooter);
} else {
  loadFooter();
}
