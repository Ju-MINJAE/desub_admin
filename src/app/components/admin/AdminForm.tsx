'use client';

import { getAccessToken } from '@/actions/auth/getAccessToken';
import { adminFormSchema } from '@/schemas/adminSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type AdminFormType = z.infer<typeof adminFormSchema>;

interface AdminFormProps {
  onCancel: () => void;
}

export default function AdminForm({ onCancel }: AdminFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AdminFormType>({
    resolver: zodResolver(adminFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: AdminFormType) => {
    try {
      const { accessToken } = await getAccessToken();
      setIsLoading(true);
      const response = await fetch(`${BASEURL}/api/admin/create-admin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.type === 'duplicate_email') {
          setError('email', { message: '이미 사용 중인 이메일입니다' });
          return;
        }
        throw new Error(errorData.message || '계정 생성에 실패했습니다');
      }

      onCancel();
    } catch (error) {
      console.error('Admin creation failed:', error);
      alert(`계정 생성에 실패했습니다. 다시 시도해주세요.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pl-[28.5rem]">
      <div className="p-[3.1rem]">
        <div className="flex justify-between items-center mb-[4rem]">
          <h1 className="text-[3.5rem] mt-[2.1rem] font-bold">Admin 계정생성</h1>
          <div className="space-x-[1rem]">
            <button
              type="button"
              onClick={onCancel}
              className="px-[3rem] py-[1.2rem] border border-black rounded-[1.8rem]"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="submit"
              form="admin-form"
              className="px-[3rem] py-[1.2rem] bg-black text-white rounded-[1.8rem]"
              disabled={isLoading}
            >
              {isLoading ? '처리중...' : '등록'}
            </button>
          </div>
        </div>

        <div className="flex justify-center pt-[13.5rem]">
          <form id="admin-form" onSubmit={handleSubmit(onSubmit)} className="space-y-[2rem]">
            <div className="flex items-center">
              <label className="block text-[1.8rem] w-[11rem]">아이디</label>
              <div>
                <input
                  type="email"
                  {...register('email')}
                  className="w-[40rem] border border-black p-[1rem] text-[1.6rem]"
                />
                {errors.email && (
                  <p className="text-red-500 text-[1.3rem] mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <label className="block text-[1.8rem] w-[11rem]">비밀번호</label>
              <div>
                <input
                  type="password"
                  {...register('password')}
                  className="w-[40rem] border border-black p-[1rem] text-[1.6rem]"
                />
                <p className="text-[1.3rem] pt-[0.5rem]">
                  영문 대/소문자, 숫자, 특수기호 1개 이상 사용 및 10자 이상
                </p>
                {errors.password && (
                  <p className="text-red-500 text-[1.3rem]">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <label className="block text-[1.8rem] w-[11rem]">이름</label>
              <div>
                <input
                  type="text"
                  {...register('name')}
                  className="w-[40rem] border border-black p-[1rem] text-[1.6rem]"
                />
                {errors.name && (
                  <p className="text-red-500 text-[1.3rem] mt-1">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <label className="block text-[1.8rem] w-[11rem]">전화번호</label>
              <div>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-[40rem] border border-black p-[1rem] text-[1.6rem]"
                  placeholder="010-1234-5678"
                />
                {errors.phone && (
                  <p className="text-red-500 text-[1.3rem] mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
