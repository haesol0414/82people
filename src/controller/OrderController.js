const OrderService = require('../services/OrderService');
const { badRequestError } = require('../middleware/ErrorHandler');

const OrderController = {
	// [회원 || 비회원] 장바구니 제품 주문 완료
	createOrder: async (req, res, next) => {
		const email = req.currentUserEmail;
		const {
			purchase,
			recipient,
			phone,
			guestPassword,
			address,
			detailAddress,
			shippingRequest,
			shippingPrice,
		} = req.body;

		try {
			if (!email && !guestPassword) {
				throw new badRequestError('비회원은 비밀번호 입력이 필요합니다.');
			}
			if (
				!purchase ||
				!recipient ||
				!phone ||
				!address ||
				!detailAddress ||
				!shippingPrice
			) {
				throw new badRequestError(
					'누락된 정보가 있습니다. 다시 한 번 확인해주세요.'
				);
			}

			const newOrderId = await OrderService.createOrder(
				email,
				purchase,
				recipient,
				phone,
				guestPassword,
				address,
				detailAddress,
				shippingRequest,
				shippingPrice
			);

			res.status(201).json({
				message: '주문 성공',
				orderId: newOrderId,
			});
		} catch (err) {
			next(err);
		}
	},

	// [회원] 주문 시 배송지 확인
	checkAddress: async (req, res, next) => {
		const email = req.currentUserEmail;

		try {
			const address = await OrderService.checkAddress(email);

			if (!address) {
				throw new badRequestError('배송지가 존재하지 않습니다.');
			}

			res.status(200).json({
				message: '배송지 조회 성공',
				userAddress: address,
			});
		} catch (err) {
			next(err);
		}
	},

	// [회원] 주문 내역 전체 조회
	checkOrderHistory: async (req, res, next) => {
		const email = req.currentUserEmail;

		try {
			const orderHistory = await OrderService.checkOrderHistory(email);

			res.status(200).json({
				message: '회원 주문 내역 전체 조회 성공',
				userOrderHistory: orderHistory,
			});
		} catch (err) {
			next(err);
		}
	},

	// 주문 상세 조회
	checkOrderDetail: async (req, res, next) => {
		const { orderId } = req.params;
		const { guestPassword } = req.body;

		try {
			if (!guestPassword) {
				const orderDetail = await OrderService.checkOrderDetail(orderId);

				if (!orderDetail) {
					throw new badRequestError(
						'주문 상세 내역이 존재하지 않습니다. 다시 한 번 확인해주세요.'
					);
				}

				res.status(200).json({
					message: '회원 주문 상세 내역 조회 성공',
					orderDetail: orderDetail,
				});
			} else {
				const orderDetail = await OrderService.checkGuestOrderDetail(
					orderId,
					guestPassword
				);

				if (!orderDetail) {
					throw new badRequestError(
						'주문 상세 내역이 존재하지 않습니다. 주문 번호 또는 비밀번호를 확인해주세요.'
					);
				}

				res.status(200).json({
					message: '비회원 주문 상세 내역 조회 성공',
					orderDetail: orderDetail,
				});
			}
		} catch (err) {
			next(err);
		}
	},

	// [회원] 기본 배송지 설정
	addAddress: async (req, res, next) => {
		const email = req.currentUserEmail;
		const { addressInformation } = req.body;

		try {
			await OrderService.addAddress(email, addressInformation);

			res.status(200).json({
				message: '배송지 변경 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	cancleOrder: async (req, res, next) => {
		const { orderId } = req.params;
		const { purchase, shippingStatus } = req.body;

		try {
			await Promise.all([
				OrderService.cancleOrder(orderId, { purchase }),
				OrderService.updateShippingStatus(orderId, shippingStatus),
			]);

			res.status(200).json({
				message: '주문 취 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// 배송 상태 변경
	adminUpdateShippingStatus: async (req, res, next) => {
		const role = req.currentUserRole;
		const { orderId } = req.params;
		const { shippingStatus } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await OrderService.updateShippingStatus(orderId, shippingStatus);

			res.status(201).json({
				message: '[관리자] 배송 상태 변경 성공',
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = OrderController;
