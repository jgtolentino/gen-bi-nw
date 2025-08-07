import React from 'react';
import { useSalesByCategory } from '../../src/hooks/useNorthwindData';

export const SalesSplitChart: React.FC = () => {
  const { data, loading, error } = useSalesByCategory();

  if (loading) {
    return <div className="flex items-center justify-center h-48">Loading...</div>;
  }

  if (error || !data) {
    return <div className="flex items-center justify-center h-48 text-red-500">Failed to load data</div>;
  }

  // Color palette from Adventure Works theme
  const colors = ['#06a77d', '#1c3d5a', '#796d5f', '#2185c7', '#e6e1c4', '#ff8c00', '#4b5563', '#10b981'];
  
  const total = data.reduce((sum, item) => sum + item.total_revenue, 0);
  let currentAngle = -90; // Start from top

  const createPath = (item: typeof data[0], index: number) => {
    const percentage = item.total_revenue / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = startAngle + angle;
    currentAngle = endAngle;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = 100 + 80 * Math.cos(startAngleRad);
    const y1 = 100 + 80 * Math.sin(startAngleRad);
    const x2 = 100 + 80 * Math.cos(endAngleRad);
    const y2 = 100 + 80 * Math.sin(endAngleRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Reset angle for each render
  const renderPaths = () => {
    currentAngle = -90;
    return data.map((item, index) => (
      <g key={item.category_name}>
        <path
          d={createPath(item, index)}
          fill={colors[index % colors.length]}
          stroke="white"
          strokeWidth="2"
          className="hover:opacity-80 transition-opacity cursor-pointer"
        />
      </g>
    ));
  };

  return (
    <div className="flex items-center justify-between">
      {/* Pie Chart */}
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {renderPaths()}
        </svg>
        {/* Center hole for donut effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-sm font-bold">${(total / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 ml-6">
        {data.map((item, index) => (
          <div key={item.category_name} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-700">{item.category_name}</span>
            </div>
            <div className="ml-4 text-right">
              <div className="text-sm font-semibold text-gray-900">
                ${(item.total_revenue / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-gray-500">
                {((item.total_revenue / total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};