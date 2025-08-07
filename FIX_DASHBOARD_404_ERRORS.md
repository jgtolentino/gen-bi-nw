# Fix Northwind Dashboard 404/400 Errors

## Problem
The React dashboard expects specific SQL views that don't exist in your Supabase database, causing all data fetches to fail with 404 or 400 errors.

## Solution
Run the SQL migration script to create all required views.

## Step-by-Step Instructions

### 1. Open Supabase SQL Editor
Go to your Supabase dashboard:
- [https://app.supabase.com/project/YOUR_PROJECT_ID/sql/new](https://app.supabase.com/project/YOUR_PROJECT_ID/sql/new)

### 2. Run the Migration Script
Copy the entire contents of `supabase/migrations/create_northwind_dashboard_views.sql` and paste it into the SQL editor, then click "Run".

### 3. Verify the Views Were Created
Run the verification script from `supabase/verify_views.sql` to ensure all views exist and return data.

### 4. Test Your Dashboard
Refresh your Vercel deployment. All charts and data should now load correctly.

## What This Fixes

### Views Created:
1. **nw_dashboard_kpis** - Main KPI metrics (revenue, profit, orders, etc.)
2. **nw_sales_by_category** - Sales breakdown by product category
3. **nw_top_products** - Top 5 products by revenue
4. **nw_top_customers** - Top 5 customers by revenue
5. **nw_monthly_revenue_trend** - Monthly revenue/profit trend with running totals
6. **nw_orders_by_country** - Orders grouped by country
7. **nw_employee_performance** - Employee sales performance metrics
8. **nw_product_profitability** - Product profit margins
9. **nw_customer_orders** - Individual customer order details

### Field Mappings:
Each view returns exactly the fields expected by the React TypeScript interfaces:
- Numeric fields are properly cast
- Date fields are formatted as strings where expected
- Calculated fields (profit margins, running totals) are included
- All field names match exactly (case-sensitive)

## Troubleshooting

### If views already exist:
The script uses `CREATE OR REPLACE VIEW` so it's safe to run multiple times.

### If you get permission errors:
1. Make sure you're using the Supabase dashboard SQL editor (it runs with full permissions)
2. Or use the service role key if running via API

### If data is still not loading:
1. Check browser console for exact error messages
2. Verify your Vercel environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` should match your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` should be your anon key
3. Check RLS policies - the migration grants SELECT to anon and authenticated roles

### To test individual endpoints:
Use Supabase's API explorer or curl:
```bash
curl "https://YOUR_PROJECT.supabase.co/rest/v1/nw_dashboard_kpis" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## Notes
- The views assume standard Northwind database schema (orders, order_details, products, categories, customers, employees)
- Profit margins are calculated at 30% (adjust in the SQL if needed)
- All monetary values are returned as numeric type
- Dates are returned as strings in YYYY-MM format for monthly trends

## Result
After running the migration, your dashboard should display:
- ✅ All KPI cards with real data
- ✅ All charts populated
- ✅ Tables showing actual order data
- ✅ No more "Failed to load data" messages