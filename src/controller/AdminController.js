const AdminService = require('../services/AdminService');
const { badRequestError } = require('../middleware/ErrorHandler');

const AdminController = {
	// [관리자] 전제 주문 목록 조회
	adminCheckOrders: async (req, res, next) => {
		const role = req.currentUserRole;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			const orders = await AdminService.adminCheckOrders();

			res.status(200).json({
				message: '[관리자] 주문 목록 조회 성공',
				orders: orders,
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 주문 상세 내역 조회
	adminCheckOrderDetail: async (req, res, next) => {
		const role = req.currentUserRole;
		const { orderId } = req.params;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			const orderDetails = await AdminService.adminCheckOrderDetail(orderId);

			res.status(200).json({
				message: '[관리자] 주문 상세 조회 성공',
				orderDetails: orderDetails,
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 주문 배송 상태 변경
	updateShippingStatus: async (req, res, next) => {
		const role = req.currentUserRole;
		const { orderId } = req.params;
		const { shippingStatus } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await AdminService.updateShippingStatus(orderId, shippingStatus);

			res.status(201).json({
				message: '[관리자] 배송 상태 변경 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 주문 취소
	cancleOrder: async (req, res, next) => {
		const { orderId } = req.params;

		try {
			await AdminService.cancleOrder(orderId);

			res.status(200).json({
				message: '주문 취소 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 배송지 수정
	// updateOrderAddress: async (req, res, next) => {
	// 	const role = req.currentUserRole;
	// 	const { orderId } = req.params;

	// 	try {
	// 		if (role !== 'admin') {
	// 			throw new badRequestError('관리자만 접근이 가능합니다.');
	// 		}

	// 		await AdminService.updateOrderAddress(orderId);

	// 		res.status(200).json({
	// 			message: '[관리자] 배송지 수정 성공',
	// 		});
	// 	} catch (err) {
	// 		next(err);
	// 	}
	// },

	// [관리자] 회원 전체 조회
	viewAllUsers: async (req, res, next) => {
		const role = req.currentUserRole;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			const users = await AdminService.viewAllUsers();

			res.status(200).json({
				message: '[관리자] 회원 전체 조회 성공',
				users: users,
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 회원 삭제
	deleteUser: async (req, res, next) => {
		const role = req.currentUserRole;
		const { userId } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			 await AdminService.deleteUser(userId);

			res.status(200).json({
				message: '[관리자] 회원 삭제 성공'
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = AdminController;
