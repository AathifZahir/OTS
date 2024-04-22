const express = require('express');
const router = express.Router();
const Review = require('../models/ratingModel');
const Product = require('../models/productModel');

// POST /api/reviews
router.post('/', async (req, res) => {
  const { userId, productId, review, starRating } = req.body;

  try {
    // Create a new review
    const newReview = new Review({
      user: userId,
      review,
      starRating
    });

    // Save the review
    await newReview.save();

    // Retrieve the _id of the newly saved review
    const reviewId = newReview._id;

    // Update the product with the new rating
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Push the ObjectId of the new review to the ratings array of the product
    product.ratings.push(reviewId);
    await product.save();

    res.json({ success: true, review: newReview });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Error adding review' });
  }
});

module.exports = router;
