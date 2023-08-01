import { main, ConfirmToken } from '/Common/index.js';
await main();
const hasToken = await ConfirmToken();

const itemsList = document.querySelector('#table-body');
fetch('/api/products', {
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
	.then(({ totalProducts }) => {
		console.log('totalProducts', totalProducts);
		totalProducts.map(getItems);
	})
	.catch(err => console.log(err));

let items = '';
const getItems = item => {
	const newItem = `
		<td><input type="radio"></td>
		<td name="image">
		<div class="img-box">
			<img src="${item.imageURL}" />
		</div>
		</td>
		<td name="name">${item.title}</td>
		<td name="category">${item.category}</td>
		<td name="price">${item.price.toLocaleString()}원</td>
		<td name="number">${item.currentAmount}</td>
		<td><button id="modify-btn" value=${item._id}>UPDATE</button></td>
	</tr>`;

	items += newItem;
	itemsList.innerHTML = items;
};

window.onload = function () {
	const modifyBtn = document.querySelectorAll('#modify-btn');

	for (let i = 0; i < modifyBtn.length; i++) {
		modifyBtn[i].addEventListener('click', event => {
			const itemId = event.target.value;
			location.href = `/admin/items/itemId/?itemId=${itemId}`;
		});
	}
};

const createBtn = document.querySelector('#createBtn');
console.log(createBtn);
createBtn.addEventListener('click', () => {
	location.href = `/admin/items/addItem`;
});
