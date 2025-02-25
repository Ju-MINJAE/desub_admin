import { Sale, SaleSortField } from '@/types/sales';
import { SortOrder } from '@/types/subscriber';
import React, { useMemo, useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import Pagination from '../common/Pagination';

interface SaleTableProps {
  sales: Sale[];
}

export default function SalesTable({ sales }: SaleTableProps) {
  const [sortField, setSortField] = useState<SaleSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 나올 아이템 수

  const handleSort = (field: SaleSortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortField(null);
        setSortOrder('asc');
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedSales = [...sales].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const paginatedSales = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedSales.slice(startIndex, endIndex);
  }, [sortedSales, currentPage]);

  const TABLE_HEADERS: Array<{ field: SaleSortField; label: string }> = [
    { field: 'transaction_date', label: '결제일' },
    { field: 'transaction_amount', label: '금액(원)' },
    { field: 'transaction_type', label: '내용' },
    { field: 'user.name', label: '이름' },
    { field: 'user.email', label: '이메일주소(아이디)' },
    { field: 'user.phone', label: '전화번호' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="border-y bg-[#F3F3F3]">
            {TABLE_HEADERS.map(({ field, label }) => (
              <SortableHeader<SaleSortField>
                key={field}
                field={field}
                label={label}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedSales.map((sale, index) => (
            <tr key={index} className="border-b">
              <td className="py-4 text-[1.5rem] text-center">{sale.transaction_date}</td>
              <td className="py-4 text-[1.5rem] text-center">{sale.transaction_amount}</td>
              <td className="py-4 text-[1.5rem] text-center">{sale.transaction_type}</td>
              <td className="py-4 text-[1.5rem] text-center">{sale.user.name}</td>
              <td className="py-4 text-[1.5rem] text-center">{sale.user.email}</td>
              <td className="py-4 text-[1.5rem] text-center">{sale.user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {sales.length > itemsPerPage && (
        <Pagination
          totalItems={sales.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
