import { main } from '/Common/index.js';
await main();

const products = document.querySelector('.icons');
const urlStr = window.location.href;
const categoryId = new URL(urlStr).searchParams.get('category');
const checkBox = document.getElementById('checkBox');
const checkBoxDiv = document.querySelector('.check-box');
const categoryTitle = document.querySelector('.category-name');
let categoryName = '';
let allProducts = '';
let notSoldOut = '';
const emptyItem = document.querySelector('.empty-items-box');

// 카테고리별 상품 화면에 뿌리기
const getCategoryProducts = newProduct => {
	let price =
		newProduct.currentAmount <= 0
			? '🚫 SOLD OUT'
			: '💎 KRW ' + newProduct.price.toLocaleString();

	const categoryProduct = `<li>
		<a class='icon-img'
			href='/products?productId=${newProduct._id}' target='_self'>
			<img class="product-img"
			src='${newProduct.imageURL}'/>
			<div class="product-title">✧ ${newProduct.title}</div>
			<div class='product-price'>${price}</div>
			</div>
		</a>
    </li>`;

	allProducts += categoryProduct;
	if (price !== '🚫 SOLD OUT') {
		notSoldOut += categoryProduct;
	}
};

checkBox.addEventListener('click', () => {
	if (checkBox.checked === true) {
		products.innerHTML = notSoldOut;
		if (!notSoldOut) {
			products.innerHTML = `<span class="empty-items" style="color:red">
			All products are out of stock 🙀</span>`;
		}
	} else {
		products.innerHTML = allProducts;
	}
});

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
			categoryProducts.reverse().map(getCategoryProducts);
			categoryName = categoryProducts[0].category.name;
			categoryTitle.innerHTML = `✢ ${categoryName} ✢`;
			products.innerHTML = allProducts;
		} else {
			emptyItem.innerHTML = `<span>THIS CATEGORY IS EMPTY 🫧</span>
			<span style="font-size: 21px">Please Wait for The Products You will soon meet ••• 🚚 </span>
			`;
			checkBoxDiv.style.display = 'none';
		}
	})
	.catch(err => console.log(err));
