import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0); // Initialize rating to 0
  const [showCartItemMessage, setShowCartItemMessage] = useState(false); // State for showing cart item message
  const [showReviewMessage, setShowReviewMessage] = useState(false); // State for showing review message
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { id } = useParams();
  const userId = '661ce96f893253cc9d63fa64'; // Static user ID for testing

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('/api/reviews', {
        userId: userId,
        review: reviewText,
        starRating: rating,
        productId: product._id
      });
      console.log('Review submitted:', response.data);
      setShowReviewMessage(true); // Show review message
      setTimeout(() => {
        setShowReviewMessage(false); // Hide review message after 2 seconds
        window.location.reload(); // Reload page
      }, 2000); // 2000 milliseconds (2 seconds)
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleAddToCart = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/cart/add', {
        userId: userId,
        productId: product._id,
        quantity: quantity
      });
      console.log('Item added to cart:', response.data);
      setShowCartItemMessage(true); // Show cart item message
      setTimeout(() => {
        setShowCartItemMessage(false); // Hide cart item message after 2 seconds
        window.location.reload(); // Reload page
      }, 2000);
      setQuantity(1); // Reset quantity to 1
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (!product) {
    // Display loading animation
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  const [firstImage, ...restImages] = product.images;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-3 gap-4">
        {/* First image takes 1 column and 2 rows */}
        <div className="col-span-1 row-span-2">
          <div className="w-full h-80 overflow-hidden">
            <img src={`/uploaded/${firstImage}`} alt={`Product 1`} className="w-full h-full object-cover" />
          </div>
        </div>
        {/* Rest of the images take 1 column and 1 row each */}
        {restImages.map((image, index) => (
          <div key={index} className="w-full h-40 overflow-hidden">
            <img src={`/uploaded/${image}`} alt={`Product ${index + 2}`} className="w-full h-full object-cover" />
          </div>
        ))}
        {/* Product Details */}
        <div className="col-span-1 flex flex-col">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="col-span-1">
          </div>
          <div className="col-span-1 flex flex-col justify-between">
            <div>
              <p className="text-gray-800 font-bold">${product.price}</p>
              <label htmlFor="quantity" className="mr-2">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                max="10" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
                className="border border-gray-400 rounded-md p-1 w-16" 
              />
            </div>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
        {/* Floating message for cart item added */}
        {showCartItemMessage && (
          <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-4 rounded-md">
            Item added to cart!
          </div>
        )}
        {/* Reviews and Ratings */}
        <div className="col-span-3 mt-8">
          <hr className="my-4" />
          <h3 className="text-xl font-semibold mb-4">Reviews and Ratings</h3>
          {/* Review Form */}
          <div className="mt-4">
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <div className="flex items-center mb-2">
              <p className="mr-2">Rating:</p>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-lg ${star <= rating ? 'text-yellow-500' : 'text-gray-400'} focus:outline-none`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
          </div>
          {/* Floating message for review submitted */}
          {showReviewMessage && (
            <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-4 rounded-md">
              Review submitted!
            </div>
          )}
          {/* Display Ratings */}
          <ul>
            {product.ratings.map((ratingItem, index) => (
              <li key={index} className="mb-4">
                <p><strong>{ratingItem.user.name}</strong></p>
                <p>Rating: <span className="text-yellow-500">{'★'.repeat(ratingItem.starRating)}</span></p>
                <p>{ratingItem.review}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
