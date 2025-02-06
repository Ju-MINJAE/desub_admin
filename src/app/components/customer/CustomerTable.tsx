import { SortOrder } from '@/types/subscriber';
import { Customer, CustomerSortField } from '@/types/customer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

interface CustomerTableProps {
  customers: Customer[];
  onHistoryClick: (customer: Customer) => void;
}

export default function CustomerTable({ customers, onHistoryClick }: CustomerTableProps) {
  const [sortField, setSortField] = useState<CustomerSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: CustomerSortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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

  return (
    <table className="w-full">
      <thead>
        <tr className="border-y bg-[#F3F3F3]">
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
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('subscription')}
          >
            <div className="flex items-center justify-center">
              구독여부
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'subscription' && sortOrder === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'subscription' && sortOrder === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('status')}
          >
            <div className="flex items-center justify-center">
              구독현황
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'status' && sortOrder === 'asc' ? 'text-black' : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'status' && sortOrder === 'desc' ? 'text-black' : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('signupDate')}
          >
            <div className="flex items-center justify-center">
              가입일
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'signupDate' && sortOrder === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'signupDate' && sortOrder === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('lastLoginDate')}
          >
            <div className="flex items-center justify-center">
              마지막 방문일
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'lastLoginDate' && sortOrder === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'lastLoginDate' && sortOrder === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('markegtingConsent')}
          >
            <div className="flex items-center justify-center">
              마케팅 수신동의
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'markegtingConsent' && sortOrder === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'markegtingConsent' && sortOrder === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('startDate')}
          >
            <div className="flex items-center justify-center">
              최초결제일
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'startDate' && sortOrder === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'startDate' && sortOrder === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('endDate')}
          >
            <div className="flex items-center justify-center">
              최근결제일
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'endDate' && sortOrder === 'asc' ? 'text-black' : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'endDate' && sortOrder === 'desc' ? 'text-black' : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="px-3 py-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('expiryDate')}
          >
            <div className="flex items-center justify-center">
              구독만료일
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'expiryDate' && sortOrder === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'expiryDate' && sortOrder === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th className="px-3 py-4 text-[1.5rem] text-center">구독변경이력</th>
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
