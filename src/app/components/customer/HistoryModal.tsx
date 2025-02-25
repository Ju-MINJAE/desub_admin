import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAccessToken } from '@/actions/auth/getAccessToken';
const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string;
}

interface HistoryItem {
  change_date: number;
  status: string;
  amount: string;
}

export default function HistoryModal({ isOpen, onClose, customerId }: HistoryModalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const { accessToken } = await getAccessToken();

      const response = await fetch(
        `${BASEURL}/api/admin/subscriptions/history/?user_id=${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('히스토리 정보를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setHistory(data.history);
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch customer history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && customerId) {
      fetchHistory();
    }
  }, [isOpen, customerId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-[4rem] p-[4.4rem] w-[70rem] max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-[4.4rem] sticky">
          <h2 className="text-[3rem] font-bold">구독변경이력 상세보기</h2>
          <button onClick={onClose}>
            <X size={40} className="text-[2.4rem]" />
          </button>
        </div>

        <div className="px-[3rem] overflow-y-auto flex-1">
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
                  <td className="p-4 text-center">{item.change_date}</td>
                  <td className="p-4 text-center">{item.status}</td>
                  <td className="p-4 text-right pr-[3rem]">
                    {typeof item.amount === 'number'
                      ? `${Number(item.amount).toLocaleString()}원`
                      : item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-[4.4rem] sticky">
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
