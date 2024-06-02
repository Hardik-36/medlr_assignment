import React from 'react';

const SearchBar = ({ onSearch }) => (
  <div className="relative mb-4">
    <input
      type="text"
      placeholder="Search medicines"
      onChange={(e) => onSearch(e.target.value)}
      className="p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default SearchBar;
