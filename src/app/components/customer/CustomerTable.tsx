import { SortOrder } from '@/types/subscriber';
import { Customer, CustomerSortField } from '@/types/customer';
import React, { useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import { HeaderItem } from '@/types/tableHeader';

interface CustomerTableProps {
  customers: Customer[];
  onHistoryClick: (customer: Customer) => void;
}

export default function CustomerTable({ customers, onHistoryClick }: CustomerTableProps) {
  const [sortField, setSortField] = useState<CustomerSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

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

  const COMBINED_HEADERS: HeaderItem<CustomerSortField>[] = [
    { field: 'name', label: '이름', type: 'sortable' },
    { field: 'email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'phone', label: '전화번호', type: 'sortable' },
    { field: 'subscription', label: '구독여부', type: 'sortable' },
    { field: 'status', label: '구독현황', type: 'sortable' },
    { field: 'signupDate', label: '가입일', type: 'sortable' },
    { field: 'lastLoginDate', label: '마지막 방문일', type: 'sortable' },
    { field: 'markegtingConsent', label: '마케팅 수신동의', type: 'sortable' },
    { field: 'startDate', label: '최초결제일', type: 'sortable' },
    { field: 'endDate', label: '최근결제일', type: 'sortable' },
    { field: 'expiryDate', label: '구독만료일', type: 'sortable' },
    { field: undefined, label: '구독변경이력', type: 'static' },
  ];

  return (
    <table className="w-full">
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
        {sortedCustomers.map((customer, index) => (
          <tr key={index} className="border-b">
            <td className="py-4 text-[1.5rem] text-center">{customer.name}</td>
            <td className="py-4 text-[1.5rem] text-center">{customer.email}</td>
            <td className="py-4 text-[1.5rem] text-center">{customer.phone}</td>
            <td className="py-4 text-[1.5rem] text-center">{customer.subscription}</td>
            <td className="py-4 text-[1.5rem] text-center">{customer.status}</td>
            <td className="py-4 text-[1.5rem] text-center">{customer.signupDate}</td>
            <td className="py-4 text-[1.5rem] text-center">{customer.lastLoginDate}</td>
            <td className="py-4 text-[1.5rem] text-center">{customer.markegtingConsent}</td>
            <td className="py-4 text-[1.5rem] text-center">{customer.startDate}</td>
            <td className="py-4 text-[1.5rem] text-center">{customer.endDate}</td>
            <td className="py-4 text-[1.5rem] text-center">{customer.expiryDate}</td>
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
  );
}
