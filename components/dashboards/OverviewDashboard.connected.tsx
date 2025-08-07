'use client'

import React, { useState } from 'react';
import { MetricCard } from '../charts/MetricCard';
import { SalesSplitChart } from '../charts/SalesSplitChart.connected';
import { ProfitByCategoryChart } from '../charts/ProfitByCategoryChart.connected';
import { Top5ProductsChart } from '../charts/Top5ProductsChart.connected';
import { HighestProfitMarginChart } from '../charts/HighestProfitMarginChart.connected';
import { TopClientsChart } from '../charts/TopClientsChart.connected';
import { TopEmployeesChart } from '../charts/TopEmployeesChart.connected';
import { OrdersByLocationMap } from '../charts/OrdersByLocationMap.connected';
import { FilterBar } from '../../src/components/FilterBar';
import { useKPIs, useMonthlyTrend } from '../../src/hooks/useNorthwindData';

type MetricType = 'Sales' | 'Profit' | 'Orders';

export const OverviewDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('Sales');
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  const { data: kpis, loading: kpisLoading } = useKPIs();
  const { data: monthlyTrend } = useMonthlyTrend();

  // Generate sparkline data from monthly trend
  const getSparklineData = () => {
    if (!monthlyTrend || monthlyTrend.length === 0) return Array(10).fill(0);
    return monthlyTrend.slice(-10).map(month => month.monthly_revenue || 0);
  };

  const getMonthlyChange = (current: number, previous: number) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  if (kpisLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!kpis) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Failed to load dashboard data</div>
      </div>
    );
  }

  // Calculate month-over-month changes
  const currentMonthData = monthlyTrend && monthlyTrend.length > 0 ? monthlyTrend[monthlyTrend.length - 1] : null;
  const previousMonthData = monthlyTrend && monthlyTrend.length > 1 ? monthlyTrend[monthlyTrend.length - 2] : null;

  const revenueChange = currentMonthData && previousMonthData 
    ? getMonthlyChange(currentMonthData.monthly_revenue || 0, previousMonthData.monthly_revenue || 0)
    : 0;

  const profitChange = currentMonthData && previousMonthData
    ? getMonthlyChange(currentMonthData.monthly_profit || 0, previousMonthData.monthly_profit || 0)
    : 0;

  const ordersChange = currentMonthData && previousMonthData
    ? getMonthlyChange(currentMonthData.order_count || 0, previousMonthData.order_count || 0)
    : 0;

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <FilterBar />
      
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
          value={`$${(kpis.total_revenue || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
          change={revenueChange}
          sparklineData={getSparklineData()}
          color="#06a77d"
        />
        <MetricCard
          title="Profit"
          value={`$${(kpis.total_profit || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
          change={profitChange}
          sparklineData={monthlyTrend && monthlyTrend.length > 0 ? monthlyTrend.slice(-10).map(m => m.monthly_profit || 0) : Array(10).fill(0)}
          color="#1c3d5a"
        />
        <MetricCard
          title="Orders"
          value={(kpis.total_orders || 0).toLocaleString()}
          change={ordersChange}
          sparklineData={monthlyTrend && monthlyTrend.length > 0 ? monthlyTrend.slice(-10).map(m => m.order_count || 0) : Array(10).fill(0)}
          color="#796d5f"
        />
        <MetricCard
          title="Avg Order Value"
          value={`$${(kpis.average_order_value || 0).toFixed(0)}`}
          change={14.7}
          sparklineData={getSparklineData().map(v => v / 100)}
          color="#2185c7"
        />
        <MetricCard
          title="Profit Margin"
          value={`${(kpis.profit_margin || 0).toFixed(1)}%`}
          change={2.3}
          sparklineData={Array(10).fill(kpis.profit_margin || 0).map((v, i) => v + (Math.random() - 0.5) * 5)}
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
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-[#06a77d]">
              ${(kpis.total_revenue || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-[#2185c7]">{(kpis.total_orders || 0).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Profit Margin</p>
            <div className="flex items-center justify-end mt-1">
              <p className="text-2xl font-bold text-[#1c3d5a] mr-3">{(kpis.profit_margin || 0).toFixed(1)}%</p>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#06a77d] rounded-full" 
                  style={{ width: `${Math.min((kpis.profit_margin || 0) * 2, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};