const { Schema } = require('mongoose');

const OrderSchema = new Schema(
	{
		email: {
			type: String,
			default: '비회원',
		},
		shippingStatus: {
			type: String,
			enum: ['상품 준비 중', '배송 중', '배송 완료', '주문 취소'],
			default: '상품 준비 중',
		},
		purchase: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				title: { type: String, required: true },
				price: { type: Number, required: true },
				orderAmount: { type: Number, required: true },
				imageURL: { type: [String], required: true },
			},
		],
		addressInformation: {
			recipient: { type: String, required: true },
			phone: { type: String, required: true },
			address: { type: String, required: true },
			detailAddress: { type: String, required: true },
			shippingRequest: { type: String },
		},
		totalPrice: {
			totalProductsPrice: { type: Number, required: true },
			shippingPrice: { type: Number, required: true, default: 0 },
		},
		guestPassword: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = OrderSchema;
