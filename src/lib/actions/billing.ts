'use server'

import { BillingRecord } from '../types';
import { mockBillingRecords } from '../data/mock-data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getBillingRecords(): Promise<BillingRecord[]> {
  // Simulate network delay
  await delay(1000);
  return mockBillingRecords;
}

export async function getDashboardSummary() {
  const records = await getBillingRecords();
  
  const summary = {
    totalBillingAmount: records.reduce((sum, record) => sum + record.amount, 0),
    claimsByStatus: records.reduce((acc, record) => {
      acc[record.payment_status] = (acc[record.payment_status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    totalClaims: records.length
  };

  return summary;
} 