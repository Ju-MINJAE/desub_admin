'use client';

import { useState, useCallback, useMemo } from 'react';
import { Admin } from '@/types/admin';
import Search from '../components/common/Search';
import AdminForm from '../components/admin/AdminForm';
import AdminTable from '../components/admin/AdminTable';
import { adminSearchOptions } from '../constants/searchOptions';
import AdminDeleteModal from '../components/admin/AdminDeleteModal';

export default function AdminManagement() {
  const [isFormView, setIsFormView] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([
    {
      role: 'Master',
      email: 'master.hong@gmail.com',
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
      status: true,
    },
  ]);

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Admin;
    value: string | { start: string | undefined; end: string | undefined };
  }>({
    field: '' as keyof Admin,
    value: '',
  });

  const handleSearch = useCallback(
    (
      field: keyof Admin,
      value: string | { start: string | undefined; end: string | undefined },
    ) => {
      setSearchFilter({ field, value });
    },
    [],
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const handleDeleteClick = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedAdmin) return;

    setAdmins(prev =>
      prev.map(a => (a.email === selectedAdmin.email ? { ...a, status: false } : a)),
    );
    alert('삭제 처리가 완료되었습니다.');
    setIsDeleteModalOpen(false);
    setSelectedAdmin(null);
  };

  const filteredAdmins = useMemo(() => {
    const activeAdmins = admins.filter(admin => admin.status === true || admin.status === '-');
    if (!searchFilter.value) return activeAdmins;

    return activeAdmins.filter(admin => {
      const fieldValue = admin[searchFilter.field];

      if (typeof searchFilter.value === 'object' && 'start' in searchFilter.value) {
        if (!searchFilter.value.start && !searchFilter.value.end) {
          return true;
        }
        const cancellationDate = new Date(fieldValue as string);
        const startDate = searchFilter.value.start
          ? new Date(searchFilter.value.start)
          : new Date(0);
        const endDate = searchFilter.value.end
          ? new Date(searchFilter.value.end)
          : new Date(8640000000000000);
        return cancellationDate >= startDate && cancellationDate <= endDate;
      } else if (typeof fieldValue === 'string' && typeof searchFilter.value === 'string') {
        return fieldValue.toLowerCase().includes(searchFilter.value.toLowerCase());
      }

      return false;
    });
  }, [admins, searchFilter]);

  if (isFormView) {
    return <AdminForm onCancel={() => setIsFormView(false)} />;
  }

  return (
    <div className="pl-[28.5rem]">
      <div className="p-[3.1rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-[3.5rem] mt-[2.1rem] font-bold">계정관리</h1>
          <button
            onClick={() => setIsFormView(true)}
            className="flex items-center bg-black text-white px-[2rem] py-[1rem] rounded-[1.2rem]"
          >
            <span>Admin 계정생성</span>
          </button>
        </div>

        <div className="flex justify-end mt-[1rem]">
          <Search<Admin> onSearch={handleSearch} searchOptions={adminSearchOptions} />
        </div>

        <p className="my-[1.5rem] text-[1.3rem] text-[#4D4D4D]">
          검색 결과 : {filteredAdmins.length}
        </p>

        <AdminTable admins={filteredAdmins} onDelete={handleDeleteClick} />
        {selectedAdmin && (
          <AdminDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedAdmin(null);
            }}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
}
