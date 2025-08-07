-- Quick Fix for Northwind Dashboard View Issues
-- Run this in your Supabase SQL Editor to fix the view column name mismatches

-- This focuses on the three specific errors:
-- 1. nw_top_customers.total_revenue does not exist
-- 2. nw_employee_performance.total_revenue does not exist  
-- 3. relation public.nw_product_profitability does not exist

-- First, let's check what columns actually exist in these views
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name IN ('nw_top_customers', 'nw_employee_performance', 'nw_product_profitability')
ORDER BY table_name, ordinal_position;

-- Drop and recreate the problematic views with correct column names

-- 1. Fix nw_top_customers view
DROP VIEW IF EXISTS public.nw_top_customers CASCADE;
CREATE VIEW public.nw_top_customers AS
SELECT 
  c.customer_id,
  c.company_name,
  c.contact_name,
  c.country,
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS total_revenue,
  COUNT(DISTINCT o.order_id)::integer AS order_count,
  COALESCE(AVG(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS average_order_value
FROM public.customers c
JOIN public.orders o ON c.customer_id = o.customer_id
JOIN public.order_details od ON o.order_id = od.order_id
GROUP BY c.customer_id, c.company_name, c.contact_name, c.country
ORDER BY total_revenue DESC;

-- 2. Fix nw_employee_performance view
DROP VIEW IF EXISTS public.nw_employee_performance CASCADE;
CREATE VIEW public.nw_employee_performance AS
SELECT 
  e.employee_id,
  CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
  e.title,
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS total_revenue,
  COUNT(DISTINCT o.order_id)::integer AS order_count,
  COALESCE(AVG(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS average_order_value,
  COUNT(DISTINCT o.customer_id)::integer AS customers_served
FROM public.employees e
JOIN public.orders o ON e.employee_id = o.employee_id
JOIN public.order_details od ON o.order_id = od.order_id
GROUP BY e.employee_id, e.first_name, e.last_name, e.title
ORDER BY total_revenue DESC;

-- 3. Create the missing nw_product_profitability view
CREATE VIEW public.nw_product_profitability AS
SELECT 
  p.product_name,
  c.category_name,
  COALESCE(SUM(od.quantity), 0)::integer AS units_sold,
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS revenue,
  COALESCE(SUM(od.discount * od.unit_price * od.quantity), 0)::numeric AS total_discount,
  CASE 
    WHEN SUM(od.unit_price * od.quantity) > 0 
    THEN ((SUM(od.unit_price * od.quantity * (1 - od.discount)) - SUM(od.unit_price * od.quantity * 0.7)) / SUM(od.unit_price * od.quantity * (1 - od.discount)) * 100)::numeric
    ELSE 0
  END AS profit_margin
FROM public.products p
JOIN public.categories c ON p.category_id = c.category_id
JOIN public.order_details od ON p.product_id = od.product_id
GROUP BY p.product_id, p.product_name, c.category_name
ORDER BY profit_margin DESC;

-- Grant permissions
GRANT SELECT ON public.nw_top_customers TO anon, authenticated;
GRANT SELECT ON public.nw_employee_performance TO anon, authenticated;
GRANT SELECT ON public.nw_product_profitability TO anon, authenticated;

-- Verify the fixes
SELECT 
    'nw_top_customers' as view_name,
    EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'nw_top_customers' 
        AND column_name = 'total_revenue'
    ) as has_total_revenue_column
UNION ALL
SELECT 
    'nw_employee_performance',
    EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'nw_employee_performance' 
        AND column_name = 'total_revenue'
    )
UNION ALL
SELECT 
    'nw_product_profitability',
    EXISTS (
        SELECT 1 FROM information_schema.views 
        WHERE table_schema = 'public' 
        AND table_name = 'nw_product_profitability'
    );