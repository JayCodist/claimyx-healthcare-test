"use client";

import { mockBillingRecords } from '@/lib/mockData';

export function DashboardSummary() {
  const totalClaims = mockBillingRecords.length;
  const totalAmount = mockBillingRecords.reduce((sum, record) => sum + record.amount, 0);
  const pendingClaims = mockBillingRecords.filter(record => record.payment_status === 'Pending').length;
  const approvedClaims = mockBillingRecords.filter(record => record.payment_status === 'Approved').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="text-sm font-medium text-gray-500">Total Claims</h3>
        <p className="text-3xl font-bold">{totalClaims}</p>
      </div>
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="text-sm font-medium text-gray-500">Total Billing Amount</h3>
        <p className="text-3xl font-bold">${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="text-sm font-medium text-gray-500">Pending Claims</h3>
        <p className="text-3xl font-bold text-blue-500">{pendingClaims}</p>
      </div>
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="text-sm font-medium text-gray-500">Approved Claims</h3>
        <p className="text-3xl font-bold text-green-500">{approvedClaims}</p>
      </div>
    </div>
  );
} 