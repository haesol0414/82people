import { main, ConfirmToken } from '/Common/index.js';
await main();
const hasToken = await ConfirmToken();

const itemsList = document.querySelector('.history-list');
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
		<div><span>${
			order.orderAmount
		}</span> 개 &#215; <span>${order.price.toLocaleString()}</span>원</div>
	</li>`;
		orderItem += orderLi;
	});

	const newItem = `<li>
	<article>
		<div class="info">
			<div>
				<span class="date">${new Date(orders.createdAt).toLocaleString()}</span>
				<span class="status">${orders.shippingStatus}</span>
			</div>
			<a
				href="/myPage/orders/history/?orderId=${orders._id}"
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

fetch('/api/orders/history', {
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
			throw new Error('로그인한 회원만 사용 가능합니다.');
		}
	})
	.catch(err => {
		window.location.href = '/';
		console.log(err);
	})
	.then(json => {
		if (json.userOrderHistory.length !== 0) {
			json.userOrderHistory.reverse().map(getOrders);
		} else {
			itemsList.innerHTML =
				'<li style="padding:20px">주문하신 내역이 없습니다.</li>';
		}
	})
	.catch(err => console.log(err));
