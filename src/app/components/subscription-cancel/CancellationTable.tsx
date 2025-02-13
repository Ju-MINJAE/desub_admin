import { Cancellation } from '@/types/cancellation';
import { HeaderItem } from '@/types/tableHeader';
import { useMemo, useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import Pagination from '../common/Pagination';

interface CancellationTableProps {
  cancellations: Cancellation[];
  onRefund: (cancellation: Cancellation) => void;
}

export default function CancellationTable({ cancellations, onRefund }: CancellationTableProps) {
  const [sortField, setSortField] = useState<keyof Cancellation | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 나올 아이템 수

  const handleSort = (field: keyof Cancellation) => {
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

  const COMBINED_HEADERS: HeaderItem<keyof Cancellation>[] = [
    { field: 'name', label: '이름', type: 'sortable' },
    { field: 'email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'phone', label: '전화번호', type: 'sortable' },
    { field: 'cancelDate', label: '취소일자', type: 'sortable' },
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
                <SortableHeader<keyof Cancellation>
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
              <td className="py-2 text-[1.5rem] text-center">{cancellation.name}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.email}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.phone}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.cancelDate}</td>
              <td className="py-2 text-[1.5rem] text-center">{cancellation.cancelReason}</td>
              <td className="py-2 text-[1.5rem] text-center">
                <button
                  onClick={() => onRefund(cancellation)}
                  className="w-[7rem] px-4 py-2 text-[1.5rem] border border-black rounded-[1.2rem]"
                >
                  환불
                </button>
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
