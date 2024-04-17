const mongoose = require("mongoose");
const Product = require("../models/productModel");

// Connect to MongoDB
mongoose.connect("mongodb+srv://aathif:OTS@ots.xpyp6pt.mongodb.net/?retryWrites=true&w=majority&appName=OTS", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
  // Call the function to populate the product model with data
  populateProducts();
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Sample product data
const productsData = [
  {
    images: ["image1", "image2", "image3", "image4", "image5"],
    name: "Stylish Black Leather Shoe",
    price: 99.99,
    description: "Step up your style game with these sleek black leather shoes. Perfect for both formal and casual occasions.",
    category: "shoe",
    type: "buy" // Type set as "buy"
  },
  {
    images: ["image6", "image7", "image8", "image9", "image10"],
    name: "Classic Black Bow Tie",
    price: 19.99,
    description: "Add a touch of elegance to your attire with this classic black bow tie. Perfect for weddings, parties, and formal events.",
    category: "bow",
    type: "buy" // Type set as "buy"
  },
  {
    images: ["image11", "image12", "image13", "image14", "image15"],
    name: "Silk Blue Striped Tie",
    price: 29.99,
    description: "Upgrade your wardrobe with this luxurious silk blue striped tie. The perfect accessory to complete your professional look.",
    category: "tie",
    type: "buy" // Type set as "buy"
  }
];

// Function to populate the product model with data
const populateProducts = async () => {
  try {
    // Insert each product into the database
    for (let productData of productsData) {
      const product = new Product(productData);
      await product.save();
      console.log(`Product '${product.name}' inserted successfully`);
    }
    // Disconnect from MongoDB after inserting products
    mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting products:", error);
  }
};
