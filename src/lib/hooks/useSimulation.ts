import { useState, useCallback } from 'react';
import { BillingRecord, SimulationParameters, SimulationResult } from '../types';
import { runMonteCarloSimulation } from '../utils/simulation';

const DEFAULT_PARAMETERS: SimulationParameters = {
  pendingProbability: 0.7,
  approvedProbability: 0.9,
  deniedProbability: 0.1,
};

export function useSimulation(billingRecords: BillingRecord[]) {
  const [parameters, setParameters] = useState<SimulationParameters>(DEFAULT_PARAMETERS);
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const runSimulation = useCallback(() => {
    setIsCalculating(true);
    // Use setTimeout to prevent UI blocking during calculation
    setTimeout(() => {
      const simulationResults = runMonteCarloSimulation(billingRecords, parameters);
      setResults(simulationResults);
      setIsCalculating(false);
    }, 0);
  }, [billingRecords, parameters]);

  const updateParameter = useCallback((
    key: keyof SimulationParameters,
    value: number
  ) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  return {
    parameters,
    results,
    isCalculating,
    runSimulation,
    updateParameter,
  };
} 