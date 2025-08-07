import { create } from 'zustand';

type DashboardFilterState = {
  // Filter values
  selectedCategory: string | null;
  selectedClient: string | null;
  selectedProduct: string | null;
  selectedEmployee: string | null;
  selectedCountry: string | null;
  dateRange: {
    start: string | null;
    end: string | null;
  };
  
  // Setter functions
  setCategory: (category: string | null) => void;
  setClient: (client: string | null) => void;
  setProduct: (product: string | null) => void;
  setEmployee: (employee: string | null) => void;
  setCountry: (country: string | null) => void;
  setDateRange: (start: string | null, end: string | null) => void;
  
  // Utility functions
  reset: () => void;
  clearFilter: (filterType: 'category' | 'client' | 'product' | 'employee' | 'country' | 'dateRange') => void;
  hasActiveFilters: () => boolean;
};

export const useDashboardFilters = create<DashboardFilterState>((set, get) => ({
  // Initial filter states
  selectedCategory: null,
  selectedClient: null,
  selectedProduct: null,
  selectedEmployee: null,
  selectedCountry: null,
  dateRange: {
    start: null,
    end: null,
  },
  
  // Setters
  setCategory: (category) => set({ selectedCategory: category }),
  setClient: (client) => set({ selectedClient: client }),
  setProduct: (product) => set({ selectedProduct: product }),
  setEmployee: (employee) => set({ selectedEmployee: employee }),
  setCountry: (country) => set({ selectedCountry: country }),
  setDateRange: (start, end) => set({ 
    dateRange: { start, end } 
  }),
  
  // Clear specific filter
  clearFilter: (filterType) => {
    switch (filterType) {
      case 'category':
        set({ selectedCategory: null });
        break;
      case 'client':
        set({ selectedClient: null });
        break;
      case 'product':
        set({ selectedProduct: null });
        break;
      case 'employee':
        set({ selectedEmployee: null });
        break;
      case 'country':
        set({ selectedCountry: null });
        break;
      case 'dateRange':
        set({ dateRange: { start: null, end: null } });
        break;
    }
  },
  
  // Reset all filters
  reset: () => set({
    selectedCategory: null,
    selectedClient: null,
    selectedProduct: null,
    selectedEmployee: null,
    selectedCountry: null,
    dateRange: {
      start: null,
      end: null,
    },
  }),
  
  // Check if any filters are active
  hasActiveFilters: () => {
    const state = get();
    return !!(
      state.selectedCategory ||
      state.selectedClient ||
      state.selectedProduct ||
      state.selectedEmployee ||
      state.selectedCountry ||
      state.dateRange.start ||
      state.dateRange.end
    );
  },
}));

// Helper hook to get active filters as query params
export const useFilterParams = () => {
  const filters = useDashboardFilters();
  
  const params: Record<string, string> = {};
  
  if (filters.selectedCategory) params.category = filters.selectedCategory;
  if (filters.selectedClient) params.client = filters.selectedClient;
  if (filters.selectedProduct) params.product = filters.selectedProduct;
  if (filters.selectedEmployee) params.employee = filters.selectedEmployee;
  if (filters.selectedCountry) params.country = filters.selectedCountry;
  if (filters.dateRange.start) params.start_date = filters.dateRange.start;
  if (filters.dateRange.end) params.end_date = filters.dateRange.end;
  
  return params;
};