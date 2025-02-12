import { Withdrawal, WithdrawalSortField } from '@/types/customer';
import { SortOrder } from '@/types/subscriber';
import { useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import { HeaderItem } from '@/types/tableHeader';

interface WithdrawalTableProps {
  withdrawals: Withdrawal[];
  onWithdraw?: (withdrawal: Withdrawal) => void;
  onDetail: (withdrawal: Withdrawal) => void;
}

export default function WithdrawalTable({
  withdrawals,
  onWithdraw,
  onDetail,
}: WithdrawalTableProps) {
  const [sortField, setSortField] = useState<WithdrawalSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: WithdrawalSortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortField(null);
        setSortOrder('asc');
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedWithdrawals = [...withdrawals].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const COMBINED_HEADERS: HeaderItem<WithdrawalSortField>[] = [
    { field: 'withdrawalDate', label: '탈퇴신청일', type: 'sortable' },
    { field: 'name', label: '이름', type: 'sortable' },
    { field: 'email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'phone', label: '전화번호', type: 'sortable' },
    { field: undefined, label: '탈퇴사유', type: 'static' },
    { field: 'withdrawalStatus', label: '탈퇴처리', type: 'sortable' },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="border-y bg-[#F3F3F3]">
          {COMBINED_HEADERS.map((header, index) =>
            header.type === 'sortable' && header.field ? (
              <SortableHeader<WithdrawalSortField>
                key={header.field}
                field={header.field}
                label={header.label}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
            ) : (
              <th key={index} className="px-3 py-4 text-[1.5rem] text-center">
                {header.label}
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {sortedWithdrawals.map((withdrawal, index) => (
          <tr key={index} className="border-b">
            <td className="py-4 text-[1.5rem] text-center">{withdrawal.withdrawalDate}</td>
            <td className="py-4 text-[1.5rem] text-center">{withdrawal.name}</td>
            <td className="py-4 text-[1.5rem] text-center">{withdrawal.email}</td>
            <td className="py-4 text-[1.5rem] text-center">{withdrawal.phone}</td>
            <td className="py-4 text-[1.5rem] text-center">
              <button onClick={() => onDetail(withdrawal)} className="underline text-[1.5rem]">
                상세보기
              </button>
            </td>
            <td className="py-2 text-center">
              {withdrawal.withdrawalStatus ? (
                <span className="py-2 text-[1.5rem]">탈퇴완료</span>
              ) : (
                <button
                  onClick={() => onWithdraw?.(withdrawal)}
                  className="w-[7rem] px-4 py-2 text-[1.5rem] border border-black rounded-[1.2rem]"
                >
                  탈퇴
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
