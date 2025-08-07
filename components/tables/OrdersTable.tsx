'use client'

import React, { useState } from 'react';
import { 
  ChevronUpIcon, 
  ChevronDownIcon, 
  FunnelIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

interface Order {
  orderId: string;
  customerId: string;
  clientName: string;
  productName: string;
  category: string;
  quantity: number;
  revenue: number;
  profit: number;
  profitMargin: number;
  orderDate: string;
  shipCountry: string;
  employeeName: string;
}

export const OrdersTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Order>('orderDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data
  const orders: Order[] = [
    {
      orderId: '11077',
      customerId: 'RATTC',
      clientName: 'Rattlesnake Canyon',
      productName: 'Côte de Blaye',
      category: 'Beverages',
      quantity: 12,
      revenue: 3156.00,
      profit: 947.20,
      profitMargin: 30.0,
      orderDate: '2023-05-06',
      shipCountry: 'USA',
      employeeName: 'Nancy Davolio'
    },
    {
      orderId: '11076',
      customerId: 'BONAP',
      clientName: 'Bon app\'',
      productName: 'Raclette Courdavault',
      category: 'Dairy Products',
      quantity: 20,
      revenue: 1100.00,
      profit: 385.00,
      profitMargin: 35.0,
      orderDate: '2023-05-06',
      shipCountry: 'France',
      employeeName: 'Margaret Peacock'
    },
    // Add more sample data as needed
  ];

  const handleSort = (column: keyof Order) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ column }: { column: keyof Order }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? 
      <ChevronUpIcon className="w-4 h-4" /> : 
      <ChevronDownIcon className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Table Header Actions */}
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2185c7] focus:border-transparent"
            />
          </div>
          
          {/* Actions */}
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <FunnelIcon className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="px-4 py-2 bg-[#06a77d] text-white rounded-lg hover:bg-[#059669] flex items-center">
              <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('orderId')}
              >
                <div className="flex items-center space-x-1">
                  <span>Order ID</span>
                  <SortIcon column="orderId" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('clientName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Client</span>
                  <SortIcon column="clientName" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('productName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Product</span>
                  <SortIcon column="productName" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  <SortIcon column="category" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('quantity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Qty</span>
                  <SortIcon column="quantity" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center space-x-1">
                  <span>Revenue</span>
                  <SortIcon column="revenue" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('profit')}
              >
                <div className="flex items-center space-x-1">
                  <span>Profit</span>
                  <SortIcon column="profit" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('profitMargin')}
              >
                <div className="flex items-center space-x-1">
                  <span>Margin %</span>
                  <SortIcon column="profitMargin" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('orderDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  <SortIcon column="orderDate" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order.orderId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <p className="font-medium text-gray-900">{order.clientName}</p>
                    <p className="text-xs text-gray-500">{order.customerId}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {order.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                    {order.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  ${(order.revenue ?? 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${(order.profit ?? 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <span className={`font-medium ${
                      order.profitMargin >= 35 ? 'text-green-600' : 
                      order.profitMargin >= 25 ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {(order.profitMargin ?? 0).toFixed(1)}%
                    </span>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          order.profitMargin >= 35 ? 'bg-green-500' : 
                          order.profitMargin >= 25 ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${Math.min(order.profitMargin * 2, 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <img 
                      src={`https://flagcdn.com/16x12/${order.shipCountry.toLowerCase() === 'usa' ? 'us' : order.shipCountry.toLowerCase().slice(0, 2)}.png`} 
                      alt={order.shipCountry}
                      className="w-4 h-3 mr-2"
                    />
                    {order.shipCountry}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">830</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-[#1c3d5a] text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
          <span className="px-3 py-1 text-gray-500">...</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">83</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};