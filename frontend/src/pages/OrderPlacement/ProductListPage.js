import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductTile from '../../components/ProductList/ProductTile';
import FilterOptions from '../../components/ProductList/FilterBar';
import SearchBar from '../../components/ProductList/SearchBar';
import { ProductContext } from '../../context/ProductContext';

const ProductListPage = ({ history }) => {
  const { setSelectedProductId } = useContext(ProductContext);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    history.push(`/product/${productId}`);
  };

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    exactRating: '', // Added state for exact rating filter
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/productlist');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions({ ...filterOptions, [name]: value });
  };

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterOptions.category === '' || product.category.toLowerCase() === filterOptions.category.toLowerCase()) &&
    (filterOptions.minPrice === '' || product.price >= filterOptions.minPrice) &&
    (filterOptions.maxPrice === '' || product.price <= filterOptions.maxPrice) &&
    (filterOptions.exactRating === '' || product.averageRating == filterOptions.exactRating) // Include exact rating filter
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="home-page">
        <div className="search">
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full md:w-1/6">
            <FilterOptions handleFilterChange={handleFilterChange} />
          </div>
          <div className="product-list grid grid-cols-4 gap-4 justify-items-center w-full md:w-5/6">
            {filteredProducts.map(product => (
              <ProductTile
                key={product._id}
                product={product}
                averageRating={product.averageRating} // Pass average rating as prop
                numReviews={product.ratingsCount} // Pass number of reviews as prop
                onClick={() => handleProductClick(product._id)} // Pass product id to handleProductClick
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
