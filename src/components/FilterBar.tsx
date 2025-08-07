import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDashboardFilters } from '../store/useDashboardFilters';

export const FilterBar: React.FC = () => {
  const {
    selectedCategory,
    selectedClient,
    selectedProduct,
    selectedEmployee,
    selectedCountry,
    dateRange,
    clearFilter,
    reset,
    hasActiveFilters,
  } = useDashboardFilters();

  if (!hasActiveFilters()) {
    return null;
  }

  const filters = [
    { type: 'category' as const, label: 'Category', value: selectedCategory },
    { type: 'client' as const, label: 'Customer', value: selectedClient },
    { type: 'product' as const, label: 'Product', value: selectedProduct },
    { type: 'employee' as const, label: 'Employee', value: selectedEmployee },
    { type: 'country' as const, label: 'Country', value: selectedCountry },
  ];

  const activeFilters = filters.filter(f => f.value);

  return (
    <div className="bg-gray-50 border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Active Filters:</span>
          
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(({ type, label, value }) => (
              <div
                key={type}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
              >
                <span className="font-medium">{label}:</span>
                <span>{value}</span>
                <button
                  onClick={() => clearFilter(type)}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  aria-label={`Remove ${label} filter`}
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
            
            {(dateRange.start || dateRange.end) && (
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                <span className="font-medium">Date:</span>
                <span>
                  {dateRange.start || 'Any'} - {dateRange.end || 'Any'}
                </span>
                <button
                  onClick={() => clearFilter('dateRange')}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  aria-label="Remove date filter"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={reset}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};