import { RefundModalProps } from '@/types/cancellation';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function RefundModal({
  isOpen,
  onClose,
  customerName,
  paymentDate,
  amount,
  onRefund,
}: RefundModalProps) {
  const [refundAmount, setRefundAmount] = useState<number>(0);

  if (!isOpen) return null;

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
            <span>{customerName}</span>
          </div>
          <div>
            <span className="inline-block w-[16rem]">결제일시</span>
            <span>{paymentDate}</span>
          </div>
          <div>
            <span className="inline-block w-[16rem]">최종결제금액</span>
            <span>{amount.toLocaleString()}</span>
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
            onClick={() => onRefund(refundAmount)}
            className="w-[54rem] items-center bg-black text-white mt-[4.4rem] py-[1.5rem] rounded-[1.8rem] text-[1.8rem]"
          >
            환불
          </button>
        </div>
      </div>
    </div>
  );
}
