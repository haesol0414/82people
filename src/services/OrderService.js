const Order = require('../db/models/OrderModel');
const User = require('../db/models/UserModel');
const Product = require('../db/models/ProductModel');

const OrderService = {
	// [회원 비회원 공통] 장바구니 제품 주문 완료
	createOrder: async (
		email,
		purchase,
		recipient,
		phone,
		guestPassword,
		address,
		detailAddress,
		shippingRequest,
		shippingPrice
	) => {
		const totalProductsPrice = purchase.reduce((acc, product) => {
			return acc + product.price * product.orderAmount;
		}, 0);

		const orderInformation = {
			purchase,
			email,
			guestPassword,
			addressInformation: {
				recipient,
				phone,
				address,
				detailAddress,
				shippingRequest,
			},
			totalPrice: {
				totalProductsPrice,
				shippingPrice,
			},
		};

		// salesAmount, currentAmount Update
		purchase.map(async product => {
			await Product.updateOne(
				{ _id: product.productId },
				{
					$inc: {
						salesAmount: product.orderAmount,
						currentAmount: -product.orderAmount,
					},
				}
			);
		});

		const newOrderId = await Order.create(orderInformation);

		return newOrderId;
	},

	// [회원] 배송지 확인
	checkAddress: async email => {
		const address = await User.find(
			{ email: email },
			{ _id: 0, addressInformation: 1 }
		);

		return address;
	},

	// [회원] 주문 내역 전체 조회
	checkOrderHistory: async email => {
		const orderHistory = await Order.find(
			{ email: email },
			{ _id: 1, shippingStatus: 1, purchase: 1, createdAt: 1 }
		);

		return orderHistory;
	},

	// 주문 상세 조회
	checkOrderDetail: async orderId => {
		return await Order.findOne({ _id: orderId });
	},

	// [비회원] 주문 상세 조회
	checkGuestOrderDetail: async (orderId, guestPassword) => {
		const orderDetail = await Order.findOne(
			{ _id: orderId, guestPassword: guestPassword },
			{ _id: 1, guestPassword: 0 }
		);

		return orderDetail;
	},

	// [회원] 기본 배송지 설정
	addAddress: async (email, addressInformation) => {
		await User.updateOne(
			{ email: email },
			{ addressInformation: addressInformation }
		);
	},

	// 주문 취소
	cancleOrder: async (orderId, { purchase }) => {
		await Order.updateOne({ _id: orderId }, { shippingStatus: '주문 취소' });
		purchase.map(async product => {
			await Product.updateOne(
				{ _id: product.productId },
				{
					$inc: {
						salesAmount: -product.orderAmount,
						currentAmount: product.orderAmount,
					},
				}
			);
		});
	},

	// 배송 상태 변경
	updateShippingStatus: async (orderId, shippingStatus) => {
		await Order.updateOne({ _id: orderId }, { shippingStatus: shippingStatus });
	},
};

module.exports = OrderService;
