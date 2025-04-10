'use client';

import { Wallet, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { ClaimsDistributionChart } from '../../dashboard/ClaimsDistributionChart';
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Billing Amount</h3>
            <Wallet className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold">{currencyFormatter.format(data.totalAmount)}</p>
          <p className="text-sm text-gray-500 mt-1">{data.totalClaims} total claims</p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Approved Amount</h3>
            <CheckCircle2 className="h-5 w-5 text-[#15803d]" />
          </div>
          <p className="text-3xl font-bold text-[#15803d]">{currencyFormatter.format(data.approvedAmount)}</p>
          <p className="text-sm text-gray-500 mt-1">{data.approvedClaims} approved claims</p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Pending Amount</h3>
            <Clock className="h-5 w-5 text-[#c5af00]" />
          </div>
          <p className="text-3xl font-bold text-[#c5af00]">{currencyFormatter.format(data.pendingAmount)}</p>
          <p className="text-sm text-gray-500 mt-1">{data.pendingClaims} pending claims</p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Denied Amount</h3>
            <XCircle className="h-5 w-5 text-[#dc2626]" />
          </div>
          <p className="text-3xl font-bold text-[#dc2626]">{currencyFormatter.format(data.deniedAmount)}</p>
          <p className="text-sm text-gray-500 mt-1">{data.deniedClaims} denied claims</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ClaimsDistributionChart 
          claimsByStatus={data.claimsByStatus} 
          amountsByStatus={data.amountsByStatus}
        />
      </div>
    </div>
  );
} 