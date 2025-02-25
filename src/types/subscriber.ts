export interface Subscriber {
  auto_renew?: boolean;
  expiry_date: string;
  first_payment_date: string;
  id?: number;
  last_payment_date: string;
  plan_name?: string;
  user: {
    email: string;
    name: string;
    phone: string;
    sub_status: string;
  };
}

export interface SubscriberCountProps {
  totalCount: number;
  newCount: number;
  pausedCount: number;
}

export type SortField =
  | 'user.name'
  | 'user.email'
  | 'user.phone'
  | 'first_payment_date'
  | 'last_payment_date'
  | 'expiry_date';
