const express = require('express');
const router = express.Router();
const productController = require('../controllers/productEachController');

// Route to fetch a single product by ID
router.get('/:id', productController.getProductById);

module.exports = router;
