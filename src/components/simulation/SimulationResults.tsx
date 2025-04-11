"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockBillingRecords } from "@/lib/mockData";
import { runMonteCarloSimulation } from "@/lib/monteCarlo";
import { ProbabilityConfig } from "./ProbabilitySliders";
import { useDebouncedEffect } from "@/lib/hooks/useDebouncedEffect";

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

interface SimulationResultsProps {
  probabilities: ProbabilityConfig;
}

export function SimulationResults({ probabilities }: SimulationResultsProps) {
  const [results, setResults] = useState<SimulationResult | null>(null);

  useDebouncedEffect(
    () => {
      const simulationResults = runMonteCarloSimulation(mockBillingRecords, probabilities);
      setResults(simulationResults);
    },
    [probabilities],
    50
  );

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            Loading simulation results...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-xs font-medium text-muted-foreground">Expected Revenue</div>
              <div className="text-xl font-bold wrap-break-word">
                ${results.expectedRevenue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-xs font-medium text-muted-foreground">Minimum Revenue</div>
              <div className="text-xl font-bold">
                ${results.minRevenue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-xs font-medium text-muted-foreground">Maximum Revenue</div>
              <div className="text-xl font-bold">
                ${results.maxRevenue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-xs font-medium text-muted-foreground">95% Confidence Interval</div>
              <div className="text-lg font-bold">
                ${results.confidenceInterval.lower.toLocaleString('en-US', { maximumFractionDigits: 0 })} - 
                ${results.confidenceInterval.upper.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.distribution}>
                <XAxis
                  dataKey="range"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip
                  cursor={false}
                  formatter={(value: number) => [`${value} simulations`, 'Count']}
                  labelFormatter={(label: string) => `Revenue Range: ${label}`}
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    color: '#3b82f6',
                    padding: '8px 12px',
                  }}
                  itemStyle={{
                    color: '#3b82f6',
                  }}
                  labelStyle={{
                    color: '#3b82f6',
                    marginBottom: '4px',
                  }}
                  wrapperStyle={{
                    outline: 'none',
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={10}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 