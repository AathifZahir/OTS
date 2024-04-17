const mongoose = require("mongoose");
const Rating = require("../models/ratingModel");
const User = require("../models/userModel");

// Connect to MongoDB
mongoose.connect("mongodb+srv://aathif:OTS@ots.xpyp6pt.mongodb.net/?retryWrites=true&w=majority&appName=OTS", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
  // Call the function to populate the ratings
  populateRatings();
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Sample rating data
const ratingsData = [
  {
    user: "661ce96f893253cc9d63fa67", // Alice Johnson's user ID
    starRating: 4,
    review: "Great product! Fits perfectly."
  },
  {
    user: "661ce96f893253cc9d63fa67", // Alice Johnson's user ID
    starRating: 5,
    review: "Excellent quality. Highly recommend!"
  },
  {
    user: "661ce96f893253cc9d63fa67", // Alice Johnson's user ID
    starRating: 3,
    review: "Good value for money."
  },
  {
    user: "661ce96f893253cc9d63fa68", // Bob Brown's user ID
    starRating: 5,
    review: "Amazing product! Exactly what I was looking for."
  },
  {
    user: "661ce96f893253cc9d63fa68", // Bob Brown's user ID
    starRating: 4,
    review: "Very satisfied with my purchase."
  },
  {
    user: "661ce96f893253cc9d63fa68", // Bob Brown's user ID
    starRating: 3,
    review: "Decent quality but could be better."
  }
];

// Function to populate the ratings collection with data
const populateRatings = async () => {
  try {
    // Insert each rating into the database
    for (let ratingData of ratingsData) {
      const rating = new Rating(ratingData);
      await rating.save();
      console.log("Rating inserted successfully:", rating);
    }
    // Disconnect from MongoDB after inserting ratings
    mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting ratings:", error);
  }
};
