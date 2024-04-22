const Product = require('../models/productModel');
const Rating = require('../models/ratingModel');
const User = require('../models/userModel');


exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate({
      path: 'ratings',
      populate: {
        path: 'user',
        select: 'name' // Assuming you want to populate only the username field of the user object
      }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
