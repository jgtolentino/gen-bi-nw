-- Fix RLS and Permissions for Northwind Dashboard
-- This migration ensures all views and tables are accessible to the anon role

-- 1. Disable RLS on base tables (for development)
-- WARNING: Only do this for development. Enable RLS with proper policies for production
ALTER TABLE IF EXISTS public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.order_details DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.employees DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.shippers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.suppliers DISABLE ROW LEVEL SECURITY;

-- 2. Grant SELECT permissions to anon role on all base tables
GRANT SELECT ON public.orders TO anon;
GRANT SELECT ON public.order_details TO anon;
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.categories TO anon;
GRANT SELECT ON public.customers TO anon;
GRANT SELECT ON public.employees TO anon;
GRANT SELECT ON public.shippers TO anon;
GRANT SELECT ON public.suppliers TO anon;

-- 3. Grant SELECT permissions to anon role on all dashboard views
-- Original Northwind views
GRANT SELECT ON public.nw_dashboard_kpis TO anon;
GRANT SELECT ON public.nw_sales_by_category TO anon;
GRANT SELECT ON public.nw_top_products TO anon;
GRANT SELECT ON public.nw_top_customers TO anon;
GRANT SELECT ON public.nw_monthly_revenue_trend TO anon;
GRANT SELECT ON public.nw_orders_by_country TO anon;
GRANT SELECT ON public.nw_employee_performance TO anon;
GRANT SELECT ON public.nw_product_profitability TO anon;
GRANT SELECT ON public.nw_customer_orders TO anon;

-- Additional dashboard views (if they exist)
GRANT SELECT ON public.dashboard_data TO anon;
GRANT SELECT ON public.sales_split TO anon;
GRANT SELECT ON public.monthly_trend TO anon;
GRANT SELECT ON public.top_products_ranked TO anon;
GRANT SELECT ON public.top_employees_ranked TO anon;
GRANT SELECT ON public.top_clients_ranked TO anon;
GRANT SELECT ON public.sales_by_category_chart TO anon;
GRANT SELECT ON public.sales_by_location TO anon;
GRANT SELECT ON public.order_details_table TO anon;

-- 4. Also grant to authenticated role for future use
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;

-- 5. Verify permissions
DO $$
DECLARE
    v_count INTEGER;
BEGIN
    -- Check if anon can access the main KPI view
    EXECUTE 'SELECT COUNT(*) FROM public.nw_dashboard_kpis' INTO v_count;
    RAISE NOTICE 'KPI view accessible: % records', v_count;
    
    -- Check other critical views
    EXECUTE 'SELECT COUNT(*) FROM public.nw_monthly_revenue_trend' INTO v_count;
    RAISE NOTICE 'Monthly trend view accessible: % records', v_count;
    
    EXECUTE 'SELECT COUNT(*) FROM public.nw_top_products' INTO v_count;
    RAISE NOTICE 'Top products view accessible: % records', v_count;
END $$;

-- Production-ready RLS policies (commented out for now)
-- Uncomment and customize these before going to production:

/*
-- Enable RLS on sensitive tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read all orders
CREATE POLICY "authenticated_read_orders" ON public.orders
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy for users to see only their own customer data
CREATE POLICY "users_see_own_data" ON public.customers
    FOR SELECT
    TO authenticated
    USING (auth.uid()::text = user_id);

-- Policy for public/demo access (if needed)
CREATE POLICY "public_demo_access" ON public.orders
    FOR SELECT
    TO anon
    USING (order_date >= '2022-01-01' AND order_date <= '2022-12-31');
*/