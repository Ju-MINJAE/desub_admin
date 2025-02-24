import { Cancellation, CancellationSortField } from '@/types/cancellation';
import { HeaderItem } from '@/types/tableHeader';
import { useMemo, useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import Pagination from '../common/Pagination';

interface CancellationTableProps {
  cancellations: Cancellation[];
  onRefund: (cancellation: Cancellation) => void;
}

export default function CancellationTable({ cancellations, onRefund }: CancellationTableProps) {
  const [sortField, setSortField] = useState<CancellationSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 나올 아이템 수

  const handleSort = (field: CancellationSortField) => {
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

  const sortedCancellations = useMemo(() => {
    if (!sortField) return cancellations;

    return [...cancellations].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [cancellations, sortField, sortOrder]);

  const paginatedCancellations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedCancellations.slice(startIndex, endIndex);
  }, [sortedCancellations, currentPage]);

  const COMBINED_HEADERS: HeaderItem<CancellationSortField>[] = [
    { field: 'user.name', label: '이름', type: 'sortable' },
    { field: 'user.email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'user.phone', label: '전화번호', type: 'sortable' },
    { field: 'cancelled_date', label: '취소일자', type: 'sortable' },
    { field: undefined, label: '취소사유', type: 'static' },
    { field: undefined, label: '환불처리', type: 'static' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="border-y bg-[#F3F3F3]">
            {COMBINED_HEADERS.map((header, index) =>
              header.type === 'sortable' && header.field ? (
                <SortableHeader<CancellationSortField>
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
          {paginatedCancellations.map((cancellation, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 text-[1.5rem] text-center">{cancellation.user.name}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.user.email}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.user.phone}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.cancelled_date}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.cancelled_reason}</td>
              <td className="py-2 text-[1.5rem] text-center">
                {cancellation.refund_status === 'refund_pending' ? (
                  <button
                    onClick={() => {
                      onRefund(cancellation);
                    }}
                    className="w-[7rem] py-2 text-[1.5rem] border border-black rounded-[1.2rem]"
                  >
                    환불
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>{cancellation.refund_date}</span>
                    <span>{Number(cancellation.refund_amount).toLocaleString()}원</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cancellations.length > itemsPerPage && (
        <Pagination
          totalItems={cancellations.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
