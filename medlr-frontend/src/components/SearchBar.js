import React from 'react';

const SearchBar = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search medicines"
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border rounded w-full"
  />
);

export default SearchBar;
