import React, { useState } from 'react';
import { OrdersTable } from '../tables/OrdersTable';

export const OrderDetailsDashboard: React.FC = () => {
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800">{currentMonth} - Order Details</h2>
        <p className="text-gray-600 mt-2">
          Detailed view of all orders with filtering, sorting, and export capabilities
        </p>
      </div>

      {/* Orders Table */}
      <OrdersTable />
    </div>
  );
};