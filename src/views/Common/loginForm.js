function renderLogin() {
	const loginForm = document.querySelector('#loginForm');
	loginForm.innerHTML = `
    <h1>Login</h1>
    <div class="signin-card">
      <form>
        <input class="form__id" type="email" placeholder="email" />
        <input class="form__pw" type="password" placeholder="password" />
        <button class="form__submit" type="submit">Login</button>
        <div class="btn-link">
          <a href="/signup" class="outline-btn">SignUp</a>
        </div>
      </form>
    </div>
  `;
}

export { renderLogin };
