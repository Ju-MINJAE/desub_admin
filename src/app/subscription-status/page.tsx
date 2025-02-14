'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Subscriber } from '@/types/subscriber';
import SubscriberCount from '../components/subscription-status/SubscriberCount';
import SubscriptionTable from '../components/subscription-status/SubscriotionTable';
import Search from '../components/common/Search';
import { subscriberSearchOptions } from '../constants/searchOptions';
import { Heading } from '../components/ui/Heading';
import ExportExcelButton from '../components/common/ExportExcelButton';

export default function SubscriptionStatus() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      name: '홍길동',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      status: '진행중',
      startDate: '2025-01-12',
      endDate: '2025-01-13',
      expiryDate: '2025-02-13',
    },
    {
      name: '홍길똥',
      email: 'gilddong.hong@gmail.com',
      phone: '010-1234-5679',
      status: '일시정지',
      startDate: '2025-01-13',
      endDate: '2025-01-14',
      expiryDate: '2026-01-13',
    },
  ]);

  const [statusFilters, setStatusFilters] = useState({
    inProgress: false,
    paused: false,
  });

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Subscriber;
    value: string | { start: string | undefined; end: string | undefined };
  }>({
    field: '' as keyof Subscriber,
    value: '',
  });

  const handleFilterChange = (filterName: 'inProgress' | 'paused') => {
    setStatusFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleSearch = useCallback(
    (
      field: keyof Subscriber,
      value: string | { start: string | undefined; end: string | undefined },
    ) => {
      setSearchFilter({ field, value });
    },
    [],
  );

  const filteredSubscribers = useMemo(() => {
    let filtered = subscribers;

    if (statusFilters.inProgress || statusFilters.paused) {
      filtered = filtered.filter(subscriber => {
        if (statusFilters.inProgress && subscriber.status === '진행중') return true;
        if (statusFilters.paused && subscriber.status === '일시정지') return true;
        return false;
      });
    }

    if (searchFilter.value) {
      filtered = filtered.filter(subscriber => {
        const fieldValue = subscriber[searchFilter.field];

        if (typeof searchFilter.value === 'object' && 'start' in searchFilter.value) {
          if (!searchFilter.value.start && !searchFilter.value.end) {
            return true;
          }
          const subscriberDate = new Date(fieldValue as string);
          const startDate = searchFilter.value.start
            ? new Date(searchFilter.value.start)
            : new Date(0);
          const endDate = searchFilter.value.end
            ? new Date(searchFilter.value.end)
            : new Date(8640000000000000);
          return subscriberDate >= startDate && subscriberDate <= endDate;
        } else if (typeof fieldValue === 'string' && typeof searchFilter.value === 'string') {
          return fieldValue.toLowerCase().includes(searchFilter.value.toLowerCase());
        }

        return false;
      });
    }

    return filtered;
  }, [subscribers, statusFilters, searchFilter]);

  return (
    <div className="pl-[28.5rem]">
      <div className="p-[3.1rem]">
        <Heading tag="h1" className="mt-[2.1rem]">
          구독현황관리
        </Heading>
        <SubscriberCount totalCount={0} newCount={0} pausedCount={0} />

        <div className="flex justify-between items-center mt-[4.9rem]">
          <ExportExcelButton<Subscriber>
            data={filteredSubscribers}
            fileName="구독자_목록"
            headers={{
              name: '이름',
              email: '이메일',
              phone: '전화번호',
              status: '구독현황',
              startDate: '최초결제일',
              endDate: '최근결제일',
              expiryDate: '구독만료일',
            }}
          />
          <Search<Subscriber> onSearch={handleSearch} searchOptions={subscriberSearchOptions} />
        </div>

        <div className="flex mt-[2.5rem] text-[1.3rem] gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={statusFilters.inProgress}
              onChange={() => handleFilterChange('inProgress')}
            />
            진행중
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={statusFilters.paused}
              onChange={() => handleFilterChange('paused')}
            />
            일시정지
          </label>
        </div>
        <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
          검색 결과 : {filteredSubscribers.length}
        </p>

        <SubscriptionTable subscribers={filteredSubscribers} />
      </div>
    </div>
  );
}
