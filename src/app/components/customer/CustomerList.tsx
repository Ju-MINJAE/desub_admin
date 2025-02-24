'use client';

import type { Customer } from '@/types/customer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Search from '../common/Search';
import { customerSearchOptions } from '@/app/constants/searchOptions';
import CustomerTable from './CustomerTable';
import HistoryModal from './HistoryModal';
import ExportExcelButton from '../common/ExportExcelButton';
import { getAccessToken } from '@/actions/auth/getAccessToken';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [dashboard, setDashboard] = useState({
    deleted_users_today: 0,
    new_users_today: 0,
    total_users: 0,
  });

  const fetchSubscribers = async () => {
    try {
      const { accessToken } = await getAccessToken();

      if (!accessToken) {
        throw new Error('인증이 필요합니다');
      }

      const response = await fetch(`${BASEURL}/api/admin/user/`, {
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
      setCustomers(data.users);
      setDashboard(data.statistics);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Customer | `user.${string}`;
    value: string | { start: string | undefined; end: string | undefined };
  }>({
    field: '' as keyof Customer,
    value: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<Customer | null>(null);

  const handleSearch = useCallback(
    (
      field: keyof Customer | `user.${string}`,
      value: string | { start: string | undefined; end: string | undefined },
    ) => {
      setSearchFilter({ field, value });
    },
    [],
  );

  const filteredCustomers = useMemo(() => {
    let filtered = customers;

    if (searchFilter.value) {
      filtered = filtered.filter(customer => {
        let fieldValue;

        if (searchFilter.field.startsWith('user.')) {
          const [_, field] = searchFilter.field.split('.');
          fieldValue = customer.user[field as keyof typeof customer.user];
        } else {
          fieldValue = customer[searchFilter.field as keyof Customer];
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
  }, [customers, searchFilter]);

  const handleHistoryClick = (customer: Customer) => {
    setSelectedHistory(customer);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mt-[1.8rem]">
        <p className="text-[1.8rem]">
          전체 고객 수 : {dashboard.total_users}명 | 오늘 가입 : {dashboard.new_users_today}명 |
          오늘 탈퇴 : {dashboard.deleted_users_today}명
        </p>
      </div>

      <div className="flex justify-between items-center mt-[4.9rem]">
        <ExportExcelButton
          data={filteredCustomers}
          fileName="고객_목록"
          headers={{
            'user.name': '이름',
            'user.email': '이메일',
            'user.phone': '전화번호',
            is_subscribed: '구독여부',
            sub_status: '구독현황',
            created_at: '가입일',
            last_login: '마지막 방문일',
            marketing_consent: '마케팅 수신동의',
            start_date: '최초결제일',
            last_paid_at: '최근결제일',
            end_date: '구독만료일',
          }}
        />
        <Search<Customer> onSearch={handleSearch} searchOptions={customerSearchOptions} />
      </div>

      <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">검색 결과 : {0}</p>

      <CustomerTable customers={filteredCustomers} onHistoryClick={handleHistoryClick} />

      {selectedHistory && (
        <HistoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedHistory(null);
          }}
          customerId={selectedHistory.id}
        />
      )}
    </div>
  );
}
