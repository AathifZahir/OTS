import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icon
import { Link } from 'react-router-dom'; // Import Link component

const ProductTile = ({ product, averageRating, numReviews }) => {
  // Render stars based on the average rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < averageRating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="max-w-xs max-h-full">
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img src={`/uploaded/${product.images[0]}`} alt={product.name} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              {/* Use Link component instead of anchor tag */}
              <Link to={`/product/${product._id}`} className="hover:text-gray-900">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            <div className="flex items-center mt-1">
              {renderStars()}
              <span className="text-sm text-gray-500 ml-1">{numReviews} Reviews</span>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductTile;
