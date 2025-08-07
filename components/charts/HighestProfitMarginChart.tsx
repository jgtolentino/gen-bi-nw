import React from 'react';

interface ProductMarginData {
  name: string;
  margin: number;
  profit: number;
  category: string;
}

export const HighestProfitMarginChart: React.FC = () => {
  const data: ProductMarginData[] = [
    { name: 'Ipoh Coffee', margin: 45.2, profit: 23456, category: 'Beverages' },
    { name: 'Guaraná Fantástica', margin: 42.8, profit: 19823, category: 'Beverages' },
    { name: 'Schoggi Schokolade', margin: 41.3, profit: 15234, category: 'Confections' },
    { name: 'Vegie-spread', margin: 40.7, profit: 12987, category: 'Condiments' },
    { name: 'Northwoods Cranberry', margin: 39.8, profit: 11234, category: 'Condiments' }
  ];

  const categoryColors: Record<string, string> = {
    'Beverages': '#06a77d',
    'Confections': '#796d5f',
    'Condiments': '#2185c7',
    'Dairy Products': '#1c3d5a',
    'Meat/Poultry': '#e6e1c4'
  };

  return (
    <div className="space-y-4">
      {data.map((product, index) => (
        <div key={index} className="flex items-center">
          {/* Rank */}
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
            <span className="text-xs font-bold text-gray-600">{index + 1}</span>
          </div>
          
          {/* Product Info and Bar */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="text-sm font-medium text-gray-800">{product.name}</span>
                <span
                  className="ml-2 text-xs px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: categoryColors[product.category] || '#gray' }}
                >
                  {product.category}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{product.margin}%</span>
                <span className="text-xs text-gray-500 ml-2">
                  (${(product.profit / 1000).toFixed(1)}K)
                </span>
              </div>
            </div>
            
            {/* Margin Bar */}
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div
                className="h-full rounded-full flex items-center justify-end pr-2"
                style={{
                  width: `${product.margin}%`,
                  backgroundColor: categoryColors[product.category] || '#gray',
                  opacity: 0.9 - (index * 0.1)
                }}
              >
                {product.margin > 30 && (
                  <span className="text-xs text-white font-medium">
                    {product.margin}%
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
          <span>Industry Avg: 35%</span>
          <span>50%</span>
        </div>
        <div className="absolute top-6 left-[70%] w-0.5 h-32 bg-red-400 -mt-32"></div>
      </div>
    </div>
  );
};