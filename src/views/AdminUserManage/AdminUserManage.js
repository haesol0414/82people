import { main, ConfirmToken } from '/Common/index.js';
await main();
const hasToken = await ConfirmToken();

const userList = document.querySelector('.history-list');
const userSelectOption = document.querySelector('#user-select');
let customer = '';
let admin = '';
let withdrawn = '';

function getUsers(users) {
	const newUser = `<li>
		<article>
			<div class="info">
				<span class="email">🦋 ${users.email}</span>
				<input type="radio" name="user" value="${users._id}/${users.name}">
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
		alert(err);
		window.location.href = '/';
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
	}
	if (event.target.value === 'admin') {
		userSelectOption.options[2].setAttribute('selected', true);
		userList.innerHTML = admin;
	}
});

const userDeleteBtn = document.querySelector('#user-delete');

function deleteUser() {
	const radios = document.querySelectorAll("input[type='radio']");
	let checkedUuserId = '';
	let checkeduserName = '';

	radios.forEach(function (radio) {
		if (radio.checked) {
			[checkedUuserId, checkeduserName] = radio.value.split('/');
		}
	});

	if (confirm(`${checkeduserName}님을 삭제 하시겠습니까?`)) {
		fetch(`/api/admin/users`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: hasToken,
			},
			body: JSON.stringify({
				userId: checkedUuserId,
			}),
		})
			.then(res => {
				alert('삭제되었습니다.');
				window.location.href = '/admin/users';
				return res.json();
			})
			.catch(err => console.log('err', err));
	}
}

userDeleteBtn.addEventListener('click', deleteUser);