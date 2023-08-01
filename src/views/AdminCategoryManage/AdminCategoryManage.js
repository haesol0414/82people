import { main, ConfirmToken } from '/Common/index.js';
await main();
const hasToken = await ConfirmToken();

const modifyBtn = document.querySelectorAll('#modify-btn');
const deleteBtn = document.querySelectorAll('#delete-btn');
const info = document.getElementById('info');

let categories = '';
function getCategory(category) {
	const newCategory = `								
	<div class="category-list">
		<span>${category.name}</span>
		<div>
			<button id="modify-btn">수정</button>
			<button id="delete-btn">삭제</button>
		</div>
	</div>`;

	categories += newCategory;
	info.innerHTML = categories;
}

// 카테고리 불러오기
fetch(`/api/category`, {
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
	.then(({ allCategory }) => {
		if (allCategory.length !== 0) {
			allCategory.map(getCategory);
		} else {
			info.innerHTML =
				'<li style="padding:20px 0; font-size: 24px;">카테고리가 없습니다.</li>';
		}
	})
	.catch(err => console.log(err));

// // 카테고리 수정 버튼
// modifyBtn.addEventListener('click', () => {
// 	fetch(`/api/admin/items/${itemId}`, {
// 		method: 'PATCH',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: hasToken,
// 		},
// 		body: JSON.stringify({
// 			title: titleInput.value,
// 			price: priceInput.value,
// 			manufacturer: manufacturerInput.value,
// 			description: descriptionInput.value,
// 			currentAmount: currentAmountInput.value,
// 			salesAmount: salesAmountInput.value,
// 			category: categoryInput.value,
// 			imageURL: imgInput.value,
// 		}),
// 	})
// 		.then(res => res.json())
// 		.catch(err => alert(err))
// 		.then(json => {
// 			alert(json.message);
// 			window.location.reload();
// 		})
// 		.catch(err => alert(err));
// });

// // 카테고리 삭제 버튼
// createBtn.addEventListener('click', () => {
// 	fetch(`/api/admin/items/addItem`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: hasToken,
// 		},
// 		body: JSON.stringify({
// 			productInfo: {
// 				title: titleInput.value,
// 				price: priceInput.value,
// 				manufacturer: manufacturerInput.value,
// 				description: descriptionInput.value,
// 				currentAmount: currentAmountInput.value,
// 				salesAmount: salesAmountInput.value,
// 				category: categoryInput.value,
// 				imageURL: imgInput.value,
// 			},
// 		}),
// 	})
// 		.then(res => res.json())
// 		.catch(err => alert(err))
// 		.then(json => {
// 			alert(json.message);
// 			location.href = `/admin/items`;
// 		})
// 		.catch(err => alert(err));
// });
