import React, { useState } from 'react';
import { MetricCard } from '../charts/MetricCard';
import { SalesSplitChart } from '../charts/SalesSplitChart';
import { ProfitByCategoryChart } from '../charts/ProfitByCategoryChart';
import { Top5ProductsChart } from '../charts/Top5ProductsChart';
import { HighestProfitMarginChart } from '../charts/HighestProfitMarginChart';
import { TopClientsChart } from '../charts/TopClientsChart';
import { TopEmployeesChart } from '../charts/TopEmployeesChart';
import { OrdersByLocationMap } from '../charts/OrdersByLocationMap';

type MetricType = 'Sales' | 'Profit' | 'Orders';

export const OverviewDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('Sales');
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800">{currentMonth}</h2>
        
        {/* Metric Selector */}
        <div className="mt-4 flex space-x-2">
          {(['Sales', 'Profit', 'Orders'] as MetricType[]).map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm transition-all
                ${selectedMetric === metric
                  ? 'bg-[#1c3d5a] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {metric.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Revenue"
          value="$1,265,793"
          change={12.5}
          sparklineData={[20, 35, 40, 25, 50, 60, 45, 70, 65, 80]}
          color="#06a77d"
        />
        <MetricCard
          title="Profit"
          value="$378,234"
          change={8.3}
          sparklineData={[30, 25, 35, 40, 45, 35, 50, 55, 60, 65]}
          color="#1c3d5a"
        />
        <MetricCard
          title="Orders"
          value="830"
          change={-2.1}
          sparklineData={[40, 45, 35, 50, 45, 55, 50, 60, 55, 58]}
          color="#796d5f"
        />
        <MetricCard
          title="Discounted Revenue"
          value="$1,139,214"
          change={10.8}
          sparklineData={[25, 30, 35, 40, 45, 50, 45, 55, 60, 70]}
          color="#2185c7"
        />
        <MetricCard
          title="Avg Order Value"
          value="$1,525"
          change={14.7}
          sparklineData={[35, 40, 38, 45, 50, 48, 55, 60, 65, 75]}
          color="#e6e1c4"
        />
      </div>

      {/* Charts Grid - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Split</h3>
          <SalesSplitChart />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit by Category</h3>
          <ProfitByCategoryChart />
        </div>
      </div>

      {/* Charts Grid - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Products</h3>
          <Top5ProductsChart />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Highest Profit Margin Products</h3>
          <HighestProfitMarginChart />
        </div>
      </div>

      {/* Charts Grid - Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Clients</h3>
          <TopClientsChart />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Employees</h3>
          <TopEmployeesChart />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders by Location</h3>
          <OrdersByLocationMap />
        </div>
      </div>

      {/* YTD Comparison */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Year-to-Date Performance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">This Year Sales</p>
            <p className="text-2xl font-bold text-[#06a77d]">$15,234,567</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">vs Previous Year</p>
            <p className="text-2xl font-bold text-[#2185c7]">+23.4%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Growth Indicator</p>
            <div className="flex items-center justify-end mt-1">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#06a77d] rounded-full" style={{ width: '73.4%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};