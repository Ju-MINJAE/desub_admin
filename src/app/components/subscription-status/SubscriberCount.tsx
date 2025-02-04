import { SubscriberCountProps } from "@/types/subscriber";

export default function SubscriberCount({
  totalCount,
  newCount,
  pausedCount,
}: SubscriberCountProps) {
  return (
    <div className="mt-[1.8rem]">
      <p className="text-[1.8rem]">
        전체 구독 고객 : {totalCount}명 | 오늘 신규 구독 : {newCount}명 | 오늘
        구독 일시정지 : {pausedCount}명
      </p>
    </div>
  );
}
