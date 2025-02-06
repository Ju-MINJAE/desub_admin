import { useCallback, useMemo, useState } from 'react';
import Search from '../subscription-status/Search';
import ExportExcelButton from '../subscription-status/ExportExcelButton';
import { Withdrawal } from '@/types/customer';
import { withdrawalSearchOptions } from '@/app/constants/searchOptions';
import WithdrawalTable from './WithdrawalTable';
import WithdrawalConfirmModal from './WithdrawalConfirmModal';

export default function WithdrawalList() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([
    {
      withdrawalDate: '2025-01-13',
      name: '홍길동1',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5678',
      withdrawalStatus: false,
    },
    {
      withdrawalDate: '2025-01-13',
      name: '홍길동2',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5679',
      withdrawalStatus: false,
    },
    {
      withdrawalDate: '2025-01-13',
      name: '홍길동3',
      email: 'gildong.hong@gmail.com',
      phone: '010-1234-5670',
      withdrawalStatus: true,
    },
  ]);

  const [searchFilter, setSearchFilter] = useState({
    field: '' as keyof Withdrawal,
    value: '',
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);

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
    setSelectedWithdrawal(withdrawal);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmWithdraw = () => {
    if (!selectedWithdrawal) return;

    setWithdrawals(prev =>
      prev.map(w => (w.name === selectedWithdrawal.name ? { ...w, withdrawalStatus: true } : w)),
    );
    alert('탈퇴 처리가 완료되었습니다.');
    setIsConfirmModalOpen(false);
    setSelectedWithdrawal(null);
  };

  return (
    <>
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
      <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
        검색 결과 : {filteredWithdrawral.length}
      </p>

      <WithdrawalTable withdrawals={filteredWithdrawral} onWithdraw={handleWithdrawClick} />
      {selectedWithdrawal && (
        <WithdrawalConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setSelectedWithdrawal(null);
          }}
          onConfirm={handleConfirmWithdraw}
          customerName={selectedWithdrawal.name}
        />
      )}
    </>
  );
}
