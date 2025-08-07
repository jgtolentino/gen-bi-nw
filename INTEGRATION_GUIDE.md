# Northwind Dashboard - Supabase Integration Guide

This guide shows how to connect your React Northwind Dashboard to the Supabase backend.

## 🚀 Quick Setup

### 1. Environment Setup

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

The environment variables are already configured to connect to your Supabase instance:
- **URL**: `https://cxzllzyxwpyptfretryc.supabase.co`
- **Anon Key**: Already provided in `.env.example`

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Application

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dashboard with live data!

## 📊 Data Flow Architecture

```
Supabase Views          →  React Hooks         →  Dashboard Components
─────────────────         ─────────────           ──────────────────
nw_dashboard_kpis      →  useKPIs()           →  MetricCard
nw_sales_by_category   →  useSalesByCategory  →  SalesSplitChart
nw_top_products        →  useTopProducts      →  Top5ProductsChart
nw_top_customers       →  useTopCustomers     →  TopClientsChart
nw_employee_performance →  useEmployeePerformance → TopEmployeesChart
nw_orders_by_country   →  useOrdersByCountry  →  OrdersByLocationMap
nw_product_profitability → useProductProfitability → HighestProfitMarginChart
nw_monthly_revenue_trend → useMonthlyTrend    →  Sparklines & Trends
```

## 🔌 Integration Points

### Connected Components

All chart components have `.connected.tsx` versions that fetch real data:

1. **OverviewDashboard.connected.tsx** - Main dashboard with all KPIs
2. **SalesSplitChart.connected.tsx** - Category revenue pie chart
3. **ProfitByCategoryChart.connected.tsx** - Profit analysis by category
4. **Top5ProductsChart.connected.tsx** - Best performing products
5. **HighestProfitMarginChart.connected.tsx** - Most profitable products
6. **TopClientsChart.connected.tsx** - Customer revenue ranking
7. **TopEmployeesChart.connected.tsx** - Sales team performance
8. **OrdersByLocationMap.connected.tsx** - Geographic distribution

### Using the Connected Components

To use the connected versions, update your imports in the main dashboard:

```typescript
// In components/NorthwindDashboard.tsx
import { OverviewDashboard } from './dashboards/OverviewDashboard.connected';
// Instead of
// import { OverviewDashboard } from './dashboards/OverviewDashboard';
```

## 🛠️ Custom Hooks Available

### `useDashboardData()`
Fetches all dashboard data in one call:
```typescript
const { kpis, salesByCategory, topProducts, topCustomers, monthlyTrend, loading, error } = useDashboardData();
```

### Individual Data Hooks
```typescript
const { data: kpis } = useKPIs();
const { data: sales } = useSalesByCategory();
const { data: products } = useTopProducts(5); // limit parameter
const { data: customers } = useTopCustomers(5);
const { data: trend } = useMonthlyTrend();
const { data: countries } = useOrdersByCountry();
const { data: employees } = useEmployeePerformance();
const { data: profitability } = useProductProfitability(10);
const { data: orders } = useCustomerOrders('ALFKI'); // optional customer ID
```

## 📈 Real-time Updates

To enable real-time updates, modify the hooks to use Supabase subscriptions:

```typescript
// Example: Real-time KPIs
useEffect(() => {
  const subscription = supabase
    .channel('kpis-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'nw_dashboard_kpis' },
      (payload) => {
        console.log('KPIs updated:', payload);
        fetchKPIs().then(setData);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## 🔧 Customization

### Adding New Metrics

1. Create a new view in Supabase
2. Add TypeScript interface in `src/lib/supabase.ts`
3. Create a fetcher function
4. Create a custom hook in `src/hooks/useNorthwindData.ts`
5. Use in your component

### Filtering Data

Add parameters to your fetcher functions:

```typescript
export async function fetchTopProducts(limit = 5, category?: string) {
  let query = supabase
    .from('nw_top_products')
    .select('*')
    .order('total_revenue', { ascending: false })
    .limit(limit);
  
  if (category) {
    query = query.eq('category_name', category);
  }
  
  const { data, error } = await query;
  return data;
}
```

## 🚨 Error Handling

All hooks include error handling:

```typescript
const { data, loading, error } = useKPIs();

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
if (!data) return <div>No data available</div>;
```

## 🎯 Performance Tips

1. **Use the consolidated view** - `get_northwind_dashboard_data()` fetches all data in one call
2. **Implement caching** - Add SWR or React Query for better caching
3. **Lazy load charts** - Use React.lazy() for chart components
4. **Paginate large datasets** - Especially for the Orders table

## 📝 Next Steps

1. **Authentication** - Add Supabase Auth for user management
2. **Row Level Security** - Enable RLS on your views
3. **API Routes** - Create Next.js API routes for server-side data fetching
4. **Export Functionality** - Implement CSV/PDF export for reports
5. **Mobile Responsive** - Enhance mobile layouts

## 🔗 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hooks](https://react.dev/reference/react)

---

Your Northwind Dashboard is now fully connected to Supabase! The data flows from your SQL views through TypeScript-typed hooks into beautifully styled React components. 🎉