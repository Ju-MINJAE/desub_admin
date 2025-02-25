import { Review, ReviewSortField } from '@/types/review';
import { HeaderItem } from '@/types/tableHeader';
import React, { useMemo, useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import Pagination from '../common/Pagination';

interface ReviewTableProps {
  reviews: Review[];
  onReviewSelect: (review: Review) => void;
}

export default function ReviewTable({ reviews, onReviewSelect }: ReviewTableProps) {
  const [sortField, setSortField] = useState<ReviewSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 나올 아이템 수

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

  const sortedReviews = [...reviews].sort((a, b) => {
    if (!sortField) return 0;

    let aValue, bValue;

    if (typeof sortField === 'string' && sortField.startsWith('user.')) {
      const field = sortField.split('.')[1];
      aValue = a.user[field as keyof typeof a.user];
      bValue = b.user[field as keyof typeof b.user];
    } else {
      aValue = a[sortField as keyof typeof a];
      bValue = b[sortField as keyof typeof b];
    }
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1;
  });

  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedReviews.slice(startIndex, endIndex);
  }, [sortedReviews, currentPage]);

  const COMBINED_HEADERS: HeaderItem<ReviewSortField>[] = [
    { field: 'user.username', label: '이름', type: 'sortable' },
    { field: 'user.email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'user.phone', label: '전화번호', type: 'sortable' },
    { field: 'rating', label: '별점', type: 'sortable' },
    { field: undefined, label: '리뷰내용', type: 'static' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
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
          {paginatedReviews.map((review, index) => (
            <tr key={index} className="border-b">
              <td className="py-4 text-[1.5rem] text-center">{review.user.username}</td>
              <td className="py-4 text-[1.5rem] text-center">{review.user.email}</td>
              <td className="py-4 text-[1.5rem] text-center">{review.user.phone}</td>
              <td className="py-4 text-[1.5rem] text-center">{review.rating}</td>
              <td
                className="py-4 text-[1.5rem] text-center cursor-pointer underline"
                onClick={() => onReviewSelect(review)}
              >
                상세보기
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reviews.length > itemsPerPage && (
        <Pagination
          totalItems={reviews.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
