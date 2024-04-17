const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensures email uniqueness
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"], // Assuming two roles: USER and ADMIN
    default: "USER" // Default role is USER
  }
});

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
