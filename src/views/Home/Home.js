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
		console.log(res);
		if (res.ok) {
			return res.json();
			// 로그인 페이지 이동
		} else {
			throw new Error('조회 실패');
		}
	})
	.catch(err => {
		alert(err);
	})
	.then(({ bestProducts, totalProducts }) => {
		console.log('bestProducts', bestProducts);
		console.log('totalProducts', totalProducts);
		bestProducts.map(getBestProducts);
		totalProducts.map(getTotalProducts);
	})
	.catch(err => console.log(err));

let items = '';
const getTotalProducts = newProduct => {
	const newItem = `<li>
		<a class='product-link'
		href='/products?productId=${newProduct._id}' target='_self'>
		<img class="product-img"
		src='${newProduct.imageURL}' alt="product-item"/>
		<div class="product-title">${newProduct.title}</div>
		<div class='product-price'>KRW ${newProduct.price.toLocaleString()}</div>
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