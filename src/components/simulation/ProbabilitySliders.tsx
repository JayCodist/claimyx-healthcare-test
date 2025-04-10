"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ProbabilityConfig {
  pending: number;
  approved: number;
  denied: number;
}

interface ProbabilitySliderProps {
  probabilities: ProbabilityConfig;
  onChange: (newProbabilities: ProbabilityConfig) => void;
  onChangeCommit?: (newProbabilities: ProbabilityConfig) => void;
}

export function ProbabilitySliders({ probabilities, onChange, onChangeCommit }: ProbabilitySliderProps) {
  const handleSliderChange = (value: number[], key: keyof ProbabilityConfig) => {
    const newProbabilities = {
      ...probabilities,
      [key]: value[0],
    };
    onChange(newProbabilities);
  };

  const handleSliderCommit = (value: number[], key: keyof ProbabilityConfig) => {
    if (onChangeCommit) {
      onChangeCommit({
        ...probabilities,
        [key]: value[0],
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Probability Adjustments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="pending-probability">Pending Claims Payment Probability</Label>
            <span className="text-sm text-muted-foreground">{probabilities.pending}%</span>
          </div>
          <Slider
            id="pending-probability"
            min={0}
            max={100}
            step={1}
            value={[probabilities.pending]}
            onValueChange={(value) => handleSliderChange(value, "pending")}
            onValueCommit={(value) => handleSliderCommit(value, "pending")}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="approved-probability">Approved Claims Payment Probability</Label>
            <span className="text-sm text-muted-foreground">{probabilities.approved}%</span>
          </div>
          <Slider
            id="approved-probability"
            min={0}
            max={100}
            step={1}
            value={[probabilities.approved]}
            onValueChange={(value) => handleSliderChange(value, "approved")}
            onValueCommit={(value) => handleSliderCommit(value, "approved")}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="denied-probability">Denied Claims Appeal Success Probability</Label>
            <span className="text-sm text-muted-foreground">{probabilities.denied}%</span>
          </div>
          <Slider
            id="denied-probability"
            min={0}
            max={100}
            step={1}
            value={[probabilities.denied]}
            onValueChange={(value) => handleSliderChange(value, "denied")}
            onValueCommit={(value) => handleSliderCommit(value, "denied")}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
} 