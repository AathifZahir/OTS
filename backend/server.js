// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const productsRoutes = require('./routes/productRoutes');
const productEachRoutes = require('./routes/productEachRoutes');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://aathif:OTS@ots.xpyp6pt.mongodb.net/?retryWrites=true&w=majority&appName=OTS';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

app.use('/uploaded', express.static(path.join(__dirname, 'uploaded')));

// Routes
app.use('/api', productsRoutes); // Use the product routes
app.use('/product', productEachRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
