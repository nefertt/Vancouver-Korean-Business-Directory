/**
 * Global i18n provider
 * Usage:
 *   I18N.get(lang, page, key)
 *   I18N.getPage(lang, page) → object of key->text (IDs should match)
 *   I18N.applyPage(lang, page) → updates elements by id with matching keys
 */
(function () {
  const DICT = {
    ko: {
      board: {
        'hero-title': '커뮤니티 게시판',
        'hero-subtitle': '밴쿠버 한인 커뮤니티 소통 공간',
        'tab-all': '전체',
        'tab-notice': '공지사항',
        'tab-review': '업체 후기',
        'tab-job': '구인/구직',
        'tab-community': '자유게시판',
        'write-btn': '글쓰기',
        'col-number': '번호',
        'col-category': '분류',
        'col-title': '제목',
        'col-author': '작성자',
        'col-date': '작성일',
        'col-views': '조회',
        'prev-btn': '이전',
        'next-btn': '다음',
      },
      directory: {
        'search-placeholder': '업체명 · 업종 · 지역 검색',
        'search-button': '검색',
        'filter-category': '카테고리',
        'list-title': '업체 목록',
        'load-more': '더 보기',
        'map-cta': '지도에서 보기',
      },
      index: {
        'hero-title': '밴쿠버 생활, 한 번에 찾는 한인 업체 목록',
        'hero-subtitle': '음식점, 마트, 병원, 부동산, 모든 생활 정보를 한 곳에서.',
        'search-placeholder': '업체명 · 업종 · 지역으로 검색',
        'search-btn': '검색',
        'cta-btn': '내 주변 한인 업체 보기',
        'categories-title': '카테고리별 찾기',
        'featured-title': '추천 업체',
        'map-title': '지도에서 보기',
        'map-description': '지도에서 한인 업체들을 찾아보세요',
        'map-button': '전체 지도 보기',
        'instagram-button': '인스타그램에서 더 보기',
        'ad-label': '광고',
        'ad-title': '밴쿠버 한인 업체 홍보',
        'ad-description': '여기에 여러분의 비즈니스를 홍보해보세요!',
        'ad-button': '광고 문의하기',
        'stats-label': '통계',
        'stat-businesses': '등록된 업체',
        'stat-visitors': '월 방문자',
        'stat-rating': '평균 평점',
      },
      guide: {
        'hero-title': '사용 가이드',
        'hero-subtitle': '밴쿠버 한인 업체 목록을 효과적으로 활용하는 방법을 알아보세요',

        'quick-start-title': '🚀 빠른 시작',
        'search-title': '업체 검색하기',
        'search-desc': '홈페이지의 검색바를 사용하여 원하는 업체를 빠르게 찾아보세요.',
        'search-step1': '업체명, 카테고리, 지역으로 검색 가능',
        'search-step2': '실시간 검색 결과 확인',
        'search-step3': '상세 정보 및 위치 확인',

        'map-title': '지도에서 보기',
        'map-desc': '지도 뷰에서 업체들의 위치를 한눈에 확인하고 경로를 찾아보세요.',
        'map-step1': '인터랙티브 지도에서 업체 위치 확인',
        'map-step2': '카테고리별 필터링',
        'map-step3': '내 위치 기반 검색',

        'submit-title': '업체 등록하기',
        'submit-desc': '새로운 한인 업체를 등록하여 커뮤니티에 기여해보세요.',
        'submit-step1': '간단한 폼 작성으로 등록',
        'submit-step2': '업체 정보 상세 입력',
        'submit-step3': '검토 후 사이트에 반영',

        'features-title': '✨ 주요 기능',
        'search-feature-title': '🔍 검색 기능',
        'search-tips-title': '검색 팁:',
        'search-tip1': '• 업체명의 일부만 입력해도 검색됩니다',
        'search-tip2': '• 카테고리명으로 검색하면 해당 분야 업체들을 찾을 수 있습니다',
        'search-tip3': '• 지역명(예: 리치몬드, 버나비)으로 검색해보세요',

        'filter-title': '🏷️ 필터 기능',
        'filter-tips-title': '필터 팁:',
        'filter-tip1': '• 카테고리 칩을 클릭하여 원하는 업종만 보기',
        'filter-tip2': '• 지역별로 업체를 필터링할 수 있습니다',
        'filter-tip3': '• 정렬 옵션으로 원하는 순서로 정렬하세요',

        'map-feature-title': '🗺️ 지도 기능',
        'map-feature-tips-title': '지도 사용법:',
        'map-feature-tip1': '• 지도를 드래그하여 원하는 지역으로 이동',
        'map-feature-tip2': '• 핀을 클릭하면 업체 정보를 확인할 수 있습니다',
        'map-feature-tip3': '• 내 위치 버튼으로 현재 위치 기준 검색',

        'tips-title': '💡 활용 팁',
        'tip1-title': '추천 업체 활용',
        'tip1-desc': '홈페이지의 추천 업체 섹션에서 검증된 업체들을 확인해보세요.',
        'tip2-title': '다크모드 사용',
        'tip2-desc': '우측 상단의 테마 버튼으로 다크모드를 켜고 끌 수 있습니다.',
        'tip3-title': '언어 전환',
        'tip3-desc': 'KO/EN 버튼으로 한국어와 영어를 자유롭게 전환하세요.',
        'tip4-title': '모바일 최적화',
        'tip4-desc': '모든 기능이 모바일에서도 완벽하게 작동합니다.',

        'faq-title': '❓ 자주 묻는 질문',
        'faq1-q': '업체 정보가 잘못되었어요. 어떻게 수정하나요?',
        'faq1-a': '업체 등록 페이지에서 수정 요청을 제출하거나, 각 업체 상세 페이지의 연락처로 직접 문의해주세요.',
        'faq2-q': '새로운 업체를 등록하려면 어떻게 하나요?',
        'faq2-a': "상단 메뉴의 '업체 등록'을 클릭하여 구글폼을 작성해주세요. 검토 후 사이트에 반영됩니다.",
        'faq3-q': '지도에서 내 위치가 정확하지 않아요.',
        'faq3-a': '브라우저의 위치 권한을 허용해주세요. 정확한 위치를 위해 GPS가 켜져있는지 확인해주세요.',
        'faq4-q': '업체 정보는 얼마나 자주 업데이트되나요?',
        'faq4-a': '구글 시트와 연동되어 있어 실시간으로 업데이트됩니다. 변경사항은 즉시 반영됩니다.',

        'contact-title': '📞 문의하기',
        'contact-subtitle': '궁금한 점이 있으시나요?',
        'contact-desc': '밴쿠버 한인 업체 목록에 대한 문의사항이나 개선 제안이 있으시면 언제든 연락해주세요.',
      },
      about: {
        'hero-title': '소개',
        'hero-subtitle': '밴쿠버 한인 커뮤니티를 위한 종합 업체 정보 플랫폼',
        'mission-title': '미션',
        'mission-desc': '밴쿠버 한인 커뮤니티가 필요로 하는 모든 업체 정보를 한 곳에서 쉽게 찾을 수 있도록 돕습니다.',
        'vision-title': '비전',
        'vision-desc': '밴쿠버 한인들의 일상생활을 더욱 편리하게 만들고, 지역 비즈니스의 성장을 지원합니다.',
        'features-title': '주요 기능',
        'features-list': ['업체 검색 및 필터링', '인터랙티브 지도 뷰', '카테고리별 분류', '실시간 정보 업데이트'],
        'contact-title': '문의하기',
        'contact-desc': '업체 등록, 정보 수정, 또는 기타 문의사항이 있으시면 언제든 연락주세요.',
        'contact-btn': '업체 등록하기',
        'stats-title': '밴쿠버 한인 업체 목록 현황',
        'stat-businesses': '등록된 업체',
        'stat-categories': '업종 카테고리',
        'stat-areas': '서비스 지역',
        'stat-users': '월간 사용자',
      },
      submit: {
        'submit-title': '업체 등록',
        'submit-subtitle': '밴쿠버 한인 커뮤니티에 업체를 등록해보세요!',
        'submit-info-title': '📋 등록 안내',
        'submit-benefits': [
          '✅ <strong>무료 등록</strong> - 비용 없이 업체를 등록할 수 있습니다',
          '✅ <strong>빠른 승인</strong> - 24시간 내에 검토 후 승인됩니다',
          '✅ <strong>실시간 업데이트</strong> - 승인 즉시 웹사이트에 반영됩니다',
          '✅ <strong>지도 연동</strong> - 위치 정보가 지도에 자동으로 표시됩니다',
        ],
        'form-title': '📝 업체 정보 입력',
        'tips-title': '💡 등록 팁',
        'contact-title': '📞 문의사항',
        'contact-desc': '등록 과정에서 문제가 있거나 도움이 필요하시면 언제든 연락주세요!',
      },
    },
    en: {
      board: {
        'hero-title': 'Community Board',
        'hero-subtitle': 'Communication space for Vancouver Korean community',
        'tab-all': 'All',
        'tab-notice': 'Notice',
        'tab-review': 'Reviews',
        'tab-job': 'Jobs',
        'tab-community': 'Community',
        'write-btn': 'Write',
        'col-number': 'No.',
        'col-category': 'Category',
        'col-title': 'Title',
        'col-author': 'Author',
        'col-date': 'Date',
        'col-views': 'Views',
        'prev-btn': 'Prev',
        'next-btn': 'Next',
      },
      directory: {
        'search-placeholder': 'Search by name · category · area',
        'search-button': 'Search',
        'filter-category': 'Category',
        'list-title': 'Business Directory',
        'load-more': 'Load More',
        'map-cta': 'View on Map',
      },
      index: {
        'hero-title': 'Vancouver Korean Business Directory',
        'hero-subtitle': 'Find all Korean businesses in Vancouver in one place',
        'search-placeholder': 'Search by business name, category, or area',
        'search-btn': 'Search',
        'cta-btn': 'Find Korean Businesses Near Me',
        'categories-title': 'Browse by Category',
        'featured-title': 'Featured Businesses',
        'map-title': 'View on Map',
        'map-description': 'Find Korean businesses on the map',
        'map-button': 'View Full Map',
        'instagram-button': 'View More on Instagram',
        'ad-label': 'Ad',
        'ad-title': 'Promote Your Business in Vancouver',
        'ad-description': 'Promote your business here!',
        'ad-button': 'Contact for Ads',
        'stats-label': 'Statistics',
        'stat-businesses': 'Registered Businesses',
        'stat-visitors': 'Monthly Visitors',
        'stat-rating': 'Average Rating',
      },
      guide: {
        'hero-title': 'User Guide',
        'hero-subtitle': 'Learn how to effectively use the Vancouver Korean Business Directory',

        'quick-start-title': '🚀 Quick Start',
        'search-title': 'Search Businesses',
        'search-desc': "Use the search bar on the homepage to quickly find the businesses you're looking for.",
        'search-step1': 'Search by business name, category, or location',
        'search-step2': 'View real-time search results',
        'search-step3': 'Check detailed information and location',

        'map-title': 'View on Map',
        'map-desc': 'See business locations at a glance on the map view and find directions.',
        'map-step1': 'View business locations on interactive map',
        'map-step2': 'Filter by category',
        'map-step3': 'Search based on your location',

        'submit-title': 'Submit Business',
        'submit-desc': 'Contribute to the community by registering new Korean businesses.',
        'submit-step1': 'Simple form registration',
        'submit-step2': 'Enter detailed business information',
        'submit-step3': 'Review and reflect on the site',

        'features-title': '✨ Key Features',
        'search-feature-title': '🔍 Search Function',
        'search-tips-title': 'Search Tips:',
        'search-tip1': '• Search with partial business names',
        'search-tip2': '• Search by category to find businesses in specific fields',
        'search-tip3': '• Search by area names (e.g., Richmond, Burnaby)',

        'filter-title': '🏷️ Filter Function',
        'filter-tips-title': 'Filter Tips:',
        'filter-tip1': '• Click category chips to view specific business types only',
        'filter-tip2': '• Filter businesses by area',
        'filter-tip3': '• Sort by your preferred order using sort options',

        'map-feature-title': '🗺️ Map Function',
        'map-feature-tips-title': 'How to Use Map:',
        'map-feature-tip1': '• Drag the map to move to desired areas',
        'map-feature-tip2': '• Click pins to view business information',
        'map-feature-tip3': "• Use 'My Location' button for location-based search",

        'tips-title': '💡 Usage Tips',
        'tip1-title': 'Use Featured Businesses',
        'tip1-desc': 'Check out verified businesses in the Featured Businesses section on the homepage.',
        'tip2-title': 'Use Dark Mode',
        'tip2-desc': 'Toggle dark mode on and off using the theme button in the top right.',
        'tip3-title': 'Language Switch',
        'tip3-desc': 'Switch between Korean and English freely using the KO/EN button.',
        'tip4-title': 'Mobile Optimized',
        'tip4-desc': 'All features work perfectly on mobile devices.',

        'faq-title': '❓ Frequently Asked Questions',
        'faq1-q': 'The business information is incorrect. How can I fix it?',
        'faq1-a':
          'Submit a correction request through the business registration page or contact the business directly through their contact information on the detail page.',
        'faq2-q': 'How do I register a new business?',
        'faq2-a':
          "Click 'Submit Business' in the top menu and fill out the Google form. It will be reflected on the site after review.",
        'faq3-q': 'My location on the map is not accurate.',
        'faq3-a': 'Please allow location permissions in your browser. Make sure GPS is enabled for accurate location.',
        'faq4-q': 'How often is business information updated?',
        'faq4-a': "It's connected to Google Sheets and updates in real-time. Changes are reflected immediately.",

        'contact-title': '📞 Contact Us',
        'contact-subtitle': 'Have any questions?',
        'contact-desc':
          'If you have any inquiries about the Vancouver Korean Business Directory or suggestions for improvement, please contact us anytime.',
      },
      about: {
        'hero-title': 'About',
        'hero-subtitle': 'Comprehensive business information platform for Vancouver Korean community',
        'mission-title': 'Mission',
        'mission-desc':
          'We help Vancouver Korean community easily find all the business information they need in one place.',
        'vision-title': 'Vision',
        'vision-desc': 'We make daily life more convenient for Vancouver Koreans and support local business growth.',
        'features-title': 'Key Features',
        'features-list': [
          'Business search and filtering',
          'Interactive map view',
          'Category-based classification',
          'Real-time information updates',
        ],
        'contact-title': 'Contact Us',
        'contact-desc': 'For business registration, information updates, or any inquiries, please contact us anytime.',
        'contact-btn': 'Register Business',
        'stats-title': 'Statistics',
        'stat-businesses': 'Registered Businesses',
        'stat-categories': 'Business Categories',
        'stat-areas': 'Service Areas',
        'stat-users': 'Monthly Users',
      },
      submit: {
        'submit-title': 'Business Registration',
        'submit-subtitle': 'Register your business with the Vancouver Korean community!',
        'submit-info-title': '📋 Registration Guide',
        'submit-benefits': [
          '✅ Free Registration - Register your business at no cost',
          '✅ Quick Approval - Reviewed and approved within 24 hours',
          '✅ Real-time Updates - Changes reflected immediately after approval',
          '✅ Map Integration - Location information automatically displayed on the map',
        ],
        'form-title': '📝 Business Information',
        'tips-title': '💡 Registration Tips',
        'contact-title': '📞 Contact',
        'contact-desc': 'If you need any help during registration, please contact us anytime!',
      },
    },
  };

  function get(lang, page, key) {
    return (DICT[lang] && DICT[lang][page] && DICT[lang][page][key]) || '';
  }

  function getPage(lang, page) {
    return (DICT[lang] && DICT[lang][page]) || {};
  }

  function applyPage(lang, page) {
    const texts = getPage(lang, page);
    Object.keys(texts).forEach((key) => {
      const el = document.getElementById(key);
      if (!el) return;
      if (Array.isArray(texts[key])) {
        const listItems = el.querySelectorAll('li');
        listItems.forEach((item, idx) => {
          if (texts[key][idx]) item.innerHTML = texts[key][idx];
        });
      } else {
        // allow HTML in values
        el.innerHTML = texts[key];
      }
    });
  }

  window.I18N = { get, getPage, applyPage };
})();
