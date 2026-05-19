# 📚 DummyBooks

> 알라딘 Open API를 활용한 온라인 서점 웹 애플리케이션

---

## 프로젝트 소개

DummyBooks는 Next.js 기반의 온라인 서점 서비스입니다. 베스트셀러 탐색, 도서 검색, 상세 정보 조회부터 회원가입/로그인, 장바구니, 찜하기, 주문 내역까지 실제 서점 서비스에 가까운 흐름을 구현합니다. 외부 DB 없이 `localStorage`를 데이터 저장소로 활용해 프론트엔드 단독으로 동작합니다.

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript |
| 스타일 | CSS Modules |
| 외부 API | 알라딘 Open API |
| 데이터 저장 | localStorage |
| 상태 관리 | React Context API |

---

## 주요 기능

- **홈 화면**: 신간 특별 리스트(배너 슬라이더), 전체 신간, 이달의 베스트셀러, 블로거 선정 베스트셀러 목록 표시
- **도서 검색**: 키워드 검색 및 페이지네이션, 상세/간략 뷰 전환
- **도서 상세**: ISBN13 기반 도서 정보 조회, 장바구니 및 찜하기 추가
- **회원 시스템**: 회원가입(SHA-256 비밀번호 해싱), 로그인/로그아웃
- **장바구니**: 수량 조절, 선택/전체 삭제, 총 금액 실시간 계산
- **보관함(찜하기)**: 관심 도서 저장, 장바구니 이동 및 바로구매
- **주문 내역**: 주문 이력 조회 및 주문 ID 생성

---

## 디렉토리 구조

```
src/
├── app/                        # Next.js App Router 페이지
│   ├── page.tsx                # 홈 (베스트셀러 목록)
│   ├── layout.tsx              # 루트 레이아웃 (헤더, 푸터)
│   ├── detail/[id]/            # 도서 상세 페이지 (ISBN13 기반)
│   ├── search/                 # 검색 결과 페이지
│   ├── login/                  # 로그인 페이지
│   ├── register/               # 회원가입 페이지
│   └── mypage/[id]/            # 마이페이지 (사용자 ID 기반)
│       ├── page.tsx            # 마이페이지 메인
│       ├── cart/               # 장바구니
│       ├── order/              # 주문 내역
│       └── wish/               # 보관함(찜하기)
│
├── components/                 # UI 컴포넌트
│   ├── CustomHeader.tsx        # 공통 헤더 (로고, 검색바, 네비게이션)
│   ├── CustomHeaderCart.tsx    # 헤더 - 장바구니 버튼 (수량 뱃지 포함)
│   ├── CustomHeaderLogin.tsx   # 헤더 - 로그인/마이페이지 버튼
│   ├── CustomHeaderOrder.tsx   # 헤더 - 주문조회 버튼
│   ├── CustomHeaderWish.tsx    # 헤더 - 보관함 버튼
│   ├── CustomFooter.tsx        # 공통 푸터
│   ├── HeaderContent.tsx       # 헤더 Context Provider (클라이언트)
│   ├── Bestseller/             # 홈 화면 도서 목록 컴포넌트
│   │   ├── BestsellerBanner    # 자동 슬라이드 배너
│   │   └── BestsellerList      # 도서 목록 리스트
│   ├── Detail/                 # 도서 상세 컴포넌트
│   ├── Search/                 # 검색 컴포넌트 (검색바, 결과, 페이지네이션)
│   ├── Login/                  # 로그인 폼
│   ├── Register/               # 회원가입 폼
│   ├── MyPage/                 # 마이페이지 관련
│   │   ├── Cart/               # 장바구니 컴포넌트
│   │   ├── Order/              # 주문 내역 컴포넌트
│   │   └── Wish/               # 보관함 컴포넌트
│   ├── Confirm/                # 확인 모달 (장바구니 추가, 찜하기 삭제 등)
│   └── Empty/                  # 빈 상태 표시 컴포넌트
│
├── context/                    # React Context
│   ├── HeaderContext.tsx        # 헤더 전역 상태 (로그인 ID, 장바구니 수량)
│   ├── CartPriceContext.tsx     # 장바구니 가격 계산 상태
│   └── SearchViewContext.tsx    # 검색 결과 뷰 타입 상태 (상세/간략)
│
├── types/                      # TypeScript 타입 정의
│   ├── ApiData.ts              # API 응답 타입 (ItemSearchResponse 등)
│   ├── BookData.ts             # 도서 데이터 및 할인 정보 타입
│   ├── CartData.ts             # 장바구니 아이템 타입
│   ├── OrderData.ts            # 주문 내역 타입
│   ├── WishData.ts             # 찜하기 데이터 타입
│   ├── UserData.ts             # 사용자/로그인 데이터 타입
│   └── SettingData.ts          # 사용자 설정 타입
│
└── utils/                      # 유틸리티 함수
    ├── fetchServer.tsx          # 서버 컴포넌트용 API fetch 함수
    ├── fetchClient.tsx          # 클라이언트 컴포넌트용 API fetch 훅
    ├── userUtils.tsx            # 회원가입, 로그인, 인증 로직
    ├── cartUtils.tsx            # 장바구니 CRUD
    ├── wishUtils.tsx            # 찜하기 CRUD
    ├── orderUtils.tsx           # 주문 생성 및 조회
    ├── saleUtils.tsx            # 할인가 계산
    ├── settingUtils.tsx         # 사용자 설정 저장/조회
    └── saveload.ts             # localStorage 저장/불러오기 추상화
```

