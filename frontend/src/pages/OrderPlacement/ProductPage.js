import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { ProductContext } from '../../context/ProductContext';

const ProductPage = () => {
  const { id } = useParams();
  const { selectedProductId } = useContext(ProductContext);
  const navigate = useNavigate(); // Import useNavigate hook

  if (id !== selectedProductId) {
    // Handle case where user directly navigates to the page without selecting a product
    // Redirect or display an error message
    navigate('/'); // Use navigate function to redirect
    return null; // Ensure no content is rendered after redirection
  }

  // Fetch product details based on ID

  return (
    <div>
      {/* Render product details */}
    </div>
  );
};

export default ProductPage;
