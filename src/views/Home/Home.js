import { main } from '/Common/index.js';
await main();

const total = document.querySelector('.products-total');
const best = document.querySelector('.products-best');

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

let bestItems = '';
const getBestProducts = bestProduct => {
	const newBestItem = `<li>
		<a class='product-link'
		href='/products?productId=${bestProduct._id}' target='_self'>
		<img class="product-img"
		src='${bestProduct.imageURL}' alt="product-item"/>
		</div>
		</a>
    </li>`;

	bestItems += newBestItem;
	best.innerHTML = bestItems;
};

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
