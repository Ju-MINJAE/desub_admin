import { SubscriptionHistory } from '@/types/history';
import { Customer } from '@/types/customer';
import { X } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

export default function HistoryModal({ isOpen, onClose, customer }: HistoryModalProps) {
  if (!isOpen) return null;

  const history: SubscriptionHistory[] = [
    {
      date: '2025-01-20',
      type: '구독취소',
      amount: 0,
    },
    {
      date: '2025-01-01',
      type: '결제',
      amount: 1250000,
    },
    {
      date: '2025-12-15',
      type: '재개',
      amount: '-',
    },
    {
      date: '2025-12-13',
      type: '일시정지',
      amount: '-',
    },
    {
      date: '2023-12-01',
      type: '결제',
      amount: 1250000,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-[4rem] p-[4.4rem] w-[70rem]">
        <div className="flex justify-between items-center mb-[4.4rem]">
          <h2 className="text-[3rem] font-bold">구독변경이력 상세보기</h2>
          <button onClick={onClose}>
            <X size={40} className="text-[2.4rem]" />
          </button>
        </div>

        <div className="px-[3rem]">
          <table className="w-full">
            <thead>
              <tr className="border-y bg-[#F3F3F3]">
                <th className="p-4 text-center">변경일자</th>
                <th className="p-4 text-center">변경이력</th>
                <th className="p-4 text-center">금액</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 text-center">{item.date}</td>
                  <td className="p-4 text-center">{item.type}</td>
                  <td className="p-4 text-right pr-[3rem]">
                    {typeof item.amount === 'number'
                      ? `${item.amount.toLocaleString()}원`
                      : item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-[4.4rem]">
          <button
            onClick={onClose}
            className="w-full max-w-[54rem] py-[1.5rem] rounded-[1.8rem] border border-black text-[1.8rem]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
