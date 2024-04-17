const mongoose = require("mongoose");
const User = require("../models/userModel");

// Define dummy users data
const dummyUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "USER"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
    role: "USER"
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "ADMIN"
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "alice789",
    role: "USER"
  },
  {
    name: "Bob Brown",
    email: "bob@example.com",
    password: "bob321",
    role: "USER"
  }
];

// Connect to MongoDB
mongoose.connect("mongodb+srv://aathif:OTS@ots.xpyp6pt.mongodb.net/?retryWrites=true&w=majority&appName=OTS", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.then(() => {
  // Insert dummy data into the database
  return User.insertMany(dummyUsers);
})
.then(() => {
  console.log("Dummy user data inserted successfully");
})
.catch((error) => {
  console.error("Error:", error);
})
.finally(() => {
  // Close the MongoDB connection
  mongoose.disconnect();
});
