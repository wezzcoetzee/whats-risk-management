import { describe, it, expect } from 'vitest';
import {
  calculatePositionSize,
  calculateProfitMetrics,
  validateTradingParameters,
  formatCurrency,
  formatPercentage,
  safeParseFloat,
  type PositionCalculationInput,
  type ProfitCalculationInput,
} from './calculations';

describe('calculatePositionSize', () => {
  describe('basic position size calculation', () => {
    it('calculates correct position size for a LONG trade', () => {
      const input: PositionCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 50000,
        stopLossPrice: 49000,
        leverage: 10,
        riskAmount: 100,
      };

      const result = calculatePositionSize(input);

      // Position size = riskAmount / riskPerUnit = 100 / 1000 = 0.1 BTC
      expect(result.positionSize).toBeCloseTo(0.1, 6);
      // Notional value = 0.1 * 50000 = 5000
      // Margin = 5000 / 10 = 500
      expect(result.margin).toBeCloseTo(500, 2);
      expect(result.potentialLoss).toBe(100);
      // Risk percentage = 1000 / 50000 = 2%
      expect(result.riskPercentage).toBeCloseTo(2, 2);
    });

    it('calculates correct position size for a SHORT trade', () => {
      const input: PositionCalculationInput = {
        tradeType: 'SHORT',
        entryPrice: 50000,
        stopLossPrice: 51000,
        leverage: 10,
        riskAmount: 100,
      };

      const result = calculatePositionSize(input);

      expect(result.positionSize).toBeCloseTo(0.1, 6);
      expect(result.margin).toBeCloseTo(500, 2);
      expect(result.potentialLoss).toBe(100);
      expect(result.riskPercentage).toBeCloseTo(2, 2);
    });

    it('calculates correctly without leverage (spot trading)', () => {
      const input: PositionCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 95,
        leverage: 1,
        riskAmount: 50,
      };

      const result = calculatePositionSize(input);

      // Position size = 50 / 5 = 10 units
      expect(result.positionSize).toBe(10);
      // Margin = 10 * 100 / 1 = 1000 (full notional for spot)
      expect(result.margin).toBe(1000);
      expect(result.potentialLoss).toBe(50);
      expect(result.riskPercentage).toBeCloseTo(5, 2);
    });
  });

  describe('verifies actual loss equals risk amount', () => {
    it('actual loss at stop equals risk amount for LONG', () => {
      const input: PositionCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 50000,
        stopLossPrice: 49000,
        leverage: 10,
        riskAmount: 100,
      };

      const result = calculatePositionSize(input);
      const priceMove = input.entryPrice - input.stopLossPrice;
      const actualLoss = result.positionSize * priceMove;

      expect(actualLoss).toBeCloseTo(input.riskAmount, 6);
    });

    it('actual loss at stop equals risk amount for SHORT', () => {
      const input: PositionCalculationInput = {
        tradeType: 'SHORT',
        entryPrice: 50000,
        stopLossPrice: 52000,
        leverage: 5,
        riskAmount: 200,
      };

      const result = calculatePositionSize(input);
      const priceMove = input.stopLossPrice - input.entryPrice;
      const actualLoss = result.positionSize * priceMove;

      expect(actualLoss).toBeCloseTo(input.riskAmount, 6);
    });
  });

  describe('leverage only affects margin, not position size', () => {
    it('same position size regardless of leverage', () => {
      const baseInput = {
        tradeType: 'LONG' as const,
        entryPrice: 1000,
        stopLossPrice: 950,
        riskAmount: 100,
      };

      const result1x = calculatePositionSize({ ...baseInput, leverage: 1 });
      const result10x = calculatePositionSize({ ...baseInput, leverage: 10 });
      const result50x = calculatePositionSize({ ...baseInput, leverage: 50 });

      // Position size should be identical
      expect(result1x.positionSize).toBe(result10x.positionSize);
      expect(result10x.positionSize).toBe(result50x.positionSize);

      // Margin should scale with leverage
      expect(result1x.margin).toBe(result10x.margin * 10);
      expect(result10x.margin).toBe(result50x.margin * 5);
    });
  });

  describe('edge cases', () => {
    it('handles very small price differences', () => {
      const input: PositionCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 99.99,
        leverage: 10,
        riskAmount: 10,
      };

      const result = calculatePositionSize(input);

      expect(result.positionSize).toBeCloseTo(1000, 0);
      expect(result.riskPercentage).toBeCloseTo(0.01, 4);
    });

    it('handles large price differences', () => {
      const input: PositionCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 50,
        leverage: 2,
        riskAmount: 500,
      };

      const result = calculatePositionSize(input);

      expect(result.positionSize).toBe(10);
      expect(result.riskPercentage).toBe(50);
    });
  });
});

