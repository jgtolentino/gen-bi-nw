import React from 'react';

interface EmployeeData {
  name: string;
  title: string;
  revenue: number;
  orders: number;
  performance: number;
  avatar: string;
}

export const TopEmployeesChart: React.FC = () => {
  const data: EmployeeData[] = [
    { 
      name: 'Margaret Peacock', 
      title: 'Sales Rep', 
      revenue: 232891, 
      orders: 153,
      performance: 112,
      avatar: 'MP'
    },
    { 
      name: 'Janet Leverling', 
      title: 'Sales Rep', 
      revenue: 202813, 
      orders: 127,
      performance: 108,
      avatar: 'JL'
    },
    { 
      name: 'Nancy Davolio', 
      title: 'Sales Rep', 
      revenue: 192108, 
      orders: 123,
      performance: 98,
      avatar: 'ND'
    },
    { 
      name: 'Andrew Fuller', 
      title: 'VP Sales', 
      revenue: 166538, 
      orders: 104,
      performance: 95,
      avatar: 'AF'
    },
    { 
      name: 'Laura Callahan', 
      title: 'Sales Mgr', 
      revenue: 126862, 
      orders: 89,
      performance: 87,
      avatar: 'LC'
    }
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  const getPerformanceColor = (performance: number) => {
    if (performance >= 105) return 'text-green-600';
    if (performance >= 95) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-3">
      {data.map((employee, index) => (
        <div key={index} className="relative">
          <div className="flex items-center mb-2">
            {/* Avatar */}
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3"
              style={{ backgroundColor: index === 0 ? '#06a77d' : '#2185c7' }}
            >
              {employee.avatar}
            </div>
            
            {/* Employee Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{employee.name}</p>
                  <p className="text-xs text-gray-500">{employee.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    ${(employee.revenue / 1000).toFixed(0)}K
                  </p>
                  <p className={`text-xs font-medium ${getPerformanceColor(employee.performance)}`}>
                    {employee.performance}% of target
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
                  width: `${(employee.revenue / maxRevenue) * 100}%`,
                  backgroundColor: index === 0 ? '#06a77d' : '#2185c7',
                  opacity: 0.8 - (index * 0.1)
                }}
              />
              {/* Performance indicator */}
              {employee.performance >= 100 && (
                <div className="absolute right-0 top-0 h-full w-0.5 bg-yellow-400"></div>
              )}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{employee.orders} orders</span>
              <span>${(employee.revenue / employee.orders).toFixed(0)} avg/order</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};