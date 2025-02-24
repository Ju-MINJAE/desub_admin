'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Cancellation } from '@/types/cancellation';
import CancellationTable from '../components/subscription-cancel/CancellationTable';
import RefundModal from '../components/subscription-cancel/RefundModal';
import { cancellationSearchOptions } from '../constants/searchOptions';
import { Heading } from '../components/ui/Heading';
import Search from '../components/common/Search';
import ExportExcelButton from '../components/common/ExportExcelButton';
import { getAccessToken } from '@/actions/auth/getAccessToken';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SubscriptionCancel() {
  const [cancellations, setCancellations] = useState<Cancellation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [subCancelAll, setSubCancelAll] = useState<number>(0);
  const [subCancelToday, setSubCancelToday] = useState<number>(0);

  const fetchCancellations = async () => {
    try {
      const { accessToken } = await getAccessToken();

      if (!accessToken) {
        throw new Error('인증이 필요합니다');
      }

      const response = await fetch(`${BASEURL}/api/admin/subscriptions/cancelled/`, {
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
      setCancellations(data.requests);
      console.log(data);
      setSubCancelAll(data.dashboard.sub_cancel_all);
      setSubCancelToday(data.dashboard.sub_cancel_today);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('상품 목록을 불러오는데 실패했습니다');
    }
  };

  useEffect(() => {
    fetchCancellations();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCancellation, setSelectedCancellation] = useState<Cancellation | null>(null);

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Cancellation | `user.${string}`;
    value: string | { start: string | undefined; end: string | undefined };
  }>({
    field: '' as keyof Cancellation,
    value: '',
  });

  const handleSearch = useCallback(
    (
      field: keyof Cancellation | `user.${string}`,
      value: string | { start: string | undefined; end: string | undefined },
    ) => {
      setSearchFilter({ field, value });
    },
    [],
  );

  const filteredCancellations = useMemo(() => {
    let filtered = cancellations;

    if (searchFilter.value) {
      filtered = filtered.filter(sale => {
        let fieldValue;

        if (searchFilter.field.startsWith('user.')) {
          const [_, field] = searchFilter.field.split('.');
          fieldValue = sale.user[field as keyof typeof sale.user];
        } else {
          fieldValue = sale[searchFilter.field as keyof Cancellation];
        }

        if (typeof searchFilter.value === 'object' && 'start' in searchFilter.value) {
          if (!searchFilter.value.start && !searchFilter.value.end) {
            return true;
          }
          const saleDate = new Date(fieldValue as string);
          const startDate = searchFilter.value.start
            ? new Date(searchFilter.value.start)
            : new Date(0);
          const endDate = searchFilter.value.end
            ? new Date(searchFilter.value.end)
            : new Date(8640000000000000);
          return saleDate >= startDate && saleDate <= endDate;
        } else if (typeof fieldValue === 'string' && typeof searchFilter.value === 'string') {
          return fieldValue.toLowerCase().includes(searchFilter.value.toLowerCase());
        }

        return false;
      });
    }

    return filtered;
  }, [cancellations, searchFilter]);

  const handleRefundClick = (cancellation: Cancellation) => {
    setSelectedCancellation(cancellation);
    setIsModalOpen(true);
  };

  return (
    <div className="pl-[28.5rem] whitespace-nowrap">
      <div className="p-[3.1rem]">
        <Heading tag="h1" className="mt-[2.1rem]">
          구독취소관리
        </Heading>
        <div className="mt-[1.8rem]">
          <p className="text-[1.8rem]">
            전체 취소 수 : {subCancelAll}명 | 오늘 신규 취소 : {subCancelToday}명
          </p>
        </div>

        <div className="flex justify-between items-center mt-[4.9rem]">
          <ExportExcelButton
            data={filteredCancellations}
            fileName="구독취소_목록"
            headers={{
              'user.name': '이름',
              'user.email': '이메일',
              'user.phone': '전화번호',
              cancelled_date: '취소일자',
              cancelled_reason: '취소사유',
              refund_status: '환불처리',
            }}
          />
          <Search<Cancellation> onSearch={handleSearch} searchOptions={cancellationSearchOptions} />
        </div>

        <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
          검색 결과 : {filteredCancellations.length}
        </p>

        <CancellationTable cancellations={filteredCancellations} onRefund={handleRefundClick} />

        {selectedCancellation && (
          <RefundModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedCancellation(null);
            }}
            subsId={selectedCancellation.subs_id}
          />
        )}
      </div>
    </div>
  );
}
