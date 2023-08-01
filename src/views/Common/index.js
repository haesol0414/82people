import { renderHeader } from './renderHeader.js';
import { renderFooter } from './renderFooter.js';
import { renderLogin } from './loginForm.js';
import { ConfirmToken } from './ConfirmToken.js';

async function main() {
	renderHeader();
	renderFooter();
}

export { main, renderLogin, ConfirmToken };
