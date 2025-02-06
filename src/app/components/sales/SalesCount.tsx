import { SalesCountProps } from '@/types/sales';

export default function SalesCount({ monthTotalSales, monthCancelSales }: SalesCountProps) {
  const monthSales = monthTotalSales + monthCancelSales;

  const formatNumber = (num: number) => {
    const absNum = Math.abs(num);
    const formattedNum = absNum.toLocaleString('ko-KR');
    return num < 0 ? `-${formattedNum}` : formattedNum;
  };

  return (
    <div className="mt-[1.8rem]">
      <p className="text-[1.8rem]">
        당월 매출 : {formatNumber(monthTotalSales)}원 | 당월 취소 매출 :{' '}
        {formatNumber(monthTotalSales)}원 | 당월 총매출 :{formatNumber(monthSales)}원
      </p>
    </div>
  );
}
