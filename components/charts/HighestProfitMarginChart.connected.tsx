import React from 'react';
import { useProductProfitability } from '../../src/hooks/useNorthwindData';

export const HighestProfitMarginChart: React.FC = () => {
  const { data, loading, error } = useProductProfitability(5);

  if (loading) {
    return <div className="flex items-center justify-center h-48">Loading...</div>;
  }

  if (error || !data) {
    return <div className="flex items-center justify-center h-48 text-red-500">Failed to load data</div>;
  }

  const categoryColors: Record<string, string> = {
    'Beverages': '#06a77d',
    'Dairy Products': '#1c3d5a',
    'Confections': '#796d5f',
    'Condiments': '#2185c7',
    'Meat/Poultry': '#e6e1c4',
    'Seafood': '#ff8c00',
    'Produce': '#4b5563',
    'Grains/Cereals': '#10b981'
  };

  return (
    <div className="space-y-4">
      {data.map((product, index) => (
        <div key={product.product_name} className="flex items-center">
          {/* Rank */}
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
            <span className="text-xs font-bold text-gray-600">{index + 1}</span>
          </div>
          
          {/* Product Info and Bar */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="text-sm font-medium text-gray-800">{product.product_name}</span>
                <span
                  className="ml-2 text-xs px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: categoryColors[product.category_name] || '#gray' }}
                >
                  {product.category_name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{product.profit_margin.toFixed(1)}%</span>
                <span className="text-xs text-gray-500 ml-2">
                  (${(product.revenue / 1000).toFixed(1)}K)
                </span>
              </div>
            </div>
            
            {/* Margin Bar */}
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div
                className="h-full rounded-full flex items-center justify-end pr-2"
                style={{
                  width: `${Math.min(product.profit_margin, 100)}%`,
                  backgroundColor: categoryColors[product.category_name] || '#gray',
                  opacity: 0.9 - (index * 0.1)
                }}
              >
                {product.profit_margin > 30 && (
                  <span className="text-xs text-white font-medium">
                    {product.profit_margin.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Threshold Line */}
      <div className="relative mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>0%</span>
          <span className="text-red-500 font-medium">Industry Avg: 25%</span>
          <span>50%</span>
        </div>
        <div className="absolute top-6 left-[50%] w-0.5 h-32 bg-red-400 -mt-32"></div>
      </div>
    </div>
  );
};