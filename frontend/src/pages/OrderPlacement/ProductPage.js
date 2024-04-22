import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [showMessage, setShowMessage] = useState(false); // State for showing message
  const { id } = useParams();

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

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post('/api/reviews', {
        userId: '661ce96f893253cc9d63fa68',
        review: reviewText,
        starRating: rating,
        productId: product._id
      });
      console.log('Review submitted:', response.data);
      setShowMessage(true); // Show message
      setTimeout(() => {
        window.location.reload(); // Reload page after brief delay
      }, 2000); // 2000 milliseconds (2 seconds)
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
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
              <input type="number" id="quantity" min="1" max="10" defaultValue="1" className="border border-gray-400 rounded-md p-1 w-16" />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Add to Cart</button>
          </div>
        </div>
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
            {/* Show message with animation */}
            {showMessage && (
              <div className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 animate-fadeIn">
                Review posted!
              </div>
            )}
          </div>
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
