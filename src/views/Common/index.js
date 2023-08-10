import { renderHeader } from './renderHeader.js';
import { renderFooter } from './renderFooter.js';
import { renderLogin } from './loginForm.js';
import { ConfirmToken } from './ConfirmToken.js';
import { renderCategory } from './renderCategory.js';

async function main() {
	renderHeader();
	renderFooter();
	renderCategory();
}

export { main, renderLogin, ConfirmToken };
