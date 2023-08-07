import { main } from '/Common/index.js';
await main();

const urlStr = window.location.href;
const productId = new URL(urlStr).searchParams.get('productId');

console.log(productId);

// 장바구니 작업용
const productMaker = document.querySelector('.maker');
const productTitle = document.querySelector('.product-title');
const productPrice = document.querySelector('.product-price');
const productImage = document.querySelector('.product-icon-image>img');
const addToCart = document.querySelector('#add-to-cart');
const productAmount = document.querySelector('#amount');
const totalCash = document.querySelector('.product-total-cash');
const toCartSpan = document.querySelector('.to-cart-span');
const detailDescription = document.querySelector('.detail-description');
const detailImage = document.querySelector('.detail-img');

let imageURL;
let detailImgeURL;
let imageURL2;
let price;
let currentAmount;
fetch(`/api/products/${productId}`, {
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
	.then(({ productInfo }) => {
		// product info
		productMaker.innerText = productInfo.manufacturer;
		productTitle.innerText = productInfo.title;
		productPrice.innerText = `KRW ${Number(
			productInfo.price
		).toLocaleString()}`;

		// imgae
		imageURL = productInfo.imageURL[0];
		detailImgeURL = productInfo.imageURL[0]; // 나중에 상세 이미지 [1]에 추가해서 수정
		productImage.setAttribute('src', imageURL);
		detailImage.setAttribute('src', detailImgeURL);

		// discription
		detailDescription.innerText = productInfo.description;

		// amount, price, button
		totalCash.innerText = `KRW ${Number(productInfo.price).toLocaleString()}`;
		price = Number(productInfo.price);
		currentAmount = productInfo.currentAmount;
		if (currentAmount <= 0) {
			toCartSpan.innerHTML = 'SOLD OUT';
			addToCart.style.cursor = 'not-allowed';
			return (addToCart.disabled = true);
		}
	})
	.catch(err => console.log(err));

const PRODUCT_KEY = 'cartProducts';
let products = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];
console.log(products);
productAmount.addEventListener('change', e => {
	productAmount.value = e.target.value;

	totalCash.innerText = `KRW ${(
		price * Number(productAmount.value)
	).toLocaleString()}`;

	if (currentAmount === 0) {
		return alert(`SOLD OUT !!`);
	}
	if (currentAmount !== 0 && Number(productAmount.value) > currentAmount) {
		return alert(`현재 재고 : ${currentAmount}개`);
	}
});

addToCart.addEventListener('click', () => {
	let amount = Number(productAmount.value);

	if (amount > currentAmount) {
		return alert(`재고 초과🥲 현재 재고 : ${currentAmount}개`);
	}

	const hasProduct = products.findIndex(product => product.id === productId);

	amount = hasProduct !== -1 ? products[hasProduct].amount + amount : amount;

	let product = {
		id: productId, // api에서 가져온 id값
		title: productTitle.textContent, // api에서 가져온 title값
		imageUrl: imageURL, // api에서 가져온 imageUrl값
		amount: amount,
		price: price,
		totalPrice: price * amount,
		currentAmount: currentAmount,
	};

	if (hasProduct !== -1) {
		// 같은 id의 상품이 있는 경우 덮어쓰기
		products[hasProduct] = product;
	} else {
		// 같은 id의 상품이 없는 경우 추가
		products.push(product);
	}
	localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
	alert('장바구니에 추가되었습니다 💜');
});
