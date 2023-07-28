import { main } from '/Common/index.js';
await main();

let alluser = '';
// 화면 그려주기
function getUsers(users) {
	// let userInfo = '';
	// users.map(user => {
	// 	const userLi = `
	// 	<li>
	// 		<div class="thumbnail">
	// 			<span class="title">이름 : ${user.name}</span>
	// 			<span class="title">가입 날짜 : ${new Date(
	// 				user.createdAt
	// 			).toLocaleString()}</span>
	// 			<span class="title">탈퇴 여부 : ${user.isDeleted}</span>
	// 		</div>
	// 	</li>`;
	// 	userInfo += userLi;
	// });

	const newUser = `<li>
		<article>
			<div class="info">
				<div>
					<span class="date">🦋 ${users.email}</span>
				</div>
			</div>
			<ul class="user-list">
				<li>
					<div class="thumbnail">
						<span>이름 : ${users.name}</span>
						<span>가입 날짜 : ${new Date(users.createdAt).toLocaleString()}</span>
						<span>등급 : ${users.role}</span>
						<span>탈퇴 여부 : ${users.isDeleted}</span>
					</div>
				</li>
			</ul>
		</article>
		</li>`;
	alluser += newUser;
	userList.innerHTML = alluser;
}

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

const hasToken = checkJWTTokenInCookie();
const userList = document.querySelector('.history-list');

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
	.then(json => {
		console.log(json);
		console.log(json.users);
		if (json.users) {
			json.users.reverse().map(getUsers);
		} else {
			itemsList.innerHTML =
				'<li style="padding:20px">회원 목록이 존재하지 않습니다.</li>';
		}
	})
	.catch(err => console.log(err));
