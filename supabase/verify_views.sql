-- Verification Script for Northwind Dashboard Views
-- Run this after creating the views to ensure they all work correctly

-- Test 1: Check if all views exist
SELECT 
    schemaname,
    viewname,
    CASE 
        WHEN viewname IN (
            'nw_dashboard_kpis',
            'nw_sales_by_category',
            'nw_top_products',
            'nw_top_customers',
            'nw_monthly_revenue_trend',
            'nw_orders_by_country',
            'nw_employee_performance',
            'nw_product_profitability',
            'nw_customer_orders'
        ) THEN '✅ Found'
        ELSE '❌ Missing'
    END AS status
FROM pg_views
WHERE schemaname = 'public' 
AND viewname LIKE 'nw_%'
ORDER BY viewname;

-- Test 2: Verify each view returns data
SELECT 'nw_dashboard_kpis' as view_name, COUNT(*) as row_count FROM nw_dashboard_kpis
UNION ALL
SELECT 'nw_sales_by_category', COUNT(*) FROM nw_sales_by_category
UNION ALL
SELECT 'nw_top_products', COUNT(*) FROM nw_top_products
UNION ALL
SELECT 'nw_top_customers', COUNT(*) FROM nw_top_customers
UNION ALL
SELECT 'nw_monthly_revenue_trend', COUNT(*) FROM nw_monthly_revenue_trend
UNION ALL
SELECT 'nw_orders_by_country', COUNT(*) FROM nw_orders_by_country
UNION ALL
SELECT 'nw_employee_performance', COUNT(*) FROM nw_employee_performance
UNION ALL
SELECT 'nw_product_profitability', COUNT(*) FROM nw_product_profitability
UNION ALL
SELECT 'nw_customer_orders', COUNT(*) FROM nw_customer_orders;

-- Test 3: Sample data from each view
SELECT '--- KPIs ---' as section;
SELECT * FROM nw_dashboard_kpis;

SELECT '--- Sales by Category (Top 3) ---' as section;
SELECT * FROM nw_sales_by_category LIMIT 3;

SELECT '--- Top Products (Top 5) ---' as section;
SELECT * FROM nw_top_products LIMIT 5;

SELECT '--- Top Customers (Top 5) ---' as section;
SELECT * FROM nw_top_customers LIMIT 5;

SELECT '--- Monthly Trend (Last 6 months) ---' as section;
SELECT * FROM nw_monthly_revenue_trend 
ORDER BY order_month DESC 
LIMIT 6;

SELECT '--- Orders by Country (Top 5) ---' as section;
SELECT * FROM nw_orders_by_country LIMIT 5;

SELECT '--- Employee Performance (All) ---' as section;
SELECT * FROM nw_employee_performance;

SELECT '--- Product Profitability (Top 5) ---' as section;
SELECT * FROM nw_product_profitability LIMIT 5;

SELECT '--- Customer Orders (Recent 5) ---' as section;
SELECT * FROM nw_customer_orders LIMIT 5;