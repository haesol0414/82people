const Category = require('../db/models/CategoryModel');
const Product = require('../db/models/ProductModel');

const ProductService = {
	// 전체 상품 조회
	getAllProducts: async () => {
		return await Product.find({}).sort({ _id: -1 }).populate('category');
	},

	// 인기 상품 4개까지 조회
	getBestProducts: async () => {
		return await Product.find({}).sort({ salesAmount: -1 }).limit(4);
	},

	// 카테고리별 제품 조회
	getProductsByCategory: async category => {
		return await Product.find({ category: category }).populate('category');
	},

	// 카테고리 조회
	getCategory: async () => {
		return await Category.find({});
	},

	// 상품 상세 조회
	getProductById: async productId => {
		const product = await Product.findOne({ _id: productId }).populate(
			'category'
		);

		return product;
	},
};

module.exports = ProductService;
