"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BillingRecord, FilterConfig, PaymentStatus, SortConfig } from "@/lib/types";
import { getClaimsData } from "@/lib/actions/claims";
import { currencyFormatter } from "@/lib/utils";
import { TableSkeleton } from "./TableSkeleton";
import { useDebouncedEffect } from "@/lib/hooks/useDebouncedEffect";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const statusOptions: { value: PaymentStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Denied", label: "Denied" },
];

export function ClaimsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<FilterConfig>({
    search: "",
    status: "all",
  });
  const [sort, setSort] = useState<SortConfig>({
    key: "claim_date",
    direction: "desc",
  });
  const [data, setData] = useState<{
    records: BillingRecord[];
    totalPages: number;
    totalRecords: number;
  }>({
    records: [],
    totalPages: 0,
    totalRecords: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async (isSearch = false) => {
    setIsLoading(true);
    try {
      const result = await getClaimsData({ filter, sort, page: currentPage, pageSize: 5 });
      setData(result);
    } finally {
      setIsLoading(false);
      if (isSearch) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
      }
    }
  }, [filter, sort, currentPage]);

  useDebouncedEffect(
    () => fetchData(true),
    [filter.search],
    500
  );

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.status, currentPage, sort]);

  const handleSort = (key: keyof BillingRecord) => {
    if (isLoading) return;
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (columnKey: keyof BillingRecord) => {
    if (sort.key !== columnKey) return <ArrowUpDown className="h-4 w-4 opacity-50" />;
    return sort.direction === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search claims..."
          value={filter.search}
          onChange={(e) => setFilter((prev) => {
            setCurrentPage(1);
            return { ...prev, search: e.target.value };
          })}
          className="max-w-sm"
          disabled={isLoading}
          ref={searchInputRef}
        />
        <Select
          value={filter.status}
          onValueChange={(value: PaymentStatus | "all") => {
            if (isLoading) return;
            setFilter((prev) => ({ ...prev, status: value }));
            setCurrentPage(1); // Reset to first page on filter change
          }}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f5f5f5] dark:bg-gray-800/50">
              <TableHead
                className={`cursor-pointer dark:text-gray-300 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                onClick={() => handleSort("patient_name")}
              >
                <div className="flex items-center gap-1">
                  Patient Name
                  {getSortIcon("patient_name")}
                </div>
              </TableHead>
              <TableHead
                className={`cursor-pointer dark:text-gray-300 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                onClick={() => handleSort("billing_code")}
              >
                <div className="flex items-center gap-1">
                  Billing Code
                  {getSortIcon("billing_code")}
                </div>
              </TableHead>
              <TableHead
                className={`cursor-pointer dark:text-gray-300 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center gap-1">
                  Amount
                  {getSortIcon("amount")}
                </div>
              </TableHead>
              <TableHead
                className={`cursor-pointer dark:text-gray-300 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                onClick={() => handleSort("insurance_provider")}
              >
                <div className="flex items-center gap-1">
                  Insurance Provider
                  {getSortIcon("insurance_provider")}
                </div>
              </TableHead>
              <TableHead
                className={`cursor-pointer dark:text-gray-300 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                onClick={() => handleSort("payment_status")}
              >
                <div className="flex items-center gap-1">
                  Status
                  {getSortIcon("payment_status")}
                </div>
              </TableHead>
              <TableHead
                className={`cursor-pointer dark:text-gray-300 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                onClick={() => handleSort("claim_date")}
              >
                <div className="flex items-center gap-1">
                  Claim Date
                  {getSortIcon("claim_date")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              data.records.map((record) => (
                <TableRow key={record.patient_id} className="bg-white dark:bg-gray-800 dark:hover:bg-gray-700/50">
                  <TableCell className="dark:text-gray-300">{record.patient_name}</TableCell>
                  <TableCell className="dark:text-gray-300">{record.billing_code}</TableCell>
                  <TableCell className="dark:text-gray-300">{currencyFormatter.format(record.amount)}</TableCell>
                  <TableCell className="dark:text-gray-300">{record.insurance_provider}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm ${
                        record.payment_status === "Approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : record.payment_status === "Denied"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {record.payment_status}
                    </span>
                  </TableCell>
                  <TableCell className="dark:text-gray-300">{record.claim_date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-muted-foreground dark:text-gray-400 whitespace-nowrap">
          {isLoading ? (
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ) : (
            `Showing ${data.records.length} of ${data.totalRecords} records`
          )}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (isLoading) return;
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                }}
                aria-disabled={currentPage === 1 || isLoading}
                className={`${currentPage === 1 || isLoading ? "pointer-events-none opacity-50" : ""}`}
              />
            </PaginationItem>
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (isLoading) return;
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                  className={isLoading ? "pointer-events-none opacity-50" : ""}
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
                  if (isLoading) return;
                  setCurrentPage((prev) => Math.min(data.totalPages, prev + 1));
                }}
                aria-disabled={currentPage === data.totalPages || isLoading}
                className={`${currentPage === data.totalPages || isLoading ? "pointer-events-none opacity-50" : ""}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
