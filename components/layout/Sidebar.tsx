'use client'

import React from 'react';
import { DashboardView } from '../NorthwindDashboard';
import { ChartBarIcon, TableCellsIcon, CircleStackIcon } from '@heroicons/react/24/outline';

interface NavigationItem {
  id: DashboardView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  backgroundColor: string;
  borderColor: string;
}

interface SidebarProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navigationItems: NavigationItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: ChartBarIcon,
      backgroundColor: '#1c3d5a',
      borderColor: '#2e6494'
    },
    {
      id: 'order-details',
      label: 'Order Details',
      icon: TableCellsIcon,
      backgroundColor: '#59758a',
      borderColor: '#2185c7'
    },
    {
      id: 'sql-data-prep',
      label: 'SQL Data Prep',
      icon: CircleStackIcon,
      backgroundColor: '#2185c7',
      borderColor: '#06a77d'
    }
  ];

  return (
    <div className="w-48 bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-lg font-bold text-gray-800">Northwind Sales</h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3">
        {navigationItems.map((item) => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                w-full mb-2 p-3 rounded-lg transition-all duration-200 flex items-center
                ${isActive 
                  ? 'text-white shadow-md transform scale-105' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              style={{
                backgroundColor: isActive ? item.backgroundColor : 'transparent',
                borderLeft: isActive ? `5px solid ${item.borderColor}` : '5px solid transparent'
              }}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-600'}`} />
              <span className={`font-medium text-sm ${isActive ? 'text-white' : 'text-gray-700'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Parameter Controls Section */}
      <div className="p-4 border-t">
        <div className="bg-gray-100 rounded-lg p-3">
          <h3 className="text-xs font-bold text-gray-600 uppercase mb-2">
            Include Last Month of Dataset
          </h3>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="sr-only"
            />
            <div className="relative">
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform translate-x-6"></div>
            </div>
            <span className="ml-3 text-sm text-gray-700">Exclude</span>
          </label>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t text-center">
        <p className="text-xs text-gray-500">Adventure Works Theme</p>
      </div>
    </div>
  );
};