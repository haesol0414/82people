const Category = require('../db/models/CategoryModel');
const Product = require('../db/models/ProductModel');

const ProductService = {
	// 전체 상품 조회
	getAllProducts: async () => {
		return await Product.find({}).sort({ _id: -1 }).populate('category');
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

	// 카테고리 조회
	getCategory: async () => {
		return await Category.find({});
	},

	// [관리자] 카테고리 추가
	addCategory: async ({ categoryName }) => {
		await Category.create({ name: categoryName });
	},

	deleteCategory: async ({ categoryName }) => {
		await Category.deleteOne({ name: categoryName });
	},
};

module.exports = ProductService;
