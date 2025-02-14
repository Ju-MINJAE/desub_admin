import { useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { passwordChangeSchema } from '@/schemas/adminSchema';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSubmit: (newPassword: string) => void;
}

export default function PasswordChangeModal({
  isOpen,
  onClose,
  email,
  onSubmit,
}: PasswordChangeModalProps) {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    try {
      passwordChangeSchema.parse({ newPassword });
      onSubmit(newPassword);
      onClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-[4rem] p-[4.4rem] w-[75rem]">
        <div className="flex justify-between items-center mb-[3rem]">
          <h2 className="text-[3rem] font-bold">Admin 비밀번호 변경</h2>
          <button onClick={onClose}>
            <X size={40} className="text-[2.4rem]" />
          </button>
        </div>

        <div className="space-y-[3.9rem] px-[5.4rem] py-[4rem]">
          <div>
            <span className="inline-block w-[16rem] text-[1.8rem]">아이디</span>
            <span className="text-[1.8rem]">{email}</span>
          </div>

          <div className="flex">
            <span className="inline-block w-[16rem] text-[1.8rem]">변경할 비밀번호</span>
            <div>
              <input
                type="password"
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value);
                  setError(null);
                }}
                placeholder="비밀번호 입력"
                className="w-[33rem] p-[1rem] border border-black"
              />
              <p className="text-[1.4rem] mt-2">
                영문 대/소문자, 숫자, 특수기호 1개 이상 사용 및 10자 이상
              </p>
              {error && <p className="text-[1.4rem] text-red-500 mt-1">{error}</p>}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-[54rem] bg-black text-white py-[1.5rem] rounded-[1.8rem] text-[1.8rem] mt-[4rem]"
          >
            비밀번호 변경하기
          </button>
        </div>
      </div>
    </div>
  );
}
