import { TableCell, TableRow } from "@/components/ui/table";

export function TableSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i} className="animate-pulse bg-white dark:bg-gray-800 dark:hover:bg-gray-700/50">
          <TableCell className="dark:text-gray-300">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </TableCell>
          <TableCell className="dark:text-gray-300">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </TableCell>
          <TableCell className="dark:text-gray-300">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </TableCell>
          <TableCell className="dark:text-gray-300">
            <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </TableCell>
          <TableCell>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </TableCell>
          <TableCell className="dark:text-gray-300">
            <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
} 