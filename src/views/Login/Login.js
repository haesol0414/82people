import { main, renderLogin } from '/Common/index.js';
await main();
await renderLogin();

const id = document.querySelector('.form__id');
const pw = document.querySelector('.form__pw');
const submitBtn = document.querySelector('.form__submit');

try {
	if (
		document.cookie
			.split(';')
			.find(row => row.startsWith('userToken'))
			.split('=')[1]
	) {
		window.location.href = '/';
	}
} catch (e) {
	console.error('토큰 없음');
}

const setCookie = (userToken, token, days) => {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	const cookieString = `${userToken}=${token}; expires=${expires.toUTCString()}; path=/`;
	document.cookie = cookieString;
};

const login = e => {
	e.preventDefault();

	fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: id.value,
			password: pw.value,
		}),
	})
		.then(res => {
			console.log('res', res);
			if (res.ok) {
				alert(`성공적으로 로그인 되었습니다.`);
				window.location.href = '/';

				return res.json();
			} else {
				alert(res.message);
			}
		})
		.catch(err => {
			console.log(err);
		})
		.then(json => setCookie('userToken', json.Authorization, 1))
		.catch(err => {
			console.log(err);
		});
};

submitBtn.addEventListener('click', login);
