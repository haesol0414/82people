const Category = require('../db/models/CategoryModel');
const Order = require('../db/models/OrderModel');
const Product = require('../db/models/ProductModel');
const User = require('../db/models/UserModel');

const AdminService = {
	// [관리자] 주문 목록 조회
	adminCheckOrders: async () => {
		return await Order.find({});
	},

	// [관리자] 주문 내역 삭제
	deleteOrder: async orderId => {
		await Order.deleteOne({ _id: orderId });
	},

	// [관리자] 배송지 수정
	updateOrderAddress: async (
		orderId,
		recipient,
		phone,
		address,
		detailAddress,
		shippingRequest
	) => {
		await Order.updateOne(
			{ _id: orderId },
			{
				'addressInformation.recipient': recipient,
				'addressInformation.phone': phone,
				'addressInformation.address': address,
				'addressInformation.detailAddress': detailAddress,
				'addressInformation.shippingRequest': shippingRequest,
			}
		);
	},

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

	// [관리자] 상품 수정
	updateProducts: async (
		itemId,
		{
			title,
			price,
			manufacturer,
			description,
			currentAmount,
			salesAmount,
			category,
			imageURL,
		}
	) => {
		await Product.updateOne(
			{ _id: itemId },
			{
				title: title,
				price: price,
				manufacturer: manufacturer,
				description: description,
				currentAmount: currentAmount,
				salesAmount: salesAmount,
				category: category,
				imageURL: imageURL,
			}
		);
	},

	// [관리자] 상품 추가
	addProducts: async ({ productInfo }) => {
		await Product.create(productInfo);
	},

	// [관리자] 상품 삭제
	deleteProducts: async productId => {
		await Product.deleteOne({ _id: productId });
	},

	// [관리자] 카테고리 추가
	addCategory: async ({ categoryName }) => {
		await Category.create({ name: categoryName });
	},

	// [관리자] 카테고리 삭제
	deleteCategory: async ({ categoryName }) => {
		await Category.deleteOne({ name: categoryName });
	},

	// [관리자] 카테고리 수정
	updateCategory: async ({ categoryName, editedName }) => {
		await Category.updateOne({ name: categoryName }, { name: editedName });
	},
};

module.exports = AdminService;
