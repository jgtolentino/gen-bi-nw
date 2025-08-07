#!/usr/bin/env node

/**
 * Apply View Fixes Script
 * Applies the corrected dashboard views directly via Supabase client
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Note: For DDL operations, we'd normally need service role key
// But let's try with anon key first
const supabase = createClient(supabaseUrl, supabaseKey);

async function applyViewFix() {
  try {
    console.log('🔧 Applying dashboard view fixes...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', 'fix_dashboard_views.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Split into individual statements (simple approach)
    const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (!statement) continue;
      
      console.log(`\n${i + 1}. Executing: ${statement.substring(0, 60)}...`);
      
      try {
        const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement + ';' });
        
        if (error) {
          console.log(`❌ Error: ${error.message}`);
          // Continue with other statements
        } else {
          console.log(`✅ Success`);
        }
      } catch (err) {
        console.log(`⚠️  Note: ${err.message}`);
        // Many DDL operations require service role, so this is expected
      }
    }
    
    console.log('\n📋 Manual Instructions:');
    console.log('=============================');
    console.log('The above DDL operations likely require service role permissions.');
    console.log('Please copy the contents of supabase/migrations/fix_dashboard_views.sql');
    console.log('and run it manually in the Supabase SQL Editor:');
    console.log(`🔗 https://app.supabase.com/project/cxzllzyxwpyptfretryc/sql/new`);
    
    console.log('\n🧪 After applying the fix, test with:');
    console.log('node scripts/test-api-endpoints.js');
    
  } catch (error) {
    console.error('💥 Failed to apply fixes:', error);
  }
}

applyViewFix();