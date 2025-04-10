import { BillingRecord, SimulationParameters, SimulationResult } from '../types';

const ITERATIONS = 2000;
const CONFIDENCE_LEVEL = 0.95;

function calculatePaymentProbability(status: string, params: SimulationParameters): number {
  switch (status) {
    case 'Pending':
      return params.pendingProbability;
    case 'Approved':
      return params.approvedProbability;
    case 'Denied':
      return params.deniedProbability;
    default:
      return 0;
  }
}

function calculatePercentile(values: number[], percentile: number): number {
  const index = Math.floor(values.length * percentile);
  return values[index];
}

export function runMonteCarloSimulation(
  billingRecords: BillingRecord[],
  parameters: SimulationParameters
): SimulationResult {
  const revenues: number[] = [];

  // Run simulation iterations
  for (let i = 0; i < ITERATIONS; i++) {
    let iterationRevenue = 0;
    
    // For each billing record
    for (const record of billingRecords) {
      const probability = calculatePaymentProbability(record.payment_status, parameters);
      
      // Simulate payment based on probability
      if (Math.random() < probability) {
        iterationRevenue += record.amount;
      }
    }
    
    revenues.push(iterationRevenue);
  }

  // Sort revenues for percentile calculations
  revenues.sort((a, b) => a - b);

  // Calculate confidence interval
  const lowerPercentile = (1 - CONFIDENCE_LEVEL) / 2;
  const upperPercentile = 1 - lowerPercentile;

  return {
    expectedRevenue: revenues.reduce((sum, val) => sum + val, 0) / ITERATIONS,
    minRevenue: Math.min(...revenues),
    maxRevenue: Math.max(...revenues),
    confidenceInterval: {
      lower: calculatePercentile(revenues, lowerPercentile),
      upper: calculatePercentile(revenues, upperPercentile)
    }
  };
} 