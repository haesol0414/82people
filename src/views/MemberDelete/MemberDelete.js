import { main, ConfirmToken } from '/Common/index.js';
await main();
const hasToken = await ConfirmToken();

const inputElement = document.querySelector('.input');
const checkButton = document.querySelector('.check-button');

// 확인 버튼 클릭 이벤트 처리
checkButton.addEventListener('click', () => {
	console.log('clickCheck');
	const withdrawalStatement = inputElement.value.trim();

	if (withdrawalStatement === '탈퇴하겠습니다.') {
		// 탈퇴 신청 처리
		processWithdrawal();
	} else {
		// 알림창 표시
		alert('입력한 문구가 일치하지 않습니다.');
	}
});

// 회원 탈퇴 처리
function processWithdrawal() {
	fetch('/api/users', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: hasToken,
		},
	})
		.then(response => {
			console.log('response', response);
			if (response.ok) {
				alert('탈퇴신청이 정상적으로 처리되었습니다.');
				// 로그인 토큰 삭제
				document.cookie =
					'userToken' +
					'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';

				window.location.href = '/';
				return response.json();
			} else {
				throw new Error('탈퇴 요청에 실패했습니다.');
			}
		})
		.catch(err => {
			alert(err);
		});
}
