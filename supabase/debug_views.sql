-- Debug script to understand the current state of Northwind views

-- 1. Check which Northwind views exist
SELECT 
    table_schema,
    table_name,
    CASE 
        WHEN table_schema = 'public' THEN 'Correct schema'
        ELSE 'Wrong schema - should be in public'
    END as status
FROM information_schema.views
WHERE table_name LIKE 'nw_%'
ORDER BY table_schema, table_name;

-- 2. Check columns in the problematic views (if they exist)
SELECT 
    v.table_schema,
    v.table_name,
    v.column_name,
    v.data_type,
    v.ordinal_position
FROM information_schema.columns v
WHERE v.table_name IN ('nw_top_customers', 'nw_employee_performance', 'nw_product_profitability')
ORDER BY v.table_name, v.ordinal_position;

-- 3. Check if the base tables exist and have data
SELECT 
    'orders' as table_name,
    COUNT(*) as row_count,
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'orders') as exists
UNION ALL
SELECT 'order_details', COUNT(*), EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_details')
UNION ALL
SELECT 'products', COUNT(*), EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'products')
UNION ALL
SELECT 'categories', COUNT(*), EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'categories')
UNION ALL
SELECT 'customers', COUNT(*), EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'customers')
UNION ALL
SELECT 'employees', COUNT(*), EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'employees');

-- 4. Test creating a simple view to verify permissions
DROP VIEW IF EXISTS public.test_view;
CREATE VIEW public.test_view AS SELECT 1 as test_col;
SELECT * FROM public.test_view;
DROP VIEW public.test_view;

-- 5. Check current user permissions
SELECT 
    grantee,
    table_schema,
    table_name,
    privilege_type
FROM information_schema.table_privileges
WHERE table_name LIKE 'nw_%'
AND grantee IN ('anon', 'authenticated', CURRENT_USER)
ORDER BY table_name, grantee, privilege_type;