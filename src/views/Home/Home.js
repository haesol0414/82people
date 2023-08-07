import { main } from '/Common/index.js';
await main();

const total = document.querySelector('.products-total');
let currentIdx = 0; //현재 슬라이드 index
const slides = document.querySelector('.slides'); //전체 슬라이드 컨테이너
const slideCount = 3; // 슬라이드 개수
const prev = document.querySelector('.prev'); //이전 버튼
const next = document.querySelector('.next'); //다음 버튼
const slideWidth = 500; //한개의 슬라이드 넓이
const slideMargin = 100; //슬라이드간의 margin 값
const SOLD_OUT_MESSAGE = '🚫 SOLD OUT';

// 뱃지
const badgeNewImg = document.querySelector('.badge-new-img');
const badgeNewUrl = document.querySelector('.badge-new-url');
const badgeBestImg = document.querySelector('.badge-best-img');
const badgeBestUrl = document.querySelector('.badge-best-url');

//전체 슬라이드 컨테이너 넓이 설정
slides.style.width = (slideWidth + slideMargin) * (slideCount + 1) + 'px';

function moveSlide(num) {
	slides.style.left = -num * (slideWidth + slideMargin) + 'px';
	currentIdx = num;
}

prev.addEventListener('click', function () {
	if (currentIdx !== 0) moveSlide(currentIdx - 1);
});

next.addEventListener('click', function () {
	if (currentIdx !== slideCount - 1) {
		moveSlide(currentIdx + 1);
	}
});

fetch('/api/products', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then(res => {
		if (res.ok) {
			return res.json();
			// 로그인 페이지 이동
		} else {
			console.error('조회 실패 : ', err);
			alert('상품 조회 실패');
		}
	})
	.catch(err => {
		console.log(err);
	})
	.then(({ bestProducts, totalProducts }) => {
		console.log('bestProducts', bestProducts);
		console.log('totalProducts', totalProducts);

		badgeBestImg.src = bestProducts[3].imageURL[0];
		badgeBestUrl.href = `/products?productId=${bestProducts[3]._id}`;
		badgeNewImg.src = totalProducts[0].imageURL[0];
		badgeNewUrl.href = `/products?productId=${totalProducts[0]._id}`;

		bestProducts.map(getBestProducts);
		totalProducts.map(getTotalProducts);
	})
	.catch(err => console.log(err));

let items = '';

const getTotalProducts = newProduct => {
	let price =
		newProduct.currentAmount <= 0
			? SOLD_OUT_MESSAGE
			: '💎 KRW ' + newProduct.price.toLocaleString();

	const newItem = `<li>
		<a class='product-link'
		href='/products?productId=${newProduct._id}' target='_self'>
		<img class="product-img"
		src='${newProduct.imageURL}' alt="product-item"/>
		<div class="product-title">✧ ${newProduct.title}</div>
		<div class='product-price'>${price}</div>
		</div>
		</a>
    </li>`;
	items += newItem;
	total.innerHTML = items;
};

let bestItems = '';
const getBestProducts = bestProduct => {
	const newBestItem = `
		<li>
		<a class='product-link'
		href='/products?productId=${bestProduct._id}' target='_self'>
		<img src="${bestProduct.imageURL}" /></li>
	`;
	bestItems += newBestItem;
	slides.innerHTML = bestItems;
};

// 뱃지 닫기
const badgeXbtn = document.querySelector('#badge-close-btn');

badgeXbtn.addEventListener('click', () => {
	const badges = document.querySelector('.badges');

	badges.style.display = 'none';
});
