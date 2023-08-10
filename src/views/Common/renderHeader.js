import { ConfirmToken } from './ConfirmToken.js';
const hasToken = await ConfirmToken();
const header = document.querySelector('header');
let name;
let role;

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

	name = tokenData.name;
	role = tokenData.role;
}

function renderHeader() {
	if (hasToken) {
		header.innerHTML = `
<div class="header-container">
    <div class="header-group">
      <div class="logo">
        <a href="/">
          <span>ᙙᙖ</span>utterfly
        </a>
      </div>
      <nav>
      <ul id="category-list">
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
	} else {
		header.innerHTML = ` <div class="header-container">
    <div class="header-group">
      <div class="logo">
        <a href="/">
        <span>ᙙᙖ</span>utterfly
        </a>
      </div>
      <nav>
        <ul id="category-list">
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
}

export { renderHeader };
