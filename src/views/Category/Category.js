import { main } from '/Common/index.js';
await main();

const products = document.querySelector('.icons');
const urlStr = window.location.href;
const categoryId = new URL(urlStr).searchParams.get('category');
const soldOutCheckBox = document.getElementById('checkBox');
const checkBoxDiv = document.querySelector('.check-box');
const categoryTitle = document.querySelector('.category-name');
const emptyItem = document.querySelector('.empty-items-box');
const sortSelectOption = document.querySelector('#item-select');
const SOLD_OUT_MESSAGE = '🚫 SOLD OUT';
let Products;
let categoryName = '';
let selectedSortType = document.querySelector('.default-sort-option').value;

async function CategoryProductsInit() {
	soldOutCheckBox.addEventListener('click', () => {
		products.innerHTML = generateSortedHtml(Products, soldOutCheckBox.checked);
	});

	sortSelectOption.addEventListener('change', event => {
		selectedSortType = event.target.value;
		products.innerHTML = generateSortedHtml(Products, soldOutCheckBox.checked);
	});
}

CategoryProductsInit();

// 카테고리별 상품 가져오기
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
			console.error('조회 실패 : ', err);
			alert('상품 조회 실패');
		}
	})
	.catch(err => {
		console.log(err);
	})
	.then(({ categoryProducts }) => {
		Products = categoryProducts;

		if (categoryProducts.length !== 0) {
			categoryName = categoryProducts[0].category.name;
			categoryTitle.innerHTML = `✢ ${categoryName} ✢`;

			products.innerHTML = generateSortedHtml(categoryProducts, false);
		} else {
			emptyItem.innerHTML = `<span>THIS CATEGORY IS EMPTY 🫧</span>
			<span style="font-size: 21px">Please Wait for The Products You will soon meet ••• 🚚 </span>
			`;
			checkBoxDiv.style.display = 'none';
			sortSelectOption.style.display = 'none';
		}
	})
	.catch(err => console.log(err));

function generateSortedHtml(products, hideSoldOut) {
	let sotedProduct = '';
	let price = '';

	if (selectedSortType === 'newest') {
		products.sort((a, b) => b._id.localeCompare(a._id));
	} else if (selectedSortType === 'highest') {
		products.sort((a, b) => b.price - a.price);
	} else if (selectedSortType === 'lowest') {
		products.sort((a, b) => a.price - b.price);
	}

	products.forEach(newProduct => {
		if (hideSoldOut && newProduct.currentAmount <= 0) {
			return;
		}

		price =
			newProduct.currentAmount <= 0
				? SOLD_OUT_MESSAGE
				: '💎 KRW ' + newProduct.price.toLocaleString();

		sotedProduct += `<li>
					<a class='icon-img'
						href='/products?productId=${newProduct._id}' target='_self'>
						<img class="product-img"
						src='${newProduct.imageURL}'/>
						<div class="product-title">✧ ${newProduct.title}</div>
						<div class='product-price'>${price}</div>
						</div>
					</a>
				</li>`;
	});

	return sotedProduct;
}
