'use client'

import React from 'react';
import { Sidebar } from './Sidebar';
import { DashboardView } from '../NorthwindDashboard';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeView,
  onViewChange
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={onViewChange} />
      <main className="flex-1 overflow-auto bg-[#f7f7f9]">
        <div className="w-full max-w-[1400px] mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
};