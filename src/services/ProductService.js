const Product = require('../db/models/ProductModel');

const ProductService = {
	// 전체 상품 조회
	getAllProducts: async () => {
		return await Product.find({}).sort({ _id: -1 });
	},

	// 인기 상품 3개까지 조회
	getBestProducts: async () => {
		return await Product.find({}).sort({ salesAmount: -1 }).limit(3);
	},

	// 카테고리별 제품 조회
	getProductsByCategory: async category => {
		return await Product.find({ category: category });
	},

	// 상품 상세 조회
	getProductById: async productId => {
		const product = await Product.findOne({ _id: productId });

		return product;
	},

	/*
	// [관리자] 상품 추가
	addProducts: async ({ productInfo }) => {
		await Product.create({ productInfo });
	},

	// [관리자] 상품 수정
	updateProducts: async productId => {
		await Product.updateOne({ _id: productId }, {});
	},

	// [관리자] 상품 삭제
	deleteProducts: async productId => {
		await Product.deleteOne({ _id: productId });
	},
	*/
};

module.exports = ProductService;
