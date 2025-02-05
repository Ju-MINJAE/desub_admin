import { Review, ReviewSortField } from '@/types/review';
import { SortOrder } from '@/types/subscriber';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

interface SubscriptionTableProps {
  subscribers: Review[];
  onReviewSelect: (review: Review) => void;
}

export default function ReviewTable({ subscribers, onReviewSelect }: SubscriptionTableProps) {
  const [sortField, setSortField] = useState<ReviewSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: ReviewSortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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

  return (
    <table className="w-full">
      <thead>
        <tr className="border-y bg-[#F3F3F3]">
          <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('name')}>
            <div className="flex items-center justify-center">
              이름
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'name' && sortOrder === 'asc' ? 'text-black' : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'name' && sortOrder === 'desc' ? 'text-black' : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('email')}>
            <div className="flex items-center justify-center">
              이메일주소(아이디)
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'email' && sortOrder === 'asc' ? 'text-black' : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'email' && sortOrder === 'desc' ? 'text-black' : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('phone')}>
            <div className="flex items-center justify-center">
              전화번호
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'phone' && sortOrder === 'asc' ? 'text-black' : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'phone' && sortOrder === 'desc' ? 'text-black' : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('reviewRating')}>
            <div className="flex items-center justify-center">
              별점
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'reviewRating' && sortOrder === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'reviewRating' && sortOrder === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('phone')}>
            <div className="flex items-center justify-center">리뷰내용</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedSubscribers.map((subscriber, index) => (
          <tr key={index} className="border-b">
            <td className="p-4 text-center">{subscriber.name}</td>
            <td className="p-4 text-center">{subscriber.email}</td>
            <td className="p-4 text-center">{subscriber.phone}</td>
            <td className="p-4 text-center">{subscriber.reviewRating}</td>
            <td
              className="p-4 text-center cursor-pointer underline"
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
