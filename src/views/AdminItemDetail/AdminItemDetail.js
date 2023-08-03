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
const imgInput = document.querySelector('#item-img');
const modifyBtn = document.querySelector('#modify-btn');
const createBtn = document.querySelector('#create-btn');
const urlStr = window.location.href;
const itemId = new URL(urlStr).searchParams.get('itemId');

// 1. 카테고리 뿌리기
let categoryId = '';
let categories = '';
const categoryList = document.querySelector('.category');
function getCategory(category) {
	const newCategory = `
	<p>		
		<input type=radio name="category" value="${category._id}"> ${category.name}</ input>
	</p>`;

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

window.addEventListener('load', function () {
	// url에 itemId가 있으면 수정모드, 없으면 추가모드
	if (itemId) {
		createBtn.style.display = 'none';

		// 기존 데이터 뿌리기
		fetch(`/api/products/${itemId}`, {
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
					throw new Error('조회 실패');
				}
			})
			.catch(err => {
				alert(err);
			})
			.then(({ productInfo }) => {
				const categoryInput = document.querySelectorAll("input[type='radio']");
				console.log(productInfo);
				const {
					title,
					price,
					manufacturer,
					description,
					currentAmount,
					salesAmount,
					category,
					imageURL,
				} = productInfo;
				// 받아온 데이터 화면에 뿌리기
				titleInput.value = title;
				priceInput.value = price;
				manufacturerInput.value = manufacturer;
				descriptionInput.value = description;
				currentAmountInput.value = currentAmount;
				salesAmountInput.value = salesAmount;
				/* 1. 받아온 카테고리 값(아이디값)과 
				쿼리셀렉터로 받아온 input(radio) 태그들의 value 중 일치하는 값이 있으면 */
				/* 2. 해당 input(radio) 옵션이 checked로 변경되어 체크된 채 화면에 뿌려져야 함*/
				categoryInput.forEach(function (emptyRadio) {
					if (emptyRadio.value === category._id) {
						emptyRadio.checked = true;
					}
				});
				imgInput.value = imageURL;
			});

		// 상품 수정 버튼 눌렀을 때
		modifyBtn.addEventListener('click', () => {
			const categoryInput = document.querySelectorAll("input[type='radio']");

			categoryInput.forEach(function (category) {
				if (category.checked) {
					categoryId = category.value;
				}
			});
			console.log(categoryId);

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
					category: categoryId,
					imageURL: imgInput.value,
				}),
			})
				.then(res => res.json())
				.catch(err => alert('상품 수정 실패', err))
				.then(json => {
					alert(json.message);
					window.location.reload();
				})
				.catch(err => console.log(err));
		});
	} else {
		modifyBtn.style.display = 'none';

		createBtn.addEventListener('click', () => {
			const categoryInput = document.querySelectorAll("input[type='radio']");

			categoryInput.forEach(function (category) {
				if (category.checked) {
					categoryId = category.value;
				}
			});
			console.log(categoryId);

			fetch(`/api/admin/items/addItem`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: hasToken,
				},
				body: JSON.stringify({
					productInfo: {
						title: titleInput.value,
						price: priceInput.value,
						manufacturer: manufacturerInput.value,
						description: descriptionInput.value,
						currentAmount: currentAmountInput.value,
						salesAmount: salesAmountInput.value,
						category: categoryId,
						imageURL: imgInput.value,
					},
				}),
			})
				.then(res => res.json())
				.catch(err => alert('상품 등록 실패 ', err))
				.then(json => {
					alert(json.message);
					location.href = `/admin/items`;
				})
				.catch(err => alert(err));
		});
	}
});
