-- Fix Dashboard Views - Update with correct column names and structure
-- Run this in Supabase SQL Editor

-- Drop existing views first
DROP VIEW IF EXISTS nw_dashboard_kpis CASCADE;
DROP VIEW IF EXISTS nw_sales_by_category CASCADE;
DROP VIEW IF EXISTS nw_monthly_revenue_trend CASCADE;
DROP VIEW IF EXISTS nw_customer_orders CASCADE;

-- 1. Dashboard KPIs View (Fixed)
CREATE OR REPLACE VIEW nw_dashboard_kpis AS
SELECT 
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS total_revenue,
  COALESCE(SUM((od.unit_price * od.quantity * (1 - od.discount)) * 0.3), 0)::numeric AS total_profit, -- 30% profit margin
  COUNT(DISTINCT o.order_id)::integer AS total_orders,
  CASE 
    WHEN COUNT(DISTINCT o.order_id) > 0 
    THEN (SUM(od.unit_price * od.quantity * (1 - od.discount)) / COUNT(DISTINCT o.order_id))::numeric
    ELSE 0
  END AS average_order_value,
  COUNT(DISTINCT o.customer_id)::integer AS total_customers,
  (SELECT COUNT(*)::integer FROM products WHERE discontinued = 0) AS total_products,
  30.0::numeric AS profit_margin, -- Fixed profit margin
  COALESCE((
    SELECT c.category_name 
    FROM categories c
    JOIN products p ON c.category_id = p.category_id
    JOIN order_details od2 ON p.product_id = od2.product_id
    GROUP BY c.category_name
    ORDER BY SUM(od2.unit_price * od2.quantity * (1 - od2.discount)) DESC
    LIMIT 1
  ), 'Beverages') AS top_category
FROM orders o
JOIN order_details od ON o.order_id = od.order_id
WHERE o.order_date >= '2022-04-01' AND o.order_date < '2022-05-01';

-- 2. Sales by Category View (Fixed)
CREATE OR REPLACE VIEW nw_sales_by_category AS
SELECT 
  c.category_name,
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS total_revenue,
  COALESCE(SUM((od.unit_price * od.quantity * (1 - od.discount)) * 0.3), 0)::numeric AS total_profit,
  COUNT(DISTINCT o.order_id)::integer AS order_count,
  CASE 
    WHEN SUM(od.unit_price * od.quantity * (1 - od.discount)) > 0 
    THEN ((SUM((od.unit_price * od.quantity * (1 - od.discount)) * 0.3) / SUM(od.unit_price * od.quantity * (1 - od.discount))) * 100)::numeric
    ELSE 0
  END AS profit_margin
FROM categories c
JOIN products p ON c.category_id = p.category_id
JOIN order_details od ON p.product_id = od.product_id
JOIN orders o ON od.order_id = o.order_id
WHERE o.order_date >= '2022-04-01' AND o.order_date < '2022-05-01'
GROUP BY c.category_name
ORDER BY total_revenue DESC;

-- 3. Monthly Revenue Trend View (Fixed)
CREATE OR REPLACE VIEW nw_monthly_revenue_trend AS
SELECT 
  DATE_TRUNC('month', o.order_date)::date AS order_month,
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS monthly_revenue,
  COALESCE(SUM((od.unit_price * od.quantity * (1 - od.discount)) * 0.3), 0)::numeric AS monthly_profit,
  COUNT(DISTINCT o.order_id)::integer AS order_count,
  COALESCE(SUM(SUM(od.unit_price * od.quantity * (1 - od.discount))) OVER (ORDER BY DATE_TRUNC('month', o.order_date)), 0)::numeric AS running_total
FROM orders o
JOIN order_details od ON o.order_id = od.order_id
WHERE o.order_date >= '2021-01-01' -- Include more historical data
GROUP BY DATE_TRUNC('month', o.order_date)
ORDER BY order_month;

-- 4. Customer Orders View (New)
CREATE OR REPLACE VIEW nw_customer_orders AS
SELECT 
  o.order_id,
  o.customer_id,
  c.company_name,
  o.order_date,
  o.shipped_date,
  o.ship_country,
  COUNT(od.product_id)::integer AS product_count,
  COALESCE(SUM(od.unit_price * od.quantity * (1 - od.discount)), 0)::numeric AS total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_details od ON o.order_id = od.order_id
GROUP BY o.order_id, o.customer_id, c.company_name, o.order_date, o.shipped_date, o.ship_country
ORDER BY o.order_date DESC;

-- Grant permissions to anon role
GRANT SELECT ON nw_dashboard_kpis TO anon;
GRANT SELECT ON nw_sales_by_category TO anon;
GRANT SELECT ON nw_monthly_revenue_trend TO anon;
GRANT SELECT ON nw_customer_orders TO anon;