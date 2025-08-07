import React from 'react';

interface ClientData {
  name: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  trend: 'up' | 'down' | 'stable';
}

export const TopClientsChart: React.FC = () => {
  const data: ClientData[] = [
    { name: 'QUICK-Stop', revenue: 110277, orders: 86, avgOrderValue: 1282, trend: 'up' },
    { name: 'Ernst Handel', revenue: 104874, orders: 79, avgOrderValue: 1327, trend: 'up' },
    { name: 'Save-a-lot Markets', revenue: 104361, orders: 85, avgOrderValue: 1228, trend: 'stable' },
    { name: 'Rattlesnake Canyon', revenue: 51097, orders: 52, avgOrderValue: 983, trend: 'down' },
    { name: 'Hungry Owl All-Night', revenue: 49979, orders: 48, avgOrderValue: 1041, trend: 'up' }
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↑</span>;
      case 'down':
        return <span className="text-red-500">↓</span>;
      default:
        return <span className="text-gray-400">→</span>;
    }
  };

  return (
    <div className="space-y-3">
      {data.map((client, index) => (
        <div key={index} className="relative group">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                {client.name}
              </span>
              <span className="ml-1">{getTrendIcon(client.trend)}</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              ${(client.revenue / 1000).toFixed(1)}K
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 rounded h-5">
              <div
                className="h-full bg-gradient-to-r from-[#06a77d] to-[#2185c7] rounded transition-all duration-300"
                style={{ width: `${(client.revenue / maxRevenue) * 100}%` }}
              />
            </div>
            
            {/* Hover tooltip */}
            <div className="absolute -top-8 left-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
              {client.orders} orders • ${client.avgOrderValue} avg
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{client.orders} orders</span>
            <span>${client.avgOrderValue} avg</span>
          </div>
        </div>
      ))}
    </div>
  );
};