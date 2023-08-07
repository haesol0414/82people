# Ver1. (23.07.03 ~ 23.07.14)

- My First Team Project ✨
- 엘리스 S/W 엔지니어 트랙 1차 프로젝트
- 목적 : 파티 용품 쇼핑몰
- 사용 기술 : JavaScript, Node.js, Express, MongoDB
- 인원 및 포지션 : 프론트엔드(3인) & 백엔드(2인, My Position❕) => 본래 프론트엔드 포지션을 희망 하였으나, 프론트엔드 개발자 양성 중심의 교육 과정이다 보니 프론트엔드를 희망하면서 백엔드를 두려워하는 팀원들이 대부분이였음. 이참에 백엔드의 구조와 기능도 공부하고 작지만 직접 구현해보는 것도 프론트엔드 개발자로서 많은 도움이 될 것 같아 백엔드를 맡게 되었음❕
- My API : Order API, Product API, Admin API, ErrorHandler, MongoDB Cloud 구축
- (1) Order API : Model & Schema 작성, 주문하기, 전체 주문 내역 조회, 주문 상세 내역 조회, 회원 기본 배송지 조회, 회원 기본 배송지 등록 (Router ~ Controller ~ Service)
- (2) Product API : Model & Schema 작성, 전체 상품 조회, 판매량 TOP4 베스트 상품 조회, 카테고리별 상품 조회, 상품 상세 조회 (Router ~ Controller ~ Service)
- (3) Admin API : Model & Schema 작성, 회원 전체 주문 내역 조회, 배송 상태 변경 (Router ~ Controller ~ Service)
- (4) ErrorHandler : 에러 처리 미들웨어 작성

# Ver2. 쥬얼리 판매 사이트로 리팩토링 (23.07.24 ~)

- Ver1 파티 용품 쇼핑몰 프로젝트를 활용하여 개별적으로 리팩토링
- Ver1에서 짧은 프로젝트 기간 상 모두 구현하지 못했던 관리자 기능을 완성하는 것을 중점으로 두고 리팩토링 하였음
- 목적 : 쥬얼리 쇼핑몰
- 사용 기술 : JavaScript, Node.js, Express, MongoDB
- 인원 및 포지션 : 1인, 프론트엔드 + 백엔드

## 리팩토링

- HTML, CSS 디자인
- 폰트 적용
- Best Items UI를 단일 슬라이드 이용하여 구현
- ConfirmToken.js : 토큰을 이용해 사용자의 로그인 상태를 판별하고 회원 정보를 확인하는 코드들을 ConfirmToken.js 파일로 모듈화 하였음, 서버쪽 토큰 만료 시간(1h)이 지나면 프론트에서도 세션 만료 alert를 띄우며 자동 로그아웃 처리를 하도록 함
- Category Model & Schema : String 타입이였던 기존 ProductSchema의 category 필드는 CategorySchema를 참조하도록 ref 옵션을 주어 상품 조회 시 populate를 통해 상품의 카테고리 이름을 가져올 수 있도록 하였음
- Cart : 장바구니에서 상품 이미지를 클릭하면 해당 상품 상세 페이지로 넘어가도록 수정함
- UserLogin Service : 기존 유저 정보를 받아오는 API가 로그인 확인 과정과 사용자 정보 페이지에서 사용자 정보를 받아오는 과정 모두에서 쓰였음. 이 경우 사용자 정보를 받아올 때 password까지 그대로 res로 모두 받아오게 되어 비밀번호가 콘솔에 노출되는 상황이 발생 => 사용자 정보를 받아오는 API에서 비밀번호 필드를 제외하고 res에 담도록 DB 로직을 수정하였고, 로그인 시 사용자의 비밀번호가 일치하는지 확인할 수 있도록 AuthService.js에 UserLogin Service를 따로 만들어 AuthController에서 관리하도록 함
- 상품 상세 : 기존에 없었던 상품 상세 이미지를 넣을 수 있도록 HTML과 CSS를 조정하여 Detail란에 상품 설명과 상세 이미지 레이아웃을 추가하였음, Product 모델에서 상품 상세 이미지 필드를 새로 추가할 경우 많은 수정이 필요할 것 같아 기존에 문자열 배열로 생성되어 있던 ImageURL 필드의 [1]번째 값에 상세 이미지를 추가할 예정

## (+) 추가 기능

### ADMIN 회원 관리

- (1) 전체 회원 / 탈퇴 회원 / 관리자로 유저를 구분하여 조회할 수 있음
- (2) 라디오 버튼을 이용해 선택된 회원을 DB에서 삭제할 수 있도록 함

### ADMIN 주문 관리

- (1) 주문 상태(상품 준비 중 / 배송 중 / 배송 완료 / 주문 취소)에 따라 주문을 구분하여 확인할 수 있음
- (2) '상품 준비 중' 상태에서는 수령인 배송지 변경 및 주문 취소가 가능하도록 구현함
- (3) '주문 취소' 상태의 주문만 주문 내역 삭제가 가능하도록 구현함
- (4) 주문 번호 검색 시 바로 해당 주문의 상세 페이지로 이동하는 버튼 구현

### ADMIN 상품 관리

- (1) 상품 등록
- (2) 상품 수정
- (3) 상품 삭제
- (4) 상품 재고 관련 기능
- ㄴ 상품의 재고가 0인 경우 => 상품 가격란과 해당 상품 상세 페이지 장바구니 담기 버튼의 text를 SOLD OUT으로 변경함과 동시에 disabled 옵션을 주어 장바구니에 담지 못하도록 함
- ㄴ 사용자가 선택한 주문 수량이 현재 재고를 초과하는 경우 => 현재 남은 재고량을 alert로 띄워 사용자에게 알리고, 초과된 수량으로 주문이 불가능 하도록 disabled 옵션을 주어 현재 재고량 이상으로 수량을 올리지 못하도록 구현
- ㄴ 주문 취소 시 => 사용자가 주문 한 상품의 수량만큼 재고량을 DB에 되돌려 놓도록 API를 구현. 판매량 또한 기존 주문 상품 수량만큼 다시 감소시킴.

### ADMIN 카테고리 관리 & 카테고리별 상품 페이지

- (1) 카테고리 추가
- (2) 카테고리 수정
- (3) 카테고리 삭제
- (4) 카테고리별 상품 페이지에서 신상품순 / 가격 낮은 순 / 가격 높은 순으로 구분하여 볼 수 있도록 구현
- (5) 품절 제외 체크 박스를 추가하여, 체크 시 현재 재고량이 0인 상품들은 화면에서 보이지 않도록 구현

## TODO 🔜

- 상품 상세 : 상세 이미지 추가(이미지URL관리)
- 상품 리뷰 기능
- Q&A 페이지 : 문의 Form
- 이미지 파일 업로드 => 이미지 모델을 따로? DB에는 URL??
