'use client'
import React from 'react';
import { useOrdersByCountry } from '../../src/hooks/useNorthwindData';

export const OrdersByLocationMap: React.FC = () => {
  const { data, loading, error } = useOrdersByCountry();

  if (loading) {
    return <div className="flex items-center justify-center h-48">Loading...</div>;
  }

  if (error || !data) {
    return <div className="flex items-center justify-center h-48 text-red-500">Failed to load data</div>;
  }

  const topCountries = data.slice(0, 5);
  const maxRevenue = topCountries.length > 0 ? Math.max(...topCountries.map(d => d.total_revenue || 0)) : 0;

  // Country positions on simplified map
  const countryPositions: Record<string, { top: string; left: string }> = {
    'USA': { top: '35%', left: '20%' },
    'Germany': { top: '25%', left: '50%' },
    'Austria': { top: '35%', left: '52%' },
    'Brazil': { top: '65%', left: '35%' },
    'France': { top: '30%', left: '48%' },
    'UK': { top: '20%', left: '45%' },
    'Spain': { top: '35%', left: '45%' },
    'Canada': { top: '25%', left: '25%' },
    'Mexico': { top: '45%', left: '25%' },
    'Italy': { top: '40%', left: '50%' }
  };

  const colors = ['#06a77d', '#1c3d5a', '#2185c7', '#796d5f', '#e6e1c4'];

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
        {topCountries.map((location, index) => {
          const position = countryPositions[location.country] || { top: '50%', left: '50%' };
          const size = 20 + (location.total_revenue / maxRevenue) * 40;
          const color = colors[index % colors.length];
          
          return (
            <div
              key={location.country}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{
                top: position.top,
                left: position.left
              }}
            >
              {/* Pulse effect */}
              <div
                className="absolute rounded-full animate-ping opacity-25"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
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
                  backgroundColor: color,
                  fontSize: `${size / 4}px`
                }}
              >
                {location.order_count}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block z-10">
                <div className="bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap">
                  <p className="font-bold">{location.country}</p>
                  <p>{location.order_count} orders</p>
                  <p>${((location.total_revenue || 0) / 1000).toFixed(1)}K revenue</p>
                  <p>{location.customer_count} customers</p>
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
          {topCountries.slice(0, 3).map((location, index) => (
            <div key={location.country} className="flex items-center text-xs">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-gray-600">{location.country}: {location.order_count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};