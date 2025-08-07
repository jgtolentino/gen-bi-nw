# 🚨 Fix Corrupted API URLs on Vercel

## The Problem
Your API URLs are being truncated:
- ❌ `cxzllzyxwpyptfretryc.rain.db&c&limit=5` 
- ❌ `cxzllzyxwpyptfretryc.enue.desc&limit=5`

Should be:
- ✅ `https://cxzllzyxwpyptfretryc.supabase.co/rest/v1/...`

## Quick Fix (2 minutes)

### Option 1: Using Vercel CLI
```bash
cd /Users/tbwa/Downloads/northwind_dashboard
./scripts/fix-vercel-env.sh
```

### Option 2: Manual Fix in Vercel Dashboard

1. **Go to Vercel Settings**
   - https://vercel.com/dashboard/project/gen-bi-nw/settings/environment-variables

2. **Add These Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://cxzllzyxwpyptfretryc.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g
   ```
   - ✅ Apply to: Production, Preview, Development

3. **Redeploy**
   - Click "Redeploy" in Vercel dashboard
   - Or run: `vercel --prod`

## Test Your Fix

### 1. Direct API Test
```bash
curl "https://cxzllzyxwpyptfretryc.supabase.co/rest/v1/dashboard_data?select=*" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g"
```

### 2. Browser Console Test
```javascript
// On your deployed site
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
// Should show: https://cxzllzyxwpyptfretryc.supabase.co
```

## Debug Information

If you still have issues after adding env vars:

1. **Check Build Logs**
   - Look for warnings about missing environment variables

2. **Use Debug Panel**
   - The app now includes a debug panel (bottom right in dev mode)
   - Shows current environment settings and API test results

3. **Common Issues**
   - Typo in variable names (must be NEXT_PUBLIC_*)
   - Not applied to all environments
   - Cache needs clearing

## Expected Result
After fix, all dashboard components will show real data:
- ✅ KPI cards populated
- ✅ Charts displaying data
- ✅ Tables showing orders
- ✅ No "Failed to load" messages