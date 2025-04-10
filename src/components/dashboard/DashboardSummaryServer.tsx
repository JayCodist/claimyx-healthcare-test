import { mockBillingRecords } from '@/lib/mockData';
import { DashboardSummaryClient } from './DashboardSummaryClient';

export async function DashboardSummaryServer() {
  // Process data on the server
  const totalClaims = mockBillingRecords.length;
  const totalAmount = mockBillingRecords.reduce((sum, record) => sum + record.amount, 0);
  
  const approvedClaims = mockBillingRecords.filter(record => record.payment_status === 'Approved');
  const approvedAmount = approvedClaims.reduce((sum, record) => sum + record.amount, 0);
  
  const pendingClaims = mockBillingRecords.filter(record => record.payment_status === 'Pending');
  const pendingAmount = pendingClaims.reduce((sum, record) => sum + record.amount, 0);
  
  const deniedClaims = mockBillingRecords.filter(record => record.payment_status === 'Denied');
  const deniedAmount = deniedClaims.reduce((sum, record) => sum + record.amount, 0);

  const summaryData = {
    totalClaims,
    totalAmount,
    approvedClaims: approvedClaims.length,
    approvedAmount,
    pendingClaims: pendingClaims.length,
    pendingAmount,
    deniedClaims: deniedClaims.length,
    deniedAmount,
    claimsByStatus: {
      'Pending': pendingClaims.length,
      'Approved': approvedClaims.length,
      'Denied': deniedClaims.length
    },
    amountsByStatus: {
      'Pending': pendingAmount,
      'Approved': approvedAmount,
      'Denied': deniedAmount
    }
  };

  return <DashboardSummaryClient data={summaryData} />;
} 