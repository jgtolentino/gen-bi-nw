import React from 'react';
import { useSalesByCategory } from '../../src/hooks/useNorthwindData';

export const ProfitByCategoryChart: React.FC = () => {
  const { data, loading, error } = useSalesByCategory();

  if (loading) {
    return <div className="flex items-center justify-center h-48">Loading...</div>;
  }

  if (error || !data) {
    return <div className="flex items-center justify-center h-48 text-red-500">Failed to load data</div>;
  }

  const maxProfit = Math.max(...data.map(d => d.total_profit));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={item.category_name} className="relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{item.category_name}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900">
                ${(item.total_profit / 1000).toFixed(1)}K
              </span>
              <span className="text-xs text-gray-500">
                ({item.profit_margin.toFixed(1)}%)
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1c3d5a] to-[#2185c7] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(item.total_profit / maxProfit) * 100}%` }}
            />
            {/* Margin indicator */}
            <div
              className="absolute top-0 h-full w-1 bg-[#06a77d]"
              style={{ left: `${item.profit_margin}%` }}
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