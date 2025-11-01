import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        inStockOnly: false,
    });

    const updateFilter = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    return (
        <FilterContext.Provider value={{ filters, updateFilter }}>
            {children}
        </FilterContext.Provider>
    );
};