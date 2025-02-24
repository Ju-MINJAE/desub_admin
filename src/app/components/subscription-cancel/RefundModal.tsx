import { getAccessToken } from '@/actions/auth/getAccessToken';
import { RefundInfo } from '@/types/cancellation';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  subsId: string;
}

export default function RefundModal({ isOpen, onClose, subsId }: RefundModalProps) {
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundInfo, setRefundInfo] = useState<RefundInfo>();

  // 기존 결제정보 api 호출
  const fetchRefundInfo = async () => {
    try {
      const { accessToken } = await getAccessToken();
      const response = await fetch(`${BASEURL}/api/admin/admin/refund-info/${subsId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('환불 정보를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setRefundInfo(data);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch refund info:', error);
    }
  };

  useEffect(() => {
    if (isOpen && subsId) {
      fetchRefundInfo();
    }
  }, [isOpen, subsId]);
  if (!isOpen) return null;

  // 환불 처리 api 호출
  const handleRefund = async () => {
    try {
      const { accessToken } = await getAccessToken();
      const response = await fetch(`${BASEURL}/api/admin/refund-approve/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_id: Number(subsId),
          refund_amount: refundAmount,
        }),
      });

      if (!response.ok) {
        throw new Error('환불 처리에 실패했습니다.');
      }

      onClose();
    } catch (error) {
      console.error('Failed to process refund:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-[4rem] p-[4.4rem] w-[70rem]">
        <div className="flex justify-between items-center mb-[3rem]">
          <h2 className="text-[3rem] font-bold">환불처리</h2>
          <button onClick={onClose}>
            <X size={40} className="text-[2.4rem]" />
          </button>
        </div>

        <div className="space-y-[2.3rem] px-[5.4rem]">
          <div>
            <span className="inline-block w-[16rem]">결제(입금)자</span>
            <span>{refundInfo?.user_name}</span>
          </div>
          <div>
            <span className="inline-block w-[16rem]">결제일시</span>
            <span>{refundInfo?.paid_at}</span>
          </div>
          <div>
            <span className="inline-block w-[16rem]">최종결제금액</span>
            <span>{refundInfo?.paid_amount.toLocaleString()}</span>
          </div>
          <div>
            <span className="inline-block w-[16rem]">예상환불금액</span>
            <span>{refundInfo?.refund_amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center mb-[4.4rem]">
            <label className="w-[16rem]">취소금액 입력</label>
            <input
              type="number"
              value={refundAmount}
              onChange={e => setRefundAmount(Number(e.target.value))}
              className="w-[19rem] border p-2"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleRefund}
            className="w-[54rem] items-center bg-black text-white mt-[4.4rem] py-[1.5rem] rounded-[1.8rem] text-[1.8rem]"
          >
            환불
          </button>
        </div>
      </div>
    </div>
  );
}
