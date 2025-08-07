'use client'

import React from 'react';

export const SQLDataPrepDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800">SQL Data Preparation</h2>
        <p className="text-gray-600 mt-2">
          Data model and SQL transformations used in this dashboard
        </p>
      </div>

      {/* Data Model Diagram */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Model</h3>
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center" style={{ minHeight: '400px' }}>
          <img 
            src="/data_model.PNG" 
            alt="Data Model Diagram"
            className="max-w-full h-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <p className="text-gray-600">Data model diagram would be displayed here</p>
          </div>
        </div>
      </div>

      {/* SQL Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Sources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Sources</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-[#06a77d] pl-4">
              <h4 className="font-medium text-gray-800">Orders Table</h4>
              <p className="text-sm text-gray-600">Main transactional data with order details</p>
              <p className="text-xs text-gray-500 mt-1">2,155 records • Last updated: Today</p>
            </div>
            <div className="border-l-4 border-[#1c3d5a] pl-4">
              <h4 className="font-medium text-gray-800">Products</h4>
              <p className="text-sm text-gray-600">Product catalog with categories and pricing</p>
              <p className="text-xs text-gray-500 mt-1">77 products • 8 categories</p>
            </div>
            <div className="border-l-4 border-[#2185c7] pl-4">
              <h4 className="font-medium text-gray-800">Customers</h4>
              <p className="text-sm text-gray-600">Customer information and locations</p>
              <p className="text-xs text-gray-500 mt-1">91 customers • 21 countries</p>
            </div>
            <div className="border-l-4 border-[#796d5f] pl-4">
              <h4 className="font-medium text-gray-800">Employees</h4>
              <p className="text-sm text-gray-600">Sales team and organizational structure</p>
              <p className="text-xs text-gray-500 mt-1">9 employees • 3 regions</p>
            </div>
          </div>
        </div>

        {/* Key Transformations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Transformations</h3>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-medium text-gray-800 text-sm">Revenue Calculation</h4>
              <code className="text-xs text-gray-600 block mt-1">
                Revenue = UnitPrice * Quantity * (1 - Discount)
              </code>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-medium text-gray-800 text-sm">Profit Calculation</h4>
              <code className="text-xs text-gray-600 block mt-1">
                Profit = Revenue - (UnitCost * Quantity) - FreightByProduct
              </code>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-medium text-gray-800 text-sm">Profit Margin</h4>
              <code className="text-xs text-gray-600 block mt-1">
                ProfitMargin = (Profit / Revenue) * 100
              </code>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-medium text-gray-800 text-sm">Date Dimensions</h4>
              <code className="text-xs text-gray-600 block mt-1">
                Year, Quarter, Month, Week extracted from OrderDate
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Query Examples */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sample Queries</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Top Products by Revenue</h4>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`SELECT 
  p.ProductName,
  c.CategoryName,
  SUM(od.Revenue) as TotalRevenue,
  SUM(od.Quantity) as UnitsSold,
  AVG(od.Discount) as AvgDiscount
FROM OrderDetails od
JOIN Products p ON od.ProductID = p.ProductID
JOIN Categories c ON p.CategoryID = c.CategoryID
WHERE YEAR(o.OrderDate) = 2023
GROUP BY p.ProductName, c.CategoryName
ORDER BY TotalRevenue DESC
LIMIT 5;`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Monthly Sales Trend</h4>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`SELECT 
  DATE_FORMAT(OrderDate, '%Y-%m') as Month,
  COUNT(DISTINCT OrderID) as Orders,
  SUM(Revenue) as Revenue,
  SUM(Profit) as Profit,
  AVG(Revenue/Quantity) as AvgOrderValue
FROM Orders
WHERE OrderDate >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(OrderDate, '%Y-%m')
ORDER BY Month;`}
            </pre>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Dashboard Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#06a77d]">2.3s</div>
            <p className="text-sm text-gray-600">Avg Load Time</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1c3d5a]">830</div>
            <p className="text-sm text-gray-600">Records/Month</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2185c7]">99.9%</div>
            <p className="text-sm text-gray-600">Data Accuracy</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#796d5f]">15min</div>
            <p className="text-sm text-gray-600">Refresh Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};