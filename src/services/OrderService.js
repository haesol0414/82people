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

	// [회원] 주문 상세 조회
	checkOrderDetail: async (orderId, guestPassword) => {
		const orderDetail = await Order.findOne({ _id: orderId });

		return orderDetail;
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

	// 08.04 - 주문 취소
	// 관리자 서비스의 배송 상태 변경을 이쪽으로 가져오고
	// 컨트롤러에서 Order 모델로 배송 상태 변경하는 서비스 호출이랑
	// 주문 취소하는(수량 뱉어내는) 밑의 서비스 수행해서 Promise.all로 뱉기 o
	// 컨트롤러 작성, 프론트 js 작업 필요 o
	// 주문 취소 => 회원, 관리자 : cancleOrder && updateShippingStatus
	// 주문 내역 삭제 => 관리자 : DB에서 완전히 지움
	cancleOrder: async (productId, { purchase }) => {
		purchase.map(async product => {
			await Product.updateOne(
				{ _id: productId },
				{
					$inc: {
						salesAmount: -product.orderAmount,
						currentAmount: product.orderAmount,
					},
				}
			);
		});
	},

	updateShippingStatus: async (orderId, shippingStatus) => {
		await Order.updateOne({ _id: orderId }, { shippingStatus: shippingStatus });
	},
};

module.exports = OrderService;
