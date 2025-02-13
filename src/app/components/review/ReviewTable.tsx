import { Review, ReviewSortField } from '@/types/review';
import { SortOrder } from '@/types/subscriber';
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
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
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

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedReviews.slice(startIndex, endIndex);
  }, [sortedReviews, currentPage]);

  const COMBINED_HEADERS: HeaderItem<ReviewSortField>[] = [
    { field: 'name', label: '이름', type: 'sortable' },
    { field: 'email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'phone', label: '전화번호', type: 'sortable' },
    { field: 'reviewRating', label: '별점', type: 'sortable' },
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
              <td className="py-4 text-[1.5rem] text-center">{review.name}</td>
              <td className="py-4 text-[1.5rem] text-center">{review.email}</td>
              <td className="py-4 text-[1.5rem] text-center">{review.phone}</td>
              <td className="py-4 text-[1.5rem] text-center">{review.reviewRating}</td>
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
