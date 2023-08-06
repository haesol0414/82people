import { ConfirmToken } from './ConfirmToken.js';
const hasToken = await ConfirmToken();
let headerCategory = [];

function renderHeader() {
	const header = document.querySelector('header');

	// 카테고리 목록(_id,name) 받아옴
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
			console.log(err);
		})
		.then(({ allCategory }) => {
			headerCategory = allCategory;

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
				const { name, role } = tokenData;

				header.innerHTML = getUserHeader(name, role);
			} else {
				header.innerHTML = getGuestHeader();
			}
		})
		.catch(err => console.log(err));
}

function getUserHeader(name, role) {
	return `
  <div class="header-container">
    <div class="header-group">
      <div class="logo">
        <a href="/">
          <span>ᙙᙖ</span>utterfly
        </a>
      </div>
      <nav>
      <ul>
        <li>
          <a href="/products/category/?category=${headerCategory[0]._id}">${
		headerCategory[0].name
	}</a>
        </li>
        <li>
          <a href="/products/category/?category=${headerCategory[1]._id}">${
		headerCategory[1].name
	}</a>
        </li>
        <li>
          <a href="/products/category/?category=${headerCategory[2]._id}">
          ${headerCategory[2].name}</a>
        </li>
        <li>
          <a href="/products/category/?category=${headerCategory[3]._id}">${
		headerCategory[3].name
	}</a>
        </li>
        <li>
          <a href="/products/category/?category=${headerCategory[4]._id}">${
		headerCategory[4].name
	}</a>
        </li>
      </ul>
      </nav>
      <div class="menu-group">
        <div>
          <span>🦋 <span style="color:#6C4E82; font-weight:600; font-size: 18px;">${name}님</span></span>
        </div>
        <div>
          <span style="cursor:pointer;" id="logout" onclick="(function(){
            document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.href = '/login';
          }) ()">Logout</span>
        </div>
        <!-- 로그인 상태일 경우 마이페이지 노출-->
        <div>
          <a href="${
						role === 'customer' ? '/mypage' : '/admin/orders'
					}">MyPage</a>
        </div>
        <div>
          <a href="/cart" >Cart</a>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

function getGuestHeader() {
	// 로그아웃 했을때 헤더
	return `
      <div class="header-container">
        <div class="header-group">
          <div class="logo">
            <a href="/">
            <span>ᙙᙖ</span>utterfly
            </a>
          </div>
          <nav>
            <ul>
            <li>
            <a href="/products/category/?category=${headerCategory[0]._id}">${headerCategory[0].name}</a>
          </li>
          <li>
            <a href="/products/category/?category=${headerCategory[1]._id}">${headerCategory[1].name}</a>
          </li>
          <li>
            <a href="/products/category/?category=${headerCategory[2]._id}">
            ${headerCategory[2].name}</a>
          </li>
          <li>
            <a href="/products/category/?category=${headerCategory[3]._id}">${headerCategory[3].name}</a>
          </li>
          <li>
            <a href="/products/category/?category=${headerCategory[4]._id}">${headerCategory[4].name}</a>
          </li>
            </ul>
          </nav>
          <div class="menu-group">
            <div>
              <a href="/login">Login / SignUp</a>
            </div>
            <div>
              <a href="/guest/orders">Guest</a>
            </div>
            <div>
              <a href="/cart">Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
}

export { renderHeader };
