import { main } from '/Common/index.js';
await main();

const urlStr = window.location.href;
const orderId = new URL(urlStr).searchParams.get('orderId');
const menuBar = document.querySelector('.myparty-menubar');
const orderCancleBtn = document.querySelector('#orderCancle');

function checkJWTTokenInCookie() {
	const cookies = document.cookie.split(';'); // 모든 쿠키 가져오기
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// 	JWT 토큰 쿠키인지 확인
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
if (hasToken) {
	console.log('JWT 토큰이 쿠키에 존재합니다.');
	menuBar.style.display = 'block';

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
	menuBar.style.display = 'none';
	document.querySelector('#back').style.display = 'none';
}

const orderNumber = document.querySelector('#order-number');
const orderStatus = document.querySelector('#order-status');
const orderDate = document.querySelector('.date');
const orderAddress = document.querySelector('#address');
const orderPhone = document.querySelector('#phone');
const orderRecipient = document.querySelector('#recipient');
const orderShippingRequest = document.querySelector('#shippingRequest');
const orderShippingPrice = document.querySelector('#shippingPrice');
const orderTotalPrice = document.querySelector('#totalPrice');
const orderOrderPrice = document.querySelector('#orderPrice');
const itemsList = document.querySelector('.products-list ul');
let items = '';
let purchase;

fetch(`/api/orders/history/${orderId}`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then(res => res.json())
	.then(({ orderDetail }) => {
		purchase = orderDetail.purchase;

		const { shippingStatus, createdAt } = orderDetail;
		const { address, detailAddress, phone, recipient, shippingRequest } =
			orderDetail.addressInformation;
		const { shippingPrice, totalProductsPrice } = orderDetail.totalPrice;

		orderNumber.innerText = orderId;
		orderStatus.innerText = shippingStatus;
		orderDate.innerText = new Date(createdAt).toLocaleString();
		orderAddress.innerText = `${address}, ${detailAddress}`;
		orderPhone.innerText = phone;
		orderRecipient.innerText = recipient;
		orderShippingRequest.innerText = shippingRequest;
		orderShippingPrice.innerText = `${shippingPrice.toLocaleString()}원`;
		orderTotalPrice.innerText = `${totalProductsPrice.toLocaleString()}원`;
		orderOrderPrice.innerText = `${(
			totalProductsPrice + shippingPrice
		).toLocaleString()}원`;
		orderDetail.purchase.map(getOrders);
	})
	.catch(err => console.log(err));

// 주문상품 화면 그려주기
function getOrders(orders) {
	const newItem = `<li>
		<div class="thumbnail">
			<img src="${orders.imageURL}" />
			<span class="title">${orders.title}</span>
		</div>
		<div>${orders.orderAmount} 개 / ${(
		orders.price * orders.orderAmount
	).toLocaleString()}원</div>
	</li>`;
	items += newItem;
	itemsList.innerHTML = items;
}

// 주문 취소
orderCancleBtn.addEventListener('click', () => {
	if (confirm('주문을 취소 하시겠습니까?')) {
		fetch(`/api/orders/history/${orderId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				purchase,
			}),
		})
			.then(res => {
				alert(`주문이 취소되었습니다.`);
				window.location.reload();

				return res.json();
			})
			.catch(err => console.log('err', err));
	}
});
