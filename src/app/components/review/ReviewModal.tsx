import { ReviewModalProps } from '@/types/review';
import { X } from 'lucide-react';

export default function ReviewModal({
  isOpen,
  onClose,
  customerName,
  customerEmail,
  customerRating,
  customerContent,
}: ReviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-[4rem] p-[4.4rem] w-[70rem]">
        <div className="flex justify-between items-center mb-[3rem]">
          <h2 className="text-[3rem] font-bold">리뷰내용 상세보기</h2>
          <button onClick={onClose}>
            <X size={40} className="text-[2.4rem]" />
          </button>
        </div>

        <div className="space-y-[2.3rem] px-[5.4rem]">
          <div>
            <span className="inline-block w-[16rem]">이름</span>
            <span>{customerName}</span>
          </div>
          <div>
            <span className="inline-block w-[16rem]">이메일주소(아이디)</span>
            <span>{customerEmail}</span>
          </div>
          <div>
            <span className="inline-block w-[16rem]">별점</span>
            <span>{customerRating}</span>
          </div>
          <div>
            <span className="inline-block w-[16rem]">내용</span>
            <span>{customerContent}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="w-[54rem] items-center bg-black text-white mt-[4.4rem] py-[1.5rem] rounded-[1.8rem] text-[1.8rem]"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
