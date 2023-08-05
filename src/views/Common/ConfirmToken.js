function ConfirmToken() {
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
				} else {
					const expiredDate = new Date(0).toUTCString();
					document.cookie = `jwtToken=; expires=${expiredDate}; path=/;`;
				}
			}
		}
	}

	const hasToken = checkJWTTokenInCookie();

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

		if (document.querySelector('#user-name')) {
			document.querySelector('#user-name').innerText = tokenData.name;
		}

		return hasToken;
	} else {
		console.log('JWT 토큰이 쿠키에 존재하지 않습니다.');
		window.location.href = '/';
	}
}

export { ConfirmToken };
