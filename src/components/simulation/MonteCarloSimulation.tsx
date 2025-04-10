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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <ProbabilitySliders
            probabilities={probabilities}
            onChange={setProbabilities}
          />
        </div>
        <div className="lg:col-span-7">
          <SimulationResults probabilities={probabilities} />
        </div>
      </div>
    </div>
  );
} 