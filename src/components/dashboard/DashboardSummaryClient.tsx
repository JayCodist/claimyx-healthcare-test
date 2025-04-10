'use client';

import { Wallet, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { ClaimsDistributionChart } from './ClaimsDistributionChart';
import { currencyFormatter } from '@/lib/utils';

interface DashboardSummaryData {
  totalClaims: number;
  totalAmount: number;
  approvedClaims: number;
  approvedAmount: number;
  pendingClaims: number;
  pendingAmount: number;
  deniedClaims: number;
  deniedAmount: number;
  claimsByStatus: {
    Pending: number;
    Approved: number;
    Denied: number;
  };
  amountsByStatus: {
    Pending: number;
    Approved: number;
    Denied: number;
  };
}

interface DashboardSummaryClientProps {
  data: DashboardSummaryData;
}

export function DashboardSummaryClient({ data }: DashboardSummaryClientProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Billing Amount</h3>
            <Wallet className="h-6 w-6 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{currencyFormatter.format(data.totalAmount)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{data.totalClaims} total claims</p>
        </div>
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved Amount</h3>
            <CheckCircle2 className="h-6 w-6 sm:h-5 sm:w-5 text-[#15803d] dark:text-green-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#15803d] dark:text-green-400">{currencyFormatter.format(data.approvedAmount)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{data.approvedClaims} approved claims</p>
        </div>
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Amount</h3>
            <Clock className="h-6 w-6 sm:h-5 sm:w-5 text-[#c5af00] dark:text-yellow-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#c5af00] dark:text-yellow-400">{currencyFormatter.format(data.pendingAmount)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{data.pendingClaims} pending claims</p>
        </div>
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Denied Amount</h3>
            <XCircle className="h-6 w-6 sm:h-5 sm:w-5 text-[#dc2626] dark:text-red-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#dc2626] dark:text-red-400">{currencyFormatter.format(data.deniedAmount)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{data.deniedClaims} denied claims</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <ClaimsDistributionChart 
          claimsByStatus={data.claimsByStatus} 
          amountsByStatus={data.amountsByStatus}
        />
      </div>
    </div>
  );
} 