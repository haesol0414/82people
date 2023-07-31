import { main } from '/Common/index.js';
await main();

// 브라우저 쿠키에 토큰이 있는지 확인
function checkJWTTokenInCookie() {
	const cookies = document.cookie.split(';'); // 모든 쿠키 가져오기
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// JWT 토큰 쿠키인지 확인
		if (cookie.startsWith('userToken=')) {
			const jwtToken = cookie.split('=')[1]; // JWT 토큰 값 가져오기
			// 토큰이 유효한지 여부 확인
			if (jwtToken) {
				return jwtToken; // 유효한 토큰이 존재함
			}
		}
	}
}

// 확인된 토큰을 부르는 이름
const hasToken = checkJWTTokenInCookie();
// console.log(hasToken);

if (hasToken) {
	console.log('JWT 토큰이 쿠키에 존재합니다.');

	const base64Url = hasToken.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);
	const tokenData = JSON.parse(jsonPayload);
	document.querySelector('#user-name').innerText = tokenData.name;
} else {
	console.log('JWT 토큰이 쿠키에 존재하지 않습니다.');
}

// 인풋 태그들
const titleInput = document.querySelector('#ittem-title');
const priceInput = document.querySelector('#item-price');
const manufacturerInput = document.querySelector('#item-manufacturer');
const descriptionInput = document.querySelector('#item-description');
const currentAmountInput = document.querySelector('#item-current-amount');
const salesAmountInput = document.querySelector('#item-sales-amount');
// 회원정보수정하는 버튼
const modifyBotton = document.querySelector('.modify-botton');

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

// 회원정보수정 버튼을 클릭했을 떄
// modifyBotton.addEventListener('click', () => {
// 	// 확인된 토큰으로 서버에게 수정 요청보내기
// 	fetch('/api/users', {
// 		method: 'PATCH',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: hasToken,
// 		},
// 		body: JSON.stringify({
// 			email: receiverEmailInput.value,
// 			password: receiverPasswordInput.value,
// 			address: '',
// 		}),
// 	})
// 		.then(res => res.json())
// 		.catch(err => alert(err))
// 		.then(json => {
// 			// console.log(json);
// 			alert(json.message);
// 		})
// 		.catch(err => alert(err));
// });
