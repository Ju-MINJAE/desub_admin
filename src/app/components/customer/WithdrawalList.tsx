'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Search from '../common/Search';
import type { Withdrawal } from '@/types/customer';
import { withdrawalSearchOptions } from '@/app/constants/searchOptions';
import WithdrawalTable from './WithdrawalTable';
import WithdrawalConfirmModal from './WithdrawalConfirmModal';
import WithdrawalReasonModal from './WithdrawalReasonModal';
import ExportExcelButton from '../common/ExportExcelButton';
import { getAccessToken } from '@/actions/auth/getAccessToken';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function WithdrawalList() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [selectedDetailWithdrawal, setSelectedDetailWithdrawal] = useState<Withdrawal | null>(null);

  // 탈퇴관리 API 호출 (user-delete)
  const fetchWithdrawals = async () => {
    try {
      const { accessToken } = await getAccessToken();

      if (!accessToken) {
        throw new Error('인증이 필요합니다');
      }

      const response = await fetch(`${BASEURL}/api/admin/user-delete/`, {
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
      setWithdrawals(data);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Withdrawal | `user.${string}`;
    value: string | { start: string | undefined; end: string | undefined };
  }>({
    field: '' as keyof Withdrawal,
    value: '',
  });

  const handleSearch = useCallback(
    (
      field: keyof Withdrawal | `user.${string}`,
      value: string | { start: string | undefined; end: string | undefined },
    ) => {
      setSearchFilter({ field, value });
    },
    [],
  );

  const filteredWithdrawals = useMemo(() => {
    let filtered = withdrawals;

    if (searchFilter.value) {
      filtered = filtered.filter(withdrawal => {
        let fieldValue;

        if (searchFilter.field.startsWith('user.')) {
          const [_, field] = searchFilter.field.split('.');
          fieldValue = withdrawal.user[field as keyof typeof withdrawal.user];
        } else {
          fieldValue = withdrawal[searchFilter.field as keyof Withdrawal];
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
  }, [withdrawals, searchFilter]);

  const handleWithdrawClick = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setIsConfirmModalOpen(true);
  };

  const handleDetailClick = (withdrawal: Withdrawal) => {
    setSelectedDetailWithdrawal(withdrawal);
    setIsReasonModalOpen(true);
  };

  // 탈퇴 처리 API 호출 (DELETE admin/admin)
  const handleConfirmWithdraw = async () => {
    if (!selectedWithdrawal) return;

    try {
      const { accessToken } = await getAccessToken();

      const response = await fetch(`${BASEURL}/api/admin/admin/?id=${selectedWithdrawal.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('탈퇴 처리에 실패했습니다');
      }

      setWithdrawals(prev =>
        prev.map(w => (w.id === selectedWithdrawal.id ? { ...w, withdrawalStatus: true } : w)),
      );

      alert('탈퇴 처리가 완료되었습니다.');
      setIsConfirmModalOpen(false);
      setSelectedWithdrawal(null);
      fetchWithdrawals();
    } catch (error) {
      console.error('Failed to withdraw user:', error);
      alert('탈퇴 처리에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mt-[4.9rem]">
        <ExportExcelButton<Withdrawal>
          data={withdrawals}
          fileName="탈퇴회원_목록"
          headers={{
            deleted_at: '탈퇴신청일',
            'user.name': '이름',
            'user.email': '이메일주소(아이디)',
            'user.phone': '전화번호',
          }}
        />
        <Search<Withdrawal> onSearch={handleSearch} searchOptions={withdrawalSearchOptions} />
      </div>
      <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
        검색 결과 : {filteredWithdrawals.length}
      </p>

      <WithdrawalTable
        withdrawals={filteredWithdrawals}
        onWithdraw={handleWithdrawClick}
        onDetail={handleDetailClick}
      />
      {selectedWithdrawal && (
        <WithdrawalConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setSelectedWithdrawal(null);
          }}
          onConfirm={handleConfirmWithdraw}
          customerName={selectedWithdrawal.user.name}
        />
      )}
      {selectedDetailWithdrawal && (
        <WithdrawalReasonModal
          isOpen={isReasonModalOpen}
          onClose={() => {
            setIsReasonModalOpen(false);
            setSelectedDetailWithdrawal(null);
          }}
          withdrawal={selectedDetailWithdrawal}
        />
      )}
    </>
  );
}
