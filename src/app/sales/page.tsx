'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Sale } from '@/types/sales';
import { saleSearchOptions } from '../constants/searchOptions';
import SalesTable from '../components/sales/SalesTable';
import SalesCount from '../components/sales/SalesCount';
import { Heading } from '../components/ui/Heading';
import Search from '../components/common/Search';
import ExportExcelButton from '../components/common/ExportExcelButton';

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([
    {
      payDate: '2025-01-13',
      price: '1,500,000',
      content: '결제',
      name: '홍길동1',
      email: 'gildong.hong1@gmail.com',
      phone: '010-1111-1111',
    },
    {
      payDate: '2025-01-13',
      price: '-870,000',
      content: '구독취소',
      name: '홍길동3',
      email: 'gildong.hong3@gmail.com',
      phone: '010-3333-3333',
    },
    {
      payDate: '2025-01-13',
      price: '1,350,000',
      content: '결제',
      name: '홍길동2',
      email: 'gildong.hong2@gmail.com',
      phone: '010-2222-2222',
    },
  ]);

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Sale;
    value: string | { start: string | undefined; end: string | undefined };
  }>({
    field: '' as keyof Sale,
    value: '',
  });

  const handleSearch = useCallback(
    (field: keyof Sale, value: string | { start: string | undefined; end: string | undefined }) => {
      setSearchFilter({ field, value });
    },
    [],
  );

  const filteredSubscribers = useMemo(() => {
    let filtered = sales;

    if (searchFilter.value) {
      filtered = filtered.filter(sale => {
        const fieldValue = sale[searchFilter.field];

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
        <SalesCount monthTotalSales={80000000} monthCancelSales={-870000} />

        <div className="flex justify-between items-center mt-[4.9rem]">
          <ExportExcelButton<Sale>
            data={filteredSubscribers}
            fileName="매출_목록"
            headers={{
              payDate: '결제일',
              price: '금액(원)',
              content: '내용',
              name: '이름',
              email: '이메일',
              phone: '전화번호',
            }}
          />
          <Search<Sale> onSearch={handleSearch} searchOptions={saleSearchOptions} />
        </div>

        <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
          검색 결과 : {filteredSubscribers.length}
        </p>
        <SalesTable subscribers={filteredSubscribers} />
      </div>
    </div>
  );
}
