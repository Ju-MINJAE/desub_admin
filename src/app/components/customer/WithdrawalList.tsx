import { useCallback, useMemo, useState } from 'react';
import Search from '../subscription-status/Search';
import ExportExcelButton from '../subscription-status/ExportExcelButton';
import { Withdrawal } from '@/types/customer';
import { withdrawalSearchOptions } from '@/app/constants/searchOptions';
import WithdrawalTable from './WithdrawalTable';

export default function WithdrawalList() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([
    {
      withdrawalDate: '2025-01-13',
      name: '홍길동',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      withdrawalStatus: false,
    },
    {
      withdrawalDate: '2025-01-13',
      name: '홍길동',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      withdrawalStatus: false,
    },
    {
      withdrawalDate: '2025-01-13',
      name: '홍길동',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      withdrawalStatus: true,
    },
  ]);

  const [searchFilter, setSearchFilter] = useState({
    field: '' as keyof Withdrawal,
    value: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWithdraw, setSelectedWithdraw] = useState<Withdrawal | null>(null);

  const handleSearch = useCallback((field: keyof Withdrawal, value: string) => {
    setSearchFilter({ field, value });
  }, []);

  const filteredWithdrawral = useMemo(() => {
    if (!searchFilter.value) return withdrawals;

    return withdrawals.filter(withdrawal => {
      const fieldValue = withdrawal[searchFilter.field];

      if (String(searchFilter.field).includes('Date')) {
        return String(fieldValue).includes(searchFilter.value);
      }

      return String(fieldValue).toLowerCase().includes(searchFilter.value.toLowerCase());
    });
  }, [withdrawals, searchFilter]);

  const handleWithdrawClick = (withdrawal: Withdrawal) => {
    setSelectedWithdraw(withdrawal);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="mt-[1.8rem]">
        <p className="text-[1.8rem]">검색 결과 : {withdrawals.length}</p>
      </div>

      <div className="flex justify-between items-center mt-[4.9rem]">
        <ExportExcelButton
          data={withdrawals}
          fileName="탈퇴회원_목록"
          headers={{
            withdrawalDate: '탈퇴신청일',
            name: '이름',
            email: '이메일주소(아이디)',
            phone: '전화번호',
          }}
        />
        <Search onSearch={handleSearch} searchOptions={withdrawalSearchOptions} />
      </div>

      <WithdrawalTable withdrawals={withdrawals} onWithdraw={handleWithdrawClick} />
    </>
  );
}
