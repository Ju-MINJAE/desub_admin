'use client';
import { useCallback, useMemo, useState } from 'react';
import ExportExcelButton from '../components/subscription-status/ExportExcelButton';
import Search from '../components/subscription-status/Search';
import { customerSearchOptions } from '../constants/searchOptions';
import { Customer } from '@/types/customer';
import CustomerTable from '../components/customer/CustomerTable';
import HistoryModal from '../components/customer/HistoryModal';

export default function CustomerManagement() {
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

  const [searchFilter, setSearchFilter] = useState({
    field: '' as keyof Customer,
    value: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<Customer | null>(null);

  const handleSearch = useCallback((field: keyof Customer, value: string) => {
    setSearchFilter({ field, value });
  }, []);

  const filteredCustomers = useMemo(() => {
    if (!searchFilter.value) return customers;

    return customers.filter(customer => {
      const fieldValue = customer[searchFilter.field];

      if (String(searchFilter.field).includes('Date')) {
        return String(fieldValue).includes(searchFilter.value);
      }

      return String(fieldValue).toLowerCase().includes(searchFilter.value.toLowerCase());
    });
  }, [customers, searchFilter]);

  const handleHistoryClick = (customer: Customer) => {
    setSelectedHistory(customer);
    setIsModalOpen(true);
  };

  return (
    <div className="pl-[28.5rem]">
      <div className="p-[3.1rem]">
        <h1 className="text-[3.5rem] mt-[2.1rem] font-bold">고객관리</h1>

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
    </div>
  );
}
