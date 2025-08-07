'use client'

import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  sparklineData: number[];
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  sparklineData,
  color
}) => {
  const isPositive = change > 0;
  const maxValue = Math.max(...sparklineData);
  const minValue = Math.min(...sparklineData);
  const range = maxValue - minValue;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <h4 className="text-sm font-medium text-gray-600 mb-2">{title}</h4>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      
      {/* Change Indicator */}
      <div className={`flex items-center mb-3 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
        ) : (
          <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
        )}
        <span className="text-sm font-medium">{Math.abs(change)}%</span>
        <span className="text-xs text-gray-500 ml-1">vs last month</span>
      </div>

      {/* Sparkline */}
      <div className="h-12 flex items-end space-x-1">
        {sparklineData.map((value, index) => {
          const height = ((value - minValue) / range) * 100;
          return (
            <div
              key={index}
              className="flex-1 rounded-t transition-all hover:opacity-80"
              style={{
                height: `${height}%`,
                backgroundColor: color,
                opacity: 0.7 + (index / sparklineData.length) * 0.3
              }}
            />
          );
        })}
      </div>
    </div>
  );
};