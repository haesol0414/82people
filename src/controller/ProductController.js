const ProductService = require('../services/ProductService');
const { badRequestError } = require('../middleware/ErrorHandler');

const ProductController = {
	// 전체 상품 요청 및 응답
	getAllProducts: async (req, res, next) => {
		try {
			const [totalProducts, bestProducts] = await Promise.all([
				ProductService.getAllProducts(),
				ProductService.getBestProducts(),
			]);

			if (totalProducts.length > 0) {
				return res.status(200).json({
					message: '전체 제품 목록 조회 성공',
					totalProducts: totalProducts,
					bestProducts: bestProducts,
				});
			} else {
				throw new badRequestError('제품 조회 실패!');
			}
		} catch (err) {
			next(err);
		}
	},

	// 카테고리별 상품 요청 및 응답
	getProductsByCategory: async (req, res, next) => {
		const { category } = req.params;

		try {
			const categoryProducts = await ProductService.getProductsByCategory(
				category
			);

			res.status(200).json({
				message: '카테고리 제품 조회 성공',
				categoryProducts: categoryProducts,
			});
		} catch (err) {
			next(err);
		}
	},

	getProductById: async (req, res, next) => {
		const { productId } = req.params;

		try {
			const product = await ProductService.getProductById(productId);

			if (!product) {
				throw new badRequestError(
					'상품이 존재하지 않습니다. 다시 한 번 확인해주세요.'
				);
			}

			res.status(200).json({
				message: '제품 상세 보기 조회 성공',
				productInfo: product,
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 상품 수정
	updateProducts: async (req, res, next) => {
		const role = req.currentUserRole;
		const { itemId } = req.params;
		const {
			title,
			price,
			manufacturer,
			description,
			currentAmount,
			salesAmount,
			category,
			imageURL,
		} = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			if (!category) {
				throw new badRequestError('카테고리 체크 버튼을 확인해주세요.');
			}

			await ProductService.updateProducts(itemId, {
				title,
				price,
				manufacturer,
				description,
				currentAmount,
				salesAmount,
				category,
				imageURL,
			});

			res.status(200).json({
				message: '[관리자] 상품 수정 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 상품 추가
	addProducts: async (req, res, next) => {
		const role = req.currentUserRole;
		const { productInfo } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await ProductService.addProducts({ productInfo });

			res.status(200).json({
				message: '[관리자] 상품 추가 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 상품 삭제
	deleteProducts: async (req, res, next) => {
		const role = req.currentUserRole;
		const { productId } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await ProductService.deleteProducts(productId);

			res.status(200).json({
				message: '[관리자] 상품 삭제 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// 카테고리 조회
	getCategory: async (req, res, next) => {
		try {
			const allCategory = await ProductService.getCategory();

			res.status(200).json({
				message: '[관리자] 상품 삭제 성공',
				allCategory: allCategory,
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 카테고리 추가
	addCategory: async (req, res, next) => {
		const role = req.currentUserRole;
		const { categoryName } = req.body;
		console.log(categoryName);
		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await ProductService.addCategory({ categoryName });

			res.status(200).json({
				message: '[관리자] 카테고리 추가 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 카테고리 삭제
	deleteCategory: async (req, res, next) => {
		const role = req.currentUserRole;
		const { categoryName } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await ProductService.deleteCategory({ categoryName });

			res.status(200).json({
				message: '[관리자] 카테고리 삭제 성공',
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = ProductController;
