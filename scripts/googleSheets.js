/**
 * Google Sheets 데이터 로더 (공통)
 * - 비즈니스 데이터를 한 번만 가져와 캐시합니다.
 * - CSV 파싱 유틸 포함
 */

(function () {
  const SHEET_ID = '1VNJf3ffSD5nHVvH6D75a44qMbU2HWVfRMp7AvTcNThg';
  const SHEET_NAME = 'Sheet1';

  const PERFORMANCE_LIMITS = {
    MAX_BUSINESSES: 1000,
    FEATURED_LIMIT: 6,
    CATEGORY_LIMIT: 20,
    BATCH_SIZE: 100,
  };

  let cachedBusinesses = null;
  let inFlightPromise = null;

  async function getBusinesses() {
    // 캐시된 데이터가 있으면 반환
    if (cachedBusinesses) return cachedBusinesses;

    // 진행 중인 요청이 있으면 공유
    if (inFlightPromise) return inFlightPromise;

    inFlightPromise = (async () => {
      const timestamp = Date.now();
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}&_t=${timestamp}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      const csvText = await response.text();
      if (!csvText || csvText.trim().length === 0) {
        throw new Error('CSV data is empty');
      }
      const businesses = parseCSV(csvText);
      const limited = businesses.slice(0, PERFORMANCE_LIMITS.MAX_BUSINESSES);
      cachedBusinesses = limited;
      inFlightPromise = null;
      return cachedBusinesses;
    })();

    return inFlightPromise;
  }

  function parseCSV(csvText) {
    const lines = csvText.split('\n');
    if (lines.length < 2) throw new Error('CSV data is too short');
    const headers = parseCSVLine(lines[0]);
    const businesses = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = parseCSVLine(lines[i]);
        const business = {};
        headers.forEach((header, index) => {
          business[header] = values[index] || '';
        });
        businesses.push(business);
      }
    }
    return businesses;
  }

  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim().replace(/^"|"$/g, ''));
    return result;
  }

  // 전역 export
  window.getBusinesses = getBusinesses;
  window.PERFORMANCE_LIMITS = PERFORMANCE_LIMITS;
})();
