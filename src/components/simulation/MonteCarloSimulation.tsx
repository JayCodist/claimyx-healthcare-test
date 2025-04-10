"use client";

import { useState } from "react";
import { ProbabilitySliders, ProbabilityConfig } from "./ProbabilitySliders";
import { SimulationResults } from "./SimulationResults";

export function MonteCarloSimulation() {
  const [probabilities, setProbabilities] = useState<ProbabilityConfig>({
    pending: 70,
    approved: 95,
    denied: 20,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProbabilitySliders
          probabilities={probabilities}
          onChange={setProbabilities}
        />
        <SimulationResults probabilities={probabilities} />
      </div>
    </div>
  );
} 