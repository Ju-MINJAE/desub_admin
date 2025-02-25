import { SortField, SortOrder, Subscriber } from '@/types/subscriber';
import { HeaderItem } from '@/types/tableHeader';
import React, { useMemo, useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import Pagination from '../common/Pagination';

interface SubscriptionTableProps {
  subscribers: Subscriber[];
}

export default function SubscriptionTable({ subscribers }: SubscriptionTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 나올 아이템 수

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

  const paginatedSubscribers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedSubscribers.slice(startIndex, endIndex);
  }, [sortedSubscribers, currentPage]);

  const COMBINED_HEADERS: HeaderItem<SortField>[] = [
    { field: 'user.name', label: '이름', type: 'sortable' },
    { field: 'user.email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'user.phone', label: '전화번호', type: 'sortable' },
    { field: undefined, label: '구독현황', type: 'static' },
    { field: 'first_payment_date', label: '최초결제일', type: 'sortable' },
    { field: 'last_payment_date', label: '최근결제일', type: 'sortable' },
    { field: 'expiry_date', label: '구독만료일', type: 'sortable' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
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
          {paginatedSubscribers.map((subscriber, index) => (
            <tr key={index} className="border-b">
              <td className="py-4 text-[1.5rem] text-center">{subscriber.user.name}</td>
              <td className="py-4 text-[1.5rem] text-center">{subscriber.user.email}</td>
              <td className="py-4 text-[1.5rem] text-center">{subscriber.user.phone}</td>
              <td className="py-4 text-[1.5rem] text-center">
                {subscriber.user.sub_status === 'active' ? '진행중' : '일시정지'}
              </td>
              <td className="py-4 text-[1.5rem] text-center">{subscriber.first_payment_date}</td>
              <td className="py-4 text-[1.5rem] text-center">{subscriber.last_payment_date}</td>
              <td className="py-4 text-[1.5rem] text-center">{subscriber.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {subscribers.length > itemsPerPage && (
        <Pagination
          totalItems={subscribers.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
