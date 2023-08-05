const express = require('express');
const ProductController = require('../controller/ProductController');
const VerifyToken = require('../middleware/VerifyToken');

const ProductRouter = express.Router();

// 전체 상품 조회
ProductRouter.get('/products', ProductController.getAllProducts);

// 카테고리별 상품 조회
ProductRouter.get(
	'/products/category/:category',
	ProductController.getProductsByCategory
);

// 카테고리 조회
ProductRouter.get('/category', ProductController.getCategory);

// 상품 상세 조회
ProductRouter.get('/products/:productId', ProductController.getProductById);


module.exports = ProductRouter;
