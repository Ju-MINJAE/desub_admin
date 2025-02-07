import { Withdrawal, WithdrawalSortField } from '@/types/customer';
import { SortOrder } from '@/types/subscriber';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

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
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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

  return (
    <table className="w-full">
      <thead>
        <tr className="border-y bg-[#F3F3F3]">
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('withdrawalDate')}
          >
            <div className="flex items-center justify-center pl-3">
              탈퇴신청일
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'withdrawalDate' && sortOrder === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'withdrawalDate' && sortOrder === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('name')}
          >
            <div className="flex items-center justify-center pl-3">
              이름
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'name' && sortOrder === 'asc' ? 'text-black' : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'name' && sortOrder === 'desc' ? 'text-black' : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('email')}
          >
            <div className="flex items-center justify-center">
              이메일주소(아이디)
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'email' && sortOrder === 'asc' ? 'text-black' : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'email' && sortOrder === 'desc' ? 'text-black' : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('phone')}
          >
            <div className="flex items-center justify-center">
              전화번호
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'phone' && sortOrder === 'asc' ? 'text-black' : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'phone' && sortOrder === 'desc' ? 'text-black' : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th className="px-3 py-4 text-[1.5rem] text-center">탈퇴사유</th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('withdrawalStatus')}
          >
            <div className="flex items-center justify-center">
              탈퇴처리
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'withdrawalStatus' && sortOrder === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'withdrawalStatus' && sortOrder === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
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
