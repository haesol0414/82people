import { main } from '/Common/index.js';
await main();

const hasToken = checkJWTTokenInCookie();
const userList = document.querySelector('.history-list');
const userSelectOption = document.querySelector('#user-select');
let customer = '';
let admin = '';
let withdrawn = '';

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

function getUsers(users) {
	const newUser = `<li>
		<article>
			<div class="info">
					<span class="email">🦋 ${users.email}</span>
					<button type="button" id="user-delete" value=${users._id}>DELETE</button>
			</div>
			<ul class="user-list">
				<li>
					<div class="thumbnail">
						<span>이름 : ${users.name}</span>
						<span>가입 일자 : ${new Date(users.createdAt).toLocaleString()}</span>
						<span>등급 : ${users.role}</span>
					</div>
				</li>
			</ul>
		</article>
		</li>`;

	if (users.role === 'customer' && users.isDeleted === false) {
		customer += newUser;
	}
	if (users.isDeleted === true) {
		withdrawn += newUser;
	}
	if (users.role === 'admin') {
		admin += newUser;
	}
}

fetch(`/api/admin/users`, {
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
	.then(({ users }) => {
		if (users) {
			users.reverse().map(getUsers);
			userList.innerHTML = customer;
		} else {
			userList.innerHTML =
				'<li style="padding:20px color: #525151">회원 목록이 존재하지 않습니다.</li>';
		}
	})
	.catch(err => console.log(err));

userSelectOption.addEventListener('change', event => {
	if (event.target.value === 'customer') {
		userSelectOption.options[0].setAttribute('selected', true);
		userList.innerHTML = customer;
	}
	if (event.target.value === 'withdrawn') {
		userSelectOption.options[1].setAttribute('selected', true);
		userList.innerHTML = withdrawn;
		getDeleteUserBtn();
	}
	if (event.target.value === 'admin') {
		userSelectOption.options[2].setAttribute('selected', true);
		userList.innerHTML = admin;
		getDeleteUserBtn();
	}
});

const getDeleteUserBtn = (window.onload = function () {
	const userDeleteBtn = document.querySelectorAll('#user-delete');
	console.log(userDeleteBtn);

	for (let i = 0; i < userDeleteBtn.length; i++) {
		console.log(userDeleteBtn[i].value);
		userDeleteBtn[i].onclick = function () {
			fetch(`/api/admin/users`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: hasToken,
				},
				body: JSON.stringify({
					userId: userDeleteBtn[i].value,
				}),
			})
				.then(res => {
					alert(`회원 삭제`);
					window.location.href = '/admin/users';
					return res.json();
				})
				.catch(err => console.log('err', err));
		};
	}
});
