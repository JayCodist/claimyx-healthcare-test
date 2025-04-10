'use server'

import { BillingRecord } from '../types';
import { mockBillingRecords } from '../mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Central function for fetching billing/claims data.
 * In a real app, this would fetch from an API or database.
 */
export async function getBillingRecords(): Promise<BillingRecord[]> {
  // Simulate network delay
  await delay(1000);
  return mockBillingRecords;
}

/**
 * Get summary statistics for the dashboard
 */
export async function getDashboardSummary() {
  const records = await getBillingRecords();
  
  const summary = {
    totalBillingAmount: records.reduce((sum, record) => sum + record.amount, 0),
    claimsByStatus: records.reduce((acc, record) => {
      acc[record.payment_status] = (acc[record.payment_status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    totalClaims: records.length,
    amountsByStatus: records.reduce((acc, record) => {
      acc[record.payment_status] = (acc[record.payment_status] || 0) + record.amount;
      return acc;
    }, {} as Record<string, number>)
  };

  return summary;
} 