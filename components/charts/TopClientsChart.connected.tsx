'use client'
import React from 'react';
import { useTopCustomers } from '../../src/hooks/useNorthwindData';

export const TopClientsChart: React.FC = () => {
  const { data, loading, error } = useTopCustomers(5);

  if (loading) {
    return <div className="flex items-center justify-center h-48">Loading...</div>;
  }

  if (error || !data) {
    return <div className="flex items-center justify-center h-48 text-red-500">Failed to load data</div>;
  }

  const maxRevenue = Math.max(...data.map(d => d.total_revenue));

  // Mock trend data - in real app, compare with previous period
  const getTrend = (index: number): 'up' | 'down' | 'stable' => {
    const trends: ('up' | 'down' | 'stable')[] = ['up', 'up', 'stable', 'down', 'up'];
    return trends[index] || 'stable';
  };

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
      {data.map((client, index) => {
        const trend = getTrend(index);
        return (
          <div key={client.customer_id} className="relative group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                  {client.company_name}
                </span>
                <span className="ml-1">{getTrendIcon(trend)}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                ${(client.total_revenue / 1000).toFixed(1)}K
              </span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded h-5">
                <div
                  className="h-full bg-gradient-to-r from-[#06a77d] to-[#2185c7] rounded transition-all duration-300"
                  style={{ width: `${(client.total_revenue / maxRevenue) * 100}%` }}
                />
              </div>
              
              {/* Hover tooltip */}
              <div className="absolute -top-8 left-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                {client.order_count} orders • ${client.average_order_value.toFixed(0)} avg
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{client.order_count} orders</span>
              <span>${client.average_order_value.toFixed(0)} avg</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};