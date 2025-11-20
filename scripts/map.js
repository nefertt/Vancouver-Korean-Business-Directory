// Map Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Business data will be loaded from JSON
  let businessData = [];

  // Map and UI state
  let map;
  let markers = [];
  let currentFilters = {
    search: '',
    category: 'all',
  };
  let selectedBusinessId = null;

  // DOM elements
  const searchInput = document.getElementById('mapSearch');
  const categoryChips = document.querySelectorAll('.filter-chip');
  const myLocationBtn = document.getElementById('myLocationBtn');
  const listToggleBtn = document.getElementById('listToggleBtn');
  const desktopListPanel = document.getElementById('desktopListPanel');
  const mobileBottomSheet = document.getElementById('mobileBottomSheet');
  const desktopListContent = document.getElementById('desktopListContent');
  const mobileListContent = document.getElementById('mobileListContent');
  const mapResultCount = document.getElementById('mapResultCount');
  const mobileResultCount = document.getElementById('mobileResultCount');

  // Google Sheets 설정
  const SHEET_ID = '1VNJf3ffSD5nHVvH6D75a44qMbU2HWVfRMp7AvTcNThg';
  const SHEET_NAME = 'Sheet1';

  // Initialize map
  function initMap() {
    // Vancouver center coordinates
    const vancouverCenter = [49.2827, -123.1207];

    // Initialize Leaflet map
    map = L.map('map').setView(vancouverCenter, 11);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers for all businesses
    addBusinessMarkers(businessData);

    // Update result count
    updateResultCount(businessData.length);
  }

  // Add business markers to map
  function addBusinessMarkers(businesses) {
    // Clear existing markers
    markers.forEach((marker) => map.removeLayer(marker));
    markers = [];

    businesses.forEach((business) => {
      // Create custom marker
      const markerElement = document.createElement('div');
      markerElement.className = `custom-marker ${business.category}`;
      markerElement.innerHTML = getCategoryIcon(business.category);

      // Create Leaflet marker
      const marker = L.marker(business.coordinates, {
        icon: L.divIcon({
          html: markerElement.outerHTML,
          className: 'custom-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
      });

      // Add popup
      const popupContent = createPopupContent(business);
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup',
      });

      // Add click event
      marker.on('click', function () {
        selectBusiness(business.id);
        highlightBusinessInList(business.id);
      });

      // Add to map
      marker.addTo(map);
      markers.push(marker);
    });
  }

  // Get category icon for marker
  function getCategoryIcon(category) {
    const icons = {
      restaurant: '🍜',
      grocery: '🛒',
      medical: '🏥',
      legal: '⚖️',
      realestate: '🏠',
      beauty: '💇',
      education: '🎓',
    };
    return icons[category] || '📍';
  }

  // Create popup content
  function createPopupContent(business) {
    const stars = '★'.repeat(Math.floor(business.rating)) + '☆'.repeat(5 - Math.floor(business.rating));
    const statusClass = business.isOpen ? 'open' : 'closed';
    const statusText = business.isOpen ? '영업중' : '영업종료';

    return `
      <div class="map-popup">
        <div class="popup-image">
          <img src="${business.image}" alt="${business.name}" class="popup-img" />
        </div>
        <div class="popup-content">
          <h4 class="popup-name">${business.name}</h4>
          <p class="popup-name-en">${business.nameEn}</p>
          <p class="popup-category">${business.categoryDisplay}</p>
          <div class="popup-rating">
            <span class="popup-stars">${stars}</span>
            <span class="popup-rating-text">${business.rating} (${business.reviewCount} reviews)</span>
          </div>
          <p class="popup-address">${business.address}</p>
          <div class="popup-status ${statusClass}">${statusText}</div>
          <button class="popup-btn" onclick="viewBusinessDetails(${business.id})">자세히 보기</button>
        </div>
      </div>
    `;
  }

  // Filter and render businesses
  function filterAndRender() {
    let filteredData = [...businessData];

    // Apply search filter
    if (currentFilters.search) {
      filteredData = filteredData.filter(
        (business) =>
          business.name.toLowerCase().includes(currentFilters.search) ||
          business.nameEn.toLowerCase().includes(currentFilters.search) ||
          business.description.toLowerCase().includes(currentFilters.search),
      );
    }

    // Apply category filter
    if (currentFilters.category !== 'all') {
      filteredData = filteredData.filter((business) => business.category === currentFilters.category);
    }

    // Update map markers
    addBusinessMarkers(filteredData);

    // Update list panels
    renderListPanels(filteredData);

    // Update result count
    updateResultCount(filteredData.length);

    // Fit map to show all visible markers
    if (filteredData.length > 0) {
      const group = new L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }

  // Render list panels
  function renderListPanels(businesses) {
    const listHTML = businesses
      .map(
        (business) => `
        <div class="list-item" data-business-id="${business.id}" onclick="selectBusinessFromList(${business.id})">
          <div class="list-item-thumbnail">
            <img src="${business.image}" alt="${business.name}" loading="lazy" />
          </div>
          <div class="list-item-info">
            <h4 class="list-item-name">${business.name}</h4>
            <p class="list-item-category">${business.categoryDisplay}</p>
            <p class="list-item-address">${business.address}</p>
            <div class="list-item-rating">
              <span class="list-item-stars">${'★'.repeat(
                Math.floor(business.rating),
              )}${'☆'.repeat(5 - Math.floor(business.rating))}</span>
              <span class="list-item-rating-text">${business.rating}</span>
            </div>
          </div>
        </div>
      `,
      )
      .join('');

    desktopListContent.innerHTML = listHTML;
    mobileListContent.innerHTML = listHTML;
  }

  // Select business from map
  function selectBusiness(businessId) {
    selectedBusinessId = businessId;
    const business = businessData.find((b) => b.id === businessId);

    // Center map on business
    map.setView(business.coordinates, 15);

    // Highlight in list
    highlightBusinessInList(businessId);
  }

  // Select business from list
  window.selectBusinessFromList = function (businessId) {
    selectBusiness(businessId);

    // Open popup on map
    const marker = markers.find((m) => {
      const business = businessData.find((b) => b.id === businessId);
      return m.getLatLng().lat === business.coordinates[0] && m.getLatLng().lng === business.coordinates[1];
    });

    if (marker) {
      marker.openPopup();
    }
  };

  // Highlight business in list
  function highlightBusinessInList(businessId) {
    // Remove active class from all items
    document.querySelectorAll('.list-item').forEach((item) => {
      item.classList.remove('active');
    });

    // Add active class to selected item
    const selectedItem = document.querySelector(`[data-business-id="${businessId}"]`);
    if (selectedItem) {
      selectedItem.classList.add('active');
    }
  }

  // Update result count
  function updateResultCount(count) {
    mapResultCount.textContent = count;
    mobileResultCount.textContent = count;
  }

  // Search functionality
  searchInput.addEventListener('input', function () {
    currentFilters.search = this.value.toLowerCase();
    filterAndRender();
  });

  // Category filter chips
  categoryChips.forEach((chip) => {
    chip.addEventListener('click', function () {
      // Remove active class from all chips
      categoryChips.forEach((c) => c.classList.remove('active'));
      // Add active class to clicked chip
      this.classList.add('active');

      currentFilters.category = this.dataset.category;
      filterAndRender();
    });
  });

  // My location button
  myLocationBtn.addEventListener('click', function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          map.setView([userLat, userLng], 15);

          // Add user location marker
          L.marker([userLat, userLng], {
            icon: L.divIcon({
              html: '<div style="background: #ff6b6b; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
              className: 'user-location-marker',
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            }),
          }).addTo(map);
        },
        function (error) {
          console.error('Error getting location:', error);
          alert('위치 정보를 가져올 수 없습니다. 브라우저 설정을 확인해주세요.');
        },
      );
    } else {
      alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
    }
  });

  // List toggle button
  listToggleBtn.addEventListener('click', function () {
    if (window.innerWidth > 1024) {
      // Desktop: toggle sidebar
      desktopListPanel.classList.toggle('visible');
      this.textContent = desktopListPanel.classList.contains('visible') ? '지도만 보기' : '리스트 보기';
    } else {
      // Mobile: toggle bottom sheet
      mobileBottomSheet.classList.toggle('visible');
      this.textContent = mobileBottomSheet.classList.contains('visible') ? '지도만 보기' : '리스트 보기';
    }
  });

  // Mobile bottom sheet drag functionality
  let isDragging = false;
  let startY = 0;
  let currentY = 0;
  let initialTransform = 0;

  const sheetHandle = document.querySelector('.sheet-handle');
  if (sheetHandle) {
    sheetHandle.addEventListener('touchstart', function (e) {
      isDragging = true;
      startY = e.touches[0].clientY;
      initialTransform = mobileBottomSheet.style.transform;
    });

    document.addEventListener('touchmove', function (e) {
      if (!isDragging) return;

      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      const newTransform = Math.max(0, Math.min(100, deltaY));

      mobileBottomSheet.style.transform = `translateY(calc(100% - 60px + ${newTransform}px))`;
    });

    document.addEventListener('touchend', function () {
      if (!isDragging) return;

      isDragging = false;
      const deltaY = currentY - startY;

      if (deltaY > 50) {
        // Drag down - close sheet
        mobileBottomSheet.classList.remove('visible');
        listToggleBtn.textContent = '리스트 보기';
      } else {
        // Snap back to open position
        mobileBottomSheet.style.transform = 'translateY(0)';
      }
    });
  }

  // Business details function
  window.viewBusinessDetails = function (businessId) {
    const business = businessData.find((b) => b.id === businessId);
    console.log('Viewing business details:', business.name);
    alert(`${business.name} 상세 정보 페이지입니다. 실제로는 업체 상세 페이지로 이동합니다.`);
  };

  // Language toggle functionality
  const langButtons = document.querySelectorAll('.lang-btn');
  const translations = {
    ko: {
      searchPlaceholder: '업체명 · 업종 · 지역 검색',
      myLocation: '내 위치로 이동',
      listView: '리스트 보기',
      mapOnly: '지도만 보기',
      resultCount: '총',
      resultCountSuffix: '개',
      businessList: '업체 목록',
      viewDetails: '자세히 보기',
      openStatus: '영업중',
      closedStatus: '영업종료',
    },
    en: {
      searchPlaceholder: 'Search by business name · category · area',
      myLocation: 'Go to My Location',
      listView: 'List View',
      mapOnly: 'Map Only',
      resultCount: 'Total',
      resultCountSuffix: 'businesses',
      businessList: 'Business List',
      viewDetails: 'View Details',
      openStatus: 'Open',
      closedStatus: 'Closed',
    },
  };

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

  function updateContent(lang) {
    const content = translations[lang];

    // Update search placeholder
    searchInput.placeholder = content.searchPlaceholder;

    // Update button texts
    myLocationBtn.innerHTML = `<span class="btn-icon">📍</span>${content.myLocation}`;

    const isListVisible =
      desktopListPanel.classList.contains('visible') || mobileBottomSheet.classList.contains('visible');
    listToggleBtn.innerHTML = `<span class="btn-icon">📋</span>${isListVisible ? content.mapOnly : content.listView}`;

    // Update result count text
    const resultCountElements = document.querySelectorAll('.result-count');
    resultCountElements.forEach((element) => {
      const count = element.querySelector('span').textContent;
      element.innerHTML = `${content.resultCount} <span>${count}</span>${content.resultCountSuffix}`;
    });

    // Update list headers
    const listHeaders = document.querySelectorAll('.list-header h3, .sheet-header h3');
    listHeaders.forEach((header) => {
      header.textContent = content.businessList;
    });
  }

  // Load business data from Google Sheets
  async function loadBusinessData() {
    try {
      // Google Sheets CSV API 사용
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`,
      );
      const csvText = await response.text();
      const businesses = parseCSV(csvText);

      businessData = businesses;

      // Initialize after data is loaded
      initMap();
      renderListPanels(businessData);
      updateContent('ko');
    } catch (error) {
      console.error('Error loading data from Google Sheets:', error);

      // Fallback to local JSON
      try {
        const fallbackResponse = await fetch('data/businesses.json');
        const fallbackData = await fallbackResponse.json();
        businessData = fallbackData.businesses;
        initMap();
        renderListPanels(businessData);
        updateContent('ko');
      } catch (fallbackError) {
        console.error('Error loading fallback data:', fallbackError);
        businessData = [];
        initMap();
        renderListPanels([]);
      }
    }
  }

  // CSV 파싱 함수
  function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''));
    const rows = lines.slice(1).filter((line) => line.trim());

    return rows.map((row) => {
      const values = row.split(',').map((v) => v.trim().replace(/"/g, ''));
      const business = {};

      headers.forEach((header, index) => {
        let value = values[index];

        // 데이터 타입 변환
        if (header === 'id' || header === 'reviewCount') {
          value = parseInt(value) || 0;
        } else if (header === 'rating') {
          value = parseFloat(value) || 0;
        } else if (header === 'isOpen') {
          value = value === 'TRUE' || value === true;
        } else if (header === 'latitude' || header === 'longitude') {
          value = parseFloat(value) || 0;
        }

        business[header] = value;
      });

      // coordinates 배열 생성
      if (business.latitude && business.longitude) {
        business.coordinates = [business.latitude, business.longitude];
      }

      return business;
    });
  }

  // Initialize with Korean content
  updateContent('ko');

  // Handle window resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) {
      mobileBottomSheet.classList.remove('visible');
    } else {
      desktopListPanel.classList.remove('visible');
    }
  });

  // Add loading states
  function showLoading() {
    document.querySelector('.map-container').classList.add('loading');
  }

  function hideLoading() {
    document.querySelector('.map-container').classList.remove('loading');
  }

  // Debounce function for search
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Update search to use debouncing
  searchInput.addEventListener(
    'input',
    debounce(function () {
      currentFilters.search = this.value.toLowerCase();
      showLoading();
      setTimeout(() => {
        filterAndRender();
        hideLoading();
      }, 300);
    }, 300),
  );
});
