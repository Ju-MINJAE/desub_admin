'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Review } from '@/types/review';
import ReviewTable from '../components/review/ReviewTable';
import Search from '../components/common/Search';
import { reviewSearchOptions } from '../constants/searchOptions';
import ReviewModal from '../components/review/ReviewModal';
import ExportExcelButton from '../components/common/ExportExcelButton';
import { getAccessToken } from '@/actions/auth/getAccessToken';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [dashboard, setDashBoard] = useState({
    new_reviews: 0,
    reviews: 0,
  });

  const [searchFilter, setSearchFilter] = useState({
    field: '' as keyof Review | `user.${string}`,
    value: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const fetchReviews = async () => {
    const { accessToken } = await getAccessToken();
    try {
      const response = await fetch(`${BASEURL}/api/review/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error(`error status: ${response.status}`);

      const data = await response.json();
      setReviews(data.requests);
      setDashBoard(data.dashboard);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSearch = useCallback(
    (
      field: keyof Review | `user.${string}`,
      value: string | { start: string | undefined; end: string | undefined },
    ) => {
      if (typeof value === 'string') {
        setSearchFilter({ field, value });
      }
    },
    [],
  );

  const handleReviewSelect = useCallback((review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  }, []);

  const filteredReviews = useMemo(() => {
    let filtered = reviews;

    if (searchFilter.value) {
      filtered = filtered.filter(review => {
        let fieldValue;

        if (searchFilter.field.startsWith('user.')) {
          const [_, field] = searchFilter.field.split('.');
          fieldValue = review.user[field as keyof typeof review.user];
        } else {
          fieldValue = review[searchFilter.field as keyof typeof review];
        }

        return String(fieldValue).toLowerCase().includes(String(searchFilter.value).toLowerCase());
      });
    }

    return filtered;
  }, [reviews, searchFilter]);

  return (
    <div className="pl-[28.5rem]">
      <div className="p-[3.1rem]">
        <h1 className="text-[3.5rem] mt-[2.1rem] font-bold">리뷰관리</h1>

        <div className="mt-[1.8rem]">
          <p className="text-[1.8rem]">
            전체 리뷰 : {dashboard.reviews}개 | 신규 리뷰 : {dashboard.new_reviews}개
          </p>
        </div>

        <div className="flex justify-between items-center mt-[4.9rem]">
          <ExportExcelButton<Review>
            data={filteredReviews.map(review => ({
              id: review.id,
              content: review.content,
              rating: review.rating,
              user: review.user,
              createdAt: review.createdAt,
              subs: review.subs,
            }))}
            fileName="리뷰_목록"
            headers={{
              'user.username': '이름',
              'user.email': '이메일',
              'user.phone': '전화번호',
              rating: '별점',
              content: '상세보기',
            }}
          />
          <Search<Review> onSearch={handleSearch} searchOptions={reviewSearchOptions} />
        </div>

        <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
          검색 결과 : {filteredReviews?.length ?? 0}
        </p>
        <ReviewTable reviews={filteredReviews} onReviewSelect={handleReviewSelect} />

        {selectedReview && (
          <ReviewModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedReview(null);
            }}
            customerName={selectedReview.user.username}
            customerEmail={selectedReview.user.email}
            customerRating={selectedReview.rating}
            customerContent={selectedReview.content}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
