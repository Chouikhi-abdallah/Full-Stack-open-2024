/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Filter = ({ filter, handleFilterChange }) => {
    
  return (
    <div>
      Filter show with <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
