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
				throw new Error('조회 실패');
			}
		})
		.catch(err => {
			alert(err);
		})
		.then(({ orderDetail }) => {
			console.log('value', orderDetail._id);

			window.location.href = `/guest/orders/history/?orderId=${orderDetail._id}`;
		})
		.catch(err => console.log(err));
});
