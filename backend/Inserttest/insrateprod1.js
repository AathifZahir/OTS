const mongoose = require("mongoose");
const Product = require("../models/productModel");

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://aathif:OTS@ots.xpyp6pt.mongodb.net/?retryWrites=true&w=majority&appName=OTS", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Define the ratings data with their corresponding product IDs
const ratingsData = [
  { _id: "661d37e7cebd82719ad37e62", ratingId: "661d37e7cebd82719ad37e62" },
  { _id: "661d37e7cebd82719ad37e60", ratingId: "661d37e7cebd82719ad37e60" },
  { _id: "661d37e7cebd82719ad37e5e", ratingId: "661d37e7cebd82719ad37e5e" }
];

// Function to patch the product document with ratings
const patchProductRatings = async () => {
  try {
    // Loop through the ratings data and update the product documents
    for (let rating of ratingsData) {
      const productId = "661d36514d8717212acb2f6d"; // ID of the product document to be patched
      await Product.updateOne(
        { _id: productId },
        { $push: { ratings: rating.ratingId } }
      );
      console.log(`Ratings patched for product with ID: ${productId}`);
    }
  } catch (error) {
    console.error("Error patching product ratings:", error);
  }
};

// Call the functions to connect to MongoDB and patch the product ratings
connectToMongoDB();
patchProductRatings();