describe('calculateProfitMetrics', () => {
  describe('basic profit calculations', () => {
    it('calculates profit for LONG trade with single take profit (100% allocation)', () => {
      const input: ProfitCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 95,
        leverage: 10,
        positionSize: 1000, // $1000 notional
        takeProfits: [110],
      };

      const result = calculateProfitMetrics(input);

      // Single TP = 100% of position
      // Profit = 10% move * $1000 = $100
      expect(result.profits[0]).toBeCloseTo(100, 2);
      // Loss = 5% move * $1000 = $50
      expect(result.potentialLoss).toBeCloseTo(50, 2);
      // R:R = 100 / 50 = 2
      expect(result.primaryRiskReward).toBeCloseTo(2, 2);
    });

    it('calculates profit for SHORT trade with single take profit', () => {
      const input: ProfitCalculationInput = {
        tradeType: 'SHORT',
        entryPrice: 100,
        stopLossPrice: 105,
        leverage: 10,
        positionSize: 1000,
        takeProfits: [90],
      };

      const result = calculateProfitMetrics(input);

      // Single TP = 100% of position
      // Profit = 10% move * $1000 = $100
      expect(result.profits[0]).toBeCloseTo(100, 2);
      expect(result.potentialLoss).toBeCloseTo(50, 2);
      expect(result.primaryRiskReward).toBeCloseTo(2, 2);
    });

    it('splits position equally across multiple take profits', () => {
      const input: ProfitCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 90,
        leverage: 5,
        positionSize: 1200, // Divisible by 3
        takeProfits: [110, 120, 130],
      };

      const result = calculateProfitMetrics(input);

      // 3 TPs = 33.33% each = $400 per target
      // TP1: 10% * $400 = $40
      // TP2: 20% * $400 = $80
      // TP3: 30% * $400 = $120
      expect(result.profits).toHaveLength(3);
      expect(result.profits[0]).toBeCloseTo(40, 2);
      expect(result.profits[1]).toBeCloseTo(80, 2);
      expect(result.profits[2]).toBeCloseTo(120, 2);

      // Total profit = $40 + $80 + $120 = $240
      expect(result.totalProfit).toBeCloseTo(240, 2);
      expect(result.averageProfit).toBeCloseTo(80, 2);

      // Loss = 10% * $1200 = $120
      expect(result.potentialLoss).toBeCloseTo(120, 2);

      // Primary R:R = totalProfit / loss = 240 / 120 = 2
      expect(result.primaryRiskReward).toBeCloseTo(2, 2);
    });

    it('splits position 50/50 for two take profits', () => {
      const input: ProfitCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 95,
        leverage: 10,
        positionSize: 1000,
        takeProfits: [110, 120],
      };

      const result = calculateProfitMetrics(input);

      // 2 TPs = 50% each = $500 per target
      // TP1: 10% * $500 = $50
      // TP2: 20% * $500 = $100
      expect(result.profits[0]).toBeCloseTo(50, 2);
      expect(result.profits[1]).toBeCloseTo(100, 2);
      expect(result.totalProfit).toBeCloseTo(150, 2);
    });

    it('splits position 25% each for four take profits', () => {
      const input: ProfitCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 95,
        leverage: 10,
        positionSize: 1000,
        takeProfits: [105, 110, 115, 120],
      };

      const result = calculateProfitMetrics(input);

      // 4 TPs = 25% each = $250 per target
      expect(result.profits[0]).toBeCloseTo(12.5, 2);  // 5% * $250
      expect(result.profits[1]).toBeCloseTo(25, 2);    // 10% * $250
      expect(result.profits[2]).toBeCloseTo(37.5, 2);  // 15% * $250
      expect(result.profits[3]).toBeCloseTo(50, 2);    // 20% * $250
      expect(result.totalProfit).toBeCloseTo(125, 2);
    });
  });

  describe('ROI calculation', () => {
    it('calculates ROI based on total profit and margin', () => {
      const input: ProfitCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 95,
        leverage: 10,
        positionSize: 1000,
        takeProfits: [110],
      };

      const result = calculateProfitMetrics(input);

      // Margin = 1000 / 10 = 100
      // Total Profit = 100
      // ROI = (100 / 100) * 100 = 100%
      expect(result.margin).toBe(100);
      expect(result.roi).toBeCloseTo(100, 2);
    });

    it('ROI scales with leverage', () => {
      const baseInput = {
        tradeType: 'LONG' as const,
        entryPrice: 100,
        stopLossPrice: 95,
        positionSize: 1000,
        takeProfits: [110],
      };

      const result5x = calculateProfitMetrics({ ...baseInput, leverage: 5 });
      const result10x = calculateProfitMetrics({ ...baseInput, leverage: 10 });

      // Same profit, but different margins
      expect(result5x.totalProfit).toEqual(result10x.totalProfit);
      // 10x leverage = 2x the ROI of 5x leverage
      expect(result10x.roi).toBeCloseTo(result5x.roi * 2, 2);
    });
  });

  describe('take profit breakdown', () => {
    it('provides breakdown with allocated position per level', () => {
      const input: ProfitCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 95,
        leverage: 10,
        positionSize: 900, // Divisible by 3
        takeProfits: [105, 110, 120],
      };

      const result = calculateProfitMetrics(input);

      // 3 TPs = $300 per target
      // Loss = 5% * $900 = $45
      expect(result.takeProfitBreakdown).toHaveLength(3);

      // TP1: 5% * $300 = $15, R:R = 15/45 = 0.33
      expect(result.takeProfitBreakdown[0].price).toBe(105);
      expect(result.takeProfitBreakdown[0].profit).toBeCloseTo(15, 2);
      expect(result.takeProfitBreakdown[0].riskReward).toBeCloseTo(0.33, 2);

      // TP2: 10% * $300 = $30, R:R = 30/45 = 0.67
      expect(result.takeProfitBreakdown[1].price).toBe(110);
      expect(result.takeProfitBreakdown[1].profit).toBeCloseTo(30, 2);
      expect(result.takeProfitBreakdown[1].riskReward).toBeCloseTo(0.67, 2);

      // TP3: 20% * $300 = $60, R:R = 60/45 = 1.33
      expect(result.takeProfitBreakdown[2].price).toBe(120);
      expect(result.takeProfitBreakdown[2].profit).toBeCloseTo(60, 2);
      expect(result.takeProfitBreakdown[2].riskReward).toBeCloseTo(1.33, 2);
    });
  });

  describe('edge cases', () => {
    it('handles zero take profits', () => {
      const input: ProfitCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 95,
        leverage: 10,
        positionSize: 1000,
        takeProfits: [0, 0],
      };

      const result = calculateProfitMetrics(input);

      expect(result.profits).toHaveLength(0);
      expect(result.totalProfit).toBe(0);
      expect(result.primaryRiskReward).toBe(0);
    });

    it('filters out invalid take profits for LONG (below entry)', () => {
      const input: ProfitCalculationInput = {
        tradeType: 'LONG',
        entryPrice: 100,
        stopLossPrice: 95,
        leverage: 10,
        positionSize: 1000,
        takeProfits: [90, 110], // 90 is below entry for LONG
      };

      const result = calculateProfitMetrics(input);

      // Position split 50/50, but 90 produces negative profit
      // Only the valid TP (110) contributes: 10% * $500 = $50
      expect(result.profits.filter(p => p > 0)).toHaveLength(1);
      expect(result.totalProfit).toBeCloseTo(50, 2);
    });
  });
});

