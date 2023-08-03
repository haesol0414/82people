import { main, ConfirmToken } from '/Common/index.js';
await main();
const hasToken = await ConfirmToken();

const urlStr = window.location.href;
const orderId = new URL(urlStr).searchParams.get('orderId');
const orderNumber = document.querySelector('#order-number');
const orderuser = document.querySelector('#order-user');
const orderDate = document.querySelector('.date');
const orderAddress = document.querySelector('#address');
const orderDetailAddress = document.querySelector('#address-detail');
const orderPhone = document.querySelector('#phone');
const orderRecipient = document.querySelector('#recipient');
const orderShippingRequest = document.querySelector('#shippingRequest');
const orderShippingPrice = document.querySelector('#shippingPrice');
const orderTotalPrice = document.querySelector('#totalPrice');
const orderOrderPrice = document.querySelector('#orderPrice');
const products = document.querySelector('.products-list');
const shippingStatusOption = document.querySelector('#shippingStatus');
const orderCancleBtn = document.querySelector('#orderCancle');

// 확인된 토큰으로 서버에게 요청해서 현재 유저 정보받아오기
fetch(`/api/admin/orders/${orderId}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		Authorization: hasToken,
	},
})
	.then(res => res.json())
	.then(({ orderDetails }) => {
		// 받아온 정보들을 위에 태그값에 넣어서 화면에 보여주기
		console.log(orderDetails);
		orderNumber.innerHTML = orderDetails._id;
		orderRecipient.innerHTML = orderDetails.addressInformation.recipient;
		orderShippingRequest.innerHTML =
			orderDetails.addressInformation.shippingRequest;
		orderPhone.innerHTML = orderDetails.addressInformation.phone;
		orderAddress.innerHTML = orderDetails.addressInformation.address;
		orderDetailAddress.innerHTML =
			orderDetails.addressInformation.detailAddress;
		orderShippingPrice.innerHTML = `${Number(
			orderDetails.totalPrice.shippingPrice
		).toLocaleString()} 원`;
		orderTotalPrice.innerHTML = `${Number(
			orderDetails.totalPrice.totalProductsPrice
		).toLocaleString()} 원`;
		orderOrderPrice.innerHTML = `${(
			Number(orderDetails.totalPrice.totalProductsPrice) +
			Number(orderDetails.totalPrice.shippingPrice)
		).toLocaleString()} 원`;
		orderDate.innerText = new Date(orderDetails.createdAt).toLocaleString();
		orderuser.innerText = orderDetails.email.toLocaleString();
		products.innerHTML = orderDetails.purchase.map(getProducts).join('');

		if (orderDetails.shippingStatus === '상품 준비 중') {
			shippingStatusOption.options[0].setAttribute('selected', true);
			orderCancleBtn.style.display = 'none';
		}
		if (orderDetails.shippingStatus === '배송 중') {
			shippingStatusOption.options[1].setAttribute('selected', true);
			orderCancleBtn.style.display = 'none';
		}
		if (orderDetails.shippingStatus === '배송 완료') {
			shippingStatusOption.options[2].setAttribute('selected', true);
			orderCancleBtn.style.display = 'none';
		}
		if (orderDetails.shippingStatus === '주문 취소') {
			shippingStatusOption.options[3].setAttribute('selected', true);
		}
	});

const getProducts = orders => {
	return `
		<li>
		<div class="thumbnail">
			<img src="${orders.imageURL}" />
			<span class="title">${orders.title}</span>
		</div>
		<div>${orders.orderAmount} 개 / ${(
		orders.price * orders.orderAmount
	).toLocaleString()}원</div>
	</li>
		`;
};

shippingStatusOption.addEventListener('change', event => {
	fetch(`/api/admin/orders/${orderId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: hasToken,
		},
		body: JSON.stringify({
			shippingStatus: event.target.value,
		}),
	})
		.then(res => {
			console.log('shippingStatusOption', res);
			window.location.reload();
			return res.json();
		})
		.catch(err => console.log('err', err));
});

// 배송지 수정 요청 Q/A로 빼버릴지 고민즁
// updateAddressBtn.addEventListener('click', event => {
// 	fetch(`/api/admin/orders/${orderId}`, {
// 		method: 'FETCH',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: hasToken,
// 		},
// 		body: JSON.stringify({
// 			shippingStatus: event.target.value,
// 		}),
// 	})
// 		.then(res => {
// 			console.log('shippingStatusOption', res);
// 			window.location.reload();
// 			return res.json();
// 		})
// 		.catch(err => console.log('err', err));
// });

// 주문 취소
orderCancleBtn.addEventListener('click', () => {
	if (confirm('해당 주문 내역을 삭제 하시겠습니까?')) {
		fetch(`/api/admin/orders/${orderId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: hasToken,
			},
		})
			.then(res => {
				alert(`주문 내역이 삭제되었습니다`);
				window.location.href = '/admin/orders';
				return res.json();
			})
			.catch(err => console.log('err', err));
	}
});
