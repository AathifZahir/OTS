const Product = require('../models/productModel');
const Rating = require('../models/ratingModel'); // Import the Rating model

// Controller function to get products with "buy" type and specific categories
exports.getProductList = async (req, res) => {
  try {
    // Ensure that the Rating model is registered
    await Rating.ensureIndexes();

    // Find products with type "buy" and specific categories
    const products = await Product.find({
      type: 'buy', // Filter products with type "buy"
      category: { $in: ["bow", "shoe", "tie", "belt"] } // Filter products with specified categories
    }).populate('ratings'); // Populate the ratings field of each product

    // Calculate the count and average rating for each product
    const productsWithRatings = products.map(product => {
      const ratingsCount = product.ratings.length;
      let totalStars = 0;
      if (ratingsCount > 0) {
        totalStars = product.ratings.reduce((acc, rating) => acc + rating.starRating, 0);
      }
      const averageRating = Math.round(totalStars / ratingsCount);
      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        type: product.type,
        images: product.images,
        averageRating: averageRating,
        ratingsCount: ratingsCount
      };
    });

    // Send the products with average ratings and ratings count in the response
    res.json(productsWithRatings);
  } catch (error) {
    // Handle errors
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
