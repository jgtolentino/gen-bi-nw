import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatDate,
  formatCompactNumber,
  safeMax,
  safeMin,
  safeAverage
} from '../formatters';

describe('Safe Formatters', () => {
  describe('formatCurrency', () => {
    it('handles null/undefined values', () => {
      expect(formatCurrency(null)).toBe('$0');
      expect(formatCurrency(undefined)).toBe('$0');
      expect(formatCurrency(0)).toBe('$0');
    });

    it('formats positive numbers correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,235');
      expect(formatCurrency(1000000)).toBe('$1,000,000');
    });

    it('formats negative numbers correctly', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,235');
    });
  });

  describe('formatNumber', () => {
    it('handles null/undefined values', () => {
      expect(formatNumber(null)).toBe('0');
      expect(formatNumber(undefined)).toBe('0');
    });

    it('formats with specified decimals', () => {
      expect(formatNumber(1234.567, 2)).toBe('1,234.57');
      expect(formatNumber(1234.567, 0)).toBe('1,235');
    });
  });

  describe('formatPercent', () => {
    it('handles null/undefined values', () => {
      expect(formatPercent(null)).toBe('0.0%');
      expect(formatPercent(undefined)).toBe('0.0%');
    });

    it('formats percentages correctly', () => {
      expect(formatPercent(25.5)).toBe('25.5%');
      expect(formatPercent(100, 0)).toBe('100%');
    });
  });

  describe('formatDate', () => {
    it('handles null/undefined/invalid dates', () => {
      expect(formatDate(null)).toBe('-');
      expect(formatDate(undefined)).toBe('-');
      expect(formatDate('invalid')).toBe('-');
    });

    it('formats valid dates', () => {
      expect(formatDate('2024-01-15')).toBe('Jan 15, 2024');
      expect(formatDate(new Date('2024-01-15'))).toBe('Jan 15, 2024');
    });
  });

  describe('formatCompactNumber', () => {
    it('handles null/undefined', () => {
      expect(formatCompactNumber(null)).toBe('0');
      expect(formatCompactNumber(undefined)).toBe('0');
    });

    it('formats large numbers compactly', () => {
      expect(formatCompactNumber(1234)).toBe('1.2K');
      expect(formatCompactNumber(1234567)).toBe('1.2M');
      expect(formatCompactNumber(999)).toBe('999');
    });
  });

  describe('Safe Array Operations', () => {
    it('safeMax handles empty/invalid arrays', () => {
      expect(safeMax([])).toBe(0);
      expect(safeMax(null as any)).toBe(0);
      expect(safeMax([NaN, undefined, null] as any)).toBe(0);
    });

    it('safeMax finds maximum correctly', () => {
      expect(safeMax([1, 5, 3])).toBe(5);
      expect(safeMax([1, NaN, 5, undefined, 3] as any)).toBe(5);
    });

    it('safeMin handles empty/invalid arrays', () => {
      expect(safeMin([])).toBe(0);
      expect(safeMin(null as any)).toBe(0);
    });

    it('safeAverage calculates correctly', () => {
      expect(safeAverage([])).toBe(0);
      expect(safeAverage([10, 20, 30])).toBe(20);
      expect(safeAverage([10, NaN, 20] as any)).toBe(15);
    });
  });
});