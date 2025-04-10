'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { currencyFormatter } from '@/lib/utils';

const COLORS = ['#c5af00', '#15803d', '#dc2626'];

interface ChartDataPoint {
  name: string;
  value: number;
  amount: number;
}

interface ClaimsDistributionProps {
  claimsByStatus: Record<string, number>;
  amountsByStatus: Record<string, number>;
}

export function ClaimsDistributionChart({ claimsByStatus, amountsByStatus }: ClaimsDistributionProps) {
  const data = [
    { 
      name: 'Pending', 
      value: claimsByStatus['Pending'] || 0,
      amount: amountsByStatus['Pending'] || 0
    },
    { 
      name: 'Approved', 
      value: claimsByStatus['Approved'] || 0,
      amount: amountsByStatus['Approved'] || 0
    },
    { 
      name: 'Denied', 
      value: claimsByStatus['Denied'] || 0,
      amount: amountsByStatus['Denied'] || 0
    },
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
              innerRadius={0}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string, item: { payload?: ChartDataPoint }) => {
                if (item?.payload) {
                  return [
                    `${value} claims (${currencyFormatter.format(item.payload.amount)})`,
                    item.payload.name
                  ];
                }
                return ['', ''];
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 