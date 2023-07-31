import { main } from '/Common/index.js';
await main();

let items = '';
// 주문상품 화면 그려주기
function getOrders(orders) {
	let orderItem = '';
	orders.purchase.map(order => {
		console.log(order);
		const orderLi = `<li>
			<div class="thumbnail">	
				<img src="${order.imageURL}" />
				<span class="title">${order.title}</span>
				</div>
			<div>
			<span>${
				order.orderAmount
			}개 &#215; ${order.price.toLocaleString()}</span>원</div>
		</li>`;
		orderItem += orderLi;
	});

	const newItem = `<li>
	<article>
		<div class="info">
			<div>
				<span class="date">${new Date(orders.createdAt).toLocaleString()} 🦋 ${
		orders.email
	}</span>
				<span class="status">${orders.shippingStatus}</span>
			</div>
			<a
				href="/admin/orders/orderId/?orderId=${orders._id}"
				class="detail-btn"
				> Details ></a
			>
		</div>
		<ul class="products-list">
			${orderItem}
		</ul>
	</article>
	</li>`;
	items += newItem;
	itemsList.innerHTML = items;
}

// 브라우저 쿠키에 토큰이 있는지 확인
function checkJWTTokenInCookie() {
	const cookies = document.cookie.split(';'); // 모든 쿠키 가져오기
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// JWT 토큰 쿠키인지 확인
		if (cookie.startsWith('userToken=')) {
			const jwtToken = cookie.split('=')[1]; // JWT 토큰 값 가져오기
			// 토큰이 유효한지 여부 확인
			if (jwtToken) {
				return jwtToken; // 유효한 토큰이 존재함
			}
		}
	}
}

const hasToken = checkJWTTokenInCookie();

const itemsList = document.querySelector('.history-list');

if (hasToken) {
	console.log('JWT 토큰이 쿠키에 존재합니다.');

	const base64Url = hasToken.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);
	const tokenData = JSON.parse(jsonPayload);
	document.querySelector('#user-name').innerText = tokenData.name;
} else {
	console.log('JWT 토큰이 쿠키에 존재하지 않습니다.');
	window.location.href = '/';
}

fetch(`/api/admin/orders`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		Authorization: hasToken,
	},
})
	.then(res => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error('관리자만 사용 가능합니다.');
		}
	})
	.catch(err => {
		window.location.href = '/';
		console.log(err);
	})
	.then(json => {
		console.log(json);
		if (json.orders.length !== 0) {
			json.orders.reverse().map(getOrders);
		} else {
			itemsList.innerHTML =
				'<li style="padding:20px">주문 내역이 없습니다.</li>';
		}
	})
// 	.catch(err => console.log(err));

// function deleteSelectedRows() {
// 	const userConfirm = confirm('선택된 상품을 정말 삭제하시겠습니까?');
// 	if (userConfirm) {
// 		let radioes = document.querySelectorAll(
// 			".product tbody input[type='radio']"
// 		);
// 		let rowsToDelete = [];

// 		radioes.forEach(function (radio) {
// 			if (radio.checked) {
// 				rowsToDelete.push(radio.parentNode.parentNode);
// 			}
// 		});

// 		rowsToDelete.forEach(function (row) {
// 			row.parentNode.removeChild(row); // 화면에서 삭제
// 			count.innerHTML = Number(count.innerText) - 1;
// 			const id = row.getAttribute('product_id');
// 			API.delete('/api/admin/product/', id); // API에서 삭제
// 		});
// 		getProductList();
// 		alert('삭제되었습니다.');
// 	}
// }
// const deleteBtn = document.getElementById('deleteRows');
// deleteBtn.addEventListener('click', deleteSelectedRows);
