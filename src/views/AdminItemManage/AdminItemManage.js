import { main } from '/Common/index.js';
await main();

const hasToken = checkJWTTokenInCookie();
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
	window.location.href = '/';
}

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

window.addEventListener('load', () => {
	const modifyBtns = document.querySelectorAll('#modify-btn');

	for (let i = 0; i < modifyBtns.length; i++) {
		modifyBtns[i].addEventListener('click', event => {
			const itemId = event.target.value;
			location.href = `/admin/items/itemId/?itemId=${itemId}`;
		});
	}
});