describe('validateTradingParameters', () => {
  describe('LONG trade validation', () => {
    it('accepts valid LONG parameters', () => {
      const result = validateTradingParameters('LONG', 100, 95, [105, 110]);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('rejects stop loss above entry for LONG', () => {
      const result = validateTradingParameters('LONG', 100, 105);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('For LONG positions, stop loss must be below entry price');
    });

    it('rejects stop loss equal to entry for LONG', () => {
      const result = validateTradingParameters('LONG', 100, 100);

      expect(result.isValid).toBe(false);
    });

    it('rejects take profit below entry for LONG', () => {
      const result = validateTradingParameters('LONG', 100, 95, [90]);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('above entry price'))).toBe(true);
    });

    it('rejects take profit equal to entry for LONG', () => {
      const result = validateTradingParameters('LONG', 100, 95, [100]);

      expect(result.isValid).toBe(false);
    });
  });

  describe('SHORT trade validation', () => {
    it('accepts valid SHORT parameters', () => {
      const result = validateTradingParameters('SHORT', 100, 105, [95, 90]);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('rejects stop loss below entry for SHORT', () => {
      const result = validateTradingParameters('SHORT', 100, 95);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('For SHORT positions, stop loss must be above entry price');
    });

    it('rejects take profit above entry for SHORT', () => {
      const result = validateTradingParameters('SHORT', 100, 105, [110]);

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('below entry price'))).toBe(true);
    });
  });

  describe('basic validations', () => {
    it('rejects zero entry price', () => {
      const result = validateTradingParameters('LONG', 0, 95);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Entry price must be positive');
    });

    it('rejects negative entry price', () => {
      const result = validateTradingParameters('LONG', -100, 95);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Entry price must be positive');
    });

    it('rejects zero stop loss', () => {
      const result = validateTradingParameters('LONG', 100, 0);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Stop loss must be positive');
    });

    it('rejects negative stop loss', () => {
      const result = validateTradingParameters('LONG', 100, -5);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Stop loss must be positive');
    });
  });

  describe('take profit order validation', () => {
    it('accepts properly ordered LONG take profits', () => {
      const result = validateTradingParameters('LONG', 100, 95, [105, 110, 120]);

      expect(result.isValid).toBe(true);
    });

    it('accepts any order of LONG take profits (sorts internally)', () => {
      // Implementation sorts TPs internally before validation
      const result = validateTradingParameters('LONG', 100, 95, [120, 110, 105]);

      expect(result.isValid).toBe(true);
    });

    it('accepts properly ordered SHORT take profits', () => {
      const result = validateTradingParameters('SHORT', 100, 105, [95, 90, 85]);

      expect(result.isValid).toBe(true);
    });

    it('accepts any order of SHORT take profits (sorts internally)', () => {
      // Implementation sorts TPs internally before validation
      const result = validateTradingParameters('SHORT', 100, 105, [85, 90, 95]);

      expect(result.isValid).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('handles empty take profits array', () => {
      const result = validateTradingParameters('LONG', 100, 95, []);

      expect(result.isValid).toBe(true);
    });

    it('ignores zero values in take profits', () => {
      const result = validateTradingParameters('LONG', 100, 95, [105, 0, 110]);

      expect(result.isValid).toBe(true);
    });
  });
});

describe('formatCurrency', () => {
  it('formats positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('rounds to 2 decimal places', () => {
    expect(formatCurrency(1234.5678)).toBe('$1,234.57');
  });

  it('adds decimal places for whole numbers', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  });

  it('handles large numbers', () => {
    expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
  });

  it('handles small decimals', () => {
    expect(formatCurrency(0.01)).toBe('$0.01');
  });
});

