'use server';

import { mockBillingRecords } from "@/lib/mockData";
import { FilterConfig, SortConfig } from "@/lib/types";

export async function getClaimsData(
  filter: FilterConfig,
  sort: SortConfig,
  page: number = 1,
  pageSize: number = 5
) {
  // In a real app, this would be a database query
  let filteredRecords = [...mockBillingRecords];

  // Apply status filter
  if (filter.status !== 'all') {
    filteredRecords = filteredRecords.filter(
      record => record.payment_status === filter.status
    );
  }

  // Apply search filter
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
} 