'use client';

import React, { useState, useCallback } from 'react';
import { useData } from '@/components/providers/DataProvider';
import { FilterOptions } from '@/lib/types';

const CATEGORIES = ['CPU', 'Memory', 'Network', 'Disk', 'API'];

export default function FilterPanel() {
  const { filters, setFilters } = useData();
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleCategoryToggle = useCallback((category: string) => {
    setLocalFilters((prev) => {
      const categories = prev.categories || [];
      const newCategories = categories.includes(category)
        ? categories.filter((c) => c !== category)
        : [...categories, category];
      return { ...prev, categories: newCategories };
    });
  }, []);

  const handleApplyFilters = useCallback(() => {
    setFilters(localFilters);
  }, [localFilters, setFilters]);

  const handleMinValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : undefined;
    setLocalFilters((prev) => ({ ...prev, minValue: value }));
  }, []);

  const handleMaxValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : undefined;
    setLocalFilters((prev) => ({ ...prev, maxValue: value }));
  }, []);

  return (
    <div className="filter-panel">
      <h3 className="filter-title">Filters</h3>

      <div className="filter-section">
        <label className="filter-label">Categories</label>
        <div className="category-list">
          {CATEGORIES.map((category) => (
            <label key={category} className="checkbox-label">
              <input
                type="checkbox"
                checked={localFilters.categories?.includes(category) || false}
                onChange={() => handleCategoryToggle(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Value Range</label>
        <div className="value-range-inputs">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.minValue || ''}
            onChange={handleMinValueChange}
            className="number-input"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={localFilters.maxValue || ''}
            onChange={handleMaxValueChange}
            className="number-input"
          />
        </div>
      </div>

      <button onClick={handleApplyFilters} className="apply-button">
        Apply Filters
      </button>
    </div>
  );
}

