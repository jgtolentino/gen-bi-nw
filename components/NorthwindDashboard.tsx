import React, { useState } from 'react';
import { OverviewDashboard } from './dashboards/OverviewDashboard';
import { OrderDetailsDashboard } from './dashboards/OrderDetailsDashboard';
import { SQLDataPrepDashboard } from './dashboards/SQLDataPrepDashboard';
import { DashboardLayout } from './layout/DashboardLayout';

export type DashboardView = 'overview' | 'order-details' | 'sql-data-prep';

export const NorthwindDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<DashboardView>('overview');

  const renderDashboard = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewDashboard />;
      case 'order-details':
        return <OrderDetailsDashboard />;
      case 'sql-data-prep':
        return <SQLDataPrepDashboard />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <DashboardLayout activeView={activeView} onViewChange={setActiveView}>
      {renderDashboard()}
    </DashboardLayout>
  );
};