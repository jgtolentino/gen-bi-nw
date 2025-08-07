// Centralized, safe formatting utilities for the dashboard

export const formatCurrency = (value: number | null | undefined, locale = 'en-US', currency = 'USD'): string => {
  const safeValue = value ?? 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(safeValue);
};

export const formatNumber = (value: number | null | undefined, decimals = 0): string => {
  const safeValue = value ?? 0;
  return safeValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatPercent = (value: number | null | undefined, decimals = 1): string => {
  const safeValue = value ?? 0;
  return `${safeValue.toFixed(decimals)}%`;
};

export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '-';
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '-';
  }
};

export const formatCompactNumber = (value: number | null | undefined): string => {
  const safeValue = value ?? 0;
  
  if (safeValue >= 1000000) {
    return `${(safeValue / 1000000).toFixed(1)}M`;
  } else if (safeValue >= 1000) {
    return `${(safeValue / 1000).toFixed(1)}K`;
  }
  
  return safeValue.toString();
};

// Safe array operations
export const safeMax = (values: number[]): number => {
  if (!Array.isArray(values) || values.length === 0) return 0;
  return Math.max(...values.filter(v => typeof v === 'number' && !isNaN(v)));
};

export const safeMin = (values: number[]): number => {
  if (!Array.isArray(values) || values.length === 0) return 0;
  return Math.min(...values.filter(v => typeof v === 'number' && !isNaN(v)));
};

export const safeAverage = (values: number[]): number => {
  if (!Array.isArray(values) || values.length === 0) return 0;
  const validValues = values.filter(v => typeof v === 'number' && !isNaN(v));
  if (validValues.length === 0) return 0;
  return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
};