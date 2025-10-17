# 밴쿠버 한인 비즈니스 리스트 (Vancouver Korean Business Directory)

밴쿠버 한인 커뮤니티를 위한 비즈니스 디렉토리 웹사이트입니다.

## 🌟 주요 기능

- **홈페이지**: 한인업체 소개 및 카테고리별 탐색
- **디렉토리**: 업체 목록 보기, 검색, 필터링
- **지도**: 인터랙티브 지도에서 업체 위치 확인
- **반응형 디자인**: 데스크톱과 모바일 최적화
- **다국어 지원**: 한국어/영어 전환

## 🚀 배포

이 프로젝트는 GitHub Pages를 통해 배포됩니다.

**🌐 라이브 사이트**: [https://nefertt.github.io/Vancouver-Korean-Business-Directory](https://nefertt.github.io/Vancouver-Korean-Business-Directory)

### GitHub Pages 설정

1. **리포지토리 설정**:

   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

2. **자동 배포**: main 브랜치에 푸시하면 자동으로 배포됩니다.

### 로컬에서 실행하기

1. 저장소 클론

```bash
git clone https://github.com/yourusername/vancouver-korean-business-directory.git
cd vancouver-korean-business-directory
```

2. 로컬 서버 실행

- VS Code에서 **Live Server** 확장 설치
- `index.html` 파일에서 우클릭 → **Open with Live Server**
- 자동으로 `http://localhost:5500`에서 실행

3. 브라우저에서 접속하여 확인

## 📁 프로젝트 구조

```
vancouver-korean-business-directory/
├── index.html              # 홈페이지
├── directory.html          # 디렉토리 페이지
├── map.html               # 지도 페이지
├── data/
│   ├── businesses.json    # 업체 데이터
│   └── categories.json    # 카테고리 데이터
├── assets/
│   ├── css/              # 스타일시트
│   ├── js/               # JavaScript 파일
│   └── images/           # 이미지 파일
└── README.md
```

## 🛠 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 반응형 디자인, Flexbox, Grid
- **JavaScript (ES6+)**: 모던 JavaScript 기능
- **Leaflet.js**: 오픈소스 지도 라이브러리
- **GitHub Pages**: 정적 사이트 호스팅

## 📱 반응형 디자인

- **데스크톱** (1024px+): 사이드바 + 메인 콘텐츠
- **태블릿** (768px-1023px): 단일 컬럼 레이아웃
- **모바일** (767px 이하): 모바일 최적화 UI

## 🗺 지도 기능

- **OpenStreetMap** 타일 사용
- **커스텀 마커**: 카테고리별 색상 구분
- **팝업 카드**: 업체 정보 표시
- **지역 필터링**: 지역별 업체 표시

## 🔍 검색 및 필터링

- **실시간 검색**: 업체명, 업종, 지역으로 검색
- **카테고리 필터**: 음식점, 마트, 병원 등
- **지역 필터**: 다운타운, 버나비, 코퀴틀람 등
- **정렬 옵션**: 최신순, 인기순, 평점순, 가나다순

## 🌐 다국어 지원

- **한국어**: 기본 언어
- **영어**: 완전 번역 지원
- **동적 전환**: 페이지 새로고침 없이 언어 변경

## 📊 데이터 관리

업체 데이터는 `data/businesses.json` 파일에서 관리됩니다.

### 데이터 구조

```json
{
  "businesses": [
    {
      "id": 1,
      "name": "업체명",
      "nameEn": "English Name",
      "category": "restaurant",
      "categoryDisplay": "🍜 음식점",
      "rating": 4.5,
      "reviewCount": 120,
      "address": "주소",
      "phone": "전화번호",
      "image": "이미지 URL",
      "area": "burnaby",
      "isOpen": true,
      "description": "설명",
      "coordinates": [49.2296, -123.0042]
    }
  ]
}
```

## 🎨 디자인 시스템

### 색상

- **Primary**: #1E4DA1 (네이비 블루)
- **Accent**: #2EC4B6 (민트 그린)
- **Background**: #FFFFFF (화이트)
- **Text**: #333333 (다크 그레이)

### 타이포그래피

- **Headings**: Montserrat (Bold)
- **Body**: Noto Sans KR (Regular)

## 🚀 배포 방법

1. GitHub 저장소 생성
2. 코드 푸시
3. Settings > Pages에서 GitHub Pages 활성화
4. Source를 "Deploy from a branch" 선택
5. Branch를 "main" 선택
6. Save 클릭

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 연락처

프로젝트 링크: [https://github.com/yourusername/vancouver-korean-business-directory](https://github.com/yourusername/vancouver-korean-business-directory)

## 🙏 감사의 말

- [Leaflet.js](https://leafletjs.com/) - 오픈소스 지도 라이브러리
- [OpenStreetMap](https://www.openstreetmap.org/) - 무료 지도 데이터
- [Unsplash](https://unsplash.com/) - 무료 이미지
