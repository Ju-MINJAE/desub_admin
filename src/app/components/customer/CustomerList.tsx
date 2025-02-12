'use client';

import type { Customer } from '@/types/customer';
import { useCallback, useMemo, useState } from 'react';
import Search from '../common/Search';
import { customerSearchOptions } from '@/app/constants/searchOptions';
import CustomerTable from './CustomerTable';
import HistoryModal from './HistoryModal';
import ExportExcelButton from '../common/ExportExcelButton';

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      name: '홍길동',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      subscription: '구독중',
      status: '진행중',
      signupDate: '2025-01-10',
      lastLoginDate: '2025-01-13',
      markegtingConsent: 'Y',
      startDate: '2025-01-13',
      endDate: '2025-01-13',
      expiryDate: '2025-01-13',
    },
    {
      name: '홍길동1',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      subscription: '미구독',
      status: '-',
      signupDate: '2025-01-10',
      lastLoginDate: '2025-01-13',
      markegtingConsent: 'Y',
      startDate: '2025-01-13',
      endDate: '2025-01-13',
      expiryDate: '2025-01-13',
    },
    {
      name: '홍길동2',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      subscription: '구독중',
      status: '일시정지',
      signupDate: '2025-01-10',
      lastLoginDate: '2025-01-13',
      markegtingConsent: 'N',
      startDate: '2025-01-13',
      endDate: '2025-01-13',
      expiryDate: '2025-01-13',
    },
    {
      name: '홍길동3',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      subscription: '미구독',
      status: '구독취소',
      signupDate: '2025-01-10',
      lastLoginDate: '2025-01-13',
      markegtingConsent: 'Y',
      startDate: '2025-01-13',
      endDate: '2025-01-13',
      expiryDate: '2025-01-13',
    },
  ]);

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Customer;
    value: string | { start: string | undefined; end: string | undefined };
  }>({
    field: '' as keyof Customer,
    value: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<Customer | null>(null);

  const handleSearch = useCallback(
    (
      field: keyof Customer,
      value: string | { start: string | undefined; end: string | undefined },
    ) => {
      setSearchFilter({ field, value });
    },
    [],
  );

  const filteredCustomers = useMemo(() => {
    if (!searchFilter.value) return customers;

    return customers.filter(customer => {
      const fieldValue = customer[searchFilter.field];

      if (typeof searchFilter.value === 'object' && 'start' in searchFilter.value) {
        if (!searchFilter.value.start && !searchFilter.value.end) {
          return true;
        }
        const customerDate = new Date(fieldValue as string);
        const startDate = searchFilter.value.start
          ? new Date(searchFilter.value.start)
          : new Date(0);
        const endDate = searchFilter.value.end
          ? new Date(searchFilter.value.end)
          : new Date(8640000000000000);
        return customerDate >= startDate && customerDate <= endDate;
      } else if (typeof fieldValue === 'string' && typeof searchFilter.value === 'string') {
        return fieldValue.toLowerCase().includes(searchFilter.value.toLowerCase());
      }

      return false;
    });
  }, [customers, searchFilter]);

  const handleHistoryClick = (customer: Customer) => {
    setSelectedHistory(customer);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mt-[1.8rem]">
        <p className="text-[1.8rem]">
          전체 고객 수 : {customers.length}명 | 오늘 가입 : 00명 | 오늘 탈퇴 : 00명
        </p>
      </div>

      <div className="flex justify-between items-center mt-[4.9rem]">
        <ExportExcelButton
          data={filteredCustomers}
          fileName="고객_목록"
          headers={{
            name: '이름',
            email: '이메일',
            phone: '전화번호',
            subscription: '구독여부',
            status: '구독현황',
            signupDate: '가입일',
            lastLoginDate: '마지막 방문일',
            markegtingConsent: '마케팅 수신동의',
            startDate: '최초결제일',
            endDate: '최근결제일',
            expiryDate: '구독만료일',
          }}
        />
        <Search<Customer> onSearch={handleSearch} searchOptions={customerSearchOptions} />
      </div>

      <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
        검색 결과 : {filteredCustomers.length}
      </p>

      <CustomerTable customers={filteredCustomers} onHistoryClick={handleHistoryClick} />

      {selectedHistory && (
        <HistoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedHistory(null);
          }}
          customer={selectedHistory}
        />
      )}
    </div>
  );
}
