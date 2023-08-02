import { main } from '/Common/index.js';
await main();

const products = document.querySelector('.icons');
// const categoryTag = document.querySelector('.category');
const urlStr = window.location.href;
const categoryName = new URL(urlStr).searchParams.get('category');
console.log(categoryName);
// 카테고리 모델의 name명으로 된 params가 가져와질것임
// name으로 아이디 썰어오기
// 전체 카테고리 이름과 _id가 나오는 API
// fetch(`/api/category`, {
// 	method: 'GET',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// })
// 	.then(res => {
// 		if (res.ok) {
// 			return res.json();
// 		} else {
// 			throw new Error('조회 실패');
// 		}
// 	})
// 	.catch(err => {
// 		alert(err);
// 	})
// 	.then(({ allCategory }) => {
// 		getCategoryId(allCategory);
// 	})
// 	.catch(err => console.log(err));

// let categoryId = '';
// const getCategoryId = allCategory => {
// 	console.log(allCategory);

// 	allCategory.forEach(category => {
// 		if (category.name === categoryName) {
// 			categoryId = category._id;
// 			console.log(category._id);
// 		}
// 	});
// };

// 카테고리별 상품 화면에 뿌리기
const getCategoryProducts = newProduct => {
	return `<li>
		<a class='icon-img'
			href='/products?productId=${newProduct._id}' target='_self'>
			<img class="product-img"
			src='${newProduct.imageURL}'/>
			<div class="product-title">${newProduct.title}</div>
			<div class='product-price'>KRW ${newProduct.price.toLocaleString()}</div>
			</div>
		</a>
    </li>`;
};

// 카테고리 id로 카테고리별 상품 가져오기
fetch(`/api/products/category/${categoryName}`, {
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

		products.innerHTML = categoryProducts.map(getCategoryProducts).join('');
	})
	.catch(err => console.log(err));
