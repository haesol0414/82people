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

	// [관리자] 주문 내역 삭제
	deleteOrder: async (req, res, next) => {
		const { orderId } = req.params;

		try {
			await AdminService.deleteOrder(orderId);

			res.status(200).json({
				message: '주문 내역 삭제 성공',
			});
		} catch (err) {
			next(err);
		}
	},

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
				message: '[관리자] 회원 삭제 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 배송지 수정
	updateOrderAddress: async (req, res, next) => {
		const role = req.currentUserRole;
		const { orderId } = req.params;
		console.log(orderId);
		const { recipient, phone, address, detailAddress, shippingRequest } =
			req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await AdminService.updateOrderAddress(
				orderId,
				recipient,
				phone,
				address,
				detailAddress,
				shippingRequest
			);

			res.status(200).json({
				message: '[관리자] 배송지 수정 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 상품 수정
	updateProducts: async (req, res, next) => {
		const role = req.currentUserRole;
		const { itemId } = req.params;
		const {
			title,
			price,
			manufacturer,
			description,
			currentAmount,
			salesAmount,
			category,
			imageURL,
			detailImageURL,
		} = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			if (!category) {
				throw new badRequestError('카테고리 체크 버튼을 확인해주세요.');
			}

			await AdminService.updateProducts(itemId, {
				title,
				price,
				manufacturer,
				description,
				currentAmount,
				salesAmount,
				category,
				imageURL,
				detailImageURL,
			});

			res.status(200).json({
				message: '[관리자] 상품 수정 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 상품 추가
	addProducts: async (req, res, next) => {
		const role = req.currentUserRole;
		const { productInfo } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await AdminService.addProducts({ productInfo });

			res.status(200).json({
				message: '[관리자] 상품 추가 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 상품 삭제
	deleteProducts: async (req, res, next) => {
		const role = req.currentUserRole;
		const { productId } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await AdminService.deleteProducts(productId);

			res.status(200).json({
				message: '[관리자] 상품 삭제 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 카테고리 추가
	addCategory: async (req, res, next) => {
		const role = req.currentUserRole;
		const { categoryName } = req.body;
		console.log(categoryName);
		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await AdminService.addCategory({ categoryName });

			res.status(200).json({
				message: '[관리자] 카테고리 추가 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 카테고리 삭제
	deleteCategory: async (req, res, next) => {
		const role = req.currentUserRole;
		const { categoryName } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await AdminService.deleteCategory({ categoryName });

			res.status(200).json({
				message: '[관리자] 카테고리 삭제 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 카테고리 수정
	updateCategory: async (req, res, next) => {
		const role = req.currentUserRole;
		const { categoryName, editedName } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await AdminService.updateCategory({ categoryName, editedName });

			res.status(200).json({
				message: '[관리자] 카테고리 수정 성공',
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = AdminController;
