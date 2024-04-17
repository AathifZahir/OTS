import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon

const SearchBar = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Update input value
    setSearchTerm(value); // Trigger search with updated value
  };

  return (
    <div className="mb-4 relative"> {/* Added margin bottom and relative positioning */}
      <form className="flex items-center space-x-4">
        <div className="relative flex items-center">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> {/* Search icon */}
          <input 
            type="text" 
            value={inputValue} 
            onChange={handleChange} 
            placeholder="Search products..." // Placeholder
            className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 flex-1"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
