'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Admin } from '@/types/admin';
import Search from '../components/common/Search';
import AdminForm from '../components/admin/AdminForm';
import AdminTable from '../components/admin/AdminTable';
import { adminSearchOptions } from '../constants/searchOptions';
import AdminDeleteModal from '../components/admin/AdminDeleteModal';
import { getAccessToken } from '@/actions/auth/getAccessToken';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isFormView, setIsFormView] = useState(false);

  // admin list api 호출
  const fetchAdmins = async () => {
    try {
      const { accessToken } = await getAccessToken();

      if (!accessToken) {
        throw new Error('인증이 필요합니다');
      }

      const response = await fetch(`${BASEURL}/api/admin/admin/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('상품 목록을 불러오는데 실패했습니다');
      }

      const data = await response.json();
      setAdmins(data);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const [searchFilter, setSearchFilter] = useState<{
    field: keyof Admin | `user.${string}`;
    value: string | { start: string | undefined; end: string | undefined };
  }>({
    field: '' as keyof Admin,
    value: '',
  });

  const handleSearch = useCallback(
    (
      field: keyof Admin | `user.${string}`,
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

  const handleConfirmDelete = async () => {
    if (!selectedAdmin) return;

    try {
      const { accessToken } = await getAccessToken();

      const response = await fetch(`${BASEURL}/api/admin/admin/?id=${selectedAdmin.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete error:', errorText);
        throw new Error('계정 삭제에 실패했습니다');
      }

      setAdmins(prev => prev.map(a => (a.id === selectedAdmin.id ? { ...a, status: false } : a)));

      alert('삭제 처리가 완료되었습니다.');
      setIsDeleteModalOpen(false);
      setSelectedAdmin(null);
      fetchAdmins();
    } catch (error) {
      console.error('Failed to delete admin:', error);
      alert('계정 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const filteredAdmins = useMemo(() => {
    let filtered = admins;

    if (searchFilter.value) {
      filtered = filtered.filter(admin => {
        let fieldValue;

        if (searchFilter.field.startsWith('user.')) {
          const [_, field] = searchFilter.field.split('.');
          fieldValue = admin.user[field as keyof typeof admin.user];
        } else {
          fieldValue = admin[searchFilter.field as keyof Admin];
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
  }, [admins, searchFilter]);

  if (isFormView) {
    return <AdminForm onCancel={() => setIsFormView(false)} />;
  }

  return (
    <div className="pl-[28.5rem]">
      <div className="p-[3.1rem]">
        <div className="flex justify-between mt-[2.1rem] items-center">
          <h1 className="text-[3.5rem] font-bold">계정관리</h1>
          <button
            onClick={() => setIsFormView(true)}
            className="flex items-center bg-black text-white px-[2rem] py-[1rem] rounded-[1.2rem]"
          >
            Admin 계정생성
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
