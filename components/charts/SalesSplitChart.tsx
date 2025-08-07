import React from 'react';

interface SalesData {
  category: string;
  value: number;
  color: string;
}

export const SalesSplitChart: React.FC = () => {
  const data: SalesData[] = [
    { category: 'Beverages', value: 267834, color: '#06a77d' },
    { category: 'Dairy Products', value: 234619, color: '#1c3d5a' },
    { category: 'Confections', value: 177289, color: '#796d5f' },
    { category: 'Meat/Poultry', value: 163842, color: '#2185c7' },
    { category: 'Seafood', value: 131261, color: '#e6e1c4' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90; // Start from top

  const createPath = (item: SalesData) => {
    const percentage = item.value / total;
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

  return (
    <div className="flex items-center justify-between">
      {/* Pie Chart */}
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {data.map((item, index) => (
            <g key={index}>
              <path
                d={createPath(item)}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            </g>
          ))}
        </svg>
        {/* Center hole for donut effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 ml-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700">{item.category}</span>
            </div>
            <div className="ml-4 text-right">
              <div className="text-sm font-semibold text-gray-900">
                ${(item.value / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-gray-500">
                {((item.value / total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};