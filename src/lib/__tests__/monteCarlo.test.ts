import { runMonteCarloSimulation } from '../monteCarlo';
import { BillingRecord } from '../types';

describe('Monte Carlo Simulation', () => {
  const mockClaims: BillingRecord[] = [
    {
      patient_id: "P1",
      patient_name: "Test Patient",
      billing_code: "B1001",
      amount: 1000,
      insurance_provider: "Test Insurance",
      payment_status: "Pending",
      claim_date: "2025-03-25"
    }
  ];

  const mockProbabilities = {
    pending: 50,
    approved: 100,
    denied: 0
  };

  it('should return expected simulation results structure', () => {
    const results = runMonteCarloSimulation(mockClaims, mockProbabilities);

    expect(results).toHaveProperty('expectedRevenue');
    expect(results).toHaveProperty('minRevenue');
    expect(results).toHaveProperty('maxRevenue');
    expect(results).toHaveProperty('confidenceInterval');
    expect(results).toHaveProperty('distribution');
  });

  it('should calculate expected revenue within reasonable bounds', () => {
    const results = runMonteCarloSimulation(mockClaims, mockProbabilities);
    
    // With 50% probability on a $1000 claim, expected value should be close to $500
    expect(results.expectedRevenue).toBeGreaterThan(400);
    expect(results.expectedRevenue).toBeLessThan(600);
  });

  it('should handle 100% probability correctly', () => {
    const results = runMonteCarloSimulation(mockClaims, {
      pending: 100,
      approved: 100,
      denied: 100
    });

    expect(results.minRevenue).toBe(1000);
    expect(results.maxRevenue).toBe(1000);
    expect(results.expectedRevenue).toBe(1000);
  });

  it('should handle 0% probability correctly', () => {
    const results = runMonteCarloSimulation(mockClaims, {
      pending: 0,
      approved: 0,
      denied: 0
    });

    expect(results.minRevenue).toBe(0);
    expect(results.maxRevenue).toBe(0);
    expect(results.expectedRevenue).toBe(0);
  });

  it('should generate correct number of distribution buckets', () => {
    const results = runMonteCarloSimulation(mockClaims, mockProbabilities);
    expect(results.distribution).toHaveLength(10); // Default number of bins
  });

  it('should maintain confidence interval within revenue bounds', () => {
    const results = runMonteCarloSimulation(mockClaims, mockProbabilities);
    
    expect(results.confidenceInterval.lower).toBeGreaterThanOrEqual(results.minRevenue);
    expect(results.confidenceInterval.upper).toBeLessThanOrEqual(results.maxRevenue);
  });
}); 