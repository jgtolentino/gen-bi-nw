'use client'
import React from 'react';
import { useTopProducts } from '../../src/hooks/useNorthwindData';

export const Top5ProductsChart: React.FC = () => {
  const { data, loading, error } = useTopProducts(5);

  if (loading) {
    return <div className="flex items-center justify-center h-48">Loading...</div>;
  }

  if (error || !data) {
    return <div className="flex items-center justify-center h-48 text-red-500">Failed to load data</div>;
  }

  const maxRevenue = Math.max(...data.map(d => d.total_revenue));

  // Calculate growth (mock data for now - in real app, compare with previous period)
  const getGrowth = (index: number) => {
    const growthRates = [15.2, 8.7, -2.3, 12.1, 18.9];
    return growthRates[index] || 0;
  };

  return (
    <div className="space-y-4">
      {data.map((product, index) => {
        const growth = getGrowth(index);
        return (
          <div key={product.product_name} className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-800">{product.product_name}</span>
                  {growth > 0 ? (
                    <span className="ml-2 text-xs text-green-600 font-medium">
                      +{growth}%
                    </span>
                  ) : (
                    <span className="ml-2 text-xs text-red-600 font-medium">
                      {growth}%
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500">{product.total_quantity} units sold</span>
                  <span className="text-xs text-gray-400 mx-1">•</span>
                  <span className="text-xs text-gray-500">{product.category_name}</span>
                </div>
              </div>
              <span className="text-sm font-bold text-gray-900 ml-4">
                ${(product.total_revenue / 1000).toFixed(1)}K
              </span>
            </div>
            
            <div className="relative w-full bg-gray-100 rounded-full h-8">
              <div
                className="absolute top-0 left-0 h-full rounded-full flex items-center justify-end pr-2"
                style={{
                  width: `${(product.total_revenue / maxRevenue) * 100}%`,
                  backgroundColor: index === 0 ? '#06a77d' : '#2185c7',
                  opacity: 0.8 - (index * 0.1)
                }}
              >
                <span className="text-xs text-white font-medium">
                  #{index + 1}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};