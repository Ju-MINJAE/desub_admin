'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Subscriber } from '@/types/subscriber';
import SubscriberCount from '../components/subscription-status/SubscriberCount';
import SubscriptionTable from '../components/subscription-status/SubscriotionTable';
import Search from '../components/common/Search';
import { subscriberSearchOptions } from '../constants/searchOptions';
import { Heading } from '../components/ui/Heading';
import ExportExcelButton from '../components/common/ExportExcelButton';
import { getAccessToken } from '@/actions/auth/getAccessToken';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SubscriptionStatus() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dashboard, setDashBoard] = useState({
    total_subscriptions: 0,
    new_subscriptions_today: 0,
    paused_subscriptions: 0,
  });

  const fetchSubscribers = async () => {
    try {
      const { accessToken } = await getAccessToken();

      if (!accessToken) {
        throw new Error('인증이 필요합니다');
      }

      const response = await fetch(`${BASEURL}/api/admin/subscriptions/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('상품 목록을 불러오는데 실패했습니다');
      }

      const data = await response.json();
      setSubscribers(data.requests);
      setDashBoard(data.dashboard);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('상품 목록을 불러오는데 실패했습니다');
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const [statusFilters, setStatusFilters] = useState({
    inProgress: false,
    paused: false,
  });

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Subscriber | `user.${string}`;
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
      field: keyof Subscriber | `user.${string}`,
      value: string | { start: string | undefined; end: string | undefined },
    ) => {
      if (typeof value === 'string') {
        setSearchFilter({ field, value });
      }
    },
    [],
  );

  const filteredSubscribers = useMemo(() => {
    let filtered = subscribers;

    if (statusFilters.inProgress || statusFilters.paused) {
      filtered = filtered.filter(subscriber => {
        if (statusFilters.inProgress && subscriber.user.sub_status === 'active') return true;
        if (statusFilters.paused && subscriber.user.sub_status === 'pause') return true;
        return false;
      });
    }

    if (searchFilter.value) {
      filtered = filtered.filter(subscriber => {
        let fieldValue;

        if (searchFilter.field.startsWith('user.')) {
          const [_, field] = searchFilter.field.split('.');
          fieldValue = subscriber.user[field as keyof typeof subscriber.user];
        } else {
          fieldValue = subscriber[searchFilter.field as keyof Subscriber];
        }

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
        <SubscriberCount
          totalCount={dashboard.total_subscriptions}
          newCount={dashboard.new_subscriptions_today}
          pausedCount={dashboard.paused_subscriptions}
        />

        <div className="flex justify-between items-center mt-[4.9rem]">
          <ExportExcelButton<Subscriber>
            data={filteredSubscribers}
            fileName="구독자_목록"
            headers={{
              'user.name': '이름',
              'user.email': '이메일',
              'user.phone': '전화번호',
              'user.sub_status': '구독현황',
              first_payment_date: '최초결제일',
              last_payment_date: '최근결제일',
              expiry_date: '구독만료일',
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
          검색 결과 : {filteredSubscribers?.length ?? 0}
        </p>

        <SubscriptionTable subscribers={filteredSubscribers} />
      </div>
    </div>
  );
}
