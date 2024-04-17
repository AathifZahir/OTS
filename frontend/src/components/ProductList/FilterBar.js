import React, { useState } from 'react';

const FilterOptions = ({ handleFilterChange }) => {
  const [rating, setRating] = useState('');

  const handleRatingChange = (e) => {
    const value = e.target.value === '0' ? '' : e.target.value; // Convert '0' to '' for 'Any' option
    setRating(value);
    handleFilterChange({ target: { name: 'exactRating', value } }); // Pass the event to the parent component's handler
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      <h2 className="text-lg font-semibold">Filter Options</h2> {/* Header */}
      <select 
        name="category" 
        onChange={handleFilterChange} 
        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value="">All</option>
        <option value="shoe">Shoes</option>
        <option value="tie">Tie</option>
        <option value="belt">Belt</option>
        <option value="bow">Bow Tie</option>
      </select>
      <input 
        type="number" 
        name="minPrice" 
        placeholder="Min Price" 
        onChange={handleFilterChange} 
        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <input 
        type="number" 
        name="maxPrice" 
        placeholder="Max Price" 
        onChange={handleFilterChange} 
        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <div>
        <input 
          type="range" 
          name="exactRating" 
          min="0" 
          max="5" 
          value={rating} 
          onChange={handleRatingChange} 
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="flex justify-between">
          <span>Any</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
