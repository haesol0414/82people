import { main } from '/Common/index.js';
await main();

const orderId = document.querySelector('#orderId');
const orderPassword = document.querySelector('#orderPassword');
const orderButton = document.querySelector('#orderButton');

orderButton.addEventListener('click', e => {
	e.preventDefault();

	fetch(`/api/orders/history/${orderId.value}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			guestPassword: orderPassword.value,
		}),
	})
		.then(res => {
			console.log(res);
			if (res.ok) {
				return res.json();
			} else {
				alert('주문 번호 또는 비밀번호를 확인해 주세요.');
			}
		})
		.catch(err => {
			console.log(err);
		})
		.then(({ orderDetail }) => {
			console.log('value', orderDetail._id);

			window.location.href = `/guest/orders/history/?orderId=${orderDetail._id}`;
		})
		.catch(err => console.log(err));
});
