import { Review, ReviewSortField } from '@/types/review';
import { SortOrder } from '@/types/subscriber';
import { HeaderItem } from '@/types/tableHeader';
import React, { useState } from 'react';
import SortableHeader from '../common/SortableHeader';

interface SubscriptionTableProps {
  subscribers: Review[];
  onReviewSelect: (review: Review) => void;
}

export default function ReviewTable({ subscribers, onReviewSelect }: SubscriptionTableProps) {
  const [sortField, setSortField] = useState<ReviewSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: ReviewSortField) => {
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

  const COMBINED_HEADERS: HeaderItem<ReviewSortField>[] = [
    { field: 'name', label: '이름', type: 'sortable' },
    { field: 'email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'phone', label: '전화번호', type: 'sortable' },
    { field: 'reviewRating', label: '별점', type: 'sortable' },
    { field: undefined, label: '리뷰내용', type: 'static' },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="border-y bg-[#F3F3F3]">
          {COMBINED_HEADERS.map((header, index) =>
            header.type === 'sortable' && header.field ? (
              <SortableHeader<ReviewSortField>
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
            <td className="py-4 text-[1.5rem] text-center">{subscriber.reviewRating}</td>
            <td
              className="py-4 text-[1.5rem] text-center cursor-pointer underline"
              onClick={() => onReviewSelect(subscriber)}
            >
              상세보기
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
