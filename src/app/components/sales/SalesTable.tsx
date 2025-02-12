import { Sale, SaleSortField } from '@/types/sales';
import { SortOrder } from '@/types/subscriber';
import React, { useState } from 'react';
import SortableHeader from '../common/SortableHeader';

interface SubscriptionTableProps {
  subscribers: Sale[];
}

export default function SalesTable({ subscribers }: SubscriptionTableProps) {
  const [sortField, setSortField] = useState<SaleSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

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

  const sortedSubscribers = [...subscribers].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const TABLE_HEADERS: Array<{ field: SaleSortField; label: string }> = [
    { field: 'payDate', label: '결제일' },
    { field: 'price', label: '금액(원)' },
    { field: 'content', label: '내용' },
    { field: 'name', label: '이름' },
    { field: 'email', label: '이메일주소(아이디)' },
    { field: 'phone', label: '전화번호' },
  ];

  return (
    <table className="w-full">
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
        {sortedSubscribers.map((subscriber, index) => (
          <tr key={index} className="border-b">
            <td className="py-4 text-[1.5rem] text-center">{subscriber.payDate}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.price}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.content}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.name}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.email}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
