import { Withdrawal } from '@/types/customer';

interface WithdrawalTableProps {
  withdrawals: Withdrawal[];
  onWithdraw?: (withdrawal: Withdrawal) => void;
}

export default function WithdrawalTable({ withdrawals, onWithdraw }: WithdrawalTableProps) {
  return (
    <table className="w-full">
      {/* ... thead 부분 ... */}
      <tbody>
        {withdrawals.map((withdrawal, index) => (
          <tr key={index} className="border-b">
            <td className="p-4 text-center">{withdrawal.withdrawalDate}</td>
            <td className="p-4 text-center">{withdrawal.name}</td>
            <td className="p-4 text-center">{withdrawal.email}</td>
            <td className="p-4 text-center">{withdrawal.phone}</td>
            <td className="p-4 text-center">
              <button className="hover:underline">상세보기</button>
            </td>
            <td className="p-4 text-center">
              {withdrawal.withdrawalStatus ? (
                <span>탈퇴완료</span>
              ) : (
                <button
                  onClick={() => onWithdraw?.(withdrawal)}
                  className="px-4 py-2 border rounded-full"
                >
                  탈퇴
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
