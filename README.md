# Butterfly
## Ver2. 쥬얼리 판매 사이트 (23.07.24 ~ 23.08.08)

- Ver1 파티 용품 쇼핑몰 프로젝트를 활용하여 개별적으로 리팩토링
- Ver1에서 짧은 프로젝트 기간 상 모두 구현하지 못했던 관리자 기능을 완성하는 것을 중점으로 두고 리팩토링 하였음
- 서비스 목적 : 쥬얼리 쇼핑몰
- 사용 기술 : JavaScript, Node.js, Express, MongoDB
- 인원 및 포지션 : 1인, 프론트엔드 + 백엔드

## 리팩토링

- HTML, CSS 디자인
- 웹 폰트 적용
- Best Items UI를 단일 슬라이드 이용하여 구현 (Swiper JS)
- ConfirmToken.js : 토큰을 이용해 사용자의 로그인 상태를 판별하고 회원 정보를 확인하는 코드들을 ConfirmToken.js 파일로 모듈화 하였음, 서버쪽 토큰 만료 시간(1h)이 지나면 프론트에서도 세션 만료 alert를 띄우며 자동 로그아웃 처리를 하도록 함
- Category Model & Schema : String 타입이였던 기존 ProductSchema의 category 필드는 CategorySchema를 참조하도록 ref 옵션을 주어 상품 조회 시 populate를 통해 상품의 카테고리 이름을 가져올 수 있도록 하였음
- Cart : 장바구니에서 상품 이미지를 클릭하면 해당 상품 상세 페이지로 넘어가도록 수정함
- UserLogin Service : 기존 유저 정보를 받아오는 API가 로그인 확인 과정과 사용자 정보 페이지에서 사용자 정보를 받아오는 과정 모두에서 쓰였음. 이 경우 사용자 정보를 받아올 때 password까지 그대로 res로 모두 받아오게 되어 비밀번호가 콘솔에 노출되는 상황이 발생 => 사용자 정보를 받아오는 API에서 비밀번호 필드를 제외하고 res에 담도록 DB 로직을 수정하였고, 로그인 시 사용자의 비밀번호가 일치하는지 확인할 수 있도록 AuthService.js에 UserLogin Service를 따로 만들어 AuthController에서 관리하도록 함

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

<img width="835" alt="스크린샷 2023-11-20 오후 3 12 36" src="https://github.com/haesol0414/82people/assets/86980317/2f6a500b-cbf0-4f81-9e69-af7ac1203201">

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
