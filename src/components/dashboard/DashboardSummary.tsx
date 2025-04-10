"use client";

import { mockBillingRecords } from '@/lib/mockData';
import { Wallet, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { ClaimsDistributionChart } from './ClaimsDistributionChart';

export function DashboardSummary() {
  const totalClaims = mockBillingRecords.length;
  const totalAmount = mockBillingRecords.reduce((sum, record) => sum + record.amount, 0);
  
  const approvedClaims = mockBillingRecords.filter(record => record.payment_status === 'Approved');
  const approvedAmount = approvedClaims.reduce((sum, record) => sum + record.amount, 0);
  
  const pendingClaims = mockBillingRecords.filter(record => record.payment_status === 'Pending');
  const pendingAmount = pendingClaims.reduce((sum, record) => sum + record.amount, 0);
  
  const deniedClaims = mockBillingRecords.filter(record => record.payment_status === 'Denied');
  const deniedAmount = deniedClaims.reduce((sum, record) => sum + record.amount, 0);

  const claimsByStatus = {
    'Pending': pendingClaims.length,
    'Approved': approvedClaims.length,
    'Denied': deniedClaims.length
  };

  const amountsByStatus = {
    'Pending': pendingAmount,
    'Approved': approvedAmount,
    'Denied': deniedAmount
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Billing Amount</h3>
            <Wallet className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold">${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-500 mt-1">{totalClaims} total claims</p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Approved Amount</h3>
            <CheckCircle2 className="h-5 w-5 text-[#15803d]" />
          </div>
          <p className="text-3xl font-bold text-[#15803d]">${approvedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-500 mt-1">{approvedClaims.length} approved claims</p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Pending Amount</h3>
            <Clock className="h-5 w-5 text-[#c5af00]" />
          </div>
          <p className="text-3xl font-bold text-[#c5af00]">${pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-500 mt-1">{pendingClaims.length} pending claims</p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Denied Amount</h3>
            <XCircle className="h-5 w-5 text-[#dc2626]" />
          </div>
          <p className="text-3xl font-bold text-[#dc2626]">${deniedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-500 mt-1">{deniedClaims.length} denied claims</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ClaimsDistributionChart 
          claimsByStatus={claimsByStatus} 
          amountsByStatus={amountsByStatus}
        />
      </div>
    </div>
  );
} 