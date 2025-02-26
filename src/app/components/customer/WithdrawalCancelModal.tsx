interface WithdrawalCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName: string;
}

export default function WithdrawalCancelModal({
  isOpen,
  onClose,
  onConfirm,
  customerName,
}: WithdrawalCancelModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-[4rem] p-[6rem] w-[50rem]">
        <h2 className="text-[2rem] text-center mb-[3rem]">
          {customerName}님의 탈퇴 신청을 취소 하시겠습니까?
        </h2>

        <div className="flex justify-center gap-[2rem]">
          <button
            onClick={onClose}
            className="w-[15rem] py-[1.2rem] rounded-[1.8rem] border border-black text-[1.8rem]"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="w-[15rem] py-[1.2rem] rounded-[1.8rem] bg-black text-white text-[1.8rem]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
