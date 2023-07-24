import { main } from '/Common/index.js';
await main();

const orderId = document.querySelector('#orderId');
const orderPassword = document.querySelector('#orderPassword');
const orderButton = document.querySelector('#orderButton');

orderButton.addEventListener('click', e => {
	e.preventDefault();

	fetch(`/api/orders/${orderId.value}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password: orderPassword.value,
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
		.then(({ guestOrderDetail }) => {
			console.log('value', guestOrderDetail._id);

			window.location.href = `/guest/orders/?orderId=${guestOrderDetail._id}`;
		})
		.catch(err => console.log(err));
});
