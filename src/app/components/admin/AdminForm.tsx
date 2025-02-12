import { AdminFormData } from '@/types/admin';
import { useState } from 'react';

interface AdminFormProps {
  onCancel: () => void;
}

export default function AdminForm({ onCancel }: AdminFormProps) {
  const [formData, setFormData] = useState<AdminFormData>({
    id: '',
    password: '',
    name: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <div className="pl-[28.5rem]">
      <div className="p-[3.1rem]">
        <div className="flex justify-between items-center mb-[4rem]">
          <h1 className="text-[3.5rem] mt-[2.1rem] font-bold">Admin 계정생성</h1>
          <div className="space-x-[1rem]">
            <button
              onClick={onCancel}
              className="px-[3rem] py-[1.2rem] border border-black rounded-[1.8rem]"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="px-[3rem] py-[1.2rem] bg-black text-white rounded-[1.8rem]"
            >
              등록
            </button>
          </div>
        </div>

        <div className="flex justify-center pt-[13.5rem]">
          <form className="space-y-[2rem]">
            <div className="flex items-center">
              <label className="block text-[1.8rem] w-[11rem]">아이디</label>
              <input
                type="text"
                value={formData.id}
                onChange={e => setFormData({ ...formData, id: e.target.value })}
                className="w-[40rem] border border-black p-[1rem] text-[1.6rem]"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-[1.8rem] w-[11rem]">비밀번호</label>
              <div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-[40rem] border border-black p-[1rem] text-[1.6rem]"
                />
                <p className="text-[1.3rem] pt-[0.5rem]">
                  영문 대/소문자, 숫자, 특수기호 1개 이상 사용 및 10자 이상
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <label className="block text-[1.8rem] w-[11rem]">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-[40rem] border border-black p-[1rem] text-[1.6rem]"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-[1.8rem] w-[11rem]">전화번호</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-[40rem] border border-black p-[1rem] text-[1.6rem]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
