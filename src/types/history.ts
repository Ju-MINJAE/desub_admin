export interface SubscriptionHistory {
  date: string;
  type: string; // '구독취소', '결제', '재개', '일시정지'
  amount: number | string;
}
