import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-6">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 mx-1 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 disabled:opacity-50"
    >
      Previous
    </button>
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => onPageChange(index + 1)}
        className={`px-4 py-2 mx-1 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 mx-1 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;
