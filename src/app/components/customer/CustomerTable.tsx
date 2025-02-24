import { SortOrder } from '@/types/subscriber';
import { Customer, CustomerSortField } from '@/types/customer';
import React, { useMemo, useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import { HeaderItem } from '@/types/tableHeader';
import Pagination from '../common/Pagination';
import { format, parseISO } from 'date-fns';

interface CustomerTableProps {
  customers: Customer[];
  onHistoryClick: (customer: Customer) => void;
}

export default function CustomerTable({ customers, onHistoryClick }: CustomerTableProps) {
  const [sortField, setSortField] = useState<CustomerSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 나올 아이템 수

  const handleSort = (field: CustomerSortField) => {
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

  const sortedCustomers = [...customers].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedCustomers.slice(startIndex, endIndex);
  }, [sortedCustomers, currentPage]);

  const COMBINED_HEADERS: HeaderItem<CustomerSortField>[] = [
    { field: 'user.name', label: '이름', type: 'sortable' },
    { field: 'user.email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'user.phone', label: '전화번호', type: 'sortable' },
    { field: 'is_subscribed', label: '구독여부', type: 'sortable' },
    { field: 'sub_status', label: '구독현황', type: 'sortable' },
    { field: 'created_at', label: '가입일', type: 'sortable' },
    { field: 'last_login', label: '마지막 방문일', type: 'sortable' },
    { field: 'marketing_consent', label: '마케팅 수신동의', type: 'sortable' },
    { field: 'start_date', label: '최초결제일', type: 'sortable' },
    { field: 'last_paid_at', label: '최근결제일', type: 'sortable' },
    { field: 'end_date', label: '구독만료일', type: 'sortable' },
    { field: undefined, label: '구독변경이력', type: 'static' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="border-y bg-[#F3F3F3]">
            {COMBINED_HEADERS.map((header, index) =>
              header.type === 'sortable' && header.field ? (
                <SortableHeader<CustomerSortField>
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
          {paginatedCustomers.map((customer, index) => (
            <tr key={index} className="border-b">
              <td className="py-4 text-[1.5rem] text-center">{customer.user.name}</td>
              <td className="py-4 text-[1.5rem] text-center">{customer.user.email}</td>
              <td className="py-4 text-[1.5rem] text-center">{customer.user.phone}</td>
              <td className="py-4 text-[1.5rem] text-center">{customer.is_subscribed}</td>
              <td className="py-4 text-[1.5rem] text-center">
                {(() => {
                  switch (customer.sub_status) {
                    case 'none':
                      return '-';
                    case 'active':
                      return '진행중';
                    case 'paused':
                      return '일시정지';
                    case 'cancelled':
                      return '구독취소';
                    case 'refund_pending':
                      return '환불대기';
                    default:
                      return customer.sub_status;
                  }
                })()}
              </td>
              <td className="py-4 text-[1.5rem] text-center">
                {format(parseISO(customer.created_at), 'yyyy-MM-dd')}
              </td>
              <td className="py-4 text-[1.5rem] text-center">
                {' '}
                {format(parseISO(customer.last_login), 'yyyy-MM-dd')}
              </td>
              <td className="py-4 text-[1.5rem] text-center">
                {customer.marketing_consent === 'true' ? 'Y' : 'N'}
              </td>
              {customer.start_date ? (
                <td className="py-4 text-[1.5rem] text-center">
                  {' '}
                  {format(parseISO(customer.start_date), 'yyyy-MM-dd')}
                </td>
              ) : (
                <td className="py-4 text-[1.5rem] text-center">-</td>
              )}
              {customer.last_paid_at ? (
                <td className="py-4 text-[1.5rem] text-center">
                  {' '}
                  {format(parseISO(customer.last_paid_at), 'yyyy-MM-dd')}
                </td>
              ) : (
                <td className="py-4 text-[1.5rem] text-center">-</td>
              )}
              {customer.end_date ? (
                <td className="py-4 text-[1.5rem] text-center">
                  {' '}
                  {format(parseISO(customer.end_date), 'yyyy-MM-dd')}
                </td>
              ) : (
                <td className="py-4 text-[1.5rem] text-center">-</td>
              )}
              <td className="py-4 text-[1.5rem] text-center">
                <button
                  onClick={() => onHistoryClick(customer)}
                  className="w-[7rem] text-[1.2rem] underline underline-offset-4"
                >
                  상세보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length > itemsPerPage && (
        <Pagination
          totalItems={customers.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