describe('formatPercentage', () => {
  it('formats with default 2 decimals', () => {
    expect(formatPercentage(12.3456)).toBe('12.35%');
  });

  it('formats with custom decimals', () => {
    expect(formatPercentage(12.3456, 1)).toBe('12.3%');
    expect(formatPercentage(12.3456, 0)).toBe('12%');
    expect(formatPercentage(12.3456, 4)).toBe('12.3456%');
  });

  it('formats zero correctly', () => {
    expect(formatPercentage(0)).toBe('0.00%');
  });

  it('formats negative percentages', () => {
    expect(formatPercentage(-5.5)).toBe('-5.50%');
  });

  it('handles whole numbers', () => {
    expect(formatPercentage(100)).toBe('100.00%');
  });
});

describe('safeParseFloat', () => {
  describe('string inputs', () => {
    it('parses valid numeric strings', () => {
      expect(safeParseFloat('123.45')).toBe(123.45);
      expect(safeParseFloat('0')).toBe(0);
      expect(safeParseFloat('-50.5')).toBe(-50.5);
    });

    it('returns 0 for invalid strings', () => {
      expect(safeParseFloat('abc')).toBe(0);
      expect(safeParseFloat('')).toBe(0);
    });

    it('parseFloat stops at first invalid char (12.34.56 -> 12.34)', () => {
      // This is JavaScript parseFloat behavior - parses until invalid char
      expect(safeParseFloat('12.34.56')).toBe(12.34);
    });

    it('parses strings with leading/trailing spaces', () => {
      expect(safeParseFloat('  123  ')).toBe(123);
    });

    it('handles scientific notation', () => {
      expect(safeParseFloat('1e5')).toBe(100000);
      expect(safeParseFloat('1.5e-3')).toBeCloseTo(0.0015, 6);
    });
  });

  describe('number inputs', () => {
    it('returns valid numbers as-is', () => {
      expect(safeParseFloat(123.45)).toBe(123.45);
      expect(safeParseFloat(0)).toBe(0);
      expect(safeParseFloat(-50)).toBe(-50);
    });

    it('returns 0 for NaN', () => {
      expect(safeParseFloat(NaN)).toBe(0);
    });

    it('returns 0 for Infinity', () => {
      expect(safeParseFloat(Infinity)).toBe(0);
      expect(safeParseFloat(-Infinity)).toBe(0);
    });
  });
});
