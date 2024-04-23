const mongoose = require('mongoose');
const Cart = require('../models/cartModel');

// Connect to MongoDB
mongoose.connect("mongodb+srv://aathif:OTS@ots.xpyp6pt.mongodb.net/?retryWrites=true&w=majority&appName=OTS", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User object IDs
const userIds = [
  '661ce96f893253cc9d63fa64',
  '661ce96f893253cc9d63fa65',
  '661ce96f893253cc9d63fa67',
  '661ce96f893253cc9d63fa68',
];

// Insert values into Cart model
async function insertCartItems() {
  try {
    for (const userId of userIds) {
      const cart = new Cart({ user: userId });
      await cart.save();
      console.log(`Cart created for user ${userId}`);
    }
    console.log('All carts inserted successfully');
  } catch (error) {
    console.error('Error inserting carts:', error);
  } finally {
    mongoose.disconnect(); // Close MongoDB connection
  }
}

// Call the function to insert cart items
insertCartItems();
