import { main, ConfirmToken } from '/Common/index.js';
await main();
const hasToken = await ConfirmToken();

// 인풋 태그들
const titleInput = document.querySelector('#ittem-title');
const priceInput = document.querySelector('#item-price');
const manufacturerInput = document.querySelector('#item-manufacturer');
const descriptionInput = document.querySelector('#item-description');
const currentAmountInput = document.querySelector('#item-current-amount');
const salesAmountInput = document.querySelector('#item-sales-amount');
const urlStr = window.location.href;
const itemId = new URL(urlStr).searchParams.get('itemId');

fetch(`/api/products/${itemId}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then(res => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error('조회 실패');
		}
	})
	.catch(err => {
		alert(err);
	})
	.then(({ productInfo }) => {
		console.log(productInfo);
		const {
			title,
			price,
			manufacturer,
			description,
			currentAmount,
			salesAmount,
		} = productInfo;
		titleInput.value = title;
		priceInput.value = price;
		manufacturerInput.value = manufacturer;
		descriptionInput.value = description;
		currentAmountInput.value = currentAmount;
		salesAmountInput.value = salesAmount;
	});

// 상품 수정
const modifyBtn = document.querySelector('#modify-btn');
console.log(modifyBtn);
modifyBtn.addEventListener('click', () => {
	fetch(`/api/admin/items/${itemId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: hasToken,
		},
		body: JSON.stringify({
			title: titleInput.value,
			price: priceInput.value,
			manufacturer: manufacturerInput.value,
			description: descriptionInput.value,
			currentAmount: currentAmountInput.value,
			salesAmount: salesAmountInput.value,
		}),
	})
		.then(res => res.json())
		.catch(err => alert(err))
		.then(json => {
			alert(json.message);
			window.location.reload();
		})
		.catch(err => alert(err));
});
