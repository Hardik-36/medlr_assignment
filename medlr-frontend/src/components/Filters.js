import React from 'react';

const Filters = ({ filters, setFilters, sort, setSort }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="manufacturer"
        placeholder="Manufacturer"
        value={filters.manufacturer}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <select
        name="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Sort By</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default Filters;
