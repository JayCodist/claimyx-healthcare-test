import { BillingRecord } from './types';
import { ProbabilityConfig } from '@/components/simulation/ProbabilitySliders';

interface SimulationResult {
  expectedRevenue: number;
  minRevenue: number;
  maxRevenue: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  distribution: {
    range: string;
    count: number;
  }[];
}

const NUM_SIMULATIONS = 2000;

function runSingleSimulation(claims: BillingRecord[], probabilities: ProbabilityConfig): number {
  return claims.reduce((total, claim) => {
    const probability = probabilities[claim.payment_status.toLowerCase() as keyof ProbabilityConfig];
    const willPay = Math.random() * 100 <= probability;
    return total + (willPay ? claim.amount : 0);
  }, 0);
}

function calculateConfidenceInterval(results: number[], confidenceLevel: number = 0.95): { lower: number; upper: number } {
  const sortedResults = [...results].sort((a, b) => a - b);
  const lowerIndex = Math.floor((1 - confidenceLevel) / 2 * results.length);
  const upperIndex = Math.floor((1 + confidenceLevel) / 2 * results.length);
  
  return {
    lower: sortedResults[lowerIndex],
    upper: sortedResults[upperIndex],
  };
}

function calculateDistribution(results: number[], bins: number = 10): { range: string; count: number }[] {
  const min = Math.min(...results);
  const max = Math.max(...results);
  
  // Handle the case where all values are the same
  if (min === max) {
    return [{
      range: formatCurrency(min),
      count: results.length
    }];
  }

  const binSize = (max - min) / bins;
  const distribution = Array(bins).fill(0).map((_, i) => ({
    range: `${formatCurrency(min + i * binSize)} - ${formatCurrency(min + (i + 1) * binSize)}`,
    count: 0
  }));
  
  results.forEach(result => {
    const binIndex = Math.min(Math.floor((result - min) / binSize), bins - 1);
    distribution[binIndex].count++;
  });
  
  return distribution;
}

function formatCurrency(value: number): string {
  return `$${(value / 1000).toFixed(1)}k`;
}

export function runMonteCarloSimulation(
  claims: BillingRecord[],
  probabilities: ProbabilityConfig
): SimulationResult {
  const results: number[] = [];
  
  // Run simulations
  for (let i = 0; i < NUM_SIMULATIONS; i++) {
    results.push(runSingleSimulation(claims, probabilities));
  }
  
  // Calculate statistics
  const expectedRevenue = results.reduce((a, b) => a + b, 0) / NUM_SIMULATIONS;
  const minRevenue = Math.min(...results);
  const maxRevenue = Math.max(...results);
  const confidenceInterval = calculateConfidenceInterval(results);
  const distribution = calculateDistribution(results);
  
  return {
    expectedRevenue,
    minRevenue,
    maxRevenue,
    confidenceInterval,
    distribution,
  };
} 