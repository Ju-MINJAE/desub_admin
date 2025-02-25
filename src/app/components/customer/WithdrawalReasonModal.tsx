import { Withdrawal } from '@/types/customer';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/fp';
import { X } from 'lucide-react';

interface WithdrawalReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  withdrawal: Withdrawal;
}

export default function WithdrawalReasonModal({
  isOpen,
  onClose,
  withdrawal,
}: WithdrawalReasonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-[4rem] p-[4.4rem] w-[70rem]">
        <div className="flex justify-between items-center mb-[3rem]">
          <h2 className="text-[3rem] font-bold">탈퇴사유</h2>
          <button onClick={onClose}>
            <X size={40} className="text-[2.4rem]" />
          </button>
        </div>

        <div className="space-y-[2.3rem] px-[5.4rem]">
          <div>
            <span className="inline-block w-[16rem]">고객명</span>
            <span>{withdrawal.user.name}</span>
          </div>
          <div>
            <span className="inline-block w-[16rem]">이메일주소(아이디)</span>
            <span>{withdrawal.user.email}</span>
          </div>
          <div>
            <span className="inline-block w-[16rem]">탈퇴일자</span>
            <span>{format(parseISO(withdrawal.deleted_at), 'yyyy-MM-dd')}</span>
          </div>
          <div className="flex items-center mb-[4.4rem]">
            <span className="inline-block w-[16rem]">탈퇴사유</span>
            <span>{withdrawal.reason}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="w-full items-center bg-black text-white mt-[4.4rem] py-[1.5rem] rounded-[1.8rem] text-[1.8rem]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
