import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || 'https://cxzllzyxwpyptfretryc.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emxsenl4d3B5cHRmcmV0cnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzYxODAsImV4cCI6MjA2Nzk1MjE4MH0.b794GEIWE4ZdMAm9xQYAJ0Gx-XEn1fhJBTIIeTro_1g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for our Northwind dashboard data
export interface DashboardKPIs {
  total_revenue: number
  total_profit: number
  total_orders: number
  average_order_value: number
  total_customers: number
  total_products: number
  profit_margin: number
  top_category: string
}

// Current database structure interfaces
interface CurrentDashboardKPIs {
  total_orders: number
  total_customers: number
  active_products: number
  total_revenue: number
  avg_order_value: number
  total_employees: number
}

interface CurrentSalesByCategory {
  category_id: number
  category_name: string
  order_count: number
  units_sold: number
  total_revenue: number
  avg_sale_value: number
}

interface CurrentMonthlyTrend {
  order_month: string
  order_count: number
  unique_customers: number
  revenue: number
  avg_order_value: number
}

export interface SalesByCategory {
  category_name: string
  total_revenue: number
  total_profit: number
  order_count: number
  profit_margin: number
}

export interface TopProducts {
  product_name: string
  category_name: string
  total_revenue: number
  total_quantity: number
  order_count: number
  average_unit_price: number
}

export interface TopCustomers {
  customer_id: string
  company_name: string
  contact_name: string
  country: string
  total_revenue: number
  order_count: number
  average_order_value: number
}

export interface MonthlyRevenueTrend {
  order_month: string
  monthly_revenue: number
  monthly_profit: number
  order_count: number
  running_total: number
}

export interface OrdersByCountry {
  country: string
  order_count: number
  total_revenue: number
  customer_count: number
  average_order_value: number
}

export interface EmployeePerformance {
  employee_id: number
  employee_name: string
  title: string
  total_revenue: number
  order_count: number
  average_order_value: number
  customers_served: number
}

export interface ProductProfitability {
  product_name: string
  category_name: string
  units_sold: number
  revenue: number
  total_discount: number
  profit_margin: number
}

export interface CustomerOrders {
  order_id: number
  customer_id: string
  company_name: string
  order_date: string
  shipped_date: string
  ship_country: string
  product_count: number
  total_amount: number
}

// Comprehensive dashboard data fetching function
export async function fetchDashboardData() {
  try {
    const { data, error } = await supabase
      .rpc('get_northwind_dashboard_data')
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return null
  }
}

// Individual view fetchers
export async function fetchKPIs(): Promise<DashboardKPIs | null> {
  const { data, error } = await supabase
    .from('nw_dashboard_kpis')
    .select('*')
    .single()
  
  if (error) {
    console.error('Error fetching KPIs:', error)
    return null
  }

  if (!data) return null

  // Map current structure to expected interface
  const currentData = data as CurrentDashboardKPIs
  
  return {
    total_revenue: currentData.total_revenue || 0,
    total_profit: (currentData.total_revenue || 0) * 0.3, // Assume 30% profit margin
    total_orders: currentData.total_orders || 0,
    average_order_value: currentData.avg_order_value || 0,
    total_customers: currentData.total_customers || 0,
    total_products: currentData.active_products || 0,
    profit_margin: 30.0, // Fixed profit margin
    top_category: 'Beverages' // Default top category
  }
}

export async function fetchSalesByCategory(filters?: Record<string, string>): Promise<SalesByCategory[] | null> {
  let query = supabase
    .from('nw_sales_by_category')
    .select('*')
    .order('total_revenue', { ascending: false })
  
  // Apply filters if provided
  if (filters) {
    if (filters.category) {
      query = query.eq('category_name', filters.category)
    }
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching sales by category:', error)
    return null
  }

  if (!data) return null

  // Map current structure to expected interface
  return data.map((item: CurrentSalesByCategory) => ({
    category_name: item.category_name,
    total_revenue: item.total_revenue || 0,
    total_profit: (item.total_revenue || 0) * 0.3, // Assume 30% profit margin
    order_count: item.order_count || 0,
    profit_margin: 30.0 // Fixed profit margin
  }))
}

export async function fetchTopProducts(limit = 5, filters?: Record<string, string>) {
  let query = supabase
    .from('nw_top_products')
    .select('*')
    .order('total_revenue', { ascending: false })
    .limit(limit)
  
  // Apply filters if provided
  if (filters) {
    if (filters.category) {
      query = query.eq('category_name', filters.category)
    }
    if (filters.product) {
      query = query.eq('product_name', filters.product)
    }
  }
  
  const { data, error } = await query
  
  if (error) console.error('Error fetching top products:', error)
  return data as TopProducts[] | null
}

export async function fetchTopCustomers(limit = 5, filters?: Record<string, string>) {
  let query = supabase
    .from('nw_top_customers')
    .select('*')
    .order('total_revenue', { ascending: false })
    .limit(limit)
  
  // Apply filters if provided
  if (filters) {
    if (filters.client) {
      query = query.eq('company_name', filters.client)
    }
    if (filters.country) {
      query = query.eq('country', filters.country)
    }
  }
  
  const { data, error } = await query
  
  if (error) console.error('Error fetching top customers:', error)
  return data as TopCustomers[] | null
}

export async function fetchMonthlyTrend(filters?: Record<string, string>): Promise<MonthlyRevenueTrend[]> {
  try {
    let query = supabase
      .from('nw_monthly_revenue_trend')
      .select('*')
      .order('order_month', { ascending: true })
    
    // Apply date range filters if provided
    if (filters) {
      if (filters.start_date) {
        query = query.gte('order_month', filters.start_date)
      }
      if (filters.end_date) {
        query = query.lte('order_month', filters.end_date)
      }
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching monthly trend:', error)
      return []
    }
    
    if (!data) return []

    // Map current structure to expected interface
    return data.map((item: CurrentMonthlyTrend) => ({
      order_month: item.order_month,
      monthly_revenue: item.revenue || 0,
      monthly_profit: (item.revenue || 0) * 0.3, // Assume 30% profit margin
      order_count: item.order_count || 0,
      running_total: 0 // Will be calculated if needed
    }))
  } catch (err) {
    console.error('Unexpected error fetching monthly trend:', err)
    return []
  }
}

export async function fetchOrdersByCountry() {
  const { data, error } = await supabase
    .from('nw_orders_by_country')
    .select('*')
    .order('order_count', { ascending: false })
  
  if (error) console.error('Error fetching orders by country:', error)
  return data as OrdersByCountry[] | null
}

export async function fetchEmployeePerformance() {
  const { data, error } = await supabase
    .from('nw_employee_performance')
    .select('*')
    .order('total_revenue', { ascending: false })
  
  if (error) console.error('Error fetching employee performance:', error)
  return data as EmployeePerformance[] | null
}

export async function fetchProductProfitability(limit = 10) {
  const { data, error } = await supabase
    .from('nw_product_profitability')
    .select('*')
    .order('profit_margin', { ascending: false })
    .limit(limit)
  
  if (error) console.error('Error fetching product profitability:', error)
  return data as ProductProfitability[] | null
}

export async function fetchCustomerOrders(customerId?: string) {
  let query = supabase
    .from('nw_customer_orders')
    .select('*')
    .order('order_date', { ascending: false })
  
  if (customerId) {
    query = query.eq('customer_id', customerId)
  }
  
  const { data, error } = await query
  
  if (error) console.error('Error fetching customer orders:', error)
  return data as CustomerOrders[] | null
}