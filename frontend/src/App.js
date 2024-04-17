// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/OrderPlacement/ProductListPage';
import ProductPage from './pages/OrderPlacement/ProductPage';
import { ProductProvider } from './context/ProductContext'; // Import ProductProvider

const App = () => {
  return (
    <ProductProvider> {/* Wrap your entire application with ProductProvider */}
      <Router>
        <Routes>
          <Route exact path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
