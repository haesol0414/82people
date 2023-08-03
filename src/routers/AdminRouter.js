const express = require('express');
const AdminController = require('../controller/AdminController');
const VerifyToken = require('../middleware/VerifyToken');

const AdminRouter = express.Router();

// [관리자] 전제 주문 목록 조회
AdminRouter.get('/admin/orders', VerifyToken, AdminController.adminCheckOrders);

// [관리자] 주문 상세 내역 조회
AdminRouter.get(
	'/admin/orders/:orderId',
	VerifyToken,
	AdminController.adminCheckOrderDetail
);

// [관리자] 주문 삭제
AdminRouter.delete(
	'/admin/orders/:orderId',
	VerifyToken,
	AdminController.cancleOrder
);

// [관리자] 배송지 수정
// AdminRouter.fetch('/admin/:orderId', VerifyToken, AdminController.updateOrderAddress);

// [관리자] 회원 전체 조회
AdminRouter.get('/admin/users', VerifyToken, AdminController.viewAllUsers);

// // [관리자] 회원 삭제
AdminRouter.delete('/admin/users', VerifyToken, AdminController.deleteUser);

// 배송 상태 변경
AdminRouter.post(
	'/admin/orders/:orderId',
	VerifyToken,
	AdminController.updateShippingStatus
);
module.exports = AdminRouter;
