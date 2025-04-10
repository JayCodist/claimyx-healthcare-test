import { BillingRecord, FilterConfig, SortConfig } from './types';

const firstNames = ['James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'Michael', 'Isabella', 'Alexander', 'Mia', 'Daniel', 'Charlotte'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson'];

function generateRandomAmount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const paymentStatuses = ['Pending', 'Approved', 'Denied'] as const;
const insuranceProviders = ['Blue Shield', 'Medicare', 'Aetna', 'UnitedHealth', 'Cigna'];

export const mockBillingRecords: BillingRecord[] = Array.from({ length: 14 }, (_, index) => {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-03-15');
  const claimDate = generateRandomDate(startDate, endDate);
  
  return {
    patient_id: `P${(index + 1).toString().padStart(3, '0')}`,
    patient_name: `${firstNames[index]} ${lastNames[index]}`,
    billing_code: `B${(index + 1).toString().padStart(4, '0')}`,
    amount: generateRandomAmount(1000, 15000),
    claim_date: claimDate.toISOString().split('T')[0],
    payment_status: paymentStatuses[index % paymentStatuses.length],
    insurance_provider: insuranceProviders[index % insuranceProviders.length],
  };
});

export const filterAndSortRecords = (
  records: BillingRecord[],
  filter: FilterConfig,
  sort: SortConfig,
  page: number = 1,
  pageSize: number = 5
): { records: BillingRecord[]; totalPages: number; totalRecords: number } => {
  let filteredRecords = [...records];

  // Apply status filter
  if (filter.status !== 'all') {
    filteredRecords = filteredRecords.filter(
      record => record.payment_status === filter.status
    );
  }

  // Apply search filter across all fields
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filteredRecords = filteredRecords.filter(record =>
      Object.values(record).some(
        value => value.toString().toLowerCase().includes(searchLower)
      )
    );
  }

  // Apply sorting
  filteredRecords.sort((a, b) => {
    const aValue = a[sort.key];
    const bValue = b[sort.key];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sort.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sort.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }

    return 0;
  });

  // Calculate pagination
  const totalRecords = filteredRecords.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + pageSize);

  return {
    records: paginatedRecords,
    totalPages,
    totalRecords
  };
}; 