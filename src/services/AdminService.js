const Order = require('../db/models/OrderModel');
const User = require('../db/models/UserModel');

const AdminService = {
	// [관리자] 주문 목록 조회
	adminCheckOrders: async () => {
		return await Order.find({});
	},

	// [관리자] 주문 상세 내역 조회
	adminCheckOrderDetail: async orderId => {
		return await Order.findOne({ _id: orderId });
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

	// [관리자] 회원 삭제
	deleteUser: async userId => {
		await User.deleteOne({ _id: userId });
	},

	// 배송 상태 변경 (관리자 = 자유자재로 변경, 회원 - 버튼으로 주문 취소만 가능)
	updateShippingStatus: async (orderId, shippingStatus) => {
		await Order.updateOne({ _id: orderId }, { shippingStatus: shippingStatus });
	},
};

module.exports = AdminService;
