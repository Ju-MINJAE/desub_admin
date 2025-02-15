'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Review } from '@/types/review';
import ReviewTable from '../components/review/ReviewTable';
import Search from '../components/common/Search';
import { reviewSearchOptions } from '../constants/searchOptions';
import ReviewModal from '../components/review/ReviewModal';
import ExportExcelButton from '../components/common/ExportExcelButton';

type SearchValue = string | { start: string | undefined; end: string | undefined };

const ReviewPage = () => {
  const [reviews, _] = useState<Review[]>([
    {
      name: '홍길동',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      reviewRating: '5',
      reviewContent: '입력한 리뷰내용',
    },
    {
      name: '김남규',
      email: 'asdasd@gmail.com',
      phone: '010-4444-5679',
      reviewRating: '4',
      reviewContent: '리뷰내용 ~~~~',
    },
  ]);

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Review;
    value: SearchValue;
  }>({
    field: '' as keyof Review,
    value: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleSearch = useCallback((field: keyof Review, value: SearchValue) => {
    setSearchFilter({ field, value });
  }, []);

  const handleReviewSelect = useCallback((review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  }, []);

  const filteredReviews = useMemo(() => {
    let filtered = reviews;

    if (searchFilter.value) {
      filtered = filtered.filter(review => {
        const fieldValue = review[searchFilter.field];

        if (typeof searchFilter.value === 'object') {
          const date = new Date(String(fieldValue));
          const start = searchFilter.value.start ? new Date(searchFilter.value.start) : null;
          const end = searchFilter.value.end ? new Date(searchFilter.value.end) : null;

          if (start && end) {
            return date >= start && date <= end;
          } else if (start) {
            return date >= start;
          } else if (end) {
            return date <= end;
          }
          return true;
        } else {
          return String(fieldValue).toLowerCase().includes(searchFilter.value.toLowerCase());
        }
      });
    }

    return filtered;
  }, [reviews, searchFilter]);

  return (
    <div className="pl-[28.5rem]">
      <div className="p-[3.1rem]">
        <h1 className="text-[3.5rem] mt-[2.1rem] font-bold">리뷰관리</h1>

        <div className="mt-[1.8rem]">
          <p className="text-[1.8rem]">신규리뷰 : 00개</p>
        </div>

        <div className="flex justify-between items-center mt-[4.9rem]">
          <ExportExcelButton<Review>
            data={filteredReviews}
            fileName="리뷰_목록"
            headers={{
              name: '이름',
              email: '이메일',
              phone: '전화번호',
              reviewRating: '별점',
              reviewContent: '상세보기',
            }}
          />
          <Search<Review> onSearch={handleSearch} searchOptions={reviewSearchOptions} />
        </div>

        <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
          검색 결과 : {filteredReviews.length}
        </p>
        <ReviewTable reviews={filteredReviews} onReviewSelect={handleReviewSelect} />

        {selectedReview && (
          <ReviewModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedReview(null);
            }}
            customerName={selectedReview.name}
            customerEmail={selectedReview.email}
            customerRating={selectedReview.reviewRating}
            customerContent={selectedReview.reviewContent}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
