import { Admin } from '@/types/admin';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AdminListProps {
  admins: Admin[];
}

export default function AdminTable({ admins }: AdminListProps) {
  const [sortField, setSortField] = useState<keyof Admin | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Admin) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
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

  return (
    <table className="w-full">
      <thead>
        <tr className="border-y bg-[#F3F3F3]">
          <th
            className="p-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('role')}
          >
            <div className="flex items-center justify-center">
              분류
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'role' && sortOrder === 'asc' ? 'text-black' : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'role' && sortOrder === 'desc' ? 'text-black' : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th
            className="p-4 text-[1.5rem] text-center cursor-pointer"
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
            className="p-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('name')}
          >
            <div className="flex items-center justify-center">
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
            className="p-4 text-[1.5rem] text-center cursor-pointer"
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
            className="p-4 text-[1.5rem] text-center cursor-pointer"
            onClick={() => handleSort('createdAt')}
          >
            <div className="flex items-center justify-center">
              계정 생성일
              <span className="inline-flex flex-col ml-2">
                <ChevronUp
                  size={14}
                  className={
                    sortField === 'createdAt' && sortOrder === 'asc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
                <ChevronDown
                  size={14}
                  className={
                    sortField === 'createdAt' && sortOrder === 'desc'
                      ? 'text-black'
                      : 'text-gray-300'
                  }
                />
              </span>
            </div>
          </th>
          <th className="p-4 text-[1.5rem] text-center">비밀번호 변경</th>
          <th className="p-4 text-[1.5rem] text-center">계정 삭제</th>
        </tr>
      </thead>
      <tbody>
        {sortedAdmins.map((admin, index) => (
          <tr key={index} className="border-b">
            <td className="p-4 text-[1.5rem] text-center">{admin.role}</td>
            <td className="p-4 text-[1.5rem] text-center">{admin.email}</td>
            <td className="p-4 text-[1.5rem] text-center">{admin.name}</td>
            <td className="p-4 text-[1.5rem] text-center">{admin.phone}</td>
            <td className="p-4 text-[1.5rem] text-center">{admin.createdAt}</td>
            <td className="p-4 text-[1.5rem] text-center">
              {admin.passwordChangedAt === '변경' ? (
                <button className="underline">변경</button>
              ) : (
                admin.passwordChangedAt
              )}
            </td>
            <td className="p-4 text-[1.5rem] text-center">
              {admin.status === '삭제' ? (
                <button className="w-[7rem] px-4 py-2 border border-black rounded-[1.2rem]">
                  삭제
                </button>
              ) : (
                admin.status
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
