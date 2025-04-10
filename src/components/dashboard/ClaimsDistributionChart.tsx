'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { currencyFormatter } from '@/lib/utils';

const COLORS = ['#c5af00', '#15803d', '#dc2626'];
const DARK_COLORS = ['#facc15', '#22c55e', '#ef4444'];

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
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white">Claims Distribution</CardTitle>
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
                <Cell 
                  key={`cell-${index}`} 
                  fill={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? DARK_COLORS[index] : COLORS[index]} 
                />
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
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--foreground)',
              }}
              itemStyle={{
                color: 'var(--foreground)',
              }}
              labelStyle={{
                color: 'var(--foreground)',
              }}
              wrapperStyle={{
                outline: 'none',
              }}
            />
            <Legend 
              formatter={(value: string) => (
                <span className="dark:text-gray-300">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 