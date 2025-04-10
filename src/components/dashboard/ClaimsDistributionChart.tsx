'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = ['#3b82f6', '#22c55e', '#ef4444'];

interface ClaimsDistributionProps {
  claimsByStatus: Record<string, number>;
}

export function ClaimsDistributionChart({ claimsByStatus }: ClaimsDistributionProps) {
  const data = [
    { name: 'Pending', value: claimsByStatus['Pending'] || 0 },
    { name: 'Approved', value: claimsByStatus['Approved'] || 0 },
    { name: 'Denied', value: claimsByStatus['Denied'] || 0 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claims Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value} claims`, '']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 