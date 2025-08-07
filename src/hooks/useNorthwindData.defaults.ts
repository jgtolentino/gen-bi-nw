// Default data structures to prevent undefined errors

import {
  DashboardKPIs,
  SalesByCategory,
  TopProducts,
  TopCustomers,
  MonthlyRevenueTrend,
  OrdersByCountry,
  EmployeePerformance,
  ProductProfitability,
  CustomerOrders
} from '../lib/supabase';

export const DEFAULT_KPIS: DashboardKPIs = {
  total_revenue: 0,
  total_profit: 0,
  total_orders: 0,
  average_order_value: 0,
  total_customers: 0,
  total_products: 0,
  profit_margin: 0,
  top_category: 'Loading...'
};

export const DEFAULT_SALES_BY_CATEGORY: SalesByCategory = {
  category_name: '',
  total_revenue: 0,
  total_profit: 0,
  order_count: 0,
  profit_margin: 0
};

export const DEFAULT_TOP_PRODUCT: TopProducts = {
  product_name: '',
  category_name: '',
  total_revenue: 0,
  total_quantity: 0,
  order_count: 0,
  average_unit_price: 0
};

export const DEFAULT_TOP_CUSTOMER: TopCustomers = {
  customer_id: '',
  company_name: '',
  contact_name: '',
  country: '',
  total_revenue: 0,
  order_count: 0,
  average_order_value: 0
};

export const DEFAULT_MONTHLY_TREND: MonthlyRevenueTrend = {
  order_month: '',
  monthly_revenue: 0,
  monthly_profit: 0,
  order_count: 0,
  running_total: 0
};

export const DEFAULT_ORDERS_BY_COUNTRY: OrdersByCountry = {
  country: '',
  order_count: 0,
  total_revenue: 0,
  customer_count: 0,
  average_order_value: 0
};

export const DEFAULT_EMPLOYEE_PERFORMANCE: EmployeePerformance = {
  employee_id: 0,
  employee_name: '',
  title: '',
  total_revenue: 0,
  order_count: 0,
  average_order_value: 0,
  customers_served: 0
};

export const DEFAULT_PRODUCT_PROFITABILITY: ProductProfitability = {
  product_name: '',
  category_name: '',
  units_sold: 0,
  revenue: 0,
  total_discount: 0,
  profit_margin: 0
};

export const DEFAULT_CUSTOMER_ORDER: CustomerOrders = {
  order_id: 0,
  customer_id: '',
  company_name: '',
  order_date: '',
  shipped_date: '',
  ship_country: '',
  product_count: 0,
  total_amount: 0
};