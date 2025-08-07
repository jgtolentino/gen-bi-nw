'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const DebugPanel: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    // Collect debug information
    const info = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      clientUrl: (supabase as any).supabaseUrl || (supabase as any).restUrl || 'UNKNOWN',
      timestamp: new Date().toISOString()
    };
    setDebugInfo(info);

    // Test API endpoints
    testEndpoints();
  }, []);

  const testEndpoints = async () => {
    const endpoints = [
      'dashboard_data',
      'top_products_ranked',
      'sales_split',
      'monthly_trend'
    ];

    const results = [];
    
    for (const endpoint of endpoints) {
      try {
        const { data, error } = await supabase
          .from(endpoint)
          .select('*')
          .limit(1);
        
        results.push({
          endpoint,
          status: error ? '❌ Failed' : '✅ Success',
          error: error?.message || null,
          hasData: !!data && data.length > 0
        });
      } catch (e: any) {
        results.push({
          endpoint,
          status: '❌ Error',
          error: e.message,
          hasData: false
        });
      }
    }
    
    setTestResults(results);
  };

  return (
    <div className="fixed bottom-0 right-0 bg-black text-white p-4 max-w-md text-xs font-mono opacity-90">
      <h3 className="font-bold mb-2">🔍 Debug Panel</h3>
      
      <div className="mb-3">
        <h4 className="font-bold">Environment:</h4>
        <pre className="text-xs">{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
      
      <div>
        <h4 className="font-bold">API Tests:</h4>
        {testResults.map((result, i) => (
          <div key={i} className="mb-1">
            {result.status} {result.endpoint}
            {result.error && <div className="text-red-400 text-xs ml-4">{result.error}</div>}
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 bg-blue-500 px-2 py-1 rounded text-xs"
      >
        Refresh
      </button>
    </div>
  );
};