# Northwind Sales Dashboard - React Implementation

This is a React/TypeScript implementation of the Northwind Sales Dashboard originally created in Tableau. The implementation uses Tailwind CSS for styling and includes all the major components and visualizations from the original dashboard.

## 📊 Dashboard Structure

The dashboard consists of three main views:

### 1. Overview Dashboard
- **Metric Cards**: Revenue, Profit, Orders, Discounted Revenue, Avg Order Value with sparklines
- **Charts**:
  - Sales Split (Pie Chart)
  - Profit by Category (Bar Chart)
  - Top 5 Products (Horizontal Bar Chart)
  - Highest Profit Margin Products (Horizontal Bar Chart)
  - Top Clients Chart
  - Top Employees Chart
  - Orders by Location (Map Visualization)
- **Year-to-Date Performance** comparison

### 2. Order Details
- Comprehensive data table with:
  - Sorting capabilities on all columns
  - Search functionality
  - Filtering options
  - Export capabilities
  - Pagination
  - Profit margin indicators

### 3. SQL Data Prep
- Data model visualization
- Data source information
- Key transformation formulas
- Sample SQL queries
- Performance metrics

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd northwind_dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
northwind_dashboard/
├── components/
│   ├── NorthwindDashboard.tsx       # Main dashboard component
│   ├── layout/
│   │   ├── DashboardLayout.tsx      # Main layout wrapper
│   │   └── Sidebar.tsx              # Navigation sidebar
│   ├── dashboards/
│   │   ├── OverviewDashboard.tsx    # Overview page
│   │   ├── OrderDetailsDashboard.tsx # Orders table page
│   │   └── SQLDataPrepDashboard.tsx # SQL documentation page
│   ├── charts/
│   │   ├── MetricCard.tsx           # KPI cards with sparklines
│   │   ├── SalesSplitChart.tsx      # Pie chart
│   │   ├── ProfitByCategoryChart.tsx # Bar chart
│   │   ├── Top5ProductsChart.tsx    # Horizontal bar chart
│   │   ├── HighestProfitMarginChart.tsx
│   │   ├── TopClientsChart.tsx
│   │   ├── TopEmployeesChart.tsx
│   │   └── OrdersByLocationMap.tsx  # Map visualization
│   └── tables/
│       └── OrdersTable.tsx          # Data table component
├── northwind-dashboard-wireframe.json # Complete dashboard structure
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette (Adventure Works Theme)
- Primary Green: `#06a77d`
- Primary Blue: `#1c3d5a`
- Secondary Blue: `#2185c7`
- Brown: `#796d5f`
- Beige: `#e6e1c4`
- Background: `#f7f7f9`

### Key Features
- **Responsive Design**: Adapts to different screen sizes
- **Interactive Charts**: Hover effects and tooltips
- **Real-time Updates**: Sparklines and metric indicators
- **Performance Optimized**: Efficient rendering of large datasets
- **Accessibility**: WCAG compliant components

## 🔄 Data Integration

To connect to real data:

1. Replace the sample data in each component with API calls
2. Update the data interfaces to match your backend schema
3. Implement data fetching with your preferred method (REST, GraphQL, etc.)

Example:
```typescript
const fetchOrders = async () => {
  const response = await fetch('/api/orders');
  const data = await response.json();
  setOrders(data);
};
```

## 🛠️ Customization

### Adding New Charts
1. Create a new component in `components/charts/`
2. Import and use it in the appropriate dashboard
3. Follow the existing chart component patterns

### Modifying Themes
Update colors in Tailwind config or component styles:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'adventure-green': '#06a77d',
        'adventure-blue': '#1c3d5a',
        // ... other colors
      }
    }
  }
}
```

## 📝 Original Tableau Features Mapped

| Tableau Feature | React Implementation |
|----------------|---------------------|
| Dashboards | React Router pages |
| Worksheets | Individual chart components |
| Parameters | React state with controls |
| Filters | Search and filter UI |
| Calculated Fields | JavaScript functions |
| Tooltips | HTML hover tooltips |
| Actions | onClick handlers |
| Data Sources | API integrations |

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is created as a demonstration of converting Tableau dashboards to React applications.