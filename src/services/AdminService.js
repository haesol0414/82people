const Order = require('../db/models/OrderModel');
const User = reqiuire('../db/models/UserModel');

const AdminService = {
	// [관리자] 전제 주문 목록 조회
	adminCheckOrders: async () => {
		return await Order.find({});
	},

	// [관리자] 주문 상세 내역 조회
	adminCheckOrderDetail: async orderId => {
		return await Order.findOne({ _id: orderId });
	},

	// [관리자] 배송 상태 변경
	updateShippingStatus: async (orderId, shippingStatus) => {
		await Order.updateOne({ _id: orderId }, { shippingStatus: shippingStatus });
	},

	// [관리자] 주문 취소
	cancleOrder: async orderId => {
		await Order.deleteOne({ _id: orderId });
	},

	// [관리자] 배송지 수정
	// updateOrderAddress: async ({ orderId }) => {
	// 	await Order.updateOne({ _id: orderId });
	// },

	// [관리자] 회원 전체 조회
	viewAllUsers: async () => {
		return await User.find(
			{ email: { $ne: '비회원' } },
			{ password: 0, addressInformation: 0 }
		);
	},
};

module.exports = AdminService;
