import { useState, useEffect } from 'react'
import {
  fetchKPIs,
  fetchSalesByCategory,
  fetchTopProducts,
  fetchTopCustomers,
  fetchMonthlyTrend,
  fetchOrdersByCountry,
  fetchEmployeePerformance,
  fetchProductProfitability,
  fetchCustomerOrders,
  DashboardKPIs,
  SalesByCategory,
  TopProducts,
  TopCustomers,
  MonthlyRevenueTrend,
  OrdersByCountry,
  EmployeePerformance,
  ProductProfitability,
  CustomerOrders
} from '../lib/supabase'
import { useDashboardFilters, useFilterParams } from '../store/useDashboardFilters'

// Hook for fetching all dashboard data with filter support
export function useDashboardData() {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null)
  const [salesByCategory, setSalesByCategory] = useState<SalesByCategory[] | null>(null)
  const [topProducts, setTopProducts] = useState<TopProducts[] | null>(null)
  const [topCustomers, setTopCustomers] = useState<TopCustomers[] | null>(null)
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyRevenueTrend[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const filters = useDashboardFilters()
  const filterParams = useFilterParams()

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        const [kpisData, salesData, productsData, customersData, trendData] = await Promise.all([
          fetchKPIs(),
          fetchSalesByCategory(filterParams),
          fetchTopProducts(5, filterParams),
          fetchTopCustomers(5, filterParams),
          fetchMonthlyTrend(filterParams)
        ])

        setKpis(kpisData)
        setSalesByCategory(salesData)
        setTopProducts(productsData)
        setTopCustomers(customersData)
        setMonthlyTrend(trendData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [filters.selectedCategory, filters.selectedClient, filters.selectedProduct, filters.selectedEmployee, filters.selectedCountry, filters.dateRange.start, filters.dateRange.end])

  return {
    kpis,
    salesByCategory,
    topProducts,
    topCustomers,
    monthlyTrend,
    loading,
    error
  }
}

// Hook for KPIs only
export function useKPIs() {
  const [data, setData] = useState<DashboardKPIs | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchKPIs()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

// Hook for Sales by Category
export function useSalesByCategory() {
  const [data, setData] = useState<SalesByCategory[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSalesByCategory()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

// Hook for Top Products
export function useTopProducts(limit = 5) {
  const [data, setData] = useState<TopProducts[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTopProducts(limit)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [limit])

  return { data, loading, error }
}

// Hook for Top Customers
export function useTopCustomers(limit = 5) {
  const [data, setData] = useState<TopCustomers[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTopCustomers(limit)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [limit])

  return { data, loading, error }
}

// Hook for Monthly Revenue Trend
export function useMonthlyTrend() {
  const [data, setData] = useState<MonthlyRevenueTrend[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMonthlyTrend()
      .then(result => setData(result || []))
      .catch(err => {
        setError(err.message)
        setData([]) // Ensure we always have an array
      })
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

// Hook for Orders by Country
export function useOrdersByCountry() {
  const [data, setData] = useState<OrdersByCountry[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrdersByCountry()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

// Hook for Employee Performance
export function useEmployeePerformance() {
  const [data, setData] = useState<EmployeePerformance[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEmployeePerformance()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

// Hook for Product Profitability
export function useProductProfitability(limit = 10) {
  const [data, setData] = useState<ProductProfitability[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProductProfitability(limit)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [limit])

  return { data, loading, error }
}

// Hook for Customer Orders
export function useCustomerOrders(customerId?: string) {
  const [data, setData] = useState<CustomerOrders[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCustomerOrders(customerId)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [customerId])

  return { data, loading, error }
}