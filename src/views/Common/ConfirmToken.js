function ConfirmToken() {
	// 브라우저 쿠키에 토큰이 있는지 확인
	function checkJWTTokenInCookie() {
		const cookies = document.cookie.split(';'); // 모든 쿠키 가져오기
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// JWT 토큰 쿠키인지 확인
			if (cookie.startsWith('userToken=')) {
				const jwtToken = cookie.split('=')[1]; // JWT 토큰 값 가져오기
				// 토큰이 유효한지 여부 및 만료 시간 확인
				if (jwtToken) {
					const decodedToken = decodeJWTToken(jwtToken); // 토큰 해석
					if (decodedToken && isTokenExpired(decodedToken.exp)) {
						logout(); // 만료 시간이 지났다면 로그아웃
					} else {
						return jwtToken; // 유효한 토큰이 존재함
					}
				}
			}
		}
	}

	// 토큰 만료 여부 확인
	function isTokenExpired(expirationTime) {
		const now = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
		return expirationTime < now;
	}

	const hasToken = checkJWTTokenInCookie();
	// JWT 토큰 해석
	function decodeJWTToken(hasToken) {
		try {
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

			if (document.querySelector('#user-name')) {
				document.querySelector('#user-name').innerText = tokenData.name;
			}

			return tokenData;
		} catch (error) {
			return null;
		}
	}

	return hasToken;
}

function logout() {
	document.cookie =
		'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

	alert('세션이 만료되어 로그아웃되었습니다.');
	window.location.href = '/';
}

export { ConfirmToken };
