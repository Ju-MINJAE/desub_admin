'use client';

import { useCallback, useMemo, useState } from 'react';
import { Review } from '@/types/review';
import ReviewTable from '../components/review/ReviewTable';
import ExportExcelButton from '../components/subscription-status/ExportExcelButton';
import Search from '../components/subscription-status/Search';
import { reviewSearchOptions } from '../constants/searchOptions';

const Review = () => {
  const [reviews, _] = useState<Review[]>([
    {
      name: '홍길동',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      reviewRating: '5',
      reviewContent: '상세보기',
    },
    {
      name: '김남규',
      email: 'asdasd@gmail.com',
      phone: '010-4444-5679',
      reviewRating: '4',
      reviewContent: '상세보기',
    },
  ]);

  const [searchFilter, setSearchFilter] = useState({
    field: '' as keyof Review,
    value: '',
  });

  const handleSearch = useCallback((field: keyof Review, value: string) => {
    setSearchFilter({ field, value });
  }, []);

  const filteredSubscribers = useMemo(() => {
    let filtered = reviews;

    if (searchFilter.value) {
      filtered = filtered.filter(review => {
        const fieldValue = review[searchFilter.field];

        if (String(searchFilter.field).includes('Date')) {
          return String(fieldValue).includes(searchFilter.value);
        }

        return String(fieldValue).toLowerCase().includes(searchFilter.value.toLowerCase());
      });
    }

    return filtered;
  }, [reviews, searchFilter]);

  return (
    <div className="pl-[31.6rem]">
      <h1 className="text-[3.5rem] mt-[2.1rem] font-bold">리뷰관리</h1>

      <div className="mt-[1.8rem]">
        <p className="text-[1.8rem]">신규리뷰 : 00개</p>
      </div>

      <div className="flex justify-between items-center mt-[4.9rem]">
        <ExportExcelButton<Review>
          data={filteredSubscribers}
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
        검색 결과 : {filteredSubscribers.length}
      </p>

      <ReviewTable subscribers={filteredSubscribers} />
    </div>
  );
};

export default Review;
