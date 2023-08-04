const express = require('express');
const AdminController = require('../controller/AdminController');
const VerifyToken = require('../middleware/VerifyToken');

const AdminRouter = express.Router();

// [관리자] 전제 주문 목록 조회
AdminRouter.get('/admin/orders', VerifyToken, AdminController.adminCheckOrders);

// [관리자] 주문 내역 삭제
AdminRouter.delete(
	'/admin/orders/:orderId',
	VerifyToken,
	AdminController.deleteOrder
);

// [관리자] 배송지 수정
// AdminRouter.fetch('/admin/:orderId', VerifyToken, AdminController.updateOrderAddress);

// [관리자] 회원 전체 조회
AdminRouter.get('/admin/users', VerifyToken, AdminController.viewAllUsers);

// [관리자] 회원 삭제
AdminRouter.delete('/admin/users', VerifyToken, AdminController.deleteUser);

// [관리자] 상품 추가
AdminRouter.post(
	'/admin/items/addItem',
	VerifyToken,
	AdminController.addProducts
);

// [관리자] 상품 삭제
AdminRouter.delete('/admin/items', VerifyToken, AdminController.deleteProducts);

// [관리자] 상품 수정
AdminRouter.patch(
	'/admin/items/:itemId',
	VerifyToken,
	AdminController.updateProducts
);

// [관리자] 카테고리 추가
AdminRouter.post('/admin/category', VerifyToken, AdminController.addCategory);

// [관리자] 카테고리 삭제
AdminRouter.delete(
	'/admin/category',
	VerifyToken,
	AdminController.deleteCategory
);

module.exports = AdminRouter;
