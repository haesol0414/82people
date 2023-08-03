import { main, ConfirmToken } from '/Common/index.js';
await main();
const hasToken = await ConfirmToken();

// const deleteBtn = document.querySelectorAll('#delete-btn');
// const modifyBtn = document.querySelectorAll('#modify-btn');
const createBtn = document.querySelector('#create-btn');
const categoryInput = document.querySelector('#category-input');
const categoryList = document.querySelector('.category-box');

let categories = '';
function getCategory(category) {
	const newCategory = `								
	<li class="category-list">
		<span>${category.name}</span>
		<div>
			<input type="radio" name="category" value="${category.name}">
		</div>
	</li>`;

	categories += newCategory;
	categoryList.innerHTML = categories;
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
			categoryList.innerHTML =
				'<li style="padding:20px 0; font-size: 24px;">카테고리가 없습니다.</li>';
		}
	})
	.catch(err => console.log(err));

// 카테고리 추가 버튼
createBtn.addEventListener('click', () => {
	fetch(`/api/admin/category`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: hasToken,
		},
		body: JSON.stringify({
			categoryName: categoryInput.value,
		}),
	})
		.then(res => {
			window.location.reload();

			return res.json();
		})
		.catch(err => alert(err));
});

// 카테고리 삭제 버튼
const deleteBtn = document.querySelector('#delete-btn');

function deleteCategory() {
	const radios = document.querySelectorAll("input[type='radio']");

	let categoryName = '';

	radios.forEach(function (radio) {
		if (radio.checked) {
			categoryName = radio.value;
		}
	});

	if (categoryName.length === 0) {
		return alert('삭제할 카테고리를 선택하세요.');
	} else if (radios.length < 6) {
		return alert('카테고리가 5개 미만일 수 없습니다.');
	}
	
	if (confirm(`${categoryName} 카테고리를 삭제 하시겠습니까?`)) {
		fetch(`/api/admin/category`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: hasToken,
			},
			body: JSON.stringify({
				categoryName: categoryName,
			}),
		})
			.then(res => res.json())
			.catch(err => alert(err))
			.then(json => {
				alert(json.message);
				window.location.reload();
			})
			.catch(err => alert(err));
	}
}

deleteBtn.addEventListener('click', deleteCategory);

// window.onload = function () {
// 	// 카테고리 삭제 버튼
// 	const deleteBtn = document.querySelectorAll('#delete-btn');

// 	for (let i = 0; i < deleteBtn.length; i++) {
// 		deleteBtn[i].addEventListener('click', event => {
// fetch(`/api/admin/category`, {
// 	method: 'DELETE',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		Authorization: hasToken,
// 	},
// 	body: JSON.stringify({
// 		categoryName: event.target.value,
// 	}),
// })
// 	.then(res => res.json())
// 	.catch(err => alert(err))
// 	.then(json => {
// 		alert(json.message);
// 		window.location.reload();
// 	})
// 	.catch(err => alert(err));
// 		});
// 	}
// };
