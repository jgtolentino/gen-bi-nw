// Diagnostic utility to test all Supabase endpoints
// Run this in browser console to identify which views are missing

import { supabase } from '../lib/supabase';

export async function runDiagnostics() {
  console.log('🔍 Running Northwind Dashboard Diagnostics...\n');
  
  const endpoints = [
    { name: 'KPIs', table: 'nw_dashboard_kpis', method: 'single' },
    { name: 'Sales by Category', table: 'nw_sales_by_category', method: 'select' },
    { name: 'Top Products', table: 'nw_top_products', method: 'select' },
    { name: 'Top Customers', table: 'nw_top_customers', method: 'select' },
    { name: 'Monthly Revenue Trend', table: 'nw_monthly_revenue_trend', method: 'select' },
    { name: 'Orders by Country', table: 'nw_orders_by_country', method: 'select' },
    { name: 'Employee Performance', table: 'nw_employee_performance', method: 'select' },
    { name: 'Product Profitability', table: 'nw_product_profitability', method: 'select' },
    { name: 'Customer Orders', table: 'nw_customer_orders', method: 'select' }
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      let query = supabase.from(endpoint.table).select('*');
      
      if (endpoint.method === 'single') {
        const { data, error } = await query.single();
        if (error) throw error;
        results.push({
          endpoint: endpoint.name,
          table: endpoint.table,
          status: '✅ OK',
          records: 1,
          sample: data
        });
      } else {
        const { data, error } = await query.limit(3);
        if (error) throw error;
        results.push({
          endpoint: endpoint.name,
          table: endpoint.table,
          status: '✅ OK',
          records: data?.length || 0,
          sample: data?.[0]
        });
      }
    } catch (error: any) {
      results.push({
        endpoint: endpoint.name,
        table: endpoint.table,
        status: '❌ FAILED',
        error: error.message || 'Unknown error',
        hint: error.code === '42P01' ? 'View does not exist - run migration script' : 'Check permissions or data'
      });
    }
  }

  // Print results
  console.table(results.map(r => ({
    Endpoint: r.endpoint,
    Table: r.table,
    Status: r.status,
    Records: r.records || '-',
    Error: r.error || '-'
  })));

  // Summary
  const passed = results.filter(r => r.status === '✅ OK').length;
  const failed = results.filter(r => r.status === '❌ FAILED').length;
  
  console.log(`\n📊 Summary: ${passed}/${endpoints.length} endpoints working`);
  
  if (failed > 0) {
    console.log('\n❌ Failed endpoints need attention:');
    results.filter(r => r.status === '❌ FAILED').forEach(r => {
      console.log(`- ${r.table}: ${r.hint || r.error}`);
    });
    console.log('\n💡 To fix: Run the SQL migration script from supabase/migrations/create_northwind_dashboard_views.sql');
  } else {
    console.log('\n✅ All endpoints are working correctly!');
  }

  // Test specific data shapes
  console.log('\n🔍 Testing data shapes...');
  
  if (results.find(r => r.table === 'nw_dashboard_kpis' && r.status === '✅ OK')) {
    const kpi = results.find(r => r.table === 'nw_dashboard_kpis')?.sample;
    console.log('KPI fields:', Object.keys(kpi || {}));
  }

  return results;
}

// Auto-run diagnostics if this file is loaded directly
if (typeof window !== 'undefined') {
  (window as any).runDiagnostics = runDiagnostics;
  console.log('💡 Run diagnostics with: runDiagnostics()');
}