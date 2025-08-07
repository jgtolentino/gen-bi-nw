-- Fix Northwind Dashboard View Issues
-- This migration ensures all views exist in the public schema with correct column names

-- Drop existing views if they exist (to avoid conflicts)
DROP VIEW IF EXISTS public.nw_dashboard_kpis CASCADE;
DROP VIEW IF EXISTS public.nw_sales_by_category CASCADE;
DROP VIEW IF EXISTS public.nw_top_products CASCADE;
DROP VIEW IF EXISTS public.nw_top_customers CASCADE;
DROP VIEW IF EXISTS public.nw_monthly_revenue_trend CASCADE;
DROP VIEW IF EXISTS public.nw_orders_by_country CASCADE;
DROP VIEW IF EXISTS public.nw_employee_performance CASCADE;
DROP VIEW IF EXISTS public.nw_product_profitability CASCADE;
DROP VIEW IF EXISTS public.nw_customer_orders CASCADE;

-- 1. Dashboard KPIs View
CREATE OR REPLACE VIEW public.nw_dashboard_kpis AS
SELECT 
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS total_revenue,
  COALESCE(SUM((od.unit_price * od.quantity * (1 - od.discount)) * 0.3), 0)::numeric AS total_profit, -- Assuming 30% profit margin
  COUNT(DISTINCT o.order_id)::integer AS total_orders,
  COALESCE(AVG(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS average_order_value,
  COUNT(DISTINCT o.customer_id)::integer AS total_customers,
  (SELECT COUNT(*)::integer FROM public.products) AS total_products,
  30.0::numeric AS profit_margin, -- Average profit margin
  COALESCE((
    SELECT c.category_name 
    FROM public.categories c
    JOIN public.products p ON c.category_id = p.category_id
    JOIN public.order_details od2 ON p.product_id = od2.product_id
    GROUP BY c.category_name
    ORDER BY SUM(od2.unit_price * od2.quantity * (1 - od2.discount)) DESC
    LIMIT 1
  ), 'Unknown') AS top_category
FROM public.orders o
JOIN public.order_details od ON o.order_id = od.order_id;

-- 2. Sales by Category View
CREATE OR REPLACE VIEW public.nw_sales_by_category AS
SELECT 
  c.category_name,
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS total_revenue,
  COALESCE(SUM((od.unit_price * od.quantity * (1 - od.discount)) * 0.3), 0)::numeric AS total_profit,
  COUNT(DISTINCT o.order_id)::integer AS order_count,
  30.0::numeric AS profit_margin
FROM public.categories c
JOIN public.products p ON c.category_id = p.category_id
JOIN public.order_details od ON p.product_id = od.product_id
JOIN public.orders o ON od.order_id = o.order_id
GROUP BY c.category_name
ORDER BY total_revenue DESC;

-- 3. Top Products View
CREATE OR REPLACE VIEW public.nw_top_products AS
SELECT 
  p.product_name,
  c.category_name,
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS total_revenue,
  COALESCE(SUM(od.quantity), 0)::integer AS total_quantity,
  COUNT(DISTINCT od.order_id)::integer AS order_count,
  COALESCE(AVG(od.unit_price), 0)::numeric AS average_unit_price
FROM public.products p
JOIN public.categories c ON p.category_id = c.category_id
JOIN public.order_details od ON p.product_id = od.product_id
GROUP BY p.product_id, p.product_name, c.category_name
ORDER BY total_revenue DESC;

-- 4. Top Customers View (Fixed: ensuring total_revenue column exists)
CREATE OR REPLACE VIEW public.nw_top_customers AS
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

-- 5. Monthly Revenue Trend View
CREATE OR REPLACE VIEW public.nw_monthly_revenue_trend AS
WITH monthly_data AS (
  SELECT 
    DATE_TRUNC('month', o.order_date)::date AS order_month,
    COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS monthly_revenue,
    COALESCE(SUM((od.unit_price * od.quantity * (1 - od.discount)) * 0.3), 0)::numeric AS monthly_profit,
    COUNT(DISTINCT o.order_id)::integer AS order_count
  FROM public.orders o
  JOIN public.order_details od ON o.order_id = od.order_id
  WHERE o.order_date IS NOT NULL
  GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT 
  TO_CHAR(order_month, 'YYYY-MM') AS order_month,
  monthly_revenue,
  monthly_profit,
  order_count,
  SUM(monthly_revenue) OVER (ORDER BY order_month)::numeric AS running_total
FROM monthly_data
ORDER BY order_month;

-- 6. Orders by Country View
CREATE OR REPLACE VIEW public.nw_orders_by_country AS
SELECT 
  c.country,
  COUNT(DISTINCT o.order_id)::integer AS order_count,
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS total_revenue,
  COUNT(DISTINCT c.customer_id)::integer AS customer_count,
  COALESCE(AVG(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS average_order_value
FROM public.customers c
JOIN public.orders o ON c.customer_id = o.customer_id
JOIN public.order_details od ON o.order_id = od.order_id
GROUP BY c.country
ORDER BY order_count DESC;

-- 7. Employee Performance View (Fixed: ensuring total_revenue column exists)
CREATE OR REPLACE VIEW public.nw_employee_performance AS
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

-- 8. Product Profitability View (Fixed: creating the missing view)
CREATE OR REPLACE VIEW public.nw_product_profitability AS
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

-- 9. Customer Orders View
CREATE OR REPLACE VIEW public.nw_customer_orders AS
SELECT 
  o.order_id,
  c.customer_id,
  c.company_name,
  o.order_date::text,
  o.shipped_date::text,
  o.ship_country,
  COUNT(DISTINCT od.product_id)::integer AS product_count,
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS total_amount
FROM public.customers c
JOIN public.orders o ON c.customer_id = o.customer_id
JOIN public.order_details od ON o.order_id = od.order_id
GROUP BY o.order_id, c.customer_id, c.company_name, o.order_date, o.shipped_date, o.ship_country
ORDER BY o.order_date DESC;

-- Grant permissions (adjust based on your RLS needs)
GRANT SELECT ON public.nw_dashboard_kpis TO anon, authenticated;
GRANT SELECT ON public.nw_sales_by_category TO anon, authenticated;
GRANT SELECT ON public.nw_top_products TO anon, authenticated;
GRANT SELECT ON public.nw_top_customers TO anon, authenticated;
GRANT SELECT ON public.nw_monthly_revenue_trend TO anon, authenticated;
GRANT SELECT ON public.nw_orders_by_country TO anon, authenticated;
GRANT SELECT ON public.nw_employee_performance TO anon, authenticated;
GRANT SELECT ON public.nw_product_profitability TO anon, authenticated;
GRANT SELECT ON public.nw_customer_orders TO anon, authenticated;

-- Create indexes for better performance (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON public.orders(order_date);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_employee_id ON public.orders(employee_id);
CREATE INDEX IF NOT EXISTS idx_order_details_order_id ON public.order_details(order_id);
CREATE INDEX IF NOT EXISTS idx_order_details_product_id ON public.order_details(product_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);

-- Verify the views were created successfully
DO $$
DECLARE
    v_count INTEGER;
BEGIN
    -- Check if views exist and have data
    SELECT COUNT(*) INTO v_count FROM information_schema.views 
    WHERE table_schema = 'public' AND table_name LIKE 'nw_%';
    RAISE NOTICE 'Created % Northwind views in public schema', v_count;
    
    -- Test that the problematic views now have the correct columns
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'nw_top_customers' 
               AND column_name = 'total_revenue') THEN
        RAISE NOTICE '✓ nw_top_customers.total_revenue column exists';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'nw_employee_performance' 
               AND column_name = 'total_revenue') THEN
        RAISE NOTICE '✓ nw_employee_performance.total_revenue column exists';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.views 
               WHERE table_schema = 'public' 
               AND table_name = 'nw_product_profitability') THEN
        RAISE NOTICE '✓ nw_product_profitability view exists';
    END IF;
END $$;