/**
 * Trading calculation utilities for risk management
 * All formulas follow standard financial industry practices
 */

export interface PositionCalculationInput {
  tradeType: 'LONG' | 'SHORT';
  entryPrice: number;
  stopLossPrice: number;
  leverage: number;
  riskAmount: number;
}

export interface ProfitCalculationInput {
  tradeType: 'LONG' | 'SHORT';
  entryPrice: number;
  stopLossPrice: number;
  leverage: number;
  positionSize: number;
  takeProfits: number[];
}

export interface PositionCalculationResult {
  positionSize: number;
  margin: number;
  potentialLoss: number;
  riskPercentage: number;
}

export interface TakeProfitBreakdown {
  price: number;
  profit: number;
  riskReward: number;
}

export interface ProfitCalculationResult {
  profits: number[];
  roi: number;
  primaryRiskReward: number;
  averageRiskReward: number;
  potentialLoss: number;
  margin: number;
  totalProfit: number;
  averageProfit: number;
  takeProfitBreakdown: TakeProfitBreakdown[];
}

/**
 * Calculate optimal position size based on risk tolerance
 */
export function calculatePositionSize(input: PositionCalculationInput): PositionCalculationResult {
  const { entryPrice, stopLossPrice, leverage, riskAmount } = input;
  
  // Calculate risk per unit (absolute price distance to stop loss)
  const riskPerUnit = Math.abs(stopLossPrice - entryPrice);
  
  // Calculate risk percentage (for display purposes)
  const riskPercentage = (riskPerUnit / entryPrice) * 100;
  
  // Position size calculation:
  // Units needed = Risk Amount / (Risk per unit × Leverage)
  // Leverage multiplies the risk per unit because losses are amplified
  const positionSize = riskAmount / (riskPerUnit * leverage);
  
  // Calculate notional value of the position
  const notionalValue = positionSize * entryPrice;
  
  // Margin required = Notional Value / Leverage
  const margin = notionalValue / leverage;
  
  // Potential loss should equal the risk amount
  const potentialLoss = riskAmount;
  
  return {
    positionSize,
    margin,
    potentialLoss,
    riskPercentage
  };
}

/**
 * Calculate profit metrics for trading positions
 */
export function calculateProfitMetrics(input: ProfitCalculationInput): ProfitCalculationResult {
  const { tradeType, entryPrice, stopLossPrice, leverage, positionSize, takeProfits } = input;
  
  // Calculate potential loss (leverage effect already included in position size)
  const riskPercentage = Math.abs(stopLossPrice - entryPrice) / entryPrice;
  const potentialLoss = riskPercentage * positionSize;
  
  // Calculate profit at each take profit level (no leverage multiplication - already in position size)
  const profits = takeProfits.map(tp => {
    if (tp <= 0) return 0;

    const profitPercentage = tradeType === 'LONG'
      ? (tp - entryPrice) / entryPrice
      : (entryPrice - tp) / entryPrice;

    // Return absolute profit amount (leverage effect already in position size)
    return profitPercentage * positionSize;
  }).filter(profit => profit > 0);

  // Calculate metrics
  const totalProfit = profits.reduce((sum, profit) => sum + profit, 0);
  const averageProfit = profits.length > 0 ? totalProfit / profits.length : 0;
  // positionSize is notional value in USD, so margin = notional / leverage
  const margin = positionSize / leverage;
  const roi = margin > 0 ? (averageProfit / margin) * 100 : 0;

  // Risk/Reward: Use the first (primary) take profit level for standard R:R calculation
  const primaryProfit = profits.length > 0 ? profits[0] : 0;
  const primaryRiskReward = potentialLoss > 0 ? primaryProfit / potentialLoss : 0;
  const averageRiskReward = potentialLoss > 0 ? averageProfit / potentialLoss : 0;

  // Build take profit breakdown with individual R:R ratios
  const validTakeProfits = takeProfits.filter(tp => tp > 0);
  const takeProfitBreakdown: TakeProfitBreakdown[] = validTakeProfits.map((tp, index) => ({
    price: tp,
    profit: profits[index] || 0,
    riskReward: potentialLoss > 0 ? (profits[index] || 0) / potentialLoss : 0
  }));

  return {
    profits,
    roi,
    primaryRiskReward,
    averageRiskReward,
    potentialLoss,
    margin,
    totalProfit,
    averageProfit,
    takeProfitBreakdown
  };
}

/**
 * Validate trading input parameters
 */
export function validateTradingParameters(
  tradeType: 'LONG' | 'SHORT',
  entryPrice: number,
  stopLossPrice: number,
  takeProfits: number[] = []
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Basic validations
  if (entryPrice <= 0) errors.push('Entry price must be positive');
  if (stopLossPrice <= 0) errors.push('Stop loss must be positive');
  
  // Trade type specific validations
  if (tradeType === 'LONG') {
    if (stopLossPrice >= entryPrice) {
      errors.push('For LONG positions, stop loss must be below entry price');
    }
    takeProfits.forEach((tp, index) => {
      if (tp > 0 && tp <= entryPrice) {
        errors.push(`Take profit ${index + 1} must be above entry price for LONG positions`);
      }
    });
  } else {
    if (stopLossPrice <= entryPrice) {
      errors.push('For SHORT positions, stop loss must be above entry price');
    }
    takeProfits.forEach((tp, index) => {
      if (tp > 0 && tp >= entryPrice) {
        errors.push(`Take profit ${index + 1} must be below entry price for SHORT positions`);
      }
    });
  }
  
  // Check take profit order
  const validTPs = takeProfits.filter(tp => tp > 0).sort((a, b) => 
    tradeType === 'LONG' ? a - b : b - a
  );
  
  for (let i = 0; i < validTPs.length - 1; i++) {
    if (tradeType === 'LONG' && validTPs[i] >= validTPs[i + 1]) {
      errors.push('Take profit levels must be in ascending order for LONG positions');
      break;
    }
    if (tradeType === 'SHORT' && validTPs[i] <= validTPs[i + 1]) {
      errors.push('Take profit levels must be in descending order for SHORT positions');
      break;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Format currency values consistently
 */
export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Format percentage values consistently
 */
export function formatPercentage(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Safe number parsing with validation
 */
export function safeParseFloat(value: string | number): number {
  const parsed = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(parsed) || !isFinite(parsed) ? 0 : parsed;
}