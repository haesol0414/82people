const total = document.querySelector('.icons.total');
const best = document.querySelector('.icons.best');

// window.addEventListener('DOMContentLoaded', () => {
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
		best.innerHTML = bestProducts.map(getProducts).join('');
		total.innerHTML = totalProducts.map(getProducts).join('');
	})
	.catch(err => console.log(err));
// });

//상품상세 불러오기
const getProducts = newProduct => {
	// ${newProduct.imageURL}
	return `<li>
    <a class='icon-img'
    href='/products?id=${newProduct._id}' target='_self' id='bring-list'>
	<div class="icon-img">
    <img class='icon-img'
    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE2O8ul5WH3_NdITW8bd4_7gpd6CoSVo1qUY2IHTfE8A&s' alt="product-item"/>
	</div>
    <div class="contents1-blod">${newProduct.title}</div>
    <div class='contents3'>${newProduct.price.toLocaleString()} 원</div>
    </div>
    </a>
    </li>`;
};
