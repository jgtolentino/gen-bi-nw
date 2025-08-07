const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cxzllzyxwpyptfretryc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g';

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // Test 1: KPIs view
    console.log('\n1. Testing nw_dashboard_kpis...');
    const { data: kpis, error: kpiError } = await supabase
      .from('nw_dashboard_kpis')
      .select('*')
      .single();
    
    if (kpiError) {
      console.error('❌ KPI Error:', kpiError.message);
    } else {
      console.log('✅ KPI Success:', kpis ? 'Data retrieved' : 'No data');
    }

    // Test 2: Monthly trend view
    console.log('\n2. Testing nw_monthly_revenue_trend...');
    const { data: trend, error: trendError } = await supabase
      .from('nw_monthly_revenue_trend')
      .select('*')
      .limit(5);
    
    if (trendError) {
      console.error('❌ Trend Error:', trendError.message);
    } else {
      console.log('✅ Trend Success:', trend ? `${trend.length} records` : 'No data');
    }

    // Test 3: Check if views exist
    console.log('\n3. Checking if views exist...');
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_table_info', { schema_name: 'public' });
    
    if (!tablesError && tables) {
      const views = ['nw_dashboard_kpis', 'nw_monthly_revenue_trend', 'nw_top_products', 'nw_sales_by_category'];
      views.forEach(view => {
        const exists = tables.some(t => t.table_name === view);
        console.log(`${exists ? '✅' : '❌'} ${view}`);
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testConnection();