#!/usr/bin/env node

/**
 * Debug View Columns Script
 * Checks what columns actually exist in each view
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const views = [
  'nw_dashboard_kpis',
  'nw_sales_by_category', 
  'nw_monthly_revenue_trend'
];

async function debugViewColumns(viewName) {
  try {
    console.log(`\n🔍 Checking columns in: ${viewName}`);
    
    const { data, error } = await supabase
      .from(viewName)
      .select('*')
      .limit(1);
    
    if (error) {
      console.log(`❌ Error: ${error.message}`);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log(`⚠️  No data in ${viewName}`);
      return;
    }
    
    const columns = Object.keys(data[0]);
    console.log(`✅ Available columns (${columns.length}):`);
    columns.forEach((col, idx) => {
      console.log(`   ${idx + 1}. ${col}: ${typeof data[0][col]} = ${data[0][col]}`);
    });
    
  } catch (err) {
    console.log(`❌ Unexpected error: ${err.message}`);
  }
}

async function main() {
  console.log('🔍 Debugging view columns...\n');
  
  for (const view of views) {
    await debugViewColumns(view);
  }
}

main().catch(console.error);