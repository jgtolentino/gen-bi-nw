'use client'
import React from 'react';
import { useEmployeePerformance } from '../../src/hooks/useNorthwindData';

export const TopEmployeesChart: React.FC = () => {
  const { data, loading, error } = useEmployeePerformance();

  if (loading) {
    return <div className="flex items-center justify-center h-48">Loading...</div>;
  }

  if (error || !data) {
    return <div className="flex items-center justify-center h-48 text-red-500">Failed to load data</div>;
  }

  const topEmployees = data.slice(0, 5);
  const maxRevenue = Math.max(...topEmployees.map(d => d.total_revenue));

  // Calculate performance vs target (mock target calculation)
  const getPerformance = (revenue: number) => {
    const target = 200000; // Mock target
    return (revenue / target) * 100;
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 105) return 'text-green-600';
    if (performance >= 95) return 'text-blue-600';
    return 'text-gray-600';
  };

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-3">
      {topEmployees.map((employee, index) => {
        const performance = getPerformance(employee.total_revenue);
        return (
          <div key={employee.employee_id} className="relative">
            <div className="flex items-center mb-2">
              {/* Avatar */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3"
                style={{ backgroundColor: index === 0 ? '#06a77d' : '#2185c7' }}
              >
                {getInitials(employee.employee_name)}
              </div>
              
              {/* Employee Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{employee.employee_name}</p>
                    <p className="text-xs text-gray-500">{employee.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      ${(employee.total_revenue / 1000).toFixed(0)}K
                    </p>
                    <p className={`text-xs font-medium ${getPerformanceColor(performance)}`}>
                      {performance.toFixed(0)}% of target
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Revenue Bar */}
            <div className="ml-13">
              <div className="w-full bg-gray-200 rounded h-4 relative">
                <div
                  className="h-full rounded transition-all duration-300"
                  style={{ 
                    width: `${(employee.total_revenue / maxRevenue) * 100}%`,
                    backgroundColor: index === 0 ? '#06a77d' : '#2185c7',
                    opacity: 0.8 - (index * 0.1)
                  }}
                />
                {/* Performance indicator */}
                {performance >= 100 && (
                  <div className="absolute right-0 top-0 h-full w-0.5 bg-yellow-400"></div>
                )}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{employee.order_count} orders</span>
                <span>${(employee.average_order_value || 0).toFixed(0)} avg/order</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};