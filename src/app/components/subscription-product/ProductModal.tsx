import { X } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types/product';
import { getAccessToken } from '@/actions/auth/getAccessToken';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ isOpen, onClose }: ProductModalProps) {
  const [formData, setFormData] = useState<Product>({
    plan_name: '',
    price: 0,
    period: 'monthly',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { accessToken } = await getAccessToken();

      const response = await fetch(`${BASEURL}/api/plans/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '상품 등록에 실패했습니다');
      }

      onClose();
    } catch (err) {
      console.error('Failed to create product:', err);
      setError(err instanceof Error ? err.message : '상품 등록에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-[4rem] p-[4.4rem] w-[75rem]">
        <div className="flex justify-between items-center mb-[3rem]">
          <h2 className="text-[3rem] font-bold">신규상품 등록</h2>
          <button onClick={onClose}>
            <X size={40} className="text-[2.4rem]" />
          </button>
        </div>

        <div className="space-y-[3.9rem] px-[5.4rem] py-[4rem]">
          <div className="flex">
            <span className="inline-block w-[16rem] text-[1.8rem]">제목</span>
            <div>
              <input
                type="text"
                value={formData.plan_name}
                onChange={e => {
                  setFormData(prev => ({ ...prev, plan_name: e.target.value }));
                  setError(null);
                }}
                className="w-[33rem] p-[1rem] border border-black"
              />
            </div>
          </div>

          <div className="flex">
            <span className="inline-block w-[16rem] text-[1.8rem]">월 결제금액</span>
            <div>
              <input
                type="number"
                value={formData.price || ''}
                onChange={e => {
                  setFormData(prev => ({ ...prev, price: Number(e.target.value) }));
                  setError(null);
                }}
                className="w-[33rem] p-[1rem] border border-black"
              />
            </div>
          </div>

          <div className="flex">
            <span className="inline-block w-[16rem] text-[1.8rem]">구독 단위</span>
            <div className="space-x-[2rem]">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="monthly"
                  checked={formData.period === 'monthly'}
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      period: e.target.value as 'monthly' | 'yearly',
                    }));
                    setError(null);
                  }}
                  className="mr-2"
                />
                <span className="text-[1.6rem]">Monthly</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="yearly"
                  checked={formData.period === 'yearly'}
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      period: e.target.value as 'monthly' | 'yearly',
                    }));
                    setError(null);
                  }}
                  className="mr-2"
                />
                <span className="text-[1.6rem]">Yearly</span>
              </label>
            </div>
          </div>
          {error && <p className="text-[1.4rem] text-red-500 text-center">{error}</p>}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-[54rem] bg-black text-white py-[1.5rem] rounded-[1.8rem] text-[1.8rem] mt-[4rem] disabled:bg-gray-400"
          >
            상품 등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
