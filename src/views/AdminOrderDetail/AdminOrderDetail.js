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

let purchase;
let addressInformation;

// 주문 상세 가져오기

fetch(`/api/orders/history/${orderId}`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then(res => res.json())
	.then(({ orderDetail }) => {
		console.log(orderDetail);

		// 유저 & 상품 정보
		purchase = orderDetail.purchase;
		addressInformation = orderDate.innerText = new Date(
			orderDetail.createdAt
		).toLocaleString();
		orderuser.innerText = orderDetail.email.toLocaleString();
		products.innerHTML = orderDetail.purchase.map(getProducts).join('');
		orderNumber.innerHTML = orderDetail._id;

		// 배송지 정보
		addressInformation = orderDetail.addressInformation;
		orderRecipient.innerHTML = addressInformation.recipient;
		orderShippingRequest.innerHTML = addressInformation.shippingRequest;
		orderPhone.innerHTML = addressInformation.phone;
		orderAddress.innerHTML = addressInformation.address;
		orderDetailAddress.innerHTML = addressInformation.detailAddress;

		// 가격 정보
		orderShippingPrice.innerHTML = `${Number(
			orderDetail.totalPrice.shippingPrice
		).toLocaleString()} 원`;
		orderTotalPrice.innerHTML = `${Number(
			orderDetail.totalPrice.totalProductsPrice
		).toLocaleString()} 원`;
		orderOrderPrice.innerHTML = `${(
			Number(orderDetail.totalPrice.totalProductsPrice) +
			Number(orderDetail.totalPrice.shippingPrice)
		).toLocaleString()} 원`;

		if (orderDetail.shippingStatus === '상품 준비 중') {
			shippingStatusOption.options[0].setAttribute('selected', true);
			orderCancleBtn.style.display = 'none';
		}
		if (orderDetail.shippingStatus === '배송 중') {
			shippingStatusOption.options[1].setAttribute('selected', true);
			orderCancleBtn.style.display = 'none';
		}
		if (orderDetail.shippingStatus === '배송 완료') {
			shippingStatusOption.options[2].setAttribute('selected', true);
			orderCancleBtn.style.display = 'none';
		}
		if (orderDetail.shippingStatus === '주문 취소') {
			shippingStatusOption.options[3].setAttribute('selected', true);
			shippingStatusOption.disabled = true;
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
	if (event.target.value === '주문 취소') {
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
	} else {
		fetch(`/api/orders/${orderId}`, {
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
				alert('[관리자] 배송 상태 변경');

				window.location.reload();
				return res.json();
			})
			.catch(err => console.log('err', err));
	}
});

// 주문 내역 삭제
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

const editAddressBtn = document.querySelector('#editAddressBtn'); // 배송지 수정 버튼
const modal = document.querySelector('.modal'); // 모달 창 자체
const closeModalBtn = document.querySelector('.close'); // 모달창 내부 닫기 버튼
const newAddressSubmit = document.querySelector('#modalSubmit'); // 모달창 내부 수정 버튼 (API 호출)

// 모달 인풋들
const newRecipientInput = document.querySelector('#newRecipient');
const newPhoneInput = document.querySelector('#newPhone');
const newMainAddressInput = document.querySelector('#newMainAddress');
const newDetailAddressInput = document.querySelector('#newDetailAddress');
const newRequestInput = document.querySelector('#newRequest');

// 모달 열기 버튼 클릭 시
editAddressBtn.addEventListener('click', function () {
	console.log(addressInformation);
	// 기존 데이터 뿌리기
	newRecipientInput.value = addressInformation.recipient;
	newPhoneInput.value = addressInformation.phone;
	newMainAddressInput.value = addressInformation.address;
	newDetailAddressInput.value = addressInformation.detailAddress;
	newRequestInput.value = addressInformation.shippingRequest;

	// 모달 열기
	modal.style.display = 'block';

	// 수정 버튼 클릭 시 API 요청
	newAddressSubmit.addEventListener('click', function () {
		if (
			confirm(
				`입력하신 정보로 배송지를 변경하시겠습니까? 다시 한 번 확인해 주세요!\n\n수령인: ${newRecipientInput.value}\n전화번호: ${newPhoneInput.value}\n배송지: ${newMainAddressInput.value}\n상세 주소: ${newDetailAddressInput.value}\n배송시 요청사항: ${newRequestInput.value}`
			)
		) {
			fetch(`/api/admin/orders/${orderId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: hasToken,
				},
				body: JSON.stringify({
					recipient: newRecipientInput.value,
					phone: newPhoneInput.value,
					address: newMainAddressInput.value,
					detailAddress: newDetailAddressInput.value,
					shippingRequest: newRequestInput.value,
				}),
			})
				.then(res => {
					if (res.ok) {
						alert('배송지 수정 성공!');
					} else {
						alert('배송지 수정 실패');
					}
				})
				.catch(err => console.log('err', err));
		}
	});
});

// 모달 닫기 버튼 클릭 시
closeModalBtn.addEventListener('click', function () {
	modal.style.display = 'none';
	window.location.href = `/admin/orders/orderId/?orderId=${orderId}`;
});
