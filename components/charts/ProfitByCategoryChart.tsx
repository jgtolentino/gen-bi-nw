import React from 'react';

interface CategoryData {
  category: string;
  profit: number;
  margin: number;
}

export const ProfitByCategoryChart: React.FC = () => {
  const data: CategoryData[] = [
    { category: 'Beverages', profit: 78234, margin: 29.2 },
    { category: 'Dairy Products', profit: 65892, margin: 28.1 },
    { category: 'Confections', profit: 54123, margin: 30.5 },
    { category: 'Meat/Poultry', profit: 48765, margin: 29.8 },
    { category: 'Seafood', profit: 41234, margin: 31.4 },
    { category: 'Condiments', profit: 35678, margin: 32.1 },
    { category: 'Grains/Cereals', profit: 28934, margin: 27.8 },
    { category: 'Produce', profit: 25432, margin: 26.5 }
  ];

  const maxProfit = Math.max(...data.map(d => d.profit));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{item.category}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900">
                ${(item.profit / 1000).toFixed(1)}K
              </span>
              <span className="text-xs text-gray-500">
                ({item.margin.toFixed(1)}%)
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1c3d5a] to-[#2185c7] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(item.profit / maxProfit) * 100}%` }}
            />
            {/* Margin indicator */}
            <div
              className="absolute top-0 h-full w-1 bg-[#06a77d]"
              style={{ left: `${item.margin}%` }}
            />
          </div>
        </div>
      ))}
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-[#1c3d5a] to-[#2185c7] rounded mr-2" />
          <span className="text-xs text-gray-600">Profit Amount</span>
        </div>
        <div className="flex items-center">
          <div className="w-1 h-4 bg-[#06a77d] mr-2" />
          <span className="text-xs text-gray-600">Profit Margin %</span>
        </div>
      </div>
    </div>
  );
};