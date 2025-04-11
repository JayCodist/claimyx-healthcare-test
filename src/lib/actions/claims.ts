'use server';

import { FilterConfig, SortConfig } from "@/lib/types";
import { getBillingRecords } from "./billing";

export async function getClaimsData({
  filter,
  sort,
  page,
  pageSize,
}: {
  filter: FilterConfig;
  sort: SortConfig;
  page: number;
  pageSize: number;
}) {
  // Get data from the central data fetching function
  const records = await getBillingRecords();
  let filteredRecords = [...records];

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