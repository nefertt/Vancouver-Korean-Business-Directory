// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
  const langButtons = document.querySelectorAll('.lang-btn');
  const currentLang = 'ko'; // Default language

  // Language content object
  const translations = {
    ko: {
      heroTitle: '밴쿠버 생활, 한 번에 찾는 한인 업체 목록',
      heroSubtitle: '음식점, 마트, 병원, 부동산, 모든 생활 정보를 한 곳에서.',
      searchPlaceholder: '업체명 · 업종 · 지역으로 검색',
      ctaButton: '내 주변 한인 업체 보기',
      categoriesTitle: '카테고리별 찾기',
      featuredTitle: '추천 업체',
      mapTitle: '지도에서 보기',
      mapButton: '지도에서 보기',
    },
    en: {
      heroTitle: 'Vancouver Life, Find Korean Businesses in One Place',
      heroSubtitle: 'Restaurants, markets, hospitals, real estate - all your life information in one place.',
      searchPlaceholder: 'Search by business name · category · area',
      ctaButton: 'Find Korean Businesses Near Me',
      categoriesTitle: 'Browse by Category',
      featuredTitle: 'Featured Businesses',
      mapTitle: 'View on Map',
      mapButton: 'View on Map',
    },
  };

  // Update content based on language
  function updateContent(lang) {
    const content = translations[lang];

    // Update hero section
    document.querySelector('.hero-title').textContent = content.heroTitle;
    document.querySelector('.hero-subtitle').textContent = content.heroSubtitle;
    document.querySelector('.search-input').placeholder = content.searchPlaceholder;
    document.querySelector('.cta-btn').textContent = content.ctaButton;

    // Update section titles
    document.querySelectorAll('.section-title').forEach((title, index) => {
      if (index === 0) title.textContent = content.categoriesTitle;
      if (index === 1) title.textContent = content.featuredTitle;
      if (index === 2) title.textContent = content.mapTitle;
    });

    // Update map button
    document.querySelector('.map-btn').textContent = content.mapButton;
  }

  // Language toggle event listeners
  langButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const lang = this.dataset.lang;

      // Update active state
      langButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');

      // Update content
      updateContent(lang);
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      // In a real application, this would trigger a search
      console.log('Searching for:', query);
      alert(`검색어: "${query}" - 실제 검색 기능은 백엔드와 연동됩니다.`);
    }
  }

  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // CTA button functionality
  const ctaBtn = document.querySelector('.cta-btn');
  ctaBtn.addEventListener('click', function () {
    // In a real application, this would use geolocation
    console.log('Finding nearby Korean businesses...');
    alert('내 주변 한인 업체를 찾는 기능입니다. 실제로는 위치 기반 검색이 실행됩니다.');
  });

  // Category card interactions
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach((card) => {
    card.addEventListener('click', function () {
      const category = this.querySelector('h4').textContent;
      console.log('Category selected:', category);
      alert(`${category} 카테고리를 선택했습니다. 실제로는 해당 카테고리 페이지로 이동합니다.`);
    });
  });

  // Business card interactions (only for static cards, not featured cards)
  // Note: Featured cards are handled by inline script in index.html
  // This will only affect static business cards, not dynamically loaded ones
  setTimeout(() => {
    const businessCards = document.querySelectorAll('.business-card:not(.featured-card)');
    businessCards.forEach((card) => {
      card.addEventListener('click', function () {
        const businessName = this.querySelector('h4').textContent;
        console.log('Business selected:', businessName);
        alert(`${businessName} 업체를 선택했습니다. 실제로는 업체 상세 페이지로 이동합니다.`);
      });
    });
  }, 1000); // Wait 1 second for dynamic content to load

  // Map button functionality
  const mapBtn = document.querySelector('.map-btn');
  mapBtn.addEventListener('click', function () {
    console.log('Opening map view...');
    alert('지도 보기 기능입니다. 실제로는 Google Maps가 열립니다.');
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    });
  });

  // Add scroll effect to header
  let lastScrollTop = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });

  // Add loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.addEventListener('load', function () {
      this.style.opacity = '1';
    });

    // Set initial opacity to 0 for loading effect
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });

  // Initialize with Korean content
  updateContent('ko');
});
