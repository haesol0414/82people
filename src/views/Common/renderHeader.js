function renderHeader() {
	const header = document.querySelector('header');

	// 로그인 했을때 헤더

	let token;
	if (document.cookie) {
		token = document.cookie
			.split(';')
			.find(row => row.startsWith('userToken'))
			.split('=')[1];
	}

	if (token) {
		const parseJwt = token => {
			var base64Url = token.split('.')[1];
			var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			var jsonPayload = decodeURIComponent(
				atob(base64)
					.split('')
					.map(function (c) {
						return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
					})
					.join('')
			);

			return JSON.parse(jsonPayload);
		};

		const { name, role } = parseJwt(token);

		header.innerHTML = `
      <div class="header-container">
        <div class="header-group">
          <div class="logo">
            <a href="/">
              <span>But</span>terfly
            </a>
          </div>
          <nav>
          <ul>
              <li>
              <a href="/products/category/?category=Earring">Earring</a>
              </li>
              <li>
                <a href="/products/category/?category=Necklace">Necklace</a>
              </li>
              <li>
                <a href="/products/category/?category=Bracelet">
                Bracelet</a>
              </li>
              <li>
                <a href="/products/category/?category=Ring">Ring</a>
              </li>
              <li>
                <a href="/products/category/?category=JewelrySet">Jewelry set</a>
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
	// 로그아웃 했을때 헤더
	else {
		header.innerHTML = `
      <div class="header-container">
        <div class="header-group">
          <div class="logo">
            <a href="/">
              <span>But</span>terfly
            </a>
          </div>
          <nav>
            <ul>
            <li>
            <a href="/products/category/?category=Earring">Earring</a>
          </li>
          <li>
            <a href="/products/category/?category=Necklace">Necklace</a>
          </li>
          <li>
            <a href="/products/category/?category=Bracelet">
            Bracelet</a>
          </li>
          <li>
            <a href="/products/category/?category=Ring">Ring</a>
          </li>
          <li>
            <a href="/products/category/?category=JewelrySet">Jewelry set</a>
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
}

export { renderHeader };
