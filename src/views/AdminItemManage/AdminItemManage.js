import { main, ConfirmToken } from '/Common/index.js';
await main();
const hasToken = await ConfirmToken();

const itemsList = document.querySelector('#table-body');
const createBtn = document.querySelector('#createBtn');

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
	<tr name="table-body" product_id="${item._id}">
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

// 상품 추가 버튼
createBtn.addEventListener('click', () => {
	location.href = `/admin/items/addItem`;
});

// 상품 삭제
const deleteBtn = document.getElementById('deleteBtn');

function deleteSelectedRows() {
	const userConfirm = confirm('선택된 상품을 정말 삭제하시겠습니까?');
	if (userConfirm) {
		let radioes = document.querySelectorAll(
			".product tbody input[type='radio']"
		);
		let rowsToDelete = [];

		radioes.forEach(function (radio) {
			if (radio.checked) {
				rowsToDelete.push(radio.parentNode.parentNode);
			}
		});

		rowsToDelete.forEach(function (row) {
			row.parentNode.removeChild(row); // 화면에서 삭제
			const id = row.getAttribute('product_id');
			console.log(id);

			fetch('/api/admin/items', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: hasToken,
				},
				body: JSON.stringify({
					productId: id,
				}),
			})
				.then(res => res.json())
				.catch(err => console.log(err))
				.then(json => {
					console.log(json);
					// window.location.reload();
				})
				.catch(err => console.log(err));
		}); // API에서 삭제
	}
}

deleteBtn.addEventListener('click', deleteSelectedRows);

window.onload = function () {
	// 상품 수정 버튼
	const modifyBtn = document.querySelectorAll('#modify-btn');

	for (let i = 0; i < modifyBtn.length; i++) {
		modifyBtn[i].addEventListener('click', event => {
			const itemId = event.target.value;
			location.href = `/admin/items/itemId/?itemId=${itemId}`;
		});
	}
};
