// productRoutes.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');


// Route to get products list with specified criteria
router.get('/productlist', productsController.getProductList);

module.exports = router;
