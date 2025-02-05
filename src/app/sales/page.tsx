'use client';

import { useCallback, useMemo, useState } from 'react';
import ExportExcelButton from '../components/subscription-status/ExportExcelButton';
import Search from '../components/subscription-status/Search';
import { saleSearchOptions } from '../constants/searchOptions';
import { Sale } from '@/types/sales';
import SalesTable from '../components/sales/SalesTable';

const Sales = () => {
  const [sales, _] = useState<Sale[]>([
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

  const [searchFilter, setSearchFilter] = useState({
    field: '' as keyof Sale,
    value: '',
  });

  const handleSearch = useCallback((field: keyof Sale, value: string) => {
    setSearchFilter({ field, value });
  }, []);

  const filteredSubscribers = useMemo(() => {
    let filtered = sales;

    if (searchFilter.value) {
      filtered = filtered.filter(sale => {
        const fieldValue = sale[searchFilter.field];

        if (String(searchFilter.field).includes('Date')) {
          return String(fieldValue).includes(searchFilter.value);
        }

        return String(fieldValue).toLowerCase().includes(searchFilter.value.toLowerCase());
      });
    }

    return filtered;
  }, [sales, searchFilter]);

  return (
    <div className="pl-[31.6rem]">
      <h1 className="text-[3.5rem] mt-[2.1rem] font-bold">매출관리</h1>

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
  );
};

export default Sales;
