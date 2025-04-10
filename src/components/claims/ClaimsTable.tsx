"use client";

import { useState } from 'react';
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
import { BillingRecord, FilterConfig, PaymentStatus, SortConfig } from '@/lib/types';
import { filterAndSortRecords, mockBillingRecords } from '@/lib/mockData';

const statusOptions: { value: PaymentStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Denied', label: 'Denied' },
];

export function ClaimsTable() {
  const [filter, setFilter] = useState<FilterConfig>({
    search: '',
    status: 'all',
  });

  const [sort, setSort] = useState<SortConfig>({
    key: 'claim_date',
    direction: 'desc',
  });

  const handleSort = (key: keyof BillingRecord) => {
    setSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredRecords = filterAndSortRecords(mockBillingRecords, filter, sort);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search claims..."
          value={filter.search}
          onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
          className="max-w-sm"
        />
        <Select
          value={filter.status}
          onValueChange={(value: PaymentStatus | 'all') =>
            setFilter(prev => ({ ...prev, status: value }))
          }
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('patient_name')}
              >
                Patient Name
                {sort.key === 'patient_name' && (
                  <span>{sort.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('billing_code')}
              >
                Billing Code
                {sort.key === 'billing_code' && (
                  <span>{sort.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                Amount
                {sort.key === 'amount' && (
                  <span>{sort.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('insurance_provider')}
              >
                Insurance Provider
                {sort.key === 'insurance_provider' && (
                  <span>{sort.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('payment_status')}
              >
                Status
                {sort.key === 'payment_status' && (
                  <span>{sort.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('claim_date')}
              >
                Claim Date
                {sort.key === 'claim_date' && (
                  <span>{sort.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.patient_id}>
                <TableCell>{record.patient_name}</TableCell>
                <TableCell>{record.billing_code}</TableCell>
                <TableCell>${record.amount.toFixed(2)}</TableCell>
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
    </div>
  );
} 