---

## 아키텍처 설명

### 서버 컴포넌트 / 클라이언트 컴포넌트 분리

Next.js App Router의 특성에 맞게 데이터 fetching 레이어를 분리합니다.

- **서버 컴포넌트** (`app/` 하위 page.tsx): `fetchServer.tsx`를 사용해 빌드/요청 시점에 알라딘 API를 직접 호출하고 초기 데이터를 SSR로 전달합니다.
- **클라이언트 컴포넌트** (`'use client'` 선언): `fetchClient.tsx`의 `useEffect` 기반 훅을 사용해 검색어 입력 등 사용자 인터랙션에 따른 동적 fetching을 처리합니다.

### 헤더 상태 관리 (HeaderContext)

헤더는 로그인 상태와 장바구니 수량을 실시간으로 반영해야 하지만, Next.js의 서버/클라이언트 경계 때문에 단순 prop drilling으로는 처리하기 어렵습니다. 이를 해결하기 위해 `HeaderContent.tsx`가 `HeaderContext.Provider`를 제공하고, 각 하위 컴포넌트에서 `updateHeader` 콜백을 등록(`addUpdateHeader`)해 장바구니/찜하기 등 변경 이벤트가 발생하면 헤더 뱃지를 동기화합니다.

```
RootLayout
└── HeaderContent (Context Provider)
    ├── CustomHeader (서버 컴포넌트)
    │   ├── CustomHeaderCart    ← updateHeader 등록
    │   ├── CustomHeaderLogin   ← loginId 구독
    │   ├── CustomHeaderOrder
    │   └── CustomHeaderWish
    └── {children} (각 페이지)
```

### localStorage 기반 데이터 저장

외부 DB 없이 `saveload.ts`의 `SaveData` / `LoadData`로 모든 사용자 데이터를 localStorage에 저장합니다. 키는 `{ type, id? }` 구조로 구성되며, 사용자별 독립 데이터(장바구니, 찜하기, 주문)와 공용 데이터(회원 목록, 설정)를 구분합니다.

| 데이터 | 키 형태 | 범위 |
|---|---|---|
| 회원 목록 | `Users` | 전역 |
| 로그인 세션 | `Login` | 전역 |
| 장바구니 | `Cart:{userId}` | 사용자별 |
| 찜하기 | `Wish:{userId}` | 사용자별 |
| 주문 내역 | `Orders:{userId}` | 사용자별 |
| 설정 | `Setting` | 전역 |

### 보안

비밀번호는 `crypto` 모듈로 랜덤 Salt를 생성한 뒤 SHA-256 해시 처리 후 `salt:hash` 형태로 저장합니다. 마이페이지 접근 시 URL의 `[id]`와 실제 로그인 사용자 ID를 비교해 타인의 페이지 접근을 차단합니다.

---

## 페이지 흐름

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

---

## 버전 히스토리
 
| 버전 | 주요 변경 사항 |
|---|---|
| `v1.1.0` | 헤더 상태 관리 도입 (HeaderContext), 로그인, 회원가입, 마이페이지 기능 구현 |
| `v1.0.2` | 코드 리팩토링 |
| `v1.0.1` | 검색 결과 보기 타입 추가 (리스트형,카드형) |
| `v1.0.0` | 최초 릴리즈 — 홈(베스트셀러), 도서 검색, 장바구니, 주문 조회, 보관함 기능 구현 |

---

## 시작하기

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
