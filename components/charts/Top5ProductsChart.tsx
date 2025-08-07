import React from 'react';

interface ProductData {
  name: string;
  revenue: number;
  units: number;
  growth: number;
}

export const Top5ProductsChart: React.FC = () => {
  const data: ProductData[] = [
    { name: 'Côte de Blaye', revenue: 141396, units: 623, growth: 15.2 },
    { name: 'Thüringer Rostbratwurst', revenue: 80772, units: 580, growth: 8.7 },
    { name: 'Raclette Courdavault', revenue: 71155, units: 513, growth: -2.3 },
    { name: 'Tarte au sucre', revenue: 49828, units: 348, growth: 12.1 },
    { name: 'Camembert Pierrot', revenue: 46825, units: 279, growth: 18.9 }
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="space-y-4">
      {data.map((product, index) => (
        <div key={index} className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-800">{product.name}</span>
                {product.growth > 0 ? (
                  <span className="ml-2 text-xs text-green-600 font-medium">
                    +{product.growth}%
                  </span>
                ) : (
                  <span className="ml-2 text-xs text-red-600 font-medium">
                    {product.growth}%
                  </span>
                )}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">{product.units} units sold</span>
              </div>
            </div>
            <span className="text-sm font-bold text-gray-900 ml-4">
              ${(product.revenue / 1000).toFixed(1)}K
            </span>
          </div>
          
          <div className="relative w-full bg-gray-100 rounded-full h-8">
            <div
              className="absolute top-0 left-0 h-full rounded-full flex items-center justify-end pr-2"
              style={{
                width: `${(product.revenue / maxRevenue) * 100}%`,
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
      ))}
    </div>
  );
};