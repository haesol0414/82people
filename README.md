# 82People

<img width="1341" alt="82people" src="https://github.com/user-attachments/assets/e60c0a77-770a-4666-82dd-fbed75e71cfa">


## 배포 URL(23.10.11일자 서버 중지)

[82People](http://kdt-sw-5-team08.elicecoding.com/)

<img width="200" alt="qr" src="https://github.com/hitzza/82People/assets/103095794/82ac2ae1-58b7-4392-b6e5-d733d0f78d5b">

<br />
<br />

## 테스트 계정

관리자
ID : [admin@admin.com]

PW : admin123!

유저
ID : [gogo@elice.com]
PW : dls1212@@

<br />
<br />

## 페르소나

<img width="300" alt="페르소나" src="https://github.com/hitzza/82People/assets/103095794/fe8eb56e-57e1-45fd-bbca-2dcdb3e51693">

- 파티와 추억을 사랑하는 20대 초반 여성
- 1년 365일 기념일만 생각!

<br />
<br />

## 서비스 소개

- 파티 용품 쇼핑몰 서비스
- 카테고리 별 상품들을 볼 수 있다.
- 장바구니에 미리 담아두었다가 한번에 결제하거나 구매하고 싶은 상품만 구매도 가능하다.
- 회원/비회원 주문이 따로 있다.
- 주문내역 조회가 가능하다.
- 로그인 시 기본 배송지가 자동으로 설정되며 마이페이지에서 변경 가능하다.
- 관리자로 로그인하면 고객이 주문한 리스트를 볼 수 있다.
- 관리자로 로그인하면 고객이 주문한 상품의 배송상태를 상태별로 볼 수 있으며, 배송상태 변경이 가능하다.


<br />
<br />

## 담당 기능 (BE)
- 프론트엔드와 백엔드의 소통 창구인 API 명세서를 문서화하여 요청과 응답 데이터 정리
- My API : Order API, Product API, Admin API, ErrorHandler, MongoDB Cloud 구축
- (1) Order API : Model & Schema 작성, 주문하기, 전체 주문 내역 조회, 주문 상세 내역 조회, 회원 기본 배송지 조회, 회원 기본 배송지 등록 (Router ~ Controller ~ Service)
- (2) Product API : Model & Schema 작성, 전체 상품 조회, 판매량 TOP4 베스트 상품 조회, 카테고리별 상품 조회, 상품 상세 조회 (Router ~ Controller ~ Service)
- (3) Admin API : Model & Schema 작성, 회원 전체 주문 내역 조회, 배송 상태 변경 (Router ~ Controller ~ Service)
- (4) ErrorHandler : 상태 코드에 따른 에러 처리 미들웨어 작성
  

<br />
<br />


## 기술 및 개발 환경


### [ 프로젝트 기간 ]

2023.07.03 ~ 2023.07.14

### [ 프로젝트 목표 ]

- VanillaJs만을 사용한 기초 자바스크립트 이해와 협엽 프로젝트 경험


<br />
<br />

### [ 사용 기술 ]

- Front-end
  <br/>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <br/>

- Back-end
  <br/>
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/nodedotjs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <br/>
- 협업 툴

  <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">
  <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">


<br />
<br />

### [ 컨벤션 ]

<details>
<summary> - Git Commit Convention</summary>
<div markdown="1">

 <aside>
 
    💡
    - Feat: 새로운 기능 추가
    - Design : CSS, 사용자 UI 디자인 변경
    - Style : 코드포맷, 세미콜론, 개행, 코드 구조, 형태
    - Test : 테스트
    - Refactor: 코드 리팩토링
    - Fix : 버그 및 오류 수정
    - Remove : 불필요한 파일 삭제
    - Rename : 파일 혹은 폴더명 수정하거나 옮기는 경우
    - Chore : 빌드 업무, 패키지매니저, 폴더트리, 세팅 수정
    - Comment : 필요한 주석 추가 및 변경
    
</aside>

</div>
</details>

<details>
<summary> - Code Convention</summary>
<div markdown="1">

 <aside>
 
    💡
    
    - 상수 ⇒ UpperCase+snake_case
    - 변수 및 함수 ⇒ camelCase
    - 함수 ⇒ Arrow function (예외로  this 가 필요할경우 함수표현식 허용)
    - 함수2 ⇒ 원라인 리턴일경우 {} 생략
    - 파일명 및 스키마 => PascalCase
    - RESTFul url, css Selector => Kebab-case
    
</aside>

</div>
</details>

<br />
<br />

### [ Git-flow 전략 ]

기본적으로 5가지 브랜치를 활용하는 Git-flow 전략이나, 프로젝트 규모에 맞춰 3가지로 축소해 활용하였습니다.

- `main` : 배포하기 위한 브랜치
- `dev` : 기능 구현, 버그 수정과 같은 기능 단위별 브랜치
- `BE-dev` : 백엔드 개발을 위한 브랜치
- `FE-dev` : 프론트엔드 개발을 위한 브랜치
- `feat` : 개발을 위한 브랜치
  - 각 브랜치의 이름은 `feat/세부기능`으로 이름 지어 어떠한 기능의 브랜치인지를 알 수 있도록 했습니다.

<br />
<br />

## Figma 문서

https://www.figma.com/file/Qgj2Gkawk3Le2L5UbroH03/82people-%EC%9B%B9%EB%94%94%EC%9E%90%EC%9D%B8?type=design&node-id=0-1&mode=design&t=vZyo3RFhiuSgD7e3-0


<br />
<br />

## 페이지 별 화면

<details>
<summary> 홈 </summary>
<div markdown="1">
 <aside>
   <img src="https://github.com/user-attachments/assets/11b84fca-bf67-4a55-ac74-0d3b46ca1fcf">
</aside>
</div>
</details>

<details>
<summary> 회원가입 / 로그인 </summary>
<div markdown="1">
 <aside>
 <img src="https://github.com/user-attachments/assets/41cba4c8-6255-40f3-9560-424269a10f95">
 <img src="https://github.com/user-attachments/assets/b50c5b3c-f46f-471d-a169-320cf9ad8847">
</aside>
</div>
</details>

<details>
<summary> 마이페이지 주소지 설정 </summary>
<div markdown="1">
 <aside>
 <img src="https://github.com/user-attachments/assets/6b58f10c-3b02-4ab0-bb71-497c0035227a">
</aside>
</div>
</details>

<details>
<summary> 장바구니 담기 </summary>
<div markdown="1">
 <aside>
 <img src="https://github.com/user-attachments/assets/f941dd19-0c9f-4e34-bd87-c23975d6996c">
</aside>
</div>
</details>

<details>
<summary> 회원 주문하기 </summary>
<div markdown="1">
 <aside>
 <img src="https://github.com/user-attachments/assets/d81dac11-481a-4087-87be-dc4a6590da03">
</aside>
</div>
</details>

<details>
<summary> 회원 주문내역 확인 </summary>
<div markdown="1">
 <aside>
 <img src="https://github.com/user-attachments/assets/ca2b651d-8884-45f2-abc3-8168cd131f70">
</aside>
</div>
</details>

<details>
<summary> 비회원 주문하기 </summary>
<div markdown="1">
 <aside>
 <img src="https://github.com/user-attachments/assets/58c0a465-ede0-4f7d-9f06-a30784adeead">
</aside>
</div>
</details>

<details>
<summary> 비회원 주문내역 확인 </summary>
<div markdown="1">
 <aside>
 <img src="https://github.com/user-attachments/assets/282454a4-332c-4ab0-b3c4-38044ca688d1">
</aside>
</div>
</details>



<br />
<br />

## 프로젝트 경험과 깨달음
- 첫 팀 프로젝트 경험으로, API 명세서, 기능 분담, 코드 컨벤션, 깃 컨벤션 등 협업에 필요한 주요 사항들을 팀원들과 함께 문서화 하며 체계적인 개발 경험을 얻을 수 있었습니다.
- 3계층 아키텍처에 대해 학습하며 전반적인 개발 프로세스에 대한 감을 잡을 수 있었습니다.
- 홈 화면에서는 전체 상품과, 판매량이 가장 높은 상위 4개의 베스트 상품을 보여줍니다. DB에서 전체 상품을 받아오고, 또 베스트 상품을 가져오는 과정에서 동기적으로 처리할 경우 전체 상품을 모두 받아온 후 베스트 상품을 받아오게 됩니다. <br /> 이 때, 각각 5초씩의 시간이 소요된다고 가정할 경우 총 10초라는 시간이 걸리게 되는 것을 깨달았습니다. 이 시간을 단축하기 위해 JavaScript에서 여러 개의 Promise를 동시에 실행하고, 모든 프로미스가 완료될 때까지 기다린 다음 결과를 반환하는 메서드인 Promise.all을 활용했습니다. <br /> 이로써 전체 상품과 베스트 상품을 동시에 DB에서 가져와, 전체 상품을 받아오는 동안에도 베스트 상품을 병렬적으로 가져와 전체 소요 시간을 최소화할 수 있었습니다. 이를 통해 동기와 비동기에 대한 이해도를 높일 수 있었습니다.
