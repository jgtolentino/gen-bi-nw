import React from 'react';

interface LocationData {
  country: string;
  orders: number;
  revenue: number;
  color: string;
  position: { top: string; left: string };
}

export const OrdersByLocationMap: React.FC = () => {
  const data: LocationData[] = [
    { 
      country: 'USA', 
      orders: 122, 
      revenue: 263566,
      color: '#06a77d',
      position: { top: '35%', left: '20%' }
    },
    { 
      country: 'Germany', 
      orders: 115, 
      revenue: 244640,
      color: '#1c3d5a',
      position: { top: '25%', left: '50%' }
    },
    { 
      country: 'Austria', 
      orders: 78, 
      revenue: 139496,
      color: '#2185c7',
      position: { top: '35%', left: '52%' }
    },
    { 
      country: 'Brazil', 
      orders: 83, 
      revenue: 114968,
      color: '#796d5f',
      position: { top: '65%', left: '35%' }
    },
    { 
      country: 'France', 
      orders: 77, 
      revenue: 85498,
      color: '#e6e1c4',
      position: { top: '30%', left: '48%' }
    }
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="relative h-80">
      {/* Simple world map background */}
      <div className="absolute inset-0 bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Map grid lines */}
          <div className="grid grid-cols-6 grid-rows-4 h-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>
        
        {/* Location dots */}
        {data.map((location, index) => {
          const size = 20 + (location.revenue / maxRevenue) * 40;
          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{
                top: location.position.top,
                left: location.position.left
              }}
            >
              {/* Pulse effect */}
              <div
                className="absolute rounded-full animate-ping opacity-25"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: location.color,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              
              {/* Main dot */}
              <div
                className="relative rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-transform"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: location.color,
                  fontSize: `${size / 4}px`
                }}
              >
                {location.orders}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block z-10">
                <div className="bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap">
                  <p className="font-bold">{location.country}</p>
                  <p>{location.orders} orders</p>
                  <p>${(location.revenue / 1000).toFixed(1)}K revenue</p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded p-3 shadow">
        <p className="text-xs font-semibold text-gray-700 mb-2">Orders by Country</p>
        <div className="space-y-1">
          {data.slice(0, 3).map((location, index) => (
            <div key={index} className="flex items-center text-xs">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: location.color }}
              />
              <span className="text-gray-600">{location.country}: {location.orders}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};