export type PaymentStatus = 'Pending' | 'Approved' | 'Denied';

export interface BillingRecord {
  patient_id: string;
  patient_name: string;
  billing_code: string;
  amount: number;
  insurance_provider: string;
  payment_status: PaymentStatus;
  claim_date: string;
}

export interface SortConfig {
  key: keyof BillingRecord;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  search: string;
  status: PaymentStatus | 'all';
} 