import { Admin } from '@/types/admin';
import { useMemo, useState } from 'react';
import SortableHeader from '../common/SortableHeader';
import { HeaderItem } from '@/types/tableHeader';
import PasswordChangeModal from './PasswordChangeModal';
import Pagination from '../common/Pagination';

interface AdminListProps {
  admins: Admin[];
  onDelete: (admin: Admin) => void;
}

export default function AdminTable({ admins, onDelete }: AdminListProps) {
  const [sortField, setSortField] = useState<keyof Admin | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 나올 아이템 수

  const handleSort = (field: keyof Admin) => {
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

  const handlePasswordChange = (newPassword: string) => {
    // API 연동 후 비밀번호 변경 처리필요
    console.log('Password changed:', newPassword);
  };

  const sortedAdmins = [...admins].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const paginatedAdmins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAdmins.slice(startIndex, endIndex);
  }, [sortedAdmins, currentPage]);

  const COMBINED_HEADERS: HeaderItem<keyof Admin>[] = [
    { field: 'role', label: '분류', type: 'sortable' },
    { field: 'email', label: '이메일주소(아이디)', type: 'sortable' },
    { field: 'name', label: '이름', type: 'sortable' },
    { field: 'phone', label: '전화번호', type: 'sortable' },
    { field: 'createdAt', label: '계정 생성일', type: 'sortable' },
    { field: undefined, label: '비밀번호 변경', type: 'static' },
    { field: undefined, label: '계정 삭제', type: 'static' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="border-y bg-[#F3F3F3]">
            {COMBINED_HEADERS.map((header, index) =>
              header.type === 'sortable' && header.field ? (
                <SortableHeader<keyof Admin>
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
          {paginatedAdmins.map((admin, index) => (
            <tr key={index} className="border-b">
              <td className="py-4 text-[1.5rem] text-center">{admin.role}</td>
              <td className="py-4 text-[1.5rem] text-center">{admin.email}</td>
              <td className="py-4 text-[1.5rem] text-center">{admin.name}</td>
              <td className="py-4 text-[1.5rem] text-center">{admin.phone}</td>
              <td className="py-4 text-[1.5rem] text-center">{admin.createdAt}</td>
              <td className="py-4 text-[1.5rem] text-center">
                {admin.passwordChangedAt === '변경' ? (
                  <button
                    className="underline"
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setIsPasswordModalOpen(true);
                    }}
                  >
                    변경
                  </button>
                ) : (
                  admin.passwordChangedAt
                )}
              </td>
              <td className="py-2 text-[1.5rem] text-center">
                {admin.status === true ? (
                  <button
                    onClick={() => onDelete?.(admin)}
                    className="w-[7rem] px-4 py-2 text-[1.5rem] border border-black rounded-[1.2rem]"
                  >
                    삭제
                  </button>
                ) : (
                  <p>-</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {admins.length > itemsPerPage && (
        <Pagination
          totalItems={admins.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {selectedAdmin && (
        <PasswordChangeModal
          isOpen={isPasswordModalOpen}
          onClose={() => {
            setIsPasswordModalOpen(false);
            setSelectedAdmin(null);
          }}
          email={selectedAdmin.email}
          onSubmit={handlePasswordChange}
        />
      )}
    </div>
  );
}
