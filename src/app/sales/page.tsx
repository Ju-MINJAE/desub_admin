'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Sale } from '@/types/sales';
import { saleSearchOptions } from '../constants/searchOptions';
import SalesTable from '../components/sales/SalesTable';
import SalesCount from '../components/sales/SalesCount';
import { Heading } from '../components/ui/Heading';
import Search from '../components/common/Search';
import ExportExcelButton from '../components/common/ExportExcelButton';
import { getAccessToken } from '@/actions/auth/getAccessToken';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dashboard, setDashBoard] = useState({
    monthly_sales: 0,
    monthly_refunds: 0,
  });

  const fetchSales = async () => {
    try {
      const { accessToken } = await getAccessToken();

      if (!accessToken) {
        throw new Error('인증이 필요합니다');
      }

      const response = await fetch(`${BASEURL}/api/admin/sales/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        throw new Error('상품 목록을 불러오는데 실패했습니다');
      }

      const { dashboard, transactions } = await response.json();
      setSales(transactions);
      setDashBoard(dashboard);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('상품 목록을 불러오는데 실패했습니다');
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Sale | `user.${string}`;
    value: string | { start: string | undefined; end: string | undefined };
  }>({
    field: '' as keyof Sale,
    value: '',
  });

  const handleSearch = useCallback(
    (
      field: keyof Sale | `user.${string}`,
      value: string | { start: string | undefined; end: string | undefined },
    ) => {
      if (typeof value === 'string') {
        setSearchFilter({ field, value });
      }
    },
    [],
  );

  const filteredSales = useMemo(() => {
    let filtered = sales;

    if (searchFilter.value) {
      filtered = filtered.filter(sale => {
        let fieldValue;

        if (searchFilter.field.startsWith('user.')) {
          const [_, field] = searchFilter.field.split('.');
          fieldValue = sale.user[field as keyof typeof sale.user];
        } else {
          fieldValue = sale[searchFilter.field as keyof Sale];
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
  }, [sales, searchFilter]);

  return (
    <div className="pl-[28.5rem]">
      <div className="p-[3.1rem]">
        <Heading tag="h1" className="mt-[2.1rem]">
          매출관리
        </Heading>
        <SalesCount
          monthTotalSales={dashboard.monthly_sales}
          monthCancelSales={dashboard.monthly_refunds}
        />

        <div className="flex justify-between items-center mt-[4.9rem]">
          <ExportExcelButton<Sale>
            data={filteredSales}
            fileName="매출_목록"
            headers={{
              transaction_date: '결제일',
              transaction_amount: '금액(원)',
              transaction_type: '내용',
              'user.name': '이름',
              'user.email': '이메일',
              'user.phone': '전화번호',
            }}
          />
          <Search<Sale> onSearch={handleSearch} searchOptions={saleSearchOptions} />
        </div>

        <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
          검색 결과 : {filteredSales.length}
        </p>
        <SalesTable sales={filteredSales} />
      </div>
    </div>
  );
}
