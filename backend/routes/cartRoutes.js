const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');
const User = require('../models/userModel');

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // Create a new cart
      cart = new Cart({ user: userId, cartItems: [] });
      // Save the cart to get its ID
      cart = await cart.save();
      // Update the user's cart ID
      user.cart = cart._id;
      // Save the updated user document
      await user.save();
    }

    // Create a new cart item
    const cartItem = new CartItem({
      product: productId,
      type: 'buy', // Set the type here
      quantity: quantity
    });

    // Save the cart item to the database
    const savedCartItem = await cartItem.save();

    // Update the user's cart by adding the ID of the newly created cart item
    cart.cartItem.push(savedCartItem._id);

    // Save the updated user's cart to the database
    await cart.save();

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
