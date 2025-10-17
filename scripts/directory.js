// Directory Page JavaScript
console.log("🚀 Directory JavaScript loaded!");

document.addEventListener("DOMContentLoaded", function () {
  console.log("📄 DOM Content Loaded!");

  // Business data will be loaded from JSON
  let businessData = [];

  // Filter state
  let currentFilters = {
    search: "",
    category: "all",
    area: "all",
    sort: "latest",
    openOnly: false,
  };

  // DOM elements
  const searchInput = document.getElementById("mainSearch");
  const categoryChips = document.querySelectorAll(".filter-chip");
  const areaFilter = document.getElementById("areaFilter");
  const sortFilter = document.getElementById("sortFilter");
  const openOnlyToggle = document.getElementById("openOnly");
  const businessCardsContainer = document.getElementById("businessCards");
  const resultCount = document.getElementById("resultCount");
  const mapCtaBtn = document.getElementById("mapCtaBtn");

  // Google Sheets 설정
  const SHEET_ID = "1VNJf3ffSD5nHVvH6D75a44qMbU2HWVfRMp7AvTcNThg";
  const SHEET_NAME = "Sheet1";

  // Load data and initialize
  loadBusinessData();

  // Search functionality
  searchInput.addEventListener("input", function () {
    currentFilters.search = this.value.toLowerCase();
    filterAndRender();
  });

  // Category filter chips
  categoryChips.forEach((chip) => {
    chip.addEventListener("click", function () {
      // Remove active class from all chips
      categoryChips.forEach((c) => c.classList.remove("active"));
      // Add active class to clicked chip
      this.classList.add("active");

      currentFilters.category = this.dataset.category;
      filterAndRender();
    });
  });

  // Area filter dropdown
  areaFilter.addEventListener("change", function () {
    currentFilters.area = this.value;
    filterAndRender();
  });

  // Sort filter dropdown
  sortFilter.addEventListener("change", function () {
    currentFilters.sort = this.value;
    filterAndRender();
  });

  // Open only toggle
  openOnlyToggle.addEventListener("change", function () {
    currentFilters.openOnly = this.checked;
    filterAndRender();
  });

  // Sidebar checkbox filters
  const sidebarCheckboxes = document.querySelectorAll(
    ".checkbox-filters input[type='checkbox']"
  );
  sidebarCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      updateFiltersFromSidebar();
      filterAndRender();
    });
  });

  // Map CTA button
  mapCtaBtn.addEventListener("click", function () {
    // In a real application, this would navigate to the map page
    console.log("Navigating to map view...");
    alert("지도 페이지로 이동합니다. 실제로는 map.html로 이동합니다.");
  });

  // Filter and render function
  function filterAndRender() {
    let filteredData = [...businessData];

    // Apply search filter
    if (currentFilters.search) {
      filteredData = filteredData.filter(
        (business) =>
          business.name.toLowerCase().includes(currentFilters.search) ||
          business.nameEn.toLowerCase().includes(currentFilters.search) ||
          business.description.toLowerCase().includes(currentFilters.search)
      );
    }

    // Apply category filter
    if (currentFilters.category !== "all") {
      filteredData = filteredData.filter(
        (business) => business.category === currentFilters.category
      );
    }

    // Apply area filter
    if (currentFilters.area !== "all") {
      filteredData = filteredData.filter(
        (business) => business.area === currentFilters.area
      );
    }

    // Apply open only filter
    if (currentFilters.openOnly) {
      filteredData = filteredData.filter((business) => business.isOpen);
    }

    // Apply sorting
    switch (currentFilters.sort) {
      case "popular":
        filteredData.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "rating":
        filteredData.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "latest":
      default:
        // Keep original order (latest first)
        break;
    }

    renderBusinessCards(filteredData);
    updateResultCount(filteredData.length);
  }

  // Update filters from sidebar checkboxes
  function updateFiltersFromSidebar() {
    const selectedCategories = Array.from(
      document.querySelectorAll(
        ".checkbox-filters input[data-category]:checked"
      )
    ).map((cb) => cb.dataset.category);

    const selectedAreas = Array.from(
      document.querySelectorAll(".checkbox-filters input[data-area]:checked")
    ).map((cb) => cb.dataset.area);

    // Update category filter
    if (selectedCategories.length === 0 || selectedCategories.length === 7) {
      currentFilters.category = "all";
      document
        .querySelector('.filter-chip[data-category="all"]')
        .classList.add("active");
      document
        .querySelectorAll('.filter-chip:not([data-category="all"])')
        .forEach((chip) => {
          chip.classList.remove("active");
        });
    } else if (selectedCategories.length === 1) {
      currentFilters.category = selectedCategories[0];
      document.querySelectorAll(".filter-chip").forEach((chip) => {
        chip.classList.remove("active");
      });
      document
        .querySelector(`.filter-chip[data-category="${selectedCategories[0]}"]`)
        .classList.add("active");
    }

    // Update area filter
    if (selectedAreas.length === 0 || selectedAreas.length === 6) {
      currentFilters.area = "all";
      areaFilter.value = "all";
    } else if (selectedAreas.length === 1) {
      currentFilters.area = selectedAreas[0];
      areaFilter.value = selectedAreas[0];
    }
  }

  // Render business cards
  function renderBusinessCards(businesses) {
    if (businesses.length === 0) {
      businessCardsContainer.innerHTML = `
        <div class="no-results">
          <h3>검색 결과가 없습니다</h3>
          <p>다른 검색어나 필터를 시도해보세요.</p>
        </div>
      `;
      return;
    }

    businessCardsContainer.innerHTML = businesses
      .map(
        (business) => `
      <div class="business-card" data-business-id="${business.id}">
        <div class="business-thumbnail">
          <img src="${business.image}" alt="${business.name}" loading="lazy" />
        </div>
        <div class="business-info">
          <h3 class="business-name">${business.name}</h3>
          <p class="business-name-en">${business.nameEn}</p>
          <p class="business-category">${business.categoryDisplay}</p>
          <div class="business-rating">
            <span class="rating-stars">${"★".repeat(
              Math.floor(business.rating)
            )}${"☆".repeat(5 - Math.floor(business.rating))}</span>
            <span class="rating-text">${business.rating} (${
          business.reviewCount
        } reviews)</span>
          </div>
          <p class="business-address">${business.address}</p>
          <p class="business-phone">${business.phone}</p>
          <div class="business-status ${business.isOpen ? "open" : "closed"}">
            ${business.isOpen ? "영업중" : "영업종료"}
          </div>
        </div>
        <div class="business-actions">
          <button class="action-btn" onclick="viewOnMap(${
            business.id
          })">지도에서 보기</button>
          <button class="action-btn secondary" onclick="viewDetails(${
            business.id
          })">자세히 보기</button>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Update result count
  function updateResultCount(count) {
    resultCount.textContent = count;
  }

  // Business card click handlers
  window.viewOnMap = function (businessId) {
    const business = businessData.find((b) => b.id === businessId);
    console.log("Viewing on map:", business.name);
    alert(
      `${business.name}을(를) 지도에서 보기 기능입니다. 실제로는 지도 페이지로 이동합니다.`
    );
  };

  window.viewDetails = function (businessId) {
    const business = businessData.find((b) => b.id === businessId);
    console.log("Viewing details:", business.name);
    alert(
      `${business.name} 상세 정보 페이지입니다. 실제로는 업체 상세 페이지로 이동합니다.`
    );
  };

  // Load more functionality
  const loadMoreBtn = document.querySelector(".load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      console.log("Loading more businesses...");
      // In a real application, this would load more data from the server
      alert(
        "더 많은 업체를 불러오는 기능입니다. 실제로는 서버에서 추가 데이터를 가져옵니다."
      );
    });
  }

  // Language toggle functionality (inherited from main script)
  const langButtons = document.querySelectorAll(".lang-btn");
  const translations = {
    ko: {
      searchPlaceholder: "업체명 · 업종 · 지역 검색",
      resultCount: "총",
      resultCountSuffix: "개 업체",
      noResults: "검색 결과가 없습니다",
      noResultsDesc: "다른 검색어나 필터를 시도해보세요.",
      loadMore: "더 보기",
      viewOnMap: "지도에서 보기",
      viewDetails: "자세히 보기",
      openStatus: "영업중",
      closedStatus: "영업종료",
    },
    en: {
      searchPlaceholder: "Search by business name · category · area",
      resultCount: "Total",
      resultCountSuffix: "businesses",
      noResults: "No results found",
      noResultsDesc: "Try different search terms or filters.",
      loadMore: "Load More",
      viewOnMap: "View on Map",
      viewDetails: "View Details",
      openStatus: "Open",
      closedStatus: "Closed",
    },
  };

  langButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const lang = this.dataset.lang;

      // Update active state
      langButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Update content
      updateContent(lang);
    });
  });

  function updateContent(lang) {
    const content = translations[lang];

    // Update search placeholder
    searchInput.placeholder = content.searchPlaceholder;

    // Update result count text
    const resultCountText = document.querySelector(".result-count");
    resultCountText.innerHTML = `${content.resultCount} <span id="resultCount">${resultCount.textContent}</span>${content.resultCountSuffix}`;

    // Update load more button
    const loadMoreBtn = document.querySelector(".load-more-btn");
    if (loadMoreBtn) {
      loadMoreBtn.textContent = content.loadMore;
    }

    // Update map CTA button
    mapCtaBtn.innerHTML = `<span class="map-icon">📍</span><span>${content.viewOnMap}</span>`;
  }

  // Initialize with Korean content
  updateContent("ko");

  // Add smooth scrolling for better UX
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading states for better UX
  function showLoading() {
    businessCardsContainer.classList.add("loading");
  }

  function hideLoading() {
    businessCardsContainer.classList.remove("loading");
  }

  // Simulate loading delay for better UX
  function filterAndRenderWithLoading() {
    showLoading();
    setTimeout(() => {
      filterAndRender();
      hideLoading();
    }, 300);
  }

  // Update event listeners to use loading
  searchInput.addEventListener(
    "input",
    debounce(filterAndRenderWithLoading, 300)
  );
  areaFilter.addEventListener("change", filterAndRenderWithLoading);
  sortFilter.addEventListener("change", filterAndRenderWithLoading);
  openOnlyToggle.addEventListener("change", filterAndRenderWithLoading);

  // Load business data from Google Sheets
  async function loadBusinessData() {
    try {
      console.log("🔄 Loading data from Google Sheets...");
      console.log("📊 Sheet ID:", SHEET_ID);
      console.log("📋 Sheet Name:", SHEET_NAME);

      // Google Sheets CSV API 사용
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`
      );

      console.log("📡 Response status:", response.status);
      console.log("📡 Response ok:", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvText = await response.text();
      console.log(
        "📄 CSV data received (first 200 chars):",
        csvText.substring(0, 200) + "..."
      );

      const businesses = parseCSV(csvText);
      console.log("✅ Parsed businesses:", businesses);
      console.log("📊 Number of businesses:", businesses.length);

      businessData = businesses;

      // Initialize after data is loaded
      renderBusinessCards(businessData);
      updateResultCount(businessData.length);
      updateContent("ko");

      console.log("🎉 Google Sheets data loaded successfully!");
    } catch (error) {
      console.error("❌ Error loading data from Google Sheets:", error);

      // Fallback to local JSON
      try {
        console.log("🔄 Falling back to local JSON...");
        const fallbackResponse = await fetch("data/businesses.json");
        const fallbackData = await fallbackResponse.json();
        businessData = fallbackData.businesses;
        renderBusinessCards(businessData);
        updateResultCount(businessData.length);
        updateContent("ko");
        console.log("✅ Fallback to JSON successful");
      } catch (fallbackError) {
        console.error("❌ Error loading fallback data:", fallbackError);
        businessData = [];
        renderBusinessCards([]);
        updateResultCount(0);
      }
    }
  }

  // CSV 파싱 함수
  function parseCSV(csvText) {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
    const rows = lines.slice(1).filter((line) => line.trim());

    return rows.map((row) => {
      const values = row.split(",").map((v) => v.trim().replace(/"/g, ""));
      const business = {};

      headers.forEach((header, index) => {
        let value = values[index];

        // 데이터 타입 변환
        if (header === "id" || header === "reviewCount") {
          value = parseInt(value) || 0;
        } else if (header === "rating") {
          value = parseFloat(value) || 0;
        } else if (header === "isOpen") {
          value = value === "TRUE" || value === true;
        } else if (header === "latitude" || header === "longitude") {
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

  // Debounce function for search input
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
});
