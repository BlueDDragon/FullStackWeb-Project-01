# 📚 DummyBooks

> 알라딘 Open API를 활용한 온라인 서점 웹 애플리케이션

---

## 📌 프로젝트 개요
 
DummyBooks는 알라딘 Open API를 연동한 온라인 서점 웹 애플리케이션입니다.  
도서 검색, 상세 조회, 장바구니, 주문, 보관함(찜하기) 기능과 회원 로그인 시스템을 포함한 풀스택 웹 서비스입니다.

---

## 🗂️ 목차
 
- [기술 스택](#-기술-스택)
- [주요 기능](#-주요-기능)
- [디렉토리 구조](#-디렉토리-구조)
- [페이지 구성](#-페이지-구성)
- [아키텍처 설명](#-아키텍처-설명)
- [페이지 흐름](#-페이지-흐름)
- [컴포넌트 구조](#-컴포넌트-구조)
- [버전 히스토리](#-버전-히스토리)
- [시작하기](#-시작하기)
- [참고 자료](#-참고-자료)

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|---|---|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | CSS Modules |
| **API** | 알라딘 Open API |
| **상태 관리** | React Context API |
| **데이터 저장** | localStorage |

---

## ✨ 주요 기능

| 기능 | 설명 |
|---|---|
| 🏠 **홈** | 주목할 만한 신간, 전체 신간, 베스트셀러, 블로거 추천 도서 목록 표시 |
| 🔍 **검색** | 도서 검색 및 실시간 드롭다운 미리보기, 리스트/카드 뷰 전환 |
| 📖 **상세 페이지** | 도서 상세 정보(가격, 평점, 설명), 수량 선택, 알라딘 바로가기 |
| 🛒 **장바구니** | 도서 담기, 수량 변경, 삭제, 총 결제 금액 계산 |
| 📦 **주문 조회** | 주문 내역 확인, 주문번호 및 배송 상태 표시 |
| 💙 **보관함** | 찜한 도서 목록 관리, 장바구니 담기 및 바로구매 |
| 👤 **회원 시스템** | 회원가입, 로그인/로그아웃, 마이페이지 |

---

## 📁 디렉토리 구조

```
dummy-books/src/
├── app/                        # Next.js App Router 페이지
│   ├── api/                    # API Routes
│   │   ├── search/route.ts     # 도서 검색 API
│   │   └── detail/route.ts     # 도서 상세 API
│   ├── detail/[id]/            # 도서 상세 페이지
│   ├── search/                 # 검색 결과 페이지
│   ├── login/                  # 로그인 페이지
│   ├── register/               # 회원가입 페이지
│   ├── mypage/[id]/            # 마이페이지
│   │   ├── cart/               # 장바구니
│   │   ├── order/              # 주문 조회
│   │   └── wish/               # 보관함
│   └── page.tsx                # 홈 페이지
├── components/                 # 재사용 컴포넌트
│   ├── Auth/                   # 로그인/회원가입
│   ├── Common/                 # 공통 UI
│   ├── Confirm/                # 확인 팝업
│   ├── Detail/                 # 도서 상세
│   ├── Home/                   # 홈 화면
│   ├── Layout/                 # 헤더/푸터
│   │   ├── SearchBar/          # 검색바
│   ├── MyPage/                 # 마이페이지
│   │   ├── Cart/               # 장바구니
│   │   ├── Order/              # 주문 조회
│   │   └── Wish/               # 보관함
│   └── Search/                 # 검색 결과
├── context/                    # React Context
├── hooks/                      # Custom Hooks
├── mocks/                      # Mock 데이터 (JSON)
├── types/                      # TypeScript 타입 정의
└── utils/                      # 유틸리티 함수
    ├── api/                    # API 호출 함수
    ├── services/               # 비즈니스 로직
    ├── storage/                # localStorage 유틸
    └── validators.ts           # 입력 유효성 검사
```

---
 
## 📄 페이지 구성
 
| 경로 | 설명 |
|------|------|
| `/` | 홈 — 신간, 베스트셀러 목록 |
| `/search?q={검색어}&page={페이지}` | 도서 검색 결과 |
| `/detail/{ISBN13}` | 도서 상세 페이지 |
| `/login` | 로그인 |
| `/register` | 회원가입 |
| `/mypage/{id}` | 마이페이지 |
| `/mypage/{id}/cart` | 장바구니 |
| `/mypage/{id}/order` | 주문 조회 |
| `/mypage/{id}/wish` | 보관함 |
 
---

## 🏗️ 아키텍처 설명

### 서버 컴포넌트 / 클라이언트 컴포넌트 분리

Next.js App Router의 특성에 맞게 데이터 fetching 레이어를 분리합니다.

- **서버 컴포넌트** (`app/` 하위 page.tsx): `fetchServer.tsx`를 사용해 빌드/요청 시점에 알라딘 API를 직접 호출하고 초기 데이터를 SSR로 전달합니다.
- **클라이언트 컴포넌트** (`'use client'` 선언): `fetchClient.tsx`의 `useEffect` 기반 훅을 사용해 검색어 입력 등 사용자 인터랙션에 따른 동적 fetching을 처리합니다.

### 헤더 상태 관리 (HeaderContext)

헤더는 로그인 상태와 장바구니 수량을 실시간으로 반영해야 하지만, Next.js의 서버/클라이언트 경계 때문에 단순 prop drilling으로는 처리하기 어렵습니다. 이를 해결하기 위해 `HeaderContent.tsx`가 `HeaderContext.Provider`를 제공하고, 각 하위 컴포넌트에서 장바구니/찜하기 등 변경 이벤트가 발생하면 헤더 뱃지를 동기화합니다.

```
RootLayout
└── HeaderContent (Context Provider)
    ├── CustomHeader (서버 컴포넌트)
    │   ├── CustomHeaderCart    ← cartTotalCount 구독
    │   ├── CustomHeaderLogin   ← loginId 구독
    │   ├── CustomHeaderOrder
    │   └── CustomHeaderWish
    └── {children} (각 페이지)    ← setLoginId, setCartTotalCount 등록
```

### localStorage 기반 데이터 저장

외부 DB 없이 `saveload.ts`의 `SaveData` / `LoadData`로 모든 사용자 데이터를 localStorage에 저장합니다. 키는 `{ type, id? }` 구조로 구성되며, 사용자별 독립 데이터(장바구니, 찜하기, 주문)와 공용 데이터(회원 목록, 설정)를 구분합니다.

| 키 | 설명 | 범위 |
|----|------|----|
| `data_login` | 로그인 상태 정보 | 전역 |
| `data_users` | 회원 목록 | 전역 |
| `data_{id}_carts` | 유저별 장바구니 | 사용자별 |
| `data_{id}_orders` | 유저별 주문 내역 | 사용자별 |
| `data_{id}_wish` | 유저별 보관함 | 사용자별 |
| `data_setting` | 검색 뷰 타입 설정 | 전역 |

### 보안

비밀번호는 `crypto` 모듈로 랜덤 Salt를 생성한 뒤 SHA-256 해시 처리 후 `salt:hash` 형태로 저장합니다. 마이페이지 접근 시 URL의 `[id]`와 실제 로그인 사용자 ID를 비교해 타인의 페이지 접근을 차단합니다.

---

## 🔄 페이지 흐름

```
홈 (/)
├── 도서 클릭 → 상세 (/detail/[isbn13])
│              ├── 장바구니 추가
│              └── 찜하기 추가
├── 검색 → 검색 결과 (/search?q=...&page=...)
├── 헤더 - 로그인 → /login
├── 헤더 - 회원가입 → /register
└── 헤더 - 마이페이지 → /mypage/[id]
                    ├── 장바구니 (/mypage/[id]/cart)
                    ├── 주문 내역 (/mypage/[id]/order)
                    └── 보관함 (/mypage/[id]/wish)
```

### 회원 흐름
 
```
회원가입(/register)
    ↓ 가입 완료
로그인(/login)
    ↓ 로그인 성공
마이페이지(/mypage/{id})
    ├── 장바구니(/mypage/{id}/cart)
    ├── 주문 조회(/mypage/{id}/order)
    ├── 보관함(/mypage/{id}/wish)
    └── 로그아웃
```
 
### 도서 구매 흐름
 
```
홈(/)  →  검색(/search)  →  상세(/detail/{isbn13})
                                   ↓
                         [장바구니 담기] or [바로구매]
                                   ↓
                         장바구니(/mypage/{id}/cart)
                                   ↓
                         [주문하기] or [선물하기]
                                   ↓
                         주문 조회(/mypage/{id}/order)
```
 
### 검색 흐름
 
```
헤더 검색바 입력
    ├── 실시간 드롭다운 미리보기 (최대 4건)
    │       ├── 도서 클릭 → 상세 페이지
    │       └── 장바구니 버튼 → 바로 담기
    └── Enter / 검색 버튼 → 검색 결과(/search)
            ├── 뷰 타입 전환 (리스트 / 카드)
            └── 페이지네이션
```
 
### 보관함(찜하기) 흐름
 
```
검색 결과 / 상세 페이지
    ↓ ♡ 버튼 클릭 (비로그인 시 → 로그인 유도)
보관함 저장
    ↓
보관함(/mypage/{id}/wish)
    ├── 장바구니 담기
    ├── 바로구매
    └── 삭제
```

---

## 🧱 컴포넌트 구조
 
### 공통 (`Common/`)
 
| 컴포넌트 | 설명 |
|----------|------|
| `Empty` | 빈 상태 안내 UI |
| `LoginGuard` | 로그인 보호 래퍼 |
| `WishButton` | 찜하기 토글 버튼 |
| `BookPriceDisplay` | 도서 가격/할인율 표시 |
 
### Custom Hooks
 
| 훅 | 설명 |
|----|------|
| `useBookActions` | 장바구니 담기 / 바로구매 로직 |
| `useCountInput` | 수량 입력 컨트롤 |
| `useScrollSlider` | 가로 슬라이더 스크롤 제어 |
| `useWishToggle` | 찜하기 토글 상태 관리 |
 
### Context
 
| 컨텍스트 | 설명 |
|----------|------|
| `HeaderContext` | 로그인 ID, 장바구니 수량 전역 관리 |
| `SearchViewContext` | 검색 결과 뷰 타입 (detail / simple) |
 
---

## 📝 버전 히스토리
 
| 버전 | 주요 변경 사항 |
|---|---|
| `v1.1.1` | 코드 리팩토링 |
| `v1.1.0` | 헤더 상태 관리 도입 (HeaderContext), 로그인, 회원가입, 마이페이지 기능 구현 |
| `v1.0.2` | 코드 리팩토링 |
| `v1.0.1` | 검색 결과 보기 타입 추가 (리스트형,카드형) |
| `v1.0.0` | 최초 릴리즈 — 홈(베스트셀러), 도서 검색, 장바구니, 주문 조회, 보관함 기능 구현 |

---

## 🚀 시작하기

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

> **알라딘 API 키 설정**: `.env.local` 파일에 API 키를 추가해야 합니다.
> ```
> ALADIN_API_KEY=your_api_key_here
> ```

---

## 📚 참고 자료
 
- [Next.js 공식 문서](https://nextjs.org/docs)
- [알라딘 Open API 가이드](https://www.aladin.co.kr/ttb/wapiguide.aspx)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)


