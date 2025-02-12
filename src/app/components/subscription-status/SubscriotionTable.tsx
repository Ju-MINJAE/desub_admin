import { SortField, SortOrder, Subscriber } from '@/types/subscriber';
import { HeaderItem } from '@/types/tableHeader';
import React, { useState } from 'react';
import SortableHeader from '../common/SortableHeader';

interface SubscriptionTableProps {
  subscribers: Subscriber[];
}

export default function SubscriptionTable({ subscribers }: SubscriptionTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
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

  const COMBINED_HEADERS: HeaderItem<SortField>[] = [
    { field: 'name', label: '이름', type: 'sortable' },
    { field: 'email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'phone', label: '전화번호', type: 'sortable' },
    { field: undefined, label: '구독현황', type: 'static' },
    { field: 'startDate', label: '최초결제일', type: 'sortable' },
    { field: 'endDate', label: '최근결제일', type: 'sortable' },
    { field: 'expiryDate', label: '구독만료일', type: 'sortable' },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="border-y bg-[#F3F3F3]">
          {COMBINED_HEADERS.map((header, index) =>
            header.type === 'sortable' && header.field ? (
              <SortableHeader<SortField>
                key={header.field}
                field={header.field}
                label={header.label}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
            ) : (
              <th key={index} className="px-3 py-4 text-[1.5rem] text-center">
                {header.label}
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {sortedSubscribers.map((subscriber, index) => (
          <tr key={index} className="border-b">
            <td className="py-4 text-[1.5rem] text-center">{subscriber.name}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.email}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.phone}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.status}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.startDate}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.endDate}</td>
            <td className="py-4 text-[1.5rem] text-center">{subscriber.expiryDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
