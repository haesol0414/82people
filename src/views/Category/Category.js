import { main } from '/Common/index.js';
await main();

const products = document.querySelector('.icons');
// const categoryTag = document.querySelector('.category');
const urlStr = window.location.href;
const categoryId = new URL(urlStr).searchParams.get('category');

// 카테고리별 상품 화면에 뿌리기
const getCategoryProducts = newProduct => {
	let price =
		newProduct.currentAmount <= 0
		? '🚫 SOLD OUT'
		: '💎 KRW ' + newProduct.price.toLocaleString();

	return `<li>
		<a class='icon-img'
			href='/products?productId=${newProduct._id}' target='_self'>
			<img class="product-img"
			src='${newProduct.imageURL}'/>
			<div class="product-title">${newProduct.title}</div>
			<div class='product-price'>${price}</div>
			</div>
		</a>
    </li>`;
};

// 카테고리 id로 카테고리별 상품 가져오기
fetch(`/api/products/category/${categoryId}`, {
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
	.then(({ categoryProducts }) => {
		console.log(categoryProducts);
		if (categoryProducts.length !== 0) {
			products.innerHTML = categoryProducts.map(getCategoryProducts).join('');
		} else {
			products.innerHTML = `<span class="empty-items">THIS CATEGORY IS EMPTY 🫧</span>`;
		}
	})
	.catch(err => console.log(err));
