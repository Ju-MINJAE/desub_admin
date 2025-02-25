import { Withdrawal, WithdrawalSortField } from '@/types/customer';
import { useMemo, useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import { HeaderItem } from '@/types/tableHeader';
import Pagination from '../common/Pagination';
import { format, parseISO } from 'date-fns';

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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 나올 아이템 수

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

    let aValue, bValue;

    if (typeof sortField === 'string' && sortField.startsWith('user.')) {
      const field = sortField.split('.')[1];
      aValue = a.user[field as keyof typeof a.user];
      bValue = b.user[field as keyof typeof b.user];
    } else {
      aValue = a[sortField as keyof Withdrawal];
      bValue = b[sortField as keyof Withdrawal];
    }

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1;
  });

  const paginatedWithdrawals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedWithdrawals.slice(startIndex, endIndex);
  }, [sortedWithdrawals, currentPage]);

  const COMBINED_HEADERS: HeaderItem<WithdrawalSortField>[] = [
    { field: 'deleted_at', label: '탈퇴신청일', type: 'sortable' },
    { field: 'user.name', label: '이름', type: 'sortable' },
    { field: 'user.email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'user.phone', label: '전화번호', type: 'sortable' },
    { field: undefined, label: '탈퇴사유', type: 'static' },
    { field: 'is_deletion_confirmed', label: '탈퇴처리', type: 'sortable' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
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
          {paginatedWithdrawals.map((withdrawal, index) => (
            <tr key={index} className="border-b">
              <td className="py-4 text-[1.5rem] text-center">
                {format(parseISO(withdrawal.deleted_at), 'yyyy-MM-dd')}
              </td>
              <td className="py-4 text-[1.5rem] text-center">{withdrawal.user.name}</td>
              <td className="py-4 text-[1.5rem] text-center">{withdrawal.user.email}</td>
              <td className="py-4 text-[1.5rem] text-center">{withdrawal.user.phone}</td>
              <td className="py-4 text-[1.5rem] text-center">
                <button onClick={() => onDetail(withdrawal)} className="underline text-[1.5rem]">
                  상세보기
                </button>
              </td>
              <td className="py-2 text-center">
                {withdrawal.is_deletion_confirmed ? (
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

      {withdrawals.length > itemsPerPage && (
        <Pagination
          totalItems={withdrawals.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
