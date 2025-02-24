export interface Cancellation {
  paymentDate: string;
  cancelled_date: string;
  cancelled_reason: string;
  expected_refund_amount: string;
  refund_amount?: string;
  refund_date?: string;
  refund_status: string;
  subs_id: string;
  user: {
    email: string;
    name: string;
    phone: string;
  };
}

export type CancellationSortField = 'cancelled_date' | 'user.name' | 'user.email' | 'user.phone';

export interface RefundInfo {
  paid_amount: string;
  paid_at: string;
  refund_amount: string;
  user_name: string;
}
