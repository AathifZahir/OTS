const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  images: {
    type: [String], // Array of image URLs
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["suit", "shirt", "trousers", "bow", "shoe", "tie", "belt"], // Allowed values for category
    required: true
  },
  type: {
    type: String,
    enum: ["rent", "buy"], // Allowed values for type
    required: true
  },
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating" // Reference to the Rating model
  }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;