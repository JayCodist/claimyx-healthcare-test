"use client";

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BillingRecord, FilterConfig, PaymentStatus, SortConfig } from '@/lib/types';
import { getClaimsData } from '@/lib/actions/claims';
import { currencyFormatter } from "@/lib/utils";

const statusOptions: { value: PaymentStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Denied', label: 'Denied' },
];

export function ClaimsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<FilterConfig>({
    search: '',
    status: 'all',
  });
  const [sort, setSort] = useState<SortConfig>({
    key: 'claim_date',
    direction: 'desc',
  });
  const [data, setData] = useState<{
    records: BillingRecord[];
    totalPages: number;
    totalRecords: number;
  }>({
    records: [],
    totalPages: 0,
    totalRecords: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getClaimsData(filter, sort, currentPage, 5);
      setData(result);
    };
    fetchData();
  }, [filter, sort, currentPage]);

  const handleSort = (key: keyof BillingRecord) => {
    setSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search claims..."
          value={filter.search}
          onChange={(e) => {
            setFilter(prev => ({ ...prev, search: e.target.value }));
            setCurrentPage(1); // Reset to first page on search
          }}
          className="max-w-sm"
        />
        <Select
          value={filter.status}
          onValueChange={(value: PaymentStatus | 'all') => {
            setFilter(prev => ({ ...prev, status: value }));
            setCurrentPage(1); // Reset to first page on filter change
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('patient_name')}
              >
                Patient Name
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('billing_code')}
              >
                Billing Code
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                Amount
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('insurance_provider')}
              >
                Insurance Provider
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('payment_status')}
              >
                Status
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('claim_date')}
              >
                Claim Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.records.map((record) => (
              <TableRow key={record.patient_id}>
                <TableCell>{record.patient_name}</TableCell>
                <TableCell>{record.billing_code}</TableCell>
                <TableCell>{currencyFormatter.format(record.amount)}</TableCell>
                <TableCell>{record.insurance_provider}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      record.payment_status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : record.payment_status === 'Denied'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {record.payment_status}
                  </span>
                </TableCell>
                <TableCell>{record.claim_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          Showing {data.records.length} of {data.totalRecords} records
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(prev => Math.max(1, prev - 1));
                }}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(prev => Math.min(data.totalPages, prev + 1));
                }}
                aria-disabled={currentPage === data.totalPages}
                className={currentPage === data.totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
} 