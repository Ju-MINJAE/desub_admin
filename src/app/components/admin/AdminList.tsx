'use client';

import { Admin } from '@/types/admin';
import { useCallback, useMemo, useState } from 'react';
import ExportExcelButton from '../subscription-status/ExportExcelButton';
import Search from '../common/Search';
import AdminTable from './AdminTable';

export default function AdminList() {
  const [admins] = useState<Admin[]>([
    {
      role: 'Master',
      email: 'gildong.hong@gmail.com',
      name: '홍길동',
      phone: '010-1234-5678',
      createdAt: '-',
      passwordChangedAt: '-',
      status: '-',
    },
    {
      role: 'Admin',
      email: 'gildong.hong@gmail.com',
      name: '홍길동',
      phone: '010-1234-5678',
      createdAt: '2015-01-14',
      passwordChangedAt: '변경',
      status: '삭제',
    },
  ]);

  const [searchFilter, setSearchFilter] = useState({
    field: '' as keyof Admin,
    value: '',
  });

  const handleSearch = useCallback((field: keyof Admin, value: string) => {
    setSearchFilter({ field, value });
  }, []);

  const filteredAdmins = useMemo(() => {
    if (!searchFilter.value) return admins;

    return admins.filter(admin => {
      const fieldValue = admin[searchFilter.field];

      if (String(searchFilter.field).includes('Date')) {
        return String(fieldValue).includes(searchFilter.value);
      }

      return String(fieldValue).toLowerCase().includes(searchFilter.value.toLowerCase());
    });
  }, [admins, searchFilter]);

  return (
    <>
      <div className="flex justify-between items-center mt-[4.9rem]">
        <ExportExcelButton
          data={admins}
          fileName="관리자_목록"
          headers={{
            role: '분류',
            email: '이메일주소(아이디)',
            name: '이름',
            phone: '전화번호',
            createdAt: '계정 생성일',
            passwordChangedAt: '비밀번호 변경',
            status: '계정 삭제',
          }}
        />
        <Search<Admin> onSearch={handleSearch} searchOptions={adminSearchOptions} />
      </div>

      <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
        검색 결과 : {filteredAdmins.length}
      </p>

      <AdminTable admins={filteredAdmins} />
    </>
  );
}
