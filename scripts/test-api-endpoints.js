#!/usr/bin/env node

/**
 * Comprehensive API Endpoints Testing Script
 * Tests all Supabase views and endpoints for the Northwind Dashboard
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables');
  console.log('Please ensure .env.local contains:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=...');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=...');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const endpoints = [
  {
    name: 'Dashboard KPIs',
    table: 'nw_dashboard_kpis',
    expectedFields: ['total_revenue', 'total_profit', 'total_orders'],
    isSingle: true
  },
  {
    name: 'Sales by Category',
    table: 'nw_sales_by_category',
    expectedFields: ['category_name', 'total_revenue', 'total_profit'],
    isSingle: false
  },
  {
    name: 'Top Products',
    table: 'nw_top_products',
    expectedFields: ['product_name', 'category_name', 'total_revenue'],
    isSingle: false
  },
  {
    name: 'Top Customers',
    table: 'nw_top_customers',
    expectedFields: ['customer_id', 'company_name', 'total_revenue'],
    isSingle: false
  },
  {
    name: 'Monthly Revenue Trend',
    table: 'nw_monthly_revenue_trend',
    expectedFields: ['order_month', 'monthly_revenue', 'monthly_profit'],
    isSingle: false
  },
  {
    name: 'Orders by Country',
    table: 'nw_orders_by_country',
    expectedFields: ['country', 'order_count', 'total_revenue'],
    isSingle: false
  },
  {
    name: 'Employee Performance',
    table: 'nw_employee_performance',
    expectedFields: ['employee_id', 'employee_name', 'total_revenue'],
    isSingle: false
  },
  {
    name: 'Product Profitability',
    table: 'nw_product_profitability',
    expectedFields: ['product_name', 'category_name', 'profit_margin'],
    isSingle: false
  },
  {
    name: 'Customer Orders',
    table: 'nw_customer_orders',
    expectedFields: ['order_id', 'customer_id', 'order_date'],
    isSingle: false
  }
];

async function testEndpoint(endpoint) {
  try {
    console.log(`\n🔍 Testing: ${endpoint.name}`);
    
    let query = supabase.from(endpoint.table).select('*');
    
    if (endpoint.isSingle) {
      query = query.single();
    } else {
      query = query.limit(5); // Limit for testing
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.log(`❌ ${endpoint.name}: ${error.message}`);
      return false;
    }
    
    if (!data) {
      console.log(`❌ ${endpoint.name}: No data returned`);
      return false;
    }
    
    // Check if it's an array or single object
    const records = Array.isArray(data) ? data : [data];
    
    if (records.length === 0) {
      console.log(`⚠️  ${endpoint.name}: Empty result set`);
      return false;
    }
    
    // Check required fields
    const firstRecord = records[0];
    const missingFields = endpoint.expectedFields.filter(field => !(field in firstRecord));
    
    if (missingFields.length > 0) {
      console.log(`❌ ${endpoint.name}: Missing fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    // Check for null values in key fields
    const nullFields = endpoint.expectedFields.filter(field => 
      firstRecord[field] === null || firstRecord[field] === undefined
    );
    
    if (nullFields.length > 0) {
      console.log(`⚠️  ${endpoint.name}: Null values in: ${nullFields.join(', ')}`);
    }
    
    console.log(`✅ ${endpoint.name}: ${records.length} record(s) returned`);
    console.log(`   Sample: ${JSON.stringify(firstRecord, null, 2).substring(0, 200)}...`);
    
    return true;
    
  } catch (err) {
    console.log(`❌ ${endpoint.name}: Unexpected error - ${err.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting comprehensive API endpoint testing...');
  console.log(`📡 Connected to: ${supabaseUrl}`);
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const success = await testEndpoint(endpoint);
    results.push({ name: endpoint.name, success });
  }
  
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  
  const passed = results.filter(r => r.success).length;
  const total = results.length;
  
  results.forEach(result => {
    console.log(`${result.success ? '✅' : '❌'} ${result.name}`);
  });
  
  console.log(`\n🎯 Overall: ${passed}/${total} endpoints passing (${Math.round(passed/total*100)}%)`);
  
  if (passed === total) {
    console.log('🎉 All API endpoints are working correctly!');
    process.exit(0);
  } else {
    console.log('⚠️  Some endpoints need attention. Check the details above.');
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('💥 Test runner failed:', err);
  process.exit(1);
});